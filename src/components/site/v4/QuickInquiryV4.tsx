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
import { getQuickInquiryCopy, type QuickInquiryCopy } from "./quickInquiryCopy";
import type { LocaleCode } from "@/lib/site-config";

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
  t: QuickInquiryCopy,
): Partial<Record<FieldKey | "service", string>> {
  const errors: Partial<Record<FieldKey | "service", string>> = {};

  if (form.fullName.trim().length < MIN.fullName) errors.fullName = t.nameError;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
    errors.email = t.emailError;
  }
  if (form.businessName.trim().length < MIN.businessName) {
    errors.businessName = t.businessError;
  }
  if (form.idea.trim().length < MIN.quickIdea) {
    errors.idea = t.ideaError;
  }
  if (!service) errors.service = t.serviceError;

  return errors;
}

export function QuickInquiryV4({
  services,
  initialSlug = "",
  locale = "sr",
  hotel = false,
  copyOverride,
}: {
  services: InquiryService[];
  /** Set when the visitor arrived from a service page, so the picker is already
   *  answered and only four fields are left. */
  initialSlug?: string;
  locale?: LocaleCode;
  hotel?: boolean;
  /** Labels reworded for one offer (e.g. edukacija). Field names and validation
   *  stay the same, so the API cannot tell the difference. */
  copyOverride?: Partial<ReturnType<typeof getQuickInquiryCopy>>;
}) {
  const t = { ...getQuickInquiryCopy(locale, hotel), ...copyOverride };
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
  const submittingRef = useRef(false);
  const sentRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (sent && hotel) sentRef.current?.focus(); }, [sent, hotel]);

  useEffect(() => {
    captureFirstTouch();
    requestIdRef.current = createRequestId();
  }, []);

  const errors = validate(form, service, t);
  const set =
    (key: FieldKey) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((current) => ({ ...current, [key]: event.target.value }));
  const blur = (key: FieldKey) => () => setTouched((current) => ({ ...current, [key]: true }));
  const errorFor = (key: FieldKey) => (showAll || touched[key] ? errors[key] : undefined);

  const fieldProps = (key: FieldKey) => ({
    "aria-label": ({ fullName: t.name, email: t.email, businessName: t.business, idea: t.idea, phone: t.phone })[key],
    onBlur: blur(key),
    "aria-invalid": errorFor(key) ? true : undefined,
    ref: (node: HTMLElement | null) => {
      fieldRefs.current[key] = node;
    },
  });

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (submittingRef.current) return;
    setError(null);

    const problems = validate(form, service, t);
    if (Object.keys(problems).length > 0 || !consent) {
      setShowAll(true);
      const first = FIELD_ORDER.find((key) => problems[key]);
      const node = first ? fieldRefs.current[first] : null;
      node?.scrollIntoView({ behavior: "smooth", block: "center" });
      node?.focus?.({ preventScroll: true });
      if (problems.service) setError(problems.service);
      else if (!first && !consent) {
        setError(t.consentError);
      }
      return;
    }

    submittingRef.current = true;
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
          requestId: requestIdRef.current || (requestIdRef.current = createRequestId()),
          attribution: getSubmissionAttribution(),
        }),
      });
      const data = (await response.json()) as {
        reference?: string;
        statusPath?: string;
        message?: string;
      };
      if (!response.ok || !data.reference || !data.statusPath) {
        setError(response.status === 429 ? t.rateLimit : locale === "sr" ? data.message ?? t.error : t.error);
        return;
      }
      trackLeadSubmitted({ source: "inquiry", service, requestId: data.reference });
      setSent({ reference: data.reference, statusPath: data.statusPath });
      if (!hotel) window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError(t.network);
    } finally {
      setBusy(false);
      submittingRef.current = false;
    }
  }

  /* ------------------------------------------------------------------ sent */

  if (sent) {
    return (
      <section className={styles.wrap} data-reveal={hotel ? undefined : true}>
        <div className={styles.sent} ref={sentRef} tabIndex={-1} role="status">
          <p className={styles.eyebrow}>{t.reference} {sent.reference}</p>
          <h2 className={styles.sentTitle}>
            {t.sent}<span className={styles.dot}>.</span>
          </h2>
          <p className={styles.sentBody}>
            {t.reply} {form.email}{t.replyEnd}
          </p>
          <div className={styles.sentActions}>
            <Link className={styles.submit} href={sent.statusPath} data-cursor="on">
              {t.status}
            </Link>
            {!hotel ? <Link className={styles.ghost} href="/upit" data-cursor="on">{t.brief}</Link> : null}
          </div>
        </div>
      </section>
    );
  }

  /* ------------------------------------------------------------------ form */

  return (
    <section className={styles.wrap} data-reveal={hotel ? undefined : true}>
      <form className={styles.form} data-form={hotel ? "hotel-inquiry" : "upit-brzo"} onSubmit={submit} noValidate>
        <div className={styles.block}>
          <div className={styles.row}>
            <label className={styles.field}>
              <span>{t.name}</span>
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
              <span>{t.email}</span>
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
              <span>{t.business}</span>
              <input
                type="text"
                autoComplete="organization"
                placeholder={t.businessPlaceholder}
                value={form.businessName}
                onChange={set("businessName")}
                {...fieldProps("businessName")}
              />
              {errorFor("businessName") ? (
                <em className={styles.error}>{errors.businessName}</em>
              ) : null}
            </label>
            <label className={styles.field}>
              <span>{t.phone}</span>
              <input
                type="tel"
                autoComplete="tel"
                placeholder="+381 60 000 0000"
                value={form.phone}
                onChange={set("phone")}
              />
              <em className={styles.hint}>{t.phoneHint}</em>
            </label>
          </div>

          <label className={styles.field}>
            <span>{t.service}</span>
            <select
              value={service}
              onChange={(event) => setService(event.target.value)}
              aria-invalid={showAll && !service ? true : undefined}
            >
              <option value="">{t.choose}</option>
              {services.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.title}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.field}>
            <span>{t.idea}</span>
            <textarea
              rows={4}
              placeholder={t.ideaPlaceholder}
              value={form.idea}
              onChange={set("idea")}
              {...fieldProps("idea")}
            />
            {errorFor("idea") ? (
              <em className={styles.error}>{errors.idea}</em>
            ) : (
              <em className={styles.hint}>{t.ideaHint}</em>
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
            {t.consent}
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
            {busy ? t.sending : t.send}
          </button>
          <span className={styles.hint}>
            {t.note}
          </span>
        </div>
        {error ? <p className={styles.error} role="alert">{error}</p> : null}
      </form>
    </section>
  );
}
