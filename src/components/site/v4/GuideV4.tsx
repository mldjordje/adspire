"use client";

import Link from "next/link";
import { PageShellV4 } from "./PageShellV4";
import { StickyCtaV4 } from "./StickyCtaV4";
import type { Guide } from "@/content/site/guides";
import { guides } from "@/content/site/guides";
import styles from "./GuideV4.module.css";

/** Slug → id for aria-labelledby, so several sections on one page stay unique. */
function sectionId(index: number) {
  return `guide-section-${index}`;
}

type Props = { guide: Guide };

/**
 * Renders any problem-intent guide from guides.ts on the OBSIDIAN chrome. One
 * component for every guide — a new page is a data entry plus a route, never a
 * new layout to keep in sync.
 */
export function GuideV4({ guide }: Props) {
  // Guides link to each other so none of them is a dead end for a reader or a
  // crawler. Capped at three — listing every sibling turns the tail of the page
  // into a link dump and dilutes what each link is worth.
  const others = guides.filter((g) => g.path !== guide.path).slice(0, 3);

  return (
    <PageShellV4 eyebrow={guide.eyebrow} title={guide.h1} intro={guide.lead}>
      <StickyCtaV4
        ctaLabel={guide.cta.label}
        ctaHref={guide.cta.href}
        trackingLabel={`sticky:${guide.path}`}
      />
      <div className={styles.body} data-reveal>
        {guide.sections.map((section, index) => (
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

        {guide.proof && guide.proof.length > 0 && (
          <section aria-labelledby="guide-proof">
            <h2 id="guide-proof" className={styles.h2}>{guide.proofHeading}</h2>
            <div className={styles.proofGrid}>
              {guide.proof.map((item) => (
                <div key={item.href} className={styles.proofRow}>
                  <Link className={styles.proofLabel} href={item.href}>{item.label}</Link>
                  <p className={styles.proofNote}>{item.note}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section aria-labelledby="guide-faq">
          <h2 id="guide-faq" className={styles.h2}>{guide.faqHeading}</h2>
          <div className={styles.faqList}>
            {guide.faq.map((item) => (
              <div key={item.q}>
                <h3 className={styles.faqQ}>{item.q}</h3>
                <p className={styles.text}>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className={styles.cta}>
          <Link className={styles.ctaPrimary} href={guide.cta.href}>{guide.cta.label}</Link>
          <Link className={styles.ctaSecondary} href={guide.secondaryCta.href}>
            {guide.secondaryCta.label}
          </Link>
        </div>

        {others.length > 0 && (
          <p className={styles.related}>
            Dalje:{" "}
            {others.map((g, i) => (
              <span key={g.path}>
                {i > 0 && " · "}
                <Link className={styles.inlineLink} href={g.path}>{g.h1}</Link>
              </span>
            ))}
            {" · "}
            <Link className={styles.inlineLink} href="/cena-izrade-sajta">Koliko košta izrada sajta?</Link>
            {" · "}
            <Link className={styles.inlineLink} href="/vodici">Svi vodiči</Link>
          </p>
        )}
      </div>
    </PageShellV4>
  );
}
