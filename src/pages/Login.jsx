import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      if (!email) alert("Email is required");
      if (!password) alert("Password is required");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5252/api/Users/Login",
        { email, password }
      );
      alert(response.data.message);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard");
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white px-8 py-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-1 text-gray-800">Login</h1>
        <p className="text-sm text-gray-500 mb-6">
          Welcome back! Please login to your account.
        </p>

        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@email.com"
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-5 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-red-600">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
