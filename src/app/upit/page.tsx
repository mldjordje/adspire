import type { Metadata } from "next";

import { InquiryPageV4 } from "@/components/site/v4/InquiryPageV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { pageMetadata } from "@/lib/seo/metadata";

/**
 * The general way in: nothing is preselected and the service picker is the
 * first thing in the form. /upit/[slug] is the entry for someone who clicked a
 * specific service and already knows what they want.
 *
 * Dynamic because the form prefills from a portal session when there is one.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  path: "/upit",
  title: "Pošalji upit",
  description:
    "Opiši projekat i dobij procenu cene i roka. Bez naloga, bez obaveze — Adspire Digital, Niš.",
  keywords: ["upit za sajt", "ponuda za web aplikaciju", "cena izrade sajta Niš"],
});

export default function UpitPage() {
  return (
    <div className={v4FontClass}>
      <InquiryPageV4 />
    </div>
  );
}
