import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/auth"

export const dynamic = "force-dynamic" // zwingt die Route, dynamisch zu sein

export async function GET(request: Request) {
  await requireAuth() // optional: Admin/Staff prüfen
  const appointments = await prisma.appointment.findMany()
  return NextResponse.json(appointments)
}

export async function POST(request: Request) {
  const user = await requireAuth()
  const data = await request.json()

  const appointment = await prisma.appointment.create({
    data: {
      ...data,
      createdBy: user.id
    }
  })

  return NextResponse.json(appointment)
}
