"use client";

import { PageShellV4 } from "./PageShellV4";
import styles from "./ServicesV4.module.css";

/**
 * Full services page — every catalog service grouped by outcome, plus the
 * "how we work" strip and a closing CTA. Copy stays outcome-led:
 * more leads, more time, more revenue.
 */

type Service = {
  slug: string;
  title: string;
  desc: string;
  tags: string[];
};

const GROUPS: { label: string; blurb: string; services: Service[] }[] = [
  {
    label: "Web i prodaja",
    blurb: "Digitalni izlog koji dovodi upite, ne samo posetioce.",
    services: [
      {
        slug: "web-prezentacije",
        title: "Web sajtovi i prezentacije",
        desc: "Brzi Next.js sajtovi sa SEO, PWA i CMS-om. Posetilac za par sekundi zna šta nudite i klikne dalje.",
        tags: ["Next.js", "SEO", "CMS", "PWA"],
      },
      {
        slug: "e-commerce-web-shop",
        title: "E-commerce i web shop",
        desc: "Custom i headless prodavnice — plaćanja, lager, pretplate i CRM u jednom sistemu koji prodaje.",
        tags: ["Web shop", "Plaćanja", "Lager"],
      },
      {
        slug: "seo-digitalni-marketing",
        title: "SEO i digitalni marketing",
        desc: "Vidljivost na Google i AI pretragama, merljive kampanje i sadržaj koji donosi kvalifikovane upite.",
        tags: ["SEO", "Ads", "Analitika"],
      },
    ],
  },
  {
    label: "Aplikacije i sistemi",
    blurb: "Alati koji vlasnicima i timovima vraćaju sate rada svake nedelje.",
    services: [
      {
        slug: "sistemi-za-zakazivanje",
        title: "Sistemi za zakazivanje",
        desc: "Online zakazivanje 24/7 za klinike, salone, frizere i servise — podsetnici seku nedolaske, kalendar se puni dok spavate.",
        tags: ["Booking", "Podsetnici", "Kalendar"],
      },
      {
        slug: "interne-poslovne-aplikacije",
        title: "Interne poslovne aplikacije",
        desc: "Zakazivanje, izveštaji, evidencija, fakture — sve što danas radite ručno kroz Excel i telefon, automatizovano.",
        tags: ["Interni sistem", "Dashboard", "Automatizacija"],
      },
      {
        slug: "mobilne-aplikacije",
        title: "Mobilne aplikacije",
        desc: "iOS, Android i PWA aplikacije za korisnike i timove — jedan kod, sve platforme.",
        tags: ["iOS", "Android", "PWA"],
      },
      {
        slug: "cms-sistemi",
        title: "CMS sistemi",
        desc: "Menjajte sadržaj, cene i blogove sami, bez programera i bez čekanja.",
        tags: ["Headless CMS", "Admin"],
      },
      {
        slug: "saas-razvoj",
        title: "SaaS razvoj",
        desc: "Od MVP-a do skalabilnog SaaS proizvoda — pretplate, multi-tenant, billing i analitika.",
        tags: ["SaaS", "Multi-tenant", "Billing"],
      },
    ],
  },
  {
    label: "AI i automatizacija",
    blurb: "Sistemi koji prodaju i odgovaraju dok vi spavate.",
    services: [
      {
        slug: "ai-integracije-automatizacija",
        title: "AI integracije i automatizacija",
        desc: "AI agenti za zakazivanje, podršku i kvalifikaciju leadova. n8n i LLM automatizacija procesa 24/7.",
        tags: ["AI agenti", "n8n", "LLM"],
      },
      {
        slug: "business-intelligence-analitika",
        title: "Business intelligence i analitika",
        desc: "Podaci iz svih sistema na jednom mestu — dashboardi koji pokazuju gde se zarađuje i gde curi novac.",
        tags: ["BI", "Dashboard", "Podaci"],
      },
      {
        slug: "interaktivne-web-tehnologije",
        title: "Interaktivne web tehnologije",
        desc: "WebGL, 3D scene i scroll animacije — prezentacija koja se pamti i deli.",
        tags: ["WebGL", "Three.js", "Motion"],
      },
    ],
  },
  {
    label: "Infrastruktura i sigurnost",
    blurb: "Temelj koji radi bez pauze i štiti vaše podatke.",
    services: [
      {
        slug: "hosting-infrastruktura",
        title: "Hosting i infrastruktura",
        desc: "Cloud hosting, CI/CD, monitoring i skaliranje — sistem koji radi 24/7 bez brige.",
        tags: ["Cloud", "CI/CD", "Monitoring"],
      },
      {
        slug: "cyber-security-gdpr",
        title: "Cyber security i GDPR",
        desc: "Security audit, zaštita podataka i GDPR usklađenost — sigurnost bez kompromisa.",
        tags: ["Audit", "GDPR", "Security"],
      },
      {
        slug: "industrijska-resenja",
        title: "Industrijska rešenja",
        desc: "Rešenja skrojena za specifične branše — od zdravstva do logistike i proizvodnje.",
        tags: ["Custom", "Integracije"],
      },
    ],
  },
];

