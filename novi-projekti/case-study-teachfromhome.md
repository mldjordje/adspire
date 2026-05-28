# TeachFromHome - case study

## Kratak opis za stranicu

TeachFromHome je web aplikacija za regrutaciju i onboarding kandidata koji zele da predaju engleski online. Projekat kombinuje javni landing sajt, Google prijavu, kandidatski portal, audio prijavu za Fazu 1, admin panel za pregled kandidata, referral sistem, notifikacije, email obavestenja, storage za audio/video fajlove i osnovnu analitiku funnel-a.

Poslovna vrednost aplikacije je u tome sto skracuje proces prijave, smanjuje rucnu komunikaciju sa kandidatima, centralizuje sve prijave i omogucava timu da brzo proceni izgovor, energiju i kvalitet kandidata pre HR kontakta.

## Hero sekcija

### Naslov

Online onboarding sistem za remote nastavnike engleskog

### Podnaslov

Od landing stranice do admin odluke: kandidati se prijavljuju Google nalogom, salju kratku audio prijavu, a tim dobija pregledan panel za selekciju, obavestenja, referral nagrade i pracenje konverzija.

### CTA dugmad

- Pogledaj kako radi sistem
- Zelim ovakav onboarding
- Zakazi konsultaciju

## Case study uvod

TeachFromHome.app je napravljen kao specijalizovan sistem za privlacenje i obradu kandidata za online predavanje engleskog. Umesto forme koja zavrsava u inboxu, kandidat prolazi kroz strukturisan proces: javna stranica objasnjava posao, prijava vodi na Google autentikaciju, Faza 1 prikuplja osnovne podatke i audio snimak, a admin panel omogucava timu da preslusa prijave, odobri ili odbije kandidata i posalje sledece korake.

Sistem je usmeren na brzinu i operativnu kontrolu: kandidati vide status, administratori imaju queue za prijave, a aplikacija cuva dogadjaje za pracenje funnel-a od posete do prihvatanja.

## Glavne funkcionalnosti

### Javni sajt

- Landing stranica za TeachFromHome sa informacijama o remote poslu za nastavnike engleskog.
- Dvojezicni sadrzaj u glavnoj landing komponenti: srpski i engleski tekstovi.
- Hero sekcija sa CTA dugmadima za prijavu i gledanje klipova.
- Sekcije za benefite, opis posla, uslove za rad, podrsku tima, proces prijave i finalni CTA.
- SEO meta tagovi za pocetnu stranicu: title, description, canonical, Open Graph podaci.
- Showcase sekcija sa klipovima prihvacenih kandidata.
- Posebna `/clips` stranica za prikaz primera kandidatskih klipova.
- Postoje i legacy/template Pages rute iz Onovo teme: about, blog, services, projects, pricing, FAQ, contact, gallery, team i slicno. U kodu postoje kao stranice i data fajlovi, ali nisu srz TeachFromHome aplikativnog toka.

### Prijava i autentikacija

- Google OAuth prijava preko NextAuth/Auth.js.
- Nema posebne lozinke za kandidata.
- Login i signup stranice vode korisnika na pravi sledeci korak na osnovu statusa prijave.
- Admin i teacher rute su zasticene middleware slojem.
- Admin korisnici se razlikuju preko `admin_users` tabele.

### Kandidatski nalog

- Kandidatski dashboard sa trenutnom fazom, brojem pokusaja, neprocitanim obavestenjima i sledecim akcijama.
- Profil kandidata sa osnovnim podacima: ime, prezime, telefon, datum rodjenja, kratak opis i email.
- Referral kod za svakog kandidata.
- Mogucnost unosa referral koda.
- Pregled referral nagrada za korisnika.
- Centar za obavestenja sa pojedinacnim i grupnim oznacavanjem kao procitano.

### Faza 1 prijava

