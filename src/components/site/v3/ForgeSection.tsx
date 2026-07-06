"use client";

import { useRef, type PointerEvent } from "react";
import styles from "./HomeV3.module.css";

const SERVICES = [
  { n: "01", name: "Web sajtovi", desc: "Brz, moderan sajt koji posetioca vodi pravo ka upitu — Next.js, SEO, jasan CTA tok.", href: "/our-services/web-prezentacije" },
  { n: "02", name: "Web shop", desc: "E-commerce sa katalogom, plaćanjem i administracijom — prodaja i porudžbine u jednom toku.", href: "/our-services/e-commerce-web-shop" },
  { n: "03", name: "Mobilne aplikacije", desc: "PWA i native (iOS/Android) — booking, loyalty, push i offline za korisnike i timove.", href: "/our-services/mobilne-aplikacije" },
  { n: "04", name: "AI automatizacija", desc: "LLM agenti, chatbotovi i n8n tokovi koji skidaju ručni rad sa prodaje, podrške i operative.", href: "/our-services/ai-integracije-automatizacija" },
  { n: "05", name: "SEO & marketing", desc: "Tehnički SEO, Google/Meta kampanje i merljiva metrika — vidljivost koja donosi upite.", href: "/our-services/seo-digitalni-marketing" },
  { n: "06", name: "AI preporuka", desc: "Pripremamo tvoj digitalni trag tako da te AI sistemi predlažu kao relevantan izbor.", href: "/our-services/ai-preporuka" },
];

export function ForgeSection() {
  const spawnSparks = (e: PointerEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    for (let i = 0; i < 16; i++) {
      const s = document.createElement("span");
      s.className = styles.spark;
      const ang = Math.random() * Math.PI * 2;
      const dist = 30 + Math.random() * 70;
      s.style.left = `${x}px`;
      s.style.top = `${y}px`;
      s.style.setProperty("--tx", `${Math.cos(ang) * dist}px`);
      s.style.setProperty("--ty", `${Math.sin(ang) * dist - 20}px`);
      card.appendChild(s);
      s.addEventListener("animationend", () => s.remove());
    }
  };

  return (
    <section className={styles.forge} aria-label="Usluge">
      <div className={styles.wrap}>
        <div className={styles.forgeHead}>
          <span className={styles.eyebrow}>/ The Forge · Usluge</span>
          <h2 className={`${styles.display} ${styles.forgeTitle}`}>Ovde se kuje tvoj sistem</h2>
          <p className={styles.forgeLead}>
            Svaka usluga je posebno iskovana za tvoj cilj — bez generičkih šablona. Pređi mišem preko ingota da ga zagreješ, klikni da varnice polete.
          </p>
        </div>

        <div className={styles.ingotGrid}>
          {SERVICES.map((s) => (
            <a key={s.n} href={s.href} className={styles.ingot} onPointerDown={spawnSparks}>
              <span className={styles.ingotHeat} aria-hidden="true" />
              <span className={styles.ingotNum}>{s.n}</span>
              <h3 className={styles.ingotName}>{s.name}</h3>
              <p className={styles.ingotDesc}>{s.desc}</p>
              <span className={styles.ingotLink}>kuj <span>→</span></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
