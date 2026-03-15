import { LandingPage } from "@/components/site/LandingPage";
import { getSiteContent } from "@/content/site";
import { buildPageMetadata } from "@/lib/metadata";
import { normalizeLocale } from "@/lib/locale";

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
    "/",
    "Adspire",
    content.hero.body
  );
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = normalizeLocale(localeParam);
  const content = getSiteContent(locale);

  return <LandingPage locale={locale} content={content} />;
}
