import type { Guide } from "./guides";

/**
 * Three problem-intent AEO guides targeting high-frequency business owner queries:
 * 1. Web shop not converting / Cart abandonment (Aurora shader)
 * 2. Reducing appointment no-shows in salons/clinics via automation (Silk shader)
 * 3. What a modern high-converting company website must have in 2026 (Aurora shader)
 */

export const webShopNotSellingGuide: Guide = {
  path: "/zasto-web-shop-ne-prodaje",
  eyebrow: "E-commerce konverzije",
  title: "Zašto web shop nema prodaju — 5 razloga za napuštanje korpe",
  metaDescription:
    "Zašto posetioci na sajtu ne kupuju: skrivena dostava, obavezna registracija, brzina na mobilnom i manjak poverenja. Kako rešiti napuštanje korpe i podići prodaju.",
  h1: "Zašto web shop nema prodaju",
  lead:
    "Kada web shop ima posete a nema porudžbina, problem je u 90% slučajeva na 4 mesta: neočekivani troškovi dostave na kraju, obavezna registracija pre kupovine, brzina preko 2.5s na mobilnom ili manjak dokaza poverenja. Uklanjanjem ovih prepreka napuštanje korpe se smanjuje za 20–35% bez dodatnih ulaganja u reklame.",
  keywords: [
    "zasto web shop nema prodaju",
    "napustanje korpe",
    "zasto niko ne kupuje na sajtu",
    "kako povecati prodaju na web shopu",
    "optimizacija checkout procesa",
    "e commerce konverzija",
  ],
  background: "aurora",
  updated: "2026-09-27",
  sections: [
    {
      heading: "1. Skriveni troškovi dostave na samom kraju",
      body: [
        "Većina kupaca ne odustaje zbog cene samog artikla, već zbog iznenađenja u trenutku plaćanja. Kada se cena dostave pojavi tek na poslednjem koraku checkout-a, kupac to doživljava kao skriveni trošak i odlazi sa sajta da proveri konkurenciju.",
      ],
      bullets: [
        "Istaknite cenu i rok dostave direktno na stranici svakog proizvoda, pre dodavanja u korpu.",
        "Uvedite jasan prag za besplatnu dostavu (npr. 'Besplatna dostava iznad 5.000 RSD') — ovo direktno podiže prosečnu vrednost porudžbine.",
        "Jasno napišite kojom kurirskom službom šaljete i koliko radnih dana paket putuje do kupca.",
      ],
    },
    {
      heading: "2. Zid registracije umesto kupovine u jednom koraku",
      body: [
        "Zahtev da kupac unese lozinku, potvrdi email i otvori nalog pre nego što uopšte može da plati jeste ubedljivo najveći razlog odustajanja na mobilnim telefonima. Kupac želi proizvod, a ne novi korisnički račun.",
      ],
      bullets: [
        "Uvedite 'Gostujuću kupovinu' (Guest Checkout) gde su dovoljni samo ime, adresa i broj telefona za kurira.",
        "Omogućite kupcu da jednim klikom kreira nalog tek nakon što je porudžbina uspešno poslata.",
        "Smanjite checkout formu na minimalan broj polja neophodnih za sigurnu isporuku robe.",
      ],
    },
    {
      heading: "3. Brzina učitavanja i prilagođenost mobilnim telefonima",
      body: [
        "Preko 75% e-commerce saobraćaja u Srbiji i Evropi dolazi sa pametnih telefona. Ako se stranica proizvoda ili korpa učitavaju duže od 2.5 sekunde, više od trećine posetilaca odustane pre nego što uopšte vidi dugme za naručivanje.",
      ],
      bullets: [
        "Sve fotografije proizvoda moraju biti kompresovane u moderan WebP format bez gubitka oštrine.",
        "Uklonite teške nepotrebne skripte, preobimne animacije i plugine koji koče mobilni pregledač.",
        "Dugmad za dodavanje u korpu i prelazak na plaćanje moraju biti velika i lako dostupna palcem.",
      ],
    },
    {
      heading: "4. Nedostatak elemenata poverenja i sigurnosti",
      body: [
        "Kupac na internetu uvek meri rizik: šta ako roba ne stigne, šta ako veličina ne odgovara, ko stoji iza ovog sajta? Ako sajt izgleda nedovršeno ili nema jasne podatke o firmi, posetilac neće ostaviti podatke o kartici niti poručiti robu.",
      ],
      bullets: [
        "Prikažite PIB, matični broj, pravni naziv i fizičku adresu firme u podnožju svake stranice.",
        "Jasno objasnite zakonski rok od 14 dana za odustanak i proceduru zamene artikla.",
        "Objavite stvarne recenzije i utiske zadovoljnih kupaca sa ocenama i fotografijama.",
      ],
    },
    {
      heading: "Kontrolna lista za brzu proveru vašeg shopa",
      bullets: [
        "Da li nov posetilac može da završi porudžbinu za manje od 60 sekundi?",
        "Da li je celokupan checkout proces testiran na prosečnom Android i iPhone telefonu?",
        "Da li imate aktivan sistem za automatski podsetnik na napuštenu korpu?",
        "Da li su opcije plaćanja (pouzećem, karticom, IPS QR kodom) jasno navedene pre samog checkout-a?",
      ],
    },
  ],
  proofHeading: "Kako izgleda optimizovan web shop",
  proof: [
    {
      label: "Slučaj: E-commerce sa prilagođenim sistemom poručivanja",
      href: "/our-projects",
      note: "Izrada brzog web shopa sa visokom stopom konverzije i automatskom obradom porudžbina.",
    },
  ],
  faqHeading: "Česta pitanja o prodaji na web shopu",
  faq: [
    {
      q: "Koliki je prosečan procenat napuštanja korpe u online prodavnicama?",
      a: "Globalni prosek napuštanja korpe kreće se između 65% i 75%. U prodavnicama koje nemaju gostujući checkout ili kriju cenu dostave do samog kraja, ovaj procenat često prelazi 85%. Optimizacijom checkout-a taj broj se može spustiti ispod 55%.",
    },
    {
      q: "Da li mi se isplati da ponudim besplatnu dostavu?",
      a: "Da, pod uslovom da postavite prag koji je 15–25% viši od vaše prosečne vrednosti porudžbine. Kupci rado dodaju još jedan manji artikal u korpu kako bi izbegli trošak poštarine, što direktno povećava vaš ukupan profit.",
    },
    {
      q: "Koja je razlika između Shopify-ja i namensko programiranog shopa za konverzije?",
      a: "Shopify je odličan za brz start, ali dodavanjem mnogobrojnih aplikacija za popuste, recenzije i checkout postaje spor i mesečno skup. Namenski Next.js web shop postiže trenutno učitavanje (ispod 1s), potpunu kontrolu nad korpom i ne plaća provizije platformama.",
    },
    {
      q: "Kako funkcioniše automatski podsetnik za napuštenu korpu?",
      a: "Kada kupac unese email ili broj telefona u prvom koraku pa odustane, sistem nakon 1 do 2 sata automatski šalje personalizovanu poruku sa sačuvanim artiklima i linkom za direktan povratak na plaćanje. Ovo vraća između 8% i 15% izgubljenih kupaca.",
    },
  ],
  cta: { label: "Besplatan pregled vašeg shopa", href: "/besplatan-pregled-sajta" },
  secondaryCta: { label: "Usluga: E-commerce i web shop", href: "/our-services/e-commerce-web-shop" },
  related: ["/kako-napraviti-web-shop", "/sta-mora-da-ima-web-shop-u-srbiji", "/placanje-karticom-na-sajtu-srbija"],
};

