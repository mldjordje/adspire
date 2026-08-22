# Google Ads — test od 30 €

Datum: 2026-08-22. Status: spremno za postavljanje, nalog još nije potvrđen.

## Šta ovaj budžet jeste, a šta nije

30 € nije kampanja. To je **jedan test sa jednim pitanjem**: da li iko u Nišu
klikne i pošalje upit, i na koju reč.

Računica: CPC za komercijalne pojmove oko izrade sajta u Srbiji realno ide
0,20–0,50 €. To je **60–150 klikova ukupno**, ne mesečno. Uz konverziju od
2–4 % koja je normalna za ovu vrstu strane, očekivanje je **0–3 upita**.

Ako iz ovoga izađe nula upita, to ne znači da Google ne radi — znači da uzorak
nije dovoljan da se bilo šta zaključi. Zato je cilj testa da se izmeri **cena
klika i koja reč privlači**, pa da se odluči da li ima smisla uložiti 300 €.

## Zašto nula pametnog licitiranja

Smart bidding (Maximize Conversions, tCPA) treba **15–30 konverzija mesečno**
da bi izašao iz faze učenja. Ovde ih je najviše 3. Automatika bi trošila
budžet na istraživanje i ništa ne bi naučila.

- **Strategija: Manual CPC** (ili Maximize Clicks sa cap-om), max CPC **0,35 €**
- **Tip: samo Search.** Display i Performance Max na 30 € su bacanje para —
  PMax uzima budžet za prikaze bez namere kupovine.

## Postavke

| | |
|---|---|
| Budžet | **2,50 € / dan × 12 dana** = 30 € |
| Lokacija | Niš + 30 km. **Ne cela Srbija.** |
| Ciljanje lokacije | „Presence: ljudi koji su u toj lokaciji" — ne „interest" |
| Jezik | srpski |
| Raspored | pon–pet, 09–17 |
| Uređaji | bez izmena prvog kruga; posle testa smanji mobilni ako ne konvertuje |
| Mreža | Search only, **isključi Search Partners i Display Expansion** |

Zašto 2,50 €/dan a ne 1 €/dan preko 30 dana: ispod ~5× CPC dnevno Google jedva
ulazi u aukciju i podaci se razvuku na šum. Kraće i gušće daje čitljiv rezultat.

## Landing strana

**`/cena-izrade-sajta`** — ne početna.

Tri razloga:
1. Strana stvarno odgovara na pitanje iz pretrage (rasponi 1.200–3.000 € za
   prezentacioni, 3.000–8.000 € za shop, 4.000–15.000 € za interne aplikacije).
   Poklapanje namere = viši Quality Score = **niži CPC**. Na 30 € to je razlika
   između 60 i 120 klikova.
2. Nema WebGL scenu — brzo se učitava. Početna vrti scenu od 16.000 čestica,
   što je pogrešan prvi utisak za nekog ko traži cenu sa telefona.
3. Već ima FAQ šemu, pa može uhvatiti i proširenja u rezultatu.

## Ključne reči

Samo **phrase** i **exact**. Broad match na ovom budžetu je najbrži način da se
30 € potroši na „besplatna izrada sajta" i studente.

**Grupa A — cena (najviša namera, ide na `/cena-izrade-sajta`)**
```
[cena izrade sajta]
[koliko kosta izrada sajta]
"cena izrade sajta"
"cena izrade web shopa"
"koliko kosta sajt"
```

**Grupa B — lokalno (ide na `/izrada-sajta-i-aplikacija-nis`)**
```
[izrada sajtova nis]
[web dizajn nis]
"izrada sajta nis"
"web agencija nis"
```

Dve grupe, ne jedna — da se vidi koja radi. Ne dodavati treću dok ovih 30 € ne
prođe.

## Negativne ključne reči — najvažnija stavka na ovom budžetu

Dodati **pre** pokretanja, na nivou kampanje:

```
besplatno, besplatan, free, gratis
wordpress tutorial, kurs, obuka, skola, ucenje, nauciti
posao, zaposlenje, praksa, freelance, honorarno
sam, sama, sopstveni, diy, kako napraviti sam
wix, shopify, squarespace, weebly
template, sablon, tema
plata, cena domena, cena hostinga
```

