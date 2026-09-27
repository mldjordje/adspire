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

export const shopifyVsWooVsCustomGuide: Guide = {
  path: "/shopify-vs-woocommerce-vs-custom-shop",
  eyebrow: "E-commerce platforme",
  title: "Shopify vs WooCommerce vs Custom Shop — Poređenje troškova i limita u 2026.",
  metaDescription:
    "Kompletno poređenje Shopify, WooCommerce i Custom web shop rešenja: mesečne pretplate, provizije po prodaji, stabilnost baze i kada je vreme za prelazak na sopstveni kod.",
  h1: "Shopify vs WooCommerce vs Custom Shop",
  lead:
    "Shopify je najbrži za start, ali uzima 2–3% provizije po prodaji i skupe mesečne aplikacije. WooCommerce nudi kontrolu bez provizija, ali zahteva stalno održavanje i usporava na većem katalogu. Custom web shop pruža maksimalnu brzinu, nula provizija i neograničenu prilagodljivost za brendove koji žele dugoročnu profitabilnost i potpunu kontrolu nad podacima.",
  keywords: [
    "shopify vs woocommerce",
    "shopify ili woocommerce",
    "custom web shop cena",
    "poređenje ecommerce platformi",
    "izrada web shopa platforme",
    "troškovi shopify prodavnice",
  ],
  background: "silk",
  updated: "2026-09-27",
  sections: [
    {
      heading: "1. Shopify: Brz ulazak, ali stalni procenat od svakog prometa",
      body: [
        "Shopify je odličan izbor za brzi izlazak na tržište i testiranje potražnje za novim proizvodima. Međutim, kako prodaja raste, struktura troškova postaje značajan teret.",
      ],
      bullets: [
        "Fiksna mesečna pretplata (39 $ do 399 $ mesečno) samo za pravo korišćenja platforme.",
        "Dodatna provizija platforme od 0.5% do 2% po svakoj pojedinačnoj transakciji ako ne koristite njihov Shopify Payments (koji u Srbiji nije podržan za lokalne kartice).",
        "Neophodne aplikacije za domaće kurire, popuste, lojalnost i marketing često koštaju dodatnih 150–500 $ svakog meseca.",
        "Potpuna zavisnost od jedne korporacije — ne možete preneti svoju bazu kupaca i kod na drugi server.",
      ],
    },
    {
      heading: "2. WooCommerce: Fleksibilnost bez provizije, ali uz rizik nestabilnosti",
      body: [
        "WooCommerce je besplatan open-source dodatak za WordPress koji koristi ogroman broj domaćih prodavnica. Daje vam potpunu slobodu nad hostingom i ne naplaćuje procenat od prometa.",
      ],
      bullets: [
        "Nema transakcionih provizija platforme — plaćate samo standardnu proviziju domaće banke za prihvat kartica.",
        "Ogroman izbor gotovih pluginova za fiskalizaciju, kurirske službe i bankarske gejtveje.",
        "Glavna mana: nestabilnost pri ažuriranjima. Jedan sukob između dva plugina može oboriti checkout usred vikenda ili marketinške kampanje.",
        "Performanse drastično opadaju na bazama većim od 3.000–5.000 artikala bez specijalizovanog i skupog WordPress hostinga.",
      ],
    },
    {
      heading: "3. Custom Web Shop: Rešenje po meri za ozbiljne brendove i skaliranje",
      body: [
        "Custom prodavnica izgrađena na modernim tehnologijama (Next.js, Node.js, PostgreSQL) pravi se specifično prema vašem poslovnom modelu, logistici i ERP softveru.",
      ],
      bullets: [
        "Trenutno učitavanje stranica (ispod 0.5s) što direktno diže Google SEO rang i procenat uspešnih kupovina.",
        "Nema mesečnih pretplata za platformu, nema provizija na promet i nema zavisnosti od spoljnih pluginova.",
        "Direktna sinhronizacija u realnom vremenu sa magacinskim i knjigovodstvenim softverom bez posrednika.",
        "Investicija u sopstveni softverski kapital firme umesto plaćanja 'kirije' trećim servisima.",
      ],
    },
    {
      heading: "Poređenje troškova na godišnjem nivou (primer: 50.000 € prometa)",
      bullets: [
        "Shopify: Osnovna pretplata (468 $) + aplikacije (1.800 $) + 2% transakcione takse (1.000 $) = ~3.268 $ godišnjih ponavljajućih troškova.",
        "WooCommerce: Hosting i SSL (~300 €) + licencirani pluginovi (~400 €) + tehničko održavanje i popravke bagova (~1.200 €) = ~1.900 € godišnje.",
        "Custom Shop: Hosting na modernom cloud-u (~120–240 € godišnje), bez provizija i bez troškova mesečnih licenci za aplikacije.",
      ],
    },
  ],
  proofHeading: "Primeri modernih e-commerce sistema",
  proof: [
    {
      label: "Pregledajte realizovane web shopove",
      href: "/our-projects",
      note: "Pogledajte kako izgledaju prodajna rešenja visokih performansi rađena po meri.",
    },
  ],
  faqHeading: "Česta pitanja o izboru e-commerce platforme",
  faq: [
    {
      q: "Kada je pravo vreme za prelazak sa Shopify-a ili WooCommerce-a na Custom shop?",
      a: "Prelazak se preporučuje kada mesečni promet pređe 15.000–20.000 €, kada troškovi pretplata na aplikacije pređu nekoliko stotina evra mesečno, ili kada brzina sajta i ograničenja šablona počnu direktno da guše prodaju i povezivanje sa magacinom.",
    },
    {
      q: "Da li mogu preneti postojeće proizvode i kupce sa WooCommerce-a na novi sajt?",
      a: "Da. Svi podaci o proizvodima, kategorijama, starim kupcima i istoriji porudžbina se automatski migriraju putem baze ili API skripti. Takođe se čuvaju svi stari URL linkovi kako ne biste izgubili postojeće Google SEO pozicije.",
    },
    {
      q: "Koja platforma ima najbolje Core Web Vitals ocene i SEO?",
      a: "Custom sajtovi (izgrađeni u Next.js-u sa serverskim renderovanjem) imaju neprikosnovenu prednost jer učitavaju samo minimalan neophodan kod. WooCommerce i Shopify po prirodi vuku desetine eksternih skripti i stilova iz instaliranih dodataka.",
    },
    {
      q: "Kako funkcioniše fiskalizacija i plaćanje karticama u Srbiji na ovim platformama?",
      a: "Na sve tri opcije moguće je povezati domaće procesore plaćanja (Banca Intesa, AIK, ChipCard, CorvusPay) i e-fakture/fiskalne kase. Međutim, na custom rešenju integracija ide direktno preko API-ja banke bez posredničkih mesečnih provizija.",
    },
  ],
  cta: { label: "Pošaljite zahtev za procenu web shopa", href: "/upit" },
  secondaryCta: { label: "Usluga: e-commerce i web shop", href: "/our-services/e-commerce-web-shop" },
  related: [
    "/zasto-web-shop-ne-prodaje",
    "/sta-mora-da-ima-web-shop-u-srbiji",
    "/placanje-karticom-na-sajtu-srbija",
  ],
};

