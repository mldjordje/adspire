# Doctor Barber - case study

## Kratak opis za stranicu

Doctor Barber je web aplikacija i booking sistem za barber studio. Projekat kombinuje javni sajt, online zakazivanje, klijentski nalog, admin CMS panel, kalendar termina, upravljanje uslugama, klijentima, notifikacijama i backend API za rad sa MySQL bazom.

Poslovna vrednost projekta je u tome sto barber studio dobija centralizovan sistem za prijem termina, pregled rasporeda, kontrolu dostupnosti i komunikaciju sa klijentima, umesto da se oslanja samo na poruke, pozive i rucno vodjene evidencije.

## Hero sekcija

### Naslov

Online booking sistem za moderan barber studio

### Podnaslov

Doctor Barber spaja luksuzan javni sajt, brzo zakazivanje termina, klijentski nalog i kompletan admin panel za svakodnevno upravljanje rasporedom.

### CTA dugmad

- Pogledaj case study
- Zelim slican sistem
- Zakazi konsultaciju

## Case study uvod

Za Doctor Barber je napravljena Next.js aplikacija sa javnim delom za prezentaciju studija i online zakazivanje, kao i zasebnim CMS/admin panelom za upravljanje terminima, klijentima, uslugama, kalendarom, podesavanjima i notifikacijama.

Sistem resava nekoliko prakticnih problema: klijent moze sam da se registruje, prijavi, izabere uslugu, vidi slobodne termine i zakaze termin; salon moze da vidi raspored, potvrdi ili izmeni termin, blokira nedostupne periode, vodi evidenciju klijenata i prati osnovne poslovne metrike.

## Glavne funkcionalnosti

### Javni sajt

- Luksuzna landing stranica za Doctor Barber studio.
- Hero sekcija sa vizualom studija, brendom i CTA dugmadima.
- Navigacija ka zakazivanju, studiju, prijavi i registraciji.
- Sekcija "Kako funkcionise" sa pravilima pripreme i otkazivanja.
- Sekcija "Studio" sa radnim vremenom, lokacijom, kontakt informacijama i Google Maps embed-om.
- Galerija/ambijent sa slikama iz `public` foldera.
- Instagram blok sa linkom ka profilu `@doctor__barber`.
- Google review blok sa CTA dugmetom za ocenjivanje.
- Visejezicni UI: srpski, engleski, nemacki i italijanski kroz lokalni language provider.
- SEO metadata, canonical URL, Open Graph podaci i keyword-i za barber/frizer pojmove.
- Vercel Analytics integracija.

### Online zakazivanje

- Zakazivanje je dostupno samo prijavljenim klijentima.
- Izbor usluge iz liste aktivnih usluga.
- Fallback lista usluga postoji u frontendu ako API nije dostupan.
- Dinamicki kalendar slobodnih termina na osnovu:
  - radnog vremena,
  - radnih dana,
  - trajanja usluge,
  - pauza,
  - postojecih termina,
  - blokada u kalendaru,
  - minimalnog vremena unapred za zakazivanje.
- Podrska za VIP termine pre i posle radnog vremena.
- Provera konflikta termina i na frontendu i na backendu.
- Napomena uz termin.
- Kreiranje `.ics` fajla za dodavanje termina u kalendar nakon uspesnog zakazivanja.
- Statusi termina: `pending`, `confirmed`, `completed`, `cancelled`, `no_show`.
- Prikaz upozorenja klijentu ako ima termine oznacene kao `no_show`, uz obracun iznosa za naplatu.

### Korisnicki nalog

- Registracija klijenta preko imena, telefona i opcionog email-a.
- Prijava klijenta preko telefona i/ili email-a.
- Klijentski token se cuva u browser `localStorage`.
- Pregled svojih termina.
- Podela termina na buduce termine i istoriju.
- Otkazivanje termina uz pravilo minimalnog vremena pre termina.
- Prezakazivanje termina kroz modal.
- Odjava klijenta i brisanje lokalno sacuvanih podataka.

### Admin panel

- CMS login stranica za administratore.
- Admin navigacija: Dashboard, Termini, Kalendar, Klijenti, Usluge, Notifikacije, Podesavanja.
- Admin auth se cuva kroz `localStorage` vrednost `db_admin_auth`.
- Admin API zahtevi koriste `NEXT_PUBLIC_ADMIN_KEY` / `X-Admin-Key`.
- Visejezicni admin UI za srpski, engleski, nemacki i italijanski.

