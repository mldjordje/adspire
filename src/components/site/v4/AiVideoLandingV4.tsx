"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { PageShellV4 } from "./PageShellV4";
import { QuickInquiryV4 } from "./QuickInquiryV4";
import styles from "./EducationLandingV4.module.css";
import {
  AI_VIDEO_SERVICE_SLUG,
  aiVideoAudience,
  aiVideoDeliverables,
  aiVideoFaq,
  aiVideoFinalCta,
  aiVideoForm,
  aiVideoFormats,
  aiVideoHero,
  aiVideoNav,
  aiVideoPricing,
  aiVideoProcess,
  aiVideoQuickCopy,
} from "@/content/site/aiVideoPage";
import type { InquiryService } from "@/lib/inquiries/catalog";

/**
 * /ai-video-za-vas-biznis — done-for-you short video.
 *
 * Deliberately built on the education landing's stylesheet rather than its own:
 * the two pages are siblings in the same offer family, and a second copy of
 * four hundred lines of CSS is how they start drifting apart. The form is the
 * quick brief with the service locked and a budget field, so this lead lands in
 * the same /os queue as every other upit.
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

const NAV_IDS = aiVideoNav.map((item) => item.id);

export function AiVideoLandingV4({ services }: { services: InquiryService[] }) {
  const active = useActiveSection(NAV_IDS);

  return (
    <PageShellV4
      finale={
        <section className={styles.final}>
          <div className={styles.finalVeil} aria-hidden="true" />
          <span className={styles.eyebrow}>{aiVideoFinalCta.eyebrow}</span>
          <h2 className={styles.finalTitle}>{aiVideoFinalCta.title}</h2>
          <p className={styles.finalBody}>{aiVideoFinalCta.body}</p>
          <div className={styles.actions}>
            <a className={styles.btnPrimary} href={aiVideoFinalCta.primary.href} data-cta="ai-video-kraj-upit" data-horizon-feed>
              {aiVideoFinalCta.primary.label}
            </a>
            <Link className={styles.btnGhost} href={aiVideoFinalCta.secondary.href} data-cta="ai-video-kraj-edukacija">
              {aiVideoFinalCta.secondary.label}
            </Link>
          </div>
        </section>
      }
      eyebrow={aiVideoHero.eyebrow}
      title={aiVideoHero.title}
      intro={aiVideoHero.lead}
      navCtaHref="#upit"
      navCtaLabel="Pošalji upit"
      heroExtra={
        <div className={styles.heroExtra}>
          <div className={styles.actions}>
            <a className={styles.btnPrimary} href={aiVideoHero.primary.href} data-cta="ai-video-hero-upit">
              {aiVideoHero.primary.label}
            </a>
            <a className={styles.btnGhost} href={aiVideoHero.secondary.href} data-cta="ai-video-hero-kako">
              {aiVideoHero.secondary.label}
            </a>
          </div>
          <Link
            className={styles.accountLink}
            href={aiVideoHero.education.href}
            data-cta="ai-video-hero-edukacija"
          >
            {aiVideoHero.education.label} <span aria-hidden="true">→</span>
          </Link>
          <dl className={styles.facts}>
            {aiVideoHero.facts.map((fact) => (
              <div key={fact.label} className={styles.fact}>
                <dt className={styles.factValue}>{fact.value}</dt>
                <dd className={styles.factLabel}>{fact.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      }
    >
      <nav className={styles.toc} aria-label="Sadržaj stranice">
        <ul className={styles.tocList}>
          {aiVideoNav.map((item) => (
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
          <SectionHead eyebrow={aiVideoAudience.eyebrow} title={aiVideoAudience.title} />
          <div className={styles.audience}>
            {aiVideoAudience.items.map((item) => (
              <article key={item.title} className={styles.audienceCard}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardBody}>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ─── What you get ─── */}
        <section id="sta-dobijas" className={styles.section} data-reveal>
          <SectionHead {...aiVideoDeliverables} />
          <ul className={styles.ticks}>
            {aiVideoDeliverables.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>

        {/* ─── Formats ─── */}
        <section id="formati" className={styles.section} data-reveal>
          <SectionHead {...aiVideoFormats} />
          <ol className={styles.tracks}>
            {aiVideoFormats.tracks.map((track, i) => (
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

        {/* ─── Process ─── */}
        <section id="kako" className={styles.section} data-reveal>
          <SectionHead eyebrow={aiVideoProcess.eyebrow} title={aiVideoProcess.title} />
          <ol className={styles.timeline}>
            {aiVideoProcess.steps.map((step) => (
              <li key={step.title} className={styles.step}>
                <span className={styles.stepWhen}>{step.when}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ─── Price ─── */}
        <section id="cena" className={styles.section} data-reveal>
          <SectionHead {...aiVideoPricing} />
          <ul className={styles.ticks}>
            {aiVideoPricing.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>

        {/* ─── FAQ ─── */}
        <section id="pitanja" className={styles.section} data-reveal>
          <SectionHead eyebrow={aiVideoFaq.eyebrow} title={aiVideoFaq.title} />
          <div className={styles.faq}>
            {aiVideoFaq.items.map((item, i) => (
              <details key={item.q} className={styles.faqItem} open={i === 0}>
                <summary className={styles.faqQ}>
                  <span>{item.q}</span>
                  <span className={styles.faqMark} aria-hidden="true" />
                </summary>
                <p className={styles.faqA}>
                  {item.a}
                  {"link" in item && item.link ? (
                    <>
                      {" "}
                      <a className={styles.inlineLink} href={item.link.href} data-cta="ai-video-faq-edukacija">
                        {item.link.label}
                      </a>
                    </>
                  ) : null}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ─── The brief ─── */}
        <section id="upit" className={styles.section} data-reveal>
          <SectionHead {...aiVideoForm} />
          <QuickInquiryV4
            services={services}
            initialSlug={AI_VIDEO_SERVICE_SLUG}
            lockService
            askBudget
            formName="ai-video-upit"
            copyOverride={aiVideoQuickCopy}
          />
        </section>
      </div>
    </PageShellV4>
  );
}
