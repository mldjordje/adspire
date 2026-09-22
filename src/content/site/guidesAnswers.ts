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
    "/gotova-aplikacija-ili-svoj-sistem-za-zakazivanje",
    "/online-zakazivanje-za-salone-i-klinike",
    "/ai-chatbot-za-sajt",
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
