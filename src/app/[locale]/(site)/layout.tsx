import { SiteShell } from "@/components/site/SiteShell";
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

  return (
    <SiteShell locale={locale} content={content}>
      {children}
    </SiteShell>
  );
}
