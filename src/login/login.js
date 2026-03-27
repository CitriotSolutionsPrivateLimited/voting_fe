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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,700;1,9..144,300&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --cream: #FAF7F2;
          --warm-white: #FFFDF9;
          --sand: #EDE8DF;
          --amber: #C8A96E;
          --amber-light: #D9BE8A;
          --amber-dark: #A8893A;
          --moss: #6B7C5E;
          --ink: #2C2A27;
          --ink-mid: #5A574F;
          --ink-soft: #8C8880;
          --coral: #D4715A;
        }

        .login-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--cream);
          background-image:
            radial-gradient(ellipse 80% 60% at 20% 10%, rgba(200,169,110,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 85% 90%, rgba(107,124,94,0.10) 0%, transparent 55%),
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8a96e' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          padding: 24px 16px;
          font-family: 'DM Sans', sans-serif;
        }

        .login-wrapper {
  width: 100%;
  max-width: 420px;   /* match your form width */
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 8px 60px rgba(44,42,39,0.10), 0 2px 16px rgba(44,42,39,0.06);
  animation: fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both;
}

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Left Panel ── */
        .login-panel-left {
          flex: 1;
          background: linear-gradient(145deg, #2C2A27 0%, #3D3A33 50%, #4A4438 100%);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 52px 48px;
          position: relative;
          overflow: hidden;
        }

        .login-panel-left::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 50% at 30% 20%, rgba(200,169,110,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 50% 70% at 80% 80%, rgba(107,124,94,0.15) 0%, transparent 55%);
        }

        .left-brand {
          position: relative;
          z-index: 1;
        }

        .left-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(200,169,110,0.15);
          border: 1px solid rgba(200,169,110,0.30);
          border-radius: 100px;
          padding: 6px 14px;
          margin-bottom: 32px;
        }

        .left-badge-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--amber-light);
          animation: pulse 2s ease infinite;
        }

        @keyframes pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.5; transform: scale(0.85); }
        }

        .left-badge span {
          font-size: 11px;
          font-weight: 500;
          color: var(--amber-light);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .left-title {
          font-family: 'Fraunces', serif;
          font-size: clamp(30px, 4vw, 40px);
          font-weight: 700;
          color: var(--warm-white);
          line-height: 1.18;
          margin-bottom: 16px;
        }

        .left-title em {
          font-style: italic;
          color: var(--amber-light);
        }

        .left-desc {
          font-size: 14px;
          color: rgba(255,253,249,0.55);
          line-height: 1.7;
          max-width: 280px;
        }

        .left-features {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .left-feature {
          display: flex;
          align-items: center;
          gap: 12px;
          animation: fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both;
        }

        .left-feature:nth-child(1) { animation-delay: 0.15s; }
        .left-feature:nth-child(2) { animation-delay: 0.25s; }
        .left-feature:nth-child(3) { animation-delay: 0.35s; }

        .left-feature-icon {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: rgba(200,169,110,0.12);
          border: 1px solid rgba(200,169,110,0.22);
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
        }

        .left-feature-text { font-size: 13px; color: rgba(255,253,249,0.65); }

        /* ── Right Panel ── */
        .login-panel-right {
  width: 100%;
  background: var(--warm-white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 52px 48px;
}

        .right-eyebrow {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--amber);
          margin-bottom: 10px;
        }

        .right-heading {
          font-family: 'Fraunces', serif;
          font-size: 30px;
          font-weight: 500;
          color: var(--ink);
          margin-bottom: 6px;
          line-height: 1.2;
        }

        .right-sub {
          font-size: 13.5px;
          color: var(--ink-soft);
          margin-bottom: 36px;
        }

        /* ── Field ── */
        .field {
          margin-bottom: 20px;
          position: relative;
          animation: fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }

        .field:nth-child(1) { animation-delay: 0.1s; }
        .field:nth-child(2) { animation-delay: 0.2s; }

        .field-label {
          display: block;
          font-size: 12px;
          font-weight: 500;
          color: var(--ink-mid);
          margin-bottom: 8px;
          letter-spacing: 0.04em;
        }

        .field-wrap {
          position: relative;
        }

        .field-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--ink-soft);
          font-size: 15px;
          pointer-events: none;
          transition: color 0.2s;
        }

        .field-wrap.focused .field-icon { color: var(--amber); }

        .field-input {
          width: 100%;
          padding: 13px 16px 13px 42px;
          border: 1.5px solid var(--sand);
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: var(--ink);
          background: var(--cream);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          -webkit-appearance: none;
        }

        .field-input::placeholder { color: var(--ink-soft); opacity: 0.75; }

        .field-input:focus {
          border-color: var(--amber);
          background: #FFFEF9;
          box-shadow: 0 0 0 4px rgba(200,169,110,0.12);
        }

        .show-btn {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          font-size: 11px;
          font-weight: 600;
          color: var(--amber-dark);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 4px 2px;
          font-family: 'DM Sans', sans-serif;
          transition: color 0.2s;
        }

        .show-btn:hover { color: var(--amber); }

        .password-input { padding-right: 56px !important; }

        /* ── Submit Button ── */
        .submit-btn {
          margin-top: 8px;
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--ink) 0%, #3D3A33 100%);
          color: var(--warm-white);
          font-family: 'DM Sans', sans-serif;
          font-size: 14.5px;
          font-weight: 500;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.15s, box-shadow 0.15s;
          animation: fadeUp 0.5s 0.3s cubic-bezier(0.22,1,0.36,1) both;
          letter-spacing: 0.02em;
        }

        .submit-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(200,169,110,0.18) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.2s;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(44,42,39,0.22);
        }

        .submit-btn:hover:not(:disabled)::after { opacity: 1; }

        .submit-btn:active:not(:disabled) { transform: translateY(0); }

        .submit-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .btn-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,253,249,0.3);
          border-top-color: var(--warm-white);
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 24px 0 0;
          animation: fadeUp 0.5s 0.35s cubic-bezier(0.22,1,0.36,1) both;
        }

        .divider-line { flex: 1; height: 1px; background: var(--sand); }
        .divider-text { font-size: 11.5px; color: var(--ink-soft); white-space: nowrap; }

        .footer-note {
          margin-top: 8px;
          text-align: center;
          font-size: 12px;
          color: var(--ink-soft);
          animation: fadeUp 0.5s 0.4s cubic-bezier(0.22,1,0.36,1) both;
        }

        .footer-note a {
          color: var(--amber-dark);
          font-weight: 500;
          text-decoration: none;
        }

        .footer-note a:hover { text-decoration: underline; }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .login-wrapper {
            flex-direction: column;
            max-width: 440px;
            min-height: auto;
          }

          .login-panel-left {
            padding: 36px 32px;
            min-height: 220px;
          }

          .left-features { flex-direction: row; flex-wrap: wrap; gap: 12px; }
          .left-feature-text { font-size: 12px; }

          .login-panel-right {
            flex: none;
            padding: 36px 32px 40px;
          }
        }

        @media (max-width: 480px) {
          .login-panel-left { padding: 28px 24px; }
          .login-panel-right { padding: 28px 24px 36px; }
          .left-features { display: none; }
          .right-heading { font-size: 26px; }
        }
      `}</style>

      <div className="login-root">
        <div className="login-wrapper">

          <div className="login-panel-right">
            <p className="right-eyebrow">Voting Portal</p>
            <h1 className="right-heading">Welcome back</h1>

            <form onSubmit={handleLogin} autoComplete="off">

              {/* Username */}
              <div className="field">
                <label className="field-label">Username</label>
                <div className={`field-wrap ${focused === "username" ? "focused" : ""}`}>
                  <span className="field-icon">👤</span>
                  <input
                    className="field-input"
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
              <div className="field">
                <label className="field-label">Password</label>
                <div className={`field-wrap ${focused === "password" ? "focused" : ""}`}>
                  <span className="field-icon">🔑</span>
                  <input
                    className={`field-input password-input`}
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
                    className="show-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" className="submit-btn" disabled={loading}>
                <span className="btn-inner">
                  {loading ? (
                    <><span className="spinner" /> Signing in…</>
                  ) : (
                    <>Sign In &nbsp;→</>
                  )}
                </span>
              </button>
            </form>

            <div className="divider">
              <span className="divider-line" />
              <span className="divider-text">Need help?</span>
              <span className="divider-line" />
            </div>

            <p className="footer-note">
              Contact your administrator or{" "}
              <a href="#">reset credentials</a>
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default Login;