import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
// Dashboard pages
import AdminDashboard from "./pages/dashboard/AdminDashboard.jsx";
import DonorDashboard from "./pages/dashboard/DonorDashboard.jsx";
import PharmacistDashboard from "./pages/dashboard/PharmacistDashboard.jsx";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/donor/dashboard" element={<DonorDashboard />} />
      <Route path="/pharmacist/dashboard" element={<PharmacistDashboard />} />
    </Routes>
  );
}
