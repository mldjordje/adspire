import type { Metadata } from "next";
import { BlogV4 } from "@/components/site/v4/BlogV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { getSiteContent } from "@/content/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { defaultLocale } from "@/lib/site-config";

const blogPage = getSiteContent(defaultLocale).blogPage;

export const metadata: Metadata = pageMetadata({
  path: "/blog",
  title: "Blog",
  description: blogPage.hero.description,
  keywords: ["Adspire blog", "web development", "SEO", "growth", "Nis"],
});

export default function BlogPage() {
  return (
    <div className={v4FontClass}>
      <BlogV4 />
    </div>
  );
}
