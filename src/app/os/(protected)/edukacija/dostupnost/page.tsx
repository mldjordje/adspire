import Link from "next/link";

import { saveAvailabilityAction } from "@/lib/education/actions";
import { formatDay, formatMonth } from "@/lib/education/format";
import {
  belgradeNow,
  isDate,
  isMonth,
  monthCells,
  OPENABLE_SLOTS,
  shiftMonth,
} from "@/lib/education/slots";
import { getAvailabilityMonth, type AvailabilityDay } from "@/lib/education/store";

export const dynamic = "force-dynamic";

const WEEKDAYS = ["Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned"];

type Props = {
  searchParams: Promise<{ mesec?: string; dan?: string; poruka?: string; greska?: string }>;
};

/**
 * The studio's open hours. A plain month grid and one form per day — no client
 * JavaScript, same as the rest of /os.
 */
export default async function DostupnostPage({ searchParams }: Props) {
  const params = await searchParams;
  const today = belgradeNow().date;
  const month = params.mesec && isMonth(params.mesec) ? params.mesec : today.slice(0, 7);
  const selected = params.dan && isDate(params.dan) && params.dan.startsWith(month) ? params.dan : null;

  const days = await getAvailabilityMonth(month).catch((error) => {
    console.error("edu_availability_os_failed", { error });
    return null;
  });

  if (!days) {
    return (
      <>
        <h1 className="os-h1">Dostupnost</h1>
        <p className="os-alert">
          Tabele za edukaciju ne postoje. Pokreni <code>npm run db:migrate</code>.
        </p>
      </>
    );
  }

  const byDate = new Map<string, AvailabilityDay>(days.map((d) => [d.date, d]));
  const cells = monthCells(month);
  const weeks: (string | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  const day = selected ? byDate.get(selected) : undefined;
  const openSlots = new Set(day?.slots ?? []);
  const takenSlots = new Set(day?.taken ?? []);
  const href = (m: string, d?: string) => `/os/edukacija/dostupnost?mesec=${m}${d ? `&dan=${d}` : ""}`;

  return (
    <>
      <p className="os-sub">
        <Link href="/os/edukacija">← Edukacija</Link>
      </p>
      <h1 className="os-h1">Dostupnost</h1>
      <p className="os-sub">
        Klikni dan pa uključi sate koje klijent može da rezerviše. Dan bez sati je zatvoren.
        Zatvaranje sata ne otkazuje već zakazan termin.
      </p>

      {params.poruka ? <p className="os-note">{params.poruka}</p> : null}
      {params.greska ? <p className="os-alert">{params.greska}</p> : null}

      <section className="os-section">
        <p style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link className="os-btn os-btn--sm os-btn--ghost" href={href(shiftMonth(month, -1))}>
            ‹
          </Link>
          <strong style={{ minWidth: 150, textAlign: "center" }}>{formatMonth(month)}</strong>
          <Link className="os-btn os-btn--sm os-btn--ghost" href={href(shiftMonth(month, 1))}>
            ›
          </Link>
        </p>

        <div className="os-tablewrap">
          <table className="os-table os-table--fixed">
            <thead>
              <tr>
                {WEEKDAYS.map((w) => (
                  <th key={w}>{w}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeks.map((week, i) => (
                <tr key={i}>
                  {Array.from({ length: 7 }, (_, j) => week[j] ?? null).map((date, j) => {
                    if (!date) return <td key={`blank-${j}`} />;
                    const info = byDate.get(date);
                    const open = info?.slots.length ?? 0;
                    const booked = info?.taken.length ?? 0;
                    return (
                      <td
                        key={date}
                        style={{
                          verticalAlign: "top",
                          opacity: date < today ? 0.4 : 1,
                          outline: date === selected ? "2px solid #2f6bff" : undefined,
                        }}
                      >
                        <Link href={href(month, date)}>
                          <strong>{Number(date.slice(-2))}</strong>
                        </Link>
                        <br />
                        <small>{open ? `${open} otvoreno` : "—"}</small>
                        {booked ? (
                          <>
                            <br />
                            <small>{booked} zauzeto</small>
                          </>
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {selected ? (
        <section className="os-section">
          <h2>{formatDay(selected)}</h2>
          {selected < today ? (
            <p className="os-empty">Dan je prošao.</p>
          ) : (
            <form action={saveAvailabilityAction} className="os-form">
              <input type="hidden" name="date" value={selected} />
              <input type="hidden" name="back" value={href(month, selected)} />
              {OPENABLE_SLOTS.map((slot) => (
                <label key={slot} className="os-form__check">
                  <input type="checkbox" name="slot" value={slot} defaultChecked={openSlots.has(slot)} />
                  {slot}
                  {takenSlots.has(slot) ? " · zauzeto" : ""}
                </label>
              ))}
              <label className="os-form__check os-form__wide">
                <input type="checkbox" name="repeat" />
                Primeni na sve iste dane u nedelji do kraja meseca
              </label>
              <div className="os-form__wide" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                <button className="os-btn" type="submit">
                  Sačuvaj
                </button>
                <button className="os-btn os-btn--ghost" type="submit" name="preset" value="workday">
                  09–17h
                </button>
                <button className="os-btn os-btn--ghost" type="submit" name="preset" value="closed">
                  Zatvori dan
                </button>
              </div>
            </form>
          )}
        </section>
      ) : null}
    </>
  );
}
