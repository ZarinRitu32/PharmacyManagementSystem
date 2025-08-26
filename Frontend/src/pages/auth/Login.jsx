import { useState } from "react";
import api from "../../api/axios";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "admin", // default role
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", form);
      setMessage(res.data.message);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Optional: redirect based on role
      const role = res.data.user.role;
      if (role === "admin") {
        window.location.href = "/admin/dashboard";
      } else if (role === "pharmacist") {
        window.location.href = "/pharmacist/dashboard";
      } else if (role === "donor") {
        window.location.href = "/donor/dashboard";
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your credentials to access your account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selection */}
          <div>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="admin">Admin</option>
              <option value="pharmacist">Pharmacist</option>
              <option value="donor">Donor</option>
            </select>
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember Me
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              Forgot Your Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Log In
          </button>

          {message && (
            <p className="text-center text-red-500 font-medium">{message}</p>
          )}
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register Now
          </a>
        </p>
      </div>
    </div>
  );
}
