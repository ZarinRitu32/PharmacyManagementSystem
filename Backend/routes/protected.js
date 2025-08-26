import express from "express";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/dashboard", verifyToken, (req, res) => {
  res.json({ message: `Welcome user ${req.user.email} to your dashboard` });
});

export default router;
