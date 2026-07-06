import { AzurioChrome } from "@/components/site/AzurioChrome";
import { SplineLoader } from "@/components/site/SplineLoader";
import { ServicesR3F } from "@/components/site/ServicesR3F";
import { VideoController } from "@/components/site/VideoController";
import {
  injectAfterBlur,
  loadTemplateSectionRange,
  loadTemplateHeroSection,
  loadTemplateMainInner,
  removeFirstHeroSection,
} from "@/components/site/AzurioTemplatePage";
import { getUiStrings, type UiStrings } from "@/content/site/ui";
import { defaultLocale, localePath, type LocaleCode } from "@/lib/site-config";

// ─── Spline scene URLs ────────────────────────────────────────────────────────
const SPLINE_HERO_URL =
  "https://prod.spline.design/vOpaKE6qzJD9R4bH/scene.splinecode";

const SPLINE_GLASS_URL =
  "https://prod.spline.design/79zulte5oSAlE8CO/scene.splinecode";

// ─── HTML helpers ─────────────────────────────────────────────────────────────

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

function injectSplineBackground(html: string, sceneUrl: string): string {
  const splineEl =
    `<div class="mxd-hero-01__spline-bg">` +
    `<spline-viewer url="${sceneUrl}" mouse-target="global" background="transparent"></spline-viewer>` +
    `</div>\n`;

  const coverTag = `<div class="mxd-hero-01__cover">`;
  if (!html.includes(coverTag)) return html;
  return html.replace(coverTag, splineEl + coverTag);
}

function prepareBrandingHero(heroHtml: string): string {
  let html = removeDivWithClass(heroHtml, "mxd-hero-01__video-wrap");
  html = injectSplineBackground(html, SPLINE_HERO_URL);
  return html;
}

/**
 * Prepares the freelancer-portfolio hero (mxd-hero-09) with the glass Spline scene
 * and localized hero copy + CTA buttons.
 */
function prepareFreelancerHero(heroHtml: string, ui: UiStrings, locale: LocaleCode): string {
  const t = ui.landing;
  let html = removeDivWithClass(heroHtml, "mxd-hero-09__background");
  html = removeDivWithClass(html, "mxd-hero-09__media");

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
      `<h1 class="loading-chars adspire-orb-title">${t.heroTitle}</h1>`,
    )
    .replace(
      `<span class="mark-text">Available for freelance</span>`,
      `<span class="mark-text adspire-orb-mark">${t.heroMark}</span>`,
    )
    .replace(
      `<span class="btn-caption mxd-scramble">Scroll to explore</span>`,
      `<span class="btn-caption mxd-scramble">${t.heroScroll}</span>`,
    )
    .replace(`href="#about">`, `href="#projects">`);

  html = removeDivWithClass(html, "mxd-hero-09__descr");
  const ctaButtons =
    `<div class="mxd-hero-09__cta-group">` +
    `<a class="btn btn-default btn-default-permanent slide-right" href="${localePath("/contact-us", locale)}">` +
    `<span class="btn-caption mxd-scramble">${t.heroCtaPrimary}</span></a> ` +
    `<a class="btn btn-line btn-line-permanent slide-right" href="${localePath("/our-projects", locale)}">` +
    `<span class="btn-caption mxd-scramble">${t.heroCtaSecondary}</span></a>` +
    `</div>`;
  html = html.replace(
    /(<div class="mxd-hero__mark[^"]*">[\s\S]*?<\/div>)/,
    `$1\n${ctaButtons}`,
  );

  return html;
}

// ─── Services stack ───────────────────────────────────────────────────────────

// Structural per-service data (scene / video / href). Display order matches
// ui.landing.services. Text (title/tags/summary) comes from the locale dict.
const SERVICE_STRUCTURE = [
  { href: "/our-services/web-prezentacije", scene: "web-prezentacije", video: null as string | null },
  { href: "/our-services/e-commerce-web-shop", scene: "ecommerce", video: null },
  { href: "/our-services/mobilne-aplikacije", scene: "animated-shader", video: null },
  { href: "/our-services/cms-sistemi", scene: "interactive-shader", video: null },
  { href: "/our-services/ai-integracije-automatizacija", scene: "", video: "/videos/waves-vertical.mp4" },
  { href: "/our-services/seo-digitalni-marketing", scene: "", video: "/videos/cta-bg.mp4" },
  { href: "/our-services/cyber-security-gdpr", scene: "", video: "/videos/galaxy-mobile.mp4" },
  { href: "/our-services/interaktivne-web-tehnologije", scene: "", video: "/videos/scroll-scene.mp4" },
];

type ServiceCard = {
  title: string;
  tags: readonly string[];
  summary: string;
  href: string;
  scene: string;
  video: string | null;
};

function buildServices(ui: UiStrings, locale: LocaleCode): ServiceCard[] {
  return ui.landing.services.map((svc, i) => {
    const s = SERVICE_STRUCTURE[i];
    return {
      title: svc.title,
      tags: svc.tags,
      summary: svc.summary,
      href: localePath(s.href, locale),
      scene: s.scene,
      video: s.video,
    };
  });
}

