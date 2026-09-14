"use client";

import { useState } from "react";

import styles from "./InquiryFlowV4.module.css";

/**
 * Login for the client account: Google first, the email link as the fallback.
 *
 * Both are passwordless — the account only ever holds the buyer's own upiti and
 * hours, so proof of the mailbox is enough. The email answer is the same whether
 * or not the address is known — see the route.
 */
export function PortalLoginV4({ next, google }: { next?: string; google?: boolean }) {
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
        body: JSON.stringify({ email, next }),
      });
      const data = (await response.json()) as { message?: string };
      setMessage(data.message ?? null);
      setState(response.ok ? "sent" : "error");
    } catch {
      setMessage("Nema veze sa serverom. Pokušaj ponovo.");
      setState("error");
    }
  }

  const googleHref = `/api/portal/google${next ? `?next=${encodeURIComponent(next)}` : ""}`;

  return (
    <section className={styles.wrap} data-reveal>
      <div className={styles.form}>
        {google ? (
          <>
            <a className={styles.googleBtn} href={googleHref} data-cta="nalog-google" data-cursor="on">
              <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
              </svg>
              Nastavi sa Google nalogom
            </a>
            <div className={styles.divider} role="separator">
              <span>ili link na mejl</span>
            </div>
          </>
        ) : null}

        <form className={styles.formInner} onSubmit={submit} noValidate>
          <label className={styles.field}>
            <span>Email</span>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={next === "/nalog/edukacija" ? "adresa na koju su dodati sati" : "adresa sa koje si slao upit"}
            />
            <em className={styles.hint}>
              Šaljemo link za prijavu — bez lozinke. Nalog nije obavezan: svaki upit ima i svoj
              privatni link iz mejla.
            </em>
          </label>

          <div className={styles.actions}>
            <button
              className={google ? styles.ghost : styles.submit}
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
      </div>
    </section>
  );
}
