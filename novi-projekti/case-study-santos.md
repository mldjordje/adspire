# Santos & Santorini - case study

## Kratak opis za stranicu

Santos & Santorini je moderna e-commerce i operativna platforma za modni brend koji prodaje musku garderobu, poslovne uniforme i custom odela. Projekat kombinuje javni storefront, web shop katalog, korpu i checkout tok, korisnicki nalog, blog, kontakt kanale, admin panel, katalog/lager operacije i integracije za Ananas i stock sync.

Poslovna vrednost projekta je u tome sto brend dobija centralizovan sistem za online prodaju, upravljanje proizvodima, promocijama, porudzbinama, sadrzajem i integracijama, uz mogucnost rada preko Supabase baze ili lokalnih JSON fallback fajlova kada baza nije podesena.

## Hero sekcija

### Naslov

Web shop i admin sistem za premium modni brend

### Podnaslov

Kompletna Next.js platforma za katalog proizvoda, online porucivanje, korisnicke naloge, CMS sadrzaj, integracije sa lagerom i marketplace tokove.

### CTA dugmad

- Pogledaj case study
- Zelim slican web shop
- Zakazi konsultaciju

## Case study uvod

Za Santos & Santorini je napravljen sistem koji pokriva javni deo sajta, e-commerce tok i operativni admin panel. Javni deo sluzi za predstavljanje brenda, proizvoda, akcija, blog sadrzaja, poslovnih uniformi i kontakt informacija. Web shop omogucava pregled kataloga, filtriranje, pretragu, detalj proizvoda, korpu i checkout.

Admin panel je napravljen kao operativno srediste za upravljanje katalogom, home sekcijama, akcijama, porudzbinama, kontakt porukama, newsletter prijavama, blogom, korisnicima i integracijama. Pored standardnog shop dela, projekat ima i custom suits konfigurator sa vizuelnim preview-em odela, izborom modela, revera, dzepova, tkanina, postava, dugmadi i korakom za merenje.

## Glavne funkcionalnosti

### Javni sajt

- Pocetna strana sa hero sekcijom, video/media podrskom, navigacijom i izdvojenim blokovima.
- Storefront layout sa headerom, footerom, newsletter prijavom i kontakt informacijama.
- Stranice: `/`, `/o-nama`, `/kontakt`, `/prodajna-mesta`, `/poslovne-uniforme`, `/poslovne-uniforme/[slug]`, `/dokumenta`.
- Pravne i informativne stranice: `/uslovi_kupovine`, `/uslovi_koriscenja_kolacica`, `/polisa_privatnosti`, `/isporuka`, `/nacinplacanja`, `/reklamacije`.
- Blog listing i detalj objave: `/blog`, `/blog/[slug]`.
- Stranica za akcije: `/akcije`.
- SEO podrska kroz metadata helper, sitemap, robots, JSON-LD komponentu, `llms.txt` rutu i manifest fajlove.
- Visejezicna storefront logika za SR/EN kroz language helper i language switcher komponente.

### Web shop i katalog

- Web shop listing: `/web-shop`.
- Detalj proizvoda: `/web-shop/[legacyId]`.
- Katalog proizvoda iz legacy import-a i/ili Supabase tabele.
- Pretraga proizvoda kroz `/api/storefront/search`.
- Kategorije kroz `/api/storefront/categories`.
- Filtriranje, sortiranje, paginacija i prikaz dostupnosti.
- Podrska za cene, akcijske cene, lager, slike, SKU, EAN, brend i opis/specifikaciju proizvoda.
- Galerija proizvoda, size guide popup, wash care prikaz i povezani proizvodi.
- Promo pravila i rucne akcije za proizvode.

### Korpa i checkout

- Korpa na `/cart`.
- Checkout na `/checkout`.
- Dodavanje artikala u korpu, promena kolicine i uklanjanje artikala.
- Checkout forma sa obaveznim podacima kupca: ime, email i telefon.
- Podrska za delivery/pickup tok, izbor kurirske sluzbe ili radnje za preuzimanje.
- Voucher/fulfillment logika kroz `lib/storefront/fulfillment.ts`.
- Slanje porudzbine u backend preko `/api/orders`.
- Napomena: u kodu nije pronadjena integracija karticnog placanja; checkout radi kao porudzbina/upit koji ide u admin i email notifikacije.

### Korisnicki nalog

