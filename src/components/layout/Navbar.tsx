"use client";
import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import Sidebar from "@/components/layout/sidebar";
import Usermenu from "../usermenu";

function Navbar({collapsed, setCollapsed}: {collapsed: boolean, setCollapsed: React.Dispatch<React.SetStateAction<boolean>>}) {
  
 

 

  return (
    <div className="flex">
      {/* ✅ Sidebar always on the left */}
    

      {/* ✅ Main content wrapper */}
      <div className="flex-1">
        <nav className="flex items-center justify-between bg-white h-16 px-6 border-b-2 border-gray-100">
          {/* ✅ Left Section: Collapse Button + Logo + Search */}
          <div className="flex items-center gap-8">
            {/* ✅ Toggle button (no overlap now) */}
            <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="hidden md:inline-flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted/10"
        >
          {collapsed ? (
            <FaChevronRight className="w-5 h-5" />
          ) : (
            <FaChevronLeft className="w-5 h-5" />
          )}
          <span className="hidden md:block text-sm text-muted-foreground">
            
          </span>
        </button>
       

            {/* ✅ Logo */}
            <h1 className="text-2xl font-bold">Medium</h1>

            {/* ✅ Search */}
            <input
              type="text"
              placeholder="Search"
              className="rounded-xl px-4 py-2 bg-gray-200"
            />
          </div>

          {/* ✅ Right Section: Auth + Profile */}
              <Usermenu />
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
