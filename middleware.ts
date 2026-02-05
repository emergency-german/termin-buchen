// /middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/jwt";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get("token")?.value;

  // If no token, let the request continue (public pages)
  if (!token) return NextResponse.next();

  try {
    const payload = await verifyToken(token);

    // Protect admin pages
    if (url.pathname.startsWith("/admin") && payload.role !== "ADMIN") {
      url.pathname = "/"; // redirect to home (or /login)
      return NextResponse.redirect(url);
    }

    // Protect staff pages
    if (url.pathname.startsWith("/staff") && !["ADMIN", "STAFF"].includes(payload.role)) {
      url.pathname = "/"; // redirect to home
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (err) {
    // invalid token => continue or redirect to login
    // choose to redirect to login for clarity
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/admin/:path*", "/staff/:path*"],
};
