"use client";

import { useState } from "react";
import Link from "next/link";

import { INQUIRY_STATUS_LABEL, TIMEFRAME_LABEL, type InquiryStatus, type Timeframe } from "@/lib/inquiries/types";
import styles from "./InquiryFlowV4.module.css";
import status from "./InquiryStatusV4.module.css";

/**
 * The buyer's view of one upit, opened with the private link from the mail.
 *
 * This is the whole reason an account is optional: everything a buyer needs to
 * do — read the quote, accept it, decline it — happens here, with the token in
 * the URL as the only credential.
 */

export type InquiryView = {
  reference: string;
  accessToken: string;
  status: InquiryStatus;
  services: string[];
  businessName: string;
  idea: string;
  wishes: string;
  timeframe: Timeframe | null;
  budgetEur: number | null;
  quotedAmount: number | null;
  currency: string;
  turnaroundDays: number | null;
  quoteValidUntil: string | null;
  quoteNote: string | null;
  createdAt: string;
  thread: ThreadMessage[];
};

export type ThreadMessage = {
  id: string;
  fromUs: boolean;
  subject: string | null;
  body: string;
  createdAt: string;
};

const when = (value: string) =>
  new Date(value).toLocaleString("sr-RS", { dateStyle: "short", timeStyle: "short" });

const money = (amount: number, currency: string) =>
  `${new Intl.NumberFormat("sr-RS", { minimumFractionDigits: 2 }).format(amount)} ${currency}`;

