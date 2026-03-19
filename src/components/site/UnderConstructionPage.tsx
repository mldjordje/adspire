"use client";

import { FormEvent, useState } from "react";
import type { LocalizedPageContent } from "@/content/site/types";
import type { LocaleCode } from "@/lib/site-config";
import styles from "./UnderConstructionPage.module.css";

type UnderConstructionPageProps = {
  locale: LocaleCode;
  contact: LocalizedPageContent["contact"];
};

const labelsByLocale = {
  sr: {
    badge: "Adspire",
    title: "Sajt je trenutno u pripremi.",
    description:
      "Radimo na novoj verziji sajta. Ako zelis ponudu, konsultaciju ili vise informacija, javi nam se direktno ili posalji poruku kroz formu ispod.",
    availability: "Odgovaramo u najkracem roku.",
    contactTitle: "Kontakt podaci",
    formTitle: "Posalji poruku",
    formDescription: "Ostavi osnovne podatke i kratku poruku, pa ti se javljamo sto pre.",
    phone: "Telefon",
    email: "Email",
    address: "Adresa",
    submit: "Posalji poruku",
    sending: "Slanje...",
    success: "Poruka je uspesno poslata.",
    error: "Doslo je do greske. Pokusaj ponovo malo kasnije.",
  },
  en: {
    badge: "Adspire",
    title: "The website is currently under construction.",
    description:
      "We are working on a new version of the site. If you need an offer, consultation, or more details, contact us directly or send a quick message below.",
    availability: "We reply as soon as possible.",
    contactTitle: "Contact details",
    formTitle: "Send a message",
    formDescription: "Leave your basic details and a short message, and we will get back to you shortly.",
    phone: "Phone",
    email: "Email",
    address: "Address",
    submit: "Send message",
    sending: "Sending...",
    success: "Message sent successfully.",
    error: "Something went wrong. Please try again later.",
  },
} as const;

export function UnderConstructionPage({
  locale,
  contact,
}: UnderConstructionPageProps) {
  const labels = labelsByLocale[locale];
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setStatus("sending");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: String(formData.get("name") || ""),
          email: String(formData.get("email") || ""),
          subject:
            locale === "en"
              ? "Website under construction inquiry"
              : "Upit sa under construction strane",
          message: String(formData.get("message") || ""),
        }),
      });

      if (!response.ok) {
        throw new Error(labels.error);
      }

      setStatus("success");
      setFeedback(labels.success);
      event.currentTarget.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
      setFeedback(labels.error);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <section className={styles.hero}>
          <span className={styles.badge}>{labels.badge}</span>
          <h1>{labels.title}</h1>
          <p className={styles.description}>{labels.description}</p>
          <p className={styles.availability}>{labels.availability}</p>
        </section>

        <section className={styles.grid}>
          <article className={styles.panel}>
            <h2>{labels.contactTitle}</h2>
            <div className={styles.contactList}>
              <a className={styles.contactItem} href={`tel:${contact.phone.replace(/\s+/g, "")}`}>
                <span>{labels.phone}</span>
                <strong>{contact.phone}</strong>
              </a>
              <a className={styles.contactItem} href={`mailto:${contact.email}`}>
                <span>{labels.email}</span>
                <strong>{contact.email}</strong>
              </a>
              <a
                className={styles.contactItem}
                href="https://www.google.com/maps?q=Dimitrija+Leka+66+Nis"
                target="_blank"
                rel="noreferrer"
              >
                <span>{labels.address}</span>
                <strong>{contact.address}</strong>
              </a>
            </div>
          </article>

          <article className={styles.panel}>
            <h2>{labels.formTitle}</h2>
            <p className={styles.formIntro}>{labels.formDescription}</p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder={contact.form.name} required />
              <input type="email" name="email" placeholder={contact.form.email} required />
              <textarea name="message" placeholder={contact.form.message} rows={5} required />

              <button type="submit" disabled={status === "sending"}>
                {status === "sending" ? labels.sending : labels.submit}
              </button>

              {feedback ? (
                <p className={`${styles.feedback} ${status === "success" ? styles.success : styles.error}`}>
                  {feedback}
                </p>
              ) : null}
            </form>
          </article>
        </section>
      </div>
    </main>
  );
}
