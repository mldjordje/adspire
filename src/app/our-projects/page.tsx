import type { Metadata } from "next";
import { AzurioTemplatePage } from "@/components/site/AzurioTemplatePage";
import { getSiteContent } from "@/content/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { defaultLocale } from "@/lib/site-config";

const projectsPage = getSiteContent(defaultLocale).projectsPage;

export const metadata: Metadata = pageMetadata({
  path: "/our-projects",
  title: "Projekti",
  description: projectsPage.hero.description,
  keywords: ["Adspire projekti", "reference", "web sajtovi", "Next.js projekti", "Niš"],
});

export default function ProjectsPage() {
  return <AzurioTemplatePage fileName="works-grid-sticky.html" />;
}
