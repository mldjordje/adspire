import type { Metadata } from "next";
import Link from "next/link";

import { PageShellV4 } from "@/components/site/v4/PageShellV4";
import { PortalLoginV4 } from "@/components/site/v4/PortalLoginV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import flow from "@/components/site/v4/InquiryFlowV4.module.css";
import styles from "@/components/site/v4/EducationV4.module.css";
import { isDatabaseConfigured } from "@/lib/db";
import { formatHours } from "@/lib/education/format";
import { listBuyerOrders } from "@/lib/education/orders";
import {
  EDU_PACKAGES,
  EDUCATION_INQUIRY_HREF,
  findPackage,
  formatEur,
  ORDER_PATH,
  packageOrderHref,
  pricePerHour,
  type EduPackage,
} from "@/lib/education/packages";
import { isGoogleLoginConfigured } from "@/lib/portal/google";
import { getPortalSession, isPortalConfigured } from "@/lib/portal/session";

import { placeOrderAction } from "./actions";

/**
 * /edukacija/porudzbina — the buy step the education landing used to be missing.
 *
 * Before this, every package button on /edukacija went to the generic project
 * brief, the same form someone uses to ask for a web shop. Edukacija is a
 * product with a public price: the buyer picks a package, signs in with Google
 * (or a mail link), confirms, and lands on their own dashboard. Payment is
 * still handled personally — the order says what was bought, /os credits the
 * hours when the money arrives.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Porudžbina — AI edukacija",
  description: "Izaberi paket sati, uloguj se i termine biraš sam na svom nalogu.",
  robots: { index: false, follow: false },
};

const ERRORS: Record<string, string> = {
  paket: "Izaberi jedan od paketa ispod.",
  package: "Taj paket ne postoji. Izaberi jedan od ponuđenih.",
  duplicate:
    "Već imaš porudžbinu koja čeka uplatu. Instrukcije su ti stigle na mejl — odgovori na taj mejl ako treba izmena.",
};

type Props = { searchParams: Promise<{ paket?: string; greska?: string }> };

function PackageSummary({ pkg, selected }: { pkg: EduPackage; selected: boolean }) {
  return (
    <div className={`${styles.package} ${selected ? styles.packageFeatured : ""}`}>
      <p className={styles.label}>{pkg.label}</p>
      <p className={styles.value}>{formatEur(pkg.priceEur)}</p>
      <p className={styles.itemTitle}>
        {pkg.hours} sati · {formatEur(pricePerHour(pkg))}/h
      </p>
      <p className={styles.muted}>{pkg.note}</p>
      {selected ? (
        <p className={styles.muted} style={{ marginTop: 8 }}>
          Izabrano ✓
        </p>
      ) : (
        <Link className={styles.packageCta} href={packageOrderHref(pkg)} data-cta={`porudzbina-paket-${pkg.id}`} data-cursor="on">
          Izaberi ovaj →
        </Link>
      )}
    </div>
  );
}

export default async function PorudzbinaPage({ searchParams }: Props) {
  const { paket, greska } = await searchParams;
  const pkg = findPackage(paket);
  const next = `${ORDER_PATH}${pkg ? `?paket=${pkg.id}` : ""}`;

  const ready = isDatabaseConfigured() && isPortalConfigured();
  const session = ready ? await getPortalSession() : null;

  // A missing 014 migration must read as "no orders yet", not as a stack trace.
  const orders = session
    ? await listBuyerOrders(session.userId).catch((error) => {
        console.error("edu_orders_read_failed", { error });
        return [];
      })
    : [];
  const pending = orders.find((o) => o.status === "nova") ?? null;

  return (
    <div className={v4FontClass}>
      <PageShellV4
        eyebrow="AI edukacija"
        title={<>Porudžbina</>}
        intro={
          pkg
            ? `Paket ${pkg.label}: ${pkg.hours} sati za ${formatEur(pkg.priceEur)}. Potvrdi porudžbinu i termine biraš sam na nalogu.`
            : "Izaberi paket sati. Posle potvrde termine biraš sam na svom nalogu."
        }
        navCtaHref="/edukacija"
        navCtaLabel="O edukaciji"
      >
        <section className={flow.wrap} data-reveal>
          <div className={styles.stack}>
            {greska ? <p className={flow.error}>{ERRORS[greska] ?? "Nešto nije prošlo. Pokušaj ponovo."}</p> : null}

            {/* Step 1 — the package */}
            <div className={styles.panel}>
              <div className={styles.panelHead}>
                <h2 className={styles.title}>1. Paket</h2>
                <Link className={styles.packageCta} href="/edukacija#program" data-cursor="on">
                  Šta se uči →
                </Link>
              </div>
              <div className={styles.packages}>
                {EDU_PACKAGES.map((p) => (
                  <PackageSummary key={p.id} pkg={p} selected={pkg?.id === p.id} />
                ))}
              </div>
              <p className={styles.muted} style={{ marginTop: 12 }}>
                Sati ne ističu. Termin traje 1–4 sata, a otkazivanje do 24h pre početka vraća sate na
                stanje.
              </p>
            </div>

            {/* Step 2 — who you are */}
            {!ready ? (
              <div className={styles.panel}>
                <h2 className={styles.title}>2. Javi se</h2>
                <p className={styles.muted} style={{ marginTop: 10 }}>
                  Nalozi trenutno nisu dostupni. Pošalji kratku poruku i javljam se lično sa
                  instrukcijama.
                </p>
                <Link className={styles.packageCta} href={EDUCATION_INQUIRY_HREF} data-cursor="on">
                  Pošalji poruku →
                </Link>
              </div>
            ) : !session ? (
              <div className={styles.panel}>
                <h2 className={styles.title}>2. Uloguj se</h2>
                <p className={styles.muted} style={{ marginTop: 10 }}>
                  Nalog je mesto gde stoje tvoji sati i kalendar termina. Uđi Google nalogom — bez
                  lozinke, bez registracije.
                </p>
                <PortalLoginV4 next={next} google={isGoogleLoginConfigured()} />
              </div>
            ) : pending ? (
              <div className={styles.panel}>
                <h2 className={styles.title}>Porudžbina je primljena</h2>
                <p className={styles.muted} style={{ marginTop: 10 }}>
                  Paket {pending.packageId} · {formatHours(pending.hours)} ·{" "}
                  {formatEur(pending.priceEur)} — poručeno {pending.createdAt}. Javljam se lično sa
                  predračunom; čim uplata legne, sati se pojave na nalogu.
                </p>
                <div className={flow.sentActions}>
                  <Link className={flow.submit} href="/nalog/edukacija" data-cursor="on">
                    Otvori nalog
                  </Link>
                  <Link className={flow.ghost} href="/edukacija" data-cursor="on">
                    Nazad na edukaciju
                  </Link>
                </div>
              </div>
            ) : (
              <div className={styles.panel}>
                <h2 className={styles.title}>2. Potvrdi</h2>
                <p className={styles.muted} style={{ marginTop: 10 }}>
                  Prijavljen si kao {session.email}. Potvrda nije uplata — javljam se lično sa
                  predračunom i dogovorom o temama.
                </p>
                <form action={placeOrderAction} className={flow.formInner} data-form="edu-porudzbina">
                  <input type="hidden" name="paket" value={pkg?.id ?? ""} />

                  {!pkg ? (
                    <p className={flow.error}>Izaberi paket iznad da bi nastavio.</p>
                  ) : null}

                  <label className={flow.field}>
                    <span>Ime i prezime</span>
                    <input name="ime" autoComplete="name" placeholder="npr. Marko Marković" />
                  </label>

                  <label className={flow.field}>
                    <span>Telefon (nije obavezno)</span>
                    <input name="telefon" autoComplete="tel" placeholder="060 000 0000" />
                    <em className={flow.hint}>Ako ti je brže da se čujemo nego da se dopisujemo.</em>
                  </label>

                  <label className={flow.field}>
                    <span>Šta želiš da naučiš?</span>
                    <textarea
                      name="cilj"
                      rows={4}
                      placeholder="npr. Imam mali online shop i hoću da AI piše opise proizvoda i odgovara na poruke."
                    />
                    <em className={flow.hint}>
                      Par rečenica je dovoljno — od toga pravim plan za prvi termin.
                    </em>
                  </label>

                  <div className={flow.actions}>
                    <button
                      className={flow.submit}
                      type="submit"
                      disabled={!pkg}
                      data-cta="porudzbina-potvrdi"
                      data-cursor="on"
                    >
                      Poruči paket{pkg ? ` ${pkg.label} — ${formatEur(pkg.priceEur)}` : ""}
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className={flow.sentActions}>
              <Link className={flow.ghost} href="/edukacija" data-cursor="on">
                Sve o edukaciji
              </Link>
              <Link className={flow.ghost} href={EDUCATION_INQUIRY_HREF} data-cursor="on">
                Treba mi plan za tim
              </Link>
            </div>
          </div>
        </section>
      </PageShellV4>
    </div>
  );
}
