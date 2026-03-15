import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaSection } from "@/components/site/sections/CtaSection";
import { PageHero } from "@/components/site/sections/PageHero";
import { getSiteContent } from "@/content/site";
import { findServiceCatalogEntry } from "@/data/serviceCatalog";
import { normalizeLocale, withLocalePrefix } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/metadata";
import { locales } from "@/lib/site-config";

type ServiceSlugPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  const srContent = getSiteContent("sr");
  const slugs = srContent.services.items.map((item) => item.slug);

  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: ServiceSlugPageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = normalizeLocale(localeParam);
  const content = getSiteContent(locale);
  const service = content.services.items.find((item) => item.slug === slug);

  if (!service) {
    return {};
  }

  return buildPageMetadata(locale, `/usluge/${service.slug}`, service.title, service.summary);
}

export default async function ServiceSlugPage({ params }: ServiceSlugPageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = normalizeLocale(localeParam);
  const content = getSiteContent(locale);
  const service = content.services.items.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  const related = content.services.items.filter((item) => item.slug !== service.slug).slice(0, 3);
  const catalog = findServiceCatalogEntry(service.slug);

  return (
    <>
      <PageHero
        kicker={content.nav.services}
        title={service.title}
        subtitle={service.summary}
      />

      <section className="mxd-section">
        <article className="mxd-card mxd-prose-card">
          <h3>{service.title}</h3>
          <p>{service.summary}</p>
          <ul>
            {service.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <div className="mxd-btn-row">
            <Link href={withLocalePrefix(locale, "/contact-us")} locale={false} className="mxd-pill-btn">
              {content.cta.primaryLabel}
            </Link>
            {catalog?.secondaryCtas?.map((cta) => (
              <a key={cta.href} href={cta.href} target="_blank" rel="noreferrer" className="mxd-ghost-btn">
                {locale === "en" ? cta.labelEn : cta.labelSr}
              </a>
            ))}
          </div>
        </article>
      </section>

      <section className="mxd-section">
        <div className="mxd-section-head">
          <p className="mxd-kicker">{locale === "en" ? "Related" : "Povezano"}</p>
          <h2>{locale === "en" ? "Related services" : "Povezane usluge"}</h2>
        </div>
        <div className="mxd-card-grid">
          {related.map((item) => (
            <article key={item.slug} className="mxd-card">
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <Link href={withLocalePrefix(locale, item.href)} locale={false} className="mxd-ghost-btn mxd-ghost-btn--small">
                {item.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <CtaSection locale={locale} cta={content.cta} />
    </>
  );
}
