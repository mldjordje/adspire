import { getAnalyticsOverview, getCrawlerOverview } from "@/lib/analytics/queries";
import { crawlerPurpose } from "@/lib/analytics/aiVisibilitySource";
import { crawlerLabel } from "@/lib/analytics/crawlers";
import { aiSourceEngine } from "@/lib/analytics/aiReferrers";

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

  // Each data source fails independently when its table is not available.
  const [data, crawlers] = await Promise.all([
    getAnalyticsOverview(days).catch(() => null),
    getCrawlerOverview(days).catch(() => null),
  ]);

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
  const aiVisits = data.ai.byEngine.map(row => ({ source: row.engine, sessions: row.sessions, submits: row.submits }));

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

      {/* The two AI questions, kept apart on purpose. One counts an assistant
          reading the site while someone was mid-conversation; the other counts
          a person who then clicked through. A hundred of the first with none of
          the second is a different problem from the reverse. */}
      <section className="os-section">
        <h2 className="os-h3">AI</h2>
        <div className="os-cards">
          <div className="os-card">
            <span className="os-card__label">AI otvaranja na zahtev</span>
            <span className="os-card__value">{crawlers ? crawlers.live.hits : "—"}</span>
            <p className="os-note">
              {crawlers && crawlers.live.byBot.length > 0
                ? crawlers.live.byBot.map((row) => `${crawlerLabel(row.bot)} ${row.hits}`).join(" · ")
                : "ChatGPT-User, Claude-User i Perplexity-User — povlače stranu samo dok neko ćaska"}
            </p>
          </div>
          <div className="os-card">
            <span className="os-card__label">Posete iz AI asistenata</span>
            <span className="os-card__value">{data.ai.sessions}</span>
            <p className="os-note">
              {data.ai.byEngine.length > 0
                ? `${data.ai.byEngine.map((row) => `${row.engine} ${row.sessions}`).join(" · ")} · ${data.ai.submits} upita`
                : "Nema prepoznatih AI poseta u ovom periodu"}
            </p>
          </div>
          <div className="os-card">
            <span className="os-card__label">Posete sa ostalih izvora</span>
            <span className="os-card__value">{Math.max(data.sessions - data.ai.sessions, 0)}</span>
            <p className="os-note">
              Pretraga, društvene mreže, direktno i preporuke — razloženo niže
            </p>
          </div>
          <div className="os-card">
            <span className="os-card__label">Ostali bot obilasci</span>
            <span className="os-card__value">
              {crawlers ? Math.max(crawlers.hits - crawlers.live.hits, 0) : "—"}
            </span>
            <p className="os-note">
              Pretraga, obuka modela i drugi automatski obilasci.
            </p>
          </div>
        </div>
        <p className="os-note">
          Otvaranje na zahtev nije dokaz citiranja: agent može pročitati stranicu bez
          preporuke ili zato što je korisnik uneo njen URL. Google i Bing AI odgovori
          ne mogu se izdvojiti iz njihovog običnog saobraćaja ovim podacima.
        </p>
      </section>

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


      <section className="os-section">
        <h2 className="os-h3">Posete iz AI asistenata</h2>
        <p className="os-sub">Posete sa prepoznatim AI izvorom i sesije u kojima je poslata forma.</p>
        {aiVisits === null ? <p className="os-empty">AI izvori trenutno nisu dostupni.</p> : (
          <div className="os-tablewrap">
            <table className="os-table">
              <thead><tr><th>Izvor</th><th>Posete</th><th>Poslali upit</th><th>Konverzija</th></tr></thead>
              <tbody>
                {aiVisits.length === 0 ? <tr><td colSpan={4}>Nema prepoznatih AI poseta u ovom periodu.</td></tr> : aiVisits.map(row => (
                  <tr key={row.source}><td>{row.source}</td><td>{row.sessions}</td><td>{row.submits}</td><td>{pct(row.submits, row.sessions)}%</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="os-note">Izvor se prepoznaje iz referrera ili UTM oznake. Posete bez tih podataka nisu obuhvaćene. Slanje forme nije potvrda kvalifikovanog upita; kvalitet proveri u listi upita. Google AI odgovore nije moguće izdvojiti iz običnog Google saobraćaja ovim podacima.</p>
      </section>

      <section className="os-section">
        <h2 className="os-h3">AI crawleri</h2>
        <p className="os-note">Obilasci botova nisu posete kupaca niti dokaz preporuke. Namena se određuje prema prijavljenom user-agentu, bez potvrde identiteta bota.</p>
        {!crawlers ? (
          <p className="os-empty">
            Tabela <code>crawler_hits</code> još ne postoji. Pokreni migracije
            (<code>npm run db:migrate</code>) pa osveži stranu.
          </p>
        ) : !crawlers.everRecorded ? (
          <p className="os-empty">
            Još nijedan AI crawler nije zabeležen. Meri se od trenutka kada je ovo
            pušteno — stariji obilasci se ne mogu vratiti unazad.
          </p>
        ) : (
          <>
            <p className="os-sub">
              {crawlers.hits} obilazaka · {crawlers.bots} različitih botova u poslednjih{" "}
              {crawlers.days} dana.
            </p>
            <div className="os-grid2">
              <div className="os-tablewrap">
                <table className="os-table">
                  <thead>
                    <tr>
                      <th>Bot</th>
                      <th>Motor</th>
                      <th>Namena</th>
                      <th>Obilazaka</th>
                      <th>Strana</th>
                      <th>Poslednji put</th>
                    </tr>
                  </thead>
                  <tbody>
                    {crawlers.byBot.length === 0 ? (
                      <tr>
                        <td colSpan={6}>Nema obilazaka u ovom periodu.</td>
                      </tr>
                    ) : (
                      crawlers.byBot.map((row) => (
                        <tr key={row.bot}>
                          <td>{crawlerLabel(row.bot)}</td>
                          <td>{row.engine}</td>
                          <td>{crawlerPurpose(row.bot)}</td>
                          <td>{row.hits}</td>
                          <td>{row.paths}</td>
                          <td>{new Date(row.lastSeen).toLocaleDateString("sr-RS")}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="os-tablewrap">
                <table className="os-table">
                  <thead>
                    <tr>
                      <th>Strana</th>
                      <th>Obilazaka</th>
                      <th>Botova</th>
                    </tr>
                  </thead>
                  <tbody>
                    {crawlers.byPath.length === 0 ? (
                      <tr>
                        <td colSpan={3}>Nema obilazaka u ovom periodu.</td>
                      </tr>
                    ) : (
                      crawlers.byPath.map((row) => (
                        <tr key={row.path}>
                          <td>{row.path}</td>
                          <td>{row.hits}</td>
                          <td>{row.bots}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {crawlers.errors.length > 0 && (
              <p className="os-note">
                Crawleri dobijaju greške na:{" "}
                {crawlers.errors
                  .map((row) => `${row.path} (${crawlerLabel(row.bot)}, ${row.status}× ${row.hits})`)
                  .join(", ")}
                . Svaka od tih strana je sadržaj koji AI nije mogao da pročita.
              </p>
            )}

            <p className="os-note">
              {crawlers.drainHits === 0
                ? "Mere se samo zahtevi ka /llms.txt i /llms-full.txt. Za pokrivenost po stranama uključi Vercel log drain (Observability → Log Drains) na /api/logs/drain. Vercel Analytics ovde ne pomaže — to je skripta u pregledaču, a crawleri ne izvršavaju JavaScript."
                : `Log drain radi: ${crawlers.drainHits} od ${crawlers.hits} obilazaka stiže sa punog serverskog loga.`}
            </p>
          </>
        )}
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
                      <td>
                        {row.source}
                        {aiSourceEngine(row.source) ? " · AI" : null}
                      </td>
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
