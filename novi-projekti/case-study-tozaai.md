# Toza AI - case study

## Kratak opis za stranicu

Toza AI je platforma za AI video studio: javni sajt sa paketima i portfolijem, klijentski nalog sa kupljenim satima i terminima, i admin panel iz kog vlasnik vodi porudzbine, fakture, projekte i sadrzaj sajta.

Poslovna vrednost je u tome sto se ceo posao — od prvog upita, preko naplate paketa, do zakazanog termina i izdate fakture — odvija u jednom sistemu, umesto kroz poruke, tabele i rucno pisane predracune.

## Hero sekcija

### Naslov

Platforma za AI video studio: paketi, naplata, termini i fakture na jednom mestu

### Podnaslov

Toza AI spaja javni sajt sa paketima, klijentski nalog sa kupljenim satima edukacije i admin panel iz kog se vodi kompletna operativa studija.

### CTA dugmad

- Pogledaj case study
- Zelim slican sistem
- Zakazi konsultaciju

## Case study uvod

Za Toza AI napravljena je Next.js platforma sa tri odvojena dela: javni sajt na kom posetilac bira paket sati ili narucuje video, klijentski nalog u koji se ulazi Google prijavom, i admin panel iz kog vlasnik vodi ceo posao.

Sistem resava problem koji ima svaki studio koji prodaje vreme umesto proizvoda: kupljeni sati moraju negde da se vode, termini moraju da se poklope sa realnom dostupnoscu, a svaka uplata mora da proizvede uredan racun. Do sada je to bio posao za tabelu i pamcenje; sada je jedan tok koji sam sebe vodi.

Prijava lozinkom je namerno uklonjena — u panel se ulazi iskljucivo Google nalogom, sto je uklonilo najcesci bezbednosni rizik malih sistema.

## Glavne funkcionalnosti

### Javni sajt

- Pocetna strana sa paketima, rezultatima i cenama koje se menjaju iz admina
- Portfolio sekcija sa radovima studija
- Forma za upit sa opisom posla
- Dvojezicni sadrzaj, srpski i engleski
- Tekstovi pocetne strane se uredjuju bez programera

### Prodaja paketa i naplata

- Paketi od 1, 2, 5, 10 i 20 sati, sa cenom i opisom koji se menjaju iz admina
- Porudzbina sa podacima za racun i izborom nacina placanja
- Predracun sa podacima za uplatu odmah po porudzbini
- Rucna potvrda uplate u adminu — sati ulaze u nalog tek kada novac stvarno legne
- Evidencija kes uplata koja proizvodi istu fakturu kao i svaka druga

### Klijentski nalog

- Prijava Google nalogom, bez lozinke
- Pregled kupljenih i preostalih sati
- Zakazivanje termina iz slobodnih termina koje vlasnik otvara
- Porudzbine, predracuni i fakture na jednom mestu
- Projekti sa materijalima koje klijent preuzima
- Podaci firme za fakturisanje

### Sati kao valuta

- Wallet sati sa istorijom svake promene
- Rucno dodavanje sati za dogovore van sistema
- Negativan upis kao ispravka greske, bez brisanja istorije
- Uvek se vidi odakle je koji sat dosao

### Admin panel

- Porudzbine sa potvrdom uplate
- Klijenti sa istorijom sati i uplata
- Paketi, cene i vidljivost
- Slobodni termini i dostupnost
- Portfolio i slike rezultata
- Tekstovi pocetne strane i FAQ
- Podaci firme, banke i fakture
- Sabloni mejlova

### Fakture i predracuni

- Predracun i faktura se generisu kao PDF iz sistema
- Numeracija i podaci izdavaoca se vode u podesavanjima
- Isti dokument vidi i klijent u svom nalogu
- PDF se pravi u kodu, bez spoljnog servisa

### Automatizacije

- Automatski podsetnici pred termin
- Mejlovi po dogadjaju: porudzbina, potvrda uplate, zakazan termin
- Tekst svakog mejla se menja iz admina, bez izmene koda
- Zakazani posao koji svakodnevno salje podsetnike

## Sta klijent dobija

Studio dobija sistem u kom se prodaja, naplata, zakazivanje i fakturisanje drze zajedno. Vlasnik prestaje da vodi evidenciju o tome ko je koliko sati kupio i koliko mu je ostalo, a klijent u svakom trenutku vidi svoje sate, termine i racune bez pitanja i poruka.

## Za koga je resenje

- Studiji i agencije koji prodaju vreme, a ne proizvod
- Edukatori i konsultanti sa paketima sati
- Firme kojima svaka uplata mora da proizvede uredan racun
- Poslovi u kojima se termin zakazuje tek posle placanja

## Prodajni blokovi za landing stranicu

### Paketi koji se menjaju bez programera

Cena, broj sati, opis i vidljivost svakog paketa se menjaju iz admina. Nova ponuda je na sajtu za minut, ne za nedelju dana cekanja na izmenu.

### Sati koji se sami vode

Kupljeni sati ulaze u klijentov nalog cim se uplata potvrdi, a svaka promena ostaje u istoriji. Nema tabele koja se ne slaze sa realnoscu.

### Naplata koja proizvodi uredan papir

Predracun ide odmah po porudzbini, faktura po potvrdi uplate, oba kao PDF iz sistema i oba vidljiva klijentu u nalogu.

### Termini vezani za stvarnu dostupnost

Klijent bira samo iz termina koje je vlasnik otvorio, a podsetnik pred termin ide automatski. Nedolasci padaju bez ijednog poziva.

### Prijava bez lozinke

Ulaz iskljucivo Google nalogom uklanja najcesci nacin provale u male sisteme i klijentu skida jos jednu lozinku sa vrata.

## Tehnicki opis

### Stack

Next.js (App Router), TypeScript, Neon Postgres, Vercel Blob za fajlove, Google OAuth za prijavu, pdf-lib za fakture, GSAP i Lenis za pokret, Vercel za hosting i zakazane poslove.

## CTA sekcija

### Naslov

Prodajete vreme, a evidenciju vodite u tabeli?

### Tekst

Ako se sati, termini i racuni vode na tri mesta, greska je pitanje vremena. Opisite kako sada prodajete i dobicete predlog sistema koji to drzi na jednom mestu.

### Dugme

- Opisi svoj posao

## CTA tekstovi

- Zelim ovakav sistem
- Zatrazi ponudu
