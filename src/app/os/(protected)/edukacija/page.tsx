import Link from "next/link";

import {
  cancelBookingAction,
  cancelOrderAction,
  grantHoursAction,
  markHeldAction,
  markOrderPaidAction,
  setBookingLinkAction,
} from "@/lib/education/actions";
import {
  BOOKING_STATUS_LABEL,
  formatDay,
  formatHours,
  KIND_LABEL,
  LEDGER_REASON_LABEL,
} from "@/lib/education/format";
import { endSlot } from "@/lib/education/slots";
import { listStudioOrders } from "@/lib/education/orders";
import { formatEur } from "@/lib/education/packages";
import {
  listInvoiceOptions,
  listLedger,
  listParticipants,
  listStudioBookings,
  type StudioFilter,
} from "@/lib/education/store";

export const dynamic = "force-dynamic";

const FILTERS: { key: StudioFilter; label: string }[] = [
  { key: "upcoming", label: "Predstoje" },
  { key: "past", label: "Prošli" },
  { key: "all", label: "Svi" },
];

const STATUS_BADGE: Record<string, string> = {
  zakazano: "os-badge",
  odrzano: "os-badge os-badge--won",
  otkazano: "os-badge os-badge--lost",
};

type Props = {
  searchParams: Promise<{
    filter?: string;
    poruka?: string;
    greska?: string;
    /** Prefill from an upit: /os/upiti/[id] → "Dodeli sate". */
    email?: string;
    ime?: string;
  }>;
};

