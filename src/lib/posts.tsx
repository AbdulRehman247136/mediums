"use client";
import React, { useEffect, useState } from "react";

interface Post {
  _id: string;
  content: string;
  author?: string;
  createdAt?: string;
}

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts", { method: "GET" });
      if (!res.ok) throw new Error("Failed to fetch posts");

      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <p className="text-center mt-10">Medium...</p>;

  if (posts.length === 0)
    return <p className="text-center mt-10 text-gray-500">No posts yet.</p>;

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 space-y-6">
      {posts.map((post) => (
        <div
          key={post._id}
          className="border p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-all"
        >
         <img
  src={post.image}
  alt="User"
  className="w-7 h-7 rounded-full object-cover"
/>

          {/* 📝 Display content safely */}
          <div
            className="prose prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <p className="text-sm text-gray-500 mt-2">
            {post.name ? `— ${post.name}` : ""}
          </p>
          <p className="text-xs text-gray-400">
            {post.createdAt
              ? new Date(post.createdAt).toLocaleString()
              : ""}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
