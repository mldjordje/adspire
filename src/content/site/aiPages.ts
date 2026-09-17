/**
 * AI landing pages, one per industry.
 *
 * The rest of the site sells "izrada sajta". These pages sell the other half of
 * the offer — the work that removes a repeating daily task — and they are the
 * pages an answer engine can actually quote, because each one opens with a
 * direct answer instead of a slogan.
 *
 * Two rules kept these from becoming a doorway set:
 *
 * 1. No page repeats another page's tasks. A salon's AI problem (no-shows,
 *    phone during a haircut) has nothing in common with a transport firm's
 *    (quoting a route, reading a delivery note). If a new industry cannot
 *    describe a problem in its own vocabulary, it does not get a page.
 * 2. No invented numbers. Nothing here claims a percentage, a saved hour or a
 *    revenue lift, because no client has sent one yet. Capability statements
 *    only — the same limit /llms.txt already declares. When real figures
 *    arrive they go in `proof`, not in the prose.
 */

import { aiIndexDe, aiPagesDe } from "@/content/site/aiPages.de";
import { aiIndexEn, aiPagesEn } from "@/content/site/aiPages.en";
import type { LocaleCode } from "@/lib/site-config";

export type AiTask = {
  name: string;
  /** The daily annoyance, in the owner's words — not the technology. */
  problem: string;
  solution: string;
  /** What is actually handed over, so "AI" stays a deliverable and not a mood. */
  delivery: string;
};

export type AiSection = {
  heading: string;
  body?: string[];
  bullets?: string[];
};

export type AiProof = {
  label: string;
  href: string;
  note: string;
};

export type AiHowTo = {
  name: string;
  steps: { name: string; text: string }[];
};

export type AiPage = {
  slug: string;
  /** Plain industry noun, reused in schema and in the hub table. */
  industry: string;
  eyebrow: string;
  title: string;
  metaDescription: string;
  h1: string;
  lead: string;
  /**
   * AEO block. Rendered as the first paragraph of the body and marked with
   * data-answer. Answer engines lift the opening paragraph under an H1, so it
   * has to answer the query on its own, without the page around it.
   */
  answer: string;
  keywords: string[];
  /** Service schema name — matches how the buyer would name the job. */
  serviceName: string;
  tasks: AiTask[];
  sections: AiSection[];
  howTo: AiHowTo;
  proofHeading?: string;
  proof?: AiProof[];
  faq: { q: string; a: string }[];
  relatedServices: { label: string; href: string }[];
};

export function aiPagePath(slug: string): string {
  return `/ai/${slug}`;
}

/** Steps are the same process everywhere; only the examples change per page. */
const HOW_TO_NAME = "Kako se AI uvodi u firmu";

const salonsClinics: AiPage = {
  slug: "saloni-i-klinike",
  industry: "Saloni i klinike",
  eyebrow: "AI po delatnosti",
  title: "AI za salone i klinike — zakazivanje, podsetnici, odgovori",
  metaDescription:
    "Kako AI konkretno pomaže frizerskim salonima, estetskim i stomatološkim klinikama: zakazivanje bez telefona, podsetnici protiv nedolazaka, odgovori na poruke van radnog vremena.",
  h1: "AI za salone i klinike",
  lead:
    "Salon i klinika nemaju problem sa marketingom nego sa telefonom. Zvoni dok radiš, poruke stižu u 23h, a jedan nedolazak ubija ceo termin. To su poslovi koje softver preuzima u celosti.",
  answer:
    "AI u salonu ili klinici najviše vredi na tri mesta: prima zakazivanje kroz poruke i sajt bez ijednog poziva, sam šalje podsetnik pred termin i traži potvrdu, i odgovara na uobičajena pitanja o cenama, trajanju i pripremi kada niko ne gleda telefon. Sve troje radi nad tvojim kalendarom i tvojim cenovnikom, ne nad opštim odgovorima — pa termin koji potvrdi zaista postoji, a odgovor koji da je tvoj.",
  keywords: [
    "AI za salone",
    "AI za klinike",
    "veštačka inteligencija frizerski salon",
    "automatsko zakazivanje termina",
    "chatbot za salon",
    "podsetnik za termin SMS",
    "AI recepcionar",
  ],
  serviceName: "AI i automatizacija za salone i klinike",
  tasks: [
    {
      name: "Zakazivanje bez poziva",
      problem:
        "Klijent zove usred tretmana. Ne javiš se, on ode kod prvog ko se javi.",
      solution:
        "Zakazivanje na sajtu i kroz Instagram/WhatsApp poruku, nad realnim kalendarom — vidi samo termine koji su stvarno slobodni za tu uslugu i tog radnika.",
      delivery:
        "Stranica za zakazivanje, admin kalendar i pravila trajanja po usluzi.",
    },
    {
      name: "Podsetnik i potvrda termina",
      problem:
        "Nedolazak bez javljanja. Termin je prazan, a lista čekanja postoji.",
      solution:
        "Automatska poruka 24h i 2h pre termina sa dugmetom za potvrdu ili otkazivanje. Otkazan termin se odmah nudi sledećem sa liste.",
      delivery: "Šablon poruka, raspored slanja i lista čekanja u admin panelu.",
    },
    {
      name: "Odgovori van radnog vremena",
      problem:
        "Ista pitanja svaki dan: koliko traje, koliko košta, da li se sme posle bojenja, imate li slobodno u subotu.",
      solution:
        "Asistent obučen na tvom cenovniku i tvojim uputstvima za pripremu odgovara odmah, a ono što ne zna prosleđuje tebi umesto da izmišlja.",
      delivery: "Chat na sajtu i u poruci, sa bazom pitanja koju sam menjaš.",
    },
    {
      name: "Karton klijenta",
      problem:
        "Šta je radio prošli put, koja boja, koja igla, na šta je alergičan — u svesci ili u glavi.",
      solution:
        "Istorija tretmana uz klijenta, sa fotografijama pre/posle i beleškom koja iskoči čim se otvori termin.",
      delivery: "Evidencija klijenata sa istorijom, napomenama i pretragom.",
    },
    {
      name: "Povratak klijenta u pravom trenutku",
      problem:
        "Klijent koji dolazi na 6 nedelja jednostavno prestane da dolazi i to niko ne primeti.",
      solution:
        "Sistem prati ritam svakog klijenta i javi kad neko kasni sa dolaskom — jedna poruka, ne kampanja.",
      delivery: "Lista klijenata za povratak, sa predlogom termina.",
    },
    {
      name: "Sadržaj za mreže",
      problem:
        "Objava mora da izađe, a posle 10 sati rada niko ne piše opise.",
      solution:
        "Iz fotografije tretmana se dobija opis, hashtagovi i predlog termina objave — ti samo odobriš.",
      delivery: "Alat za opise sa tvojim tonom i tvojim uslugama.",
    },
  ],
  sections: [
    {
      heading: "Gde AI u salonu ne pomaže",
      body: [
        "Ovo se najčešće očekuje, pa da se odmah zna. AI ne dovodi nove klijente sam po sebi — dovodi ih preporuka, lokacija, mreže i cena. AI čuva one koje već imaš i vraća sate koje danas gubiš na telefon.",
      ],
      bullets: [
        "Ne zamenjuje recepciju u salonu sa velikim protokom ljudi uživo.",
        "Ne procenjuje da li je tretman medicinski opravdan — to ostaje na tebi.",
        "Ne rešava loše postavljene cene ni raspored koji ne štima.",
      ],
    },
    {
      heading: "Šta se radi prvo",
      body: [
        "Ako se uvodi sve odjednom, ništa ne zaživi. Redosled koji radi: prvo zakazivanje, pa podsetnici, pa odgovori. Zakazivanje daje kalendar, kalendar daje podsetnike, a tek kad ima podataka ima smisla obučavati asistenta.",
      ],
    },
  ],
  howTo: {
    name: HOW_TO_NAME,
    steps: [
      {
        name: "Sat vremena razgovora",
        text: "Prođemo kroz jedan tvoj radni dan i izdvojimo šta se ponavlja. Bez naplate i bez obaveze.",
      },
      {
        name: "Jedan posao, ne svi",
        text: "Biramo jedan zadatak sa najviše ponavljanja — kod salona je to skoro uvek zakazivanje.",
      },
      {
        name: "Uvođenje u dve do četiri nedelje",
        text: "Sistem se pušta na tvom kalendaru i tvojim cenama, sa tvojim postojećim sajtom ili novim.",
      },
      {
        name: "Dve nedelje rada uporedo",
        text: "Stari način ostaje dok se ne vidi da novi hvata sve slučajeve, uključujući otkazivanja i pomeranja.",
      },
      {
        name: "Sledeći posao",
        text: "Tek kad prvi radi sam, dodaje se drugi. Podsetnici, pa odgovori, pa karton.",
      },
    ],
  },
  proofHeading: "Sistemi ovog tipa koji rade",
  proof: [
    {
      label: "Doctor Barber",
      href: "/our-projects/doctor-barber-online-booking-sistem",
      note: "Online booking sa admin panelom, pomeranjem termina i podsetnicima.",
    },
    {
      label: "Dr Igić",
      href: "/our-projects/dr-igic-web-aplikacija-za-estetske-klinike",
      note: "Web aplikacija za estetske klinike — zakazivanje i evidencija pacijenata.",
    },
  ],
  faq: [
    {
      q: "Da li klijenti moraju da instaliraju aplikaciju?",
      a: "Ne. Zakazivanje radi u pretraživaču, sa linka na sajtu, iz Instagram bio-a ili iz poruke. Ništa se ne instalira.",
    },
    {
      q: "Šta ako klijent i dalje hoće da zove?",
      a: "Telefon ostaje. Poenta nije da se ukine poziv nego da većina zakazivanja prestane da ide preko njega, pa oni koji zovu dobiju pravu pažnju.",
    },
    {
      q: "Da li podsetnici idu SMS-om ili preko Vibera i WhatsApp-a?",
      a: "Zavisi od toga gde su tvoji klijenti. Mejl i Viber/WhatsApp su najjeftiniji, SMS je najsigurniji za starije klijente. Kombinacija se bira po ceni po poruci.",
    },
    {
      q: "Kako se čuvaju podaci pacijenata?",
      a: "Podaci ostaju u tvojoj bazi, sa pristupom po nalogu i evidencijom ko je šta gledao. Za klinike to nije opcija nego uslov — obrada podataka o zdravlju traži pravni osnov i ograničen pristup.",
    },
    {
      q: "Šta ako mi ne odgovara posle mesec dana?",
      a: "Kod i podaci su tvoji od isporuke. Nema zaključavanja u platformu iz koje se ne može izaći sa svojom bazom klijenata.",
    },
  ],
  relatedServices: [
    { label: "Sistemi za zakazivanje", href: "/our-services/sistemi-za-zakazivanje" },
    { label: "AI integracije i automatizacija", href: "/our-services/ai-integracije-automatizacija" },
    { label: "Online zakazivanje za salone i klinike", href: "/online-zakazivanje-za-salone-i-klinike" },
  ],
};

