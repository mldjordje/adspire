"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

import {
  captureFirstTouch,
  createRequestId,
  getSubmissionAttribution,
} from "@/lib/crm/clientAttribution";
import { trackLeadSubmitted } from "@/lib/analytics/events";
import { COUNTRIES, DEFAULT_COUNTRY } from "@/lib/inquiries/countries";
import { clearDraft, readDraft, saveDraft } from "@/lib/inquiries/draft";
import type { InquiryService } from "@/lib/inquiries/catalog";
import {
  BUYER_TYPE_LABEL,
  BUYER_TYPES,
  isSerbia,
  MAX_SERVICES,
  MIN,
  TIMEFRAMES,
  type BuyerType,
  type Timeframe,
} from "@/lib/inquiries/types";
import styles from "./InquiryFlowV4.module.css";

/**
 * The brief that starts a job — the form behind /upit and /upit/[slug].
 *
 * NO ACCOUNT IS REQUIRED, anywhere in this flow. The buyer sends the brief and
 * gets a private status link by mail; making an account later is an upgrade
 * that gathers several upiti under one login. A signed-in buyer sees the same
 * form, with the fields we already know filled in.
 *
 * WHY BUDGET IS OPTIONAL. Someone asking for a web shop usually cannot estimate
 * one, and a required number is how that brief gets abandoned rather than sent.
 * Blank is a question for the first call.
 *
 * WHY TIMEFRAME IS A SELECT. "Kada ti treba" typed free-form comes back as "što
 * pre" and cannot be scheduled against. Four buckets can.
 */

type KnownBuyer = {
  email: string;
  fullName: string | null;
  phone: string | null;
};

const TIMEFRAME_OPTIONS: Record<Timeframe, string> = {
  asap: "Što pre — hitno mi je",
  "1-3m": "U naredna 1–3 meseca",
  "3-6m": "U narednih 3–6 meseci",
  flex: "Nije hitno / fleksibilno",
};

const EMPTY = {
  buyerType: "individual" as BuyerType,
  fullName: "",
  email: "",
  phone: "",
  country: DEFAULT_COUNTRY,
  companyName: "",
  pib: "",
  mb: "",
  address: "",
  city: "",
  businessName: "",
  businessDescription: "",
  idea: "",
  wishes: "",
  timeframe: "" as "" | Timeframe,
  budgetEur: "",
};

type FormState = typeof EMPTY;
type FieldKey = keyof Omit<FormState, "buyerType">;

/** The order errors are walked in on submit, so the page scrolls to the first
 *  problem rather than an arbitrary one. */
const FIELD_ORDER: FieldKey[] = [
  "fullName",
  "email",
  "country",
  "companyName",
  "pib",
  "mb",
  "address",
  "city",
  "businessName",
  "businessDescription",
  "idea",
  "timeframe",
  "budgetEur",
];

/** Mirrors the server rules in src/lib/inquiries/validation.ts. Kept beside the
 *  form so the buyer is told before sending, never after. */
function validate(form: FormState): Partial<Record<FieldKey, string>> {
  const errors: Partial<Record<FieldKey, string>> = {};

  if (form.fullName.trim().length < MIN.fullName) errors.fullName = "Upiši ime i prezime.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
    errors.email = "Upiši ispravnu email adresu.";
  }
  if (!form.country.trim()) errors.country = "Izaberi državu.";

  if (form.buyerType === "company") {
    if (form.companyName.trim().length < 2) errors.companyName = "Upiši pun naziv firme.";
    if (form.address.trim().length < 2) errors.address = "Upiši adresu.";
    if (form.city.trim().length < 2) errors.city = "Upiši grad.";
    // PIB and matični broj come from the Serbian register, so a company abroad
    // is not held up by a format it cannot meet.
    if (isSerbia(form.country)) {
      if (!/^\d{9}$/.test(form.pib.trim())) errors.pib = "PIB mora imati 9 cifara.";
      if (!/^\d{8}$/.test(form.mb.trim())) errors.mb = "Matični broj mora imati 8 cifara.";
    }
  }

  if (form.businessName.trim().length < MIN.businessName) {
    errors.businessName = "Upiši naziv biznisa.";
  }
  if (form.businessDescription.trim().length < MIN.businessDescription) {
    errors.businessDescription = `Opiši biznis u bar ${MIN.businessDescription} karaktera.`;
  }
  if (form.idea.trim().length < MIN.idea) {
    errors.idea = `Opiši šta ti treba u bar ${MIN.idea} karaktera.`;
  }
  if (!form.timeframe) errors.timeframe = "Izaberi vreme isporuke.";

  // Blank is the documented answer, not an omission.
  if (form.budgetEur.trim()) {
    const budget = Number(form.budgetEur);
    if (!Number.isFinite(budget) || budget <= 0) {
      errors.budgetEur = "Budžet mora biti broj veći od nule, ili ostavi prazno.";
    }
  }

  return errors;
}

