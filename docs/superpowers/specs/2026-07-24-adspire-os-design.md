# Adspire OS — dizajn prodajnog operativnog sistema

Datum: 24. jul 2026.

## 1. Cilj

Adspire OS treba da pretvori postojeći sajt iz digitalne prezentacije u merljiv
prodajni kanal i da vlasniku omogući da vodi ceo tok od prve posete do dobijenog
projekta.

Primarni poslovni rezultat nije veći broj generičkih poseta, već:

- više kvalifikovanih upita;
- više zakazanih discovery poziva;
- sistematičan follow-up bez izgubljenih leadova;
- veći procenat ponuda koje postaju poslovi;
- jasan uvid u to koje tržište, stranica i sadržaj donose prihod.

## 2. Potvrđene odluke

- Postojeći vizuelni identitet javnog sajta ostaje.
- Ne radi se drastičan redizajn postojećeg sajta.
- Prodajni sadržaj, CTA elementi, forme i tokovi mogu se unaprediti u okviru
  postojećeg dizajna.
- Javne početne cene se ne prikazuju.
- Adspire se pozicionira kao tehnološki i razvojni partner, ne kao jeftin
  izvođač.
- Sistem podržava tri tržišna ulaza:
  - Srbija i region;
  - DACH i srpska dijaspora;
  - strane agencije kojima treba white-label razvojni partner.
- Booking sistemi za klinike, ordinacije i premium salone predstavljaju jak
  dokazani use case, ali nisu jedina ponuda.
- Novi admin se gradi od nule. Stari PHP admin nije osnova novog sistema.
- Prva faza mora što pre da stvori funkcionalan prodajni tok; ostali moduli se
  dodaju modularno.

## 3. Predloženi pristup

Koristi se modularni pristup „funnel first“:

1. hvatanje i atribucija leadova sa sajta;
2. CRM pipeline i sledeći prodajni korak;
3. zakazivanje poziva i automatski follow-up;
4. priprema ponuda i zatvaranje posla;
5. sadržaj, outreach, projekti i finansije kao naredni moduli.

Ovaj pristup je izabran umesto velikog ERP rešenja jer najranije omogućava
merljiv prihod i čuva jasne granice između podsistema.

## 4. Arhitektura

### 4.1 Javni sajt

Postojeći Next.js App Router projekat ostaje javni kanal. Postojeće komponente,
animacije i vizuelni jezik se čuvaju.

Dodaje se prodajni sloj:

- segmentirani ulazi po tržištu i nameri;
- standardizovani CTA elementi;
- kratka kvalifikaciona forma;
- detaljnija projektna forma;
- first-party beleženje izvora i UTM parametara;
- server-side endpoint za prijem leadova;
- success stanje sa jasnim narednim korakom;
- zaštita od spama i duplih prijava.

### 4.2 Novi admin

Novi admin je zaštićen Next.js deo aplikacije, sa jasnom granicom u kodu i
podacima. Radni naziv proizvoda je **Adspire OS**.

Preporučeni javni pristup je `os.adspire.rs`, uz mogućnost lokalnog razvoja kroz
`/os`. Middleware vezuje admin domen za zaštićene rute bez uticaja na SEO
javnog sajta.

### 4.3 Podaci i autentikacija

Supabase obezbeđuje:

- PostgreSQL bazu;
- autentikaciju;
- Row Level Security;
- audit podatke;
- storage za ponude i prateća dokumenta;
- realtime samo tamo gde donosi praktičnu vrednost.

Prva verzija ima jednu owner ulogu. Model dozvola ostaje spreman za kasnije
uloge `owner`, `sales`, `content`, `delivery` i `finance`, ali se nepotrebne
uloge ne grade u prvoj fazi.

### 4.4 Automatizacija

n8n ostaje odvojen automatizacioni sloj za:

- email i interne notifikacije;
- enrichment leadova;
- follow-up sekvence;
- dnevne prodajne rezimee;
- outreach kampanje;
- sinhronizaciju sa kalendarom;
- obradu grešaka i retry tokove.

Svaki webhook mora biti potpisan, idempotentan i evidentiran.

## 5. Prva faza

### 5.1 Owner dashboard

Dashboard daje dnevni operativni pregled:

- novi leadovi danas i ove nedelje;
- leadovi bez odgovora;
- sledeći zadaci i follow-up;
- zakazani discovery pozivi;
- broj i vrednost otvorenih poslova;
- pipeline po fazama;
- conversion funnel;
- najuspešniji izvor, tržište i landing stranica;
- upozorenja za webhook ili automation greške.

