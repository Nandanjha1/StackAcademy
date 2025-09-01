import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"; // We'll create this later
import ErrorHandler from "../middlewares/error.js"; // And this
import { sendToken } from "../utils/jwtToken.js";
import { sendOtp } from "../utils/sendOtp.js";

// Student Registration
export const registerStudent = catchAsyncErrors(async (req, res, next) => {
    console.log("Student registration route hit!");
    console.log("Received data from frontend:", req.body);
    const { firstName, lastName, email, phone, password } = req.body;
    if (!firstName || !lastName || !email || !phone || !password) {
        return next(new ErrorHandler("Please fill all required fields!", 400));
    }

    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("User with this email already exists!", 400));
    }

    user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        role: "Student",
    });

    console.log("User successfully created in DB:", user);
    sendToken(user, 201, "Student registered successfully!", res);
});

// Login for ALL roles
export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please provide email and password!", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid email or password!", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password!", 401));
    }

    // Two-step verification for Admin
    if (user.role === "Admin") {
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
        user.otp = otp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
        await user.save();

        // In a real app, this would use an SMS service like Twilio
        await sendOtp(user.phone, otp);

        res.status(200).json({
            success: true,
            message: `OTP sent to ${user.phone}. Please verify to login.`,
            email: user.email, // Send email back to frontend for OTP verification step
        });
    } else {
        // Normal login for Student and Mentor
        sendToken(user, 200, `${user.role} logged in successfully!`, res);
    }
});

// Verify Admin OTP
export const verifyAdminOtp = catchAsyncErrors(async (req, res, next) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return next(new ErrorHandler("Please provide email and OTP!", 400));
    }

    const admin = await User.findOne({ email, role: 'Admin' });
    if (!admin) {
        return next(new ErrorHandler("Admin not found or invalid email!", 404));
    }

    if (admin.otp !== otp || admin.otpExpiry < Date.now()) {
        return next(new ErrorHandler("Invalid or expired OTP!", 400));
    }

    // Clear OTP fields after successful verification
    admin.otp = undefined;
    admin.otpExpiry = undefined;
    await admin.save();

    sendToken(admin, 200, "Admin verified and logged in successfully!", res);
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()), // Expire the cookie immediately
    })
    .json({
      success: true,
      message: "User logged out successfully.",
    });
});
