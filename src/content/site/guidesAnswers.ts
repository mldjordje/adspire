import type { Guide } from "./guides";

/**
 * Third batch of guides: questions owners put to an AI assistant before they
 * put them to an agency.
 *
 * Each one is picked from Search Console queries the site already shows up for
 * without a page that answers them ("custom cms izrada", "cms za portale
 * srbija", "whatsapp podsetnik za termin", "softver za salone cena"). The lead
 * is the answer in under sixty words, because that paragraph is what an answer
 * engine lifts; everything below it is the evidence for it.
 */

export const portalCmsGuide: Guide = {
  path: "/cms-za-portal-i-medije",
  eyebrow: "Portali i mediji",
  title: "CMS za portal i medije — WordPress, headless ili sistem po meri",
  metaDescription:
    "Koji CMS izabrati za news portal ili medij u Srbiji: šta mora da ima redakcija, kada je WordPress dovoljan, kada se prelazi na headless ili sistem po meri i kako preći bez gubitka poseta.",
  h1: "CMS za portal i medije",
  lead:
    "Za mali portal sa jednim ili dva autora WordPress je dovoljan. Kada redakcija ima urednike koji odobravaju tekstove, reklame koje moraju da se učitaju bez skakanja strane i dane kada saobraćaj skoči deset puta, isplati se headless ili CMS po meri. Presudni su tok rada redakcije i brzina strane, ne platforma.",
  keywords: [
    "cms za portal",
    "cms za portale srbija",
    "cms za medije",
    "custom cms izrada",
    "izrada news portala",
    "wordpress za portal",
    "headless cms",
  ],
  sections: [
    {
      heading: "Šta portal traži od CMS-a, a običan sajt ne",
      bullets: [
        "Uloge: novinar piše, urednik odobrava, administrator upravlja nalozima. Novinar ne sme da objavi sam ako redakcija tako ne radi.",
        "Zakazana objava i ažuriranje teksta posle objave, uz vidljiv datum izmene.",
        "Kategorije, oznake i povezani tekstovi koji se biraju sami, da čitalac ostane na portalu.",
        "Slike koje se same smanjuju za telefon. Portal sa 20 fotografija po tekstu inače postaje najsporiji sajt u pretrazi.",
        "Mesta za reklame sa unapred rezervisanom visinom, da tekst ne skače kad se oglas učita.",
        "Pretraga po arhivi koja radi i posle deset hiljada tekstova.",
      ],
    },
    {
      heading: "Kada je WordPress dovoljan",
      body: [
        "Veliki deo portala u Srbiji radi na WordPress-u i to nije greška. Za redakciju od nekoliko ljudi, sa standardnim tokom rada i umerenim saobraćajem, dobro podešen WordPress sa keširanjem i CDN-om radi posao.",
        "Problem nije WordPress nego ono što se na njega nakači posle dve godine: dodatak za reklame, dodatak za galerije, dodatak za SEO, tema koju je pravio neko ko više nije tu. Tada portal postaje spor, a svako ažuriranje rizik.",
      ],
    },
    {
      heading: "Kada se prelazi na headless ili CMS po meri",
      bullets: [
        "Saobraćaj skače: izbori, utakmica, vest koja se deli. Strane treba da se služe iz keša, ne da se računaju pri svakoj poseti.",
        "Redakcija ima tok rada koji nijedan dodatak ne pokriva: više nivoa odobravanja, embargo, prevod istog teksta, više portala iz jednog panela.",
        "Portal živi od Google Discover i Top stories. Tamo ulaze brze strane sa velikim slikama (najmanje 1200 px širine) i ispravnim NewsArticle podacima.",
        "Pretplata, newsletter ili zatvoren sadržaj koji mora da se veže za naloge čitalaca.",
      ],
    },
    {
      heading: "Kako preći na novi CMS bez gubitka poseta",
      body: [
        "Arhiva je imovina portala. Svaki stari tekst koji je Google indeksirao mora da ostane na istoj adresi ili da ima trajno preusmerenje (301) na novu. Prelazak bez toga briše godinama skupljane pozicije za nekoliko nedelja.",
      ],
      bullets: [
        "Izvoz svih tekstova, autora, kategorija i slika iz starog sistema, ne ručno prekucavanje.",
        "Lista svih starih adresa i pravilo preusmerenja za svaku.",
        "Paralelni rad dok redakcija ne proba novi panel na stvarnim tekstovima.",
        "Provera u Search Console-u prvih mesec dana posle prelaska.",
      ],
    },
    {
      heading: "Šta ne treba da plaćate",
      body: [
        "Ako objavljujete nekoliko tekstova nedeljno i nemate urednički tok, CMS po meri je bačen novac. Dobro održavan WordPress će vam služiti godinama. Sistem po meri ima smisla tek kada redakcija gubi vreme ili saobraćaj zbog alata.",
      ],
    },
  ],
  proofHeading: "Admin paneli koje smo pisali",
  proof: [
    {
      label: "Santos & Santorini",
      href: "/our-projects/santos-santorini-web-shop-admin-platforma",
      note: "Sopstveni admin za katalog i porudžbine umesto gotove platforme.",
    },
    {
      label: "Toza AI",
      href: "/our-projects/toza-ai-platforma-za-ai-video-studio",
      note: "Platforma sa nalozima, paketima i naplatom.",
    },
  ],
  faqHeading: "Česta pitanja",
  faq: [
    {
      q: "Koji je najbolji CMS za news portal?",
      a: "Onaj koji odgovara toku rada redakcije. Za mali portal to je najčešće WordPress sa keširanjem. Za portal sa više urednika, velikim saobraćajem ili više izdanja iz jednog panela bolji je headless CMS ili sistem pisan za tu redakciju.",
    },
    {
      q: "Da li je WordPress dovoljno brz za portal?",
      a: "Može biti, ako se strane služe iz keša i ako broj dodataka ostane mali. Spor WordPress portal je skoro uvek posledica teme i dodataka, ne same platforme.",
    },
    {
      q: "Šta je headless CMS?",
      a: "CMS koji služi samo za unos i uređivanje sadržaja, dok sajt prikazuje zaseban, brz front. Redakcija dobija poznat panel, a čitaoci stranu koja se učitava kao statična.",
    },
    {
      q: "Da li ste već radili portal?",
      a: "Nismo. Radili smo admin panele, naloge i sisteme sa velikim brojem zapisa, a portal bismo gradili po istom obrascu. Ako vam je presudna referenca baš u medijima, to treba da znate pre upita.",
    },
    {
      q: "Koliko košta CMS po meri za portal?",
      a: "Zavisi od toka rada redakcije, broja izdanja i obima arhive za prenos. Cena ide u ponudu posle kratkog opisa kako redakcija radi danas.",
    },
  ],
  cta: { label: "Opiši kako redakcija radi danas", href: "/upit" },
  secondaryCta: { label: "Usluga: CMS sistemi", href: "/our-services/cms-sistemi" },
  updated: "2026-09-22",
  related: ["/wordpress-ili-custom-sajt", "/prenos-sajta-sa-druge-agencije", "/koliko-traje-izrada-sajta"],
};

export const bookingPlatformChoiceGuide: Guide = {
  path: "/gotova-aplikacija-ili-svoj-sistem-za-zakazivanje",
  eyebrow: "Zakazivanje",
  title: "Gotova aplikacija za zakazivanje ili sopstveni sistem — šta se isplati salonu",
  metaDescription:
    "Booksy, Fresha i slične platforme ili sopstveni sistem za zakazivanje: kada je gotova aplikacija pametniji izbor, kada se isplati svoj sistem, i šta proveriti pre nego što baza klijenata ode kod treće strane.",
  h1: "Gotova aplikacija ili svoj sistem za zakazivanje?",
  lead:
    "Ako ste sami ili sa jednim radnikom i tek krećete, gotova aplikacija je razuman početak. Sopstveni sistem se isplati kada imate više radnika ili lokacija, posebna pravila za termine i kada želite da klijent zakazuje sa vašeg sajta i Google profila, a baza klijenata ostane vaša.",
  keywords: [
    "aplikacija za zakazivanje termina",
    "softver za salone cena",
    "najbolji softver za zakazivanje u salonu",
    "booksy ili svoj sistem",
    "fresha alternativa",
    "softver za zakazivanje u berbernici",
    "sistem za zakazivanje po meri",
  ],
  sections: [
    {
      heading: "Kako naplaćuju gotove platforme",
      body: [
        "Platforme kao što su Booksy i Fresha naplaćuju mesečnu pretplatu, često po radniku, a neke uzimaju i proviziju kada vam klijenta dovede njihova pretraga. Tačne iznose proverite na njihovim cenovnicima jer se menjaju.",
        "Za mali salon to je predvidiv trošak. Kako raste broj radnika, raste i pretplata, i posle nekoliko godina ukupan iznos prelazi cenu sopstvenog sistema.",
      ],
    },
    {
      heading: "Kada je gotova aplikacija pametniji izbor",
      bullets: [
        "Radite sami ili sa jednim radnikom i treba vam zakazivanje od sutra.",
        "Nove klijente vam zaista dovodi pretraga unutar te aplikacije, i to vidite po broju rezervacija.",
        "Pravila su jednostavna: usluga, trajanje, slobodan termin.",
      ],
    },
    {
      heading: "Kada se isplati sopstveni sistem",
      bullets: [
        "Više radnika ili lokacija, sa različitim smenama i uslugama po radniku.",
        "Pravila koja gotova aplikacija ne pokriva: kapara za tretmane kod kojih izostanak košta, kabina ili aparat koji se deli, pauza između tretmana.",
        "Kartica klijenta sa podacima koje sami definišete: formula boje, prethodni tretmani, napomene.",
        "Provizija po radniku i dnevni pazar koji se računaju iz istih termina.",
        "Zakazivanje pod vašim imenom, sa vašeg sajta, Instagram profila i Google profila, bez preusmeravanja na tuđu aplikaciju.",
      ],
    },
    {
      heading: "Čija je baza klijenata",
      body: [
        "Ovo je pitanje koje se postavi prekasno. Pre nego što uđete u bilo koju platformu, proverite da li u svakom trenutku možete da izvezete klijente sa brojevima telefona i istorijom termina, u formatu koji drugi program može da pročita.",
        "Kod sopstvenog sistema baza je vaša po definiciji. Ako se jednog dana raziđete sa izvođačem, podaci ostaju kod vas.",
      ],
    },
    {
      heading: "Kako preći sa platforme na svoj sistem",
      bullets: [
        "Izvoz klijenata i budućih termina iz stare aplikacije.",
        "Dve nedelje paralelnog rada: stari termini se završavaju tamo, novi se zakazuju u novom sistemu.",
        "Link za zakazivanje u Instagram profilu, dugme na Google profilu i podsetnik stalnim klijentima sa novim linkom.",
      ],
    },
  ],
  proofHeading: "Sistemi koji rade",
  proof: [
    {
      label: "Doctor Barber",
      href: "/our-projects/doctor-barber-online-booking-sistem",
      note: "Online zakazivanje za berbernicu, po radniku i usluzi.",
    },
    {
      label: "Dr Igić",
      href: "/our-projects/dr-igic-web-aplikacija-za-estetske-klinike",
      note: "Web aplikacija za estetsku kliniku sa terminima po tretmanu.",
    },
  ],
  faqHeading: "Česta pitanja",
  faq: [
    {
      q: "Koliko košta sopstveni sistem za zakazivanje?",
      a: "Sistem za zakazivanje po meri je u rasponu 1.750–4.200 €, jednokratno. Gornju granicu podižu više lokacija, kapara i povezivanje sa drugim programima. Mesečno ostaju hosting i održavanje.",
    },
    {
      q: "Da li mogu da zadržim Booksy ili Freshu i dodam svoj sistem?",
      a: "Možete, ali dva kalendara za iste radnike brzo prave duple termine. Ako zadržavate platformu zbog novih klijenata iz njene pretrage, sopstveni sistem treba da bude jedini kalendar ili da se sa njom sinhronizuje.",
    },
    {
      q: "Da li klijenti moraju da instaliraju aplikaciju?",
      a: "Ne. Zakazivanje radi u pregledaču na telefonu, preko linka. Aplikacija za instaliranje ima smisla tek za salone sa velikim brojem stalnih klijenata.",
    },
    {
      q: "Da li sopstveni sistem šalje podsetnike?",
      a: "Da. Podsetnik ide dan pre termina, a kanal (SMS, Viber, WhatsApp ili mejl) bira se po tome šta vaši klijenti čitaju.",
    },
    {
      q: "Da li uzimate proviziju po rezervaciji?",
      a: "Ne. Plaća se izrada i, ako želite, mesečno održavanje. Broj rezervacija ne menja cenu.",
    },
  ],
  cta: { label: "Opiši kako salon radi danas", href: "/upit" },
  secondaryCta: { label: "Usluga: sistemi za zakazivanje", href: "/our-services/sistemi-za-zakazivanje" },
  updated: "2026-09-22",
  related: [
    "/online-zakazivanje-za-salone-i-klinike",
    "/podsetnik-za-termin-sms-viber-whatsapp",
    "/interni-softver-umesto-excel-tabela",
  ],
};

