import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { signToken } from "@/lib/jwt"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { email, password } = await req.json()
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: "Invalid login" }, { status: 401 })
  }

  const token = signToken({ id: user.id, role: user.role })
  const res = NextResponse.json({ success: true })

  res.cookies.set("token", token, {
    httpOnly: true,
    path: "/"
  })

  return res
}
