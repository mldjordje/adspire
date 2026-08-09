# Adspire Google Ads Search plan — spreman za aktiviranje posle SEO launch-a

Datum pripreme: 9. avgust 2026.

Ne aktivirati kampanje dok produkcija nema Google ID-jeve, testiran consent izbor
i potvrđenu `generate_lead`/Google Ads konverziju. Kontakt klikovi su sekundarni
signali; uspešno sačuvan projektni upit je primarna konverzija.

## Tehnička konfiguracija

Vercel production environment:

```text
NEXT_PUBLIC_GOOGLE_TAG_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL=XXXXXXXXXXXX
```

Kod već radi sledeće:

- Consent Mode v2 default: analytics/ad storage, ad user data i personalization
  su `denied`; izbor korisnika ažurira sva četiri signala.
- GA4 `page_view` za Next.js navigaciju nakon prihvatanja.
- `generate_lead` tek posle uspešnog API odgovora kontakt forme ili projektnog upita.
- Google Ads conversion sa request/reference ID-jem kao transaction ID.
- Sekundarni `contact_click` događaji za telefon, email i WhatsApp.
- First-touch landing URL, referrer i UTM vrednosti se čuvaju uz lead u CRM-u;
  auto-tagged GCLID ostaje u landing URL-u.

Google za EEA saobraćaj zahteva prikupljanje i slanje consent signala:
https://support.google.com/google-ads/answer/13695607

## Conversion actions

| Događaj | Google Ads status | Vrednost za bidding |
|---|---|---|
| Uspešno poslat `/upit` | Primary | Da |
| Uspešno poslat contact form | Primary | Da, dok ne bude dovoljno `/upit` podataka |
| Kvalifikovan lead u CRM-u | Primary offline, faza 2 | Da |
| Prihvaćena ponuda/ugovor | Primary offline, faza 2 | Da, stvarna vrednost |
| Klik na telefon/WhatsApp/email | Secondary | Ne |
| Page view / scroll | Observation | Ne |

Enhanced conversions i offline kvalifikaciju uvoditi tek nakon prihvatanja
Google customer-data uslova. Google od juna 2026. usmerava enhanced conversions
for leads upload na Data Manager API:
https://support.google.com/google-ads/answer/16884284

## Početna struktura — Search only

Ne pokretati Display, Performance Max ni remarketing u prvom ciklusu. Bez dovoljno
konverzija oni otežavaju procenu koje konkretne namere donose kvalitetan lead.

### Kampanja 1 — Niš: sajtovi i aplikacije

- Lokacija: Niš + razuman radijus; Location option = Presence, ne Interest.
- Landing: `/izrada-sajta-i-aplikacija-nis`
- Ad group `izrada sajta nis`: exact/phrase varijante „izrada sajta niš“,
  „izrada web sajta niš“, „web agencija niš“.
- Ad group `it firma nis`: „it firma niš“, „programerska firma niš“.
- Ad group `aplikacije nis`: „izrada aplikacija niš“, „web aplikacija niš“.

### Kampanja 2 — Srbija: poslovni softver i booking

- Landing po ad grupi, bez slanja svih klikova na homepage.
- `poslovni softver`: `/our-services/interne-poslovne-aplikacije`
- `booking klinike/saloni`: `/our-services/sistemi-za-zakazivanje`
- Početne fraze: „poslovni softver po meri“, „izrada crm sistema“, „program za
  evidenciju firme“, „sistem za zakazivanje termina“, „booking sistem za kliniku“,
  „aplikacija za zakazivanje salon“.

### Kampanja 3 — Srbija: AI automatizacija

- Landing: `/our-services/ai-integracije-automatizacija`
- Fraze: „ai chatbot za sajt“, „ai chatbot za firmu“, „n8n automatizacija“,
  „automatizacija poslovnih procesa ai“.
- Ne targetirati široko „AI“, „ChatGPT“ ili „veštačka inteligencija“ bez poslovne
  namere — takvi klikovi su uglavnom edukativni.

### Kampanja 4 — Srbija: web shop

- Aktivirati tek kada prve tri kampanje imaju ispravne search terms i konverzije.
- Landing: `/our-services/e-commerce-web-shop`
- Fraze: „izrada web shopa“, „izrada internet prodavnice“, „custom web shop“.

## Negativne ključne reči — početna shared lista

`posao`, `zaposlenje`, `praksa`, `plata`, `kurs`, `obuka`, `fakultet`, `škola`,
`seminarski`, `tutorial`, `youtube`, `pdf`, `knjiga`, `download`, `crack`,
`besplatno`, `free`, `template`, `tema`, `plugin`, `github`, `open source`,
`primer koda`, `kako sam`, `uradi sam`.

Ne dodavati `cena`, `ponuda`, `agencija`, `firma` ili `izrada` kao negative — to
su komercijalni modifikatori. Search terms pregledati svakog radnog dana u prve
dve nedelje i nove negative dodavati na osnovu stvarnih nerelevantnih upita.

## Oglasi

Svaka ad grupa treba najmanje jedan Responsive Search Ad sa 10–12 smislenih
naslova i četiri opisa. Ne ponavljati istu tvrdnju u svim assetima.

Primer naslova za booking:

- Sistem Za Online Zakazivanje
- Booking Za Klinike I Salone
- Admin Kalendar I Podsetnici
- Rešenje Prilagođeno Vašem Radu
- Produkcijski Booking Sistemi
- Adspire Digital Iz Niša
- Pošaljite Projektni Upit

Primer opisa:

> Online termini, radno vreme, zaposleni, potvrde i admin kalendar u jednom
> sistemu. Pogledajte produkcijske primere i pošaljite opis procesa.

> Booking prilagođen klinici, salonu ili servisu — bez ručnog dogovaranja svakog
> termina. Dobijate procenu obima i roka pre odluke.

Assets: sitelinks za Projekti, Usluge, Booking case study i Kontakt; call asset
samo u satima kada se telefon zaista javlja; structured snippets za vrste usluga.

## Budžet i bidding

- Prvi test: 60.000–120.000 RSD mesečno ukupno, u zavisnosti od prihvatljivog
  troška eksperimenta. Ovo nije prognoza rezultata.
- Veći deo dati Kampanji 1 i Kampanji 2; AI početi manjim kontrolisanim budžetom.
- Početak: Maximize Clicks sa razumnim CPC limitom ili manualni pristup ako nalog
  nema podatke. Phrase i exact match, bez broad match-a.
- Prelazak na Maximize Conversions tek kada tracking radi bez duplikata i postoji
  dovoljno stvarnih primarnih konverzija za učenje.
- Budžet se ne povećava zbog klikova; povećava se kada search terms i kvalifikovani
  leadovi potvrde nameru.

## UTM obrazac

Final URL suffix na nivou kampanje:

```text
utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_content={creative}&utm_term={keyword}
```

Google auto-tagging ostaviti uključen. UTM služi internom CRM izveštaju; GCLID je
potreban za precizno Google Ads/offline povezivanje.

## Launch QA

1. Tag Assistant: consent default denied; accept menja sva četiri Consent Mode v2 signala.
2. Testni `/upit`: tačno jedan `generate_lead` i jedna Ads conversion poruka.
3. CRM: landing URL, UTM/referrer i request ID su sačuvani uz isti lead.
4. Google Ads conversion diagnostics: tag aktivan, nema duplikata.
5. Svi oglasi vode direktno na odgovarajuću landing stranicu i rade na telefonu.
6. Search terms pregled posle prvih 24–48 h; ukloniti nerelevantne namere.
7. Ne donositi odluke o kampanji na osnovu jednog ili dva dana podataka.