export const whatsappBookingAutomationGuide: Guide = {
  path: "/kako-automatizovati-zakazivanje-whatsapp",
  eyebrow: "Automatizacija poslovanja",
  title: "Kako automatizovati zakazivanje termina preko WhatsApp-a i sajta",
  metaDescription:
    "Automatizujte zakazivanje termina za ordinaciju, salon ili servis preko WhatsApp-a: sinhronizacija kalendara, nula propuštenih poziva i automatski podsetnici.",
  h1: "Kako automatizovati zakazivanje termina preko WhatsApp-a i sajta",
  lead:
    "Automatizacija zakazivanja preko WhatsApp-a omogućava klijentima da u nekoliko klikova izaberu slobodan termin direktno iz vašeg kalendara, 24/7 bez čekanja na odgovor operatera. Sistem automatski sinhronizuje termine sa Google ili Outlook kalendarom, sprečava preklapanja i šalje automatske podsetnike, štedeći osoblju preko 15 sati nedeljno i eliminišući no-show propuste.",
  keywords: [
    "zakazivanje termina whatsapp",
    "automatizacija zakazivanja",
    "whatsapp bot za zakazivanje",
    "online zakazivanje preko poruka",
    "sinhronizacija kalendara sajt whatsapp",
    "softver za zakazivanje termina",
  ],
  background: "aurora",
  updated: "2026-09-27",
  sections: [
    {
      heading: "1. Zašto ručno zakazivanje preko poruka košta previše vremena",
      body: [
        "Kada klijent pošalje poruku 'Imate li slobodno u utorak u pet?', obično sledi 4 do 6 poruka napred-nazad dok se termin ne potvrdi. Dok osoblje kuca odgovore između dva klijenta, propuštaju se pozivi, a greške u rasporedu su neizbežne.",
      ],
      bullets: [
        "Preko 40% upita za termine stiže van radnog vremena (uveče i vikendom) kada klijenti očekuju instant odgovor.",
        "Ručno unošenje termina u svesku ili Excel tabelu dovodi do duplog zakazivanja i neprijatnih situacija u čekaonici.",
        "Osoblje provodi do 3 sata dnevno samo na telefonu i porukama umesto da se posveti prisutnim klijentima.",
      ],
    },
    {
      heading: "2. Kako funkcioniše pametni WhatsApp sistem za rezervacije",
      body: [
        "Sistem povezuje zvanični WhatsApp Business API sa vašim centralnim kalendarom i bazom usluga. Klijent komunicira kroz jednostavan interaktivni meni direktno u WhatsApp aplikaciji.",
      ],
      bullets: [
        "Klijent pošalje poruku na vaš broj ili klikne na WhatsApp dugme na sajtu i dobija meni sa uslugama i cenama.",
        "Bira željenu uslugu i zaposlenog; sistem odmah prikazuje samo slobodne termine u realnom vremenu.",
        "Nakon klika na termin, unos se automatski upisuje u centralni kalendar (Google Calendar, Outlook ili interni sistem).",
        "Klijent odmah dobija poruku potvrde sa lokacijom, uputstvom i opcijom da jednim klikom ubaci događaj u svoj telefon.",
      ],
    },
    {
      heading: "3. Automatski podsetnici koji rešavaju nedolazak klijenata",
      body: [
        "Najveća prednost WhatsApp automatizacije u odnosu na SMS ili email jeste stopa otvaranja poruka od preko 95%. Podsetnici stižu tamo gde klijenti najviše borave.",
      ],
      bullets: [
        "Podsetnik se šalje automatski 24 sata pre zakazanog termina sa dugmadima 'Potvrđujem' i 'Želim da pomerim'.",
        "Ako klijent otkaže ili pomeri termin, taj termin se istog sekunda oslobađa u kalendaru za novog klijenta.",
        "Kratak SMS ili WhatsApp podsetnik sa tačnom lokacijom šalje se 2 sata pre termina, čime se nedolasci smanjuju za 80%.",
      ],
    },
    {
      heading: "4. Integracija sa vašim postojećim sajtom i softverom",
      body: [
        "Ne morate menjati način na koji radite. Automatizacija se integriše u vaše postojeće alate bez komplikovane obuke.",
      ],
      bullets: [
        "Podrška za Google Calendar, Microsoft 365 / Outlook i interne softvere ordinacije ili salona.",
        "Automatsko generisanje kartona klijenta sa istorijom prethodnih dolazaka i napomena.",
        "Mogućnost uvođenja depozita ili plaćanja karticom unapred za termine visoke vrednosti.",
      ],
    },
  ],
  proofHeading: "Primeri sistema za automatizaciju rezervacija",
  proof: [
    {
      label: "Sistemi za zakazivanje po meri",
      href: "/our-services/sistemi-za-zakazivanje",
      note: "Pogledajte kako povezujemo web zakazivanje, WhatsApp i interne kalendare.",
    },
  ],
  faqHeading: "Česta pitanja o WhatsApp automatizaciji termina",
  faq: [
    {
      q: "Da li mi je potreban poseban novi broj telefona za WhatsApp automatizaciju?",
      a: "Možete koristiti postojeći broj telefona vaše firme ili novi broj. Preko zvaničnog WhatsApp Business Cloud API-ja omogućava se da više zaposlenih istovremeno koristi isti broj, dok bot paralelno rešava zakazivanja u pozadini.",
    },
    {
      q: "Šta se dešava ako klijent postavi specifično pitanje koje bot ne razume?",
      a: "Sistem automatski prepoznaje kompleksna pitanja i prebacuje razgovor na ljudskog operatera, uz notifikaciju na telefon ili računar zaposlenog da je potrebna asistencija.",
    },
    {
      q: "Može li sistem da prepozna različito trajanje usluga i pauze između termina?",
      a: "Da. Svaka usluga ima definisano tačno trajanje (npr. 45 min, 90 min) i automatski bafer za pripremu/čišćenje pre sledećeg klijenta. Kalendar nikada neće ponuditi termin ako nema dovoljno vremena za punu uslugu.",
    },
    {
      q: "Koliko košta uvođenje ovakvog sistema i održavanje?",
      a: "Cena zavisi od broja zaposlenih, lokacija i kalendara koje treba sinhronizovati. Troškovi poruka preko WhatsApp API-ja su minimalni (par centi po konverzaciji), dok se investicija obično isplati već u prvom mesecu kroz spašene termine koji bi inače propali.",
    },
  ],
  cta: { label: "Zatražite ponudu za automatizaciju zakazivanja", href: "/upit" },
  secondaryCta: { label: "Vodič: Kako sprečiti no-show propuste", href: "/kako-spreciti-nedolazak-na-termin" },
  related: [
    "/kako-spreciti-nedolazak-na-termin",
    "/podsetnik-za-termin-sms-viber-whatsapp",
    "/online-zakazivanje-za-salone-i-klinike",
  ],
};