const transportLogistics: AiPage = {
  slug: "transport-i-logistika",
  industry: "Transport i logistika",
  eyebrow: "AI po delatnosti",
  title: "AI za transport i logistiku — ponude, nalozi, papiri",
  metaDescription:
    "Kako AI pomaže transportnim firmama: brza ponuda za relaciju, nalozi za vozače bez papira, čitanje otpremnica i faktura, praćenje troška po vozilu.",
  h1: "AI za transport i logistiku",
  lead:
    "U transportu se novac gubi između poziva i naloga. Ponuda se računa napamet, nalog se diktira telefonom, a otpremnica se prekucava uveče. Svaki od ta tri koraka može da radi sam.",
  answer:
    "U transportnoj firmi AI najpre isplati na dva mesta: računanju ponude za relaciju i obradi papira. Ponuda se dobija iz tvoje tabele cena, kilometraže i tipa tereta za nekoliko sekundi umesto da se traži dispečer, a otpremnice, tovarni listovi i ulazne fakture se čitaju sa slike i sami upisuju u evidenciju, pa se uveče ne prekucava. Treće mesto je nalog vozaču — umesto poziva, vozač dobija zadatak na telefon i vraća potpis i sliku sa terena.",
  keywords: [
    "AI za transport",
    "softver za transportnu firmu",
    "automatska ponuda za prevoz",
    "nalog za vozača aplikacija",
    "čitanje otpremnice AI",
    "digitalizacija špedicije",
  ],
  serviceName: "AI i automatizacija za transport i logistiku",
  tasks: [
    {
      name: "Ponuda za relaciju u sekundama",
      problem:
        "Stigne upit za relaciju, a cena se računa tek kad se javi neko ko zna kilometražu i tarifu.",
      solution:
        "Iz relacije, tipa tereta i tvoje tarife izlazi cena odmah, sa maržom koju si ti postavio. Neuobičajen slučaj ide tebi na potvrdu umesto da se pogodi.",
      delivery: "Kalkulator ponude nad tvojim cenovnikom i PDF ponuda na mejl.",
    },
    {
      name: "Nalog vozaču bez telefona",
      problem:
        "Dispečer zove vozača, vozač zapisuje na papir, papir se izgubi ili se pogrešno pročita.",
      solution:
        "Vozač dobija nalog na telefon sa adresom, kontaktom i teretom, i vraća potvrdu, potpis i fotografiju sa lica mesta.",
      delivery: "Vozački prikaz u pretraživaču, bez instalacije, radi i offline.",
    },
    {
      name: "Papiri sa slike",
      problem:
        "Otpremnice, tovarni listovi i ulazne fakture se prekucavaju ručno, uveče, sa greškama.",
      solution:
        "Slika dokumenta se čita i sama popunjava polja — broj, datum, iznos, kupac. Ti samo potvrdiš ono što je sistem označio kao nesigurno.",
      delivery: "Ulazna kutija dokumenata sa proverom pre knjiženja.",
    },
    {
      name: "Trošak po vozilu i po vožnji",
      problem:
        "Zna se ukupan promet, ne zna se koje vozilo i koja relacija zapravo nose gubitak.",
      solution:
        "Gorivo, putarina, servis i vozačevi sati se vežu za konkretnu vožnju, pa se marža vidi po relaciji, ne samo po mesecu.",
      delivery: "Izveštaj po vozilu, vozaču i relaciji, sa izvozom u tabelu.",
    },
    {
      name: "Rokovi koji koštaju",
      problem:
        "Registracija, tahograf, ADR, lekarski, servisni interval — propušten rok je kazna ili stajanje.",
      solution:
        "Svi rokovi na jednom mestu, sa upozorenjem unapred i zaduženim čovekom.",
      delivery: "Evidencija rokova sa podsetnicima na mejl.",
    },
    {
      name: "Odgovor na upit sa sajta",
      problem:
        "Upit stigne noću, odgovor ide ujutru, posao ode onom ko je odgovorio prvi.",
      solution:
        "Upit se odmah kvalifikuje — relacija, teret, rok, kontakt — i dobija okvirni odgovor ili poziv na dopunu podataka.",
      delivery: "Forma za upit sa automatskim odgovorom i unosom u evidenciju.",
    },
  ],
  sections: [
    {
      heading: "Zašto baš papiri",
      body: [
        "Kod prevoznika je najveći trošak koji se ne vidi u knjigama — sat i po dnevno na prekucavanje. To nije posao koji traži pamet, nego posao koji traži tačnost, a tu mašina greši ređe od čoveka u 21h. Zato se u transportu skoro uvek počinje od dokumenata, ne od chatbota.",
      ],
    },
    {
      heading: "Šta ostaje na čoveku",
      bullets: [
        "Pregovor o ceni sa stalnim kupcem — tu se odnos, a ne tarifa, prodaje.",
        "Odluka šta se vozi kad se dva posla poklope.",
        "Potvrda svakog dokumenta koji sistem označi kao nesiguran.",
        "Sve što ima pravnu posledicu — CMR, reklamacija, šteta.",
      ],
    },
  ],
  howTo: {
    name: HOW_TO_NAME,
    steps: [
      {
        name: "Sat vremena razgovora",
        text: "Prođemo put jednog posla od upita do naplate i vidimo gde stoji.",
      },
      {
        name: "Jedan posao, ne svi",
        text: "U transportu je to obično ponuda ili obrada dokumenata — ono što se radi svakog dana.",
      },
      {
        name: "Uvođenje u dve do četiri nedelje",
        text: "Radi se nad tvojim tarifama i tvojim obrascima dokumenata, ne nad opštim šablonom.",
      },
      {
        name: "Dve nedelje rada uporedo",
        text: "Sistem i stari način rade paralelno dok se ne uporedi tačnost na realnim dokumentima.",
      },
      {
        name: "Sledeći posao",
        text: "Kad papiri rade sami, na red dolaze nalozi vozačima i izveštaj po vozilu.",
      },
    ],
  },
  proofHeading: "Sistemi ovog tipa koji rade",
  proof: [
    {
      label: "Prevoz Kop",
      href: "/our-projects/prevozkop-digitalni-prodajni-operativni-sistem",
      note: "Prodajni i operativni sistem za transportnu firmu — upiti, ponude i evidencija na jednom mestu.",
    },
  ],
  faq: [
    {
      q: "Da li ovo zamenjuje program za knjigovodstvo?",
      a: "Ne. Knjigovodstvo ostaje gde jeste — ovo mu šalje uredne, već pročitane podatke umesto gomile papira na kraju meseca.",
    },
    {
      q: "Koliko je tačno čitanje otpremnica?",
      a: "Zavisi od kvaliteta slike i od toga koliko su obrasci ujednačeni. Zato se svaki dokument ispod praga sigurnosti šalje čoveku na potvrdu — sistem ne knjiži ono u šta nije siguran.",
    },
    {
      q: "Vozači nisu za tehniku. Da li će ovo koristiti?",
      a: "Vozački prikaz je jedan ekran sa tri dugmeta i radi iz linka, bez naloga i instalacije. Ako traži više od toga, nije dobro napravljen.",
    },
    {
      q: "Imamo već GPS praćenje. Da li se to povezuje?",
      a: "Da, ako sistem koji koristiš ima pristup podacima. Kilometraža i vreme se onda povlače sami umesto da se unose.",
    },
  ],
  relatedServices: [
    { label: "Interne poslovne aplikacije", href: "/our-services/interne-poslovne-aplikacije" },
    { label: "AI integracije i automatizacija", href: "/our-services/ai-integracije-automatizacija" },
    { label: "Interni softver umesto Excel tabela", href: "/interni-softver-umesto-excel-tabela" },
  ],
};

