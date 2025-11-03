import connectDB from "@/lib/db";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> } // 👈 params is now a Promise
) {
  try {
    const { id } = await context.params; // 👈 must await it

    await connectDB();
    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
