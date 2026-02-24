"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import Uppernav2 from "@/components/usermenu/writenav";

const FroalaEditor = dynamic(
  () => import("@/components/usermenu/froala"),
  { ssr: false }
);

function Write() {
  const [typingStatus, setTypingStatus] = useState<"typing" | "typed" | "idle">("idle");


  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Uppernav2 typingStatus={typingStatus} />

      <div className="flex-1 flex flex-col">
        <FroalaEditor onTypingStatusChange={setTypingStatus} />
      </div>
    </div>
  );
}

export default Write;
