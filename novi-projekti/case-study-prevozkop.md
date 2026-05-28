# Prevoz Kop - case study

## Kratak opis za stranicu

Prevoz Kop je web platforma za gradjevinsku firmu iz Nisa koja kombinuje javni SEO sajt, online upite za beton i behaton, katalog proizvoda, galeriju projekata i interni admin panel za vodjenje prodaje i operative.

Projekat nije samo prezentacioni sajt. U pozadini postoji sistem za upravljanje leadovima, ponudama, projektima, behaton proizvodima, radnicima, platama, vozilima, troskovima i kalendarom isporuka. Poslovna vrednost je u tome sto klijent preko istog sistema dobija vise upita sa Google-a, lakse prati prodaju i ima bolju kontrolu svakodnevne operative.

## Hero sekcija

### Naslov
Digitalni prodajni i operativni sistem za betonsku bazu

### Podnaslov
Za Prevoz Kop je izgradjen moderan Next.js sajt sa SEO landing stranicama, online upitima, katalogom behatona, galerijom projekata i admin panelom za prodaju, ponude, isporuke, vozila, radnike i troskove.

### CTA dugmad
- Pogledaj kako radi sistem
- Zatrazi slicno resenje
- Napravi sajt koji donosi upite

## Case study uvod

Prevoz Kop posluje u oblasti isporuke gotovog betona, behatona, beton pumpi, zemljanih radova i gradjevinske logistike. Projekat je napravljen da objedini dve potrebe: javni deo koji privlaci kupce preko Google pretrage i interni deo koji timu pomaze da prati upite, ponude, isporuke i operativne troskove.

Javni deo sajta je optimizovan za lokalne i komercijalne pretrage kao sto su isporuka betona Nis, beton po gradovima, behaton Srbija, behaton Nis i behaton po gradovima. Korisnici mogu da posalju upit preko forme, pozovu firmu ili kliknu na WhatsApp/telefon CTA.

Admin deo omogucava firmi da od primljenog upita napravi prodajni tok: lead se evidentira, menja mu se status, dodaju se beleske, kreiraju se ponude i generise PDF za slanje kupcu. Pored prodaje, sistem pokriva i operativne module: radnike, plate, vozila, troskove i kalendar isporuka.

## Glavne funkcionalnosti

### Javni sajt

- Pocetna strana sa hero sliderom, uslugama, statistikom, linkovima ka najvaznijim landing stranicama i istaknutim projektima iz baze.
- Strana "O nama" sa opisom firme, pozicioniranjem i CTA linkovima.
- Strana "Usluge" sa opisom isporuke betona, visokih pumpi za beton, zemljanih radova i pripreme terena.
- Kontakt stranice na srpskom i engleskom jeziku.
- Footer, navigacija i floating CTA za brzi kontakt.
- JSON-LD strukturirani podaci za organizaciju, lokalni biznis, usluge, FAQ i breadcrumb elemente.
- Dinamicki `robots.ts` i `sitemap.ts`.

### Online upiti i lead forma

- Forma za slanje upita ka backend API ruti `POST /api/orders`.
- Polja za telefon, ime, email, temu, tip/model, kolicinu, jedinicu i napomenu.
- Automatsko prepoznavanje tipa usluge: beton, behaton ili drugo.
- Automatsko cuvanje izvora stranice, gradskog slug-a i UTM parametara.
- Success/error stanje forme i fallback poziv telefonom ako API nije dostupan.
- Google Ads conversion tracking za submit forme.
- Posebna prilagodjenja forme za beton i behaton landing stranice.

### Katalog proizvoda/usluga

- Katalog behaton proizvoda koji se ucitava iz API-ja.
- Strana `/behaton` sa listom proizvoda, galerijom, benefitima, use case sekcijama, FAQ blokovima i formom za upit.
- Detaljne stranice proizvoda `/behaton/[slug]`.
- Podrska za slike, galeriju, dokument proizvoda, opis, specifikacije, primene, status i redosled sortiranja.
- Admin CRUD za behaton proizvode, slike, galerije i dokumente.

### Lokalne SEO landing stranice

- Dinamicke behaton landing stranice po gradovima: `/behaton/grad/[slug]`.
- Dinamicke beton landing stranice po gradovima: `/beton/grad/[slug]`.
- Gradovi se generisu iz lokalnog content modula.
- Lokalni sadrzaj za Nis ima dodatne blokove za cenu, prodaju, ugradnju i lokalne zone.
- Sitemap automatski ukljucuje behaton i beton gradske rute.

