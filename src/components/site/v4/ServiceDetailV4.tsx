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

  return (
    <PageShellV4
      eyebrow="Usluga / Adspire Digital"
      title={
        <>
          {service.title.toUpperCase()}
          <span className={styles.dot}>.</span>
        </>
      }
      intro={service.summary}
    >
      <section className={styles.overview} data-reveal>
        <div className={styles.copy}>
          <span className={styles.label}>Sta resavamo</span>
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
          <a className={styles.panelButton} href="/contact-us" data-cursor="on" data-magnetic>
            Zatrazi predlog
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

      <section className={styles.faq} data-reveal>
        <h2>Najcesca pitanja</h2>
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
        <p>Posaljite nam cilj i trenutni problem. Vracamo konkretan plan, rok i prvi prototip.</p>
        <a href="/contact-us" data-cursor="on" data-magnetic>
          Zakazi besplatan poziv
        </a>
      </section>
    </PageShellV4>
  );
}
