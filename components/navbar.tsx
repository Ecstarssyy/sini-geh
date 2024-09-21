"use client";

import React, { useState } from "react";
import { MapPin, Menu, X } from "lucide-react"; // Ikon dari lucide-react, bisa diganti dengan ikon favorit
import { cn } from "@/lib/utils"; // Class name utility untuk menggabungkan kelas
import Image from "next/image";

type NavLink = {
  name: string;
  href: string;
};

const navLinks: NavLink[] = [
  { name: "Beranda", href: "/" },
  { name: "Rekomendasi", href: "/rekomendasi" },
];

const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="border-black border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 font-belanosima">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Image
              src="/images/logo.png"
              width={500}
              height={500}
              alt="logo"
              className="w-16"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:space-x-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-800 hover:text-gray-600 px-3 ml-4 py-2 rounded-md text-md font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="ml-auto gap-2 items-center h-fit self-center justify-center border flex rounded-xl py-2 px-4">
            <MapPin/>
            <p>Bandar Lampung</p>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="flex ml-auto md:hidden items-center">
            <button
              onClick={toggleSidebar}
              className="text-gray-800 focus:outline-none"
            >
              {isSidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity",
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={toggleSidebar} // Close sidebar when clicking outside
      >
        <div
          className={cn(
            "fixed left-0 top-0 w-64 h-full bg-white shadow-lg transform transition-transform",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex justify-between items-center p-4">
            <span className="text-2xl font-bold text-gray-800">MyLogo</span>
            <button onClick={toggleSidebar}>
              <X className="w-6 h-6 text-gray-800" />
            </button>
          </div>
          <nav className="flex flex-col space-y-4 p-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
