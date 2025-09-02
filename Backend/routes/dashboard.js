import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/role.js";

const router = express.Router();

// Admin Dashboard
router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
  res.json({
    message: `Welcome Admin ${req.user.email}`,
    stats: {
      totalDonors: 120,
      totalPharmacists: 15,
      totalRequests: 32,
    },
  });
});

// Donor Dashboard
router.get("/donor", verifyToken, authorizeRoles("donor"), (req, res) => {
  res.json({
    message: `Welcome Donor ${req.user.email}`,
    donations: [
      { id: 1, date: "2025-01-15", status: "Approved" },
      { id: 2, date: "2025-03-10", status: "Pending" },
    ],
  });
});

// Pharmacist Dashboard
router.get(
  "/pharmacist",
  verifyToken,
  authorizeRoles("pharmacist"),
  (req, res) => {
    res.json({
      message: `Welcome Pharmacist ${req.user.email}`,
      prescriptions: [
        { id: 1, patient: "John Doe", medicine: "Amoxicillin" },
        { id: 2, patient: "Jane Smith", medicine: "Paracetamol" },
      ],
    });
  }
);

export default router;