export const appointmentReminderGuide: Guide = {
  path: "/podsetnik-za-termin-sms-viber-whatsapp",
  eyebrow: "Zakazivanje",
  title: "Podsetnik za termin — SMS, Viber ili WhatsApp i kako smanjiti nedolaske",
  metaDescription:
    "Kako da klijenti ne zaborave termin: koji kanal za podsetnik se čita u Srbiji, kada poslati poruku, šta napisati, koliko košta po poruci i šta zakon dozvoljava bez posebnog pristanka.",
  h1: "Podsetnik za termin: SMS, Viber ili WhatsApp",
  lead:
    "Pošaljite automatski podsetnik dan pre termina, na kanal koji klijent čita, sa danom, satom i linkom za otkazivanje. U Srbiji se SMS i Viber čitaju mnogo više od mejla. Otkazani termin treba odmah da se vrati u slobodne, da ga zauzme neko drugi.",
  keywords: [
    "podsetnik za termin",
    "whatsapp podsetnik za termin",
    "sms podsetnik za termin",
    "viber poruke za klijente",
    "softver za podsetnike za termine u salonu",
    "kako smanjiti nedolaske na termin",
  ],
  sections: [
    {
      heading: "Koji kanal izabrati",
      bullets: [
        "SMS stiže na svaki telefon, i bez interneta. Plaća se po poruci preko SMS provajdera, a kao pošiljalac može da stoji naziv salona.",
        "Viber većina vaših klijenata u Srbiji već ima otvoren ceo dan. Poslovne poruke idu preko ovlašćenog partnera, nalog prolazi odobrenje i plaća se po poruci.",
        "WhatsApp podsetnik ide preko WhatsApp Business platforme. Tekst poruke je šablon koji Meta prethodno odobri, a poruka se naplaćuje.",
        "Mejl je besplatan i dobar za potvrdu sa detaljima, ali kao jedini podsetnik se često ne pročita na vreme.",
      ],
      body: [
        "Najčešće dobro radi kombinacija: potvrda mejlom odmah po zakazivanju, podsetnik SMS-om ili Viberom dan pre.",
      ],
    },
    {
      heading: "Kada poslati podsetnik",
      body: [
        "Dan pre termina, u toku dana, da klijent ima vremena da otkaže i da vi stignete da popunite mesto. Za termine rano ujutru poruka ide prethodnog popodneva, ne u sedam ujutru istog dana.",
        "Drugi podsetnik dva sata pre ima smisla za duge i skupe tretmane, gde svaki propušten termin puno košta. Za šišanje od pola sata dovoljan je jedan.",
      ],
    },
    {
      heading: "Šta napisati u poruci",
      bullets: [
        "Ime salona, usluga, dan i tačan sat.",
        "Adresa ili link ka mapi, za nove klijente.",
        "Link za otkazivanje ili pomeranje. Bez njega klijent koji ne može da dođe jednostavno ne dođe.",
      ],
      body: [
        "Primer: „Salon Lana: sutra, četvrtak u 17:30, feniranje kod Ane. Ako ne stižete, otkažite ovde: [link]“. Kratko, bez reklame u istoj poruci.",
      ],
    },
    {
      heading: "Šta zakon dozvoljava",
      body: [
        "Podsetnik o terminu koji je klijent sam zakazao deo je usluge i za njega nije potreban poseban pristanak. Reklamna poruka, na primer popust za sledeći mesec, jeste marketing i traži pristanak klijenta po Zakonu o zaštiti podataka o ličnosti.",
        "Zato sistem treba da čuva ta dva odvojeno: broj za podsetnike i posebno zabeležen pristanak za obaveštenja o ponudama. Ovo nije pravni savet. Za specifične slučajeve pitajte pravnika.",
      ],
    },
    {
      heading: "Šta podsetnik ne rešava",
      body: [
        "Deo klijenata neće doći ni posle podsetnika. Za tretmane kod kojih prazan termin mnogo košta rešenje je kapara pri zakazivanju i jasno pravilo otkazivanja, a ne još jedna poruka.",
        "Ako imate nekoliko termina dnevno, ručna poruka na Viberu radi posao i automatizacija se ne isplati. Automatski podsetnik vredi kada ručno slanje počne da odnosi pola sata dnevno.",
      ],
    },
  ],
  faqHeading: "Česta pitanja",
  faq: [
    {
      q: "Koliko košta slanje podsetnika?",
      a: "Mejl je besplatan. SMS, Viber i WhatsApp se plaćaju po poslatoj poruci, kod provajdera ili partnera preko kog idu, i cena zavisi od količine. Kod sopstvenog sistema ugovor sa provajderom glasi na vas, pa trošak vidite na njegovom računu.",
    },
    {
      q: "Da li mogu da šaljem podsetnike sa svog WhatsApp broja?",
      a: "Ručno da, sa WhatsApp Business aplikacije. Za automatsko slanje iz sistema potreban je pristup WhatsApp Business platformi i odobren šablon poruke.",
    },
    {
      q: "Da li klijent može da potvrdi ili otkaže iz poruke?",
      a: "Može, preko linka u poruci. Otkazan termin se vraća u slobodne, a sistem može da javi prvom sa liste čekanja.",
    },
    {
      q: "Koliko ranije poslati podsetnik?",
      a: "Dan pre termina. Kraći razmak ostavlja premalo vremena da se mesto popuni, duži se zaboravi.",
    },
  ],
  cta: { label: "Opiši kako danas javljate termine", href: "/upit" },
  secondaryCta: { label: "Usluga: sistemi za zakazivanje", href: "/our-services/sistemi-za-zakazivanje" },
  updated: "2026-09-22",
  related: [
    "/kako-spreciti-nedolazak-na-termin",
    "/gotova-aplikacija-ili-svoj-sistem-za-zakazivanje",
    "/online-zakazivanje-za-salone-i-klinike",
  ],
};

export const appOrWebAppGuide: Guide = {
  path: "/mobilna-aplikacija-ili-web-aplikacija",
  eyebrow: "Aplikacije",
  title: "Mobilna aplikacija ili web aplikacija — šta vašoj firmi zaista treba",
  metaDescription:
    "Da li firmi treba aplikacija u App Store-u i Google Play-u ili je dovoljna web aplikacija (PWA): kada je native neophodan, šta prodavnice traže i naplaćuju, i kako se odlučuje bez bacanja novca.",
  h1: "Mobilna aplikacija ili web aplikacija?",
  lead:
    "Većini firmi dovoljna je web aplikacija koja radi u pregledaču i može da se doda na početni ekran telefona (PWA). Aplikacija u App Store-u i Google Play-u treba kada vam je potreban pun pristup telefonu, kao što su lokacija u pozadini, Bluetooth ili NFC, ili kada kupci aplikaciju traže baš u prodavnici.",
  keywords: [
    "treba mi aplikacija",
    "mobilna aplikacija ili web aplikacija",
    "pwa ili native aplikacija",
    "izrada mobilne aplikacije",
    "aplikacija za firmu",
    "koliko košta aplikacija",
  ],
  sections: [
    {
      heading: "Šta je web aplikacija (PWA)",
      body: [
        "Aplikacija koja se otvara preko linka, radi na svakom telefonu i računaru i može da se sačuva na početni ekran sa sopstvenom ikonicom. Izmena stiže na sve telefone čim je objavite, bez čekanja da je neko odobri i bez molbe korisnicima da ažuriraju.",
        "Na Androidu i na iPhone-u (od iOS 16.4) može da šalje i obaveštenja, uz uslov da je korisnik doda na početni ekran.",
      ],
    },
    {
      heading: "Kada je web aplikacija dovoljna",
      bullets: [
        "Koriste je vaši zaposleni: raspored, nalozi, evidencija na terenu. Link u Viber grupi zamenjuje instalaciju.",
        "Klijenti je otvaraju povremeno, na primer za zakazivanje ili proveru porudžbine. Retko ko instalira aplikaciju za nešto što koristi jednom mesečno.",
        "Treba vam brzo i na oba sistema. Jedna aplikacija radi i na Androidu i na iPhone-u.",
      ],
    },
    {
      heading: "Kada je potrebna prava mobilna aplikacija",
      bullets: [
        "Lokacija dok je aplikacija u pozadini, na primer praćenje vozila ili dostavljača.",
        "Bluetooth, NFC ili rad sa uređajem: vaga, štampač, čitač kartica.",
        "Dugačak rad bez interneta sa velikom količinom podataka.",
        "Kupci vas traže u App Store-u ili Google Play-u, jer je aplikacija sama proizvod.",
      ],
      body: [
        "Radimo ih u Flutter-u ili React Native-u: jedan kod za iOS i Android, umesto dve odvojene aplikacije.",
      ],
    },
    {
      heading: "Šta traže prodavnice aplikacija",
      bullets: [
        "Apple naplaćuje developerski nalog 99 dolara godišnje, Google jednokratno 25 dolara.",
        "Svaka verzija prolazi pregled pre objave. Apple ume da vrati aplikaciju na doradu.",
        "Za digitalne sadržaje koji se kupuju u aplikaciji prodavnice uzimaju proviziju. Za fizičku robu i usluge, kao što su termin ili dostava, provizija se ne plaća.",
      ],
    },
    {
      heading: "Kako da odlučite",
      body: [
        "Krenite od pitanja šta aplikacija mora da radi, ne gde treba da stoji. Ako ništa sa liste za pravu mobilnu aplikaciju ne važi za vas, počnite sa web aplikacijom. Kasniji prelazak ne baca posao: logika i baza ostaju iste, menja se samo aplikacija na telefonu.",
      ],
    },
  ],
  proofHeading: "Aplikacije koje rade",
  proof: [
    {
      label: "Prevoz Kop",
      href: "/our-projects/prevozkop-digitalni-prodajni-operativni-sistem",
      note: "Prodajni i operativni sistem koji tim koristi sa telefona.",
    },
    {
      label: "TeachFromHome",
      href: "/our-projects/teachfromhome-onboarding-sistem-za-remote-nastavnike",
      note: "Web aplikacija za prijavu i obuku nastavnika, bez instalacije.",
    },
  ],
  faqHeading: "Česta pitanja",
  faq: [
    {
      q: "Koliko košta izrada aplikacije?",
      a: "Zavisi od toga šta radi, više nego od toga da li je web ili mobilna. Interna poslovna aplikacija je u rasponu 2.800–10.500 €. Mobilna aplikacija za prodavnice dodaje posao oko objave i pregleda, pa je po pravilu skuplja od iste funkcije na webu.",
    },
    {
      q: "Da li web aplikacija radi bez interneta?",
      a: "Delimično. Može da prikaže poslednje učitane podatke i da sačuva unos dok se veza ne vrati. Za dug rad bez signala sa mnogo podataka bolja je prava mobilna aplikacija.",
    },
    {
      q: "Mogu li kasnije da pređem sa web na mobilnu aplikaciju?",
      a: "Da. Baza, nalozi i poslovna pravila ostaju isti. Pravi se nova aplikacija za telefon koja koristi isti sistem, pa se ceo posao ne plaća dva puta.",
    },
    {
      q: "Da li je PWA isto što i responzivan sajt?",
      a: "Nije. Responzivan sajt se samo prilagođava ekranu. PWA se instalira na početni ekran, otvara se bez trake pregledača, pamti podatke i može da šalje obaveštenja.",
    },
  ],
  cta: { label: "Opiši šta aplikacija treba da radi", href: "/upit" },
  secondaryCta: { label: "Usluga: mobilne aplikacije", href: "/our-services/mobilne-aplikacije" },
  updated: "2026-09-22",
  related: ["/interni-softver-umesto-excel-tabela", "/gotova-aplikacija-ili-svoj-sistem-za-zakazivanje", "/koliko-traje-izrada-sajta"],
};