### Dashboard

- Pregled ukupnih termina.
- Pregled ukupnih klijenata.
- Broj aktivnih usluga.
- Danasnji termini.
- Predstojeci termini.
- Neprocitane notifikacije.
- Blokade za danasnji dan.
- Ukupna zarada na osnovu zavrsenih termina.
- Planirana zarada na osnovu buducih neotkazanih termina.
- Prosecna cena termina.
- Statusni pregled termina.
- Najtrazenije usluge.
- Brze akcije ka kalendaru, terminima, klijentima i uslugama.

### Upravljanje terminima

- Lista termina sa statusima.
- Filtriranje termina po pretrazi, datumu, statusu i izvoru.
- Kreiranje termina iz admin panela.
- Izmena termina.
- Brisanje termina.
- Promena statusa termina.
- Pretraga i izbor postojeceg klijenta pri rucnom kreiranju termina.
- Evidencija izvora termina: `web` ili `admin`.
- Upravljanje blokadama za odabrani datum.

### Admin kalendar

- Vizuelni kalendar rasporeda termina.
- Prikaz radnih dana i vremenskih slotova.
- Prikaz zauzetih termina i blokiranih perioda.
- Kreiranje termina direktno iz kalendara.
- Kreiranje blokade termina direktno iz kalendara.
- Izmena termina i blokada.
- Brisanje termina i blokada.
- Potvrdjivanje termina.
- Oznacavanje termina kao `no_show`.
- Prezakazivanje termina iz admin modala.
- Brze akcije za poziv i SMS ako termin ima broj telefona.
- Service color podrska za vizuelno razlikovanje termina po usluzi.

### Klijenti

- Lista registrovanih klijenata.
- Pretraga klijenata po imenu, telefonu ili email-u.
- Pregled telefona, email-a, adrese, opisa, datuma registracije, broja termina i poslednjeg termina.
- Izmena podataka klijenta.
- Blokiranje i odblokiranje klijenta.
- Backend sprecava online zakazivanje za blokirane klijente.

### Katalog usluga

- Lista usluga.
- Kreiranje nove usluge.
- Izmena postojece usluge.
- Aktivacija/deaktivacija usluge.
- Brisanje usluge.
- Polja usluge: naziv, trajanje, cena, opis, boja termina, aktivnost i VIP prozor.
- VIP prozor moze biti `before` ili `after`, za termine pre ili posle radnog vremena.

### Podesavanja

- Minimalno vreme pre zakazivanja.
- Minimalno vreme pre otkazivanja.
- Homepage notice poruka za javni sajt.
- Ukljucivanje/iskljucivanje email notifikacija.

### Obavestenja

- Admin lista notifikacija.
- Broj neprocitanih notifikacija u admin navigaciji.
- Oznacavanje pojedinacne notifikacije kao procitane.
- Oznacavanje svih notifikacija kao procitanih.
- Backend kreira notifikaciju kada klijent otkaze termin.

### Automatizacije i integracije

- Email notifikacija adminu za novi termin, ako su email notifikacije ukljucene.
- Email notifikacija klijentu kada se termin potvrdi, ako klijent ima email.
- Web push pretplata klijenta kroz browser Push API.
- Queue tabela za push poruke (`push_messages`).
- Service worker preuzima pending push payload i prikazuje browser notifikaciju.
- VAPID konfiguracija za web push.
- iOS/ICS calendar feed endpoint za citanje termina i blokada.
- PWA manifest za javnu aplikaciju.
- PWA manifest za admin aplikaciju.
- Service worker registracija kroz `app/providers.tsx`.
- Google Maps embed i link ka Google Maps.
- Instagram eksterni link.
- Google review eksterni link.
- Vercel Analytics.

## Modeli podataka / entiteti