- Dvokoracna forma za kandidata: osnovni podaci, zatim audio prijava.
- Kandidat cita unapred definisan tekst za Fazu 1.
- Podrzan upload audio fajla.
- Podrzano direktno snimanje zvuka u browseru kada browser podrzava MediaRecorder.
- Ogranicenje velicine za Phase 1 audio: 25MB.
- Dozvoljeni audio formati: MP3, M4A, WAV, WEBM i OGG.
- Maksimalno 3 pokusaja za Fazu 1.
- Kandidat vidi istoriju pokusaja, status, razlog odbijanja, admin napomenu i audio preview kada je snimak dostupan.
- Nakon slanja prijave kreira se notifikacija i analytics dogadjaj.
- Admini se obavestavaju o novoj prvoj prijavi preko notifikacija i email-a.

### Admin panel

- Admin kontrolna tabla sa KPI metrikama: broj Phase 1 prijava na cekanju i broj kandidata spremnih za HR kontakt.
- Analitika funnel-a: posete, zapocete prijave, poslate Phase 1 prijave, prolaz Phase 1 i prihvaceni kandidati.
- Dnevni trend za poslednjih 14 dana.
- Pregled kandidata koji cekaju duze od definisanog perioda.
- Brze akcije ka Phase 1 queue-u, prihvacenim kandidatima, kandidatima, trening klipovima, preporukama, showcase klipovima i storage cleanup-u.

### Admin obrada kandidata

- Phase 1 queue sa paginacijom.
- Preslusavanje audio prijave u modal prozoru.
- Odobravanje kandidata kao proslog za HR kontakt.
- Odbijanje kandidata uz razlog: `bad_accent`, `bad_pronunciation` ili `low_energy`.
- Admin napomena pri odbijanju.
- Bulk akcije za odobravanje, odbijanje i brisanje review-ovanih snimaka.
- Lista prihvacenih kandidata sa kontakt podacima, poslednjim snimkom, datumom odobrenja i linkom za download snimka.
- Opsta lista kandidata sa filterima po statusu, fazi, pretragom, paginacijom i brisanjem kandidata.
- Detaljna stranica kandidata postoji kao ruta `/admin/candidates/[userId]`.

### Referral sistem

- Svaki profil dobija referral kod.
- Kandidat moze da primeni tudji referral kod.
- Sistem cuva vezu izmedju referrera i referred kandidata.
- Admin moze rucno da oznaci referral kao eligible.
- Admin moze da odobri pending referral nagradu.
- Podrazumevani iznos referral nagrade u bazi je 20 EUR.
- Statusi nagrada: `pending`, `approved`, `paid`.

### Obavestenja

- Sistem cuva notifikacije po korisniku.
- Tipovi notifikacija: `info`, `phase1`, `phase2`, `system`, `referral`.
- Kandidat vidi listu obavestenja.
- Kandidat moze oznaciti jedno ili sva obavestenja kao procitana.
- Admin i kandidat dobijaju sistemske notifikacije tokom prijave i review procesa.

### Email obavestenja

- Email servis koristi Brevo SMTP API.
- Email se salje za odredjene dogadjaje: nova Phase 1 prijava adminima, prolaz Phase 1 kandidatu, odbijanje kandidata i admin reminder scenariji.
- Ako Brevo API key ili sender nisu podeseni, email slanje se preskace bez rusenja toka.

### Media / storage

- Upload fajlova ide preko Vercel Blob client upload tokena.
- Postoje politike za upload po tipu: `phase1`, `phase2`, `training`, `showcase`.
- Phase 1 koristi audio fajlove do 25MB.
- Training i showcase video fajlovi imaju limit od 100MB.
- Admin moze dodavati, aktivirati/deaktivirati i brisati training klipove.
- Admin moze dodavati showcase klipove kao native upload ili YouTube fallback.
- Public showcase prikazuje aktivne native video ili YouTube embed klipove.
- Postoji storage cleanup za uklanjanje zastarelih i zatvorenih fajlova.

### Analitika

- Sistem cuva analytics dogadjaje u tabeli `analytics_events`.
- Prate se dogadjaji kao sto su `visits`, `started_signup`, `phase1_submitted`, `phase1_passed` i `accepted`.
- Admin dashboard prikazuje funnel i dnevne trendove.
- Public stranice pozivaju visit tracking.

### Automatizacije

