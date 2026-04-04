import { AzurioChrome } from "@/components/site/AzurioChrome";
import {
  injectAfterBlur,
  loadTemplateSectionRange,
  loadTemplateHeroSection,
  loadTemplateMainInner,
  removeFirstHeroSection,
} from "@/components/site/AzurioTemplatePage";

const BASE_HOME_FILE = "index-digital-agency.html";
const COMPOSITE_BLOCKS = [
  loadTemplateHeroSection("index-branding-studio.html"),
  loadTemplateSectionRange(
    "index-branding-studio.html",
    "Section - Progects Stack",
    "Section - Progects Stack",
  ),
  loadTemplateHeroSection("index-creative-agency.html"),
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

  const injectedHeroes = COMPOSITE_BLOCKS.filter(Boolean)
    .join("\n\n");

  return injectAfterBlur(baseMainWithoutHero, injectedHeroes);
}

export function AzurioCompositeHomePage() {
  const html = buildCompositeHomeHtml();

  return (
    <AzurioChrome>
      <div className="azurio-template-root" dangerouslySetInnerHTML={{ __html: html }} />
    </AzurioChrome>
  );
}
