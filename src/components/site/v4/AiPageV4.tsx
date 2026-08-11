"use client";

import Link from "next/link";
import { PageShellV4 } from "./PageShellV4";
import { getAiPageUi } from "./aiPageCopy";
import type { AiPage } from "@/content/site/aiPages";
import { aiPagePath, getAiPages } from "@/content/site/aiPages";
import { defaultLocale, localePath, type LocaleCode } from "@/lib/site-config";
import guide from "./GuideV4.module.css";
import styles from "./AiPageV4.module.css";

function sectionId(index: number) {
  return `ai-section-${index}`;
}

type Props = { page: AiPage; locale?: LocaleCode };

/** Renders one industry page from the aiPages set on the OBSIDIAN chrome. */
export function AiPageV4({ page, locale = defaultLocale }: Props) {
  const ui = getAiPageUi(locale);
  const others = getAiPages(locale).filter((item) => item.slug !== page.slug);
  const href = (path: string) => localePath(path, locale);

  return (
    <PageShellV4 eyebrow={page.eyebrow} title={page.h1} intro={page.lead} locale={locale}>
      <div className={guide.body} data-reveal>
        {/* First block under the H1 — this is what gets quoted. */}
        <p className={styles.answer} data-answer>
          {page.answer}
        </p>

        <section aria-labelledby="ai-tasks">
          <h2 id="ai-tasks" className={guide.h2}>
            {ui.tasksHeading}
          </h2>
          <div className={styles.taskGrid}>
            {page.tasks.map((task) => (
              <article key={task.name} className={styles.task}>
                <h3 className={styles.taskName}>{task.name}</h3>
                <p className={styles.taskLine}>
                  <span className={styles.taskLabel}>{ui.labelProblem}</span>
                  <span className={styles.taskProblem}>{task.problem}</span>
                </p>
                <p className={styles.taskLine}>
                  <span className={styles.taskLabel}>{ui.labelSolution}</span>
                  <span className={styles.taskSolution}>{task.solution}</span>
                </p>
                <p className={styles.taskLine}>
                  <span className={styles.taskLabel}>{ui.labelDelivery}</span>
                  <span className={styles.taskDelivery}>{task.delivery}</span>
                </p>
              </article>
            ))}
          </div>
        </section>

        {page.sections.map((section, index) => (
          <section key={section.heading} aria-labelledby={sectionId(index)}>
            <h2 id={sectionId(index)} className={guide.h2}>
              {section.heading}
            </h2>
            {section.body?.map((paragraph) => (
              <p key={paragraph} className={guide.text}>
                {paragraph}
              </p>
            ))}
            {section.bullets && (
              <ul className={guide.list}>
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <section aria-labelledby="ai-howto">
          <h2 id="ai-howto" className={guide.h2}>
            {page.howTo.name}
          </h2>
          <ol className={styles.steps}>
            {page.howTo.steps.map((step, index) => (
              <li key={step.name} className={styles.step} id={`korak-${index + 1}`}>
                <span className={styles.stepIndex}>0{index + 1}</span>
                <div>
                  <h3 className={styles.stepName}>{step.name}</h3>
                  <p className={styles.stepText}>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {page.proof && page.proof.length > 0 && (
          <section aria-labelledby="ai-proof">
            <h2 id="ai-proof" className={guide.h2}>
              {page.proofHeading}
            </h2>
            <div className={guide.proofGrid}>
              {page.proof.map((item) => (
                <div key={item.href} className={guide.proofRow}>
                  <Link className={guide.proofLabel} href={href(item.href)}>
                    {item.label}
                  </Link>
                  <p className={guide.proofNote}>{item.note}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section aria-labelledby="ai-faq">
          <h2 id="ai-faq" className={guide.h2}>
            {ui.faqHeading(page.industry)}
          </h2>
          <div className={guide.faqList}>
            {page.faq.map((item) => (
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
          {ui.relatedServices}{" "}
          {page.relatedServices.map((service, i) => (
            <span key={service.href}>
              {i > 0 && " · "}
              <Link className={guide.inlineLink} href={href(service.href)}>
                {service.label}
              </Link>
            </span>
          ))}
        </p>

        <p className={guide.related}>
          {ui.otherIndustries}{" "}
          {others.map((item, i) => (
            <span key={item.slug}>
              {i > 0 && " · "}
              <Link className={guide.inlineLink} href={href(aiPagePath(item.slug))}>
                {item.industry}
              </Link>
            </span>
          ))}
        </p>
      </div>
    </PageShellV4>
  );
}
