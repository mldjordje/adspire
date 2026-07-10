"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import styles from "./HomeV2.module.css";

/* ---- shared motion presets ---- */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const viewport = { once: true, margin: "-80px" } as const;

/* ---- data ---- */
const SERVICES = [
  { icon: "🌐", name: "Web sajtovi", desc: "Brz, moderan sajt koji posetioca vodi pravo ka upitu — Next.js, SEO, jasan CTA tok." },
  { icon: "🛒", name: "Web shop", desc: "E-commerce sa katalogom, plaćanjem i administracijom — prodaja i porudžbine u jednom toku." },
  { icon: "📱", name: "Mobilne aplikacije", desc: "PWA i native (iOS/Android) — booking, loyalty, push i offline za korisnike i timove." },
  { icon: "📅", name: "Booking sistemi", desc: "Online termini 24/7, klijentski portal i admin kalendar — manje poziva, više rezervacija." },
  { icon: "🤖", name: "AI automatizacija", desc: "LLM agenti, chatbotovi i n8n tokovi koji skidaju ručni rad sa prodaje, podrške i operative." },
  { icon: "📈", name: "SEO & marketing", desc: "Tehnički SEO, Google/Meta kampanje i merljiva metrika — vidljivost koja donosi upite." },
];

const WORK = [
  {
    img: "/images/case-studies/drigic-mobileview.webp",
    cat: "Estetska klinika · Booking",
    name: "Dr Igić Clinic",
    outcome: "Javni sajt, online zakazivanje, Beauty Pass zona i admin kalendar — marketing i operativa u jednom sistemu.",
    href: "/our-projects/dr-igic-web-aplikacija-za-estetske-klinike",
  },
  {
    img: "/images/case-studies/doctorbarber.webp",
    cat: "Barber studio · Booking",
    name: "Doctor Barber",
    outcome: "Booking aplikacija sa online terminima, klijentskim nalogom i admin kalendarom — raspored radi 24/7.",
    href: "/our-projects/doctor-barber-online-booking-sistem",
  },
  {
    img: "/images/case-studies/prevozkop-desktop.webp",
    cat: "Transport · SEO + operativa",
    name: "Prevoz Kop",
    outcome: "SEO sajt, katalog i interni admin za leadove, ponude i vozila — upiti ulaze pravo u prodajni tok.",
    href: "/our-projects/prevozkop-digitalni-prodajni-operativni-sistem",
  },
  {
    img: "/images/case-studies/santos-desktop.webp",
    cat: "Modni brend · E-commerce",
    name: "Santos & Santorini",
    outcome: "Web shop i admin platforma — katalog, checkout, lager i marketplace tokovi iz jednog mesta.",
    href: "/our-projects/santos-santorini-web-shop-admin-platforma",
  },
];

const STEPS = [
  { n: "01", t: "Discovery", d: "Krećemo od cilja i konteksta — gde se gubi novac i koji upit ti zaista treba." },
  { n: "02", t: "Dizajn + prototip", d: "Mobile-first UI/UX i prototip za 48h — vidiš pravac pre nego što se piše ozbiljan kod." },
  { n: "03", t: "Development", d: "Next.js, čist kod, SEO i performanse u prvi sprint — ne kao naknadni dodatak." },
  { n: "04", t: "Lansiranje + rast", d: "Analitika, konverzije i optimizacija posle go-live — sistem koji raste s biznisom." },
];

const MARQUEE = ["Next.js", "React", "TypeScript", "Booking", "E-commerce", "AI agenti", "SEO", "PWA", "Three.js", "Automatizacija"];

