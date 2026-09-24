"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { getV4Copy } from "../v4/copy";
import { getNavMenu } from "../v4/navMenu";
import { AiDemoV4 } from "../v4/AiDemoV4";
import { ClientLogosV4 } from "../v4/ClientLogosV4";
import { HotelPromo } from "../v4/HotelPromo";
import { TechCarouselV4 } from "../v4/TechCarouselV4";
import styles from "./LandingV2.module.css";

const Sculpture = dynamic(() => import("./Sculpture"), { ssr: false });
const projects = [
  { name: "Dr Igić Clinic", image: "drigic-mobileview.webp", slug: "dr-igic-web-aplikacija-za-estetske-klinike", type: "Estetska klinika", year: "2025" },
  { name: "Prevoz Kop", image: "prevozkop-desktop.webp", slug: "prevozkop-digitalni-prodajni-operativni-sistem", type: "Transport / logistika", year: "2025" },
  { name: "Santos & Santorini", image: "santos-desktop.webp", slug: "santos-santorini-web-shop-admin-platforma", type: "E-commerce", year: "2024" },
  { name: "TeachFromHome", image: "teachfromhome-desktop.webp", slug: "teachfromhome-onboarding-sistem-za-remote-nastavnike", type: "EdTech", year: "2024" },
  { name: "Doctor Barber", image: "doctorbarber.webp", slug: "doctor-barber-online-booking-sistem", type: "Online zakazivanje", year: "2024" },
  { name: "Dropz Tattoo", image: "dropz-desktop.webp", slug: "dropz-tattoo-sajt-i-sistem-zakazivanja", type: "Tattoo studio", year: "2025" },
];
const servicePaths = ["web-prezentacije", "e-commerce-web-shop", "mobilne-aplikacije", "cms-sistemi", "ai-integracije-automatizacija", "seo-digitalni-marketing", "cyber-security-gdpr", "interaktivne-web-tehnologije"];
const valuePaths = ["web-prezentacije", "interne-poslovne-aplikacije", "e-commerce-web-shop"];

