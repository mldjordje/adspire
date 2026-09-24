# Prompt za agenta 3 — animacije, pozadina, scroll

Ovaj fajl je istovremeno prompt (nalepi ga agentu) i mesto gde drugi agenti ostavljaju
predloge za ovaj sloj. Ne diraj ništa van svog opsega.

---

## Zadatak

Radiš **isključivo vizuelni sloj kretanja** na javnom delu sajta `adspire.rs`:
scroll animacije, pozadinu (WebGL scena) i prelaze. Ne diraš sadržaj, tekst, forme,
rute, `/os` panel ni bilo šta backend.

Vlasnik sajta (Đorđe Mladenović, Adspire Digital, Niš) je javni deo ocenio kao
**„prenatrpano"** i precizirao da se to odnosi **samo na animacije, pozadinu i scroll
efekte** — ne na broj sekcija ni na sadržaj. Traži da sajt izgleda **atraktivno i da
privlači pažnju**, a da prestane da deluje pretrpano i jeftino.

Cilj kvaliteta: nivo Awwwards site-of-the-day, ali sa **manje istovremenog pokreta**,
ne više.

## Šta postoji sada

Stack: Next.js 16 (App Router), React 19, TypeScript, GSAP + ScrollTrigger,
`@react-three/fiber` + `three` + `postprocessing`, `@splinetool/*`, `framer-motion`,
`swiper`, `vanilla-tilt`, `@studio-freight/lenis` (u `package.json`, ali u v4 nije
korišćen).

Aktivna verzija je **v4 „OBSIDIAN"** na `/`:

| Fajl | Linija | Šta radi |
|---|---|---|
| `src/components/site/v4/HomeV4.tsx` | 1249 | **25 ScrollTrigger instanci**: scrub na hero liniji i heroInner, velocity-based `skewX` na marquee redovima, pinovan horizontalni track za projekte, section rail sinhronizacija, curtain page transition |
| `src/components/site/v4/SceneV4.tsx` | 2256 | WebGL particle-morph pozadina. `SHAPES[]` niz definiše po sekciji: `camZ/camA/camY`, `x`, `rot`, `tilt`, `alpha`, `dive`, `bg` (boja pozadine) i dve boje čestica |
| `src/components/site/v4/HomeV4.module.css` | 2268 | keyframe animacije, `data-reveal` prelazi, hover stanja |
| `src/components/site/v4/SilkV4.tsx` | 210 | dodatni shader sloj |
| `src/components/site/v4/PreloaderV4.tsx` | 118 | preloader |
| `src/components/site/v4/CursorV4.tsx` | — | custom kursor (`data-cursor`, `data-magnetic`, `data-scramble`) |
| `EventHorizonV4.tsx`, `ObsidianShard.tsx`, `ProjectPlanesV4.tsx` | — | dodatni vizuelni elementi |

## Konkretni problemi koje treba rešiti

1. **Previše istovremenog pokreta.** Na više ekrana rade paralelno: WebGL čestice koje
   se morfuju, promena boje pozadine, scrub na tekstu, skew na marqueeju, custom kursor,
   magnetna dugmad, scramble tekst, `data-reveal` ulazi. Oko pokušava da prati sve
   odjednom i ništa ne dobija fokus. Cilj: **jedan dominantan pokret po ekranu**,
   ostalo suptilno ili mirno.

2. **`prefers-reduced-motion` NE POSTOJI u v4.** Provereno: `src/components/site/v2` i
   `v3` ga imaju, v4 nema nijedno pojavljivanje. To je i pristupačnost i quick win —
   korisnik koji je isključio animacije trenutno dobija pun WebGL i sve scroll efekte.
   Uvedi ga kroz ceo v4 sloj: gasi scrub/pin/skew, zamrzni scenu na statičan kadar,
   preskoči preloader.

3. **Scroll ne deluje glatko.** Lenis je u zavisnostima ali se ne koristi u v4.
   Razmotri uvođenje (ili svesno odbaci i obrazloži). Ako uvodiš — mora biti
   sinhronizovan sa ScrollTriggerom (`ScrollTrigger.scrollerProxy` / `lenis.on("scroll",
   ScrollTrigger.update)`), inače se pinovane sekcije raspadnu.

4. **Pinovan horizontalni track** za projekte je najkrhkiji deo — proveri ga na
   375 / 768 / 1440 px i sa i bez reduced motion.

5. **Preloader.** Proveri koliko stvarno traje i pod kojim uslovima se prikazuje.
   Prazan ekran pre sadržaja je najskuplji mogući prvi utisak. Ranije je bio postavljen
   na ~3.2s timeout — ako je i dalje tako, to je predugo.

6. **Performanse su deo utiska.** Izmeri pre i posle (Lighthouse, `read_network_requests`,
   FPS pri scrollu na mobilnom profilu). U `package.json` istovremeno stoje `three`,
   `@react-three/*`, `postprocessing`, `@splinetool/*`, `gsap`, `framer-motion`, `swiper`,
   `bootstrap`, `lenis`, `vanilla-tilt`. Ako se neka ne koristi u v4 — predloži uklanjanje
   (ali proveri da je ne koriste v2/v3 rute i stare stranice pre nego što je izbaciš).

## Granice — ne prelaziti

- **Paleta je odlučena i ne menja se:** crno/belo baza + trust-blue `#2f6bff`
  (`--blue`, `--blue-bright #5b8bff`, `--blue-deep #0b1c3a`, `--blue-glow`).
  Ember, violet i narandžasta su ranije odbijeni. Ako predlažeš pomeranje nijansi —
  pitaj, ne radi samoinicijativno.
- **Ne diraj sadržaj ni strukturu:** broj sekcija, tekst, `copy.ts`, `contactCopy.ts`,
  redosled sekcija. To nije bila zamerka.
- **Ne diraj kontakt formu** (`ContactV4.tsx`) — polja, honeypot, atribucija i
  `requestId` su svež kod za lead capture. Vizuelno je slobodna, ponašanje nije.
- **Ne diraj** `src/app/os/**`, `src/components/os/**`, `src/app/os/os.css` — interni
  panel, namerno plain.
- **Ne diraj** `src/middleware.ts` (rewrite za `adspireagency.de` → `/de`).
- **Ne diraj** `src/lib/crm/**`, `src/app/api/**`, `supabase/**`.
- Logo traka klijenata je posao drugog agenta. Ako traka treba da se kreće (marquee),
  to radiš ti — ali tek kad statična komponenta postoji.

## Pravila rada