const digitsOnly = (value: string) => value.replace(/\D/g, "");

export function InquiryFlowV4({
  services,
  initialSlugs = [],
  buyer = null,
}: {
  services: InquiryService[];
  initialSlugs?: string[];
  /** Filled in when the buyer happens to be signed in. Never required. */
  buyer?: KnownBuyer | null;
}) {
  const [selected, setSelected] = useState<string[]>(() =>
    initialSlugs.filter((slug) => services.some((item) => item.slug === slug)).slice(0, MAX_SERVICES),
  );
  const [form, setForm] = useState<FormState>(() => ({
    ...EMPTY,
    fullName: buyer?.fullName ?? "",
    email: buyer?.email ?? "",
    phone: buyer?.phone ?? "",
  }));
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [showAll, setShowAll] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<{ reference: string; statusPath: string } | null>(null);
  const [query, setQuery] = useState("");
  const [restored, setRestored] = useState(false);

  const requestIdRef = useRef<string>("");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const fieldRefs = useRef<Partial<Record<FieldKey, HTMLElement | null>>>({});
  const servicesRef = useRef<HTMLFieldSetElement>(null);

  useEffect(() => {
    captureFirstTouch();
    requestIdRef.current = createRequestId();

    // Bring back whatever was typed last time. A slug in the URL still wins —
    // someone who just clicked "Zatraži ponudu" on a service page means that one.
    const draft = readDraft<FormState>();
    if (!draft) return;
    setForm((current) => ({
      ...draft.form,
      // A signed-in buyer's own details are fresher than a draft's.
      fullName: buyer?.fullName ?? draft.form.fullName ?? current.fullName,
      email: buyer?.email ?? draft.form.email ?? current.email,
      phone: buyer?.phone ?? draft.form.phone ?? current.phone,
    }));
    setSelected((current) => {
      const merged = [...current, ...(draft.services ?? [])].filter(
        (slug, index, all) =>
          all.indexOf(slug) === index && services.some((item) => item.slug === slug),
      );
      return merged.slice(0, MAX_SERVICES);
    });
    setRestored(true);
    // Mount only: a draft is restored once, never over live typing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Every keystroke is kept locally, so a closed tab does not cost the buyer
  // ten minutes of writing. Nothing leaves the browser until they press send.
  useEffect(() => {
    if (sent) return;
    const id = window.setTimeout(() => saveDraft(selected, form), 400);
    return () => window.clearTimeout(id);
  }, [form, selected, sent]);

  const errors = useMemo(() => validate(form), [form]);
  const domestic = isSerbia(form.country);
  const noService = selected.length === 0;

  // Counts what is actually required of *this* buyer: a foreign company is
  // asked for two fewer things than a Serbian one, so a fixed total would stick
  // below 100% for someone who has finished. Budget is excluded — it is
  // optional, and a bar that never fills is worse than no bar.
  const required = (form.buyerType === "company" ? (domestic ? 11 : 9) : 7) + 1;
  const outstanding =
    FIELD_ORDER.filter((key) => key !== "budgetEur" && errors[key]).length + (noService ? 1 : 0);
  const progress = Math.max(0, Math.round(((required - outstanding) / required) * 100));

  /** In the order the buyer picked them, which is the order they are quoted in. */
  const chosen = selected
    .map((slug) => services.find((item) => item.slug === slug))
    .filter((item): item is InquiryService => Boolean(item));

  // Fifteen services is a wall to read through. A search narrows it, and an
  // already-picked service always stays visible so it can be unpicked.
  const needle = query.trim().toLowerCase();
  const visibleServices = needle
    ? services.filter(
        (service) =>
          selected.includes(service.slug) ||
          `${service.title} ${service.summary} ${service.bullets.join(" ")}`
            .toLowerCase()
            .includes(needle),
      )
    : services;

  const toggleService = (slug: string) =>
    setSelected((current) =>
      current.includes(slug)
        ? current.filter((item) => item !== slug)
        : current.length >= MAX_SERVICES
          ? current
          : [...current, slug],
    );

  function resetDraft() {
    clearDraft();
    setForm({
      ...EMPTY,
      fullName: buyer?.fullName ?? "",
      email: buyer?.email ?? "",
      phone: buyer?.phone ?? "",
    });
    setSelected(initialSlugs.filter((slug) => services.some((item) => item.slug === slug)));
    setTouched({});
    setShowAll(false);
    setRestored(false);
  }

  const set =
    (key: FieldKey, transform?: (value: string) => string) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = transform ? transform(event.target.value) : event.target.value;
      setForm((current) => ({ ...current, [key]: value }));
    };

  const blur = (key: FieldKey) => () => setTouched((current) => ({ ...current, [key]: true }));

  /** An error only shows once the buyer has left the field, or once they have
   *  tried to send — nagging while someone types the first word is what makes a
   *  form feel hostile. */
  const errorFor = (key: FieldKey) => (showAll || touched[key] ? errors[key] : undefined);

  const fieldProps = (key: FieldKey) => ({
    onBlur: blur(key),
    "aria-invalid": errorFor(key) ? true : undefined,
    ref: (node: HTMLElement | null) => {
      fieldRefs.current[key] = node;
    },
  });

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (noService) {
      setShowAll(true);
      servicesRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const problems = validate(form);
    if (Object.keys(problems).length > 0 || !consent) {
      setShowAll(true);
      const first = FIELD_ORDER.find((key) => problems[key]);
      const node = first ? fieldRefs.current[first] : null;
      node?.scrollIntoView({ behavior: "smooth", block: "center" });
      node?.focus?.({ preventScroll: true });
      if (!first && !consent) setError("Potvrdi saglasnost da bismo mogli da ti odgovorimo.");
      return;
    }

    setBusy(true);
    try {
      const response = await fetch("/api/upit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          services: selected,
          // Blank stays blank all the way to a NULL column rather than becoming
          // a zero that reads as "this buyer has no money".
          budgetEur: form.budgetEur.trim() ? Number(form.budgetEur) : null,
          consent: true,
          website: honeypotRef.current?.value ?? "",
          requestId: requestIdRef.current || createRequestId(),
          attribution: getSubmissionAttribution(),
        }),
      });
      const data = (await response.json()) as {
        reference?: string;
        statusPath?: string;
        message?: string;
      };
      if (!response.ok || !data.reference || !data.statusPath) {
        setError(data.message ?? "Slanje nije uspelo. Pokušaj ponovo.");
        return;
      }
      trackLeadSubmitted({
        source: "inquiry",
        service: selected.join(","),
        requestId: data.reference,
      });
      setSent({ reference: data.reference, statusPath: data.statusPath });
      clearDraft();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Nema veze sa serverom. Proveri internet i pokušaj ponovo.");
    } finally {
      setBusy(false);
    }
  }

  /* ------------------------------------------------------------------ sent */

  if (sent) {
    return (
      <section className={styles.wrap} data-reveal>
        <div className={styles.sent}>
          <p className={styles.eyebrow}>Upit {sent.reference}</p>
          <h2 className={styles.sentTitle}>
            Upit je stigao<span className={styles.dot}>.</span>
          </h2>
          <p className={styles.sentBody}>
            Pregledamo šta si poslao i javljamo se sa procenom cene i roka — obično u roku od
            dva radna dana. Do tada te ništa ne obavezuje.
          </p>
          <ol className={styles.steps}>
            {[
              "Pregledamo opis, želje i rok koji si naveo.",
              "Cena i vreme izrade stižu na tvoj mejl.",
              "Tek tada odlučuješ da li prihvataš.",
            ].map((step, i) => (
              <li key={step}>
                <span className={styles.stepNum}>{`0${i + 1}`}</span>
                <span className={styles.stepText}>{step}</span>
              </li>
            ))}
          </ol>
          <div className={styles.sentActions}>
            <Link className={styles.submit} href={sent.statusPath} data-cursor="on">
              Prati status upita
            </Link>
            {buyer ? null : (
              <Link className={styles.ghost} href="/nalog/prijava" data-cursor="on">
                Napravi nalog (opciono)
              </Link>
            )}
          </div>
          <p className={styles.hint}>
            Link za praćenje je poslat i na {form.email}. Nalog nije obavezan — sve može i preko
            tog linka.
          </p>
        </div>
      </section>
    );
  }

  /* ------------------------------------------------------------------ form */

  return (
    <section className={styles.wrap} data-reveal>
      <form className={styles.form} data-form="upit" onSubmit={submit} noValidate>
        <div className={styles.progress} aria-hidden>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
          <span className={styles.progressValue}>{progress}%</span>
        </div>

        {restored ? (
          <p className={styles.restored}>
            Vratili smo ono što si ranije počeo da pišeš.{" "}
            <button type="button" className={styles.linkBtn} onClick={resetDraft}>
              Počni ispočetka
            </button>
          </p>
        ) : null}

        {/* ─── Services ─── */}
        <fieldset className={styles.block} ref={servicesRef}>
          <legend className={styles.legend}>
            01 · Usluga
            <span className={styles.counter}>
              {" "}
              — izabrano {selected.length} / {MAX_SERVICES}
            </span>
          </legend>
          <p className={styles.hint}>
            Izaberi šta ti treba. Jedan upit može da pokrije više usluga. Ako nisi siguran,
            izaberi najbliže — obim doradimo u razgovoru.
          </p>

          {chosen.length > 0 ? (
            <div className={styles.chips}>
              {chosen.map((service) => (
                <button
                  key={service.slug}
                  type="button"
                  className={styles.chip}
                  onClick={() => toggleService(service.slug)}
                  aria-label={`Izbaci ${service.title}`}
                  data-cursor="on"
                >
                  {service.title}
                  <span aria-hidden>×</span>
                </button>
              ))}
            </div>
          ) : null}

          {services.length > 8 ? (
            <input
              className={styles.search}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Pretraži usluge — npr. zakazivanje, shop, aplikacija"
              aria-label="Pretraga usluga"
            />
          ) : null}

          <div className={styles.cards}>
            {visibleServices.map((service) => {
              const active = selected.includes(service.slug);
              const full = !active && selected.length >= MAX_SERVICES;
              return (
                <button
                  key={service.slug}
                  type="button"
                  className={`${styles.card} ${active ? styles.cardActive : ""}`}
                  onClick={() => toggleService(service.slug)}
                  disabled={full}
                  aria-pressed={active}
                  data-cursor="on"
                >
                  <span className={styles.cardTitle}>{service.title}</span>
                  <span className={styles.cardSummary}>{service.summary}</span>
                </button>
              );
            })}
          </div>
          {visibleServices.length === 0 ? (
            <p className={styles.hint}>
              Ništa ne odgovara pretrazi. Obriši pretragu ili izaberi „Nešto drugo" i opiši u
              nastavku.
            </p>
          ) : null}
          {showAll && noService ? (
            <p className={styles.error}>Izaberi bar jednu uslugu.</p>
          ) : null}
        </fieldset>

        {/* ─── Buyer ─── */}
        <fieldset className={styles.block}>
          <legend className={styles.legend}>02 · Ko si</legend>
          <div className={styles.toggle}>
            {BUYER_TYPES.map((value) => (
              <button
                key={value}
                type="button"
                className={`${styles.toggleBtn} ${form.buyerType === value ? styles.toggleActive : ""}`}
                onClick={() => setForm((current) => ({ ...current, buyerType: value }))}
                aria-pressed={form.buyerType === value}
                data-cursor="on"
              >
                {BUYER_TYPE_LABEL[value]}
              </button>
            ))}
          </div>

          <div className={styles.row}>
            <label className={styles.field}>
              <span>Ime i prezime *</span>
              <input
                type="text"
                autoComplete="name"
                value={form.fullName}
                onChange={set("fullName")}
                {...fieldProps("fullName")}
              />
              {errorFor("fullName") ? <em className={styles.error}>{errors.fullName}</em> : null}
            </label>
            <label className={styles.field}>
              <span>Email *</span>
              <input
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={set("email")}
                {...fieldProps("email")}
              />
              {errorFor("email") ? <em className={styles.error}>{errors.email}</em> : null}
            </label>
          </div>

          <div className={styles.row}>
            <label className={styles.field}>
              <span>Telefon</span>
              <input
                type="tel"
                autoComplete="tel"
                placeholder="+381 60 000 0000"
                value={form.phone}
                onChange={set("phone")}
              />
            </label>
            <label className={styles.field}>
              <span>Država *</span>
              <select value={form.country} onChange={set("country")} {...fieldProps("country")}>
                {COUNTRIES.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {domestic ? null : (
                <em className={styles.hint}>
                  Faktura stiže na engleskom, sa IBAN/SWIFT podacima.
                </em>
              )}
              {errorFor("country") ? <em className={styles.error}>{errors.country}</em> : null}
            </label>
          </div>

          {/* Only asked of a company, and only enforced for a Serbian one. */}
          {form.buyerType === "company" ? (
            <>
              <p className={styles.hint}>
                Podaci za račun trebaju nam samo ako prihvatiš ponudu — tada faktura ide odmah,
                bez dodatnog dopisivanja.
              </p>
              <div className={styles.row}>
                <label className={styles.field}>
                  <span>Pun naziv firme *</span>
                  <input
                    type="text"
                    autoComplete="organization"
                    placeholder="npr. Primer DOO Niš"
                    value={form.companyName}
                    onChange={set("companyName")}
                    {...fieldProps("companyName")}
                  />
                  {errorFor("companyName") ? (
                    <em className={styles.error}>{errors.companyName}</em>
                  ) : null}
                </label>
                <label className={styles.field}>
                  <span>Adresa *</span>
                  <input
                    type="text"
                    autoComplete="street-address"
                    placeholder="Ulica i broj"
                    value={form.address}
                    onChange={set("address")}
                    {...fieldProps("address")}
                  />
                  {errorFor("address") ? <em className={styles.error}>{errors.address}</em> : null}
                </label>
              </div>
              <div className={styles.row}>
                <label className={styles.field}>
                  <span>Grad *</span>
                  <input
                    type="text"
                    autoComplete="address-level2"
                    value={form.city}
                    onChange={set("city")}
                    {...fieldProps("city")}
                  />
                  {errorFor("city") ? <em className={styles.error}>{errors.city}</em> : null}
                </label>
                {domestic ? (
                  <div className={styles.row}>
                    <label className={styles.field}>
                      <span>PIB *</span>
                      <input
                        inputMode="numeric"
                        maxLength={9}
                        value={form.pib}
                        onChange={set("pib", digitsOnly)}
                        {...fieldProps("pib")}
                      />
                      {errorFor("pib") ? <em className={styles.error}>{errors.pib}</em> : null}
                    </label>
                    <label className={styles.field}>
                      <span>Matični broj *</span>
                      <input
                        inputMode="numeric"
                        maxLength={8}
                        value={form.mb}
                        onChange={set("mb", digitsOnly)}
                        {...fieldProps("mb")}
                      />
                      {errorFor("mb") ? <em className={styles.error}>{errors.mb}</em> : null}
                    </label>
                  </div>
                ) : null}
              </div>
            </>
          ) : null}
        </fieldset>

        {/* ─── Brief ─── */}
        <fieldset className={styles.block}>
          <legend className={styles.legend}>03 · Projekat</legend>

          <label className={styles.field}>
            <span>Naziv biznisa *</span>
            <input
              type="text"
              placeholder="Kako se zove tvoja firma ili brend"
              value={form.businessName}
              onChange={set("businessName")}
              {...fieldProps("businessName")}
            />
            {errorFor("businessName") ? (
              <em className={styles.error}>{errors.businessName}</em>
            ) : null}
          </label>

          <label className={styles.field}>
            <span>O biznisu *</span>
            <textarea
              rows={4}
              placeholder="Čime se baviš, ko su ti kupci, kako trenutno dolaze do tebe…"
              value={form.businessDescription}
              onChange={set("businessDescription")}
              {...fieldProps("businessDescription")}
            />
            <em className={styles.hint}>
              Bez ovoga je procena nagađanje. Najmanje {MIN.businessDescription} karaktera (
              {form.businessDescription.trim().length}).
            </em>
            {errorFor("businessDescription") ? (
              <em className={styles.error}>{errors.businessDescription}</em>
            ) : null}
          </label>

          <label className={styles.field}>
            <span>Šta ti treba *</span>
            <textarea
              rows={6}
              placeholder="npr. Prodavnica sa oko 200 artikala, plaćanje karticom, povezivanje sa postojećim magacinom. Sadašnji sajt je star pet godina i ne radi na telefonu."
              value={form.idea}
              onChange={set("idea")}
              {...fieldProps("idea")}
            />
            <em className={styles.hint}>
              Opiši problem koji rešavaš, ne samo alat koji želiš. Najmanje {MIN.idea} karaktera (
              {form.idea.trim().length}).
            </em>
            {errorFor("idea") ? <em className={styles.error}>{errors.idea}</em> : null}
          </label>

          <label className={styles.field}>
            <span>Želje i funkcionalnosti</span>
            <textarea
              rows={3}
              placeholder="npr. prijava korisnika, izveštaji, dva jezika, povezivanje sa Instagramom, sajt koji ti se dopada kao primer…"
              value={form.wishes}
              onChange={set("wishes")}
            />
            <em className={styles.hint}>
              Opciono. Sve čega se setiš — lakše je precrtati nego dodati kasnije.
            </em>
          </label>

          <div className={styles.row}>
            <label className={styles.field}>
              <span>Vreme isporuke *</span>
              <select
                value={form.timeframe}
                onChange={set("timeframe")}
                {...fieldProps("timeframe")}
              >
                <option value="">Izaberi…</option>
                {TIMEFRAMES.map((value) => (
                  <option key={value} value={value}>
                    {TIMEFRAME_OPTIONS[value]}
                  </option>
                ))}
              </select>
              {errorFor("timeframe") ? <em className={styles.error}>{errors.timeframe}</em> : null}
            </label>
            <label className={styles.field}>
              <span>Budžet (EUR)</span>
              <input
                inputMode="numeric"
                placeholder="npr. 2500"
                value={form.budgetEur}
                onChange={set("budgetEur")}
                {...fieldProps("budgetEur")}
              />
              <em className={styles.hint}>
                Opciono. Ostavi prazno ako ne znaš — javićemo ti raspon.
              </em>
              {errorFor("budgetEur") ? <em className={styles.error}>{errors.budgetEur}</em> : null}
            </label>
          </div>
        </fieldset>

        {/* Honeypot — off-screen, never focusable, invisible to real users. */}
        <div className={styles.honeypot} aria-hidden="true">
          <label>
            Website
            <input type="text" ref={honeypotRef} tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <label className={styles.consent}>
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
          />
          <span>
            Saglasan sam da Adspire Digital kontaktira mene i obrađuje ove podatke radi izrade
            ponude.
          </span>
        </label>

        <div className={styles.actions}>
          <button className={styles.submit} type="submit" disabled={busy} data-cursor="on" data-magnetic>
            {busy ? "Šaljem…" : "Pošalji upit"}
          </button>
          <span className={styles.hint}>
            {chosen.length > 0
              ? `Šalješ upit za: ${chosen.map((service) => service.title).join(" + ")}.`
              : "Bez obaveze. Cena stiže u ponudi, ne na sajtu."}
          </span>
        </div>
        {error ? <p className={styles.error}>{error}</p> : null}

        {/* On a phone the send button is a screen and a half below the last
            field. This bar keeps it — and how much is left — in reach. */}
        <div className={styles.stickyBar}>
          <span className={styles.stickyProgress}>
            {progress === 100 ? "Spremno za slanje" : `Popunjeno ${progress}%`}
          </span>
          <button
            className={styles.stickySubmit}
            type="submit"
            disabled={busy}
            data-cursor="on"
          >
            {busy ? "Šaljem…" : "Pošalji upit"}
          </button>
        </div>
      </form>
    </section>
  );
}
