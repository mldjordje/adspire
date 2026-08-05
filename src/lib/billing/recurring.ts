import "server-only";

import { getSql } from "@/lib/db";
import { issueInvoice, InvoiceConfigurationError } from "@/lib/invoices/issue";
import { sendInvoiceMail } from "@/lib/invoices/notify";
import { addDays, belgradeToday, invoiceScope } from "@/lib/invoices/rules";
import { getSettings } from "@/lib/os/settings";
import { listClients, listSubscriptions } from "./clients";

/**
 * Monthly maintenance invoicing.
 *
 * The recurring revenue is the point of the whole maintenance offer, and it was
 * the one part still typed by hand every month — which is how a month gets
 * skipped and the client concludes the service was free.
 *
 * Three rules hold this together:
 *
 *   - ONE INVOICE PER CLIENT, PER MONTH, PER CURRENCY. `recurring_period` and
 *     its unique index make a second run a no-op instead of a second number.
 *   - A CURRENCY IS NEVER MIXED. Two subscriptions in RSD and EUR are two
 *     documents, because a total across currencies is a lie.
 *   - ISSUING AND SENDING ARE SEPARATE. A wrong figure that is only issued can
 *     be cancelled quietly; one that has been mailed cannot be unmailed.
 */

export type RecurringLine = {
  name: string;
  quantity: number;
  unitPrice: number;
};

export type RecurringCandidate = {
  clientId: string;
  clientName: string;
  email: string | null;
  currency: string;
  lines: RecurringLine[];
  total: number;
  /** The document already issued for this month, if there is one. */
  existing: { id: string; number: string; sentAt: string | null } | null;
};

/** 'YYYY-MM' for the month being billed. Defaults to the current one in
 *  Belgrade, not UTC — see the note in src/lib/invoices/rules.ts. */
export function currentPeriod(now = new Date()): string {
  return belgradeToday(now).iso.slice(0, 7);
}

/** "08/2026" — what gets printed on the document. */
export function periodLabel(period: string): string {
  const [year, month] = period.split("-");
  return `${month}/${year}`;
}

export async function listRecurringCandidates(period: string): Promise<RecurringCandidate[]> {
  const sql = getSql();
  const [clients, subscriptions, rawIssued] = await Promise.all([
    listClients(),
    listSubscriptions(),
    sql`
      select id, client_id, number, currency, sent_at::text
      from invoices where recurring_period = ${period}
    `,
  ]);

  const issued = rawIssued as {
    id: string;
    client_id: string;
    number: string;
    currency: string;
    sent_at: string | null;
  }[];

  const candidates: RecurringCandidate[] = [];

  for (const client of clients) {
    if (!client.active) continue;
    const active = subscriptions.filter((s) => s.clientId === client.id && s.active);
    if (active.length === 0) continue;

    const currencies = Array.from(new Set(active.map((s) => s.currency)));
    for (const currency of currencies) {
      const lines = active
        .filter((s) => s.currency === currency)
        .map((s) => ({
          name: s.itemDescription || s.title,
          quantity: s.quantity,
          unitPrice: s.monthlyPrice,
        }));

      const match = issued.find(
        (row) => row.client_id === client.id && row.currency === currency,
      );

      candidates.push({
        clientId: client.id,
        clientName: client.companyName,
        email: client.email,
        currency,
        lines,
        total: lines.reduce((sum, line) => sum + line.quantity * line.unitPrice, 0),
        existing: match
          ? { id: match.id, number: match.number, sentAt: match.sent_at }
          : null,
      });
    }
  }

  return candidates.sort((a, b) => a.clientName.localeCompare(b.clientName, "sr"));
}

export type RecurringOutcome = {
  clientName: string;
  currency: string;
  status: "issued" | "skipped" | "failed";
  number?: string;
  invoiceId?: string;
  /** Only set when the run was asked to send as well. */
  mailed?: boolean;
  reason?: string;
};

async function issueOne(
  candidate: RecurringCandidate,
  period: string,
  options: { send: boolean; createdBy?: string | null },
): Promise<RecurringOutcome> {
  const base = { clientName: candidate.clientName, currency: candidate.currency };
  if (candidate.existing) {
    return { ...base, status: "skipped", reason: `već izdato: ${candidate.existing.number}` };
  }
  if (candidate.total <= 0) {
    return { ...base, status: "skipped", reason: "pretplata je 0" };
  }

  const clients = await listClients();
  const client = clients.find((row) => row.id === candidate.clientId);
  const settings = await getSettings();
  const today = belgradeToday().iso;

  try {
    const issued = await issueInvoice({
      clientId: candidate.clientId,
      kind: "invoice",
      scope: invoiceScope(client?.country),
      issueDate: today,
      // Maintenance is delivered across the month; the day the document is
      // raised is the honest promet date for a service still running.
      supplyDate: today,
      dueDate: addDays(today, settings.invoice_due_days),
      currency: candidate.currency,
      items: candidate.lines,
      periodLabel: periodLabel(period),
      note: null,
      recurringPeriod: period,
    });

    let mailed: boolean | undefined;
    if (options.send) {
      const result = await sendInvoiceMail(issued.id, { createdBy: options.createdBy });
      mailed = result.ok;
      if (result.ok) {
        const sql = getSql();
        await sql`update invoices set sent_at = now(), updated_at = now() where id = ${issued.id}`;
      }
    }

    return {
      ...base,
      status: "issued",
      number: issued.number,
      invoiceId: issued.id,
      mailed,
    };
  } catch (error) {
    // A duplicate slipping past the pre-check (two runs at once) surfaces here
    // as the unique violation, and is a skip rather than a failure.
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes("invoices_recurring_period_key")) {
      return { ...base, status: "skipped", reason: "već izdato (paralelan pokušaj)" };
    }
    if (error instanceof InvoiceConfigurationError) {
      return { ...base, status: "failed", reason: error.message };
    }
    console.error("recurring_issue_failed", { client: candidate.clientName, error });
    return { ...base, status: "failed", reason: message };
  }
}

/** Issues for one client (one currency). Used by the per-row button. */
export async function issueRecurringForClient(
  clientId: string,
  currency: string,
  period: string,
  options: { send?: boolean; createdBy?: string | null } = {},
): Promise<RecurringOutcome | null> {
  const candidates = await listRecurringCandidates(period);
  const candidate = candidates.find(
    (item) => item.clientId === clientId && item.currency === currency,
  );
  if (!candidate) return null;
  return issueOne(candidate, period, {
    send: options.send ?? false,
    createdBy: options.createdBy,
  });
}

/** The whole month, for the button and for the cron. */
export async function runRecurring(
  period: string,
  options: { send?: boolean; createdBy?: string | null } = {},
): Promise<RecurringOutcome[]> {
  const candidates = await listRecurringCandidates(period);
  const outcomes: RecurringOutcome[] = [];
  // Sequential on purpose: the numbering reads MAX(seq) and inserts, so
  // parallel issuing would make concurrent callers fight over one number.
  for (const candidate of candidates) {
    outcomes.push(
      await issueOne(candidate, period, {
        send: options.send ?? false,
        createdBy: options.createdBy,
      }),
    );
  }
  return outcomes;
}