- Cron endpoint za storage cleanup: `GET /api/cron/storage-cleanup`.
- Cron endpoint zahteva `x-cron-secret` header ili `Authorization: Bearer <CRON_SECRET>`.
- Admin moze rucno pokrenuti storage cleanup iz admin dashboard-a.
- Cleanup brise rejected Phase 1 fajlove starije od 3 dana i Phase 2 fajlove za zatvorene taskove starije od 10 dana.

### PWA / mobilno iskustvo

- Projekat nema manifest/service worker PWA implementaciju u pregledanim fajlovima.
- UI je pravljen responsive za mobilni i desktop prikaz, posebno za landing, prijavu, dashboard i admin liste.

### Phase 2 napomena

U bazi, rutama i admin/teacher kodu postoje modeli i delovi za Phase 2: zadaci, video submission-i, trening klipovi i review. Medjutim, trenutni servis eksplicitno vraca da Phase 2 vise nije deo aplikacionog toka (`Phase 2 is no longer part of the application flow`) i teacher Phase 2 data vraca prazne podatke. Zato se Phase 2 u ovom case study-ju vodi kao legacy/postojeca infrastruktura, ne kao aktivna korisnicka funkcionalnost.

## Modeli podataka / entiteti

- `profiles`: korisnicki profili kandidata i admina, sa emailom, imenom, telefonom, datumom rodjenja, kratkim opisom, referral kodom i trenutnom fazom.
- `admin_users`: lista korisnika koji imaju admin rolu (`owner` ili `admin`).
- `teacher_phase1_submissions`: Phase 1 prijave kandidata, pokusaji, audio/video blob reference, tekst skripte, status review-a, razlog odbijanja i admin napomene.
- `teacher_phase2_tasks`: legacy Phase 2 zadaci po kandidatu, sa recenicom/zadatkom, statusom, brojem dozvoljenih pokusaja i feedbackom.
- `teacher_phase2_submissions`: legacy Phase 2 submission-i sa blob fajlom, pokusajem, statusom i feedbackom.
- `training_videos`: trening klipovi koje admin moze da uploaduje i kategorise.
- `teacher_training_video_views`: evidencija da je kandidat pogledao odredjeni trening video.
- `notifications`: notifikacije za korisnike, sa tipom, naslovom, tekstom, payloadom i read statusom.
- `analytics_events`: dogadjaji za funnel i operativnu analitiku.
- `referral_links`: veza izmedju kandidata koji preporucuje i kandidata koji je dosao preko referral koda.
- `referral_rewards`: referral nagrade, iznos, status i datumi eligibility/approval/payment.
- `showcase_videos`: klipovi kandidata za javni prikaz, kao native video ili YouTube izvor.

## API, integracije i automatizacije

### Auth API

- `GET /api/auth/me`: vraca trenutnog korisnika i profil.
- `/api/auth/[...nextauth]`: NextAuth Google OAuth ruta.

### Teacher API

- `GET /api/teacher/dashboard`: podaci za kandidatski dashboard.
- `GET /api/teacher/profile`: profil, referral nagrade i notifikacije.
- `PATCH /api/teacher/profile`: azuriranje profila.
- `GET /api/teacher/phase1`: Phase 1 podaci i pokusaji.
- `POST /api/teacher/phase1/submit`: slanje Phase 1 prijave.
- `GET /api/teacher/phase2`: legacy Phase 2 endpoint, trenutno vraca prazne podatke.
- `PATCH /api/teacher/phase2`: markiranje trening videa kao pogledanog.
- `POST /api/teacher/phase2/submit`: legacy Phase 2 submit, trenutno vraca 410.
- `GET /api/teacher/notifications`: lista notifikacija.
- `PATCH /api/teacher/notifications/[id]`: oznacavanje notifikacije kao procitane.
- `POST /api/teacher/notifications/mark-all`: oznacavanje svih notifikacija kao procitanih.

### Admin API

