import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide your first name!"],
    minLength: [3, "First name must contain at least 3 characters!"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide your last name!"],
    minLength: [3, "Last name must contain at least 3 characters!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email!"],
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email!"],
  },
  phone: {
    type: String,
    required: [true, "Please provide your phone number!"],
    minLength: [10, "Phone number must contain exactly 10 digits!"],
    maxLength: [10, "Phone number must contain exactly 10 digits!"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    minLength: [8, "Password must contain at least 8 characters!"],
    select: false, // Don't send password in API responses
  },
  googleId: { type: String},
  avatar: { type: String},
  role: {
    type: String,
    required: true,
    enum: ["Student", "Mentor", "Admin"],
  },
  // Fields for Admin OTP verification
  otp: String,
  otpExpiry: Date,
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Method to compare passwords for login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to generate JWT
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const User = mongoose.model("User", userSchema);