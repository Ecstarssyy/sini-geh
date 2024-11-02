"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Lock } from "lucide-react";

type NavLink = {
  name: string;
  href: string;
};

const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const pathname = usePathname();

  const router = useRouter();

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
      <div className="w-full">
        <div className="container relative mx-auto">
          <Button
            variant="outline"
            onClick={() => router.push("/login")}
            className="absolute top-1 right-0 py-5 z-50 hidden md:flex"
          >
            <Lock className="mr-2" /> Admin Login
          </Button>

          <nav className="mt-8 py-1 flex items-center rounded-r-full w-full justify-center">
            {/* Navigation Links */}
            <div className="relative bg-[#4D2B28] pl-16 flex items-center justify-center rounded-full py-2">
              <Image
                src="/images/logomangkok.png"
                alt="Mengan Pai"
                className="w-[80px] absolute left-0"
                width={1080}
                height={1080}
              />
              <ul className="flex gap-6 ml-8 mr-4">
                <li>
                  <a
                    href="/"
                    className={`text-sm ${
                      isActive(["/"])
                        ? "text-yellow-400 font-bold"
                        : "text-white"
                    } text-white hover:text-yellow-300 left-1`}
                  >
                    Beranda
                  </a>
                </li>
                <li>
                  <a
                    href="/rekomendasi"
                    className={`text-sm ${
                      isActive(["/rekomendasi", "/detail", "/kuliner"])
                        ? "text-yellow-400 font-bold"
                        : "text-white"
                    }  `}
                  >
                    Rekomendasi
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
