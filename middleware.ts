import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "./lib/jwt"

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  const token = req.cookies.get("token")?.value

  // Wenn kein Token vorhanden, normale Seite
  if (!token) return NextResponse.next()

  let payload: { id: string; role: string; iat: number; exp: number } | null = null
  try {
    payload = await verifyToken(token)
  } catch {
    // Token ungültig -> einfach weiterleiten
    return NextResponse.next()
  }

  // Admin/Staff Check
  if (url.pathname.startsWith("/admin") && payload.role !== "ADMIN") {
    url.pathname = "/" // normale Seite
    return NextResponse.redirect(url)
  }

  if (url.pathname.startsWith("/staff") && !["ADMIN", "STAFF"].includes(payload.role)) {
    url.pathname = "/" // normale Seite
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// Middleware nur auf Admin/Staff-Pages anwenden
export const config = {
  matcher: ["/admin/:path*", "/staff/:path*"]
}
