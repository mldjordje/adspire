"use client";

import Image from "next/image";
import Link from "next/link";
import { PageShellV4 } from "./PageShellV4";
import { StickyCtaV4 } from "./StickyCtaV4";
import { AuroraV4 } from "./AuroraV4";
import styles from "./BookingLandingV4.module.css";
import local from "./NicheSolutionV4.module.css";
import { bookingDirect } from "@/content/site/bookingLandingPage";
import { nichePages, nichePath, type NichePage } from "@/content/site/nichePages";

/**
 * One niche solution page. Reuses the booking landing's styles so a change to
 * the visual language lands on every one of these pages at once, and keeps the
 * section order the hotel page proved: answer, what you pay for, before/after,
 * what is in it, proof, phases, questions.
 *
 * Background is the aurora shader rather than the shell's silk default: these
 * are sales landings like /upit/brzo and the booking landing, and the silk
 * reads as a library page.
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

export function NicheSolutionV4({ page }: { page: NichePage }) {
  const inquiryHref = `/upit/brzo?usluga=${page.inquiryService}`;
  const others = nichePages.filter((p) => p.slug !== page.slug);

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
            <a className={styles.btnGhost} href="#sta-placate">
              Šta tačno plaćate
            </a>
          </div>
          <DirectLinks slug={page.slug} place="hero" />
        </div>
      }
    >
      <StickyCtaV4 ctaLabel="Zatražite ponudu" ctaHref={inquiryHref} trackingLabel={`sticky:${nichePath(page.slug)}`} />

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

        <section id="dan-danas" className={styles.section} data-reveal>
          <SectionHead
            eyebrow="Pre i posle"
            title="Isti posao, dva dana"
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

        <section id="sta-ulazi" className={styles.section} data-reveal>
          <SectionHead
            eyebrow="Šta ulazi u sistem"
            title="Podešeno za vašu delatnost"
            lead="Delovi koji se ponavljaju već rade kod klijenata. Ovo je deo koji se podešava baš za vaš posao."
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

        <section id="faze" className={styles.section} data-reveal>
          <SectionHead
            eyebrow="Faze"
            title="Plaćate sistem koji vama treba"
            lead="Razvoj po meri, u dogovorenim fazama. Počinjemo od onoga što rešava najveći problem. Svaka faza ima svoj obim, cenu i rok."
          />
          <ol className={styles.timeline}>
            {page.phases.map((phase, i) => (
              <li key={phase.title} className={styles.step}>
                <span className={styles.stepWhen}>{`Faza ${i + 1}`}</span>
                <h3 className={styles.stepTitle}>{phase.title}</h3>
                <p className={styles.stepBody}>{phase.text}</p>
                <ul className={styles.checkList}>
                  {phase.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
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

        <p className={styles.related}>
          Rešenja za druge delatnosti:{" "}
          {others.map((other, i) => (
            <span key={other.slug}>
              {i > 0 && " · "}
              <Link className={styles.inlineLink} href={nichePath(other.slug)}>
                {other.navLabel}
              </Link>
            </span>
          ))}
        </p>
      </div>
    </PageShellV4>
  );
}
