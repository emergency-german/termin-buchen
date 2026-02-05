import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  requireAuth() // nur eingeloggte Nutzer

  const { date } = await req.json()
  const appt = await prisma.appointment.create({
    data: { date: new Date(date), status: "BOOKED" }
  })
  return NextResponse.json(appt)
}

export async function GET() {
  requireAuth("STAFF") // nur Mitarbeiter/Admin
  const data = await prisma.appointment.findMany()
  return NextResponse.json(data)
}
