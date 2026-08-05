import Link from "next/link";

import { serviceTitles } from "@/lib/inquiries/catalog";
import { listInquiries } from "@/lib/inquiries/store";
import {
  INQUIRY_STATUS_LABEL,
  INQUIRY_STATUSES,
  isInquiryStatus,
} from "@/lib/inquiries/types";

export const dynamic = "force-dynamic";

const formatDate = (value: string) =>
  new Date(value).toLocaleString("sr-RS", { dateStyle: "short", timeStyle: "short" });

export default async function OsUpitiPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const active = isInquiryStatus(status) ? status : undefined;

  const all = await listInquiries();
  const rows = active ? all.filter((row) => row.status === active) : all;
  const waiting = all.filter((row) => row.status === "submitted").length;

  return (
    <>
      <h1 className="os-h1">Upiti</h1>
      <p className="os-sub">
        Briefovi sa sajta. {waiting} čeka ponudu.
      </p>

      <section className="os-section">
        <h2>Filter</h2>
        <div className="os-stageform">
          <Link className={`os-badge${active ? " os-badge--muted" : ""}`} href="/os/upiti">
            Svi
          </Link>
          {INQUIRY_STATUSES.map((value) => (
            <Link
              key={value}
              className={`os-badge${active === value ? "" : " os-badge--muted"}`}
              href={`/os/upiti?status=${value}`}
            >
              {INQUIRY_STATUS_LABEL[value]}
            </Link>
          ))}
        </div>
      </section>

      <section className="os-section">
        <h2>{rows.length} upita</h2>
        {rows.length === 0 ? (
          <p className="os-empty">{active ? "Nema upita u ovoj fazi." : "Još nema upita."}</p>
        ) : (
          <div className="os-tablewrap">
            <table className="os-table">
              <thead>
                <tr>
                  <th>Broj</th>
                  <th>Klijent</th>
                  <th>Usluge</th>
                  <th>Budžet</th>
                  <th>Status</th>
                  <th>Stiglo</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <Link href={`/os/upiti/${row.id}`}>{row.reference}</Link>
                    </td>
                    <td>
                      {row.full_name}
                      <br />
                      <span className="os-sub">{row.business_name}</span>
                    </td>
                    <td>{serviceTitles(row.services).join(" + ")}</td>
                    <td>{row.budget_eur != null ? `${row.budget_eur} EUR` : "—"}</td>
                    <td>
                      <span className="os-badge">{INQUIRY_STATUS_LABEL[row.status]}</span>
                    </td>
                    <td>{formatDate(row.created_at)}</td>
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
