import type { LocalizedPageContent } from "@/content/site/types";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteStructuredData } from "@/components/site/SiteStructuredData";
import type { LocaleCode } from "@/lib/site-config";

type SiteShellProps = {
  locale: LocaleCode;
  content: LocalizedPageContent;
  children: React.ReactNode;
};

export function SiteShell({ locale, content, children }: SiteShellProps) {
  return (
    <div className="mxd-site-shell">
      <SiteStructuredData locale={locale} />
      <SiteHeader locale={locale} nav={content.nav} />
      <main className="mxd-main">{children}</main>
      <SiteFooter locale={locale} footer={content.footer} />
    </div>
  );
}
