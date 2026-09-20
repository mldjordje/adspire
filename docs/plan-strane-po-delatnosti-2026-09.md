# Plan: strane po delatnosti („kako možemo da unapredimo vaše poslovanje")

Datum: 2026-09-19. Vlasnik: Đorđe. Status: Faza 0 i 1 gotove (7 strana), Faza 2 u toku (6 od ~20 strana). Ukupno 13 živih strana + hub.

## Cilj

Za svaku delatnost koja postoji jedna strana koja odgovara na pitanje koje vlasnik
tog biznisa stvarno kuca u pretragu ili pita AI asistenta: *„šta digitalno mogu da
uradim u svojoj branši i šta mi to donosi"*. Svaka strana pokriva četiri sloja
isporuke — sajt, web aplikacija, mobilna aplikacija, interni sistem — kroz konkretne
radne tokove te niše, ne kroz opštu priču o „digitalizaciji".

Cilj nije saobraćaj. Cilj je da vlasnik stomatološke ordinacije koji traži „program
za zakazivanje pacijenata" nađe stranu koja opisuje njegov dan, pa pošalje upit.

## Rizik koji diktira tempo

Google od 2024. eksplicitno kažnjava *scaled content abuse*: mnogo strana po istom
šablonu gde se menja samo ime delatnosti. Kazna ide na ceo domen, ne na pojedinačnu
stranu. adspire.rs ima 595 impresija za tri meseca — nema rezervu da rizikuje.

Zato pravilo: **niša bez stvarnog sadržaja se ne objavljuje.** Ako za delatnost ne
umemo da napišemo četiri sloja sa imenovanim procesima te branše (šta se evidentira,
šta je zakonska obaveza, gde curi vreme, šta radi konkurencija), ta delatnost čeka.
Bolje 25 dobrih strana nego 120 praznih.

Praktična provera, automatizovana u testu: nijedna strana ne sme da deli više od
zadatog procenta rečenica sa bilo kojom drugom. Zajednički smeju da budu samo CTA,
navigacija i pravni tekst.

## URL i ruta

- URL: root, sa ključnom reči — `/softver-za-stomatologa`, `/sistem-za-advokatsku-kancelariju`.
  Isti obrazac kao postojećih pet `nichePages`.
- Zašto ne dinamički root segment: `src/app/[locale]` već zauzima root dinamiku;
  Next.js ne dozvoljava drugi slug na istom nivou.
- Zašto ne `/resenja/[slug]`: slabiji URL, a jedina dobit bi bila manje fajlova —
  što skripta ionako rešava.
- Rešenje: `scripts/gen-industry-routes.mjs` generiše po jedan `page.tsx` od 17 linija
  za svaki unos u registru. Test pada ako registar i folderi nisu u koraku.
- Hub: `/resenja-po-delatnosti` — nabraja sve strane, grupisano po sektoru. Ovo je
  strana koju AI agent čita kad pita „za koje delatnosti rade". Ulazi u `llms.txt`
  i u `solutionEntries()`.

## Granica prema postojećim stranama

Sajt već ima tri sloja koji se tiču delatnosti. Nove strane ne smeju da ih kanibalizuju:

| Sloj | Šta prodaje | Primeri |
| --- | --- | --- |
| `/online-zakazivanje/[slug]` | jednu funkciju — termin — jednoj branši | frizeri, stomatolozi, auto servisi, restorani, teretane, tattoo, kozmetika |
| `nichePages` (5 root strana) | ceo sistem, sa studijom slučaja | salon lepote, web shop, prezentacioni sajt, građevina, teretana |
| **nove strane po delatnosti** | ceo biznis u četiri sloja isporuke | ostalo |

Pravila:
1. Delatnost koju već pokriva `nichePages` **ne dobija** novu stranu. Umesto toga,
   postojeća strana dobija cross-link na hub.
2. Delatnost koju pokriva samo booking strana **može** da dobije novu stranu, ali
   sekcija o zakazivanju mora da bude kratka i da linkuje na booking stranu. U markup-u
   `isRelatedTo`, nikad dva konkurentska proizvoda za isti posao.
3. Svaka nova strana ide u `solutionEntries()` u `jsonld.ts` — inače organizacija ne
   ume da nabroji sopstvene strane (vidi `solutions_catalog_graph`).

## Model sadržaja

Novi tip `IndustryPage` u `src/content/site/industries/`, jedan fajl po delatnosti,
`index.ts` kao barrel. Ne proširujemo `NichePage` — tih pet strana su money strane sa
drugim obrascem i ne diramo ih.

