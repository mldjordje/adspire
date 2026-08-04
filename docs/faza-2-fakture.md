# Faza 2 — Fakture u Adspire OS-u (Neon)

Novi admin: `/os`, Next.js + **Neon Postgres**. Supabase je izbačen (auth, RLS,
`@supabase/*` paketi, `src/lib/supabase/`). Stari PHP `admin/` folder je netaknut
i nije više izvor istine — briše se kad ovo prođe boj sa realnim fakturama.

## Šta postoji

| Ekran | Šta radi |
| --- | --- |
| `/os` | Pregled: leadovi + MRR, fakturisano, neplaćeno, van roka |
| `/os/klijenti` | Lista klijenata sa MRR-om; `/novi` i `/[id]` za unos i izmenu |
| `/os/klijenti/[id]` | Pretplate (održavanje), dokumenta klijenta, podaci za fakturu |
| `/os/fakture` | Sve fakture i predračuni, status, PDF |
| `/os/fakture/nova` | Više stavki, „Popuni iz pretplata", RSD/EUR, račun/predračun |
| `/os/fakture/[id]` | Detalji, PDF, plaćeno / storno |
| `/os/podesavanja` | Izdavalac, računi, PDV napomene, poziv na broj, offset numeracije |
| `/api/os/fakture/[id]/pdf` | Jedini izlaz PDF-a, iza sesije |

## Podešavanje

```bash
# 1. Neon projekat (region eu-central-1), pa u .env.local:
#    DATABASE_URL=postgresql://…
#    OS_SESSION_SECRET=<64 nasumična karaktera>
npm run db:migrate
node scripts/os-create-user.mjs djordje@adspire.rs "<lozinka>" "Đorđe"
```

Zatim `/os/podesavanja` → PIB, MB, tekući račun, mesto izdavanja, PDV napomene.

Uvoz klijenata i pretplata iz JSON-a (idempotentno po nazivu firme):

```bash
node scripts/import-clients.mjs data/klijenti.json
```

## Numeracija

Format je `34/2026` — broj i godina, kao na dosadašnjim računima. Serija je
odvojena po vrsti dokumenta (račun / predračun) i po godini. Broj se dodeljuje u
istom SQL upitu koji upisuje red, pa dva paralelna izdavanja ne mogu dobiti isti
broj; `unique (invoice_year, invoice_seq, kind)` je garancija, ne provera pre
upisa.

**Offset** u Podešavanjima nastavlja postojeću papirnu seriju: upiši poslednji
izdati broj tekuće godine i sledeći dokument dobija naredni.

Datum i godina serije se čitaju po beogradskom vremenu, ne po serverskom UTC —
inače bi sve izdato između ponoći i 01:00/02:00 dobilo prethodni dan, a preko
Nove godine i prethodnu seriju.

## Šta dokument sadrži

Obavezni elementi koji se štampaju: mesto **i** datum izdavanja, **datum
prometa** (dan izvršenja usluge — nije isto što i datum izdavanja), broj
dokumenta, obe strane sa PIB-om i matičnim brojem, stavke sa količinom i cenom,
ukupan iznos, podaci za uplatu i PDV napomena.

Predračun je označen kao PREDRAČUN, nema datum prometa (promet još nije nastao) i
nosi napomenu da nije poreska isprava.

Domaći račun u evrima štampa **dinarski** račun i dinarski iznos po srednjem
kursu NBS — plaćanje između dva rezidenta je dinarsko, valutna klauzula ne menja
to. Strani kupci dobijaju engleski šablon, devizni račun i SWIFT.

## Ostaje na knjigovođi

1. **Tekst PDV napomene** — `/os/podesavanja`, polja za domaće i strane kupce.
   Stoji `POPUNITI SA KNJIGOVOĐOM`. **Dok je tako, računu fali obavezan element.**
2. **e-Fakture (SEF)** — ovaj sistem ne šalje na SEF. Da li postoji obaveza
   zavisi od statusa i od toga kome se fakturiše; nije provereno.
3. **Poziv na broj** — podrazumevano se ne koristi (štampa se „Svrha uplate:
   broj dokumenta"). Model 97 generiše ispravnu numeričku referencu sa kontrolnim
   ciframa (ISO 7064 MOD 97-10) ako želiš automatsko uparivanje uplata.

## Nije urađeno

- **Slanje mejlom.** Dogovoreno da ide u sledećem koraku (Resend), kad potvrdiš
  izgled PDF-a. Šabloni iz starog admina (održavanje / projekat) se prenose tada.
- **Izmena izdatog dokumenta.** Namerno: broj je dodeljen, ispravka ide preko
  storna i novog dokumenta.
- Automatsko generisanje mesečnih faktura iz pretplata (sada je dugme
  „Popuni iz pretplata" na formi).
