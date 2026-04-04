import type { ReactNode } from "react";
import Link from "next/link";
import { getSiteContent } from "@/content/site";
import { defaultLocale } from "@/lib/site-config";

const content = getSiteContent(defaultLocale);

type SiteShellProps = {
  children: ReactNode;
};

function isExternal(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="site-frame">
      <header className="site-header">
        <div className="shell site-header__inner">
          <Link href="/" className="site-brand" aria-label={content.siteTitle}>
            <span className="site-brand__mark">A</span>
            <span className="site-brand__text">
              <strong>{content.siteTitle}</strong>
              <span>digital systems studio</span>
            </span>
          </Link>

          <nav className="site-nav" aria-label="Glavna navigacija">
            {content.nav.map((item) => (
              <Link key={item.href} href={item.href} className="site-nav__link">
                {item.label}
              </Link>
            ))}
          </nav>

          <Link href={content.headerCta.href} className="button button--primary site-header__cta">
            {content.headerCta.label}
          </Link>
        </div>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="shell site-footer__grid">
          <div className="site-footer__brand">
            <p className="eyebrow">Adspire</p>
            <h2>{content.footer.tagline}</h2>
            <Link href={content.footer.cta.href} className="button button--primary">
              {content.footer.cta.label}
            </Link>
          </div>

          <div className="site-footer__nav">
            <p className="footer-label">Navigacija</p>
            {content.nav.map((item) => (
              <Link key={item.href} href={item.href} className="footer-link">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="site-footer__contact">
            <p className="footer-label">Kontakt</p>
            {content.footer.contactItems.map((item) =>
              item.href ? (
                isExternal(item.href) ? (
                  <a key={item.label} href={item.href} className="footer-link">
                    {item.value}
                  </a>
                ) : (
                  <Link key={item.label} href={item.href} className="footer-link">
                    {item.value}
                  </Link>
                )
              ) : (
                <p key={item.label} className="footer-copy">
                  {item.value}
                </p>
              ),
            )}
          </div>
        </div>

        <div className="shell site-footer__bottom">
          <p>{content.siteTitle}</p>
          <p>{content.footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
}