export const cardPaymentsGuide: Guide = {
  path: "/placanje-karticom-na-sajtu-srbija",
  eyebrow: "Plaćanje",
  title: "Plaćanje karticom na sajtu u Srbiji — šta treba, koliko traje i košta",
  metaDescription:
    "Kako da firma u Srbiji prima kartice na sajtu: ugovor sa bankom ili platnim procesorom, šta banka proverava na sajtu, IPS QR plaćanje, troškovi po transakciji i fiskalni račun.",
  h1: "Plaćanje karticom na sajtu u Srbiji",
  lead:
    "Firma u Srbiji prima kartice na sajtu preko ugovora sa bankom ili ovlašćenim platnim procesorom. Banka pre odobrenja proverava sajt: podatke o firmi, uslove kupovine, povraćaj novca i zaštitu podataka. Kupac karticu unosi na zaštićenoj strani banke, pa vaš sajt broj kartice nikad ne vidi.",
  keywords: [
    "plaćanje karticom na sajtu",
    "kako primati kartice na sajtu srbija",
    "online plaćanje web shop srbija",
    "ips qr plaćanje na sajtu",
    "platni procesor srbija",
    "e-commerce ugovor banka",
  ],
  sections: [
    {
      heading: "Banka ili platni procesor",
      body: [
        "Kartice na sajtu primate preko banke koja nudi internet naplatu (npr. Banca Intesa, Raiffeisen, OTP) ili preko platnog procesora koji radi sa više banaka (npr. AllSecure, ChipCard). Uslovi i naknade se razlikuju, pa vredi tražiti ponudu od dva ili tri mesta.",
        "Stripe ne radi sa firmama registrovanim u Srbiji. Ako firma ima sedište u inostranstvu, to je druga priča.",
      ],
    },
    {
      heading: "Šta banka proverava na sajtu",
      bullets: [
        "Pun naziv firme, adresa, PIB, matični broj i kontakt.",
        "Uslovi kupovine, način i rok isporuke, pravo na odustanak i povraćaj novca.",
        "Politika privatnosti i zaštite podataka.",
        "Cene u dinarima i napomena o konverziji za kartice izdate u inostranstvu.",
        "Logotipi prihvaćenih kartica i oznake 3D Secure zaštite.",
      ],
      body: [
        "Sajt bez ovoga ne prolazi proveru. Zato se te strane pišu pre podnošenja zahteva, ne posle.",
      ],
    },
    {
      heading: "Kako izgleda plaćanje za kupca",
      body: [
        "Kupac u korpi bira plaćanje karticom i prelazi na stranu banke ili procesora, gde unosi karticu i potvrđuje plaćanje u aplikaciji svoje banke. Posle toga se vraća na vaš sajt, a porudžbina dobija status plaćene. Vaš sajt dobija samo potvrdu da je plaćanje prošlo.",
      ],
    },
    {
      heading: "IPS QR plaćanje",
      body: [
        "Pored kartica, kupac može da plati instant prenosom, skeniranjem QR koda aplikacijom svoje banke. Novac stiže odmah, a naknada je po pravilu niža od kartične. Uslove za prihvatanje IPS plaćanja na sajtu dogovarate sa svojom bankom.",
      ],
    },
    {
      heading: "Troškovi i rokovi",
      bullets: [
        "Naknada po transakciji, kao procenat od iznosa. Neke banke naplaćuju i mesečnu ili jednokratnu naknadu.",
        "Od zahteva do prve naplate računajte na nekoliko nedelja: ugovor, provera sajta, testno plaćanje.",
        "Za prodaju preko sajta izdaje se fiskalni račun. Sa knjigovođom proverite kako vaš sistem za fiskalizaciju izdaje račun za internet porudžbine.",
      ],
    },
    {
      heading: "Kada kartica još ne treba",
      body: [
        "Ako većina kupaca plaća pouzećem i to radi, kartica može da sačeka. Isplati se kada prodajete u inostranstvo, kada su iznosi veći ili kada vam se mnogo paketa vraća nepreuzeto. Ono što je plaćeno unapred skoro uvek se preuzme.",
      ],
    },
  ],
  faqHeading: "Česta pitanja",
  faq: [
    {
      q: "Koliko košta prihvatanje kartica na sajtu?",
      a: "Plaća se naknada po transakciji, kao procenat od iznosa, a neke banke dodaju mesečnu ili jednokratnu naknadu. Tačne iznose daje banka ili procesor u ponudi. Te naknade idu direktno njima, odvojeno od cene izrade.",
    },
    {
      q: "Da li sajt čuva brojeve kartica?",
      a: "Ne. Kartica se unosi na zaštićenoj strani banke ili procesora. Sajt dobija samo potvrdu da je plaćanje uspelo i broj transakcije.",
    },
    {
      q: "Mogu li da primam DinaCard?",
      a: "Da, ako ga vaša banka ili procesor podržava. Većina domaćih rešenja prihvata Visa, Mastercard i DinaCard.",
    },
    {
      q: "Koliko traje uvođenje?",
      a: "Tehnički deo na sajtu je nekoliko dana. Najduže traje odobrenje kod banke, pa zahtev treba podneti čim su uslovi kupovine i ostale obavezne strane gotove.",
    },
  ],
  cta: { label: "Opiši šta i kome prodaješ", href: "/upit" },
  secondaryCta: { label: "Usluga: e-commerce i web shop", href: "/our-services/e-commerce-web-shop" },
  updated: "2026-09-22",
  related: ["/sta-mora-da-ima-web-shop-u-srbiji", "/kako-napraviti-web-shop", "/prenos-sajta-sa-druge-agencije"],
};

export const webShopLegalGuide: Guide = {
  path: "/sta-mora-da-ima-web-shop-u-srbiji",
  eyebrow: "E-commerce",
  title: "Šta mora da ima web shop u Srbiji — obavezne informacije, odustanak i reklamacije",
  metaDescription:
    "Šta zakon traži od internet prodavnice u Srbiji: podaci o firmi, cene u dinarima, pravo na odustanak od 14 dana, rokovi za reklamacije, politika privatnosti i kolačići. Pregled pre puštanja shopa.",
  h1: "Šta mora da ima web shop u Srbiji",
  lead:
    "Web shop u Srbiji mora da prikaže podatke o firmi, cene u dinarima sa PDV-om i troškove dostave pre plaćanja. Mora da omogući odustanak od kupovine u roku od 14 dana, da odgovori na reklamaciju u roku od 8 dana i da objavi politiku privatnosti. Ovo nije pravni savet, konačnu proveru radi pravnik.",
  keywords: [
    "šta mora da ima web shop",
    "zakon o zaštiti potrošača web shop",
    "pravo na odustanak 14 dana",
    "obavezni podaci na sajtu firme",
    "reklamacija online kupovina rok",
    "uslovi korišćenja web shop",
  ],
  sections: [
    {
      heading: "Podaci o firmi",
      bullets: [
        "Pun poslovni naziv, sedište, matični broj i PIB.",
        "Adresa za prijem reklamacija, telefon i mejl.",
        "Registar u kom je firma upisana.",
      ],
      body: [
        "Najbolje ih je staviti u footer i na stranu „O nama“, tako da su na jedan klik sa svake strane.",
      ],
    },
    {
      heading: "Cena i uslovi pre plaćanja",
      bullets: [
        "Cena u dinarima, sa uračunatim PDV-om.",
        "Troškovi dostave, pre nego što kupac potvrdi porudžbinu, ne tek na računu.",
        "Načini plaćanja i rok isporuke.",
        "Osnovne karakteristike proizvoda: materijal, dimenzije, sastav, šta je u pakovanju.",
      ],
    },
    {
      heading: "Pravo na odustanak od 14 dana",
      body: [
        "Kupac koji je kupio preko interneta može da odustane u roku od 14 dana od prijema robe, bez navođenja razloga. Na sajtu mora da piše da to pravo postoji, kako se koristi i ko plaća vraćanje robe. Uz to ide i obrazac za odustanak.",
        "Novac se vraća najkasnije 14 dana od prijema izjave o odustanku. Postoje izuzeci, na primer roba pravljena po meri kupca, kvarljiva roba i higijenski proizvodi kojima je otvoreno pakovanje. Izuzetke treba navesti na sajtu.",
      ],
    },
    {
      heading: "Reklamacije",
      bullets: [
        "Na reklamaciju odgovarate u roku od 8 dana od prijema.",
        "Reklamacija se rešava u roku od 15 dana od podnošenja.",
        "Vodite evidenciju primljenih reklamacija.",
      ],
    },
    {
      heading: "Privatnost i kolačići",
      body: [
        "Politika privatnosti mora da kaže koje podatke uzimate, zašto, koliko ih čuvate i kome ih dajete, na primer kurirskoj službi. Za kolačiće koji nisu neophodni za rad sajta, kao što su oglasi i analitika, potreban je pristanak pre postavljanja.",
        "Newsletter traži poseban pristanak. Porudžbina nije pristanak na reklame.",
      ],
    },
    {
      heading: "Šta se najčešće zaboravi",
      bullets: [
        "Troškovi dostave vidljivi tek na kraju. To ljuti kupca i krši pravilo o ceni pre plaćanja.",
        "Obrazac za odustanak koji ne postoji ili se ne vidi.",
        "Uslovi prepisani sa drugog shopa, sa tuđim rokovima i tuđim nazivom firme.",
      ],
    },
  ],
  faqHeading: "Česta pitanja",
  faq: [
    {
      q: "Da li važi pravo na odustanak i za kupovinu pouzećem?",
      a: "Da. Pravo na odustanak važi za ugovore zaključene na daljinu, bez obzira na to kako je kupac platio.",
    },
    {
      q: "Ko plaća vraćanje robe kad kupac odustane?",
      a: "Kupac, ako ste ga na to jasno upozorili pre kupovine. Ako to nije napisano, trošak pada na vas.",
    },
    {
      q: "Da li mogu da prepišem uslove sa drugog sajta?",
      a: "Ne preporučujemo. Uslovi moraju da odgovaraju vašim rokovima, dostavi i proizvodima, a prepisan tekst obično nosi tuđe podatke i obećanja koja ne ispunjavate.",
    },
    {
      q: "Da li ovo radite vi ili pravnik?",
      a: "Mi pravimo strane, obrasce i tok kupovine tako da sve ovo postoji i vidi se. Tekst uslova treba da pregleda pravnik, jer je odgovornost za sadržaj vaša.",
    },
  ],
  cta: { label: "Opiši asortiman i način prodaje", href: "/upit" },
  secondaryCta: { label: "Usluga: e-commerce i web shop", href: "/our-services/e-commerce-web-shop" },
  updated: "2026-09-22",
  related: ["/kako-napraviti-web-shop", "/placanje-karticom-na-sajtu-srbija", "/koliko-traje-izrada-sajta"],
};

