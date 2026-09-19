import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/site/JsonLd";
import { BookingIndustryV4 } from "@/components/site/v4/BookingIndustryV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { bookingSeo } from "@/content/site/bookingLandingPage";
import {
  bookingIndustryPages,
  bookingIndustryPath,
  getBookingIndustryPage,
} from "@/content/site/bookingIndustryPages";
import { breadcrumbJsonLd, faqPageJsonLd, webPageAboutOrganizationJsonLd } from "@/lib/seo/jsonld";
import { orgRef, productId, serviceId } from "@/lib/seo/ids";
import { absoluteUrl, pageMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ slug: string }> };

/** Static set — content pages prerender and land in the sitemap. */
export function generateStaticParams() {
  return bookingIndustryPages.map((page) => ({ slug: page.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getBookingIndustryPage(slug);
  if (!page) return { title: "Stranica nije pronađena" };
  return pageMetadata({
    path: bookingIndustryPath(page.slug),
    title: page.seo.title,
    description: page.seo.metaDescription,
    keywords: page.seo.keywords,
  });
}

export default async function BookingIndustryPage({ params }: Props) {
  const { slug } = await params;
  const page = getBookingIndustryPage(slug);
  if (!page) notFound();

  const path = bookingIndustryPath(page.slug);
  const url = absoluteUrl(path);

  return (
    <div className={v4FontClass}>
      <JsonLd
        data={[
          webPageAboutOrganizationJsonLd(path, `${page.seo.title} | Adspire`, page.seo.metaDescription, {
            mainEntity: `${url}#service`,
            speakable: ["[data-answer]"],
          }),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${url}#service`,
            name: page.seo.title,
            serviceType: "Sistem za online zakazivanje termina",
            description: page.summary,
            provider: orgRef(),
            // The trade page is one delivery of the one booking product, not a
            // separate system. Saying so keeps five pages from reading as five
            // competing products by the same company.
            isSimilarTo: { "@id": productId(absoluteUrl(bookingSeo.path)) },
            isRelatedTo: { "@id": serviceId("sistemi-za-zakazivanje") },
            audience: page.audience.map((name) => ({
              "@type": "BusinessAudience",
              audienceType: name,
            })),
            areaServed: [
              { "@type": "Country", name: "Serbia" },
              { "@type": "AdministrativeArea", name: "Niš" },
              { "@type": "AdministrativeArea", name: "Beograd" },
            ],
            url,
          },
          breadcrumbJsonLd([
            { name: "Početna", path: "/" },
            { name: "Online zakazivanje", path: bookingSeo.path },
            { name: page.navLabel, path },
          ]),
          faqPageJsonLd(page.faq, url),
        ]}
      />
      <BookingIndustryV4 page={page} />
    </div>
  );
}
