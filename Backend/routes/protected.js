import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/role.js";

const router = express.Router();

// Admin Dashboard (only for admin)
router.get(
  "/admin/dashboard",
  verifyToken,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({
      message: `Welcome Admin ${req.user.email} to the Admin Dashboard`,
    });
  }
);

// Donor Dashboard (only for donor)
router.get(
  "/donor/dashboard",
  verifyToken,
  authorizeRoles("donor"),
  (req, res) => {
    res.json({
      message: `Welcome Donor ${req.user.email} to the Donor Dashboard`,
    });
  }
);

// Pharmacist Dashboard (only for pharmacist)
router.get(
  "/pharmacist/dashboard",
  verifyToken,
  authorizeRoles("pharmacist"),
  (req, res) => {
    res.json({
      message: `Welcome Pharmacist ${req.user.email} to the Pharmacist Dashboard`,
    });
  }
);

export default router;
