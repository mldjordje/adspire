# Schema / AEO nadogradnja — 2026-09-17

Cilj: da AI asistenti (ChatGPT, Claude, Perplexity, Gemini) i AI pregled u pretrazi
mogu da **imenuju Adspire** kao odgovor na „ko radi X", a ne samo da opišu kategoriju.

Struktura je bila solidna (Organization, Service, FAQ, Breadcrumb na ~25 strana). Problem
nije bio nedostatak markupa nego to što čvorovi nisu bili **povezani u jedan graf** i što
su najvažnije strane bile prazne.

## Urađeno

### Faza 1 — popravka grafa

- **`src/lib/seo/ids.ts`** — jedan izvor svakog `@id`. Ranije je svaki fajl pisao svoj
  string, a dva su pisala isti `@id` na različite tipove.
- **Ispravljen konflikt entiteta.** `localPage.ts` je emitovao `LocalBusiness` sa `@id`
  Organizacije, ali sa drugim `name` na 3 strane — jedna firma je tvrdila četiri identiteta.
  Sada ima svoj `@id` + `parentOrganization`.
- **`Person` čvor izdvojen** (`founderJsonLd`). Ugnežden unutar Organizacije bio je
  neadresabilan — ništa nije moglo da ga navede kao autora.
- **Usluge se spajaju po `@id`.** Katalog u Organizaciji i Service strana su ranije bila
  dva nepovezana čvora za istu uslugu.
- `contactPoint` (prodaja + podrška), `knowsLanguage`, `logo` kao `ImageObject`.

### Faza 2 — prazne strane

| Ruta | Dodato |
|---|---|
| `/contact-us` | `ContactPage` + `ContactPoint` + radno vreme |
| `/about-us` | `AboutPage` + `mentions` → Person/Organization |
| `/our-projects` | `CollectionPage` + `ItemList` svih case studija |
| `/blog` | `CollectionPage` + `ItemList` sa ISO datumima |
| `/upit`, `/upit/brzo` | `potentialAction: CommunicateAction` — ulazna tačka |
| `/politika-*`, `/uslovi-*` | `WebPage` + `dateModified` |
| `/` (početna) | `WebPage` čvor (ranije samo anoniman FAQ) |

`src/lib/seo/dates.ts` konvertuje `dd.mm.yyyy` iz bloga u ISO — crawler je `03.04.2026`
čitao kao 4. mart ili odbacivao.

### Faza 3 — proizvodi i cene

- **`SoftwareApplication` čvorovi** za hotelski sistem, sistem za zakazivanje i svaki
  isporučeni klijentski sistem na case study strani (sa live URL-om kao `sameAs` dokazom).
  AI imenuje proizvode mnogo lakše nego kategorije.
- **`AggregateOffer`** na `/cena-izrade-sajta` — rasponi su već javni (odobreno 2026-08-09),
  sada su brojevi koje asistent citira umesto rečenice koju parafrazira.
- **`Course.offers`** na `/edukacija` — 500 € / 1.000 € (odobreno 2026-09-14).
- **`Article` + autor** na svim vodičima. Ranije su bili strane bez ikoga iza njih.
- **`HowTo`** na `/sajt-ne-donosi-upite` (jedini vodič sa stvarnim koracima). Opt-in polje
  `howTo.stepHeadings` u `guides.ts` — ne izmišlja procedure gde ih nema.

### Faza 4 — lokalizacija

- `translationRefs()` — uzajamno `workTranslation` / `translationOfWork`. hreflang kaže
  koji URL da posluži; ne kaže da su isti rad. Bez toga nemački sajt kreće od nule.
- Šema dodata na `/[locale]/about-us` i `/[locale]/our-services`.
- `areaServed` proširen na DACH + Crnu Goru (`adspireagency.de` je živ).

**Namerno preskočeno:** `/[locale]/contact-us`, `/faq`, `/blog`, `/our-projects` su
`noindex` jer im je telo još uvek srpsko (`isTranslatedPath` u `metadata.ts`). Šema na
noindex strani koja tvrdi da je engleska je laž. Otključava se kad se prevede telo.

### Faza 5 — validacija

`src/lib/seo/__tests__/graph.test.ts`, 12 testova preko **svake** strane koja emituje šemu:

