"use client";

import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#DAF1DE] shadow-lg h-16 flex justify-between items-center px-4">
      {/* Image on the left */}
      <div className="flex-shrink-0">
        <a href="/">
          <img src="/images/1.png" alt="Logo" className="h-[90px]" />
        </a>
      </div>
      {/* Logo in the center */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <a href="/" className="text-3xl font-bold text-gray-800">
          <img src="/images/Sinigeh.png" alt="Logo" className="h-[65px]" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
