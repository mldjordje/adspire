import Link from "next/link";

import { serviceTitles } from "@/lib/inquiries/catalog";
import { listInquiries } from "@/lib/inquiries/store";
import {
  INQUIRY_STATUS_LABEL,
  INQUIRY_STATUSES,
  isInquiryStatus,
  type InquiryStatus,
} from "@/lib/inquiries/types";
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

  const rows = await listInquiries({ status: active, query });
  const waiting = rows.filter((row) => row.status === "submitted").length;

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
            Briefovi sa sajta. Neodgovoreni su prvi u listi
            {active ? "" : `, ${waiting} čeka ponudu`}.
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
            {INQUIRY_STATUS_LABEL[value]}
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
                  <th>Čeka</th>
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
                  const late =
                    row.status === "submitted" &&
                    Date.now() - new Date(row.created_at).getTime() > 2 * 86_400_000;
                  return (
                    <tr key={row.id} className={late ? "is-stale" : undefined}>
                      <td title={formatDateTime(row.created_at)}>
                        {since(row.created_at)}
                        {late ? <span className="os-dot" aria-label="kasni" /> : null}
                      </td>
                      <td>
                        <Link href={`/os/upiti/${row.id}`}>{row.reference}</Link>
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
                                : row.status === "submitted"
                                  ? " os-badge--new"
                                  : ""
                          }`}
                        >
                          {INQUIRY_STATUS_LABEL[row.status]}
                        </span>
                        {row.follow_up_on ? (
                          <div className="os-note">podsetnik {row.follow_up_on}</div>
                        ) : null}
                      </td>
                      <td className="os-table__actions">
                        <Link
                          className={`os-btn os-btn--sm${
                            row.status === "submitted" ? "" : " os-btn--ghost"
                          }`}
                          href={`/os/upiti/${row.id}`}
                        >
                          {row.status === "submitted" ? "Pošalji ponudu" : "Otvori"}
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
