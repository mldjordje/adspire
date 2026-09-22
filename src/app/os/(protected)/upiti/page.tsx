import Link from "next/link";

import { serviceTitles } from "@/lib/inquiries/catalog";
import { listInquiries } from "@/lib/inquiries/store";
import {
  inquiryTurn,
  OS_STATUS_FILTER_LABEL,
  osStatusLabel,
  waitingSince,
  type ThreadState,
} from "@/lib/inquiries/turn";
import {
  INTAKE_LABEL,
  INQUIRY_STATUSES,
  isInquiryStatus,
  type InquiryStatus,
} from "@/lib/inquiries/types";
import { threadStateByInquiry } from "@/lib/messages/store";
import { formatDateTime, plural, since } from "@/components/os/leadUi";

export const dynamic = "force-dynamic";

const money = (amount: number | null, currency: string) =>
  amount == null
    ? "—"
    : `${new Intl.NumberFormat("sr-RS", { maximumFractionDigits: 0 }).format(amount)} ${currency}`;

export default async function OsUpitiPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const { status, q } = await searchParams;
  const active = isInquiryStatus(status) ? status : undefined;
  const query = (q ?? "").trim();

  const [listed, threads] = await Promise.all([
    listInquiries({ status: active, query }),
    threadStateByInquiry().catch(() => new Map<string, ThreadState>()),
  ]);
  const empty: ThreadState = { lastOut: null, lastIn: null };

  // Owner's move first, oldest wait on top; the store's order holds within groups.
  const rows = listed
    .map((row) => {
      const thread = threads.get(row.id) ?? empty;
      return { ...row, thread, turn: inquiryTurn(row.status, thread) };
    })
    .sort((a, b) =>
      a.turn === "owner" && b.turn === "owner"
        ? waitingSince(a.created_at, a.thread) < waitingSince(b.created_at, b.thread)
          ? -1
          : 1
        : Number(b.turn === "owner") - Number(a.turn === "owner"),
    );
  const waiting = rows.filter((row) => row.turn === "owner").length;

  const filterHref = (value?: InquiryStatus) => {
    const params = new URLSearchParams();
    if (value) params.set("status", value);
    if (query) params.set("q", query);
    const search = params.toString();
    return `/os/upiti${search ? `?${search}` : ""}`;
  };

  return (
    <>
      <header className="os-head">
        <div>
          <h1 className="os-h1">Upiti</h1>
          <p className="os-sub">
            Briefovi sa sajta. Prvi su oni koji čekaju tebe
            {active ? "" : ` — ${waiting} ${waiting === 1 ? "čeka" : "čekaju"} odgovor`}.
          </p>
        </div>
        <form className="os-search" action="/os/upiti">
          {active ? <input type="hidden" name="status" value={active} /> : null}
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="UP-2026-0001, ime, firma, mejl…"
            aria-label="Pretraga upita"
          />
          <button className="os-btn os-btn--ghost os-btn--sm" type="submit">
            Traži
          </button>
        </form>
      </header>

      <div className="os-filters">
        <Link className={`os-chip${active ? "" : " is-on"}`} href={filterHref()}>
          Svi
        </Link>
        {INQUIRY_STATUSES.map((value) => (
          <Link
            key={value}
            className={`os-chip${active === value ? " is-on" : ""}`}
            href={filterHref(value)}
          >
            {OS_STATUS_FILTER_LABEL[value]}
          </Link>
        ))}
        {query ? (
          <Link
            className="os-chip os-chip--clear"
            href={active ? `/os/upiti?status=${active}` : "/os/upiti"}
          >
            Očisti „{query}"
          </Link>
        ) : null}
      </div>

      <section className="os-section">
        <h2>{plural(rows.length, "upit", "upita", "upita")}</h2>
        {rows.length === 0 ? (
          <p className="os-empty">
            {active || query ? "Nema upita po ovom filteru." : "Još nema upita."}
          </p>
        ) : (
          <div className="os-tablewrap">
            <table className="os-table">
              <thead>
                <tr>
                  <th>Poslednje</th>
                  <th>Broj</th>
                  <th>Klijent</th>
                  <th>Usluge</th>
                  <th>Budžet</th>
                  <th>Ponuda</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const mine = row.turn === "owner";
                  const waitStart = mine
                    ? waitingSince(row.created_at, row.thread)
                    : (row.thread.lastOut ?? row.created_at);
                  const late =
                    mine && Date.now() - new Date(waitStart).getTime() > 2 * 86_400_000;
                  const who =
                    row.turn === "closed"
                      ? null
                      : mine
                        ? row.thread.lastIn && waitStart === row.thread.lastIn
                          ? "klijent pisao"
                          : "stigao upit"
                        : "ti si odgovorio";
                  return (
                    <tr key={row.id} className={late ? "is-stale" : undefined}>
                      <td title={formatDateTime(waitStart)}>
                        {since(waitStart)}
                        {late ? <span className="os-dot" aria-label="kasni" /> : null}
                        {who ? <div className="os-note">{who}</div> : null}
                      </td>
                      <td>
                        <Link href={`/os/upiti/${row.id}`}>{row.reference}</Link>
                        {/* Only the short intake is flagged: the long brief is
                            the norm and a badge on every row says nothing. */}
                        {row.intake === "quick" ? (
                          <div className="os-note">{INTAKE_LABEL.quick}</div>
                        ) : null}
                      </td>
                      <td>
                        {row.full_name}
                        <div className="os-note">{row.business_name}</div>
                      </td>
                      <td>{serviceTitles(row.services).join(" + ")}</td>
                      <td>{row.budget_eur != null ? `${row.budget_eur} EUR` : "—"}</td>
                      <td>{money(row.quoted_amount, row.currency)}</td>
                      <td>
                        <span
                          className={`os-badge${
                            row.status === "accepted"
                              ? " os-badge--won"
                              : row.status === "declined" || row.status === "canceled"
                                ? " os-badge--lost"
                                : mine
                                  ? ""
                                  : " os-badge--muted"
                          }`}
                        >
                          {osStatusLabel(row.status, row.thread)}
                        </span>
                        {row.follow_up_on ? (
                          <div className="os-note">podsetnik {row.follow_up_on}</div>
                        ) : null}
                      </td>
                      <td className="os-table__actions">
                        <Link
                          className={`os-btn os-btn--sm${mine ? "" : " os-btn--ghost"}`}
                          href={`/os/upiti/${row.id}`}
                        >
                          {mine ? "Odgovori" : "Otvori"}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
