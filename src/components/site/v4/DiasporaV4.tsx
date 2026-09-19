"use client";

import Image from "next/image";
import Link from "next/link";
import { PageShellV4 } from "./PageShellV4";
import { StickyCtaV4 } from "./StickyCtaV4";
import { AuroraV4 } from "./AuroraV4";
import styles from "./BookingLandingV4.module.css";
import local from "./NicheSolutionV4.module.css";
import { bookingDirect } from "@/content/site/bookingLandingPage";
import { diasporaPage as page, DIASPORA_PATH } from "@/content/site/diasporaPage";

/**
 * /za-nase-ljude-u-dijaspori.
 *
 * Reuses the booking landing's styles and the niche pages' scrim so the whole
 * sales surface stays one visual language, and carries the aurora shader like
 * the other money pages.
 *
 * Section order is the argument, not a layout preference: the answer, then why
 * it costs less, then the hours table, then what is NOT cheaper, then how the
 * money moves. A price that arrives before its reason reads as a warning.
 */

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

function Cards({ items }: { items: readonly { title: string; body: string }[] }) {
  return (
    <ul className={styles.drivers}>
      {items.map((item) => (
        <li key={item.title} className={styles.driver}>
          <h3 className={styles.driverTitle}>{item.title}</h3>
          <p className={styles.driverBody}>{item.body}</p>
        </li>
      ))}
    </ul>
  );
}

function DirectLinks({ place }: { place: string }) {
  return (
    <p className={styles.direct}>
      <span className={styles.directLabel}>{bookingDirect.label}</span>
      <a className={styles.directLink} href={bookingDirect.phone.href} data-cta={`dijaspora-${place}-telefon`}>
        {bookingDirect.phone.label}
      </a>
      <a
        className={styles.directLink}
        href={bookingDirect.whatsapp.href}
        target="_blank"
        rel="noreferrer noopener"
        data-cta={`dijaspora-${place}-whatsapp`}
      >
        {bookingDirect.whatsapp.label}
      </a>
      <a className={styles.directLink} href={bookingDirect.viber.href} data-cta={`dijaspora-${place}-viber`}>
        {bookingDirect.viber.label}
      </a>
    </p>
  );
}

export function DiasporaV4() {
  return (
    <PageShellV4
      eyebrow={page.hero.eyebrow}
      title={page.hero.title}
      intro={page.hero.lead}
      background={<AuroraV4 />}
      heroExtra={
        <div className={styles.heroExtra}>
          <div className={styles.heroActions}>
            <Link className={styles.btnPrimary} href={page.cta.primary.href} data-cta="dijaspora-hero">
              {page.cta.primary.label}
            </Link>
            <a className={styles.btnGhost} href="#cena">
              Koliko košta
            </a>
          </div>
          <DirectLinks place="hero" />
        </div>
      }
    >
      <StickyCtaV4
        ctaLabel="Pošaljite upit"
        ctaHref={page.cta.primary.href}
        trackingLabel={`sticky:${DIASPORA_PATH}`}
      />

      <div className={`${styles.body} ${local.scrim}`}>
        <section className={styles.section} data-reveal>
          <SectionHead eyebrow="Ukratko" title={page.seo.title} lead={page.summary} answer />
          <p className={styles.note}>{page.audienceHeading}</p>
          <ul className={styles.checkList}>
            {page.audience.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Before the number, never after it. */}
        <section id="zasto-manje" className={styles.section} data-reveal>
          <SectionHead eyebrow="Razlika u ceni" title={page.whyCheaper.title} lead={page.whyCheaper.lead} />
          <Cards items={page.whyCheaper.items} />
        </section>

        <section id="cena" className={styles.section} data-reveal>
          <SectionHead eyebrow="Cena" title={page.math.title} lead={page.math.lead} />
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col" className={styles.thLabel}>
                    Posao
                  </th>
                  <th scope="col">Obim rada</th>
                  <th scope="col" className={styles.thOurs}>
                    Kod nas
                  </th>
                </tr>
              </thead>
              <tbody>
                {page.math.rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{row.hours}</td>
                    <td className={styles.tdOurs}>{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.note}>
            {page.math.note}{" "}
            <Link className={styles.inlineLink} href="/cena-izrade-sajta">
              Svi rasponi po tipu projekta
            </Link>
            .
          </p>
        </section>

        <section id="sta-nije-jeftinije" className={styles.section} data-reveal>
          <SectionHead eyebrow="Pošteno" title={page.notCheaper.title} lead={page.notCheaper.lead} />
          <Cards items={page.notCheaper.items} />
        </section>

        <section id="placanje" className={styles.section} data-reveal>
          <SectionHead eyebrow="Plaćanje" title={page.how.title} lead={page.how.lead} />
          <Cards items={page.how.items} />
          <p className={styles.note}>
            Detaljno o ugovoru, podacima i predaji:{" "}
            <Link className={styles.inlineLink} href="/saradnja-iz-srbije-kako-funkcionise">
              kako izgleda saradnja sa firmom iz Srbije
            </Link>
            .
          </p>
        </section>

        <section id="zemlje" className={styles.section} data-reveal>
          <SectionHead eyebrow="Gde radimo" title={page.countriesHeading} lead={page.countriesLead} />
          <ol className={styles.cards}>
            {page.countries.map((country, i) => (
              <li key={country.name} className={styles.card}>
                <span className={styles.cardNum}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.cardTitle}>{country.name}</h3>
                <p className={styles.cardBody}>
                  <strong>{country.taxIdLabel}</strong> — {country.note}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section id="dokaz" className={styles.section} data-reveal>
          <SectionHead eyebrow="Dokaz" title={page.proofHeading} lead={page.proofLead} />
          <div className={styles.proofGrid}>
            {page.proof.map((item) => (
              <article key={item.name} className={styles.proofCard}>
                <div className={styles.proofShot}>
                  <Image
                    src={item.image}
                    alt={`${item.name} — snimak ekrana`}
                    fill
                    sizes="(max-width: 720px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.proofImg}
                  />
                </div>
                <span className={styles.proofSector}>{item.sector}</span>
                <h3 className={styles.proofName}>{item.name}</h3>
                <p className={styles.proofNote}>{item.note}</p>
                <Link className={styles.proofLink} href={item.href} data-cta={`dijaspora-dokaz:${item.name}`}>
                  {item.cta} <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section id="pitanja" className={styles.section} data-reveal>
          <SectionHead eyebrow="Pitanja" title={page.faqHeading} />
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
          <h2 className={styles.finalTitle}>{page.cta.title}</h2>
          <p className={styles.finalBody}>{page.cta.body}</p>
          <div className={styles.heroActions}>
            <Link className={styles.btnPrimary} href={page.cta.primary.href} data-cta="dijaspora-kraj">
              {page.cta.primary.label}
            </Link>
            <Link className={styles.btnGhost} href={page.cta.secondary.href} data-cta="dijaspora-brief">
              {page.cta.secondary.label}
            </Link>
          </div>
          <DirectLinks place="kraj" />
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
      </div>
    </PageShellV4>
  );
}
