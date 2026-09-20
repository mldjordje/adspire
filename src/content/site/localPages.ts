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
  title: "IT firma u Nišu — Adspire",
  metaDescription:
    "IT firma iz Niša koja pravi sajtove, aplikacije i programe po meri za firme. 13 sistema u radu kod klijenata. Adresa, kontakt i šta konkretno radimo — bez stručnih izraza.",
  h1: "IT firma u Nišu",
  lead:
    "Adspire je IT firma iz Niša. Pravimo sajtove, aplikacije i programe po meri za firme — ono što se ne kupuje gotovo, nego se pravi za konkretan posao. Trenutno je 13 sistema u svakodnevnom radu kod klijenata.",
  keywords: [
    "IT firma Niš",
    "it firme u nisu",
    "softverska firma Niš",
    "programiranje Niš",
    "IT usluge Niš",
    "firma za izradu softvera Niš",
  ],
  businessName: "Adspire — IT firma u Nišu",
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
  businessName: "Adspire — izrada aplikacija u Nišu",
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
      a: "Aplikacija u pretraživaču kreće od oko 1.750 €, interni program je 2.800–10.500 € zavisno od broja procesa, a aplikacija za telefon je po pravilu skuplja jer se pravi za dva sistema i prolazi odobrenje prodavnica. Tačna cifra ide u ponudu po opisu posla.",
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
  businessName: "Adspire — rezervacioni sistemi u Nišu",
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
      a: "Za sopstveni sistem raspon je 1.750–4.200 €, u zavisnosti od pravila zakazivanja, broja zaposlenih i lokacija, i toga da li se povezuje sa naplatom ili evidencijom klijenata.",
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