export const nearshoringSerbiaGuide: Guide = {
  path: "/outsourcing-nearshoring-it-srbija-nemacka",
  eyebrow: "Nearshoring & Saradnja",
  title: "Nearshoring IT u Srbiji za DACH tržište — Pravna pravila, DSGVO i ušteda",
  metaDescription:
    "Vodič za firme iz Nemačke, Austrije i Švajcarske: pravni ugovori, Reverse Charge fakturisanje, DSGVO/GDPR zaštita podataka i prednosti angažovanja IT agencije iz Srbije.",
  h1: "Nearshoring IT projekata u Srbiji za klijente iz DACH regiona",
  lead:
    "Angažovanje IT agencije iz Srbije donosi firmama iz DACH regiona 40–60% niže troškove razvoja uz vrhunski inženjerski kvalitet u istoj vremenskoj zoni (CET). Saradnja je pravno potpuno regulisana kroz B2B ugovore, Reverse Charge fakturisanje bez PDV-a, prenos 100% intelektualne svojine i striktnu usklađenost sa GDPR i DSGVO standardima zaštite podataka.",
  keywords: [
    "nearshoring srbija",
    "outsourcing softvera nemacka srbija",
    "it agencija srbija klijenti nemacka",
    "dsgvo uskladjenost srbija agencija",
    "reverse charge fakturisanje nemacka",
    "it outsourcing dach region",
  ],
  background: "silk",
  updated: "2026-09-27",
  sections: [
    {
      heading: "1. Zašto DACH kompanije biraju Srbiju za razvoj softvera i sajtova",
      body: [
        "Firme u Nemačkoj, Švajcarskoj i Austriji suočavaju se sa hroničnim nedostatkom programera i satnicama lokalnih agencija od 120 € do 180 € po satu. Srbija pruža idealan balans inženjerskog kvaliteta i ekonomske isplativosti.",
      ],
      bullets: [
        "Ista vremenska zona (Central European Time - CET): svakodnevna sinhronizacija i agilni sastanci bez vremenskog pomeranja.",
        "Geografska blizina: letovi iz Minhena, Beča, Ciriha i Frankfurta traju svega 1 do 2 sata za lične radionice.",
        "Ušteda od 40% do 60% na ukupnom budžetu projekta u odnosu na cene lokalnih agencija u Nemačkoj i Švajcarskoj.",
        "Bilingvalni inženjerski timovi sa tečnim engleskim i profesionalnom komunikacijom.",
      ],
    },
    {
      heading: "2. Pravna sigurnost: B2B ugovor i zaštita intelektualne svojine (IP)",
      body: [
        "Saradnja se zasniva na direktnom međunarodnom B2B ugovoru o pružanju IT usluga sa jasno definisanim rokovima, garancijama i primopredajom koda.",
      ],
      bullets: [
        "Ugovor definiše prenos 100% autorskih prava i intelektualne svojine (IP Rights) na naručioca odmah po izmirenju fakture.",
        "Izvorni kod se tokom celog projekta nalazi na klijentovom GitHub ili GitLab nalogu — nema vendor lock-in zamki.",
        "Potpisuje se bilateralni ugovor o poverljivosti (NDA) koji štiti sve poslovne tajne, podatke i patente pre početka rada.",
      ],
    },
    {
      heading: "3. Poreski tretman: Reverse Charge mehanizam (0% PDV)",
      body: [
        "Fakturisanje između preduzeća iz Srbije i klijenata iz EU i Švajcarske je administrativno jednostavno i oslobođeno dvostrukog oporezivanja.",
      ],
      bullets: [
        "Fakture se izdaju u evrima (EUR) ili švajcarskim francima (CHF) sa iskazanim 0% PDV-om (oslobođeno po osnovu izvoza usluga).",
        "Naručilac iz EU primenjuje standardni Reverse Charge mehanizam (prenos poreske obaveze) u svojoj poreskoj prijavi.",
        "Plaćanje se vrši direktno putem međunarodnog bankarskog transfera (SEPA / SWIFT) sa rokom dospeća dogovorenim u ponudi.",
      ],
    },
    {
      heading: "4. Usklađenost sa DSGVO / GDPR standardima",
      body: [
        "Zaštita privatnosti podataka evropskih građana je obavezna. Srpski Zakon o zaštiti podataka o ličnosti u potpunosti je harmonizovan sa EU GDPR regulativom.",
      ],
      bullets: [
        "Potpisuje se ugovor o obradi podataka (AVV — Auftragsverarbeitungsvertrag) u skladu sa članom 28. DSGVO / GDPR.",
        "Svi produkcioni serveri i baze podataka ostaju hostovani isključivo u EU data centrima (npr. Frankfurt, Nemačka preko Hetzner-a ili AWS-a).",
        "Implementiraju se najviši bezbednosni standardi: enkripcija podataka u mirovanju i tranzitu, 2FA i striktne uloge pristupa.",
      ],
    },
  ],
  proofHeading: "Kako izgleda saradnja sa Adspire agencijom",
  proof: [
    {
      label: "Detalji o saradnji sa inostranim klijentima",
      href: "/saradnja-iz-srbije-kako-funkcionise",
      note: "Saznajte sve o procesu rada, potpisivanju ugovora i načinu plaćanja.",
    },
  ],
  faqHeading: "Česta pitanja o IT saradnji Srbije i DACH regiona",
  faq: [
    {
      q: "Da li je angažovanje agencije iz Srbije potpuno legalno i usklađeno sa nemačkim zakonima?",
      a: "Da, potpuno je legalno. Nemačke i EU kompanije svakodnevno naručuju softverske usluge iz Srbije na osnovu standardnog B2B ugovora o uslugama, pri čemu se fakturisanje vrši po pravilu prenosa poreske obaveze (Reverse Charge).",
    },
    {
      q: "Na kom jeziku se vode projektni sastanci i piše dokumentacija?",
      a: "Kompletna projektna komunikacija, tehnička dokumentacija i agilni sprint sastanci vode se na engleskom ili srpskom jeziku, dok se korisnički interfejsi i tekstovi sajta isporučuju na besprekornom nemačkom jeziku prilagođenom lokalnom tržištu.",
    },
    {
      q: "Gde se fizički nalaze podaci i serveri tokom i nakon razvoja?",
      a: "Razvojni i produkcioni serveri postavljaju se u EU (najčešće Hetzner ili AWS data centri u Frankfurtu), tako da podaci vaših korisnika nikada ne napuštaju teritoriju Evropske unije, čime se u potpunosti poštuje DSGVO.",
    },
    {
      q: "Ko je vlasnik koda nakon završetka projekta?",
      a: "Klijent je 100% isključivi vlasnik kompletnog koda, baza podataka i intelektualne svojine. Sav kod se predaje na vaš privatni GitHub/GitLab repozitorijum bez ikakvih skrivenih licenci ili zavisnosti od agencije.",
    },
  ],
  cta: { label: "Zakažite konsultativni video poziv", href: "/upit" },
  secondaryCta: { label: "Saznajte kako izgleda proces saradnje", href: "/saradnja-iz-srbije-kako-funkcionise" },
  related: [
    "/saradnja-iz-srbije-kako-funkcionise",
    "/kako-izabrati-web-agenciju",
    "/koliko-traje-izrada-sajta",
  ],
};

