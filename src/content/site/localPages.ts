/**
 * Local (Niš) landing pages.
 *
 * The rest of the site speaks buyer-agency language — "web platforme",
 * "digitalni proizvod", "razvojni partner". The person with a salon or a
 * transport company does not use those words. They search "it firma u nisu",
 * "aplikacije nis izrada", "ko pravi sajtove". These pages are written in that
 * register, one page per way of asking, each with its own proof and its own FAQ.
 *
 * They are deliberately NOT the same page with the service swapped — near-identical
 * local pages read as a doorway scheme and get filtered. If a new one cannot say
 * something the others do not, it should not exist.
 */

export type LocalSection = {
  heading: string;
  body?: string[];
  bullets?: string[];
};

export type LocalProof = {
  label: string;
  href: string;
  note: string;
};

export type LocalPage = {
  path: string;
  eyebrow: string;
  title: string;
  metaDescription: string;
  h1: string;
  lead: string;
  keywords: string[];
  /** Overrides the LocalBusiness schema name so it matches the query intent. */
  businessName: string;
  sections: LocalSection[];
  proofHeading?: string;
  proof?: LocalProof[];
  faqHeading: string;
  faq: { q: string; a: string }[];
  cta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

const itCompany: LocalPage = {
  path: "/it-firma-nis",
  eyebrow: "Niš",
  title: "IT firma u Nišu — Adspire Digital",
  metaDescription:
    "IT firma iz Niša koja pravi sajtove, aplikacije i programe po meri za firme. 13 sistema u radu kod klijenata. Adresa, kontakt i šta konkretno radimo — bez stručnih izraza.",
  h1: "IT firma u Nišu",
  lead:
    "Adspire Digital je IT firma iz Niša. Pravimo sajtove, aplikacije i programe po meri za firme — ono što se ne kupuje gotovo, nego se pravi za konkretan posao. Trenutno je 13 sistema u svakodnevnom radu kod klijenata.",
  keywords: [
    "IT firma Niš",
    "it firme u nisu",
    "softverska firma Niš",
    "programiranje Niš",
    "IT usluge Niš",
    "firma za izradu softvera Niš",
  ],
  businessName: "Adspire Digital — IT firma u Nišu",
  sections: [
    {
      heading: "Šta konkretno radimo",
      body: [
        "„IT firma“ je širok pojam i pokriva dosta različitih poslova. Da ne biste gubili vreme na poziv koji ne vodi nikuda, evo tačno šta jeste i šta nije naš posao.",
      ],
      bullets: [
        "Sajtovi — od prezentacije firme do web shopa sa admin panelom.",
        "Aplikacije — za telefon i one koje rade u pretraživaču, bez instalacije.",
        "Programi po meri — evidencija, ponude, nalozi, zakazivanje, izveštaji.",
        "Povezivanje sa postojećim — knjigovodstvo, kuriri, magacin, mejl.",
        "Automatizacija i AI — poslovi koji se ponavljaju svakog dana.",
        "Održavanje i hosting posle isporuke.",
      ],
    },
    {
      heading: "Šta ne radimo",
      body: [
        "Ovo se najčešće traži od IT firme u Nišu, a mi to ne radimo — bolje da znate odmah nego posle poziva.",
      ],
      bullets: [
        "Servis i popravka računara.",
        "Postavljanje mreže i kablova u kancelariji.",
        "Prodaja opreme i licenci.",
        "IT podrška zaposlenima po ugovoru (helpdesk).",
      ],
    },
    {
      heading: "Kako izgleda saradnja",
      bullets: [
        "Kažete šta vas muči u poslu — ne morate da znate kako se to zove.",
        "Dobijate ponudu sa opisom posla, rokom i cenom. Bez naplate za razgovor.",
        "Radi se u fazama, plaća po fazama, prvo ono što najviše donosi.",
        "Sastanak uživo u Nišu ili online, kako vam odgovara.",
        "Posle isporuke sistem je vaš — kod, podaci i pristupi.",
      ],
    },
    {
      heading: "Zašto lokalno i dalje znači nešto",
      body: [
        "Većina posla se danas odradi na daljinu i to je u redu. Ali kada treba videti kako magacin stvarno radi, kako se prima porudžbina ili šta zaposleni zaista klikće po ceo dan — jedan sat na licu mesta vredi više od deset poziva. Za firme u Nišu to je jedno popodne, ne putovanje.",
      ],
    },
  ],
  proofHeading: "Sistemi koji rade kod klijenata",
  proof: [
    {
      label: "Prevoz Kop",
      href: "/our-projects/prevozkop-digitalni-prodajni-operativni-sistem",
      note: "Prodajni i operativni sistem za transportnu firmu.",
    },
    {
      label: "Dr Igić",
      href: "/our-projects/dr-igic-web-aplikacija-za-estetske-klinike",
      note: "Web aplikacija za estetske klinike — zakazivanje i evidencija pacijenata.",
    },
    {
      label: "Doctor Barber",
      href: "/our-projects/doctor-barber-online-booking-sistem",
      note: "Sistem za online zakazivanje termina.",
    },
    {
      label: "Santos & Santorini",
      href: "/our-projects/santos-santorini-web-shop-admin-platforma",
      note: "Web shop sa sopstvenim admin panelom.",
    },
    {
      label: "TeachFromHome",
      href: "/our-projects/teachfromhome-onboarding-sistem-za-remote-nastavnike",
      note: "Sistem za onboarding nastavnika na daljinu.",
    },
  ],
  faqHeading: "Česta pitanja",
  faq: [
    {
      q: "Čime se tačno bavi IT firma?",
      a: "Pojam pokriva nekoliko različitih poslova: izradu softvera i sajtova, održavanje računara i mreža, prodaju opreme, i IT podršku zaposlenima. Adspire radi samo prvo — pravi sajtove, aplikacije i programe po meri. Za servis računara ili mrežu treba vam druga vrsta firme.",
    },
    {
      q: "Radite li samo sa firmama iz Niša?",
      a: "Ne. Sedište je u Nišu, ali se radi i sa klijentima iz cele Srbije i inostranstva. Za firme iz Niša je lakše da se sastanemo uživo kada to ima smisla.",
    },
    {
      q: "Moram li da znam šta mi treba pre nego što se javim?",
      a: "Ne. Dovoljno je da opišete šta vas koči u poslu — ručni unos, gubljenje termina, papirologija. Kako se to rešava je naš deo posla.",
    },
    {
      q: "Koliko ljudi radi u firmi?",
      a: "Adspire je mali studio — jedan čovek u jezgru, uz saradnike po potrebi projekta. To znači da direktno pričate sa onim ko radi, bez posrednika i prosleđivanja.",
    },
    {
      q: "Koliko košta?",
      a: "Zavisi od obima. Rasponi po tipu projekta su objavljeni na stranici o ceni izrade sajta, a tačna cifra ide u ponudu po opisu posla.",
    },
  ],
  cta: { label: "Opiši šta ti treba", href: "/upit" },
  secondaryCta: { label: "Koliko to košta", href: "/cena-izrade-sajta" },
};

const appsInNis: LocalPage = {
  path: "/izrada-aplikacija-nis",
  eyebrow: "Niš",
  title: "Izrada aplikacija Niš — mobilne i web aplikacije po meri",
  metaDescription:
    "Izrada aplikacija u Nišu: za telefon, za pretraživač, ili program za internu upotrebu. Kako da znate koja vam treba, koliko traje i koliko realno košta.",
  h1: "Izrada aplikacija u Nišu",
  lead:
    "„Treba mi aplikacija“ znači tri različite stvari, i biraju se po tome ko je koristi, ne po tome šta zvuči ozbiljnije. Ovde je razlika objašnjena običnim jezikom, pa onda cena i rok.",
  keywords: [
    "izrada aplikacija Niš",
    "aplikacije Niš izrada",
    "izrada mobilnih aplikacija Niš",
    "programiranje aplikacija Niš",
    "web aplikacija Niš",
    "aplikacija za firmu Niš",
  ],
  businessName: "Adspire Digital — izrada aplikacija u Nišu",
  sections: [
    {
      heading: "Tri stvari koje ljudi zovu „aplikacija“",
      bullets: [
        "Aplikacija za telefon — skida se sa Google Play-a ili App Store-a. Treba kada je koriste vaši kupci često i kada su potrebne kamera, lokacija ili obaveštenja.",
        "Aplikacija u pretraživaču — otvara se kao sajt, radi i na telefonu i na računaru, ne instalira se. Jeftinija, brža, i u većini slučajeva dovoljna.",
        "Program za internu upotrebu — koriste ga vaši zaposleni, ne kupci. Evidencija, nalozi, ponude, zalihe, izveštaji.",
      ],
    },
    {
      heading: "Kako da znate koja vam treba",
      body: [
        "Odgovorite na tri pitanja i izbor se sam nametne. Većina firmi koje traže aplikaciju za telefon zapravo treba treću ili drugu opciju.",
      ],
      bullets: [
        "Ko je koristi? Ako zaposleni — program za internu upotrebu. Ako kupci — pitajte dalje.",
        "Koliko često? Ako jednom mesečno, niko neće instalirati aplikaciju. Ide u pretraživač.",
        "Treba li kamera, lokacija, ili obaveštenja na zaključanom ekranu? Ako da — telefon. Ako ne — pretraživač.",
      ],
    },
    {
      heading: "Koliko traje i šta se dešava usput",
      bullets: [
        "Aplikacija u pretraživaču: obično 4–8 nedelja do prve upotrebljive verzije.",
        "Aplikacija za telefon: 8–14 nedelja, plus vreme za odobrenje na Google Play-u i App Store-u.",
        "Interni program: od 6 nedelja, zavisno od broja procesa koje preuzima.",
        "Radi se u fazama — prva verzija radi jednu stvar dobro, ostalo se dodaje kada se ustali.",
        "Najduže obično traje odluka šta aplikacija ne treba da radi, ne samo šta treba.",
      ],
    },
    {
      heading: "Najskuplja greška",
      body: [
        "Praviti sve odjednom. Aplikacija koja pokušava deset stvari u prvoj verziji košta nekoliko puta više, izlazi mesecima kasnije, i po pravilu se ispostavi da se koriste dve od tih deset. Prva verzija treba da radi jednu stvar zbog koje se aplikacija uopšte pravi — ostalo tek kada se vidi kako je ljudi zaista koriste.",
      ],
    },
  ],
  proofHeading: "Aplikacije koje rade kod klijenata",
  proof: [
    {
      label: "Dr Igić",
      href: "/our-projects/dr-igic-web-aplikacija-za-estetske-klinike",
      note: "Web aplikacija za klinike — zakazivanje i evidencija, bez instalacije.",
    },
    {
      label: "Prevoz Kop",
      href: "/our-projects/prevozkop-digitalni-prodajni-operativni-sistem",
      note: "Interni program za prodaju i operativu transportne firme.",
    },
    {
      label: "TeachFromHome",
      href: "/our-projects/teachfromhome-onboarding-sistem-za-remote-nastavnike",
      note: "Sistem koji vodi nastavnike kroz onboarding korak po korak.",
    },
  ],
  faqHeading: "Česta pitanja",
  faq: [
    {
      q: "Koliko košta izrada aplikacije?",
      a: "Aplikacija u pretraživaču kreće od oko 2.500 €, interni program je 4.000–15.000 € zavisno od broja procesa, a aplikacija za telefon je po pravilu skuplja jer se pravi za dva sistema i prolazi odobrenje prodavnica. Tačna cifra ide u ponudu po opisu posla.",
    },
    {
      q: "Mora li aplikacija da bude na Google Play-u?",
      a: "Ne. Ako je koriste vaši zaposleni ili se koristi retko, aplikacija u pretraživaču radi isto a nema odobrenja, ažuriranja i provizije prodavnica. Na Play ide onda kada je kupci koriste često i kada treba da stoji na početnom ekranu telefona.",
    },
    {
      q: "Da li mogu kasnije da dodam funkcije?",
      a: "Da, i tako i treba. Prva verzija namerno radi manje. Dodavanje na sistem koji već radi je jeftinije i sigurnije od pokušaja da se sve pogodi iz prve.",
    },
    {
      q: "Ko je vlasnik aplikacije?",
      a: "Vi — kod, podaci i nalozi u prodavnicama. Bez toga zavisite od izvođača za svaku buduću izmenu.",
    },
    {
      q: "Radite li aplikacije samo za firme iz Niša?",
      a: "Ne, radi se sa klijentima iz cele Srbije i inostranstva. Za firme iz Niša je jednostavnije da se pre početka vidimo uživo i prođemo kroz proces na licu mesta.",
    },
  ],
  cta: { label: "Opiši šta aplikacija treba da radi", href: "/upit" },
  secondaryCta: { label: "Usluga: mobilne aplikacije", href: "/our-services/mobilne-aplikacije" },
};

const bookingInNis: LocalPage = {
  path: "/rezervacioni-sistemi-nis",
  eyebrow: "Niš",
  title: "Rezervacioni sistemi Niš — online zakazivanje za lokalne firme",
  metaDescription:
    "Rezervacioni i sistemi za zakazivanje za firme iz Niša: saloni, klinike, servisi, teretane. Šta sistem preuzima, koliko košta i kako se uvodi bez zastoja u radu.",
  h1: "Rezervacioni sistemi u Nišu",
  lead:
    "Ako se termini i dalje dogovaraju preko poziva i poruka, jedan čovek je jedina baza podataka — i svaki propušten poziv je izgubljen posao. Ovde je šta rezervacioni sistem preuzima, koliko košta, i kako se uvodi kod firmi u Nišu.",
  keywords: [
    "rezervacioni sistemi Niš",
    "sistem za rezervacije Niš",
    "online zakazivanje Niš",
    "zakazivanje termina Niš",
    "aplikacija za zakazivanje salon Niš",
    "booking sistem Niš",
  ],
  businessName: "Adspire Digital — rezervacioni sistemi u Nišu",
  sections: [
    {
      heading: "Za koga se najčešće radi",
      bullets: [
        "Frizerski i kozmetički saloni — termini po zaposlenom, različito trajanje po usluzi.",
        "Klinike i ordinacije — zakazivanje spojeno sa kartonom pacijenta.",
        "Servisi i majstori — dolazak na adresu, raspored po danu i području.",
        "Teretane i studiji — grupni termini sa ograničenim brojem mesta.",
        "Restorani i objekti — rezervacija stola po vremenu i broju ljudi.",
      ],
    },
    {
      heading: "Šta se promeni prve nedelje",
      bullets: [
        "Zakazivanje radi i posle radnog vremena — najviše rezervacija stiže uveče.",
        "Nema duplih termina, jer je kalendar jedan i zajednički.",
        "Podsetnik dan ranije smanjuje nedolaske — najjeftinija stvar koja direktno vraća novac.",
        "Prestaje prekidanje posla zbog telefona usred usluge.",
        "Prvi put se vidi koja usluga i koji termin se najviše traže.",
      ],
    },
    {
      heading: "Kako se uvodi bez zastoja",
      body: [
        "Salon ne može da stane dok se sistem uvodi. Zato se ne pušta sve odjednom.",
      ],
      bullets: [
        "Prve dve-tri najtraženije usluge idu online, ostale ostaju kao do sada.",
        "Telefon i dalje radi — samo se termin upisuje u isti kalendar.",
        "Zaposleni prvo dobijaju svoj raspored na telefonu; to je deo koji im olakšava dan.",
        "Kada nedelju dana prođe bez pitanja, prelazi se na ostatak.",
      ],
    },
    {
      heading: "Gotova platforma ili sopstveni sistem",
      body: [
        "Gotove platforme za zakazivanje su brz i razuman start ako je posao standardan — jedna lokacija, jednostavne usluge. Plaća se mesečno, po zaposlenom, i radi se po njihovim pravilima.",
        "Sopstveni sistem ima smisla kada pravila ne staju u tuđi model — smene, pripremno vreme, više lokacija, cena koja zavisi od usluge — ili kada zakazivanje treba da se poveže sa kartonom, naplatom i izveštajima. Tada je jednokratno ulaganje umesto pretplate koja raste sa timom.",
      ],
    },
  ],
  proofHeading: "Rezervacioni sistemi u radu",
  proof: [
    {
      label: "Doctor Barber",
      href: "/our-projects/doctor-barber-online-booking-sistem",
      note: "Online zakazivanje za berbernicu — termini po zaposlenom i potvrde.",
    },
    {
      label: "Dr Igić",
      href: "/our-projects/dr-igic-web-aplikacija-za-estetske-klinike",
      note: "Zakazivanje u estetskoj klinici, spojeno sa evidencijom pacijenata.",
    },
  ],
  faqHeading: "Česta pitanja",
  faq: [
    {
      q: "Koliko košta rezervacioni sistem?",
      a: "Za sopstveni sistem raspon je 2.500–6.000 €, u zavisnosti od pravila zakazivanja, broja zaposlenih i lokacija, i toga da li se povezuje sa naplatom ili evidencijom klijenata.",
    },
    {
      q: "Mora li klijent da pravi nalog da bi rezervisao?",
      a: "Ne, i bolje je da ne mora. Svaki korak pre potvrde termina smanjuje broj rezervacija. Ime, telefon i termin su dovoljni.",
    },
    {
      q: "Da li podsetnik ide SMS-om?",
      a: "Može SMS, Viber ili mejl. U praksi SMS i Viber imaju znatno veću stopu čitanja za podsetnik na termin. SMS ima trošak po poruci, pa se obično kombinuje sa besplatnim kanalima.",
    },
    {
      q: "Šta ako zaposleni ne žele da pređu na sistem?",
      a: "Otpor je skoro uvek zato što sistem traži više klikova nego sveska. Zato se prvo pušta ono što im olakšava dan — raspored na telefonu — a tek onda ostalo.",
    },
    {
      q: "Može li da se poveže sa postojećim sajtom?",
      a: "Da. Zakazivanje se najčešće ugrađuje u postojeći sajt kao zasebna stranica ili dugme, bez pravljenja novog sajta.",
    },
    {
      q: "Radite li sastanak uživo u Nišu?",
      a: "Da. Za salone i klinike je često najbrže da se dođe na lice mesta i vidi kako se termini vode sada — sat vremena tamo skrati nedelju dana dopisivanja.",
    },
  ],
  cta: { label: "Opiši kako zakazuješ sada", href: "/upit" },
  secondaryCta: { label: "Detaljan vodič o zakazivanju", href: "/online-zakazivanje-za-salone-i-klinike" },
};

export const localPages = [itCompany, appsInNis, bookingInNis] as const;

export const itCompanyNisPage = itCompany;
export const appsNisPage = appsInNis;
export const bookingNisPage = bookingInNis;