### Projekti i galerija

- Lista projekata na `/projekti`.
- Detaljna stranica projekta `/projekti/[slug]`.
- Projekti se ucitavaju iz API-ja i baze.
- Svaki projekat podrzava naslov, slug, kratak opis, telo, hero sliku, galeriju, tagove, status i datum objave.
- Admin CRUD za projekte, hero sliku i galeriju.

### Media / galerija

- Lokalni vizuelni asseti za beton, kamione, radove, tim, behaton i proizvode.
- Upload projekata u `/uploads/projects`.
- Upload proizvoda u `/uploads/products`.
- Backend validacija MIME tipa i velicine fajla.
- PHP serviranje upload fajlova sa cache/ETag zaglavljima.
- Podrska za slike proizvoda, galerijske slike i dokumente proizvoda.

### Admin panel

- Login/logout kroz PHP session cookie.
- Admin dashboard sa brzim status karticama.
- Moduli grupisani na prodaju, operativu i sadrzaj sajta.
- Pregled aktivnih porudzbina, isporuka za nedelju, preostalih plata, troskova meseca, upozorenja za vozila i broja proizvoda.
- Zasticene admin stranice:
  - `/admin`
  - `/admin/pregled`
  - `/admin/orders`
  - `/admin/ponude`
  - `/admin/projects`
  - `/admin/products`
  - `/admin/radnici`
  - `/admin/troskovi`
  - `/admin/vozila`
  - `/admin/kalendar`

### Lead CRM i porudzbine

- Lista porudzbina/upita iz forme.
- Filteri po statusu, pipeline fazi, tipu usluge, gradu, datumu i pretrazi.
- Statusi porudzbine: `new`, `in_progress`, `done`.
- Pipeline faze: `new`, `qualified`, `offered`, `negotiation`, `won`, `lost`.
- Follow-up datum i razlog gubitka.
- Lead score polje u bazi.
- Cuvanje izvora: `source_page`, `utm_source`, `utm_medium`, `utm_campaign`.
- Beleske po porudzbini.

### Ponude

- Kreiranje ponude iz postojece porudzbine.
- Kreiranje rucne ponude van sajta preko admin sekcije `/admin/ponude`.
- Stavke ponude sa opisom, kolicinom, jedinicom, cenom i totalom.
- PDV stopa, subtotal, PDV iznos, total i valuta.
- Rok vazenja, uslovi placanja, uslovi isporuke i napomena.
- Statusi ponude: `draft`, `sent`, `accepted`, `paid`, `rejected`.
- Print-ready HTML prikaz ponude.
- Direktan PDF download ponude iz API-ja.

### Radnici i plate

- Evidencija radnika sa telefonom, pozicijom, tipom obracuna, default platom/dnevnicom, napomenom i aktivnim statusom.
- Pozicije mogu biti standardne ili fleksibilno dodate kroz formu.
- Obracun plata po mesecu i godini.
- Tipovi obracuna: fiksna plata ili dnevnica.
- Radni dani, dnevnica, mesecna plata, akontacije, bonus, odbici i ukupno za isplatu.
- Status isplate: `unpaid`, `partial`, `paid`.
- Generisanje mesecnih obracuna za radnike.
- Summary za ukupno radnika, aktivne radnike, ukupno za isplatu, isplaceno i preostalo.

### Troskovi

- Mesecna evidencija troskova.
- Kategorije troskova: gorivo, materijal, servis, registracija, plate, zakup, racuni i ostalo, uz podrsku za nove kategorije.
- Nacin placanja: kes, racun/banka, kartica ili drugo.
- Dobavljac, opis, iznos, datum i napomena.
- Trosak moze biti povezan sa vozilom i/ili radnikom.
- Summary troskova po kategorijama.

### Vozila i servisi

- Evidencija vozila i masina.
- Tipovi vozila: mikser, kamion, pumpa, kombi, masina ili drugo.
- Registracioni broj, istek registracije, poslednji servis, sledeci servis, kilometraza i radni sati.
- Status vozila: aktivno, neaktivno ili servis.
- Upozorenja za registraciju i servis.
- Pregled mesecnih troskova po vozilu.
- Summary za ukupno vozila, aktivna vozila, vozila na servisu, upozorenja i ukupne troskove.

### Kalendar isporuka