const hospitality: AiPage = {
  slug: "ugostiteljstvo-i-catering",
  industry: "Ugostiteljstvo i catering",
  eyebrow: "AI po delatnosti",
  title: "AI za restorane i catering — rezervacije, ponude, meni",
  metaDescription:
    "Kako AI pomaže restoranima i catering firmama: rezervacije bez telefona, ponuda za događaj iz upita, meni na više jezika, odgovori na alergene i termine.",
  h1: "AI za ugostiteljstvo i catering",
  lead:
    "Restoran gubi na rezervacijama koje se ne zapišu, catering na ponudama koje se šalju tri dana. Oba posla imaju isti obrazac: upit stigne, a odgovor kasni.",
  answer:
    "U ugostiteljstvu AI najviše menja brzinu odgovora. Rezervacija se prima kroz sajt i poruke nad stvarnim rasporedom stolova, a kod cateringa se iz upita — broj gostiju, datum, tip događaja, meni — sastavlja ponuda sa cenom po osobi za nekoliko minuta umesto za nekoliko dana. Uz to ide odgovaranje na pitanja koja se ponavljaju: alergeni, sastav jela, parking, do kad se drži termin.",
  keywords: [
    "AI za restoran",
    "rezervacije stolova online",
    "catering ponuda automatski",
    "AI meni prevod",
    "chatbot za restoran",
    "softver za catering",
  ],
  serviceName: "AI i automatizacija za ugostiteljstvo i catering",
  tasks: [
    {
      name: "Rezervacija stola bez poziva",
      problem:
        "Gost zove u špicu, niko se ne javi, rezervacija ode konkurenciji na dva ćoška dalje.",
      solution:
        "Rezervacija sa sajta, Google profila i poruke, nad stvarnim rasporedom stolova i trajanjem obroka.",
      delivery: "Stranica za rezervaciju, prikaz sale i potvrda gostu.",
    },
    {
      name: "Ponuda za događaj iz upita",
      problem:
        "Upit za svadbu ili firmsku večeru traži sat vremena računanja, pa se odgovori sutra.",
      solution:
        "Iz broja gostiju, datuma i izabranog menija izlazi ponuda sa cenom po osobi i stavkama, spremna za tvoju izmenu pre slanja.",
      delivery: "Formular za događaj i generator ponude u PDF-u.",
    },
    {
      name: "Alergeni i sastav jela",
      problem:
        "Pitanje o glutenu, orasima ili posnom jelu stiže svakodnevno i traži tačan odgovor.",
      solution:
        "Asistent odgovara isključivo iz tvoje deklaracije jela — ono što nije upisano ne izmišlja, nego prosleđuje kuhinji.",
      delivery: "Baza jela sa sastojcima i alergenima, ista za sajt i za chat.",
    },
    {
      name: "Meni na više jezika",
      problem:
        "Turista dobije meni koji ne razume, ili prevod koji je smešan.",
      solution:
        "Jedan izvor menija se objavljuje na srpskom, engleskom i nemačkom, sa opisima jela koje čovek proveri jednom pa važe.",
      delivery: "Digitalni meni sa QR kodom i izmenom cena na jednom mestu.",
    },
    {
      name: "Nabavka po potrošnji",
      problem:
        "Naruči se previše, baci se, ili nedostane u petak uveče.",
      solution:
        "Iz prodaje po danima i sezoni izlazi predlog porudžbine, koji šef kuhinje odobrava ili menja.",
      delivery: "Izveštaj potrošnje i predlog nabavke po dobavljaču.",
    },
    {
      name: "Recenzije i odgovori",
      problem:
        "Google recenzija stoji bez odgovora nedeljama, a to vide svi budući gosti.",
      solution:
        "Predlog odgovora se priprema u tvom tonu i čeka jedan klik — negativna recenzija ide tebi obavezno, nikad automatski.",
      delivery: "Pregled recenzija sa predlozima odgovora.",
    },
  ],
  sections: [
    {
      heading: "Razlika između restorana i cateringa",
      body: [
        "Izgleda kao isti posao, a nije. Restoran živi od ponavljanja i brzine u špicu — tu se dobija na rezervaciji i na odgovoru u minutu. Catering živi od nekoliko velikih poslova godišnje, gde jedna izgubljena ponuda vredi kao mesec restoranskog prometa. Zato se kod restorana prvo radi rezervacija, a kod cateringa prvo ponuda.",
      ],
    },
    {
      heading: "Šta se ne automatizuje",
      bullets: [
        "Potvrda velikog događaja — to je uvek razgovor, ne formular.",
        "Odgovor na ozbiljnu žalbu gosta.",
        "Izmena menija i cena bez ljudske provere.",
        "Bilo šta što se tiče alergena, a nije upisano u deklaraciju.",
      ],
    },
  ],
  howTo: {
    name: HOW_TO_NAME,
    steps: [
      {
        name: "Sat vremena razgovora",
        text: "Vidimo koliko upita dnevno stiže i kroz koji kanal — telefon, Instagram, Google, sajt.",
      },
      {
        name: "Jedan posao, ne svi",
        text: "Restoran počinje od rezervacije, catering od ponude za događaj.",
      },
      {
        name: "Uvođenje u dve do četiri nedelje",
        text: "Radi se nad tvojim rasporedom sale i tvojim menijem sa cenama.",
      },
      {
        name: "Dve nedelje rada uporedo",
        text: "Telefonska rezervacija ostaje dok se ne vidi da online hvata i špic i otkazivanja.",
      },
      {
        name: "Sledeći posao",
        text: "Zatim meni, alergeni i recenzije — po redu koji tebi najviše smeta.",
      },
    ],
  },
  proofHeading: "Sistemi ovog tipa koji rade",
  proof: [
    {
      label: "Santos & Santorini",
      href: "/our-projects/santos-santorini-web-shop-admin-platforma",
      note: "Web shop i admin platforma — porudžbine i katalog na jednom mestu.",
    },
  ],
  faq: [
    {
      q: "Imamo profil na Google-u, treba li nam i sajt?",
      a: "Za rezervacije je Google profil dovoljan da te nađu, ali ne i da te izaberu. Meni, cene, sala i uslovi za događaj su ono što gost traži pre nego što rezerviše, a to na profilu ne staje.",
    },
    {
      q: "Da li rezervacije mogu da se prime i preko Instagrama?",
      a: "Da. Link vodi na isti kalendar, pa se rezervacija sa Instagrama i sa sajta vide na jednom mestu i ne mogu da se preklope.",
    },
    {
      q: "Ko unosi meni i cene?",
      a: "Ti, kroz admin. To je namerno — meni se menja češće nego što bi iko hteo da čeka na agenciju.",
    },
    {
      q: "Šta ako gost pita nešto što asistent ne zna?",
      a: "Prosleđuje. Asistent koji izmišlja sastav jela je opasniji od asistenta koji ćuti, pa je granica postavljena strogo.",
    },
  ],
  relatedServices: [
    { label: "Sistemi za zakazivanje", href: "/our-services/sistemi-za-zakazivanje" },
    { label: "Web prezentacije", href: "/our-services/web-prezentacije" },
    { label: "AI integracije i automatizacija", href: "/our-services/ai-integracije-automatizacija" },
  ],
};

const ecommerce: AiPage = {
  slug: "web-shop-i-trgovina",
  industry: "Web shop i trgovina",
  eyebrow: "AI po delatnosti",
  title: "AI za web shop — opisi, pretraga, podrška, reklamacije",
  metaDescription:
    "Kako AI pomaže web shopovima: opisi proizvoda iz specifikacije, pretraga koja razume pitanje, odgovori na status porudžbine i obrada reklamacija.",
  h1: "AI za web shop i trgovinu",
  lead:
    "Web shop sa hiljadu artikala ima dva problema koja se ne rešavaju zapošljavanjem: opisi koje niko ne stigne da napiše i pitanja kupaca koja se ponavljaju hiljadu puta.",
  answer:
    "U web shopu AI daje najviše na katalogu i na podršci. Opisi, naslovi i meta podaci se prave iz specifikacije proizvoda u serijama umesto jedan po jedan, pa artikal koji je stajao bez teksta postane pretraživ. Na drugoj strani, većina poruka kupaca su tri pitanja — gde mi je paket, da li imate broj 42, kako se vraća roba — i na njih odgovara asistent povezan sa stvarnim stanjem zaliha i statusom pošiljke, a ne opštim tekstom.",
  keywords: [
    "AI za web shop",
    "automatski opisi proizvoda",
    "AI pretraga proizvoda",
    "chatbot za online prodavnicu",
    "status porudžbine automatski",
    "e-commerce automatizacija",
  ],
  serviceName: "AI i automatizacija za e-commerce",
  tasks: [
    {
      name: "Opisi proizvoda u serijama",
      problem:
        "Osamsto artikala bez opisa. Google ih ne prikazuje, kupac ih ne razume.",
      solution:
        "Iz specifikacije, kategorije i naziva izlazi opis, naslov i meta opis, u tvom tonu i sa tvojim rečima za kategorije. Odobravaš u paketu, ne pojedinačno.",
      delivery: "Alat za generisanje i pregled opisa, sa uvozom i izvozom.",
    },
    {
      name: "Pretraga koja razume pitanje",
      problem:
        "Kupac ukuca „nešto za bebu 6 meseci\" i dobije nula rezultata jer tako ne piše ni u jednom nazivu.",
      solution:
        "Pretraga po značenju umesto po podudaranju slova, sa filterima koji se sami predlažu iz upita.",
      delivery: "Pretraga nad tvojim katalogom, sa izveštajem šta se traži a nema.",
    },
    {
      name: "Gde mi je paket",
      problem:
        "Pola poruka podrške je jedno pitanje, a odgovor je copy-paste iz kurirskog sistema.",
      solution:
        "Kupac unese broj porudžbine ili mejl i odmah dobija stvarni status od kurira, bez čekanja na tebe.",
      delivery: "Praćenje pošiljke na sajtu i u automatskom odgovoru.",
    },
    {
      name: "Reklamacija bez prepiske",
      problem:
        "Reklamacija ide kroz deset mejlova, a zakonski rok teče od prvog dana.",
      solution:
        "Vođen formular prikupi sve odjednom — račun, fotografija, razlog — i otvori predmet sa rokom i statusom koji kupac sam prati.",
      delivery: "Evidencija reklamacija sa rokovima i istorijom.",
    },
    {
      name: "Preporuka koja ima smisla",
      problem:
        "„Slični proizvodi\" prikazuju isti artikal u drugoj boji.",
      solution:
        "Preporuka po tome šta se stvarno kupuje zajedno i šta ide uz konkretan model, a ne po kategoriji.",
      delivery: "Blok preporuka na stranici proizvoda i u korpi.",
    },
    {
      name: "Cene i konkurencija",
      problem:
        "Ne zna se da li si skup dok prodaja ne padne.",
      solution:
        "Praćenje javnih cena za artikle koje ti odrediš, sa upozorenjem kad neko ode ispod tvoje.",
      delivery: "Izveštaj cena po artiklu i po konkurentu.",
    },
  ],
  sections: [
    {
      heading: "Zašto se počinje od kataloga",
      body: [
        "Web shop bez opisa je prodavnica bez cenovnika. Pretraživači ne mogu da ga rangiraju, a odnedavno ni asistenti ne mogu da ga preporuče — jer i jedni i drugi čitaju tekst. Artikal bez opisa je nevidljiv u oba sveta, koliko god dobra bila cena.",
      ],
    },
    {
      heading: "Gde treba biti oprezan",
      bullets: [
        "Opis koji izmišlja tehničku karakteristiku je osnov za reklamaciju — zato ide samo iz specifikacije.",
        "Asistent ne sme sam da odobri povraćaj novca.",
        "Cena i akcija se ne menjaju automatski.",
        "Generisani tekst mora da prođe pregled pre objave, makar u paketu.",
      ],
    },
  ],
  howTo: {
    name: HOW_TO_NAME,
    steps: [
      {
        name: "Sat vremena razgovora",
        text: "Gledamo katalog, broj poruka podrške i gde kupci odustaju u korpi.",
      },
      {
        name: "Jedan posao, ne svi",
        text: "Kod shopa je to skoro uvek katalog — opisi i pretraga pre svega ostalog.",
      },
      {
        name: "Uvođenje u dve do četiri nedelje",
        text: "Radi se nad tvojom platformom, bilo da je WooCommerce, Shopify ili sopstvena.",
      },
      {
        name: "Dve nedelje rada uporedo",
        text: "Prvo na jednoj kategoriji, da se vidi kako izgleda i kako se ponaša u pretrazi.",
      },
      {
        name: "Sledeći posao",
        text: "Zatim podrška i reklamacije, kad katalog stoji.",
      },
    ],
  },
  proofHeading: "Sistemi ovog tipa koji rade",
  proof: [
    {
      label: "Santos & Santorini",
      href: "/our-projects/santos-santorini-web-shop-admin-platforma",
      note: "Web shop sa admin platformom — katalog, porudžbine i sadržaj.",
    },
  ],
  faq: [
    {
      q: "Da li Google kažnjava AI opise?",
      a: "Google kažnjava beskorisan sadržaj, bez obzira ko ga je napisao. Opis nastao iz stvarne specifikacije, sa tačnim podacima i pregledom pre objave, nije to. Masovno generisan tekst bez ijedne provere jeste.",
    },
    {
      q: "Radi li ovo na WooCommerce-u?",
      a: "Da, kao i na Shopify-u i na sopstvenoj prodavnici. Katalog se čita i vraća kroz postojeći sistem, bez migracije.",
    },
    {
      q: "Koliko artikala se može obraditi odjednom?",
      a: "Praktično ograničenje nije broj artikala nego pregled. Zato se radi po kategorijama — obradi se jedna, pregleda, pa se ide dalje.",
    },
    {
      q: "Može li asistent da naruči umesto kupca?",
      a: "Može da vodi do korpe i popuni je, ali potvrda porudžbine ostaje na kupcu. Sve drugo je pravni problem, ne tehnički.",
    },
  ],
  relatedServices: [
    { label: "E-commerce i web shop", href: "/our-services/e-commerce-web-shop" },
    { label: "AI integracije i automatizacija", href: "/our-services/ai-integracije-automatizacija" },
    { label: "SEO i digitalni marketing", href: "/our-services/seo-digitalni-marketing" },
  ],
};

