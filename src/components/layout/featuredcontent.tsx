"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ClapButton from "../clapbutton/clapbutton";

interface TopPost {
  _id: string;
  content: string;
  views: number;
  claps: number;
  userId: { name?: string; image?: string };
}

export default function FeaturedContent() {
  const [topPosts, setTopPosts] = useState<TopPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log("Top posts:", topPosts);

  useEffect(() => {
    const fetchTopPosts = async () => {
      try {
        const res = await fetch("/api/posts/top");
        if (!res.ok) throw new Error("Failed to fetch top posts");
        const data = await res.json();
        setTopPosts(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchTopPosts();
  }, []);

  const cleanText = (html: string) =>
    html.replace(/<[^>]+>/g, "").slice(0, 150) + "...";

  if (loading) return <div className="p-5">Loading featured content...</div>;
  if (error) return <div className="p-5 text-red-500">Error: {error}</div>;
  if (!topPosts.length) return <div className="p-5">No featured posts yet.</div>;

  return (
    <div className="min-h-screen p-5 bg-gray-50 max-w-3xl mx-auto">
      <div className="space-y-4">
        {topPosts.map((post) => (
          <div
            key={post._id}
            className="p-4 bg-white border rounded-lg shadow hover:shadow-md transition"
          >
            <div className="flex items-center mb-2">
              {post.userId?.image && (
                <img
                  src={post.userId.image}
                  alt={post.userId.name || "Author"}
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}
              <h2 className="text-sm font-semibold">
                {post.userId?.name || "Author"}
              </h2>
            </div>

            {/* ✅ Only this text is clickable */}
            <Link
              href={`/detailposts?postId=${post._id}`}
              className="block text-sm text-gray-700 mb-2 hover:text-blue-600"
            >
              {cleanText(post.content)}
            </Link>

            {/* ✅ Clap button is outside the link — no navigation issue */}
            <ClapButton postId={post._id} initialClaps={post.claps ?? 0} />
          </div>
        ))}
      </div>
    </div>
  );
}
