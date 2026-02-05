import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/auth"

export const dynamic = "force-dynamic"

export async function GET() {
  const user = await requireAuth()
  // Dummy data
  return NextResponse.json({ appointments: [], user })
}

export async function POST(req: NextRequest) {
  const user = await requireAuth("STAFF")
  const body = await req.json()
  // Hier Termin speichern
  return NextResponse.json({ success: true, body })
}
