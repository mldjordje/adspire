import Script from "next/script";
import { AzurioChrome } from "@/components/site/AzurioChrome";
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
    title: "Web razvoj & aplikacije",
    tags: ["Next.js", "React", "E-Commerce", "Web aplikacije"],
    href: "/usluge",
    spline: true,
  },
  {
    title: "Branding & vizualni identitet",
    tags: ["Logo dizajn", "Vizualni identitet", "Brand guidelines", "Strategija"],
    href: "/usluge",
    spline: false,
  },
  {
    title: "UI/UX & web dizajn",
    tags: ["UI dizajn", "Figma", "Prototipovi", "Animacije"],
    href: "/usluge",
    spline: false,
  },
  {
    title: "Digitalni marketing & SEO",
    tags: ["SEO optimizacija", "Google Ads", "Social media", "Lokalni SEO Niš"],
    href: "/usluge",
    spline: false,
  },
] as const;

function buildTagsHtml(tags: readonly string[]): string {
  return tags
    .map(
      (t) =>
        `<span class="tag tag-m tag-permanent mxd-scramble">${t}</span>`,
    )
    .join("\n                        ");
}

/**
 * Transforms the "Section - Progects Stack" from branding-studio into
 * Adspire's services showcase, keeping the mxd-stack-cards layout intact.
 *
 * Card 1 gets the Spline vaporwave viewer instead of the placeholder image.
 */
function prepareServicesStack(sectionHtml: string): string {
  const parts = sectionHtml.split("<!-- single card -->");
  // parts[0] = outer wrapper open, parts[1..4] = 4 cards, parts[5] = wrapper close
  if (parts.length < 5) return sectionHtml;

  const transformed = parts.map((part, i) => {
    const idx = i - 1; // 0-based card index
    if (idx < 0 || idx >= ADSPIRE_SERVICES.length) return part;

    const svc = ADSPIRE_SERVICES[idx];

    // Replace the four tags
    let card = part.replace(
      /<div class="card__tags">[\s\S]*?<\/div>/,
      `<div class="card__tags">\n                        ${buildTagsHtml(svc.tags)}\n                      </div>`,
    );

    // Update all hrefs from template links to /usluge
    card = card.replace(/href="project-details\.html"/g, `href="${svc.href}"`);

    // Localize button caption
    card = card.replace(
      `<span class="btn-caption mxd-scramble">Know More</span>`,
      `<span class="btn-caption mxd-scramble">Saznaj više</span>`,
    );

    // Replace the card title text
    card = card.replace(
      /<p class="permanent">[^<]*<\/p>/,
      `<p class="permanent">${svc.title}</p>`,
    );

    // Card 1: swap the image div for a Spline vaporwave viewer
    if (svc.spline) {
      // Detect if the original cover has an extra class (e.g. cover-darken)
      const coverMatch = card.match(/<div class="(card__cover[^"]*)">/);
      const coverClass = coverMatch ? coverMatch[1] : "card__cover";
      card = card.replace(
        /<div class="card__image">[\s\S]*?<\/div>\s*<\/div>/,
        `<div class="card__image card__image--spline">` +
          `<div class="card__spline-bg">` +
          `<spline-viewer url="${SPLINE_VAPORWAVE_URL}" background="transparent"></spline-viewer>` +
          `</div>` +
          `<div class="${coverClass}"></div>` +
          `</div>`,
      );
    }

    return card;
  });

  return transformed.join("<!-- single card -->");
}

// ─── Page assembly ────────────────────────────────────────────────────────────

const BASE_HOME_FILE = "index-digital-agency.html";

const COMPOSITE_BLOCKS = [
  // 1. Robot hero (branding-studio)
  prepareBrandingHero(loadTemplateHeroSection("index-branding-studio.html")),
  // 2. Glass Spline hero + CTA — directly below robot
  prepareFreelancerHero(
    loadTemplateHeroSection("index-freelancer-portfolio.html"),
  ),
  loadTemplateSectionRange(
    "index-creative-agency.html",
    "Section - CTA with Marquee",
    "Section - CTA with Marquee",
  ),
  // 3. Services showcase (mxd-stack-cards with Adspire services)
  prepareServicesStack(
    loadTemplateSectionRange(
      "index-branding-studio.html",
      "Section - Progects Stack",
      "Section - Progects Stack",
    ),
  ),
  prepareCreativeAgencyHero(
    loadTemplateHeroSection("index-creative-agency.html"),
  ),
  loadTemplateSectionRange(
    "index-creative-agency.html",
    "Section - Projects Grid x2 Showcase",
    "Section - Projects Grid x2 Showcase",
  ),
  loadTemplateHeroSection("index-design-studio.html"),
  loadTemplateHeroSection("index-software-development-company.html"),
  loadTemplateHeroSection("index-web-studio.html"),
];

function buildCompositeHomeHtml() {
  const baseMainInner = loadTemplateMainInner(BASE_HOME_FILE);
  const baseMainWithoutHero = removeFirstHeroSection(baseMainInner);
  const injectedHeroes = COMPOSITE_BLOCKS.filter(Boolean).join("\n\n");
  return injectAfterBlur(baseMainWithoutHero, injectedHeroes);
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AzurioCompositeHomePage() {
  const html = buildCompositeHomeHtml();

  return (
    <>
      {/* ── Spline viewer web component ──────────────────────────────────── */}
      <Script
        src="https://unpkg.com/@splinetool/viewer@1.12.92/build/spline-viewer.js"
        type="module"
        strategy="afterInteractive"
      />

      {/* ── Remove "Created with Spline" watermark from shadow DOM ──────── */}
      <Script id="spline-hide-logo" strategy="afterInteractive">{`
        (function () {
          function hide() {
            document.querySelectorAll('spline-viewer').forEach(function (v) {
              var sr = v.shadowRoot;
              if (!sr || sr.querySelector('#ads-hl')) return;
              var s = document.createElement('style');
              s.id = 'ads-hl';
              s.textContent = '#logo,a[href*="spline.design"]{display:none!important}';
              sr.prepend(s);
            });
          }
          [0, 500, 1500, 3000, 6000].forEach(function (d) { setTimeout(hide, d); });
        })();
      `}</Script>

      <AzurioChrome>
        <div
          className="azurio-template-root"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </AzurioChrome>
    </>
  );
}
