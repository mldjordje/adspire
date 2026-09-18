import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { EduPackagesV4 } from "@/components/site/v4/EduPackagesV4";
import { PageShellV4 } from "@/components/site/v4/PageShellV4";
import { PortalNavV4 } from "@/components/site/v4/PortalNavV4";
import { CancelBookingV4, EducationCalendarV4 } from "@/components/site/v4/EducationBookingV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import flow from "@/components/site/v4/InquiryFlowV4.module.css";
import styles from "@/components/site/v4/EducationV4.module.css";
import { isDatabaseConfigured } from "@/lib/db";
import {
  BOOKING_STATUS_LABEL,
  formatDay,
  formatHours,
  KIND_LABEL,
  LEDGER_REASON_LABEL,
} from "@/lib/education/format";
import { belgradeNow, CANCEL_CUTOFF_HOURS, endSlot, minutesUntil } from "@/lib/education/slots";
import {
  getBuyerBookings,
  getWallets,
  listBuyerLedger,
  type EduBooking,
} from "@/lib/education/store";
import { getPortalSession } from "@/lib/portal/session";

/**
 * The client's edukacija: hours on the wallet, the calendar to spend them, and
 * every session booked so far. Hours arrive from /os after payment — packages
 * are shown, but there is no checkout here.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edukacija",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ porudzbina?: string }> };

export default async function NalogEdukacijaPage({ searchParams }: Props) {
  const { porudzbina } = await searchParams;
  const login = "/nalog/prijava?next=/nalog/edukacija";
  if (!isDatabaseConfigured()) redirect(login);
  const session = await getPortalSession();
  if (!session) redirect(login);

  // A pending migration must read as "nothing here yet", not as a stack trace.
  const data = await Promise.all([
    getWallets(session.userId),
    getBuyerBookings(session.userId),
    listBuyerLedger(session.userId),
  ]).catch((error) => {
    console.error("edu_account_failed", { error });
    return null;
  });
  const wallets = data?.[0] ?? [];
  const { upcoming, past } = data?.[1] ?? { upcoming: [], past: [] };
  const ledger = data?.[2] ?? [];

  const now = belgradeNow();
  // Decided on the server: the device clock is whatever the device says, and the
  // API refuses on Belgrade time.
  const cancellable = (b: EduBooking) =>
    (minutesUntil(b.date, b.startSlot, now) ?? -1) >= CANCEL_CUTOFF_HOURS * 60;
  const withHours = wallets.filter((w) => w.purchased > 0 || w.remaining > 0);
  const totalRemaining = wallets.reduce((sum, w) => sum + w.remaining, 0);

  return (
    <div className={v4FontClass}>
      <PageShellV4
        eyebrow="Nalog"
        title={<>Edukacija</>}
        intro="Sati stoje na stanju. Svaki termin skida sate, a otkazivanje do 24h pre početka ih vraća."
      >
        <section className={flow.wrap} data-reveal>
          <div className={styles.stack}>
            <PortalNavV4 active="edukacija" />

            {porudzbina === "ok" ? (
              <div className={styles.panel}>
                <h2 className={styles.title}>Porudžbina je primljena</h2>
                <p className={styles.muted} style={{ marginTop: 10 }}>
                  Potvrda ti je stigla na mejl. Javljam se lično sa predračunom i dogovorom o temama —
                  čim uplata legne, sati se pojave ovde i kalendar se otključava.
                </p>
              </div>
            ) : null}

            {withHours.length === 0 ? (
              <EduPackagesV4
                title="Na stanju još nema sati"
                intro="Poruči paket u dva klika. Javljam se sa predračunom, a čim uplata legne sati stoje ovde i termine biraš sam."
              />
            ) : (
              <div className={styles.wallets}>
                {withHours.map((w) => (
                  <div key={w.kind} className={styles.panel}>
                    <p className={styles.label}>{KIND_LABEL[w.kind]}</p>
                    <p className={styles.value}>{formatHours(w.remaining)}</p>
                    <p className={styles.muted}>
                      Iskorišćeno {formatHours(w.used)} od {formatHours(w.purchased)}
                    </p>
                    <div className={styles.bar}>
                      <div
                        className={styles.barFill}
                        style={{
                          width: `${Math.min(100, Math.round((w.remaining / Math.max(w.purchased, 1)) * 100))}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <EducationCalendarV4
              wallets={wallets.map((w) => ({ kind: w.kind, remaining: w.remaining }))}
              initialMonth={now.date.slice(0, 7)}
            />

            <div className={styles.panel}>
              <h2 className={styles.title}>Zakazani termini</h2>
              {upcoming.length === 0 ? (
                <p className={styles.muted} style={{ marginTop: 10 }}>
                  Nemaš zakazanih termina.
                </p>
              ) : (
                <ul className={styles.list}>
                  {upcoming.map((b) => (
                    <li key={b.id} className={styles.item}>
                      <div>
                        <p className={styles.itemTitle}>
                          {formatDay(b.date)} · {b.startSlot}–{endSlot(b.startSlot, b.hours)}
                        </p>
                        <p className={styles.itemMeta}>
                          {KIND_LABEL[b.kind]} · {formatHours(b.hours)}
                          {b.topic ? ` · ${b.topic}` : ""}
                        </p>
                        <p className={styles.itemMeta}>
                          {b.meetUrl ? (
                            <a className={styles.link} href={b.meetUrl} target="_blank" rel="noreferrer">
                              Otvori link za sastanak
                            </a>
                          ) : (
                            "Link za sastanak stiže ovde i na mejl pre termina."
                          )}
                        </p>
                        {cancellable(b) ? (
                          <CancelBookingV4 id={b.id} />
                        ) : (
                          <p className={styles.itemMeta}>
                            Termin je bliži od {CANCEL_CUTOFF_HOURS}h — za izmenu se javi direktno.
                          </p>
                        )}
                      </div>
                      <span className={`${styles.status} ${styles.status_zakazano}`}>
                        {BOOKING_STATUS_LABEL[b.status]}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {past.length > 0 ? (
              <div className={styles.panel}>
                <h2 className={styles.title}>Prethodni termini</h2>
                <ul className={styles.list}>
                  {past.map((b) => (
                    <li key={b.id} className={styles.item}>
                      <div>
                        <p className={styles.itemTitle}>
                          {formatDay(b.date)} · {b.startSlot}
                        </p>
                        <p className={styles.itemMeta}>
                          {KIND_LABEL[b.kind]} · {formatHours(b.hours)}
                          {b.topic ? ` · ${b.topic}` : ""}
                        </p>
                        {b.recordingUrl ? (
                          <p className={styles.itemMeta}>
                            <a className={styles.link} href={b.recordingUrl} target="_blank" rel="noreferrer">
                              Snimak sesije
                            </a>
                          </p>
                        ) : null}
                      </div>
                      <span
                        className={`${styles.status} ${b.status === "odrzano" ? styles.status_odrzano : ""}`}
                      >
                        {BOOKING_STATUS_LABEL[b.status]}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {ledger.length > 0 ? (
              <div className={styles.panel}>
                <h2 className={styles.title}>Istorija sati</h2>
                <ul className={styles.list}>
                  {ledger.map((entry) => (
                    <li key={entry.id} className={styles.item}>
                      <div>
                        <p className={styles.itemTitle}>
                          {entry.hours > 0 ? "+" : "−"}
                          {formatHours(Math.abs(entry.hours))} · {KIND_LABEL[entry.kind]}
                        </p>
                        <p className={styles.itemMeta}>
                          {LEDGER_REASON_LABEL[entry.reason]}
                          {entry.note ? ` · ${entry.note}` : ""}
                        </p>
                      </div>
                      <span className={styles.itemMeta}>{entry.createdAt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {withHours.length > 0 && totalRemaining < 2 ? (
              <EduPackagesV4
                title="Sati su pri kraju"
                intro="Dopuni paket da ne prekidaš ritam. Novi sati se dodaju na postojeće stanje."
              />
            ) : null}

            <div className={flow.sentActions}>
              <Link className={flow.ghost} href="/edukacija" data-cursor="on">
                O edukaciji
              </Link>
            </div>
          </div>
        </section>
      </PageShellV4>
    </div>
  );
}
