"use client";

import Link from "next/link";
import { PageShellV4 } from "./PageShellV4";
import { StickyCtaV4 } from "./StickyCtaV4";
import { AuroraV4 } from "./AuroraV4";
import styles from "./BookingLandingV4.module.css";
import local from "./NicheSolutionV4.module.css";
import {
  industryPages,
  industryPath,
  industrySectorLabels,
  industrySectorOrder,
} from "@/content/site/industries";

/**
 * The hub for the per-industry pages.
 *
 * Two jobs. For a person: the one place to find their trade without going
 * through the menu, which cannot hold this many links. For an answer engine:
 * a single URL that enumerates the whole set, so "what do they do for my
 * industry" is answerable without crawling every page — the same gap
 * `solutionEntries()` closed for the organization node.
 */

export function IndustryHubV4() {
  const sectors = industrySectorOrder
    .map((sector) => ({
      sector,
      label: industrySectorLabels[sector],
      pages: industryPages.filter((page) => page.sector === sector),
    }))
    .filter((group) => group.pages.length > 0);

  return (
    <PageShellV4
      eyebrow="Rešenja po delatnosti"
      title="Šta digitalno može da se uradi baš u vašem poslu"
      intro="Za svaku delatnost jedna strana: gde curi vreme, šta rešava sajt, šta web aplikacija, šta mobilna, a šta interni sistem koji niko spolja ne vidi."
      background={<AuroraV4 />}
      heroExtra={
        <div className={styles.heroExtra}>
          <div className={styles.heroActions}>
            <a className={styles.btnGhost} href="#delatnosti">
              Pronađite svoju delatnost
            </a>
            <Link className={styles.btnPrimary} href="/upit/brzo" data-cta="hub-delatnosti-hero">
              Zatražite ponudu
            </Link>
          </div>
        </div>
      }
    >
      <StickyCtaV4 ctaLabel="Zatražite ponudu" ctaHref="/upit/brzo" trackingLabel="sticky:/resenja-po-delatnosti" />

      <div className={`${styles.body} ${local.scrim}`}>
        <section className={styles.section} data-reveal>
          <header className={styles.head}>
            <span className={styles.eyebrow}>Ukratko</span>
            <h2 className={styles.h2}>Isti posao, četiri načina da se reši</h2>
            <p className={styles.lead} data-answer>
              Adspire pravi softver po meri za firme u Srbiji i za naše ljude sa firmom u EU. Za svaku delatnost
              postoji strana koja opisuje četiri sloja isporuke — javni sajt, web aplikaciju za klijente, mobilnu
              aplikaciju i interni sistem za firmu — kroz stvarne radne tokove tog posla, a ne kroz opštu priču o
              digitalizaciji. Ako vaše delatnosti još nema na spisku, posao se radi isto: prvo razgovor o tome gde
              vam curi vreme.
            </p>
          </header>
        </section>

        <section id="delatnosti" className={styles.section} data-reveal>
          <header className={styles.head}>
            <span className={styles.eyebrow}>Spisak</span>
            <h2 className={styles.h2}>Delatnosti</h2>
          </header>
          {sectors.map((group) => (
            <div key={group.sector} className={styles.section} data-reveal>
              <header className={styles.head}>
                <h3 className={styles.h2}>{group.label}</h3>
              </header>
              <ul className={styles.drivers}>
                {group.pages.map((page) => (
                  <li key={page.slug} className={styles.driver}>
                    <h4 className={styles.driverTitle}>
                      <Link
                        className={styles.inlineLink}
                        href={industryPath(page.slug)}
                        data-cta={`hub-delatnosti:${page.slug}`}
                      >
                        {page.navLabel}
                      </Link>
                    </h4>
                    <p className={styles.driverBody}>{page.hero.lead}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className={styles.finalCta} data-reveal>
          <span className={styles.eyebrow}>Nema vaše delatnosti?</span>
          <h2 className={styles.finalTitle}>To ne menja ništa</h2>
          <p className={styles.finalBody}>
            Spisak raste onim redom kojim stižu pitanja. Opišite kako danas radite — odgovor stiže lično, sa
            procenom obima i cene, ili sa poštenim „ovo vam ne treba“.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.btnPrimary} href="/upit/brzo" data-cta="hub-delatnosti-kraj">
              Pošaljite upit
            </Link>
            <Link className={styles.btnGhost} href="/our-services" data-cta="hub-delatnosti-usluge">
              Sve usluge
            </Link>
          </div>
        </section>
      </div>
    </PageShellV4>
  );
}
