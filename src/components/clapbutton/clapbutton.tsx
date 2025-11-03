"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

interface ClapButtonProps {
  postId: string;
  initialClaps: number;
}

export default function ClapButton({ postId, initialClaps }: ClapButtonProps) {
  const [claps, setClaps] = useState(initialClaps);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const userId = session?.user?.id;


  // 🔹 Optional: Keep track of local claps per session
  useEffect(() => {
    const fetchClaps = async () => {
      const res = await fetch(`/api/posts/${postId}`);
      if (res.ok) {
        const data = await res.json();
        setClaps(data.post?.claps || 0);
      }
    };
    fetchClaps();
  }, [postId]);

  // ✅ Allow multiple claps per user
  const handleClap = async () => {
    setLoading(true);

    try {
      const res = await fetch(`/api/posts/${postId}/clap`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId,name:session?.user?.name }),
      });

      if (!res.ok) throw new Error("Failed to add clap");

      const data = await res.json();

      // Increment clap count immediately
      setClaps((prev) => prev + 1);

      // Optionally sync with backend value
      if (data.newClapCount !== undefined) {
        setClaps(data.newClapCount);
      }
    } catch (error) {
      console.error("❌ Error adding clap:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClap}
      disabled={loading}
      className={`flex items-center gap-2 px-3 py-1 rounded-full transition 
        bg-gray-100 hover:bg-gray-200 active:scale-95 
        disabled:opacity-60`}
    >
      👏 <span>{claps}</span>
    </button>
  );
}
