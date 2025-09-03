import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRoutes from "./routes/authController.js";
import protectedRoutes from "./routes/protected.js";
import dashboardRoutes from "./routes/dashboard.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());

// ================= Medicine Routes =================
app.get("/api/medicines", async (req, res) => {
  try {
    const { category } = req.query;
    let query = "SELECT * FROM medicine";
    let params = [];

    if (category && category !== "All") {
      query += " WHERE category = ?";
      params.push(category);
    }

    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching medicines:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ================= Other Routes =================
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api/dashboard", dashboardRoutes);

// ================= Start Server =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
