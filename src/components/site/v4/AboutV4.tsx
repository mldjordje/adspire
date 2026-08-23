"use client";

import { PageShellV4 } from "./PageShellV4";
import { getAboutCopy } from "./aboutCopy";
import styles from "./AboutV4.module.css";
import { defaultLocale, localePath, type LocaleCode } from "@/lib/site-config";

/**
 * About page — story, principles, founder, metrics. Positioning: development
 * partner from Nis whose job is making clients money and saving them time.
 *
 * Copy lives in aboutCopy so /en and /de serve their own language.
 */

const STACK = [
  "Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Supabase",
  "Three.js / WebGL", "React Native", "n8n", "Claude / GPT", "Stripe", "Vercel",
];

/** Splits a story paragraph on the {em} marker so one word can be bolded. */
function StoryParagraph({ text, emphasis }: { text: string; emphasis: string }) {
  const [before, after] = text.split("{em}");
  if (after === undefined) return <p>{text}</p>;
  return (
    <p>
      {before}
      <strong>{emphasis}</strong>
      {after}
    </p>
  );
}

export function AboutV4({ locale = defaultLocale }: { locale?: LocaleCode }) {
  const t = getAboutCopy(locale);

  return (
    <PageShellV4
      locale={locale}
      eyebrow={t.eyebrow}
      title={
        <>
          {t.title[0]}
          <br />
          {t.title[1]}<span className={styles.dot}>.</span>
        </>
      }
      intro={t.intro}
    >
      {/* Story */}
      <section className={styles.story} data-reveal>
        <div className={styles.storyGrid}>
          <div className={styles.storyText}>
            {t.story.map((paragraph) => (
              <StoryParagraph key={paragraph} text={paragraph} emphasis={t.storyEmphasis} />
            ))}
          </div>
          <div className={styles.metrics}>
            {t.metrics.map((m) => (
              <div key={m.label} className={styles.metric}>
                <span className={styles.metricNum}>{m.num}</span>
                <span className={styles.metricLabel}>{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className={styles.principles} data-reveal>
        <h2 className={styles.sectionTitle}>{t.principlesTitle}</h2>
        <div className={styles.principlesGrid}>
          {t.principles.map((p) => (
            <div key={p.num} className={styles.principle}>
              <span className={styles.principleNum}>{p.num}</span>
              <h3 className={styles.principleTitle}>{p.title}</h3>
              <p className={styles.principleDesc}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founder — name and contact are identity, never translated */}
      <section className={styles.founder} data-reveal>
        <div className={styles.founderCard}>
          <div className={styles.founderAvatar} aria-hidden="true">
            ĐM
          </div>
          <div className={styles.founderBody}>
            <span className={styles.founderRole}>{t.founderRole}</span>
            <h3 className={styles.founderName}>Đorđe Mladenović</h3>
            <p className={styles.founderBio}>{t.founderBio}</p>
            <div className={styles.founderLinks}>
              <a href="mailto:djordje@adspire.rs" data-cursor="on">djordje@adspire.rs</a>
              <a href="tel:+381601491491" data-cursor="on">+381 60 149 149 1</a>
            </div>
          </div>
        </div>
      </section>

      {/* Stack marquee */}
      <section className={styles.stack} data-reveal>
        <h2 className={styles.sectionTitle}>{t.stackTitle}</h2>
        <div className={styles.stackTags}>
          {STACK.map((s) => (
            <span key={s} className={styles.stackTag}>
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta} data-reveal>
        <h2 className={styles.ctaTitle}>{t.ctaTitle}</h2>
        <a
          className={styles.ctaButton}
          href={localePath("/contact-us", locale)}
          data-cta="about-kontakt"
          data-cursor="on"
          data-magnetic
        >
          {t.ctaButton}
        </a>
      </section>
    </PageShellV4>
  );
}
