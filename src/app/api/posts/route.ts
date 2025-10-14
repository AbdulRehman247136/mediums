import { NextResponse } from "next/server";
import connectDB from "@/lib/db";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // ✅ Correct path
import Post from "@/models/post";

export async function POST(req: Request) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const { content } = await req.json();

    const newPost = await Post.create({
      content,
      
        name: session.user?.name,
        email: session.user?.email,
        image: session.user?.image,
   
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, post: newPost }, { status: 201 });
  } catch (error: unknown) {
    console.error("❌ POST /api/posts error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const posts = await Post.find().sort({ createdAt: -1 });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