Dashboard ne prikazuje lažne KPI-je i dekorativne grafikone bez poslovne
vrednosti.

### 5.2 CRM

CRM podržava:

- kompanije;
- kontakte;
- leadove;
- prodajne prilike;
- aktivnosti;
- beleške;
- zadatke;
- tagove;
- razloge gubitka.

Osnovne pipeline faze:

1. Novi lead
2. Kontaktiran
3. Kvalifikovan
4. Discovery zakazan
5. Ponuda poslata
6. Pregovori
7. Dobijen posao
8. Izgubljen posao

Svaka otvorena prilika mora imati vlasnika, vrednost ili raspon vrednosti,
sledeći korak i rok sledeće aktivnosti.

### 5.3 Website inbox

Svaka prijava sa sajta čuva:

- ime i prezime;
- email i telefon;
- kompaniju;
- tržište i jezik;
- traženu uslugu;
- opis problema/cilja;
- očekivani rok;
- raspoloživi budžetski rang ako je korisnik dobrovoljno izabere;
- landing stranicu;
- referrer;
- UTM source, medium, campaign, content i term;
- prvi i poslednji touch;
- consent podatke;
- spam score;
- tehnički request ID.

Lead se automatski povezuje sa postojećim kontaktom ili kompanijom kada je to
bezbedno moguće.

### 5.4 Zakazivanje

Sistem omogućava:

- primarni CTA „Zakaži razgovor“;
- alternativni CTA „Pošalji projekat“;
- povezivanje sa kalendarom;
- potvrdu termina;
- podsetnike;
- čuvanje veze između termina, kontakta i prodajne prilike;
- registraciju no-show ishoda.

### 5.5 Ponude

Prva verzija buildera ponuda podržava:

- klijenta i povezanu priliku;
- problem i poslovni cilj;
- preporučeni obim;
- faze i rokove;
- opcione pakete bez javnog cenovnika;
- cenu koja je vidljiva samo konkretnom leadu;
- rok važenja;
- status `draft`, `sent`, `viewed`, `accepted`, `declined`;
- PDF snapshot;
- verzije i audit log.

### 5.6 Funnel analitika

Osnovni događaji:

- `page_view`;
- `cta_click`;
- `lead_form_started`;
- `lead_form_submitted`;
- `meeting_booked`;
- `meeting_completed`;
- `proposal_sent`;
- `proposal_viewed`;
- `deal_won`;
- `deal_lost`.

Izveštaji povezuju izvor sa poslovnim ishodom, ne samo sa posetom.

### 5.7 Content backlog

Prva faza ne gradi pun CMS. Dodaje backlog za:

- ideju;
- ciljnu personu;
- tržište i jezik;
- servis;
- ključnu reč ili pitanje;
- funnel fazu;
- CTA;
- status;
- planirani datum;
- objavljeni URL;
- ostvarene leadove i dobijene poslove.

Postojeći kodni sadržaj sajta ostaje izvor javne istine dok se ne odobri
poseban CMS projekat.

## 6. Budući moduli

Nakon stabilne prve faze slede:

- napredni content engine i publishing;
- case-study builder;
- outreach i prospecting;
- klijentski portal;
- projekti, zadaci i rokovi;
- održavanje i SLA;
- finansije, fakture, MRR i profitabilnost;
- n8n control center;
- dokumenti i ugovori;
- timske uloge i workload;
- AI prodajni copilot zasnovan na stvarnim CRM podacima.

Ovi moduli ne blokiraju prvu produkcionu verziju.

## 7. Model podataka

Glavne tabele:

- `profiles`
- `companies`
- `contacts`
- `leads`
- `deals`
- `pipeline_stages`
- `activities`
- `tasks`
- `meetings`
- `proposals`
- `proposal_versions`
- `content_items`
- `web_events`
- `attribution_touches`
- `automation_runs`
- `webhook_receipts`
- `audit_log`

Važne relacije:

- kompanija ima više kontakata;
- kontakt može imati više leadova i prilika;
- lead se kvalifikacijom pretvara u priliku bez gubitka atribucije;
- prilika ima aktivnosti, zadatke, sastanke i ponude;
- dobijena prilika kasnije postaje projekat;
- web događaji i attribution touch zapisi ostaju povezani sa anonimnim session
  ID-em, a nakon dobrovoljne prijave sa kontaktom.

## 8. Tok podataka

