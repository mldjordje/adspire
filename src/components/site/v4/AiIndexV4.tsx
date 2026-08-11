"use client";

import Link from "next/link";
import { PageShellV4 } from "./PageShellV4";
import { getAiPageUi } from "./aiPageCopy";
import { aiPagePath, getAiIndex, getAiPages } from "@/content/site/aiPages";
import { defaultLocale, localePath, type LocaleCode } from "@/lib/site-config";
import guide from "./GuideV4.module.css";
import styles from "./AiPageV4.module.css";

function sectionId(index: number) {
  return `ai-index-section-${index}`;
}

/** Hub for the industry pages: the answer, the four shared jobs, then the list. */
export function AiIndexV4({ locale = defaultLocale }: { locale?: LocaleCode }) {
  const index = getAiIndex(locale);
  const pages = getAiPages(locale);
  const ui = getAiPageUi(locale);
  const href = (path: string) => localePath(path, locale);

  return (
    <PageShellV4 eyebrow={index.eyebrow} title={index.h1} intro={index.lead} locale={locale}>
      <div className={guide.body} data-reveal>
        <p className={styles.answer} data-answer>
          {index.answer}
        </p>

        {index.sections.map((section, i) => (
          <section key={section.heading} aria-labelledby={sectionId(i)}>
            <h2 id={sectionId(i)} className={guide.h2}>
              {section.heading}
            </h2>
            {section.bullets && (
              <ul className={guide.list}>
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {section.body?.map((paragraph) => (
              <p key={paragraph} className={guide.text} style={{ marginTop: 18 }}>
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        <section aria-labelledby="ai-industries">
          <h2 id="ai-industries" className={guide.h2}>
            {ui.chooseIndustryHeading}
          </h2>
          <div className={styles.industryGrid}>
            {pages.map((page) => (
              <Link
                key={page.slug}
                className={styles.industryRow}
                href={href(aiPagePath(page.slug))}
              >
                <span className={styles.industryName}>{page.industry}</span>
                <span className={styles.industryNote}>{page.lead}</span>
                <span className={styles.industryTasks}>
                  {page.tasks.map((task) => task.name).join(" · ")}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="ai-index-faq">
          <h2 id="ai-index-faq" className={guide.h2}>
            {ui.indexFaqHeading}
          </h2>
          <div className={guide.faqList}>
            {index.faq.map((item) => (
              <div key={item.q}>
                <h3 className={guide.faqQ}>{item.q}</h3>
                <p className={guide.text}>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className={guide.cta}>
          <Link className={guide.ctaPrimary} href={href("/upit")}>
            {ui.ctaPrimary}
          </Link>
          <Link className={guide.ctaSecondary} href={href("/contact-us")}>
            {ui.ctaSecondary}
          </Link>
        </div>

        <p className={guide.related}>
          {ui.related}{" "}
          <Link
            className={guide.inlineLink}
            href={href("/our-services/ai-integracije-automatizacija")}
          >
            {locale === "de"
              ? "KI-Integration und Automatisierung"
              : locale === "en"
                ? "AI integration and automation"
                : "AI integracije i automatizacija"}
          </Link>
          {" · "}
          <Link className={guide.inlineLink} href={href("/our-services")}>
            {locale === "de" ? "Alle Leistungen" : locale === "en" ? "All services" : "Sve usluge"}
          </Link>
          {" · "}
          <Link className={guide.inlineLink} href={href("/our-projects")}>
            {locale === "de" ? "Projekte" : locale === "en" ? "Case studies" : "Studije slučaja"}
          </Link>
        </p>
      </div>
    </PageShellV4>
  );
}
