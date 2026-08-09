"use client";

import Link from "next/link";
import { PageShellV4 } from "./PageShellV4";
import { nisPresencePage as p } from "@/content/site/nisPresencePage";
import styles from "./NisPresenceV4.module.css";

/**
 * Local-SEO entity page for "izrada sajta i aplikacija Niš" on the OBSIDIAN
 * chrome — no leftover template. Content comes from nisPresencePage.
 */
export function NisPresenceV4() {
  return (
    <PageShellV4
      eyebrow="Niš, Srbija"
      title={
        <>
          {p.h1}
          <span className={styles.dot}>.</span>
        </>
      }
      intro={p.lead}
    >
      <div className={styles.body} data-reveal>
        <section className={styles.block} aria-labelledby="loc-heading">
          <h2 id="loc-heading" className={styles.h2}>{p.locationBlock.heading}</h2>
          <ul className={styles.list}>
            {p.locationBlock.lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        <section className={styles.block} aria-labelledby="svc-heading">
          <h2 id="svc-heading" className={styles.h2}>{p.servicesHeading}</h2>
          <ul className={styles.list}>
            {p.serviceBullets.map((item) => (
              <li key={item.href}>
                <Link className={styles.inlineLink} href={item.href}>{item.text}</Link>
              </li>
            ))}
          </ul>
          <p className={styles.more}>
            <Link className={styles.inlineLink} href="/our-services">Kompletan pregled usluga →</Link>
          </p>
        </section>

        <section className={styles.block} aria-labelledby="sib-heading">
          <h2 id="sib-heading" className={styles.h2}>{p.siblingsHeading}</h2>
          <ul className={styles.list}>
            {p.siblings.map((item) => (
              <li key={item.href}>
                <Link className={styles.inlineLink} href={item.href}>{item.text}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.block} aria-labelledby="ctx-heading">
          <h2 id="ctx-heading" className={styles.h2}>{p.contextHeading}</h2>
          <p className={styles.text}>{p.contextBody}</p>
        </section>

        <div className={styles.cta}>
          <Link className={styles.ctaPrimary} href={p.cta.href}>{p.cta.label}</Link>
          <Link className={styles.ctaSecondary} href={p.secondaryCta.href}>{p.secondaryCta.label}</Link>
        </div>
      </div>
    </PageShellV4>
  );
}
