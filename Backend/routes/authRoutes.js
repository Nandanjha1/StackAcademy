import express from "express";
import { registerStudent, login, verifyAdminOtp, logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/student/register", registerStudent);
router.post("/login", login);
router.post("/admin/verify-otp", verifyAdminOtp);
router.get("/logout", logout);

export default router;