- `clients`: klijenti sistema. Cuva ime, telefon, email, adresu, opis, token, status blokade i datume kreiranja/izmene.
- `appointments`: termini. Cuva klijenta, uslugu, trajanje, cenu, datum, vreme, napomenu, status, ko je otkazao, vreme otkazivanja, izvor termina i datum kreiranja.
- `services`: usluge salona. Cuva ID, naziv, cenu, trajanje, opis, boju, VIP prozor, aktivnost i datume kreiranja/izmene.
- `notifications`: admin notifikacije. Cuva tip, poruku, povezani termin, datum kreiranja i datum citanja.
- `calendar_blocks`: blokade kalendara. Cuva datum, vreme, trajanje, napomenu i datum kreiranja.
- `settings`: podesavanja sistema. Cuva parove `name` / `value`, kao sto su minimalno vreme za zakazivanje, minimalno vreme za otkazivanje, homepage notice i email toggle.
- `push_subscriptions`: browser push pretplate klijenata. Cuva klijenta, endpoint, hash endpointa, push kljuceve, user agent i expiration time.
- `push_messages`: red poruka za push notifikacije. Cuva pretplatu, naslov, tekst, URL, povezani termin, datum kreiranja i datum isporuke.

## API, integracije i automatizacije

Backend je PHP API namenjen za upload na cPanel, uz MySQL bazu.

### API rute

- `GET /api/index.php`: health check.
- `GET /api/services.php`: lista aktivnih usluga.
- `GET /api/services.php?include=all`: lista svih usluga za admina.
- `POST /api/services.php`: admin akcije `create`, `update`, `toggle_active`, `delete`.
- `GET /api/availability.php?date=YYYY-MM-DD`: zauzeti termini i blokade za datum.
- `POST /api/clients.php`: registracija ili prijava klijenta kroz `mode=register` ili `mode=login`.
- `GET /api/clients.php`: admin lista klijenata.
- `POST /api/clients.php`: admin akcije `update` i `set_blocked`.
- `GET /api/appointments.php`: admin lista termina.
- `GET /api/appointments.php?date=YYYY-MM-DD`: admin lista termina za datum.
- `GET /api/appointments.php?clientToken=...`: termini jednog klijenta.
- `POST /api/appointments.php`: kreiranje termina, klijentsko otkazivanje, admin kreiranje, admin izmena, promena statusa i brisanje.
- `GET /api/settings.php`: javna podesavanja za booking, cancel, homepage notice i email toggle.
- `POST /api/settings.php`: admin izmena podesavanja.
- `GET /api/notifications.php`: admin lista notifikacija i broj neprocitanih.
- `POST /api/notifications.php`: `mark_read` i `mark_all_read`.
- `GET /api/blocks.php?date=YYYY-MM-DD`: admin lista blokada za datum.
- `POST /api/blocks.php`: kreiranje blokade.
- `DELETE /api/blocks.php?id=...`: brisanje blokade.
- `POST /api/push-subscriptions.php`: subscribe/unsubscribe klijentske push pretplate.
- `GET /api/push-subscriptions.php?action=pending&endpoint=...`: preuzimanje sledece pending push poruke za service worker.
- `GET /api/calendar-feed.php?calendarKey=...`: read-only iOS/ICS feed termina i blokada.

### Backend pravila

- Admin endpointi zahtevaju `X-Admin-Key` header ili `adminKey` query parametar.
- Sistem proverava konflikte termina prema postojecim terminima i blokadama.
- Online zakazivanje je ograniceno brojem dana unapred iz konfiguracije.
- Online zakazivanje postuje minimalni lead time iz podesavanja.
- Klijentsko otkazivanje postuje minimalni cancel lead time iz podesavanja.
- Blokirani klijent ne moze da zakaze online termin.
- Kada admin potvrdi termin, backend salje email/push notifikaciju klijentu ako su podaci i konfiguracija dostupni.
- Kada klijent otkaze termin, backend kreira admin notifikaciju.

## Sta klijent dobija

Klijent dobija sistem koji smanjuje broj rucnih poruka, poziva i gresaka u rasporedu. Posetioci mogu sami da izaberu uslugu i slobodan termin, dok vlasnik salona iz admin panela ima pregled svih rezervacija, klijenata, blokada, statusa i osnovnih poslovnih metrika.

Umesto da se termini vode kroz chat aplikacije ili papirni planer, Doctor Barber dobija digitalni raspored koji radi 24/7, jasno prikazuje slobodne termine, cuva istoriju klijenata i omogucava brzu reakciju kada treba potvrditi, izmeniti, otkazati ili blokirati termin.

## Za koga je resenje

Ovakav sistem odgovara:

- barber shopovima,
- frizerskim salonima,
- beauty salonima,
- kozmetickim salonima,
- masaznim i wellness studijima,
- privatnim ordinacijama i malim usluznim biznisima koji rade po terminima,
- svim lokalnim biznisima kojima treba jednostavan booking, klijentska evidencija i admin kalendar.