const realEstate: AiPage = {
  slug: "nekretnine-i-izdavanje",
  industry: "Nekretnine i izdavanje",
  eyebrow: "AI po delatnosti",
  title: "AI za nekretnine i izdavanje — upiti, oglasi, rezervacije",
  metaDescription:
    "Kako AI pomaže agencijama za nekretnine i izdavaocima stanova: kvalifikacija upita, opisi oglasa, odgovori gostima na više jezika, kalendar bez preklapanja.",
  h1: "AI za nekretnine i izdavanje",
  lead:
    "Agent gubi dan na upite koji ne vode nikuda, a izdavalac stana gubi rezervaciju jer nije odgovorio u roku od sat vremena. Oba posla su trka u brzini odgovora.",
  answer:
    "Kod nekretnina i izdavanja AI radi dva posla: odvaja ozbiljan upit od radoznalog i odgovara odmah, u bilo koje doba. Upit se kvalifikuje kroz nekoliko pitanja — budžet, rok, način plaćanja, deo grada — pa agent zove samo one koji imaju smisla. Kod kratkoročnog izdavanja se na pitanja gosta o dolasku, parkingu i pravilima odgovara na jeziku na kom je pitao, nad kalendarom koji je stvarno slobodan, pa nema duplih rezervacija ni izgubljenih noći.",
  keywords: [
    "AI za nekretnine",
    "softver za izdavanje stanova",
    "kvalifikacija upita nekretnine",
    "opis oglasa nekretnine automatski",
    "chatbot za apartmane",
    "kalendar rezervacija apartmani",
  ],
  serviceName: "AI i automatizacija za nekretnine i izdavanje",
  tasks: [
    {
      name: "Kvalifikacija upita",
      problem:
        "Deset poziva dnevno, dva su ozbiljna, ali se to sazna tek u petnaestom minutu razgovora.",
      solution:
        "Kratak niz pitanja pre poziva — budžet, kredit ili keš, rok useljenja, deo grada — i upit stiže sa oznakom koliko je zreo.",
      delivery: "Formular za upit sa ocenom i unosom u evidenciju.",
    },
    {
      name: "Opis oglasa iz podataka",
      problem:
        "Trideset oglasa čeka tekst, a svi zvuče isto jer se prepisuju.",
      solution:
        "Iz kvadrature, sprata, orijentacije i fotografija izlazi opis koji ističe ono što je stvarno različito kod te nekretnine.",
      delivery: "Generator opisa iz podataka oglasa, sa tvojim pregledom.",
    },
    {
      name: "Odgovor gostu na njegovom jeziku",
      problem:
        "Gost iz Nemačke pita u 23h kako se ulazi u zgradu i gde se parkira.",
      solution:
        "Asistent odgovara na srpskom, engleskom i nemačkom iz tvojih pravila kuće i uputstva za dolazak, sa slikom ulaza i kodom kad je vreme.",
      delivery: "Chat i automatske poruke po fazama boravka.",
    },
    {
      name: "Kalendar bez preklapanja",
      problem:
        "Rezervacija sa Booking-a i direktna rezervacija se poklope na isti datum.",
      solution:
        "Jedan kalendar spaja sve kanale, pa se zauzet datum zatvara svuda istog trenutka.",
      delivery: "Objedinjen kalendar sa direktnim rezervacijama sa tvog sajta.",
    },
    {
      name: "Direktna rezervacija umesto provizije",
      problem:
        "Platforme uzimaju procenat na svaku noć, uključujući goste koji se vraćaju.",
      solution:
        "Sopstvena stranica za rezervaciju sa istim iskustvom, i poruka gostu koji se vraća da rezerviše direktno.",
      delivery: "Stranica objekta sa plaćanjem ili potvrdom bez provizije.",
    },
    {
      name: "Ugovori i primopredaja",
      problem:
        "Ugovor se prekucava za svakog stanara, zapisnik o primopredaji se izgubi.",
      solution:
        "Ugovor se popunjava iz podataka o nekretnini i stanaru, a zapisnik sa fotografijama stanja ostaje uz predmet.",
      delivery: "Šabloni ugovora i zapisnik sa fotografijama u evidenciji.",
    },
  ],
  sections: [
    {
      heading: "Dva različita posla pod istim imenom",
      body: [
        "Prodaja nekretnine i kratkoročno izdavanje deluju srodno, a nemaju istu bolnu tačku. Kod prodaje se gubi na vremenu potrošenom na pogrešne ljude, pa se prvo radi kvalifikacija. Kod izdavanja se gubi na sporom odgovoru i na proviziji platformi, pa se prvo radi odgovaranje i direktna rezervacija.",
      ],
    },
    {
      heading: "Granica koja se ne prelazi",
      bullets: [
        "Asistent ne daje pravni savet o kupoprodaji ni o porezu.",
        "Ne potvrđuje uslove kredita — to je banka, ne oglas.",
        "Ne obećava termin obilaska bez agenta na drugoj strani.",
        "Ne šalje ugovor bez ljudskog pregleda.",
      ],
    },
  ],
  howTo: {
    name: HOW_TO_NAME,
    steps: [
      {
        name: "Sat vremena razgovora",
        text: "Brojimo upite i vidimo koliko ih se izgubi zbog sporog odgovora.",
      },
      {
        name: "Jedan posao, ne svi",
        text: "Agencija počinje od kvalifikacije, izdavalac od odgovaranja i kalendara.",
      },
      {
        name: "Uvođenje u dve do četiri nedelje",
        text: "Radi se nad tvojom listom nekretnina i tvojim pravilima kuće.",
      },
      {
        name: "Dve nedelje rada uporedo",
        text: "Ručni odgovor ostaje dok se ne vidi da asistent ne greši oko cena i datuma.",
      },
      {
        name: "Sledeći posao",
        text: "Zatim opisi oglasa i ugovori, kad prvi deo stoji.",
      },
    ],
  },
  faq: [
    {
      q: "Da li ovo zamenjuje Booking i Airbnb?",
      a: "Ne odmah i ne u potpunosti. Cilj je da gost koji se vraća i gost koji te nađe preko Google-a rezerviše direktno, a platforme ostanu kanal za nove goste.",
    },
    {
      q: "Ko odgovara ako asistent pogrešno kaže cenu?",
      a: "Zato se cena ne daje iz teksta nego iz kalendara sa cenama po datumu. Ono što nije u kalendaru asistent ne izgovara.",
    },
    {
      q: "Radi li ovo za jednu nekretninu ili treba imati desetak?",
      a: "Radi i za jednu, ali se isplati brže kad ih ima nekoliko ili kad se broj upita meri desetinama nedeljno.",
    },
    {
      q: "Kako se povezuje sa postojećim kalendarom?",
      a: "Preko iCal razmene sa platformama ili direktno preko njihovog pristupa, u zavisnosti od toga šta platforma nudi.",
    },
  ],
  relatedServices: [
    { label: "Sistemi za zakazivanje", href: "/our-services/sistemi-za-zakazivanje" },
    { label: "Web prezentacije", href: "/our-services/web-prezentacije" },
    { label: "AI integracije i automatizacija", href: "/our-services/ai-integracije-automatizacija" },
  ],
};

