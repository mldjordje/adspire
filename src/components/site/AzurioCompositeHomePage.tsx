import { AzurioChrome } from "@/components/site/AzurioChrome";
import { SplineLoader } from "@/components/site/SplineLoader";
import { ServicesR3F } from "@/components/site/ServicesR3F";
import { VideoController } from "@/components/site/VideoController";
import { StickyMobileBar, WhatsAppFAB, CTAMidObserver } from "@/components/site/CTAOverlays";
import {
  injectAfterBlur,
  loadTemplateSectionRange,
  loadTemplateHeroSection,
  loadTemplateMainInner,
  removeFirstHeroSection,
} from "@/components/site/AzurioTemplatePage";

// ─── Spline scene URLs ────────────────────────────────────────────────────────
const SPLINE_HERO_URL =
  "https://prod.spline.design/vOpaKE6qzJD9R4bH/scene.splinecode";

const SPLINE_CHIPS_IFRAME =
  "https://my.spline.design/chips-RfMml1g6wWVXO4y7ATAYP40f/";

const SPLINE_GLASS_URL =
  "https://prod.spline.design/79zulte5oSAlE8CO/scene.splinecode";

const SPLINE_VAPORWAVE_URL =
  "https://prod.spline.design/hfgzk1MC9sp0r2hG/scene.splinecode";

// ─── HTML helpers ─────────────────────────────────────────────────────────────

/**
 * Removes the first <div> whose class attribute contains `partialClass`,
 * including all its nested content (depth-balanced, no regex).
 */
function removeDivWithClass(html: string, partialClass: string): string {
  const escaped = partialClass.replace(/[-]/g, "\\-");
  const pattern = new RegExp(`<div[^>]+class="[^"]*${escaped}[^"]*"[^>]*>`);
  const match = pattern.exec(html);
  if (!match) return html;

  const start = match.index;
  let pos = start + match[0].length;
  let depth = 1;

  while (pos < html.length && depth > 0) {
    const nextOpen = html.indexOf("<div", pos);
    const nextClose = html.indexOf("</div>", pos);
    if (nextClose === -1) break;

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen + 4;
    } else {
      depth--;
      if (depth === 0) return html.slice(0, start) + html.slice(nextClose + 6);
      pos = nextClose + 6;
    }
  }
  return html;
}

/**
 * Injects the Spline background element directly before mxd-hero-01__cover.
 * The cover stays as the dark semi-transparent overlay on top of the robot.
 */
function injectSplineBackground(html: string, sceneUrl: string): string {
  const splineEl =
    `<div class="mxd-hero-01__spline-bg">` +
    `<spline-viewer url="${sceneUrl}" mouse-target="global" background="transparent"></spline-viewer>` +
    `</div>\n`;

  const coverTag = `<div class="mxd-hero-01__cover">`;
  if (!html.includes(coverTag)) return html;
  return html.replace(coverTag, splineEl + coverTag);
}

/**
 * Prepares the branding-studio hero:
 *  1. Removes the video-wrap section entirely
 *  2. Injects the Spline robot as hero background
 */
function prepareBrandingHero(heroHtml: string): string {
  let html = removeDivWithClass(heroHtml, "mxd-hero-01__video-wrap");
  html = injectSplineBackground(html, SPLINE_HERO_URL);
  return html;
}

/**
 * Injects the Spline chips iframe as a full-bleed background in the
 * creative-agency hero (mxd-hero-05).
 */
function injectChipsBackground(html: string, iframeSrc: string): string {
  const bg =
    `<div class="mxd-hero-05__spline-bg">` +
    `<iframe src="${iframeSrc}" frameborder="0" width="100%" height="100%" allowfullscreen></iframe>` +
    `</div>\n`;

  const wrapTag = `<div class="mxd-hero-05__wrap">`;
  if (!html.includes(wrapTag)) return html;
  return html.replace(wrapTag, bg + wrapTag);
}

