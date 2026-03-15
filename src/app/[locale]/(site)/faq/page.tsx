import { CtaSection } from "@/components/site/sections/CtaSection";
import { FaqSection } from "@/components/site/sections/FaqSection";
import { PageHero } from "@/components/site/sections/PageHero";
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

  return buildPageMetadata(locale, "/faq", content.nav.faq, content.faq.subtitle);
}

export default async function FaqPage({
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
        kicker={content.nav.faq}
        title={content.faq.title}
        subtitle={content.faq.subtitle}
      />
      <FaqSection
        locale={locale}
        title={content.faq.title}
        subtitle={content.faq.subtitle}
        items={content.faq.items}
      />
      <CtaSection locale={locale} cta={content.cta} />
    </>
  );
}
