import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/header";

const Home = () => {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100">
      
      {/* Header */}
      <Header />

      {/* Content */}
      <div className="flex flex-col items-center justify-center h-[80vh] gap-6">

        {/* Welcome */}
        <h1 className="text-3xl font-semibold text-slate-800">
          Hi, {user} 👋
        </h1>

        {/* Search Card */}
        <div
          onClick={() => navigate("/search")}
          className="w-[300px] bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            🔍 Search by Details
          </h2>
          <p className="text-sm text-gray-500">
            Find voter information using name, district, constituency and more.
          </p>
        </div>

      </div>

    </div>
  );
};

export default Home;