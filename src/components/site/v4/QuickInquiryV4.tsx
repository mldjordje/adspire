"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import {
  captureFirstTouch,
  createRequestId,
  getSubmissionAttribution,
} from "@/lib/crm/clientAttribution";
import { trackLeadSubmitted } from "@/lib/analytics/events";
import type { InquiryService } from "@/lib/inquiries/catalog";
import { MIN } from "@/lib/inquiries/types";
import styles from "./InquiryFlowV4.module.css";

/**
 * The quick brief — the form behind /upit/brzo.
 *
 * WHY THIS EXISTS BESIDE /upit. The long brief asks a Serbian company for
 * eleven answers, PIB and matični broj among them. That is the right form for
 * someone who has decided and wants a price by Friday. It is the wrong form for
 * a stranger who clicked an ad and wants to know whether their booking problem
 * is solvable at all — they will not open the company register to ask a
 * question, they will close the tab.
 *
 * So this asks five things and nothing else. Everything the long form collects
 * beyond these is billing detail, and billing detail is asked for when there is
 * a quote to issue. Both forms write the same row; `intake` records which one
 * it was, so /os answers a quick upit with a question and a full one with a
 * price.
 *
 * Deliberately NOT here: the draft autosave, the progress bar and the sticky
 * bar of the long form. All three exist because that form is long. A form that
 * fits on one phone screen needs none of them, and a progress bar over five
 * fields reads as a warning that more is coming.
 */

const EMPTY = {
  fullName: "",
  email: "",
  phone: "",
  businessName: "",
  idea: "",
};

type FormState = typeof EMPTY;
type FieldKey = keyof FormState;

/** Walked in this order on submit, so the page scrolls to the first problem. */
const FIELD_ORDER: FieldKey[] = ["fullName", "email", "businessName", "idea"];

function validate(
  form: FormState,
  service: string,
): Partial<Record<FieldKey | "service", string>> {
  const errors: Partial<Record<FieldKey | "service", string>> = {};

  if (form.fullName.trim().length < MIN.fullName) errors.fullName = "Upiši ime i prezime.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
    errors.email = "Upiši ispravnu email adresu.";
  }
  if (form.businessName.trim().length < MIN.businessName) {
    errors.businessName = "Upiši naziv firme ili brenda.";
  }
  if (form.idea.trim().length < MIN.quickIdea) {
    errors.idea = `Napiši bar ${MIN.quickIdea} karaktera — jedna rečenica je dovoljna.`;
  }
  if (!service) errors.service = "Izaberi šta te zanima.";

  return errors;
}

