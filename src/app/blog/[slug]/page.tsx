import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BLOG_POSTS, getPostBySlug, getRelatedPosts } from "@/data/blogPosts";
import { BlogPostLayout } from "@/components/site/BlogPostLayout";
import { JsonLd } from "@/components/site/JsonLd";
import { getSiteUrl } from "@/lib/seo/site";

type Props = { params: Promise<{ slug: string }> };

/** Post dates are stored as dd.mm.yyyy — schema.org/OG need ISO 8601. */
function isoDate(date: string): string {
  const [dd, mm, yyyy] = date.split(".");
  return `${yyyy}-${mm}-${dd}`;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post nije pronađen" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      locale: "sr_RS",
      url: `${getSiteUrl()}/blog/${slug}`,
      siteName: "Adspire Digital",
      title: post.title,
      description: post.excerpt,
      publishedTime: isoDate(post.date),
      images: [{ url: post.image, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
    alternates: {
      canonical: `https://adspire.rs/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);

  const base = getSiteUrl();
  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${base}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.excerpt,
    image: `${base}${post.image}`,
    datePublished: isoDate(post.date),
    dateModified: isoDate(post.date),
    inLanguage: "sr-RS",
    mainEntityOfPage: { "@type": "WebPage", "@id": `${base}/blog/${post.slug}` },
    author: { "@id": `${base}/#organization` },
    publisher: { "@id": `${base}/#organization` },
  };

  return (
    <>
      <JsonLd data={[blogPostingJsonLd]} />
      <BlogPostLayout post={post} related={related} />
    </>
  );
}