function prepareCreativeAgencyHero(heroHtml: string): string {
  return injectChipsBackground(heroHtml, SPLINE_CHIPS_IFRAME);
}

/**
 * Prepares the freelancer-portfolio hero (mxd-hero-09) with the glass Spline scene.
 *  - Removes __background (video) and __media (dummy image)
 *  - Injects spline-viewer before __cover (no mouse-target="global" to prevent
 *    excessive parallax movement during scroll)
 *  - Replaces template placeholder text with Adspire copy
 */
function prepareFreelancerHero(heroHtml: string): string {
  let html = removeDivWithClass(heroHtml, "mxd-hero-09__background");
  html = removeDivWithClass(html, "mxd-hero-09__media");

  // No mouse-target="global" — keeps scene interactive but not scroll-tracking
  const splineEl =
    `<div class="mxd-hero-09__spline-bg">` +
    `<spline-viewer url="${SPLINE_GLASS_URL}" background="transparent"></spline-viewer>` +
    `</div>\n`;
  const coverTag = `<div class="mxd-hero-09__cover">`;
  if (html.includes(coverTag)) {
    html = html.replace(coverTag, splineEl + coverTag);
  }

  html = html
    .replace(
      `<h1 class="loading-chars">Alex Walker</h1>`,
      `<h1 class="loading-chars adspire-orb-title">Pokreni projekat.</h1>`,
    )
    .replace(
      `<span class="mark-text">Available for freelance</span>`,
      `<span class="mark-text adspire-orb-mark">Adspire Digital</span>`,
    )
    .replace(
      `<span class="btn-caption mxd-scramble">Scroll to explore</span>`,
      `<span class="btn-caption mxd-scramble">Istrazi</span>`,
    )
    .replace(`href="#about">`, `href="#projects">`);

  html = removeDivWithClass(html, "mxd-hero-09__descr");
  const ctaButtons =
    `<div class="mxd-hero-09__cta-group">` +
    `<a class="btn btn-default btn-default-permanent slide-right" href="/contact-us">` +
    `<span class="btn-caption mxd-scramble">Zakazi poziv</span></a> ` +
    `<a class="btn btn-line btn-line-permanent slide-right" href="/our-projects">` +
    `<span class="btn-caption mxd-scramble">Radovi</span></a>` +
    `</div>`;
  html = html.replace(
    /(<div class="mxd-hero__mark[^"]*">[\s\S]*?<\/div>)/,
    `$1\n${ctaButtons}`,
  );

  return html;
}

// ─── Services stack ───────────────────────────────────────────────────────────

const ADSPIRE_SERVICES = [
  { title: "Web sajtovi",      tags: ["Next.js", "SEO", "CTA tok"]      as const, summary: "Brz, jasan sajt koji vodi posetioca ka upitu.",                   href: "/our-services/web-prezentacije",              scene: "web-prezentacije",  video: null },
  { title: "Web shop",         tags: ["Katalog", "Placanje", "Analitika"] as const, summary: "Prodaja, porudzbine i administracija u jednom toku.",            href: "/our-services/e-commerce-web-shop",           scene: "ecommerce",         video: null },
  { title: "Mobilne aplikacije", tags: ["PWA", "iOS / Android", "Push"]  as const, summary: "Aplikacije za korisnike, timove i interne procese.",              href: "/our-services/mobilne-aplikacije",            scene: "animated-shader",   video: null },
  { title: "CMS sistemi",      tags: ["Admin panel", "Sadrzaj", "Kontrola"] as const, summary: "Sadrzaj, podaci i izmene bez tehnickog zastoja.",              href: "/our-services/cms-sistemi",                   scene: "interactive-shader",video: null },
  // Last 4 — video background instead of Three.js
  { title: "AI automatizacija", tags: ["LLM", "n8n", "Asistenti"]       as const, summary: "Manje rucnog rada u prodaji, podrsci i operativi.",              href: "/our-services/ai-integracije-automatizacija", scene: "",                  video: "/videos/waves-vertical.mp4" },
  { title: "SEO & marketing",  tags: ["SEO", "Ads", "Merenje"]           as const, summary: "Vidljivost, kampanje i jasna metrika rezultata.",                href: "/our-services/seo-digitalni-marketing",       scene: "",                  video: "/videos/cta-bg.mp4" },
  { title: "Security & GDPR",  tags: ["Audit", "GDPR", "Zastita"]        as const, summary: "Osnovna sigurnost, procesi i manji rizik posle lansiranja.",      href: "/our-services/cyber-security-gdpr",           scene: "",                  video: "/videos/galaxy-mobile.mp4" },
  { title: "UI/UX dizajn",    tags: ["Figma", "Prototip", "Motion"]      as const, summary: "Interfejs koji brzo objasni vrednost i sledeci korak.",           href: "/our-services/interaktivne-web-tehnologije",  scene: "",                  video: "/videos/scroll-scene.mp4" },
];

