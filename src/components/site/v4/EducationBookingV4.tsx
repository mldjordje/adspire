"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import flow from "./InquiryFlowV4.module.css";
import styles from "./EducationV4.module.css";
import { formatDay, formatHours, formatMonth, KIND_LABEL, type EduKind } from "@/lib/education/format";
import {
  CANCEL_CUTOFF_HOURS,
  MAX_BOOKING_HOURS,
  monthCells,
  shiftMonth,
  startsFor,
} from "@/lib/education/slots";

/**
 * The buyer picks a session out of the studio's open hours.
 *
 * Free slots come from the server already stripped of booked and past hours;
 * the only thing computed here is which of them can *start* a session of the
 * chosen length, with the same helper the API validates with — so the calendar
 * never offers a slot the POST would refuse.
 */

type Day = { date: string; slots: string[] };
type Wallet = { kind: EduKind; remaining: number };

const WEEKDAYS = ["Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned"];

export function EducationCalendarV4({
  wallets,
  initialMonth,
}: {
  wallets: Wallet[];
  /** Belgrade's current month, from the server, so hydration cannot disagree. */
  initialMonth: string;
}) {
  const router = useRouter();
  const bookable = wallets.filter((w) => w.remaining >= 1);

  const [kind, setKind] = useState<EduKind>(bookable[0]?.kind ?? "education");
  const [month, setMonth] = useState(initialMonth);
  const [days, setDays] = useState<Day[]>([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<string | null>(null);
  const [hours, setHours] = useState(1);
  const [slot, setSlot] = useState<string | null>(null);
  const [topic, setTopic] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  const balance = bookable.find((w) => w.kind === kind)?.remaining ?? 0;
  const maxHours = Math.max(1, Math.min(MAX_BOOKING_HOURS, Math.floor(balance)));
  // Derived rather than corrected in an effect: switching to a smaller wallet
  // simply caps the duration, and a start that no longer fits drops out.
  const length = Math.min(hours, maxHours);

  const load = useCallback(async (target: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/portal/edukacija/dostupnost?mesec=${target}`, {
        cache: "no-store",
      });
      const data = (await response.json()) as { ok: boolean; days?: Day[]; message?: string };
      setDays(data.ok ? (data.days ?? []) : []);
      if (!data.ok) setError(data.message ?? "Ne mogu da učitam slobodne termine.");
    } catch {
      setDays([]);
      setError("Ne mogu da učitam slobodne termine.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load(month);
  }, [month, load]);

  const freeByDate = useMemo(() => new Map(days.map((d) => [d.date, d.slots])), [days]);
  const starts = useMemo(
    () => (date ? startsFor(freeByDate.get(date) ?? [], length) : []),
    [date, freeByDate, length],
  );
  const chosen = slot && starts.includes(slot) ? slot : null;

  function goToMonth(delta: number) {
    setMonth(shiftMonth(month, delta));
    setDate(null);
    setSlot(null);
  }

  async function submit() {
    if (!date || !chosen) return;
    setBusy(true);
    setError(null);
    setDone(null);
    try {
      const response = await fetch("/api/portal/edukacija/termini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, startSlot: chosen, hours: length, kind, topic }),
      });
      const data = (await response.json()) as { ok: boolean; code?: string; message?: string };
      if (!data.ok) {
        setError(data.message ?? "Termin nije zakazan.");
        // Someone may have taken it a second ago — show the truth instead of
        // letting the buyer retry a slot that is gone.
        if (data.code === "taken" || data.code === "closed" || data.code === "past") {
          await load(month);
        }
        return;
      }
      setDone(`Termin je zakazan: ${formatDay(date)} u ${chosen}. Potvrda stiže mejlom.`);
      setDate(null);
      setSlot(null);
      setTopic("");
      await load(month);
      router.refresh();
    } catch {
      setError("Nema veze sa serverom. Pokušaj ponovo.");
    } finally {
      setBusy(false);
    }
  }

  if (bookable.length === 0) return null;

  return (
    <section className={styles.panel}>
      <div className={styles.panelHead}>
        <h2 className={styles.title}>Zakaži termin</h2>
        <p className={styles.muted}>
          Na stanju: {formatHours(balance)} · {KIND_LABEL[kind]}
        </p>
      </div>

      {bookable.length > 1 ? (
        <div className={styles.chips}>
          {bookable.map((w) => (
            <button
              key={w.kind}
              type="button"
              className={`${styles.chip} ${kind === w.kind ? styles.chipActive : ""}`}
              aria-pressed={kind === w.kind}
              onClick={() => {
                setKind(w.kind);
                setSlot(null);
              }}
            >
              {KIND_LABEL[w.kind]}
            </button>
          ))}
        </div>
      ) : null}

      <div className={styles.monthNav}>
        <button
          type="button"
          className={styles.navBtn}
          aria-label="Prethodni mesec"
          disabled={month <= initialMonth}
          onClick={() => goToMonth(-1)}
        >
          ‹
        </button>
        <span className={styles.monthLabel}>{formatMonth(month)}</span>
        <button
          type="button"
          className={styles.navBtn}
          aria-label="Sledeći mesec"
          onClick={() => goToMonth(1)}
        >
          ›
        </button>
      </div>

      <div className={styles.grid}>
        {WEEKDAYS.map((w) => (
          <div key={w} className={styles.weekday}>
            {w}
          </div>
        ))}
        {monthCells(month).map((cell, i) => {
          if (cell === null) return <div key={`blank-${i}`} />;
          const open = (freeByDate.get(cell)?.length ?? 0) > 0;
          return (
            <button
              key={cell}
              type="button"
              disabled={!open}
              aria-pressed={date === cell}
              aria-label={open ? `${formatDay(cell)} — ima slobodnih termina` : formatDay(cell)}
              className={`${styles.day} ${open ? styles.dayOpen : ""} ${date === cell ? styles.dayActive : ""}`}
              onClick={() => {
                setDate(cell);
                setSlot(null);
                setDone(null);
              }}
            >
              {Number(cell.slice(-2))}
            </button>
          );
        })}
      </div>

      {loading ? <p className={`${styles.muted}`} style={{ marginTop: 16 }}>Učitavam slobodne termine…</p> : null}
      {!loading && days.length === 0 ? (
        <p className={styles.muted} style={{ marginTop: 16 }}>
          Ovog meseca nema otvorenih termina. Pogledaj sledeći mesec.
        </p>
      ) : null}

      {date ? (
        <div className={styles.picker}>
          <div>
            <p className={styles.label}>Trajanje</p>
            <div className={styles.chips}>
              {Array.from({ length: maxHours }, (_, i) => i + 1).map((h) => (
                <button
                  key={h}
                  type="button"
                  className={`${styles.chip} ${length === h ? styles.chipActive : ""}`}
                  aria-pressed={length === h}
                  onClick={() => setHours(h)}
                >
                  {h}h
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className={styles.label}>Početak — {formatDay(date)}</p>
            {starts.length === 0 ? (
              <p className={styles.muted} style={{ marginTop: 10 }}>
                Nema slobodnog bloka od {length}h tog dana — skrati sesiju ili izaberi drugi dan.
              </p>
            ) : (
              <div className={styles.chips}>
                {starts.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`${styles.chip} ${chosen === s ? styles.chipActive : ""}`}
                    aria-pressed={chosen === s}
                    onClick={() => setSlot(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <label className={flow.field}>
            <span>Tema (opciono)</span>
            <input
              type="text"
              maxLength={300}
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              placeholder="šta želiš da pokrijemo"
            />
          </label>

          <div className={flow.actions}>
            <button
              type="button"
              className={flow.submit}
              disabled={busy || !chosen}
              onClick={submit}
              data-cta="edukacija-zakazi"
              data-cursor="on"
            >
              {busy ? "Zakazujem…" : `Zakaži ${length}h`}
            </button>
            <em className={flow.hint}>
              Skida {formatHours(length)} sa stanja. Otkazivanje do {CANCEL_CUTOFF_HOURS}h pre termina.
            </em>
          </div>
        </div>
      ) : null}

      {error ? (
        <p className={flow.error} role="alert" style={{ marginTop: 16 }}>
          {error}
        </p>
      ) : null}
      {done ? (
        <p className={styles.ok} role="status" style={{ marginTop: 16 }}>
          {done}
        </p>
      ) : null}
    </section>
  );
}

/** Cancel a session and get the hours back. The cutoff is enforced by the API;
 *  this only surfaces what it says, so the rule lives in one place. */
export function CancelBookingV4({ id }: { id: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function cancel() {
    setBusy(true);
    setError(null);
    try {
      const response = await fetch(`/api/portal/edukacija/termini/${id}`, { method: "DELETE" });
      const data = (await response.json()) as { ok: boolean; message?: string };
      if (!data.ok) {
        setError(data.message ?? "Termin nije otkazan.");
        setConfirming(false);
        return;
      }
      router.refresh();
    } catch {
      setError("Nema veze sa serverom.");
      setConfirming(false);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      {confirming ? (
        <>
          <button type="button" className={`${styles.textBtn} ${styles.danger}`} disabled={busy} onClick={cancel}>
            {busy ? "Otkazujem…" : "Potvrdi otkazivanje"}
          </button>{" "}
          <button type="button" className={styles.textBtn} onClick={() => setConfirming(false)}>
            Odustani
          </button>
        </>
      ) : (
        <button type="button" className={styles.textBtn} onClick={() => setConfirming(true)}>
          Otkaži termin
        </button>
      )}
      {error ? (
        <p className={flow.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
