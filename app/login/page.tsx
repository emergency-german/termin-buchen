"use client"

export default function LoginPage() {
  async function login(formData: FormData) {
    await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password")
      })
    })
    location.href = "/"
  }

  return (
    <form action={login}>
      <input name="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Passwort" />
      <button>Login</button>
    </form>
  )
}