function buildTagsHtml(tags: readonly string[]): string {
  return tags
    .map((t) => `<span class="tag tag-m tag-permanent mxd-scramble">${t}</span>`)
    .join("\n                        ");
}

/**
 * Canvas sits OUTSIDE .card__wrapper so GSAP's clip-path on .card__image
 * never hides it. It's position:absolute;inset:0 relative to the card root
 * (.mxd-stack-cards__card has position:relative).
 *
 * .card__image--r3f-ghost is a transparent placeholder so mxdProjectsStack()
 * still finds a .card__image element for its clip animation (it just clips air).
 */
function buildR3FCardHtml(scene: string, coverClass: string): { canvas: string; ghost: string } {
  const canvas = `<canvas class="card-r3f-canvas" data-scene="${scene}"></canvas>`;
  // Ghost keeps GSAP happy — it animates this div's clip-path, not the canvas
  const ghost = `<div class="card__image card__image--r3f-ghost"><div class="${coverClass}"></div></div>`;
  return { canvas, ghost };
}

/**
 * Transforms one raw card HTML chunk into an Adspire service card.
 */
function applyServiceToCard(
  card: string,
  svc: (typeof ADSPIRE_SERVICES)[number],
): string {
  const attr = (value: string) =>
    value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

  let c = card.replace(
    `<div class="mxd-stack-cards__card">`,
    `<div class="mxd-stack-cards__card" data-service-title="${attr(svc.title)}" data-service-tags="${attr(svc.tags.join("|"))}" data-service-summary="${attr(svc.summary)}" data-service-href="${attr(svc.href)}">`,
  );

  c = c.replace(
    /<div class="card__tags">[\s\S]*?<\/div>/,
    `<div class="card__tags">\n                        ${buildTagsHtml(svc.tags)}\n                      </div>`,
  );

  c = c.replace(/href="project-details\.html"/g, `href="${svc.href}"`);

  c = c.replace(
    `<span class="btn-caption mxd-scramble">Know More</span>`,
    `<span class="btn-caption mxd-scramble">Saznaj više</span>`,
  );

  c = c.replace(
    `<div class="card__btngroup">`,
    `<p class="adspire-services-card-summary">${svc.summary}</p>\n                      <div class="card__btngroup">`,
  );

  c = c.replace(
    /<p class="permanent">[^<]*<\/p>/,
    `<p class="permanent">${svc.title}</p>`,
  );

  // Build background — video for last 4 services, Three.js canvas for first 4
  const coverMatch = c.match(/<div class="(card__cover[^"]*)">/);
  const coverClass = coverMatch ? coverMatch[1] : "card__cover";

  if (svc.video) {
    // Video background card
    const videoBg =
      `<video class="card-video-bg" src="${svc.video}" autoplay muted loop playsinline preload="none" aria-hidden="true"></video>`;
    const ghost = `<div class="card__image card__image--r3f-ghost"><div class="${coverClass}"></div></div>`;
    c = c.replace(/<div class="card__image">[\s\S]*?<\/div>\s*<\/div>/, ghost);
    c = c.replace(`<div class="card__wrapper">`, `${videoBg}\n<div class="card__wrapper">`);
  } else {
    const { canvas, ghost } = buildR3FCardHtml(svc.scene, coverClass);
    c = c.replace(/<div class="card__image">[\s\S]*?<\/div>\s*<\/div>/, ghost);
    c = c.replace(`<div class="card__wrapper">`, `${canvas}\n<div class="card__wrapper">`);
  }

  return c;
}

