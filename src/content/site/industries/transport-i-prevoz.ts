import type { IndustryPage } from "./types";
import { prevozKopProof } from "./proof";

export const transportIPrevoz: IndustryPage = {
  slug: "softver-za-transport-i-prevoz-tereta",
  sector: "auto-i-transport",
  navLabel: "Transport i prevoz tereta",
  seo: {
    title: "Softver za transport i prevoz tereta",
    metaDescription:
      "Sistem po meri za prevoznika: nalog za vožnju, raspored vozila i vozača, evidencija goriva i kilometraže, rokovi registracije i tahografa, obračun vožnje i fakturisanje. Sajt, web i mobilna aplikacija, interni admin.",
    keywords: [
      "softver za transport",
      "program za prevoznike",
      "evidencija vozila i vozača",
      "nalog za vožnju softver",
      "praćenje goriva vozni park",
      "raspored vozila aplikacija",
      "sajt za transportnu firmu",
    ],
  },
  hero: {
    eyebrow: "Auto i transport · prevoz",
    title: "Prevoz u kome se zna gde je koje vozilo i koliko je ta vožnja donela",
    lead: "Gradimo sistem koji spaja upit, nalog za vožnju, vozača i vozilo — pa se raspored ne vodi u glavi dispečera, a zarada po vožnji nije stvar procene.",
  },
  summary:
    "Prevozniku sistem rešava ono što telefon i tabela ne mogu: raspored vozila i vozača na jednom ekranu, nalog za vožnju koji nosi rutu, teret i cenu, evidenciju goriva i kilometraže po vozilu, i rokove registracije, tehničkog i tahografa koji se javljaju pre nego što isteknu. Adspire to pravi po meri — sajt koji donosi upite za prevoz, web aplikaciju u kojoj naručilac prati isporuku, mobilnu aplikaciju za vozače i interni admin za dispečera i obračun.",
  audience: [
    "Prevoznik sa tri do trideset vozila, gde vlasnik i dispečuje",
    "Firma sa sopstvenim voznim parkom uz osnovnu delatnost",
    "Prevoz građevinskog materijala i rasutog tereta sa terminima isporuke",
    "Kombi i dostavni prevoz sa više isporuka po danu",
  ],
  dayInTheLife: [
    {
      title: "Raspored živi u dispečerovoj glavi",
      body: "Ko je gde, ko se vraća prazan, ko može da preuzme još jednu turu — zna jedan čovek. Kad taj čovek ode na godišnji, firma radi upola snage.",
    },
    {
      title: "Prazan povratak se ne vidi na vreme",
      body: "Vozilo ide puno u jednom smeru i vraća se prazno. Tovar za povratak postoji, ali se ne nađe jer niko nema pregled ko je gde i kada se oslobađa.",
    },
    {
      title: "Gorivo se ne veže za vožnju",
      body: "Računi se skupljaju u fascikli i sabiraju na kraju meseca. Potrošnja po vozilu i po ruti se ne poredi, pa se vozilo koje troši preko mere primeti tek kad se pokvari.",
    },
    {
      title: "Rok istekne u najgorem trenutku",
      body: "Registracija, tehnički, tahograf, licenca, osiguranje. Sve to ima datum, a datum se pamti u kalendaru na telefonu — dok se ne zaboravi i vozilo stane.",
    },
    {
      title: "Faktura se pravi iz sećanja",
      body: "Koliko je tura bilo, koliko čekanja, da li je bilo dodatnih kilometara. Fakturiše se na kraju meseca, iz beleški, i uvek nešto ispadne.",
    },
  ],
  layers: {
    site: {
      lead: "Sajt prevoznika donosi upit koji se može odmah ceniti — ne opštu poruku „pozovite nas za ponudu“.",
      items: [
        {
          title: "Upit sa podacima za ponudu",
          body: "Relacija, vrsta tereta, težina ili zapremina, datum. Upit koji sadrži to može da dobije cenu isti dan; upit bez toga traži tri poruke pre nego što razgovor počne.",
        },
        {
          title: "Strana po vrsti prevoza",
          body: "Rasuti teret, paletirana roba, selidbe, hlađenje, vangabaritni prevoz — svaka vrsta se drugačije pretražuje i traži svoju stranu, sa uslovima i ograničenjima.",
        },
        {
          title: "Vozni park kao dokaz",
          body: "Broj i tip vozila, nosivost, oprema. Naručilac koji traži prevoznika prvo proverava da li imate čime da izvezete njegov teret.",
        },
        {
          title: "Licence i osiguranje na vidnom mestu",
          body: "Licenca za prevoz i osiguranje tereta su ono što razdvaja ozbiljnog prevoznika od povremenog. Ako to piše na sajtu, pregovor počinje sa više poverenja.",
        },
      ],
    },
    webApp: {
      lead: "Web aplikacija je za naručioca prevoza — da ne mora da zove dispečera da bi saznao gde mu je roba.",
      items: [
        {
          title: "Status isporuke bez poziva",
          body: "Preuzeto, u transportu, isporučeno, sa vremenom. Jedan link skida najveći deo poziva sa dispečera i naručiocu daje ono što traži.",
        },
        {
          title: "Nalog za prevoz online",
          body: "Stalni komitent naručuje sam: relacija, teret, željeni datum. Nalog pada u raspored umesto u nečiju poruku koja se izgubi.",
        },
        {
          title: "Dokumenti uz vožnju",
          body: "Otpremnica, CMR, potvrda o prijemu i slika isporučenog tereta na jednom mestu. Reklamacija se rešava iz sistema, ne iz kabine vozila.",
        },
        {
          title: "Pregled troška po komitentu",
          body: "Koliko je vožnji bilo, po kojim cenama, šta je fakturisano i šta je plaćeno. Rasprava o mesečnom računu prestaje da bude rasprava.",
        },
      ],
    },
    mobile: {
      lead: "Mobilna aplikacija je za vozača na putu — malo polja, radi jednom rukom, snalazi se bez signala.",
      items: [
        {
          title: "Nalog za vožnju na telefonu",
          body: "Šta se vozi, odakle, dokle, do kada i za koga. Vozač ne zove da pita, a dispečer ne diktira preko telefona dok drugi čeka na vezi.",
        },
        {
          title: "Potvrda isporuke sa potpisom i slikom",
          body: "Primalac potpiše na ekranu, vozač slika teret na licu mesta. Dokaz o isporuci postoji pre nego što vozilo krene nazad.",
        },
        {
          title: "Gorivo i kilometraža pri točenju",
          body: "Litri, cena i stanje kilometar-sata se upisuju odmah, uz sliku računa. Potrošnja po vozilu postaje merljiva umesto procenjena.",
        },
        {
          title: "Kvar i zastoj sa mesta događaja",
          body: "Prijava kvara, gume ili zadržavanja na utovaru, sa slikom i vremenom. Dispečer preraspoređuje pre nego što stane ceo dan.",
        },
      ],
    },
    internal: {
      lead: "Interni sistem je dispečerski sto: raspored, vozila, ljudi, rokovi i novac na jednom ekranu.",
      items: [
        {
          title: "Raspored vozila i vozača",
          body: "Ko vozi šta, kad se oslobađa i gde se nalazi. Preklapanja se vide pre nego što se dogode, a prazan povratak postaje tura koja se popunjava.",
        },
        {
          title: "Nalog za vožnju kao dokument",
          body: "Relacija, teret, kilometri, čekanje, cena i vozač. Iz naloga ide i obračun vozaču i faktura komitentu, bez prepisivanja.",
        },
        {
          title: "Troškovi po vozilu",
          body: "Gorivo, servisi, gume, putarina i kazne vezani za konkretno vozilo. Tek tada se vidi koje vozilo zarađuje, a koje samo izgleda kao da radi.",
        },
        {
          title: "Rokovi koji sami javljaju",
          body: "Registracija, tehnički pregled, tahograf, licenca, lekarski i vozačka dozvola. Obaveštenje stiže dovoljno rano da se stigne bez jurnjave.",
        },
        {
          title: "Obračun vozačima",
          body: "Po turi, po kilometru, po danu ili kombinovano, sa dnevnicama. Obračun je izveštaj iz naloga, ne mesečno sabiranje po beleškama.",
        },
        {
          title: "Zarada po vožnji i po relaciji",
          body: "Prihod minus gorivo, vozač i trošak vozila. Relacija koja se vozi iz navike a ne donosi ništa postaje vidljiva i može da se odbije.",
        },
      ],
    },
  },
  compliance: [
    {
      title: "Radno vreme vozača i tahograf",
      body: "Vreme vožnje i odmora je propisano i kontroliše se. Sistem vodi evidenciju uz nalog i upozorava na rokove očitavanja tahografa, pa se podaci ne traže tek kad inspekcija pozvoni.",
    },
    {
      title: "Licenca za prevoz i izvodi za vozila",
      body: "Licenca i izvod po vozilu imaju rok važenja. Rokovi stoje u sistemu sa upozorenjem unapred, jer vozilo bez važećeg izvoda ne sme da radi.",
    },
    {
      title: "Prateća dokumentacija o teretu",
      body: "Otpremnica, CMR i potvrda o prijemu čuvaju se uz vožnju, u digitalnom obliku, pa su dostupni i kad je original ostao u kabini.",
    },
    {
      title: "E-faktura prema pravnim licima",
      body: "Prevoz se najčešće fakturiše firmama, kroz sistem e-faktura. Faktura se pravi iz naloga za vožnju, pa se iznos i opis ne kucaju ponovo.",
    },
  ],
  value: {
    title: "Šta tačno dobijate za novac",
    lead: "Kilometar koji se ne vozi prazan i vozilo koje ne stoji zbog isteklog papira. To su dva najveća tiha troška u prevozu.",
    items: [
      {
        title: "Manje praznih povrataka",
        body: "Pregled ko je gde i kada se oslobađa pretvara deo praznih kilometara u plaćene. Jedna popunjena tura nedeljno se vidi u mesecu.",
      },
      {
        title: "Dispečer prestaje da bude usko grlo",
        body: "Raspored koji stoji u sistemu mogu da vode dvoje. Firma ne staje kad jedan čovek ode na godišnji ili se razboli.",
      },
      {
        title: "Fakturiše se sve što je odvezeno",
        body: "Čekanje na utovaru, dodatni kilometri i dodatna stajanja se beleže dok traju. Ono što se ne zabeleži, ne naplati se.",
      },
      {
        title: "Vozilo ne stoji zbog papira",
        body: "Dan stajanja zbog istekle registracije ili tahografa košta više od meseca održavanja sistema. Upozorenje unapred taj trošak ukida.",
      },
    ],
  },
  proof: [prevozKopProof],
  faq: [
    {
      q: "Već imamo GPS praćenje vozila. Da li nam ovo treba?",
      a: "GPS kaže gde je vozilo. Ne kaže koliko je ta vožnja donela, da li je fakturisana, ko je vozio i da li tahograf ističe. Sistem se najčešće povezuje sa postojećim GPS-om umesto da ga menja, pa se pozicija i nalog vide zajedno.",
    },
    {
      q: "Vozači nisu ljudi za aplikacije.",
      a: "Zato ekran za vozača ima tri dugmeta: preuzeo, isporučio, problem. Sve ostalo je opcija. Ako aplikacija traži više od toga na putu, niko je neće koristiti i to je greška u izradi, ne u vozaču.",
    },
    {
      q: "Radi li bez interneta?",
      a: "Nalog i potvrde rade offline i sinhronizuju se kad se signal vrati. Prevoz ide kroz predele gde veze nema, i sistem koji to ne predvidi je neupotrebljiv.",
    },
    {
      q: "Možemo li da fakturišemo direktno iz sistema?",
      a: "Faktura se pravi iz naloga za vožnju i šalje kroz sistem e-faktura ili se izvozi za knjigovodstvo, zavisno od toga šta već koristite. Vezivanje se dogovara na početku, sa vašim knjigovođom.",
    },
    {
      q: "Imamo i sopstvenu proizvodnju, prevoz je samo deo posla.",
      a: "Onda prevoz nije zasebna aplikacija nego modul u sistemu firme, spojen sa prodajom i terminima isporuke. Tako je rađeno kod betonske baze — upit, ponuda, vozilo i termin isporuke stoje u istom adminu.",
    },
    {
      q: "Koliko traje izrada?",
      a: "Prvo raspored i nalog za vožnju, jer to odmah rasterećuje dispečera. Troškovi, rokovi i obračun idu kao druga faza. Svaka faza ima svoj obim, cenu i rok.",
    },
  ],
  inquiryService: "interne-poslovne-aplikacije",
  related: [
    { href: "/interni-softver-umesto-excel-tabela", label: "Interni softver umesto Excel tabela" },
    { href: "/our-projects/prevozkop-digitalni-prodajni-operativni-sistem", label: "Studija slučaja: Prevoz Kop" },
    { href: "/our-services/interne-poslovne-aplikacije", label: "Interne poslovne aplikacije" },
    { href: "/softver-za-betonsku-bazu-i-proizvodnju-materijala", label: "Betonska baza i proizvodnja materijala" },
  ],
};
