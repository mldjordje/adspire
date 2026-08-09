# Adspire SEO, lokalni SEO i AI visibility — završni launch checklist

Datum pripreme: 9. avgust 2026.

Ovaj dokument počinje tek nakon objave trenutnih izmena. Ne menjati naziv,
adresu ili telefon između profila: nedoslednost slabi entity i lokalne signale.

## Jedini dozvoljeni NAP identitet

- Brend: Adspire Digital
- Pravni naziv: Đorđe Mladenović PR Informacione usluge Adspire Niš
- Adresa: Dimitrija Leka 66, 18000 Niš, Srbija
- Telefon: +381 60 149 149 1
- Email: djordje@adspire.rs
- Sajt: https://adspire.rs
- PIB: 114723739
- Matični broj: 67804961
- Datum osnivanja: 14.11.2024.
- Delatnost: 6209 — Ostale usluge informacione tehnologije

CompanyWall trenutno prikazuje stari Gmail. Zatražiti ispravku na
`djordje@adspire.rs`; ne vraćati stari Gmail na sajt da bi se napravila lažna
doslednost.

## Google Search Console posle deploy-a

1. U Sitemaps zadržati samo `https://adspire.rs/sitemap.xml`. Direktni
   `sitemap-0.xml` može da se ukloni iz submitted liste jer ga index već navodi.
2. Otvoriti Pages > Not found (404) i izvesti svih 19 URL-ova u CSV.
3. Za svaki URL doneti jednu od tri odluke:
   - stara stranica sa jasnim naslednikom: jedan 301 ka najbližoj relevantnoj ruti;
   - pogrešno napisan/spoljni URL bez naslednika: ostaviti pravi 404;
   - sadržaj koji i dalje treba da postoji: vratiti stranicu sa 200 odgovorom.
4. Ne preusmeravati sve 404 stranice na početnu; to je soft-404 obrazac.
5. Za `Crawled — currently not indexed` pregledati tačnih 13 URL-ova. Posle
   deploy-a zatražiti indeksiranje samo prioritetnih usluga i lokalnih stranica.
6. `Page with redirect`, namerni `noindex` i alternate canonical nisu greške
   kada URL ima ispravan cilj. Validaciju pokretati samo za stvarno popravljenu grupu.
7. U Performance napraviti regex filtre za četiri klastera: `niš|nis`,
   `sajt|web`, `aplikacij|softver|crm`, `zakaziv|booking`.

## Google Business Profile

Google navodi da lokalni rezultat prvenstveno zavisi od relevantnosti,
udaljenosti i poznatosti. Zbog toga su kompletan profil, tačan NAP, javne usluge,
linkovi i autentične recenzije prioritet:
https://support.google.com/business/answer/7091/improve-your-local-ranking-on-google

- Primary category: izabrati najbližu dostupnu kategoriju „Software company“.
- Secondary: Website designer, Web hosting company i Internet marketing service
  samo ako su dostupne u interfejsu i stvarno opisuju usluge.
- Website: `https://adspire.rs/?utm_source=google&utm_medium=organic&utm_campaign=gbp`
- Appointment/quote link: `https://adspire.rs/upit?utm_source=google&utm_medium=organic&utm_campaign=gbp_upit`
- Telefon, adresa i naziv moraju biti identični NAP bloku iznad.
- Dodati svih 15 usluga, ali opis svake treba da vodi na odgovarajuću service URL.
- Dodati logo, cover, fotografiju osnivača/radnog prostora i autentične slike
  ekrana javnih projekata. Ne koristiti generičke stock fotografije kao dokaz rada.
- Objaviti jedan činjenični update nedeljno: novi case study, vodič ili konkretna
  funkcija sistema. Post nije zamena za recenzije ili relevantne landing stranice.

Predlog opisa profila:

> Adspire Digital je IT firma iz Niša za izradu sajtova, web i mobilnih
> aplikacija, web shopova, sistema za online zakazivanje i poslovnog softvera po
> meri. Razvijamo i AI chatbotove, automatizacije i SaaS proizvode. Radimo sa
> firmama u Nišu, celoj Srbiji i regionu, od analize i prototipa do produkcije,
> SEO osnove, analitike i održavanja. Javni projekti obuhvataju booking sisteme,
> platformu za kliniku, e-commerce i prodajno-operativne aplikacije.

