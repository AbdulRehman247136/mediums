"use client";

import { useState } from "react";
import FroalaEditor from "@/components/usermenu/froala";
import Uppernav2 from "@/components/usermenu/writenav";

function Write() {
  const [typingStatus, setTypingStatus] = useState<"typing" | "typed" | "idle">("idle");


  return (
    <div className="h-screen flex flex-col">
      <Uppernav2 typingStatus={typingStatus} />

      <div className="flex-1 flex items-center justify-center">
        <FroalaEditor onTypingStatusChange={setTypingStatus} />
      </div>
    </div>
  );
}

export default Write;