function splitCardChunk(chunk: string): { card: string; suffix: string } | null {
  const cardStart = chunk.indexOf(`<div class="mxd-stack-cards__card">`);
  if (cardStart === -1) return null;

  let pos = cardStart + `<div class="mxd-stack-cards__card">`.length;
  let depth = 1;

  while (pos < chunk.length && depth > 0) {
    const nextOpen = chunk.indexOf("<div", pos);
    const nextClose = chunk.indexOf("</div>", pos);
    if (nextClose === -1) return null;

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen + 4;
    } else {
      depth--;
      pos = nextClose + 6;
    }
  }

  return {
    card: chunk.slice(0, pos),
    suffix: chunk.slice(pos),
  };
}

/**
 * Transforms the "Section - Progects Stack" from branding-studio into
 * Adspire's services showcase. Supports more services than the template has
 * cards by cloning the last template card for extra services.
 */
function prepareServicesStack(sectionHtml: string): string {
  // Update marquee text to reflect services
  let html = sectionHtml
    .replace("mxd-stack-cards", "mxd-stack-cards adspire-services-stack")
    .replace(/Design\//g, "Web\/")
    .replace(/Development\//g, "Branding\/")
    .replace(/Branding\//g, "UI\/UX\/")
    .replace(/eCommerce\//g, "SEO\/")
    .replace(/Marketing\//g, "Marketing\/");

  const parts = html.split("<!-- single card -->");
  const prefix = parts[0];
  const cardChunks = parts.slice(1).map(splitCardChunk).filter(Boolean) as Array<{
    card: string;
    suffix: string;
  }>;
  if (!cardChunks.length) return html;

  const templateCards = cardChunks.map((chunk) => chunk.card);
  const lastTemplate = templateCards[templateCards.length - 1];
  const suffix = cardChunks[cardChunks.length - 1].suffix;

  const serviceCards = ADSPIRE_SERVICES.map((svc, idx) => {
    const template = templateCards[idx] ?? lastTemplate;
    return applyServiceToCard(template, svc);
  });

  return (
    prefix +
    serviceCards.join("<!-- single card -->") +
    suffix
  );
}

// ─── Remove testimonials + image from template HTML ──────────────────────────

/**
 * Strips a top-level <div class="mxd-section ..."> block whose inner text
 * contains the given needle string. Depth-balanced so nested divs are safe.
 */
function removeSectionByText(html: string, needle: string): string {
  const idx = html.indexOf(needle);
  if (idx === -1) return html;
  const tagStart = html.lastIndexOf("<div", idx);
  if (tagStart === -1) return html;
  let pos = html.indexOf(">", tagStart) + 1;
  let depth = 1;
  while (pos < html.length && depth > 0) {
    const nextOpen  = html.indexOf("<div", pos);
    const nextClose = html.indexOf("</div>", pos);
    if (nextClose === -1) break;
    if (nextOpen !== -1 && nextOpen < nextClose) { depth++; pos = nextOpen + 4; }
    else { depth--; if (depth === 0) return html.slice(0, tagStart) + html.slice(nextClose + 6); pos = nextClose + 6; }
  }
  return html;
}

function stripTestimonials(html: string): string {
  let out = removeSectionByText(html, "Few words");
  out = removeSectionByText(out, "mxd-section-title__image");
  out = out.replace(/<div class="mxd-section blur-section">\s*<\/div>/, "");
  return out;
}

/**
 * Strips the flat services grid from the base digital-agency template.
 * Our R3F services stack (injected via COMPOSITE_BLOCKS) replaces it.
 */
function stripTemplateServices(html: string): string {
  return removeSectionByText(html, "adspire-home-services");
}

/**
 * Replaces template project cards with clean cards that enforce a fixed
 * 16:9 aspect ratio — handles mixed desktop/mobile screenshots gracefully.
 */
function fixProjectImages(html: string): string {
  // Add enforced aspect-ratio class to every project card image wrapper
  return html.replace(
    /class="([^"]*card__image[^"]*)"/g,
    (match, cls) =>
      cls.includes("adspire-card-img-fixed")
        ? match
        : `class="${cls} adspire-card-img-fixed"`,
  );
}

// ─── New showcase sections ─────────────────────────────────────────────────

// 1. Scroll-cinema — canvas image-sequence scrubbed by scroll (Apple-style)
const SCROLL_CINEMA_HTML =
  `<section class="adspire-scroll-cinema" aria-label="Naše veštine">` +
    `<div class="adspire-scroll-cinema__sticky">` +
      `<canvas class="adspire-scroll-cinema__canvas" aria-hidden="true"></canvas>` +
      `<div class="adspire-scroll-cinema__veil"></div>` +
      `<div class="adspire-scroll-cinema__slides">` +

        `<div class="adspire-scroll-cinema__slide" data-from="0" data-to="0.34">` +
          `<span class="adspire-scroll-cinema__eyebrow">/ 01 — UI/UX &amp; Motion design</span>` +
          `<h2 class="adspire-scroll-cinema__heading">Svaki piksel<br>ima razlog</h2>` +
          `<p class="adspire-scroll-cinema__body">Figma design sistem, frame-by-frame motion spec i pixel-perfect implementacija — interfejs koji ubjeđuje pre nego što korisnik pročita i reč.</p>` +
        `</div>` +

        `<div class="adspire-scroll-cinema__slide" data-from="0.34" data-to="0.67">` +
          `<span class="adspire-scroll-cinema__eyebrow">/ 02 — Next.js · Three.js · WebGL</span>` +
          `<h2 class="adspire-scroll-cinema__heading">Produkcijski<br>kod od dana 1</h2>` +
          `<p class="adspire-scroll-cinema__body">TypeScript, server components, WebGL shader efekti i 3D animacije — arhitektura koja podnosi skaliranje bez retroaktivnog refaktorisanja.</p>` +
        `</div>` +

        `<div class="adspire-scroll-cinema__slide" data-from="0.67" data-to="1.01">` +
          `<span class="adspire-scroll-cinema__eyebrow">/ 03 — Core Web Vitals · LCP · CLS</span>` +
          `<h2 class="adspire-scroll-cinema__heading">100/100<br>od prvog deploya</h2>` +
          `<p class="adspire-scroll-cinema__body">LCP ispod 1.2s, CLS nula, zero layout shift. Performanse i SEO ne idu na kraj projekta — grade se u prvu iteraciju.</p>` +
        `</div>` +

      `</div>` +
      `<div class="adspire-scroll-cinema__progress"><span class="adspire-scroll-cinema__progress-bar"></span></div>` +
    `</div>` +
  `</section>`;

// 2. Craft split — video levo, tech stack desno
const CRAFT_SPLIT_HTML =
  `<section class="adspire-craft-split">` +
    `<div class="adspire-craft-split__video-wrap">` +
      `<video class="adspire-craft-video" src="/videos/hero-bg.mp4" autoplay muted loop playsinline preload="none" aria-hidden="true"></video>` +
      `<div class="adspire-craft-split__video-overlay"></div>` +
    `</div>` +
    `<div class="adspire-craft-split__content">` +
      `<span class="adspire-craft-split__eyebrow">Naš pristup razvoju</span>` +
      `<h2 class="adspire-craft-split__heading">Stack koji nosi produkciju — ne samo demo</h2>` +
      `<p class="adspire-craft-split__desc">Biramo tehnologije koje su dokazane u produkciji, ne u tutorialima. Svaki sloj ima razlog — od infrastrukture do animacije.</p>` +
      `<ul class="adspire-craft-stack">` +
        `<li class="adspire-craft-stack__item"><span class="adspire-craft-stack__num">01</span><strong>Next.js 15 · App Router · TypeScript</strong><em>SSR, ISR, Edge runtime — brz, indeksiran, skalabilan</em></li>` +
        `<li class="adspire-craft-stack__item"><span class="adspire-craft-stack__num">02</span><strong>Three.js · WebGL · GLSL · Spline</strong><em>3D scene, custom shader efekti, scroll-driven animacije</em></li>` +
        `<li class="adspire-craft-stack__item"><span class="adspire-craft-stack__num">03</span><strong>Figma Design System → produkcijski kod</strong><em>Tokens, motion spec, responsive system bez kompromisa</em></li>` +
        `<li class="adspire-craft-stack__item"><span class="adspire-craft-stack__num">04</span><strong>AI · LLM agenti · n8n workflow</strong><em>Automatizacija prodaje, podrške i operativnih procesa</em></li>` +
      `</ul>` +
    `</div>` +
  `</section>`;

// 3. Metrics strip — ambient video bg + 4 impaktne cifre
const METRICS_STRIP_HTML =
  `<section class="adspire-metrics-strip">` +
    `<video class="adspire-video-ambient" src="/videos/services-ambient.mp4" autoplay muted loop playsinline preload="none" aria-hidden="true"></video>` +
    `<div class="adspire-metrics-strip__veil"></div>` +
    `<div class="adspire-metrics-strip__inner">` +
      `<div class="adspire-metrics-strip__item"><strong class="adspire-metrics-strip__num">100</strong><span class="adspire-metrics-strip__label">Core Web Vitals — Lighthouse score</span></div>` +
      `<div class="adspire-metrics-strip__item"><strong class="adspire-metrics-strip__num">5+</strong><span class="adspire-metrics-strip__label">Produkcijskih sistema — live i aktivnih</span></div>` +
      `<div class="adspire-metrics-strip__item"><strong class="adspire-metrics-strip__num">48h</strong><span class="adspire-metrics-strip__label">Od briefinga do prvog interaktivnog prototipa</span></div>` +
      `<div class="adspire-metrics-strip__item"><strong class="adspire-metrics-strip__num">3D</strong><span class="adspire-metrics-strip__label">WebGL · Three.js · Spline — u produkciji</span></div>` +
    `</div>` +
  `</section>`;

// 4. Projects cinema — 5 projekata, video bg, scroll-driven
const PROJECTS = [
  {
    title: "Next.js booking platforma · Admin kalendar · Beauty Pass zona",
    cat: "Estetska medicina · Klinika",
    summary: "Javni sajt, online zakazivanje tretmana, klijentska zona i admin panel za Dr Igić Clinic — sistem koji spaja marketing i operativu.",
    outcome: "Termini, klijenti, tretmani i analitika spojeni u jedan tok — bez Excel tabela i poziva.",
    href: "/our-projects/dr-igic-web-aplikacija-za-estetske-klinike",
    video: "/videos/cta-bg.mp4",
  },
  {
    title: "SEO platforma · CRM panel · Operativni sistem za transport",
    cat: "Transport · Logistika",
    summary: "SEO sajt sa katalogom usluga, online upit formom i internim admin panelom za leadove, ponude, radnike i vozila — za Prevoz Kop.",
    outcome: "Upiti sa sajta ulaze direktno u prodajni tok, a dispečeri imaju centralno mesto za rad.",
    href: "/our-projects/prevozkop-digitalni-prodajni-operativni-sistem",
    video: "/videos/scroll-scene.mp4",
  },
  {
    title: "E-commerce sistem · Admin platforma · Marketplace integracije",
    cat: "Premium modni brend",
    summary: "Web shop i admin platforma za Santos & Santorini — katalog, korpa, checkout, content management i marketplace tokovi.",
    outcome: "Prodaja, lager, porudžbine i promocije rade iz jedne platforme bez tehničkog zastoja.",
    href: "/our-projects/santos-santorini-web-shop-admin-platforma",
    video: "/videos/galaxy-mobile.mp4",
  },
  {
    title: "Onboarding aplikacija · Google OAuth · Audio intervju · Referral sistem",
    cat: "EdTech · Remote rad",
    summary: "Platforma za onboarding remote nastavnika — Google prijava, audio snimak, admin review i referral sistem za TeachFromHome.",
    outcome: "Prijave više ne završavaju u inboxu, nego u merljivom funnel-u sa jasnim statusima.",
    href: "/our-projects/teachfromhome-onboarding-sistem-za-remote-nastavnike",
    video: "/videos/waves-vertical.mp4",
  },
  {
    title: "Booking sistem · Klijentski portal · 24/7 online termini",
    cat: "Barber studio · Uslužni biznis",
    summary: "Booking aplikacija za Doctor Barber — javni sajt, online zakazivanje, klijentski nalog i admin kalendar za osoblje.",
    outcome: "Studio dobija raspored koji radi 24/7 i jasnu evidenciju klijenata bez ručnog dogovaranja.",
    href: "/our-projects/doctor-barber-online-booking-sistem",
    video: "/videos/hero-bg.mp4",
  },
];

const PROJECTS_CINEMA_HTML = (() => {
  const slides = PROJECTS.map((p, i) => {
    const from = i / PROJECTS.length;
    const to   = (i + 1) / PROJECTS.length;
    return (
      `<div class="adspire-projects-cinema__slide" data-from="${from.toFixed(3)}" data-to="${to.toFixed(3)}">` +
        `<span class="adspire-projects-cinema__counter">${String(i + 1).padStart(2,"0")} / ${String(PROJECTS.length).padStart(2,"0")}</span>` +
        `<span class="adspire-projects-cinema__cat">${p.cat}</span>` +
        `<h2 class="adspire-projects-cinema__name">${p.title}</h2>` +
        `<p class="adspire-projects-cinema__summary">${p.summary}</p>` +
        `<p class="adspire-projects-cinema__outcome">${p.outcome}</p>` +
        `<a class="adspire-projects-cinema__link" href="${p.href}">Pogledaj projekat →</a>` +
      `</div>`
    );
  }).join("\n");

  const videos = PROJECTS.map((p, i) =>
    `<video class="adspire-projects-cinema__video" data-idx="${i}" src="${p.video}" autoplay muted loop playsinline preload="${i === 0 ? "auto" : "none"}" aria-hidden="true"></video>`
  ).join("\n");

  return (
    `<section class="adspire-projects-cinema" aria-label="Odabrani projekti">` +
      `<div class="adspire-projects-cinema__sticky">` +
        `<div class="adspire-projects-cinema__videos">${videos}</div>` +
        `<div class="adspire-projects-cinema__veil"></div>` +
        `<div class="adspire-projects-cinema__slides">${slides}</div>` +
        `<div class="adspire-projects-cinema__progress"><span class="adspire-projects-cinema__bar"></span></div>` +
      `</div>` +
    `</section>`
  );
})();

// ─── Mid-page CTA section ────────────────────────────────────────────────────
const CTA_MID_HTML =
  `<section class="adspire-cta-mid" aria-label="Kontaktirajte nas">` +
    `<div class="adspire-cta-mid__glow" aria-hidden="true"></div>` +
    `<div class="adspire-cta-mid__card">` +
      `<span class="adspire-cta-mid__eyebrow">/ Sledeći korak</span>` +
      `<h2 class="adspire-cta-mid__heading">Imate projekat<br>u glavi?</h2>` +
      `<p class="adspire-cta-mid__sub">Zakažimo 30-minutni discovery poziv — bez obaveza, bez praznih obećanja.</p>` +
      `<div class="adspire-cta-mid__actions">` +
        `<a class="adspire-cta-mid__btn" href="/contact-us">Zakazi razgovor</a>` +
        `<a class="adspire-cta-mid__link" href="tel:+381601491491">ili nas pozovite →</a>` +
      `</div>` +
    `</div>` +
  `</section>`;

// ─── Page assembly ────────────────────────────────────────────────────────────

const BASE_HOME_FILE = "index-digital-agency.html";

const COMPOSITE_BLOCKS = [
  // 1. Robot hero (branding-studio) — główny hero z robotem 3D
  prepareBrandingHero(loadTemplateHeroSection("index-branding-studio.html")),
  // 2. Glass Spline hero + CTA — "Digitalna agencija..." + dugmad
  prepareFreelancerHero(
    loadTemplateHeroSection("index-freelancer-portfolio.html"),
  ),
  // 3. Services showcase — 8 usluga sa Three.js animacijama
  prepareServicesStack(
    loadTemplateSectionRange(
      "index-branding-studio.html",
      "Section - Progects Stack",
      "Section - Progects Stack",
    ),
  ),
  // NOTE: Sve ostale sekcije (Creative Agency hero, Projects Grid,
  // Design Studio hero, Software Dev hero, Web Studio hero) su uklonjene —
  // višestruki hero blokovi konfuze korisnike i smanjuju konverziju.
];

function buildCompositeHomeHtml() {
  const baseMainInner = loadTemplateMainInner(BASE_HOME_FILE);
  const baseMainWithoutHero = removeFirstHeroSection(baseMainInner);
  const injectedHeroes = COMPOSITE_BLOCKS.filter(Boolean).join("\n\n");
  const withHeroes = injectAfterBlur(baseMainWithoutHero, injectedHeroes);

  // Strip testimonials, flat services grid, old projects section
  let cleaned = stripTestimonials(withHeroes);
  cleaned = stripTemplateServices(cleaned);
  // Strip template projects section (replaced by projects cinema)
  cleaned = removeSectionByText(cleaned, "adspire-home-cases");

  // Inject new sections before the blog/news section
  // The blog section contains "Featurednews" or "Featured news" from the template
  const blogMarker = `pinned-section padding-top-subtitle-mobile padding-bottom-default`;
  const blogIdx = cleaned.indexOf(blogMarker);
  if (blogIdx === -1) return cleaned;
  const insertAt = cleaned.lastIndexOf("<div", blogIdx);
  const newSections = [PROJECTS_CINEMA_HTML, CTA_MID_HTML, SCROLL_CINEMA_HTML, CRAFT_SPLIT_HTML, METRICS_STRIP_HTML].join("\n\n");
  return cleaned.slice(0, insertAt) + newSections + "\n\n" + cleaned.slice(insertAt);
}

// ─── Component (Server Component — no "use client") ──────────────────────────
//
// HTML is generated at request/build time on the server and sent to the browser
// immediately. SplineLoader (Client Component) hydrates the 3D scenes on top.

export function AzurioCompositeHomePage() {
  const html = buildCompositeHomeHtml();

  return (
    <>
      <SplineLoader />
      <ServicesR3F />
      <VideoController />
      <CTAMidObserver />
      <StickyMobileBar />
      <WhatsAppFAB />

      <AzurioChrome>
        <div
          className="azurio-template-root"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </AzurioChrome>
    </>
  );
}
