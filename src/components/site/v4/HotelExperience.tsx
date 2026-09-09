"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { hotelCopy, HOTEL_PATH, HOTEL_SLUG } from "@/content/site/hotel";
import { localePath, type LocaleCode } from "@/lib/site-config";
import type { InquiryService } from "@/lib/inquiries/catalog";
import { PageShellV4 } from "./PageShellV4";
import { QuickInquiryV4 } from "./QuickInquiryV4";
import styles from "./HotelExperience.module.css";

export function HotelExperience({ locale, services }: { locale: LocaleCode; services: InquiryService[] }) {
  const t = hotelCopy[locale];
  const root = useRef<HTMLDivElement>(null);
  const [role, setRole] = useState(0);
  const [booked, setBooked] = useState(false);
  const [day, setDay] = useState(12);
  const [step, setStep] = useState(0);

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      if (disposed || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const ctx = gsap.context(() => {
          gsap.from("[data-hotel-title] span", { yPercent: 110, duration: 1.05, stagger: .12, ease: "power4.out" });
          gsap.from("[data-hotel-hero-art]", { y: 50, opacity: 0, duration: 1.2, delay: .25, ease: "power3.out" });
          gsap.to("[data-hotel-hero-art]", { y: -65, rotateZ: 2, ease: "none", scrollTrigger: { trigger: "[data-hotel-hero]", start: "top top", end: "bottom top", scrub: 1 } });
          root.current?.querySelectorAll<HTMLElement>("[data-hotel-reveal]").forEach(el => {
            gsap.from(el, { y: 40, opacity: 0, duration: .85, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 91%", once: true } });
          });
          gsap.to("[data-hotel-progress]", { scaleX: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: .3 } });
          const media = gsap.matchMedia();
          media.add("(min-width: 1000px)", () => {
            root.current?.querySelectorAll<HTMLElement>("[data-hotel-step]").forEach((el, index) => {
              ScrollTrigger.create({ trigger: el, start: "top 62%", end: "bottom 62%", onEnter: () => setStep(index), onEnterBack: () => setStep(index) });
            });
            gsap.fromTo("[data-story-screen]", { rotateY: -8, rotateX: 3 }, { rotateY: 0, rotateX: 0, ease: "none", scrollTrigger: { trigger: "#hotel-system", start: "top center", end: "bottom bottom", scrub: 1 } });
          });
          media.add("(hover: hover) and (pointer: fine)", () => {
            const art = root.current?.querySelector<HTMLElement>("[data-hotel-hero-art]");
            const frame = root.current?.querySelector<HTMLElement>("[data-hotel-hero]");
            if (!art || !frame) return;
            const xTo = gsap.quickTo(art, "rotationY", { duration: .8, ease: "power3.out" });
            const yTo = gsap.quickTo(art, "rotationX", { duration: .8, ease: "power3.out" });
            const move = (event: PointerEvent) => {
              const bounds = frame.getBoundingClientRect();
              xTo(((event.clientX - bounds.left) / bounds.width - .5) * 7);
              yTo(-((event.clientY - bounds.top) / bounds.height - .5) * 5);
            };
            const leave = () => { xTo(0); yTo(0); };
            frame.addEventListener("pointermove", move);
            frame.addEventListener("pointerleave", leave);
            return () => { frame.removeEventListener("pointermove", move); frame.removeEventListener("pointerleave", leave); };
          });
          gsap.to("[data-hotel-orbit]", { rotate: 70, ease: "none", scrollTrigger: { trigger: "[data-hotel-orbit]", start: "top bottom", end: "bottom top", scrub: 1 } });
          return () => media.revert();
        }, root);
        return () => ctx.revert();
      });
      cleanup = () => mm.revert();
    });
    return () => { disposed = true; cleanup?.(); };
  }, []);

  function selectStep(index: number) {
    setStep(index);
    if (window.matchMedia("(max-width: 999px)").matches) {
      root.current?.querySelector<HTMLElement>("[data-story-screen]")?.scrollIntoView({ block: "center", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    }
  }

  const calendar = (compact = false) => (
    <div className={`${styles.calendar} ${compact ? styles.compactCalendar : ""}`}>
      <div className={styles.windowBar}><span className={styles.statusDot} /><span>{t.ui.calendar}</span><span>10 / 2026</span></div>
      <div className={styles.calendarHead}><span>{t.ui.rooms}</span>{[12, 13, 14, 15, 16].map(d => <span key={d}>{d}</span>)}</div>
      {[101, 102, 103, 104].map((room, index) => <div className={styles.calendarRow} key={room}>
        <span>{room}</span><div className={styles.calendarCells}>{[12, 13, 14, 15, 16].map(d => <i key={d} />)}
          <div className={`${styles.reservation} ${index === 1 ? styles.newReservation : ""}`} style={{ left: `${index % 2 * 20}%`, width: `${index === 3 ? 40 : 60}%` }}>
            {index === 1 ? t.ui.direct : t.ui.occupied}<span>{index === 1 ? "↗" : "·"}</span>
          </div>
        </div>
      </div>)}
      <div className={styles.legend}><span><i />{t.ui.available}</span><span><i />{t.ui.occupied}</span></div>
    </div>
  );

  const website = (hero = false) => (
    <div className={styles.website}>
      <div className={styles.windowBar}><span className={styles.windowDots}>● ● ●</span><span>maison.example</span><span>↗</span></div>
      <div className={styles.hotelIdentity}><span>Maison<span className={styles.identityDot}>.</span></span><small>{t.ui.website}</small><span>≡</span></div>
      <div className={styles.hotelPhoto}>
        <Image src="/images/hotel/maison.webp" alt="" fill sizes={hero ? "(max-width: 700px) 90vw, 55vw" : "(max-width: 900px) 90vw, 48vw"} priority={hero} />
        <div><span>Maison</span><small>{t.ui.room}</small></div>
      </div>
      <div className={styles.bookingStrip}><span>{t.ui.dates}</span><span>{t.ui.book} ↗</span></div>
    </div>
  );

  return <PageShellV4 locale={locale} eyebrow="" title={t.title} languagePath={HOTEL_PATH} navCtaHref="#hotel-inquiry" background={<div className={styles.backdrop} />} customHero={<></>}>
    <div ref={root} className={styles.experience} lang={locale}>
      <div className={styles.readProgress} data-hotel-progress aria-hidden="true" />
      <section className={styles.hero} data-hotel-hero>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <h1 className={styles.heroTitle} data-hotel-title>{t.headline.map((line, i) => <span className={styles.lineClip} key={line}><span className={i === 2 ? styles.blue : undefined}>{line}</span></span>)}</h1>
            <p className={styles.heroIntro}>{t.intro}</p>
            <div className={styles.actions}><a href="#hotel-inquiry" className={styles.primary} data-cta="hotel-hero-inquiry">{t.cta}<span>↗</span></a><a href="#hotel-system" className={styles.textLink} data-cta="hotel-explore">{t.explore}<span>↓</span></a></div>
          </div>
          <div className={styles.heroArt} data-hotel-hero-art>
            <div className={styles.artHalo} aria-hidden="true" />
            <div className={styles.heroCalendar} aria-hidden="true">{calendar(true)}</div>
            <div className={styles.heroWebsite}>{website(true)}</div>
            <div className={styles.confirmation}><span className={styles.check}>✓</span><div><strong>{t.ui.confirmed}</strong><span>{t.ui.room} · 12–15.10</span></div><span className={styles.blue}>↗</span></div>
            <p className={styles.demoCaption}>{t.demo}</p>
          </div>
        </div>
        <nav className={styles.chapters} aria-label={t.explore}>{t.chapters.map((c, i) => <a key={c} href={i === 0 ? "#hotel-system" : i === 1 ? "#hotel-operations" : "#hotel-phases"}><span>0{i + 1}</span>{c}<span>↗</span></a>)}</nav>
      </section>

      <section className={styles.story} id="hotel-system">
        <header className={styles.sectionHeader} data-hotel-reveal><span className={styles.sectionNumber}>01 / {t.chapters[0]}</span><h2>{t.storyTitle}</h2><p>{t.storyIntro}</p></header>
        <div className={styles.storyGrid}>
          <div className={styles.storySteps}>{t.steps.map((s, i) => <article key={s.title} data-hotel-step className={`${styles.storyStep} ${step === i ? styles.stepActive : ""}`}>
            <span className={styles.stepIndex}>0{i + 1}</span><h3>{s.title}</h3><p>{s.text}</p>
            <button type="button" className={styles.stepButton} onClick={() => selectStep(i)} aria-pressed={step === i}>{t.explore} <span>↗</span></button>
          </article>)}</div>
          <div className={styles.storySticky}>
            <div className={styles.storyScreen} data-story-screen>
              <div className={styles.screenTabs} aria-label={t.explore}>{t.chapters.map((_, i) => <button key={i} type="button" onClick={() => setStep(i)} aria-pressed={step === i}>0{i + 1}</button>)}<span>{t.demo}</span></div>
              <div key={step} className={styles.screenBody}>{step === 0 ? website() : step === 1 ? <div className={styles.bookingDemo}>
                <span className={styles.demoBrand}>Maison.</span><h3>{t.ui.room}</h3><p>{day}–{day + 3}.10.2026 · {t.ui.dates.split("·")[1]}</p>
                <div className={styles.datePicker} aria-label={t.ui.dates}>{[12, 13, 14, 15, 16, 17, 18].map(d => <button type="button" aria-pressed={day === d} onClick={() => { setDay(d); setBooked(false); }} key={d}>{d}</button>)}</div>
                <button className={styles.primary} type="button" onClick={() => setBooked(true)} data-cta="hotel-demo-book">{booked ? t.ui.confirmed : t.ui.book}<span>{booked ? "✓" : "↗"}</span></button>
                <p className={styles.demoFeedback} role="status">{booked ? `${t.ui.confirmed} · ${day}.10.2026` : t.demo}</p>
              </div> : calendar()}</div>
            </div>
            <div className={styles.storyFoot}><span>{t.steps[step].title}</span><span>0{step + 1} / 03</span></div>
          </div>
        </div>
      </section>

      <section className={styles.operations} id="hotel-operations">
        <header className={styles.sectionHeader} data-hotel-reveal><span className={styles.sectionNumber}>02 / {t.chapters[1]}</span><h2>{t.operationsTitle}</h2><p>{t.operationsIntro}</p></header>
        <div className={styles.operationsGrid} data-hotel-reveal>
          <div><div className={styles.roles} role="tablist" aria-label={t.chapters[1]}>{t.ui.roles.map((r, i) => <button key={r} id={`hotel-role-${i}`} type="button" role="tab" aria-selected={role === i} aria-controls="hotel-role-panel" tabIndex={role === i ? 0 : -1} onClick={() => setRole(i)} onKeyDown={e => { if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) { e.preventDefault(); const next = e.key === "Home" ? 0 : e.key === "End" ? 2 : (role + (e.key === "ArrowRight" ? 1 : 2)) % 3; setRole(next); document.getElementById(`hotel-role-${next}`)?.focus(); } }}>{r}<span>↗</span></button>)}</div><p className={styles.roleDescription}>{t.ui.roleText[role]}</p></div>
          <div id="hotel-role-panel" role="tabpanel" aria-labelledby={`hotel-role-${role}`} className={styles.rolePanel}>
            {role === 0 ? calendar() : <div className={styles.taskList}><div className={styles.windowBar}><span className={styles.statusDot} />{t.ui.roles[role]}<span>12.10.2026</span></div>{[101, 102, 103, 104].map((room, i) => <div key={room}><span>{room}</span><strong>{t.ui.room}</strong><span className={i % 2 === 0 ? styles.blue : undefined}>{role === 1 ? t.ui.arrival : t.ui.ready} {i % 2 === 0 ? "↗" : "✓"}</span></div>)}</div>}
            <p className={styles.panelCaption}>{t.demo}</p>
          </div>
        </div>
      </section>

      <section className={styles.phases} id="hotel-phases">
        <header className={styles.sectionHeader} data-hotel-reveal><span className={styles.sectionNumber}>03 / {t.chapters[2]}</span><h2>{t.phasesTitle}</h2><p>{t.phasesIntro}</p></header>
        {t.phases.map((p, i) => <article className={styles.phase} key={p.title} data-hotel-reveal><span className={styles.phaseNumber}>0{i + 1}</span><div><h3>{p.title}</h3><p>{p.text}</p></div><ul>{p.items.map(item => <li key={item}>{item}</li>)}</ul></article>)}
      </section>

      <section className={styles.visibility} data-hotel-reveal><div className={styles.searchMark} data-hotel-orbit aria-hidden="true"><span>A</span><i /><i /><i /></div><div><h2>{t.visibilityTitle}</h2><p>{t.visibilityText}</p><ul>{t.visibilityItems.map(s => <li key={s}>{s}</li>)}</ul></div></section>
      <section className={styles.ownership} data-hotel-reveal><span className={styles.zero} aria-hidden="true">0<span>%</span></span><div><h2>{t.ownershipTitle}</h2><p>{t.ownershipText}</p></div></section>
      <section className={styles.faq}><h2 data-hotel-reveal>{t.faqTitle}</h2><div>{t.faq.map((f, i) => <details key={f.q}><summary><span>0{i + 1}</span>{f.q}<span>+</span></summary><p>{f.a}</p></details>)}</div></section>
      <section id="hotel-inquiry" className={styles.inquiry}><header data-hotel-reveal><h2>{t.inquiryTitle}</h2><p>{t.inquiryText}</p><span className={styles.terms}>{t.terms}</span><a className={styles.directContact} href="mailto:djordje@adspire.rs" data-cta="hotel-email">djordje@adspire.rs ↗</a></header><QuickInquiryV4 services={services} initialSlug={HOTEL_SLUG} locale={locale} hotel /></section>
      <nav className={styles.related} aria-label={t.related}><span>{t.related}</span>{["web-prezentacije", "sistemi-za-zakazivanje", "seo-digitalni-marketing"].map((slug, i) => <a key={slug} href={localePath(`/our-services/${slug}`, locale)}>{t.relatedLabels[i]} ↗</a>)}</nav>
    </div>
  </PageShellV4>;
}
