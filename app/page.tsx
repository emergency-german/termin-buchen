"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

export default function LoginPage() {
  // state enthält die Rückgabewerte der Action (z.B. Fehler)
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="login-wrapper">
      <form className="form" action={formAction}>
        <p id="heading">Login</p>
        
        {state?.error && <p style={{ color: "red" }}>{state.error}</p>}

        <div className="field">
          <input name="email" placeholder="Email" className="input-field" type="email" required />
        </div>

        <div className="field">
          <input name="password" placeholder="Password" className="input-field" type="password" required />
        </div>

        <div className="btn">
          <button className="button1" type="submit" disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}
