"use client";

import type { ServiceCatalogEntry } from "@/data/serviceCatalog";
import type { ServiceItem } from "@/content/site/types";
import { PageShellV4 } from "./PageShellV4";
import styles from "./ServiceDetailV4.module.css";
import {
  getServiceDetailChrome,
  getServiceDetailTranslation,
} from "@/content/site/serviceDetail.i18n";
import { defaultLocale, localePath, type LocaleCode } from "@/lib/site-config";

/**
 * Service detail page.
 *
 * Serbian reads straight from serviceCatalog, which is also the source for the
 * JSON-LD and llms.txt. en/de read from serviceDetail.i18n and fall back to the
 * Serbian entry for anything not translated yet — a missing translation should
 * degrade to the wrong language, never to an empty section.
 */

type ServiceDetailV4Props = {
  service: ServiceItem;
  catalog: ServiceCatalogEntry;
  locale?: LocaleCode;
};

function splitKeywordList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 6);
}

export function ServiceDetailV4({ service, catalog, locale = defaultLocale }: ServiceDetailV4Props) {
  const chrome = getServiceDetailChrome(locale);
  const t = getServiceDetailTranslation(catalog.slug, locale);

  const pageTitle = t?.h1 ?? catalog.h1Sr ?? service.title;
  const intro = t?.intro ?? service.summary;
  const overview = t?.overview ?? catalog.aiSummarySr;
  const tags = t?.tags ?? splitKeywordList(catalog.keywordSr);
  const bestFor = t?.bestFor ?? catalog.bestFor;
  const deliverables = t?.deliverables ?? catalog.deliverables;
  const faqItems = t?.faq ?? catalog.faqItems;

  // The brief is a Serbian-only flow, so en/de go to the contact page instead.
  const quoteHref =
    locale === defaultLocale ? `/upit/${service.slug}` : localePath("/contact-us", locale);

  return (
    <PageShellV4
      locale={locale}
      eyebrow={chrome.eyebrow}
      title={
        <>
          {pageTitle.toUpperCase()}
          <span className={styles.dot}>.</span>
        </>
      }
      intro={intro}
    >
      <section className={styles.overview} data-reveal>
        <div className={styles.copy}>
          <span className={styles.label}>{chrome.overviewLabel}</span>
          <p>{overview}</p>
        </div>
        <aside className={styles.panel}>
          <span className={styles.panelLabel}>{chrome.focusLabel}</span>
          <div className={styles.tags}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
          {/* The brief, with this service already ticked — a price needs the
              scope, and the contact form does not ask for it. */}
          <a className={styles.panelButton} href={quoteHref} data-cursor="on" data-magnetic>
            {chrome.quoteCta}
          </a>
          {/* The deep dive is a Serbian-only landing page for now. */}
          {catalog.deepDive && locale === defaultLocale ? (
            <a className={styles.panelLink} href={catalog.deepDive.href} data-cursor="on">
              {catalog.deepDive.label} →
            </a>
          ) : null}
        </aside>
      </section>

      <section className={styles.bullets} data-reveal>
        {service.bullets.map((bullet, index) => (
          <div key={bullet} className={styles.bullet}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{bullet}</p>
          </div>
        ))}
      </section>

      {bestFor && deliverables ? (
        <section className={styles.details} data-reveal>
          <div className={styles.detailCard}>
            <h2>{chrome.bestForTitle}</h2>
            <ul>{bestFor.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className={styles.detailCard}>
            <h2>{chrome.deliverablesTitle}</h2>
            <ul>{deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </section>
      ) : null}

      {catalog.proof?.length ? (
        <section className={styles.proof} data-reveal>
          <span className={styles.label}>{chrome.proofLabel}</span>
          <h2>{chrome.proofTitle}</h2>
          <div className={styles.proofGrid}>
            {catalog.proof.map((item) => (
              <a
                key={item.href}
                href={localePath(item.href, locale)}
                className={styles.proofCard}
                data-cursor="on"
              >
                <strong>{item.title}</strong>
                <span>{t?.proofResults?.[item.title] ?? item.result}</span>
                <small>{chrome.proofLink}</small>
              </a>
            ))}
          </div>
        </section>
      ) : null}

      <section className={styles.faq} data-reveal>
        <h2>{chrome.faqTitle}</h2>
        {faqItems.map((item, index) => (
          <details key={item.q} className={styles.faqItem} open={index === 0}>
            <summary>
              <span>{item.q}</span>
              <span aria-hidden="true">+</span>
            </summary>
            <p>{item.a}</p>
          </details>
        ))}
      </section>

      <section className={styles.cta} data-reveal>
        <h2>{chrome.ctaTitle}</h2>
        <p>{chrome.ctaText}</p>
        <a href={quoteHref} data-cursor="on" data-magnetic>
          {chrome.ctaButton}
        </a>
      </section>
    </PageShellV4>
  );
}
