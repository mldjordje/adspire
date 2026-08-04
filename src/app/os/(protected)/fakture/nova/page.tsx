import Link from "next/link";
import { InvoiceForm, type InvoiceFormClient } from "@/components/os/InvoiceForm";
import { listClients, listSubscriptions } from "@/lib/billing/clients";
import { addDays, belgradeToday } from "@/lib/invoices/rules";
import { getSettings } from "@/lib/os/settings";

export const dynamic = "force-dynamic";

export default async function NewInvoicePage({
  searchParams,
}: {
  searchParams: Promise<{ clientId?: string; error?: string }>;
}) {
  const { clientId, error } = await searchParams;
  const [clients, subscriptions, settings] = await Promise.all([
    listClients(),
    listSubscriptions(),
    getSettings(),
  ]);

  const today = belgradeToday().iso;
  const formClients: InvoiceFormClient[] = clients.map((client) => ({
    id: client.id,
    companyName: client.companyName,
    subscriptions: subscriptions
      .filter((s) => s.clientId === client.id && s.active)
      .map((s) => ({
        title: s.title,
        itemDescription: s.itemDescription,
        quantity: s.quantity,
        monthlyPrice: s.monthlyPrice,
      })),
  }));

  return (
    <>
      <p className="os-sub">
        <Link href="/os/fakture">← Fakture</Link>
      </p>
      <h1 className="os-h1">Novi dokument</h1>
      <p className="os-sub">
        Broj se dodeljuje pri izdavanju i ne može se menjati. Datum prometa je dan kada je
        usluga izvršena — za prošlomesečni rad promeni ga.
      </p>

      <section className="os-section">
        <InvoiceForm
          clients={formClients}
          today={today}
          defaultClientId={clientId}
          defaultDueDate={addDays(today, settings.invoice_due_days)}
          error={error}
        />
      </section>
    </>
  );
}
