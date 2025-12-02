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

 

    return NextResponse.json({ post});
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}



//Get Single Delete
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await connectDB();

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json(
        { message: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Post deleted successfully", deletedPost },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}