- Radi u malim koracima. Posle svake izmene: `npm run typecheck && npm test && npm run build`.
- Dev server preko `.claude/launch.json` („Next.js Dev Server", port 3000), ne preko bash-a.
- Proveravaj vizuelno u browseru na 375 / 768 / 1440 px, i u light i dark šemi.
- Komentari u kodu: engleski, kratki, objašnjavaju **zašto**.
- v4 je **živ na produkciji**. Ne sme da bude vizuelne regresije koja nije namerna.
- Pre veće intervencije (Lenis, refaktor ScrollTriggera, uklanjanje zavisnosti) —
  napiši predlog i pitaj.

## Kontekst koji vredi pročitati

- `CLAUDE.md` — granice za sve agente
- `docs/HANDOFF-2026-07-31.md` — gde je stao prethodni rad
- `docs/plan-adspire-2026-h2.md` — poslovni plan iza svega

Napomena: Đorđe još nije uradio ništa od svog dela posla (Supabase, DNS, mejlovi
klijentima), ali **tvoj zadatak od toga ne zavisi** — možeš početi odmah.

## I ti razmisli

Đorđe traži da agent predloži i svoje ideje, ne samo da izvrši spisak. Ako vidiš bolji
pravac za ovaj sloj — obrazloži i predloži.

---

## Predlozi drugih agenata

*(Ovde drugi agenti ostavljaju zapažanja za vizuelni sloj umesto da sami menjaju kod.)*

- **Tačka 2 gore je poništena (2026-08-10, odluka Đorđa).** `prefers-reduced-motion` je
  **uklonjen iz celog v4 sloja** — previše uređaja ga ima uključen po default-u i ti
  posetioci su dobijali sajt bez ijedne animacije, što je bio veći gubitak od dobitka.
  Obrisano iz: `SceneV4`, `HomeV4` (+ `.module.css`), `CursorV4`, `EventHorizonV4`,
  `PreloaderV4`, `ObsidianShard`, `PageShellV4`, `ProjectPlanesV4`, `SilkV4`,
  `TechCarouselV4`, `ClientLogosV4.module.css`, `MobileMenuV4.module.css`.
  `v2`/`v3` nisu dirani. `.sceneStatic` je zadržan, ali sada služi samo kao fallback
  kad `WebGLRenderer` ne može da se napravi (blokiran/mrtav WebGL). **Ne vraćaj ga.**

- **SHARD FIELD je IMPLEMENTIRAN, ali NE po spec-u ispod** (2026-08-10). Spec ispod je
  prvi pokušaj: shardovi su uzorkovani iz siluete čestica. **To je bilo pogrešno** —
  stapali su se sa oblakom i i dalje su delovali kao da lebde bez priče. Đorđe je to
  odbio istog dana.

  **Aktuelno rešenje:** shard polje ima **sopstvenu scroll scenu**. Osam autorskih
  geometrijskih konstrukcija (`buildShardForms` u `SceneV4.tsx`), po jedna za svako
  poglavlje, indeksirane istim `ShapeDef.gen`:

  **15 formacija, po dve na sekciju** — shard polje ima sopstveni ritam, duplo brži
  od oblaka čestica (`SHARD_ORDER`, beat = `seg * 2 + half`):

  | sekcija | formacija 1 | formacija 2 |
  |---|---|---|
  | hero | armilarni prstenovi | sfera (fibonacci ljuska) |
  | manifesto | rešetkasti zid | kockasti ram (12 ivica) |
  | projects | kapija (stubovi + nadvratnik) | svod (koncentrični lukovi u dubinu) |
  | services | radijalni burst, 7 krakova | logaritamska spirala, 3 kraka |
  | aiDemo | geodetski kavez (ivice ikosaedra) | levak koji seže ka kameri |
  | process | dvostruki heliks | talasna mreža |
  | metrics | rastuće kolone | prstenasta kula sa strukom |
  | cta | monogram „A" | — |

  Ključne razlike u odnosu na spec ispod:
  - svaki shard nosi i **smer** (`aDirA`/`aDirB`), ne samo poziciju — kad formacija
    sleti, shardovi su **poravnati**, pa izgleda kao sklopljena konstrukcija a ne kao
    slegnuta prašina;
  - **plato u `uMix`** — formacija se drži na početku i kraju svakog beata, ceo prelet
    je sabijen u sredinu;
  - **`aOrder` talas sklapanja** — kašnjenje ide po indeksu shardа duž konstrukcije, ne
    po šumu. Polje se rasklapa i sklapa kao talas kroz formu. Nasumičan stagger izgleda
    kao krš, uređen izgleda koreografisano;
  - **kvadratna bezijeova putanja** kroz kontrolnu tačku po shardu — let je luk, ne
    klizanje. Shard se orijentiše po **sopstvenoj brzini** duž te krive i rasteže se duž
    nje (streak), a `lock²` zaključava orijentaciju tek na kraju — shard „šibne" u
    formaciju u poslednjem trenutku;
  - **ease-out-back** — shard prebaci svoje mesto pa se vrati u njega (osećaj mase);
  - **blesak na poletanju i na sletanju** (`vEdge`), plus grejanje u letu;
  - sva tri mesha vuku iz **jedne** formacije kroz deterministički shuffle, pa grade
    jednu kompoziciju umesto tri preklopljena roja;
  - `shardSnap` / `shardRadial` **više ne postoje** — zamenio ih je stvarni per-shard
    smer. `SHAPES[]` sad ima `shardAlpha` + `shardSpread`.

  Provereno: `typecheck`, `47/47` testova, `build`, GLSL kompajliran i linkovan offscreen
  (svih 9 instanced atributa aktivno), sve 132 pozicije u svakoj od 15 formacija su
  različite, i simulacija celog scrolla potvrđuje da se **svih 15 formacija stvarno
  dostigne**, bez ijednog skoka u `uMix`, sa monogramom „A" na dnu strane.
  **Neprovereno: kako izgleda uživo** — pane nije bio prikazan, nema screenshota ni FPS-a.
  Kalibracija veličina shardova, `shardAlpha` po sekciji i širine platoa ostaje za oko.

---

- **Pozadina prorešetana (2026-08-10).** Đorđe: „previše slojeva radi odjednom".
  `SceneV4` je imao **13 vizuelnih slojeva**; ostalo ih je **6**.

  | ostaje | obrisano |
  |---|---|
  | particle cloud | nebule (3 bazena) |
  | shard field | aurora trake |
  | ink field (pozadina) | bočni velovi |
  | starfield | hyperspace streaks |
  | core glow + flare | foreground prašina (shardovi rade taj posao) |
  | neural constellation | shooting streaks, laserski grid, fireflies |

  `NEB_VERT`/`NEB_FRAG`/`nebGeo` nisu bili samo nebulini — dele ih core glow i flare,
  pa su izvučeni u `glowGeo` + `GLOW_VERT`/`GLOW_FRAG`.

  **Pozadina je namerno van akcenta.** Ink field je ranije vozio isti `#7890ff` kao
  oblak i shardovi, pa se sve stapalo u jednu plavu izmaglicu — sad je duboko
  nezasićeno mornarsko (`0x04061a` → `0x1e2c63`), `SHAPES[].bg` prepolovljen, scene
  background `0x010207`. **Ink više ne uzima paletu sekcije** — to je bio uzrok.

- **`SilkV4` idle motion.** Tkanina se ranije pomerala skoro isključivo pod kursorom.
  Dodat drugi „džep" koji sam luta po lissajous putanji i pojačava se tačno onoliko
  koliko kursorov slabi, plus disanje same teksture.

- **Header vodi na prave stranice (2026-08-10).** Bio je 3 dugmeta koja skroluju po
  landingu + „O nama"; sve stvarne rute su bile dostupne samo iz futera. Sad:
  Usluge / Radovi / Cene / Blog / O nama, lokalizovano preko `t.nav.links`.
  `Cene` je **samo SR** — `/cena-izrade-sajta` nema lokalizovanu rutu.

---

- **Kvalitet shardova + interaktivnost (2026-08-10).** Đorđe: „nedovoljno kvalitetan i
  detaljan izgled", „implementiraj interaktivnost za pozadinu", „visitor mora da može
  da rotira i kontroliše elemente".

  - Shardovi su bili **aditivni sa samo fresnel rubom** — zato su izgledali kao svetleći
    papir. Sad: dvo-svetlosni studijski rig u view space-u (key + fill), dva oštra Blinn
    speculara, Beer-Lambert unutrašnjost (tamno gde se gleda kroz najviše stakla),
    fina unutrašnja štrafta. **`NormalBlending` + `depthWrite: true`** — shardovi sad
    zaklanjaju jedan drugog i čestice iza sebe; aditivno slaganje je bilo ono što ih je
    pretvaralo u razmaz. Geometrija na detail 1 (80 i 32 faseta umesto 20 i 8).
  - **Ink field prima klik** — do 3 talasa (`uRipples[3]`), svaki širi prsten koji i
    osvetljava plazmu i vuče noise polje za sobom.
  - **Drag-to-rotate na desktopu.** Do sada je samo touch mogao da uhvati skulpturu.
    Miš vozi isti `spinVel`/`touchPitch` mehanizam, pa su momentum i prigušenje
    identični. Drag koji počne na linku/dugmetu/polju se ne otima. `html.v4-dragging`
    gasi selekciju teksta.
  - **Affordance.** `sceneGestureHint` je postojao ali je bio `display: none` na
    desktopu i hardkodiran na engleskom. Sad je vidljiv, lokalizovan (`t.hero.drag`) i
    **gasi se posle prvog stvarnog hvatanja** (`v4:grabbed`).

- **Staklo, kamera i raspored (2026-08-10, drugi krug).** Đorđe: shardovi „izgledaju još
  jeftinije", tranzicije „mnogo agresivne, nije cinematic", traži „expensive vibe" i
  više rada kamerom.

  - **Prethodni pokušaj (key/fill + Blinn) je bio pogrešan pravac.** Staklo nema svoju
    boju — ono što se čita kao staklo je *soba koja se u njemu ogleda i prelama*. Sa
    običnim direkcionim svetlom može da izgleda samo kao osenčena plastika, i tako je i
    izgledalo. Sad: proceduralni `studioEnv()` (beli softbox kao key, akcentni fill,
    uzak vreo kicker otpozadi), **Schlick fresnel** sa staklenim F0, **refrakcija sa tri
    IOR-a po kanalu** = disperzija, **Beer-Lambert apsorpcija** po debljini (crveno se
    guta najbrže, plavo preživi — tint je fizički, ne naslikan), unutrašnje linije mane.
  - `depthWrite` vraćen na `false`. Sa `true` su shardovi postali neprozirni tamni
    čipovi koji buše rupe u oblaku — to je bio glavni uzrok „još jeftinije".
  - **Tranzicije smirene:** smootherstep (nulto ubrzanje na oba kraja), spljošten bell,
    rastezanje sa ×3.2 na ×1.55, blesak sa 0.8 na 0.35, `dive` 2.4/2.6 → 1.15/1.25.
  - **Kamera je sad režirana:** spor *push in* dok formacija stoji, bočni *truck* preko
    prelaza (smer se menja po beatu), duži objektiv na holdu a širi u pokretu, easing
    0.075 → 0.042 (teža glava), dva spora perioda na bank/roll da drift ne ulazi u
    očigledan loop.
  - **Raspored:** hero levo, manifesto desno, proces levo (≥1024px), `SHAPES[].x` gura
    skulpturu u oslobođenu stranu (hero +1.9, manifesto −1.9, proces +1.7). Vinjete
    ispod teksta više ne pokrivaju ceo kadar nego prate kopiju. Ispod 1024px sve ostaje
    centrirano. Izmereno na 1280: hero 90→710, manifesto 450→1150, `overflowX = 0`.

### Otvoreno: ostatak UI/UX predloga

Ovo **nije** urađeno — traži Đorđevu odluku jer dira sadržaj.

1. ~~Hero prazan prostor~~ — URAĐENO.
   hint-a zauzimaju sredinu ekrana, tačno tamo gde je skulptura. Predlog: naslov levo
   poravnat i spušten, desna trećina potpuno prazna — skulptura dobija scenu.
2. ~~Naizmenično poravnanje~~ — URAĐENO za hero/manifesto/proces.
   (koji već pomera oblak u stranu) ima gde da ga pomeri. Sad se sadržaj i oblak biju
   za isti centar.
3. **Jedna sekcija bez teksta.** Između `process` i `metrics` — samo skulptura, puna
   visina ekrana, bez ijedne reči. To je trenutak koji sajt čini skupim; sad ga nema.
4. **Pauza u scrollu na formaciji.** Kratak `ScrollTrigger` pin (~40vh) na hero i CTA
   dok formacija stoji sklopljena, da se pročita pre nego što se raspadne.
5. **Kontrole eksplicitno.** Mali HUD u uglu: reset pogleda + „auto-rotate on/off".
   Ako je poenta da posetilac kontroliše scenu, kontrola treba da bude vidljiva.

---

## Predlog: SHARD FIELD v2 — geometrija koja se formira uz čestice

Naručio Đorđe (2026-08-10): geometrijski oblici u pozadini treba da **i sami formiraju
oblike tokom scrolla**, da budu **manji i detaljniji ali u većem broju**, i da zajedno sa
česticama grade jedan kadar. Utisak: cinematic, smooth, premium.

### Stanje sada (izmereno u kodu)

| Šta | Gde | Vrednost |
|---|---|---|
| „geometrijski oblici" = `debris` | `SceneV4.tsx:1060–1075` | **5 mesh-eva desktop / 2 mobile**, `IcosahedronGeometry(0.26, 0)`, non-uniform scale, zaseban `THREE.Mesh` po komadu |
| njihova animacija | `SceneV4.tsx:2234–2241` | spin po `t`, sinus po Y, `+ p * 1.1` parallax. **Ništa ne zna o `SHAPES[]` morfu** |
| shader | `SHARD_VERT` / `SHARD_FRAG`, `SceneV4.tsx:686–720` | fresnel rim + light band + glint, alpha `0.4 + fres*0.6` |
| čestice | `COUNT = 16000 / 7000`, `SceneV4.tsx:787` | morf ceo u vertex shaderu; CPU uploaduje `tgtA`/`tgtB` samo na promenu segmenta (`:1984`) |

Dijagnoza: shardovi su **dekor koji lebdi paralelno sa scenom**, a ne deo skulpture. Zato
i doprinose osećaju „prenatrpano" — dodaju pokret koji ne nosi značenje. Rešenje nije
„više pokreta", nego **isti pokret**: shardovi da pripadaju obliku koji čestice grade.

### Ciljna ideja

Čestice = **magla oblika**. Shardovi = **skelet/kristalizacija tog istog oblika**.
Kroz jedan segment scrolla gledalac vidi tri takta:

1. **Hold** (mix ≈ 0 ili 1) — shardovi su ukrštani u formaciju, mirni, sporo rotiraju.
   Oblik je čitljiv, dominantan pokret je jedan.
2. **Break** (mix ≈ 0.5, `morphE` visok) — formacija se raspada, shardovi tumbaju kroz
   isti flow-field kroz koji lete čestice.
3. **Crystallize** — shardovi **stižu sa zakašnjenjem za česticama** (per-instance
   stagger), pa oblik izgleda kao da se taloži i stvrdne. To je premium beat.

Ključno pravilo: **shardovi nikad ne dodaju novi pokret — oni preuzimaju postojeći.**
Neto količina istovremenog pokreta na ekranu ostaje ista ili manja, jer se ukida
nezavisni drift iz `:2239`.

### Tehnički plan

**1. `InstancedMesh` umesto pojedinačnih mesh-eva.**
Tri instance-mesha (tri geometrije, vizuelna raznolikost bez `merge`):

| tier | geometrija | desktop | mobile | uloga |
|---|---|---|---|---|
| `blade` | `IcosahedronGeometry(0.07, 0)` skaliran po Y ×2.4 | 56 | 14 | tanki iverci, nose formaciju |
| `chip` | `OctahedronGeometry(0.06, 0)` | 44 | 10 | sitni facetirani komadi |
| `slab` | `TetrahedronGeometry(0.11, 0)` | 20 | 6 | ređi, krupniji, blizu kamere |

Ukupno **120 desktop / 30 mobile** u **3 draw call-a** (sada: 5 objekata = 5 draw
call-ova). Trouglova: 120 × ~20 = ~2.4k — zanemarljivo. Manji shardovi znače i **manji
fill-rate po komadu**, što je jedini realni trošak kroz bloom.

**2. Formacije se izvode iz postojećih `gen*` generatora — bez novih oblika.**
Za svaki `gen` (0–7) uzorkuj `N_shards` pozicija iz već generisanog `Float32Array`
oblika, stride-om `floor(COUNT / N)` + deterministički jitter po normali (`mulberry32`,
fiksni seed → identično na svakom učitavanju). Trošak: 8 × 120 × 3 float = **11 KB**,
generiše se jednom uz `shapes[]` na `:789`.

Rezultat je koherencija besplatno: shard nikad ne može da bude van siluete koju čestice
prave, jer je uzorkovan iz iste tačke oblika.

**3. Sve u vertex shaderu — nula CPU po frejmu.**
Instanced atributi: `aTgtA`, `aTgtB` (vec3), `aScatter` (vec3), `aSeed` (float),
`aScale` (vec3), `aAxis` (vec3, osa spina). Uniformi se **dele sa `cloudUniforms`**:
`uMix`, `uMorph`, `uTime`, `uArrival`, `uWarp`, `uAttract`.

Rotacija se gradi u shaderu iz `aAxis` + ugla (Rodrigues), pa `instanceMatrix` nije
potreban. Na promenu segmenta se, uz `tgtA`/`tgtB` na `:1987`, uploaduju i shard targeti
(3 × 120 × 3 float — trivijalno).

```
// per-instance stagger: shards land AFTER the cloud settles → sediment, not confetti
float d   = aSeed * 0.35;
float mS  = smoothstep(d, d + 0.65, uMix);
vec3  home = mix(aTgtA, aTgtB, mS);
// break beat: mid-morph the formation dissolves along the same scatter dirs
float burst = uMorph * (0.9 + aSeed * 1.2);
vec3  pos   = home + aScatter * burst;
```

**4. Karakter formacije po poglavlju (`ShapeDef` dobija `shardMode`).**
Ne rade svi shardovi isto — to je razlika između „čestice + smeće" i autorskog kadra:

| gen | sekcija | `shardMode` | ponašanje |
|---|---|---|---|
| 0 | hero | `orbit` | tangencijalno poravnati prsten oko irisa, spor |
| 1 | manifesto | `lattice` | rotacija snapovana na 0/90° — arhitektonski, blueprint |
| 2 | projects | `recede` | alpha ×0.35, samo daleki sloj — screenshotovi su zvezda |
| 3 | services | `radial` | duža osa poravnata sa spokes hub-a |
| 4 | aiDemo | `nodes` | shardovi sedaju na neural čvorove, puls na `uArrival` |
| 5 | process | `flow` | poravnati sa osom pipeline-a, klize kao teret |
| 6 | metrics | `stack` | vertikalno poravnati, prate kolone grafa |
| 7 | cta | `edge` | crtaju ivicu „A" monograma, najviši alpha |

`shardMode` je int uniform + `mix()` između dva moda po `m` — bez grananja po instanci.

**5. Dubinski slojevi (ovo je ono što daje „cinematic").**
`aSeed` deli polje na tri pojasa po Z:
- **far** (z < −6): mikro-iverci, alpha ≤ 0.15, skoro samo rim — daju teksturu praznini
- **mid** (−6..1): nosi formaciju, pun fresnel
- **near** (z > 1): 3–5 krupnijih, izlaze iz fokusa — lažni DOF preko `smoothstep`
  po `-mv.z` u fragmentu (blur ne radimo, radimo alpha + rast rim-a). Kontra-parallaks
  na `mouseX` kao već postojeći `dust` (`:2282`).

**6. Shader detalji (detaljnost dolazi iz shadera, ne iz trouglova).**
- zadrži `SHARD_FRAG` bazu, dodaj **thin-film** nijansu vezanu za ugao gledanja, ali
  isključivo unutar odlučene palete: `mix(uColor, vec3(0.18,0.42,1.0), fres)` →
  `mix(..., vec3(0.72,0.82,1.0), pow(fres,4.0))`. **Nema nove boje** — samo blue→ice.
- glint da bude oštriji (`pow(band, 14.0)`) ali ređi — skuplje izgleda kad je redak.
- alpha spusti na `0.18 + fres * 0.5`: 24× više objekata na istom budžetu.

**7. Perf ograde (obavezno, ne opciono).**
- shard field se **skroz preskače pod `reduced`** — već pokriveno ranim `return` na `:744`.
- u `applyResolution()` (`:1891`): kad je `lowRes === true`, `far` tier `.visible = false`.
- `frustumCulled = false` samo na mid tier; far/near mogu da se kalju normalno.
- meri pre/posle: FPS pri scrollu na mobilnom profilu, i draw-call broj u Spectoru.

### Redosled rada (svaki korak zaseban commit, posle svakog `npm run typecheck && npm test && npm run build`)

1. Zameni 5 mesh-eva jednim `InstancedMesh`-om sa istim ponašanjem kao sad (120 kom,
   isti drift). **Vizuelno skoro identično** — cilj je samo da instancing radi i da FPS ne padne.
2. Dodaj sampler formacija iz `shapes[]` + `aTgtA/aTgtB` upload na promenu segmenta.
   Shardovi počinju da prate oblik, još bez break beat-a.
3. Dodaj stagger + break/crystallize takt (`uMorph`).
4. Dodaj `shardMode` po sekciji.
5. Dubinski tierovi + shader polish (thin-film, glint, alpha).
6. Perf pass: `lowRes` gating, merenje, mobilni brojevi.

Ako posle koraka 3 kadar deluje pretrpano — **smanji broj shardova, ne količinu logike**.
Ceo efekat mora da radi i sa 40 komada.

### Otvoreno pitanje za Đorđa

Da li shardovi treba da budu vidljivi i na sekcijama `projects` i `services`, gde je
`alpha` čestica namerno spuštena na 0.18–0.2 da bi sadržaj disao? Predlog: da, ali samo
`far` tier (jedva vidljiva tekstura). Ako i to smeta — gasimo ih potpuno na te dve sekcije.

---

## Beleška od SEO/sadržaj agenta — `data-reveal` i AEO (11. avgust 2026.)

Dodate su nove stranice: `/ai` i `/ai/[slug]` (9 delatnosti), renderovane kroz
`AiPageV4` / `AiIndexV4` na `PageShellV4`. Njihova jedina svrha je da ih citiraju
pretraživači i AI asistenti.

**Problem koji ne diram jer je tvoj sloj.** `PageShellV4` (`:99`) radi
`gsap.from(el, { autoAlpha: 0, scrollTrigger: ... })` nad svakim `[data-reveal]`.
Provereno u dev-u: telo stranice ostaje `opacity: 0; visibility: hidden` dok
ScrollTrigger ne opali. Isto se ponaša i na postojećim `/it-firma-nis` i vodičima,
znači nije regresija — ali na `/ai/*` stranicama nosi konkretan rizik:

- renderer koji izvršava JS ali ne skroluje (a takvi su neki AI crawleri i deo
  Google render pipeline-a za sadržaj ispod preloma) vidi prazan `<main>`;
- ceo tekst je u DOM-u, pa oni koji ne izvršavaju JS ga vide — pogođeni su baš
  oni koji jesu na pola puta.

**Predlog, tvoja odluka kako:** neka početno stanje bude vidljivo, a animacija samo
pomera — `gsap.set(el, { autoAlpha: 1 })` pa `from` sa `y` bez `autoAlpha`, ili
`ScrollTrigger.batch` sa `once: true` i `refresh()` na `load`. Alternativa je da
`[data-reveal]` u `guide`/`ai` telu jednostavno ne dobija `autoAlpha`.

Ne menjam sam jer je GSAP/ScrollTrigger tvoj sloj.

**Ostalo što je novo, a tebe se tiče samo koliko hoćeš:** `AiPageV4.module.css` je
nov fajl i namerno nema nijedan `@keyframes` ni prelaz osim `color` na hoveru.
Ako želiš da kartice poslova (`.task`) ili lista delatnosti (`.industryRow`) dobiju
pokret, to je slobodan prostor — struktura je stabilna, generiše se iz
`src/content/site/aiPages.ts`.

**Dopuna (isti dan).** `/ai` sloj je u međuvremenu lokalizovan — postoji na SR, EN i DE
(`/ai`, `/en/ai`, `/de/ai` + po 9 stranica), sve `index, follow` i u sitemapu. Time
`data-reveal` problem iznad prestaje da bude teorijski: 30 indeksiranih stranica čiji je
ceo `<main>` `visibility: hidden` dok ScrollTrigger ne opali. Ako se menja jedna stvar iz
ove beleške, neka bude ta.

---

**Dopuna 2026-08-23 — skrol-reaktivna pozadina.**

Đorđe traži da se pozadina povezuje sa skrolom „na zanimljiv način", i na desktopu
i na mobilnom. Uradio sam to na `AuroraV4` jer nije u tvom zabranjenom spisku —
nastala je uz booking landing i ja je držim. Šta je sada unutra:

- Novi uniform `uVel` — **predznačena brzina skrola**, ne pozicija. Pozicija
  (`uScroll`) kaže gde je čitalac, brzina kaže kako je tu stigao, i to je polovina
  koja se stvarno oseti.
- Zavese se naginju i šire sa brzinom (`lean`, `w` u `curtain()`), kao da vazduh
  kasni za pokretom.
- Zvezde se razvlače u tragove duž ose skrola, bliži sloj jače od daljeg — ta
  razlika je dubina.
- Horizont bledo pojača na brzom skrolu, plus trag hromatskog razdvajanja samo u
  plavom kanalu (paleta nema crveno da troši).
- Ublažavanje je **brzi napad, spori otpust** (`0.35` gore, `0.06` dole) — smear se
  pojavi istog trenutka, pa se smiri.
- Mobilni više ne preskače shader. Umesto `return` na ≤767px ide `renderScale 0.3`
  i fbm 6→4 oktave, `powerPreference: "low-power"`. Bez WebGL-a i dalje pada na
  slikani gradijent.

**Šta ostaje tebi, jer je tvoje:**

`SilkV4` je na svim ostalim unutrašnjim stranama i **nisam ga dirao** — u spisku je.
Trenutno stanje sajta je tri različite pozadine: `SceneV4` na početnoj, `AuroraV4`
na četiri strane gde se kupuje, `SilkV4` na svemu ostalom. Ako se traži da se cela
strana „pomera sa skrolom", `SilkV4` je najveći deo tog utiska i ne mogu ja.

**Ažurirano isti dan:** Đorđe je izričito tražio da uradim i `SilkV4`, pa sam
podigao granicu i uradio opciju 2 — `SilkV4` je zadržao svoju estetiku i cenu, a
dobio je iste ulaze:

- `uScroll` drifta i rotira tkanje kroz dužinu strane (0.18 / −0.42 pomeraj,
  0.22 rad rotacije), da dugačak vodič ne stoji na jednom zamrznutom naboru.
- `uVel` smiče tkanje duž ose skrola, razvlači `uv.y`, vuče i sam warp (`q`), i
  pojačava sjaj po naborima dok se strana kreće.
- Vinjeta je namerno ostala u ekranskom prostoru (`screenUv`) — pripada ekranu,
  ne tkanini, pa ne sme da odluta iz centra kad skrol pomeri weave.
- Telefon više ne preskače: `SCALE 0.28` i fbm 5→3 oktave. To je jeftinije nego
  stari desktop put, a i dalje reaguje na skrol.

Ako ti se konstante ne sviđaju, sve su na jednom mestu u `main()` i ne diraju
ništa drugo.

**Upozorenje o proveri.** Ništa od gore nisam video kako izgleda. Browser panel se
u toj sesiji nije prikazivao, `document.hidden` je bio `true` pa `requestAnimationFrame`
uopšte nije radio ni skrol se nije pomerao. Provereno je samo da shader kompajlira i
linkuje, da `uVel` postoji kao lokacija i da nema GL greške. Vrednosti konstanti
(`0.5` lean, `7.0 + layer * 9.0` trail, `0.35/0.06` ease) su odabrane računski i
verovatno traže štelovanje na oko.


---

## Nalaz 19.09.2026 — POVUČEN. Naslov je ispravan, alat za proveru je bio kriv.

Prethodna verzija ove sekcije tvrdila je da `h1` na unutrašnjim stranama ostaje
odsečen zato što GSAP intro tween ne odmakne od početnog stanja. **To nije
tačno i povučeno je.** Ostavljam zapis jer je merenje korisno sledećem ko bude
proveravao izgled kroz isti alat.

**Šta je stvarno bilo.** Browser panel u kome se proverava izgled **uopšte ne
izvršava `requestAnimationFrame`** — ni kada `document.visibilityState` javlja
`"visible"`:

```
framesInOneSecond: 0
visibilityState:  "visible"
hasFocus:         false
```

GSAP ticker radi na rAF-u, pa nijedna animacija u tom panelu nikad ne odmakne.
Svaki `gsap.from` ostane zaključan na početnom stanju: karakteri naslova
pomereni `1.1em` naniže unutar `overflow: hidden` naslova, a `[data-reveal]`
sekcije na `autoAlpha: 0`. Otud i „odsečen naslov" i „prazne bele sekcije" na
snimcima ekrana. Isto se videlo i na produkciji, što me je i ubedilo da je bug
pravi — ali je i tada bio isti panel, ne sajt.

**Zašto ovo nije problem ni za SEO ni za AI.** Naslov je u serverskom HTML-u kao
običan tekst; SplitType ga cepa tek na klijentu:

```
curl -s https://adspire.rs/kako-napraviti-web-shop | grep '<h1'
<h1 class="...heroTitle">Kako napraviti web shop</h1>
```

Crawleri koji ne izvršavaju JavaScript — a to su skoro svi AI crawleri — vide
ceo naslov. Googlebot renderuje sa ispravnim rAF-om, pa ga takođe vidi. U pravom
browseru, i kada je tab u pozadini, rAF se nastavi čim se tab pogleda i animacija
se dovrši.

**Šta iz ovoga ostaje kao pravilo.** Kada proveravaš izgled kroz Browser panel,
prvo izmeri da li rAF radi. Ako je nula, sve što zavisi od animacije izgleda
pokvareno, a nije. Ne menjaj ni copy ni animacije na osnovu takvog snimka.

---

## Plan 24.09.2026 — pozadina footera (`EventHorizonV4`): motion, interakcija, oštrina

Đorđe: koncept crne rupe iza CTA + footera je dobar, fali pokret, više interakcije
i „8K kvalitet". Komponenta je na tvom spisku, pa je ovo plan, ne izmena.
Isti shader je na tri mesta: `HomeV4` (CTA + footer), `AiVideoLandingV4`,
`EducationLandingV4`. Menja se na sve tri odjednom.

### Stanje (izmereno u kodu)

- Render na **0.65× CSS piksela**, bez `devicePixelRatio`. Na retina ekranu to je
  ~0.33 stvarnih piksela. Otud mekoća, a photon ring (tanak prsten) je mutan.
- Zvezde su prag nad value-noise (`smoothstep(0.88, 1.0, noise(...))`): mrlje,
  ne tačke. Nema treperenja ni veličina.
- Nema ditheringa. Tamni radijalni prelazi prave vidljive stepenice (banding).
- fbm 4 oktave. Disk je gladak izbliza, fale sitni filamenti.
- **Mobilni: shader se uopšte ne pokreće** (`return` na ≤767px). Na telefonu
  footer nema pozadinu, samo `--bg`.
- Interakcija: nagib diska po pokazivaču, „heat" od brzine, puls na klik.
  **Skrol ne utiče ni na šta.** CTA dugme, wordmark i footer linkovi ne
  razgovaraju sa shaderom.

### Šta „8K" znači ovde

8K kadar (7680×4320) po frejmu nije realan za fullscreen fbm shader, a nijedan
posetilac nema taj ekran. Cilj je da izgleda **oštro kao 8K render na bilo kom
ekranu**: nativna rezolucija do DPR 2, bez bandinga, oštre tačkaste zvezde,
antialiasovan prsten, više detalja u disku. Plus statična slika visoke
rezolucije kao fallback.

### Faza 1 — oštrina (prvo, jer sve ostalo stoji na njoj)

1. **DPR-svesna rezolucija.** `scale = min(devicePixelRatio, 2)`, pa
   **adaptivni kvalitet**: meri prosek frejma, iznad ~18 ms spušta skalu u koracima
   (1.0 → 0.8 → 0.65), ispod ~10 ms vraća. Jači GPU dobija nativno, slabiji ne
   štuca.
2. **Dithering** na kraju `main()`: ±0.5/255 blue-noise ili hash po pikselu.
   Ubija banding u tamnim prelazima, cena ~0.
3. **Prave zvezde.** Ćelijski hash (jedna zvezda po ćeliji, pomeraj unutar ćelije),
   gaussian tačka sa poluprečnikom u pikselima (preko `uRes`), 3 sloja
   dubine, blago treperenje po zvezdi. Lensing ostaje isti, samo se primenjuje na
   koordinate ćelija.
4. **AA photon ringa.** Širina prstena vezana za veličinu piksela
   (`1.5 / uRes.y`) umesto fiksnog `85.0`. Isto za ivicu senke. Bez
   `OES_standard_derivatives`, radi na WebGL1.
5. **Disk: 4 → 6 oktava** na desktopu kad adaptivni kvalitet dozvoli, plus
   domain-warp jedan korak (fini filamenti koji se uvijaju).
6. **Blagi bloom oko prstena** analitički (drugi, širi gaussian slabog
   intenziteta), ne post-process pass. **Bez ACES/grade-a** — 22.08. je
   grade pobeleo ceo sajt (`d9085ac`).

### Faza 2 — motion (skrol vodi priču)

1. **`uScroll` = napredak kroz CTA sekciju** (0 kad ulazi, 1 kad je footer ceo
   na ekranu). Rupa se „približava": `RH` raste od ~0.09 do 0.15, disk ubrzava
   rotaciju, zvezde se sve jače lenziraju. Footer je kraj puta i vizuelno.
2. **`uVel` = predznačena brzina skrola**, isti obrazac kao `AuroraV4`/`SilkV4`
   (brz napad 0.35, spor otpust 0.06). Zvezde se razvlače u tragove ka centru,
   disk se kratko zagreje.
3. **Paljenje pri ulasku.** Prvi put kad IO javi vidljivost: disk se u 1.2 s
   „upali" iz tame (intenzitet 0 → 1, prsten bljesne). Samo jednom po poseti.
4. **Idle orbita.** Bez pokazivača 3 s, nagib diska polako kruži sam
   (Lissajous, mala amplituda), da nikad ne stoji mrtvo.
5. **Relativistički mlazevi** (opciono, na kraju): dva uska, bleda plava
   konusa po osi rotacije, pulsiraju sporo. Zavisi kako izgleda uz wordmark.

### Faza 3 — interakcija

1. **Kursor kao druga masa.** Mali lens oko pokazivača (lokalno savijanje `bg`
   koordinata, poluprečnik ~0.08). Zvezde se krive oko miša. To je najjači
   „wow" za malu cenu.
2. **Drag = rotacija diska sa inercijom.** Pritisak + povlačenje menja nagib i
   roll, pa se posle puštanja polako vraća u orbitu. Klik bez povlačenja ostaje
   puls (prag ~6 px).
3. **CTA dugme hrani rupu.** Hover na `.ctaButton` (`data-cta="home-final-inquiry"`)
   → uniform `uFeed` 0→1: disk se sabije, prsten pojača, zvezde se ubrzaju ka
   centru. Veza preko `pointerenter/leave` na elementu, ne preko novog
   atributa. `data-cta` se **ne dira** (meri levak).
4. **Klik = udarni talas.** Postojeći `uPulse` dobija i talas koji putuje
   ka ivici ekrana i kratko pomeri zvezde.
5. **Wordmark `ADSPIRE` u gravitaciji** (napredno, poslednje): wordmark se
   iscrta u 2D canvas teksturu, shader ga uzorkuje kroz istu lensing funkciju, pa
   se slova savijaju oko rupe kad se kursor približi. DOM wordmark ostaje zbog
   `data-reveal="chars"` i pristupačnosti (`aria-hidden` je već tu); shader
   verzija ide ispod njega, DOM verzija dobija `opacity` prelaz. Ako izgleda
   kičasto, izbaciti.
6. **Mobilni:** dodir = kursor-masa, prevlačenje = rotacija. Žiroskop samo na
   Androidu (iOS traži dozvolu, ne vredi dijaloga).

### Faza 4 — mobilni i fallback

- Mobilni dobija shader po obrascu `AuroraV4`: `scale 0.35`, fbm 3 oktave,
  `powerPreference: "low-power"`, bez wordmark teksture i bez mlazeva.
- **Poster slika** za no-WebGL i pre prvog frejma: jedan kadar shadera
  renderovan offline u 3840×2160, AVIF + WebP, `object-fit: cover`. Tu 8K
  zaista postoji (render u 7680×4320, pa smanjenje).
- Posle izmene obavezno mobilni Lighthouse — commitom `a0c131e` je shader
  isključen na telefonu baš zbog Lighthousea.

### Performanse, čuvari

- IO pauza već postoji. Dodati `visibilitychange` pauzu i `webglcontextlost`.
- Svi novi ulazi su uniformi, bez novih pasova. Jedan fullscreen draw ostaje.
- Budžet: ≤ 4 ms GPU po frejmu na integrisanoj grafici pri DPR 1.

### Redosled i provera

Svaka faza zaseban commit, posle svakog `npm run typecheck && npm test && npm run build`.
**Nijedna faza ne ide na `main` bez viđene slike** — grana + Vercel preview, Đorđe
gleda. Browser panel ne vrti rAF (vidi nalaz 19.09.), pa snimak iz panela
nije dokaz; izmeri `framesInOneSecond` pre zaključka. Unutar faze 1 menjati jedan
efekat po jedan.

### Otvoreno za Đorđa

1. Ko radi: vizuelni agent po ovom planu, ili se granica diže za ovaj zadatak?
2. Wordmark u gravitaciji (3.5) i mlazevi (2.5) — probati ili preskočiti?
3. Unutrašnje strane (`PageShellV4` footer) nemaju shader, samo `SilkV4` iza.
   Da li i njima treba ista rupa ispod footera, ili ostaje samo za početnu i dve
   landing strane?


### Urađeno 25.09.2026 (Đorđe podigao granicu za ovaj zadatak: „ti radi, probaj sve")

- `EventHorizonV4` prepisan po fazama 1–3, sve u jednoj komponenti. Mlazevi i
  wordmark u gravitaciji su uključeni.
- **Isti footer svuda:** `PageShellV4` sada ima `footerZone` = horizont + ADSPIRE
  wordmark + footer, na svakoj unutrašnjoj strani. Novi prop `finale` stavlja
  završni CTA u istu zonu. `AiVideoLandingV4` i `EducationLandingV4` ga koriste
  umesto sopstvenog `<EventHorizonV4 />`, pa nema dva shadera jedan ispod drugog.
- Veze sa DOM-om: `data-horizon-wordmark` (shader preuzima slova, DOM kopija ide na
  `opacity: 0`), `data-horizon-feed` na glavnom dugmetu. `data-cta` netaknut.
- GL se pravi tek na 400px od viewporta; prsten je krug oko senke; lensirani luk
  diska preko vrha; adaptivni kvalitet ne pokušava ponovo nivo koji je već gubio frejmove.
- Mobilni dobija shader (`q 0.6`, 3–4 oktave, bez mlazeva).
- **Poster slika nije urađena.** Za no-WebGL ostaje CSS gradijent (`FALLBACK_BG`).
- Provereno kadrovima iz `canvas.toDataURL` (dev hook `__boot`/`__step`, samo u
  developmentu) na `/`, `/kako-radimo`, `/edukacija`, desktop i telefon.
  **Pokret uživo nije viđen**: panel ne vrti rAF. Pre `main`: Vercel preview.

---

## Plan 24.09.2026 — pozadine unutrašnjih strana (`SilkV4` + `AuroraV4`): 8K oštrina, motion, interakcija, mobilne skrol scene

> **Status 25.09.2026:** Đorđe je digao granicu za ovaj zadatak („kreni sa
> radom", prioritet telefon, bez teškog opterećenja). Urađeno na grani
> `feat/inner-bg-scenes`: Faza 0 (`bgCore.ts`), Faza 1.1–1.6, Faza 2.1–2.4,
> Faza 3.2–3.4 (bez flowmapa — džep ostaje jedan gaussian, glatko guranje bez
> `normalize` uvrtanja), Faza 4 obe scene. **Nije urađeno:** poster slika
> (1.7), flowmap trag (3.1/4.4), timer query (nivo se bira samo po uređaju),
> gašenje CSS `.grain`. Kadrovi viđeni u panelu na 375 px i 1440 px;
> Vercel preview i pravi telefon još nisu. Dev: `window.__bg = {open, prog,
> chapter, vel, focus, ...}` zaključava stanje scene (samo van produkcije).

Đorđe: dve shader pozadine na svim stranama osim početne treba da izgledaju
skuplje („8K, high-end"), da imaju više pokreta, da reaguju na skrol i miš na
desktopu, a na telefonu da skrol pravi scene koje posetioca iznenade. Obe
komponente su tvoje, pa je ovo plan, ne izmena.

- `SilkV4` — podrazumevana pozadina `PageShellV4` (`position: fixed`), ~25 strana.
- `AuroraV4` — money strane i strane po delatnosti preko `background` propa
  (booking landing, cena, kontakt, `/upit/brzo`, AEO, dijaspora, niche...).
  Opseg se ovim planom **ne širi**.

### Stanje (izmereno u kodu)

| | `SilkV4` | `AuroraV4` |
|---|---|---|
| Rezolucija desktop | `dpr·0.75` → 75% nativne na DPR 2 | **fiksno 0.45 CSS px**, bez DPR → ~22% nativne na retini |
| Rezolucija telefon | `dpr(≤1.5)·0.6` → ~30% nativne na DPR 3 | 0.3 CSS px → ~10% nativne |
| fbm oktave | 5 / telefon 3 | 6 / telefon 4 |
| Dithering | **nema** → banding u tamnom | ima |
| Hash | `sin()` hash — na mobilnim GPU-ovima mrlje i ponavljanje | isto |
| Skrol | `uScroll` (ekrani), `uProg`, `uVel` | `uScroll` (progres), `uVel` |
| Miš | jedan „džep" + idle Lissajous | isto |
| Svest o sadržaju | nikakva — ne zna gde su sekcije, naslovi, CTA | nikakva |
| Pauza | IO | IO; nema `visibilitychange` ni `webglcontextlost` |

Glavni razlog „jeftinog" izgleda: **Aurora se renderuje na četvrtini piksela i
razvlači**, a Silk nema dithering pa tamni prelazi imaju stepenice. Drugi
razlog: obe pozadine pomeraju teksturu, ali ne prave **događaje** — nema
trenutka koji se primeti.

### Šta „8K" znači ovde

Isto kao u planu za footer: fullscreen fbm u 7680×4320 po frejmu nije realan i
niko nema taj ekran. Cilj je **oštro kao 8K render na svakom ekranu**: fina
struktura na nativnoj rezoluciji, bez bandinga, bez razvučenih piksela. Skupi
niskofrekventni deo ne mora biti oštar, jeftini visokofrekventni mora.

### Faza 0 — zajedničko jezgro (bez vizuelne promene)

`SilkV4`, `AuroraV4` (i `EventHorizonV4`) svaki za sebe ponavljaju isti GL kod.
Izvući `useShaderCanvas` / `shaderCore.ts`:

- kompajl + provera linka + ispis greške u dev-u (Silk sada ne proverava link)
- IO pauza + **`visibilitychange`** pauza + **`webglcontextlost/restored`**
- ulazi kao jedan objekat: miš, dodir, skrol (ekrani, progres, brzina), sekcije
- **kvalitetni nivoi bez merenja rAF-a.** Komentar u `SilkV4` (~red 180)
  objašnjava zašto: rAF meri ceo frejm strane (GSAP, Lenis, ScrollTrigger), pa
  je adaptivni kvalitet zakucao shader na minimum i na RTX 3060. Umesto toga:
  1. nivo po uređaju (telefon/desktop, `hardwareConcurrency`,
     `WEBGL_debug_renderer_info` ako postoji — stari Intel/Mali/Adreno = niži),
  2. ako postoji `EXT_disjoint_timer_query(_webgl2)`, meri **GPU vreme samo
     ovog draw-a** i tek tada spušta nivo.

  **Napomena za plan footera iznad (Faza 1.1):** spuštanje skale po proseku
  frejma ima isti problem — koristiti ovaj mehanizam.

### Faza 1 — oštrina („8K")

1. **Dva prolaza: meko + oštro.** Skupi fbm/domain-warp (tkanina, zavese, haze)
   ide u FBO na 0.5 skale i uzorkuje se linearno (glatko je po prirodi, ništa ne
   gubi). Preko njega se na **nativnoj rezoluciji (DPR ≤ 2)** crta sve što mora
   biti oštro: sheen linije po naborima, zvezde, filamenti, zrno, dithering.
   Izgleda kao nativni render, košta malo više od sadašnjeg.
2. **Hash bez `sin()`** (Hoskins „hash without sine" ili PCG). Uklanja mrlje na
   Mali/Adreno i ponavljanje na velikim koordinatama posle dugog skrola.
3. **Dithering u Silk** (±0.5/255 po pikselu, animiran).
4. **Filmsko zrno u shaderu** na nativnoj rezoluciji, ≤2%, umesto CSS `.grain`
   sloja koji se razvlači. Zrno na pravom pikselu daje „fotografski" utisak.
   CSS `.grain` u `PageShellV4.module.css` tada ugasiti na stranama sa shaderom.
5. **Silk: satenski odsjaj.** Normala iz fbm-a (konačne razlike u mekom
   prolazu), jedno svetlo iz gornjeg levog ugla → pravi sjaj tkanine umesto
   ravnih plavih mrlja. Najveći pojedinačni skok u „skupoći".
6. **Aurora: zvezde kao tačke u pikselima** (ćelijski hash, poluprečnik preko
   `uRes`, 3 sloja dubine), isti recept kao footer 1.3. Zavese dobijaju jedan
   korak domain-warpa za fine uvijene filamente.
7. **Poster slika** za prvi paint i no-WebGL: kadar svakog shadera renderovan
   offline u 7680×4320, smanjen na 3840×2160, AVIF + WebP. Tu „8K" bukvalno
   postoji. Canvas se posle prvog frejma utapa preko postera (300 ms).
   Zamenjuje CSS gradijent u `AuroraV4`.
8. **Bez ACES/grade-a/tone-mappinga** (22.08. pobeleo sajt, `d9085ac`). Jedan
   efekat po commitu.

### Faza 2 — skrol na desktopu (skrol postaje priča)

1. **Poglavlja.** Jezgro posmatra `main > section` (samo čita, ništa ne menja)
   i daje `uChapter` (sekcija u centru, glatko) i `uChapterT` (0→1 unutar nje).
   Svako poglavlje ima kadar: ugao svetla, gustina nabora, pomeraj kamere.
   Pozadina se pretapa između kadrova, pa dug vodič ima 6–10 scena, ne jednu
   teksturu.
2. **Svetlosni prelaz na granici sekcije.** Kad nova sekcija uđe u gornju
   trećinu, preko kadra prođe meka svetlosna traka (Silk: odsjaj preleti preko
   nabora; Aurora: zavesa bljesne i spusti se). Vezano za poziciju (scrub), ne
   za vreme — ide unazad kad se skroluje nazad.
3. **Opruga umesto eksponencijalnog kašnjenja** za `uVel`: tkanina posle naglog
   skrola malo prebaci i vrati se. Oko to čita kao fiziku.
4. **Režim čitanja.** Nema skrola > 2.5 s → kontrast i pokret polako padnu
   ~40%. Kreće skrol → vraća se. Pokret postoji kad ne smeta, tekst se čita
   lakše nego danas.

### Faza 3 — miš (desktop)

1. **Trag kursora koji ostaje** — ping-pong FBO flowmap na 1/4 rezolucije
   (recept već postoji u `lab/InkTrailV4.tsx`). Trag savija tkaninu/zavese i
   bledi 1–2 s. Zamenjuje sadašnji jedan gaussian džep. Glavni interaktivni
   utisak.
2. **Parallax dubina.** Silk: dva sloja nabora pomeraju se različito (±1.5% /
   ±4%). Aurora: zvezde u 3 sloja + zavese.
3. **CTA privlači svetlo.** Hover na bilo koji `[data-cta]` (atribut se samo
   čita, **ne dira** — meri levak): svetlo se polako skupi ka centru dugmeta
   (`uAttract`). Dugme se ne menja.
4. **Klik talas** kroz tkaninu/zavese, 0.8 s. Ne na linkovima.
5. `CursorV4` i shader dele istu izglađenu poziciju, da trag ne kasni.

### Faza 4 — mobilne skrol scene (glavni deo zahteva)

Telefon nema miš, pa sav „wow" dolazi od skrola i prsta. **Ne ista stvar u
manjoj rezoluciji — posebne scene.**

**Silk — „tkanina koja se odmotava":**

1. **Otvaranje zavese.** Prvi ekran: tkanina gusta i tamna. Prvih ~60% visine
   ekrana skrola razmiče nabore na dve strane, svetlo prođe kroz sredinu
   (scrub). Pun efekat jednom po poseti, posle blago.
2. **Poglavlja kao rotacija.** Na granici sekcije tkanina se okrene ~20° i
   promeni gustinu (Faza 2.1, veća amplituda — na malom ekranu mala promena se
   ne vidi).
3. **Fling = rastezanje sa oprugom.** Brz potez palcem rastegne tkaninu, vrati
   se sa prebačajem. Najjeftiniji i najprimetniji efekat na telefonu.
4. **Prst ostavlja trag** — `touchmove` (passive) hrani isti flowmap.
5. **Kraj strane:** tkanina se smiri i posvetli iza CTA — oko ide na dugme.

**Aurora — „spuštanje kroz nebo":**

1. **Skrol = visina.** Vrh: iznad zavesa, samo zvezde. Skrol spušta kameru kroz
   slojeve zavesa (bliži prolaze brže) do horizonta pri dnu. Strana dobija
   geografiju.
2. **Zvezde u tragove** na flingu (postoji u `uVel`, pojačati + opruga).
3. **Forma = fokus.** Kad forma/CTA blok uđe u ekran, zavese se skupe iza nje u
   jedan svetli luk, ostalo se stiša. Pozadina pokazuje sledeći korak. Samo
   vizuelno — polja, honeypot, atribucija, `requestId` netaknuti.
4. **Dodir = svetli džep** koji bledi (isti flowmap).

**Tehnika za telefon:**

- Dva prolaza (1.1) ovde najviše vrede: meki deo na 0.35, oštri detalji na
  `dpr ≤ 2`. Telefon tek tako dobija oštre zvezde i sheen.
- fbm Silk 3 / Aurora 4 oktave (kao sada). Flowmap 1/4, jedan update po frejmu.
- Nizak nivo (stari Adreno/Mali, 4 jezgra): bez flowmapa i parallaxa; scene
  1–3 ostaju jer su samo uniformi.
- Žiroskop: ne u prvoj verziji (iOS traži dozvolu).
- `prefers-reduced-motion` se **ne vraća** — namerno obrisan 10.08.

### Performanse, čuvari

- Budžet: ≤ 4 ms GPU/frejm na integrisanoj grafici, ≤ 6 ms na srednjem
  Androidu — meriti timer query-jem (Faza 0), ne rAF-om.
- Jedan canvas po strani, najviše 3 draw-a po frejmu (meko, flowmap, oštro).
- Mobilni Lighthouse pre i posle svake faze (`a0c131e` je jednom isključio
  shader na telefonu zbog Lighthousea). Poster + start canvasa posle
  `requestIdleCallback` čuvaju LCP.
- Kontrast teksta preko najsvetlijeg kadra ≥ 4.5:1; scrim na niche stranama ostaje.

### Redosled i provera

Faza 0 → Faza 1 na Silk → Faza 1 na Aurora → **Faza 4 (telefon je većina
saobraćaja)** → Faza 2 → Faza 3.

Svaka stavka zaseban commit, posle svakog `npm run typecheck && npm test && npm run build`.
Svaka scena prvo kao prototip u `/dev/bg-lab` (Silk je tamo kontrola), pa tek
onda u komponentu. **Ništa na `main` bez viđene slike**: grana + Vercel
preview, Đorđe gleda na telefonu i desktopu. Browser panel ne vrti rAF (nalaz
19.09.) — izmeriti `framesInOneSecond` pre zaključka iz snimka.

### Otvoreno za Đorđa

1. Ko radi: vizuelni agent po ovom planu, ili se granica diže za ovaj zadatak?
2. Evolucija Silk/Aurora (ovaj plan) ili zamena konceptom iz `/dev/bg-lab`?
   Preporuka: evolucija, uz delove iz laba (flowmap iz `InkTrailV4`, dubina iz
   `DepthFieldV4`).
3. Mobilne scene odmah na sve strane, ili prvo na pet najposećenijih pa
   merenje u `/os/analitika` (dubina skrola, klik na CTA)?
4. „CTA privlači svetlo" (3.3) i „forma = fokus" (Aurora 3) menjaju utisak
   money strana — probati na preview-u pa odlučiti?
