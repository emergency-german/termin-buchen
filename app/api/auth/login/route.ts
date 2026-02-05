import { NextResponse } from "next/server"
import { signToken } from "@/lib/jwt"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  const { email, password } = await req.json()

  // User finden
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

  // Passwort prüfen
  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })

  // JWT erzeugen
  const token = await signToken({ id: user.id, role: user.role }) // <-- await hier

  const res = NextResponse.json({ success: true })

  // Cookie setzen
  res.cookies.set("token", token, {
    httpOnly: true,
    path: "/"
  })

  return res
}
