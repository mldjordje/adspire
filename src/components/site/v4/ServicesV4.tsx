"use client";

import { PageShellV4 } from "./PageShellV4";
import { getServicesCopy } from "./servicesCopy";
import styles from "./ServicesV4.module.css";
import { defaultLocale, localePath, type LocaleCode } from "@/lib/site-config";

/**
 * Full services page — every catalog service grouped by outcome, plus the
 * "how we work" strip and a closing CTA. Copy stays outcome-led:
 * more leads, more time, more revenue.
 *
 * Copy lives in servicesCopy so /en and /de serve their own language instead
 * of Serbian bodies under localized metadata.
 */

export function ServicesV4({ locale = defaultLocale }: { locale?: LocaleCode }) {
  const t = getServicesCopy(locale);

  return (
    <PageShellV4
      locale={locale}
      eyebrow={t.eyebrow}
      title={
        <>
          {t.title[0]}
          <br />
          {t.title[1]}<span className={styles.dot}>.</span>
        </>
      }
      intro={t.intro}
    >
      {t.groups.map((group) => (
        <section key={group.label} className={styles.group} data-reveal>
          <div className={styles.groupHead}>
            <h2 className={styles.groupLabel}>{group.label}</h2>
            <p className={styles.groupBlurb}>{group.blurb}</p>
          </div>
          <div className={styles.grid}>
            {group.services.map((s) => (
              <a
                key={s.slug}
                className={styles.card}
                href={localePath(`/our-services/${s.slug}`, locale)}
                data-cursor="otvori"
              >
                <div className={styles.cardTop}>
                  <h3 className={styles.cardTitle}>{s.title}</h3>
                  <span className={styles.cardArrow}>↗</span>
                </div>
                <p className={styles.cardDesc}>{s.desc}</p>
                <div className={styles.cardTags}>
                  {s.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>
      ))}

      <section className={styles.process} data-reveal>
        <h2 className={styles.processTitle}>{t.processTitle}</h2>
        <div className={styles.processGrid}>
          {t.process.map((p) => (
            <div key={p.num} className={styles.processStep}>
              <span className={styles.processNum}>{p.num}</span>
              <h3 className={styles.processStepTitle}>{p.title}</h3>
              <p className={styles.processDesc}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cta} data-reveal>
        <h2 className={styles.ctaTitle}>{t.ctaTitle}</h2>
        <p className={styles.ctaText}>{t.ctaText}</p>
        <a className={styles.ctaButton} href={t.ctaHref} data-cta="usluge-upit" data-cursor="on" data-magnetic>
          {t.ctaButton}
        </a>
      </section>
    </PageShellV4>
  );
}
