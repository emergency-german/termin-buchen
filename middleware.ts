import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "./lib/jwt"

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  const url = req.nextUrl.clone()

  if (!token) {
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  try {
    const payload = await verifyToken(token)

    if (url.pathname.startsWith("/admin") && payload.role !== "ADMIN") {
      url.pathname = "/"
      return NextResponse.redirect(url)
    }

    if (url.pathname.startsWith("/staff") && payload.role !== "STAFF") {
      url.pathname = "/"
      return NextResponse.redirect(url)
    }

    return NextResponse.next()
  } catch (err) {
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: ["/admin/:path*", "/staff/:path*"]
}
