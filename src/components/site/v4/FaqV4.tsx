"use client";

import { PageShellV4 } from "./PageShellV4";
import { FAQ_ITEMS } from "./faqData";
import styles from "./FaqV4.module.css";

export function FaqV4() {
  return (
    <PageShellV4
      eyebrow="FAQ / Najcesca pitanja"
      title={
        <>
          PITANJA PRE
          <br />
          PRVOG POZIVA<span className={styles.dot}>.</span>
        </>
      }
      intro="Kratki odgovori o ceni, rokovima, procesu, AI automatizaciji i tome sta dobijate posle lansiranja."
    >
      <section className={styles.faq} data-reveal>
        {FAQ_ITEMS.map((item, index) => (
          <details key={item.q} className={styles.item} open={index === 0}>
            <summary className={styles.question}>
              <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
              <span>{item.q}</span>
              <span className={styles.plus} aria-hidden="true">
                +
              </span>
            </summary>
            <p className={styles.answer}>{item.a}</p>
          </details>
        ))}
      </section>

      <section className={styles.cta} data-reveal>
        <div>
          <span className={styles.ctaLabel}>Nema odgovora koji trazite?</span>
          <h2 className={styles.ctaTitle}>Posaljite kratak opis projekta.</h2>
        </div>
        <a className={styles.ctaButton} href="/contact-us" data-cta="faq-kontakt" data-cursor="on" data-magnetic>
          Kontaktiraj nas
        </a>
      </section>
    </PageShellV4>
  );
}
