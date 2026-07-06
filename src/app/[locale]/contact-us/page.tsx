import type { Metadata } from "next";
import { ContactV4 } from "@/components/site/v4/ContactV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { getSiteContent } from "@/content/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { isLocale, type LocaleCode } from "@/lib/site-config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const lc = (isLocale(locale) ? locale : "en") as LocaleCode;
  const contact = getSiteContent(lc).contactPage;
  return pageMetadata({
    path: "/contact-us",
    title: contact.hero.eyebrow,
    description: `${contact.hero.description} ${contact.email} - ${contact.phone}`,
    locale: lc,
  });
}

export default function Page() {
  return (
    <div className={v4FontClass}>
      <ContactV4 />
    </div>
  );
}
