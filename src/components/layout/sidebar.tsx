"use client";

import React from "react";
import Link from "next/link";
import { FaHome, FaUsers, FaBox, FaCog, FaSignOutAlt } from "react-icons/fa";
import { cn }  from "@/lib/utils"
import { MenubarItem, MenubarMenu } from "../menubar";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const NAV: NavItem[] = [
  { label: "Dashboard", href: "", icon: FaHome },
  { label: "Users", href: "", icon: FaUsers },
  { label: "Products", href: "", icon: FaBox },
  { label: "Settings", href: "", icon: FaCog },
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
   
      "h-screen bg-background border-r border-border flex flex-col justify-between transition-[width] duration-700 ease-in-out overflow-hidden"
    )}
    style={{
      width: collapsed ? "72px" : "170px", 
    }}
    aria-label="Sidebar"
  >
    {/* Top section (logo + nav) */}
    <div>
      <div className="flex items-center px-3 py-4">
        <div
          className={cn(
            "flex-shrink-0 rounded-md flex items-center justify-center px-6",
            collapsed ? "w-1 h-10" : "w-12 h-12"
          )}
        >
          <span className="text-2xl font-bold px-3">M</span>
        </div>
        {!collapsed && (
          <h2 className="text-lg text-black font-semibold">Medium</h2>
        )}
      </div>
  
      <nav className="px-1 py-2">
        <ul className="space-y-1">
          {NAV.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => isMobile && onCloseMobile?.()}
                  className={cn(
                    "flex items-center gap-5 text-foreground rounded-md px-3 py-2 hover:bg-muted/10 transition-colors",
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
    </div>
  
    {/* Bottom section with gap */}
    <div className="mb-[1vh] px-2">
      <button
        className={cn(
          "w-full flex items-center gap-3 rounded-md px-3 py-2 hover:bg-muted/10 transition-colors text-foreground cursor-pointer font-semibold ",
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