const education: AiPage = {
  slug: "obrazovanje-i-kursevi",
  industry: "Obrazovanje i kursevi",
  eyebrow: "AI po delatnosti",
  title: "AI za škole i kurseve — upis, materijali, provera znanja",
  metaDescription:
    "Kako AI pomaže školama, kursevima i predavačima: upis polaznika bez papira, priprema materijala i testova, odgovori roditeljima, praćenje napretka.",
  h1: "AI za obrazovanje i kurseve",
  lead:
    "Predavač se školovao da predaje, a provodi večeri praveći testove i odgovarajući na ista pitanja roditelja. To je posao koji se skida sa stola.",
  answer:
    "U obrazovanju AI najviše vremena vraća na pripremi i na administraciji, ne na predavanju. Iz jednog gradiva se dobijaju vežbe, testovi različite težine i rešenja, a iz jedne prijave polaznika ide upis, raspored, ugovor i račun bez prekucavanja. Treći deo je odgovaranje: pitanja o terminima, ceni, propuštenom času i uslovima ponavljaju se toliko da se isplati da na njih odgovara sistem nad tvojim pravilima.",
  keywords: [
    "AI za škole",
    "AI za kurseve",
    "softver za školu stranih jezika",
    "generisanje testova",
    "prijava polaznika online",
    "praćenje napretka učenika",
  ],
  serviceName: "AI i automatizacija za obrazovanje",
  tasks: [
    {
      name: "Upis bez papira",
      problem:
        "Prijava, ugovor, uplatnica i raspored — sve se prekucava, za svakog polaznika ponovo.",
      solution:
        "Jedna prijava popunjava sve dalje: grupu, ugovor, račun i pristup materijalima.",
      delivery: "Prijavni formular, evidencija polaznika i automatski ugovor.",
    },
    {
      name: "Materijali i vežbe iz gradiva",
      problem:
        "Za svaki nivo i svaku grupu treba drugi set vežbi, a dan ima 24 sata.",
      solution:
        "Iz tvog gradiva izlaze vežbe u više težina, sa rešenjima, u tvom formatu i tvojoj terminologiji.",
      delivery: "Alat za pripremu materijala sa bibliotekom po nivoima.",
    },
    {
      name: "Test i pregled",
      problem:
        "Pregledanje četrdeset testova traje duže od časa na kom su rađeni.",
      solution:
        "Test se radi online, zatvorena pitanja se pregledaju sama, a otvorena dobijaju predlog ocene koji nastavnik potvrđuje ili menja.",
      delivery: "Testovi sa automatskim pregledom i izveštajem po učeniku.",
    },
    {
      name: "Odgovori roditeljima i polaznicima",
      problem:
        "Kada počinje grupa, šta ako se propusti čas, koliko košta, ima li mesta — svakog dana ista pitanja.",
      solution:
        "Asistent odgovara iz tvog rasporeda i tvojih pravila, a upisuje interesovanje kao lead umesto da ga izgubi.",
      delivery: "Chat na sajtu povezan sa rasporedom grupa i cenovnikom.",
    },
    {
      name: "Ko zaostaje, a ko odustaje",
      problem:
        "Polaznik prestane da dolazi i to se primeti tek kad ne obnovi upis.",
      solution:
        "Praćenje dolazaka i rezultata sa upozorenjem kad neko počne da pada — dok se još može reagovati.",
      delivery: "Pregled napretka po grupi i po polazniku.",
    },
    {
      name: "Sertifikati i evidencija",
      problem:
        "Potvrde se prave ručno u Wordu i traže se posle godinu dana.",
      solution:
        "Sertifikat se izdaje iz evidencije, sa brojem i proverljivim linkom.",
      delivery: "Generator sertifikata sa arhivom i proverom.",
    },
  ],
  sections: [
    {
      heading: "Šta AI u nastavi ne treba da radi",
      body: [
        "Postoji granica koja se u obrazovanju brzo pređe. Ocena koja ide u dosije mora da bude nastavnikova. Rad učenika ne sme da ide u sisteme koji ga koriste za obuku. A objašnjenje gradiva umesto nastavnika je zamena koja se plaća posle, kad se vidi da polaznici nisu naučili.",
      ],
      bullets: [
        "Konačna ocena — uvek čovek.",
        "Radovi maloletnih polaznika — nikad u spoljni sistem bez pristanka roditelja.",
        "Odluka o prelasku u viši nivo.",
        "Razgovor sa roditeljem o problemu deteta.",
      ],
    },
    {
      heading: "Gde je najbrža korist",
      body: [
        "Priprema materijala. To je jedini deo posla koji nastavnik radi sam, van radnog vremena, i za koji ga niko ne plaća posebno. Sve ostalo može da čeka.",
      ],
    },
  ],
  howTo: {
    name: HOW_TO_NAME,
    steps: [
      {
        name: "Sat vremena razgovora",
        text: "Gledamo koliko vremena odlazi na pripremu, a koliko na administraciju upisa.",
      },
      {
        name: "Jedan posao, ne svi",
        text: "Kod predavača se počinje od materijala, kod škole od upisa.",
      },
      {
        name: "Uvođenje u dve do četiri nedelje",
        text: "Radi se nad tvojim gradivom i tvojim rasporedom grupa.",
      },
      {
        name: "Dve nedelje rada uporedo",
        text: "Prvo jedna grupa, da se vidi da li materijali odgovaraju nivou.",
      },
      {
        name: "Sledeći posao",
        text: "Zatim testovi i praćenje napretka.",
      },
    ],
  },
  proofHeading: "Sistemi ovog tipa koji rade",
  proof: [
    {
      label: "TeachFromHome",
      href: "/our-projects/teachfromhome-onboarding-sistem-za-remote-nastavnike",
      note: "Onboarding sistem za remote nastavnike — prijava, provera i praćenje.",
    },
  ],
  faq: [
    {
      q: "Da li učenici mogu da prepišu test?",
      a: "Online test se ne oslanja na poštenje — pitanja se mešaju, vreme se ograničava, a varijante se generišu po učeniku. Za ozbiljnu proveru znanja i dalje važi da se piše u učionici.",
    },
    {
      q: "Šta sa zaštitom podataka maloletnika?",
      a: "Podaci ostaju u tvojoj bazi, pristup je po ulozi, a saglasnost roditelja je deo prijave. Radovi se ne šalju u spoljne sisteme bez izričitog pristanka.",
    },
    {
      q: "Da li ovo zamenjuje elektronski dnevnik?",
      a: "Ne. Državni dnevnik ostaje obavezan. Ovo pokriva ono što dnevnik ne radi — pripremu, materijale i komunikaciju sa polaznicima.",
    },
    {
      q: "Radi li za jednog predavača?",
      a: "Da, i tu se najbrže oseti, jer jedan čovek radi i pripremu i administraciju i naplatu.",
    },
  ],
  relatedServices: [
    { label: "Interne poslovne aplikacije", href: "/our-services/interne-poslovne-aplikacije" },
    { label: "SaaS razvoj", href: "/our-services/saas-razvoj" },
    { label: "AI integracije i automatizacija", href: "/our-services/ai-integracije-automatizacija" },
  ],
};

const manufacturing: AiPage = {
  slug: "proizvodnja-i-gradjevina",
  industry: "Proizvodnja i građevina",
  eyebrow: "AI po delatnosti",
  title: "AI za proizvodnju i građevinu — predmer, ponuda, nalozi",
  metaDescription:
    "Kako AI pomaže proizvodnim i građevinskim firmama: predmer i ponuda iz specifikacije, radni nalozi, izveštaj sa gradilišta, evidencija materijala i rokova.",
  h1: "AI za proizvodnju i građevinu",
  lead:
    "Ponuda se pravi tri dana i dobije je onaj ko je poslao prvi. Nalozi idu telefonom, izveštaj sa gradilišta stiže u Viber grupu i nestane. To je posao koji se vraća u sistem.",
  answer:
    "U proizvodnji i građevini AI najviše vredi pre nego što posao počne — na predmeru i ponudi. Iz specifikacije, nacrta ili liste pozicija izlazi predračun sa normativima i tvojim cenama za nekoliko sati umesto za nekoliko dana, pa se stiže odgovoriti dok je posao još otvoren. Drugi deo je gradilište: radni nalog na telefon, izveštaj sa fotografijom i utrošenim materijalom, i evidencija koja pokazuje razliku između planiranog i stvarnog dok se još može uticati.",
  keywords: [
    "AI za proizvodnju",
    "AI za građevinu",
    "predmer i predračun softver",
    "radni nalog aplikacija",
    "izveštaj sa gradilišta",
    "evidencija materijala",
  ],
  serviceName: "AI i automatizacija za proizvodnju i građevinu",
  tasks: [
    {
      name: "Predmer i ponuda",
      problem:
        "Specifikacija stigne u PDF-u ili na papiru, a predračun se kuca u Excelu tri dana.",
      solution:
        "Pozicije se čitaju iz dokumenta, spajaju sa tvojim normativima i cenama, i daju predračun sa maržom koji ti proveriš.",
      delivery: "Predračun u tabeli i PDF ponuda sa tvojim zaglavljem.",
    },
    {
      name: "Radni nalog na telefon",
      problem:
        "Nalog se javi telefonom, pa se ne zna ko je šta radio ni koliko je trajalo.",
      solution:
        "Ekipa dobija nalog sa pozicijama i materijalom, i zatvara ga sa utrošenim satima i fotografijom.",
      delivery: "Prikaz za teren u pretraživaču, bez instalacije.",
    },
    {
      name: "Izveštaj sa gradilišta",
      problem:
        "Fotografije i beleške završe u Viber grupi i posle mesec dana ih niko ne nalazi.",
      solution:
        "Dnevni izveštaj se popunjava sa telefona, sa fotografijama i vremenom, i sam ide uz predmet.",
      delivery: "Građevinski dnevnik sa arhivom po objektu.",
    },
    {
      name: "Materijal i otpad",
      problem:
        "Naručeno je jedno, utrošeno drugo, a razlika se vidi tek na kraju posla.",
      solution:
        "Utrošak se upisuje uz nalog, pa se odstupanje od normativa vidi u toku posla, ne posle njega.",
      delivery: "Evidencija materijala po objektu sa poređenjem plan/stvarno.",
    },
    {
      name: "Rokovi i atesti",
      problem:
        "Atest, garancija, pregled opreme, obuka za rad na visini — propušteno znači zastoj ili kazna.",
      solution:
        "Svi rokovi na jednom mestu sa upozorenjem i zaduženim čovekom.",
      delivery: "Evidencija dokumenata sa podsetnicima.",
    },
    {
      name: "Katalog i tehnička dokumentacija",
      problem:
        "Kupac traži tehnički list, a on postoji u tri verzije na tri računara.",
      solution:
        "Jedan izvor dokumentacije, sa pretragom po značenju — pitaš pitanje, dobiješ tačan dokument i stranu.",
      delivery: "Pretraživa baza dokumenata sa kontrolom verzija.",
    },
  ],
  sections: [
    {
      heading: "Zašto ponuda, a ne proizvodnja",
      body: [
        "Očekuje se da AI u proizvodnji znači roboti i predviđanje kvarova. Za firmu od dvadeset ljudi to nije prvi korak nego peti. Prvi je ponuda — jer se tu gubi posao koji je već bio na stolu, bez ikakvog ulaganja u opremu.",
      ],
    },
    {
      heading: "Šta ostaje na inženjeru",
      bullets: [
        "Provera svakog predračuna pre slanja — mašina čita dokument, ne snosi odgovornost.",
        "Tehničko rešenje i odstupanje od projekta.",
        "Procena rizika i bezbednosti na gradilištu.",
        "Odnos sa investitorom i pregovor o rokovima.",
      ],
    },
  ],
  howTo: {
    name: HOW_TO_NAME,
    steps: [
      {
        name: "Sat vremena razgovora",
        text: "Merimo koliko traje put od upita do poslate ponude.",
      },
      {
        name: "Jedan posao, ne svi",
        text: "Skoro uvek predmer i ponuda — tamo je najveći gubitak.",
      },
      {
        name: "Uvođenje u dve do četiri nedelje",
        text: "Radi se nad tvojim normativima i tvojim cenama dobavljača.",
      },
      {
        name: "Dve nedelje rada uporedo",
        text: "Predračun se pravi paralelno, staro i novo, dok se ne poklope na realnim poslovima.",
      },
      {
        name: "Sledeći posao",
        text: "Zatim nalozi i izveštaj sa terena.",
      },
    ],
  },
  faq: [
    {
      q: "Da li čita nacrte?",
      a: "Čita specifikacije, tabele pozicija i tekstualne opise pouzdano. Nacrte čita delimično i uvek uz proveru — na crtežu se greška ne prašta, pa se ne oslanja na automatiku.",
    },
    {
      q: "Naši normativi su u glavi, ne u tabeli.",
      a: "Onda je prvi korak da se zapišu. To je nekoliko dana posla i vredi i bez ikakvog softvera — jer firma koja normative drži u jednoj glavi ne može da raste.",
    },
    {
      q: "Radnici na terenu nemaju dobre telefone.",
      a: "Prikaz za teren radi na starijim telefonima i preko slabe mreže, sa snimanjem kad veza pukne. Ako traži novije uređaje, pogrešno je napravljen.",
    },
    {
      q: "Imamo ERP. Da li ovo ide preko njega?",
      a: "Ide uz njega. ERP ostaje mesto istine za zalihe i finansije, a ovaj sloj rešava ono što ERP tradicionalno radi loše — brzu ponudu i unos sa terena.",
    },
  ],
  relatedServices: [
    { label: "Industrijska rešenja", href: "/our-services/industrijska-resenja" },
    { label: "Interne poslovne aplikacije", href: "/our-services/interne-poslovne-aplikacije" },
    { label: "AI integracije i automatizacija", href: "/our-services/ai-integracije-automatizacija" },
  ],
};

