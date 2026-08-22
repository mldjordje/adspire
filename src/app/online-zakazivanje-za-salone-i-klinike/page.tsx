import type { Metadata } from "next";
import { JsonLd } from "@/components/site/JsonLd";
import { BookingLandingV4 } from "@/components/site/v4/BookingLandingV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import {
  bookingFaq,
  bookingHero,
  bookingSeo,
} from "@/content/site/bookingLandingPage";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  webPageAboutOrganizationJsonLd,
} from "@/lib/seo/jsonld";
import { absoluteUrl, pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  path: bookingSeo.path,
  title: bookingSeo.title,
  description: bookingSeo.metaDescription,
  keywords: [...bookingSeo.keywords],
});

export default function BookingLandingPage() {
  return (
    <div className={v4FontClass}>
      <JsonLd
        data={[
          webPageAboutOrganizationJsonLd(
            bookingSeo.path,
            `${bookingSeo.title} | Adspire Digital`,
            bookingSeo.metaDescription,
          ),
          breadcrumbJsonLd([
            { name: "Početna", path: "/" },
            { name: bookingHero.title, path: bookingSeo.path },
          ]),
          // The answers are what answer engines quote; leaving them only in the
          // accordion makes them invisible to anything that does not render.
          faqPageJsonLd(bookingFaq.items, absoluteUrl(bookingSeo.path)),
        ]}
      />
      <BookingLandingV4 />
    </div>
  );
}