- nijedan `@id` ne nosi dva različita entiteta (dokazano: vraćanje starog bug-a obara test)
- `@id` jedinstven unutar jedne strane, uvek apsolutni URL
- reference na organizaciju/osnivača/sajt idu samo na kanonske `@id`
- `@id` usluge identičan u katalogu, na `/our-services` listi i na Service strani
- svako FAQ pitanje ima neprazan odgovor
- svi javni rasponi cena se parsiraju u brojeve

### Faza 5b — merenje AI crawler-a

**Vercel Web Analytics ovde ne radi i nikad neće** — to je skripta u pregledaču, a crawleri
ne izvršavaju JavaScript. Treba serverski log. `middleware.ts` je zabranjen po CLAUDE.md,
pa su iskorišćena dva sloja:

| Sloj | Šta vidi | Šta traži |
|---|---|---|
| **Rute koje same beleže** | `/llms.txt`, `/llms-full.txt` — fajlovi koje AI crawleri gađaju po imenu | ništa, radi odmah |
| **Vercel Log Drain** | svaki zahtev na sajtu, uključujući statički servirane strane | Vercel → Observability → Log Drains na `/api/logs/drain` + `VERCEL_LOG_DRAIN_SECRET` |

- `db/migrations/013_crawler_hits.sql` — zasebna tabela. `site_events` u migraciji 010
  izričito obećava „bez user agenta"; crawler hit je suprotnog oblika (nema sesije, UA je
  cela poenta), pa bi guranje u istu tabelu ili prekršilo to obećanje ili zatrovalo levak
  lažnim sesijama. Čuva se samo porodica bota (`gptbot`), nikad sirov UA ni IP.
- `src/lib/analytics/crawlers.ts` — **jedna lista** koju dele `robots.ts` i merenje.
  Dve kopije bi se razišle za kvartal: bot dobije pristup u robots.txt i ostane nevidljiv
  u panelu.
- `/os/analitika` → sekcija „AI crawleri": po botu, po strani, i greške koje crawleri
  dobijaju (404 na strani znači sadržaj koji AI nije mogao da pročita — nevidljivo u
  svakom drugom alatu koji imamo).
- Throttle: jedan red po bot+strana na 10 minuta. Bytespider i CCBot ponavljaju isti URL
  desetinama puta na sat, a pitanje je „da li je ovaj motor pročitao ovu stranu", ne koliko puta.

**`/llms.txt` i `/llms-full.txt` prebačeni sa `force-static` na `force-dynamic`.** Servirani
sa CDN-a znače da se nikad ne sazna da li ih je iko dohvatio. Par kilobajta teksta uz
zanemarljiv saobraćaj — ne vredi te slepe tačke.

**Migracija 013 je primenjena** na bazu iz `.env.local` (`npm run db:migrate`). Aditivna je
— samo nova prazna tabela. Test redovi iz provere su obrisani, tabela je prazna.

## Nađeno i popravljeno usput

- **`public/llms-full.txt` je zaklanjao rutu `src/app/llms-full.txt/route.ts`.** Statički
  fajl u `public/` pobeđuje rutu istog imena, pa se od 09.09. servirala ručno pisana
  engleska verzija od 09.08. (3,8 KB) umesto generisane srpske (34,9 KB) koja prati sajt.
  Fajl obrisan; vraća se iz gita (`b6fd43d`) ako zatreba.

- `/our-services` ItemList je gradio URL-ove šablonom `/our-services/${slug}`, što je
  hotelski sistem slalo na stranu na kojoj nije opisan. Sada koristi `servicePath()`.
- `provider: { "@id": ... }` je na dva mesta bio napisan kao `${base}//#organization` i
  `${base}#organization` — obe forme su tiho pokazivale u prazno.

## Ostaje

1. **`AggregateRating` / `Review`** — nema stvarnih recenzija. Ne dodavati dok ne bude
   pravih Google recenzija; izmišljene su rizik od ručne kazne (vidi brisanje nepotvrđenih
   brojki 2026-08-24).
2. **Prevod tela** `/faq`, `/blog`, `/contact-us`, `/our-projects` na EN/DE — tek onda im
   šema ima smisla.
3. Uključiti log drain na Vercelu (`VERCEL_LOG_DRAIN_SECRET`, opciono `VERCEL_LOG_DRAIN_VERIFY`).
   Dok nije, panel meri samo `/llms.txt` i `/llms-full.txt` i sam to piše.
4. `llms.txt` bi mogao da nabraja proizvode (`SoftwareApplication`) istim rečima kao šema,
   da se dva izvora slažu.

## Provera

```bash
npm run typecheck && npm test && npm run build
```