export const appointmentNoShowGuide: Guide = {
  path: "/kako-spreciti-nedolazak-na-termin",
  eyebrow: "Optimizacija termina",
  title: "Kako sprečiti nedolazak na zakazan termin — automatizacija i podsetnici",
  metaDescription:
    "Kako smanjiti no-show i nedolaske na zakazane termine u salonima, klinikama i ordinacijama: automatski WhatsApp i SMS podsetnici, lista čekanja i pravila otkazivanja.",
  h1: "Kako sprečiti nedolazak na zakazan termin",
  lead:
    "Nedolasci na zakazane termine (no-show) najefikasnije se smanjuju automatizovanim protokolom u tri koraka: dvosmerni SMS ili WhatsApp podsetnik 24h i 2h ranije sa potvrdom u jednom kliku, digitalna lista čekanja koja popunjava otkazane slotove, i depozit za termine duže od 60 minuta. Ova automatizacija dokazano smanjuje izostanke za 50% do 70%.",
  keywords: [
    "kako spreciti nedolazak na termin",
    "no show problem saloni",
    "smanjenje otkazivanja termina",
    "automatski podsetnik za termin",
    "sms podsetnik zakazivanje",
    "whatsapp zakazivanje termina",
    "softver za zakazivanje klinika",
  ],
  background: "silk",
  updated: "2026-09-27",
  sections: [
    {
      heading: "1. Dvosmerni WhatsApp i SMS podsetnik sa potvrdom u 1 klik",
      body: [
        "Klijenti retko propuštaju termine iz zle namere; u preko 80% slučajeva razlog je zaboravnost ili promena dnevnog rasporeda. Klasičan email podsetnik mnogi pročitaju kasno, dok poruke na telefonu imaju preko 95% otvorenosti unutar prvih 15 minuta.",
      ],
      bullets: [
        "Pošaljite poruku tačno 24 sata pre termina sa dva jasna dugmeta: 'Potvrđujem' i 'Želim drugi termin'.",
        "Pošaljite kratak podsetnik 2 sata ranije sa adresom, parking uputstvom i tačnom lokacijom na Google mapi.",
        "Kada klijent klikne na potvrdu, njegov termin u vašem digitalnom kalendaru automatski dobija potvrđen status.",
      ],
    },
    {
      heading: "2. Automatizovana digitalna lista čekanja",
      body: [
        "Čak i kada klijent javi da ne može da dođe, vlasnik ili zaposleni obično nemaju vremena da usred tretmana pretražuju svesku i pozivaju ljude redom. Rezultat je prazna stolica i izgubljen novac.",
      ],
      bullets: [
        "Omogućite klijentima da se na sajtu upišu na listu čekanja za željeni datum ili omiljenog radnika.",
        "Čim se termin oslobodi, sistem u sekundi šalje poruku prvim kandidatima: 'Slobodan termin sutra u 15h. Kliknite da rezervišete'.",
        "Termin se u praksi ponovo popuni za manje od 15 minuta, bez ijednog vašeg telefonskog poziva.",
      ],
    },
    {
      heading: "3. Pravila otkazivanja i kapara za duže termine",
      body: [
        "Za standardne kraće usluge podsetnik rešava problem. Ali za zahtevne tretmane koji traju sat i po ili dva (estetska hirurgija, stomatologija, složeni tretmani), jedan nedolazak predstavlja ogroman finansijski gubitak.",
      ],
      bullets: [
        "Postavite transparentno pravilo: besplatno otkazivanje ili pomeranje do 24 sata pre zakazanog vremena.",
        "Uvedite depozit od 20% do 30% prilikom online zakazivanja za tretmane čija je vrednost veća od prosečne.",
        "Kada klijent finansijski potvrdi svoju nameru, procenat nepojavljivanja praktično pada na nulu.",
      ],
    },
    {
      heading: "4. Centralizovan kalendar umesto poruka i sveske",
      body: [
        "Ako se zakazivanje vodi paralelno preko telefona, Instagram poruka, WhatsApp-a i papirnog notesa, dupli termini i nesporazumi su neizbežni. Rešenje je jedan centralizovani sistem.",
      ],
      bullets: [
        "Klijenti vide samo stvarne slobodne termine u kalendaru, uzimajući u obzir pauze i smene.",
        "Zaposleni imaju uvid u svoj raspored sa mobilnih telefona u realnom vremenu.",
        "Sistem vodi evidenciju i istoriju klijenata — odmah vidite ko redovno dolazi, a ko je sklon kašnjenju.",
      ],
    },
  ],
  proofHeading: "Sistemi za zakazivanje u praksi",
  proof: [
    {
      label: "Rešenje: Online zakazivanje za salone i klinike",
      href: "/online-zakazivanje-za-salone-i-klinike",
      note: "Namenski kalendar sa automatskim podsetnicima i bazom klijenata.",
    },
  ],
  faqHeading: "Česta pitanja o sprečavanju nedolazaka",
  faq: [
    {
      q: "Da li je bolji SMS ili WhatsApp za slanje podsetnika?",
      a: "WhatsApp je znatno efikasniji jer omogućava interaktivna dugmad za potvrdu i otkazivanje jednim klikom, a znatno je jeftiniji po poslatoj poruci. SMS je odličan kao rezervna opcija za klijente koji nemaju internet na telefonu.",
    },
    {
      q: "Da li će uvođenje depozita odbiti nove klijente?",
      a: "Neće, ako je pravilo jasno i fer objašnjeno na sajtu (depozit se uračunava u konačnu cenu usluge i vraća u slučaju blagovremenog otkazivanja). Iskustvo pokazuje da depozit odbija samo neozbiljne klijente koji bi verovatno i otkazali u zadnji čas.",
    },
    {
      q: "Koliko ranije pre termina treba poslati podsetnik?",
      a: "Optimalan raspored je prva poruka 24 sata ranije sa molbom za potvrdu ili promenu, i druga kratka notifikacija 2 sata pre početka termina sa podsećanjem na tačnu adresu i vreme dolaska.",
    },
    {
      q: "Mogu li da povežem online zakazivanje sa Google kalendarom?",
      a: "Da, moderan sistem za zakazivanje se automatski sinhronizuje sa Google kalendarom u oba smera — ako u Google kalendaru upišete privatnu obavezu, taj termin se automatski zatvara za klijente na sajtu.",
    },
  ],
  cta: { label: "Zakažite razgovor o vašem sistemu", href: "/upit" },
  secondaryCta: { label: "Pregled rešenja za zakazivanje", href: "/online-zakazivanje-za-salone-i-klinike" },
  related: [
    "/online-zakazivanje-za-salone-i-klinike",
    "/podsetnik-za-termin-sms-viber-whatsapp",
    "/gotova-aplikacija-ili-svoj-sistem-za-zakazivanje",
  ],
};