export const howInternalSoftwareSavesTimeGuide: Guide = {
  path: "/kako-interni-softver-stedi-vreme-vlasniku",
  eyebrow: "Optimizacija i produktivnost",
  title: "Kako interni softver štedi 20+ sati nedeljno vlasniku firme",
  metaDescription:
    "Kako prebaciti firmu sa Excel tabela i Viber grupa na centralni interni sistem: digitalni radni nalozi, 1-klik ponude, praćenje troškova i eliminacija mikromenadžmenta.",
  h1: "Kako interni softver štedi vreme vlasniku firme",
  lead:
    "Interni softver po meri zamenjuje raštrkane Excel tabele, papire i Viber grupe jednim centralnim sistemom. Automatizovanjem radnih naloga, 1-klik ponuda i evidencije troškova, vlasnici firmi sa 5 do 50 zaposlenih štede 15 do 25 sati nedeljno, eliminišući operativni mikromenadžment i dobijajući tačne finansijske izveštaje na telefonu u realnom vremenu.",
  keywords: [
    "interni softver za firmu",
    "kako ustedeti vreme preduzetnik",
    "zamena za excel tabele",
    "automatizacija operacija u firmi",
    "softver po meri za preduzeca",
    "digitalizacija poslovanja",
  ],
  background: "silk",
  updated: "2026-09-28",
  sections: [
    {
      heading: "1. Klopka rasta: Kako vlasnik postaje usko grlo sopstvene firme",
      body: [
        "Kada firma ima do 5 radnika, poslovanje se vodi iz glave vlasnika ili kroz par svezaka i tabela. Ali kada tim poraste na 10 do 30 zaposlenih, sav teret odlučivanja i koordinacije i dalje pada na jednu osobu.",
      ],
      bullets: [
        "Telefon zvoni 40 do 60 puta dnevno sa pitanjima: 'Šta radimo ovde?', 'Gde je materijal?', 'Koji je status kupca?'.",
        "Podaci su rasuti u tri različita računara, privatnim porukama i na papirnim blokčićima koji se gube.",
        "Vlasnik provodi večeri i vikende unoseći račune i sastavljajući izveštaje umesto da razvija nove poslove ili odmara.",
      ],
    },
    {
      heading: "2. Digitalni radni nalozi umesto zvanja na telefon",
      body: [
        "U namenskom internom sistemu svaki posao dobija svoj digitalni radni nalog sa tačnim zadacima, zaduženim radnicima i rokovima.",
      ],
      bullets: [
        "Radnici na terenu ili u radionici vide svoje zadatke direktno na mobilnom telefonu bez potrebe za sastancima.",
        "Kada se faza završi, radnik klikne 'Završeno' i priloži fotografiju — status se istog trena menja u centralnoj evidenciji.",
        "Vlasnik otvara kontrolnu tablu na telefonu i za 30 sekundi vidi šta je u toku, šta kasni i ko je slobodan za novi posao.",
      ],
    },
    {
      heading: "3. Izrada ponuda i faktura u 60 sekundi",
      body: [
        "Ručno kuckanje ponuda u Wordu ili Excelu traje između 45 i 90 minuta po klijentu, uz konstantan rizik od pogrešno izračunate marže.",
      ],
      bullets: [
        "Sistem čuva bazu vaših usluga, materijala, normativa i marži.",
        "Izborom stavki ponuda se automatski kalkuliše, generiše u brendiran PDF i šalje klijentu na email jednim klikom.",
        "Kada klijent prihvati ponudu, sistem automatski kreira radni nalog i priprema nalog za fakturisanje bez duplog unosa.",
      ],
    },
    {
      heading: "4. Finansijska slika u realnom vremenu bez čekanja knjigovođe",
      body: [
        "Većina vlasnika saznaje stvarni profit tek na kraju meseca ili kvartala kada knjigovođa pošalje bilanse. Sa internim sistemom, svaka transakcija je vidljiva odmah.",
      ],
      bullets: [
        "Automatsko praćenje profitabilnosti po svakom pojedinačnom projektu ili ugovoru.",
        "Upozorenja na neplaćene fakture i automatsko slanje učtivih podsetnika dužnicima pre nego što istekne rok.",
        "Potpuna kontrola nad troškovima goriva, podizvođača i nabavke bez sakupljanja zgužvanih fiskalnih računa.",
      ],
    },
  ],
  proofHeading: "Kako izgledaju naši interni sistemi",
  proof: [
    {
      label: "Razvoj poslovnog softvera po meri",
      href: "/our-services/mobilne-aplikacije",
      note: "Saznajte kako zamenjujemo Excel tabele brzim web aplikacijama prilagođenim vašoj firmi.",
    },
  ],
  faqHeading: "Česta pitanja o uvođenju internog softvera",
  faq: [
    {
      q: "Koliko vremena je potrebno zaposlenima da nauče da koriste novi sistem?",
      a: "Sisteme dizajniramo po principu mobilnih aplikacija — sa velikim dugmadima i maksimalno 2 do 3 klika po operaciji. Radnici na terenu savladaju unos u roku od 15 minuta jer je interfejs jednostavniji od Vibera.",
    },
    {
      q: "Da li interni sistem može da zameni naš postojeći knjigovodstveni program?",
      a: "Ne mora ga zameniti. Naš softver vodi svakodnevne operacije, radne naloge i komunikaciju, a preko API-ja automatski šalje gotove podatke u vaš knjigovodstveni program ili e-Fakture (SEF) bez ručnog prekucavanja.",
    },
    {
      q: "Koliko košta izrada internog softvera po meri u odnosu na mesečni SaaS?",
      a: "Gotovi SaaS alati naplaćuju licencu po korisniku (npr. 30–80 € po radniku mesečno), što za tim od 15 radnika iznosi 5.000–14.000 € svake godine bez da posedujete kod. Namenski softver se plati jednom i ostaje trajno vlasništvo vaše firme bez mesečnih korisničkih licenci.",
    },
    {
      q: "Gde se čuvaju podaci i ko ima pristup bazi firme?",
      a: "Baza se postavlja na bezbedan cloud server u Evropskoj uniji sa svakodnevnim automatskim bekapima. Vi ste 100% vlasnik podataka i izvornog koda, a pristup se kontroliše striktnim korisničkim ulogama (npr. radnik vidi samo svoje zadatke, poslovođa svoj tim, a vlasnik ceo bilans).",
    },
  ],
  cta: { label: "Zakažite razgovor o automatizaciji", href: "/upit" },
  secondaryCta: { label: "Vodič: Interni softver umesto Excel tabela", href: "/interni-softver-umesto-excel-tabela" },
  related: [
    "/interni-softver-umesto-excel-tabela",
    "/e-fakture-sef-automatski",
    "/kako-gradjevinska-firma-gubi-vreme-operacije",
  ],
};

