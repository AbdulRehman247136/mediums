import connectDB from "@/lib/db";
import Post from "@/models/post";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";


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