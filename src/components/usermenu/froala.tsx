"use client";

import React, { useEffect, useState } from "react";
import FroalaEditorComponent from "react-froala-wysiwyg";
import "froala-editor/js/plugins.pkgd.min.js";

// Froala CSS
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";

import { useSession } from "next-auth/react";

const FroalaEditor: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const { data: session, status } = useSession();

  const handleSubmit = async () => {
    if (!session) {
      alert("⚠️ Please login first!");
      return;
    }

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
       
          name: session.user?.name,
          email: session.user?.email,
          image: session.user?.image,
      
      }),
    });

    if (res.ok) {
      alert("✅ Post published successfully!");
      setContent("");
    } else {
      const err = await res.json();
      console.error("❌ Failed to save post:", err);
      alert("❌ Failed to save post.");
    }
  };

  useEffect(() => {
    localStorage.setItem("draft", content);
  }, [content]);

  if (status === "loading") return <p>Loading session...</p>;

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
      {session && (
        <div className="flex items-center gap-3 mb-3">
          <img
            src={session.user?.image ?? ""}
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">{session.user?.name}</p>
            <p className="text-sm text-gray-500">{session.user?.email}</p>
          </div>
        </div>
      )}

      <div className="border rounded-md p-2 shadow-sm">
        <FroalaEditorComponent
          tag="textarea"
          model={content}
          onModelChange={setContent}
          config={{
            placeholderText: "Start writing your story...",
            heightMin: 300,
            toolbarButtons: [
              "bold",
              "italic",
              "underline",
              "insertLink",
              "undo",
              "redo",
              "align",
              "paragraphFormat",
              "heading",
              "formatOL",
              "formatUL",
              "quote",
            ],
          }}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-5 py-2 rounded-lg self-end hover:bg-green-700 transition-all"
      >
        Publish
      </button>
    </div>
  );
};

export default FroalaEditor;
