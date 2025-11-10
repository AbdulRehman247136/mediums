import connectDB from "@/lib/db";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    // Get top 3 posts sorted by views (descending)
    const topPosts = await Post.find({})
      .sort({ views: -1 }) // sort by most views
      .limit(3)
      .select("content views userId") // pick fields you need
      .populate("userId", "name image"); // populate author's name

    return NextResponse.json(topPosts);
  } catch (error) {
    console.error("Error fetching top posts:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
