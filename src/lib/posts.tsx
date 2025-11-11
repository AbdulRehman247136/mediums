"use client";
import ClapButton from "@/components/clapbutton/clapbutton";
import TypingText from "@/components/ui/shadcn-io/typing-text";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Post {
  _id: string;
  content: string;
  author?: string;
  createdAt?: string;
  claps?: number;
  userId: {
    name?: string;
    image?: string;
    email?: string;
  };
}

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Function to remove HTML tags and limit words
  function truncateWords(html: string, wordLimit: number): string {
    const text = html.replace(/<[^>]+>/g, "");
    const words = text.split(/\s+/).slice(0, wordLimit).join(" ");
    return words + "...";
  }

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts", { method: "GET" });
      if (!res.ok) throw new Error("Failed to fetch posts");

      const data = await res.json();
      console.log("Fetched posts:", data);
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

  if (loading)
    return (
      <p className="text-center mt-10">
        <TypingText
          text={["Loading posts..."]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
          className="text-4xl font-bold"
          textColors={["black"]}
          variableSpeed={{ min: 50, max: 120 }}
        />
      </p>
    );

  if (posts.length === 0)
    return (
      <p className="text-center mt-10 text-gray-500">
        <TypingText
          text={["No posts available."]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
          className="text-4xl font-bold"
          textColors={["black"]}
          variableSpeed={{ min: 50, max: 120 }}
        />
      </p>
    );

  return (
    <div className="w-screen max-w-3xl mx-auto mt-6 space-y-6">
      {posts.map((post) => (
        <div
          key={post._id}
          className="border p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-all overflow-x-clip cursor-pointer"
        >
          {/* Author Section */}
          <div className="flex items-center gap-2 mb-2">
            <img
              src={post?.userId?.image || "/default-avatar.png"}
              alt={post?.userId?.name ?? "User"}
              className="w-7 h-7 rounded-full object-cover"
            />
            <p className="text-sm text-gray-500">
              {post?.userId?.name ?? "Anonymous"}
            </p>
          </div>

          {/* ✅ Only this text is clickable now */}
          <Link href={`/detailposts?postId=${post._id}`}>
            <div
              className="prose prose-lg max-w-3xl mx-auto prose-img:rounded-2xl prose-img:shadow-md"
              dangerouslySetInnerHTML={{
                __html: truncateWords(post.content, 10),
              }}
            />
          </Link>

          {/* Date Section */}
          <p className="text-xs text-gray-400 mt-2">
            {post.createdAt
              ? new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  timeZone: "UTC",
                })
              : ""}
          </p>

          {/* ✅ Stop event bubbling so clap doesn’t open post */}
          <div
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <ClapButton postId={post._id} initialClaps={post.claps ?? 0} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