function buildTagsHtml(tags: readonly string[]): string {
  return tags
    .map((t) => `<span class="tag tag-m tag-permanent mxd-scramble">${t}</span>`)
    .join("\n                        ");
}

function buildR3FCardHtml(scene: string, coverClass: string): { canvas: string; ghost: string } {
  const canvas = `<canvas class="card-r3f-canvas" data-scene="${scene}"></canvas>`;
  const ghost = `<div class="card__image card__image--r3f-ghost"><div class="${coverClass}"></div></div>`;
  return { canvas, ghost };
}

function applyServiceToCard(card: string, svc: ServiceCard, knowMore: string): string {
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
    `<span class="btn-caption mxd-scramble">${knowMore}</span>`,
  );

  c = c.replace(
    `<div class="card__btngroup">`,
    `<p class="adspire-services-card-summary">${svc.summary}</p>\n                      <div class="card__btngroup">`,
  );

  c = c.replace(
    /<p class="permanent">[^<]*<\/p>/,
    `<p class="permanent">${svc.title}</p>`,
  );

  const coverMatch = c.match(/<div class="(card__cover[^"]*)">/);
  const coverClass = coverMatch ? coverMatch[1] : "card__cover";

  if (svc.video) {
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

function prepareServicesStack(sectionHtml: string, services: ServiceCard[], knowMore: string): string {
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

  const serviceCards = services.map((svc, idx) => {
    const template = templateCards[idx] ?? lastTemplate;
    return applyServiceToCard(template, svc, knowMore);
  });

  return prefix + serviceCards.join("<!-- single card -->") + suffix;
}

// ─── Remove testimonials + image from template HTML ──────────────────────────

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

function stripTemplateServices(html: string): string {
  return removeSectionByText(html, "adspire-home-services");
}

// ─── New showcase sections (localized) ───────────────────────────────────────

function scrollCinemaHtml(ui: UiStrings): string {
  const c = ui.landing.cinema;
  const ranges = [
    ["0", "0.34"],
    ["0.34", "0.67"],
    ["0.67", "1.01"],
  ];
  const slides = c.slides
    .map(
      (s, i) =>
        `<div class="adspire-scroll-cinema__slide" data-from="${ranges[i][0]}" data-to="${ranges[i][1]}">` +
        `<span class="adspire-scroll-cinema__eyebrow">${s.eyebrow} — ${c.eyebrowSuffixes[i]}</span>` +
        `<h2 class="adspire-scroll-cinema__heading">${s.heading}</h2>` +
        `<p class="adspire-scroll-cinema__body">${s.body}</p>` +
        `</div>`,
    )
    .join("");

  return (
    `<section class="adspire-scroll-cinema" aria-label="${ui.landing.craft.eyebrow}">` +
    `<div class="adspire-scroll-cinema__sticky">` +
    `<canvas class="adspire-scroll-cinema__canvas" aria-hidden="true"></canvas>` +
    `<div class="adspire-scroll-cinema__veil"></div>` +
    `<div class="adspire-scroll-cinema__slides">${slides}</div>` +
    `<div class="adspire-scroll-cinema__progress"><span class="adspire-scroll-cinema__progress-bar"></span></div>` +
    `</div>` +
    `</section>`
  );
}

function craftSplitHtml(ui: UiStrings): string {
  const c = ui.landing.craft;
  const items = c.items
    .map(
      (it, i) =>
        `<li class="adspire-craft-stack__item"><span class="adspire-craft-stack__num">0${i + 1}</span><strong>${it.strong}</strong><em>${it.em}</em></li>`,
    )
    .join("");

  return (
    `<section class="adspire-craft-split">` +
    `<div class="adspire-craft-split__video-wrap">` +
    `<video class="adspire-craft-video" src="/videos/hero-bg.mp4" autoplay muted loop playsinline preload="none" aria-hidden="true"></video>` +
    `<div class="adspire-craft-split__video-overlay"></div>` +
    `</div>` +
    `<div class="adspire-craft-split__content">` +
    `<span class="adspire-craft-split__eyebrow">${c.eyebrow}</span>` +
    `<h2 class="adspire-craft-split__heading">${c.heading}</h2>` +
    `<p class="adspire-craft-split__desc">${c.desc}</p>` +
    `<ul class="adspire-craft-stack">${items}</ul>` +
    `</div>` +
    `</section>`
  );
}

function metricsStripHtml(ui: UiStrings): string {
  const items = ui.landing.metrics
    .map(
      (m) =>
        `<div class="adspire-metrics-strip__item"><strong class="adspire-metrics-strip__num">${m.num}</strong><span class="adspire-metrics-strip__label">${m.label}</span></div>`,
    )
    .join("");

  return (
    `<section class="adspire-metrics-strip">` +
    `<video class="adspire-video-ambient" src="/videos/services-ambient.mp4" autoplay muted loop playsinline preload="none" aria-hidden="true"></video>` +
    `<div class="adspire-metrics-strip__veil"></div>` +
    `<div class="adspire-metrics-strip__inner">${items}</div>` +
    `</section>`
  );
}

// Structural project data (video / href). Order matches ui.landing.projects.
const PROJECT_STRUCTURE = [
  { href: "/our-projects/dr-igic-web-aplikacija-za-estetske-klinike", video: "/videos/cta-bg.mp4" },
  { href: "/our-projects/prevozkop-digitalni-prodajni-operativni-sistem", video: "/videos/scroll-scene.mp4" },
  { href: "/our-projects/santos-santorini-web-shop-admin-platforma", video: "/videos/galaxy-mobile.mp4" },
  { href: "/our-projects/teachfromhome-onboarding-sistem-za-remote-nastavnike", video: "/videos/waves-vertical.mp4" },
  { href: "/our-projects/doctor-barber-online-booking-sistem", video: "/videos/hero-bg.mp4" },
];

function projectsCinemaHtml(ui: UiStrings, locale: LocaleCode): string {
  const projects = ui.landing.projects;
  const total = projects.length;
  const slides = projects
    .map((p, i) => {
      const from = (i / total).toFixed(3);
      const to = ((i + 1) / total).toFixed(3);
      const href = localePath(PROJECT_STRUCTURE[i].href, locale);
      return (
        `<div class="adspire-projects-cinema__slide" data-from="${from}" data-to="${to}">` +
        `<span class="adspire-projects-cinema__counter">${String(i + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}</span>` +
        `<span class="adspire-projects-cinema__cat">${p.cat}</span>` +
        `<h2 class="adspire-projects-cinema__name">${p.title}</h2>` +
        `<p class="adspire-projects-cinema__summary">${p.summary}</p>` +
        `<p class="adspire-projects-cinema__outcome">${p.outcome}</p>` +
        `<a class="adspire-projects-cinema__link" href="${href}">${ui.landing.projectsLink}</a>` +
        `</div>`
      );
    })
    .join("\n");

  const videos = projects
    .map(
      (_p, i) =>
        `<video class="adspire-projects-cinema__video" data-idx="${i}" src="${PROJECT_STRUCTURE[i].video}" autoplay muted loop playsinline preload="${i === 0 ? "auto" : "none"}" aria-hidden="true"></video>`,
    )
    .join("\n");

  return (
    `<section class="adspire-projects-cinema" aria-label="${ui.landing.projectsAria}">` +
    `<div class="adspire-projects-cinema__sticky">` +
    `<div class="adspire-projects-cinema__videos">${videos}</div>` +
    `<div class="adspire-projects-cinema__veil"></div>` +
    `<div class="adspire-projects-cinema__slides">${slides}</div>` +
    `<div class="adspire-projects-cinema__progress"><span class="adspire-projects-cinema__bar"></span></div>` +
    `</div>` +
    `</section>`
  );
}

// ─── Page assembly ────────────────────────────────────────────────────────────

const BASE_HOME_FILE = "index-digital-agency.html";

function buildCompositeHomeHtml(locale: LocaleCode) {
  const ui = getUiStrings(locale);
  const services = buildServices(ui, locale);

  const blocks = [
    prepareBrandingHero(loadTemplateHeroSection("index-branding-studio.html", locale)),
    prepareFreelancerHero(
      loadTemplateHeroSection("index-freelancer-portfolio.html", locale),
      ui,
      locale,
    ),
    prepareServicesStack(
      loadTemplateSectionRange(
        "index-branding-studio.html",
        "Section - Progects Stack",
        "Section - Progects Stack",
        locale,
      ),
      services,
      ui.landing.servicesKnowMore,
    ),
  ].filter(Boolean);

  const baseMainInner = loadTemplateMainInner(BASE_HOME_FILE, locale);
  const baseMainWithoutHero = removeFirstHeroSection(baseMainInner);
  const injectedHeroes = blocks.join("\n\n");
  const withHeroes = injectAfterBlur(baseMainWithoutHero, injectedHeroes);

  let cleaned = stripTestimonials(withHeroes);
  cleaned = stripTemplateServices(cleaned);
  cleaned = removeSectionByText(cleaned, "adspire-home-cases");

  const blogMarker = `pinned-section padding-top-subtitle-mobile padding-bottom-default`;
  const blogIdx = cleaned.indexOf(blogMarker);
  if (blogIdx === -1) return cleaned;
  const insertAt = cleaned.lastIndexOf("<div", blogIdx);
  const newSections = [
    projectsCinemaHtml(ui, locale),
    scrollCinemaHtml(ui),
    craftSplitHtml(ui),
    metricsStripHtml(ui),
  ].join("\n\n");
  return cleaned.slice(0, insertAt) + newSections + "\n\n" + cleaned.slice(insertAt);
}

type AzurioCompositeHomePageProps = {
  locale?: LocaleCode;
};

export function AzurioCompositeHomePage({ locale = defaultLocale }: AzurioCompositeHomePageProps) {
  const html = buildCompositeHomeHtml(locale);

  return (
    <>
      <SplineLoader />
      <ServicesR3F />
      <VideoController />

      <AzurioChrome locale={locale}>
        <div
          className="azurio-template-root"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </AzurioChrome>
    </>
  );
}