const automotive: AiPage = {
  slug: "auto-servisi-i-prodaja",
  industry: "Auto servisi i prodaja",
  eyebrow: "AI po delatnosti",
  title: "AI za auto servise i prodaju vozila — termini, delovi, oglasi",
  metaDescription:
    "Kako AI pomaže auto servisima i prodavcima vozila: zakazivanje servisa, pronalaženje dela po šasiji, opisi oglasa, podsetnici za registraciju i servis.",
  h1: "AI za auto servise i prodaju",
  lead:
    "Servis odgovara na pitanja o delovima dok je pod haubom, prodavac piše isti opis za dvadeseti automobil. Oba posla trpe zbog toga što niko ne stigne do telefona.",
  answer:
    "U auto servisu AI prvo rešava dve stvari: zakazivanje termina bez poziva i pronalaženje pravog dela iz broja šasije ili opisa kvara, iz kataloga koji već koristiš. Kod prodaje vozila najviše vredi automatski opis oglasa iz specifikacije i fotografija, i odgovaranje na pitanja o kilometraži, servisnoj knjizi i mogućnosti zamene — jer kupac pita u 22h i bira onog ko odgovori prvi. Treći sloj, koji drži prihod, su podsetnici za registraciju i redovan servis.",
  keywords: [
    "AI za auto servis",
    "zakazivanje servisa online",
    "pretraga auto delova po šasiji",
    "oglas za automobil opis",
    "podsetnik za registraciju",
    "softver za auto servis",
  ],
  serviceName: "AI i automatizacija za auto servise i prodaju vozila",
  tasks: [
    {
      name: "Zakazivanje servisa",
      problem:
        "Telefon zvoni dok si pod vozilom. Ne javiš se, mušterija ode kod drugog.",
      solution:
        "Termin se zakazuje sa sajta, sa opisom kvara i modelom vozila, nad stvarnom zauzetošću dizalice i majstora.",
      delivery: "Zakazivanje sa kalendarom po radnom mestu i tipu posla.",
    },
    {
      name: "Koji deo odgovara",
      problem:
        "Pola sata odlazi na traženje dela po katalogu za konkretan motor i godište.",
      solution:
        "Iz broja šasije ili opisa se predlaže deo iz tvog kataloga, sa alternativama i stanjem zaliha.",
      delivery: "Pretraga dela po šasiji i po opisu, nad tvojim katalogom.",
    },
    {
      name: "Predračun pre popravke",
      problem:
        "Mušterija pita koliko će koštati, a odgovor zavisi od toga šta se nađe kad se rastavi.",
      solution:
        "Iz tipične liste radova i cena delova izlazi okvir sa jasno označenim šta je sigurno a šta zavisi od nalaza.",
      delivery: "Predračun sa stavkama i potvrdom mušterije pre rada.",
    },
    {
      name: "Opis oglasa za vozilo",
      problem:
        "Dvadeset automobila čeka tekst, pa svi dobiju isti opis od tri reda.",
      solution:
        "Iz specifikacije, opreme i fotografija izlazi opis koji ističe stvarne razlike, sa svim podacima koje kupac traži.",
      delivery: "Generator opisa za oglas, sa tvojim pregledom pre objave.",
    },
    {
      name: "Podsetnik za registraciju i servis",
      problem:
        "Mušterija se seti registracije dan pre isteka i ode kod prvog slobodnog.",
      solution:
        "Poruka mesec dana ranije, sa ponuđenim terminom — i za registraciju i za redovan servis po kilometraži.",
      delivery: "Evidencija vozila sa rokovima i automatskim porukama.",
    },
    {
      name: "Istorija vozila",
      problem:
        "Šta je rađeno prošli put, koje ulje, koji deo — u svesci ili u glavi majstora.",
      solution:
        "Servisna istorija po vozilu, dostupna odmah kad se ukuca tablica.",
      delivery: "Karton vozila sa radovima, delovima i fotografijama.",
    },
  ],
  sections: [
    {
      heading: "Gde je pravi novac",
      body: [
        "Servis obično misli da mu treba više novih mušterija. Skoro uvek mu treba da se vrate stare. Vozilo koje je jednom bilo u servisu ima poznatu kilometražu, poznat interval i poznat datum registracije — to su tri povoda za poruku godišnje, bez ijednog dinara na oglase.",
      ],
    },
    {
      heading: "Šta AI ovde ne radi",
      bullets: [
        "Ne postavlja dijagnozu umesto majstora.",
        "Ne potvrđuje da alternativni deo odgovara — to je odgovornost servisa.",
        "Ne daje cenu popravke pre nego što se vidi šta je.",
        "Ne garantuje podatke iz istorije vozila koje nije samo evidentiralo.",
      ],
    },
  ],
  howTo: {
    name: HOW_TO_NAME,
    steps: [
      {
        name: "Sat vremena razgovora",
        text: "Brojimo propuštene pozive i vidimo koliko mušterija se ne vraća.",
      },
      {
        name: "Jedan posao, ne svi",
        text: "Servis počinje od zakazivanja, prodaja vozila od opisa oglasa.",
      },
      {
        name: "Uvođenje u dve do četiri nedelje",
        text: "Radi se nad tvojim katalogom delova i tvojim rasporedom radnih mesta.",
      },
      {
        name: "Dve nedelje rada uporedo",
        text: "Telefon ostaje, ali se meri koliko termina dođe online.",
      },
      {
        name: "Sledeći posao",
        text: "Zatim karton vozila i podsetnici — tu je povratak mušterije.",
      },
    ],
  },
  proofHeading: "Sistemi ovog tipa koji rade",
  proof: [
    {
      label: "Prevoz Kop",
      href: "/our-projects/prevozkop-digitalni-prodajni-operativni-sistem",
      note: "Evidencija vozila, naloga i troškova u jednom sistemu.",
    },
  ],
  faq: [
    {
      q: "Imamo katalog delova od dobavljača. Da li se koristi taj?",
      a: "Da, ako dobavljač daje pristup podacima ili izvoz. Cilj nije novi katalog nego brža pretraga po onom koji već plaćaš.",
    },
    {
      q: "Da li podsetnici smetaju mušterijama?",
      a: "Poruka jednom u nekoliko meseci, sa konkretnim povodom i predloženim terminom, retko smeta. Nedeljni bilten smeta uvek.",
    },
    {
      q: "Prodajemo i polovna vozila. Da li isti sistem pokriva oba?",
      a: "Deli evidenciju vozila, ali su to dva različita toka — servis ide na termine, prodaja na oglase i upite. Radi se onaj koji ti trenutno više košta.",
    },
    {
      q: "Šta ako nemamo sajt?",
      a: "Zakazivanje može da radi sa jedne stranice i Google profila. Pun sajt je sledeći korak, ne uslov.",
    },
  ],
  relatedServices: [
    { label: "Sistemi za zakazivanje", href: "/our-services/sistemi-za-zakazivanje" },
    { label: "Interne poslovne aplikacije", href: "/our-services/interne-poslovne-aplikacije" },
    { label: "AI integracije i automatizacija", href: "/our-services/ai-integracije-automatizacija" },
  ],
};

const professionalServices: AiPage = {
  slug: "knjigovodstvo-i-usluzne-firme",
  industry: "Knjigovodstvo i uslužne firme",
  eyebrow: "AI po delatnosti",
  title: "AI za knjigovodstvene i uslužne firme — dokumenti, upiti, rokovi",
  metaDescription:
    "Kako AI pomaže knjigovodstvenim agencijama, advokatima i konsultantima: čitanje ulaznih dokumenata, odgovori klijentima, rokovi i praćenje naplate.",
  h1: "AI za knjigovodstvo i uslužne firme",
  lead:
    "Knjigovođa, advokat i konsultant prodaju sate. Svaki sat potrošen na prekucavanje, traženje dokumenta ili odgovor na isto pitanje je sat koji se ne naplaćuje.",
  answer:
    "Kod uslužnih firmi AI se najbrže isplati na ulaznim dokumentima i na ponavljajućim pitanjima klijenata. Fakture, izvodi i ugovori se čitaju sa slike ili PDF-a i sami popunjavaju polja, uz obaveznu potvrdu za sve što nije sigurno. Paralelno, pitanja koja klijent postavlja svakog meseca — šta mi treba za ovo, do kad je rok, gde je moj dokument — dobijaju odgovor odmah, iz tvoje dokumentacije, pa telefon zvoni za stvari koje traže tvoje mišljenje.",
  keywords: [
    "AI za knjigovodstvo",
    "automatsko čitanje faktura",
    "AI za advokate",
    "obrada dokumenata AI",
    "portal za klijente knjigovodstvo",
    "praćenje rokova firma",
  ],
  serviceName: "AI i automatizacija za knjigovodstvene i uslužne firme",
  tasks: [
    {
      name: "Ulazni dokumenti sa slike",
      problem:
        "Klijent pošalje fotografije faktura u Viberu, a neko ih prekucava ceo dan.",
      solution:
        "Dokument se čita, polja se popunjavaju, a nesigurno se izdvaja na proveru. Kroz portal klijent šalje direktno, bez Vibera.",
      delivery: "Ulazna kutija dokumenata sa proverom i izvozom u tvoj program.",
    },
    {
      name: "Portal za klijenta",
      problem:
        "Isti klijent svaki mesec pita gde je izveštaj i koliko treba da plati.",
      solution:
        "Klijent vidi svoje dokumente, obaveze i rokove sam, sa pristupom po nalogu.",
      delivery: "Klijentski portal sa dokumentima, statusima i porukama.",
    },
    {
      name: "Rokovi koji nose kaznu",
      problem:
        "PDV, porezi, izveštaji, produženja — propušten rok se plaća, i to iz tvog džepa.",
      solution:
        "Kalendar obaveza po klijentu, sa zaduženim čovekom i upozorenjem unapred.",
      delivery: "Pregled rokova po klijentu sa podsetnicima.",
    },
    {
      name: "Pretraga sopstvene dokumentacije",
      problem:
        "Odgovor postoji u nekom ugovoru ili mišljenju od pre dve godine, ali se ne nalazi.",
      solution:
        "Pretraga po značenju kroz tvoje ugovore, mišljenja i prepisku — pitaš pitanje, dobiješ dokument i pasus.",
      delivery: "Interna pretraga nad tvojim arhivom, bez slanja van firme.",
    },
    {
      name: "Naplata koja kasni",
      problem:
        "Račun je poslat, prošlo je 45 dana, opomena se piše ručno kad se neko seti.",
      solution:
        "Sistem prati dospeće i šalje opomenu po tvom rasporedu — prva blaga, druga oštrija, treća sa tvojim potpisom.",
      delivery: "Evidencija naplate sa automatskim opomenama.",
    },
    {
      name: "Priprema odgovora",
      problem:
        "Isti tip mejla se piše iznova, pa se svaki put drugačije formuliše.",
      solution:
        "Nacrt odgovora iz tvojih ranijih odgovora i tvog tona, koji ti dorađuješ umesto da počinješ od prazne strane.",
      delivery: "Šabloni i nacrti odgovora u tvom mejlu.",
    },
  ],
  sections: [
    {
      heading: "Zašto ovo nije opasno kao što zvuči",
      body: [
        "Kod knjigovodstva i prava prva reakcija je da mašina ne sme da odlučuje. Tačno — i ne odlučuje. Ovde radi samo prepisivanje i traženje, dva posla u kojima čovek greši više što je duže radni dan. Svaki podatak ispod praga sigurnosti ide na potvrdu, a mišljenje i potpis ostaju tvoji u svakom slučaju.",
      ],
    },
    {
      heading: "Gde podaci žive",
      body: [
        "Za firmu koja radi sa tuđim finansijama i tuđim predmetima, pitanje gde podatak putuje nije tehnička sitnica nego uslov posla. Zato se za osetljive delove koristi obrada koja ne izlazi iz tvoje infrastrukture, a za ostalo se tačno definiše šta se šalje i šta se čuva. To se dogovara pre nego što se bilo šta postavi.",
      ],
    },
  ],
  howTo: {
    name: HOW_TO_NAME,
    steps: [
      {
        name: "Sat vremena razgovora",
        text: "Brojimo koliko sati mesečno ide na unos i na odgovaranje klijentima.",
      },
      {
        name: "Jedan posao, ne svi",
        text: "Skoro uvek ulazni dokumenti — tu je najviše ponavljanja.",
      },
      {
        name: "Uvođenje u dve do četiri nedelje",
        text: "Radi se nad tvojim tipovima dokumenata i tvojim programom.",
      },
      {
        name: "Dve nedelje rada uporedo",
        text: "Ručni unos ostaje dok se ne izmeri tačnost na stvarnim dokumentima jednog klijenta.",
      },
      {
        name: "Sledeći posao",
        text: "Zatim portal za klijente i rokovi.",
      },
    ],
  },
  faq: [
    {
      q: "Da li podaci naših klijenata idu u OpenAI ili sličan servis?",
      a: "Zavisi šta se dogovori i to se definiše pre postavljanja. Za osetljive delove postoji obrada koja ostaje na tvojoj infrastrukturi. Ako se koristi spoljni servis, tačno se zna koji podaci se šalju, koliko se čuvaju i da li se koriste za obuku.",
    },
    {
      q: "Koliko je pouzdano čitanje faktura?",
      a: "Na urednim, štampanim dokumentima vrlo pouzdano. Na fotografiji zgužvanog računa sa telefona — manje. Zato je prag sigurnosti podesiv, a sve ispod njega ide čoveku.",
    },
    {
      q: "Da li ovo zamenjuje naš knjigovodstveni program?",
      a: "Ne. Stoji ispred njega i puni ga urednim podacima. Program ostaje tamo gde jeste.",
    },
    {
      q: "Klijenti nam šalju dokumenta Viberom. To se neće promeniti.",
      a: "Ne mora. Poruke sa dokumentima mogu da se prime i obrade automatski, pa portal ostane opcija za one koji hoće red.",
    },
  ],
  relatedServices: [
    { label: "Interne poslovne aplikacije", href: "/our-services/interne-poslovne-aplikacije" },
    { label: "AI integracije i automatizacija", href: "/our-services/ai-integracije-automatizacija" },
    { label: "Cyber security i GDPR", href: "/our-services/cyber-security-gdpr" },
  ],
};

