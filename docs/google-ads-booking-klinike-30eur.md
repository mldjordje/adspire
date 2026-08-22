# Google Ads — booking softver za ordinacije i salone, test od 30 €

Datum: 2026-08-22. Status: spreman za postavljanje. Zamenjuje
`docs/google-ads-test-30eur.md` kao prvi test — ne pokretati oba istovremeno.

## Zašto ova niša, a ne „cena izrade sajta"

Odluka je promenjena posle izvoza Search Console (3 meseca, do 2026-08-20).

Ko kuca „cena izrade sajta" ima **cenu u nameri** — pregleda pet ponuda i bira
najjeftiniju. Ko kuca „softver za zakazivanje u berbernici" ima **problem u
nameri** — gubi termine i traži rešenje. Drugi je bolji klijent, veći ugovor i
realna šansa za mesečno održavanje.

Podaci koji to potkrepljuju:

| Nalaz | Brojka |
|---|---|
| Ceo sajt, 3 meseca | 595 impresija, 12 klikova |
| „softver za podsetnike za termine u salonu" | 2 impresije, pozicija 17.5 |
| „softver za zakazivanje u berbernici" | 1 impresija, pozicija 30 |
| „najbolji softver za upravljanje klijentima u salonu" | 1 impresija, pozicija 47 |
| `/cena-izrade-sajta` | 38 impresija, **pozicija 46**, 0 klikova |

Tri različita upita iz ove niše se pojavljuju iako nemamo nijednu stranu
napravljenu za njih i rangiramo na strani 2–5. To je namera koja postoji i nije
opsluzena.

Strana o ceni je organski mrtva — pozicija 46 znači peta strana Google-a.

**Najvažnija reč: ljudi kucaju „softver" i „program", ne „sajt".** Ko traži
„sajt" traži prezentaciju. Ko traži „softver" traži alat koji radi posao. Ceo
set ključnih reči prati to.

## Šta ovaj budžet jeste

30 € nije kampanja. Jedno pitanje: **ima li ova niša uopšte saobraćaja u
Srbiji.** Ne „koliko konvertuje" — za to nema uzorka.

Realno očekivanje: CPC 0,40–0,80 € (viši nego za „izradu sajta", jer je namera
komercijalnija), dakle **35–75 klikova ukupno**. Uz 2–4 % konverzije to je
**0–3 upita**.

Nula upita ne znači da niša ne valja. Znači da uzorak nije dovoljan.

## Zašto nula pametnog licitiranja

Smart bidding traži 15–30 konverzija mesečno da izađe iz faze učenja. Ovde ih je
najviše 3.

- **Strategija: Manual CPC**, max CPC **0,80 €**
- **Tip: samo Search.** Bez Display-a, bez Performance Max-a.

## Postavke

| | |
|---|---|
| Budžet | **2,50 € / dan × 12 dana** = 30 € |
| Lokacija | **Cela Srbija.** Ne Niš. |
| Ciljanje lokacije | „Presence: ljudi koji su u toj lokaciji" — ne „interest" |
| Jezik | srpski |
| Raspored | pon–pet, 08–18 |
| Uređaji | bez izmena prvog kruga |
| Mreža | Search only, **isključi Search Partners i Display Expansion** |

Zašto cela Srbija a ne Niš: ovo se ne kupuje lokalno. Ordinacija u Novom Sadu
će uzeti softver iz Niša bez razmišljanja — sistem je isti. Sužavanje na Niš na
ovako tankoj niši ostavlja kampanju bez ijedne aukcije.

## Landing strane

Ne početna, i **ne** `/upit` (pun brief).

| Grupa | Landing |
|---|---|
| Klinike i ordinacije | `/online-zakazivanje-za-salone-i-klinike` |
| Saloni i berbernice | `/online-zakazivanje-za-salone-i-klinike` |
| Opšte „softver za firmu" | `/our-services/sistemi-za-zakazivanje` |

CTA sa svake vodi na **`/upit/brzo?usluga=sistemi-za-zakazivanje`** — pet polja,
bez PIB-a. Pun brief na `/upit` ostaje za onog ko je već odlučio; hladan klik sa
oglasa nikad ne ide tamo.

## Ključne reči

Samo **phrase** i **exact**. Broad match na 30 € je najbrži način da se budžet
potroši na studente i besplatne alate.

**Grupa A — klinike i ordinacije**

```
[softver za stomatolosku ordinaciju]
[program za zakazivanje pacijenata]
"softver za ordinaciju"
"program za ordinaciju"
"evidencija pacijenata program"
"aplikacija za zakazivanje pacijenata"
"softver za stomatoloske ordinacije"
```

**Grupa B — saloni i berbernice**

```
[softver za frizerski salon]
[program za zakazivanje termina]
"softver za zakazivanje u salonu"
"softver za zakazivanje u berbernici"
"program za frizerski salon"
"softver za upravljanje klijentima u salonu"
"podsetnik za termine softver"
```

**Grupa C — opšte, poslovni softver za zakazivanje**

```
[sistem za zakazivanje termina]
[online zakazivanje termina za firme]
"booking sistem za firmu"
"aplikacija za zakazivanje termina"
"program za zakazivanje klijenata"
```

Tri grupe, ne jedna — da se vidi koja niša ima volumen. Ne dodavati četvrtu dok
ovih 30 € ne prođe.

Reč „softver" i „program" su namerno u skoro svakoj frazi. Fraze sa „sajt" ne
idu ovde — one dovode drugu publiku i drugu cenu.

## Negativne ključne reči — najvažnija stavka na ovom budžetu

Dodati **pre** pokretanja, na nivou kampanje:

