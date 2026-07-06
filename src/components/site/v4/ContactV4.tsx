"use client";

import { useState } from "react";
import { PageShellV4 } from "./PageShellV4";
import styles from "./ContactV4.module.css";

/**
 * Contact page — OBSIDIAN styled form posting to /api/contact, plus direct
 * channels and what-happens-next reassurance.
 */

const STEPS = [
  { num: "01", text: "Javimo se u roku od 24h — bez auto-odgovora." },
  { num: "02", text: "Kratak poziv od 30 minuta da razumemo cilj i rok." },
  { num: "03", text: "Klikabilan prototip i jasna cena — pre ugovora." },
];

export function ContactV4() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(form.get("name") ?? ""),
          email: String(form.get("email") ?? ""),
          subject: String(form.get("subject") ?? "") || String(form.get("phone") ?? ""),
          message: String(form.get("message") ?? ""),
        }),
      });
      if (!res.ok) throw new Error("Failed");
      event.currentTarget.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <PageShellV4
      eyebrow="Kontakt / Hajde da počnemo"
      title={
        <>
          RECI CILJ,
          <br />
          VRAĆAMO PLAN<span className={styles.dot}>.</span>
        </>
      }
      intro="Besplatan poziv od 30 minuta. Kažemo vam tačno šta bi vam donelo najviše klijenata ili uštedelo najviše vremena — pre nego što potrošite dinar."
    >
      <section className={styles.wrap} data-reveal>
        <div className={styles.grid}>
          {/* Left — direct channels */}
          <aside className={styles.side}>
            <div className={styles.channel}>
              <span className={styles.channelLabel}>Email</span>
              <a className={styles.channelValue} href="mailto:djordje@adspire.rs" data-cursor="on">
                djordje@adspire.rs
              </a>
            </div>
            <div className={styles.channel}>
              <span className={styles.channelLabel}>Telefon</span>
              <a className={styles.channelValue} href="tel:+381601491491" data-cursor="on">
                +381 60 149 149 1
              </a>
            </div>
            <div className={styles.channel}>
              <span className={styles.channelLabel}>Lokacija</span>
              <span className={styles.channelValue}>Niš, Srbija</span>
            </div>
            <div className={styles.channel}>
              <span className={styles.channelLabel}>Jezici</span>
              <span className={styles.channelValue}>SR · EN · DE</span>
            </div>

            <div className={styles.steps}>
              {STEPS.map((s) => (
                <div key={s.num} className={styles.step}>
                  <span className={styles.stepNum}>{s.num}</span>
                  <span className={styles.stepText}>{s.text}</span>
                </div>
              ))}
            </div>
          </aside>

          {/* Right — form */}
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <label className={styles.field}>
                <span>Ime i prezime</span>
                <input type="text" name="name" required />
              </label>
              <label className={styles.field}>
                <span>Firma / projekat</span>
                <input type="text" name="subject" />
              </label>
            </div>
            <div className={styles.formRow}>
              <label className={styles.field}>
                <span>Email</span>
                <input type="email" name="email" required />
              </label>
              <label className={styles.field}>
                <span>Telefon</span>
                <input type="tel" name="phone" />
              </label>
            </div>
            <label className={styles.field}>
              <span>O čemu se radi?</span>
              <textarea name="message" rows={6} required />
            </label>

            <div className={styles.actions}>
              <button
                className={styles.submit}
                type="submit"
                data-cursor="on"
                data-magnetic
                disabled={status === "sending"}
              >
                {status === "sending" ? "Šaljem…" : "Pošalji poruku →"}
              </button>
              {status === "success" ? (
                <p className={styles.msgOk}>Stiglo je. Javljamo se u roku od 24h.</p>
              ) : null}
              {status === "error" ? (
                <p className={styles.msgErr}>
                  Nešto nije prošlo. Piši direktno na djordje@adspire.rs.
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </section>
    </PageShellV4>
  );
}
