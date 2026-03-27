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

  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      message.error("Username and password required");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post("/login", form);
      localStorage.setItem("user", res.data.user.username);
      message.success("Login successful");
      navigate("/home", { replace: true });
    } catch (err) {
      message.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] px-4 py-6 font-sans">
    <div className="w-full max-w-[420px] rounded-[28px] overflow-hidden shadow-[0_8px_60px_rgba(44,42,39,0.10),0_2px_16px_rgba(44,42,39,0.06)] animate-[fadeUp_0.6s_cubic-bezier(0.22,1,0.36,1)]">

      <div className="w-full bg-[#FFFDF9] flex flex-col justify-center px-12 py-14">

        <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#C8A96E] mb-2">
          Voting Portal
        </p>

        <h1 className="text-[30px] font-medium text-[#2C2A27] mb-1 leading-tight">
          Welcome back
        </h1>

        <form onSubmit={handleLogin} autoComplete="off">

          {/* Username */}
          <div className="mb-5">
            <label className="block text-[12px] font-medium text-[#5A574F] mb-2 tracking-[0.04em]">
              Username
            </label>

            <div className={`relative ${focused === "username" ? "text-[#C8A96E]" : "text-[#8C8880]"}`}>
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[15px]">
                👤
              </span>

              <input
                className="w-full pl-10 pr-4 py-[13px] border-[1.5px] border-[#EDE8DF] rounded-xl bg-[#FAF7F2] text-[14px] text-[#2C2A27] outline-none focus:border-[#C8A96E] focus:bg-[#FFFEF9] focus:ring-4 focus:ring-[#C8A96E1F]"
                type="text"
                name="username"
                placeholder="Enter your username"
                value={form.username}
                onChange={handleChange}
                onFocus={() => setFocused("username")}
                onBlur={() => setFocused("")}
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-[12px] font-medium text-[#5A574F] mb-2 tracking-[0.04em]">
              Password
            </label>

            <div className={`relative ${focused === "password" ? "text-[#C8A96E]" : "text-[#8C8880]"}`}>
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[15px]">
                🔑
              </span>

              <input
                className="w-full pl-10 pr-14 py-[13px] border-[1.5px] border-[#EDE8DF] rounded-xl bg-[#FAF7F2] text-[14px] text-[#2C2A27] outline-none focus:border-[#C8A96E] focus:bg-[#FFFEF9] focus:ring-4 focus:ring-[#C8A96E1F]"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused("")}
              />

              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-[#A8893A] uppercase tracking-[0.05em] hover:text-[#C8A96E]"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full py-3.5 rounded-xl bg-gradient-to-br from-[#2C2A27] to-[#3D3A33] text-[#FFFDF9] text-[14.5px] font-medium flex items-center justify-center gap-2 transition-all duration-150 hover:-translate-y-[1px] hover:shadow-[0_6px_24px_rgba(44,42,39,0.22)] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in…
              </>
            ) : (
              <>Sign In →</>
            )}
          </button>
        </form>

      </div>
    </div>
  </div>
);
};

export default Login;