export const constructionTimeSavingGuide: Guide = {
  path: "/kako-gradjevinska-firma-gubi-vreme-operacije",
  eyebrow: "Građevinarstvo & Teren",
  title: "Gde građevinske firme gube vreme — Automatizacija gradilišta i ponuda",
  metaDescription:
    "Gde građevinske firme i izvođači gube 20+ sati nedeljno: ručne ponude u Excelu, zvanje poslovođa, praćenje utroška materijala i haos sa računima sa stovarišta.",
  h1: "Gde građevinske firme gube vreme i kako automatizovati operacije",
  lead:
    "Građevinske firme gube preko 20 sati nedeljno na ručno računanje ponuda, zvanje poslovođa za stanje radova i sakupljanje računa sa stovarišta. Interni sistem za gradilišta omogućava digitalne radne naloge, praćenje utroška materijala u realnom vremenu i sklapanje ponuda po normativima u nekoliko klikova bez grešaka i probijanja budžeta.",
  keywords: [
    "softver za gradjevinske firme",
    "program za gradiliste",
    "vodjenje gradilista aplikacija",
    "kalkulacija gradjevinske ponude",
    "pracenje utroska materijala gradjevina",
    "digitalizacija gradjevine srbija",
  ],
  background: "aurora",
  updated: "2026-09-28",
  sections: [
    {
      heading: "1. Tri dana za izradu jedne ponude u Excelu",
      body: [
        "Sklapanje ponude za investitora sa desetinama pozicija radova i materijala obično zahteva sate listanja starih tabela, pozivanja stovarišta za ažurne cene i ručnog proračuna marže.",
      ],
      bullets: [
        "Jedna greška u formuli Excela može dovesti do ponude koja pravi gubitak na celom projektu.",
        "Dok vi potrošite tri večeri na računanje, agilnija konkurencija pošalje profesionalnu ponudu istog dana.",
        "Rešenje: Interna baza normativa i jediničnih cena gde unosom kvadrature sistem za 3 minuta izbaci tačnu specifikaciju i profitnu maržu.",
      ],
    },
    {
      heading: "2. Poslovođe i radni nalozi: Kraj telefonskog ping-ponga",
      body: [
        "Vlasnik građevinske firme provodi pola radnog vremena u automobilu obilazeći gradilišta samo da bi utvrdio dokle se stiglo i šta od materijala fali.",
      ],
      bullets: [
        "Poslovođa na gradilištu otvara aplikaciju na mobilnom, označava završene pozicije i prilaže fotografije armiranja ili instalacija.",
        "Zahtev za dopunu materijala šalje se u dva klika direktno magacinu ili nabavci bez poziva i nerazumljivih SMS poruka.",
        "Dnevni građevinski dnevnik i evidencija radnih sati radnika popunjavaju se digitalno na licu mesta.",
      ],
    },
    {
      heading: "3. Računi sa stovarišta i kontrola podizvođača",
      body: [
        "Na kraju meseca na sto stignu gomile otpremnica i računa sa različitih stovarišta, a niko sa sigurnošću ne zna koji džak cementa je otišao na koji objekat.",
      ],
      bullets: [
        "Svaki račun se fotografiše telefonom u trenutku prijema robe i vezuje za tačan broj gradilišta.",
        "Sistem automatski upoređuje ugovoreni budžet materijala sa stvarnim stanjem — čim trošak pređe 90% limita, vlasnik dobija alarm.",
        "Podizvođači fakturišu isključivo po overenim digitalnim fazama, što sprečava preplaćivanje i naknadne sporove.",
      ],
    },
    {
      heading: "4. Pregled poslovanja na jednom ekranu",
      body: [
        "Umesto nagađanja 'koliko smo dobri na kom objektu', sistem prikazuje realnu finansijsku sliku za svako aktivno gradilište.",
      ],
      bullets: [
        "Jasno razgraničenje: ugovorena vrednost, naplaćeni avansi, trošak materijala, trošak radne snage i preostala marža.",
        "Pregled zauzetosti mehanizacije, alata i voznog parka kako skupi bageri ne bi stajali besposleni.",
        "Automatsko generisanje privremenih situacija za investitore u zakonskom formatu.",
      ],
    },
  ],
  proofHeading: "Rešenja za građevinski sektor",
  proof: [
    {
      label: "Sajt i softver za građevinske firme",
      href: "/sajt-za-gradjevinsku-firmu",
      note: "Pogledajte kako izgleda kompletno digitalno rešenje za izvođače i investitore.",
    },
  ],
  faqHeading: "Česta pitanja o softveru za građevinarstvo",
  faq: [
    {
      q: "Mogu li poslovođe na terenu da koriste sistem ako nemaju dobar internet?",
      a: "Da. Mobilni interfejs podržava offline rad — unosi se beleže u telefonu i automatski sinhronizuju sa centralnom bazom čim telefon uhvati mobilni signal.",
    },
    {
      q: "Da li sistem može da uveze naše postojeće cenovnike i Excel tabele?",
      a: "Da. Prilikom implementacije prenosimo sve vaše postojeće baze materijala, normativa i jediničnih cena iz Excela u sistem, tako da nastavljate sa radom bez prekida.",
    },
    {
      q: "Može li softver da prati servis i registraciju građevinskih mašina i vozila?",
      a: "Da. U sklopu modula mehanizacije beleže se radni sati, potrošnja goriva, datumi servisa i registracije sa automatskim podsetnicima na telefon pre isteka.",
    },
    {
      q: "Koliko vremena je potrebno da se softver prilagodi našem načinu rada?",
      a: "Osnovni operativni sistem sa radnim nalozima i evidencijom gradilišta implementira se za 3 do 5 nedelja uz obuku vaših poslovođa i administrativnog tima.",
    },
  ],
  cta: { label: "Zatražite procenu za građevinski softver", href: "/upit" },
  secondaryCta: { label: "Vodič: Kako interni softver štedi vreme", href: "/kako-interni-softver-stedi-vreme-vlasniku" },
  related: [
    "/kako-interni-softver-stedi-vreme-vlasniku",
    "/interni-softver-umesto-excel-tabela",
    "/koliko-traje-izrada-sajta",
  ],
};

