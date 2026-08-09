"use client";

import type { ServiceCatalogEntry } from "@/data/serviceCatalog";
import type { ServiceItem } from "@/content/site/types";
import { PageShellV4 } from "./PageShellV4";
import styles from "./ServiceDetailV4.module.css";

type ServiceDetailV4Props = {
  service: ServiceItem;
  catalog: ServiceCatalogEntry;
};

function splitKeywordList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 6);
}

export function ServiceDetailV4({ service, catalog }: ServiceDetailV4Props) {
  const tags = splitKeywordList(catalog.keywordSr);
  const pageTitle = catalog.h1Sr ?? service.title;

  return (
    <PageShellV4
      eyebrow="Usluga / Adspire Digital"
      title={
        <>
          {pageTitle.toUpperCase()}
          <span className={styles.dot}>.</span>
        </>
      }
      intro={service.summary}
    >
      <section className={styles.overview} data-reveal>
        <div className={styles.copy}>
          <span className={styles.label}>Šta rešavamo</span>
          <p>{catalog.aiSummarySr}</p>
        </div>
        <aside className={styles.panel}>
          <span className={styles.panelLabel}>Fokus</span>
          <div className={styles.tags}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
          {/* The brief, with this service already ticked — a price needs the
              scope, and the contact form does not ask for it. */}
          <a
            className={styles.panelButton}
            href={`/upit/${service.slug}`}
            data-cursor="on"
            data-magnetic
          >
            Zatraži ponudu
          </a>
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

      {catalog.bestFor && catalog.deliverables ? (
        <section className={styles.details} data-reveal>
          <div className={styles.detailCard}>
            <h2>Za koga ima smisla</h2>
            <ul>{catalog.bestFor.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className={styles.detailCard}>
            <h2>Šta dobijate</h2>
            <ul>{catalog.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </section>
      ) : null}

      {catalog.proof?.length ? (
        <section className={styles.proof} data-reveal>
          <span className={styles.label}>Dokazi iz produkcije</span>
          <h2>Relevantni projekti</h2>
          <div className={styles.proofGrid}>
            {catalog.proof.map((item) => (
              <a key={item.href} href={item.href} className={styles.proofCard} data-cursor="on">
                <strong>{item.title}</strong>
                <span>{item.result}</span>
                <small>Pogledaj studiju slučaja →</small>
              </a>
            ))}
          </div>
        </section>
      ) : null}

      <section className={styles.faq} data-reveal>
        <h2>Najčešća pitanja</h2>
        {catalog.faqItems.map((item, index) => (
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
        <h2>Da li je ovo prava usluga za vas?</h2>
        <p>Pošaljite nam cilj i trenutni problem. Vraćamo konkretan plan, rok i prvi prototip.</p>
        <a href={`/upit/${service.slug}`} data-cursor="on" data-magnetic>
          Pošalji upit
        </a>
      </section>
    </PageShellV4>
  );
}
