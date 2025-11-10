"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Sidebar from "@/components/layout/sidebar";
import Usermenu from "../usermenu";
import Link from "next/link";

function Navbar({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="flex">
      <div className="flex-1">
        <nav className="flex items-center justify-between bg-white h-16 px-6 border-b-2 border-gray-100">
          <div className="flex items-center gap-8">
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
            </button>

            <h1 className="text-2xl font-bold">
              <Link href="/home">Medium</Link>
            </h1>

            {/* 🔍 Search input */}
            <input
              type="text"
              placeholder="Search"
              className="rounded-2xl px-5 py-1 bg-gray-200"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch} // 👈 Enter triggers redirect
            />
          </div>

          <Usermenu />
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
