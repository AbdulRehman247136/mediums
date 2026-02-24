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
    <div className="flex min-h-screen bg-gray-50">
      {/* Backdrop for mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[90] md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Single instance */}
      <Sidebar
        mobileOpen={mobileMenuOpen}
        desktopCollapsed={collapsed}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0 transition-all duration-300">
        <Navbar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          onOpenMobile={() => setMobileMenuOpen(true)}
        />

        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 p-4 w-full overflow-x-hidden overflow-y-auto bg-white">
            {children}
          </main>

          {/* Right Sidebar */}
          <aside className="w-72 hidden lg:block border-l border-gray-200 bg-white">
            <RightSideBar />
          </aside>
        </div>
      </div>
    </div>
  );
}

