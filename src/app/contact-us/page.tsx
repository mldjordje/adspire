import type { Metadata } from "next";
import { getSiteContent } from "@/content/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { defaultLocale } from "@/lib/site-config";
import { ContactV4 } from "@/components/site/v4/ContactV4";
import { v4FontClass } from "@/components/site/v4/fonts";

const contact = getSiteContent(defaultLocale).contactPage;

export const metadata: Metadata = pageMetadata({
  path: "/contact-us",
  title: "Kontakt",
  description: `${contact.hero.description} Email: ${contact.email}. Telefon: ${contact.phone}.`,
  keywords: ["kontakt Adspire", "web agencija Niš kontakt", "ponuda za sajt"],
});

export default function ContactPage() {
  return (
    <div className={v4FontClass}>
      <ContactV4 locale={defaultLocale} />
    </div>
  );
}
