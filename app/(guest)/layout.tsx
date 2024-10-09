"use client";

import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import { usePathname } from "next/navigation";
import React from "react";
import Footer from "@/components/footer/footer";
import Image from "next/image";

function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? ""; // Mendapatkan path URL saat ini

  // Menentukan halaman yang tidak ingin menggunakan layout
  const excludedRoutes = ["/login", "/"];

  // Jika path saat ini termasuk dalam excludedRoutes, jangan tampilkan layout
  if (excludedRoutes.includes(pathname)) {
    return <div className="px-3">{children}</div>; // Hanya render children tanpa layout
  }

  return (
    <>
      <Image
        className="fixed bottom-0 w-screen h-screen object-cover z-[-1]"
        src="/images/bg-motif.png"
        width={1080}
        height={1080}
        alt="motif background"
      />
      <div>
        <Toaster />
        <Navbar />
        <div className="container flex flex-col justify-center items-center">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
