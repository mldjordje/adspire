import { UnderConstructionPage } from "@/components/site/UnderConstructionPage";
import { getSiteContent } from "@/content/site";
import { normalizeLocale } from "@/lib/locale";

type SiteLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function SiteLayout({ children, params }: SiteLayoutProps) {
  const { locale: localeParam } = await params;
  const locale = normalizeLocale(localeParam);
  const content = getSiteContent(locale);

  void children;

  return <UnderConstructionPage locale={locale} contact={content.contact} />;
}
