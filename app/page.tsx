"use client";

import { useActionState, useState } from "react";
import { loginAction, registerAction } from "./actions";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  
  // Wählt die passende Action basierend auf dem Modus
  const currentAction = isRegister ? registerAction : loginAction;
  const [state, formAction, isPending] = useActionState(currentAction, null);

  return (
    <div className="login-wrapper">
      <form className="form" action={formAction}>
        <p id="heading">{isRegister ? "Registrieren" : "Login"}</p>

        {state?.error && (
          <p className="error-message">
            {state.error}
          </p>
        )}

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
          <button className="button1" type="submit" disabled={isPending}>
            {isPending ? "Warten..." : isRegister ? "Account erstellen" : "Anmelden"}
          </button>
          
          <button 
            className="button2" 
            type="button" 
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Zum Login" : "Registrieren"}
          </button>
        </div>

        {!isRegister && (
          <button className="button3" type="button">
            Forgot Password
          </button>
        )}
      </form>
    </div>
  );
}
