import type { Metadata } from "next";

import { AiVideoLandingV4 } from "@/components/site/v4/AiVideoLandingV4";
import { JsonLd } from "@/components/site/JsonLd";
import { v4FontClass } from "@/components/site/v4/fonts";
import {
  aiVideoFaq,
  aiVideoHero,
  aiVideoSeo,
} from "@/content/site/aiVideoPage";
import { getInquiryServices } from "@/lib/inquiries/catalog";
import { orgRef } from "@/lib/seo/ids";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  webPageAboutOrganizationJsonLd,
} from "@/lib/seo/jsonld";
import { absoluteUrl, pageMetadata } from "@/lib/seo/metadata";

/**
 * /ai-video-za-vas-biznis — the done-for-you half of the video offer.
 *
 * No Offer in the markup on purpose: there is no public price, and an offer
 * without one is what makes an answer engine invent a number.
 */
export const metadata: Metadata = pageMetadata({
  path: aiVideoSeo.path,
  title: aiVideoSeo.title,
  description: aiVideoSeo.metaDescription,
  keywords: [...aiVideoSeo.keywords],
});

export default function AiVideoPage() {
  const services = getInquiryServices();

  return (
    <div className={v4FontClass}>
      <JsonLd
        data={[
          webPageAboutOrganizationJsonLd(
            aiVideoSeo.path,
            `${aiVideoSeo.title} | Adspire Digital`,
            aiVideoSeo.metaDescription,
          ),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${absoluteUrl(aiVideoSeo.path)}#service`,
            name: "AI video klipovi za biznis",
            description: aiVideoSeo.metaDescription,
            serviceType: "Video produkcija za društvene mreže",
            provider: orgRef(),
            areaServed: "RS",
            url: absoluteUrl(aiVideoSeo.path),
          },
          breadcrumbJsonLd([
            { name: "Početna", path: "/" },
            { name: aiVideoHero.title, path: aiVideoSeo.path },
          ]),
          faqPageJsonLd(aiVideoFaq.items, absoluteUrl(aiVideoSeo.path)),
        ]}
      />
      <AiVideoLandingV4 services={services} />
    </div>
  );
}
