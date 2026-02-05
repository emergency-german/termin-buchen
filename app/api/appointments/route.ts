// /app/api/appointments/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  // only accessible to authenticated users (or adjust role)
  const user = await requireAuth();
  const appointments = await prisma.appointment.findMany();
  return NextResponse.json({ appointments, user });
}

export async function POST(req: Request) {
  // example: only STAFF or ADMIN can create via API
  const user = await requireAuth("STAFF");
  const body = await req.json();

  const appointment = await prisma.appointment.create({
    data: {
      date: new Date(body.date),
      status: body.status ?? "BOOKED",
      // store relation fields if present
      userId: body.userId ?? null,
      staffId: body.staffId ?? null,
    },
  });

  return NextResponse.json(appointment);
}
