import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { EduPackagesV4 } from "@/components/site/v4/EduPackagesV4";
import { PageShellV4 } from "@/components/site/v4/PageShellV4";
import { PortalNavV4 } from "@/components/site/v4/PortalNavV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import flow from "@/components/site/v4/InquiryFlowV4.module.css";
import styles from "@/components/site/v4/EducationV4.module.css";
import { isDatabaseConfigured } from "@/lib/db";
import { formatDay, formatHours, KIND_LABEL } from "@/lib/education/format";
import { endSlot } from "@/lib/education/slots";
import { getBuyerBookings, getWallets } from "@/lib/education/store";
import { serviceTitles } from "@/lib/inquiries/catalog";
import { listInquiriesForPortalUser } from "@/lib/inquiries/store";
import { INQUIRY_STATUS_LABEL } from "@/lib/inquiries/types";
import { getPortalSession } from "@/lib/portal/session";

/**
 * The client account overview: hours, the next session and every upit from
 * this address, on one screen.
 *
 * Nothing here is a gate — each brief is reachable from its own link without
 * logging in. This page is for the buyer who comes back.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Moj nalog",
  robots: { index: false, follow: false },
};

export default async function NalogPage() {
  if (!isDatabaseConfigured()) redirect("/nalog/prijava");

  const session = await getPortalSession();
  if (!session) redirect("/nalog/prijava");

  // Edukacija must not take the upiti list down with it if its tables misbehave.
  const [inquiries, edu] = await Promise.all([
    listInquiriesForPortalUser(session.userId, session.email),
    Promise.all([getWallets(session.userId), getBuyerBookings(session.userId)]).catch((error) => {
      console.error("portal_overview_edu_failed", { error });
      return null;
    }),
  ]);

  const wallets = edu?.[0] ?? [];
  const upcoming = edu?.[1].upcoming ?? [];
  const remaining = wallets.reduce((sum, w) => sum + w.remaining, 0);
  const purchased = wallets.reduce((sum, w) => sum + w.purchased, 0);
  const nextSession = upcoming[0];
  const openInquiries = inquiries.filter(
    (i) => i.status === "submitted" || i.status === "quoted",
  ).length;

  return (
    <div className={v4FontClass}>
      <PageShellV4
        eyebrow="Nalog"
        title={<>Moj nalog</>}
        intro={`Prijavljen kao ${session.email}.`}
      >
        <section className={flow.wrap} data-reveal>
          <div className={styles.stack}>
            <PortalNavV4 active="pregled" />

            <div className={styles.overview}>
              <Link className={`${styles.panel} ${styles.cardLink}`} href="/nalog/edukacija" data-cursor="on">
                <p className={styles.label}>Sati na stanju</p>
                <p className={styles.value}>{formatHours(remaining)}</p>
                <p className={styles.muted}>
                  {purchased > 0
                    ? `Iskorišćeno ${formatHours(Math.max(0, purchased - remaining))} od ${formatHours(purchased)}`
                    : "Još nema kupljenih sati"}
                </p>
              </Link>

              <Link className={`${styles.panel} ${styles.cardLink}`} href="/nalog/edukacija" data-cursor="on">
                <p className={styles.label}>Sledeći termin</p>
                {nextSession ? (
                  <>
                    <p className={styles.itemTitle} style={{ marginTop: 12, fontSize: 20 }}>
                      {formatDay(nextSession.date)}
                    </p>
                    <p className={styles.muted}>
                      {nextSession.startSlot}–{endSlot(nextSession.startSlot, nextSession.hours)} ·{" "}
                      {KIND_LABEL[nextSession.kind]}
                    </p>
                    <p className={styles.muted}>
                      {nextSession.meetUrl ? "Link za sastanak je spreman" : "Link stiže pre termina"}
                    </p>
                  </>
                ) : (
                  <p className={styles.muted} style={{ marginTop: 12 }}>
                    {remaining > 0 ? "Nemaš zakazan termin — izaberi slobodan." : "Nema zakazanih termina."}
                  </p>
                )}
              </Link>

              <div className={styles.panel}>
                <p className={styles.label}>Upiti</p>
                <p className={styles.value}>{inquiries.length}</p>
                <p className={styles.muted}>
                  {openInquiries > 0 ? `${openInquiries} u toku` : "Nijedan nije u toku"}
                </p>
              </div>
            </div>

            {remaining < 2 ? (
              <EduPackagesV4
                title={remaining > 0 ? "Sati su pri kraju" : "Edukacija 1-na-1"}
                intro="Uživo, preko Google Meet-a, na tvojim zadacima. Poruči paket, a čim uplata legne sati se pojave ovde i termine biraš sam."
              />
            ) : null}

            <div className={styles.panel}>
              <div className={styles.panelHead}>
                <h2 className={styles.title}>Moji upiti</h2>
                <Link className={styles.packageCta} href="/upit" data-cursor="on">
                  Novi upit →
                </Link>
              </div>
              {inquiries.length === 0 ? (
                <p className={styles.muted} style={{ marginTop: 10 }}>
                  Ovde još nema upita sa ove adrese. Pošalji prvi — procena stiže na mejl.
                </p>
              ) : (
                <ul className={styles.list}>
                  {inquiries.map((inquiry) => (
                    <li key={inquiry.id} className={styles.item}>
                      <Link
                        className={styles.cardLink}
                        href={`/upit/status/${inquiry.access_token}`}
                        data-cursor="on"
                      >
                        <p className={styles.itemTitle}>
                          {inquiry.reference} · {inquiry.business_name}
                        </p>
                        <p className={styles.itemMeta}>{serviceTitles(inquiry.services).join(" + ")}</p>
                      </Link>
                      <span className={styles.status}>{INQUIRY_STATUS_LABEL[inquiry.status]}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      </PageShellV4>
    </div>
  );
}
