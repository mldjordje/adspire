import type { Metadata } from "next";
import { AboutV4 } from "@/components/site/v4/AboutV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { getSiteContent } from "@/content/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { isLocale, type LocaleCode } from "@/lib/site-config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const lc = (isLocale(locale) ? locale : "en") as LocaleCode;
  const about = getSiteContent(lc).aboutPage;
  return pageMetadata({
    path: "/about-us",
    title: about.hero.eyebrow,
    description: about.hero.description,
    locale: lc,
  });
}

export default function Page() {
  return (
    <div className={v4FontClass}>
      <AboutV4 />
    </div>
  );
}
