import { UnderConstructionPage } from "@/components/site/UnderConstructionPage";
import { getSiteContent } from "@/content/site";

export default function DefaultSiteLayout({ children }: { children: React.ReactNode }) {
  const locale = "sr" as const;
  const content = getSiteContent(locale);

  void children;

  return <UnderConstructionPage locale={locale} contact={content.contact} />;
}