const gyms: AiPage = {
  slug: "teretane-i-fitnes",
  industry: "Teretane i fitnes",
  eyebrow: "AI po delatnosti",
  title: "AI za teretane i fitnes studije — prijave, članarine, odgovori",
  metaDescription:
    "Šta AI konkretno radi za teretanu i fitnes studio: prijave na grupne treninge bez prozivke, podsetnici pred istek članarine i odgovori na pitanja van radnog vremena.",
  h1: "AI za teretane i fitnes studije",
  lead:
    "Recepcija vodi sveske, trener vodi grupu na WhatsApp-u, a vlasnik saznaje da je član otišao tek kad prestane da se pojavljuje. Ništa od toga nije problem motivacije — to je problem evidencije.",
  answer:
    "U teretani i fitnes studiju AI preuzima poslove oko termina i članstva: prijavu na grupni trening sa ograničenim brojem mesta i listom čekanja, podsetnik pred istek članarine dok je obnova još laka, odgovore na pitanja o rasporedu, ceni i pravilima van radnog vremena, i izdvajanje članova koji su prestali da dolaze pre nego što otkažu. Adspire Digital to gradi kao jedan sistem sa evidencijom dolazaka, umesto kao zbir alata koji ne razgovaraju međusobno.",
  keywords: [
    "AI za teretanu",
    "softver za fitnes studio",
    "zakazivanje grupnih treninga",
    "evidencija članarina",
    "automatizacija teretana",
  ],
  serviceName: "AI i automatizacija za teretane i fitnes studije",
  tasks: [
    {
      name: "Prijava na grupni trening bez prozivke",
      problem:
        "Prijave stižu u više WhatsApp grupa, trener ih prepisuje u svesku, a na trening za dvanaest ljudi dođe sedamnaest.",
      solution:
        "Prijava ide kroz raspored sa tačnim brojem mesta po terminu; kad se popuni, sledeći ide na listu čekanja i dobija mesto čim neko otkaže.",
      delivery: "Raspored grupnih treninga, ograničenje mesta i lista čekanja.",
    },
    {
      name: "Podsetnik pred istek članarine",
      problem:
        "Član sazna da mu je članarina istekla na vratima, kad je već neprijatno i njemu i recepciji.",
      solution:
        "Sistem prati datum isteka i šalje podsetnik ranije, dok je obnova još rutina, a ne odluka da li se uopšte vraća.",
      delivery: "Evidencija članarina sa datumom isteka i automatskim podsetnikom.",
    },
    {
      name: "Odgovori o rasporedu i pravilima van radnog vremena",
      problem:
        "Pitanja o ceni, terminima i tome da li treba najava stižu uveče i vikendom, kad recepcija ne radi.",
      solution:
        "Asistent na sajtu i u porukama odgovara iz vašeg rasporeda i cenovnika, a ono što traži čoveka prosleđuje sa kontaktom.",
      delivery: "Asistent povezan sa rasporedom, sa prosleđivanjem kad zatreba.",
    },
    {
      name: "Član koji je prestao da dolazi",
      problem:
        "Odlazak člana se primeti tek kad ne obnovi članarinu, a tada je razgovor zakasnio mesec dana.",
      solution:
        "Evidencija dolazaka izdvaja one koji su naglo prestali da dolaze, pa poziv ili poruka stignu dok je povratak još lak.",
      delivery: "Lista članova bez dolazaka u zadatom periodu, sa predlogom poruke.",
    },
  ],
  sections: [
    {
      heading: "Zašto teretana gubi člana",
      body: [
        "Retko zbog opreme. Mnogo češće zato što je član propustio dve nedelje, niko ga nije pomenuo, pa mu je povratak postao neprijatan. To je podatak koji sistem ima, a sveska nema.",
      ],
      bullets: [
        "Prijave razbacane po grupama i porukama, bez jednog mesta gde se vidi ko dolazi.",
        "Članarina koja istekne bez najave, pa obnova postane odluka umesto navike.",
        "Grupni termin koji se prepuni, pa onaj ko je došao ostane bez mesta.",
        "Otkazan termin koji propadne jer niko nije javio sledećem na listi.",
      ],
    },
    {
      heading: "Šta ostaje na čoveku",
      body: [
        "Trening, ispravka pokreta i odnos sa članom. AI ne vodi trening i ne zamenjuje trenera — skida administraciju koja trenera drži za pultom umesto u sali.",
      ],
    },
  ],
  howTo: {
    name: HOW_TO_NAME,
    steps: [
      {
        name: "Snimak nedelje u studiju",
        text: "Prolazimo kroz raspored, tipove članarina i način na koji prijave danas stižu, pa se vidi gde se gubi vreme.",
      },
      {
        name: "Prvi korak: termini i mesta",
        text: "Prvo ide raspored sa ograničenim brojem mesta i listom čekanja, jer to najbrže skida poruke sa telefona trenera.",
      },
      {
        name: "Članarine i dolasci",
        text: "Zatim evidencija članarina sa istekom i evidencija dolazaka, koja je osnova za sve kasnije podsetnike.",
      },
      {
        name: "Asistent i podsetnici",
        text: "Na kraju asistent za pitanja van radnog vremena i automatske poruke pred istek članarine i posle izostanka.",
      },
    ],
  },
  faq: [
    {
      q: "Da li AI zamenjuje trenera ili recepciju?",
      a: "Ne. Preuzima prijave, podsetnike i odgovore na pitanja koja se ponavljaju. Trening, ispravka pokreta i razgovor sa članom ostaju na ljudima — to je i ono zbog čega član plaća.",
    },
    {
      q: "Šta ako članovi ne žele da se prijavljuju preko sajta?",
      a: "Recepcija ih upisuje ručno u isti raspored, pa je stanje termina svejedno tačno. Online prijava je dodatni kanal, ne uslov.",
    },
    {
      q: "Može li sistem da prepozna člana koji je prestao da dolazi?",
      a: "Da, ako se vode dolasci. Sistem izdvoji one bez dolazaka u periodu koji vi odredite, a odluku šta se šalje i kada donosite vi.",
    },
    {
      q: "Da li se to povezuje sa naplatom članarine?",
      a: "Može. Najčešće se kreće od evidencije i podsetnika, a naplata se dodaje kasnije, kad se vidi da li je online plaćanje uopšte ono što vaši članovi koriste.",
    },
  ],
  relatedServices: [
    { label: "Sistemi za zakazivanje", href: "/our-services/sistemi-za-zakazivanje" },
    { label: "AI integracije i automatizacija", href: "/our-services/ai-integracije-automatizacija" },
    { label: "Interne poslovne aplikacije", href: "/our-services/interne-poslovne-aplikacije" },
  ],
};

