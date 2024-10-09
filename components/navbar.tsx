"use client";

import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#DAF1DE] shadow-lg h-16 flex justify-center items-center">
      {/* Logo di tengah atas */}
      <div className="flex-shrink-0">
        <a href="/" className="text-3xl font-bold text-gray-800">
          MyLogo
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
