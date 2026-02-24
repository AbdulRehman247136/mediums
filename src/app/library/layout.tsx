"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/layout/sidebar";

import RightSideBar from "@/components/layout/rightsidebar";
import Footer from "@/components/layout/footer";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/homenav";


export default function Layout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

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
    root.style.setProperty("--sidebar-width", collapsed ? "72px" : "220px");
  }, [collapsed]);

  return (
    <div className="flex min-h-screen">
      {/* Backdrop for mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ✅ Sidebar on the left */}
      <Sidebar
        collapsed={!mobileMenuOpen}
        isMobile={true}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <div className="hidden md:block">
        <Sidebar collapsed={collapsed} isMobile={false} />
      </div>

      {/* ✅ Main Content Area */}
      <div
        className={cn(
          "flex flex-col flex-1 transition-all duration-300 ease-in-out" // ✅ dynamically uses CSS variable
        )}
      >
        {/* ✅ Navbar (can toggle sidebar) */}
        <Navbar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          onOpenMobile={() => setMobileMenuOpen(true)}
        />

        {/* ✅ Page content */}
        <main className="flex-1 w-full overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