export const aiClientDataGuide: Guide = {
  path: "/chatgpt-u-firmi-podaci-klijenata",
  eyebrow: "AI i podaci",
  title: "ChatGPT u firmi i podaci klijenata — šta sme, šta ne i kako bezbedno",
  metaDescription:
    "Smete li da ubacujete podatke klijenata u ChatGPT i druge AI alate: razlika između besplatnih i poslovnih naloga, šta kaže Zakon o zaštiti podataka o ličnosti i pravila koja firma treba da uvede.",
  h1: "ChatGPT u firmi i podaci klijenata",
  lead:
    "Podatke klijenata ne ubacujte u besplatan ili lični nalog AI alata, jer razgovori tamo po podrazumevanim podešavanjima mogu da se koriste za treniranje modela. Poslovni nalozi i pristup preko API-ja to po pravilu ne rade. Za sve ostalo važi Zakon o zaštiti podataka o ličnosti: ubacujte samo ono što je neophodno, bez imena kada ime ne treba.",
  keywords: [
    "chatgpt podaci klijenata",
    "da li je chatgpt bezbedan za firmu",
    "ai i zakon o zaštiti podataka o ličnosti",
    "chatgpt gdpr srbija",
    "ai alati u firmi pravila",
    "chatgpt business ili besplatan",
  ],
  sections: [
    {
      heading: "Gde je stvarni rizik",
      body: [
        "Rizik nije u tome što AI „zna“ vašu tabelu. Rizik je što zaposleni kopira ceo mejl klijenta, sa imenom, telefonom i dijagnozom, u lični nalog na svom telefonu. Firma tada ne zna gde su podaci, koliko se čuvaju i ko ih koristi.",
      ],
    },
    {
      heading: "Besplatan nalog, poslovni nalog i API",
      bullets: [
        "Besplatni i lični nalozi: razgovori mogu da se koriste za unapređenje modela, osim ako korisnik to ne isključi u podešavanjima. Firma nema pregled ko šta ubacuje.",
        "Poslovni nalozi (Team, Enterprise i slični): podaci se po pravilu ne koriste za treniranje, a administrator vidi naloge i može da ih ugasi kad neko ode iz firme.",
        "API, kada AI radi unutar vašeg sistema: podaci se ne koriste za treniranje, a vi određujete šta tačno ide ka modelu.",
      ],
      body: [
        "Uslovi dobavljača se menjaju. Pre uvođenja pročitajte aktuelne uslove za verziju koju plaćate.",
      ],
    },
    {
      heading: "Šta kaže zakon",
      body: [
        "Zakon o zaštiti podataka o ličnosti važi i kada podatke obrađuje AI. Treba vam osnov za obradu, podaci moraju biti ograničeni na ono što je potrebno, a prenos van Srbije ima posebna pravila. Većina AI servisa radi na serverima u inostranstvu.",
        "Posebno osetljivi su zdravstveni podaci, JMBG, finansijski podaci i podaci o deci. Njih ne unosite u AI alat bez pravnog mišljenja. Ovo nije pravni savet.",
      ],
    },
    {
      heading: "Pravila koja firma treba da uvede",
      bullets: [
        "Jedan odobren alat sa poslovnim nalogom, umesto da svako koristi svoj.",
        "Pre ubacivanja teksta ime i kontakt zamenite oznakom, na primer „Klijent A“.",
        "Lista podataka koji nikad ne idu u AI: JMBG, brojevi kartica, dijagnoze, lozinke.",
        "Kratko pisano uputstvo za zaposlene i ko odgovara za pitanja.",
      ],
    },
    {
      heading: "Kada AI treba da radi unutar vašeg sistema",
      body: [
        "Ako AI svakodnevno radi sa podacima klijenata, na primer odgovara na upite, sažima razgovore ili priprema ponude, bolje ga je povezati preko API-ja u vaš program. Tako tačno znate šta ide ka modelu, ništa se ne kopira ručno, a sistem može da skloni lične podatke pre slanja.",
      ],
    },
  ],
  faqHeading: "Česta pitanja",
  faq: [
    {
      q: "Da li je ChatGPT bezbedan za firmu?",
      a: "Jeste, ako koristite poslovni nalog ili API i imate pravila šta sme da se ubaci. Nije bezbedan način da svaki zaposleni u lični nalog kopira mejlove klijenata.",
    },
    {
      q: "Da li OpenAI trenira model na mojim podacima?",
      a: "Na besplatnim i ličnim nalozima može, osim ako to ne isključite u podešavanjima. Na poslovnim nalozima i preko API-ja po pravilu ne. Proverite aktuelne uslove za verziju koju koristite.",
    },
    {
      q: "Mogu li da koristim AI za odgovaranje klijentima?",
      a: "Možete, uz jasno pravilo da AI priprema odgovor, a čovek ga šalje, bar za osetljive teme. Klijent ne treba da dobije obećanje o ceni ili roku koje niko u firmi nije proverio.",
    },
    {
      q: "Da li važi isto i za Claude, Gemini i druge alate?",
      a: "Princip je isti: lični nalozi imaju drugačije uslove od poslovnih i od API-ja. Uslovi se razlikuju po dobavljaču, pa ih čitate za svaki alat posebno.",
    },
  ],
  cta: { label: "Opiši gde bi AI pomogao u firmi", href: "/upit" },
  secondaryCta: { label: "Usluga: AI integracije i automatizacija", href: "/our-services/ai-integracije-automatizacija" },
  updated: "2026-09-22",
  related: ["/ai-chatbot-za-sajt", "/interni-softver-umesto-excel-tabela", "/podsetnik-za-termin-sms-viber-whatsapp"],
};

export const sefInvoicesGuide: Guide = {
  path: "/e-fakture-sef-automatski",
  eyebrow: "E-fakture",
  title: "E-fakture na SEF automatski — kako da vaš program sam šalje fakture",
  metaDescription:
    "Kako povezati sopstveni program, web shop ili CRM sa Sistemom e-faktura (SEF): API ključ, šta se šalje, statusi faktura, kada je dovoljan knjigovodstveni program i kada se isplati integracija.",
  h1: "E-fakture na SEF automatski",
  lead:
    "Sistem e-faktura (SEF) ima API preko kog vaš program može sam da šalje fakture i prati da li ih je kupac prihvatio ili odbio. Ako fakturišete iz knjigovodstvenog programa koji je već povezan sa SEF-om, ne treba vam ništa novo. Integracija se isplati kada fakture nastaju u vašem sistemu, na primer u web shopu, CRM-u ili internoj aplikaciji.",
  keywords: [
    "sef api integracija",
    "e-fakture automatski",
    "slanje e-faktura iz programa",
    "sistem e-faktura povezivanje",
    "e-faktura web shop",
    "sef integracija crm",
  ],
  sections: [
    {
      heading: "Kada vam integracija ne treba",
      body: [
        "Ako knjigovođa ili vaš knjigovodstveni program već šalje fakture na SEF i broj faktura je mali, ručni unos ili izvoz iz tog programa je sasvim dovoljan. Integracija ima smisla tek kada ista faktura mora da se prekuca iz jednog sistema u drugi.",
      ],
    },
    {
      heading: "Kada se isplati",
      bullets: [
        "Fakture nastaju u vašem sistemu: porudžbina u web shopu, završen radni nalog, mesečna pretplata.",
        "Mnogo faktura mesečno, pa prekucavanje odnosi sate i pravi greške.",
        "Treba vam status u vašem programu: da li je kupac prihvatio fakturu i kada.",
      ],
    },
    {
      heading: "Kako radi povezivanje",
      bullets: [
        "U SEF-u korisnik firme generiše API ključ, koji se čuva na serveru, nikad u pregledaču.",
        "Program od podataka iz porudžbine pravi fakturu u propisanom elektronskom formatu i šalje je na SEF.",
        "SEF vraća identifikator fakture, a program kasnije proverava status: poslata, prihvaćena, odbijena ili stornirana.",
        "Primljene fakture od dobavljača mogu isto tako da se preuzimaju u vaš sistem.",
      ],
    },
    {
      heading: "Šta treba proveriti sa knjigovođom",
      bullets: [
        "Ko je odgovoran za ispravnost podataka: PIB kupca, stopa PDV-a, jedinice mere.",
        "Kako se radi storno i knjižno odobrenje.",
        "Da li fakture iz vašeg sistema i one iz knjigovodstvenog programa dele istu numeraciju.",
      ],
    },
    {
      heading: "Šta prvo testirati",
      body: [
        "SEF ima demo okruženje. Integracija se prvo pušta tamo, sa probnim fakturama, pa tek kada knjigovođa potvrdi da su fakture ispravne prelazi se na pravi sistem.",
      ],
    },
  ],
  faqHeading: "Česta pitanja",
  faq: [
    {
      q: "Da li mogu da šaljem e-fakture iz svog web shopa?",
      a: "Možete, ako web shop fakturiše firmama i povežete ga sa SEF-om preko API-ja. Za prodaju fizičkim licima izdaje se fiskalni račun, ne e-faktura na SEF-u.",
    },
    {
      q: "Da li je API za SEF besplatan?",
      a: "Sam SEF i API ključ se ne plaćaju. Plaća se izrada integracije u vašem programu.",
    },
    {
      q: "Šta ako SEF ne radi kada šaljem fakturu?",
      a: "Dobra integracija čuva fakturu u redu za slanje i pokušava ponovo, umesto da je izgubi. U programu se vidi koje fakture čekaju.",
    },
    {
      q: "Da li integracija menja moj knjigovodstveni program?",
      a: "Ne mora. Najčešće vaš sistem šalje fakture na SEF, a knjigovođa ih odatle preuzima kao i do sada.",
    },
  ],
  cta: { label: "Opiši odakle danas nastaju fakture", href: "/upit" },
  secondaryCta: { label: "Usluga: interne poslovne aplikacije", href: "/our-services/interne-poslovne-aplikacije" },
  updated: "2026-09-22",
  related: ["/interni-softver-umesto-excel-tabela", "/placanje-karticom-na-sajtu-srbija", "/sta-mora-da-ima-web-shop-u-srbiji"],
};

