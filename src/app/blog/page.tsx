import type { Metadata } from "next";
import { AzurioTemplatePage } from "@/components/site/AzurioTemplatePage";
import { getSiteContent } from "@/content/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { defaultLocale } from "@/lib/site-config";

const blogPage = getSiteContent(defaultLocale).blogPage;

export const metadata: Metadata = pageMetadata({
  path: "/blog",
  title: "Blog",
  description: blogPage.hero.description,
  keywords: ["Adspire blog", "web development", "SEO", "growth", "Niš"],
});

export default function BlogPage() {
  return <AzurioTemplatePage fileName="blog-standard.html" />;
}
