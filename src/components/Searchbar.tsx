"use client";

import { useState, useEffect } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 🕒 Debounce timer
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(() => {
      handleSearch();
    }, 600); // wait 600ms after user stops typing

    return () => clearTimeout(timeout);
  }, [query]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-lg mx-auto">
      <input
        type="text"
        value={query}
        placeholder="Search posts..."
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="rounded-2xl px-5 py-2 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {isLoading && <p className="text-gray-500">Searching...</p>}

      <ul className="bg-white rounded-xl shadow-md p-3">
        {results.length > 0 ? (
          results.map((post) => (
            <li key={post._id} className="border-b py-2">
              <p className="text-gray-800 text-sm">{post.content}</p>
              <p className="text-xs text-gray-500">
                👤 {post.userId?.name || "Unknown user"}
              </p>
            </li>
          ))
        ) : (
          !isLoading && query && (
            <li className="text-gray-500 text-sm">No results found</li>
          )
        )}
      </ul>
    </div>
  );
}