export default async function EdukacijaOsPage({ searchParams }: Props) {
  const params = await searchParams;
  const filter: StudioFilter =
    params.filter === "past" || params.filter === "all" ? params.filter : "upcoming";
  const back = `/os/edukacija?filter=${filter}`;

  const data = await Promise.all([
    listStudioBookings(filter),
    listParticipants(),
    listLedger(30),
    listInvoiceOptions(),
    // Orders arrived in migration 014 — an older database must not take the
    // whole page down with them.
    listStudioOrders().catch(() => []),
  ]).catch((error) => {
    console.error("edu_os_failed", { error });
    return null;
  });

  if (!data) {
    return (
      <>
        <h1 className="os-h1">Edukacija</h1>
        <p className="os-alert">
          Tabele za edukaciju ne postoje. Pokreni <code>npm run db:migrate</code> (migracija
          012_education.sql).
        </p>
      </>
    );
  }

  const [bookings, participants, ledger, invoices, orders] = data;
  const pendingOrders = orders.filter((o) => o.status === "nova");
  const upcomingCount = filter === "upcoming" ? bookings.length : null;
  const hoursOnWallets = participants.reduce((sum, p) => sum + p.education + p.consulting, 0);

  return (
    <>
      <h1 className="os-h1">Edukacija</h1>
      <p className="os-sub">
        1-na-1 sesije iz wallet-a sati. Klijent zakazuje sam sa{" "}
        <code>/nalog/edukacija</code> u otvorenim terminima ·{" "}
        <Link href="/os/edukacija/dostupnost">Dostupnost →</Link>
      </p>

      {params.poruka ? <p className="os-note">{params.poruka}</p> : null}
      {params.greska ? <p className="os-alert">{params.greska}</p> : null}

      <div className="os-cards">
        {pendingOrders.length > 0 ? (
          <div className="os-card">
            <span className="os-card__label">Porudžbina čeka uplatu</span>
            <span className="os-card__value">{pendingOrders.length}</span>
          </div>
        ) : null}
        {upcomingCount !== null ? (
          <div className="os-card">
            <span className="os-card__label">Predstoji termina</span>
            <span className="os-card__value">{upcomingCount}</span>
          </div>
        ) : null}
        <div className="os-card">
          <span className="os-card__label">Polaznika</span>
          <span className="os-card__value">{participants.length}</span>
        </div>
        <div className="os-card">
          <span className="os-card__label">Sati na stanju</span>
          <span className="os-card__value">{formatHours(hoursOnWallets)}</span>
        </div>
      </div>


      <section className="os-section">
        <h2>Porudžbine sa sajta</h2>
        <p>
          Klijent bira paket na <code>/edukacija/porudzbina</code> i prijavljuje se Google nalogom.
          Porudžbina NIJE uplata — „Plaćeno" dodaje sate na nalog i šalje mejl klijentu.
        </p>
        {orders.length === 0 ? (
          <p className="os-empty">Još nema porudžbina sa sajta.</p>
        ) : (
          <div className="os-tablewrap">
            <table className="os-table">
              <thead>
                <tr>
                  <th>Kada</th>
                  <th>Klijent</th>
                  <th>Paket</th>
                  <th>Status</th>
                  <th>Akcije</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td>{o.createdAt}</td>
                    <td>
                      {o.fullName ?? "—"}
                      <br />
                      <a href={`mailto:${o.email}`}>{o.email}</a>
                      {o.phone ? (
                        <>
                          <br />
                          {o.phone}
                        </>
                      ) : null}
                      {o.goal ? (
                        <>
                          <br />
                          <em>{o.goal}</em>
                        </>
                      ) : null}
                    </td>
                    <td>
                      {o.packageId}
                      <br />
                      {formatHours(o.hours)} · {formatEur(o.priceEur)}
                    </td>
                    <td>
                      <span
                        className={
                          o.status === "placena"
                            ? "os-badge os-badge--won"
                            : o.status === "otkazana"
                              ? "os-badge os-badge--lost"
                              : "os-badge"
                        }
                      >
                        {o.status === "placena" ? "plaćena" : o.status}
                      </span>
                      {o.paidAt ? (
                        <>
                          <br />
                          <small>{o.paidAt}</small>
                        </>
                      ) : null}
                    </td>
                    <td>
                      {o.status === "nova" ? (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                          <form action={markOrderPaidAction}>
                            <input type="hidden" name="id" value={o.id} />
                            <input type="hidden" name="back" value={back} />
                            <button className="os-btn os-btn--sm" type="submit">
                              Plaćeno → dodaj sate
                            </button>
                          </form>
                          <form action={cancelOrderAction}>
                            <input type="hidden" name="id" value={o.id} />
                            <input type="hidden" name="back" value={back} />
                            <button className="os-btn os-btn--sm os-btn--ghost" type="submit">
                              Otkaži
                            </button>
                          </form>
                        </div>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="os-section">
        <h2>Termini</h2>
        <p>
          {FILTERS.map((f) => (
            <Link
              key={f.key}
              href={`/os/edukacija?filter=${f.key}`}
              className={`os-btn os-btn--sm${filter === f.key ? "" : " os-btn--ghost"}`}
              style={{ marginRight: 8 }}
            >
              {f.label}
            </Link>
          ))}
        </p>

        {bookings.length === 0 ? (
          <p className="os-empty">
            {filter === "upcoming"
              ? "Nema zakazanih termina. Otvori dane u Dostupnosti da bi klijenti mogli da biraju."
              : "Nema termina."}
          </p>
        ) : (
          <div className="os-tablewrap">
            <table className="os-table">
              <thead>
                <tr>
                  <th>Kada</th>
                  <th>Klijent</th>
                  <th>Status</th>
                  <th>Link i akcije</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => {
                  const open = b.status === "zakazano";
                  return (
                    <tr key={b.id}>
                      <td>
                        <strong>{formatDay(b.date)}</strong>
                        <br />
                        {b.startSlot}–{endSlot(b.startSlot, b.hours)}
                      </td>
                      <td>
                        {b.fullName ?? "—"}
                        <br />
                        <a href={`mailto:${b.email}`}>{b.email}</a>
                        {b.phone ? (
                          <>
                            <br />
                            {b.phone}
                          </>
                        ) : null}
                        <br />
                        {KIND_LABEL[b.kind]} · {formatHours(b.hours)}
                        {b.topic ? (
                          <>
                            <br />
                            <em>{b.topic}</em>
                          </>
                        ) : null}
                      </td>
                      <td>
                        <span className={STATUS_BADGE[b.status]}>{BOOKING_STATUS_LABEL[b.status]}</span>
                        {open && !b.meetUrl ? (
                          <>
                            <br />
                            <span className="os-badge os-badge--lost">bez linka</span>
                          </>
                        ) : null}
                        {b.cancelReason ? (
                          <>
                            <br />
                            <small>{b.cancelReason}</small>
                          </>
                        ) : null}
                      </td>
                      <td>
                        {open ? (
                          <form action={setBookingLinkAction} style={{ display: "flex", gap: 6 }}>
                            <input type="hidden" name="id" value={b.id} />
                            <input type="hidden" name="field" value="meet" />
                            <input type="hidden" name="back" value={back} />
                            <input
                              name="url"
                              defaultValue={b.meetUrl ?? ""}
                              placeholder="https://meet.google.com/…"
                            />
                            <button className="os-btn os-btn--sm" type="submit">
                              Link
                            </button>
                          </form>
                        ) : null}
                        {open && !b.meetUrl ? (
                          <a href="https://meet.google.com/new" target="_blank" rel="noreferrer">
                            Napravi Meet sobu ↗
                          </a>
                        ) : null}

                        {!open || b.recordingUrl ? (
                          <form action={setBookingLinkAction} style={{ display: "flex", gap: 6, marginTop: 6 }}>
                            <input type="hidden" name="id" value={b.id} />
                            <input type="hidden" name="field" value="recording" />
                            <input type="hidden" name="back" value={back} />
                            <input name="url" defaultValue={b.recordingUrl ?? ""} placeholder="link na snimak" />
                            <button className="os-btn os-btn--sm os-btn--ghost" type="submit">
                              Snimak
                            </button>
                          </form>
                        ) : null}

                        {open ? (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                            <form action={markHeldAction}>
                              <input type="hidden" name="id" value={b.id} />
                              <input type="hidden" name="back" value={back} />
                              <button className="os-btn os-btn--sm os-btn--ghost" type="submit">
                                Održano
                              </button>
                            </form>
                            <form action={cancelBookingAction}>
                              <input type="hidden" name="id" value={b.id} />
                              <input type="hidden" name="refund" value="1" />
                              <input type="hidden" name="reason" value="Otkazao Adspire." />
                              <input type="hidden" name="back" value={back} />
                              <button className="os-btn os-btn--sm os-btn--ghost" type="submit">
                                Otkaži + vrati sate
                              </button>
                            </form>
                            <form action={cancelBookingAction}>
                              <input type="hidden" name="id" value={b.id} />
                              <input type="hidden" name="refund" value="0" />
                              <input type="hidden" name="reason" value="Klijent se nije pojavio." />
                              <input type="hidden" name="back" value={back} />
                              <button className="os-btn os-btn--sm os-btn--ghost" type="submit">
                                Nije se pojavio
                              </button>
                            </form>
                          </div>
                        ) : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="os-section" id="dodeli">
        <h2>Dodeli ili oduzmi sate</h2>
        <p className="os-sub">
          Posle plaćene fakture dodaj sate na email klijenta. Ako nalog ne postoji, pravi se sam —
          klijent se prijavljuje linkom na mejl i vidi sate na <code>/nalog/edukacija</code>.
        </p>
        <form action={grantHoursAction} className="os-form">
          <input type="hidden" name="back" value={back} />
          <label>
            Email klijenta
            <input
              name="email"
              type="email"
              required
              placeholder="klijent@firma.rs"
              defaultValue={params.email ?? ""}
            />
          </label>
          <label>
            Ime (opciono)
            <input name="fullName" placeholder="Ime i prezime" defaultValue={params.ime ?? ""} />
          </label>
          <label>
            Vrsta
            <select name="kind" defaultValue="education">
              <option value="education">{KIND_LABEL.education}</option>
              <option value="consulting">{KIND_LABEL.consulting}</option>
            </select>
          </label>
          <label>
            Smer
            <select name="direction" defaultValue="plus">
              <option value="plus">Dodaj</option>
              <option value="minus">Oduzmi</option>
            </select>
          </label>
          <label>
            Broj sati
            <input name="hours" required inputMode="decimal" placeholder="5" />
          </label>
          <label>
            Razlog oduzimanja
            <select name="reason" defaultValue="correction">
              <option value="correction">{LEDGER_REASON_LABEL.correction}</option>
              <option value="offline">{LEDGER_REASON_LABEL.offline}</option>
            </select>
          </label>
          <label>
            Faktura (opciono)
            <select name="invoiceId" defaultValue="">
              <option value="">— bez fakture —</option>
              {invoices.map((invoice) => (
                <option key={invoice.id} value={invoice.id}>
                  {invoice.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Napomena
            <input name="note" maxLength={300} placeholder="Paket 10h, uplata 12.09." />
          </label>
          <label className="os-form__check">
            <input type="checkbox" name="notify" defaultChecked />
            Obavesti klijenta mejlom (samo kad se dodaje)
          </label>
          <div className="os-form__wide">
            <button className="os-btn" type="submit">
              Sačuvaj
            </button>
          </div>
        </form>
      </section>

      <section className="os-section">
        <h2>Polaznici</h2>
        {participants.length === 0 ? (
          <p className="os-empty">Još niko nema sate.</p>
        ) : (
          <div className="os-tablewrap">
            <table className="os-table">
              <thead>
                <tr>
                  <th>Klijent</th>
                  <th>Edukacija</th>
                  <th>Konsultacije</th>
                  <th>Ukupno dodeljeno</th>
                  <th>Poslednja promena</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((p) => (
                  <tr key={p.id}>
                    <td>
                      {p.fullName ?? "—"}
                      <br />
                      <a href={`mailto:${p.email}`}>{p.email}</a>
                    </td>
                    <td>{formatHours(p.education)}</td>
                    <td>{formatHours(p.consulting)}</td>
                    <td>{formatHours(p.purchased)}</td>
                    <td>{p.lastChange}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="os-section">
        <h2>Istorija sati</h2>
        {ledger.length === 0 ? (
          <p className="os-empty">Nema promena.</p>
        ) : (
          <div className="os-tablewrap">
            <table className="os-table">
              <thead>
                <tr>
                  <th>Vreme</th>
                  <th>Klijent</th>
                  <th>Promena</th>
                  <th>Razlog</th>
                  <th>Napomena</th>
                </tr>
              </thead>
              <tbody>
                {ledger.map((entry) => (
                  <tr key={entry.id}>
                    <td>{entry.createdAt}</td>
                    <td>{entry.email}</td>
                    <td>
                      {entry.hours > 0 ? "+" : ""}
                      {formatHours(entry.hours)} · {KIND_LABEL[entry.kind]}
                    </td>
                    <td>
                      {LEDGER_REASON_LABEL[entry.reason]}
                      {entry.invoiceNumber ? ` · ${entry.invoiceNumber}` : ""}
                    </td>
                    <td>
                      {entry.note ?? ""}
                      {entry.createdBy ? <small> ({entry.createdBy})</small> : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
