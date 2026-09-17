import type { Metadata } from "next";

import { JsonLd } from "@/components/site/JsonLd";
import { coursePackageOffers } from "@/lib/seo/offers";
import { EDU_PACKAGES } from "@/lib/education/packages";
import { orgRef } from "@/lib/seo/ids";
import { EducationLandingV4 } from "@/components/site/v4/EducationLandingV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import {
  educationFaq,
  educationHero,
  educationSeo,
} from "@/content/site/educationLandingPage";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  webPageAboutOrganizationJsonLd,
} from "@/lib/seo/jsonld";
import { absoluteUrl, pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  path: educationSeo.path,
  title: educationSeo.title,
  description: educationSeo.metaDescription,
  keywords: [...educationSeo.keywords],
});

export default function EdukacijaPage() {
  return (
    <div className={v4FontClass}>
      <JsonLd
        data={[
          webPageAboutOrganizationJsonLd(
            educationSeo.path,
            `${educationSeo.title} | Adspire Digital`,
            educationSeo.metaDescription,
          ),
          {
            "@context": "https://schema.org",
            "@type": "Course",
            "@id": `${absoluteUrl(educationSeo.path)}#course`,
            name: "AI edukacija 1-na-1",
            description: educationSeo.metaDescription,
            inLanguage: "sr",
            provider: orgRef(),
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "online",
              courseWorkload: "PT1H",
              // 1-na-1, so the instructor is the whole product.
              instructor: { "@id": `${absoluteUrl("/")}/#founder` },
            },
            // Approved as public 2026-09-14 — the only fixed prices on the site.
            offers: coursePackageOffers(EDU_PACKAGES, absoluteUrl(educationSeo.path)),
            url: absoluteUrl(educationSeo.path),
          },
          breadcrumbJsonLd([
            { name: "Početna", path: "/" },
            { name: educationHero.title, path: educationSeo.path },
          ]),
          faqPageJsonLd(educationFaq.items, absoluteUrl(educationSeo.path)),
        ]}
      />
      <EducationLandingV4 />
    </div>
  );
}
