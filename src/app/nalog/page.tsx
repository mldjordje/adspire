import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { portalLogout } from "./actions";
import { PageShellV4 } from "@/components/site/v4/PageShellV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import flow from "@/components/site/v4/InquiryFlowV4.module.css";
import card from "@/components/site/v4/InquiryStatusV4.module.css";
import { isDatabaseConfigured } from "@/lib/db";
import { serviceTitles } from "@/lib/inquiries/catalog";
import { listInquiriesForPortalUser } from "@/lib/inquiries/store";
import { INQUIRY_STATUS_LABEL } from "@/lib/inquiries/types";
import { getPortalSession } from "@/lib/portal/session";

/**
 * The optional client account: every upit sent from this address, in one list.
 *
 * Nothing here is a gate — the same brief is reachable from its own link
 * without ever logging in. This page exists for the buyer who has more than one.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Moji upiti",
  robots: { index: false, follow: false },
};

export default async function NalogPage() {
  if (!isDatabaseConfigured()) redirect("/nalog/prijava");

  const session = await getPortalSession();
  if (!session) redirect("/nalog/prijava");

  const inquiries = await listInquiriesForPortalUser(session.userId, session.email);

  return (
    <div className={v4FontClass}>
      <PageShellV4
        eyebrow="Nalog"
        title={<>Moji upiti</>}
        intro={`Prijavljen kao ${session.email}.`}
      >
        <section className={flow.wrap} data-reveal>
          {inquiries.length === 0 ? (
            <div className={card.card}>
              <p className={card.text}>
                Ovde još nema upita sa ove adrese. Pošalji prvi — procena stiže na mejl.
              </p>
              <div className={flow.sentActions}>
                <Link className={flow.submit} href="/upit" data-cursor="on">
                  Pošalji upit
                </Link>
              </div>
            </div>
          ) : (
            <div className={flow.cards}>
              {inquiries.map((inquiry) => (
                <Link
                  key={inquiry.id}
                  className={flow.card}
                  href={`/upit/status/${inquiry.access_token}`}
                  data-cursor="on"
                >
                  <span className={flow.cardTitle}>
                    {inquiry.reference} — {INQUIRY_STATUS_LABEL[inquiry.status]}
                  </span>
                  <span className={flow.cardSummary}>
                    {serviceTitles(inquiry.services).join(" + ")} · {inquiry.business_name}
                  </span>
                </Link>
              ))}
            </div>
          )}

          <div className={flow.sentActions}>
            <Link className={flow.ghost} href="/upit" data-cursor="on">
              Novi upit
            </Link>
            <form action={portalLogout}>
              <button className={flow.ghost} type="submit" data-cursor="on">
                Odjavi se
              </button>
            </form>
          </div>
        </section>
      </PageShellV4>
    </div>
  );
}