const shopInNis: LocalPage = {
  path: "/web-shop-nis",
  eyebrow: "Niš",
  title: "Izrada web shopa Niš — online prodavnica sa naplatom i kuririma",
  metaDescription:
    "Izrada web shopa u Nišu: plaćanje karticom preko banke, pouzeće, povezivanje sa kurirskom službom i fiskalni račun. Šta sve mora da radi pre prve porudžbine i koliko košta.",
  h1: "Izrada web shopa u Nišu",
  lead:
    "Katalog i korpa su manji deo posla. Ono što odluči da li shop radi su naplata, kurir i račun koji kupac mora da dobije. Ovde je šta se od toga rešava kodom, a šta u banci i kod knjigovođe.",
  keywords: [
    "izrada web shopa Niš",
    "online prodavnica Niš",
    "web prodavnica Niš",
    "e-commerce Niš",
    "sajt za prodaju Niš",
    "internet prodavnica Niš",
  ],
  businessName: "Adspire — izrada web shopa u Nišu",
  sections: [
    {
      heading: "Tri stvari koje se uvek potcene",
      body: [
        "Kod domaćih shopova posao ne zapne na dizajnu. Zapne na ove tačke, i svaka ima rok koji ne zavisi od programera.",
      ],
      bullets: [
        "Plaćanje karticom traži ugovor sa bankom i trgovački račun. Od predaje papira do puštanja u rad prođe nekoliko nedelja, i to vreme teče paralelno sa izradom, ne posle nje.",
        "Fiskalni račun je obaveza i za online prodaju. Mora da se izda i pošalje kupcu, pa shop od početka mora da zna da ga povuče iz sistema koji ga izdaje.",
        "Pouzeće i dalje nosi većinu porudžbina. To znači otkupninu, povraćaj novca od kurira i pakete koji se ne preuzmu, a sve to neko mora da vodi u adminu.",
      ],
    },
    {
      heading: "Kurir odlučuje koliko porudžbina uopšte stigne",
      body: [
        "Cena dostave prikazana tek na poslednjem koraku je najčešći razlog napuštene korpe kod domaćih shopova. Zato se cena računa na strani proizvoda, a ne pred plaćanje.",
        "Post Express, D Express, BEX i AKS rade sa preuzimanjem i otkupninom. Kada se shop poveže sa njima, otpremnica i kod za praćenje se prave iz admina, umesto da se svaka pošiljka ručno kuca na sajtu kurirske službe.",
      ],
    },
    {
      heading: "Admin je proizvod, ne dodatak",
      bullets: [
        "Zalihe se skidaju u trenutku porudžbine, da se ne proda ono čega nema.",
        "Porudžbina ima stanje: primljena, spakovana, predata kuriru, naplaćena.",
        "Izveštaj za knjigovodstvo se izvozi, ne prepisuje.",
        "Više cena za isti artikal — maloprodaja, veleprodaja, akcija — bez menjanja koda.",
        "Ko šta sme da vidi: prodavac vidi porudžbine, ne vidi maržu.",
      ],
    },
    {
      heading: "Kada web shop nije odgovor",
      body: [
        "Sa pet artikala i dvadesetak porudžbina mesečno, shop se ne isplati. Instagram i telefon rade taj obim bez troška, a novac je bolje uložiti u to da vas neko nađe.",
        "Sopstveni shop ima smisla kada broj porudžbina počne da guši ručni rad, kada asortiman ima varijante i zalihe, ili kada provizija platforme na kojoj sada prodajete pređe cenu izrade za godinu dana.",
      ],
    },
    {
      heading: "Cena i rok",
      body: [
        "Web shop je 2.100–5.600 €, i unutar tog raspona razliku prave integracije, ne broj proizvoda. Povezivanje sa kurirom, knjigovodstvom i sistemom za fiskalne račune podiže gornju granicu.",
        "Do puštanja u rad ide 6–10 nedelja, pod uslovom da se papirologija za karticu pokrene prve nedelje. Ako se to ostavi za kraj, shop stoji gotov i čeka banku.",
      ],
    },
  ],
  proofHeading: "Shop koji radi kod klijenta",
  proof: [
    {
      label: "Santos & Santorini",
      href: "/our-projects/santos-santorini-web-shop-admin-platforma",
      note: "Web shop sa sopstvenim admin panelom za porudžbine i artikle.",
    },
    {
      label: "Prevoz Kop",
      href: "/our-projects/prevozkop-digitalni-prodajni-operativni-sistem",
      note: "Prodajni i operativni sistem — isti pristup adminu, druga delatnost.",
    },
  ],
  faqHeading: "Česta pitanja",
  faq: [
    {
      q: "Koliko košta izrada web shopa?",
      a: "2.100–5.600 € za custom izradu sa katalogom, korpom, naplatom i adminom za porudžbine i zalihe. Integracije sa kurirskom službom i knjigovodstvom idu ka gornjoj granici. Tačna cifra ide u ponudu po opisu asortimana i načina isporuke.",
    },
    {
      q: "Da li mi treba plaćanje karticom ili je pouzeće dovoljno?",
      a: "Za većinu domaćih shopova pouzeće nosi najveći deo porudžbina i može se krenuti samo sa njim. Kartica se isplati kada prodajete u inostranstvo, kada su iznosi veći, ili kada vas ubija broj nepreuzetih paketa — plaćeno unapred se skoro uvek preuzme.",
    },
    {
      q: "Ko izdaje fiskalni račun za online prodaju?",
      a: "Prodavac, isto kao u radnji. Račun se izdaje kroz sistem za fiskalizaciju i šalje kupcu uz porudžbinu. Shop se povezuje sa tim sistemom da se račun ne kuca ručno za svaku porudžbinu.",
    },
    {
      q: "Zašto ne WooCommerce ili Shopify?",
      a: "Oba su razuman izbor kada je prodaja standardna i kada vam odgovara da plaćate mesečno. Sopstveni shop se isplati kada pravila ne staju u tuđi model — cene po kupcu, varijante sa zalihama po lokaciji, povezivanje sa internim sistemom — ili kada provizija i dodaci na godišnjem nivou pređu cenu izrade.",
    },
    {
      q: "Mogu li sam da menjam artikle i cene?",
      a: "Da, to je osnovna svrha admina. Artikli, cene, akcije, opisi i slike se menjaju bez nas. Nama se javljate za nove funkcije, ne za izmenu cene.",
    },
    {
      q: "Radite li shopove za firme van Niša?",
      a: "Da, radi se sa klijentima iz cele Srbije i inostranstva. Za firme iz Niša je lakše da se prvi sastanak odradi uživo, posebno kada treba videti kako sada ide pakovanje i slanje.",
    },
  ],
  cta: { label: "Opiši šta prodaješ", href: "/upit" },
  secondaryCta: { label: "Usluga: e-commerce", href: "/our-services/e-commerce-web-shop" },
};

