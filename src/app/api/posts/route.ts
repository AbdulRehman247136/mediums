import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Post, { IPost } from "@/models/post";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { content, author }: Partial<IPost> = await req.json();

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    const post = await Post.create({ content, author });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

// export async function GET() {
//   try {
//     await connectDB();
//     const posts = await Post.find().sort({ createdAt: -1 });
//     return NextResponse.json(posts, { status: 200 });
//   } catch (error) {
//     console.error("GET error:", error);
//     return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
//   }
// }
