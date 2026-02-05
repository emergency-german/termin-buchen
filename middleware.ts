import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/jwt"

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  const token = req.cookies.get("token")?.value

  // Nur bestimmte Pfade schützen
  if (url.pathname.startsWith("/admin") || url.pathname.startsWith("/staff")) {
    if (!token) {
      // Kein Token → Login Seite
      url.pathname = "/login"
      return NextResponse.redirect(url)
    }

    try {
      const payload = verifyToken(token)

      // Admin/Staff Check
      if (url.pathname.startsWith("/admin") && payload.role !== "ADMIN") {
        url.pathname = "/" // normale Seite
        return NextResponse.redirect(url)
      }

      if (url.pathname.startsWith("/staff") && !["ADMIN", "STAFF"].includes(payload.role)) {
        url.pathname = "/"
        return NextResponse.redirect(url)
      }

    } catch (err) {
      // Token invalid
      url.pathname = "/login"
      return NextResponse.redirect(url)
    }
  }

  // Alles andere → normal weiter
  return NextResponse.next()
}

// Middleware auf Admin & Staff Pfade anwenden
export const config = {
  matcher: ["/admin/:path*", "/staff/:path*"]
}
