import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InquiryPageV4 } from "@/components/site/v4/InquiryPageV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { getInquiryServices } from "@/lib/inquiries/catalog";
import { pageMetadata } from "@/lib/seo/metadata";

/** The entry for someone who clicked one service on /our-services/[slug]: the
 *  same brief, with that service already ticked. */
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getInquiryServices().find((item) => item.slug === slug);
  if (!service) return { title: "Usluga nije pronađena" };

  return pageMetadata({
    path: `/upit/${slug}`,
    title: `Upit — ${service.title}`,
    description: `Pošalji upit za: ${service.title}. Procena cene i roka stiže na mejl, bez naloga i bez obaveze.`,
    keywords: [`${service.title} cena`, `${service.title} ponuda`, "upit Adspire"],
  });
}

export default async function UpitZaUsluguPage({ params }: Props) {
  const { slug } = await params;
  const service = getInquiryServices().find((item) => item.slug === slug);
  if (!service) notFound();

  return (
    <div className={v4FontClass}>
      <InquiryPageV4 initialSlugs={[service.slug]} headline={`Upit — ${service.title}`} />
    </div>
  );
}
