import type { Metadata } from "next";
import { JsonLd } from "@/components/site/JsonLd";
import { NisPresenceV4 } from "@/components/site/v4/NisPresenceV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { nisPresencePage } from "@/content/site/nisPresencePage";
import { webPageAboutOrganizationJsonLd } from "@/lib/seo/jsonld";
import { absoluteUrl, pageMetadata } from "@/lib/seo/metadata";

const p = nisPresencePage;
const pageUrl = absoluteUrl(p.path);

export const metadata: Metadata = pageMetadata({
  path: p.path,
  title: p.title,
  description: p.metaDescription,
  keywords: [
    "izrada sajta Niš",
    "web agencija Niš",
    "aplikacije Niš",
    "Next.js Niš",
    "Adspire Digital",
    "razvoj softvera Niš",
    "PWA Niš",
    "e-commerce Niš",
  ],
});

export default function NisPresencePage() {
  const jsonLd = webPageAboutOrganizationJsonLd(p.path, `${p.title} | Adspire Digital`, p.metaDescription);

  return (
    <div className={v4FontClass}>
      <JsonLd
        data={[
          jsonLd,
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Početna", item: absoluteUrl("/") },
              { "@type": "ListItem", position: 2, name: p.title, item: pageUrl },
            ],
          },
        ]}
      />
      <NisPresenceV4 />
    </div>
  );
}
