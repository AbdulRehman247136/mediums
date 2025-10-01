"use client";

import React from "react";
import Link from "next/link";
import { FaHome, FaUsers, FaBox, FaCog, FaSignOutAlt } from "react-icons/fa";
import { cn }  from "@/lib/utils"

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const NAV: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: FaHome },
  { label: "Users", href: "/admin/users", icon: FaUsers },
  { label: "Products", href: "/admin/products", icon: FaBox },
  { label: "Settings", href: "/admin/settings", icon: FaCog },
];

export default function Sidebar({
  collapsed,
  onCloseMobile,
  isMobile,
}: {
  collapsed: boolean;
  isMobile?: boolean;
  onCloseMobile?: () => void;
}) {
  return (
    <aside
      className={cn(
        " h-screen bg-background border-r border-border flex flex-col transition-all duration-1000",
        // width handled by parent via CSS variable --sidebar-width
        "overflow-hidden "
      )}
      aria-label="Sidebar"
    >
      
      <div className="flex items-center gap-3 px-3 py-4">
        <div
          className={cn(
            "flex-shrink-0 rounded-md flex items-center justify-center",
            collapsed ? "w-1 h-10" : "w-12 h-12"
          )}
        >
          <span className="text-primary font-bold">AS</span>
        </div>

        {!collapsed && <h2 className="text-lg font-heading">ApnaStore</h2>}
      </div>
          {/* sidebar items */}
      <nav className="flex overflow-auto px-1 py-2">
        <ul className="space-y-1">
          {NAV.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => isMobile && onCloseMobile?.()}
                  className={cn(
                    " flex items-center gap-5 text-foreground rounded-md px-3 py-2 hover:bg-muted/10 transition-colors",
                    collapsed ? "justify-center" : "justify-start"
                  )}
                >
                  <Icon className="w-5 h-10" />
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
            {/* Signout button */}
      <div className=" flex items-end justify-end">
        <button
          className={cn(
            "w-full flex items-center   rounded-md px-3 py-1 hover:bg-muted/10 transition-colors",
            collapsed ? "justify-center" : "justify-start"
          )}
        >
          <FaSignOutAlt className="w-5 h-10" />
          {!collapsed && <span className="text-sm">Sign out</span>}
        </button>
      </div>
    </aside>
  );
}