```text
Posetilac
  → javna stranica
  → first-party session + attribution
  → CTA / forma / zakazivanje
  → server-side validacija
  → Supabase transaction
  → lead + activity + attribution
  → potpisani n8n webhook
  → potvrda posetiocu + obaveštenje vlasniku
  → CRM pipeline
  → discovery
  → ponuda
  → dobijen ili izgubljen posao
  → funnel i revenue attribution
```

## 9. Bezbednost i privatnost

- Supabase Auth sa owner nalogom i MFA kada je dostupan.
- RLS je uključen na svim privatnim tabelama.
- Service-role ključ se nikada ne šalje browseru.
- Forme koriste schema validaciju na klijentu i serveru.
- Rate limiting, honeypot i spam klasifikacija štite javne forme.
- n8n webhookovi koriste HMAC potpis i timestamp proveru.
- Idempotency key sprečava duple leadove usled retry zahteva.
- Audit log čuva promene pipeline faze, ponude i statusa posla.
- Osetljivi podaci se ne upisuju u aplikacione logove.
- Retention i brisanje podataka moraju podržati GDPR zahteve.

## 10. Greške i oporavak

- Upis leada i inicijalne aktivnosti je jedna transakcija.
- Neuspeh n8n webhooka ne sme izgubiti lead.
- Automation događaj se stavlja u retry stanje sa brojem pokušaja i poslednjom
  greškom.
- Owner dashboard prikazuje automation greške koje zahtevaju intervenciju.
- Korisnik dobija generičku sigurnu grešku i mogućnost ponovnog slanja.
- Server log dobija request ID radi dijagnostike.
- Dupli submit vraća postojeći uspešan rezultat kada je idempotency key isti.

## 11. Testiranje

### Jedinični testovi

- validacija lead forme;
- normalizacija emaila, telefona i UTM podataka;
- deduplikacija;
- promene pipeline faza;
- izračunavanje funnel metrika;
- potpisivanje webhooka.

### Integracioni testovi

- forma → baza → activity → webhook receipt;
- lead → kvalifikovana prilika;
- sastanak → aktivnost;
- ponuda → status i verzija;
- deal won/lost → funnel rezultat.

### E2E testovi

- SR, EN i DE lead tok;
- mobilni i desktop formular;
- owner login;
- pregled novog leada;
- pomeranje kroz pipeline;
- kreiranje i slanje ponude;
- označavanje dobijenog ili izgubljenog posla;
- oporavak nakon neuspelog webhooka.

### Vizuelni i accessibility testovi

- postojeći javni dizajn ne sme vizuelno regresirati;
- nove forme i CTA moraju pratiti postojeći sistem;
- admin se proverava na 375, 768 i 1440 px;
- tastatura, fokus, label elementi, kontrast i reduced motion moraju zadovoljiti
  WCAG AA.

## 12. Merila uspeha

Prvih 60 dana nakon produkcionog puštanja:

- svaki validan website lead ulazi u CRM sa izvorom;
- nijedan lead ne ostaje bez sledećeg koraka duže od jednog radnog dana;
- owner može za manje od jednog minuta da vidi šta danas mora da uradi;
- moguće je izmeriti conversion rate po landing stranici, tržištu i usluzi;
- moguće je povezati dobijen posao sa originalnim izvorom;
- povećava se broj kvalifikovanih poziva, a ne samo broj pageview događaja.

## 13. Nefunkcionalni zahtevi

- javna prodajna forma mora ostati brza i bez teških klijentskih zavisnosti;
- admin mora biti upotrebljiv na laptopu i telefonu;
- novi moduli moraju imati jasne granice i ne smeju zavisiti od UI komponenti
  drugog modula;
- migracije baze moraju biti verzionisane;
- sve spoljne integracije moraju biti zamenljive adapterima;
- sistem ne sme zahtevati ručno kopiranje podataka između sajta, CRM-a i n8n-a.

## 14. Van opsega prve faze

- potpuni project-management sistem;
- obračun plata i računovodstvo;
- javni CMS za sve stranice;
- autonomno AI slanje poruka bez pregleda;
- više timskih uloga;
- složena finansijska profitabilnost;
- zamena postojećeg dizajna sajta.

## 15. Redosled isporuke

1. Supabase projekat, migracije, auth i RLS.
2. Admin shell i owner dashboard sa realnim CRM podacima.
3. Website lead endpoint i nova kvalifikaciona forma u postojećem dizajnu.
4. CRM inbox, kompanije, kontakti i pipeline.
5. Aktivnosti, zadaci i sledeći koraci.
6. Calendar integracija i sastanci.
7. Ponude.
8. Funnel analitika.
9. Content backlog.
10. n8n retry i monitoring.

