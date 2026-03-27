import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/header";

const Home = () => {
  const user = localStorage.getItem("user") || "Guest";
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cards = [
    {
      icon: "🔍",
      title: "Search by Details",
      description:
        "Find voter information using name, district, constituency and more.",
      route: "/search",
      accent: "#6366f1",
      bg: "#eef2ff",
      border: "#c7d2fe",
    },
    {
      icon: "📋",
      title: "My Records",
      description:
        "View and manage your saved voter records and recent searches.",
      // route: "/records",
      accent: "#0ea5e9",
      bg: "#e0f2fe",
      border: "#bae6fd",
    },
    {
      icon: "🗺️",
      title: "Constituency Map",
      description:
        "Explore districts and constituencies visually on an interactive map.",
      // route: "/map",
      accent: "#10b981",
      bg: "#d1fae5",
      border: "#a7f3d0",
    },
  ];

  const stats = [
    { label: "Total Voters", value: "9.2M+", icon: "👥" },
    { label: "Districts", value: "38", icon: "🏛️" },
    { label: "Constituencies", value: "294", icon: "📍" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(145deg, #f8faff 0%, #f0f4ff 50%, #faf5ff 100%)",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      {/* Decorative background blobs */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "-80px", right: "-80px",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", left: "-60px",
          width: "320px", height: "320px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", top: "40%", right: "15%",
          width: "200px", height: "200px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%)",
        }} />
      </div>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main style={{ position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto", padding: "48px 20px 80px" }}>

        {/* Hero Section */}
        <div style={{
          textAlign: "center",
          marginBottom: "56px",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}>
          

          <h1 style={{
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: "800",
            color: "#0f172a",
            lineHeight: "1.15",
            letterSpacing: "-0.03em",
            marginBottom: "16px",
          }}>
            Voter Information{" "}
            <span style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Portal
            </span>
          </h1>

         
        </div>

        

        {/* Cards Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
          gap: "20px",
        }}>
          {cards.map((card, i) => (
            <ActionCard
              key={card.route}
              card={card}
              index={i}
              mounted={mounted}
              onClick={() => navigate(card.route)}
            />
          ))}
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>
    </div>
  );
};

const ActionCard = ({ card, index, mounted, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "white",
        borderRadius: "20px",
        border: `1.5px solid ${hovered ? card.border : "#e8ecf4"}`,
        padding: "28px",
        cursor: "pointer",
        boxShadow: hovered
          ? `0 12px 32px rgba(0,0,0,0.1), 0 0 0 4px ${card.border}`
          : "0 2px 12px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-4px) scale(1.01)" : mounted ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
        opacity: mounted ? 1 : 0,
        transition: `all 0.4s ${0.2 + index * 0.1}s cubic-bezier(0.34, 1.56, 0.64, 1)`,
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Accent corner */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: "80px", height: "80px",
        background: `radial-gradient(circle at top right, ${card.bg}, transparent 70%)`,
        pointerEvents: "none",
      }} />

      {/* Icon */}
      <div style={{
        width: "52px", height: "52px", borderRadius: "14px",
        background: card.bg,
        border: `1.5px solid ${card.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "24px", marginBottom: "18px",
        transform: hovered ? "scale(1.1) rotate(-3deg)" : "scale(1) rotate(0deg)",
        transition: "transform 0.3s ease",
      }}>
        {card.icon}
      </div>

      {/* Text */}
      <h2 style={{
        fontSize: "17px", fontWeight: "700", color: "#0f172a",
        marginBottom: "8px", lineHeight: "1.3",
      }}>
        {card.title}
      </h2>
      <p style={{
        fontSize: "13.5px", color: "#64748b", lineHeight: "1.65",
        marginBottom: "20px",
      }}>
        {card.description}
      </p>

      {/* CTA */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        fontSize: "13px", fontWeight: "700",
        color: card.accent,
        transition: "gap 0.2s ease",
      }}>
        Get started
        <span style={{
          display: "inline-block",
          transform: hovered ? "translateX(4px)" : "translateX(0)",
          transition: "transform 0.2s ease",
        }}>→</span>
      </div>
    </div>
  );
};

export default Home;