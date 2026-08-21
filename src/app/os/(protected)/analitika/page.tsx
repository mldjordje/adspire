import { getAnalyticsOverview } from "@/lib/analytics/queries";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ dani?: string }> };

const RANGES = [7, 30, 90];

function pct(part: number, whole: number) {
  return whole > 0 ? Math.round((part / whole) * 100) : 0;
}

/**
 * Where visitors stop before they become an upit.
 *
 * The counters on /os say how much work is waiting. This says why there is not
 * more of it: which pages bring people in, which of those pages ever produce a
 * started form, and which channel the sessions come from. Everything is
 * session-based so one bot cannot make a page look successful.
 */
export default async function OsAnalyticsPage({ searchParams }: Props) {
  const { dani } = await searchParams;
  const parsed = Number(dani);
  const days = RANGES.includes(parsed) ? parsed : 30;

  // A pending migration must not take down the screen that explains the funnel.
  const data = await getAnalyticsOverview(days).catch(() => null);

  if (!data) {
    return (
      <>
        <header className="os-head">
          <h1 className="os-h1">Analitika</h1>
        </header>
        <p className="os-empty">
          Tabela <code>site_events</code> još ne postoji. Pokreni migracije
          (<code>npm run db:migrate</code>) pa osveži stranu.
        </p>
      </>
    );
  }

  const top = data.funnel[0]?.sessions ?? 0;

  return (
    <>
      <header className="os-head">
        <div>
          <h1 className="os-h1">Analitika</h1>
          <p className="os-sub">
            Poslednjih {data.days} dana · {data.sessions} poseta · {data.leads} leadova u bazi
            · {data.mobileShare}% sa telefona.
          </p>
        </div>
        <div className="os-chips">
          {RANGES.map((range) => (
            <a
              key={range}
              className={`os-chip${range === data.days ? " is-on" : ""}`}
              href={`/os/analitika?dani=${range}`}
            >
              {range} dana
            </a>
          ))}
        </div>
      </header>

      <div className="os-cards">
        <div className="os-card">
          <span className="os-card__label">Posete</span>
          <span className="os-card__value">{data.sessions}</span>
        </div>
        <div className="os-card">
          <span className="os-card__label">Pregleda strana</span>
          <span className="os-card__value">{data.pageViews}</span>
        </div>
        <div className="os-card">
          <span className="os-card__label">Počeli formu</span>
          <span className="os-card__value">{data.formStarts}</span>
        </div>
        <div className={`os-card${data.formSubmits === 0 ? " os-card--alert" : ""}`}>
          <span className="os-card__label">Poslali upit</span>
          <span className="os-card__value">{data.formSubmits}</span>
        </div>
        <div className="os-card">
          <span className="os-card__label">Klik na mejl/telefon</span>
          <span className="os-card__value">{data.contactIntents}</span>
        </div>
      </div>

      <section className="os-section">
        <h2 className="os-h3">Levak</h2>
        <div className="os-pipeline">
          {data.funnel.map((step) => (
            <div key={step.label} className="os-pipe-row">
              <span>{step.label}</span>
              <span className="os-pipe-bar">
                <span style={{ width: `${pct(step.sessions, top)}%` }} />
              </span>
              <span className="os-pipe-count">{step.sessions}</span>
            </div>
          ))}
        </div>
        <p className="os-note">
          Od posete do upita: {pct(data.formSubmits, data.sessions)}%. Ako ljudi počinju
          formu a ne šalju je, problem je u formi. Ako ni ne počinju, problem je u tekstu
          i ponudi na strani.
        </p>
      </section>

      <section className="os-section">
        <h2 className="os-h3">Strane koje donose upite</h2>
        <div className="os-tablewrap">
          <table className="os-table">
            <thead>
              <tr>
                <th>Strana</th>
                <th>Posete</th>
                <th>Počeli formu</th>
                <th>Upiti</th>
                <th>Konverzija</th>
              </tr>
            </thead>
            <tbody>
              {data.pages.length === 0 ? (
                <tr>
                  <td colSpan={5}>Još nema podataka.</td>
                </tr>
              ) : (
                data.pages.map((row) => (
                  <tr key={row.path}>
                    <td>{row.path}</td>
                    <td>{row.sessions}</td>
                    <td>{row.starts}</td>
                    <td>{row.submits}</td>
                    <td>{pct(row.submits, row.sessions)}%</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <div className="os-grid2">
        <section className="os-section">
          <h2 className="os-h3">Odakle dolaze</h2>
          <div className="os-tablewrap">
            <table className="os-table">
              <thead>
                <tr>
                  <th>Izvor</th>
                  <th>Posete</th>
                  <th>Upiti</th>
                </tr>
              </thead>
              <tbody>
                {data.sources.length === 0 ? (
                  <tr>
                    <td colSpan={3}>Još nema podataka.</td>
                  </tr>
                ) : (
                  data.sources.map((row) => (
                    <tr key={row.source}>
                      <td>{row.source}</td>
                      <td>{row.sessions}</td>
                      <td>{row.submits}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="os-section">
          <h2 className="os-h3">Na šta klikću</h2>
          <div className="os-tablewrap">
            <table className="os-table">
              <thead>
                <tr>
                  <th>Dugme</th>
                  <th>Klikova</th>
                  <th>Poseta</th>
                </tr>
              </thead>
              <tbody>
                {data.ctas.length === 0 ? (
                  <tr>
                    <td colSpan={3}>Još nema podataka.</td>
                  </tr>
                ) : (
                  data.ctas.map((row) => (
                    <tr key={row.label}>
                      <td>{row.label}</td>
                      <td>{row.clicks}</td>
                      <td>{row.sessions}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