export const restaurantTimeSavingGuide: Guide = {
  path: "/kako-restorani-gube-vreme-nabavka-smene",
  eyebrow: "Ugostiteljstvo & Restorani",
  title: "Gde restorani gube vreme — Automatizacija nabavke, kala i smena",
  metaDescription:
    "Kako vlasnici i menadžeri restorana gube 15+ sati nedeljno: ručne porudžbine dobavljačima u noć, neprecizni normativi, kalo u kuhinji i rasporedi smena na papiru.",
  h1: "Gde restorani gube vreme i kako automatizovati poslovanje",
  lead:
    "Vlasnici i menadžeri restorana troše sate na noćno poručivanje robe od dobavljača preko poruka, ručne popise u sveskama i usaglašavanje smena radnika. Interni sistem automatizuje nabavku kada zalihe padnu ispod minimuma, precizno prati normative i kalo, i omogućava radnicima pregled i zamenu smena preko mobilne aplikacije.",
  keywords: [
    "softver za restorane",
    "nabavka za restorane automatizacija",
    "raspored smena konobari aplikacija",
    "normativi i kalo softver",
    "vodjenje restorana usteda vremena",
    "digitalizacija ugostiteljstva",
  ],
  background: "silk",
  updated: "2026-09-28",
  sections: [
    {
      heading: "1. Noćne porudžbine dobavljačima preko Vibera i SMS-a",
      body: [
        "U 1 sat ujutru, nakon zatvaranja lokala, šef kuhinje ili menadžer provodi 45 minuta šaljući pojedinačne poruke mesari, pekaru i distributerima pića šta treba da stigne sutra.",
      ],
      bullets: [
        "Poruke se zaborave, dobavljač donese pogrešnu količinu, a račun se ručno upoređuje sa cenovnikom.",
        "Rešenje: Sistem sam generiše agregiranu listu porudžbine na osnovu potrošnje tog dana i jednim klikom je šalje dobavljačima.",
        "Ušteda: 5 do 7 sati nedeljno čistog operativnog vremena uz eliminaciju grešaka u isporuci svežih namirnica.",
      ],
    },
    {
      heading: "2. Normativi, kalo i kontrola nestanka robe",
      body: [
        "Bez preciznog praćenja utroška namirnica, razlika između prodatih jela i utrošenog mesa ili pića je ubedljivo najveći skriveni gubitak svakog restorana.",
      ],
      bullets: [
        "Svako jelo sa POS kase automatski skida tačnu gramažu sirovina iz centralnog magacina.",
        "Sistem automatski uračunava dozvoljeni procenat kala pri termičkoj obradi mesa i čišćenju povrća.",
        "Nedeljni inventar se radi za 20 minuta skeniranjem barkodova, a svako odstupanje veće od 2% pali crveni alarm vlasniku.",
      ],
    },
    {
      heading: "3. Raspored smena bez svađe i telefonskih poziva",
      body: [
        "Pravljenje mesečnog rasporeda za 15 konobara, barmena i kuvara je noćna mora: ko kad polaže ispite, ko hoće slobodan vikend, ko je uzeo bolovanje.",
      ],
      bullets: [
        "Menadžer postavlja raspored u digitalni kalendar koji radnici vide na svojim telefonima.",
        "Kada radnik želi zamenu, pošalje zahtev kolegi kroz aplikaciju — tek kada kolega prihvati, menadžer dobija notifikaciju za odobrenje.",
        "Nema više stotina poruka u Viber grupi i zaboravljenih smena koje ostavljaju šank prazan u petak uveče.",
      ],
    },
    {
      heading: "4. Pregled poslovanja na telefonu dok niste u lokalu",
      body: [
        "Vlasnik restorana ne mora fizički sedeti u lokalu da bi znao kakvo je stanje poslovanja.",
      ],
      bullets: [
        "Promet u realnom vremenu, prosečan iznos računa i popunjenost stolova dostupni su na kontrolnoj tabli telefona.",
        "Automatski pregled najprofitabilnijih jela i jela koja 'jedu novac' a retko se naručuju.",
        "Izveštaj o dnevnom trošku radne snage (Labor Cost %) u poređenju sa ostvarenim prometom tog dana.",
      ],
    },
  ],
  proofHeading: "Rešenja za restorane i kafiće",
  proof: [
    {
      label: "Softver i sajt za restorane",
      href: "/softver-za-restoran-i-kafic",
      note: "Saznajte kako povezujemo POS kase, digitalne menije i magacinske operacije.",
    },
  ],
  faqHeading: "Česta pitanja o automatizaciji restorana",
  faq: [
    {
      q: "Da li sistem može da se poveže sa našom postojećom fiskalnom kasom?",
      a: "Da. Sistem se integriše sa većinom vodećih POS fiskalnih softvera na tržištu Srbije i regiona, tako da svaka izdata stavka automatski ažurira zalihe u realnom vremenu.",
    },
    {
      q: "Kako sistem pomaže u kontroli troškova hrane (Food Cost)?",
      a: "Sistem automatski preračunava cenu svakog jela čim dobavljač promeni nabavnu cenu bilo koje sirovine. Odmah vidite ako vam je profitna marža pala ispod planiranog nivoa i možete korigovati cenu pre nego što nastane gubitak.",
    },
    {
      q: "Da li zaposleni moraju instalirati posebnu tešku aplikaciju?",
      a: "Ne. Koristi se brza progresivna web aplikacija (PWA) koja radi u browseru bilo kog Android ili iPhone telefona bez zauzimanja memorije i bez potrebe za preuzimanjem sa prodavnica aplikacija.",
    },
    {
      q: "Mogu li se pratiti troškovi i zalihe za više povezanih lokala ili magacina?",
      a: "Da. Sistem je višemagacinski i podržava prenos robe između centralnog magacina i pojedinačnih objekata sa punom sledljivošću i evidencijom odgovornih lica.",
    },
  ],
  cta: { label: "Zatražite konsultacije za ugostiteljstvo", href: "/upit" },
  secondaryCta: { label: "Vodič: Automatizacija zakazivanja i rezervacija", href: "/kako-automatizovati-zakazivanje-whatsapp" },
  related: [
    "/kako-interni-softver-stedi-vreme-vlasniku",
    "/kako-hoteli-gube-vreme-recepcija-ciscenje",
    "/kako-automatizovati-zakazivanje-whatsapp",
  ],
};

