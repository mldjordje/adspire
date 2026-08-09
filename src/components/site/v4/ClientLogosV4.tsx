import Image from "next/image";
import type { LocaleCode } from "@/lib/site-config";
import styles from "./ClientLogosV4.module.css";

type Client = {
  name: string;
  href?: string;
  logo?: string;
  /** White artwork on a transparent or dark source should not be inverted. */
  direct?: boolean;
  /** Compensates for generous whitespace in a source brand file. */
  zoom?: boolean;
  kind?: string;
};

/**
 * Only authentic brand assets sourced from live client websites are used.
 * When a project has no public logo, its typographic mark is deliberate:
 * never fabricate a client identity or substitute a template logo.
 */
const CLIENTS: Client[] = [
  { name: "Dr Igić", href: "https://drigic.rs", logo: "/images/clients/dr-igic-authentic.png", direct: true },
  { name: "Prevoz Kop", href: "https://prevozkop.rs", logo: "/images/clients/prevoz-kop-authentic.webp" },
  { name: "Doctor Barber", href: "https://doctorbarber.rs", logo: "/images/clients/doctor-barber-authentic.png", direct: true, zoom: true },
  { name: "TeachFromHome", href: "https://teachfromhome.app", logo: "/images/clients/teach-from-home-authentic.jpg", direct: true },
  { name: "Toza AI", href: "https://toza-ai.rs", logo: "/images/clients/toza-ai.svg", direct: true },
  { name: "Dropz Tattoo", href: "https://dropz.rs", logo: "/images/clients/dropz.svg" },
  { name: "Eduka / DentalX", href: "https://eduka.co.rs", logo: "/images/clients/eduka-authentic.png", zoom: true },
  { name: "Auto Delić", href: "https://autodelic.com", logo: "/images/clients/auto-delic-authentic.png", direct: true, zoom: true },
  { name: "Hidromont Jovančić", href: "https://hidromontjovancic.rs", logo: "/images/clients/hidromont-authentic.jpg", zoom: true },
  { name: "Kopex MIN", href: "https://kopexmin.rs", logo: "/images/clients/kopex-min-authentic.png" },
  { name: "Salon Srđan", href: "https://frizerskisalonsrdjan.com", logo: "/images/clients/salon-srdjan-authentic.png", zoom: true },
  { name: "ProTruck", href: "https://protruck.rs", logo: "/images/clients/protruck-authentic.png", direct: true, zoom: true },
  // The production domain is currently offline, so this remains evidence in
  // the project grid without sending visitors to a broken external URL.
  { name: "Restoran Madera", kind: "Hospitality platform" },
  { name: "Santos & Santorini", href: "https://santos.rs", logo: "/images/clients/santos-dark-authentic.png", direct: true },
  { name: "ML Group", href: "https://mlgroup.rs", logo: "/images/clients/ml-group-authentic.png", direct: true, zoom: true },
  { name: "Mergentheim Demo Hub", kind: "12 connected landing experiences" },
];

const COPY: Record<LocaleCode, { eyebrow: string; title: string; linkLabel: string }> = {
  sr: {
    eyebrow: "Odabrani sistemi",
    title: "Produkcija, ne portfolio dekoracija.",
    linkLabel: "Posetite sajt klijenta",
  },
  en: {
    eyebrow: "Selected systems",
    title: "Production work, not portfolio decoration.",
    linkLabel: "Visit the client website",
  },
  de: {
    eyebrow: "Ausgewählte Systeme",
    title: "Produktionsarbeit statt Portfolio-Dekoration.",
    linkLabel: "Website des Kunden besuchen",
  },
};

export function ClientLogosV4({ locale = "sr" }: { locale?: LocaleCode }) {
  const copy = COPY[locale];

  return (
    <section className={styles.section} aria-labelledby="client-logos-title">
      <div className={styles.heading}>
        <p className={styles.eyebrow}>{copy.eyebrow}</p>
        <h2 id="client-logos-title" className={styles.title}>{copy.title}</h2>
      </div>
      <div className={styles.grid}>
        {CLIENTS.map((client, index) => {
          const content = (
            <>
              <span className={styles.index} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.logoFrame}>
                {client.logo ? (
                  <Image
                    className={[
                      styles.logo,
                      client.direct ? styles.logoDirect : "",
                      client.zoom ? styles.logoZoom : "",
                    ].filter(Boolean).join(" ")}
                    src={client.logo}
                    alt={client.name}
                    fill
                    sizes="(max-width: 700px) 50vw, 25vw"
                    loading="lazy"
                  />
                ) : (
                  <span className={styles.wordmark} aria-hidden="true">{client.name}</span>
                )}
              </span>
              <span className={styles.meta}>
                <span className={styles.name}>{client.name}</span>
                {client.kind ? <span className={styles.kind}>{client.kind}</span> : null}
              </span>
            </>
          );

          return client.href ? (
            <a
              key={client.name}
              className={styles.client}
              href={client.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${copy.linkLabel}: ${client.name}`}
            >
              {content}
            </a>
          ) : (
            <article key={client.name} className={`${styles.client} ${styles.project}`}>
              {content}
            </article>
          );
        })}
      </div>
    </section>
  );
}
