"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import { usePathname } from "next/navigation";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? ""; // Mendapatkan path URL saat ini

  // Menentukan halaman yang tidak ingin menggunakan layout
  const excludedRoutes = ["/login"];
  const excludedFooterRoutes = ["/"];

  // Jika path saat ini termasuk dalam excludedRoutes, jangan tampilkan layout
  if (excludedRoutes.includes(pathname)) {
    return <div className="px-3">{children}</div>; // Hanya render children tanpa layout
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center">
      <Toaster />
      <Navbar />
      <div className=" flex pt-8">
        <div className="container">{children}</div>
      </div>
      {!excludedFooterRoutes.includes(pathname) && <Footer />}
    </div>
  );
}

export default Layout;
