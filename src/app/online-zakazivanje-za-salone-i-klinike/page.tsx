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
import { orgRef, productId } from "@/lib/seo/ids";
import { softwareProductJsonLd } from "@/lib/seo/products";

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
            { mainEntity: productId(absoluteUrl(bookingSeo.path)) },
          ),
          softwareProductJsonLd({
            path: bookingSeo.path,
            name: "Adspire sistem za online zakazivanje",
            description: bookingSeo.metaDescription,
            category: "BusinessApplication",
            featureList: [
              "Zakazivanje termina 24/7 sa sajta i telefona",
              "Kalendar po zaposlenom, usluzi i lokaciji",
              "SMS i email podsetnici koji smanjuju nedolaske",
              "Pravila trajanja, pauza i preklapanja termina",
              "Admin panel sa istorijom klijenata",
              "Izveštaji o popunjenosti i otkazivanjima",
            ],
            audience: "Saloni, klinike, ordinacije i servisi",
            serviceSlug: "sistemi-za-zakazivanje",
          }),
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
          // The answers are what answer engines quote; leaving them only in the
          // accordion makes them invisible to anything that does not render.
          faqPageJsonLd(bookingFaq.items, absoluteUrl(bookingSeo.path)),
        ]}
      />
      <BookingLandingV4 />
    </div>
  );
}
