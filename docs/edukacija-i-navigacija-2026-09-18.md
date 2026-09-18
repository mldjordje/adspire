# AI edukacija i snalaženje na sajtu — mapa problema i šta je urađeno

18. septembar 2026.

Povod: „AI edukacija je loše podešena — kad kliknem CTA vodi me na formu za upit, a to
tu ne treba. Edukacija je mesto gde učim ljude da prave viralne AI video klipove; dva
paketa se naručuju, pa se čovek uloguje preko Google-a na svoj dashboard gde zakazuje
časove i prati wallet, isto kao na tozai projektu. I generalno je teško snaći se na
adspire.rs."

---

## 1. Mapa problema

### Edukacija — tok kupovine

| # | Problem | Gde | Status |
|---|---|---|---|
| 1 | Svi CTA na `/edukacija` vodili na `/upit/brzo?usluga=edukacija` — istu formu kojom se traži web shop | hero, oba paketa, završni CTA, sticky traka | **rešeno** |
| 2 | Nije postojao nijedan način da se paket poruči; sati su mogli da nastanu samo ručnim unosom u `/os` | — | **rešeno** (`/edukacija/porudzbina`) |
| 3 | Google prijava je postojala u kodu, ali je nigde nije bilo na putu kupca | `PortalLoginV4` | **rešeno** — prijava je korak 2 porudžbine |
| 4 | `safeNextPath` je posle prijave puštao samo `/nalog*`, pa se kupac nije mogao vratiti na paket koji je izabrao | `src/lib/portal/next.ts` | **rešeno** |
| 5 | Tekst strane je opisivao stari tok („pošalji upit → razgovor → uplata") | `educationLandingPage.ts` | **rešeno** |
| 6 | JSON-LD `Offer.url` je pokazivao na `#paketi` — sidro koje na strani ne postoji | `src/lib/seo/offers.ts` | **rešeno** — vodi na porudžbinu tog paketa |
| 7 | `/nalog/edukacija` bez sati je nudio „pošalji kratak upit" | `EduPackagesV4` | **rešeno** |

### Snalaženje / navigacija

| # | Problem | Status |
|---|---|---|
| 8 | Na desktopu nije postojao **nijedan** link ka nalogu. Kupac sa satima na stanju nije imao vrata za ulazak | **rešeno** — „Nalog" u traci, sa ikonicom, odvojen hairline-om |
| 9 | Dugme u zaglavlju je na svakoj strani pisalo „Pošalji upit", i na `/edukacija` gde sledeći korak nije upit | **rešeno** — `navCtaLabel` po strani; na edukaciji piše „Poruči paket" |
| 10 | U mobilnom meniju je nalog bio poslednja stavka poslednje grupe | **rešeno** — svoj red odmah ispod dve akcione kartice |
| 11 | „Kreni odavde" u mega-meniju nije imao ni porudžbinu ni nalog | **rešeno** |
| 12 | Futer (22 linka) nije imao nalog | **rešeno** |
| 13 | `shellPath` bi za EN/DE prefiksovao `/nalog` i `/edukacija` u rute koje ne postoje (`/en/nalog` → 404) | **rešeno** — lista `UNPREFIXED` |

### Ostaje (nije u ovoj rundi)

- **Sadržaj edukacije.** Strana i dalje prodaje „AI u tvom poslu" (asistenti, automatizacija,
  sajt uz AI, marketing). Ako je pravi proizvod **viralni AI video klipovi**, program u
  `educationLandingPage.ts` treba prepisati — to je odluka o ponudi, ne tehnička izmena, pa
  čeka Đorđa.
- **Plaćanje karticom.** Nema gateway-a. Porudžbina je evidencija namere; sati se dodaju iz
  `/os` kad uplata legne.
- **`GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` na Vercelu.** Dok ih nema, dugme „Nastavi sa
  Google nalogom" se ne prikazuje i prijava ide linkom na mejl. Redirect URI koji treba
  upisati u Google Cloud: `https://adspire.rs/api/portal/google/callback`.
- **EN/DE.** Edukacija i nalog su i dalje samo na srpskom.

---

## 2. Novi tok

```
/edukacija  →  „Poruči paket"  →  /edukacija/porudzbina?paket=18h
                                        │
                                        ├─ 1. Paket (izabran, može da se promeni)
                                        ├─ 2. Prijava: Google ili link na mejl
                                        │     (vraća se tačno na ovaj paket)
                                        └─ 3. Potvrda: telefon + „šta želiš da naučiš"
                                                 │
                                                 ▼
                                   edu_orders (status „nova")
                                   mejl kupcu + mejl Đorđu
                                                 │
                                   /os/edukacija → „Plaćeno → dodaj sate"
                                                 │
                                                 ▼
                                   edu_hour_entries (+18h, reason „purchase")
                                   /nalog/edukacija: wallet + kalendar termina
```

**Porudžbina nije uplata.** Red u `edu_orders` i sati u `edu_hour_entries` su namerno dve
stvari: pogrešno kliknuta porudžbina ne sme tiho da postane sat koji se može zakazati.
Dugme „Plaćeno" radi `UPDATE ... where status = 'nova'`, pa drugi klik ne može da doda
sate dva puta.

## 3. Šta je dodato u kodu

- `db/migrations/014_edu_orders.sql` — **primenjena na Neon 18.09.2026.**
- `src/lib/education/orders.ts` — `placeOrder`, `listBuyerOrders`, `listStudioOrders`,
  `markOrderPaid`, `cancelOrder`.
- `src/app/edukacija/porudzbina/` — strana i server akcija.
- `notifyOrderPlaced` u `src/lib/education/notify.ts`.
- `/os/edukacija` — tabela „Porudžbine sa sajta" + karta „Porudžbina čeka uplatu".
- `packageOrderHref()` u `src/lib/education/packages.ts` — jedini izvor linka ka porudžbini.

## 4. Provereno

- `npm run typecheck`, `npm test` (181 test), `npm run build` — prolazi.
- SQL iz `orders.ts` izvršen nad Neon bazom sa test korisnikom: upis, lista za `/os`,
  naplata, drugi klik ne prolazi. Test redovi obrisani.
- U pregledaču: `/edukacija` (svi CTA vode na porudžbinu), `/edukacija/porudzbina` odjavljen
  (prijava) i prijavljen (potvrda sa tačnim paketom), mobilni meni sa redom za nalog.
