"use client";

import Image from "next/image";
import Link from "next/link";
import { PageShellV4 } from "./PageShellV4";
import { StickyCtaV4 } from "./StickyCtaV4";
import styles from "./BookingLandingV4.module.css";
import {
  bookingDirect,
  bookingPricing,
  bookingProcess,
  bookingProof,
  bookingSeo,
} from "@/content/site/bookingLandingPage";
import {
  bookingIndustryPages,
  bookingIndustryPath,
  type BookingIndustryPage,
} from "@/content/site/bookingIndustryPages";

/**
 * One industry booking page. Reuses the booking landing's styles and its
 * shared blocks (process, pricing, proof cards), so a change to how we work
 * or what it costs lands on every industry page at once.
 */

const INQUIRY_HREF = "/upit/brzo?usluga=sistemi-za-zakazivanje";

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
      {lead ? <p className={styles.lead} {...(answer ? { "data-answer": true } : {})}>{lead}</p> : null}
    </header>
  );
}

function DirectLinks({ slug, place }: { slug: string; place: string }) {
  return (
    <p className={styles.direct}>
      <span className={styles.directLabel}>{bookingDirect.label}</span>
      <a className={styles.directLink} href={bookingDirect.phone.href} data-cta={`zakazivanje-${slug}-${place}-telefon`}>
        {bookingDirect.phone.label}
      </a>
      <a
        className={styles.directLink}
        href={bookingDirect.whatsapp.href}
        target="_blank"
        rel="noreferrer noopener"
        data-cta={`zakazivanje-${slug}-${place}-whatsapp`}
      >
        {bookingDirect.whatsapp.label}
      </a>
      <a className={styles.directLink} href={bookingDirect.viber.href} data-cta={`zakazivanje-${slug}-${place}-viber`}>
        {bookingDirect.viber.label}
      </a>
    </p>
  );
}

