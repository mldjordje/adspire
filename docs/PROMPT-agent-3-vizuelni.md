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
