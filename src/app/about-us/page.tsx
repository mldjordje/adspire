import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { defaultLocale } from "@/lib/site-config";
import { JsonLd } from "@/components/site/JsonLd";
import { aboutPageJsonLd } from "@/lib/seo/pages";
import { AboutV4 } from "@/components/site/v4/AboutV4";
import { getAboutCopy } from "@/components/site/v4/aboutCopy";
import { v4FontClass } from "@/components/site/v4/fonts";

// Same source as the page body, so the SERP entry and the page cannot drift.
const t = getAboutCopy(defaultLocale);

export const metadata: Metadata = pageMetadata({
  path: "/about-us",
  title: t.metaTitle,
  description: t.metaDescription,
  keywords: ["Adspire Digital", "O nama", "web agencija Niš", "development partner", "white-label"],
});

export default function AboutPage() {
  return (
    <div className={v4FontClass}>
      <JsonLd
        data={aboutPageJsonLd({
          path: "/about-us",
          title: t.metaTitle,
          description: t.metaDescription,
          locale: defaultLocale,
          aboutLabel: "O nama",
        })}
      />
      <AboutV4 />
    </div>
  );
}
