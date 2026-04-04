import type { Metadata } from "next";
import { AzurioTemplatePage } from "@/components/site/AzurioTemplatePage";
import { getSiteContent } from "@/content/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { defaultLocale } from "@/lib/site-config";

const about = getSiteContent(defaultLocale).aboutPage;

export const metadata: Metadata = pageMetadata({
  path: "/about-us",
  title: "O nama",
  description: about.hero.description,
  keywords: ["Adspire Digital", "O nama", "web agencija Niš", "development partner", "white-label"],
});

export default function AboutPage() {
  return <AzurioTemplatePage fileName="about-us.html" />;
}