## Recenzije bez rizika

Google dozvoljava slanje direktnog review linka ili QR koda, ali zabranjuje
nagrade, popuste, lažne recenzije i selektivno traženje samo pozitivnih ocena:
https://support.google.com/business/answer/3474122

Poruka klijentu:

> Zdravo [ime], hvala na saradnji na [projekat]. Ako imaš dva minuta, značila bi
> nam iskrena Google recenzija o tome koji smo problem rešili i kako izgleda rad
> sa nama: [direktan review link]. Nije potrebno da ocena bude „ulepšana“ — važno
> nam je da bude autentična.

Cilj nije nalet recenzija. Poslati zahtev svakom stvarnom klijentu nakon jasne
isporuke i odgovoriti profesionalno na svaku dobijenu recenziju.

## Entity i citation profili — redosled

1. APR: proveriti javni zapis i kontakt podatke. Zvanična pretraga:
   https://www.apr.gov.rs/registers/companies/data-search.1788.html
2. Google Business Profile: kompletirati profil iznad.
3. LinkedIn Company Page: napraviti stranicu sa javnim URL-om koji uključuje
   `adspire-rs` ili `adspire-digital-nis`, jer postoje istoimeni strani brendovi.
   https://www.linkedin.com/help/linkedin/answer/a543852/
4. Apple Business Connect: besplatan profil za Apple Maps i Siri.
   https://businessconnect.apple.com/
5. Bing Places: claim/add, isti NAP i URL sa UTM oznakom.
   https://www.bingplaces.com/
6. Clutch Basic: besplatan profil, pet postojećih case studies i samo autentične
   klijentske reference. Plaćeni paket nije potreban u prvoj fazi.
   https://clutch.co/get-listed
7. GitHub organizacija i founder profil: sa sajta i profila povezati javne projekte
   samo tamo gde ugovor i privatnost klijenta to dozvoljavaju.

Ne otvarati desetine slabih direktorijuma. Profil ima smisla samo ako ga kupci
koriste, ako može da potvrdi identitet ili ako donosi relevantan referral link.

## Organska mapa prioriteta

| Prioritet | Namera | Canonical URL |
|---|---|---|
| P1 | IT firma Niš | `/it-firma-nis` |
| P1 | izrada sajta Niš | `/izrada-sajta-i-aplikacija-nis` |
| P1 | izrada aplikacija Niš | `/izrada-aplikacija-nis` |
| P1 | rezervacioni sistem Niš | `/rezervacioni-sistemi-nis` |
| P1 | izrada sajta | `/our-services/web-prezentacije` |
| P1 | poslovni softver po meri | `/our-services/interne-poslovne-aplikacije` |
| P1 | online zakazivanje | `/our-services/sistemi-za-zakazivanje` |
| P1 | AI chatbot i automatizacija | `/our-services/ai-integracije-automatizacija` |
| P2 | web shop | `/our-services/e-commerce-web-shop` |
| P2 | mobilne aplikacije | `/our-services/mobilne-aplikacije` |
| P2 | SaaS razvoj | `/our-services/saas-razvoj` |
| P2 | SEO Niš / Google Ads | `/our-services/seo-digitalni-marketing` |

Ne praviti dodatnu stranicu za sinonim ako postojeća stranica već odgovara istoj
nameri. Sinonime obraditi prirodno na canonical stranici da se izbegne kanibalizacija.

## Merenje prvih 90 dana

- Nedeljno: impressions, clicks, non-brand queries, indeksirane prioritetne URL,
  GBP pozivi/website klikovi i broj relevantnih upita.
- Mesečno: upiti po landing stranici i izvoru, odnos kvalifikovanih leadova,
  dobijeni lokalni/referral linkovi i novije autentične recenzije.
- Rang nije jedini KPI. Primarni ishod je rast kvalifikovanih upita; sekundarni su
  non-brand impressions, referral posete i pokrivenost prioritetnih namera.