const propertyDevelopers: AiPage = {
  slug: "investitori-i-prodaja-stanova",
  industry: "Investitori i prodaja stanova",
  eyebrow: "AI po delatnosti",
  title: "AI za investitore i prodaju stanova — upiti, obilasci, stanje ponude",
  metaDescription:
    "Šta AI radi za investitora i prodaju novogradnje: kvalifikacija upita, odgovori o rokovima i strukturama, zakazivanje obilaska i uvek tačno stanje raspoloživih stanova.",
  h1: "AI za investitore i prodaju stanova",
  lead:
    "Upit za stan stiže u tri kanala, prodavac odgovara isto pitanje po deseti put, a tabela sa raspoloživim stanovima kasni za stvarnošću jedan rezervisan stan.",
  answer:
    "Kod investitora i u prodaji novogradnje AI radi na ulazu u prodajni proces: kvalifikuje upit pre nego što stigne do prodavca, odgovara na pitanja o strukturama, kvadraturi, rokovima i načinu plaćanja iz vaših podataka, zakazuje obilazak i drži stanje raspoloživih stanova usklađeno između sajta i interne evidencije. Adspire Digital to gradi kao jedan sistem sa evidencijom stanova i upita, tako da prodavac dobija pripremljen razgovor umesto sirovog kontakta.",
  keywords: [
    "AI za investitore",
    "softver za prodaju stanova",
    "evidencija stanova novogradnja",
    "CRM za nekretnine",
    "zakazivanje obilaska stana",
  ],
  serviceName: "AI i interni sistemi za investitore i prodaju stanova",
  tasks: [
    {
      name: "Kvalifikacija upita za stan",
      problem:
        "Prodavac troši dan na upite koji traže strukturu koje nema ili budžet koji se ne poklapa sa ponudom.",
      solution:
        "Upit prolazi kroz kratak set pitanja o strukturi, budžetu i roku useljenja, pa do prodavca stiže razvrstan i sa kontekstom.",
      delivery: "Formular i asistent koji upit kvalifikuje i usmerava, sa evidencijom u jednom mestu.",
    },
    {
      name: "Odgovori o rokovima i strukturama",
      problem:
        "Ista pitanja o kvadraturi, orijentaciji, garaži i roku završetka ponavljaju se svakog dana, često uveče.",
      solution:
        "Asistent odgovara iz vaše evidencije stanova i zvanične dinamike radova, a ono što traži pregovor prosleđuje prodavcu.",
      delivery: "Asistent povezan sa podacima o objektu i ponudi, sa jasnom granicom šta ne odgovara sam.",
    },
    {
      name: "Zakazivanje obilaska stana",
      problem:
        "Termini obilaska se dogovaraju porukama, pa se dva kupca pojave u isto vreme ili prodavac ode bez potvrde.",
      solution:
        "Kupac bira slobodan termin obilaska po objektu i prodavcu, sa potvrdom i podsetnikom pred dolazak.",
      delivery: "Kalendar obilazaka po objektu, sa potvrdom i podsetnikom.",
    },
    {
      name: "Stanje raspoloživih stanova",
      problem:
        "Sajt pokazuje slobodan stan koji je juče rezervisan, pa kupac dolazi po nešto što više ne postoji.",
      solution:
        "Evidencija stanova je jedan izvor istine; status se menja na jednom mestu i odatle ide na sajt i u ponudu.",
      delivery: "Evidencija stanova sa statusima i prikaz na sajtu koji se iz nje puni.",
    },
  ],
  sections: [
    {
      heading: "Gde se prodaja novogradnje zaista usporava",
      body: [
        "Ne na ceni. Na vremenu između upita i konkretnog razgovora, i na podacima koji se razlikuju u zavisnosti od toga koga pitate — prodavca, sajt ili tabelu.",
      ],
      bullets: [
        "Upit koji čeka do ponedeljka, dok je kupac u međuvremenu obišao dva druga objekta.",
        "Tabela stanova u kojoj je status tačan samo za onog ko ju je poslednji menjao.",
        "Ista pitanja o roku i plaćanju koja se odgovaraju ručno, svaki put iznova.",
        "Obilasci dogovoreni porukama, bez traga o tome ko je došao i šta je rečeno.",
      ],
    },
    {
      heading: "Šta ostaje na prodavcu",
      body: [
        "Pregovor, poverenje i sve što odlučuje kupovinu stana. Automatizuje se priprema — da prodavac uđe u razgovor znajući šta kupac traži i šta je već pitao.",
      ],
    },
  ],
  howTo: {
    name: HOW_TO_NAME,
    steps: [
      {
        name: "Snimak puta upita",
        text: "Pratimo šta se dešava od trenutka kad upit stigne do prvog razgovora, i gde se u tome gubi vreme.",
      },
      {
        name: "Prvi korak: evidencija stanova",
        text: "Prvo se sređuje jedan izvor istine o stanovima i statusima, jer bez toga svaka kasnija automatizacija širi netačan podatak.",
      },
      {
        name: "Upiti i kvalifikacija",
        text: "Zatim ulaz za upite sa kratkom kvalifikacijom i evidencijom, pa prodavac dobija pripremljen kontakt.",
      },
      {
        name: "Asistent i obilasci",
        text: "Na kraju asistent za ponavljajuća pitanja i kalendar obilazaka sa potvrdom i podsetnikom.",
      },
    ],
  },
  faq: [
    {
      q: "Da li AI razgovara sa kupcem umesto prodavca?",
      a: "Ne za kupovinu stana. Odgovara na činjenična pitanja — strukture, kvadrature, rokovi, način plaćanja — i priprema razgovor. Pregovor i poverenje ostaju na prodavcu, jer se stan ne kupuje od asistenta.",
    },
    {
      q: "Odakle asistentu podaci o stanovima?",
      a: "Iz vaše evidencije stanova, koja je jedan izvor istine. Ako takva evidencija ne postoji, ona je prvi korak — asistent nad netačnom tabelom samo brže širi netačan podatak.",
    },
    {
      q: "Radi li to i za agenciju, a ne samo za investitora?",
      a: "Radi, uz razliku da agencija vodi tuđu ponudu i više izvora. Logika je ista: jedan izvor istine o ponudi, kvalifikovan upit i zakazan obilazak.",
    },
    {
      q: "Da li se prikaz stanova na sajtu ažurira sam?",
      a: "Da, ako se sajt puni iz evidencije. Status se menja na jednom mestu i odatle ide svuda, pa nema slobodnog stana na sajtu koji je u tabeli rezervisan.",
    },
  ],
  relatedServices: [
    { label: "Interne poslovne aplikacije", href: "/our-services/interne-poslovne-aplikacije" },
    { label: "AI integracije i automatizacija", href: "/our-services/ai-integracije-automatizacija" },
    { label: "Izrada sajtova i web prezentacija", href: "/our-services/web-prezentacije" },
  ],
};

export const aiPages: AiPage[] = [
  salonsClinics,
  transportLogistics,
  hospitality,
  ecommerce,
  realEstate,
  propertyDevelopers,
  education,
  manufacturing,
  automotive,
  professionalServices,
  gyms,
];

export function getAiPage(slug: string): AiPage | undefined {
  return aiPages.find((page) => page.slug === slug);
}

/**
 * Slugs stay identical across locales, the same way service slugs do. A reader
 * switching language lands on the matching page rather than being dropped on
 * the index, and one canonical set of URLs keeps the hreflang map trivial.
 */
export function getAiPages(locale: LocaleCode): AiPage[] {
  if (locale === "en") return aiPagesEn;
  if (locale === "de") return aiPagesDe;
  return aiPages;
}

export function getAiPageFor(slug: string, locale: LocaleCode): AiPage | undefined {
  return getAiPages(locale).find((page) => page.slug === slug);
}

export function getAiIndex(locale: LocaleCode): AiIndexCopy {
  if (locale === "en") return aiIndexEn;
  if (locale === "de") return aiIndexDe;
  return aiIndex;
}

export type AiIndexCopy = {
  path: string;
  eyebrow: string;
  title: string;
  metaDescription: string;
  h1: string;
  lead: string;
  answer: string;
  keywords: string[];
  sections: AiSection[];
  faq: { q: string; a: string }[];
};

/** Hub copy. Kept next to the pages so the index cannot drift from the set. */
export const aiIndex: AiIndexCopy = {
  path: "/ai",
  eyebrow: "AI po delatnosti",
  title: "AI za firme — šta konkretno može, po delatnostima",
  metaDescription:
    "Šta veštačka inteligencija stvarno radi u malim i srednjim firmama, razloženo po delatnostima: saloni, transport, ugostiteljstvo, web shop, nekretnine, škole, proizvodnja, auto servisi, knjigovodstvo.",
  h1: "AI za firme, po delatnostima",
  lead:
    "Niko ne kupuje „AI\". Kupuje se manje telefoniranja, brža ponuda i manje prekucavanja. Ove stranice pokazuju koji je to tačno posao u tvojoj delatnosti — i koji se prvo isplati.",
  answer:
    "Za malu i srednju firmu AI je danas upotrebljiv na četiri mesta: prima i kvalifikuje upite kada niko ne gleda telefon, pravi ponudu iz tvog cenovnika za nekoliko minuta, čita dokumente sa slike umesto da se prekucavaju, i odgovara na pitanja koja se ponavljaju svakog dana. Šta je od toga prvo na redu ne zavisi od tehnologije nego od delatnosti — salonu je to zakazivanje, prevozniku ponuda i papiri, web shopu katalog, knjigovodstvenoj agenciji ulazni dokumenti.",
  keywords: [
    "AI za firme",
    "veštačka inteligencija u poslovanju",
    "AI automatizacija Srbija",
    "kako AI pomaže malim firmama",
    "AI po delatnostima",
  ],
  sections: [
    {
      heading: "Četiri posla koja se ponavljaju u svakoj delatnosti",
      bullets: [
        "Primanje i kvalifikacija upita — da odgovor ne čeka jutro.",
        "Ponuda i predračun iz tvojih cena — da posao ne ode bržem.",
        "Čitanje dokumenata — da se ne prekucava uveče.",
        "Odgovori na pitanja koja se ponavljaju — da telefon zvoni samo kad treba.",
      ],
      body: [
        "Sve ostalo je varijacija na ova četiri. Razlika između delatnosti nije u tome šta je moguće nego u tome koji od ova četiri posla tebi trenutno najviše košta.",
      ],
    },
    {
      heading: "Kako da znaš da li ti se isplati",
      body: [
        "Jedno merilo, bez kalkulatora: ako neko u firmi isti posao radi više od sat vremena dnevno i taj posao ne traži odluku nego tačnost — isplati se. Ako traži odluku, procenu ili odnos sa čovekom, ne isplati se i ne treba ni pokušavati.",
      ],
    },
  ],
  faq: [
    {
      q: "Koliko košta uvođenje AI u malu firmu?",
      a: "Zavisi od toga koliko poslova se automatizuje i da li postoji sistem na koji se kači. Jedan zaokružen posao — na primer zakazivanje ili obrada dokumenata — je manji projekat od izrade sajta. Tačna cena ide u ponudu posle razgovora, jer paušalna cifra ovde uvek promaši.",
    },
    {
      q: "Treba li nam prvo sajt pa onda AI?",
      a: "Ne obavezno. Zakazivanje, obrada dokumenata i interni alati rade i bez sajta. Sajt je potreban kad AI treba da prima upite od nepoznatih ljudi.",
    },
    {
      q: "Da li AI zamenjuje zaposlene?",
      a: "U firmi od pet do trideset ljudi — skoro nikad. Zamenjuje deo posla koji niko ne voli da radi i koji se radi posle radnog vremena. Firme te veličine obično nemaju višak ljudi nego manjak vremena.",
    },
    {
      q: "Šta ako moja delatnost nije na spisku?",
      a: "Obrazac je isti — četiri posla iznad postoje svuda. Javi šta se u tvojoj firmi ponavlja svakog dana i dobićeš odgovor da li se isplati, uključujući i odgovor da se ne isplati.",
    },
    {
      q: "Radite li i van Srbije?",
      a: "Da. Klijenti postoje u Srbiji, regionu i na DACH tržištu, a rad je udaljen sa sastancima uživo u Nišu kad ima potrebe.",
    },
  ],
};