export const adsOrSeoGuide: Guide = {
  path: "/google-oglasi-ili-seo",
  eyebrow: "Marketing",
  title: "Google oglasi ili SEO — gde da uložite prvi novac za upite",
  metaDescription:
    "Google Ads ili SEO za malu firmu: šta donosi upite odmah, šta donosi upite za godinu dana, gde se uklapaju Google poslovni profil i AI odgovori, i kako da merite da li novac radi.",
  h1: "Google oglasi ili SEO?",
  lead:
    "Google oglasi donose posete od prvog dana, ali prestaju čim prestanete da plaćate. SEO i pojavljivanje u AI odgovorima rade mesecima pre prvih rezultata, a posle toga rade bez plaćanja po kliku. Mala firma najčešće kreće sa Google poslovnim profilom i oglasima za nekoliko upita sa jasnom namerom kupovine, a SEO gradi paralelno.",
  keywords: [
    "google ads ili seo",
    "google oglasi za malu firmu",
    "seo usluge nis",
    "ppc marketing nis",
    "koliko košta google oglašavanje",
    "šta je bolje seo ili google ads",
  ],
  sections: [
    {
      heading: "Šta dobijate od oglasa",
      bullets: [
        "Posete od prvog dana, za reči koje sami izaberete.",
        "Plaćate po kliku. Cena klika zavisi od konkurencije za tu reč.",
        "Brzo saznate koje usluge i poruke donose upite, pa to koristite i za SEO.",
        "Kada budžet stane, stanu i posete.",
      ],
    },
    {
      heading: "Šta dobijate od SEO-a i AI odgovora",
      bullets: [
        "Prvi rezultati posle nekoliko meseci, ne nedelja.",
        "Posete koje ne plaćate po kliku i koje ostaju kada prestanete da ulažete.",
        "Iste strane koje Google rangira čitaju i ChatGPT, Perplexity i Google AI kada biraju koga da preporuče.",
        "Traži sadržaj koji odgovara na stvarna pitanja kupaca i linkove sa drugih sajtova.",
      ],
    },
    {
      heading: "Redosled za malu lokalnu firmu",
      bullets: [
        "Google poslovni profil sa tačnim radnim vremenom, fotografijama i recenzijama. Besplatan je i često donosi više poziva od sajta.",
        "Oglasi za dve ili tri usluge sa jasnom namerom, na primer „zakazivanje [usluga] Niš“, sa stranom koja odgovara baš na taj upit.",
        "Strane koje odgovaraju na pitanja kupaca, za SEO i AI odgovore, dok oglasi rade.",
      ],
    },
    {
      heading: "Bez merenja je sve pogađanje",
      body: [
        "Pre prvog dinara za oglase podesite merenje upita: poslata forma, klik na telefon, zakazan termin. Bez toga znate samo koliko ste platili, ne i šta ste dobili. Isto važi za SEO: Search Console pokazuje za koje upite se pojavljujete i na kojoj poziciji.",
      ],
    },
    {
      heading: "Kada oglasi bacaju novac",
      bullets: [
        "Oglas vodi na početnu stranu umesto na stranu o toj usluzi.",
        "Sajt je spor na telefonu ili forma traži previše podataka.",
        "Široke reči bez namere, na primer „sajt“ ili „marketing“, koje donose klikove koji ništa ne kupuju.",
      ],
    },
  ],
  faqHeading: "Česta pitanja",
  faq: [
    {
      q: "Koliko košta Google oglašavanje?",
      a: "Budžet za klikove određujete sami i plaćate ga direktno Google-u. Cena klika zavisi od delatnosti i konkurencije. Za uske lokalne upite mesečni budžet može biti mali, a za tražene usluge u velikom gradu raste.",
    },
    {
      q: "Koliko traje dok SEO da rezultate?",
      a: "Za nove strane obično nekoliko meseci. Brže ide kada sajt već ima istoriju i linkove sa drugih sajtova, sporije za nov domen i jaku konkurenciju.",
    },
    {
      q: "Da li mi trebaju i oglasi i SEO?",
      a: "Najčešće da, u različitim fazama. Oglasi pokrivaju period dok SEO ne proradi i pokazuju koje usluge donose upite. SEO kasnije smanjuje zavisnost od budžeta.",
    },
    {
      q: "Šta je AEO?",
      a: "Priprema sajta da ga AI asistenti razumeju i preporuče kada kupac pita koga da izabere. Oslanja se na iste temelje kao SEO: jasne strane, tačne podatke o firmi i pominjanje na drugim sajtovima.",
    },
  ],
  cta: { label: "Opiši uslugu i grad", href: "/upit" },
  secondaryCta: { label: "Usluga: SEO i digitalni marketing", href: "/our-services/seo-digitalni-marketing" },
  updated: "2026-09-22",
  related: ["/sajt-ne-donosi-upite", "/da-li-mi-treba-sajt-ako-imam-instagram", "/kako-izabrati-web-agenciju"],
};

export const instagramOrSiteGuide: Guide = {
  path: "/da-li-mi-treba-sajt-ako-imam-instagram",
  eyebrow: "Sajt za firmu",
  title: "Da li mi treba sajt ako imam Instagram — kada je profil dovoljan, a kada ne",
  metaDescription:
    "Instagram ili sajt za malu firmu: šta Instagram ne pokriva (Google pretraga, AI preporuke, zakazivanje, sigurnost naloga), kada je profil dovoljan i kako sajt i Instagram rade zajedno.",
  h1: "Da li mi treba sajt ako imam Instagram?",
  lead:
    "Instagram je dovoljan dok vas ljudi nalaze preko preporuke i profila. Sajt vam treba kada želite da vas nađu oni koji traže uslugu na Google-u ili pitaju AI asistenta, jer oni retko pretražuju Instagram. Sajt je i jedino mesto koje je vaše: nalog može da bude hakovan ili ugašen, a domen i sadržaj ostaju.",
  keywords: [
    "da li mi treba sajt",
    "instagram ili sajt",
    "sajt za malu firmu",
    "da li je instagram dovoljan za biznis",
    "zašto firmi treba sajt",
    "prezentacioni sajt za firmu",
  ],
  sections: [
    {
      heading: "Šta Instagram radi dobro",
      bullets: [
        "Pokazuje rad: pre i posle, atmosferu, ljude.",
        "Drži vas u glavi postojećih klijenata.",
        "Brza komunikacija porukama sa onima koji vas već prate.",
      ],
    },
    {
      heading: "Šta Instagram ne pokriva",
      bullets: [
        "Google pretragu. Neko ko ukuca „frizer Niš zakazivanje“ vidi mapu i sajtove, retko Instagram profil.",
        "AI preporuke. ChatGPT i Google AI biraju firme na osnovu sajtova i podataka koje mogu da pročitaju.",
        "Cene, uslove i odgovore na česta pitanja na jednom mestu, bez skrolovanja kroz objave.",
        "Zakazivanje i porudžbine bez dopisivanja.",
        "Sigurnost. Hakovan ili blokiran nalog znači da vas preko noći nema, sa svim pratiocima.",
      ],
    },
    {
      heading: "Kada je Instagram dovoljan",
      body: [
        "Ako imate pun raspored od preporuka i stalnih klijenata i ne tražite nove, sajt vam trenutno ne donosi ništa što vam treba. Tada je bolje uložiti u Google poslovni profil, koji je besplatan, i sačekati trenutak kada budete želeli rast.",
      ],
    },
    {
      heading: "Kako sajt i Instagram rade zajedno",
      bullets: [
        "Link u bio vodi na sajt sa zakazivanjem ili formom, ne na „pišite u DM“.",
        "Sajt prikazuje najnovije radove, a Instagram ostaje mesto za svakodnevne objave.",
        "Google poslovni profil vodi na sajt, gde kupac vidi cene i uslove pre nego što se javi.",
      ],
    },
  ],
  faqHeading: "Česta pitanja",
  faq: [
    {
      q: "Koliko košta sajt za malu firmu?",
      a: "Prezentacioni sajt je u rasponu 850–2.100 €. Uz njega idu domen i hosting, reda veličine nekoliko desetina evra godišnje.",
    },
    {
      q: "Da li je Google poslovni profil dovoljan umesto sajta?",
      a: "Za lokalnu firmu profil je obavezan i često donosi više poziva od sajta. Ali ne može da primi zakazivanje po vašim pravilima, ne objašnjava usluge detaljno i AI ga ne čita kao izvor koliko sajt.",
    },
    {
      q: "Može li Linktree ili slična strana da zameni sajt?",
      a: "Ne. To je spisak linkova koji Google i AI praktično ne vide kao sajt firme. Korisno je samo kao prelaz sa Instagrama.",
    },
    {
      q: "Koliko brzo sajt počne da donosi upite?",
      a: "Posete iz Google pretrage dolaze postepeno, obično za nekoliko meseci. Brže ide ako sajt vežete za Google poslovni profil i Instagram odmah po puštanju.",
    },
  ],
  cta: { label: "Opiši čime se baviš i odakle dolaze klijenti", href: "/upit" },
  secondaryCta: { label: "Usluga: web prezentacije", href: "/our-services/web-prezentacije" },
  updated: "2026-09-22",
  related: ["/sajt-ne-donosi-upite", "/google-oglasi-ili-seo", "/wordpress-ili-custom-sajt"],
};

export const fiscalizationWebShopGuide: Guide = {
  path: "/fiskalizacija-web-shop-srbija",
  eyebrow: "E-commerce i propisi",
  title: "Fiskalizacija za web shop u Srbiji — kada treba kasa, a kada automatski račun",
  metaDescription:
    "Kada je fiskalni račun obavezan za web shop u Srbiji: razlika između plaćanja karticom, pouzećem i virmanom, kako radi virtuelni procesor (V-PFR) i kako kupac dobija račun.",
  h1: "Fiskalizacija za web shop u Srbiji",
  lead:
    "Za prodaju pouzećem kurirskom službom ili uplatom na račun po zakonu nije neophodna fiskalna kasa već otpremnica ili faktura. Ako kupac na sajtu plaća karticom, fiskalni račun je zakonska obaveza u sekundi naplate. Izdaje se automatski preko virtuelnog procesora fiskalnih računa (V-PFR) i šalje kupcu na mejl kao PDF sa QR kodom.",
  keywords: [
    "fiskalizacija web shop srbija",
    "fiskalni racun internet prodaja",
    "da li treba fiskalna kasa za online prodaju",
    "v-pfr fiskalizacija srbija",
    "fiskalizacija placanje karticom sajt",
    "prodaja pouzecem fiskalni racun",
    "e-fiskalizacija za internet prodavnicu",
  ],
  sections: [
    {
      heading: "Koji način plaćanja traži fiskalni račun, a koji ne",
      bullets: [
        "Plaćanje platnom karticom na sajtu: fiskalni račun je obavezan u momentu autorizacije transakcije. Zakon o fiskalizaciji ovo tretira kao maloprodaju fizičkom licu.",
        "Plaćanje pouzećem (gotovinom kuriru): kurirska služba preuzima novac i uplaćuje ga na vaš račun, a pošiljku prati račun/otpremnica. Fizička fiskalna kasa nije zakonski uslov ako kurirska služba ima ugovor o posredovanju u naplati.",
        "Uplata na tekući račun (e-banking / virman): kada kupac sam nalogom uplaćuje na vaš račun, transakcija ide preko bankarskog izvoda i dokumentuje se fakturom.",
        "B2B prodaja pravnim licima: evidentira se kroz elektronsku fakturu na SEF portalu, bez fiskalnog računa.",
      ],
    },
    {
      heading: "Kako radi virtuelna kasa (V-PFR) bez fizičkog uređaja",
      body: [
        "Za internet prodavnicu nije potrebno kupovati metalnu kasu sa tastaturom i trakom koja stoji u kancelariji. Zakon dozvoljava korišćenje virtuelnog procesora fiskalnih računa (V-PFR) i softverskog lokalnog procesora (LPFR).",
        "V-PFR je servis Poreske uprave koji kroz bezbedan digitalni sertifikat (smart kartica ili softverski fajl) potpisuje račun u sekundi kada web shop primi uplatu. Račun dobija zvanični PFR broj i verifikacioni QR kod direktno sa servera Poreske uprave.",
      ],
    },
    {
      heading: "Šta fiskalni račun na internetu mora da sadrži",
      bullets: [
        "Zvanični naziv, PIB i adresu firme (ili preduzetnika).",
        "Punu specifikaciju artikala sa poreskim stopama (20% opšta, 10% posebna).",
        "Iznos troška dostave, ako se naplaćuje kupcu (i na njega se obračunava PDV).",
        "Vreme i datum transakcije usklađeni sa potvrdom bankarskog payment gateway-a.",
        "QR kod i link na portal Poreske uprave gde kupac jednim klikom proverava validnost računa.",
      ],
    },
    {
      heading: "Kako izgleda automatsko slanje računa kupcu",
      body: [
        "Ručno kucanje računa u kasi za svaku online porudžbinu funkcioniše dok imate dve porudžbine dnevno. Čim obim poraste, ručni rad pravi kašnjenja i greške u poreskim stopama.",
      ],
      bullets: [
        "Kupac završi plaćanje karticom na sajtu.",
        "Payment gateway (npr. Banca Intesa, ChipCard, Corvus, Stripe) javi web shopu da je novac rezervisan.",
        "Web shop automatski šalje podatke porudžbine na V-PFR API.",
        "V-PFR vraća potpisan račun, a sajt odmah generiše PDF sa QR kodom i šalje ga kupcu na mejl uz potvrdu porudžbine.",
      ],
    },
    {
      heading: "Česte greške trgovaca i troškovi koji se mogu izbeći",
      bullets: [
        "Kupovina nepotrebnih fizičkih terminala za sajt koji prodaje samo online.",
        "Izdavanje računa sa pogrešnom poreskom stopom za poštarinu i pakovanje.",
        "Ignorisanje automatizacije: ručno kucanje stotina online računa u maloprodajnu kasu krajem radnog dana.",
        "Nepovezanost sa stanjem zaliha: izdavanje računa za artikal koga nema u magacinu.",
      ],
    },
  ],
  proofHeading: "Sistemi za obradu porudžbina",
  proof: [
    {
      label: "Santos & Santorini",
      href: "/our-projects/santos-santorini-web-shop-admin-platforma",
      note: "Sopstveni admin za obradu narudžbina, statusa isporuke i dokumentacije.",
    },
  ],
  faqHeading: "Česta pitanja",
  faq: [
    {
      q: "Da li mi zaista treba fiskalna kasa ako prodajem samo online?",
      a: "Ako primate uplate karticom na sajtu, zakonski morate izdati fiskalni račun, ali vam ne treba fizička kasa sa trakom. Dovoljan je virtuelni procesor (V-PFR) integrisan u web shop.",
    },
    {
      q: "Da li za plaćanje pouzećem mora fiskalni račun?",
      a: "Ako kurirska služba ima ugovor o naplati i novac vam uplaćuje zbirno na račun, pošiljka se šalje uz otpremnicu i račun. Proverite model ugovora sa kurirskom službom i vašim knjigovođom.",
    },
    {
      q: "Kako kupac dobija fiskalni račun ako nema papirnog isečka?",
      a: "Zakon o fiskalizaciji izričito dozvoljava dostavu fiskalnog računa elektronskim putem. Kupac račun dobija u PDF formatu na mejl ili SMS porukom sa linkom do zvanične provere Poreske uprave.",
    },
    {
      q: "Koliko košta uvođenje automatske e-fiskalizacije na sajt?",
      a: "Zavisi od platforme web shopa i izabranog fiskalnog provajdera. Pored cene integracije, provajderi softverskog procesora obično naplaćuju fiksnu mesečnu pretplatu ili mali iznos po izdatom računu.",
    },
    {
      q: "Da li paušalac koji prodaje preko web shopa mora da se fiskalizuje?",
      a: "Ukoliko se bavi trgovinom na malo putem interneta, paušalac podleže obavezi fiskalizacije za transakcije prema fizičkim licima, bez obzira na paušalno oporezivanje.",
    },
  ],
  cta: { label: "Opiši kako prodaješ i naplaćuješ", href: "/upit" },
  secondaryCta: { label: "Usluga: e-commerce i web shop", href: "/our-services/e-commerce-web-shop" },
  updated: "2026-09-30",
  related: ["/placanje-karticom-na-sajtu-srbija", "/sta-mora-da-ima-web-shop-u-srbiji", "/e-fakture-sef-automatski"],
};

