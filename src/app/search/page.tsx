"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Post {
  _id: string;
  content: string;
  claps: number;
  views: number;
  createdAt: string;
  userId: { name: string }; // optional if populated
}

export default function SearchPage() {
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      setLoading(true);
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    fetchResults();
  }, [query]);

  // Clean HTML tags
  const cleanText = (html: string) => {
    const text = html.replace(/<[^>]+>/g, "");
    return text.replace(/\s+/g, " ").trim();
  };

  // Handle click on a post
  const handleClickPost = async (id: string) => {
    // Increment views
    const viewRes = await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId: id }),
    });
    const viewData = await viewRes.json();
  
    // Fetch full post
    const res = await fetch(`/api/posts/${id}`);
    const data = await res.json();
  
    if (data.post) {
      // update views in UI
      setSelectedPost({ ...data.post, views: viewData.views });
    }
  };
  

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Search results for: <span className="text-blue-600">"{query}"</span>
      </h1>

      {!selectedPost ? (
        // 🔹 Show search results
        <div className="space-y-6">
          {results.map((post) => {
            const plainText = cleanText(post.content);
            const preview =
              plainText.length > 150 ? plainText.slice(0, 150) + "..." : plainText;

            return (
              <div
                key={post._id}
                className="p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition cursor-pointer"
                onClick={() => handleClickPost(post._id)}
              >
                <h2 className="text-lg font-semibold mb-2 line-clamp-2 text-gray-900 hover:text-blue-600">
                  {preview}
                </h2>
                <div className="text-sm text-gray-500 flex justify-between">
                  <span>
                    {new Date(post.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span>
                    {post.views} views • {post.claps} claps
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // 🔹 Show full post
        <div className="p-4 border rounded-xl bg-white shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            {selectedPost.userId?.name || "Author"}
          </h2>
          <div
            className="prose max-w-none text-gray-800 mb-4"
            dangerouslySetInnerHTML={{ __html: selectedPost.content }}
          ></div>
          <div className="text-sm text-gray-500 flex justify-between">
            <span>
              {new Date(selectedPost.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span>
              {selectedPost.views} views • {selectedPost.claps} claps
            </span>
          </div>

          <button
            className="mt-4 px-4 py-2 bg-gray-200 rounded-xl"
            onClick={() => setSelectedPost(null)}
          >
            Back to results
          </button>
        </div>
      )}
    </div>
  );
}
