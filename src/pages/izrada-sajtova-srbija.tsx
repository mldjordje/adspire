import React from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import { getCommonStaticProps } from "@/lib/getCommonStaticProps";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebDesignService",
  name: "Adspire",
  url: "https://adspire.rs",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Niš",
    addressCountry: "RS",
  },
  areaServed: [
    { "@type": "City", name: "Niš" },
    { "@type": "Country", name: "Srbija" },
  ],
  serviceType: ["izrada web sajtova", "razvoj web aplikacija"],
};

const IzradaSajtovaSrbija = () => {
  const pageTitle = "Izrada sajtova u Srbiji – Adspire";
  const description =
    "Adspire je digitalna agencija iz Niša koja pruža usluge izrade web sajtova i web aplikacija kompanijama širom Srbije.";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="izrada sajtova Srbija, web agencija Srbija, razvoj web aplikacija Srbija"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <Layout header={4} footer={5} video={0}>
        <section className="section hero-light">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10">
                <p className="sub-title">Adspire • Srbija</p>
                <h1 className="title">{pageTitle}</h1>
                <p className="primary-text">
                  Adspire je digitalna agencija iz Niša koja pruža usluge izrade web
                  sajtova i web aplikacija kompanijama širom Srbije. Radimo sa timovima
                  iz Beograda, Novog Sada, Kragujevca i drugih gradova koji žele stabilne
                  digitalne proizvode sa jasnim ciljevima.
                </p>
                <div className="d-flex flex-wrap gap-3 mt-4">
                  <Link href="/contact-us" className="btn btn--primary">
                    Zatraži ponudu
                  </Link>
                  <Link href="/izrada-sajtova-nis" className="btn btn--secondary">
                    Pogledaj rad u Nišu
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section light">
          <div className="container">
            <div className="row gaper">
              <div className="col-12 col-lg-6">
                <div className="section__content">
                  <p className="sub-title">Nacionalni domet</p>
                  <h2 className="title">Web rešenja za klijente u Srbiji</h2>
                  <p className="primary-text">
                    Projekti koje radimo za klijente u Srbiji uključuju korporativne
                    prezentacije, prodajne sajtove i složenije web aplikacije. Svaki sajt
                    prilagođavamo jeziku, ciljnim publikama i poslovnim ciljevima koje nam
                    timovi definišu na početku.
                  </p>
                  <ul className="mt-3">
                    <li>Razvoj web sajtova na srpskom jeziku sa jasnim CTA elementima.</li>
                    <li>Integracije sa CRM, ERP ili platnim sistemima po potrebi.</li>
                    <li>Izrada web aplikacija koje rešavaju specifične procese u kompaniji.</li>
                    <li>Priprema sadržaja i tehničke optimizacije za pretraživače.</li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="section__content">
                  <p className="sub-title">Transparentan rad</p>
                  <h3 className="title">Kako vodimo projekte sa timovima iz Srbije</h3>
                  <ol className="mt-3">
                    <li>Definisanje ciljeva i rokova sa ključnim ljudima iz kompanije.</li>
                    <li>Plan informacione arhitekture i korisničkih tokova.</li>
                    <li>Dizajn interfejsa uz jasne komponente i dostupnost na svim uređajima.</li>
                    <li>Razvoj i QA testovi prema standardima koje koristi Adspire tim u Nišu.</li>
                    <li>Obuka i dokumentacija kako bi se sajt održavao i dalje razvijao.</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="row gaper">
              <div className="col-12 col-lg-6">
                <div className="section__content">
                  <p className="sub-title">Stabilnost</p>
                  <h2 className="title">Šta garantujemo klijentima u Srbiji</h2>
                  <p className="primary-text">
                    Adspire tim iz Niša isporučuje rešenja koja su spremna za rast i
                    dalji razvoj. Ugrađujemo tehničke prakse koje olakšavaju održavanje i
                    jasno dokumentujemo sve bitne odluke.
                  </p>
                  <ul className="mt-3">
                    <li>Precizno definisani scope i sprint planovi.</li>
                    <li>Performanse i sigurnost usklađene sa potrebama kompanija u Srbiji.</li>
                    <li>SEO osnove koje pomažu vidljivosti u Srbiji i regionu.</li>
                    <li>Post-projektna podrška od tima koji poznaje rešenje.</li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="section__content">
                  <p className="sub-title">Sledeći koraci</p>
                  <h3 className="title">Kako da pokrenemo novi projekat</h3>
                  <p className="primary-text">
                    Popunite kratak upit i napišite nam gde se nalazite u Srbiji i koji
                    tip sajta ili web aplikacije vam je potreban. Odgovaramo sa jasnim
                    predlogom procesa i rokovima.
                  </p>
                  <div className="d-flex flex-column gap-2 mt-3">
                    <Link href="/contact-us" className="btn btn--primary">
                      Pošalji upit
                    </Link>
                    <Link href="/izrada-sajtova-nis" className="btn btn--secondary">
                      Pogledaj lokalni rad u Nišu
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default IzradaSajtovaSrbija;

export { getCommonStaticProps as getStaticProps };
