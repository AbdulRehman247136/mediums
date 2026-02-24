import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Post from "@/models/post";

export async function GET() {
  try {
    await connectDB();

    const posts = await Post.find({}, "views createdAt").sort({ createdAt: 1 });

    // ✅ Aggregate views by date
    const aggregatedData: Record<string, number> = {};
    posts.forEach((post) => {
      const date = new Date(post.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      aggregatedData[date] = (aggregatedData[date] || 0) + (post.views || 0);
    });

    const chartData = Object.entries(aggregatedData).map(([date, views]) => ({
      date,
      views,
    }));


    return NextResponse.json(chartData);
  } catch (error) {
    console.error("Error fetching chart data:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
