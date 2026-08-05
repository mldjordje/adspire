# Faza 2 — sistem upita (naručivanje po usluzi)

Brief po usluzi, bez obaveznog naloga. Zamenjuje „napiši nam na kontakt formi"
kao put ka ponudi: kontakt forma ostaje za pitanja, upit je za posao.

## Tok

1. `/our-services/[slug]` → dugme **Zatraži ponudu** vodi na `/upit/<slug>`
   (usluga već štiklirana). Opšti ulaz je `/upit`, gde je picker prvo polje.
2. `POST /api/upit` — bez logina. Snima:
   - **lead** (postojeći `leads` + `contacts` + `companies`), pa pipeline i dalje
     vidi ceo levak;
   - **upit** (`inquiries`) — brief, podaci za račun, budžet, rok.
   Idempotentno na `requestId`, honeypot + rate limit kao na `/api/leads`.
3. Mejlovi: potvrda klijentu (sa privatnim linkom) i obaveštenje vlasniku.
4. `/os/upiti` → detalj → **Pošalji ponudu** (cena, valuta, rok, važenje,
   napomena). Lead automatski prelazi u `proposal_sent`.
5. Klijent otvara `/upit/status/<token>` iz mejla i prihvata ili odbija.
   Odgovor stiže vlasniku mejlom.

## Nalog je opcion

`portal_users` + magic link (`portal_login_tokens`, hash u bazi, 30 min, jednom
iskoristiv). `/nalog/prijava` traži link, `/nalog` lista sve upite sa te adrese —
i one poslate pre nego što je nalog postojao (`claimInquiriesForPortalUser`).

Bez naloga se ne gubi ništa: svaki upit ima svoj privatni link, i sve radnje
(čitanje ponude, prihvatanje, odbijanje) idu preko njega.

Sesija je odvojena od `/os`: **poseban cookie i poseban secret**, plus `kind` u
payloadu — klijentski token nikad ne sme da prođe kao operaterski.

## Env

| Ključ | Čemu služi |
| --- | --- |
| `DATABASE_URL` | Neon — obavezno, bez baze upit ne može da se primi (503) |
| `PORTAL_SESSION_SECRET` | min. 16 karaktera; bez njega radi sve osim `/nalog` |
| `SMTP_*`, `LEAD_NOTIFICATION_TO` | mejlovi; bez njih se upit i dalje snima |
| `NEXT_PUBLIC_SITE_URL` | linkovi u mejlovima |

Dodati `PORTAL_SESSION_SECRET` i na Vercel pre deploya.

## Migracija

```bash
npm run db:migrate
```

`db/migrations/004_upiti.sql` — `inquiries`, `portal_users`,
`portal_login_tokens`, `inquiry_counters` i `next_inquiry_reference()`
(broj upita po godini: `UP-2026-0001`).

## Ostalo za kasnije

- Prihvaćen upit → predračun jednim klikom (modul faktura već postoji).
- Lokalizacija EN/DE (za sada je forma samo SR, kao i ostale unutrašnje strane).
- Podsetnik ako ponuda istekne bez odgovora.