export const b2bPortalGuide: Guide = {
  path: "/b2b-portal-za-veleprodaju",
  eyebrow: "Veleprodaja i B2B",
  title: "B2B portal za veleprodaju — kako prebaciti naručivanje sa Vibera i telefona u sistem",
  metaDescription:
    "Kako izgleda B2B portal za veleprodaju i distributere: ugovorene cene i rabati po kupcu, minimalna pakovanja, sinhronizacija zaliha i prebacivanje porudžbina iz poruka u sistem.",
  h1: "B2B portal za veleprodaju i distributere",
  lead:
    "B2B portal nije običan web shop, već zatvorena platforma gde registrovani partneri vide svoje ugovorene rabate, valute plaćanja i lager u realnom vremenu. Naručivanje kroz portal ukida celodnevno prekucavanje porudžbina iz Vibera i poruka, sprečava greške u količinama i automatski kreira nalog u magacinu.",
  keywords: [
    "b2b portal veleprodaja",
    "softver za b2b narucivanje",
    "veleprodaja web shop srbija",
    "portal za distributere",
    "rabatne skale b2b softver",
    "sinhronizacija lagera veleprodaja",
    "digitalizacija veleprodaje",
  ],
  sections: [
    {
      heading: "Zašto običan web shop (B2C) ne odgovara veleprodaji",
      bullets: [
        "Različite cene po partneru: u veleprodaji retko ko plaća istu cenu. Svaki distributer ima svoj ugovoreni rabat ili komisioni cenovnik.",
        "Pakovanja umesto komada: roba se naručuje na palete, transportne kutije ili setove sa definisanim minimalnim količinama.",
        "Plaćanje na odloženo (valuta): partneri retko plaćaju karticom u korpi. Porudžbina se evidentira sa definisanim rokom plaćanja (30, 60 ili 90 dana) i limitom zaduženja.",
        "Zatvoren pristup: cene i lager često nisu javni posetiocima sa interneta već samo odobrenim pravnim licima.",
      ],
    },
    {
      heading: "Gde distributeri gube vreme bez portala",
      body: [
        "Tipičan dan komercijaliste u veleprodaji sastoji se od dešifrovanja slika rukom pisanih spiskova sa Vibera, telefonskih poziva sa pitanjem „imate li ovo na stanju“ i prekucavanja stavki u knjigovodstveni program.",
        "Ovaj ručni tok rada ne samo da troši sate komercijalista već neminovno pravi greške: pogrešno uneta šifra artikla, poslata pogrešna dimenzija, ili obećana roba koja je sat vremena ranije prodata drugom kupcu.",
      ],
    },
    {
      heading: "Šta partner mora da vidi kada se prijavi na portal",
      bullets: [
        "Svoje neto cene sa automatski obračunatim rabatom.",
        "Tačno stanje zaliha u realnom vremenu (ili indikator „na stanju / očekuje se“).",
        "Brzu pretragu po kataloškoj šifri, barkodu ili fabričkom nazivu artikla.",
        "Preuzimanje faktura, otpremnica i specifikacija u PDF-u bez zvanja računovodstva.",
        "Pregled trenutnog duga i raspoloživog kreditnog limita.",
      ],
    },
    {
      heading: "Kako magacin i komercijala dobijaju tačne naloge",
      bullets: [
        "Čim partner potvrdi porudžbinu, roba se automatski rezerviše u sistemu.",
        "Magacioner na svom terminalu ili tabletu odmah dobija digitalni nalog za pakovanje sa redosledom polica i tačnim šiframa.",
        "Komercijalista više nije daktilograf koji prekucava stavke, već ima vremena da obilazi kupce i otvara nova partnerstva.",
      ],
    },
    {
      heading: "Sinhronizacija sa knjigovodstvom i ERP-om",
      body: [
        "B2B portal ne zamenjuje postojeći ERP ili finansijski softver firme. On je digitalni šalter koji je povezan sa bazom: artikli, cene i zalihe se sinhronizuju iz poslovnog programa, a zaključene porudžbine automatski ulaze kao profakture ili nalozi za izdavanje.",
      ],
    },
  ],
  proofHeading: "Sistemi za operativu i administraciju",
  proof: [
    {
      label: "Prevoz Kop",
      href: "/our-projects/prevoz-kop-logistika-i-flota",
      note: "Dispečerski sistem i nalozi za operativu i isporuke materijala.",
    },
    {
      label: "Santos & Santorini",
      href: "/our-projects/santos-santorini-web-shop-admin-platforma",
      note: "Admin platforma sa kontrolom stanja i obradom narudžbina.",
    },
  ],
  faqHeading: "Česta pitanja",
  faq: [
    {
      q: "Da li partneri moraju da plate karticom na portalu?",
      a: "Ne. U B2B sistemu porudžbina se evidentira na ugovorenu valutu plaćanja, avansni račun ili virman, uz automatsku proveru kreditnog limita kupca.",
    },
    {
      q: "Da li svaki kupac može da ima svoj jedinstveni cenovnik?",
      a: "Da. B2B portal podržava ugovorene rabatne skale po kupcu, po kategoriji artikala ili fiksne ugovorne cene za strateške partnere.",
    },
    {
      q: "Šta se dešava ako partner probije kreditni limit ili rok plaćanja?",
      a: "Sistem može automatski da blokira novo naručivanje na valutu ili da nalog pošalje direktoru na ručno odobrenje, uz jasno obaveštenje kupcu o dospelom dugu.",
    },
    {
      q: "Kako povezati B2B portal sa našim knjigovodstvenim programom?",
      a: "Povezivanje se vrši preko API-ja ili automatske razmene podataka (CSV, XML, JSON). Cene i zalihe se redovno osvežavaju, a porudžbine automatski upisuju u knjigovodstvo.",
    },
    {
      q: "Koliko traje izrada B2B portala za veleprodaju?",
      a: "Osnovni B2B portal sa autorizacijom kupaca, rabatima i katalogom se obično isporučuje za 4 do 8 nedelja, dok kompleksne integracije sa više magacina traju duže.",
    },
  ],
  cta: { label: "Opiši kako danas primaš porudžbine partnera", href: "/upit" },
  secondaryCta: { label: "Usluga: interne aplikacije", href: "/our-services/interne-poslovne-aplikacije" },
  updated: "2026-09-30",
  related: ["/interni-softver-umesto-excel-tabela", "/kako-interni-softver-stedi-vreme-vlasniku", "/e-fakture-sef-automatski"],
};

