import connectDB from "@/lib/db";
import Post from "@/models/post";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> } // 👈 params is now a Promise
) {
  try {
    const { id } = await context.params; // 👈 must await it

    await connectDB();
    const post = await Post.findById(id)
    .populate("userId", "name email image") // 👈 populate specific fields
    .exec();

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

   
    console.log("this is the detail post",post)

    return NextResponse.json({ post});
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
