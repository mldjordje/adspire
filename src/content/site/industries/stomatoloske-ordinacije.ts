import type { IndustryPage } from "./types";
import { drIgicProof, edukaProof } from "./proof";

export const stomatoloskeOrdinacije: IndustryPage = {
  slug: "softver-za-stomatolosku-ordinaciju",
  sector: "zdravstvo",
  navLabel: "Stomatološke ordinacije",
  seo: {
    title: "Softver i sajt za stomatološku ordinaciju",
    metaDescription:
      "Sistem po meri za stomatološku ordinaciju: online zakazivanje pacijenata, karton sa zubnom šemom, podsetnici za kontrolu, plan terapije na rate i evidencija po stolici. Sajt, web i mobilna aplikacija, interni admin.",
    keywords: [
      "softver za stomatološku ordinaciju",
      "program za zubarsku ordinaciju",
      "zakazivanje pacijenata online",
      "karton pacijenta softver",
      "aplikacija za stomatologa",
      "sajt za stomatološku ordinaciju",
      "evidencija terapija stomatologija",
    ],
  },
  hero: {
    eyebrow: "Zdravstvo · stomatologija",
    title: "Ordinacija u kojoj karton, termin i naplata nisu tri odvojena sveta",
    lead: "Pravimo sistem koji prati pacijenta od prvog poziva do poslednje kontrole: zakazivanje bez telefona, karton sa zubnom šemom, plan terapije i evidencija ko je šta platio.",
  },
  summary:
    "Stomatološkoj ordinaciji digitalni sistem rešava četiri stvari: pacijent zakazuje sam preko sajta umesto da zove u toku intervencije, karton sa zubnom šemom i istorijom terapija stoji na jednom mestu dostupnom sa stolice, podsetnici za kontrolu i nastavak terapije idu automatski, a naplata po fazama terapije se vodi bez ručnog sabiranja. Adspire to gradi po meri — kao sajt, web aplikaciju, mobilnu aplikaciju ili interni admin, zavisno od toga gde vam najviše curi vreme.",
  audience: [
    "Ordinacija sa jednom do šest stolica, gde doktor radi i prima pozive",
    "Poliklinika sa više specijalnosti koja deli recepciju i kalendar",
    "Ordinacija sa implantologijom i protetikom, gde terapija traje mesecima",
    "Ordinacija koja prima pacijente iz dijaspore i planira termine oko njihovog dolaska",
  ],
  dayInTheLife: [
    {
      title: "Telefon zvoni usred intervencije",
      body: "Ruke su u ustima pacijenta, a treba javiti da li ima mesta u četvrtak. Poziv se propusti, pacijent nazove drugu ordinaciju. Niko ne meri koliko se tako izgubi mesečno, jer se propušten poziv nigde ne beleži.",
    },
    {
      title: "Karton postoji, ali u glavi ili u svesci",
      body: "Šta je tačno rađeno na šestici gore levo pre dve godine, koji materijal je korišćen, da li je pacijent alergičan na nešto. Podatak postoji, samo ga treba naći — i to dok pacijent sedi u stolici.",
    },
    {
      title: "Terapija stane na pola",
      body: "Pacijent uradi prvu fazu implanta pa nestane. Niko ne zna da nije došao dok slučajno ne dođe na hitno. Ordinacija je uradila najskuplji deo posla i čeka nastavak koji nikad ne dođe.",
    },
    {
      title: "Kontrola i redovni pregled se ne pamte",
      body: "Šestomesečna kontrola i uklanjanje kamenca su najlakši posao u ordinaciji i najbolji izvor prihoda koji se ponavlja. Bez sistema koji sam podseti, taj prihod zavisi od toga da li se pacijent seti.",
    },
    {
      title: "Naplata po fazama se računa napamet",
      body: "Terapija ide u tri navrata, pacijent je platio dva. Koliko duguje i za šta — računa se na kraju, iz sveske, uz „mislim da je ostalo još“.",
    },
  ],
  layers: {
    site: {
      lead: "Javni sajt ordinacije radi jedan posao: da čovek sa bolom ili sa dugogodišnjim odlaganjem odluči da vas zove, i da to uradi bez poziva.",
      items: [
        {
          title: "Strana po usluzi, ne jedan spisak",
          body: "Implantologija, protetika, ortodoncija i estetika dobijaju svoju stranu sa objašnjenjem toka, trajanja i onoga što pacijent oseća. Ljudi ne traže „stomatolog Niš“ nego „koliko traje ugradnja implanta“ — a to su strane koje na taj upit odgovaraju.",
        },
        {
          title: "Zakazivanje kao prvo dugme",
          body: "Izbor usluge, doktora i slobodnog termina, bez naloga i bez poziva. Potvrda stiže odmah, a termin pada u kalendar ordinacije — ne u nečiji inbox koji se pregleda uveče.",
        },
        {
          title: "Pre i posle, sa pristankom",
          body: "Galerija sopstvenih radova je najjači argument u stomatologiji. Sistem vodi i pristanak pacijenta za objavu, pa se zna šta sme da se pokaže.",
        },
        {
          title: "Cenovnik ili raspon, kako vi odlučite",
          body: "Neko hoće javne cene, neko samo raspon i poziv na pregled. Oba rade — bitno je da strana odgovori na pitanje umesto da ćuti, jer ćutanje šalje čoveka nazad u pretragu.",
        },
      ],
    },
    webApp: {
      lead: "Web aplikacija je ono što pacijent koristi između poseta, sa telefona, bez instalacije.",
      items: [
        {
          title: "Nalog pacijenta",
          body: "Svoji termini, svoja istorija terapija, svoj plan i preostali dug. Pacijent koji vidi šta mu je ostalo da uradi vraća se sam — bez da ga zove recepcija.",
        },
        {
          title: "Potvrda i pomeranje termina",
          body: "Umesto poziva „da li može u sredu“, pacijent sam pomeri termin u ponuđeno slobodno vreme. Oslobođeni termin odmah postaje dostupan drugima.",
        },
        {
          title: "Upitnik o zdravlju pre prvog dolaska",
          body: "Anamneza, lekovi, alergije i hronična stanja popunjeni kod kuće. Prvi termin počinje od pregleda, ne od papira.",
        },
        {
          title: "Plan terapije koji pacijent razume",
          body: "Faze, redosled, okvirno trajanje i cena po fazi na jednom ekranu. Pacijent koji vidi ceo put ređe odustaje posle prve faze.",
        },
      ],
    },
    mobile: {
      lead: "Mobilna aplikacija ima smisla kad se koristi svakodnevno — kod osoblja uvek, kod pacijenata samo ako ordinacija ima bazu koja se vraća.",
      items: [
        {
          title: "Dan na telefonu doktora",
          body: "Raspored, sledeći pacijent, njegov karton i beleška sa prošle posete. Doktor koji radi u dve ordinacije nosi obe u džepu.",
        },
        {
          title: "Push podsetnik umesto SMS troška",
          body: "Podsetnik dan pre termina i za šestomesečnu kontrolu, bez cene po poruci. Najskuplji termin je onaj na koji niko nije došao.",
        },
        {
          title: "Fotografija pravo u karton",
          body: "Snimak stanja pre i posle se slika telefonom i pada u karton pacijenta, u ispravan zub, bez prebacivanja fajlova.",
        },
        {
          title: "Radi i kad internet padne",
          body: "Osnovni podaci o danu ostaju dostupni offline i sinhronizuju se kad se veza vrati — ordinacija ne staje zbog rutera.",
        },
      ],
    },
    internal: {
      lead: "Interni sistem je deo koji pacijent nikad ne vidi, a koji odlučuje da li ordinacija radi organizovano ili na sećanje.",
      items: [
        {
          title: "Karton sa zubnom šemom",
          body: "Status po zubu, istorija zahvata, materijali, rendgen snimci i beleške. Sve vezano za pacijenta, pretraživo, dostupno sa stolice.",
        },
        {
          title: "Kalendar po stolici i po doktoru",
          body: "Trajanje se razlikuje po zahvatu — pregled nije isto što i ugradnja. Sistem računa trajanje po tipu intervencije, pa se dan ne raspada posle drugog pacijenta.",
        },
        {
          title: "Naplata po fazama i dugovanja",
          body: "Šta je naplaćeno, šta je ostalo, ko duguje i od kada. Spisak dužnika je izveštaj, ne pretpostavka.",
        },
        {
          title: "Potrošnja materijala i zalihe",
          body: "Implanti, kompoziti, anestetici — koliko ide po zahvatu i kada treba naručiti. Manje mrtvog novca u ormanu i manje otkazanih termina zbog toga što nečega nema.",
        },
        {
          title: "Zubna tehnika kao deo toka",
          body: "Nalog laboratoriji, rok, faza i povratak rada vezani za pacijenta. Protetika najčešće kasni zbog toga što niko ne prati gde je rad.",
        },
        {
          title: "Brojke koje se gledaju mesečno",
          body: "Popunjenost termina, otkazivanja, najtraženiji zahvati, prihod po doktoru i po stolici. Odluka o novom radnom mestu ili drugoj stolici prestaje da bude osećaj.",
        },
      ],
    },
  },
  compliance: [
    {
      title: "Podaci o zdravlju su naročito osetljivi",
      body: "Zakon o zaštiti podataka o ličnosti tretira zdravstvene podatke strože od ostalih. Sistem se pravi sa ulogama i pravima pristupa, evidencijom ko je šta otvorio i šifrovanim čuvanjem, a ne sa jednom zajedničkom lozinkom za recepciju.",
    },
    {
      title: "Medicinska dokumentacija se čuva i vodi",
      body: "Karton nije beleška — sadržaj i rokovi čuvanja su propisani. Sistem vodi istoriju izmena umesto da se stari podatak prebriše, i omogućava izvoz dokumentacije kad je pacijent traži.",
    },
    {
      title: "Fiskalizacija i e-fakture",
      body: "Naplata fizičkom licu ide preko fiskalnog računa, a usluga pravnom licu kroz sistem e-faktura. Sistem se povezuje sa onim što već koristite i sa vašim knjigovođom — bez duplog kucanja istog iznosa na dva mesta.",
    },
    {
      title: "Pristanak za objavu fotografija",
      body: "Snimci pre i posle se objavljuju samo uz pristanak koji je zabeležen i može da se povuče. Galerija prati taj status automatski.",
    },
  ],
  value: {
    title: "Šta tačno dobijate za novac",
    lead: "Ne kupujete ekrane. Kupujete sate koji se vrate doktoru i prihod koji prestane da zavisi od pamćenja.",
    items: [
      {
        title: "Recepcija prestaje da bude centrala",
        body: "Deo poziva koji je samo „da li ima mesta“ nestaje. Ko prima pozive dobija vreme za pacijente koji su već u ordinaciji.",
      },
      {
        title: "Kontrole se vraćaju same",
        body: "Šestomesečni pregled je posao koji se ponavlja i koji je već plaćen jednom stečenim poverenjem. Automatski podsetnik ga pretvara u termin bez ijednog poziva.",
      },
      {
        title: "Nedovršene terapije se vide na vreme",
        body: "Spisak pacijenata koji su stali na pola faze je kratak i konkretan. Jedan nastavljen implant pokrije veći deo troška sistema.",
      },
      {
        title: "Naplata prestaje da curi",
        body: "Ono što se vodi napamet se i zaboravlja. Evidencija po fazi terapije pokazuje dugovanja pre nego što zastare.",
      },
    ],
  },
  proof: [drIgicProof, edukaProof],
  faq: [
    {
      q: "Imamo već program za ordinaciju. Zašto bismo pravili nešto po meri?",
      a: "Ako gotov program radi posao — nemojte. Po meri ima smisla kad radite nešto što program ne predviđa: sopstveni tok terapije, pacijenti iz inostranstva, više lokacija, ili kad plaćate mesečno po korisniku za funkcije koje ne koristite. Prvo pitanje na razgovoru je šta vas tačno koči, i odgovor ume da bude da vam nova aplikacija ne treba.",
    },
    {
      q: "Da li pacijenti stvarno zakazuju online ili i dalje zovu?",
      a: "I jedno i drugo. Online zakazivanje ne ukida telefon, nego skida sa njega ljude kojima je lakše da kucnu nego da zovu — a to su najčešće mlađi pacijenti i oni koji zakazuju uveče, kad ordinacija ne radi. Telefon ostaje za hitno i za starije pacijente.",
    },
    {
      q: "Šta sa podacima iz starog programa?",
      a: "Prenos je deo posla ako podaci mogu da se izvezu. Pre početka se proverava u kom su obliku — baza, izvoz u tabelu ili samo štampani karton. Ako se ne izvoze, radi se paralelno: novi pacijenti u novom sistemu, stari karton ostaje dostupan dok se ne isprazni.",
    },
    {
      q: "Koliko traje izrada?",
      a: "Zavisi od toga koliko slojeva radimo odjednom. Sajt sa zakazivanjem je najbrži deo i kreće prvi, jer odmah donosi termine. Karton, naplata i interni deo idu kao sledeća faza, sa svojim obimom i rokom. Nikad se ne kreće sa svim odjednom — tako se najlakše zaglavi.",
    },
    {
      q: "Ko drži podatke i gde su?",
      a: "Sistem je vaš. Podaci stoje na serveru koji vi plaćate i kome imate pristup, sa rezervnim kopijama. Nema zaključavanja u našu platformu i nema situacije da vam se pristup gasi ako prekinemo saradnju.",
    },
    {
      q: "Radi li ovo za polikliniku sa više specijalnosti?",
      a: "Radi, i tu se najviše isplati. Zajednička recepcija, kalendar po kabinetu i doktoru, jedan karton pacijenta kroz sve specijalnosti. Najveći sistem u našem portfoliju je upravo klinika sa više usluga i spojenom evidencijom.",
    },
  ],
  inquiryService: "interne-poslovne-aplikacije",
  related: [
    { href: "/online-zakazivanje/stomatoloske-i-medicinske-ordinacije", label: "Samo online zakazivanje pacijenata" },
    { href: "/interni-softver-umesto-excel-tabela", label: "Interni softver umesto Excel tabela" },
    { href: "/our-projects/dr-igic-web-aplikacija-za-estetske-klinike", label: "Studija slučaja: Dr Igić" },
  ],
};
