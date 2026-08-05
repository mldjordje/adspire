# Mesečne fakture za pretplate

Održavanje se fakturiše svakog meseca istim stavkama. To radi `/os/fakture/mesecno`
ručno, i cron automatski.

## Odakle dolaze stavke

Sa kartice klijenta → **Pretplate**. Aktivna pretplata (naziv, stavka na fakturi,
količina, mesečna cena, valuta) postaje stavka na računu. Pauzirana pretplata se
preskače.

Jedan račun **po klijentu i po valuti**. Klijent sa pretplatom u RSD i u EUR dobija
dva dokumenta — zbir preko valuta ne postoji.

## Ručno: `/os/fakture/mesecno`

1. Izaberi mesec (podrazumevano tekući).
2. Vidiš ko čeka, koje su stavke i koliko je ukupno.
3. **Izdaj sve** ili **Izdaj** po klijentu.
4. Čekiraj *„odmah pošalji klijentima mejlom"* ako hoćeš i slanje u istom potezu.
   Bez toga se dokumenta samo izdaju, pa ih šalješ pojedinačno.

Klijent bez mejl adrese dobija račun, ali se ne šalje — piše koliko ih je takvih.

## Zašto se drugi klik ne duplira

Svaki automatski račun nosi `recurring_period` (`2026-08`) i postoji jedinstveni
indeks na `(client_id, recurring_period, currency)`. Drugi pokušaj — tvoj klik posle
crona, retry, dva paralelna zahteva — vraća **preskočeno**, ne novi broj.

Ručno izdat račun ima `recurring_period` prazan i nikad ne smeta.

## Automatski (Vercel Cron)

`vercel.json`:

```json
{ "crons": [{ "path": "/api/os/cron/mesecne-fakture", "schedule": "0 6 1 * *" }] }
```

Prvog u mesecu u **06:00 UTC** (08:00 po Beogradu leti, 07:00 zimi — Vercel cron
ne poznaje vremensku zonu).

Na Vercelu → Settings → Environment Variables:

| Promenljiva | Vrednost | Šta radi |
|---|---|---|
| `CRON_SECRET` | nasumičan string | bez njega ruta vraća 503 i ne radi ništa |
| `RECURRING_AUTOSEND` | `1` ili prazno | `1` = mejl klijentu odmah; prazno = samo izdaj |

Generisanje ključa:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

**Preporuka:** prvih par meseci ostavi `RECURRING_AUTOSEND` prazno. Cron izdaje,
ti pogledaš iznose u `/os/fakture/mesecno` i pošalješ. Cron koji u 8 ujutru pošalje
pogrešan iznos svim klijentima nije ušteda.

Ručno pokretanje (npr. za prošli mesec):

```bash
curl -H "Authorization: Bearer $CRON_SECRET" "https://adspire.rs/api/os/cron/mesecne-fakture?period=2026-07"
```

Odgovor je JSON sa brojem izdatih, preskočenih, neuspelih i poslatih, plus red po
klijentu.

## Šta cron NE radi

- ne pravi predračune, samo račune
- ne dira klijente bez aktivne pretplate
- ne menja postojeći dokument — greška se ispravlja storniranjem i novim
- ne šalje podsetnik za neplaćeno (to je i dalje „Red čekanja" na `/os`)