```
besplatno, besplatan, free, gratis, demo verzija
calendly, google kalendar, google calendar, outlook, excel, tabela
kurs, obuka, skola, ucenje, nauciti, tutorial
posao, zaposlenje, praksa, konkurs, plata
sam, sama, sopstveni, diy, kako napraviti sam
crack, torrent, kljuc, licenca jeftino
booking com, booking.com, airbnb, hotel, apartman, smestaj
zakazivanje kod lekara, dom zdravlja, e-zdravlje, izabrani lekar
frizer cenovnik, cena sisanja, zakazi termin frizer
```

Poslednja dva reda su kritična. Bez njih ćeš plaćati pacijente koji traže
termin kod svog lekara i ljude koji traže frizera — to su korisnici tvojih
klijenata, ne tvoji klijenti. Na ovoj niši to je najveći izvor bacanja para.

`booking com` i `hotel` isto: „booking sistem" bez negativnih vuče ljude koji
traže smeštaj.

## Tekst oglasa (RSA)

Isti skelet za sve tri grupe, sa zamenjenom prvom reči.

Naslovi (max 30 znakova):

```
Softver za zakazivanje
Zakazivanje bez telefona
Manje nedolazaka na termin
Podsetnik pred svaki termin
Softver po meri, ne šablon
13 živih klijentskih sistema
Rađeno u Nišu, radi svuda
Pitaj — odgovor isti dan
```

Za grupu A zameni prvi naslov sa `Softver za ordinacije`, za grupu B sa
`Softver za salone`.

Opisi (max 90 znakova):

```
Pacijenti i klijenti zakazuju sami, preko sajta. Kalendar i podsetnici su unutra.
Podsetnik pred termin smanjuje nedolaske. Radi nad tvojim kalendarom i cenovnikom.
Bez mesečne pretplate po korisniku. Sistem je tvoj — kod i podaci ostaju kod tebe.
Postavi pitanje u pet polja. Odgovaram lično, obično isti radni dan.
```

Napomena o tvrdnjama: „13 živih klijentskih sistema" je tačno. **Ne dodavati
procente** („−40 % nedolazaka" i slično) dok ne postoje brojke od klijenata — u
starim tekstovima na sajtu već stoje nepotvrđene tvrdnje i ne treba ih širiti u
plaćene oglase.

**Ekstenzije** (podižu CTR besplatno, obavezno):

- Sitelink: Kako izgleda sistem · Radovi · Cena i šta utiče · Postavi pitanje
- Callout: Odgovor isti dan · Bez pretplate po korisniku · Kod ostaje tvoj · Rađeno u Nišu
- Structured snippet (Usluge): zakazivanje, podsetnici, kalendar, evidencija klijenata
- Poziv: telefonski klik se već meri kao `contact_intent`

## UTM oznake — obavezno

Postavi kao **Tracking template na nivou kampanje**, ne ručno po oglasu:

```
{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign=booking30&utm_term={keyword}&utm_content={creative}
```

`{lpurl}` ubacuje landing stranu te ad grupe, pa isti template radi za sve tri.

Bez ovoga rezultat se ne vidi u `/os/analitika`. Kampanja se prenosi kroz ceo
obilazak — oznake se čuvaju u `sessionStorage`, pa upit poslat sa `/upit/brzo`
ostaje pripisan kampanji.

## Konverzije — svesna odluka da se NE postavlja gtag

Google Ads conversion tag donosi kolačiće, a time i baner za pristanak, zbog
najviše 3 konverzije koje ionako ne mogu da nahrane automatiku.

Meri se kroz sopstveni levak:

- `/os/analitika` → tabela izvora: red `google` daje sesije i poslate forme
- `data-form="upit-brzo"` je oznaka brze forme, odvojena od `upit`
- svaki upit nosi `gclid` u `leads.first_touch`, pa je uvoz offline konverzija
  moguć kasnije

Ako budžet pređe ~300 €/mesec, tek tada ima smisla gtag + pristanak.

## Šta se gleda kad 30 € prođe

Redom, i ništa drugo:

1. **Broj klikova ukupno** — ovo je glavno pitanje testa, ne konverzija
   - **≥30 klikova** → niša ima volumen, skaliraj na 150 €
   - **5–30 klikova** → volumen tanak; Google nije glavni kanal, outreach jeste
   - **0–5 klikova** → niko to ne gugla; jedini put je hladan kontakt
2. **Koja grupa je dobila klikove** — klinike, saloni ili opšte
3. **Prosečan CPC** po grupi
4. **Search terms report** — svaka besmislena pretraga ide u negativne
5. **Sesije vs. poslate forme** u `/os/analitika` za izvor `google`

Iskren stav unapred: za ovu nišu u Srbiji **outreach verovatno pobeđuje ads**.
Ordinacije ne guglaju softver — njima se priđe. n8n booking-outreach workflow
već postoji za tačno ovaj retarget. Ads ovde služi da to potvrdiš za 30 €, ne
da bude kanal.

## Preduslov — bez ovoga se ne pušta

**Migracija `db/migrations/011_inquiry_intake.sql` mora biti primenjena na
Neon pre prvog klika.** Bez kolone `intake` ruta `/api/upit` vraća grešku i
svaki plaćeni klik koji stigne do slanja se gubi.

Provera da je prošlo: pošalji test upit sa `/upit/brzo` i vidi da li se pojavio
u `/os/upiti` sa oznakom „Brzi upit".

## Šta ostaje na Đorđu

Ovo se ne može uraditi iz koda:

- primeniti migraciju 011 na Neon
- otvoriti Google Ads nalog i uneti karticu
- postaviti kampanju po gornjim postavkama
- uključiti je (troši pravi novac — nijedan agent to ne radi bez potvrde)
