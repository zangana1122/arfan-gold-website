import { NextResponse } from "next/server";
import { login, getCookieName } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const ok = await login(password);
    if (!ok) {
      return NextResponse.json({ error: "وشەی نهێنی هەڵەیە" }, { status: 401 });
    }
    const response = NextResponse.json({ success: true });
    response.cookies.set(getCookieName(), "authenticated", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
