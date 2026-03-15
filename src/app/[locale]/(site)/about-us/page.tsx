import { CtaSection } from "@/components/site/sections/CtaSection";
import { InfoArticleSection } from "@/components/site/sections/InfoArticleSection";
import { PageHero } from "@/components/site/sections/PageHero";
import { TestimonialsSection } from "@/components/site/sections/TestimonialsSection";
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

  return buildPageMetadata(locale, "/about-us", content.nav.about, content.digitalHero.body);
}

export default async function AboutUsPage({
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
        kicker={content.nav.about}
        title={content.nav.about}
        subtitle={content.digitalHero.body}
      />
      <InfoArticleSection
        locale={locale}
        title={content.team.title}
        subtitle={content.team.subtitle}
        bodyTitle={`${content.team.leadName} - ${content.team.leadRole}`}
        body={content.team.leadBio}
        bullets={content.team.bullets}
      />
      <TestimonialsSection
        locale={locale}
        title={content.testimonials.title}
        subtitle={content.testimonials.subtitle}
        items={content.testimonials.items}
      />
      <CtaSection locale={locale} cta={content.cta} />
    </>
  );
}
