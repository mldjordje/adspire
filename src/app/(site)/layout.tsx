import { SiteShell } from "@/components/site/SiteShell";
import { getSiteContent } from "@/content/site";

export default function DefaultSiteLayout({ children }: { children: React.ReactNode }) {
  const locale = "sr" as const;
  const content = getSiteContent(locale);

  return <SiteShell locale={locale} content={content}>{children}</SiteShell>;
}
