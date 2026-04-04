import { readFileSync } from "node:fs";
import path from "node:path";
import { AzurioChrome } from "@/components/site/AzurioChrome";
import { transformTemplateMain } from "@/components/site/azurioContentTransform";

const TEMPLATE_ROOT = path.join(process.cwd(), "azurio");

const ROUTE_MAP: Record<string, string> = {
  "index-2.html": "/",
  "index-digital-agency.html": "/index-digital-agency",
  "index-branding-studio.html": "/index-branding-studio",
  "index-creative-agency.html": "/index-creative-agency",
  "index-design-studio.html": "/index-design-studio",
  "index-digital-designer.html": "/index-digital-designer",
  "index-freelancer-portfolio.html": "/index-freelancer-portfolio",
  "index-personal-portfolio.html": "/index-personal-portfolio",
  "index-software-development-company.html": "/index-software-development-company",
  "index-web-developer.html": "/index-web-developer",
  "index-web-studio.html": "/index-web-studio",
  "index.html": "/",
  "about-me.html": "/about-us",
  "about-us.html": "/about-us",
  "services.html": "/our-services",
  "team.html": "/about-us",
  "pricing.html": "/our-services",
  "faq.html": "/faq",
  "contact.html": "/contact-us",
  "works-default.html": "/our-projects",
  "works-grid.html": "/our-projects",
  "works-grid-sticky.html": "/our-projects",
  "project-details.html": "/project-single",
  "blog-standard.html": "/blog",
  "blog-creative.html": "/blog",
  "blog-article.html": "/blog-single",
  "404.html": "/404",
};

const PAGE_CACHE = new Map<string, string>();
const MAIN_CACHE = new Map<string, string>();
const HERO_CACHE = new Map<string, string>();
const SECTION_CACHE = new Map<string, string>();

function extractBody(html: string) {
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return match ? match[1] : html;
}

function normalizeValue(value: string) {
  return value.replace(/^\.\//, "");
}

function shouldRewriteAttribute(attr: string, input: string) {
  const value = normalizeValue(input);

  if (value in ROUTE_MAP) {
    return true;
  }

  if (/^(?:img|video|css|js|fonts)\//i.test(value)) {
    return (
      attr === "href" ||
      attr === "src" ||
      attr === "poster" ||
      attr === "srcset" ||
      attr === "content" ||
      attr.startsWith("data-")
    );
  }

  return false;
}

function rewriteValue(input: string) {
  const value = normalizeValue(input);

  if (/^(?:https?:|mailto:|tel:|#|\/|data:|javascript:)/i.test(value)) {
    return value;
  }

  if (value in ROUTE_MAP) {
    return ROUTE_MAP[value];
  }

  if (
    value.startsWith("img/") ||
    value.startsWith("video/") ||
    value.startsWith("css/") ||
    value.startsWith("js/") ||
    value.startsWith("fonts/")
  ) {
    return `/azurio/${value}`;
  }

  return value;
}

function rewriteMarkup(markup: string) {
  const withoutScripts = markup.replace(/<script\b[\s\S]*?<\/script>/gi, "");

  const rewrittenAttrs = withoutScripts.replace(
    /\b([a-zA-Z_:][-a-zA-Z0-9_:.]*)=(["'])([^"']*)\2/g,
    (_full, attr: string, quote: string, value: string) =>
      `${attr}=${quote}${shouldRewriteAttribute(attr, value) ? rewriteValue(value) : value}${quote}`,
  );

  return rewrittenAttrs.replace(
    /url\((['"]?)(?:\.\/)?(img|video|fonts)\/([^'")]+)\1\)/gi,
    (_full, quote: string, folder: string, assetPath: string) =>
      `url(${quote}/azurio/${folder}/${assetPath}${quote})`,
  );
}

export function loadTemplateBody(fileName: string) {
  if (!PAGE_CACHE.has(fileName)) {
    const fullPath = path.join(TEMPLATE_ROOT, fileName);
    const html = readFileSync(fullPath, "utf-8");
    PAGE_CACHE.set(fileName, rewriteMarkup(extractBody(html)));
  }

  return PAGE_CACHE.get(fileName) ?? "";
}

export function loadTemplateMainInner(fileName: string) {
  if (!MAIN_CACHE.has(fileName)) {
    const body = loadTemplateBody(fileName);
    const match = body.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
    const mainInner = match ? match[1] : "";
    MAIN_CACHE.set(fileName, transformTemplateMain(fileName, mainInner));
  }

  return MAIN_CACHE.get(fileName) ?? "";
}

export function loadTemplateHeroSection(fileName: string) {
  if (!HERO_CACHE.has(fileName)) {
    const main = loadTemplateMainInner(fileName);
    const match = main.match(/<!-- Hero Section Start -->([\s\S]*?)<!-- Hero Section End -->/i);
    HERO_CACHE.set(fileName, match ? match[0] : "");
  }

  return HERO_CACHE.get(fileName) ?? "";
}

export function loadTemplateSectionRange(
  fileName: string,
  startComment: string,
  endComment: string,
) {
  const cacheKey = `${fileName}::${startComment}::${endComment}`;

  if (!SECTION_CACHE.has(cacheKey)) {
    const main = loadTemplateMainInner(fileName);
    const escapedStart = startComment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const escapedEnd = endComment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(
      `<!--\\s*${escapedStart}\\s*Start\\s*-->[\\s\\S]*?<!--\\s*${escapedEnd}\\s*End\\s*-->`,
      "i",
    );
    const match = main.match(pattern);
    SECTION_CACHE.set(cacheKey, match ? match[0] : "");
  }

  return SECTION_CACHE.get(cacheKey) ?? "";
}

export function removeFirstHeroSection(mainInner: string) {
  return mainInner.replace(
    /\s*<!-- Hero Section Start -->[\s\S]*?<!-- Hero Section End -->\s*/i,
    "\n",
  );
}

export function injectAfterBlur(mainInner: string, injectedMarkup: string) {
  if (!injectedMarkup.trim()) {
    return mainInner;
  }

  const blurEndPattern = /(<!-- Blur Effect End -->)/i;

  if (blurEndPattern.test(mainInner)) {
    return mainInner.replace(blurEndPattern, `$1\n\n${injectedMarkup}\n`);
  }

  return `${injectedMarkup}\n${mainInner}`;
}

export function replaceMain(bodyHtml: string, mainInner: string) {
  return bodyHtml.replace(
    /<main\b([^>]*)>[\s\S]*?<\/main>/i,
    `<main$1>${mainInner}</main>`,
  );
}

type AzurioTemplatePageProps = {
  fileName: string;
};

export function AzurioTemplatePage({ fileName }: AzurioTemplatePageProps) {
  const html = loadTemplateMainInner(fileName);

  return (
    <AzurioChrome>
      <div className="azurio-template-root" dangerouslySetInnerHTML={{ __html: html }} />
    </AzurioChrome>
  );
}
