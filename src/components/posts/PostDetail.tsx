"use client";

import React, { useEffect } from "react";

export interface Post {
  _id: string;
  content: string;
  author?: string;
  createdAt?: string;
  claps?: number;
  views?: number; // ✅ add this line
  userId: {
    name?: string;
    image?: string;
    email?: string;
  };
}

interface PostDetailProps {
  post: Post;
}

const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
  useEffect(() => {
    if (!post?._id) return;

    const increaseView = async () => {
      try {
        await fetch("/api/analytics", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postId: post._id }), // ✅ send only the postId
        });
      } catch (error) {
        console.error("Failed to increase view count:", error);
      }
    };

    increaseView();
  }, [post?._id]); // ✅ runs only when the post changes

  return (
    <div className="max-w-full mx-auto mt-6 p-6 shadow-sm bg-white">
      <div className="flex items-center gap-3 mb-4">
        <img
          src={post?.userId?.image}
          alt={post?.userId?.name ?? "Anonymous"}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="text-lg font-medium">{post.userId.name}</p>
          <p className="text-xs text-gray-400">
            {post.createdAt
              ? new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : ""}
          </p>
        </div>
      </div>

      <div
        className="prose prose-gray mt-4 text-2xl leading-relaxed overflow-x-hidden"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {post.claps !== undefined && (
        <p className="mt-4 text-sm text-gray-500">
          {post.claps} {post.claps === 1 ? "clap" : "claps"}
        </p>
      )}

      {post.views !== undefined && (
        <p className="mt-2 text-sm text-gray-400">{post.views} views</p>
      )}
    </div>
  );
};

export default PostDetail;