export const hotelTimeSavingGuide: Guide = {
  path: "/kako-hoteli-gube-vreme-recepcija-ciscenje",
  eyebrow: "Hotelijerstvo & Apartmani",
  title: "Gde hoteli i apartmani gube vreme — Channel Manager i automatizacija",
  metaDescription:
    "Kako vlasnici hotela i apartmana gube sate na recepciji: preklapanje rezervacija na Booking-u i Airbnb-u, eTurista i MUP prijava, pametne brave i organizacija sobarica.",
  h1: "Gde hoteli i apartmani gube vreme i kako automatizovati recepciju",
  lead:
    "Hoteli i vlasnici apartmana gube sate na ručno prepisivanje gostiju u eTuristu, proveravanje preklapanja na Booking-u i Airbnb-u i zvanje sobarica. Centralni sistem sa Channel Manager-om eliminiše duple rezervacije, šalje gostima automatske šifre za pametne brave na WhatsApp i automatski ažurira status očišćenih soba u realnom vremenu.",
  keywords: [
    "hotelski sistem usteda vremena",
    "channel manager srbija",
    "automatska prijava eturista",
    "pametne brave za apartmane whatsapp",
    "softver za sobarice i ciscenje",
    "digitalna recepcija za hotel",
  ],
  background: "aurora",
  updated: "2026-09-28",
  sections: [
    {
      heading: "1. Duple rezervacije i ručno zatvaranje soba po portalima",
      body: [
        "Kada rezervacija stigne u petak uveče na Booking.com, recepcionar mora ručno da ode na Airbnb, Expedia-u i sopstveni sajt da zatvori taj termin. Ako zakasni 10 minuta, dolazi do overbooking skandala.",
      ],
      bullets: [
        "Dvosmerni Channel Manager sinhronizuje kalendare u roku od 3 sekunde na svim kanalima istovremeno.",
        "Kada se termin rezerviše na jednom mestu, automatski se zatvara svuda — rizik od duple rezervacije pada na 0%.",
        "Cene i minimalan broj noćenja menjaju se sa jednog mesta za sve portale odjednom.",
      ],
    },
    {
      heading: "2. Administracija: eTurista, MUP i fakturisanje u jednom kliku",
      body: [
        "Ručno unošenje pasoša i ličnih karata svakog gosta u državni portal eTurista oduzima između 5 i 10 minuta po prijavi, stvarajući gužve na recepciji.",
      ],
      bullets: [
        "Gost dobija link pre dolaska i sam unosi podatke ili skenira lični dokument telefonom.",
        "Sistem automatski šalje prijavu boravka u eTuristu bez ručnog prekucavanja.",
        "Boravišna taksa, osiguranje i fiskalni račun kreiraju se automatski pri odjavi gosta.",
      ],
    },
    {
      heading: "3. Beskontaktni check-in preko pametnih brava i WhatsApp-a",
      body: [
        "Čekanje kasnih gostiju do 1 sat ujutru da bi im se uručio ključ nepotrebno veže radno vreme vlasnika ili zahteva noćnog recepcionara.",
      ],
      bullets: [
        "Sistem generiše jedinstvenu šifru za pametnu bravu koja važi tačno od trenutka check-in-a do check-out-a.",
        "Gost na WhatsApp dobija poruku dobrodošlice sa navigacijom do parkinga, video uputstvom i šifrom vrata.",
        "Gost samostalno ulazi bez stresa, a vi vidite tačan trenutak kada je otključao apartman.",
      ],
    },
    {
      heading: "4. Koordinacija sobarica i održavanja bez lutanja po spratovima",
      body: [
        "Koja soba je napuštena, koja se sprema za danas, a koja ima kvar — pitanja koja se svakodnevno rešavaju papirićima i dovikivanjem.",
      ],
      bullets: [
        "Sobarica na svom telefonu vidi listu soba poređanu po prioritetu dolaska novih gostiju.",
        "Čim sobarica završi i klikne 'Čisto', soba automatski prelazi u status spremne za prijem na recepciji.",
        "Kvarovi se prijavljuju fotografijom u sistem i automatski prosleđuju kućnom majstoru.",
      ],
    },
  ],
  proofHeading: "Hotelski sistemi iz prakse",
  proof: [
    {
      label: "Adspire hotelski rezervacioni sistem",
      href: "/hotelski-rezervacioni-sistem",
      note: "Pogledajte kako izgleda kompletan sistem sa PMS-om, Channel Manager-om i direktnim bukingom.",
    },
  ],
  faqHeading: "Česta pitanja o hotelskoj automatizaciji",
  faq: [
    {
      q: "Mogu li povezati pametne brave na postojeća vrata bez promene stolarije?",
      a: "Da. Većina modernih pametnih brava (Yale, Nuki, TTLock) montira se na postojeće cilindarske brave za manje od 30 minuta i bežično povezuje sa našim sistemom preko API-ja.",
    },
    {
      q: "Da li sistem automatski računa provizije Booking-a i zaradu po sobi (RevPAR)?",
      a: "Da. Sistem beleži tačne neto prihode po svakom kanalu prodaje, automatski izdvaja provizije posrednika i prikazuje ključne hotelske metrike: popunjenost (Occupancy Rate), ADR i RevPAR.",
    },
    {
      q: "Kako gosti reaguju na digitalni self-check-in preko poruka?",
      a: "Preko 85% modernih putnika preferira samostalni ulazak jer ne moraju da se objašnjavaju oko tačnog vremena dolaska niti da čekaju u redu. Za goste koji žele lični kontakt, recepcija je uvek na raspolaganju.",
    },
    {
      q: "Koliko brzo se sistem može pustiti u rad za hotel ili kompleks apartmana?",
      a: "Implementacija Channel Manager-a i osnovnog PMS sistema za do 30 jedinica obično traje između 2 i 4 nedelje, uključujući unos svih soba, cenovnika i sinhronizaciju sa kanalima.",
    },
  ],
  cta: { label: "Zakažite prezentaciju hotelskog sistema", href: "/upit" },
  secondaryCta: { label: "Pogledajte hotelski rezervacioni sistem", href: "/hotelski-rezervacioni-sistem" },
  related: [
    "/kako-spreciti-nedolazak-na-termin",
    "/kako-automatizovati-zakazivanje-whatsapp",
    "/online-zakazivanje-za-salone-i-klinike",
  ],
};

