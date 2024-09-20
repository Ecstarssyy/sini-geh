import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Admin Panel Website KMK",
  description: "Manajemen data website KMK",
};

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full flex-1 overflow-hidden">
        <Header />
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
