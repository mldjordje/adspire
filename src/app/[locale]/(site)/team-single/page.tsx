import { CtaSection } from "@/components/site/sections/CtaSection";
import { InfoArticleSection } from "@/components/site/sections/InfoArticleSection";
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

  return buildPageMetadata(locale, "/team-single", content.team.title, content.team.subtitle);
}

export default async function TeamSinglePage({
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
        title={content.team.title}
        subtitle={content.team.subtitle}
      />
      <InfoArticleSection
        locale={locale}
        title={content.team.title}
        subtitle={content.team.subtitle}
        bodyTitle={`${content.team.leadName} - ${content.team.leadRole}`}
        body={content.team.leadBio}
        bullets={content.team.bullets}
      />
      <CtaSection locale={locale} cta={content.cta} />
    </>
  );
}