export function QuickInquiryV4({
  services,
  initialSlug = "",
}: {
  services: InquiryService[];
  /** Set when the visitor arrived from a service page, so the picker is already
   *  answered and only four fields are left. */
  initialSlug?: string;
}) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [service, setService] = useState(initialSlug);
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [showAll, setShowAll] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<{ reference: string; statusPath: string } | null>(null);

  const honeypotRef = useRef<HTMLInputElement>(null);
  const requestIdRef = useRef("");
  const fieldRefs = useRef<Partial<Record<FieldKey, HTMLElement | null>>>({});

  useEffect(() => {
    captureFirstTouch();
    requestIdRef.current = createRequestId();
  }, []);

  const errors = validate(form, service);
  const set =
    (key: FieldKey) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((current) => ({ ...current, [key]: event.target.value }));
  const blur = (key: FieldKey) => () => setTouched((current) => ({ ...current, [key]: true }));
  const errorFor = (key: FieldKey) => (showAll || touched[key] ? errors[key] : undefined);

  const fieldProps = (key: FieldKey) => ({
    onBlur: blur(key),
    "aria-invalid": errorFor(key) ? true : undefined,
    ref: (node: HTMLElement | null) => {
      fieldRefs.current[key] = node;
    },
  });

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    const problems = validate(form, service);
    if (Object.keys(problems).length > 0 || !consent) {
      setShowAll(true);
      const first = FIELD_ORDER.find((key) => problems[key]);
      const node = first ? fieldRefs.current[first] : null;
      node?.scrollIntoView({ behavior: "smooth", block: "center" });
      node?.focus?.({ preventScroll: true });
      if (problems.service) setError(problems.service);
      else if (!first && !consent) {
        setError("Potvrdi saglasnost da bismo mogli da ti odgovorimo.");
      }
      return;
    }

    setBusy(true);
    try {
      const response = await fetch("/api/upit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intake: "quick",
          ...form,
          services: [service],
          consent: true,
          website: honeypotRef.current?.value ?? "",
          requestId: requestIdRef.current || createRequestId(),
          attribution: getSubmissionAttribution(),
        }),
      });
      const data = (await response.json()) as {
        reference?: string;
        statusPath?: string;
        message?: string;
      };
      if (!response.ok || !data.reference || !data.statusPath) {
        setError(data.message ?? "Slanje nije uspelo. Pokušaj ponovo.");
        return;
      }
      trackLeadSubmitted({ source: "inquiry", service, requestId: data.reference });
      setSent({ reference: data.reference, statusPath: data.statusPath });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Nema veze sa serverom. Proveri internet i pokušaj ponovo.");
    } finally {
      setBusy(false);
    }
  }

  /* ------------------------------------------------------------------ sent */

  if (sent) {
    return (
      <section className={styles.wrap} data-reveal>
        <div className={styles.sent}>
          <p className={styles.eyebrow}>Upit {sent.reference}</p>
          <h2 className={styles.sentTitle}>
            Pitanje je stiglo<span className={styles.dot}>.</span>
          </h2>
          <p className={styles.sentBody}>
            Javljam se lično na {form.email}, obično isti ili sledeći radni dan. Ako mi za ponudu
            treba još nešto, pitaću te u tom mejlu — ne moraš ništa unapred da spremaš.
          </p>
          <div className={styles.sentActions}>
            <Link className={styles.submit} href={sent.statusPath} data-cursor="on">
              Prati status upita
            </Link>
            <Link className={styles.ghost} href="/upit" data-cursor="on">
              Popuni pun brief (brže do cene)
            </Link>
          </div>
        </div>
      </section>
    );
  }

  /* ------------------------------------------------------------------ form */

  return (
    <section className={styles.wrap} data-reveal>
      <form className={styles.form} data-form="upit-brzo" onSubmit={submit} noValidate>
        <div className={styles.block}>
          <div className={styles.row}>
            <label className={styles.field}>
              <span>Ime i prezime *</span>
              <input
                type="text"
                autoComplete="name"
                value={form.fullName}
                onChange={set("fullName")}
                {...fieldProps("fullName")}
              />
              {errorFor("fullName") ? <em className={styles.error}>{errors.fullName}</em> : null}
            </label>
            <label className={styles.field}>
              <span>Email *</span>
              <input
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={set("email")}
                {...fieldProps("email")}
              />
              {errorFor("email") ? <em className={styles.error}>{errors.email}</em> : null}
            </label>
          </div>

          <div className={styles.row}>
            <label className={styles.field}>
              <span>Naziv firme ili brenda *</span>
              <input
                type="text"
                autoComplete="organization"
                placeholder="npr. Ordinacija Dent Niš"
                value={form.businessName}
                onChange={set("businessName")}
                {...fieldProps("businessName")}
              />
              {errorFor("businessName") ? (
                <em className={styles.error}>{errors.businessName}</em>
              ) : null}
            </label>
            <label className={styles.field}>
              <span>Telefon</span>
              <input
                type="tel"
                autoComplete="tel"
                placeholder="+381 60 000 0000"
                value={form.phone}
                onChange={set("phone")}
              />
              <em className={styles.hint}>Ako ti je lakše da se čujemo nego da pišemo.</em>
            </label>
          </div>

          <label className={styles.field}>
            <span>Šta te zanima *</span>
            <select
              value={service}
              onChange={(event) => setService(event.target.value)}
              aria-invalid={showAll && !service ? true : undefined}
            >
              <option value="">Izaberi uslugu</option>
              {services.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.title}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.field}>
            <span>Šta ti treba? *</span>
            <textarea
              rows={4}
              placeholder="npr. Ordinacija smo, pacijenti zakazuju telefonom i dosta ih ne dođe. Treba nam online zakazivanje i podsetnik pred termin."
              value={form.idea}
              onChange={set("idea")}
              {...fieldProps("idea")}
            />
            {errorFor("idea") ? (
              <em className={styles.error}>{errors.idea}</em>
            ) : (
              <em className={styles.hint}>Jedna rečenica je dovoljna. Ostalo pitam u odgovoru.</em>
            )}
          </label>
        </div>

        <div className={styles.honeypot} aria-hidden>
          <label>
            Website
            <input type="text" ref={honeypotRef} tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <label className={styles.consent}>
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
          />
          <span>
            Saglasan sam da Adspire Digital kontaktira mene i obrađuje ove podatke radi odgovora
            na upit.
          </span>
        </label>

        <div className={styles.actions}>
          <button
            className={styles.submit}
            type="submit"
            disabled={busy}
            data-cursor="on"
            data-magnetic
          >
            {busy ? "Šaljem…" : "Pošalji pitanje"}
          </button>
          <span className={styles.hint}>
            Bez naloga i bez obaveze. Odgovaram lično, obično isti radni dan.
          </span>
        </div>
        {error ? <p className={styles.error}>{error}</p> : null}
      </form>
    </section>
  );
}
