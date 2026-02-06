"use server";

import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/jwt";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) return { error: "Daten unvollständig" };

  try {
    // Prisma wird NUR hier aufgerufen (Server-Side)
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return { error: "Ungültige Anmeldedaten" };
    }

    const token = await signToken({ id: user.id, role: user.role }, "7d");
    const cookieStore = await cookies();
    
    cookieStore.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  } catch (e) {
    return { error: "Datenbankfehler" };
  }

  // Redirect muss außerhalb des try/catch stehen
  redirect("/admin");
}
