"use client";

import { useState } from "react";

import styles from "./InquiryFlowV4.module.css";

/**
 * Asks for a login link.
 *
 * Passwordless: the account only ever holds the buyer's own upiti, so
 * possession of the mailbox is proof enough and there is no password to store.
 * The answer is the same whether or not the address is known — see the route.
 */
export function PortalLoginV4() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setState("sending");
    setMessage(null);
    try {
      const response = await fetch("/api/portal/prijava", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as { message?: string };
      setMessage(data.message ?? null);
      setState(response.ok ? "sent" : "error");
    } catch {
      setMessage("Nema veze sa serverom. Pokušaj ponovo.");
      setState("error");
    }
  }

  return (
    <section className={styles.wrap} data-reveal>
      <form className={styles.form} onSubmit={submit} noValidate>
        <label className={styles.field}>
          <span>Email</span>
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="adresa sa koje si slao upit"
          />
          <em className={styles.hint}>
            Šaljemo link za prijavu — bez lozinke. Nalog nije obavezan: svaki upit ima i svoj
            privatni link iz mejla.
          </em>
        </label>

        <div className={styles.actions}>
          <button
            className={styles.submit}
            type="submit"
            disabled={state === "sending"}
            data-cursor="on"
          >
            {state === "sending" ? "Šaljem…" : "Pošalji link"}
          </button>
        </div>

        {message ? (
          <p className={state === "error" ? styles.error : styles.hint}>{message}</p>
        ) : null}
      </form>
    </section>
  );
}
