import type { Metadata } from "next";
import Link from "next/link";
import { AzurioChrome } from "@/components/site/AzurioChrome";
import { JsonLd } from "@/components/site/JsonLd";
import { nisPresencePage } from "@/content/site/nisPresencePage";
import { webPageAboutOrganizationJsonLd } from "@/lib/seo/jsonld";
import { absoluteUrl, pageMetadata } from "@/lib/seo/metadata";

const p = nisPresencePage;
const pageUrl = absoluteUrl(p.path);

export const metadata: Metadata = pageMetadata({
  path: p.path,
  title: p.title,
  description: p.metaDescription,
  keywords: [
    "izrada sajta Niš",
    "web agencija Niš",
    "aplikacije Niš",
    "Next.js Niš",
    "Adspire Digital",
    "razvoj softvera Niš",
    "PWA Niš",
    "e-commerce Niš",
  ],
});

export default function NisPresencePage() {
  const jsonLd = webPageAboutOrganizationJsonLd(p.path, `${p.title} | Adspire Digital`, p.metaDescription);

  return (
    <AzurioChrome>
      <JsonLd
        data={[
          jsonLd,
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Početna", item: absoluteUrl("/") },
              { "@type": "ListItem", position: 2, name: p.title, item: pageUrl },
            ],
          },
        ]}
      />
      <div className="azurio-template-root">
        <article className="adspire-entity-page mxd-section padding-top-title">
          <div className="mxd-container grid-l-container">
            <header className="adspire-entity-page__header">
              <p className="adspire-entity-page__kicker">Niš, Srbija</p>
              <h1>{p.h1}</h1>
              <p className="adspire-entity-page__lead">{p.lead}</p>
            </header>

            <section className="adspire-entity-page__section" aria-labelledby="loc-heading">
              <h2 id="loc-heading">{p.locationBlock.heading}</h2>
              <ul>
                {p.locationBlock.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </section>

            <section className="adspire-entity-page__section" aria-labelledby="svc-heading">
              <h2 id="svc-heading">{p.servicesHeading}</h2>
              <ul>
                {p.serviceBullets.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.text}</Link>
                  </li>
                ))}
              </ul>
              <p className="adspire-entity-page__more">
                <Link href="/our-services">Kompletan pregled usluga →</Link>
              </p>
            </section>

            <section className="adspire-entity-page__section" aria-labelledby="ctx-heading">
              <h2 id="ctx-heading">{p.contextHeading}</h2>
              <p>{p.contextBody}</p>
            </section>

            <p className="adspire-entity-page__cta">
              <Link className="adspire-entity-page__cta-primary" href={p.cta.href}>
                {p.cta.label}
              </Link>
              <Link className="adspire-entity-page__cta-secondary" href={p.secondaryCta.href}>
                {p.secondaryCta.label}
              </Link>
            </p>
          </div>
        </article>
      </div>
    </AzurioChrome>
  );
}
