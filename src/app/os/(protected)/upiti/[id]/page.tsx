import Link from "next/link";
import { notFound } from "next/navigation";

import { ContactBar, CopyButton } from "@/components/os/ContactBar";
import { ReplyBox } from "@/components/os/ReplyBox";
import { Timeline } from "@/components/os/Timeline";
import { formatDateTime, since } from "@/components/os/leadUi";
import {
  convertInquiryToClient,
  sendInquiryReply,
  sendQuote,
  setInquiryFollowUp,
  updateInquiry,
} from "@/lib/inquiries/actions";
import { serviceTitles } from "@/lib/inquiries/catalog";
import { statusUrl } from "@/lib/inquiries/notify";
import { getInquiryById } from "@/lib/inquiries/store";
import { listMessagesForInquiry } from "@/lib/messages/store";
import {
  BUYER_TYPE_LABEL,
  INQUIRY_STATUS_LABEL,
  INTAKE_LABEL,
  isIntakeMode,
  INQUIRY_STATUSES,
  isTimeframe,
  TIMEFRAME_LABEL,
  type BuyerType,
} from "@/lib/inquiries/types";

export const dynamic = "force-dynamic";

const MAIL_FLASH: Record<string, { tone: "ok" | "bad"; text: string }> = {
  poslato: { tone: "ok", text: "Mejl je poslat i zapisan u prepisci." },
  greska: { tone: "bad", text: "Mejl NIJE poslat. Ponuda je sačuvana — proveri transport i pošalji ponovo." },
  prazno: { tone: "bad", text: "Naslov i tekst ne smeju biti prazni." },
  cena: { tone: "bad", text: "Cena mora biti broj veći od nule." },
  zatvoren: { tone: "bad", text: "Upit je već odgovoren ili otkazan — ponuda nije promenjena." },
};

const dt = (value: string | null) =>
  value ? new Date(value).toLocaleString("sr-RS", { dateStyle: "short", timeStyle: "short" }) : "—";

