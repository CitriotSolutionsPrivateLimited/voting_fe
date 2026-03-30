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
      title: "Get Records",
      description:
        "View the records based on School (polling station).",
      route: "/records",  
      accent: "#0ea5e9",
      bg: "#e0f2fe",
      border: "#bae6fd",
    },
  ];

  return (
    <div className="min-h-screen bg-[linear-gradient(145deg,#f8faff_0%,#f0f4ff_50%,#faf5ff_100%)] font-sans relative overflow-hidden">

      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.08)_0%,transparent_70%)]" />
        <div className="absolute bottom-[10%] -left-16 w-[320px] h-[320px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.07)_0%,transparent_70%)]" />
        <div className="absolute top-[40%] right-[15%] w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.06)_0%,transparent_70%)]" />
      </div>

      <Header />

      <main className="relative z-10 max-w-[1100px] mx-auto px-5 py-12 pb-20">

        {/* Hero */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h1 className="text-[clamp(2rem,5vw,3.2rem)] font-bold text-[#0f172a] leading-tight tracking-[-0.03em] mb-4">
            Voter Information{" "}
            <span className="bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent">
              Portal
            </span>
          </h1>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-5">
          {cards.map((card, i) => (
            <ActionCard
              key={i}
              card={card}
              index={i}
              mounted={mounted}
              onClick={() => card.route && navigate(card.route)}
            />
          ))}
        </div>

      </main>
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
      className={`relative overflow-hidden rounded-[20px] p-7 cursor-pointer transition-all duration-300 ${
        hovered
          ? "shadow-[0_12px_32px_rgba(0,0,0,0.1)] -translate-y-1 scale-[1.01]"
          : "shadow-[0_2px_12px_rgba(0,0,0,0.05)]"
      } ${
        mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-5 scale-95"
      }`}
      style={{
        background: "white",
        border: `1.5px solid ${hovered ? card.border : "#e8ecf4"}`,
        transition: `all 0.4s ${0.2 + index * 0.1}s cubic-bezier(0.34,1.56,0.64,1)`,
      }}
    >
      {/* Accent */}
      <div
        className="absolute top-0 right-0 w-20 h-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${card.bg}, transparent 70%)`,
        }}
      />

      {/* Icon */}
      <div
        className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center text-2xl mb-4 transition-transform duration-300"
        style={{
          background: card.bg,
          border: `1.5px solid ${card.border}`,
          transform: hovered ? "scale(1.1) rotate(-3deg)" : "scale(1)",
        }}
      >
        {card.icon}
      </div>

      {/* Title */}
      <h2 className="text-[17px] font-bold text-[#0f172a] mb-2 leading-snug">
        {card.title}
      </h2>

      {/* Description */}
      <p className="text-[13.5px] text-[#64748b] leading-relaxed mb-5">
        {card.description}
      </p>

      {/* CTA */}
      <div
        className="inline-flex items-center gap-1.5 text-[13px] font-bold transition-all"
        style={{ color: card.accent }}
      >
        Get started
        <span
          className="inline-block transition-transform duration-200"
          style={{
            transform: hovered ? "translateX(4px)" : "translateX(0)",
          }}
        >
          →
        </span>
      </div>
    </div>
  );
};

export default Home;