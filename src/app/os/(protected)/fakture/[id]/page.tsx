import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, InvoiceStatusBadge, money } from "@/components/os/billingUi";
import { formatDateTime } from "@/components/os/leadUi";
import { Timeline } from "@/components/os/Timeline";
import { belgradeToday } from "@/lib/invoices/rules";
import {
  convertProformaAction,
  sendInvoiceAction,
  setInvoiceStatusAction,
} from "@/lib/billing/actions";
import { getInvoiceDetail } from "@/lib/invoices/queries";
import { listMessagesForInvoice } from "@/lib/messages/store";

export const dynamic = "force-dynamic";

const MAIL_FLASH: Record<string, { tone: "ok" | "bad"; text: string }> = {
  poslato: { tone: "ok", text: "Dokument je poslat klijentu, sa PDF-om u prilogu." },
  ispravljeno: {
    tone: "ok",
    text: "Ispravljena verzija je poslata — isti broj, novi PDF, mejl kaže da zamenjuje prethodni.",
  },
  "no-email": {
    tone: "bad",
    text: "Klijent nema mejl adresu. Upiši je na kartici klijenta, pa pošalji ponovo.",
  },
  "send-failed": {
    tone: "bad",
    text: "Slanje nije uspelo. Razlog je zapisan u prepisci ispod.",
  },
  "not-found": { tone: "bad", text: "Dokument nije pronađen." },
};

const DOC_FLASH: Record<string, { tone: "ok" | "bad"; text: string }> = {
  "iz-predracuna": {
    tone: "ok",
    text: "Račun je izdat iz predračuna. Proveri datum prometa pre slanja.",
  },
  "iz-predracuna-placeno": {
    tone: "ok",
    text:
      "Račun je izdat iz predračuna i označen kao plaćen — nema rok plaćanja ni podatke za uplatu, " +
      "a mejl klijentu se zahvaljuje na uplati. Proveri datum prometa pre slanja.",
  },
  stornirano: { tone: "bad", text: "Stornirani predračun se ne pretvara u račun." },
};

