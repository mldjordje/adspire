"use client";

import { PageShellV4 } from "./PageShellV4";
import styles from "./AboutV4.module.css";

/**
 * About page — story, principles, founder, metrics. Positioning: development
 * partner from Niš whose job is making clients money and saving them time.
 */

const METRICS = [
  { num: "5+", label: "Produkcijskih sistema, live" },
  { num: "48h", label: "Od brifa do prototipa" },
  { num: "100", label: "Lighthouse — Core Web Vitals" },
  { num: "3", label: "Jezika — SR · EN · DE" },
];

const PRINCIPLES = [
  {
    num: "01",
    title: "Rezultat, ne dekor",
    desc: "Sajt bez upita je trošak. Merimo uspeh brojem klijenata i ušteđenih sati, ne lepotom.",
  },
  {
    num: "02",
    title: "Jedan tim, ceo put",
    desc: "Od strategije preko dizajna do koda i održavanja — bez prebacivanja odgovornosti i bez podizvođača.",
  },
  {
    num: "03",
    title: "Bez šablona",
    desc: "Svaki sistem gradimo za konkretan biznis. Nema kupljenih tema ni copy-paste rešenja.",
  },
  {
    num: "04",
    title: "Transparentno",
    desc: "Prototip pre ugovora, nedeljni demo, jasna cena. Uvek znate gde je projekat i šta plaćate.",
  },
];

const STACK = [
  "Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Supabase",
  "Three.js / WebGL", "React Native", "n8n", "Claude / GPT", "Stripe", "Vercel",
];

export function AboutV4() {
  return (
    <PageShellV4
      eyebrow="O nama / Ko smo"
      title={
        <>
          RAZVOJNI PARTNER
          <br />
          IZ NIŠA<span className={styles.dot}>.</span>
        </>
      }
      intro="Adspire Digital je studio za web, aplikacije i AI automatizaciju. Naš posao je jednostavan: da vam donesemo više klijenata i vratimo sate koje danas trošite na ručni rad."
    >
      {/* Story */}
      <section className={styles.story} data-reveal>
        <div className={styles.storyGrid}>
          <div className={styles.storyText}>
            <p>
              Počeli smo sa jednim uverenjem: većina firmi ne treba još jedan lep sajt — treba im
              sistem koji <strong>radi</strong>. Koji dovodi upite dok spavaju, koji im skida
              papirologiju s vrata, koji prodaje bez dodatnog zaposlenog.
            </p>
            <p>
              Zato ne pravimo brošure. Pravimo digitalne proizvode — sajtove koji konvertuju,
              interne aplikacije koje vlasnicima i menadžerima vraćaju vreme, i AI sisteme koji
              automatizuju ono što se ponavlja.
            </p>
            <p>
              Baza nam je Niš, ali radimo sa klijentima iz cele Srbije, regiona i Nemačke — na
              srpskom, engleskom i nemačkom.
            </p>
          </div>
          <div className={styles.metrics}>
            {METRICS.map((m) => (
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
        <h2 className={styles.sectionTitle}>Kako razmišljamo</h2>
        <div className={styles.principlesGrid}>
          {PRINCIPLES.map((p) => (
            <div key={p.num} className={styles.principle}>
              <span className={styles.principleNum}>{p.num}</span>
              <h3 className={styles.principleTitle}>{p.title}</h3>
              <p className={styles.principleDesc}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founder */}
      <section className={styles.founder} data-reveal>
        <div className={styles.founderCard}>
          <div className={styles.founderAvatar} aria-hidden="true">
            ĐM
          </div>
          <div className={styles.founderBody}>
            <span className={styles.founderRole}>Osnivač i tehnički direktor</span>
            <h3 className={styles.founderName}>Đorđe Milovanović</h3>
            <p className={styles.founderBio}>
              Vodim Adspire od strategije do produkcije. Pišem kod, projektujem sisteme i sedim na
              pozivima sa klijentima — jer verujem da najbolji proizvod nastaje kada ista osoba
              razume i biznis i tehnologiju.
            </p>
            <div className={styles.founderLinks}>
              <a href="mailto:djordje@adspire.rs" data-cursor="on">djordje@adspire.rs</a>
              <a href="tel:+381601491491" data-cursor="on">+381 60 149 149 1</a>
            </div>
          </div>
        </div>
      </section>

      {/* Stack marquee */}
      <section className={styles.stack} data-reveal>
        <h2 className={styles.sectionTitle}>Stack koji nosi produkciju</h2>
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
        <h2 className={styles.ctaTitle}>Hajde da napravimo nešto veliko.</h2>
        <a className={styles.ctaButton} href="/contact-us" data-cursor="on" data-magnetic>
          Zakaži besplatan poziv →
        </a>
      </section>
    </PageShellV4>
  );
}
