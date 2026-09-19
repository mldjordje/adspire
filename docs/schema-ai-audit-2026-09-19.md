# Schema i AI vidljivost — 19. septembar 2026.

## Promene

- Razvoj hotelskih, booking i nišnih sistema opisan je kao Service. Uklonjen je
  zajednički builder koji je usluge po meri predstavljao kao SoftwareApplication
  sa InStock ponudom, bez definisane cene i sa planiranim funkcijama.
- Pojedinačne kataloške usluge koriste zajednički spisak tržišta, uključujući
  DACH. Jezik stranice ne ograničava tržište usluge.
- Lični GitHub profil pripada osnivaču; firma zadržava svoje profile.
  Uklonjen je nepodržani founderOf, a Organization.founder ostaje.
- Jezici razgovora su srpski i engleski, prema javnoj stranici za dijasporu.
  Nemački prevod sajta ostaje označen kao nemački sadržaj.
- Tip isporučenog rada bira se eksplicitno po projektu. Svih sedam postojećih
  studija opisuje aplikacije; novi prezentacioni sajt može koristiti WebSite.
  featureList preuzima prikazane funkcije iz studije, a ne programski stack.
  Klijentski sajt je URL rada i izvor studije, bez tvrdnje sameAs.
- Stranice usluga i nišna rešenja citiraju postojeće, vidljive dokaze rada.
  Linkovi sa prevedenih usluga vode na originalne studije na srpskom, koje su
  indeksabilne, umesto na neprevedene kopije. Autori vodiča i studija su vidljivi.
- JSON-LD escapuje znak <, uključujući pokušaj zatvaranja script elementa.
- Dodate su oznake za merenje klikova na upit i studije sa stranica usluga.
- /os/analitika prikazuje AI izvore i sesije sa poslatom formom odvojeno od
  botova; grupisanje se radi po sesiji pre sabiranja. AI izvori se ne odsecaju
  ograničenjem prikaza najpopularnijih izvora. Nije potrebna migracija baze.
  GPTBot se prikazuje kao obuka, OAI-SearchBot kao pretraga, ChatGPT-User kao
  otvaranje na zahtev. Identitet botova nije potvrđen IP proverom.

## Provera

- Ceo test skup: 32 fajla, 214 testova prošlo.
- TypeScript provera prošla nakon ispravki.
- Produkcijski build i generisanje sitemap-a prošli.
- JSON-LD parsiranje: 186 generisanih HTML stranica, 361 script blok.
- SQL pročitan nad postojećom bazom; dodatna read-only VALUES provera potvrđuje
  da ponovljeni događaji i slanja ne dupliraju sesije i da stari događaji ispadaju.
- Namenski testovi pokrivaju zatvaranje script elementa, tržišta, lične profile,
  tipove usluga/projekata, sadržaj funkcija i prepoznavanje AI izvora.

## Merenje posle objave

Uporediti jednake periode od 30 dana za AI posete, poslate upite i njihove
kvalifikacije u CRM-u. Slanje forme samo po sebi nije kvalifikovan upit.
Referrer/UTM merenje ne vidi posete bez podataka o izvoru, ne izdvaja Google AI
odgovore iz običnog Google saobraćaja i ne meri preporuke bez klika.

Proveriti indeksiranje prioritetnih usluga u Search Console/Bing Webmaster
Tools. Robots dozvola nije dokaz da crawler prolazi hosting/firewall, niti da
je stranica indeksirana. Log drain proveravati kroz stvarne serverske podatke;
bez njega merenje botova pokriva samo llms.txt i llms-full.txt.

Nisu dodati izmišljeni rezultati, ocene, klijenti, cene, niti tvrdnje da schema
garantuje preporuku. Postojeće studije i funkcije su izvor dokaza; dodatne
poslovne rezultate objavljivati tek kada postoji proverljivo merenje.

## Izvori

- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.openai.com/api/docs/bots
- https://schema.org/sameAs
- https://schema.org/founder
