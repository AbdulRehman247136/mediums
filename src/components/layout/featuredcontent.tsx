"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface TopPost {
  _id: string;
  content: string;
  views: number;
  userId: { name?: string; image?: string };
}

export default function FeaturedContentStack() {
  const [topPosts, setTopPosts] = useState<TopPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopPosts = async () => {
      try {
        const res = await fetch("/api/posts/top");
        if (!res.ok) throw new Error("Failed to fetch top posts");
        const data = await res.json();
        setTopPosts(data);
      } catch (err:string | any) {
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
          <Link
            key={post._id}
            href={`/detailposts?postId=${post._id}`}
            className="block p-4 bg-white border rounded-lg shadow hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center mb-2">
              {post.userId?.image && (
                <img
                  src={post.userId.image}
                  alt={post.userId.name || "Author"}
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}
              <h2 className="text-sm font-semibold">{post.userId?.name || "Author"}</h2>
            </div>
            <p className="text-sm text-gray-700 mb-2">{cleanText(post.content)}</p>
            <span className="text-xs text-gray-500">{post.views} views</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
