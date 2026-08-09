"use client";

import Link from "next/link";
import { PageShellV4 } from "./PageShellV4";
import type { LocalPage } from "@/content/site/localPages";
import { localPages } from "@/content/site/localPages";
// Same layout language as the guides — a local page is the same shape of
// document, so it reuses their stylesheet rather than duplicating it.
import styles from "./GuideV4.module.css";

function sectionId(index: number) {
  return `local-section-${index}`;
}

type Props = { page: LocalPage };

/** Renders any Niš landing page from localPages.ts on the OBSIDIAN chrome. */
export function LocalPageV4({ page }: Props) {
  const others = localPages.filter((p) => p.path !== page.path);

  return (
    <PageShellV4 eyebrow={page.eyebrow} title={page.h1} intro={page.lead}>
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

        {page.proof && page.proof.length > 0 && (
          <section aria-labelledby="local-proof">
            <h2 id="local-proof" className={styles.h2}>{page.proofHeading}</h2>
            <div className={styles.proofGrid}>
              {page.proof.map((item) => (
                <div key={item.href} className={styles.proofRow}>
                  <Link className={styles.proofLabel} href={item.href}>{item.label}</Link>
                  <p className={styles.proofNote}>{item.note}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section aria-labelledby="local-contact">
          <h2 id="local-contact" className={styles.h2}>Kontakt u Nišu</h2>
          <ul className={styles.list}>
            <li>Adspire Digital, Dimitrija Leka 66, 18000 Niš</li>
            <li>
              <a className={styles.inlineLink} href="mailto:djordje@adspire.rs">djordje@adspire.rs</a>
            </li>
            <li>
              <a className={styles.inlineLink} href="tel:+381601491491">+381 60 149 149 1</a>
            </li>
            <li>Sastanak uživo u Nišu ili online — kako vam odgovara.</li>
          </ul>
        </section>

        <section aria-labelledby="local-faq">
          <h2 id="local-faq" className={styles.h2}>{page.faqHeading}</h2>
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

        <p className={styles.related}>
          Još iz Niša:{" "}
          {others.map((p, i) => (
            <span key={p.path}>
              {i > 0 && " · "}
              <Link className={styles.inlineLink} href={p.path}>{p.h1}</Link>
            </span>
          ))}
          {" · "}
          <Link className={styles.inlineLink} href="/izrada-sajta-i-aplikacija-nis">
            Izrada sajta u Nišu
          </Link>
        </p>
      </div>
    </PageShellV4>
  );
}
