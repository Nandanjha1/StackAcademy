import express from "express";
// import "../config/passport.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import { registerStudent, login, verifyAdminOtp, logout } from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/student/register", registerStudent);
router.post("/login", login);
router.post("/admin/verify-otp", verifyAdminOtp);
router.get("/logout", logout);
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { session: false }),
    (req, res) => {
        try {
            const token = jwt.sign({ id: req.user._id, email: req.user.email }, process.env.SECRET_KEY, { expiresIn: "7d" })
            res.redirect(`${process.env.FRONTEND_URL}/auth-success?token=${token}`)
        } catch (error) {
            console.error("Google login error:", error)
            res.redirect(`${process.env.FRONTEND_URL}/login?error=google_failed`)
        }
    })
router.get("/me", isAuthenticated, (req, res) => {
    res.json({ success: true, user: req.user })
})

export default router;
