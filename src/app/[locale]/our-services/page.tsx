import type { Metadata } from "next";
import { ServicesV4 } from "@/components/site/v4/ServicesV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { getSiteContent } from "@/content/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { isLocale, type LocaleCode } from "@/lib/site-config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const lc = (isLocale(locale) ? locale : "en") as LocaleCode;
  const services = getSiteContent(lc).servicesPage;
  return pageMetadata({
    path: "/our-services",
    title: services.hero.eyebrow,
    description: services.hero.description,
    locale: lc,
  });
}

export default function Page() {
  return (
    <div className={v4FontClass}>
      <ServicesV4 />
    </div>
  );
}
