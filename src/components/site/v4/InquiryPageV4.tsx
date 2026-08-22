import Link from "next/link";

import { PageShellV4 } from "./PageShellV4";
import { InquiryFlowV4 } from "./InquiryFlowV4";
import { getInquiryServices } from "@/lib/inquiries/catalog";
import { getPortalSession } from "@/lib/portal/session";
import { getPortalUser } from "@/lib/portal/users";
import { isDatabaseConfigured } from "@/lib/db";
import styles from "./InquiryFlowV4.module.css";

/**
 * The page around the brief, shared by /upit and /upit/[slug].
 *
 * Reading it never needs a session: the whole point of this flow is that a
 * stranger can ask for a price. A session, when there is one, only prefills the
 * contact fields.
 */

export async function InquiryPageV4({
  initialSlugs = [],
  headline,
}: {
  initialSlugs?: string[];
  /** Set on /upit/[slug] so the page names the service that was clicked. */
  headline?: string;
}) {
  const services = getInquiryServices();

  let buyer: { email: string; fullName: string | null; phone: string | null } | null = null;
  if (isDatabaseConfigured()) {
    const session = await getPortalSession();
    if (session) {
      const user = await getPortalUser(session.userId);
      if (user) {
        buyer = { email: user.email, fullName: user.full_name, phone: user.phone };
      }
    }
  }

  return (
    <PageShellV4
      eyebrow="Upit"
      title={
        <>
          {headline ?? "Opiši šta ti treba"}
          <br />
          i dobij ponudu<span className={styles.dot}>.</span>
        </>
      }
      intro="Bez naloga i bez obaveze. Popuni brief, a cena i rok stižu na tvoj mejl — obično u roku od dva radna dana."
    >
      {/* The long brief is the right form only for someone who has decided.
          Anyone still weighing it up is offered the five-field version instead
          of quietly abandoning this one. */}
      <p className={styles.restored}>
        Ovo je pun brief — popuni ga ako želiš cenu i rok odmah. Ako samo imaš pitanje,{" "}
        <Link className={styles.linkBtn} href="/upit/brzo" data-cta="upit-puni-ka-brzom">
          pošalji brzi upit u pet polja
        </Link>
        .
      </p>
      <InquiryFlowV4 services={services} initialSlugs={initialSlugs} buyer={buyer} />
    </PageShellV4>
  );
}
