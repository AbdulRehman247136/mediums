// app/detailposts/DetailPostClient.tsx
"use client";
import { Suspense } from 'react'
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PostDetail, { Post } from "@/components/posts/PostDetail";

interface ApiResponse {
  post: Post | null;
}

export default function DetailPostClient() {
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${postId}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch post");
        const data: ApiResponse = await res.json();
        setPost(data.post);
      } catch (err) {
        console.error("Error fetching post:", err);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) return <Suspense fallback={<>loading ...</>}><div className="p-5 text-center">Loading post...</div></Suspense>;
  if (!post) return <Suspense fallback={<>loading ...</>}><div className="p-5 text-center text-red-500">Post not found</div></Suspense>;

  return <Suspense fallback={<>loading ...</>}><PostDetail post={post} /></Suspense>;
}
