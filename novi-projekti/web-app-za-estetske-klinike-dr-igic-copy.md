# Web app za estetske klinike - Dr Igic case study

## Kratak opis za stranicu

Za Dr Igic ordinaciju razvijena je kompletna web aplikacija za estetsku kliniku: javni sajt, online zakazivanje, korisnicki nalog, Beauty Pass, admin kalendar, katalog tretmana, evidencija klijenata, galerija rezultata, promocije, VIP upiti, obavestenja i analitika.

Aplikacija nije samo prezentacioni sajt. Ona povezuje marketing, prodaju termina i svakodnevni rad ordinacije u jedan sistem: klijent moze da procita o tretmanima, vidi rezultate, prijavi se, izabere usluge, dobije slobodne termine i posalje zahtev za zakazivanje, dok admin tim kroz panel upravlja kalendarom, klijentima, uslugama, promocijama i sadrzajem.

## Hero sekcija

### Naslov

Web aplikacija za estetske klinike

### Podnaslov

Digitalni sistem za klinike koje zele vise od lepog sajta: online zakazivanje, admin kalendar, katalog tretmana, korisnicki nalozi, Beauty Pass, galerija rezultata i analitika poslovanja.

### CTA dugmad

Pogledaj funkcionalnosti

Zakazi konsultaciju za svoj projekat

## Case study uvod

Dr Igic Clinic je projekat u kojem je klasicna web prezentacija pretvorena u operativnu platformu za estetsku ordinaciju. Sistem pokriva put klijenta od prvog dolaska na sajt do zakazanog termina, pregleda istorije tretmana i ponovnog dolaska.

Za ordinaciju je napravljena aplikacija koja kombinuje javni deo sajta, booking logiku, admin panel i bazu podataka. Klinika tako dobija kontrolu nad terminima, cenama, paketima, promocijama, klijentima, tretmanskim zapisima, medijima i obavestenjima bez oslanjanja na rucne tabele i poruke rasute po vise kanala.

## Glavne funkcionalnosti

### Javni sajt klinike

- Pocetna strana sa hero videom, informacijama o ordinaciji i pozivima na zakazivanje.
- Stranica o Dr Nikoli Igicu i ordinaciji.
- Katalog tretmana sa kategorijama, opisima, benefitima, procedurom i negom nakon tretmana.
- Pojedinacne stranice tretmana i usluga sa SEO metapodacima.
- Cenovnik sa aktivnim uslugama, trajanjem, cenama i promocijama.
- Pre/posle rezultati sa filterima po tretmanu ili kategoriji.
- Video galerija.
- Kontakt stranica i direktan pristup booking formi.
- Visejezicna osnova kroz lokalizaciju.
- PWA podrska kroz manifest i instalacione ikone.

### Online zakazivanje

- Prijava klijenta pre zakazivanja.
- Izbor vise tretmana u jednom terminu.
- Podela tretmana na lice i telo.
- Posebna logika za konsultacije.
- Paketi usluga i akcijske cene.
- Podrska za tretmane koji se racunaju po ml.
- Izbor brenda za hijaluronske filere: Revolax, Teoxane i Juvederm.
- Automatski obracun ukupne cene i trajanja termina.
- Kalendar dostupnosti po mesecu i danu.
- Prikaz slobodnih termina u realnom vremenu.
- Provera konflikata sa postojecim terminima i blokadama.
- Pravilo za otkazivanje najkasnije 2 sata pre termina.
- Statusi termina: na cekanju, potvrdjen, zavrsen, otkazan i no-show.

### Korisnicki nalog

- Google prijava.
- Email OTP prijava.
- Session sistem sa sigurnim cookie tokenom.
- Obavezna dopuna profila: ime, pol, datum rodjenja i telefon.
- Stranica "Moji termini" sa buducim i prethodnim terminima.
- Mogucnost otkazivanja i pomeranja termina kada pravila to dozvoljavaju.
- In-app obavestenja za klijente.
- Push subscriptions osnova za web push obavestenja.

### Beauty Pass

- Posebna korisnicka zona za istoriju tretmana.
- Klijent moze da fotografise nalepnicu preparata posle tretmana.
- Upload slike direktno sa mobilne kamere.
- Crop alat za kadriranje nalepnice.
- Cuvanje datuma tretmana, napomene i fotografije.
- Pregled istorije nalepnica i tretmanskih zapisa.
- Prikaz sledeceg potvrdjenog termina.
- Prikaz obavestenja klijenta u Beauty Pass delu.
- Admin moze da vidi i dopunjava Beauty Pass zapise po klijentu.

