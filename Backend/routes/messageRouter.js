import express from "express";
import {
    getAllMessages,
    sendMessage,
} from "../controllers/messageController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { Message } from "../models/messageSchema.js";
const router = express.Router();

router.post("/send", sendMessage);
router.get("/getall", isAuthenticated, getAllMessages);

// PUT: Toggle Read/Unread
router.put("/markreadtoggle/:id", async (req, res) => {
    try {
        const { isRead } = req.body;
        const updatedMessage = await Message.findByIdAndUpdate(
            req.params.id,
            { isRead },
            { new: true }
        );

        res.status(200).json({ success: true, message: updatedMessage });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