export function HomeV2() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <main className={styles.root}>
      {/* ===================== HERO ===================== */}
      <section className={styles.hero} ref={heroRef}>
        <div className={`${styles.heroOrb} ${styles.heroOrbA}`} aria-hidden />
        <div className={`${styles.heroOrb} ${styles.heroOrbB}`} aria-hidden />
        <div className={styles.heroGrid} aria-hidden />

        <motion.div className={`${styles.wrap} ${styles.heroInner}`} style={{ y: heroTextY, opacity: heroOpacity }}>
          <motion.span className={styles.heroBadge} variants={fadeUp} initial="hidden" animate="show" custom={0}>
            <span className={styles.heroBadgeDot} /> Web agencija iz Niša · dostupni za nove projekte
          </motion.span>

          <motion.h1 className={`${styles.display} ${styles.heroTitle}`} variants={fadeUp} initial="hidden" animate="show" custom={1}>
            Sajtovi i aplikacije koje <em>donose klijente.</em>
          </motion.h1>

          <motion.p className={styles.heroSub} variants={fadeUp} initial="hidden" animate="show" custom={2}>
            Adspire Digital gradi brze, moderne web sisteme i booking aplikacije za biznise u Nišu i celoj Srbiji — sa fokusom na upite, rezervacije i prodaju.
          </motion.p>

          <motion.div className={styles.heroActions} variants={fadeUp} initial="hidden" animate="show" custom={3}>
            <a className={styles.btnPrimary} href="/contact-us">Pokreni projekat →</a>
            <a className={styles.btnGhost} href="/our-projects">Pogledaj radove</a>
          </motion.div>

          <motion.div className={styles.heroTrust} variants={fadeUp} initial="hidden" animate="show" custom={4}>
            <div className={styles.heroTrustItem}>
              <span className={styles.heroTrustNum}>5+</span>
              <span className={styles.heroTrustLabel}>live produkcijskih sistema</span>
            </div>
            <div className={styles.heroTrustItem}>
              <span className={styles.heroTrustNum}>100</span>
              <span className={styles.heroTrustLabel}>Core Web Vitals score</span>
            </div>
            <div className={styles.heroTrustItem}>
              <span className={styles.heroTrustNum}>48h</span>
              <span className={styles.heroTrustLabel}>do prvog prototipa</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ===================== MARQUEE ===================== */}
      <div className={styles.marquee} aria-hidden>
        <div className={styles.marqueeTrack}>
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className={styles.marqueeItem}>{m}</span>
          ))}
        </div>
      </div>

      {/* ===================== SERVICES ===================== */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <motion.div className={styles.sectionHead} variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
            <span className={styles.eyebrow}>Usluge</span>
            <h2 className={`${styles.display} ${styles.sectionTitle}`}>Sve što tvom biznisu treba — jedan tim</h2>
            <p className={styles.sectionLead}>Od sajta i web shopa do booking sistema, mobilnih aplikacija i AI automatizacije. Bez prebacivanja odgovornosti između firmi.</p>
          </motion.div>

          <div className={styles.servicesGrid}>
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.name}
                className={styles.serviceCard}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                custom={i}
              >
                <div className={styles.serviceIcon}>{s.icon}</div>
                <h3 className={styles.serviceName}>{s.name}</h3>
                <p className={styles.serviceDesc}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== WORK ===================== */}
      <section className={styles.section} style={{ background: "var(--bg-soft)" }}>
        <div className={styles.wrap}>
          <motion.div className={styles.sectionHead} variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
            <span className={styles.eyebrow}>Odabrani radovi</span>
            <h2 className={`${styles.display} ${styles.sectionTitle}`}>Sistemi koji su završili u stvarnoj upotrebi</h2>
            <p className={styles.sectionLead}>Ne samo lepi ekrani — sajtovi i aplikacije koje rade za prodaju, rezervacije i operativu.</p>
          </motion.div>

          <div className={styles.workList}>
            {WORK.map((w, i) => (
              <motion.a
                key={w.name}
                className={styles.workCard}
                href={w.href}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                custom={i % 2}
              >
                <div className={styles.workShot}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={w.img} alt={w.name} loading="lazy" />
                </div>
                <div className={styles.workBody}>
                  <span className={styles.workCat}>{w.cat}</span>
                  <h3 className={styles.workName}>{w.name}</h3>
                  <p className={styles.workOutcome}>{w.outcome}</p>
                  <span className={styles.workLink}>Pogledaj projekat <span>→</span></span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PROCESS ===================== */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <motion.div className={styles.sectionHead} variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
            <span className={styles.eyebrow}>Kako radimo</span>
            <h2 className={`${styles.display} ${styles.sectionTitle}`}>Jasan proces, bez iznenađenja</h2>
          </motion.div>
          <div className={styles.steps}>
            {STEPS.map((s, i) => (
              <motion.div key={s.n} className={styles.step} variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} custom={i % 2}>
                <span className={styles.stepNum}>{s.n}</span>
                <div>
                  <h3 className={styles.stepTitle}>{s.t}</h3>
                  <p className={styles.stepDesc}>{s.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <motion.section className={styles.cta} variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
        <div className={styles.ctaGlow} aria-hidden />
        <span className={styles.eyebrow}>Sledeći korak</span>
        <h2 className={`${styles.display} ${styles.ctaTitle}`}>Imaš ideju? Pretvorimo je u sistem.</h2>
        <p className={styles.ctaSub}>Zakaži 30-minutni discovery poziv — bez obaveza. Vraćamo ti konkretan plan i procenu, ne prazan pitch.</p>
        <div className={styles.ctaActions}>
          <a className={styles.btnPrimary} href="/contact-us">Zakaži razgovor →</a>
          <a className={styles.btnGhost} href="tel:+381601491491">+381 60 149 149 1</a>
        </div>
      </motion.section>

      {/* ===================== FOOTER mini ===================== */}
      <footer className={styles.footerMini}>
        <div className={styles.wrap}>
          <div className={styles.footerContacts}>
            <a href="mailto:djordje@adspire.rs">djordje@adspire.rs</a>
            <a href="tel:+381601491491">+381 60 149 149 1</a>
          </div>
          <p>Adspire Digital · Dimitrija Leka 66, Niš · Web, aplikacije, AI</p>
        </div>
      </footer>
    </main>
  );
}
