"use client";

import { useState } from "react";
import { deletePost } from "@/lib/deletepost";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
}

export default function DeletePostButton({ id }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      setLoading(true);
      await deletePost(id);

      alert("Post deleted successfully!");

      router.push("/home"); // Redirect to home after deletion
      router.refresh(); // Refresh UI
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="px-4 py-2 bg-green-600 text-white rounded-2xl"
    >
      {loading ? "Deleting..." : "Delete Post"}
    </button>
  );
}
