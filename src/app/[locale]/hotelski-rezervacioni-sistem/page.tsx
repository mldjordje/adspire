import { notFound } from "next/navigation";
import { JsonLd } from "@/components/site/JsonLd";
import { HotelExperience } from "@/components/site/v4/HotelExperience";
import { v4FontClass } from "@/components/site/v4/fonts";
import { getInquiryServices } from "@/lib/inquiries/catalog";
import { hotelJsonLd, hotelMetadata } from "@/lib/seo/hotel";
import { prefixedLocales } from "@/lib/site-config";

type Props = { params: Promise<{ locale: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return prefixedLocales.map(locale => ({ locale })); }
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "de") notFound();
  return hotelMetadata(locale);
}
export default async function HotelPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "de") notFound();
  return <div className={v4FontClass}><JsonLd data={hotelJsonLd(locale)} /><HotelExperience locale={locale} services={getInquiryServices(locale)} /></div>;
}
