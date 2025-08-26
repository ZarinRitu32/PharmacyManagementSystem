import db from "../db.js";
import bcrypt from "bcryptjs";

export const createUser = (name, email, password, callback) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, hashedPassword], callback);
};

export const findUserByEmail = (email, callback) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], callback);
};