## Tehnicki opis

Frontend je napravljen u Next.js aplikaciji sa App Router strukturom. UI koristi React, TypeScript, Tailwind CSS, HeroUI komponente, Framer Motion i GSAP animacije. Aplikacija ima javni deo, klijentske stranice i admin panel.

Backend je PHP API projektovan za cPanel hosting. Podaci se cuvaju u MySQL bazi. API pokriva termine, klijente, usluge, podesavanja, notifikacije, blokade kalendara, push pretplate i calendar feed.

Sistem koristi PWA manifest, service worker, browser push notifikacije, email slanje kroz PHP `mail()`, Vercel Analytics i env konfiguraciju za API URL, admin pristup, calendar key i VAPID kljuceve.

### Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- HeroUI
- Framer Motion
- GSAP
- PHP API
- MySQL
- Service Worker / PWA
- Web Push / VAPID
- Vercel Analytics

## Prodajni blokovi za landing stranicu

### Online zakazivanje bez cekanja

Klijenti biraju uslugu, datum i slobodan termin direktno sa sajta. Sistem automatski proverava zauzete termine, trajanje usluge i blokade u kalendaru.

### Admin panel za svakodnevni rad

Vlasnik salona dobija pregled termina, klijenata, usluga, statusa, blokada i notifikacija na jednom mestu. Sve sto je potrebno za dnevno poslovanje nalazi se u jednom CMS panelu.

### Kalendar koji prati realan raspored

Termini, blokade, pauze, radno vreme i VIP slotovi povezani su u jedan kalendar, tako da se smanjuje rizik od duplog zakazivanja i rucnih gresaka.

### Klijentski nalog i istorija termina

Klijenti mogu da se registruju, prijave, vide svoje buduce termine i istoriju, otkazu termin u dozvoljenom roku ili ga prezakazu.

### Notifikacije i potvrde

Sistem podrzava admin notifikacije, email obavestenja i web push mehanizam za obavestavanje klijenata kada je termin potvrdjen.

### Resenje spremno za lokalni biznis

Ovakva aplikacija je posebno korisna za salone i usluzne biznise koji zele bolji raspored, profesionalniji utisak i manje vremena izgubljenog na rucno dogovaranje termina.

## Predlog strukture stranice agencije

1. Hero: "Online booking sistem za moderan barber studio"
2. Kratak opis projekta i poslovnog problema
3. Glavni rezultati: booking, admin panel, klijentski nalog, kalendar
4. Prikaz javnog sajta
5. Prikaz online zakazivanja
6. Prikaz klijentskog naloga
7. Prikaz admin panela i dashboarda
8. Kalendar, blokade i upravljanje terminima
9. API, baza i automatizacije
10. Stack i arhitektura
11. Za koga je slicno resenje
12. CTA sekcija za konsultaciju

## CTA sekcija

### Naslov

Zelis sistem za zakazivanje koji radi i kada ti ne stizes da odgovaras na poruke?

### Tekst

Napravicemo web aplikaciju koja spaja prezentaciju, online booking, klijentski nalog i admin panel prilagodjen tvom nacinu rada.

### Dugme

Zakazi besplatnu konsultaciju

## CTA tekstovi

- Zelim ovakav booking sistem
- Napravi mi slican projekat
- Zakazi konsultaciju
- Posalji mi ponudu
- Pogledaj kako bi ovo radilo za moj biznis
- Automatizuj moje termine
- Pricajmo o mom salonu

## Sta nije pronadjeno u projektu

Nisam pronasao implementirana online placanja, korpu, porudzbine, payment gateway integraciju, cron job fajlove, CMS za blog, niti upload/storage modul za galeriju. Usluge postoje kao katalog usluga, ali ne postoji ecommerce katalog proizvoda.

## Napomena o proveri

Inventar je napravljen iz lokalne strukture projekta, `package.json`, `README.md`, `api/README.md`, Next.js ruta, React komponenti, PHP API fajlova, SQL scheme, migracija, PWA manifesta i service worker-a. Nisam pokretao produkcioni API niti proveravao stvarnu isporuku email/push notifikacija na zivom domenu, pa su te stavke opisane kao implementirane u kodu, ne kao produkciono verifikovane.
