"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { trackLeadSubmitted } from "@/lib/analytics/events";
import { asapPromise, callEnd, CALL_MINUTES, type CallDay } from "@/lib/calls/slots";
import { CALL_TOPICS, TOPIC_LABELS, type CallChannel, type CallTopic } from "@/lib/calls/topics";
import { captureFirstTouch, createRequestId, getSubmissionAttribution } from "@/lib/crm/clientAttribution";
import { belgradeToUtc } from "@/lib/education/ics";
import { weekday } from "@/lib/education/slots";
import type { LocaleCode } from "@/lib/site-config";
import { getCallCopy } from "./callCopy";
import styles from "./CallBookingV4.module.css";

/**
 * Razgovor: topic → time → contact, one tap per step where possible.
 *
 * Built for the owner who will not read the site: every step fits one phone
 * screen, picking a topic or a time moves on by itself, and "call me as soon
 * as possible" is the first option on the time step because for many of them
 * that is the whole point. No account, no OAuth — a phone number or an email
 * is all that is asked.
 */

type Step = 0 | 1 | 2 | 3;

type Props = {
  locale?: LocaleCode;
  /** Pre-selected topic from the page the visitor came from; skips step one. */
  initialTopic?: CallTopic | null;
  /** Where the widget was opened from, for /os. */
  source?: string;
  onClose?: () => void;
};

const TOPIC_ICONS: Record<CallTopic, string> = {
  sajt: "◧",
  zakazivanje: "◷",
  shop: "◰",
  ai: "✦",
  softver: "⌘",
  drugo: "?",
};

