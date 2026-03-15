import { CtaSection } from "@/components/site/sections/CtaSection";
import { PageHero } from "@/components/site/sections/PageHero";
import { PortfolioSection } from "@/components/site/sections/PortfolioSection";
import { getSiteContent } from "@/content/site";
import { normalizeLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = normalizeLocale(localeParam);
  const content = getSiteContent(locale);

  return buildPageMetadata(locale, "/our-projects", content.nav.projects, content.portfolio.pageSubtitle);
}

export default async function OurProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = normalizeLocale(localeParam);
  const content = getSiteContent(locale);

  return (
    <>
      <PageHero
        kicker={content.nav.projects}
        title={content.portfolio.pageTitle}
        subtitle={content.portfolio.pageSubtitle}
      />
      <PortfolioSection
        locale={locale}
        title={content.portfolio.pageTitle}
        subtitle={content.portfolio.pageSubtitle}
        items={content.portfolio.items}
      />
      <CtaSection locale={locale} cta={content.cta} />
    </>
  );
}
