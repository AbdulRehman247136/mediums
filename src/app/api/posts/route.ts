import { NextResponse } from "next/server";
import connectDB from "@/lib/db";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // ✅ Correct path
import Post from "@/models/post";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    await connectDB();
    const { content } = await req.json();

    const user = await User.findOne({ email: session.user?.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const newPost = await Post.create({
      content,
      userId: user.id,
   
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
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const user = await User.findOne({ email: session.user?.email });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // Fetch posts with user data populated
  const posts = await Post.find({ userId: user._id })
    .populate("userId", "name email image") // 👈 populate specific fields
    .exec();

  return NextResponse.json(posts);
}
