"use client";

import { useState } from "react";

/**
 * The four things the owner does with a contact, one click each: write, call,
 * WhatsApp, copy the address into whatever else is open.
 *
 * WhatsApp is here because it is how half of Serbian small business actually
 * answers — an unanswered mail is often a WhatsApp that was never sent.
 */

const digitsOnly = (phone: string) => phone.replace(/[^\d+]/g, "").replace(/^\+/, "");

export function ContactBar({
  email,
  phone,
  subject,
  extra,
}: {
  email: string | null;
  phone: string | null;
  subject?: string;
  /** Rendered after the built-ins — a status link, a portal link, whatever. */
  extra?: React.ReactNode;
}) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (value: string, what: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(what);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      setCopied(null);
    }
  };

  const valid = email && email !== "—" ? email : null;

  return (
    <div className="os-actions">
      {valid ? (
        <a
          className="os-btn os-btn--sm"
          href={`mailto:${valid}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`}
        >
          Mejl klijentu
        </a>
      ) : null}
      {phone ? (
        <a className="os-btn os-btn--ghost os-btn--sm" href={`tel:${phone}`}>
          Pozovi
        </a>
      ) : null}
      {phone ? (
        <a
          className="os-btn os-btn--ghost os-btn--sm"
          href={`https://wa.me/${digitsOnly(phone)}`}
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp
        </a>
      ) : null}
      {valid ? (
        <button
          type="button"
          className="os-btn os-btn--ghost os-btn--sm"
          onClick={() => copy(valid, "email")}
        >
          {copied === "email" ? "Kopirano" : "Kopiraj mejl"}
        </button>
      ) : null}
      {extra}
    </div>
  );
}

/** Standalone copy button for links (status page, portal). */
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="os-btn os-btn--ghost os-btn--sm"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          setCopied(false);
        }
      }}
    >
      {copied ? "Kopirano" : label}
    </button>
  );
}