export const modernWebsiteMustHavesGuide: Guide = {
  path: "/sta-mora-da-ima-moderan-sajt-firme",
  eyebrow: "Arhitektura sajta",
  title: "Šta mora da ima moderan sajt firme u 2026. — vodič za konverzije",
  metaDescription:
    "Šta prezentacioni sajt firme mora da sadrži da bi donosio poslove a ne bio prazna vizitkarta: jasna ponuda u 3 sekunde, dokazi rada, mobilni poziv na akciju i brza forma.",
  h1: "Šta mora da ima moderan sajt firme",
  lead:
    "Moderan sajt firme u 2026. nije digitalna brošura sa opštim tekstovima, već prodajni kanal koji u prve 3 sekunde odgovara na 3 pitanja: šta tačno radite, za koga i šta je sledeći korak. Ako stranica nema dominantan mobilni poziv na akciju, dokaze rezultata i transparentan proces rada, posetilac odlazi bez upita.",
  keywords: [
    "sta mora da ima sajt firme",
    "izrada sajta za firmu",
    "moderan poslovni sajt",
    "kako napraviti dobar sajt",
    "konverzija na sajtu",
    "prezentacioni sajt 2026",
  ],
  background: "aurora",
  updated: "2026-09-27",
  sections: [
    {
      heading: "1. Hero sekcija koja rešava problem, a ne hvali firmu",
      body: [
        "Većina poslovnih sajtova otvara sa rečenicom 'Dobrodošli na naš sajt' ili 'Mi smo lideri u pružanju inovativnih usluga'. Kupac od takvih uopštenih fraza nema nikakvu korist. U prvih 3 sekunde posetilac mora tačno da razume šta dobija saradnjom sa vama.",
      ],
      bullets: [
        "Jasna izjava vrednosti (Value Proposition): npr. 'Projektovanje i izrada industrijskih hala po sistemu ključ u ruke u roku od 90 dana'.",
        "Kratak podnaslov koji objašnjava za koga radite i šta vas izdvaja od konkurencije.",
        "Jedno dominantno dugme za akciju (CTA) koje se odmah vidi na mobilnom telefonu bez skrolovanja.",
      ],
    },
    {
      heading: "2. Društveni dokazi i opipljivi rezultati (Social Proof)",
      body: [
        "Kupci više ne veruju rečima na sajtu ako iza njih ne stoje opipljivi dokazi. Ljudi žele da vide kome ste već rešili sličan problem pre nego što pozovu vaš broj telefona.",
      ],
      bullets: [
        "Fotografije stvarnih projekata, objekata, proizvoda ili radnog tima umesto generičkih slika sa interneta.",
        "Autentične izjave i recenzije zadovoljnih klijenata sa imenom, prezimenom i logotipom njihove firme.",
        "Konkretne brojke: godine postojanja, broj realizovanih projekata, prosečno vreme isporuke ili postignuta ušteda.",
      ],
    },
    {
      heading: "3. Transparentan proces rada u 3 do 4 koraka",
      body: [
        "Najveća kočnica za slanje upita jeste strah od nepoznatog: šta se događa nakon što pošaljem poruku, da li će me neko gnjaviti, koliko ću čekati na procenu? Kada posetilac unapred vidi svaki korak, oseća se sigurno.",
      ],
      bullets: [
        "Korak 1 — Prvi kontakt: Pošaljete osnovne zahteve ili nas pozovete.",
        "Korak 2 — Procena i ponuda: U roku od 24h dobijate detaljan obim posla sa tačnom cenom i rokom.",
        "Korak 3 — Izvođenje i isporuka: Radimo po ugovorenom planu uz redovne izveštaje do konačne primopredaje.",
      ],
    },
    {
      heading: "4. Kontakt bez trenja i direktan mobilni kanal",
      body: [
        "Predugačke kontakt forme sa 8 ili 10 obaveznih polja ubijaju želju za kontaktom, posebno na mobilnom telefonu gde se tekst kuca u hodu.",
      ],
      bullets: [
        "Fiksirano dugme za direktan poziv i WhatsApp/Viber poruku u uglu mobilnog ekrana.",
        "Forma sa maksimalno 2 ili 3 polja: Ime, Broj telefona ili Email i kratak opis potrebe.",
        "Jasna garancija privatnosti podataka i okvirno vreme u kom klijent može očekivati odgovor.",
      ],
    },
    {
      heading: "5. Tehnički temelji: Brzina, SEO i priprema za AI pretraživače",
      body: [
        "Sajt koji se sporo učitava gubi kupce pre nego što uopšte vide ponudu. Uz to, moderni pretraživači (Google, ChatGPT Search, Gemini) zahtevaju mašinski čitljive podatke kako bi vas preporučili.",
      ],
      bullets: [
        "Brzina učitavanja ispod 1.5 sekundi na mobilnim mrežama (Core Web Vitals u zelenoj zoni).",
        "Implementirani Schema.org struktuirani podaci (Organization, LocalBusiness, FAQPage, Service).",
        "Čist kod bez suvišnih skripti i potpuna usklađenost sa bezbednosnim standardima (HTTPS, CSP).",
      ],
    },
  ],
  proofHeading: "Primeri modernih prezentacionih sajtova",
  proof: [
    {
      label: "Pogledajte završene projekte",
      href: "/our-projects",
      note: "Primeri sajtova rađenih po meri sa fokusom na brzinu i visoku stopu upita.",
    },
  ],
  faqHeading: "Česta pitanja o izradi sajta za firmu",
  faq: [
    {
      q: "Koliko strana treba da ima moderan sajt firme?",
      a: "Za većinu uslužnih i proizvodnih preduzeća optimalna struktura je 5 do 8 ključnih stranica: Početna sa jasnom ponudom, pojedinačne strane za svaku glavnu uslugu, O nama/Tim, Reference/Projekti i Kontakt. Bolje je imati 5 odličnih, detaljnih stranica nego 20 praznih.",
    },
    {
      q: "Zašto sajt mora biti prilagođen za AI pretraživače (AEO)?",
      a: "Sve više potencijalnih kupaca postavlja pitanja direktno ChatGPT-u, Perplexity-ju ili Google AI pregledu umesto klasične pretrage. Ako vaš sajt nema strukturirane odgovore na konkretna pitanja klijenata, AI modeli vas neće prepoznati kao relevantan izvor.",
    },
    {
      q: "Da li je bolje imati fiksne cene na sajtu ili ponudu na upit?",
      a: "Najbolji rezultati se postižu prikazivanjem početnih cena ili raspona ('Od 500 €' ili 'Tipičan projekat: 1.500–3.000 €'). To automatski filtrira neozbiljne upite, dok ozbiljnim klijentima uliva poverenje jer vide da ne krijete troškove.",
    },
    {
      q: "Koliko vremena je potrebno za izradu profesionalnog prezentacionog sajta?",
      a: "Realno vreme izrade kvalitetnog sajta sa unikatnim dizajnom, optimizovanim tekstovima i SEO pripremom je između 3 i 6 nedelja. Brži rokovi obično znače korišćenje generičkih šablona koji ne donose rezultate.",
    },
  ],
  cta: { label: "Zatražite besplatan pregled sajta", href: "/besplatan-pregled-sajta" },
  secondaryCta: { label: "Koliko košta izrada sajta?", href: "/cena-izrade-sajta" },
  related: [
    "/sajt-ne-donosi-upite",
    "/koliko-traje-izrada-sajta",
    "/kako-izabrati-web-agenciju",
  ],
};
