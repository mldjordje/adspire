import Link from "next/link";
import type { LocaleCode } from "@/lib/site-config";
import { withLocalePrefix } from "@/lib/locale";

type FooterProps = {
  locale: LocaleCode;
  footer: {
    tagline: string;
    cta: string;
    copyright: string;
  };
};

export function SiteFooter({ locale, footer }: FooterProps) {
  return (
    <footer className="mxd-footer">
      <div className="mxd-footer__top">
        <p>{footer.tagline}</p>
        <Link href={withLocalePrefix(locale, "/contact-us")} locale={false} className="mxd-pill-btn">
          {footer.cta}
        </Link>
      </div>
      <div className="mxd-footer__bottom">
        <span>Adspire</span>
        <span>{new Date().getFullYear()} {footer.copyright}</span>
      </div>
    </footer>
  );
}
