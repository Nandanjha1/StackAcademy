import { User } from "../models/userSchema.js";
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

// --- ADD THIS NEW FUNCTION ---
// Get Dashboard Stats - Admin Only
export const getDashboardStats = catchAsyncErrors(async (req, res, next) => {

  let courseCount = 0;
  try {
    // Construct a reliable path to your data directory
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const coursesDirectoryPath = path.resolve(__dirname, '../../data/courses');

    // Read all files in the directory
    const files = await fs.readdir(coursesDirectoryPath);
    // The number of courses is the number of files
    courseCount = files.length;
  } catch (error) {
    console.error("Could not read courses directory. Defaulting to 0.", error.code);
    // If the directory doesn't exist or there's an error, we'll just send 0.
    courseCount = 0;
  }
  // Fetch counts for each role
  const studentCount = await User.countDocuments({ role: "Student" });
  const mentorCount = await User.countDocuments({ role: "Mentor" });
  const adminCount = await User.countDocuments({ role: "Admin" });

  // Fetch lists of users for management panels
  const students = await User.find({ role: "Student" }).select("-password");
  const mentors = await User.find({ role: "Mentor" }).select("-password");
  const admins = await User.find({ role: "Admin" }).select("-password");

  // For "Recent Activity", fetch the last 5 registered users regardless of role
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
      courseCount: courseCount,
      totalRevenue: 0,
    },
    lists: {
      students,
      mentors,
      admins,
      recentActivity,
    }
  });
});
