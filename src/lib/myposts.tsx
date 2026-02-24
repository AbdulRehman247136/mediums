"use client";
import ClapButton from "@/components/clapbutton/clapbutton";
import DeletePostButton from "@/components/DeleteButton";
import TypingText from "@/components/ui/shadcn-io/typing-text";
import { Delete } from "lucide-react";
import React, { useEffect, useState } from "react";


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

const MyPost = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/Personalposts", { method: "GET" });
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

  if (loading) return <p className="text-center mt-10">

    <TypingText
      text={["Loading posts..."]}
      typingSpeed={75}
      pauseDuration={1500}
      showCursor={true}
      cursorCharacter="|"
      className="text-4xl font-bold"
      textColors={['black']}
      variableSpeed={{ min: 50, max: 120 }}
    /></p>;

  if (posts.length === 0)
    return <p className="text-center mt-10 text-gray-500"> <TypingText
      text={["No posts available."]}
      typingSpeed={75}
      pauseDuration={1500}
      showCursor={true}
      cursorCharacter="|"
      className="text-4xl font-bold"
      textColors={['black']}
      variableSpeed={{ min: 50, max: 120 }}
    /></p>;

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 space-y-6">
      {posts.map((post) => (
        <div
          key={post._id}
          className="border p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-all"
        >
          <img
            src={post?.userId?.image}
            alt="User"
            className="w-7 h-7 rounded-full object-cover"
          />

          <div
            className="prose prose-gray max-w-none mt-2 gap-2.5"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <p className="text-sm text-gray-500 mt-3">
            {post.userId?.name}
          </p>

          <p className="text-xs text-gray-400">
            {post.createdAt
              ? new Date(post.createdAt).toLocaleDateString("en-GB", {
                timeZone: "UTC",
              })
              : ""}
          </p>

          <div className="mt-3">
            <ClapButton postId={post._id} initialClaps={post.claps ?? 0} />
          </div>

          {/* ✅ Delete Button placed correctly */}
          <div className="mt-3">
            <DeletePostButton id={post._id} />
          </div>
        </div>

      ))}
    </div>
  );
};


export default MyPost;