const seoInNis: LocalPage = {
  path: "/seo-optimizacija-nis",
  eyebrow: "Niš",
  title: "SEO optimizacija Niš — da vas nađu ljudi iz vašeg grada",
  metaDescription:
    "SEO za firme iz Niša: mapa i Google poslovni profil, pretrage „blizu mene“, recenzije i strane po usluzi. Šta se realno može obećati, za koliko vremena i kada SEO nije prvi potez.",
  h1: "SEO optimizacija u Nišu",
  lead:
    "Lokalna firma se ne bori za isto mesto kao onlajn prodavnica. Bori se za tri mesta u mapi koja Google pokaže iznad svih rezultata. To je drugi posao od klasične optimizacije i radi se drugim redom.",
  keywords: [
    "SEO optimizacija Niš",
    "SEO Niš",
    "optimizacija sajta Niš",
    "google optimizacija Niš",
    "lokalni SEO Niš",
    "pozicioniranje sajta Niš",
  ],
  businessName: "Adspire — SEO optimizacija u Nišu",
  sections: [
    {
      heading: "Dve borbe koje se često pomešaju",
      body: [
        "Kada neko u Nišu ukuca „stomatolog“ ili „auto servis“, Google prvo pokaže mapu sa tri firme. Ispod toga idu linkovi. Većina poziva dolazi iz te mape, a mapa se ne osvaja tekstom na sajtu.",
        "Plavi linkovi ispod mape se osvajaju sadržajem: jedna strana po usluzi, napisana rečima kojima ljudi pitaju. Tu sajt radi posao. Zato se obično ide na oba koloseka, ali prvo na onaj koji brže donosi pozive.",
      ],
    },
    {
      heading: "Šta odlučuje mesto u mapi",
      bullets: [
        "Kategorija profila — pogrešno izabrana kategorija isključuje vas iz pretrage bez ijedne druge greške.",
        "Blizina korisnika, na koju niko ne može da utiče. Firma u Duvaništu neće biti prva za nekoga na Paliluli i to nije propust optimizacije.",
        "Recenzije i odgovori na njih. Broj je manje bitan od toga da stižu kontinuirano i da vlasnik odgovara.",
        "Ista adresa i isti broj telefona svuda gde firma postoji na internetu.",
        "Fotografije koje niste slikali jednom pre tri godine.",
      ],
    },
    {
      heading: "Šta se može obećati, a šta ne",
      body: [
        "Niko ne može da garantuje prvo mesto, i ponuda koja to nudi ili prodaje brend pretragu — gde biste ionako bili prvi — ili ne zna kako Google radi.",
        "Ono što se može obećati je merljivo: koje pretrage ciljamo, koliko strana se piše, šta se popravlja na profilu i koje brojke pratimo. Prve promene u mapi se vide za 4–8 nedelja. Za konkurentne pretrage u organskim rezultatima računajte na 3–6 meseci.",
      ],
    },
    {
      heading: "Kada SEO nije prvi potez",
      body: [
        "Ako sajt već dobija posete a niko se ne javlja, problem nije vidljivost. Dovođenje još ljudi na stranu koja ne ubeđuje samo brže troši novac.",
        "Ako vam posao treba ovog meseca, oglasi rade odmah, a SEO tek za nekoliko meseci. Razumno je pustiti oglase dok se organski deo gradi, ali tada treba znati koliko vas košta jedan upit. Inače se ne zna šta je vrednije.",
      ],
    },
    {
      heading: "Kako se to radi kod nas",
      bullets: [
        "Prvo se vidi šta ljudi zaista kucaju za vašu delatnost u Nišu, ne šta zvuči ozbiljno.",
        "Poslovni profil se sređuje pre sajta jer najbrže vraća pozive.",
        "Po jedna strana za svaku uslugu koja se traži zasebno, umesto jedne strane „Usluge“ sa spiskom.",
        "Brzina učitavanja i mobilni prikaz se popravljaju u kodu, ne dodatkom koji obećava ocenu.",
        "Mesečno se gleda šta je donelo pozive, i po tome se bira šta se piše sledeće.",
      ],
    },
  ],
  proofHeading: "Sajtovi na kojima ovo radi",
  proof: [
    {
      label: "Doctor Barber",
      href: "/our-projects/doctor-barber-online-booking-sistem",
      note: "Lokalna usluga gde se pretraga i zakazivanje nastavljaju jedno na drugo.",
    },
    {
      label: "Dr Igić",
      href: "/our-projects/dr-igic-web-aplikacija-za-estetske-klinike",
      note: "Klinika — po strana za svaku uslugu, jer se svaka traži zasebno.",
    },
  ],
  faqHeading: "Česta pitanja",
  faq: [
    {
      q: "Koliko košta SEO u Nišu?",
      a: "Zavisi od toga da li se radi jednokratno sređivanje ili se radi mesečno. Jednokratno sređivanje profila i postojećih strana je manji posao od pisanja nove strane svake nedelje. Cena ide u ponudu po opisu delatnosti i konkurencije, bez pretplate koja se ne može otkazati.",
    },
    {
      q: "Koliko treba da se vide rezultati?",
      a: "Za Google poslovni profil 4–8 nedelja. Za organske rezultate na traženim pretragama 3–6 meseci, duže ako u Nišu ima mnogo firmi u vašoj delatnosti. Svako ko kaže „za dve nedelje“ govori o pretragama koje ionako niko ne kuca.",
    },
    {
      q: "Garantujete li prvo mesto na Google-u?",
      a: "Ne. To niko ne može, jer rezultat zavisi i od blizine korisnika i od konkurencije koja se menja. Garantuje se šta se radi i šta se meri, a napredak se prati po pretragama koje su dogovorene na početku.",
    },
    {
      q: "Da li mi treba nov sajt da bih se bolje rangirao?",
      a: "Često ne. Postojeći sajt se prvo izmeri — brzina, struktura strana, tekst. Nov sajt ima smisla kada je stari toliko spor ili neuredan da bi popravka koštala kao izrada, ili kada nema gde da se smesti sadržaj koji treba da se piše.",
    },
    {
      q: "Šta je sa AI odgovorima, hoće li me ChatGPT preporučiti?",
      a: "To je zaseban posao i drugačije se radi od klasičnog SEO-a. Jezički modeli biraju izvore po tome koliko je odgovor jasno napisan i koliko je tvrdnja proverljiva. O tome postoji posebna strana o AI preporuci.",
    },
    {
      q: "Radite li i oglase?",
      a: "Da, ali ih ne prodajemo kao zamenu za SEO. Oglasi se koriste dok organski deo ne proradi, ili za usluge gde je jedan upit vredan dovoljno da se klik isplati.",
    },
  ],
  cta: { label: "Reci za šta hoćeš da te nađu", href: "/upit" },
  secondaryCta: { label: "Da vas AI preporuči", href: "/da-vas-ai-preporuci" },
};

