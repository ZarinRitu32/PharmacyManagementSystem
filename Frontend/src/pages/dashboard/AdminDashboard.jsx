import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          setError("No token found. Please login.");
          setLoading(false);
          return;
        }

        // Call backend with Authorization header
        const res = await axios.get(
          "http://localhost:5000/api/admin/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage(res.data.message);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p className="text-center text-blue-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-1/2">
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">
          Admin Dashboard
        </h1>
        <p className="text-lg text-green-600 text-center">{message}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
