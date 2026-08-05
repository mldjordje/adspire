import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InquiryStatusV4, type InquiryView } from "@/components/site/v4/InquiryStatusV4";
import { PageShellV4 } from "@/components/site/v4/PageShellV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { isDatabaseConfigured } from "@/lib/db";
import { serviceTitles } from "@/lib/inquiries/catalog";
import { getInquiryByToken } from "@/lib/inquiries/store";
import { isTimeframe } from "@/lib/inquiries/types";

/**
 * One upit, opened with the private link from the mail.
 *
 * The token is the credential, so the page is never indexed and never cached.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Status upita",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ token: string }> };

export default async function StatusUpitaPage({ params }: Props) {
  const { token } = await params;
  if (!isDatabaseConfigured()) notFound();

  const row = await getInquiryByToken(token);
  if (!row) notFound();

  const view: InquiryView = {
    reference: row.reference,
    accessToken: row.access_token,
    status: row.status,
    services: serviceTitles(row.services),
    businessName: row.business_name,
    idea: row.brief?.idea ?? "",
    wishes: row.brief?.wishes ?? "",
    timeframe: isTimeframe(row.brief?.timeframe) ? row.brief.timeframe : null,
    budgetEur: row.budget_eur,
    quotedAmount: row.quoted_amount,
    currency: row.currency,
    turnaroundDays: row.turnaround_days,
    quoteValidUntil: row.quote_valid_until,
    quoteNote: row.quote_note,
    createdAt: row.created_at,
  };

  return (
    <div className={v4FontClass}>
      <PageShellV4
        eyebrow="Status"
        title={<>Tvoj upit</>}
        intro="Ovde je sve o ovom upitu — brief koji si poslao i ponuda kada stigne."
      >
        <InquiryStatusV4 inquiry={view} />
      </PageShellV4>
    </div>
  );
}
