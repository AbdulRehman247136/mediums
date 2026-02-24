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

  // Restore collapsed state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("admin:sidebarCollapsed");
    if (saved) setCollapsed(saved === "true");
  }, []);
  useEffect(() => {
    localStorage.setItem("admin:sidebarCollapsed", String(collapsed));
  }, [collapsed]);

  // Set CSS variable for smooth sidebar width (only for desktop)
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

      {/* Left Sidebar */}
      <Sidebar
        collapsed={!mobileMenuOpen} // In mobile, "collapsed" means hidden
        isMobile={true}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Desktop Sidebar (Optional, if we want separate desktop sidebar) */}
      <div className="hidden md:block">
        <Sidebar collapsed={collapsed} isMobile={false} />
      </div>

      {/* Main Content + Right Sidebar */}
      <div className="flex flex-1 flex-col transition-all duration-300 ease-in-out">
        {/* Navbar */}
        <Navbar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          onOpenMobile={() => setMobileMenuOpen(true)}
        />

        {/* Main content area with right sidebar */}
        <div className="flex flex-1">
          {/* Page content */}
          <main className="flex-1 p-4 w-full overflow-x-hidden">{children}</main>

          {/* Right Sidebar */}
          <aside className="w-72 hidden lg:block p-4">
            <RightSideBar />
          </aside>
        </div>
      </div>
    </div>
  );
}