const PROCESS = [
  { num: "01", title: "Besplatan poziv", desc: "30 minuta. Razumemo biznis i gde curi novac ili vreme." },
  { num: "02", title: "Prototip za 48h", desc: "Klikabilan prototip pre ugovora. Vidite tačno šta plaćate." },
  { num: "03", title: "Sprint · MVP 2 nedelje", desc: "Nedeljni demo, transparentan napredak, bez iznenađenja." },
  { num: "04", title: "Launch i rast", desc: "Merenje, iteracije, AI automatizacija — sistem koji raste." },
];

export function ServicesV4() {
  return (
    <PageShellV4
      eyebrow="Usluge / Šta radimo"
      title={
        <>
          SVE ZA VAŠ
          <br />
          DIGITALNI RAST<span className={styles.dot}>.</span>
        </>
      }
      intro="Sajtovi koji dovode klijente, aplikacije koje štede vreme, AI koji radi umesto vas. Jedan tim od ideje do produkcije — bez šablona, bez agencijske magle."
    >
      {GROUPS.map((group) => (
        <section key={group.label} className={styles.group} data-reveal>
          <div className={styles.groupHead}>
            <h2 className={styles.groupLabel}>{group.label}</h2>
            <p className={styles.groupBlurb}>{group.blurb}</p>
          </div>
          <div className={styles.grid}>
            {group.services.map((s) => (
              <a
                key={s.slug}
                className={styles.card}
                href={`/our-services/${s.slug}`}
                data-cursor="otvori"
              >
                <div className={styles.cardTop}>
                  <h3 className={styles.cardTitle}>{s.title}</h3>
                  <span className={styles.cardArrow}>↗</span>
                </div>
                <p className={styles.cardDesc}>{s.desc}</p>
                <div className={styles.cardTags}>
                  {s.tags.map((t) => (
                    <span key={t} className={styles.tag}>
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>
      ))}

      <section className={styles.process} data-reveal>
        <h2 className={styles.processTitle}>Kako radimo</h2>
        <div className={styles.processGrid}>
          {PROCESS.map((p) => (
            <div key={p.num} className={styles.processStep}>
              <span className={styles.processNum}>{p.num}</span>
              <h3 className={styles.processStepTitle}>{p.title}</h3>
              <p className={styles.processDesc}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cta} data-reveal>
        <h2 className={styles.ctaTitle}>Ne znate odakle da počnete?</h2>
        <p className={styles.ctaText}>
          Zakažite besplatan poziv. Kažemo vam tačno šta bi vam donelo najviše — pre nego što
          potrošite dinar.
        </p>
        <a className={styles.ctaButton} href="/upit" data-cta="usluge-upit" data-cursor="on" data-magnetic>
          Zakaži besplatan poziv →
        </a>
      </section>
    </PageShellV4>
  );
}