- `GET /api/admin/dashboard`: KPI, funnel, dnevni trend i zaglavljeni kandidati.
- `GET /api/admin/phase1`: Phase 1 queue.
- `POST /api/admin/phase1/move`: odobravanje Phase 1 kandidata.
- `POST /api/admin/phase1/reject`: odbijanje Phase 1 kandidata.
- `DELETE /api/admin/phase1/submission`: brisanje review-ovanog Phase 1 snimka.
- `GET /api/admin/phase2`: legacy Phase 2 queue.
- `POST /api/admin/phase2/review`: legacy Phase 2 review.
- `DELETE /api/admin/phase2/submission`: brisanje Phase 2 submission videa.
- `GET /api/admin/accepted-candidates`: lista prihvacenih kandidata.
- `GET /api/admin/accepted-candidates/download`: download snimka prihvacenog kandidata.
- `GET /api/admin/candidates`: lista kandidata sa filterima.
- `GET /api/admin/candidates/[userId]`: detalj kandidata.
- `DELETE /api/admin/candidates/[userId]`: brisanje kandidata i povezanih fajlova.
- `POST /api/admin/candidates/remind`: slanje remindera kandidatu.
- `GET /api/admin/training`: lista trening klipova.
- `POST /api/admin/training`: kreiranje trening klipa.
- `PATCH /api/admin/training`: promena active statusa trening klipa.
- `DELETE /api/admin/training`: brisanje trening klipa.
- `GET /api/admin/showcase`: lista showcase klipova.
- `POST /api/admin/showcase`: kreiranje showcase klipa.
- `PATCH /api/admin/showcase`: promena active statusa showcase klipa.
- `DELETE /api/admin/showcase`: brisanje showcase klipa.
- `GET /api/admin/referrals`: lista referral nagrada.
- `POST /api/admin/storage/cleanup`: rucno pokretanje storage cleanup-a.

### Public API

- `GET /api/public/showcase`: javna lista aktivnih showcase klipova.
- `POST /api/analytics/event`: upis analytics dogadjaja.
- `POST /api/blob/upload-token`: izdavanje tokena za Vercel Blob client upload.
- `POST /api/referrals/apply`: primena referral koda za ulogovanog korisnika.
- `POST /api/referrals/mark-eligible`: admin oznacavanje referral nagrade kao eligible.
- `POST /api/referrals/approve`: admin odobravanje referral nagrade.
- `GET /api/cron/storage-cleanup`: cron cleanup endpoint.

### Integracije

- Google OAuth preko NextAuth/Auth.js.
- Vercel Postgres kao baza.
- Drizzle ORM za schema/migracije i query sloj.
- Vercel Blob za audio/video storage.
- Brevo SMTP API za email obavestenja.
- Vercel Analytics paket je instaliran, a custom analytics dogadjaji se cuvaju u bazi.
- YouTube embed/fallback za showcase video klipove.

## Sta klijent dobija

Klijent dobija kompletan sistem za digitalizaciju procesa prijave kandidata. Umesto rucnog prikupljanja poruka, fajlova i statusa, sve je povezano u jedan tok: kandidat vidi sta treba da uradi, salje audio prijavu, a tim dobija operativni admin panel za pregled, odluke i dalju komunikaciju.

Ovakav sistem smanjuje vreme potrebno za selekciju, standardizuje kvalitet prijava i daje jasne podatke o tome gde kandidati ulaze, odustaju ili prolaze. Tim moze da radi brze, kandidati imaju jasnije iskustvo, a menadzment dobija pregled funnel-a i rezultata.

## Za koga je resenje

Ovakav sistem odgovara kompanijama koje imaju veliki broj kandidata, partnera, freelancera ili saradnika koje treba strukturisano primati, proveravati i voditi kroz korake.

Najbolji fit:

- online skole i edukativne platforme
- agencije za remote radnike
- HR i recruiting timovi
- kompanije koje rade masovni onboarding
- platforme koje proveravaju audio/video kvalitet kandidata
- sistemi sa referral programima
- firme koje zele admin panel za selekciju bez manuelnih spreadsheet procesa

## Tehnicki opis

Projekat je napravljen u Next.js aplikaciji sa kombinacijom Pages Router-a za javne/template stranice i App Router-a za aplikativni deo. Frontend koristi React, HeroUI, Tailwind/CSS/SCSS, Framer Motion i postojece layout/section komponente. Backend logika je organizovana kroz Next.js API route handler-e i servisni sloj u `src/server/services`.

