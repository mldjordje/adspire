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

const IzradaSajtovaNis = () => {
  const pageTitle = "Izrada sajtova u Nišu – Adspire";
  const description =
    "Adspire je digitalna agencija iz Niša koja pruža usluge izrade web sajtova i web aplikacija firmama u Nišu i širom Srbije.";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="izrada sajtova Niš, digitalna agencija Niš, razvoj web aplikacija Niš"
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
                <p className="sub-title">Adspire • Niš</p>
                <h1 className="title">{pageTitle}</h1>
                <p className="primary-text">
                  Adspire je digitalna agencija iz Niša koja pruža usluge izrade web
                  sajtova i web aplikacija firmama u Nišu i širom Srbije. Fokusirani smo
                  na jasne procese, održive tehnologije i isporuku rešenja koja mogu da se
                  mere i nadograđuju.
                </p>
                <div className="d-flex flex-wrap gap-3 mt-4">
                  <Link href="/contact-us" className="btn btn--primary">
                    Zakaži razgovor
                  </Link>
                  <Link href="/izrada-sajtova-srbija" className="btn btn--secondary">
                    Pogledaj rad u Srbiji
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
                  <p className="sub-title">Jasan okvir</p>
                  <h2 className="title">Kako pristupamo izradi sajtova u Nišu</h2>
                  <p className="primary-text">
                    Svaki projekat počinje analizom poslovnih ciljeva i očekivanja
                    korisnika. U Nišu često radimo sa timovima koji žele modernizaciju
                    postojećeg sajta ili izradu prve web prezentacije koja jasno govori o
                    uslugama i referencama.
                  </p>
                  <ul className="mt-3">
                    <li>Planiranje informacione arhitekture i sadržaja na srpskom jeziku.</li>
                    <li>Responsive dizajn prilagođen posetiocima iz Niša i ostatka Srbije.</li>
                    <li>Izrada web aplikacija kada je potrebna napredna funkcionalnost.</li>
                    <li>SEO osnove koje pomažu da se sajt pravilno indeksira na lokalnom nivou.</li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="section__content">
                  <p className="sub-title">Proces u fazama</p>
                  <h3 className="title">Koraci koje prolazimo sa klijentima iz Niša</h3>
                  <ol className="mt-3">
                    <li>Radionica sa timom klijenta u Nišu ili onlajn, uz definisanje ciljeva.</li>
                    <li>Istraživanje tržišta u Srbiji i definisanje korisničkih tokova.</li>
                    <li>Wireframe i dizajn koji poštuje brend i potrebe lokalnog tržišta.</li>
                    <li>Razvoj web sajta ili web aplikacije uz sigurnosne i performansne smernice.</li>
                    <li>Testiranje, obuka i predaja dokumentacije na srpskom jeziku.</li>
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
                  <p className="sub-title">Rezultat</p>
                  <h2 className="title">Šta dobijaju kompanije iz Niša</h2>
                  <p className="primary-text">
                    Klijentima u Nišu isporučujemo sajtove i aplikacije koje su spremne za
                    rast. Poštujemo rokove i beležimo ključne metrike posete, generisanja
                    upita i performansi.
                  </p>
                  <ul className="mt-3">
                    <li>Jasno definisana struktura stranica i sadržaja.</li>
                    <li>Optimizovani performansi i sigurnosne prakse za tržište Srbije.</li>
                    <li>Tehnička dokumentacija i smernice za dalje održavanje.</li>
                    <li>Tim iz Niša koji je dostupan za dodatne iteracije i razvoj.</li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="section__content">
                  <p className="sub-title">Saradnja</p>
                  <h3 className="title">Kako zakazati sledeći korak</h3>
                  <p className="primary-text">
                    Ako tražite partnera za izradu sajta u Nišu, kontaktirajte nas putem
                    stranice za upit. U odgovoru ćete dobiti realan vremenski okvir i
                    predlog tehnologija koje najbolje odgovaraju vašem slučaju.
                  </p>
                  <div className="d-flex flex-column gap-2 mt-3">
                    <Link href="/contact-us" className="btn btn--primary">
                      Pošalji upit
                    </Link>
                    <Link href="/izrada-sajtova-srbija" className="btn btn--secondary">
                      Pogledaj usluge za Srbiju
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

export default IzradaSajtovaNis;

export { getCommonStaticProps as getStaticProps };
