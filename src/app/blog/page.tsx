import type { Metadata } from "next";
import { JsonLd } from "@/components/site/JsonLd";
import { collectionPageJsonLd } from "@/lib/seo/pages";
import { BLOG_POSTS } from "@/data/blogPosts";
import { isoDate } from "@/lib/seo/dates";
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
      <JsonLd
        data={collectionPageJsonLd({
          path: "/blog",
          title: "Blog — Adspire Digital",
          description: blogPage.hero.description,
          items: BLOG_POSTS.map((post) => ({
            name: post.title,
            path: `/blog/${post.slug}`,
            description: post.excerpt,
            image: post.image,
            datePublished: isoDate(post.date),
          })),
        })}
      />
      <BlogV4 />
    </div>
  );
}