export function CallBookingV4({ locale = "sr", initialTopic = null, source, onClose }: Props) {
  const t = getCallCopy(locale);
  const [step, setStep] = useState<Step>(initialTopic ? 1 : 0);
  const [topic, setTopic] = useState<CallTopic | null>(initialTopic);
  const [days, setDays] = useState<CallDay[] | null>(null);
  const [day, setDay] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [asap, setAsap] = useState(false);
  const [channel, setChannel] = useState<CallChannel>("phone");
  const [form, setForm] = useState({ fullName: "", phone: "", email: "", company: "", note: "", website: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<{ meetUrl: string | null } | null>(null);
  const requestId = useRef<string>("");
  const panelRef = useRef<HTMLDivElement>(null);

  const promise = useMemo(() => asapPromise(), []);

  useEffect(() => {
    captureFirstTouch();
    requestId.current = createRequestId();
    let alive = true;
    fetch("/api/razgovor", { cache: "no-store" })
      .then((res) => res.json())
      .then((data: { days?: CallDay[] }) => {
        if (!alive) return;
        const list = Array.isArray(data.days) ? data.days : [];
        setDays(list);
        setDay((current) => current ?? list[0]?.date ?? null);
      })
      .catch(() => alive && setDays([]));
    return () => {
      alive = false;
    };
  }, []);

  // Each step starts at its top: on a phone the previous step's scroll
  // position would otherwise leave the new question off screen.
  const firstStep = useRef(true);
  useEffect(() => {
    if (firstStep.current) {
      firstStep.current = false;
      return;
    }
    panelRef.current?.scrollIntoView?.({ block: "nearest" });
    const scroller = panelRef.current?.closest("[data-call-scroll]");
    if (scroller) scroller.scrollTop = 0;
  }, [step]);

  const dayLabel = (date: string) => {
    const [, m, d] = date.split("-").map(Number);
    return { week: t.weekdays[weekday(date)], num: `${d}. ${t.months[m - 1]}` };
  };

  const whenText = () => {
    if (asap) return promise.sameDay ? t.asapToday : t.asapTomorrow;
    if (!day || !slot) return "";
    const { week, num } = dayLabel(day);
    return `${week} ${num} · ${slot}–${callEnd(slot)}`;
  };

  const pickTopic = (value: CallTopic) => {
    setTopic(value);
    setStep(1);
  };

  const pickSlot = (value: string) => {
    setAsap(false);
    setSlot(value);
    setStep(2);
  };

  const pickAsap = () => {
    setAsap(true);
    setSlot(null);
    setStep(2);
  };

  const update = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (form.fullName.trim().length < 2) next.fullName = t.errors.name;
    if (channel === "phone" && form.phone.replace(/\D/g, "").length < 6) next.phone = t.errors.phone;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim());
    if (channel === "meet" && !emailOk) next.email = t.errors.email;
    if (channel === "phone" && form.email.trim() && !emailOk) next.email = t.errors.email;
    if (!asap && !slot) next.slot = t.errors.slot;
    return next;
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (sending || !topic) return;
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSending(true);
    try {
      const res = await fetch("/api/razgovor", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          requestId: requestId.current,
          topic,
          channel,
          asap,
          date: asap ? null : day,
          slot: asap ? null : slot,
          fullName: form.fullName,
          phone: form.phone || undefined,
          email: form.email || undefined,
          company: form.company || undefined,
          note: form.note || undefined,
          locale,
          source: source ?? (typeof window !== "undefined" ? window.location.pathname : undefined),
          website: form.website,
          attribution: getSubmissionAttribution(),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; code?: string; meetUrl?: string | null };
      if (res.ok && data.ok) {
        trackLeadSubmitted({ source: "call", service: topic, requestId: requestId.current });
        setDone({ meetUrl: data.meetUrl ?? null });
        setStep(3);
        return;
      }
      if (data.code === "taken" || data.code === "past" || data.code === "closed") {
        // Refresh the grid and send them back one step with the reason.
        setSlot(null);
        setErrors({ slot: t.errors.taken });
        setStep(1);
        fetch("/api/razgovor", { cache: "no-store" })
          .then((r) => r.json())
          .then((d: { days?: CallDay[] }) => setDays(Array.isArray(d.days) ? d.days : []))
          .catch(() => {});
        return;
      }
      setErrors({ form: t.errors.generic });
    } catch {
      setErrors({ form: t.errors.generic });
    } finally {
      setSending(false);
    }
  };

  const calendarLink = () => {
    if (asap || !day || !slot) return null;
    const start = belgradeToUtc(day, slot);
    const end = new Date(start.getTime() + CALL_MINUTES * 60_000);
    const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: t.lang === "sr" ? "Razgovor sa Adspire (20 min)" : "Call with Adspire (20 min)",
      dates: `${fmt(start)}/${fmt(end)}`,
      details: done?.meetUrl ?? "",
      location: done?.meetUrl ?? "",
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const activeDay = days?.find((d) => d.date === day) ?? null;

  return (
    <div className={styles.widget} ref={panelRef} data-step={step}>
      {step < 3 ? (
        <ol className={styles.progress} aria-label={t.eyebrow}>
          {t.steps.map((label, i) => (
            <li
              key={label}
              className={styles.progressStep}
              data-state={i < step ? "done" : i === step ? "active" : "todo"}
            >
              <button
                type="button"
                disabled={i >= step}
                onClick={() => setStep(i as Step)}
                className={styles.progressBtn}
              >
                <span className={styles.progressNum}>{i < step ? "✓" : i + 1}</span>
                <span>{label}</span>
              </button>
            </li>
          ))}
        </ol>
      ) : null}

      {/* ── 1 · Topic ── */}
      {step === 0 ? (
        <section className={styles.step} key="topic">
          <h3 className={styles.question}>{t.topicQuestion}</h3>
          <div className={styles.topics}>
            {CALL_TOPICS.map((value, i) => (
              <button
                key={value}
                type="button"
                className={styles.topic}
                data-selected={topic === value || undefined}
                onClick={() => pickTopic(value)}
                style={{ "--i": i } as React.CSSProperties}
              >
                <span className={styles.topicIcon} aria-hidden="true">
                  {TOPIC_ICONS[value]}
                </span>
                {TOPIC_LABELS[t.lang][value]}
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {/* ── 2 · Time ── */}
      {step === 1 ? (
        <section className={styles.step} key="time">
          <h3 className={styles.question}>{t.whenQuestion}</h3>
          <button type="button" className={styles.asap} data-selected={asap || undefined} onClick={pickAsap}>
            <span className={styles.asapPulse} aria-hidden="true" />
            <span className={styles.asapText}>
              <strong>{t.asapTitle}</strong>
              <span>{promise.sameDay ? t.asapToday : t.asapTomorrow}</span>
            </span>
            <span className={styles.asapArrow} aria-hidden="true">
              →
            </span>
          </button>

          <p className={styles.divider}>
            <span>{t.orPick}</span>
          </p>

          {errors.slot ? <p className={styles.error}>{errors.slot}</p> : null}

          {days === null ? (
            <p className={styles.muted}>{t.loading}</p>
          ) : days.length === 0 ? (
            <p className={styles.muted}>{t.noSlots}</p>
          ) : (
            <>
              <div className={styles.days} role="tablist">
                {days.map((d) => {
                  const { week, num } = dayLabel(d.date);
                  return (
                    <button
                      key={d.date}
                      type="button"
                      role="tab"
                      aria-selected={d.date === day}
                      className={styles.day}
                      onClick={() => setDay(d.date)}
                    >
                      <span className={styles.dayWeek}>{week}</span>
                      <span className={styles.dayNum}>{num}</span>
                    </button>
                  );
                })}
              </div>
              <div className={styles.slots} key={day ?? "none"}>
                {activeDay?.slots.map((s, i) => (
                  <button
                    key={s}
                    type="button"
                    className={styles.slot}
                    data-selected={(!asap && slot === s && day === activeDay.date) || undefined}
                    onClick={() => pickSlot(s)}
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </>
          )}
        </section>
      ) : null}

      {/* ── 3 · Contact ── */}
      {step === 2 ? (
        <form className={styles.step} key="contact" onSubmit={submit} noValidate data-form="razgovor">
          <p className={styles.summary}>
            <span>
              <strong>{topic ? TOPIC_LABELS[t.lang][topic] : ""}</strong> · {whenText()}
            </span>
            <button type="button" className={styles.link} onClick={() => setStep(1)}>
              {t.change}
            </button>
          </p>

          <h3 className={styles.question}>{t.howQuestion}</h3>
          <div className={styles.channels} role="radiogroup">
            {(["phone", "meet"] as const).map((value) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={channel === value}
                className={styles.channel}
                onClick={() => {
                  setChannel(value);
                  setErrors({});
                }}
              >
                <span className={styles.channelIcon} aria-hidden="true">
                  {value === "phone" ? (
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="6" width="13" height="12" rx="2" />
                      <path d="m16 10 5-3v10l-5-3" />
                    </svg>
                  )}
                </span>
                <span className={styles.channelText}>
                  <strong>{value === "phone" ? t.phone : t.meet}</strong>
                  <span>{value === "phone" ? t.phoneHint : t.meetHint}</span>
                </span>
              </button>
            ))}
          </div>

          <div className={styles.fields}>
            <label className={styles.field}>
              <span>{t.name}</span>
              <input
                value={form.fullName}
                onChange={update("fullName")}
                autoComplete="name"
                aria-invalid={Boolean(errors.fullName)}
              />
              {errors.fullName ? <em className={styles.error}>{errors.fullName}</em> : null}
            </label>

            {channel === "phone" ? (
              <label className={styles.field}>
                <span>{t.phoneField}</span>
                <input
                  value={form.phone}
                  onChange={update("phone")}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+381 6x xxx xxxx"
                  aria-invalid={Boolean(errors.phone)}
                />
                {errors.phone ? <em className={styles.error}>{errors.phone}</em> : null}
              </label>
            ) : null}

            <label className={styles.field}>
              <span>
                {channel === "meet" ? t.emailField : t.emailOptional}
                {channel === "phone" ? <small> · {t.optional}</small> : null}
              </span>
              <input
                value={form.email}
                onChange={update("email")}
                type="email"
                inputMode="email"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email ? <em className={styles.error}>{errors.email}</em> : null}
            </label>

            <label className={styles.field}>
              <span>
                {t.company} <small>· {t.optional}</small>
              </span>
              <input value={form.company} onChange={update("company")} autoComplete="organization" />
            </label>

            <label className={`${styles.field} ${styles.fieldWide}`}>
              <span>
                {t.note} <small>· {t.optional}</small>
              </span>
              <textarea value={form.note} onChange={update("note")} rows={2} placeholder={t.notePlaceholder} maxLength={600} />
            </label>

            {/* Honeypot: off-screen, not display:none, so naive bots still fill it. */}
            <label className={styles.honey} aria-hidden="true">
              Website
              <input tabIndex={-1} autoComplete="off" value={form.website} onChange={update("website")} />
            </label>
          </div>

          {errors.form ? <p className={styles.error}>{errors.form}</p> : null}

          <button type="submit" className={styles.submit} disabled={sending} data-cta="razgovor-submit">
            <span>{sending ? t.sending : t.submit}</span>
            <span className={styles.submitArrow} aria-hidden="true">
              →
            </span>
          </button>
          <ul className={styles.trust}>
            {t.trust.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </form>
      ) : null}

      {/* ── Done ── */}
      {step === 3 && done ? (
        <section className={`${styles.step} ${styles.done}`} key="done">
          <span className={styles.doneMark} aria-hidden="true">
            <svg viewBox="0 0 52 52" width="56" height="56">
              <circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M15 27l7 7 15-16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <h3 className={styles.doneTitle}>{t.done.title}</h3>
          <p className={styles.doneWhen}>
            {asap
              ? promise.sameDay
                ? t.done.asapToday
                : t.done.asapTomorrow
              : t.done.timed.replace("{when}", whenText())}
          </p>
          <p className={styles.muted}>
            {channel === "phone" ? t.done.phone.replace("{phone}", form.phone) : done.meetUrl ? t.done.meet : t.done.meetLater}{" "}
            {channel === "meet" && done.meetUrl ? (
              <a href={done.meetUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                {done.meetUrl.replace("https://", "")}
              </a>
            ) : null}
          </p>
          {form.email ? <p className={styles.muted}>{t.done.mail}</p> : null}
          <div className={styles.doneActions}>
            {calendarLink() ? (
              <a className={styles.submit} href={calendarLink() ?? "#"} target="_blank" rel="noopener noreferrer">
                <span>{t.done.addCalendar}</span>
              </a>
            ) : null}
            {onClose ? (
              <button type="button" className={styles.ghost} onClick={onClose}>
                {t.close}
              </button>
            ) : null}
          </div>
        </section>
      ) : null}
    </div>
  );
}