export const customSoftwareVsErpGuide: Guide = {
  path: "/gotov-erp-crm-ili-softver-po-meri",
  eyebrow: "Izbor tehnologije",
  title: "Gotov ERP i CRM ili softver po meri — gde firme u Srbiji gube novac",
  metaDescription:
    "Odoo, Pantheon ili softver po meri: gde firme u Srbiji gube novac na gotovim ERP i CRM programima, kada se isplati prilagođavanje, a kada je namenski sistem brži i jeftiniji.",
  h1: "Gotov ERP/CRM ili softver po meri?",
  lead:
    "Gotov ERP poput Odoo-a ili Pantheona isplati se kada su procesi standardni i treba gotovo zakonsko računovodstvo. Softver po meri isplati se kada specifična operativa firme (proizvodnja, nalozi, teren, posebni cenovnici) traži višemesečne skupe dorade gotovog programa čija licenca i održavanje brzo premaše cenu namenskog alata.",
  keywords: [
    "gotov erp ili softver po meri",
    "odoo srbija implementacija cena",
    "pantheon alternativa",
    "crm po meri ili gotov crm",
    "kada praviti softver po meri",
    "razvoj internog softvera za firmu",
    "poslovni softver za srednja preduzeca",
  ],
  sections: [
    {
      heading: "Gde gotovi programi rade odlično",
      bullets: [
        "Finansijsko računovodstvo, PDV prijave i završni računi.",
        "Obračun zarada i zakonska kadrovska evidencija.",
        "Standardna veleprodaja i maloprodaja sa uobičajenim tokovima dokumenata.",
        "Kada firma nema specifične procese i spremna je da rad prilagodi fabričkim procedurama programa.",
      ],
    },
    {
      heading: "Skriveni troškovi implementacije gotovih sistema",
      body: [
        "Mnogi vlasnici firmi kupe licencu za Odoo, Salesforce ili Pantheon verujući da je posao gotov. Zatim saznaju da program u startu ne radi onako kako njihova operativa funkcioniše.",
        "Tada počinje faza prilagođavanja (customization) gde eksterni konsultanti naplaćuju stotine radnih sati. Implementacija se često oduži na 12 ili 18 meseci, a konačni trošak bude tri do pet puta veći od početne procene.",
      ],
      bullets: [
        "Plaćanje licenci po korisniku svakog meseca, čak i za radnike u magacinu koji koriste samo jednu funkciju.",
        "Zavisnost od spoljnih integratora za svaku izmenu izveštaja ili polja u formi.",
        "Stotine opcija i menija u programu koje 90% zaposlenih zbunjuju i usporavaju.",
      ],
    },
    {
      heading: "Kada softver po meri košta manje kroz 3 godine",
      bullets: [
        "Nema mesečnih licenci po zaposlenom: softver je vaše vlasništvo i u njega možete dodati 5 ili 50 radnika bez skoka mesečne pretplate.",
        "Ekran bez viška dugmića: radnik u proizvodnji ili vozač na terenu vidi samo svoja tri dugmeta, bez polja koja ne razume.",
        "Softver prati vaš proces, a ne obrnuto: ne morate menjati organizaciju rada u firmi da biste se uklopili u šablon softverskog giganta.",
      ],
    },
    {
      heading: "Pravilo jednog ekrana: zašto zaposleni odbijaju glomazne ERP-ove",
      body: [
        "Najskuplji softver je onaj koji zaposleni izbegavaju da koriste. Kada radnik na terenu ili u magacinu mora da popuni deset padajućih menija i potvrdi tri dijaloga da bi zabeležio jednu operaciju, on se tiho vrati svesci i papiru.",
        "Namenski softver se pravi oko stvarnih pokreta radnika: jedno dugme za start naloga, jedna slika sa telefona, jedan potpis. Podaci su uneti u sekundi jer nema otpora pri korišćenju.",
      ],
    },
    {
      heading: "Hibridni model: softver po meri za operativu uz vezu sa knjigovodstvom",
      body: [
        "Najbolja praksa za rastuće firme nije izmišljanje tople vode u računovodstvu. Za finansije i poreze zadržava se postojeći knjigovodstveni program, a po meri se razvija samo operativni deo: proizvodnja, nalozi, dispečing ili komunikacija sa klijentima.",
        "Dva sistema se povežu preko API-ja, pa firma dobija maksimalnu brzinu u radu bez narušavanja zakonskog knjigovodstva.",
      ],
    },
  ],
  proofHeading: "Namenski operativni sistemi",
  proof: [
    {
      label: "Prevoz Kop",
      href: "/our-projects/prevoz-kop-logistika-i-flota",
      note: "Namenski operativni sistem za vozila, betonsku bazu i naloge bez glomaznog ERP-a.",
    },
    {
      label: "Dr Igić",
      href: "/our-projects/dr-igic-web-aplikacija-za-estetske-klinike",
      note: "Web aplikacija prilagođena specifičnom protokolu tretmana i kartonima.",
    },
  ],
  faqHeading: "Česta pitanja",
  faq: [
    {
      q: "Da li softver po meri mora da pokrije i knjigovodstvo?",
      a: "Ne preporučujemo. Knjigovodstvo i obračun poreza je najbolje ostaviti proverenim lokalnim programima, a po meri razviti operativu (naloge, magacin, proizvodnju) i povezati ih putem API-ja.",
    },
    {
      q: "Šta se dešava ako programerska firma prestane da održava softver?",
      a: "Izvorni kod i baza podataka ostaju u vašem vlasništvu. Ako se piše na modernim, standardnim tehnologijama (Next.js, Node, PostgreSQL), bilo koji iskusan tim može preuzeti održavanje.",
    },
    {
      q: "Koliko košta izrada operativnog softvera po meri?",
      a: "Namenske web aplikacije za operativu se u proseku kreću od 3.000 do 9.000 €, u zavisnosti od broja modula i integracija. Nakon izrade nema mesečnih licenci po korisniku.",
    },
    {
      q: "Zašto firme odustaju od Odoo-a ili sličnih gotovih rešenja?",
      a: "Najčešće zbog cene prilagođavanja (consulting fees) koja višestruko premaši očekivanja, i zbog prevelike složenosti interfejsa koja stvara otpor kod zaposlenih.",
    },
    {
      q: "Koliko traje razvoj softvera po meri za internu upotrebu?",
      a: "Prva funkcionalna verzija (MVP) sa ključnim modulima se obično pušta u rad za 4 do 8 nedelja, nakon čega se sistem postepeno nadograđuje na osnovu povratnih informacija radnika.",
    },
  ],
  cta: { label: "Opiši gde gotov softver pravi problem u firmi", href: "/upit" },
  secondaryCta: { label: "Usluga: interne poslovne aplikacije", href: "/our-services/interne-poslovne-aplikacije" },
  updated: "2026-09-30",
  related: ["/interni-softver-umesto-excel-tabela", "/mobilna-aplikacija-ili-web-aplikacija", "/kako-interni-softver-stedi-vreme-vlasniku"],
};

export const accountingApiIntegrationGuide: Guide = {
  path: "/povezivanje-sajta-sa-knjigovodstvom-api",
  eyebrow: "Integracije i automatizacija",
  title: "Povezivanje sajta sa knjigovodstvenim programom — API, lager i nalozi",
  metaDescription:
    "Kako povezati web shop ili aplikaciju sa knjigovodstvom (Pantheon, BizniSoft, Wings): automatska sinhronizacija zaliha i cena preko API-ja ili fajlova, bez ručnog prekucavanja.",
  h1: "Povezivanje sajta sa knjigovodstvenim programom",
  lead:
    "Sinhronizacija sajta i poslovnog programa radi se preko API-ja ili automatske razmene podataka (JSON, XML ili CSV). Sistem u zadatim intervalima preuzima ažurne cene i stanje zaliha iz knjigovodstva, dok svaku novu porudžbinu sa sajta automatski upisuje kao nalog za izdavanje ili profakturu, bez ručnog prekucavanja stavki.",
  keywords: [
    "povezivanje sajta sa knjigovodstvom",
    "api sinhronizacija web shop knjigovodstvo",
    "pantheon integracija sajt",
    "automatska sinhronizacija lagera",
    "sinhronizacija cena i zaliha",
    "povezivanje internet prodavnice i erp",
  ],
  sections: [
    {
      heading: "Dva načina povezivanja: direktan API ili periodična razmena fajlova",
      bullets: [
        "Direktan REST API: web shop u realnom vremenu šalje upit bazi knjigovodstva i u sekundi dobija tačno stanje zaliha. Kada kupac završi porudžbinu, ona odmah ulazi u program.",
        "Automatska razmena fajlova (XML/CSV): knjigovodstveni program u zadatim intervalima (npr. na svakih 15 minuta) izvozi stanje na bezbedan server, a sajt preuzima podatke i ažurira katalog.",
        "Webhooks: kada se u magacinu primi nova roba i proknjiži prijemnica, program sam pošalje signal sajtu da podigne stanje lagera.",
      ],
    },
    {
      heading: "Gde firme gube vreme u ručnoj evidenciji",
      body: [
        "Kada sajt i knjigovodstvo ne pričaju, zaposleni rade dvostruki posao. Svaka promena cene u nabavci mora ručno da se unese i u web shop. Svaka online porudžbina mora da se prekuca stavku po stavku u knjigovodstveni program da bi se izdala otpremnica.",
        "Ovaj ručni rad je glavni razlog što sajtovi prodaju artikle kojih zapravo nema na lageru, što dovodi do neprijatnih poziva kupcima, otkazivanja i gubitka poverenja.",
      ],
    },
    {
      heading: "Kako se rešava problem duple prodaje (rezervacija lagera)",
      bullets: [
        "U trenutku kada kupac stavi artikal u korpu ili potvrdi porudžbinu, sistem privremeno rezerviše količinu.",
        "Zaliha na sajtu i u magacinu se odmah umanjuje za tu količinu, tako da drugi kupac u radnji ili online ne može kupiti isti poslednji komad.",
        "Ako porudžbina ne bude plaćena u definisanom roku, rezervacija se automatski oslobađa i vraća na stanje.",
      ],
    },
    {
      heading: "Šta je potrebno pripremiti pre početka integracije",
      bullets: [
        "Tačne kataloške šifre (SKU): svaki artikal u knjigovodstvu mora imati jedinstvenu šifru ili barkod koji se podudara sa šifrom na sajtu.",
        "Definisanje glavnog izvora istine (source of truth): uobičajeno pravilo je da knjigovodstvo diktira cene i osnovne zalihe, dok sajt upravlja opisima, slikama i marketinškim nazivima.",
        "Tehničku dokumentaciju API-ja ili pristup bazi programa od strane vašeg softverskog provajdera.",
      ],
    },
    {
      heading: "Troškovi i održavanje veze dva sistema",
      body: [
        "Integracija nije samo pisanje koda već i stalna provera usklađenosti. Programi s vremena na vreme ažuriraju svoje baze ili menjaju formate polja. Dobro napravljena integracija ima automatski log grešaka koji odmah javlja administratoru ako neki artikal nije mogao da se sinhronizuje.",
      ],
    },
  ],
  proofHeading: "Sistemi za administraciju zaliha",
  proof: [
    {
      label: "Santos & Santorini",
      href: "/our-projects/santos-santorini-web-shop-admin-platforma",
      note: "Sopstveni admin za evidenciju kataloga, zaliha i statusa obrade porudžbina.",
    },
  ],
  faqHeading: "Česta pitanja",
  faq: [
    {
      q: "Može li se svaki knjigovodstveni program povezati sa sajtom?",
      a: "Skoro svaki moderniji program (Pantheon, BizniSoft, Wings, MiniMax, itd.) ima modul za API razmenu ili mogućnost automatskog izvoza i uvoza XML/CSV fajlova.",
    },
    {
      q: "Koliko često se osvežavaju cene i zalihe na sajtu?",
      a: "Kod direktne API veze osvežavanje je trenutno ili na svakih nekoliko minuta, u zavisnosti od podešavanja i opterećenja servera knjigovodstva.",
    },
    {
      q: "Šta se dešava ako pukne internet u firmi ili padne server knjigovodstva?",
      a: "Sajt pamti poslednje stabilno stanje zaliha i čuva nove porudžbine u svojoj bazi. Čim se veza ponovo uspostavi, sistem automatski šalje sve nakupljene porudžbine na obradu.",
    },
    {
      q: "Da li knjigovođa mora ručno da odobrava svaku porudžbinu?",
      a: "Ne mora. Porudžbina može automatski ući u status profakture ili naloga za pakovanje, a zaposleni u magacinu odmah dobija nalog za pripremu robe.",
    },
    {
      q: "Koliko traje izrada integracije sajta i knjigovodstva?",
      a: "Standardna integracija preko gotovog API-ja obično traje 2 do 4 nedelje, uključujući detaljno testiranje prenosa cena, popusta i stanja zaliha.",
    },
  ],
  cta: { label: "Opiši koji poslovni program koristiš", href: "/upit" },
  secondaryCta: { label: "Usluga: interne aplikacije", href: "/our-services/interne-poslovne-aplikacije" },
  updated: "2026-09-30",
  related: ["/b2b-portal-za-veleprodaju", "/fiskalizacija-web-shop-srbija", "/e-fakture-sef-automatski"],
};

