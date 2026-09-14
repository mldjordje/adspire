"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { AuroraV4 } from "./AuroraV4";
import { EventHorizonV4 } from "./EventHorizonV4";
import { PageShellV4 } from "./PageShellV4";
import { StickyCtaV4 } from "./StickyCtaV4";
import styles from "./EducationLandingV4.module.css";
import {
  educationAccount,
  educationAudience,
  educationFaq,
  educationFinalCta,
  educationHero,
  educationNav,
  educationPricing,
  educationProcess,
  educationProgram,
  educationSeo,
  educationTeacher,
} from "@/content/site/educationLandingPage";
import {
  EDU_PACKAGES,
  formatEur,
  PACKAGE_INQUIRY_HREF,
  pricePerHour,
} from "@/lib/education/packages";

/**
 * /edukacija — the page AI-account ads land on.
 *
 * Built on the same chrome as the booking landing (aurora background, sticky
 * in-page menu) and closes on the event-horizon shader from the home page, so
 * the ad lands inside the site's own visual world rather than on a form.
 */

function SectionHead({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <header className={styles.head}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h2 className={styles.h2}>{title}</h2>
      {lead ? <p className={styles.lead}>{lead}</p> : null}
    </header>
  );
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
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

const NAV_IDS = educationNav.map((item) => item.id);

// Static sample for the account preview: which days of a month read as open.
const MOCK_OPEN = new Set([3, 4, 7, 10, 11, 14, 17, 18, 21, 24, 25, 28]);

/** A drawn picture of /nalog/edukacija — shows the buyer what they get before
 *  they have an account, without a screenshot that goes stale. */
function AccountMock() {
  return (
    <figure className={styles.mock} aria-hidden="true">
      <div className={styles.mockTop}>
        <div>
          <span className={styles.mockLabel}>Edukacija</span>
          <strong className={styles.mockValue}>8 sati</strong>
          <span className={styles.mockMeta}>na stanju</span>
        </div>
        <div className={styles.mockBar}>
          <span style={{ width: "80%" }} />
        </div>
      </div>
      <div className={styles.mockGrid}>
        {["P", "U", "S", "Č", "P", "S", "N"].map((d, i) => (
          <span key={`w${i}`} className={styles.mockWd}>
            {d}
          </span>
        ))}
        {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
          <span
            key={day}
            className={`${styles.mockDay} ${MOCK_OPEN.has(day) ? styles.mockOpen : ""} ${
              day === 11 ? styles.mockPicked : ""
            }`}
          >
            {day}
          </span>
        ))}
      </div>
      <div className={styles.mockChips}>
        <span>10:00</span>
        <span className={styles.mockChipOn}>11:00</span>
        <span>14:00</span>
        <span>17:00</span>
      </div>
      <span className={styles.mockButton}>Zakaži 2h</span>
      <figcaption className={styles.mockCaption}>{educationAccount.mockCaption}</figcaption>
    </figure>
  );
}

