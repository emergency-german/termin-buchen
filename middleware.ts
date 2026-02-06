import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();

  // 🔒 Kein Token → Redirect
  if (!token) {
    if (url.pathname.startsWith("/admin") || url.pathname.startsWith("/staff")) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  let payload;
  try {
    payload = await verifyToken(token); // ✅ await ist PFLICHT
  } catch {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // 🔐 Rollenprüfung
  if (url.pathname.startsWith("/admin") && payload.role !== "ADMIN") {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (
    url.pathname.startsWith("/staff") &&
    payload.role !== "STAFF" &&
    payload.role !== "ADMIN"
  ) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/staff/:path*"]
};