### Admin panel

- Mobile-first admin interfejs.
- Admin kalendar baziran na FullCalendar prikazu.
- Kreiranje termina iz admin panela.
- Kreiranje blokada u kalendaru.
- Pregled termina po statusu.
- Brze akcije: potvrdi, otkazi, no-show, zavrsi.
- Promena statusa i napomena termina.
- Pomeranje termina.
- Pregled detalja klijenta iz kalendara.
- Dashboard sa brojevima usluga, termina, klijenata, VIP upita, galerije i obavestenja.
- Analitika prihoda, zakazivanja, otkazivanja, no-show termina, poseta i top stranica.
- Upravljanje klijentima i njihovim profilima.
- Upravljanje katalogom usluga.
- Upravljanje kategorijama i regijama tela.
- Upravljanje paketima.
- Upravljanje promocijama.
- Upravljanje preparatima.
- Upravljanje home obavestenjima.
- Upravljanje before/after rezultatima, galerijom i video linkovima.
- Upravljanje VIP zahtevima.
- Podesavanje radnih termina, prepodnevnih aktivacija, popodnevnih subota i nedelja.
- Admin notifikaciono zvonce.

### Operativna pravila i automatizacije

- Radno vreme po danima i intervalima.
- Osnovno radno vreme radnim danima.
- Subotnji intervali.
- Posebno aktiviranje prepodnevnih smena.
- Posebno aktiviranje subotnjih popodneva.
- Posebno ukljucivanje nedeljnih termina.
- Booking window, odnosno koliko dana unapred klijent moze da zakaze.
- Slot sistem, podrazumevano 15 minuta.
- Automatska provera zauzeca termina.
- Cron za podsetnike.
- Cron za obradu no-show scenarija.
- Email podsetnici preko Resend integracije kada je podesena.
- Slanje admin obavestenja za nove termine.
- Deduplikacija notifikacija da se iste poruke ne salju vise puta.

## Modeli podataka izvuceni iz projekta

### Korisnici i identitet

- `users`: email, telefon, uloga, poslednji login.
- `profiles`: ime i prezime, pol, datum rodjenja, avatar.
- `otp_codes`: jednokratni kodovi za prijavu.
- `push_subscriptions`: web push pretplate korisnika.

### Klinika i tim

- `employees`: zaposleni, slug i aktivnost.
- `clinic_settings`: trajanje slota, booking prozor i osnovno radno vreme.

### Katalog tretmana

- `service_categories`: kategorije tretmana.
- `body_areas`: regije tela.
- `services`: usluge, opis, tip, boja, cena, trajanje, ml logika, reminder logika, aktivnost i VIP oznaka.
- `service_package_items`: stavke paketa.
- `service_promotions`: promocije po usluzi.
- `treatment_products`: preparati sa logotipom.

### Zakazivanje

- `bookings`: termin, klijent, zaposleni, vreme, status, cena, trajanje, napomene i razlozi otkazivanja.
- `booking_items`: stavke termina sa snapshot cenom, trajanjem i nazivom usluge.
- `booking_blocks`: blokirani termini.
- `booking_status_log`: istorija promena statusa termina.
- `sunday_availability`: posebno ukljucene nedelje.
- `morning_shift_activations`: prepodnevne smene.
- `saturday_afternoon_activations`: subotnja popodneva.

### Beauty Pass i medicinska istorija

- `treatment_records`: tretmanski zapisi po klijentu, usluzi, preparatu, terminu i doktoru.
- `treatment_record_media`: fotografije i mediji uz tretmanski zapis.

### Marketing i sadrzaj

- `before_after_cases`: pre/posle slucajevi, tretman, kategorija, preparat, slike i objava.
- `gallery_media`: galerija slika i drugih medija.
- `video_links`: YouTube video linkovi.
- `home_announcements`: obavestenja na pocetnoj strani.
- `site_page_views`: page view analitika.

### VIP, kazne i obavestenja

- `vip_settings`: podesavanja VIP sistema.
- `vip_requests`: VIP zahtevi korisnika.
- `penalties`: kazne za no-show ili druge situacije.
- `notifications`: in-app/email/push obavestenja.
- `notification_jobs`: zakazani poslovi za slanje obavestenja.

## Kategorije tretmana prikazane na sajtu

