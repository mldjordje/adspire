import type { Metadata } from "next";

import { PageShellV4 } from "@/components/site/v4/PageShellV4";
import { QuickInquiryV4 } from "@/components/site/v4/QuickInquiryV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { getInquiryServices, isInquiryServiceSlug } from "@/lib/inquiries/catalog";
import { pageMetadata } from "@/lib/seo/metadata";
import styles from "@/components/site/v4/InquiryFlowV4.module.css";

/**
 * The short way in — five fields, built for paid traffic.
 *
 * A visitor who arrives from an ad has never heard of us and is asking whether
 * a thing is possible. /upit asks that visitor for a PIB. This asks for a name,
 * a mail, the business, the service and one sentence. The rest is asked in the
 * reply, where it costs a conversation instead of a lost lead.
 *
 * `?usluga=<slug>` preselects the service, so an ad group can point straight at
 * what it advertised and leave four fields.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  path: "/upit/brzo",
  title: "Postavi pitanje — odgovor isti dan",
  description:
    "Pet polja i gotovo. Opiši u jednoj rečenici šta ti treba i javljam se lično, obično isti radni dan. Bez naloga i bez obaveze.",
  keywords: ["brzi upit", "pitanje za web agenciju", "besplatna konsultacija Niš"],
});

type Props = { searchParams: Promise<{ usluga?: string }> };

export default async function BrziUpitPage({ searchParams }: Props) {
  const { usluga } = await searchParams;
  const services = getInquiryServices();
  // An unknown slug from a stale ad must not silently preselect nothing while
  // looking like it did — it simply falls back to the picker.
  const initialSlug = usluga && isInquiryServiceSlug(usluga) ? usluga : "";

  return (
    <div className={v4FontClass}>
      <PageShellV4
        eyebrow="Brzi upit"
        title={
          <>
            Pitaj, pa onda odlučuj
            <span className={styles.dot}>.</span>
          </>
        }
        intro="Pet polja, bez naloga i bez obaveze. Napiši u jednoj rečenici šta te muči i javljam se lično — obično isti radni dan. Podatke za ponudu tražim tek kad se dogovorimo da ima smisla."
      >
        <QuickInquiryV4 services={services} initialSlug={initialSlug} />
      </PageShellV4>
    </div>
  );
}