export function EducationLandingV4() {
  const active = useActiveSection(NAV_IDS);

  return (
    <PageShellV4
      eyebrow={educationHero.eyebrow}
      title={educationHero.title}
      intro={educationHero.lead}
      background={<AuroraV4 />}
      heroExtra={
        <div className={styles.heroExtra}>
          <div className={styles.actions}>
            <Link className={styles.btnPrimary} href={educationHero.primary.href} data-cta="edukacija-hero-primarni">
              {educationHero.primary.label}
            </Link>
            <a className={styles.btnGhost} href={educationHero.secondary.href} data-cta="edukacija-hero-program">
              {educationHero.secondary.label}
            </a>
          </div>
          <Link className={styles.accountLink} href={educationHero.account.href} data-cta="edukacija-hero-nalog">
            {educationHero.account.label} <span aria-hidden="true">→</span>
          </Link>
          <dl className={styles.facts}>
            {educationHero.facts.map((fact) => (
              <div key={fact.label} className={styles.fact}>
                <dt className={styles.factValue}>{fact.value}</dt>
                <dd className={styles.factLabel}>{fact.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      }
    >
      <StickyCtaV4
        ctaLabel={educationHero.primary.label}
        ctaHref={educationHero.primary.href}
        trackingLabel={`sticky:${educationSeo.path}`}
      />

      <nav className={styles.toc} aria-label="Sadržaj stranice">
        <ul className={styles.tocList}>
          {educationNav.map((item) => (
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
        {/* ─── Audience ─── */}
        <section id="za-koga" className={styles.section} data-reveal>
          <SectionHead eyebrow={educationAudience.eyebrow} title={educationAudience.title} />
          <div className={styles.audience}>
            {educationAudience.items.map((item) => (
              <article key={item.title} className={styles.audienceCard}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardBody}>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ─── Program ─── */}
        <section id="program" className={styles.section} data-reveal>
          <SectionHead {...educationProgram} />
          <ol className={styles.tracks}>
            {educationProgram.tracks.map((track, i) => (
              <li key={track.title} className={styles.track}>
                <span className={styles.trackNum}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.trackTitle}>{track.title}</h3>
                <ul className={styles.ticks}>
                  {track.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        {/* ─── Pricing ─── */}
        <section id="cene" className={styles.section} data-reveal>
          <SectionHead {...educationPricing} />
          <div className={styles.pricing}>
            {EDU_PACKAGES.map((pkg) => (
              <article
                key={pkg.id}
                className={`${styles.priceCard} ${pkg.featured ? styles.priceFeatured : ""}`}
              >
                <span className={styles.priceLabel}>{pkg.label}</span>
                <p className={styles.priceHours}>{pkg.hours} sati</p>
                <p className={styles.priceValue}>{formatEur(pkg.priceEur)}</p>
                <p className={styles.pricePer}>{formatEur(pricePerHour(pkg))} po satu</p>
                <p className={styles.cardBody}>{pkg.note}</p>
                <Link
                  className={pkg.featured ? styles.btnPrimary : styles.btnGhost}
                  href={PACKAGE_INQUIRY_HREF}
                  data-cta={`edukacija-paket-${pkg.id}`}
                >
                  {educationPricing.cta}
                </Link>
              </article>
            ))}
          </div>
          <ul className={styles.ticks}>
            {educationPricing.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {/* ─── Account / booking ─── */}
        <section id="nalog" className={styles.section} data-reveal>
          <div className={styles.split}>
            <div>
              <SectionHead {...educationAccount} />
              <ul className={styles.ticks}>
                {educationAccount.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <AccountMock />
          </div>
        </section>

        {/* ─── Process ─── */}
        <section id="tok" className={styles.section} data-reveal>
          <SectionHead eyebrow={educationProcess.eyebrow} title={educationProcess.title} />
          <ol className={styles.timeline}>
            {educationProcess.steps.map((step) => (
              <li key={step.title} className={styles.step}>
                <span className={styles.stepWhen}>{step.when}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ─── Teacher ─── */}
        <section id="ko-predaje" className={styles.section} data-reveal>
          <div className={styles.quote}>
            <span className={styles.eyebrow}>{educationTeacher.eyebrow}</span>
            <h2 className={styles.quoteTitle}>{educationTeacher.title}</h2>
            {educationTeacher.body.map((p) => (
              <p key={p} className={styles.quoteBody}>
                {p}
              </p>
            ))}
            <p className={styles.signature}>— {educationTeacher.signature}</p>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section id="pitanja" className={styles.section} data-reveal>
          <SectionHead eyebrow={educationFaq.eyebrow} title={educationFaq.title} />
          <div className={styles.faq}>
            {educationFaq.items.map((item, i) => (
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
      </div>

      {/* ─── Final CTA on the event horizon ─── */}
      <section className={styles.final}>
        <EventHorizonV4 />
        <div className={styles.finalVeil} aria-hidden="true" />
        <span className={styles.eyebrow}>{educationFinalCta.eyebrow}</span>
        <h2 className={styles.finalTitle}>{educationFinalCta.title}</h2>
        <p className={styles.finalBody}>{educationFinalCta.body}</p>
        <div className={styles.actions}>
          <Link className={styles.btnPrimary} href={educationFinalCta.primary.href} data-cta="edukacija-kraj-primarni">
            {educationFinalCta.primary.label}
          </Link>
          <Link className={styles.btnGhost} href={educationFinalCta.secondary.href} data-cta="edukacija-kraj-nalog">
            {educationFinalCta.secondary.label}
          </Link>
        </div>
      </section>
    </PageShellV4>
  );
}
