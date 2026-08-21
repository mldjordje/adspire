"use client";

import Link from "next/link";
import { PageShellV4 } from "./PageShellV4";
import { guides } from "@/content/site/guides";
import styles from "./GuideV4.module.css";

/**
 * Hub for every guide. Without it the guides hang off a single footer link and
 * sit four clicks deep; with it they are one click from anywhere and the hub
 * itself can answer the broader "vodič za izradu sajta" query.
 */
export function GuidesIndexV4() {
  return (
    <PageShellV4
      eyebrow="Vodiči"
      title="Odgovori pre nego što tražiš ponudu"
      intro="Pitanja koja se najčešće postavljaju pre nego što se krene u posao — cena, izbor tehnologije, izbor izvođača i to šta konkretan sistem treba da radi. Pisano da bude korisno i ako nas nikada ne pozoveš."
    >
      <div className={styles.body} data-reveal>
        <section aria-labelledby="guides-list">
          <h2 id="guides-list" className={styles.h2}>Svi vodiči</h2>
          <div className={styles.proofGrid}>
            <div className={styles.proofRow}>
              <Link className={styles.proofLabel} href="/cena-izrade-sajta">
                Koliko košta izrada sajta?
              </Link>
              <p className={styles.proofNote}>
                Rasponi po tipu projekta, šta diže i šta spušta cenu, i šta je uključeno u ponudu.
              </p>
            </div>
            {guides.map((guide) => (
              <div key={guide.path} className={styles.proofRow}>
                <Link className={styles.proofLabel} href={guide.path}>{guide.h1}</Link>
                <p className={styles.proofNote}>{guide.metaDescription}</p>
              </div>
            ))}
          </div>
        </section>

        <div className={styles.cta}>
          <Link className={styles.ctaPrimary} href="/upit" data-cta="vodici-upit">Pošalji opis posla</Link>
          <Link className={styles.ctaSecondary} href="/our-services">Pogledaj usluge</Link>
        </div>
      </div>
    </PageShellV4>
  );
}
