"use client";

import { useEffect, useRef, useState } from "react";
import { PageShellV4 } from "./PageShellV4";
import { getContactCopy, MARKETS, SERVICES } from "./contactCopy";
import {
  captureFirstTouch,
  createRequestId,
  getSubmissionAttribution,
} from "@/lib/crm/clientAttribution";
import { defaultLocale, type LocaleCode } from "@/lib/site-config";
import styles from "./ContactV4.module.css";

/**
 * Contact page — OBSIDIAN styled qualification form posting to /api/leads,
 * plus direct channels and what-happens-next reassurance.
 */

type Props = { locale?: LocaleCode };

export function ContactV4({ locale = defaultLocale }: Props) {
  const t = getContactCopy(locale);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  // One id per form instance so a double click cannot create two leads.
  const requestIdRef = useRef<string>("");

  useEffect(() => {
    captureFirstTouch();
    requestIdRef.current = createRequestId();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formEl = event.currentTarget;
    const form = new FormData(formEl);
    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: String(form.get("fullName") ?? ""),
          email: String(form.get("email") ?? ""),
          company: String(form.get("company") ?? ""),
          phone: String(form.get("phone") ?? ""),
          market: String(form.get("market") ?? "rs"),
          service: String(form.get("service") ?? "other"),
          message: String(form.get("message") ?? ""),
          budgetRange: String(form.get("budgetRange") ?? ""),
          timeline: String(form.get("timeline") ?? ""),
          consent: form.get("consent") === "on",
          website: String(form.get("website") ?? ""),
          requestId: requestIdRef.current || createRequestId(),
          attribution: getSubmissionAttribution(),
        }),
      });
      if (!res.ok) throw new Error("Failed");
      formEl.reset();
      // New id for the next submission, otherwise the retry is deduplicated.
      requestIdRef.current = createRequestId();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <PageShellV4
      eyebrow={t.eyebrow}
      title={
        <>
          {t.title[0]}
          <br />
          {t.title[1]}
          <span className={styles.dot}>.</span>
        </>
      }
      intro={t.intro}
    >
      <section className={styles.wrap} data-reveal>
        <div className={styles.grid}>
          {/* Left — direct channels */}
          <aside className={styles.side}>
            <div className={styles.channel}>
              <span className={styles.channelLabel}>{t.channels.email}</span>
              <a className={styles.channelValue} href="mailto:djordje@adspire.rs" data-cursor="on">
                djordje@adspire.rs
              </a>
            </div>
            <div className={styles.channel}>
              <span className={styles.channelLabel}>{t.channels.phone}</span>
              <a className={styles.channelValue} href="tel:+381601491491" data-cursor="on">
                +381 60 149 149 1
              </a>
            </div>
            <div className={styles.channel}>
              <span className={styles.channelLabel}>{t.channels.location}</span>
              <span className={styles.channelValue}>{t.locationValue}</span>
            </div>
            <div className={styles.channel}>
              <span className={styles.channelLabel}>{t.channels.languages}</span>
              <span className={styles.channelValue}>SR · EN · DE</span>
            </div>

            <div className={styles.steps}>
              {t.steps.map((text, i) => (
                <div key={text} className={styles.step}>
                  <span className={styles.stepNum}>{`0${i + 1}`}</span>
                  <span className={styles.stepText}>{text}</span>
                </div>
              ))}
            </div>
          </aside>

          {/* Right — qualification form */}
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <label className={styles.field}>
                <span>{t.labels.fullName}</span>
                <input type="text" name="fullName" autoComplete="name" required />
              </label>
              <label className={styles.field}>
                <span>{t.labels.company}</span>
                <input type="text" name="company" autoComplete="organization" />
              </label>
            </div>

            <div className={styles.formRow}>
              <label className={styles.field}>
                <span>{t.labels.email}</span>
                <input type="email" name="email" autoComplete="email" required />
              </label>
              <label className={styles.field}>
                <span>{t.labels.phone}</span>
                <input type="tel" name="phone" autoComplete="tel" />
              </label>
            </div>

            <div className={styles.formRow}>
              <label className={styles.field}>
                <span>{t.labels.service}</span>
                <select name="service" defaultValue="booking" required>
                  {SERVICES.map((service) => (
                    <option key={service} value={service}>
                      {t.services[service]}
                    </option>
                  ))}
                </select>
              </label>
              <label className={styles.field}>
                <span>{t.labels.market}</span>
                <select name="market" defaultValue={locale === "de" ? "dach" : "rs"} required>
                  {MARKETS.map((market) => (
                    <option key={market} value={market}>
                      {t.markets[market]}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className={styles.formRow}>
              <label className={styles.field}>
                <span>{t.labels.budget}</span>
                <select name="budgetRange" defaultValue="">
                  <option value="">{t.labels.skip}</option>
                  {t.budgets.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </label>
              <label className={styles.field}>
                <span>{t.labels.timeline}</span>
                <select name="timeline" defaultValue="">
                  <option value="">{t.labels.skip}</option>
                  {t.timelines.map((timeline) => (
                    <option key={timeline} value={timeline}>
                      {timeline}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className={styles.field}>
              <span>{t.labels.message}</span>
              <textarea
                name="message"
                rows={6}
                required
                placeholder={t.labels.messagePlaceholder}
              />
            </label>

            {/* Honeypot */}
            <div className={styles.honeypot} aria-hidden="true">
              <label>
                Website
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <label className={styles.consent}>
              <input type="checkbox" name="consent" required />
              <span>{t.consent}</span>
            </label>

            <div className={styles.actions}>
              <button
                className={styles.submit}
                type="submit"
                data-cursor="on"
                data-magnetic
                disabled={status === "sending"}
              >
                {status === "sending" ? t.sending : t.submit}
              </button>
              {status === "success" ? <p className={styles.msgOk}>{t.success}</p> : null}
              {status === "error" ? <p className={styles.msgErr}>{t.error}</p> : null}
            </div>
          </form>
        </div>
      </section>
    </PageShellV4>
  );
}
