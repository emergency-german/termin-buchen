"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

export default function LoginPage() {
  // state empfängt das { error: "..." } Objekt vom Server
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="login-wrapper">
      <form action={formAction} className="form">
        <p id="heading">Login</p>
        
        {state?.error && <div className="error-msg">{state.error}</div>}

        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Passwort" required />

        <button type="submit" disabled={isPending}>
          {isPending ? "Prüfe..." : "Anmelden"}
        </button>
      </form>
    </div>
  );
}