export const customSoftwarePricingGuide: Guide = {
  path: "/cena-izrade-softvera-po-meri",
  eyebrow: "Troškovi i investicija",
  title: "Koliko košta izrada softvera po meri — fiksna cena, faze i realni troškovi",
  metaDescription:
    "Realne cene izrade namenskog softvera i poslovnih aplikacija u Srbiji: rasponi od MVP-a do složenih sistema, fiksna cena naspram satnice, i šta utiče na konačan budžet.",
  h1: "Koliko košta izrada softvera po meri?",
  lead:
    "Izrada manjeg namenskog softvera (MVP) u Srbiji kreće se od 2.500 do 5.000 €, dok kompleksniji interni sistemi i web aplikacije iznose od 6.000 do 15.000 € i više. Ključno je raditi u fazama sa definisanim fiksnim opsegom, kako se novac ne bi rasipao na funkcije koje praksa ne traži.",
  keywords: [
    "cena izrade softvera po meri",
    "koliko kosta izrada programa za firmu",
    "razvoj web aplikacije cena srbija",
    "izrada mvp cena",
    "poslovni softver po meri troskovi",
    "fiksna cena ili satnica za softver",
  ],
  sections: [
    {
      heading: "Rasponi cena po složenosti projekta",
      bullets: [
        "Jednostavan interni alat ili MVP (2.500–5.000 €): automatizacija jednog toka rada, evidencija klijenata i naloga, digitalni unos sa terena bez viška funkcija.",
        "Kompleksna web aplikacija (6.000–12.000 €): više uloga zaposlenih (magacin, prodaja, uprava), povezivanje sa knjigovodstvom, slanje SMS/Viber notifikacija i napredni izveštaji.",
        "Složena platforma ili SaaS sistem (12.000–25.000+ €): višekorisnički pristup, naplata pretplata, obrada velikog broja podataka u realnom vremenu i namenske integracije.",
      ],
    },
    {
      heading: "Fiksna cena ili satnica: gde klijenti gube kontrolu",
      body: [
        "Plaćanje po utrošenom satu (time & material) zvuči fleksibilno, ali prebacuje sav rizik probijanja budžeta na firmu koja naručuje softver. Ako programeri naiđu na neočekivani problem, račun se uvećava.",
        "Zato se uvek preporučuje fiksna cena po jasno definisanoj fazi: tačno se zna šta se isporučuje, kog datuma i koliko to košta. Svaka naknadna želja procenjuje se posebno pre početka rada.",
      ],
    },
    {
      heading: "Zašto se počinje od MVP verzije umesto od „savršenog sistema“",
      bullets: [
        "MVP (Minimum Viable Product) pokriva samo one funkcije bez kojih firma danas ne može da radi.",
        "Sistem se pušta u rad za 4–6 nedelja umesto da se čeka godinu dana.",
        "Stvarni radnici odmah daju povratne informacije, pa se druga faza gradi na osnovu realnih potreba, a ne pretpostavki iz kancelarije.",
      ],
    },
    {
      heading: "Skriveni troškovi o kojima se retko priča pre ugovora",
      bullets: [
        "Server i infrastruktura: baze podataka i hosting (uglavnom 20–80 € mesečno za manji sistem).",
        "Troškovi eksternih servisa: SMS provajderi, WhatsApp Business poruke, servisi za digitalne račune ili mape.",
        "Obuka i prilagođavanje zaposlenih: vreme potrebno da tim prestane da vodi paralelne papire.",
      ],
    },
    {
      heading: "Mesečno održavanje i podrška: šta se plaća nakon puštanja",
      body: [
        "Softver je živa stvar. Nakon puštanja u rad menjaju se verzije pretraživača, sigurnosni protokoli i poslovne potrebe. Održavanje garantuje redovan backup baze, hitne ispravke ako nešto stane i sitna prilagođavanja kako firma raste.",
      ],
    },
  ],
  proofHeading: "Sistemi razvijani u fazama",
  proof: [
    {
      label: "Prevoz Kop",
      href: "/our-projects/prevoz-kop-logistika-i-flota",
      note: "Namenski dispečerski i prodajni sistem izgrađen po fazama.",
    },
    {
      label: "Dr Igić",
      href: "/our-projects/dr-igic-web-aplikacija-za-estetske-klinike",
      note: "Specijalizovana web aplikacija za kliniku sa etapnim razvojem funkcija.",
    },
  ],
  faqHeading: "Česta pitanja",
  faq: [
    {
      q: "Šta tačno ulazi u cenu prve verzije (MVP)?",
      a: "Arhitektura baze, dizajn prilagođen telefonima i računarima, ključne funkcionalnosti za rad, uvoz postojećih podataka i obuka tima za korišćenje.",
    },
    {
      q: "Zašto je fiksna cena sigurnija za firmu od plaćanja po satu?",
      a: "Zato što unapred znate konačan iznos pre nego što uložite prvi evro. Rizik sporijeg rada ili komplikacija snosi izvođač, a ne vi.",
    },
    {
      q: "Ko je vlasnik izvornog koda i baze podataka?",
      a: "Nakon isplate svih faza, firma koja je naručila softver postaje puni vlasnik izvornog koda i svih prikupljenih podataka, bez ugovornog vezivanja za jednu agenciju.",
    },
    {
      q: "Koliko košta mesečno održavanje softvera nakon izrade?",
      a: "Mesečno održavanje se obično kreće od 100 do 350 € u zavisnosti od obima podrške, brzine odziva i serverske infrastrukture.",
    },
    {
      q: "Šta ako u toku razvoja poželimo nove funkcije?",
      a: "Nove ideje se evidentiraju i procenjuju kao sledeća faza ili aneks ugovora sa fiksnom cenom, kako se ne bi ugrozio rok i budžet osnovnog sistema.",
    },
  ],
  cta: { label: "Opiši šta softver treba da radi", href: "/upit" },
  secondaryCta: { label: "Usluga: interne poslovne aplikacije", href: "/our-services/interne-poslovne-aplikacije" },
  updated: "2026-09-30",
  related: ["/interni-softver-umesto-excel-tabela", "/gotov-erp-crm-ili-softver-po-meri", "/koliko-traje-izrada-sajta"],
};

export const webflowVsWordpressVsCustomGuide: Guide = {
  path: "/webflow-ili-wordpress-ili-custom-sajt",
  eyebrow: "Izbor CMS platforme",
  title: "Webflow, WordPress ili Custom sajt — šta izabrati za firmu u 2026.",
  metaDescription:
    "Poređenje Webflow, WordPress i Custom koda (Next.js): skriveni troškovi Webflow pretplata, bezbednost i dodaci na WordPress-u, i kada se isplati čist kod po meri.",
  h1: "Webflow, WordPress ili Custom sajt?",
  lead:
    "Webflow je odličan za dizajnerske sajtove sa brzim vizuelnim promenama ako ste spremni na mesečnu pretplatu u dolarima. WordPress je dobar za blogove i uobičajene prezentacije sa domaćim hostingom. Custom sajt (Next.js) isplati se kada tražite maksimalnu brzinu, vrhunski SEO, potpunu bezbednost i bazu bez zavisnosti od tuđih platformi.",
  keywords: [
    "webflow ili wordpress",
    "webflow ili custom sajt",
    "da li se isplati webflow srbija",
    "wordpress alternative za firmu",
    "nextjs sajt prednosti",
    "koja platforma za sajt firme",
  ],
  sections: [
    {
      heading: "Kako naplaćuje Webflow i gde su skriveni limiti",
      bullets: [
        "Mesečna pretplata u dolarima po sajtu (Workspace plan + Site plan), što kroz godine iznosi stotine evra godišnje samo za prisustvo.",
        "Stroga ograničenja CMS stavki (npr. limit od 2.000 ili 10.000 unosa u zavisnosti od paketa).",
        "Ograničene mogućnosti za domaće platne procesore (kartice srpskih banaka) i specifične lokalne integracije.",
        "Sav sadržaj i kod nalaze se na njihovim serverima; u slučaju promene politike cena nemate gde da prebacite sajt jednim klikom.",
      ],
    },
    {
      heading: "WordPress prednosti i gde nastaju bezbednosni problemi",
      bullets: [
        "Ogromna zajednica i jeftin početak: možete koristiti bilo koji hosting i instalirati ga besplatno.",
        "Problem „groblja dodataka“: prosečan WordPress sajt posle dve godine ima 30+ pluginova različitih autora koji usporavaju učitavanje i stalno otvaraju bezbednosne rupe.",
        "Potreba za stalnim ažuriranjima: ako ne ažurirate redovno, sajt biva hakovan; ako ažurirate bez provere, tema ili forma mogu da puknu.",
      ],
    },
    {
      heading: "Kada se custom kod isplati kroz brzinu i SEO",
      body: [
        "Custom sajt izgrađen na modernim tehnologijama (Next.js, TypeScript) servira čiste statičke stranice i optimizovane slike bez baze koja se vrti pri svakoj poseti. To donosi maksimalne ocene na Google Core Web Vitals (brzina odziva ispod jedne sekunde).",
        "AI pretraživači i Google crawler-i daju prioritet brzim, čistim stranicama sa semantičkim HTML-om i preciznim strukturiranim podacima, što custom arhitektura omogućava bez kompromisa.",
      ],
    },
    {
      heading: "Poređenje troškova kroz 3 godine: pretplate vs održavanje",
      bullets: [
        "Webflow: umerena cena izrade, ali visoke fiksne pretplate svakog meseca koje nikada ne prestaju.",
        "WordPress: niska početna cena, ali česti nepredviđeni troškovi popravki, bagova nakon ažuriranja i plaćenih dodataka.",
        "Custom kod: viša početna investicija u izradu, ali stabilan rad bez zavisnosti od mesečnih pretplata na platforme i bezbednost bez virusa.",
      ],
    },
    {
      heading: "Kriterijumi za izbor prema tipu vašeg biznisa",
      bullets: [
        "Izaberite Webflow: ako ste marketinška agencija ili dizajner koji želi samostalno da pomera elemente svaki dan i ne treba vam kompleksna baza.",
        "Izaberite WordPress: ako imate standardan sajt sa redovnim blog tekstovima i umerenim zahtevima za brzinom.",
        "Izaberite Custom sajt: ako sajt treba da donosi ozbiljne upite, integriše se sa internim sistemima, ima visoke zahteve za brzinom i trajnu bezbednost.",
      ],
    },
  ],
  proofHeading: "Sistemi bez kompromisa u brzini",
  proof: [
    {
      label: "Santos & Santorini",
      href: "/our-projects/santos-santorini-web-shop-admin-platforma",
      note: "Custom arhitektura bez ograničenja gotovih tema i CMS platformi.",
    },
    {
      label: "Doctor Barber",
      href: "/our-projects/doctor-barber-online-booking-sistem",
      note: "Čist custom kod sa brzim učitavanjem na mobilnim telefonima.",
    },
  ],
  faqHeading: "Česta pitanja",
  faq: [
    {
      q: "Da li je Webflow skuplji od WordPress-a?",
      a: "Kroz period od dve do tri godine Webflow često ispadne skuplji zbog mesečnih licenci po sajtu i po korisniku u dolarima, dok WordPress ima samo trošak hostinga i domena.",
    },
    {
      q: "Mogu li u Webflow-u da imam domaće plaćanje karticama?",
      a: "Veoma teško bez zaobilaznih skupih skripti i servisa treće strane, jer Webflow E-commerce izvorno podržava samo Stripe i PayPal koji u Srbiji imaju zakonska ograničenja.",
    },
    {
      q: "Da li Google daje prednost custom sajtovima u odnosu na WordPress?",
      a: "Google ne nagrađuje tehnologiju direktno, već brzinu učitavanja, Core Web Vitals metrike i čistu strukturu koda — oblasti u kojima moderan custom sajt redovno pobeđuje WordPress.",
    },
    {
      q: "Da li na custom sajtu klijent može sam da menja tekstove i slike?",
      a: "Da. Klijent dobija jednostavan admin panel ili headless CMS prilagođen njegovim tačnim poljima, bez rizika da slučajno pokvari dizajn ili raspored na telefonu.",
    },
    {
      q: "Šta se dešava ako Webflow podigne cene ili ugasi nalog?",
      a: "Kod Webflow-a ste zaključani u njihovom ekosistemu. Kod custom sajta ili WordPress-a, vi posedujete kod i bazu i možete promeniti hosting provajdera bilo kada.",
    },
  ],
  cta: { label: "Opiši potrebe sajta za tvoju firmu", href: "/upit" },
  secondaryCta: { label: "Usluga: web prezentacije", href: "/our-services/web-prezentacije" },
  updated: "2026-09-30",
  related: ["/wordpress-ili-custom-sajt", "/sta-mora-da-ima-moderan-sajt-firme", "/koliko-traje-izrada-sajta"],
};


