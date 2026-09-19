"use client";

import Link from "next/link";
import { PageShellV4 } from "./PageShellV4";
import { StickyCtaV4 } from "./StickyCtaV4";
import { AuroraV4 } from "./AuroraV4";
import styles from "./BookingLandingV4.module.css";
import local from "./NicheSolutionV4.module.css";
import { bookingDirect } from "@/content/site/bookingLandingPage";
import { aeoPage as page, AEO_PATH } from "@/content/site/aeoPage";

/**
 * /da-vas-ai-preporuci.
 *
 * Same visual language as the other money pages (booking landing styles, niche
 * scrim, aurora background), so the sales surface stays one thing.
 *
 * Section order is the argument, and it front-loads the two sections that make
 * a stranger care: the thirty-second check they run in their own chat window,
 * and their own trade named in their own words. Only then does the page argue
 * why the ground moved — an owner who has just watched a competitor get named
 * does not need convincing that it did.
 *
 * The limits section sits AFTER the phases on purpose: a buyer who has not yet
 * seen what the work is reads "no guarantees" as "no product". Once they have,
 * it reads as the reason to trust the rest.
 *
 * The proof cards carry no screenshots: there is no client case study for this
 * service yet, and a stock image in a proof slot is a lie with a picture on it.
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
      <a className={styles.directLink} href={bookingDirect.phone.href} data-cta={`aeo-${place}-telefon`}>
        {bookingDirect.phone.label}
      </a>
      <a
        className={styles.directLink}
        href={bookingDirect.whatsapp.href}
        target="_blank"
        rel="noreferrer noopener"
        data-cta={`aeo-${place}-whatsapp`}
      >
        {bookingDirect.whatsapp.label}
      </a>
      <a className={styles.directLink} href={bookingDirect.viber.href} data-cta={`aeo-${place}-viber`}>
        {bookingDirect.viber.label}
      </a>
    </p>
  );
}

export function AeoVisibilityV4() {
  return (
    <PageShellV4
      eyebrow={page.hero.eyebrow}
      title={page.hero.title}
      intro={page.hero.lead}
      background={<AuroraV4 />}
      heroExtra={
        <div className={styles.heroExtra}>
          <div className={styles.heroActions}>
            <Link className={styles.btnPrimary} href={page.cta.primary.href} data-cta="aeo-hero">
              {page.cta.primary.label}
            </Link>
            <a className={styles.btnGhost} href="#delatnosti">
              Šta to znači za mene
            </a>
          </div>
          <DirectLinks place="hero" />
          <p className={styles.reassure}>{page.hero.note}</p>
          <dl className={styles.stats}>
            {page.heroStats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <dt className={styles.statValue}>{stat.value}</dt>
                <dd className={styles.statLabel}>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      }
    >
      <StickyCtaV4 ctaLabel="Pošaljite upit" ctaHref={page.cta.primary.href} trackingLabel={`sticky:${AEO_PATH}`} />

      <div className={`${styles.body} ${local.scrim}`}>
        {/* The self-contained answer goes first: this is the paragraph search
            snippets and AI assistants lift, so it must stand on its own. */}
        <section className={styles.section} data-reveal>
          <SectionHead eyebrow="Ukratko" title={page.seo.title} lead={page.summary} answer />
          <p className={styles.note}>{page.audienceHeading}</p>
          <ul className={styles.checkList}>
            {page.audience.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Hands the argument over to the reader's own chat window. Nothing on
            this page converts as hard as a search they run themselves. */}
        <section id="provera" className={styles.section} data-reveal>
          <SectionHead eyebrow="Provera" title={page.selfTest.title} lead={page.selfTest.lead} />
          <ol className={styles.cards}>
            {page.selfTest.steps.map((step, i) => (
              <li key={step.title} className={styles.card}>
                <span className={styles.cardNum}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.cardTitle}>{step.title}</h3>
                <p className={styles.cardBody}>{step.body}</p>
              </li>
            ))}
          </ol>
          <p className={styles.verdict}>{page.selfTest.verdict}</p>
        </section>

        {/* The conversion section: a buyer recognises their own sentence here
            or they leave. Everything above exists to get them to this list. */}
        <section id="delatnosti" className={styles.section} data-reveal>
          <SectionHead eyebrow="Po delatnostima" title={page.niches.title} lead={page.niches.lead} />
          <ol className={styles.cards}>
            {page.niches.items.map((item, i) => (
              <li key={item.trade} className={styles.card}>
                <span className={styles.cardNum}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.cardTitle}>{item.trade}</h3>
                <p className={styles.cardBody}>
                  <strong>{item.question}</strong>
                </p>
                <p className={styles.cardBody}>{item.gain}</p>
              </li>
            ))}
          </ol>
          <p className={styles.note}>
            Niste na spisku? Princip je isti za svaku delatnost u kojoj kupac bira pitanjem „koga da zovem“.{" "}
            <Link className={styles.inlineLink} href={page.cta.primary.href} data-cta="aeo-delatnosti">
              Napišite čime se bavite
            </Link>
            .
          </p>
        </section>

        <section id="zasto-sad" className={styles.section} data-reveal>
          <SectionHead eyebrow="Zašto sad" title={page.shift.title} lead={page.shift.lead} />
          <Cards items={page.shift.items} />
        </section>

        <section id="sta-dobijate" className={styles.section} data-reveal>
          <SectionHead eyebrow="Vrednost" title={page.value.title} lead={page.value.lead} />
          <Cards items={page.value.items} />
          <p className={styles.note}>Cena se određuje po obimu i ide u ponudu, posle besplatnog pregleda.</p>
        </section>

        <section id="pre-i-posle" className={styles.section} data-reveal>
          <SectionHead
            eyebrow="Pre i posle"
            title="Ista firma, dva ishoda"
            lead="Stvari koje se ponove u svakom razgovoru sa vlasnikom koji radi dobar posao, a niko za njega ne zna."
          />
          <div className={styles.contrast}>
            <div className={styles.contrastHeads} aria-hidden="true">
              <span className={styles.contrastHeadBefore}>Danas</span>
              <span className={styles.contrastHeadAfter}>Posle</span>
            </div>
            {page.pains.map((row) => (
              <div key={row.before} className={styles.contrastRow}>
                <div className={styles.before}>
                  <span className={styles.sideLabel}>Danas</span>
                  <p className={styles.sideText}>{row.before}</p>
                </div>
                <div className={styles.after}>
                  <span className={styles.sideLabel}>Posle</span>
                  <p className={styles.sideText}>{row.after}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="faze" className={styles.section} data-reveal>
          <SectionHead
            eyebrow="Faze"
            title="Kako teče posao"
            lead="Tri faze, svaka sa svojim obimom, cenom i rokom. Posle prve možete da stanete — i ponekad je to tačan savet."
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

        {/* After the phases, never before them. */}
        <section id="granice" className={styles.section} data-reveal>
          <SectionHead eyebrow="Pošteno" title={page.honesty.title} lead={page.honesty.lead} />
          <ul className={styles.mistakes}>
            {page.honesty.items.map((item) => (
              <li key={item.title} className={styles.mistake}>
                <h3 className={styles.mistakeTitle}>{item.title}</h3>
                <p className={styles.mistakeBody}>{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="dokaz" className={styles.section} data-reveal>
          <SectionHead eyebrow="Dokaz" title={page.proof.title} lead={page.proof.lead} />
          <div className={styles.proofGrid}>
            {page.proof.items.map((item) => (
              <article key={item.name} className={styles.proofCard}>
                <span className={styles.proofSector}>{item.sector}</span>
                <h3 className={styles.proofName}>{item.name}</h3>
                <p className={styles.proofNote}>{item.note}</p>
                <Link className={styles.proofLink} href={item.href} data-cta={`aeo-dokaz:${item.name}`}>
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
            <Link className={styles.btnPrimary} href={page.cta.primary.href} data-cta="aeo-kraj">
              {page.cta.primary.label}
            </Link>
            <Link className={styles.btnGhost} href={page.cta.secondary.href} data-cta="aeo-brief">
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