Baza je Vercel Postgres, a schema i migracije su vodjene kroz Drizzle ORM. Autentikacija koristi NextAuth sa Google OAuth providerom. Fajlovi se uploaduju na Vercel Blob, dok se email obavestenja salju preko Brevo API-ja. Middleware stiti admin i teacher rute i proverava admin pristup.

## Prodajni blokovi za landing stranicu

### 1. Prijave koje ne zavrsavaju u inboxu

Kandidati prolaze kroz jasan digitalni tok: Google prijava, osnovni podaci, audio zadatak i status prijave. Tim vise ne mora da spaja informacije iz emailova, fajlova i tabela.

### 2. Admin panel za brzu selekciju

Sve prijave su u queue-u. Admin moze da preslusa snimak, odobri kandidata, odbije uz razlog, doda napomenu i prati ko je spreman za HR kontakt.

### 3. Funnel analitika za bolje odluke

Sistem prati posete, registracije, poslate prijave i prihvacene kandidate. Dobijate jasniju sliku gde kandidati dolaze, gde odustaju i koliko proces konvertuje.

### 4. Referral program ugradjen u proces

Svaki kandidat dobija referral kod, a admin moze da prati i odobrava nagrade. Referral vise nije odvojen spreadsheet, vec deo onboarding sistema.

### 5. Audio/video fajlovi bez haosa

Snimci se cuvaju u cloud storage-u, vezani su za kandidata i pokusaj, a admin moze da ih pregleda, preuzme ili ukloni kada vise nisu potrebni.

### 6. Sistem spreman za operativni rast

Arhitektura pokriva naloge, role, bazu, storage, email, notifikacije, API-je i admin procese. To daje osnovu za dalji razvoj bez menjanja celog sistema.

## Predlog strukture stranice agencije

1. Hero: "Online onboarding sistem za remote nastavnike engleskog"
2. Kratak problem: rucna selekcija kandidata je spora i nepregledna
3. Resenje: javni sajt + kandidatski portal + admin panel
4. Prikaz toka kandidata: landing, Google login, Faza 1 audio, status
5. Prikaz admin toka: queue, review, odluka, HR lista
6. Ključne funkcionalnosti: auth, prijave, referral, analytics, storage, email
7. Poslovni benefiti: brzina, preglednost, manje rucnog rada, merljiv funnel
8. Tehnicki stack: Next.js, Vercel Postgres, Drizzle, Vercel Blob, NextAuth, Brevo
9. Za koga je ovo: HR, edukacija, agencije, onboarding platforme
10. CTA: razgovor o slicnom sistemu

## CTA sekcija

### Naslov

Zelite onboarding sistem koji radi vise od obicne forme?

### Tekst

Mozemo da napravimo aplikaciju koja vodi korisnika kroz prijavu, cuva podatke i fajlove, daje timu admin panel i pokazuje jasne metrike procesa.

### Dugme

Zakazi razgovor o projektu

## Kratak tehnicki stack

- Next.js 13.4.3
- React 18
- NextAuth/Auth.js sa Google OAuth prijavom
- Vercel Postgres
- Drizzle ORM i Drizzle migracije
- Vercel Blob za audio/video fajlove
- Brevo SMTP API za email
- HeroUI, React Bootstrap, Tailwind/CSS/SCSS
- Framer Motion za animacije
- Custom analytics tabela u bazi
- Middleware za zastitu teacher/admin ruta

## Provereno u projektu

Pregledani su root fajlovi, `package.json`, `README.md`, Next.js rute, App Router stranice, Pages Router stranice, API route handler-i, servisni sloj, Drizzle schema, SQL migracije, middleware, auth konfiguracija, upload/storage servisi i glavne UI komponente.

Nije proverena produkciona baza, stvarni podaci u Vercel Postgres-u, stvarni fajlovi u Vercel Blob-u, niti aktivna deployment konfiguracija na Vercel-u. Zakljucci su izvedeni iz koda i migracija u repozitorijumu.
