import { JsonLd } from "@/components/site/JsonLd";
import { HotelExperience } from "@/components/site/v4/HotelExperience";
import { v4FontClass } from "@/components/site/v4/fonts";
import { getInquiryServices } from "@/lib/inquiries/catalog";
import { hotelJsonLd, hotelMetadata } from "@/lib/seo/hotel";

export const metadata = hotelMetadata("sr");
export default function HotelPage() {
  return <div className={v4FontClass}><JsonLd data={hotelJsonLd("sr")} /><HotelExperience locale="sr" services={getInquiryServices("sr")} /></div>;
}
