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
import { orgRef } from "@/lib/seo/ids";

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
            `${bookingSeo.title} | Adspire`,
            bookingSeo.metaDescription,
            { mainEntity: `${absoluteUrl(bookingSeo.path)}#service` },
          ),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${absoluteUrl(bookingSeo.path)}#service`,
            name: "Sistem za online zakazivanje termina za salone i klinike",
            serviceType: "Online zakazivanje termina, rezervacioni sistemi",
            description: bookingSeo.metaDescription,
            provider: orgRef(),
            areaServed: [
              { "@type": "Country", name: "Serbia" },
              { "@type": "AdministrativeArea", name: "Niš" },
              { "@type": "AdministrativeArea", name: "Beograd" },
            ],
            url: absoluteUrl(bookingSeo.path),
          },
          breadcrumbJsonLd([
            { name: "Početna", path: "/" },
            { name: bookingHero.title, path: bookingSeo.path },
          ]),
          // Same answers as the server-rendered FAQ accordion.
          faqPageJsonLd(bookingFaq.items, absoluteUrl(bookingSeo.path)),
        ]}
      />
      <BookingLandingV4 />
    </div>
  );
}
