"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface TopPost {
  _id: string;
  content: string;
  views: number;
  userId: { name?: string; image?: string };
}

export default function RightSideBar() {
  const [topPosts, setTopPosts] = useState<TopPost[]>([]);

  useEffect(() => {
    const fetchTopPosts = async () => {
      const res = await fetch("/api/posts/top");
      const data = await res.json();
      setTopPosts(data);
    };
    fetchTopPosts();
  }, []);

  const cleanText = (html: string) => html.replace(/<[^>]+>/g, "").slice(0, 50) + "...";

  return (
    <div className="h-screen border-l border-gray-300 p-5">
      <h1 className="text-lg font-semibold mb-4">Most Viewed</h1>
      <div className="space-y-4">
        {topPosts.map((post) => (
          <Link
            key={post._id}
            href={`/detailposts?postId=${post._id}`}
            className="block p-3 border rounded-lg hover:bg-gray-100 transition cursor-pointer"
          >
            <h2 className="text-sm font-semibold">{post.userId?.name || "Author"}</h2>
            <p className="text-xs text-gray-600">{cleanText(post.content)}</p>
            <span className="text-xs text-gray-500">{post.views} views</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