```
IndustryPage = {
  slug, sector, navLabel
  seo: { title, metaDescription, keywords[] }
  hero: { eyebrow, title, lead }
  summary          // 2–3 rečenice koje same odgovaraju na pretragu (data-answer + speakable)
  audience[]       // ko je tačno kupac: „ordinacija sa 2–6 stolica"
  dayInTheLife[]   // 3–5 stvarnih tačaka curenja vremena u toj branši
  layers: {        // četiri sloja isporuke — srce strane
    site:     { lead, items[{title, body}] }
    webApp:   { lead, items[] }
    mobile:   { lead, items[] }
    internal: { lead, items[] }
  }
  compliance[]     // e-faktura, fiskalizacija, karton pacijenta, HACCP, GDPR — po branši
  value            // „šta tačno plaćate": sati i troškovi koji prestaju
  proof[]          // samo živi klijentski sistemi; prazno ako nema — bez izmišljanja
  faq[]            // 5–7 pitanja te branše
  inquiryService   // slug iz serviceCatalog za /upit/brzo?usluga=…
  related[]
}
```

Test čuva: jedinstveni slugovi, `inquiryService` postoji u katalogu, svaki sloj ima
bar dve stavke, FAQ bar pet, overlap rečenica ispod praga, ruta postoji za svaki unos.

## Honesty pravila (nasleđena)

- Nema brojki o klijentima koje niko nije izmerio (`unverified_claims`).
- Nema javnih početnih cena; cena ide u ponudu. Izuzetak: edukacija i
  `/cena-izrade-sajta` rasponi.
- Nema obećanja o rangiranju ni o tome da će nas AI preporučiti.
- `proof` sme da sadrži samo sisteme koji rade i koji se mogu otvoriti.

## Faze

**Faza 0 — infrastruktura (dan 1).**
Tip, registar, `IndustryV4` komponenta (stil pozajmljen od `NicheSolutionV4`, bez
diranja animacionog sloja), `src/lib/seo/industries.ts`, hub strana, generator ruta,
testovi, upis u `llms.txt` / `llms-full.txt` / `solutionEntries()`.

**Faza 1 — osam delatnosti sa živim dokazom (dan 2–3).**
Redosled po snazi dokaza:

| Delatnost | Dokaz | Napomena |
| --- | --- | --- |
| Stomatološke ordinacije | Dr Igić, Eduka | booking strana pokriva samo termin |
| Auto servisi i vulkanizeri | Auto Delić | isto |
| Frizerski saloni i berbernice | Doctor Barber | isto |
| Betonske baze i proizvodnja materijala | Prevoz Kop | odvojeno od `/sajt-za-gradjevinsku-firmu` |
| Transport i prevoz tereta | Prevoz Kop | operativa vozila i termina isporuke |
| Edukacije, kursevi i obuke | Eduka, Toza AI | prijave, mesta, evidencija polaznika |
| Kreativni i produkcijski studiji | Toza AI | paketi, sati u nalogu, naplata |
| Estetske klinike | Dr Igić | ODLOŽENO — preklapa se sa `/softver-za-salon-lepote`, koja već pokriva botoks i filere |
| Web shop i maloprodaja | Santos & Santorini | ODLOŽENO — pokriva `/izrada-web-shopa` |

**Faza 2 — delatnosti bez dokaza ali sa jasnim tokom (dan 4–6).**

Urađeno 2026-09-20 (prvih šest, po složenosti posla i po pretrazi):
veterinarske ambulante, advokatske kancelarije, knjigovodstvene agencije,
agencije za nekretnine, rent-a-car, restorani i kafići.

Ostaje: privatne ambulante i laboratorije, fizikalna terapija i rehabilitacija,
škole stranih jezika, vrtići i igraonice, autoperionice, event agencije i svadbeni
sadržaj, poljoprivredna gazdinstva i otkup, veleprodaja i distribucija, stolarije i
bravarije, HVAC i instalateri, čistačke i održavanje objekata, obezbeđenje,
štamparije, pekare i proizvodnja hrane, apoteke, optike, turističke agencije,
privatni smeštaj i apartmani.

Za ove: `proof` prazan, tekst govori šta radimo i kako, bez klijentskih primera.

**Faza 3 — dugi rep (nedelja 2+).**
Tek kad prve dve faze prođu proveru sadržaja i kad Search Console pokaže da strane iz
Faze 1 dobijaju impresije. Ako ne dobijaju, problem nije u broju strana i šire se ne
isplati.

## Merenje

Svaka strana nosi `data-cta` i `data-form` atribute — bez njih `/os/analitika` ne vidi
klik (`site_analytics`). Posle 30 dana: koje strane imaju impresije, koje imaju upite,
koje imaju nula i jedno i drugo. Strane sa nula impresija posle 60 dana se spajaju ili
brišu, ne ostavljaju.

## Šta ovaj plan ne radi

- Ne prevodi na EN/DE. Unutrašnje strane su i dalje samo SR (`v4_localization_gap`).
- Ne dira nav osim jednog linka na hub. Sto linkova u meniju je šteta, ne korist.
- Ne pravi nove usluge u `serviceCatalog` — sve strane mapiraju na postojeće slugove.
