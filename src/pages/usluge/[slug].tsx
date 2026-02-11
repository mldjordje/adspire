import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import type { GetStaticPaths, GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import {
  findServiceCatalogEntry,
  serviceSlugs,
  type ServiceCatalogEntry,
} from "@/data/serviceCatalog";
import { getCommonStaticProps } from "@/lib/getCommonStaticProps";

type ServiceItem = {
  slug: string;
  title: string;
  summary: string;
  bullets: string[];
  cta?: string;
  href?: string;
};

const renderSecondaryCta = (
  catalog: ServiceCatalogEntry,
  label: string
): React.ReactNode => {
  if (!catalog.secondaryHref) {
    return null;
  }

  const isExternal = /^https?:\/\//i.test(catalog.secondaryHref);
  if (isExternal) {
    return (
      <a
        href={catalog.secondaryHref}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn--secondary"
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={catalog.secondaryHref} className="btn btn--secondary">
      {label}
    </Link>
  );
};

const ServiceDetailPage = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const locale = router.locale || "sr";
  const currentSlug = (router.query.slug as string) || "";

  const items = t("services.items", { returnObjects: true }) as ServiceItem[];
  const currentService = items.find((item) => item.slug === currentSlug);
  const catalog = findServiceCatalogEntry(currentSlug);
  const relatedServices = items
    .filter((item) => item.slug !== currentSlug)
    .slice(0, 4);

  if (!currentService || !catalog) {
    return (
      <Layout header={4} footer={5} video={false}>
        <CmnBanner title="404" navigation="404" subtitle="Service not found" />
      </Layout>
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://adspire.rs";
  const cleanPath =
    (router?.asPath?.split("#")[0]?.split("?")[0] as string) ||
    `/usluge/${currentSlug}`;
  const canonicalUrl = cleanPath === "/" ? siteUrl : `${siteUrl}${cleanPath}`;
  const ogImage = `${siteUrl}/images/banner/banner-one-thumb.png`;

  const aiSummary = locale === "en" ? catalog.aiSummaryEn : catalog.aiSummarySr;
  const pageTitle =
    locale === "en"
      ? `${currentService.title} | Adspire`
      : `${currentService.title} | Adspire`;
  const pageDescription = `${currentService.summary} ${aiSummary}`;
  const pageKeywords = locale === "en" ? catalog.keywordEn : catalog.keywordSr;
  const searchPhrases =
    locale === "en" ? catalog.searchPhrasesEn : catalog.searchPhrasesSr;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: currentService.title,
    description: pageDescription,
    provider: {
      "@type": "Organization",
      name: "ADSPIRE",
      url: siteUrl,
    },
    areaServed: ["Nis", "Srbija", "Serbia"],
    serviceType: currentService.title,
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: currentService.bullets.map((bullet, index) => ({
      "@type": "Question",
      name:
        locale === "en"
          ? `What is included in ${currentService.title}? (${index + 1})`
          : `Sta ukljucuje usluga ${currentService.title}? (${index + 1})`,
      acceptedAnswer: {
        "@type": "Answer",
        text: bullet,
      },
    })),
  };

  return (
    <Layout header={4} footer={5} video={false}>
      <Head>
        <title key="title">{pageTitle}</title>
        <meta key="description" name="description" content={pageDescription} />
        <meta key="keywords" name="keywords" content={pageKeywords} />
        <link key="canonical" rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImage} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <CmnBanner
        title={currentService.title}
        navigation={t("services.pageNav") as string}
        subtitle={currentService.summary}
      />

      <section className="section fade-wrapper">
        <div className="container">
          <div className="row gaper">
            <div className="col-12 col-lg-7">
              <div className="section__content">
                <p className="sub-title">
                  {locale === "en" ? "Service details" : "Detalji usluge"}
                </p>
                <h1 className="title">{currentService.title}</h1>
                <p className="primary-text">{aiSummary}</p>
              </div>
              <div className="contact-m__single text-start mt-4 fade-top">
                <h4 className="mb-3">
                  {locale === "en" ? "What we deliver" : "Sta isporucujemo"}
                </h4>
                <ul>
                  {currentService.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <div className="d-flex flex-wrap gap-3 mt-4">
                  <Link href="/contact-us" className="btn btn--primary">
                    {locale === "en" ? "Request offer" : "Zatrazi ponudu"}
                  </Link>
                  <Link href="/our-services" className="btn btn--secondary">
                    {locale === "en" ? "All services" : "Sve usluge"}
                  </Link>
                  {renderSecondaryCta(
                    catalog,
                    locale === "en" ? "View example" : "Pogledaj primer"
                  )}
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-5">
              <div className="contact-m__single text-start fade-top">
                <h4 className="mb-3">
                  {locale === "en"
                    ? "How users search for this service"
                    : "Kako korisnici traze ovu uslugu"}
                </h4>
                <ul>
                  {searchPhrases.map((phrase) => (
                    <li key={phrase}>{phrase}</li>
                  ))}
                </ul>
              </div>
              <div className="contact-m__single text-start mt-4 fade-top">
                <h4 className="mb-3">
                  {locale === "en" ? "SEO summary" : "SEO sazetak"}
                </h4>
                <p>{pageDescription}</p>
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
                <h3 className="title">
                  {locale === "en" ? "Related services" : "Povezane usluge"}
                </h3>
              </div>
            </div>
          </div>
          <div className="row gaper">
            {relatedServices.map((service) => (
              <div className="col-12 col-md-6 col-lg-3" key={service.slug}>
                <div className="contact-m__single text-start fade-top">
                  <h5 className="mb-3">{service.title}</h5>
                  <p>{service.summary}</p>
                  <Link href={service.href || "/our-services"} className="mt-3">
                    {locale === "en" ? "Open service page" : "Otvori stranicu usluge"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServiceDetailPage;

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const targetLocales = locales || ["sr", "en"];
  const paths = targetLocales.flatMap((locale) =>
    serviceSlugs.map((slug) => ({
      params: { slug },
      locale,
    }))
  );

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const slugParam = Array.isArray(ctx.params?.slug)
    ? ctx.params?.slug[0]
    : ctx.params?.slug;

  if (!slugParam || !serviceSlugs.includes(slugParam)) {
    return {
      notFound: true,
    };
  }

  return getCommonStaticProps(ctx);
};