export function LandingV2() {
  const root = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState(false);
  const [paused, setPaused] = useState(false);
  const t = getV4Copy("sr");

  useEffect(() => {
    const old = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#05070c";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPaused(reduced.matches);
    update();
    reduced.addEventListener("change", update);
    return () => { document.body.style.backgroundColor = old; reduced.removeEventListener("change", update); };
  }, []);

  useEffect(() => {
    if (!menu) return;
    const close = (e: KeyboardEvent) => { if (e.key === "Escape") { setMenu(false); root.current?.querySelector<HTMLButtonElement>("[data-menu-toggle]")?.focus(); } };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menu]);

  return (
    <div ref={root} className={styles.root} data-standalone-page="v4" data-motion={paused ? "still" : "live"}>
      <a className={styles.skip} href="#sadrzaj">Preskoči na sadržaj</a>
      <Sculpture rootRef={root} paused={paused} />
      <header className={styles.nav}>
        <a href="/" className={styles.logo} aria-label="Adspire — početna">ADSPIRE<span>.</span></a>
        <nav className={styles.desktopNav} aria-label="Glavna navigacija">
          <a href="#radovi">Radovi</a><a href="#usluge">Usluge</a><a href="#proces">Proces</a><a href="/edukacija">AI edukacija</a>
        </nav>
        <div className={styles.navActions}>
          <a href="/upit/brzo" className={styles.navCta}>Pošalji upit <span aria-hidden="true">↗</span></a>
          <button data-menu-toggle className={styles.menuToggle} aria-expanded={menu} aria-controls="landingv2-menu" aria-label={menu ? "Zatvori meni" : "Otvori meni"} onClick={() => setMenu(!menu)}>{menu ? "×" : "☰"}</button>
        </div>
        {menu && <nav id="landingv2-menu" className={styles.mobileNav} aria-label="Mobilna navigacija">
          {[["Radovi", "#radovi"], ["Usluge", "#usluge"], ["Proces", "#proces"], ["AI edukacija", "/edukacija"], ["Kontakt", "#kontakt"]].map(([label, href]) => <a key={href} href={href} onClick={() => setMenu(false)}>{label}<span aria-hidden="true">↗</span></a>)}
        </nav>}
      </header>

      <main id="sadrzaj">
        <section className={styles.hero} data-hero>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span className={styles.statusDot} /> {t.hero.badge}</p>
            <h1>NIKO NE PAMTI<br /><span className={styles.outline}>PROSEČAN</span><br />SAJT<span className={styles.blue}>.</span></h1>
            <p className={styles.heroSub}>{t.hero.sub}</p>
            <div className={styles.actions}><a href="/upit/brzo" className={styles.primary} data-cta="v2-hero-inquiry">{t.hero.ctaPrimary}<span aria-hidden="true">↗</span></a><a href="#radovi" className={styles.textLink}>Pogledaj radove <span aria-hidden="true">↓</span></a></div>
          </div>
          <div className={styles.heroArt} data-sculpture-slot="hero" aria-hidden="true"><span className={styles.artIndex}>01 / IDEJA</span><span className={styles.artCaption}>SVE POČINJE JEDNOM IDEJOM.</span></div>
          <div className={styles.heroBottom}><div className={styles.trust}>{t.hero.trust.map(item => <span key={item}>{item}</span>)}</div><a href="#prica" className={styles.scrollHint}>Otkrij priču <span aria-hidden="true">↓</span></a></div>
        </section>

        <section className={styles.story} id="prica" data-story>
          <div className={styles.storySticky}>
            <div className={styles.storyHeading}><p className={styles.eyebrow}>OD IDEJE DO PROIZVODA</p><h2>Dobar utisak.<br /><span className={styles.muted}>Stvaran rezultat.</span></h2><p>Tvoj posao zaslužuje više od lepog sajta.</p></div>
            <div className={styles.storyArt} data-sculpture-slot="story">
              <a href={`/our-projects/${projects[0].slug}`} className={styles.storyScreen} data-story-screen aria-label="Pogledaj projekat Dr Igić Clinic">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/case-studies/drigic-mobileview.webp" alt="Dr Igić — sajt i sistem zakazivanja" loading="eager" />
                <span className={styles.screenBar}><span>drigic.rs</span><span>Pogledaj projekat ↗</span></span>
              </a>
            </div>
            <div className={styles.storySteps} aria-label="Od ideje do proizvoda"><span data-story-step="0">01 <b>Ideja</b></span><i /><span data-story-step="1">02 <b>Oblik</b></span><i /><span data-story-step="2">03 <b>Proizvod</b></span></div>
            <a href="#radovi" className={styles.skipStory}>Pređi na radove ↓</a>
          </div>
        </section>

        <div className={styles.content}>
          <ClientLogosV4 locale="sr" />
          <section className={styles.value} aria-label="Šta ti treba?">{t.value.items.map((v, i) => <a key={v.title} href={`/our-services/${valuePaths[i]}`}><span className={styles.eyebrow}>0{i + 1}</span><h3>{v.title}<span aria-hidden="true">↗</span></h3><p>{v.desc}</p></a>)}</section>

          <section className={styles.work} id="radovi">
            <div className={styles.sectionHead}><div><p className={styles.eyebrow}>RADOVI / 01—06</p><h2>Ideje koje<br /><span className={styles.muted}>sada rade.</span></h2></div><a href="/our-projects" className={styles.textLink}>Svi projekti ↗</a></div>
            <div className={styles.projectGrid}>{projects.map((p, i) => <article key={p.slug} className={styles.project}>
              <a className={styles.projectImage} href={`/our-projects/${p.slug}`} aria-label={`Pogledaj ${p.name}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/images/case-studies/${p.image}`} alt={p.name} loading="lazy" width={1000} height={650} /><span className={styles.projectArrow} aria-hidden="true">↗</span>
              </a>
              <div className={styles.projectMeta}><span>{p.type}</span><span>{p.year} / 0{i + 1}</span></div>
              <h3><a href={`/our-projects/${p.slug}`}>{p.name}</a></h3><p>{t.projects.items[i].summary}</p>
            </article>)}</div>
          </section>

          <section className={styles.services} id="usluge"><div className={styles.sectionHead}><div><p className={styles.eyebrow}>{t.services.eyebrow}</p><h2>Tvoj sledeći<br /><span className={styles.muted}>korak.</span></h2></div><p>Od prvog sajta do sistema<br />koji pokreće ceo posao.</p></div>
            {t.services.items.map((s, i) => <a className={styles.service} href={`/our-services/${servicePaths[i]}`} key={s.title}><span className={styles.serviceNum}>0{i + 1}</span><h3>{s.title}</h3><p>{s.desc}</p><span className={styles.serviceArrow} aria-hidden="true">↗</span></a>)}
          </section>

          <section className={styles.ai}><div className={styles.sectionHead}><div><p className={styles.eyebrow}>{t.aiDemo.eyebrow}</p><h2>Manje rutine.<br /><span className={styles.muted}>Više vremena.</span></h2></div><p>{t.aiDemo.note}</p></div><AiDemoV4 locale="sr" /><div className={styles.center}><a className={styles.textLink} href="/upit/brzo?usluga=ai-integracije-automatizacija">{t.actions.ai} ↗</a></div></section>

          <section className={styles.process} id="proces"><div className={styles.sectionHead}><div><p className={styles.eyebrow}>KAKO RADIMO</p><h2>Jasan proces.<br /><span className={styles.muted}>Bez nagađanja.</span></h2></div></div><div className={styles.processGrid}>{t.process.items.map((p, i) => <div key={p.title}><span className={styles.eyebrow}>0{i + 1} /</span><h3>{p.title}</h3><p>{p.desc}</p></div>)}</div><a className={styles.textLink} href="/upit/brzo">{t.actions.process} ↗</a></section>
          <section className={styles.stack} aria-label="Tehnologije"><p className={styles.eyebrow}>ALATI KOJE VOZIMO</p><TechCarouselV4 /></section>
          <HotelPromo locale="sr" />
          <section className={styles.faq}><div><p className={styles.eyebrow}>{t.faq.eyebrow}</p><h2>Dobro<br />pitanje.</h2></div><div>{t.faq.items.map(item => <details key={item.q}><summary>{item.q}<span aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}<a className={styles.textLink} href="/upit/brzo">{t.actions.faq} ↗</a></div></section>
        </div>

        <section className={styles.finale} id="kontakt" data-finale>
          <div className={styles.finaleArt} data-sculpture-slot="finale" aria-hidden="true"><span className={styles.artIndex}>03 / TVOJ SLEDEĆI KORAK</span></div>
          <div className={styles.finaleCopy}><p className={styles.eyebrow}>PRVI KORAK, BEZ OBAVEZE</p><h2>Hajde da<br />napravimo<br /><span className={styles.blue}>nešto veliko.</span></h2><a href="/upit/brzo" className={styles.primary} data-cta="v2-final-inquiry">Opiši šta ti treba <span aria-hidden="true">↗</span></a><p>{t.cta.note}</p><div className={styles.contactLinks}><a href="tel:+381601491491">+381 60 149 149 1</a><a href="https://wa.me/381601491491" target="_blank" rel="noreferrer">WhatsApp ↗</a></div></div>
        </section>
      </main>
      <footer className={styles.footer}><div className={styles.footerTop}><a href="/" className={styles.logo}>ADSPIRE<span>.</span></a><p>{getNavMenu("sr").footer.blurb}</p><a href="mailto:djordje@adspire.rs">djordje@adspire.rs ↗</a></div><div className={styles.footerBottom}><span>© {new Date().getFullYear()} Adspire · Niš</span><div><a href="/politika-privatnosti">Privatnost</a><a href="/politika-kolacica">Kolačići</a><a href="/uslovi-koriscenja">Uslovi</a></div><button onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? "Pokreni animaciju" : "Pauziraj animaciju"}</button></div></footer>
    </div>
  );
}
