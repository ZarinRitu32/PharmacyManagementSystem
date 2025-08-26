import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRoutes from "./routes/authController.js";
import protectedRoutes from "./routes/protected.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
