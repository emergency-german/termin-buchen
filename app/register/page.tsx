import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/jwt";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  async function registerAction(formData: FormData) {
    "use server";

    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    if (!email || !password) {
      throw new Error("Email und Passwort sind erforderlich");
    }

    // Prüfen ob User existiert
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User existiert bereits");
    }

    // Passwort hashen
    const hashedPassword = await bcrypt.hash(password, 10);

    // User erstellen
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "USER",
      },
    });

    // JWT erstellen
    const token = await signToken(
      { id: user.id, role: user.role },
      "7d"
    );

    // Cookie setzen (Next 16 async fix)
    const cookieStore = await cookies();
    cookieStore.set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    // Direkt weiterleiten
    redirect("/");
  }

  return (
    <div className="login-wrapper">
      <form className="form" action={registerAction}>
        <p id="heading">Konto erstellen</p>

        <div className="field">
          <input
            name="email"
            placeholder="Email"
            className="input-field"
            type="email"
            required
          />
        </div>

        <div className="field">
          <input
            name="password"
            placeholder="Password"
            className="input-field"
            type="password"
            required
          />
        </div>

        <div className="btn">
          <button className="button1" type="submit">
            Registrieren
          </button>

          <Link href="/" className="button2">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
