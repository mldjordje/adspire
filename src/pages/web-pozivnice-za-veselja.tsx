import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/banner/CmnBanner";

type Benefit = {
  title: string;
  text: string;
};

type FaqItem = {
  q: string;
  a: string;
};

const WebInvitationsPage = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const benefits = t("webInvitations.benefits", {
    returnObjects: true,
  }) as Benefit[];
  const included = t("webInvitations.included", {
    returnObjects: true,
  }) as string[];
  const faq = t("webInvitations.faq", { returnObjects: true }) as FaqItem[];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://adspire.rs";
  const cleanPath =
    (router?.asPath?.split("#")[0]?.split("?")[0] as string) ||
    "/web-pozivnice-za-veselja";
  const canonicalUrl = cleanPath === "/" ? siteUrl : `${siteUrl}${cleanPath}`;
  const ogImage = `${siteUrl}/images/banner/banner-one-thumb.png`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t("webInvitations.pageTitle"),
    description: t("webInvitations.metaDescription"),
    provider: {
      "@type": "Organization",
      name: "ADSPIRE",
      url: siteUrl,
    },
    areaServed: ["Nis", "Srbija"],
    url: canonicalUrl,
    audience: {
      "@type": "Audience",
      audienceType: "Parovi, porodice i organizatori događaja",
    },
    offers: {
      "@type": "Offer",
      url: canonicalUrl,
      availability: "https://schema.org/InStock",
    },
    isRelatedTo: {
      "@type": "CreativeWork",
      url: "https://pozivnica.adspire.rs/",
      name: "Primer web pozivnice",
    },
  };

  return (
    <Layout header={4} footer={5} video={false}>
      <Head>
        <title key="title">{t("webInvitations.metaTitle") as string}</title>
        <meta
          key="description"
          name="description"
          content={t("webInvitations.metaDescription") as string}
        />
        <meta
          key="keywords"
          name="keywords"
          content={t("webInvitations.metaKeywords") as string}
        />
        <link rel="canonical" href={canonicalUrl} key="canonical" />
        <meta property="og:title" content={t("webInvitations.metaTitle") as string} />
        <meta
          property="og:description"
          content={t("webInvitations.metaDescription") as string}
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />
        <meta
          name="twitter:title"
          content={t("webInvitations.metaTitle") as string}
        />
        <meta
          name="twitter:description"
          content={t("webInvitations.metaDescription") as string}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      </Head>

      <CmnBanner
        title={t("webInvitations.pageTitle") as string}
        navigation={t("webInvitations.pageNav") as string}
        subtitle={t("webInvitations.subtitle") as string}
      />

      <section className="section fade-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section__header text-center">
                <p className="sub-title">{t("webInvitations.kicker") as string}</p>
                <h1 className="title">{t("webInvitations.headline") as string}</h1>
                <p className="primary-text">{t("webInvitations.lead") as string}</p>
              </div>
            </div>
          </div>
          <div className="row gaper mt-2">
            <div className="col-12 col-lg-6">
              <h4>{t("webInvitations.benefitsTitle") as string}</h4>
              <div className="row gaper mt-2">
                {benefits.map((item) => (
                  <div className="col-12" key={item.title}>
                    <div className="contact-m__single text-start fade-top">
                      <h5 className="mb-2">{item.title}</h5>
                      <p>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <h4>{t("webInvitations.includedTitle") as string}</h4>
              <div className="contact-m__single text-start mt-3 fade-top">
                <ul>
                  {included.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="d-flex flex-wrap gap-3 mt-4">
                  <a
                    href={t("webInvitations.exampleUrl") as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--secondary"
                  >
                    {t("webInvitations.ctaSecondary") as string}
                  </a>
                  <Link href="/contact-us" className="btn btn--primary">
                    {t("webInvitations.ctaPrimary") as string}
                  </Link>
                </div>
                <p className="mt-3">
                  <a
                    href={t("webInvitations.exampleUrl") as string}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("webInvitations.exampleLabel") as string}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section contact-m fade-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section__header text-center">
                <h3 className="title">{t("webInvitations.faqTitle") as string}</h3>
              </div>
            </div>
          </div>
          <div className="row gaper">
            {faq.map((item) => (
              <div className="col-12 col-lg-4" key={item.q}>
                <div className="contact-m__single text-start fade-top">
                  <h5 className="mb-3">{item.q}</h5>
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WebInvitationsPage;

export { getCommonStaticProps as getStaticProps } from "@/lib/getCommonStaticProps";
