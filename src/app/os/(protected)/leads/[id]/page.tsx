import Link from "next/link";
import { notFound } from "next/navigation";

import { ContactBar } from "@/components/os/ContactBar";
import { ReplyBox } from "@/components/os/ReplyBox";
import { Timeline } from "@/components/os/Timeline";
import {
  formatDateTime,
  LeadStatusPills,
  LeadStatusSelect,
  MARKET_LABELS,
  SERVICE_LABELS,
  since,
  StatusBadge,
} from "@/components/os/leadUi";
import {
  addLeadNote,
  convertLeadToClient,
  sendLeadReply,
  setLeadFollowUp,
} from "@/lib/crm/actions";
import { getLeadDetail } from "@/lib/crm/queries";
import { listMessagesForLead } from "@/lib/messages/store";

export const dynamic = "force-dynamic";

const MAIL_FLASH: Record<string, { tone: "ok" | "bad"; text: string }> = {
  poslato: { tone: "ok", text: "Mejl je poslat i zapisan u prepisci." },
  greska: { tone: "bad", text: "Mejl NIJE poslat. Proveri podešavanja transporta." },
  prazno: { tone: "bad", text: "Naslov i tekst ne smeju biti prazni." },
};

export default async function OsLeadDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ mail?: string }>;
}) {
  const [{ id }, { mail }] = await Promise.all([params, searchParams]);
  const lead = await getLeadDetail(id);
  if (!lead) notFound();

  const messages = await listMessagesForLead(id).catch(() => []);
  const flash = mail ? MAIL_FLASH[mail] : undefined;
  const email = lead.email === "—" ? null : lead.email;

  return (
    <>
      <p className="os-crumbs">
        <Link href="/os/leads">← Svi leadovi</Link>
      </p>

      <header className="os-head">
        <div>
          <h1 className="os-h1">
            {lead.fullName} <StatusBadge status={lead.status} />
          </h1>
          <p className="os-sub">
            {lead.company ?? "bez firme"} · {SERVICE_LABELS[lead.service] ?? lead.service} ·
            stiglo {since(lead.createdAt)} ({formatDateTime(lead.createdAt)})
          </p>
        </div>
        <ContactBar
          email={email}
          phone={lead.phone}
          subject="Adspire — odgovor na tvoj upit"
          extra={
            <form action={convertLeadToClient}>
              <input type="hidden" name="leadId" value={lead.id} />
              <button className="os-btn os-btn--ghost os-btn--sm" type="submit">
                Prebaci u klijente
              </button>
            </form>
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
          <section className="os-section">
            <h2>Poruka</h2>
            <p className="os-longtext">{lead.message}</p>
          </section>

          <section className="os-section os-section--focus">
            <h2>Odgovori</h2>
            {email ? (
              <ReplyBox
                action={sendLeadReply}
                idField="leadId"
                idValue={lead.id}
                to={email}
                context={{
                  firstName: lead.fullName,
                  businessName: lead.company,
                  reference: lead.inquiry?.reference ?? null,
                }}
              />
            ) : (
              <p className="os-empty">Lead nema mejl adresu — zovi telefonom.</p>
            )}
          </section>

          <section className="os-section">
            <h2>Prepiska i istorija</h2>
            <form action={addLeadNote} className="os-inline" style={{ marginBottom: 16 }}>
              <input type="hidden" name="leadId" value={lead.id} />
              <input name="body" placeholder="Kratka beleška (npr. zvao, javlja se u sredu)…" aria-label="Beleška" />
              <button className="os-btn os-btn--ghost os-btn--sm" type="submit">
                Dodaj belešku
              </button>
            </form>
            <Timeline messages={messages} activities={lead.activities} />
          </section>
        </div>

        <div>
          <section className="os-section">
            <h2>Sledeći korak</h2>
            <LeadStatusPills leadId={lead.id} current={lead.status} />
            <div style={{ marginTop: 14 }}>
              <LeadStatusSelect leadId={lead.id} current={lead.status} />
            </div>
            <form action={setLeadFollowUp} className="os-inline" style={{ marginTop: 14 }}>
              <input type="hidden" name="leadId" value={lead.id} />
              <input
                type="date"
                name="followUpOn"
                defaultValue={lead.followUpOn ?? ""}
                aria-label="Podseti me"
              />
              <button className="os-btn os-btn--ghost os-btn--sm" type="submit">
                Podseti me
              </button>
            </form>
            {lead.inquiry ? (
              <p className="os-note" style={{ marginTop: 12 }}>
                Ima brief:{" "}
                <Link href={`/os/upiti/${lead.inquiry.id}`}>{lead.inquiry.reference}</Link>
              </p>
            ) : null}
          </section>

          <section className="os-section">
            <h2>Podaci</h2>
            <dl className="os-kv">
              <dt>Email</dt>
              <dd>{email ? <a href={`mailto:${email}`}>{email}</a> : "—"}</dd>
              <dt>Telefon</dt>
              <dd>{lead.phone ? <a href={`tel:${lead.phone}`}>{lead.phone}</a> : "—"}</dd>
              <dt>Usluga</dt>
              <dd>{SERVICE_LABELS[lead.service] ?? lead.service}</dd>
              <dt>Tržište</dt>
              <dd>{MARKET_LABELS[lead.market] ?? lead.market}</dd>
              <dt>Budžet</dt>
              <dd>{lead.budgetRange ?? "—"}</dd>
              <dt>Rok</dt>
              <dd>{lead.timeline ?? "—"}</dd>
            </dl>
          </section>

          <section className="os-section">
            <h2>Odakle je došao</h2>
            <dl className="os-kv">
              <dt>Stranica</dt>
              <dd>{lead.landingPage ?? "—"}</dd>
              <dt>Referrer</dt>
              <dd>{lead.referrer ?? "—"}</dd>
              <dt>UTM source</dt>
              <dd>{lead.source ?? "—"}</dd>
              <dt>UTM medium</dt>
              <dd>{lead.utmMedium ?? "—"}</dd>
              <dt>UTM campaign</dt>
              <dd>{lead.utmCampaign ?? "—"}</dd>
              <dt>Request ID</dt>
              <dd>
                <code>{lead.requestId}</code>
              </dd>
            </dl>
          </section>
        </div>
      </div>
    </>
  );
}