- Nedeljni/dnevni raspored isporuka.
- Isporuka moze biti povezana sa porudzbinom, vozilom i radnikom.
- Rucni unos isporuke kada ne postoji porudzbina sa sajta.
- Podaci: kupac, adresa, datum/vreme, kolicina, usluga, vozilo, radnik, status i napomena.
- Statusi isporuke: `scheduled`, `in_progress`, `done`, `cancelled`.
- Mini raspored sa vremenskim slotovima.
- Print funkcija za kalendar.
- Summary isporuka po statusima.

### Analitika i pracenje

- Vercel Analytics integracija.
- Google Ads global tag kroz `NEXT_PUBLIC_GADS_ID`.
- Google Ads konverzije za formu, telefon i WhatsApp CTA kroz env promenljive.
- Leadovi cuvaju UTM parametre i source page.
- Dokumentovana Google Ads struktura za behaton kampanje u `docs/google-ads-behaton-srbija.md`.

### SEO / visejezicnost

- Srpski javni sajt kao primarni deo.
- Engleske rute postoje za:
  - `/en`
  - `/en/about`
  - `/en/contact`
  - `/en/order-concrete`
  - `/en/projects`
  - `/en/services`
- Metadata helper, canonical, Open Graph i alternate languages.
- Sitemap generise staticke rute, gradske rute, proizvode i projekte.
- Robots disallow za `/admin` i `/api/admin`.

### PWA / mobilno iskustvo

U projektu nisam pronasao potpunu PWA implementaciju sa service workerom ili manifestom. Postoje mobilno prilagodjeni layout, responsive komponente, floating CTA i ikone (`app/icon.png`, `app/apple-icon.png`), ali ne i kompletan PWA sloj.

## Modeli podataka / entiteti

- `admins`: administratori sistema sa email adresom i password hash-om.
- `projects`: projekti/reference koji se prikazuju na sajtu.
- `project_media`: galerijske slike vezane za projekat.
- `products`: proizvodi, primarno behaton katalog, sa kategorijom, tipom, opisima, specifikacijama, slikom, dokumentom i statusom.
- `product_media`: galerijske slike vezane za proizvod.
- `orders`: upiti/porudzbine sa sajta, lead pipeline, izvor stranice, UTM parametri i osnovni kontakt podaci.
- `order_notes`: interne beleske za porudzbine.
- `order_offers`: komercijalne ponude vezane za porudzbine, ukljucujuci stavke, iznose, PDV, status i uslove.
- `workers`: radnici, pozicije, telefoni, tip plate i aktivni status.
- `worker_payrolls`: mesecni obracuni plata za radnike.
- `vehicles`: vozila/masine, registracije, servisi, kilometraza, radni sati i status.
- `company_expenses`: troskovi firme, kategorije, iznosi, nacin placanja i veze ka radnicima/vozilima.
- `delivery_calendar`: kalendar isporuka sa kupcem, adresom, terminom, kolicinom, uslugom, vozilom, radnikom i statusom.

## API, integracije i automatizacije

### Javni API

- `GET /api/health` ili `/api` - health/status response.
- `GET /api/projects` - lista projekata.
- `GET /api/projects/{slug}` - detalj projekta.
- `GET /api/products` - lista proizvoda sa filterima.
- `GET /api/products/{slug}` - detalj proizvoda.
- `POST /api/orders` - kreiranje upita/porudzbine sa sajta.

### Admin API

- `POST /api/admin/login`
- `POST /api/admin/logout`
- `GET /api/admin/projects`
- `POST /api/admin/projects`
- `GET /api/admin/projects/{id}`
- `PUT /api/admin/projects/{id}`
- `DELETE /api/admin/projects/{id}`
- `POST /api/admin/projects/{id}/hero`
- `POST /api/admin/projects/{id}/media`
- `DELETE /api/admin/projects/{projectId}/media/{mediaId}`
- `GET /api/admin/products`
- `POST /api/admin/products`
- `GET /api/admin/products/{id}`
- `PUT /api/admin/products/{id}`
- `DELETE /api/admin/products/{id}`
- `POST /api/admin/products/{id}/image`
- `POST /api/admin/products/{id}/media`
- `DELETE /api/admin/products/{productId}/media/{mediaId}`
- `POST /api/admin/products/{id}/document`
- `GET /api/admin/orders`
- `PUT /api/admin/orders/{id}`
- `DELETE /api/admin/orders/{id}`
- `GET /api/admin/orders/{id}/notes`
- `POST /api/admin/orders/{id}/notes`
- `GET /api/admin/orders/{id}/offers`
- `POST /api/admin/orders/{id}/offers`
- `GET /api/admin/offers`
- `PUT /api/admin/offers/{id}`
- `GET /api/admin/offers/{id}/print`
- `GET /api/admin/offers/{id}/pdf`
- `POST /api/admin/manual-offers`
- `GET /api/admin/workers`
- `POST /api/admin/workers`
- `PUT /api/admin/workers/{id}`
- `DELETE /api/admin/workers/{id}`
- `GET /api/admin/payrolls`
- `POST /api/admin/payrolls/generate`
- `GET /api/admin/payrolls/summary`
- `PUT /api/admin/payrolls/{id}`
- `GET /api/admin/expenses`
- `POST /api/admin/expenses`
- `GET /api/admin/expenses/summary`
- `PUT /api/admin/expenses/{id}`
- `DELETE /api/admin/expenses/{id}`
- `GET /api/admin/vehicles`
- `POST /api/admin/vehicles`
- `GET /api/admin/vehicles/summary`
- `PUT /api/admin/vehicles/{id}`
- `DELETE /api/admin/vehicles/{id}`
- `GET /api/admin/deliveries`
- `POST /api/admin/deliveries`
- `GET /api/admin/deliveries/summary`
- `PUT /api/admin/deliveries/{id}`
- `DELETE /api/admin/deliveries/{id}`

