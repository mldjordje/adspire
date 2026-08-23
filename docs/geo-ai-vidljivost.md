# AI vidljivost (GEO) — šta je u kodu, a šta nije

Stanje 2026-08-23. Sopstvena analitika (`site_events` → `/os/analitika`) hvata
`referrer_host`, tako da bi poseta sa `chatgpt.com`, `perplexity.ai`,
`claude.ai` ili `copilot.microsoft.com` bila vidljiva kao izvor. Trenutno: 0.

## Šta je već rešeno u kodu

Ovo ne treba ponovo raditi — provereno u `src/lib/seo/` i `src/app/`.

- `robots.ts` eksplicitno pušta 22 AI crawlera (GPTBot, ClaudeBot, PerplexityBot,
  Google-Extended, Applebot-Extended…), uz isti public/private rez kao za `*`.
- `Organization` JSON-LD sa `sameAs` na verifikovani Google Knowledge Graph id
  (`kgmid=/g/11x1sn7rg5`) i Instagram; `founder` → `Person` sa LinkedIn i GitHub.
- PIB, matični broj, datum osnivanja, adresa i geo koordinate u schema-i.
- `FAQPage` JSON-LD na vodičima, booking landingu i strani sa cenama — odgovori
  su mašinski čitljivi, ne samo unutar akordeona.
- `llms.txt` i `llms-full.txt`, oba izvedena iz registra (usluge, studije
  slučaja, AI-po-delatnostima, vodiči) tako da nova stranica ne može da ispadne.
- `aiRecommendationSr` / `aiRecommendationEn` po usluzi u `serviceCatalog.ts`.

Zaključak: tehnički sloj nije usko grlo.

## Zašto je i dalje 0

LLM ne preporučuje po tvom sajtu. Preporučuje po tome **gde te treći pominju**.
`llms.txt` nijedan veliki model ne koristi u retrievalu — to je predlog
standarda, ne kanal. Ono što stvarno ulazi u odgovore su izvori koje model
citira: direktorijumi sa recenzijama, forumi, i strane na jeziku upita.

## Šta ostaje — nije kod, Đorđe mora sam

Redosled je bitan; svaka stavka hrani sledeću.

### 1. Google Business Profile + recenzije (nedelja 1)

Profil je verifikovan (KG id postoji), ali bez recenzija nema šta da se citira.
Traži recenziju od 5 od 13 živih klijenata — Dr Igić, Doctor Barber, Dropz
Tattoo, Auto Delic, Salon Srđan. Zamoli da u tekstu stoji **šta je urađeno**
("sistem za online zakazivanje"), ne samo "sve preporuke" — model izvlači
imenice, ne ocene.

### 2. Clutch profil (nedelja 2)

Besplatan listing + 2–3 verifikovana review-a (Clutch zove klijenta telefonom).
Clutch se pojavljuje u odgovorima na "best web development agency Serbia" češće
nego bilo koji drugi direktorijum. GoodFirms i DesignRush su drugi izbor.

### 3. LinkedIn stranica firme (nedelja 2)

Sada postoji samo lični profil, i on je vezan za `Person` node, ne za
`Organization`. Stranica firme daje drugi nezavisan izvor za entitet.

### 4. Prisustvo na forumima (kontinuirano)

r/serbia, r/webdev, Startit. `reddit-lead-monitor-workflow.json` prati pominjanja
— praćenje nije isto što i prisustvo. Odgovor na tuđe pitanje bez linka i dalje
gradi entitet; nalog sa istorijom se citira, nalog od juče ne.

### 5. Engleski sadržaj (posle 1–4)

Ovo je jedini deo koji je i kod i sadržaj. Trenutno su `/en/*` unutrašnje strane
`noindex` jer su nelokalizovane (vidi `TRANSLATED_PREFIXED` u
`next-sitemap.config.js` i `TRANSLATED_PATHS` u `src/lib/seo/metadata.ts`).
Engleski upit se odgovara engleskim izvorima — dok toga nema, ne postojiš za
"web agency Serbia".

Prioritet ako se radi: `/cena-izrade-sajta` pa `/vodici`. Odluka o tome da li
javni rasponi cena idu i na EN/DE je poslovna, ne tehnička — pitati pre nego što
se prevodi.

## Merenje

Za 60 dana proveri `/os/analitika` po izvoru. Očekivanje nije velika brojka —
AI referral je i kod firmi koje to rade dobro reda nekoliko procenata. Signal
koji tražiš je **prvi ne-nula red** sa `chatgpt.com` ili `perplexity.ai`.

Direktna provera bez čekanja: pitaj ChatGPT i Perplexity "web agencija Niš" i
"sistem za zakazivanje termina Srbija" jednom mesečno i zabeleži da li se ime
pojavljuje i koji izvor je citiran. Citirani izvor ti kaže gde sledeće da budeš.
