"use client";

import { FormEvent, useState } from "react";
import type { LocaleCode } from "@/lib/site-config";

type ContactFormSectionProps = {
  locale: LocaleCode;
  title: string;
  subtitle: string;
  phone: string;
  email: string;
  address: string;
  form: {
    name: string;
    email: string;
    subject: string;
    message: string;
    submit: string;
    subjectOptions: {
      project: string;
      service: string;
      budget: string;
      support: string;
    };
    success: string;
    error: string;
    sending: string;
  };
};

export function ContactFormSection({
  locale,
  title,
  subtitle,
  phone,
  email,
  address,
  form,
}: ContactFormSectionProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const labels =
    locale === "en"
      ? { kicker: "Contact", phone: "Phone", email: "Email", address: "Address" }
      : { kicker: "Kontakt", phone: "Telefon", email: "Email", address: "Adresa" };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setStatus("sending");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: (formData.get("contact-name") || "") as string,
          email: (formData.get("contact-email") || "") as string,
          subject: (formData.get("subject") || "") as string,
          message: (formData.get("contact-message") || "") as string,
        }),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || form.error);
      }

      setStatus("success");
      setFeedback(data.message || form.success);
      event.currentTarget.reset();
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : form.error);
    }
  };

  return (
    <section className="mxd-section">
      <div className="mxd-section-head">
        <p className="mxd-kicker">{labels.kicker}</p>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <div className="mxd-card-grid mxd-contact-grid">
        <article className="mxd-card">
          <h3>{labels.phone}</h3>
          <a href={`tel:${phone.replace(/\s+/g, "")}`}>{phone}</a>
        </article>
        <article className="mxd-card">
          <h3>{labels.email}</h3>
          <a href={`mailto:${email}`}>{email}</a>
        </article>
        <article className="mxd-card">
          <h3>{labels.address}</h3>
          <a href="https://www.google.com/maps?q=Dimitrija+Leka+66" target="_blank" rel="noreferrer">
            {address}
          </a>
        </article>
      </div>

      <form className="mxd-contact-form" onSubmit={onSubmit}>
        <input type="text" name="contact-name" placeholder={form.name} required />
        <input type="email" name="contact-email" placeholder={form.email} required />
        <select name="subject" aria-label={form.subject} required>
          <option value="">{form.subject}</option>
          <option value="project">{form.subjectOptions.project}</option>
          <option value="service">{form.subjectOptions.service}</option>
          <option value="budget">{form.subjectOptions.budget}</option>
          <option value="support">{form.subjectOptions.support}</option>
        </select>
        <textarea name="contact-message" placeholder={form.message} required />
        <button type="submit" className="mxd-pill-btn" disabled={status === "sending"}>
          {status === "sending" ? form.sending : form.submit}
        </button>
        {feedback ? <p className={`mxd-form-feedback is-${status}`}>{feedback}</p> : null}
      </form>
    </section>
  );
}
