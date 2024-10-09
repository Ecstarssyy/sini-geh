"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import { usePathname } from "next/navigation";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? ""; // Mendapatkan path URL saat ini

  // Menentukan halaman yang tidak ingin menggunakan layout
  const excludedRoutes = ["/login", "/"];

  // Jika path saat ini termasuk dalam excludedRoutes, jangan tampilkan layout
  if (excludedRoutes.includes(pathname)) {
    return <div className="px-3">{children}</div>; // Hanya render children tanpa layout
  }

  return (
    <div>
      <Toaster />
      <Navbar />
      <div className="w-full py-8 flex items-center justify-center">
        <div className="container">{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
