import connectDB from "@/lib/db";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
  try {
    const { postId } = await req.json();

    if (!postId) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    await connectDB();

    // Find post and increment views
    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    post.views = (post.views || 0) + 1;
    await post.save();

    return NextResponse.json({ success: true, views: post.views });
  } catch (error) {
    console.error("Error updating post views:", error);
    return NextResponse.json({ error: "Failed to update views" }, { status: 500 });
  }
}
