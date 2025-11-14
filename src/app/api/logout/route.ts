import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();  // 👈 MUST AWAIT THIS

  cookieStore.delete("next-auth.csrf-token");
  cookieStore.delete("next-auth.session-token");
  cookieStore.delete("__Secure-next-auth.session-token");

  return NextResponse.json({ message: "Token removed" });
}
