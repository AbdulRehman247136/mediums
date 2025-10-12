"use client";

import React, { useEffect, useState } from "react";
import FroalaEditorComponent from "react-froala-wysiwyg";
import "froala-editor/js/plugins.pkgd.min.js";


// Froala CSS
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";

const FroalaEditor: React.FC = () => {
  const [content, setContent] = useState<string>("");

  const handleSubmit = async () => {
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (res.ok) {
     
      setContent("");
    } else {
        alert("❌ Failed to save post.");
    }
  };

  useEffect(() => {
    localStorage.setItem("draft", content);
  }, [content]);

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
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
