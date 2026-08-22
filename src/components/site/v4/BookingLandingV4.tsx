"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PageShellV4 } from "./PageShellV4";
import { StickyCtaV4 } from "./StickyCtaV4";
import { BookingAuroraV4 } from "./BookingAuroraV4";
import styles from "./BookingLandingV4.module.css";
import {
  bookingCapabilities,
  bookingCompare,
  bookingContrast,
  bookingFaq,
  bookingFinalCta,
  bookingHero,
  bookingMistakes,
  bookingNav,
  bookingPricing,
  bookingProcess,
  bookingProof,
  bookingRelated,
  bookingResistance,
  bookingRules,
  bookingSeo,
} from "@/content/site/bookingLandingPage";

/**
 * The booking landing page — the one paid traffic lands on, so it gets its own
 * layout instead of the shared guide template: aurora background, an in-page
 * section menu that tracks scroll, and sections built for a buyer reading top
 * to bottom rather than for a crawler.
 */

/** Section chrome: eyebrow + title + optional lead, identical in every block. */
function SectionHead({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <header className={styles.head}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h2 className={styles.h2}>{title}</h2>
      {lead ? <p className={styles.lead}>{lead}</p> : null}
    </header>
  );
}

/** Scroll-spy for the in-page menu — highlights whichever section is in view. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // The topmost intersecting section wins, so a tall section does not
        // hand the highlight to the short one entering below it.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [ids]);

  return active;
}

const NAV_IDS = bookingNav.map((item) => item.id);

export function BookingLandingV4() {
  const active = useActiveSection(NAV_IDS);

  return (
    <PageShellV4
      eyebrow={bookingHero.eyebrow}
      title={bookingHero.title}
      intro={bookingHero.lead}
      background={<BookingAuroraV4 />}
      heroExtra={
        <div className={styles.heroExtra}>
          <div className={styles.heroActions}>
            <Link
              className={styles.btnPrimary}
              href={bookingHero.primary.href}
              data-cta="zakazivanje-hero-primarni"
            >
              {bookingHero.primary.label}
            </Link>
            <a className={styles.btnGhost} href={bookingHero.secondary.href}>
              {bookingHero.secondary.label}
            </a>
          </div>
          <dl className={styles.stats}>
            {bookingHero.stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <dt className={styles.statValue}>{stat.value}</dt>
                <dd className={styles.statLabel}>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      }
    >
      <StickyCtaV4
        ctaLabel={bookingHero.primary.label}
        ctaHref={bookingHero.primary.href}
        trackingLabel={`sticky:${bookingSeo.path}`}
      />

      {/* In-page menu. Sticks under the fixed nav for the whole page. */}
      <nav className={styles.toc} aria-label="Sadržaj stranice">
        <ul className={styles.tocList}>
          {bookingNav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={styles.tocLink}
                data-active={active === item.id ? "true" : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.body}>
        {/* ─── Before / after ─── */}
        <section id="dan-danas" className={styles.section} data-reveal>
          <SectionHead {...bookingContrast} />
          <div className={styles.contrast}>
            <div className={styles.contrastHeads} aria-hidden="true">
              <span className={styles.contrastHeadBefore}>{bookingContrast.beforeTitle}</span>
              <span className={styles.contrastHeadAfter}>{bookingContrast.afterTitle}</span>
            </div>
            {bookingContrast.rows.map((row) => (
              <div key={row.before} className={styles.contrastRow}>
                <p className={styles.before}>{row.before}</p>
                <p className={styles.after}>{row.after}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Capabilities ─── */}
        <section id="sta-preuzima" className={styles.section} data-reveal>
          <SectionHead {...bookingCapabilities} />
          <ol className={styles.cards}>
            {bookingCapabilities.items.map((item, i) => (
              <li key={item.title} className={styles.card}>
                <span className={styles.cardNum}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardBody}>{item.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ─── Proof ─── */}
        <section id="gotovi-sistemi" className={styles.section} data-reveal>
          <SectionHead {...bookingProof} />
          <div className={styles.proofGrid}>
            {bookingProof.items.map((item) => (
              <article key={item.name} className={styles.proofCard}>
                <span className={styles.proofSector}>{item.sector}</span>
                <h3 className={styles.proofName}>{item.name}</h3>
                <p className={styles.proofNote}>{item.note}</p>
                {"external" in item && item.external ? (
                  <a
                    className={styles.proofLink}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    data-cta={`zakazivanje-dokaz:${item.name}`}
                  >
                    {item.cta} <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <Link
                    className={styles.proofLink}
                    href={item.href}
                    data-cta={`zakazivanje-dokaz:${item.name}`}
                  >
                    {item.cta} <span aria-hidden="true">→</span>
                  </Link>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* ─── Rules the system has to learn ─── */}
        <section id="pravila" className={styles.section} data-reveal>
          <SectionHead {...bookingRules} />
          <ul className={styles.checkList}>
            {bookingRules.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {/* ─── Process ─── */}
        <section id="tok" className={styles.section} data-reveal>
          <SectionHead {...bookingProcess} />
          <ol className={styles.timeline}>
            {bookingProcess.steps.map((step) => (
              <li key={step.title} className={styles.step}>
                <span className={styles.stepWhen}>{step.when}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ─── SaaS vs custom ─── */}
        <section id="platforma-ili-sistem" className={styles.section} data-reveal>
          <SectionHead {...bookingCompare} />
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col" className={styles.thLabel}>
                    <span className={styles.srOnly}>Kriterijum</span>
                  </th>
                  <th scope="col">{bookingCompare.columns.saas}</th>
                  <th scope="col" className={styles.thOurs}>{bookingCompare.columns.custom}</th>
                </tr>
              </thead>
              <tbody>
                {bookingCompare.rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{row.saas}</td>
                    <td className={styles.tdOurs}>{row.custom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.verdict}>{bookingCompare.verdict}</p>
        </section>

        {/* ─── Pricing drivers ─── */}
        <section id="cena" className={styles.section} data-reveal>
          <SectionHead {...bookingPricing} />
          <ul className={styles.drivers}>
            {bookingPricing.drivers.map((driver) => (
              <li key={driver.title} className={styles.driver}>
                <h3 className={styles.driverTitle}>{driver.title}</h3>
                <p className={styles.driverBody}>{driver.body}</p>
              </li>
            ))}
          </ul>
          <p className={styles.note}>
            {bookingPricing.note}{" "}
            <Link className={styles.inlineLink} href={bookingPricing.linkHref}>
              {bookingPricing.linkLabel}
            </Link>
            .
          </p>
        </section>

        {/* ─── Mistakes + the people problem ─── */}
        <section id="greske" className={styles.section} data-reveal>
          <SectionHead {...bookingMistakes} />
          <div className={styles.mistakes}>
            {bookingMistakes.items.map((item) => (
              <div key={item.title} className={styles.mistake}>
                <h3 className={styles.mistakeTitle}>{item.title}</h3>
                <p className={styles.mistakeBody}>{item.body}</p>
              </div>
            ))}
          </div>

          <div className={styles.quoteBlock}>
            <span className={styles.eyebrow}>{bookingResistance.eyebrow}</span>
            <h3 className={styles.quoteTitle}>{bookingResistance.title}</h3>
            {bookingResistance.body.map((p) => (
              <p key={p} className={styles.quoteBody}>{p}</p>
            ))}
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section id="pitanja" className={styles.section} data-reveal>
          <SectionHead eyebrow={bookingFaq.eyebrow} title={bookingFaq.title} />
          <div className={styles.faq}>
            {bookingFaq.items.map((item, i) => (
              <details key={item.q} className={styles.faqItem} open={i === 0}>
                <summary className={styles.faqQ}>
                  <span>{item.q}</span>
                  <span className={styles.faqMark} aria-hidden="true" />
                </summary>
                <p className={styles.faqA}>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ─── Final CTA ─── */}
        <section className={styles.finalCta} data-reveal>
          <span className={styles.eyebrow}>{bookingFinalCta.eyebrow}</span>
          <h2 className={styles.finalTitle}>{bookingFinalCta.title}</h2>
          <p className={styles.finalBody}>{bookingFinalCta.body}</p>
          <div className={styles.heroActions}>
            <Link
              className={styles.btnPrimary}
              href={bookingFinalCta.primary.href}
              data-cta="zakazivanje-kraj-primarni"
            >
              {bookingFinalCta.primary.label}
            </Link>
            <Link
              className={styles.btnGhost}
              href={bookingFinalCta.secondary.href}
              data-cta="zakazivanje-kraj-sekundarni"
            >
              {bookingFinalCta.secondary.label}
            </Link>
          </div>
          <p className={styles.reassure}>{bookingFinalCta.reassure}</p>
        </section>

        <p className={styles.related}>
          Dalje:{" "}
          {bookingRelated.map((link, i) => (
            <span key={link.href}>
              {i > 0 && " · "}
              <Link className={styles.inlineLink} href={link.href}>
                {link.label}
              </Link>
            </span>
          ))}
        </p>
      </div>
    </PageShellV4>
  );
}
