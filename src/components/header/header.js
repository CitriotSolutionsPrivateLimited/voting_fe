import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
      
      {/* Left Title */}
      <h1 className="text-lg font-bold text-slate-800">
        VOTERS' SERVICE PORTAL
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Username Avatar */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center font-semibold">
            {user ? user.charAt(0).toUpperCase() : "U"}
          </div>
          <span className="text-sm font-medium text-slate-700">
            {user}
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md text-sm"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Header;