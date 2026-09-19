import type { ProjectCaseStudy, getCaseStudyV4Content } from "@/data/projectCaseStudies";
import { founderRef, orgRef, productId, webPageId } from "./ids";
import { absoluteUrl } from "./metadata";

/** Describe delivered work, using only capabilities also rendered on the page. */
export function caseStudyEntities(
  project: ProjectCaseStudy,
  content: ReturnType<typeof getCaseStudyV4Content>,
) {
  const canonical = absoluteUrl(`/our-projects/${project.slug}`);
  const articleId = `${canonical}#article`;
  const workId = productId(canonical);
  const features = Array.from(new Set(content.features.flatMap((group) => group.items)));

  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": articleId,
      headline: project.title,
      name: project.title,
      description: content.shortDescription || content.heroSubtitle || project.outcome,
      url: canonical,
      image: project.image.startsWith("http") ? project.image : absoluteUrl(project.image),
      author: founderRef(),
      publisher: orgRef(),
      inLanguage: "sr-RS",
      mainEntityOfPage: { "@id": webPageId(canonical) },
      about: { "@id": workId },
      citation: project.website,
    },
    {
      "@context": "https://schema.org",
      "@type": project.deliveredType,
      "@id": workId,
      name: project.shortTitle,
      description: project.outcome,
      url: project.website,
      creator: orgRef(),
      subjectOf: { "@id": articleId },
      ...(project.deliveredType === "SoftwareApplication"
        ? {
            applicationCategory: "BusinessApplication",
            applicationSubCategory: project.category,
            operatingSystem: "Web",
            ...(features.length ? { featureList: features } : {}),
          }
        : {}),
    },
  ] as const;
}