- Hijaluronski fileri.
- Botox.
- Skinbusteri.
- Kolagen stimulatori.
- Polinukleotidi i egzozomi.
- Lipoliza.
- Hemijski piling.
- PRP.
- Mezoterapija.

## Sekcija: Sta klinika dobija

### Tekst

Estetska klinika dobija centralizovan sistem u kojem su tretmani, cene, termini, klijenti, rezultati i komunikacija povezani. Umesto da tim rucno proverava slobodne termine, salje poruke i vodi evidenciju kroz tabele, aplikacija preuzima veliki deo administracije i smanjuje prostor za greske.

Klijent dobija jednostavan put: informise se o tretmanu, vidi rezultate, prijavi se, izabere termin i kasnije prati svoje tretmane kroz Beauty Pass. Admin dobija kontrolu: kalendar, statusi, blokade, klijenti, napomene, promocije, mediji, VIP upiti i poslovna analitika.

## Sekcija: Za koje klinike je resenje

Ovakav sistem je idealan za estetske klinike, ordinacije anti-age medicine, dermatoloske ordinacije, beauty centre sa medicinskim tretmanima i timove koji zele da online prisustvo pretvore u alat za zakazivanje i organizaciju posla.

Posebno je koristan za klinike koje imaju vise usluga, razlicite cene i trajanja tretmana, pakete, promocije, pre/posle rezultate, VIP tretmane, ceste povratne klijente i potrebu za urednom istorijom tretmana.

## Sekcija: Tehnicki opis

Aplikacija je razvijena kao moderna Next.js platforma sa server API rutama, PostgreSQL bazom preko Drizzle ORM-a, admin panelom, PWA podrskom, Google i OTP prijavom, Vercel Blob uploadom, Resend email integracijom, web push osnovom i cron poslovima za automatizaciju.

Sistem je modularan, pa se moze prilagoditi drugim klinikama: promena kataloga tretmana, cena, radnog vremena, jezika, brendinga, pravila zakazivanja, tipova usluga, medija i admin procesa.

## Prodajni blokovi za landing stranicu

### 1. Od sajta do sistema

Ne pravimo samo stranicu koja lepo izgleda. Gradimo aplikaciju koja radi za kliniku svaki dan: prima zahteve za termine, organizuje kalendar, cuva podatke o klijentima i pomaze timu da brze odgovori na potraznju.

### 2. Booking koji razume tretmane

Estetski tretmani nisu obicni termini. Neki se racunaju po ml, neki zavise od brenda preparata, neki dolaze u paketu, a neki zahtevaju konsultaciju. Booking sistem je zato napravljen oko realnog nacina rada estetske ordinacije.

### 3. Admin panel za svakodnevni rad

Admin tim ima pregled termina, kalendara, klijenata, usluga, promocija, medija, obavestenja i analitike na jednom mestu. Svaka promena statusa termina i svaki zapis klijenta ostaju u sistemu.

### 4. Beauty Pass za lojalnost klijenata

Beauty Pass daje klijentima razlog da se vrate u aplikaciju i posle zakazivanja. Klijent moze da cuva istoriju tretmana i fotografije nalepnica preparata, dok klinika dobija uredniju evidenciju i bolji odnos sa stalnim klijentima.

### 5. Marketing koji vodi ka terminu

Katalog tretmana, cenovnik, rezultati, video galerija i SEO struktura nisu odvojeni od bookinga. Svaki deo sajta vodi korisnika ka konkretnom sledecem koraku: izbor tretmana i zakazivanje.

## Predlog strukture stranice agencije

1. Hero: Web aplikacija za estetske klinike.
2. Kratak case study: Dr Igic Clinic.
3. Problem: rucno zakazivanje, rasuti podaci, slaba kontrola nad kalendarom.
4. Resenje: centralizovana platforma.
5. Funkcionalnosti za klijente.
6. Funkcionalnosti za admin tim.
7. Beauty Pass kao diferencijator.
8. Analitika i automatizacije.
9. Tehnologija i mogucnost prilagodjavanja.
10. CTA: Napravimo slican sistem za vasu kliniku.

## CTA sekcija

### Naslov

Zelite web aplikaciju za svoju estetsku kliniku?

### Tekst

Ako imate kliniku, ordinaciju ili beauty centar i zelite sistem koji spaja sajt, online zakazivanje, katalog tretmana, admin panel i evidenciju klijenata, mozemo napraviti resenje po vasem nacinu rada.

### Dugme

Zakazi razgovor
