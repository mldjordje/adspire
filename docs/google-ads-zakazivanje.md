# Google Ads — kampanja za /online-zakazivanje-za-salone-i-klinike

Stanje 2026-08-23: 4 klika, 28 impresija, CPC $0,64, potrošeno $2,54. Kampanja
je krenula 23.08, dakle jedan dan podataka.

## Prvo: brojka je pročitana naopako

CTR je **14,3%** (4/28). Prosek za search kampanje je 3–5%. Oglas radi.

Usko grlo nije odnos klikova i impresija — nego to što impresija ima samo 28.
Ne prikazuješ se dovoljno. Sve dole je poređano po tome koliko pomera tu brojku.

## 1. Konverzije se ne mere — ovo pre svega ostalog

Kod za Google Ads konverziju postoji u `src/components/analytics/GoogleMeasurement.tsx`
i šalje `conversion` event kad upit prođe. Ali tri env varijable nisu podešene,
pa se `gtag` loader nikad ne učita.

Provereno na živom sajtu 2026-08-23: nijedan `googletagmanager` skript nije na
strani, `window.gtag` je `undefined`.

Posledica: Google ne zna koji klik je doneo upit. Smart Bidding nema od čega da
uči, a ti ne znaš koja ključna reč plaća.

Na Vercelu (Settings → Environment Variables, sve tri za Production):

```
NEXT_PUBLIC_GOOGLE_TAG_ID
NEXT_PUBLIC_GOOGLE_ADS_ID
NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL
```

- `NEXT_PUBLIC_GOOGLE_ADS_ID` — oblik `AW-XXXXXXXXX`, iz Google Ads.
- `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL` — „Conversion label" konkretne akcije
  (Goals → Conversions → otvori akciju → Tag setup).
- `NEXT_PUBLIC_GOOGLE_TAG_ID` — GA4 `G-XXXXXXX`, ako hoćeš i GA.

Posle deploya proveri u konzoli na `/upit/brzo`: `typeof window.gtag` mora da
vrati `"function"`. Tag se učitava sa consent default = denied, pa se diže na
granted kad posetilac prihvati — to je namerno i u redu.

## 2. Zašto malo impresija — jedna kolona daje odgovor

U Ads dodaj kolone **Search impr. share**, **Impr. share lost (budget)** i
**Impr. share lost (rank)**.

- gubitak na **budget** → digni dnevni budžet. Uz CPC od $0,64 i CTR od 14%,
  to je najjeftinija poluga koju imaš. Ništa drugo ne diraj dok se ne potroši.
- gubitak na **rank** → digni bid ili popravi Quality Score (relevantnost
  oglasa prema ključnoj reči i prema landing strani).
- ako je impr. share već visok → iscrpeo si tražnju za tim rečima, idi na 3.

## 3. Ključne reči

„sistem za zakazivanje termina" je niskofrekventna fraza u Srbiji. Vlasnici
salona ne kucaju kako se proizvod zove — kucaju svoj problem i svoju branšu.

Dodaj kao phrase match:

```
program za frizerski salon
softver za frizerski salon
aplikacija za zakazivanje termina
program za kozmeticki salon
zakazivanje termina stomatolog
softver za stomatolosku ordinaciju
booking sistem za salon
program za zakazivanje klijenata
aplikacija za berbernicu
zakazivanje termina online
```

Negativne reči da se ne troši budžet: `besplatno`, `free`, `download`,
`kurs`, `posao`, `zaposlenje`, `wordpress plugin`.

Lokacija: cela Srbija, ne samo Niš. Sistem se radi na daljinu, a najveći
budžeti nisu u Nišu.

## 4. Asseti oglasa

Sekcije na strani sad imaju stabilne ID-eve, pa sitelink može da vodi direktno
u odgovor:

| Sitelink | URL |
| --- | --- |
| Gotovi sistemi | `/online-zakazivanje-za-salone-i-klinike#gotovi-sistemi` |
| Šta ulazi u sistem | `/online-zakazivanje-za-salone-i-klinike#sta-preuzima` |
| Rok i tok | `/online-zakazivanje-za-salone-i-klinike#tok` |
| Cena | `/online-zakazivanje-za-salone-i-klinike#cena` |

Callout assets: `13 živih sistema`, `Puštanje za 2 nedelje`,
`Bez mesečne licence po zaposlenom`, `Kod i baza su vaši`.

Call asset: `+381 60 149 149 1`. Strana sad ima telefon, WhatsApp i Viber u
heroju i na kraju — vlasnik salona između dve mušterije zove, ne popunjava
formu.

## 5. Šta strani još fali

- **Izjave klijenata.** Devet živih sistema, nula citata vlasnika. Ovo ne mogu
  da napišem — traži jednu-dve rečenice od Doctor Barbera i Dr Igića, sa imenom
  i firmom. Bez izmišljanja.
- **Snimci za Auto Delić, Salon Srđan, Eduku i Stan na dan.** Kartice rade i
  bez slike, ali pet od devet ima snimak, a četiri nemaju.
- **Video od 20 sekundi** kako izgleda zakazivanje iz ugla klijenta. Najjači
  mogući asset za ovu branšu, i može da se iskoristi i na Meta oglasima.

## Redosled

1. Env varijable za konverzije (bez ovoga je sve ostalo pogađanje).
2. Pogledaj impression share, digni budžet ako se gubi na budget.
3. Dodaj ključne reči iz 3 i negativne.
4. Sitelinks i callouts.
5. Traži dve izjave klijenata.
