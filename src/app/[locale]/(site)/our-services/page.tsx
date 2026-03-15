import { CtaSection } from "@/components/site/sections/CtaSection";
import { PageHero } from "@/components/site/sections/PageHero";
import { ServicesSection } from "@/components/site/sections/ServicesSection";
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

  return buildPageMetadata(
    locale,
    "/our-services",
    content.services.pageTitle,
    content.services.pageSubtitle
  );
}

export default async function OurServicesPage({
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
        kicker={content.nav.services}
        title={content.services.pageTitle}
        subtitle={content.services.pageSubtitle}
      />
      <ServicesSection
        locale={locale}
        title={content.services.pageTitle}
        subtitle={content.services.pageSubtitle}
        items={content.services.items}
      />
      <CtaSection locale={locale} cta={content.cta} />
    </>
  );
}
