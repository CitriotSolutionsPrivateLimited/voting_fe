import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "../utils/axios";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      message.error("Username and password required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("/login", form)
      console.log(res.data);
      localStorage.setItem("user", res.data.user.username);
      message.success("Login successful");
      navigate("/home", { replace: true });

    } catch (err) {
      message.error(
        err.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="w-[420px] bg-white rounded-2xl shadow-xl border border-slate-200">

        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-slate-200 text-center">
          <h1 className="text-2xl font-bold text-slate-800">
            🗳️ Voting Portal
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Login to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="px-8 py-6">

          {/* Username */}
          <div className="mb-4">
            <label className="text-sm font-medium">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-md mt-1 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 pr-16 border rounded-md mt-1 focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-sm text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-slate-800 text-white rounded-md"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;