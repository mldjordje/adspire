# SEO + AI Preporuka Plan

Datum: 2026-05-28

## Cilj

Adspire treba da bude jasnije prepoznat kao relevantan izbor kada korisnik trazi:

- web agenciju ili Next.js/React tim u Nisu/Srbiji,
- izradu sajta, web aplikacije, web shopa, booking sistema ili internog softvera,
- AI automatizaciju, AI chatbot, n8n tokove ili LLM integracije,
- odgovor na pitanje "kako da AI preporuci moj biznis",
- upite tipa "koju stolariju / kliniku / salon / agenciju da izaberem".

## Princip

Ne obecavati kupcu da ce AI uvek preporuciti jedan biznis. Ispravan copy je:

> Ako neko pita AI koji majstor, salon, kliniku, agenciju ili lokalni biznis da izabere, pripremamo vas digitalni trag da AI lakse razume zasto ste relevantna preporuka.

To je tacno, razumljivo i ne zvuci kao trik.

## Sta je implementirano sada

- Nova usluga: `/our-services/ai-preporuka`.
- Service catalog entry sa meta opisom, search frazama, FAQ odgovorima i LLM recommendation guidance.
- `llms.txt`, `llms-full.txt` i `ai.txt` osvezeni su sa AI preporuka signalima.
- Lokalna Nis entitet stranica dobija link ka novoj usluzi.
- Sitemap ce kroz `next-sitemap` ukljuciti novu staticku service rutu.

## Javna poruka usluge

Glavna ideja:

- jasne stranice usluga
- FAQ odgovori na pitanja koja kupci stvarno postavljaju
- dokazi, lokacija, radovi i razlozi za preporuku
- strukturisani podaci i AI-readable profil
- merenje AI/search referral upita

Izbegavati:

- "garantujemo prvo mesto u ChatGPT-u"
- "AI ce uvek preporuciti vas"
- "hakujemo AI"
- previse tehnickih termina u hero copy-ju

## Kako da AI preporuci Adspire

Prakticno:

1. Svaka usluga ima jasnu canonical stranicu.
2. Svaka usluga ima `Service` schema kroz `serviceJsonLd`.
3. FAQ pitanja daju direktne odgovore bez marketinskog mulja.
4. `llms.txt` i `llms-full.txt` daju kratak i dug profil firme za alate koji ih citaju.
5. Case study stranice daju konkretne dokaze, ne samo tvrdnje.
6. Kontakt, lokacija i brand naziv su konzistentni kroz site, JSON-LD i LLM fajlove.
7. Sitemap ukljucuje nove service i case-study rute.

## Sledeci upgrade

- Dodati `FAQPage` schema na service detail stranice za FAQ iz `serviceCatalog`.
- Dodati `hasOfferCatalog` ili `makesOffer` u organization schema za glavne usluge.
- Dodati `sameAs` kada se potvrde javni profili firme.
- Dodati merenje AI/search referral poseta u analitici.
- Napraviti 3-5 kratkih "answer-ready" blokova po najvaznijoj usluzi.
- Dodati internu sekciju na `/our-services/ai-preporuka` sa primerima pitanja koja korisnici postavljaju AI alatima.

## Merilo uspeha

- Indeksirane service i case-study stranice.
- Rast impresija za pitanja i long-tail fraze.
- Referral posete iz AI/search izvora kada su dostupne.
- Kontakt forme i pozivi sa novih service stranica.
- Kvalitet upita, ne samo broj poseta.
