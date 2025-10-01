"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/layout/sidebar";
import Navbar from "@/components/layout/Navbar";


export default function Layout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  // ✅ Restore collapsed state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("admin:sidebarCollapsed");
    if (saved) setCollapsed(saved === "true");
  }, []);
  useEffect(() => {
    localStorage.setItem("admin:sidebarCollapsed", String(collapsed));
  }, [collapsed]);

  // ✅ Set CSS variable for smooth sidebar width
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--sidebar-width", collapsed ? "72px" : "240px");
  }, [collapsed]);

  return (
    <div className="flex min-h-screen">
      {/* ✅ Sidebar on the left */}
      <Sidebar collapsed={collapsed} />

      {/* ✅ Main Content Area */}
      <div
        className="flex flex-col flex-1 transition-all duration-300"
       
      >
        {/* ✅ Navbar (can toggle sidebar) */}
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* ✅ Page content */}
        <main className="p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
