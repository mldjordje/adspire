import styles from "./FooterV4.module.css";
import { getNavMenu } from "./navMenu";
import type { LocaleCode } from "@/lib/site-config";

/**
 * The one footer: home and every inner page render this, over the event
 * horizon. Links come from navMenu so the footer cannot drift from the nav.
 * `href` is the caller's path mapper (locale prefix, or none on standalone pages).
 */
export function FooterV4({ locale, href }: { locale: LocaleCode; href: (path: string) => string }) {
  const f = getNavMenu(locale).footer;

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brandCol}>
          <a className={styles.brand} href={href("/")} data-cursor="on">
            ADSPIRE<span>.</span>
          </a>
          <p className={styles.blurb}>{f.blurb}</p>
          <span className={styles.status}>
            <span className={styles.statusDot} aria-hidden="true" />
            {f.status}
          </span>
        </div>

        <div className={styles.columns}>
          {f.columns.map((col) => (
            <nav key={col.title} className={styles.col} aria-label={col.title}>
              <span className={styles.colTitle}>{col.title}</span>
              {col.items.map((item) => (
                <a key={item.href} href={href(item.href)} data-cta={item.cta} data-cursor="on">
                  {item.label}
                </a>
              ))}
            </nav>
          ))}
        </div>
      </div>

      {f.local ? (
        <nav className={styles.local} aria-label={f.local.title}>
          <span className={styles.localTitle}>{f.local.title}</span>
          {f.local.items.map((item) => (
            <a key={item.href} href={href(item.href)} data-cursor="on">
              {item.label}
            </a>
          ))}
        </nav>
      ) : null}

      <div className={styles.bottom}>
        <span>{f.rights}</span>
        <span className={styles.bottomLinks}>
          <a href="mailto:djordje@adspire.rs" data-cursor="on">djordje@adspire.rs</a>
          <a href="tel:+381601491491" data-cursor="on">+381 60 149 149 1</a>
        </span>
        <span className={styles.bottomLinks}>
          {f.legal.map((item) => (
            <a key={item.href} href={href(item.href)} data-cursor="on">
              {item.label}
            </a>
          ))}
        </span>
      </div>
    </footer>
  );
}
