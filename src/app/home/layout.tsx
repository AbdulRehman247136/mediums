"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/layout/sidebar";
import RightSideBar from "@/components/layout/rightsidebar";
import Footer from "@/components/layout/footer";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/homenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  // Restore collapsed state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("admin:sidebarCollapsed");
    if (saved) setCollapsed(saved === "true");
  }, []);
  useEffect(() => {
    localStorage.setItem("admin:sidebarCollapsed", String(collapsed));
  }, [collapsed]);

  // Set CSS variable for smooth sidebar width
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--sidebar-width", collapsed ? "72px" : "220px");
  }, [collapsed]);

  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <Sidebar collapsed={collapsed} />

      {/* Main Content + Right Sidebar */}
      <div className="flex flex-1 flex-col transition-all duration-300 ease-in-out">
        {/* Navbar */}
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* Main content area with right sidebar */}
        <div className="flex flex-1">
          {/* Page content */}
          <main className="flex-1 p-4">{children}</main>

          {/* Right Sidebar */}
          <aside className="w-60 hidden md:block p-4">
            <RightSideBar />
          </aside>
        </div>

       
      </div>
    </div>
  );
}
