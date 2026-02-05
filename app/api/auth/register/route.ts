import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { email, password } = await req.json()
  const hash = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: { email, password: hash }
  })

  return NextResponse.json({ success: true })
}
