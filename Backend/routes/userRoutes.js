import express from "express";
import { getDashboardStats, registerByAdmin } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const router = express.Router();

// This route is only accessible by a logged-in Admin
router.post("/admin/register", isAuthenticated, authorizeRoles("Admin"), registerByAdmin);
// This route for fetching dashboard statistics
router.get("/admin/stats", isAuthenticated, authorizeRoles("Admin"), getDashboardStats);

export default router;
