"use client";

import Image from "next/image";
import Link from "next/link";
import { PageShellV4 } from "./PageShellV4";
import { StickyCtaV4 } from "./StickyCtaV4";
import { AuroraV4 } from "./AuroraV4";
import styles from "./BookingLandingV4.module.css";
import local from "./NicheSolutionV4.module.css";
import { bookingDirect } from "@/content/site/bookingLandingPage";
import { INDUSTRY_HUB_PATH, industryPath, type IndustryPage } from "@/content/site/industries";

/**
 * One industry page. Borrows the booking landing's styles like the niche pages
 * do, so the visual language stays one system and a change lands everywhere.
 *
 * Section order follows the reading order a buyer actually uses: the answer,
 * their own day, then the four delivery layers, what the build has to respect
 * by law, what the money buys, proof, questions.
 *
 * The four layers are rendered from a fixed list rather than a loop over the
 * object, because the order is editorial — public site first because it is the
 * cheapest thing to start with, internal system last because it is the part
 * nobody knows they need until they see it written down.
 */

const LAYER_ORDER = [
  { key: "site", eyebrow: "Sloj 1", title: "Sajt", hint: "ono što vidi neko ko vas prvi put traži" },
  { key: "webApp", eyebrow: "Sloj 2", title: "Web aplikacija", hint: "ono što klijent koristi između poseta" },
  { key: "mobile", eyebrow: "Sloj 3", title: "Mobilna aplikacija", hint: "ono što se nosi u džepu, svaki dan" },
  { key: "internal", eyebrow: "Sloj 4", title: "Interni sistem", hint: "ono što niko spolja ne vidi, a drži firmu" },
] as const;

function SectionHead({
  eyebrow,
  title,
  lead,
  answer,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  /** Marks the lead as the page's quotable answer. Attribute only. */
  answer?: boolean;
}) {
  return (
    <header className={styles.head}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h2 className={styles.h2}>{title}</h2>
      {lead ? (
        <p className={styles.lead} {...(answer ? { "data-answer": true } : {})}>
          {lead}
        </p>
      ) : null}
    </header>
  );
}

function DirectLinks({ slug, place }: { slug: string; place: string }) {
  return (
    <p className={styles.direct}>
      <span className={styles.directLabel}>{bookingDirect.label}</span>
      <a className={styles.directLink} href={bookingDirect.phone.href} data-cta={`${slug}-${place}-telefon`}>
        {bookingDirect.phone.label}
      </a>
      <a
        className={styles.directLink}
        href={bookingDirect.whatsapp.href}
        target="_blank"
        rel="noreferrer noopener"
        data-cta={`${slug}-${place}-whatsapp`}
      >
        {bookingDirect.whatsapp.label}
      </a>
      <a className={styles.directLink} href={bookingDirect.viber.href} data-cta={`${slug}-${place}-viber`}>
        {bookingDirect.viber.label}
      </a>
    </p>
  );
}

