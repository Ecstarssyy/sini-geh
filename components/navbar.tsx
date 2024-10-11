"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

type NavLink = {
  name: string;
  href: string;
};

const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    console.log(pathname);
  });

  const isActive = (urls: string[]) => {
    return urls.some(
      (url) => pathname === url || pathname?.startsWith(url + "/")
    );
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
              <a
                href="/"
                className={`${
                  isActive(["/"]) ? "text-yellow-400 font-bold" : "text-white"
                } text-white hover:text-yellow-300 text-lg left-1`}
              >
                Beranda
              </a>
            </li>
            <li>
              <a
                href="rekomendasi"
                className={`${
                  isActive(["/rekomendasi", "/detail", "/rekomendasi_2"])
                    ? "text-yellow-400 font-bold"
                    : "text-white"
                }  text-lg`}
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

export default Navbar;
