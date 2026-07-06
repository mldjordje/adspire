import type { Metadata } from "next";
import { getSiteContent } from "@/content/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { defaultLocale } from "@/lib/site-config";
import { AboutV4 } from "@/components/site/v4/AboutV4";
import { v4FontClass } from "@/components/site/v4/fonts";

const about = getSiteContent(defaultLocale).aboutPage;

export const metadata: Metadata = pageMetadata({
  path: "/about-us",
  title: "O nama",
  description: about.hero.description,
  keywords: ["Adspire Digital", "O nama", "web agencija Niš", "development partner", "white-label"],
});

export default function AboutPage() {
  return (
    <div className={v4FontClass}>
      <AboutV4 />
    </div>
  );
}
