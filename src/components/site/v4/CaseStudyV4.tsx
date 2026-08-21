"use client";

import type { ProjectCaseStudy } from "@/data/projectCaseStudies";
import { PageShellV4 } from "./PageShellV4";
import { StickyCtaV4 } from "./StickyCtaV4";
import styles from "./CaseStudyV4.module.css";

type CaseStudyContent = {
  heroTitle: string;
  heroSubtitle: string;
  intro: string;
  features: { title: string; items: string[] }[];
  salesBlocks: { title: string; text: string }[];
  clientGets: string;
  forWhom: string[];
  ctaTitle: string;
  ctaText: string;
};

type CaseStudyV4Props = {
  project: ProjectCaseStudy;
  content: CaseStudyContent;
};

export function CaseStudyV4({ project, content }: CaseStudyV4Props) {
  const stackChips = project.stack.split(/[,·]/).map((s) => s.trim()).filter(Boolean);
  const gallery = [project.image, ...(project.extraImages ?? [])];

  return (
    <PageShellV4
      eyebrow={`Case study / ${project.category}`}
      title={content.heroTitle}
      intro={content.heroSubtitle}
    >
      <StickyCtaV4
        title="Želiš sličan sistem za svoj posao?"
        ctaLabel="Opiši svoj slučaj"
        trackingLabel={`sticky:case:${project.slug}`}
      />
      {/* Meta bar */}
      <section className={styles.meta} data-reveal>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Klijent</span>
          <span className={styles.metaValue}>{project.shortTitle}</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Kategorija</span>
          <span className={styles.metaValue}>{project.category}</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Live</span>
          <a
            className={styles.metaLink}
            href={project.website}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="on"
          >
            {project.website.replace(/^https?:\/\//, "")} ↗
          </a>
        </div>
      </section>

      {/* Hero image */}
      <section className={styles.shot} data-reveal>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.shotImg} src={project.image} alt={project.title} />
      </section>

      {/* Overview */}
      <section className={styles.overview} data-reveal>
        <span className={styles.blockEyebrow}>Pregled</span>
        <p className={styles.overviewText}>{content.intro}</p>
        <div className={styles.stackChips}>
          {stackChips.map((s) => (
            <span key={s} className={styles.chip}>
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* Sales blocks — what the system does */}
      {content.salesBlocks.length > 0 ? (
        <section className={styles.section} data-reveal>
          <h2 className={styles.sectionTitle}>Šta sistem radi</h2>
          <div className={styles.salesGrid}>
            {content.salesBlocks.map((b, i) => (
              <div key={b.title} className={styles.salesCard}>
                <span className={styles.salesNum}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.salesTitle}>{b.title}</h3>
                <p className={styles.salesText}>{b.text}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Feature groups */}
      {content.features.length > 0 ? (
        <section className={styles.section} data-reveal>
          <h2 className={styles.sectionTitle}>Funkcionalnosti</h2>
          <div className={styles.featureGrid}>
            {content.features.map((f) => (
              <div key={f.title} className={styles.featureCard}>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <ul className={styles.featureList}>
                  {f.items.map((it, k) => (
                    <li key={k}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Extra gallery */}
      {gallery.length > 1 ? (
        <section className={styles.gallery} data-reveal>
          {gallery.slice(1).map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} className={styles.galleryImg} src={src} alt={`${project.title} — ${i + 2}`} />
          ))}
        </section>
      ) : null}

      {/* Client gets + for whom */}
      {content.clientGets || content.forWhom.length > 0 ? (
        <section className={styles.outcome} data-reveal>
          {content.clientGets ? (
            <div className={styles.outcomeMain}>
              <span className={styles.blockEyebrow}>Šta klijent dobija</span>
              <p className={styles.outcomeText}>{content.clientGets}</p>
            </div>
          ) : null}
          {content.forWhom.length > 0 ? (
            <div className={styles.forWhom}>
              <span className={styles.blockEyebrow}>Za koga je rešenje</span>
              <ul className={styles.forWhomList}>
                {content.forWhom.slice(0, 7).map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      ) : null}

      {/* CTA */}
      <section className={styles.cta} data-reveal>
        <h2 className={styles.ctaTitle}>{content.ctaTitle || "Želiš sličan sistem?"}</h2>
        {content.ctaText ? <p className={styles.ctaText}>{content.ctaText}</p> : null}
        <div className={styles.ctaActions}>
          <a className={styles.ctaButton} href="/upit" data-cta="case-study-upit" data-cursor="on" data-magnetic>
            Zakaži besplatan poziv →
          </a>
          <a className={styles.ctaGhost} href="/our-projects" data-cursor="on">
            Svi projekti
          </a>
        </div>
      </section>
    </PageShellV4>
  );
}
