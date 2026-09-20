"use client";

import { defaultLocale, localePath, type LocaleCode } from "@/lib/site-config";
import { PageShellV4 } from "./PageShellV4";
import { getFaqCopy } from "./faqCopy";
import styles from "./FaqV4.module.css";

export function FaqV4({ locale = defaultLocale }: { locale?: LocaleCode }) {
  const t = getFaqCopy(locale);
  return (
    <PageShellV4
      eyebrow={t.eyebrow}
      title={
        <>
          {t.title[0]}
          <br />
          {t.title[1]}
          <span className={styles.dot}>.</span>
        </>
      }
      intro={t.intro}
    >
      <section className={styles.faq} data-reveal>
        {t.items.map((item, index) => (
          <details key={item.q} className={styles.item} open={index === 0}>
            <summary className={styles.question}>
              <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
              <span>{item.q}</span>
              <span className={styles.plus} aria-hidden="true">
                +
              </span>
            </summary>
            <p className={styles.answer}>{item.a}</p>
          </details>
        ))}
      </section>

      <section className={styles.cta} data-reveal>
        <div>
          <span className={styles.ctaLabel}>{t.cta.label}</span>
          <h2 className={styles.ctaTitle}>{t.cta.title}</h2>
        </div>
        <a
          className={styles.ctaButton}
          href={localePath("/contact-us", locale)}
          data-cta="faq-kontakt"
          data-cursor="on"
          data-magnetic
        >
          {t.cta.button}
        </a>
      </section>
    </PageShellV4>
  );
}
