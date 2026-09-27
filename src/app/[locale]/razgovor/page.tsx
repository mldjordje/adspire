import type { Metadata } from "next";

import { CallPageV4 } from "@/components/site/v4/call/CallPageV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { pageMetadata } from "@/lib/seo/metadata";
import { isLocale, type LocaleCode } from "@/lib/site-config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const lc = (isLocale(locale) ? locale : "en") as LocaleCode;
  return pageMetadata({
    path: "/razgovor",
    title: "Book a 20-minute call",
    description:
      "A short call by phone or Google Meet. Tell me what you need; in 20 minutes you know what makes sense and roughly what it costs. No commitment.",
    locale: lc,
  });
}

// DE has no call copy of its own yet; it gets the English widget.
export default async function Page({ params }: Props) {
  const { locale } = await params;
  const lc = (isLocale(locale) ? locale : "en") as LocaleCode;
  return (
    <div className={v4FontClass}>
      <CallPageV4 locale={lc} />
    </div>
  );
}
