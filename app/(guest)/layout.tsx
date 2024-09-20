"use client";

import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import { usePathname } from "next/navigation";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? ""; // Mendapatkan path URL saat ini

  // Menentukan halaman yang tidak ingin menggunakan layout
  const excludedRoutes = ["/login"];

  // Jika path saat ini termasuk dalam excludedRoutes, jangan tampilkan layout
  if (excludedRoutes.includes(pathname)) {
    return <>{children}</>; // Hanya render children tanpa layout
  }

  return (
    <div>
      <Toaster />
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;
