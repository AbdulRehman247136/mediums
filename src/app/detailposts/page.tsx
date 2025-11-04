"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


import PostList from "@/lib/posts";
import PostDetail, { Post } from "@/components/posts/PostDetail";

const DetailPostsPage = () => {
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${postId}`);
        const data = await res.json();
        console.log("get api data ",data.post)
        setPost(data.post);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found</p>;

  return <PostDetail post={post} />;
};

export default DetailPostsPage;
