import { User } from "../models/userSchema.js";
import { Message } from "../models/messageSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import fs from "fs/promises"; // Use the promise-based version of fs
import path from "path";
import { fileURLToPath } from 'url';

// Admin registers a Mentor or another Admin
export const registerByAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, password, role } = req.body;

  if (!firstName || !lastName || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill all required fields!", 400));
  }

  if (role === "Student") {
    return next(new ErrorHandler("Admin cannot register a Student.", 400));
  }

  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler(`${role} with this email already exists!`, 400));
  }

  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    role, // Role is 'Mentor' or 'Admin' from req.body
  });

  res.status(201).json({
    success: true,
    message: `${role} registered successfully by Admin!`,
    user,
  });
});

// Get Dashboard Stats - Admin Only
export const getDashboardStats = catchAsyncErrors(async (req, res, next) => {
  let courseCount = 0;

  try {
    // Path to the frontend courses file
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const coursesFilePath = path.resolve(__dirname, '../../Frontend/src/data/courses.jsx');

    // Read file content
    const fileContent = await fs.readFile(coursesFilePath, 'utf-8');

    // Match all course objects using regex pattern for `{ id:`
    const matches = fileContent.match(/id:\s*\d+/g);
    courseCount = matches ? matches.length : 0;
  } catch (error) {
    console.error("Could not read courses file. Defaulting to 0.", error.message);
    courseCount = 0;
  }

  // Count users and messages
  const studentCount = await User.countDocuments({ role: "Student" });
  const mentorCount = await User.countDocuments({ role: "Mentor" });
  const adminCount = await User.countDocuments({ role: "Admin" });
  const totalMessage = await Message.countDocuments();

  // Lists for management panels
  const students = await User.find({ role: "Student" }).select("-password");
  const mentors = await User.find({ role: "Mentor" }).select("-password");
  const admins = await User.find({ role: "Admin" }).select("-password");

  const recentActivity = await User.find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .select("-password");

  res.status(200).json({
    success: true,
    stats: {
      studentCount,
      mentorCount,
      adminCount,
      courseCount,
      totalRevenue: 0,
      totalMessage,
    },
    lists: {
      students,
      mentors,
      admins,
      recentActivity,
    }
  });
});
