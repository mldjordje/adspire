"use client";

import Link from "next/link";
import { PageShellV4 } from "./PageShellV4";
import { getShellCopy } from "./shellCopy";
import type { PartnerPage } from "@/content/site/partnerPage";
// Same layout language as the guides — a partner page is the same shape of
// document, so it reuses their stylesheet rather than duplicating it.
import styles from "./GuideV4.module.css";

function sectionId(index: number) {
  return `partner-section-${index}`;
}

type Props = { page: PartnerPage };

/** Renders the white-label partner page on the OBSIDIAN chrome. English copy only. */
export function PartnerV4({ page }: Props) {
  return (
    <PageShellV4 eyebrow={page.eyebrow} title={page.h1} intro={page.lead} copyOverride={getShellCopy("en")}>
      <div className={styles.body} data-reveal>
        {page.sections.map((section, index) => (
          <section key={section.heading} aria-labelledby={sectionId(index)}>
            <h2 id={sectionId(index)} className={styles.h2}>{section.heading}</h2>
            {section.body?.map((paragraph) => (
              <p key={paragraph} className={styles.text}>{paragraph}</p>
            ))}
            {section.bullets && (
              <ul className={styles.list}>
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <section aria-labelledby="partner-contact">
          <h2 id="partner-contact" className={styles.h2}>Contact</h2>
          <ul className={styles.list}>
            <li>Đorđe Mladenović, Adspire Digital — Niš, Serbia</li>
            <li>
              <a className={styles.inlineLink} href="mailto:djordje@adspire.rs">djordje@adspire.rs</a>
            </li>
            <li>
              <a className={styles.inlineLink} href="tel:+381601491491">+381 60 149 149 1</a>
            </li>
          </ul>
        </section>

        <section aria-labelledby="partner-faq">
          <h2 id="partner-faq" className={styles.h2}>{page.faqHeading}</h2>
          <div className={styles.faqList}>
            {page.faq.map((item) => (
              <div key={item.q}>
                <h3 className={styles.faqQ}>{item.q}</h3>
                <p className={styles.text}>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className={styles.cta}>
          <Link className={styles.ctaPrimary} href={page.cta.href}>{page.cta.label}</Link>
          <Link className={styles.ctaSecondary} href={page.secondaryCta.href}>
            {page.secondaryCta.label}
          </Link>
        </div>
      </div>
    </PageShellV4>
  );
}
