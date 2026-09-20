import type { IndustryPage } from "./types";
import { tozaAiProof } from "./proof";

export const kreativniStudiji: IndustryPage = {
  slug: "softver-za-kreativni-studio-i-agenciju",
  sector: "kreativne-industrije",
  navLabel: "Kreativni studiji i agencije",
  seo: {
    title: "Softver za kreativni studio i agenciju",
    metaDescription:
      "Sistem po meri za studio, produkciju i agenciju: paketi i pretplate, sati u nalogu klijenta, odobravanje materijala sa komentarima, termini snimanja, predaja fajlova i automatsko fakturisanje.",
    keywords: [
      "softver za agenciju",
      "program za kreativni studio",
      "praćenje sati po klijentu",
      "odobravanje materijala klijent",
      "paketi i pretplate agencija",
      "fakturisanje agencija softver",
      "sistem za produkciju",
    ],
  },
  hero: {
    eyebrow: "Kreativne industrije · studio i agencija",
    title: "Studio u kome se zna šta je klijent kupio i koliko mu je ostalo",
    lead: "Pravimo sistem koji vodi paket od kupovine do predaje: sati u nalogu, termini snimanja, krugovi ispravki sa rokom i faktura koja izlazi sama.",
  },
  summary:
    "Kreativnom studiju i agenciji sistem rešava ono zbog čega se najviše gubi novac i živaca: klijent kupi paket i troši ga iz svog naloga, pa se ne raspravlja koliko je sati potrošeno; ispravke idu kroz komentare na materijalu sa dogovorenim brojem krugova; termini snimanja i montaže stoje u zajedničkom rasporedu; a faktura se pravi iz onoga što je stvarno isporučeno. Adspire to gradi po meri — sajt koji prodaje paket, web aplikaciju za klijente, mobilnu aplikaciju za ekipu na terenu i interni admin za posao i naplatu.",
  audience: [
    "Video produkcija i foto studio sa terenskim snimanjima",
    "Marketing agencija sa mesečnim pretplatama za više klijenata",
    "Studio koji prodaje pakete sati ili broj isporuka mesečno",
    "Samostalni autor sa stalnim klijentima i ponavljajućim poslom",
  ],
  dayInTheLife: [
    {
      title: "Klijent misli da je kupio više nego što jeste",
      body: "Paket je bio pet klipova, a traži se sedmi „pošto ionako već radite“. Bez naloga u kome stoji šta je kupljeno i šta je potrošeno, svaki takav razgovor se vodi iz početka.",
    },
    {
      title: "Ispravke nemaju kraj",
      body: "Treća verzija, pa četvrta, pa se vraća na prvu. Komentari stižu na WhatsApp, mejl i u pozivu, jedan protivreči drugom, a niko ne zna koja je verzija poslednja.",
    },
    {
      title: "Fajlovi žive na pet mesta",
      body: "Materijal na disku, finalne verzije u oblaku, linkovi u porukama koje ističu. Klijent traži klip od pre godinu dana i pola dana ode na traženje.",
    },
    {
      title: "Sati se ne mere, pa se ne naplaćuju",
      body: "Sitni zahtevi između poslova — izmena teksta, novi format, brza obrada. Pojedinačno je to deset minuta, mesečno je to nedelja rada koja nije na fakturi.",
    },
    {
      title: "Fakturisanje je poseban posao na kraju meseca",
      body: "Ko je šta dobio, po kom paketu, šta je dodatno. Dva dana svakog meseca odlaze na sastavljanje faktura iz beleški umesto na posao koji se plaća.",
    },
  ],
  layers: {
    site: {
      lead: "Sajt studija ne treba da bude samo portfolio — treba da proda konkretan paket konkretnom kupcu.",
      items: [
        {
          title: "Paket kao proizvod, ne kao ponuda na upit",
          body: "Šta ulazi, koliko isporuka, koliko krugova ispravki, koji rok. Kupac koji vidi granicu paketa lakše kupuje i kasnije manje pregovara.",
        },
        {
          title: "Radovi sortirani po vrsti posla",
          body: "Reklama, event, proizvod, korporativno. Naručilac traži primer sličan svom poslu, a ne najlepši rad u portfoliju.",
        },
        {
          title: "Upit sa budžetom i rokom",
          body: "Dva polja koja odlučuju da li posao uopšte ima smisla. Upit bez njih troši tri poruke pre nego što razgovor počne.",
        },
        {
          title: "Kupovina paketa bez sastanka",
          body: "Manji paketi se plaćaju odmah sa sajta i odmah pretvaraju u nalog. Sastanak ostaje za poslove kod kojih se stvarno isplati.",
        },
      ],
    },
    webApp: {
      lead: "Web aplikacija je nalog klijenta — jedno mesto za paket, materijale, komentare i račune.",
      items: [
        {
          title: "Stanje paketa u satima ili isporukama",
          body: "Koliko je kupljeno, koliko potrošeno, koliko ostaje. Broj koji stoji pred oba oka ukida devedeset posto rasprava o obimu.",
        },
        {
          title: "Odobravanje sa komentarom na tačnom mestu",
          body: "Komentar se ostavlja na sekundi u videu ili na delu slike. Jedna verzija, jedna nit, jasno ko je šta tražio i kada.",
        },
        {
          title: "Krugovi ispravki sa brojačem",
          body: "Dva kruga su u paketu, treći se naplaćuje. Sistem broji umesto da neko mora da kaže neprijatnu rečenicu.",
        },
        {
          title: "Arhiva svih isporuka",
          body: "Sve finalne verzije, u svim formatima, na jednom mestu, bez linkova koji ističu. Klijent sam nađe klip od prošle godine.",
        },
      ],
    },
    mobile: {
      lead: "Mobilna aplikacija je za ekipu na snimanju i za klijenta koji odobrava iz hodnika.",
      items: [
        {
          title: "Raspored snimanja i ekipa",
          body: "Ko je gde, u koliko, sa kojom opremom. Terenski dan se ne dogovara u tri grupe na tri aplikacije.",
        },
        {
          title: "Lista kadrova na telefonu",
          body: "Šta mora da se snimi, šta je već snimljeno, čekirano na licu mesta. Povratak na lokaciju zbog zaboravljenog kadra je najskuplja greška u produkciji.",
        },
        {
          title: "Odobravanje u pokretu",
          body: "Klijent pogleda verziju i odobri sa telefona. Čekanje na odobrenje je najčešći razlog zašto isporuka kasni.",
        },
        {
          title: "Oprema i zaduženja",
          body: "Ko je uzeo koji objektiv, mikrofon ili disk i kada vraća. Oprema koja nestaje je tihi trošak svakog studija.",
        },
      ],
    },
    internal: {
      lead: "Interni deo pokazuje koji klijent stvarno plaća vreme koje troši, a koji samo izgleda velik.",
      items: [
        {
          title: "Paketi, pretplate i obnavljanje",
          body: "Mesečni paketi, potrošnja i datum obnove. Pretplata koja treba da se obnovi javlja se pre nego što istekne, a ne mesec dana kasnije.",
        },
        {
          title: "Sati po poslu i po čoveku",
          body: "Koliko je stvarno utrošeno na snimanje, montažu i ispravke. Posao koji je izgledao isplativo često nije, i to se vidi tek ovde.",
        },
        {
          title: "Tok posla sa rokovima",
          body: "Brief, snimanje, gruba verzija, ispravke, isporuka. Svaka faza ima nosioca i rok, pa se ne javlja da posao kasni tek kad rok prođe.",
        },
        {
          title: "Fakturisanje iz isporučenog",
          body: "Faktura se pravi iz potrošenog paketa i dodatnog rada, automatski, na dogovoren dan. Dva dana mesečno se vrate u posao.",
        },
        {
          title: "Arhiva i prava korišćenja",
          body: "Gde je materijal, dokle traje pravo korišćenja, šta sme da se koristi u portfoliju. Podatak koji zatreba tačno onda kad ga niko nema.",
        },
        {
          title: "Isplativost po klijentu",
          body: "Prihod naspram utrošenih sati. Klijent koji plaća najviše nije uvek onaj koji donosi najviše, a to se ne zna bez merenja.",
        },
      ],
    },
  },
  compliance: [
    {
      title: "Prava na materijal i licenca",
      body: "Ko sme da koristi snimak, gde i koliko dugo. Uslovi se vezuju za isporuku, pa se ne traže po starim mejlovima kad klijent hoće da materijal pusti na televiziji.",
    },
    {
      title: "Saglasnost snimanih lica",
      body: "Ljudi u kadru daju saglasnost, a ona se čuva uz projekat. To je uslov i za objavu i za korišćenje materijala u portfoliju.",
    },
    {
      title: "Ugovor i uslovi paketa",
      body: "Obim, broj krugova ispravki, rok i uslovi otkazivanja stoje napisani i sistem ih primenjuje. Najveći deo sporova u ovom poslu nastaje tamo gde to nije definisano.",
    },
    {
      title: "Naplata domaćim i stranim klijentima",
      body: "Faktura domaćoj firmi ide kroz sistem e-faktura, a klijentu u inostranstvu u devizama, sa svojim pravilima. Sistem vodi obe vrste.",
    },
  ],
  value: {
    title: "Šta tačno dobijate za novac",
    lead: "Sat koji se naplati i verzija koja se odobri iz prve. To je razlika između studija koji raste i studija koji radi non-stop.",
    items: [
      {
        title: "Dodatni rad prestaje da bude poklon",
        body: "Sitni zahtevi koji se mere ulaze u obračun. Nedelja rada mesečno, koja je do sada bila besplatna, postaje prihod.",
      },
      {
        title: "Ispravke imaju kraj",
        body: "Brojač krugova završava raspravu pre nego što počne. Posao se zatvara ranije, a naplata ide odmah za njim.",
      },
      {
        title: "Faktura se pravi sama",
        body: "Iz potrošenog paketa, na dogovoren dan. Dva dana mesečno koja su išla na administraciju vraćaju se u proizvodnju.",
      },
      {
        title: "Vidi se koji klijent vredi",
        body: "Sati naspram prihoda po klijentu. Posle jednog kvartala se zna koga treba zadržati, a kome poskupeti ili reći ne.",
      },
    ],
  },
  proof: [tozaAiProof],
  faq: [
    {
      q: "Koristimo Trello, Drive i tabelu. Zašto menjati?",
      a: "Ako to radi, ne menjajte. Puca na mestu gde klijent treba da vidi svoje stanje i odobri materijal, i tamo gde sati treba da postanu faktura. Alati koje nabrajate ne razgovaraju međusobno, pa neko svakog meseca radi taj prevod ručno.",
    },
    {
      q: "Klijenti neće da uče novu aplikaciju.",
      a: "I neće. Zato klijentski deo ima tri ekrana: stanje paketa, materijal za odobrenje, računi. Ako traži više od toga, klijent se vraća na WhatsApp i sistem je promašio poentu.",
    },
    {
      q: "Radimo i pojedinačne poslove, ne samo pretplate.",
      a: "Sistem vodi oba modela: paket sa potrošnjom i posao sa fiksnom cenom. Isti klijent može da ima mesečnu pretplatu i poseban projekat pored nje.",
    },
    {
      q: "Kako se meri vreme ako ne volimo da kucamo satnice?",
      a: "Merenje se vezuje za fazu posla, ne za štopericu. Montaža koja je označena kao završena nosi svoje vreme. Ako ni to ne odgovara, paket se prodaje po broju isporuka umesto po satima.",
    },
    {
      q: "Imamo saradnike koji rade honorarno.",
      a: "Saradnik dobija pristup samo svojim poslovima i svom obračunu. Honorar se računa iz istih podataka iz kojih ide faktura klijentu, pa se marža po poslu vidi odmah.",
    },
    {
      q: "Koliko traje izrada?",
      a: "Prva faza je klijentski nalog sa paketom i odobravanjem, jer to najviše skida sa vrata. Sati, fakturisanje i izveštaji idu kao druga faza, sa svojim obimom i rokom.",
    },
  ],
  inquiryService: "interne-poslovne-aplikacije",
  related: [
    { href: "/ai-video-za-vas-biznis", label: "AI video za vaš biznis" },
    { href: "/our-projects/toza-ai-platforma-za-ai-video-studio", label: "Studija slučaja: Toza AI" },
    { href: "/interni-softver-umesto-excel-tabela", label: "Interni softver umesto Excel tabela" },
  ],
};