const nisHub: LocalPage = {
  path: "/nis",
  eyebrow: "Niš",
  title: "Adspire Niš — adresa, sastanak i šta radimo u gradu",
  metaDescription:
    "Adspire je iz Niša: Dimitrija Leka 66. Kako izgleda prvi sastanak, koje gradove u okolini pokrivamo i koja strana odgovara na to što tražite.",
  h1: "Adspire u Nišu",
  lead:
    "Sedište je u Nišu, na Dimitrija Leka 66. Ovo je strana za one koji prvo hoće da znaju sa kim pričaju i da li može uživo, pre nego što uđu u to šta se tačno pravi.",
  keywords: [
    "Adspire Niš",
    "web agencija Niš",
    "IT firma Niš kontakt",
    "softverska firma Niš adresa",
    "izrada sajtova Niš",
    "digitalna agencija Niš",
  ],
  businessName: "Adspire — Niš",
  sections: [
    {
      heading: "Kako izgleda prvi sastanak",
      body: [
        "Traje oko sat vremena i ne naplaćuje se. Nije prezentacija. Pitanja idu ka tome kako posao sada ide i gde se gubi vreme.",
      ],
      bullets: [
        "Ponesite ono što sada koristite: Excel tabelu, svesku sa terminima, primer ponude ili fakture.",
        "Ne morate da znate kako se zove ono što vam treba. Opis problema je dovoljan.",
        "Na kraju sastanka znate da li se posao isplati i koji je red veličine cene.",
        "Ponuda stiže u roku od nekoliko dana, sa opisom posla, rokom i cenom po fazama.",
        "Ako procenimo da vam to ne treba, čućete na sastanku, a ne posle plaćene analize.",
      ],
    },
    {
      heading: "Koga pokrivamo uživo",
      body: [
        "Niš i okolina su na dohvat za sastanak istog dana: Niška Banja, Merošina, Doljevac, Aleksinac. Leskovac, Pirot, Prokuplje i Vranje su pola dana, pa se tamo ide kada ima šta da se vidi na licu mesta.",
        "Za ostatak Srbije i za klijente iz inostranstva sve ide onlajn i to radi bez problema. Uživo se ide onda kada treba videti magacin, salon ili proizvodnju, jer tu jedan obilazak skrati nedelju dana dopisivanja.",
      ],
    },
    {
      heading: "Šta se ne naplaćuje",
      bullets: [
        "Prvi razgovor i procena, bez obzira na to da li se posle radi.",
        "Ponuda sa opisom posla i rokom.",
        "Izmene u okviru dogovorenog obima dok se posao radi.",
      ],
    },
    {
      heading: "Gde da nastavite",
      body: [
        "Strane ispod su podeljene po tome kako ljudi pitaju, a ne po tome kako se usluge zovu kod nas. Uzmite onu koja liči na vaše pitanje.",
      ],
    },
  ],
  faqHeading: "Česta pitanja",
  faq: [
    {
      q: "Gde se nalazite u Nišu?",
      a: "Dimitrija Leka 66, 18000 Niš. Sastanci idu po dogovoru, pa se javite na +381 60 149 149 1 ili na djordje@adspire.rs pre dolaska.",
    },
    {
      q: "Može li sastanak van radnog vremena?",
      a: "Može. Vlasnici salona, servisa i ordinacija najčešće mogu tek posle zatvaranja, pa se sastanak zakazuje uveče ili pre otvaranja.",
    },
    {
      q: "Da li radite sa firmama iz okoline Niša?",
      a: "Da. Za Nišku Banju, Aleksinac, Doljevac i Merošinu dolazak nije problem. Za Leskovac, Pirot i Vranje se ide kada ima šta da se obiđe, a ostalo se dogovara onlajn.",
    },
    {
      q: "Koliko vas ima u timu?",
      a: "Jezgro je jedan čovek, uz saradnike po potrebi projekta. Znači da pričate direktno sa onim ko radi, i da se ne uzima više poslova nego što se stigne.",
    },
    {
      q: "Sa čime da dođem na prvi sastanak?",
      a: "Sa onim što sada koristite u poslu i sa jednom rečenicom o tome šta vas najviše koči. Tabela, sveska ili primer ponude kažu više od opisa.",
    },
  ],
  cta: { label: "Zakaži razgovor", href: "/contact-us" },
  secondaryCta: { label: "Opiši projekat", href: "/upit" },
};

export const localPages = [itCompany, appsInNis, bookingInNis, shopInNis, seoInNis, nisHub] as const;

export const itCompanyNisPage = itCompany;
export const appsNisPage = appsInNis;
export const bookingNisPage = bookingInNis;
export const shopNisPage = shopInNis;
export const seoNisPage = seoInNis;
export const nisHubPage = nisHub;
