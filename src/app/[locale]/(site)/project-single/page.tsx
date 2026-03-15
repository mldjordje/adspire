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

  return buildPageMetadata(locale, "/project-single", content.project.title, content.project.subtitle);
}

export default async function ProjectSinglePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = normalizeLocale(localeParam);
  const content = getSiteContent(locale);
  const featured = content.portfolio.items[0];

  return (
    <>
      <PageHero
        kicker={content.nav.projects}
        title={content.project.title}
        subtitle={content.project.subtitle}
      />
      <InfoArticleSection
        locale={locale}
        title={featured.name}
        subtitle={content.project.subtitle}
        bodyTitle={content.project.bodyTitle}
        body={content.project.body}
        bullets={content.project.bullets}
        actionLabel={content.project.liveLabel}
        actionHref={featured.url}
      />
      <CtaSection locale={locale} cta={content.cta} />
    </>
  );
}