export function InquiryStatusV4({ inquiry }: { inquiry: InquiryView }) {
  const [current, setCurrent] = useState<InquiryStatus>(inquiry.status);
  const [busy, setBusy] = useState<null | "accepted" | "declined">(null);
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [thread, setThread] = useState<ThreadMessage[]>(inquiry.thread);
  const [draft, setDraft] = useState("");
  const [website, setWebsite] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function sendMessage() {
    const text = draft.trim();
    if (!text) return;
    setSending(true);
    setError(null);
    setSent(false);
    try {
      const response = await fetch("/api/upit/poruka", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: inquiry.accessToken, message: text, website }),
      });
      const data = (await response.json()) as { ok?: boolean; createdAt?: string; message?: string };
      if (!response.ok || !data.ok) {
        setError(data.message ?? "Poruka nije poslata. Pokušaj ponovo.");
        return;
      }
      setThread((previous) => [
        ...previous,
        {
          id: `local-${Date.now()}`,
          fromUs: false,
          subject: null,
          body: text,
          createdAt: data.createdAt ?? new Date().toISOString(),
        },
      ]);
      setDraft("");
      setSent(true);
    } catch {
      setError("Nema veze sa serverom. Pokušaj ponovo.");
    } finally {
      setSending(false);
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard blocked (http, or an old browser). The URL is in the address
      // bar either way, so this is not worth an error message.
      setError("Kopiranje nije prošlo — link je u adresnoj liniji pretraživača.");
    }
  }

  async function respond(answer: "accepted" | "declined") {
    setBusy(answer);
    setError(null);
    try {
      const response = await fetch("/api/upit/odgovor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: inquiry.accessToken, answer, reason }),
      });
      const data = (await response.json()) as { status?: InquiryStatus; message?: string };
      if (!response.ok || !data.status) {
        setError(data.message ?? "Nije uspelo. Pokušaj ponovo.");
        return;
      }
      setCurrent(data.status);
    } catch {
      setError("Nema veze sa serverom. Pokušaj ponovo.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <section className={styles.wrap} data-reveal>
      <div className={status.card}>
        <div className={status.head}>
          <p className={styles.eyebrow}>Upit {inquiry.reference}</p>
          <span className={`${status.badge} ${status[`badge_${current}`] ?? ""}`}>
            {INQUIRY_STATUS_LABEL[current]}
          </span>
        </div>

        <h2 className={styles.sentTitle}>{inquiry.businessName}</h2>
        <p className={styles.sentBody}>{inquiry.services.join(" + ")}</p>

        {current === "quoted" ? (
          <div className={status.quote}>
            <h3 className={status.quoteTitle}>Ponuda</h3>
            <dl className={status.facts}>
              <div>
                <dt>Cena</dt>
                <dd>
                  {inquiry.quotedAmount != null
                    ? money(inquiry.quotedAmount, inquiry.currency)
                    : "—"}
                </dd>
              </div>
              {inquiry.turnaroundDays ? (
                <div>
                  <dt>Rok izrade</dt>
                  <dd>{inquiry.turnaroundDays} dana</dd>
                </div>
              ) : null}
              {inquiry.quoteValidUntil ? (
                <div>
                  <dt>Važi do</dt>
                  <dd>{inquiry.quoteValidUntil}</dd>
                </div>
              ) : null}
            </dl>
            {inquiry.quoteNote ? <p className={status.note}>{inquiry.quoteNote}</p> : null}

            <div className={styles.sentActions}>
              <button
                className={styles.submit}
                type="button"
                onClick={() => respond("accepted")}
                disabled={busy !== null}
                data-cursor="on"
              >
                {busy === "accepted" ? "Šaljem…" : "Prihvatam ponudu"}
              </button>
              <button
                className={styles.ghost}
                type="button"
                onClick={() => respond("declined")}
                disabled={busy !== null}
                data-cursor="on"
              >
                {busy === "declined" ? "Šaljem…" : "Ne, hvala"}
              </button>
            </div>
            <label className={styles.field}>
              <span>Napomena (opciono)</span>
              <textarea
                rows={2}
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                placeholder="Ako nešto ne stoji — obim, rok, cena — napiši ovde."
              />
            </label>
          </div>
        ) : null}

        {current === "accepted" ? (
          <p className={status.result}>
            Ponuda je prihvaćena. Javljamo se sa fakturom i planom starta — obično isti dan.
          </p>
        ) : null}
        {current === "declined" ? (
          <p className={status.result}>
            Odgovor je zabeležen. Ako se predomisliš ili treba drugačiji obim, samo odgovori na
            mejl — nema ništa da se poništava.
          </p>
        ) : null}
        {current === "submitted" ? (
          <p className={status.result}>
            Upit je kod nas. Cena i rok stižu na mejl, obično u roku od dva radna dana.
          </p>
        ) : null}

        <div className={status.brief}>
          <h3 className={status.quoteTitle}>Prepiska</h3>
          {thread.length > 0 ? (
            <ol className={status.thread}>
              {thread.map((message) => (
                <li
                  key={message.id}
                  className={`${status.message} ${message.fromUs ? status.fromUs : status.fromYou}`}
                >
                  <p className={status.messageMeta}>
                    {message.fromUs ? "Adspire" : "Ti"} · {when(message.createdAt)}
                  </p>
                  {message.subject ? <p className={status.messageSubject}>{message.subject}</p> : null}
                  <p className={status.text}>{message.body}</p>
                </li>
              ))}
            </ol>
          ) : null}
          <label className={styles.field}>
            <span>Tvoj odgovor</span>
            <textarea
              rows={5}
              value={draft}
              maxLength={4000}
              onChange={(event) => {
                setDraft(event.target.value);
                setSent(false);
              }}
              placeholder="Napiši odgovor ili pitanje. Stiže direktno Đorđu."
            />
          </label>
          {/* Honeypot: hidden from people, filled by bots. */}
          <input
            className={status.trap}
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
          <div className={styles.sentActions}>
            <button
              className={styles.submit}
              type="button"
              onClick={sendMessage}
              disabled={sending || !draft.trim()}
              data-cursor="on"
            >
              {sending ? "Šaljem…" : "Pošalji odgovor"}
            </button>
          </div>
          {sent ? <p className={status.note}>Poruka je stigla. Javljamo se uskoro.</p> : null}
        </div>

        <div className={status.brief}>
          <h3 className={status.quoteTitle}>Šta si poslao</h3>
          <dl className={status.facts}>
            <div>
              <dt>Rok</dt>
              <dd>{inquiry.timeframe ? TIMEFRAME_LABEL[inquiry.timeframe] : "—"}</dd>
            </div>
            <div>
              <dt>Budžet</dt>
              <dd>{inquiry.budgetEur != null ? `${inquiry.budgetEur} EUR` : "nije naveden"}</dd>
            </div>
            <div>
              <dt>Poslato</dt>
              <dd>{new Date(inquiry.createdAt).toLocaleDateString("sr-RS")}</dd>
            </div>
          </dl>
          <p className={status.text}>{inquiry.idea}</p>
          {inquiry.wishes ? <p className={status.text}>{inquiry.wishes}</p> : null}
        </div>

        {error ? <p className={styles.error}>{error}</p> : null}

        <div className={styles.sentActions}>
          {/* The link is the buyer's only credential when they have no account,
              so saving it is offered here rather than only in the mail. */}
          <button className={styles.ghost} type="button" onClick={copyLink} data-cursor="on">
            {copied ? "Link kopiran" : "Kopiraj link za praćenje"}
          </button>
          <Link className={styles.ghost} href="/upit" data-cursor="on">
            Pošalji novi upit
          </Link>
        </div>
        <p className={styles.hint}>
          Čuvaj ovaj link — njime se vraćaš na upit bez naloga. Ako ti je lakše da sve upite
          držiš na jednom mestu,{" "}
          <Link href="/nalog/prijava" data-cursor="on">
            napravi nalog
          </Link>{" "}
          sa iste adrese.
        </p>
      </div>
    </section>
  );
}
