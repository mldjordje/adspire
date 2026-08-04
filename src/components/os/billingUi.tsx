import type { InvoiceStatus } from "@/lib/invoices/queries";

/** Money as the invoice prints it, so the screen and the PDF never disagree. */
export function money(amount: number, currency: string): string {
  return `${amount.toLocaleString("sr-RS", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ${currency}`;
}

export function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const [year, month, day] = iso.slice(0, 10).split("-");
  return `${day}.${month}.${year}.`;
}

export const INVOICE_STATUS_LABELS: Record<InvoiceStatus, string> = {
  issued: "Izdata",
  paid: "Plaćena",
  cancelled: "Storno",
};

export function InvoiceStatusBadge({
  status,
  overdue = false,
}: {
  status: InvoiceStatus;
  overdue?: boolean;
}) {
  const label = INVOICE_STATUS_LABELS[status];
  return (
    <span className={`os-badge${status === "paid" ? "" : " os-badge--muted"}`}>
      {overdue && status === "issued" ? `${label} · van roka` : label}
    </span>
  );
}