export default async function InvoiceDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ mail?: string; doc?: string }>;
}) {
  const [{ id }, { mail, doc }] = await Promise.all([params, searchParams]);
  const invoice = await getInvoiceDetail(id);
  if (!invoice) notFound();

  const messages = await listMessagesForInvoice(id).catch(() => []);
  // An unrecognised `doc` value is a configuration error thrown while issuing —
  // the message itself, so it is shown rather than swallowed.
  const flash =
    (mail ? MAIL_FLASH[mail] : undefined) ??
    (doc ? (DOC_FLASH[doc] ?? { tone: "bad" as const, text: doc }) : undefined);
  const proforma = invoice.kind === "proforma";
  // The letter follows the document status, so it is stated before sending —
  // a thank-you note on an unpaid invoice is a payment that never arrives.
  const settled = !proforma && invoice.status === "paid";
  const recipient = invoice.buyer.email ?? null;
  const today = belgradeToday().iso;

  return (
    <>
      <p className="os-crumbs">
        <Link href="/os/fakture">← Fakture</Link>
      </p>
      <h1 className="os-h1">
        {proforma ? "Predračun" : "Račun"} {invoice.number} <InvoiceStatusBadge status={invoice.status} />
        {invoice.sentAt ? <span className="os-badge">Poslato</span> : null}
      </h1>
      <p className="os-sub">
        {invoice.clientName} · {money(invoice.total, invoice.currency)}
        {invoice.sentAt ? ` · poslato ${formatDateTime(invoice.sentAt)}` : ""}
      </p>

      {flash ? (
        <p className={`os-flash is-${flash.tone}`} role="status">
          {flash.text}
        </p>
      ) : null}

      <section className="os-section">
        <div className="os-actions">
          <a className="os-btn os-btn--ghost os-btn--sm" href={`/api/os/fakture/${invoice.id}/pdf`}>
            Preuzmi PDF
          </a>
          {invoice.status !== "cancelled" ? (
            <form action={sendInvoiceAction}>
              <input type="hidden" name="id" value={invoice.id} />
              <button className="os-btn os-btn--sm" type="submit">
                {invoice.sentAt ? "Pošalji ponovo" : "Pošalji račun klijentu"}
              </button>
            </form>
          ) : null}
          {invoice.status !== "cancelled" && invoice.sentAt ? (
            <form action={sendInvoiceAction}>
              <input type="hidden" name="id" value={invoice.id} />
              <input type="hidden" name="correction" value="1" />
              <button className="os-btn os-btn--ghost os-btn--sm" type="submit">
                Pošalji ispravljenu verziju
              </button>
            </form>
          ) : null}
          {invoice.status !== "paid" ? (
            <form action={setInvoiceStatusAction}>
              <input type="hidden" name="id" value={invoice.id} />
              <input type="hidden" name="status" value="paid" />
              <button className="os-btn os-btn--ghost os-btn--sm" type="submit">
                Označi kao plaćeno
              </button>
            </form>
          ) : (
            <form action={setInvoiceStatusAction}>
              <input type="hidden" name="id" value={invoice.id} />
              <input type="hidden" name="status" value="issued" />
              <button className="os-btn os-btn--ghost os-btn--sm" type="submit">
                Vrati na neplaćeno
              </button>
            </form>
          )}
          {invoice.status !== "cancelled" ? (
            <form action={setInvoiceStatusAction}>
              <input type="hidden" name="id" value={invoice.id} />
              <input type="hidden" name="status" value="cancelled" />
              <button className="os-btn os-btn--ghost os-btn--sm" type="submit">
                Storniraj
              </button>
            </form>
          ) : null}
        </div>
        <p className={`os-flash is-${settled ? "bad" : "ok"}`} style={{ marginTop: 12 }}>
          {settled
            ? "Mejl se zahvaljuje na uplati i izričito kaže da se ne plaća ponovo — ne traži uplatu, i nema rok ni podatke za plaćanje. Ako novac NIJE stigao, prvo vrati dokument na neplaćeno."
            : "Mejl traži uplatu: iznos, rok, račun i poziv na broj su u telu poruke, ne samo u PDF-u."}
        </p>
        <p className="os-note" style={{ marginTop: 12 }}>
          Šalje se na <strong>{recipient ?? "— klijent nema mejl —"}</strong>, kopija ide na tvoju
          adresu. Iznos i stavke se ne menjaju posle izdavanja — greška u njima se ispravlja
          storniranjem i novim dokumentom, jer je broj već dodeljen. Ako su bili pogrešni tvoji
          podaci u Podešavanjima, ispravi ih tamo pa pošalji ispravljenu verziju: PDF se iscrtava
          iznova, broj ostaje isti.
        </p>
      </section>

      {proforma && invoice.status !== "cancelled" ? (
        <section className="os-section os-section--focus">
          <h2>Račun po ovom predračunu</h2>
          {invoice.converted ? (
            <p>
              Već izdat:{" "}
              <Link href={`/os/fakture/${invoice.converted.id}`}>{invoice.converted.number}</Link>
            </p>
          ) : (
            <form action={convertProformaAction} className="os-inline">
              <input type="hidden" name="id" value={invoice.id} />
              <label className="os-inline__field">
                Datum prometa
                <input type="date" name="supplyDate" defaultValue={today} />
              </label>
              <label className="os-inline__field">
                <input type="checkbox" name="paid" /> Klijent je već uplatio
              </label>
              <button className="os-btn" type="submit">
                Napravi račun
              </button>
              <span className="os-note">
                Preuzima kupca, stavke, valutu i period. Broj računa se dodeljuje iz svoje serije.
                Čekiraj kvačicu samo ako je novac stvarno stigao: tada račun ide bez roka plaćanja
                i bez podataka za uplatu, a mejl se zahvaljuje na uplati. Bez kvačice račun traži
                uplatu, sa rokom i podacima za plaćanje.
              </span>
            </form>
          )}
        </section>
      ) : null}

      {invoice.source ? (
        <p className="os-note" style={{ margin: "-8px 0 20px" }}>
          Izdato po predračunu{" "}
          <Link href={`/os/fakture/${invoice.source.id}`}>{invoice.source.number}</Link>
        </p>
      ) : null}

      {messages.length > 0 ? (
        <section className="os-section">
          <h2>Prepiska o ovom dokumentu</h2>
          <Timeline messages={messages} activities={[]} />
        </section>
      ) : null}

      <section className="os-section">
        <h2>Stavke</h2>
        <div className="os-tablewrap">
          <table className="os-table">
            <thead>
              <tr>
                <th>Naziv</th>
                <th>Kol.</th>
                <th>Cena</th>
                <th>Iznos</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{money(item.unitPrice, invoice.currency)}</td>
                  <td>{money(item.total, invoice.currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="os-total">
          Ukupno: {money(invoice.total, invoice.currency)}
          {invoice.totalRsd ? ` (${money(invoice.totalRsd, "RSD")})` : ""}
        </p>
      </section>

      <section className="os-section">
        <h2>Podaci dokumenta</h2>
        <dl className="os-kv">
          <dt>Datum izdavanja</dt>
          <dd>{formatDate(invoice.issueDate)}</dd>
          <dt>Datum prometa</dt>
          <dd>{formatDate(invoice.supplyDate)}</dd>
          <dt>{invoice.paidAt ? "Plaćeno" : "Rok plaćanja"}</dt>
          <dd>
            {invoice.paidAt ? formatDateTime(invoice.paidAt) : formatDate(invoice.dueDate)}
          </dd>
          <dt>Mesto izdavanja</dt>
          <dd>{invoice.place}</dd>
          <dt>Način plaćanja</dt>
          <dd>{invoice.paymentMethod}</dd>
          <dt>Račun</dt>
          <dd>{invoice.bankAccount ?? "—"}</dd>
          <dt>Period</dt>
          <dd>{invoice.periodLabel ?? "—"}</dd>
          <dt>Napomena</dt>
          <dd>{invoice.note ?? "—"}</dd>
          <dt>PDV napomena</dt>
          <dd>{invoice.vatNote || "—"}</dd>
        </dl>
      </section>

      <section className="os-section">
        <h2>Kupac (kako je odštampano)</h2>
        <dl className="os-kv">
          <dt>Naziv</dt>
          <dd>{invoice.buyer.companyName ?? "—"}</dd>
          <dt>Adresa</dt>
          <dd>{[invoice.buyer.address, invoice.buyer.city].filter(Boolean).join(", ") || "—"}</dd>
          <dt>PIB</dt>
          <dd>{invoice.buyer.pib ?? "—"}</dd>
          <dt>Matični broj</dt>
          <dd>{invoice.buyer.mb ?? "—"}</dd>
          <dt>Email</dt>
          <dd>{invoice.buyer.email ?? "—"}</dd>
        </dl>
        {invoice.clientId ? (
          <p>
            <Link href={`/os/klijenti/${invoice.clientId}`}>Otvori klijenta →</Link>
          </p>
        ) : null}
      </section>
    </>
  );
}
