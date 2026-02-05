"use client"

export default function LoginPage() {
  async function login(formData: FormData) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password")
      })
    })
    if (res.ok) location.href = "/"
    else alert("Login fehlgeschlagen")
  }

  return (
    <form action={login}>
      <input name="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Passwort" />
      <button type="submit">Login</button>
    </form>
  )
}