- Prijava: `/nalog/prijava`.
- Registracija: `/nalog/registracija`.
- Pregled korisnickih porudzbina: `/nalog/porudzbine`.
- Supabase auth callback: `/auth/callback`.
- Korisnicke porudzbine se vezuju za ulogovanog korisnika i email kroz storefront order tok.
- Google sign-in komponenta postoji za storefront.

### Admin panel

- Admin login: `/admin-login`.
- Admin dashboard: `/admin`.
- Admin layout sa navigacijom, permisijama i zasebnim PWA manifestom za admin.
- Zastita admin zona kroz middleware za `/admin/*` i `/api/admin/*`.
- Admin sesije, legacy token pristup i role/permission sistem.
- Role koje postoje u kodu: `owner`, `manager`, `content_editor`, `operations`, `preview_manager`.
- Admin sekcije:
  - `/admin/webshop` - centralni hub za proizvode, lager, home sekcije i akcije.
  - `/admin/orders` - pregled porudzbina, statusi i operativna obrada.
  - `/admin/orders/[id]/packing-slip` - packing slip za porudzbinu.
  - `/admin/contact-messages` - kontakt inbox.
  - `/admin/newsletter` - newsletter prijave.
  - `/admin/blog-posts` - upravljanje blog objavama.
  - `/admin/categories` - kategorije web shopa.
  - `/admin/site-content` - sadrzaj javnog sajta.
  - `/admin/landing` i `/admin/shop-hero` - landing/home/shop hero podesavanja.
  - `/admin/akcije` - akcije i snizenja.
  - `/admin/size-guides` - tabele velicina.
  - `/admin/fulfillment` - delivery/pickup i fulfillment podesavanja.
  - `/admin/integrations` i `/admin/integrations/[runId]` - integracije i run logovi.
  - `/admin/sync` - sync status.
  - `/admin/users` - admin korisnici.
  - `/admin/fabrics`, `/admin/linings`, `/admin/buttons` - custom suits asseti.
  - `/admin/preview-tuning`, `/admin/stripe-tuning` - interni tuning alati.
  - `/admin/fonts` - font podesavanja.
  - `/admin/tutorial` - uputstvo za rad u adminu.

### Custom suits konfigurator

- Konfigurator odela: `/custom-suits`.
- Korak za merenje: `/custom-suits/measure`.
- Debug stranica: `/custom-suits/debug`.
- Vizuelni preview odela kroz slojeve za sako, pantalone, prsluk, tkanine i detalje.
- Modeli odela: jednoredno 1 dugme, jednoredno 2 dugmeta, dvoredno 4 dugmeta, dvoredno 6 dugmadi.
- Opcije za rever: notch/peak, narrow/medium/wide.
- Opcije za dzepove, unutrasnjost, grudni dzep, manzetne i prsluk.
- Izbor tkanina i postava iz API-ja ili fallback JSON podataka.
- Racunanje cene konfiguracije kroz `app/custom-suits/utils/price.ts`.
- Cuvanje dizajna u lokalnu korpu i slanje draft porudzbine preko `/api/orders`.

### Blog, content i marketing

- Blog i news sadrzaj kroz `content_posts` schema ili `data/posts.json`.
- Admin API za blog postove.
- Newsletter forma i `/api/newsletter`.
- Newsletter admin pregled.
- Kontakt forma i `/api/contact`.
- Kontakt poruke se cuvaju i prikazuju u admin inbox-u.
- Email notifikacije postoje za porudzbine, status porudzbine, newsletter welcome i kontakt poruke.

### Automatizacije i integracije

- Supabase integracija za bazu, auth i server-side podatke.
- Lokalni JSON fallback za katalog, porudzbine, sadrzaj, newsletter, admin korisnike, tkanine, postave, kategorije i promo pravila.
- Ananas marketplace klijent i sync logika.
- Stock inbound sync iz ZIP/CSV izvora.
- Stock outbound export u `webchanges.zip` i `webchanges.md5`.
- Integration run logovi, item logovi, retry neuspesnih stavki i status endpointi.
- Cron endpoint postoji: `/api/admin/integrations/cron`.
- Napomena: u root-u projekta nije pronadjen `vercel.json`, pa raspored cron posla nije mogao da se potvrdi iz konfiguracionog fajla. Runbook pominje schedule na 30 minuta, ali fajl za deploy schedule nije prisutan u ovom checkout-u.

### Media, asseti i performanse

- Product media i site assets upload rute.
- Asset proxy rute: `/site-assets/[...path]` i `/uploads/[...path]`.
- Fabric proxy i tile API.
- Skripte za generisanje, normalizaciju, upscale i pripremu transparentnih asseta za custom suits preview.
- Performance index SQL za katalog, search trigram index i JSONB index.

