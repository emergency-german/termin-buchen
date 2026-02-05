import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/jwt"

export async function middleware(req: NextRequest) { // <-- async!
  const url = req.nextUrl.clone()
  const token = req.cookies.get("token")?.value

  if (url.pathname.startsWith("/admin") || url.pathname.startsWith("/staff")) {
    if (!token) {
      url.pathname = "/login"
      return NextResponse.redirect(url)
    }

    try {
      const payload = await verifyToken(token) // <-- await hier

      // Admin/Staff Check
      if (url.pathname.startsWith("/admin") && payload.role !== "ADMIN") {
        url.pathname = "/"
        return NextResponse.redirect(url)
      }

      if (url.pathname.startsWith("/staff") && !["ADMIN", "STAFF"].includes(payload.role)) {
        url.pathname = "/"
        return NextResponse.redirect(url)
      }

    } catch (err) {
      url.pathname = "/login"
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/staff/:path*"]
}
