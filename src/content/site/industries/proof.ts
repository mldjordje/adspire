/**
 * Live client systems, described from the angle each industry page needs.
 *
 * Deliberately not imported from `nichePages`: the note there sells the whole
 * system to that page's trade, and reusing it verbatim across a second set of
 * pages is exactly the repeated text the duplication test exists to catch. Same
 * systems, different sentence about what they prove.
 */

import type { IndustryProof } from "./types";

export const drIgicProof: IndustryProof = {
  name: "Dr Igić",
  sector: "Estetska klinika",
  note: "Karton pacijenta i kalendar termina u istoj bazi: ko dolazi, na šta, i šta je kod njega rađeno prošli put — bez pretraživanja po sveskama.",
  href: "/our-projects/dr-igic-web-aplikacija-za-estetske-klinike",
  cta: "Studija slučaja",
  image: "/images/case-studies/drigic-mobileview.webp",
};

export const doctorBarberProof: IndustryProof = {
  name: "Doctor Barber",
  sector: "Berbernica · Niš",
  note: "Termin se zakaže sa telefona bez poziva, a radnik vidi svoj dan u istoj aplikaciji. Instalira se kao PWA, pa nema skidanja sa prodavnice.",
  href: "/our-projects/doctor-barber-online-booking-sistem",
  cta: "Studija slučaja",
  image: "/images/case-studies/doctorbarber.webp",
};

export const prevozKopProof: IndustryProof = {
  name: "Prevoz Kop",
  sector: "Betonska baza · Niš",
  note: "Upit sa sajta pada pravo u operativu: ponuda, količina, vozilo i termin isporuke vode se u jednom adminu umesto u telefonu i papiru.",
  href: "/our-projects/prevozkop-digitalni-prodajni-operativni-sistem",
  cta: "Studija slučaja",
  image: "/images/case-studies/prevozkop-desktop.webp",
};

export const santosProof: IndustryProof = {
  name: "Santos & Santorini",
  sector: "Web shop · maloprodaja",
  note: "Prodavnica, lager i marketplace integracije gledaju u istu bazu, pa se stanje ne unosi dvaput i ne prodaje se ono čega nema.",
  href: "/our-projects/santos-santorini-web-shop-admin-platforma",
  cta: "Studija slučaja",
  image: "/images/case-studies/santos-desktop.webp",
};

export const tozaAiProof: IndustryProof = {
  name: "Toza AI",
  sector: "Studio · paketi i naplata",
  note: "Klijent kupi paket i troši ga iz svog naloga — sati, termini i fakture se vode sami, bez ručnog računanja koliko je ko iskoristio.",
  href: "/our-projects/toza-ai-platforma-za-ai-video-studio",
  cta: "Studija slučaja",
  image: "/images/case-studies/tozai-desktop.webp",
};

export const edukaProof: IndustryProof = {
  name: "Eduka",
  sector: "Stomatološka edukacija",
  note: "Prijave na kurs sa ograničenim brojem mesta: potvrda ide odmah, a spisak polaznika je gotov pre nego što obuka počne.",
  href: "https://eduka.co.rs",
  cta: "eduka.co.rs",
  external: true,
};

export const autoDelicProof: IndustryProof = {
  name: "Auto Delić",
  sector: "Auto servis",
  note: "Servisni termini se planiraju unapred kroz sajt i admin, pa se prijem vozila raspoređuje po danu umesto da se gomila pred vratima.",
  href: "https://autodelic.com",
  cta: "autodelic.com",
  external: true,
};
