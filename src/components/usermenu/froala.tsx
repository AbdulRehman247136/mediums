"use client";

import React, { useEffect, useState, useRef } from "react";
import FroalaEditorComponent from "react-froala-wysiwyg";
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import { useSession } from "next-auth/react";

interface FroalaEditorProps {
  onTypingStatusChange?: (status: "idle" | "typing" | "typed") => void;
}

const FroalaEditor: React.FC<FroalaEditorProps> = ({ onTypingStatusChange }) => {
  const [content, setContent] = useState<string>("");
  const [hasTyped, setHasTyped] = useState<boolean>(false);
  const [loadedFromDraft, setLoadedFromDraft] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  // ✅ Load saved draft
  useEffect(() => {
    const saved = localStorage.getItem("draft");
    if (saved) {
      setContent(saved);
      setLoadedFromDraft(true);
    }
  }, []);

  // ✅ Save or delete draft on content change
  useEffect(() => {
    const trimmed = content.trim();

    if (trimmed.length === 0) {
      localStorage.removeItem("draft");
    } else if (hasTyped) {
      localStorage.setItem("draft", content);
    }
  }, [content, hasTyped]);

  // ✅ Handle typing detection
  const handleContentChange = (newContent: string) => {
    if (loadedFromDraft) setLoadedFromDraft(false);
    setContent(newContent);

    if (!hasTyped && newContent.trim() !== "") setHasTyped(true);

    onTypingStatusChange?.("typing");
    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      onTypingStatusChange?.("typed");
    }, 2000);
  };

  // ✅ Handle publish (send clean HTML to DB)
  const handlePublish = async () => {
    if (!session) {
      alert("⚠️ Please login first!");
      return;
    }

    const cleanContent = content.trim();
    if (!cleanContent) {
      alert("⚠️ Nothing to publish!");
      return;
    }

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: cleanContent }),
    });

    if (res.ok) {
      alert("✅ Post published successfully!");
      setContent("");
      localStorage.removeItem("draft");
      onTypingStatusChange?.("idle");
      setHasTyped(false);
    } else {
      alert("❌ Failed to publish post!");
    }
  };

  if (status === "loading") return <p>Loading session...</p>;

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
      {/* 📝 Froala Editor */}
      <div className="border rounded-md p-2 shadow-sm">
        <FroalaEditorComponent
          tag="textarea"
          model={content}
          onModelChange={handleContentChange}
          config={{
            placeholderText: "Start writing your story...",
            heightMin: 300,
            enter: 1, // 👈 use <div> instead of <p>
            imageUploadURL: "/api/upload", // ✅ Cloudinary upload API
            imageUploadMethod: "POST",
            imageAllowedTypes: ["jpeg", "jpg", "png"],
            imageMaxSize: 5 * 1024 * 1024, // 5MB limit
            toolbarButtons: [
              "bold",
              "italic",
              "underline",
              "insertLink",
              "undo",
              "redo",
              "align",
              "paragraphFormat",
              "headings",
              "insertImage", // 👈 enable image upload
            ],
            events: {
             "image.inserted": function ($img: JQuery<HTMLImageElement>) {
                 console.log("✅ Image inserted:", $img[0].src);
              
                },

              "image.error": function (error: unknown) {
                console.error("❌ Image upload failed:", error);
              },
            },
          }}
        />
      </div>

      {/* 🚀 Publish Button */}
      <div className="flex justify-end">
        <button
          onClick={handlePublish}
          disabled={!content.trim()}
          className={`px-5 py-2 rounded-lg transition-all ${
            content.trim()
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default FroalaEditor;
