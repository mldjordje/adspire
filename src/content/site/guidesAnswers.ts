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
