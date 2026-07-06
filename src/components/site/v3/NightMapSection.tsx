"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HomeV3.module.css";

const NIS = { x: 330, y: 320 };
const CITIES = [
  { name: "Beograd", x: 290, y: 150, label: true },
  { name: "Novi Sad", x: 255, y: 105, label: true },
  { name: "Subotica", x: 240, y: 55, label: false },
  { name: "Zrenjanin", x: 330, y: 135, label: false },
  { name: "Kragujevac", x: 300, y: 235, label: true },
  { name: "Čačak", x: 235, y: 275, label: false },
  { name: "Kraljevo", x: 285, y: 288, label: false },
  { name: "Užice", x: 185, y: 315, label: false },
  { name: "Zaječar", x: 425, y: 270, label: false },
  { name: "Leskovac", x: 350, y: 378, label: false },
  { name: "Vranje", x: 372, y: 438, label: false },
];

export function NightMapSection() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className={styles.nightmap} aria-label="Domet — Niš i Srbija">
      <div className={styles.wrap}>
        <div className={styles.nmGrid}>
          <div className={styles.nmCopy}>
            <span className={styles.eyebrow}>/ Night Map · Domet</span>
            <h2 className={`${styles.display} ${styles.nmTitle}`}>Palimo Niš.<br />Pa celu Srbiju.</h2>
            <p className={styles.nmLead}>
              Krećemo lokalno — da kad neko u Nišu pita Google ili AI „ko da mi napravi sajt", odgovor budeš ti. Odatle se varnica širi: Beograd, Novi Sad, cela Srbija i region.
            </p>
            <ul className={styles.nmPoints}>
              <li>Lokalni SEO + Google Business za dominaciju u Nišu</li>
              <li>Struktura i llms.txt da te AI sistemi preporuče</li>
              <li>Skaliranje kampanje na nacionalni nivo</li>
            </ul>
          </div>

          <div className={`${styles.nmMapWrap} ${inView ? styles.nmInView : ""}`}>
            <svg viewBox="0 0 600 480" className={styles.nmSvg} role="img" aria-label="Mapa Srbije — Niš kao ishodište">
              <text x="470" y="70" className={styles.nmRegionLabel}>SRBIJA</text>

              {CITIES.map((c, i) => (
                <line
                  key={`l-${c.name}`}
                  className={styles.nmLine}
                  x1={NIS.x}
                  y1={NIS.y}
                  x2={c.x}
                  y2={c.y}
                  pathLength={1}
                  style={{ animationDelay: `${0.5 + i * 0.13}s` }}
                />
              ))}

              {CITIES.map((c, i) => (
                <g key={`c-${c.name}`}>
                  <circle
                    className={styles.nmCity}
                    cx={c.x}
                    cy={c.y}
                    r={4}
                    style={{ animationDelay: `${0.9 + i * 0.13}s` }}
                  />
                  {c.label && (
                    <text
                      className={styles.nmCityLabel}
                      x={c.x + 9}
                      y={c.y + 4}
                      style={{ animationDelay: `${1.0 + i * 0.13}s` }}
                    >
                      {c.name}
                    </text>
                  )}
                </g>
              ))}

              <circle className={styles.nmNisGlow} cx={NIS.x} cy={NIS.y} r={20} />
              <circle className={styles.nmNisCore} cx={NIS.x} cy={NIS.y} r={6} />
              <text className={styles.nmNisLabel} x={NIS.x + 14} y={NIS.y + 5}>Niš</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
