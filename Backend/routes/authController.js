import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createUser, findUserByEmail } from "../models/user.js";
import bcrypt from "bcryptjs";
dotenv.config();

/*const router = express.Router();

// Register
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  findUserByEmail(email, (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length > 0)
      return res.status(400).json({ message: "Email already exists" });

    createUser(name, email, password, (err, results) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: "User registered successfully" });
    });
  });
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  findUserByEmail(email, (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0)
      return res.status(400).json({ message: "Invalid credentials" });

    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  });
});

export default router;
*/
// D:\PharmacyManagementSystem\Backend\routes\authController.js

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// REGISTER
export const register = (req, res) => {
  const { name, email, password, role } = req.body;

  if (!role || !["admin", "donor", "pharmacist"].includes(role)) {
    return res.status(400).json({ message: `Role (${role}) is not allowed` });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sqlInsert =
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
  db.query(sqlInsert, [name, email, hashedPassword, role], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    // Fetch inserted user to get proper role
    const sqlSelect = "SELECT * FROM users WHERE id = ?";
    db.query(sqlSelect, [result.insertId], (err, rows) => {
      if (err) return res.status(500).json({ message: err.message });

      const user = rows[0];
      const token = generateToken(user);
      res.status(201).json({ token });
    });
  });
};

// LOGIN
export const login = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    if (results.length === 0)
      return res.status(404).json({ message: "User not found" });

    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    res.json({ token });
  });
};