Bez ovoga jedan dan „kako napraviti sajt besplatno" pojede pola budžeta.

## Tekst oglasa (RSA)

Naslovi (max 30 znakova):
```
Izrada sajta — cena odmah
Koliko košta sajt? Rasponi
Web sajt iz Niša
Sajt 1.200–3.000 €
13 živih klijentskih sistema
Ponuda za 48h
Bez šablona — kod po meri
```

Opisi (max 90 znakova):
```
Jasni rasponi cena pre poziva. Vidi šta određuje cenu i koliko traje izrada.
Prezentacioni sajt, web shop ili interna aplikacija. Ponuda u roku od 48 sata.
Rađeno u Nišu. Bez agencijskog paketa koji ti ne treba — plaćaš ono što koristiš.
```

Napomena: „13 živih klijentskih sistema" je tačno. Ne dodavati procente rasta
dok se ne potvrde brojkama od klijenata — u starim tekstovima već stoje
nepotvrđene tvrdnje i ne treba ih širiti u plaćene oglase.

**Ekstenzije** (podižu CTR besplatno, obavezno):
- Sitelink: Radovi · Kako radimo · Održavanje · Pošalji upit
- Callout: Odgovor za 48h · Bez šablona · Rađeno u Nišu · Vlasništvo nad kodom
- Structured snippet (Usluge): sajtovi, web shop, aplikacije, zakazivanje
- Poziv: ako želiš pozive — telefonski klik se već meri kao `contact_intent`

## UTM oznake — obavezno

Final URL svakog oglasa mora nositi oznake, inače se rezultat ne vidi u
`/os/analitika`:

```
https://adspire.rs/cena-izrade-sajta?utm_source=google&utm_medium=cpc&utm_campaign=test30&utm_term={keyword}&utm_content={creative}
```

Postavi ovo kao **Tracking template na nivou kampanje**, ne ručno po oglasu.

Kampanja se od 2026-08-22 prenosi kroz ceo obilazak: oznake se čuvaju u
`sessionStorage`, pa se upit poslat sa `/upit` i dalje pripisuje kampanji.
Ranije se gubio i svaka plaćena kampanja je čitala nula konverzija.

## Konverzije — svesna odluka da se NE postavlja gtag

Google Ads conversion tag donosi kolačiće, a time i baner za pristanak, i to
zbog najviše 3 konverzije koje ionako ne mogu da nahrane automatiku.

Umesto toga se meri kroz sopstveni levak koji već postoji:
- `/os/analitika` → tabela izvora: red `google` daje sesije i poslate forme
- `cta_click` sa oznakama `cena-primarni` / `cena-sekundarni`
- svaki upit nosi `gclid` u `leads.first_touch`, pa je uvoz offline konverzija
  moguć kasnije ako budžet poraste

Ako budžet ikad pređe ~300 €/mesec, tek tada ima smisla gtag + pristanak.

## Šta se gleda kad 30 € prođe

Redom, i ništa drugo:

1. **Prosečan CPC** — ako je ispod 0,30 €, kanal je isplativ za skaliranje
2. **Koja grupa ima jeftinije klikove** — cena ili lokalno
3. **CTR po ključnoj reči** — ispod 2 % znači da tekst oglasa ne odgovara reči
4. **Search terms report** — koje su stvarne pretrage; svaka besmislena ide u
   negativne pre sledećeg kruga
5. **Sesije vs. poslate forme** u `/os/analitika` za izvor `google`

Odluka posle: ako je CPC ispod 0,30 € i ima bar jedan ozbiljan upit → 150 €
sledeći mesec sa istim postavkama. Ako je CPC preko 0,60 € → Google Ads nije
kanal za ovu ponudu na ovom tržištu, i pare idu u sadržaj i preporuke.

## Šta ostaje na Đorđu

Ovo se ne može uraditi iz koda:

- otvoriti Google Ads nalog i uneti karticu
- postaviti kampanju po gornjim postavkama
- uključiti je (troši pravi novac — nijedan agent to ne radi bez potvrde)
