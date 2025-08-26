import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createUser, findUserByEmail } from "../models/user.js";
import bcrypt from "bcryptjs";
dotenv.config();

const router = express.Router();

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
