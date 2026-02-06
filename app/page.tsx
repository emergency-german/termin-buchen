import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/jwt";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FormEvent } from "react";

export const metadata = {
  title: "Login",
};

export default function LoginPage() {
  // Server Action für Login
  async function loginAction(formData: FormData) {
    "use server"; // Server Action

    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    if (!email || !password) {
      throw new Error("Email und Passwort müssen ausgefüllt sein");
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid password");

    const token = await signToken({ id: user.id, role: user.role }, "7d");

    // HttpOnly Cookie setzen
    cookies().set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 Tage
    });

    // Redirect nach erfolgreichem Login
    redirect("/admin");
  }

  return (
    <div className="login-wrapper">
      <form className="form" action={loginAction}>
        <p id="heading">Login</p>

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
          <button className="button1" type="submit">Login</button>
          <button className="button2" type="button">Sign Up</button>
        </div>

        <button className="button3" type="button">Forgot Password</button>
      </form>
    </div>
  );
}
