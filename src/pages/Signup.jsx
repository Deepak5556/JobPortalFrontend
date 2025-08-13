import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    role: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !form.username ||
      !form.email ||
      !form.password ||
      !form.confirmPassword ||
      !form.phoneNumber ||
      !form.role
    ) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Prepare API data (exclude confirmPassword)
    const payload = {
      username: form.username,
      email: form.email,
      password: form.password,
      phoneNumber: form.phoneNumber,
      role: form.role,
    };

    try {
      const response = await axios.post(
        "http://localhost:5252/api/Users/Signup",
        payload
      );
      alert(response.data.message || "Signup successful!");
      if (payload.role === "Job Seeker") {
        navigate("/JobSeekerProfileForm");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response) {
        setError(
          err.response.data.message || "Signup failed. Please try again."
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white px-8 py-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-1 text-gray-800">Sign Up</h1>
        <p className="text-sm text-gray-500 mb-6">Create a new account</p>
        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              name="username"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={form.username}
              onChange={handleChange}
              placeholder="Full Name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={form.email}
              onChange={handleChange}
              placeholder="you@email.com"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              name="phoneNumber"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={form.phoneNumber}
              onChange={handleChange}
              placeholder="1234567890"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              name="role"
              className="w-full px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={form.role}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="Employee">Employee</option>
              <option value="Job Seeker">Job Seeker</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-5 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600 text-sm">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
