# Transparentna sekcija klijentskih logotipa — dizajn

Datum: 9. avgust 2026.

## Cilj

Sekcija sa logotipima firmi na početnoj stranici treba da otkrije postojeću
scroll-based WebGL animaciju u pozadini, bez gubitka čitljivosti logotipa i bez
promene strukture, redosleda ili ponašanja landing stranice.

## Odobreno vizuelno rešenje

- Veliki omotač logo sekcije nema sopstveni puni crni gradient niti neprovidnu
  boju; pozadina je transparentna.
- Kartice zadržavaju veoma blag tamni/staklasti `rgba` sloj. Taj sloj nije blur i
  ne skriva kretanje pozadine, već samo stabilizuje kontrast belih logotipa.
- Postojeće tanke ivice kartica ostaju kao mreža koja organizuje 16 stavki.
- Hover/focus zadržava diskretan plavi sjaj i već postojeću promenu kontrasta
  logotipa, bez dodavanja nove animacije.
- Sekcija ostaje čitljiva i kada se iza nje pojave svetlije čestice.

## Granice

Ne menjaju se:

- `SceneV4.tsx`, `SilkV4.tsx`, `EventHorizonV4.tsx`, `ObsidianShard.tsx`,
  `ProjectPlanesV4.tsx`, `PreloaderV4.tsx` i `CursorV4.tsx`;
- GSAP, ScrollTrigger, scroll mapiranje, WebGL parametri ili trajanje animacija;
- redosled sekcija, broj kartica, logo slike, responsive kolone ili tekst;
- dimenzije i spacing osim ako QA otkrije stvarni overflow.

Promena je ograničena na pozadinske deklaracije u
`ClientLogosV4.module.css`. Postojeće uklanjanje mrtvog linka ka Restoranu
Madera ostaje odvojena funkcionalna korekcija.

## Pristupačnost i ponašanje

- Fokus stanje mora ostati vidljivo tastaturom.
- Kontrast naziva i logotipa mora ostati upotrebljiv preko pokretne pozadine.
- `prefers-reduced-motion` ponašanje se ne menja i ne uvodi se novi motion.
- Linkovane kartice ostaju pravi linkovi sa postojećim pristupačnim nazivima.

## SEO i AI opseg ovog prolaza

Uz vizuelnu izmenu dozvoljene su samo male, dokazive korekcije koje ne utiču na
izgled: provera alt tekstova, validnih spoljnih linkova, heading strukture,
canonical/JSON-LD konzistentnosti i AI-readable činjeničnih podataka. Nema novih
landing sekcija, keyword stuffing-a niti tvrdnji bez javnog dokaza.

## Verifikacija

1. `npm run typecheck`
2. `npm test`
3. `npm run build`
4. Vizuelna provera početne stranice na 375 px, 768 px i 1440 px.
5. Provera da je WebGL pozadina vidljiva kroz celu sekciju, bez horizontalnog
   overflow-a i bez nestajanja logotipa.
6. Provera hover/focus stanja i konzole/network zahteva.

Kriterijum uspeha: korisnik jasno vidi animaciju iza logo sekcije, ali mreža i
logotipi ostaju mirni, čitljivi i vizuelno deo postojećeg OBSIDIAN dizajna.
