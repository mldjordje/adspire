import Link from "next/link";
import { notFound } from "next/navigation";

import { sendQuote, updateInquiry } from "@/lib/inquiries/actions";
import { serviceTitles } from "@/lib/inquiries/catalog";
import { statusUrl } from "@/lib/inquiries/notify";
import { getInquiryById } from "@/lib/inquiries/store";
import {
  BUYER_TYPE_LABEL,
  INQUIRY_STATUS_LABEL,
  INQUIRY_STATUSES,
  isTimeframe,
  TIMEFRAME_LABEL,
  type BuyerType,
} from "@/lib/inquiries/types";

export const dynamic = "force-dynamic";

const formatDateTime = (value: string | null) =>
  value ? new Date(value).toLocaleString("sr-RS", { dateStyle: "short", timeStyle: "short" }) : "—";

export default async function OsUpitDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const upit = await getInquiryById(id);
  if (!upit) notFound();

  const timeframe = isTimeframe(upit.brief?.timeframe) ? upit.brief.timeframe : null;

  return (
    <>
      <p className="os-sub">
        <Link href="/os/upiti">← Svi upiti</Link>
      </p>
      <h1 className="os-h1">
        {upit.reference} <span className="os-badge">{INQUIRY_STATUS_LABEL[upit.status]}</span>
      </h1>
      <p className="os-sub">
        {upit.business_name} · {serviceTitles(upit.services).join(" + ")} · stiglo{" "}
        {formatDateTime(upit.created_at)}
      </p>

      <section className="os-section">
        <h2>Ponuda</h2>
        <form action={sendQuote} className="os-stageform">
          <input type="hidden" name="id" value={upit.id} />
          <input
            name="amount"
            inputMode="decimal"
            placeholder="Cena"
            defaultValue={upit.quoted_amount ?? ""}
            aria-label="Cena"
            required
          />
          <select name="currency" defaultValue={upit.currency} aria-label="Valuta">
            <option value="EUR">EUR</option>
            <option value="RSD">RSD</option>
            <option value="USD">USD</option>
          </select>
          <input
            name="turnaroundDays"
            inputMode="numeric"
            placeholder="Rok (dana)"
            defaultValue={upit.turnaround_days ?? ""}
            aria-label="Rok u danima"
          />
          <input
            name="validUntil"
            type="date"
            defaultValue={upit.quote_valid_until ?? ""}
            aria-label="Ponuda važi do"
          />
          <input
            name="note"
            placeholder="Šta ulazi u cenu (ide klijentu)"
            defaultValue={upit.quote_note ?? ""}
            aria-label="Napomena uz ponudu"
          />
          <button className="os-btn" type="submit">
            {upit.quoted_at ? "Pošalji ponovo" : "Pošalji ponudu"}
          </button>
        </form>
        <p className="os-sub">
          Poslato: {formatDateTime(upit.quoted_at)} · Odgovor: {formatDateTime(upit.responded_at)}
          {upit.decline_reason ? ` · Razlog: ${upit.decline_reason}` : ""}
        </p>
      </section>

      <section className="os-section">
        <h2>Status i beleška</h2>
        <form action={updateInquiry} className="os-stageform">
          <input type="hidden" name="id" value={upit.id} />
          <select name="status" defaultValue={upit.status} aria-label="Status">
            {INQUIRY_STATUSES.map((status) => (
              <option key={status} value={status}>
                {INQUIRY_STATUS_LABEL[status]}
              </option>
            ))}
          </select>
          <input
            name="adminNote"
            placeholder="Interna beleška"
            defaultValue={upit.admin_note ?? ""}
            aria-label="Interna beleška"
          />
          <button className="os-btn" type="submit">
            Sačuvaj
          </button>
        </form>
      </section>

      <section className="os-section">
        <h2>Brief</h2>
        <p style={{ whiteSpace: "pre-wrap", margin: 0 }}>{upit.brief?.idea}</p>
        {upit.brief?.wishes ? (
          <>
            <h2 style={{ marginTop: 24 }}>Želje</h2>
            <p style={{ whiteSpace: "pre-wrap", margin: 0 }}>{upit.brief.wishes}</p>
          </>
        ) : null}
        <h2 style={{ marginTop: 24 }}>O biznisu</h2>
        <p style={{ whiteSpace: "pre-wrap", margin: 0 }}>{upit.business_description}</p>
      </section>

      <section className="os-section">
        <h2>Klijent</h2>
        <dl className="os-kv">
          <dt>Ime</dt>
          <dd>{upit.full_name}</dd>
          <dt>Email</dt>
          <dd>
            <a href={`mailto:${upit.email}`}>{upit.email}</a>
          </dd>
          <dt>Telefon</dt>
          <dd>{upit.phone ? <a href={`tel:${upit.phone}`}>{upit.phone}</a> : "—"}</dd>
          <dt>Naručilac</dt>
          <dd>{BUYER_TYPE_LABEL[upit.buyer_type as BuyerType] ?? upit.buyer_type}</dd>
          <dt>Firma</dt>
          <dd>{upit.company_name ?? "—"}</dd>
          <dt>PIB / MB</dt>
          <dd>{upit.pib || upit.mb ? `${upit.pib ?? "—"} / ${upit.mb ?? "—"}` : "—"}</dd>
          <dt>Adresa</dt>
          <dd>{[upit.address, upit.city, upit.country].filter(Boolean).join(", ") || "—"}</dd>
          <dt>Rok</dt>
          <dd>{timeframe ? TIMEFRAME_LABEL[timeframe] : "—"}</dd>
          <dt>Budžet</dt>
          <dd>{upit.budget_eur != null ? `${upit.budget_eur} EUR` : "nije naveden"}</dd>
          <dt>Lead</dt>
          <dd>{upit.lead_id ? <Link href={`/os/leads/${upit.lead_id}`}>otvori lead</Link> : "—"}</dd>
          <dt>Link za klijenta</dt>
          <dd>
            <a href={statusUrl(upit.access_token)} target="_blank" rel="noreferrer">
              status upita
            </a>
          </dd>
        </dl>
      </section>
    </>
  );
}
