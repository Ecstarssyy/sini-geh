"use client";

import React, { useState } from "react";
import { MapPin, Menu, X } from "lucide-react"; // Ikon dari lucide-react, bisa diganti dengan ikon favorit
import Image from "next/image";

type NavLink = {
  name: string;
  href: string;
};

const navLinks: NavLink[] = [
  { name: "Beranda", href: "/" },
  { name: "Rekomendasi", href: "/rekomendasi" },
];

const Navbarberanda: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="translate-x-5 py-1 flex items-center rounded-r-full w-full justify-center">
        {/* Logo */}
        <div className="flex items-center translate-x-2">
          <Image
            src="/images/logomangkok.png"
            alt="Mengan Pai"
            className="w-16 mr-1"
            width={1080}
            height={1080}
          />
        </div>

        {/* Navigation Links */}
        <div className="bg-[#4D2B28] -z-10 -translate-x-14 pl-16 pr-8 flex items-center justify-center rounded-full py-2">
          <ul className="flex gap-6 ml-8 mr-4">
            <li>
              <a href="#" className="text-yellow-400 font-bold text-lg">
                Beranda
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white hover:text-yellow-300 text-lg left-1"
              >
                Rekomendasi
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbarberanda;