### Integracije

- MySQL baza preko PHP PDO.
- PHP session auth za admin panel.
- Email notifikacije za nove upite preko PHP `mail()`.
- Vercel Analytics.
- Google Ads global tag i conversion events.
- Upload storage preko cPanel filesystem putanja za projekte i proizvode.
- CORS konfiguracija za frontend domen i Vercel preview domen.

### Automatizacije

- Automatsko slanje email obavestenja kada stigne novi upit.
- Automatsko cuvanje source page i UTM parametara uz lead.
- Automatsko slanje Google Ads conversion event-a posle forme.
- Generisanje mesecnih obracuna plata iz podataka radnika.
- Racunanje summary podataka za plate, troskove, vozila i isporuke.
- Generisanje print i PDF verzije ponude.
- Cache javnih GET API odgovora za projekte i proizvode.
- Next.js revalidate za javne strane i sitemap.

Nisam pronasao cron poslove u kodu.

## Sta klijent dobija

Klijent dobija sistem koji radi kao prodajni kanal i interna operativna tabla u isto vreme. Sajt je optimizovan da dovodi upite za beton i behaton, a svaki upit se automatski pretvara u lead koji tim moze da obradi, kvalifikuje, prati i pretvori u ponudu.

Umesto da se upiti gube kroz pozive, poruke i papire, sve zavrsava u jednom sistemu: kontakt, izvor upita, grad, kolicina, tip usluge, follow-up, beleske i ponude. Kada kupac trazi cenu, tim moze brzo da napravi PDF ponudu i nastavi prodajni proces.

Pored prodaje, firma dobija pregled operative: ko radi, koliko plata treba isplatiti, koji troskovi su nastali, koja vozila imaju servis ili registraciju, i sta je zakazano za isporuku. To direktno smanjuje haos u svakodnevnom poslu i daje vlasniku jasniji pregled nad firmom.

## Za koga je resenje

Ovakav sistem odgovara firmama koje imaju terenske usluge, vozila, radnike, vise tipova ponuda i potrebu da preko sajta dobijaju ozbiljne upite.

Posebno je pogodan za:
- betonske baze i firme za isporuku gotovog betona
- firme koje prodaju i ugradjuju behaton
- gradjevinske firme sa mehanizacijom
- firme za zemljane radove, iskope, tamponiranje i pripremu terena
- kompanije sa flotom vozila i redovnim isporukama
- lokalne usluzne biznise koji zele SEO landing stranice po gradovima
- B2B/B2C firme kojima treba kombinacija sajta, CRM-a, ponuda i operative

## Tehnicki opis

Frontend je napravljen u Next.js aplikaciji sa App Router arhitekturom, React komponentama, TypeScript-om i Tailwind CSS stilovima. Koristi HeroUI komponente za admin interfejs, Framer Motion/GSAP za animacije i Vercel Analytics za pracenje.

Backend je custom PHP API za cPanel okruzenje. API koristi PDO konekciju ka MySQL bazi, session cookie autentifikaciju za admin deo, JSON REST rute, upload fajlova, email slanje i server-side generisanje PDF ponuda.

Baza je MySQL, sa SQL semom i migracijama u `sql/` folderu. Frontend komunicira sa backendom preko `NEXT_PUBLIC_API_BASE`, a produkcioni API je predvidjen na `https://api.prevozkop.rs/api`.