## Modeli podataka / entiteti

### Supabase SQL modeli

- `catalog_products`: glavni katalog proizvoda iz legacy sistema; sadrzi legacy ID, SKU, EAN, sifre, brend, aktivnost, export status, nazive/opise na SR/EN, cene, porez, rebate, lager i raw payload.
- `catalog_product_media`: slike proizvoda vezane za `legacy_product_id`, cover oznaka i sort redosled.
- `integration_ananas_product_state`: stanje sinhronizacije proizvoda prema Ananas-u, external ID, status, payload hash, error i vreme poslednjeg sync-a.
- `integration_ananas_discount_state`: stanje Ananas discount/akcija po proizvodu i periodu.
- `integration_stock_sync_log`: osnovni log stock sync operacija.
- `integration_sync_runs`: run istorija integracija za domen `ananas`, `stock_inbound`, `stock_outbound` ili `orchestrator`.
- `integration_sync_items`: pojedinacne stavke u okviru integration run-a, sa statusom, payloadom, response-om i retry vezom.
- `integration_stock_delta_state`: delta hash stanje za stock sync.
- `integration_stock_raw_files`: sirovi fajlovi primljeni kroz stock inbound.
- `integration_stock_raw_rows`: sirovi redovi iz inbound CSV fajlova.
- `content_posts`: blog/news objave, slug, naslov, excerpt, HTML telo, cover slika, tip, publish status i legacy source.
- `content_post_categories`: kategorije content objava.
- `content_post_category_links`: veza izmedju objava i kategorija.

### Entiteti iz aplikacije i JSON fallback fajlova

- `orders`: porudzbine/upiti iz web shopa i custom suits toka; koriste se u Supabase tabeli `orders` ako postoji ili u `data/orders.json` fallback fajlu.
- `admin-users`: admin korisnici i role kroz `data/admin-users.json`.
- `newsletter-subscribers`: newsletter prijave kroz `data/newsletter-subscribers.json`.
- `site-content`: javni tekstovi, prodajna mesta i sadrzaj sajta kroz `data/site-content.json`.
- `landing-settings`: podesavanja landing/home sekcija kroz `data/landing-settings.json`.
- `webshop-categories`: kategorije web shopa kroz `data/webshop-categories.json`.
- `webshop-promotion-rules`: promo pravila kroz `data/webshop-promotion-rules.json`.
- `size-guides`: tabele velicina kroz `data/size-guides.json`.
- `fabrics`: tkanine za custom suits kroz `data/fabrics.json`.
- `linings`: postave za custom suits kroz `data/linings.json`.
- `fulfillment-settings`: delivery/pickup, voucher i fulfillment podesavanja kroz `data/fulfillment-settings.json`.
- `posts`: blog/news fallback sadrzaj kroz `data/posts.json`.
- `legacy-products`: veliki legacy katalog proizvoda kroz `data/legacy-products.json`.
- `integration sync data`: fallback fajlovi za sync runove, sync iteme i delta state u `data/integrations`.

## API, integracije i automatizacije

### Javne i storefront API rute

- `POST /api/contact` - kontakt forma.
- `POST /api/newsletter` - newsletter prijava.
- `POST /api/orders` - kreiranje porudzbine ili custom suits drafta.
- `GET /api/storefront/orders` - porudzbine ulogovanog storefront korisnika.
- `GET /api/storefront/search` - pretraga proizvoda.
- `GET /api/storefront/categories` - storefront kategorije.
- `GET /api/blog/posts` i `GET /api/blog/posts/[slug]` - blog postovi.
- `GET /api/legacy/products` - pregled legacy kataloga.
- `GET /api/fabrics`, `POST/DELETE /api/fabrics/upload` - tkanine i upload.
- `GET /api/linings`, `POST/DELETE /api/linings/upload` - postave i upload.
- `GET /api/buttons`, `POST/DELETE /api/buttons/upload` - dugmad i upload.
- `GET /api/fabric-proxy`, `GET /api/fabric-tile` - proxy/tile obrada tkanina.
- `GET /api/button-positions` - pozicije dugmadi.

### Admin API rute

