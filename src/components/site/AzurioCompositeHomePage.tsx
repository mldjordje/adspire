import { AzurioChrome } from "@/components/site/AzurioChrome";
import { SplineLoader } from "@/components/site/SplineLoader";
import { ServicesR3F } from "@/components/site/ServicesR3F";
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
      `<h1 class="loading-chars">Digitalna agencija koja isporučuje rezultate.</h1>`,
    )
    .replace(
      `<span class="mark-text">Available for freelance</span>`,
      `<span class="mark-text">Niš · Srbija</span>`,
    )
    .replace(
      `<span class="btn-caption mxd-scramble">Scroll to explore</span>`,
      `<span class="btn-caption mxd-scramble">Istraži</span>`,
    )
    .replace(`href="#about">`, `href="#projects">`);

  html = removeDivWithClass(html, "mxd-hero-09__descr");
  const ctaButtons =
    `<div class="mxd-hero-09__cta-group">` +
    `<a class="btn btn-default btn-default-permanent slide-right" href="/contact-us">` +
    `<span class="btn-caption mxd-scramble">Kontaktirajte nas</span></a> ` +
    `<a class="btn btn-line btn-line-permanent slide-right" href="/our-projects">` +
    `<span class="btn-caption mxd-scramble">Naši projekti</span></a>` +
    `</div>`;
  html = html.replace(
    /(<div class="mxd-hero__mark[^"]*">[\s\S]*?<\/div>)/,
    `$1\n${ctaButtons}`,
  );

  return html;
}

// ─── Services stack ───────────────────────────────────────────────────────────

const ADSPIRE_SERVICES = [
  {
    title: "Web prezentacije & sajtovi",
    tags: ["Next.js", "React", "WordPress", "Brz & SEO-ready"],
    summary: "Brze prezentacije i korporativni sajtovi sa jasnim CTA tokom, SEO osnovom i prostorom za kasniji rast.",
    href: "/our-services/web-prezentacije",
    scene: "web-prezentacije",
  },
  {
    title: "E-commerce & web shop sistemi",
    tags: ["Online prodavnica", "Plaćanje", "Katalog", "Analitika"],
    summary: "Prodajni sistemi sa katalogom, placanjem, analitikom i administracijom koja ne usporava svakodnevni rad.",
    href: "/our-services/e-commerce-web-shop",
    scene: "ecommerce",
  },
  {
    title: "Mobilne aplikacije",
    tags: ["PWA", "React Native", "iOS & Android", "Push notifikacije"],
    summary: "PWA i native aplikacije za korisnike, timove i interne procese, uz fokus na brzinu i stabilnu upotrebu.",
    href: "/our-services/mobilne-aplikacije",
    scene: "animated-shader",
  },
  {
    title: "CMS sistemi & upravljanje sadržajem",
    tags: ["Headless CMS", "Sanity", "Strapi", "Lako ažuriranje"],
    summary: "Custom CMS i admin paneli koji omogucavaju timu da menja sadrzaj, tokove i podatke bez tehnickog haosa.",
    href: "/our-services/cms-sistemi",
    scene: "cms",
  },
  {
    title: "AI integracije & automatizacija",
    tags: ["ChatGPT API", "Workflow automatizacija", "Chatboti", "ML modeli"],
    summary: "Automatizacije, AI asistenti i workflow sistemi koji uklanjaju rucni rad iz prodaje, podrske i operative.",
    href: "/our-services/ai-integracije-automatizacija",
    scene: "ai",
  },
  {
    title: "SEO & digitalni marketing",
    tags: ["Google Ads", "SEO optimizacija", "Social media", "Lokalni SEO Niš"],
    summary: "Tehnicki SEO, kampanje i merenje rezultata povezani sa sajtom, landing stranicama i prodajnim ciljevima.",
    href: "/our-services/seo-digitalni-marketing",
    scene: "seo",
  },
  {
    title: "Cyber security & GDPR",
    tags: ["Penetration testing", "GDPR usklađenost", "SSL & firewall", "Audit"],
    summary: "Bezbednosni audit, osnovna zastita, GDPR tokovi i infrastruktura koja smanjuje rizik posle lansiranja.",
    href: "/our-services/cyber-security-gdpr",
    scene: "security",
  },
  {
    title: "UI/UX & web dizajn",
    tags: ["Figma dizajn", "Prototipovi", "Animacije", "Korisničko iskustvo"],
    summary: "Interfejsi, prototipovi i mikrointerakcije koji pomazu korisniku da brze razume ponudu i napravi sledeci korak.",
    href: "/our-services/interaktivne-web-tehnologije",
    scene: "uiux",
  },
] as const;

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
    /<p class="permanent">[^<]*<\/p>/,
    `<p class="permanent">${svc.title}</p>`,
  );

  // Build canvas + ghost placeholder
  const coverMatch = c.match(/<div class="(card__cover[^"]*)">/);
  const coverClass = coverMatch ? coverMatch[1] : "card__cover";
  const { canvas, ghost } = buildR3FCardHtml(svc.scene, coverClass);

  // Replace the original .card__image block with the ghost placeholder
  c = c.replace(
    /<div class="card__image">[\s\S]*?<\/div>\s*<\/div>/,
    ghost,
  );

  // Inject canvas BEFORE .card__wrapper so it is a direct child of the card
  // and is NOT clipped by GSAP's clip-path on .card__image
  c = c.replace(
    `<div class="card__wrapper">`,
    `${canvas}\n<div class="card__wrapper">`,
  );

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
  return injectAfterBlur(baseMainWithoutHero, injectedHeroes);
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

      <AzurioChrome>
        <div
          className="azurio-template-root"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </AzurioChrome>
    </>
  );
}
