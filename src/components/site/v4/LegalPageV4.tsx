"use client";

import { PageShellV4 } from "./PageShellV4";
import styles from "./LegalPageV4.module.css";

export type LegalSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

type LegalPageV4Props = {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
};

export function LegalPageV4({ title, intro, updated, sections }: LegalPageV4Props) {
  return (
    <PageShellV4
      eyebrow="Pravne informacije / Adspire Digital"
      title={title}
      intro={intro}
    >
      <article className={styles.article}>
        <p className={styles.updated}>Poslednje ažuriranje: {updated}</p>
        {sections.map((section) => (
          <section key={section.title} className={styles.section}>
            <h2>{section.title}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.items ? (
              <ul>
                {section.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            ) : null}
          </section>
        ))}
        <p className={styles.contact}>
          Pitanja pošaljite na <a href="mailto:djordje@adspire.rs">djordje@adspire.rs</a>.
        </p>
      </article>
    </PageShellV4>
  );
}