- `POST /api/admin/login`, `POST /api/admin/logout`.
- `GET /api/admin/auth/google`, `GET /api/admin/auth/google/callback`.
- `GET/POST/PATCH/DELETE /api/admin/blog/posts`.
- `GET/PATCH /api/admin/site-content`.
- `GET/PATCH /api/admin/font-settings`.
- `GET/PATCH /api/admin/size-guides`.
- `GET/PATCH /api/admin/fulfillment`.
- `GET/PATCH /api/admin/contact-messages`.
- `GET/POST /api/admin/users`.
- `GET/POST/PATCH/DELETE /api/admin/webshop/categories`.
- `GET/PATCH/POST/DELETE /api/admin/webshop/products`.
- `POST /api/admin/webshop/media`.
- `POST /api/admin/webshop/site-assets`.
- `GET/PATCH /api/admin/webshop/landing-settings`.
- `GET/POST /api/admin/webshop/promotions/rules`.
- `PATCH/DELETE /api/admin/webshop/promotions/rules/[ruleId]`.
- `POST /api/admin/webshop/promotions/recompute`.

### Integracioni API

- `POST /api/admin/integrations/sync` - full orchestrated sync.
- `POST /api/admin/integrations/ananas/sync` - Ananas sync.
- `POST /api/admin/integrations/stock/inbound/sync` - inbound stock sync.
- `POST /api/admin/integrations/stock/outbound/export` - outbound stock export.
- `GET /api/admin/integrations/stock/outbound/latest` - poslednji outbound artefakt.
- `GET /api/admin/integrations/runs` - lista runova.
- `GET /api/admin/integrations/runs/[runId]` - detalj runa.
- `POST /api/admin/integrations/runs/[runId]/retry-failures` - retry neuspelih stavki.
- `GET /api/admin/integrations/status` - status integracija.
- `GET/POST /api/admin/integrations/cron` - cron endpoint.

### External servisi i biblioteke

- Supabase: baza, auth, SSR session handling i service role pristup.
- Resend: email slanje ako su env varijable podesene.
- Vercel Analytics: pageview i custom event signali kroz `@vercel/analytics`.
- Ananas API: marketplace product import, proizvodi i discount tokovi kroz env-driven klijent.
- Stock sync: ZIP/CSV inbound i outbound artefakti.
- Sharp: image obrada za asset pipeline.

## Sta klijent dobija

Klijent dobija web shop koji nije samo katalog proizvoda, vec kompletan operativni sistem za online prodaju. Tim moze da upravlja proizvodima, cenama, lagerom, akcijama, landing sekcijama, blogom, porudzbinama, kontakt upitima i newsletter prijavama iz jednog admin panela.

Kupci dobijaju jasan storefront sa pretragom, filtriranjem, detaljima proizvoda, korpom, checkout tokom, korisnickim nalogom i pregledom svojih porudzbina. Za brend koji prodaje garderobu, posebna vrednost je u size guide funkcijama, prikazu dostupnosti, akcijama i custom suits konfiguratoru koji otvara prostor za premium prodajni tok.

Za operativni tim, sistem smanjuje rucni rad jer uvodi integracione tokove za lager i Ananas, logove, retry mehanizme, email obavestenja i centralni pregled poslovnih signala.

## Za koga je resenje

Ovakav sistem odgovara firmama koje imaju proizvodni katalog, fizicke ili online prodajne kanale i potrebu da prodaju direktno preko svog sajta.

Najbolje se uklapa za:

- modne brendove i butike,
- brendove muske ili zenske garderobe,
- firme koje prodaju poslovne uniforme,
- kompanije sa kombinacijom B2C i B2B prodaje,
- trgovce koji imaju lager i marketplace integracije,
- brendove koji zele CMS, web shop i admin u jednom sistemu,
- premium proizvode kod kojih je bitan detaljan prikaz, velicine i personalizacija.

## Tehnicki opis

Projekat je napravljen kao Next.js 15 aplikacija sa App Router arhitekturom, React 19 komponentama i TypeScript kodom. Frontend koristi Tailwind/PostCSS, Sass, Framer Motion, MUI/Headless UI komponente i custom CSS za storefront/admin iskustvo.

Backend logika je implementirana kroz Next.js API rute. Podaci se cuvaju u Supabase bazi kada su kljucevi podeseni, a za razvoj ili fallback postoje lokalni JSON fajlovi u `data/` folderu. Autentifikacija kupaca ide preko Supabase auth-a, dok admin deo ima zaseban admin session/token sistem, role i permisije.

Integracije su organizovane kroz `lib/integrations`, sa Ananas klijentom, stock inbound/outbound tokovima, sync run logovima i retry mehanizmima. Email slanje ide preko Resend-a, a analitika preko Vercel Analytics.

