# Mejl: djordje@adspire.rs preko Resend-a, sanduče ostaje na cPanel-u

Kratak odgovor na pitanje „mogu li da koristim svoj mejl `djordje@adspire.rs`":
**da, i za slanje i za prijem, bez seljenja sandučeta.**

- **Prijem** ostaje tamo gde je sada: cPanel / webmail. Resend ne prima poštu i ne
  dira MX zapis domena `adspire.rs`.
- **Slanje** ide preko Resend-a, sa adrese `djordje@adspire.rs`, čim se domen
  verifikuje. Resend ne traži MX na korenu domena — traži ga na pod-domenu
  `send.adspire.rs`, koji služi samo za bounce/feedback. Zato se webmail ne kvari.
- **Odgovor klijenta** stiže u cPanel sanduče, jer svaka poruka nosi
  `Reply-To: djordje@adspire.rs`.

Zašto uopšte Resend, kad SMTP već radi: shared cPanel IP deli reputaciju sa svim
ostalim nalozima na serveru, nema DKIM potpisa na porukama koje šalje aplikacija,
i nema nikakvog uvida u to da li je poruka isporučena. Za ponudu koja odlučuje
posao to je preskupo. SMTP ostaje kao fallback — ako Resend ključ nije podešen ili
API vrati grešku, `/os` šalje preko cPanel-a i to zapisuje u prepisci.

---

## 1. Resend

1. Napravi nalog na resend.com i dodaj domen **`adspire.rs`** (ne `send.adspire.rs` —
   Resend sam koristi taj pod-domen za svoje zapise).
2. Regija: **EU (Ireland)** — klijenti su u RS i DACH, i podaci ostaju u EU.
3. Resend prikaže 3–4 DNS zapisa. Prepiši ih tačno; vrednosti su kod tebe u nalogu.

## 2. DNS u cPanel-u (Zone Editor)

cPanel → **Zone Editor** → `adspire.rs` → **Manage**.

| Tip | Ime | Vrednost | Napomena |
|---|---|---|---|
| MX | `send` | `feedback-smtp.eu-west-1.amazonses.com` (prioritet 10) | samo bounce, ne dira poštu |
| TXT | `send` | `v=spf1 include:amazonses.com ~all` | SPF pod-domena |
| TXT | `resend._domainkey` | `p=MIGfMA0…` (iz Resend-a) | DKIM potpis |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:djordje@adspire.rs` | izveštaji, ne blokira ništa |

**Ne diraj:**
- MX zapis korena `adspire.rs` (pokazuje na cPanel mail server) — to je tvoj inbox.
- postojeći SPF na korenu domena — cPanel i dalje šalje sa njega.

**Zamka:** ako cPanel ima *Email Routing* za `adspire.rs` postavljen na „Local Mail
Exchanger", može da preuzme i `send.adspire.rs` i Resend verifikacija zapne. Ako se
to desi: cPanel → **Email Routing** → za `adspire.rs` izaberi *Automatically Detect
Configuration*, i proveri da `send.adspire.rs` nije naveden kao lokalni domen.

Provera posle 15–30 minuta:

```bash
nslookup -type=TXT resend._domainkey.adspire.rs
```

```bash
nslookup -type=MX send.adspire.rs
```

Kad Resend prikaže **Verified**, gotovo je.

## 3. Environment

U `.env.local` (lokalno) i na Vercelu (Project → Settings → Environment Variables):

```
RESEND_API_KEY=re_xxx
RESEND_FROM="Adspire Digital <djordje@adspire.rs>"
MAIL_REPLY_TO=djordje@adspire.rs
```

SMTP promenljive ostavi kako jesu — one su fallback.

Redosled je u `src/lib/mail.ts`: Resend → cPanel SMTP → greška zapisana u prepisci.
Nijedan neuspeh slanja ne obara upit, lead ni ponudu; poruka koja nije otišla vidi
se crveno u timeline-u sa razlogom.

Trenutno stanje transporta piše u `/os/podesavanja` → sekcija **Mejl**.

## 4. Šta ide sa koje adrese

| Poruka | Šalje se na | Reply-To |
|---|---|---|
| Potvrda upita (klijentu) | mejl iz forme | `djordje@adspire.rs` |
| Obaveštenje o upitu (tebi) | `LEAD_NOTIFICATION_TO` ili `SMTP_USER` | mejl klijenta |
| Ponuda | klijent | `djordje@adspire.rs` |
| Odgovor iz `/os` | klijent | `djordje@adspire.rs` |
| Magic link za `/nalog` | klijent | — |

## 5. Prijem odgovora nazad u `/os` (kasnije)

Tabela `messages` ima kolonu `direction` i vrednost `'in'` koju za sada niko ne
upisuje. Kad zatreba da se i odgovori klijenata vide u `/os`, dve su opcije:

- **Resend Inbound** — MX za `send.adspire.rs` se prebaci na Resend inbound i
  webhook upisuje poruke. Ne dira glavni inbox.
- **IMAP poll** — mali cron koji čita cPanel sanduče i upisuje poruke sa istim
  `reference` brojem iz naslova.

Prva je čistija, druga ne zahteva promenu DNS-a. Nijedna nije uslov za ovo što
sada radi.