export function BookingIndustryV4({ page }: { page: BookingIndustryPage }) {
  const proof = page.proof
    .map((name) => bookingProof.items.find((item) => item.name === name))
    .filter((item): item is (typeof bookingProof.items)[number] => Boolean(item));
  const others = bookingIndustryPages.filter((p) => p.slug !== page.slug);

  return (
    <PageShellV4
      eyebrow={page.hero.eyebrow}
      title={page.hero.title}
      intro={page.hero.lead}
      heroExtra={
        <div className={styles.heroExtra}>
          <div className={styles.heroActions}>
            <Link className={styles.btnPrimary} href={INQUIRY_HREF} data-cta={`zakazivanje-${page.slug}-hero`}>
              Pošaljite upit za sistem
            </Link>
            <a className={styles.btnGhost} href="#gotovi-sistemi">
              Pogledajte sistem koji radi
            </a>
          </div>
          <DirectLinks slug={page.slug} place="hero" />
        </div>
      }
    >
      <StickyCtaV4
        ctaLabel="Pošaljite upit za sistem"
        ctaHref={INQUIRY_HREF}
        trackingLabel={`sticky:${bookingIndustryPath(page.slug)}`}
      />

      <div className={styles.body}>
        {/* Short, self-contained answer first: this is the paragraph search
            snippets and AI assistants lift, so it must make sense on its own. */}
        <section className={styles.section} data-reveal>
          <SectionHead eyebrow="Ukratko" title={page.seo.title} lead={page.summary} answer />
          <ul className={styles.checkList}>
            {page.audience.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section id="dan-danas" className={styles.section} data-reveal>
          <SectionHead
            eyebrow="Pre i posle"
            title="Isti dan, dva rasporeda"
            lead="Stvari koje se ponove u svakom razgovoru sa ljudima iz ove delatnosti."
          />
          <div className={styles.contrast}>
            <div className={styles.contrastHeads} aria-hidden="true">
              <span className={styles.contrastHeadBefore}>Danas</span>
              <span className={styles.contrastHeadAfter}>Sa sistemom</span>
            </div>
            {page.pains.map((row) => (
              <div key={row.before} className={styles.contrastRow}>
                <div className={styles.before}>
                  <span className={styles.sideLabel}>Danas</span>
                  <p className={styles.sideText}>{row.before}</p>
                </div>
                <div className={styles.after}>
                  <span className={styles.sideLabel}>Sa sistemom</span>
                  <p className={styles.sideText}>{row.after}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="sta-preuzima" className={styles.section} data-reveal>
          <SectionHead
            eyebrow="Šta ulazi u sistem"
            title="Podešeno za vašu delatnost"
            lead="Osnova zakazivanja je već napisana i radi kod klijenata. Ovo je deo koji se podešava baš za vaš posao."
          />
          <ol className={styles.cards}>
            {page.features.map((item, i) => (
              <li key={item.title} className={styles.card}>
                <span className={styles.cardNum}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardBody}>{item.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {proof.length ? (
          <section id="gotovi-sistemi" className={styles.section} data-reveal>
            <SectionHead
              eyebrow="Dokaz"
              title="Sistemi koji već rade"
              lead="Živi sistemi koji mogu da se otvore — ne mokapi."
            />
            <div className={styles.proofGrid}>
              {proof.map((item) => (
                <article key={item.name} className={styles.proofCard}>
                  {"image" in item && item.image ? (
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
                  {"external" in item && item.external ? (
                    <a
                      className={styles.proofLink}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      data-cta={`zakazivanje-${page.slug}-dokaz:${item.name}`}
                    >
                      {item.cta} <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <Link
                      className={styles.proofLink}
                      href={item.href}
                      data-cta={`zakazivanje-${page.slug}-dokaz:${item.name}`}
                    >
                      {item.cta} <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section id="tok" className={styles.section} data-reveal>
          <SectionHead {...bookingProcess} />
          <ol className={styles.timeline}>
            {bookingProcess.steps.map((step) => (
              <li key={step.title} className={styles.step}>
                <span className={styles.stepWhen}>{step.when}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="cena" className={styles.section} data-reveal>
          <SectionHead {...bookingPricing} />
          <ul className={styles.drivers}>
            {bookingPricing.drivers.map((driver) => (
              <li key={driver.title} className={styles.driver}>
                <h3 className={styles.driverTitle}>{driver.title}</h3>
                <p className={styles.driverBody}>{driver.body}</p>
              </li>
            ))}
          </ul>
          <p className={styles.note}>
            {bookingPricing.note}{" "}
            <Link className={styles.inlineLink} href={bookingPricing.linkHref}>
              {bookingPricing.linkLabel}
            </Link>
            .
          </p>
        </section>

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
          <h2 className={styles.finalTitle}>Recite kako danas zakazujete termine</h2>
          <p className={styles.finalBody}>
            Pet polja, minut posla. Odgovor stiže lično — sa procenom opsega i cene, ili sa poštenim
            „ovo vam ne treba, uzmite gotovu platformu“.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.btnPrimary} href={INQUIRY_HREF} data-cta={`zakazivanje-${page.slug}-kraj`}>
              Pošaljite upit
            </Link>
            <Link className={styles.btnGhost} href={bookingSeo.path} data-cta={`zakazivanje-${page.slug}-opsti`}>
              Sve o online zakazivanju
            </Link>
          </div>
          <DirectLinks slug={page.slug} place="kraj" />
          <p className={styles.reassure}>{bookingDirect.note}</p>
        </section>

        <p className={styles.related}>
          Zakazivanje za druge delatnosti:{" "}
          {others.map((other, i) => (
            <span key={other.slug}>
              {i > 0 && " · "}
              <Link className={styles.inlineLink} href={bookingIndustryPath(other.slug)}>
                {other.navLabel}
              </Link>
            </span>
          ))}
        </p>
      </div>
    </PageShellV4>
  );
}
