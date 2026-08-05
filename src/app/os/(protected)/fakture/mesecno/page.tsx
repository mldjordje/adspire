import Link from "next/link";

import { money } from "@/components/os/billingUi";
import { issueRecurringClientAction, runRecurringAction } from "@/lib/billing/actions";
import {
  currentPeriod,
  listRecurringCandidates,
  periodLabel,
} from "@/lib/billing/recurring";

export const dynamic = "force-dynamic";

/** 'YYYY-MM' or nothing. Guards the value that goes into the query and the
 *  document's printed period. */
const isPeriod = (value: string | undefined): value is string =>
  typeof value === "string" && /^\d{4}-(0[1-9]|1[0-2])$/.test(value);

export default async function RecurringPage({
  searchParams,
}: {
  searchParams: Promise<{
    period?: string;
    izdato?: string;
    greska?: string;
    poslato?: string;
  }>;
}) {
  const { period: raw, izdato, greska, poslato } = await searchParams;
  const period = isPeriod(raw) ? raw : currentPeriod();
  const candidates = await listRecurringCandidates(period);

  const pending = candidates.filter((row) => !row.existing);
  const done = candidates.filter((row) => row.existing);
  const withoutEmail = pending.filter((row) => !row.email).length;
  const totals = new Map<string, number>();
  for (const row of pending) {
    totals.set(row.currency, (totals.get(row.currency) ?? 0) + row.total);
  }

  return (
    <>
      <p className="os-crumbs">
        <Link href="/os/fakture">← Fakture</Link>
      </p>

      <header className="os-head">
        <div>
          <h1 className="os-h1">Mesečne pretplate</h1>
          <p className="os-sub">
            Održavanje za {periodLabel(period)}. Jedan račun po klijentu i valuti — drugi
            pokušaj ne pravi drugi broj.
          </p>
        </div>
        <form className="os-search" action="/os/fakture/mesecno">
          <input type="month" name="period" defaultValue={period} aria-label="Mesec" />
          <button className="os-btn os-btn--ghost os-btn--sm" type="submit">
            Prikaži
          </button>
        </form>
      </header>

      {izdato || greska || poslato ? (
        <p className={`os-flash is-${Number(greska ?? 0) > 0 ? "bad" : "ok"}`} role="status">
          Izdato: {izdato ?? 0} · poslato mejlom: {poslato ?? 0} · grešaka: {greska ?? 0}
        </p>
      ) : null}

      {candidates.length === 0 ? (
        <section className="os-section">
          <p className="os-empty">
            Nijedan aktivan klijent nema aktivnu pretplatu. Pretplate se dodaju na kartici
            klijenta.
          </p>
        </section>
      ) : (
        <>
          <section className="os-section os-section--focus">
            <h2>
              Za izdavanje: {pending.length}{" "}
              <span className="os-note">
                {Array.from(totals.entries())
                  .map(([currency, amount]) => money(amount, currency))
                  .join(" · ") || "—"}
              </span>
            </h2>

            {pending.length === 0 ? (
              <p className="os-empty">Sve je izdato za {periodLabel(period)}.</p>
            ) : (
              <form action={runRecurringAction} className="os-inline">
                <input type="hidden" name="period" value={period} />
                <button className="os-btn" type="submit">
                  Izdaj sve ({pending.length})
                </button>
                <label className="os-check">
                  <input type="checkbox" name="send" value="1" />
                  odmah pošalji klijentima mejlom
                </label>
                {withoutEmail > 0 ? (
                  <span className="os-note">
                    {withoutEmail} bez mejl adrese — njima se izdaje, ali se ne šalje.
                  </span>
                ) : null}
              </form>
            )}
          </section>

          <section className="os-section">
            <h2>Klijenti sa pretplatom</h2>
            <div className="os-tablewrap">
              <table className="os-table">
                <thead>
                  <tr>
                    <th>Klijent</th>
                    <th>Stavke</th>
                    <th>Mesečno</th>
                    <th>Status</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((row) => (
                    <tr key={`${row.clientId}-${row.currency}`}>
                      <td>
                        <Link href={`/os/klijenti/${row.clientId}`}>{row.clientName}</Link>
                        <div className="os-note">
                          {row.email ?? <span className="os-badge os-badge--muted">nema mejl</span>}
                        </div>
                      </td>
                      <td>
                        {row.lines.map((line, index) => (
                          <div key={index}>
                            {line.name}
                            {line.quantity !== 1 ? ` × ${line.quantity}` : ""}
                          </div>
                        ))}
                      </td>
                      <td>{money(row.total, row.currency)}</td>
                      <td>
                        {row.existing ? (
                          <>
                            <Link href={`/os/fakture/${row.existing.id}`}>
                              {row.existing.number}
                            </Link>
                            <div className="os-note">
                              {row.existing.sentAt ? "poslato" : "nije poslato"}
                            </div>
                          </>
                        ) : (
                          <span className="os-badge os-badge--new">čeka</span>
                        )}
                      </td>
                      <td className="os-table__actions">
                        {row.existing ? (
                          <Link
                            className="os-btn os-btn--ghost os-btn--sm"
                            href={`/os/fakture/${row.existing.id}`}
                          >
                            Otvori
                          </Link>
                        ) : (
                          <form action={issueRecurringClientAction}>
                            <input type="hidden" name="clientId" value={row.clientId} />
                            <input type="hidden" name="currency" value={row.currency} />
                            <input type="hidden" name="period" value={period} />
                            <button className="os-btn os-btn--sm" type="submit">
                              Izdaj
                            </button>
                          </form>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      <section className="os-section">
        <h2>Automatski</h2>
        <p className="os-note">
          Cron na Vercelu poziva <code>/api/os/cron/mesecne-fakture</code> prvog u mesecu i izdaje
          isto ovo. Šalje mejlom samo ako je <code>RECURRING_AUTOSEND=1</code> — bez toga
          dokumenta te čekaju ovde. Podešavanje: <code>docs/mesecne-fakture.md</code>.
        </p>
        {done.length > 0 ? (
          <p className="os-note">
            Za {periodLabel(period)} već izdato: {done.map((row) => row.existing?.number).join(", ")}
          </p>
        ) : null}
      </section>
    </>
  );
}
