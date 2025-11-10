import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Post from "@/models/post";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";

    console.log("🔍 Searching for:", q); // 👈 add this

    const posts = await Post.find({
      content: { $regex: q, $options: "i" },
    });

    console.log("✅ Found posts:", posts.length); // 👈 add this

    return NextResponse.json(posts);
  } catch (error) {
    console.error("❌ Search error:", error);
    return NextResponse.json({ error: "Failed to search posts" }, { status: 500 });
  }
}
