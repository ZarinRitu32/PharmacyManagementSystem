import { useState } from "react";
import api from "../../api/axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", form);
      setMessage(res.data.message);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your email and password to access your account.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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

          {/* Optional message */}
          {message && (
            <p className="text-center text-red-500 font-medium">{message}</p>
          )}
        </form>

        {/* Register */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <a href="#" className="text-blue-600 font-semibold hover:underline">
            Register Now
          </a>
        </p>
      </div>
    </div>
  );
}
