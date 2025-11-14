import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // Get the NextAuth session token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  console.log("Middleware:", pathname, "Token exists?", !!token); // debug

  // 1️⃣ Redirect logged-in users from landing page
  if (token && pathname === "/") {
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }

  // 2️⃣ Block all pages except "/" for non-logged-in users
  if (!token && pathname !== "/") {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Apply middleware to all pages except Next.js internals and API routes
export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