Arhitektura je prakticna za klijente koji imaju Vercel frontend i postojeci cPanel hosting za bazu, fajlove i PHP API.

## Prodajni blokovi za landing stranicu

### 1. Sajt koji donosi konkretne upite
Napravljen je SEO sajt koji cilja pretrage sa jasnom namerom kupovine: isporuka betona, beton po gradovima, behaton Srbija, behaton Nis i ugradnja behatona. Korisnik brzo dolazi do forme, telefona ili WhatsApp CTA-a.

### 2. Svaki upit odmah ulazi u prodajni proces
Kontakt forma ne salje samo poruku. Ona kreira lead sa tipom usluge, kolicinom, gradom, izvorom stranice i UTM parametrima, tako da tim zna odakle je upit dosao i kako da ga prati.

### 3. Ponude bez Word-a, Excela i rucnog prepisivanja
Iz admin panela se kreiraju ponude sa stavkama, cenama, PDV-om, rokom vazenja i uslovima isporuke. Ponuda moze da se otvori za stampu ili preuzme kao PDF.

### 4. Operativa na jednom mestu
Radnici, plate, vozila, servisi, registracije, troskovi i isporuke nalaze se u istom admin panelu. Vlasnik dobija jasniji pregled nad dnevnim i mesecnim obavezama.

### 5. Lokalni SEO za gradove i usluge
Sistem podrzava landing stranice po gradovima za beton i behaton, sto firmi daje vecu sansu da se pojavi na lokalnim Google pretragama i dovede relevantne kupce.

### 6. Skalabilan temelj za rast
Resenje moze da se siri novim proizvodima, projektima, gradovima, dodatnim modulima i kampanjama bez promene osnovne arhitekture.

## Predlog strukture stranice agencije

1. Hero: "Digitalni prodajni i operativni sistem za betonsku bazu"
2. Kratak opis problema: upiti, ponude, isporuke i operativa su ranije rasuti.
3. Resenje u jednoj recenici: SEO sajt + lead CRM + admin operativa.
4. Vizuelni prikaz javnog sajta: pocetna, beton, behaton, gradske stranice.
5. Online upiti i Google Ads tracking.
6. Katalog behaton proizvoda i projekti/reference.
7. Admin panel: prodaja, ponude i lead pipeline.
8. Operativni moduli: radnici, plate, troskovi, vozila, kalendar isporuka.
9. Modeli podataka i tehnicka arhitektura.
10. Poslovna vrednost: vise leadova, brza obrada, manje rucnog rada.
11. Za koga je ovakav sistem.
12. CTA sekcija za slicno resenje.

## CTA sekcija

### Naslov
Zelite sajt koji ne samo da izgleda dobro, vec vodi prodaju i operativu?

### Tekst
Mozemo da napravimo slican sistem za firmu koja zeli vise kvalitetnih upita, bolji pregled prodaje i manje rucnog rada u svakodnevnom poslovanju.

### Dugme
Zatrazi procenu za slican sistem

## Kratak inventar stack-a

- Frontend: Next.js, React, TypeScript
- UI/styling: Tailwind CSS, HeroUI, custom komponente
- Animacije: Framer Motion, GSAP
- Backend: PHP 8+ stil, custom REST API
- Baza: MySQL
- Auth: PHP sessions za admin panel
- Hosting model: Vercel frontend + cPanel/PHP backend
- Analytics/ads: Vercel Analytics, Google Ads gtag i conversion events
- Email: PHP `mail()` za lead notifikacije
- Storage: cPanel filesystem upload za projekte i proizvode
- SEO: metadata, canonical, sitemap, robots, JSON-LD strukturirani podaci

## Sta nije pronadjeno ili nije moglo biti provereno iz koda

- Nisam pronasao implementirana online placanja.
- Nisam pronasao korisnicke naloge za krajnje kupce; postoji samo admin autentifikacija.
- Nisam pronasao cron poslove.
- Nisam pronasao full PWA implementaciju sa service workerom.
- Nisam proveravao produkcionu bazu, stvarne produkcione podatke, isporuku emailova ni rad live API-ja, vec samo kod, konfiguraciju, SQL semu, migracije i dokumentaciju u projektu.
- U nekim fajlovima postoje encoding/mojibake tragovi u tekstu, a projekat ima i dokument `docs/DB_ENCODING_AUDIT.md`, ali nisam menjao postojece fajlove.
