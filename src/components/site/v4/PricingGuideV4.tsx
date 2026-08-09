"use client";

import Link from "next/link";
import { PageShellV4 } from "./PageShellV4";
import { pricingGuidePage as p } from "@/content/site/pricingGuidePage";
import styles from "./PricingGuideV4.module.css";

/**
 * "Koliko košta izrada sajta" landing page on the OBSIDIAN chrome. Content and
 * the price ranges live in pricingGuidePage so the FAQ block, the JSON-LD and
 * the visible copy can never drift apart.
 */
export function PricingGuideV4() {
  return (
    <PageShellV4
      eyebrow="Cene i obim posla"
      title={p.h1}
      intro={p.lead}
    >
      <div className={styles.body} data-reveal>
        <section aria-labelledby="ranges-heading">
          <h2 id="ranges-heading" className={styles.h2}>{p.rangesHeading}</h2>
          <p className={styles.intro}>{p.rangesIntro}</p>
          <div className={styles.rangeGrid}>
            {p.ranges.map((item) => (
              <div key={item.label} className={styles.rangeRow}>
                <Link className={styles.rangeLabel} href={item.href}>{item.label}</Link>
                <span className={styles.rangePrice}>{item.price}</span>
                <p className={styles.rangeNote}>{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="up-heading">
          <h2 id="up-heading" className={styles.h2}>{p.upHeading}</h2>
          <ul className={styles.list}>
            {p.upDrivers.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="down-heading">
          <h2 id="down-heading" className={styles.h2}>{p.downHeading}</h2>
          <ul className={styles.list}>
            {p.downDrivers.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="why-heading">
          <h2 id="why-heading" className={styles.h2}>{p.whyHeading}</h2>
          <p className={styles.text}>{p.whyBody}</p>
        </section>

        <section aria-labelledby="included-heading">
          <h2 id="included-heading" className={styles.h2}>{p.includedHeading}</h2>
          <ul className={styles.list}>
            {p.included.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="faq-heading">
          <h2 id="faq-heading" className={styles.h2}>{p.faqHeading}</h2>
          <div className={styles.faqList}>
            {p.faq.map((item) => (
              <div key={item.q}>
                <h3 className={styles.faqQ}>{item.q}</h3>
                <p className={styles.faqA}>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className={styles.cta}>
          <Link className={styles.ctaPrimary} href={p.cta.href}>{p.cta.label}</Link>
          <Link className={styles.ctaSecondary} href={p.secondaryCta.href}>{p.secondaryCta.label}</Link>
        </div>

        <section aria-labelledby="related-heading">
          <h2 id="related-heading" className={styles.h2}>{p.relatedHeading}</h2>
          <ul className={styles.list}>
            {p.related.map((item) => (
              <li key={item.href}>
                <Link className={styles.inlineLink} href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageShellV4>
  );
}