export default async function OsUpitDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ mail?: string }>;
}) {
  const [{ id }, { mail }] = await Promise.all([params, searchParams]);
  const upit = await getInquiryById(id);
  if (!upit) notFound();

  const messages = await listMessagesForInquiry(id).catch(() => []);
  const timeframe = isTimeframe(upit.brief?.timeframe) ? upit.brief.timeframe : null;
  const flash = mail ? MAIL_FLASH[mail] : undefined;
  const titles = serviceTitles(upit.services);
  const link = statusUrl(upit.access_token);

  return (
    <>
      <p className="os-crumbs">
        <Link href="/os/upiti">← Svi upiti</Link>
      </p>

      <header className="os-head">
        <div>
          <h1 className="os-h1">
            {upit.reference}{" "}
            <span
              className={`os-badge${
                upit.status === "accepted"
                  ? " os-badge--won"
                  : upit.status === "declined" || upit.status === "canceled"
                    ? " os-badge--lost"
                    : upit.status === "submitted"
                      ? " os-badge--new"
                      : ""
              }`}
            >
              {INQUIRY_STATUS_LABEL[upit.status]}
            </span>{" "}
            {/* A quick upit is missing the billing block and the business
                description on purpose — the badge is the reminder to answer it
                with a question rather than a finished quote. */}
            <span className="os-badge">
              {INTAKE_LABEL[isIntakeMode(upit.intake) ? upit.intake : "full"]}
            </span>
          </h1>
          <p className="os-sub">
            {upit.business_name} · {titles.join(" + ")} · stiglo {since(upit.created_at)} (
            {formatDateTime(upit.created_at)})
          </p>
        </div>
        <ContactBar
          email={upit.email}
          phone={upit.phone}
          subject={`Upit ${upit.reference}`}
          extra={
            <>
              <CopyButton value={link} label="Kopiraj link za klijenta" />
              {upit.status === "accepted" ? (
                <form action={convertInquiryToClient}>
                  <input type="hidden" name="id" value={upit.id} />
                  <button className="os-btn os-btn--sm" type="submit">
                    Napravi klijenta
                  </button>
                </form>
              ) : null}
            </>
          }
        />
      </header>

      {flash ? (
        <p className={`os-flash is-${flash.tone}`} role="status">
          {flash.text}
        </p>
      ) : null}

      <div className="os-grid2">
        <div>
          <section className="os-section os-section--focus">
            <h2>Ponuda</h2>
            <form action={sendQuote} className="os-form">
              <input type="hidden" name="id" value={upit.id} />
              <label>
                Cena
                <input
                  name="amount"
                  inputMode="decimal"
                  defaultValue={upit.quoted_amount ?? ""}
                  placeholder="1200"
                  required
                />
              </label>
              <label>
                Valuta
                <select name="currency" defaultValue={upit.currency}>
                  <option value="EUR">EUR</option>
                  <option value="RSD">RSD</option>
                  <option value="USD">USD</option>
                </select>
              </label>
              <label>
                Rok izrade (dana)
                <input
                  name="turnaroundDays"
                  inputMode="numeric"
                  defaultValue={upit.turnaround_days ?? ""}
                  placeholder="21"
                />
              </label>
              <label>
                Ponuda važi do
                <input name="validUntil" type="date" defaultValue={upit.quote_valid_until ?? ""} />
              </label>
              <label className="os-form__wide">
                Šta ulazi u cenu (ovaj tekst čita klijent)
                <textarea name="note" rows={4} defaultValue={upit.quote_note ?? ""} />
              </label>
              <div className="os-form__wide os-actions">
                <button className="os-btn" type="submit">
                  {upit.quoted_at ? "Pošalji ponudu ponovo" : "Pošalji ponudu"}
                </button>
                <span className="os-note">
                  Poslato: {dt(upit.quoted_at)} · Odgovor klijenta: {dt(upit.responded_at)}
                  {upit.decline_reason ? ` · Razlog: ${upit.decline_reason}` : ""}
                </span>
              </div>
            </form>
          </section>

          <section className="os-section">
            <h2>Odgovori klijentu</h2>
            <ReplyBox
              action={sendInquiryReply}
              idField="id"
              idValue={upit.id}
              to={upit.email}
              context={{
                firstName: upit.full_name,
                businessName: upit.business_name,
                reference: upit.reference,
              }}
            />
          </section>

          <section className="os-section">
            <h2>Brief</h2>
            <p className="os-longtext">{upit.brief?.idea}</p>
            {upit.brief?.wishes ? (
              <>
                <h3 className="os-h3">Želje</h3>
                <p className="os-longtext">{upit.brief.wishes}</p>
              </>
            ) : null}
            {upit.business_description ? (
              <>
                <h3 className="os-h3">O biznisu</h3>
                <p className="os-longtext">{upit.business_description}</p>
              </>
            ) : (
              <p className="os-note">
                Brzi upit — opis biznisa, podaci za fakturu i rok nisu traženi na formi.
                Pitaj ih u odgovoru.
              </p>
            )}
          </section>

          <section className="os-section">
            <h2>Prepiska</h2>
            <Timeline messages={messages} activities={[]} />
          </section>
        </div>

        <div>
          <section className="os-section">
            <h2>Status i beleška</h2>
            <form action={updateInquiry} className="os-form">
              <input type="hidden" name="id" value={upit.id} />
              <label>
                Status
                <select name="status" defaultValue={upit.status}>
                  {INQUIRY_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {INQUIRY_STATUS_LABEL[status]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="os-form__wide">
                Interna beleška (klijent ovo ne vidi)
                <textarea name="adminNote" rows={3} defaultValue={upit.admin_note ?? ""} />
              </label>
              <div className="os-form__wide">
                <button className="os-btn os-btn--ghost os-btn--sm" type="submit">
                  Sačuvaj
                </button>
              </div>
            </form>

            <form action={setInquiryFollowUp} className="os-inline" style={{ marginTop: 14 }}>
              <input type="hidden" name="id" value={upit.id} />
              <input
                type="date"
                name="followUpOn"
                defaultValue={upit.follow_up_on ?? ""}
                aria-label="Podseti me"
              />
              <button className="os-btn os-btn--ghost os-btn--sm" type="submit">
                Podseti me
              </button>
            </form>
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
              <dd>
                {upit.lead_id ? <Link href={`/os/leads/${upit.lead_id}`}>otvori lead</Link> : "—"}
              </dd>
              <dt>Link za klijenta</dt>
              <dd>
                <a href={link} target="_blank" rel="noreferrer">
                  status upita
                </a>
              </dd>
            </dl>
          </section>
        </div>
      </div>
    </>
  );
}
