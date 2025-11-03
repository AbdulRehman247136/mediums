import connectDB from "@/lib/db";
import Post from "@/models/post";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const { userId, name } = await req.json();

    if (!id || !userId) {
      return NextResponse.json({ message: "Missing post ID or user ID" }, { status: 400 });
    }

    await connectDB();
    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    // ✅ Ensure likedids is always an array
    if (!Array.isArray(post.likedids)) {
      post.likedids = [];
    }

    // ✅ Safe check (skip undefined entries)
    const alreadyLiked = post.likedids.some(
      (like) => like?.userId?.toString() === userId
    );

    if (alreadyLiked) {
      // 👎 Unlike
      post.likedids = post.likedids.filter(
        (like) => like?.userId?.toString() !== userId
      );
      post.claps = Math.max((post.claps || 1) - 1, 0);
    } else {
      // 👍 Like
      post.likedids.push({
        userId: new Types.ObjectId(userId),
        name: name || "Anonymous",
      });
      post.claps = (post.claps || 0) + 1;
    }

    await post.save();

    return NextResponse.json({
      success: true,
      newClapCount: post.claps,
      likedBy: post.likedids,
    });
  } catch (error) {
    console.error("❌ Error in PATCH /api/posts/[id]/clap:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