export const websiteMaintenanceCostGuide: Guide = {
  path: "/koliko-kosta-odrzavanje-sajta-mesecno",
  eyebrow: "Održavanje sajta & Podrška",
  title: "Koliko košta održavanje sajta mesečno — Šta se stvarno plaća",
  metaDescription:
    "Koliko košta održavanje sajta mesečno: šta obuhvata tehničko održavanje, zašto besplatan hosting košta najviše, koliko vredi brzina i bekap van servera, i cene po paketima.",
  h1: "Koliko košta održavanje sajta mesečno i šta se stvarno plaća?",
  lead:
    "Održavanje sajta košta između 40 € i 250 € mesečno, zavisno od kompleksnosti. Realan trošak obuhvata pouzdan hosting sa SSL sertifikatom, dnevne bekape van servera, bezbednosna ažuriranja softvera i zakupljene sate programera za hitne intervencije i izmene sadržaja bez čekanja.",
  keywords: [
    "koliko kosta odrzavanje sajta",
    "odrzavanje sajta mesecno cena",
    "tehnicko odrzavanje sajta",
    "azuriranje sajta cena",
    "podrska za sajt",
    "cene odrzavanja wordpress sajta",
  ],
  updated: "2026-09-28",
  sections: [
    {
      heading: "1. Zašto 'sajt bez održavanja' zapravo košta najviše",
      body: [
        "Sajt koji se postavi i zaboravi neminovno postaje ranjiv. Zastareli pluginovi na WordPress-u su uzrok za preko 90% hakovanih sajtova, a Google kažnjava kompromitovane ili spore sajtove izbacivanjem iz pretrage.",
      ],
      bullets: [
        "Hakovani sajt gubi poverenje kupaca i dobija 'Not Secure' ili crveno upozorenje u Chrome pregledaču.",
        "Pad servera u petak popodne često ostane neprimećen do ponedeljka, dok narudžbine ili upiti nepovratno odlaze konkurenciji.",
        "Vraćanje oborenog i zaraženog sajta 'na mišiće' košta 3 do 5 puta više od celogodišnjeg preventivnog održavanja.",
      ],
    },
    {
      heading: "2. Šta ulazi u ozbiljan mesečni paket održavanja",
      body: [
        "Plaćanje održavanja ne znači plaćanje 'da sajt samo stoji online'. To je polisa osiguranja i stalna tehnička prednost vaše firme.",
      ],
      bullets: [
        "Namenski cloud hosting sa globalnim CDN-om i SSL enkripcijom sa 99.9% garantovanim uptime-om.",
        "Automatski dnevni bekap koji se čuva na odvojenoj lokaciji (off-site), tako da se u slučaju kvara sajt vraća za 10 minuta.",
        "Redovno testiranje formi, dugmadi za poziv, korpe i brzine učitavanja (Core Web Vitals).",
        "Zakupljeni radni sati programera za izmenu cenovnika, dodavanje novih slika, tekstova ili landing stranica.",
      ],
    },
    {
      heading: "3. Realni rasponi cena održavanja na tržištu",
      body: [
        "Cena održavanja zavisi od toga da li je u pitanju jednostavan prezentacioni sajt, web shop ili složena web platforma sa bazom.",
      ],
      bullets: [
        "Osnovni sajt firme (40–80 €/mesečno): Premium hosting, sigurnosne zakrpe, bekap i 1–2 sata manjih izmena.",
        "Web prodavnica (90–200 €/mesečno): Praćenje checkout toka, testiranje plaćanja, bekap baze na svakih sat vremena i hitna podrška.",
        "Prilagođene aplikacije i portali (200–500+ €/mesečno): SLA ugovor sa garantovanim odzivom ispod 2 sata i namensko održavanje baza i servera.",
      ],
    },
    {
      heading: "4. Next.js sajtovi bez ranjivih WordPress pluginova",
      body: [
        "U agenciji Adspire sajtove primarno razvijamo u Next.js tehnologiji. Za razliku od WordPress-a koji zahteva stalno krpljenje 30 različitih dodataka trećih strana, Next.js generiše statički bezbedne stranice.",
      ],
      bullets: [
        "Nema PHP ranjivosti i nema baza koje mogu biti oborene SQL injekcijom sa spoljnih adresa.",
        "Brzina učitavanja ostaje konstantna bez kupovine skupih alata za keširanje.",
        "Održavanje je fokusirano na unapređenje biznisa i konverzija, a ne na stalno gašenje požara.",
      ],
    },
  ],
  proofHeading: "Kako brinemo o sajtovima klijenata",
  proof: [
    {
      label: "Usluga održavanja i tehničke podrške",
      href: "/our-services/odrzavanje-i-podrska",
      note: "Pogledajte detaljan opis naših SLA paketa, brzine odziva i monitoringa.",
    },
  ],
  faqHeading: "Česta pitanja o održavanju sajtova",
  faq: [
    {
      q: "Da li mogu sam da održavam svoj sajt i uštedim novac?",
      a: "Možete sami unositi tekstove i menjati slike ako sajt ima CMS. Međutim, ažuriranje serverskog koda, bezbednosne zakrpe, konfigurisanje DNS zapisa i bekap van servera zahtevaju programera. Jedna nekompatibilna verzija dodatka može srušiti ceo sajt.",
    },
    {
      q: "Šta se dešava ako ne iskoristim zakupljene sate za izmene u tom mesecu?",
      a: "U našim paketima neiskorišćeni sati se često preusmeravaju u tehnički SEO pregled, optimizaciju slika ili se prenose u naredni mesec prema dogovoru u ugovoru.",
    },
    {
      q: "Koliko brzo reagujete kada sajt prijavi problem?",
      a: "Za klijente sa ugovorom o održavanju imamo automatizovani monitoring koji proverava status sajta svakih 60 sekundi. Na kritične incidente reagujemo unutar 1 do 2 sata, uključujući vikende.",
    },
    {
      q: "Da li održavanje obuhvata i plaćanje domena i hostinga?",
      a: "Da, naši sveobuhvatni paketi održavanja uključuju troškove premijum brzog hostinga, SSL sertifikata i obnove domena, tako da klijent ima jedan transparentan račun godišnje ili mesečno.",
    },
  ],
  cta: { label: "Zatražite ponudu za održavanje vašeg sajta", href: "/upit" },
  secondaryCta: { label: "Pogledajte stranicu održavanja", href: "/our-services/odrzavanje-i-podrska" },
  related: [
    "/wordpress-ili-custom-sajt",
    "/sta-mora-da-ima-moderan-sajt-firme",
    "/sajt-ne-donosi-upite",
  ],
};



