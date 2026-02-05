import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, date } = await req.json();

    if (!name || !email || !date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const appointment = await prisma.appointment.create({
      data: {
        name,
        email,
        date: new Date(date),
      },
    });

    return NextResponse.json({ success: true, appointment });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { date: "asc" },
    });

    return NextResponse.json({ appointments });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