export function IndustryV4({ page }: { page: IndustryPage }) {
  const inquiryHref = `/upit/brzo?usluga=${page.inquiryService}`;

  return (
    <PageShellV4
      eyebrow={page.hero.eyebrow}
      title={page.hero.title}
      intro={page.hero.lead}
      background={<AuroraV4 />}
      heroExtra={
        <div className={styles.heroExtra}>
          <div className={styles.heroActions}>
            <Link className={styles.btnPrimary} href={inquiryHref} data-cta={`${page.slug}-hero`}>
              Zatražite ponudu
            </Link>
            <a className={styles.btnGhost} href="#sta-mozemo">
              Šta možemo da uradimo
            </a>
          </div>
          <DirectLinks slug={page.slug} place="hero" />
        </div>
      }
    >
      <StickyCtaV4
        ctaLabel="Zatražite ponudu"
        ctaHref={inquiryHref}
        trackingLabel={`sticky:${industryPath(page.slug)}`}
      />

      <div className={`${styles.body} ${local.scrim}`}>
        {/* The self-contained answer goes first: this is the paragraph search
            snippets and AI assistants lift, so it must stand on its own. */}
        <section className={styles.section} data-reveal>
          <SectionHead eyebrow="Ukratko" title={page.seo.title} lead={page.summary} answer />
          <ul className={styles.checkList}>
            {page.audience.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section id="vas-dan" className={styles.section} data-reveal>
          <SectionHead
            eyebrow="Gde curi vreme"
            title="Dan u vašoj delatnosti"
            lead="Stvari koje se ponove u svakom razgovoru sa ljudima iz ovog posla. Ako se ne prepoznate ni u jednoj — sistem vam verovatno ne treba."
          />
          <ol className={styles.cards}>
            {page.dayInTheLife.map((item, i) => (
              <li key={item.title} className={styles.card}>
                <span className={styles.cardNum}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardBody}>{item.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="sta-mozemo" className={styles.section} data-reveal>
          <SectionHead
            eyebrow="Četiri sloja"
            title="Šta tačno možemo da uradimo za vas"
            lead="Isti posao može da se reši na četiri načina, i retko kome trebaju sva četiri odjednom. Kreće se od onoga što najbrže vraća uloženo."
          />
          {LAYER_ORDER.map((layer) => {
            const data = page.layers[layer.key];
            return (
              <div key={layer.key} className={styles.section} data-reveal>
                <header className={styles.head}>
                  <span className={styles.eyebrow}>
                    {layer.eyebrow} · {layer.hint}
                  </span>
                  <h3 className={styles.h2}>{layer.title}</h3>
                  <p className={styles.lead}>{data.lead}</p>
                </header>
                <ul className={styles.drivers}>
                  {data.items.map((item) => (
                    <li key={item.title} className={styles.driver}>
                      <h4 className={styles.driverTitle}>{item.title}</h4>
                      <p className={styles.driverBody}>{item.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </section>

        {page.compliance.length ? (
          <section id="obaveze" className={styles.section} data-reveal>
            <SectionHead
              eyebrow="Obaveze"
              title="Šta sistem mora da poštuje u ovoj delatnosti"
              lead="Deo posla nije izbor nego propis. Ovo se ugrađuje od početka, jer se naknadno ugrađuje skuplje."
            />
            <ul className={styles.drivers}>
              {page.compliance.map((item) => (
                <li key={item.title} className={styles.driver}>
                  <h3 className={styles.driverTitle}>{item.title}</h3>
                  <p className={styles.driverBody}>{item.body}</p>
                </li>
              ))}
            </ul>
            <p className={styles.note}>
              Ovo je opis onoga što sistem podržava, ne pravni savet. Konkretne obaveze proverite sa svojim
              knjigovođom ili pravnikom.
            </p>
          </section>
        ) : null}

        <section id="sta-placate" className={styles.section} data-reveal>
          <SectionHead eyebrow="Vrednost" title={page.value.title} lead={page.value.lead} />
          <ul className={styles.drivers}>
            {page.value.items.map((item) => (
              <li key={item.title} className={styles.driver}>
                <h3 className={styles.driverTitle}>{item.title}</h3>
                <p className={styles.driverBody}>{item.body}</p>
              </li>
            ))}
          </ul>
          <p className={styles.note}>
            Cena se određuje po obimu i ide u ponudu.{" "}
            <Link className={styles.inlineLink} href="/cena-izrade-sajta">
              Okvirni rasponi
            </Link>
            .
          </p>
        </section>

        {page.proof.length ? (
          <section id="gotovi-sistemi" className={styles.section} data-reveal>
            <SectionHead
              eyebrow="Dokaz"
              title="Sistemi koji već rade"
              lead="Živi sistemi koji mogu da se otvore — ne mokapi."
            />
            <div className={styles.proofGrid}>
              {page.proof.map((item) => (
                <article key={item.name} className={styles.proofCard}>
                  {item.image ? (
                    <div className={styles.proofShot}>
                      <Image
                        src={item.image}
                        alt={`${item.name} — snimak ekrana`}
                        fill
                        sizes="(max-width: 720px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={styles.proofImg}
                      />
                    </div>
                  ) : null}
                  <span className={styles.proofSector}>{item.sector}</span>
                  <h3 className={styles.proofName}>{item.name}</h3>
                  <p className={styles.proofNote}>{item.note}</p>
                  {item.external ? (
                    <a
                      className={styles.proofLink}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      data-cta={`${page.slug}-dokaz:${item.name}`}
                    >
                      {item.cta} <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <Link className={styles.proofLink} href={item.href} data-cta={`${page.slug}-dokaz:${item.name}`}>
                      {item.cta} <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section id="pitanja" className={styles.section} data-reveal>
          <SectionHead eyebrow="Pitanja" title="Pitanja pre odluke" />
          <div className={styles.faq}>
            {page.faq.map((item, i) => (
              <details key={item.q} className={styles.faqItem} open={i === 0}>
                <summary className={styles.faqQ}>
                  <span>{item.q}</span>
                  <span className={styles.faqMark} aria-hidden="true" />
                </summary>
                <p className={styles.faqA}>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.finalCta} data-reveal>
          <span className={styles.eyebrow}>Sledeći korak</span>
          <h2 className={styles.finalTitle}>Recite kako danas radite</h2>
          <p className={styles.finalBody}>
            Pet polja, minut posla. Odgovor stiže lično — sa procenom obima i cene, ili sa poštenim „ovo vam ne
            treba“.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.btnPrimary} href={inquiryHref} data-cta={`${page.slug}-kraj`}>
              Pošaljite upit
            </Link>
            <Link className={styles.btnGhost} href="/upit" data-cta={`${page.slug}-brief`}>
              Pun brief za ponudu
            </Link>
          </div>
          <DirectLinks slug={page.slug} place="kraj" />
          <p className={styles.reassure}>{bookingDirect.note}</p>
        </section>

        <p className={styles.related}>
          Povezano:{" "}
          {page.related.map((item, i) => (
            <span key={item.href}>
              {i > 0 && " · "}
              <Link className={styles.inlineLink} href={item.href}>
                {item.label}
              </Link>
            </span>
          ))}
        </p>

        {/* One link to the hub rather than a list of every other trade: the
            list grows past the point where it helps anyone. */}
        <p className={styles.related}>
          <Link className={styles.inlineLink} href={INDUSTRY_HUB_PATH}>
            Rešenja za sve ostale delatnosti
          </Link>
        </p>
      </div>
    </PageShellV4>
  );
}