## Prodajni blokovi za landing stranicu

### 1. Web shop koji prati realne operacije

Ne dobijate samo lepu prodajnu stranicu. Dobijate sistem koji povezuje katalog, lager, porudzbine, akcije, korisnike i admin radni tok, tako da online prodaja moze da se vodi iz jednog mesta.

### 2. Admin panel za tim koji svakodnevno radi

Proizvodi, cene, dostupnost, blog, kontakt poruke, newsletter i porudzbine dostupni su kroz admin panel. Tim moze da menja sadrzaj i prati prodajne signale bez ulaska u kod.

### 3. Brzi kupovni tok bez komplikacija

Kupac moze da pretrazuje proizvode, filtrira katalog, pregleda detalje, doda artikle u korpu i posalje porudzbinu kroz jednostavan checkout tok.

### 4. Katalog spreman za rast

Sistem podrzava legacy import, Supabase bazu, lokalni fallback, kategorije, slike, cene, lager, promo pravila i performance indekse za veci broj proizvoda.

### 5. Integracije za ozbiljnu prodaju

Platforma ima pripremljene tokove za Ananas marketplace, inbound lager sync, outbound stock export, run istoriju, logove i retry neuspelih stavki.

### 6. Premium iskustvo za custom proizvode

Custom suits konfigurator omogucava izbor modela odela, tkanina i detalja uz vizuelni preview, cuvanje dizajna i prelazak ka merenju ili porudzbini.

## Predlog strukture stranice agencije

1. Hero: "Web shop i admin sistem za premium modni brend"
2. Kratak opis problema: katalog, lager, porudzbine i sadrzaj na vise mesta.
3. Resenje: centralizovana Next.js platforma za storefront, admin i integracije.
4. Vizuelni pregled javnog sajta: home, web shop, detalj proizvoda, korpa, checkout.
5. Admin panel: dashboard, proizvodi, akcije, porudzbine, content, integracije.
6. Custom suits konfigurator: preview, tkanine, modeli i merenje.
7. Integracije: Supabase, Resend, Ananas, stock sync, Vercel Analytics.
8. Poslovne koristi: manje rucnog rada, brzi update kataloga, bolji tok porudzbina.
9. Tehnicki stack: kratak, razumljiv blok.
10. CTA sekcija: poziv za slican web shop ili audit postojeceg sistema.

## CTA sekcija

### Naslov

Zelite web shop koji radi kao pravi poslovni sistem?

### Tekst

Napravicemo platformu koja povezuje prodaju, katalog, porudzbine, admin tim i integracije, tako da vas sajt ne bude samo izlog, vec alat koji svakodnevno pomaze poslu.

### Dugme

Pokreni moj web shop projekat

## Kratak tehnicki stack

- Framework: Next.js 15, React 19, TypeScript.
- UI: Tailwind CSS/PostCSS, Sass, Framer Motion, MUI, Headless UI, Heroicons.
- Backend: Next.js API routes.
- Baza i auth: Supabase, `@supabase/ssr`, `@supabase/supabase-js`.
- Email: Resend.
- Analitika: Vercel Analytics.
- Integracije: Ananas API, stock inbound/outbound ZIP/CSV sync.
- Storage fallback: lokalni JSON fajlovi u `data/`.
- Image/asset obrada: Sharp i custom Node skripte.
- Testovi: Vitest i Node test skripte za integracije, parity i preview provere.

## Provereno u projektu

Pregledani su:

- `package.json`
- `README.md`
- `README_SETUP.txt`
- struktura `app/` ruta
- javne, admin i integration API rute
- `middleware.ts`
- admin auth i role fajlovi
- `lib/` moduli za katalog, porudzbine, email, newsletter, kontakt, integracije, storefront i Supabase
- `supabase/sql/*.sql`
- `data/*.json`
- `docs/*` runbook i pregled funkcionalnosti
- custom suits konfigurator, options i preview struktura

## Sta nije moglo potpuno da se proveri iz koda

- Nisu provereni produkcioni credentials za Supabase, Resend, Ananas ili stock sync.
- Nije pokrenut realan sync prema Ananas-u ili stock sistemu.
- Nije pronadjen `vercel.json`, pa nije potvrdjen deploy-level cron schedule, iako cron endpoint i runbook postoje.
- Nije pronadjena aktivna karticna payment integracija; `/admin/stripe-tuning` postoji kao admin/tuning strana, ali nema Stripe dependency niti checkout payment toka u pregledanim fajlovima.
