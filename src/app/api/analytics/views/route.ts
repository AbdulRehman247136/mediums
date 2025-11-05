import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Post from "@/models/post";

export async function GET() {
  try {
    await connectDB();

    const posts = await Post.find({}, "views createdAt").sort({ createdAt: 1 });

    // ✅ Format for chart (date + views)
    const chartData = posts.map((post) => ({
      date: new Date(post.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      views: post.views || 0,
    }));
  
    
    return NextResponse.json(chartData);
  } catch (error) {
    console.error("Error fetching chart data:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
