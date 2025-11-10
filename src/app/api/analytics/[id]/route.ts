import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Post from "@/models/post";

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params; // this will be your "userId"

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    await connectDB();

    const posts = await Post.find({ author: id }, "views createdAt").sort({ createdAt: 1 });

    const chartData = posts.map((post) => ({
      date: new Date(post.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      views: post.views || 0,
    }));

    return NextResponse.json(chartData);
  } catch (error) {
    console.error("Error fetching user chart data:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
