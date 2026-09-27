import Link from "next/link";

import { setCallStatusAction, setClosedDayAction } from "@/lib/calls/actions";
import { callEnd, CALL_DAY_SLOTS } from "@/lib/calls/slots";
import { listCalls, listClosedDays, type CallFilter } from "@/lib/calls/store";
import { CALL_STATUS_LABEL, TOPIC_LABELS } from "@/lib/calls/types";
import { callMeetUrl } from "@/lib/env";
import { formatDay } from "@/lib/education/format";

export const dynamic = "force-dynamic";

const FILTERS: { key: CallFilter; label: string }[] = [
  { key: "open", label: "Predstoje" },
  { key: "past", label: "Završeni" },
  { key: "all", label: "Svi" },
];

const STATUS_BADGE: Record<string, string> = {
  zakazano: "os-badge",
  odrzano: "os-badge os-badge--won",
  otkazano: "os-badge os-badge--lost",
  nije_se_javio: "os-badge os-badge--lost",
};

type Props = {
  searchParams: Promise<{ filter?: string; poruka?: string; greska?: string }>;
};

export default async function RazgovoriOsPage({ searchParams }: Props) {
  const params = await searchParams;
  const filter: CallFilter = params.filter === "past" || params.filter === "all" ? params.filter : "open";
  const back = `/os/razgovori?filter=${filter}`;

  const data = await Promise.all([listCalls(filter), listClosedDays()]).catch((error) => {
    console.error("calls_os_failed", { error });
    return null;
  });

  if (!data) {
    return (
      <>
        <h1 className="os-h1">Razgovori</h1>
        <p className="os-alert">
          Tabele za razgovore ne postoje. Pokreni <code>npm run db:migrate</code> (migracija
          015_discovery_calls.sql).
        </p>
      </>
    );
  }

  const [calls, closedDays] = data;
  const meet = callMeetUrl();

  return (
    <>
      <h1 className="os-h1">Razgovori</h1>
      <p className="os-sub">
        Poziv upoznavanja od 20 min, zakazan sa sajta (<code>/razgovor</code> i dugmad „Zakaži
        razgovor“). Termini: radnim danima 09–17 na svakih 30 min; sat u kome je edukacija je
        zauzet i obrnuto.
      </p>

      {params.poruka ? <p className="os-note">{params.poruka}</p> : null}
      {params.greska ? <p className="os-alert">{params.greska}</p> : null}
      {!meet ? (
        <p className="os-alert">
          <code>CALL_MEET_URL</code> nije podešen — Meet klijenti dobijaju poruku da link stiže
          mejlom.
        </p>
      ) : (
        <p className="os-note">
          Meet soba: <a href={meet}>{meet}</a>
        </p>
      )}

      <section className="os-section">
        <p>
          {FILTERS.map((f) => (
            <Link
              key={f.key}
              href={`/os/razgovori?filter=${f.key}`}
              className={`os-btn os-btn--sm${filter === f.key ? "" : " os-btn--ghost"}`}
              style={{ marginRight: 8 }}
            >
              {f.label}
            </Link>
          ))}
        </p>

        {calls.length === 0 ? (
          <p className="os-empty">Nema razgovora.</p>
        ) : (
          <div className="os-tablewrap">
            <table className="os-table">
              <thead>
                <tr>
                  <th>Kada</th>
                  <th>Ko</th>
                  <th>Tema</th>
                  <th>Status</th>
                  <th>Akcije</th>
                </tr>
              </thead>
              <tbody>
                {calls.map((c) => (
                  <tr key={c.id}>
                    <td>
                      {c.asap ? (
                        <strong style={{ color: "#c0392b" }}>ŠTO PRE</strong>
                      ) : (
                        <>
                          <strong>{formatDay(c.date)}</strong>
                          <br />
                          {c.startSlot}–{c.startSlot ? callEnd(c.startSlot) : ""}
                        </>
                      )}
                      <br />
                      <small>primljeno {c.createdAt}</small>
                    </td>
                    <td>
                      {c.fullName}
                      {c.company ? ` · ${c.company}` : ""}
                      <br />
                      {c.channel === "phone" ? (
                        <a href={`tel:${c.phone?.replace(/[^\d+]/g, "")}`}>📞 {c.phone}</a>
                      ) : (
                        <>Meet</>
                      )}
                      {c.email ? (
                        <>
                          <br />
                          <a href={`mailto:${c.email}`}>{c.email}</a>
                        </>
                      ) : null}
                      {c.leadId ? (
                        <>
                          <br />
                          <Link href={`/os/leads/${c.leadId}`}>Lead →</Link>
                        </>
                      ) : null}
                    </td>
                    <td>
                      {TOPIC_LABELS.sr[c.topic] ?? c.topic}
                      {c.note ? (
                        <>
                          <br />
                          <em>{c.note}</em>
                        </>
                      ) : null}
                      <br />
                      <small>
                        {c.locale.toUpperCase()}
                        {c.source ? ` · ${c.source}` : ""}
                      </small>
                    </td>
                    <td>
                      <span className={STATUS_BADGE[c.status] ?? "os-badge"}>
                        {CALL_STATUS_LABEL[c.status]}
                      </span>
                      {c.ownerNote ? (
                        <>
                          <br />
                          <small>{c.ownerNote}</small>
                        </>
                      ) : null}
                    </td>
                    <td>
                      <form action={setCallStatusAction} className="os-inline">
                        <input type="hidden" name="id" value={c.id} />
                        <input type="hidden" name="back" value={back} />
                        <input name="ownerNote" placeholder="Beleška (opciono)" defaultValue="" />
                        <select name="status" defaultValue={c.status}>
                          {Object.entries(CALL_STATUS_LABEL).map(([key, label]) => (
                            <option key={key} value={key}>
                              {label}
                            </option>
                          ))}
                        </select>
                        <button className="os-btn os-btn--sm" type="submit">
                          Sačuvaj
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="os-section">
        <h2>Zatvoreni dani</h2>
        <p>
          Radni dani su otvoreni po difoltu ({CALL_DAY_SLOTS[0]}–{callEnd(CALL_DAY_SLOTS[CALL_DAY_SLOTS.length - 1])}).
          Zatvori dan kad si na putu ili je praznik.
        </p>
        <form action={setClosedDayAction} className="os-inline">
          <input type="hidden" name="back" value={back} />
          <input type="hidden" name="closed" value="1" />
          <input type="date" name="date" required />
          <input name="note" placeholder="Razlog (opciono)" />
          <button className="os-btn os-btn--sm" type="submit">
            Zatvori dan
          </button>
        </form>
        {closedDays.length > 0 ? (
          <ul>
            {closedDays.map((d) => (
              <li key={d.date} style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 6 }}>
                {formatDay(d.date)}
                {d.note ? ` — ${d.note}` : ""}
                <form action={setClosedDayAction}>
                  <input type="hidden" name="back" value={back} />
                  <input type="hidden" name="date" value={d.date} />
                  <input type="hidden" name="closed" value="0" />
                  <button className="os-btn os-btn--sm os-btn--ghost" type="submit">
                    Otvori
                  </button>
                </form>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </>
  );
}
