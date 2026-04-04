"use client";

import { useState } from "react";
import type { ContactFormLabels } from "@/content/site/types";

type AzurioContactFormProps = {
  labels: ContactFormLabels;
};

export function AzurioContactForm({ labels }: AzurioContactFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(form.get("name") ?? ""),
          email: String(form.get("email") ?? ""),
          subject: String(form.get("subject") ?? "") || String(form.get("phone") ?? ""),
          message: String(form.get("message") ?? ""),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed");
      }

      event.currentTarget.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="contact-form-clean" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          <span>{labels.name}</span>
          <input type="text" name="name" required />
        </label>

        <label>
          <span>{labels.subject}</span>
          <input type="text" name="subject" />
        </label>

        <label>
          <span>{labels.email}</span>
          <input type="email" name="email" required />
        </label>

        <label>
          <span>Telefon</span>
          <input type="tel" name="phone" />
        </label>

        <label className="form-grid__full">
          <span>{labels.message}</span>
          <textarea name="message" rows={7} required />
        </label>
      </div>

      <div className="form-actions">
        <button className="button button--primary" type="submit">
          {status === "sending" ? labels.sending : labels.submit}
        </button>

        {status === "success" ? <p className="form-message form-message--success">{labels.success}</p> : null}
        {status === "error" ? <p className="form-message form-message--error">{labels.error}</p> : null}
      </div>
    </form>
  );
}
