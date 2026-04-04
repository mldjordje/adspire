import type { Metadata } from "next";
import { AzurioTemplatePage } from "@/components/site/AzurioTemplatePage";
import { getSiteContent } from "@/content/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { defaultLocale } from "@/lib/site-config";

const contact = getSiteContent(defaultLocale).contactPage;

export const metadata: Metadata = pageMetadata({
  path: "/contact-us",
  title: "Kontakt",
  description: `${contact.hero.description} Email: ${contact.email}. Telefon: ${contact.phone}.`,
  keywords: ["kontakt Adspire", "web agencija Niš kontakt", "ponuda za sajt"],
});

export default function ContactPage() {
  return <AzurioTemplatePage fileName="contact.html" />;
}
