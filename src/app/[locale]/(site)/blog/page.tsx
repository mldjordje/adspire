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

  return buildPageMetadata(locale, "/blog", content.nav.blog, content.article.subtitle);
}

export default async function BlogPage({
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
        kicker={content.nav.blog}
        title={content.nav.blog}
        subtitle={content.article.subtitle}
      />
      <InfoArticleSection
        locale={locale}
        title={content.article.title}
        subtitle={content.article.subtitle}
        bodyTitle={content.article.bodyTitle}
        body={content.article.body}
        bullets={content.article.principles}
      />
      <CtaSection locale={locale} cta={content.cta} />
    </>
  );
}
