import type { IndustryPage } from "./types";
import { edukaProof, tozaAiProof } from "./proof";

export const kurseviIObuke: IndustryPage = {
  slug: "softver-za-kurseve-i-obuke",
  sector: "obrazovanje",
  navLabel: "Kursevi, obuke i škole",
  seo: {
    title: "Softver za organizatore kurseva i obuka",
    metaDescription:
      "Sistem po meri za kurseve, obuke i škole: prijava sa ograničenim brojem mesta, naplata i rate, grupe i raspored, prisustvo polaznika, materijali, potvrde o pohađanju i evidencija predavača.",
    keywords: [
      "softver za kurseve",
      "program za školu stranih jezika",
      "prijava na kurs online",
      "evidencija polaznika",
      "naplata kurseva rate",
      "aplikacija za obuke",
      "sistem za edukativni centar",
    ],
  },
  hero: {
    eyebrow: "Obrazovanje · kursevi i obuke",
    title: "Prijave, grupe i naplata na jednom mestu, umesto u tri tabele",
    lead: "Gradimo sistem koji vodi polaznika od prijave do potvrde: ograničen broj mesta, naplata u ratama, raspored po grupi, prisustvo i materijali koji stižu samo onima koji su platili.",
  },
  summary:
    "Organizatoru kurseva i obuka sistem rešava četiri stvari: prijava sa ograničenim brojem mesta se zatvara sama kad se popuni, naplata i rate se prate po polazniku umesto po izvodu, grupe i termini imaju raspored koji polaznik vidi bez pitanja, a prisustvo i potvrde o pohađanju izlaze iz evidencije a ne iz tabele. Adspire to pravi po meri — javni sajt koji prodaje termin, web aplikaciju za polaznike, mobilnu aplikaciju za predavače i interni admin za grupe, naplatu i izveštaje.",
  audience: [
    "Edukativni centar sa više kurseva i generacija godišnje",
    "Škola stranih jezika sa grupama po nivoima i polugodišnjim ciklusima",
    "Stručne obuke i sertifikacije sa ograničenim brojem mesta",
    "Predavač ili studio koji prodaje radionice i pojedinačne termine",
  ],
  dayInTheLife: [
    {
      title: "Prijave stižu na tri kanala",
      body: "Poruka na Instagramu, mejl i poziv. Spisak se pravi ručno, neko se upiše dvaput, neko ne uđe uopšte, a broj slobodnih mesta se zna približno.",
    },
    {
      title: "Ko je platio, a ko je samo rekao da hoće",
      body: "Uplate se proveravaju u izvodu i upoređuju sa spiskom. Dan pre početka se ispostavi da tri osobe nisu platile, a jedna jeste ali pod tuđim imenom.",
    },
    {
      title: "Rate se prate u glavi",
      body: "Kurs se plaća u tri rate, neko kasni sa drugom. Podsećanje zavisi od toga da li se neko setio, a nezgodno je i tražiti kad nije sigurno da li je stiglo.",
    },
    {
      title: "Materijali se šalju ručno, svakoj grupi posebno",
      body: "Prezentacije i zadaci idu mejlom, svakoj generaciji iznova. Neko ne dobije, neko prosledi dalje, a niko ne zna ko je šta otvorio.",
    },
    {
      title: "Potvrde se kucaju noć pre dodele",
      body: "Ime, kurs, broj časova, datum. Trideset potvrda se pravi ručno, sa greškama u imenima koje se otkriju na samoj dodeli.",
    },
  ],
  layers: {
    site: {
      lead: "Sajt kursa ne opisuje program — prodaje sledeći termin, dok interesovanje traje.",
      items: [
        {
          title: "Strana po kursu sa sledećim terminom",
          body: "Program, trajanje, nivo, cena i datum početka. Čovek koji je spreman da se prijavi mora da vidi kada počinje, inače odlaže i zaboravi.",
        },
        {
          title: "Prijava koja zatvara mesta",
          body: "Broj mesta se smanjuje kako prijave stižu i prijava se zatvara kad se popuni. Preknjižena grupa je gori problem od prazne.",
        },
        {
          title: "Plaćanje odmah ili kapara",
          body: "Mesto se drži tek kad je plaćeno. Prijava bez uplate u ovom poslu je namera, ne polaznik — i statistika to pokazuje svakoj generaciji.",
        },
        {
          title: "Predavači i ishodi umesto opšte priče",
          body: "Ko predaje, šta polaznik ume posle kursa i šta dobija na kraju. To su tri pitanja koja odlučuju, a najčešće nisu napisana.",
        },
      ],
    },
    webApp: {
      lead: "Web aplikacija je nalog polaznika — jedino mesto gde su mu raspored, materijali i račun.",
      items: [
        {
          title: "Svoj raspored i izmene",
          body: "Termini grupe, promena sale, odloženi čas. Obaveštenje stiže svima u grupi odjednom, bez poruka koje se izgube u grupi na Viberu.",
        },
        {
          title: "Materijali vezani za uplatu",
          body: "Prezentacije, zadaci i snimci dostupni onome ko je platio, dok traje pristup. Sadržaj prestaje da kruži mimo vas.",
        },
        {
          title: "Rate i stanje računa",
          body: "Šta je plaćeno, šta sledi i kada. Podsetnik ide sam, pa naplata ne zavisi od neprijatnog razgovora.",
        },
        {
          title: "Prijava na sledeći nivo",
          body: "Polaznik koji je završio A2 vidi kada počinje B1 i prijavljuje se u dva dodira. Postojeći polaznik je najjeftiniji sledeći polaznik.",
        },
      ],
    },
    mobile: {
      lead: "Mobilna aplikacija je za predavače i za polaznike koji uče u pokretu.",
      items: [
        {
          title: "Prisustvo u dva dodira",
          body: "Predavač označi ko je došao na početku časa. Spisak prisustva je gotov odmah, pa se potvrda o pohađanju ne rekonstruiše na kraju ciklusa.",
        },
        {
          title: "Podsetnik na čas",
          body: "Push obaveštenje pred termin i pri promeni rasporeda. Manje kašnjenja i manje ljudi koji dođu na pogrešnu salu.",
        },
        {
          title: "Materijali offline",
          body: "Skinut materijal ostaje dostupan u prevozu i bez interneta. Učenje se najčešće dešava upravo tu.",
        },
        {
          title: "Kratka provera znanja",
          body: "Kviz između časova, sa rezultatom koji predavač vidi. Pokazuje ko zaostaje pre nego što odustane.",
        },
      ],
    },
    internal: {
      lead: "Interni deo je mesto gde se vidi koji kurs zarađuje, koja grupa se osipa i koliko predavač košta po polazniku.",
      items: [
        {
          title: "Generacije i grupe",
          body: "Ciklusi, nivoi, sale i predavači. Grupa se formira kad se skupi minimalan broj, a sistem pokazuje koliko fali do isplativosti.",
        },
        {
          title: "Naplata, rate i povraćaji",
          body: "Ko je platio, ko kasni, ko je odustao i šta se vraća. Svaka uplata je vezana za polaznika i kurs, ne za red u izvodu.",
        },
        {
          title: "Prisustvo i osipanje",
          body: "Koliko ljudi ostane do kraja, gde se najviše odustaje. To je brojka koja kaže da li je problem u programu, terminu ili predavaču.",
        },
        {
          title: "Predavači i honorari",
          body: "Održani časovi, zamene i obračun po času ili po grupi. Honorar je izveštaj iz evidencije, ne mesečno sabiranje.",
        },
        {
          title: "Potvrde i sertifikati",
          body: "Potvrda o pohađanju sa brojem časova izlazi iz podataka, u paketu za celu grupu, sa jedinstvenom oznakom koja može da se proveri.",
        },
        {
          title: "Koji kurs se isplati",
          body: "Prihod po kursu naspram troška sale i predavača. Kurs koji se drži iz navike a ne donosi ništa postaje vidljiv posle jedne generacije.",
        },
      ],
    },
  },
  compliance: [
    {
      title: "Podaci polaznika i maloletnici",
      body: "Ako se upisuju deca, saglasnost daje roditelj i to se beleži. Podaci se vode sa pravima pristupa i rokom čuvanja, ne u tabeli koju otvara svako u kancelariji.",
    },
    {
      title: "Naplata i fiskalizacija",
      body: "Kurs plaćen karticom ili na licu mesta ide kroz fiskalizaciju, a obuka fakturisana firmi kroz sistem e-faktura. Sistem vodi obe vrste naplate bez duplog unosa.",
    },
    {
      title: "Uslovi upisa i pravo na odustanak",
      body: "Rok za odustanak, povraćaj i pravila odlaganja stoje napisani i primenjuju se automatski. Nesporazum oko povraćaja je najčešći spor u ovom poslu.",
    },
    {
      title: "Autorstvo materijala",
      body: "Pristup materijalu se vezuje za nalog i traje koliko je dogovoreno. Deljenje se ne sprečava potpuno, ali prestaje da bude podrazumevano.",
    },
  ],
  value: {
    title: "Šta tačno dobijate za novac",
    lead: "Popunjena grupa i naplata koja ne zavisi od podsećanja. To su dva mesta na kojima ovaj posao propada ili stoji.",
    items: [
      {
        title: "Prijava se ne gubi po kanalima",
        body: "Jedno mesto za sve prijave znači da se tačno zna koliko je mesta ostalo. Grupa se puni brže jer se zna kada da se prestane sa oglašavanjem.",
      },
      {
        title: "Rate se naplaćuju same",
        body: "Podsetnik pre dospeća skida najveći deo kašnjenja. Novac koji se inače vuče mesecima stiže u roku.",
      },
      {
        title: "Ciklus se ponavlja bez ručnog posla",
        body: "Nova generacija je kopija prethodne sa novim datumima. Priprema koja je trajala dan traje pola sata.",
      },
      {
        title: "Polaznici se vraćaju na sledeći nivo",
        body: "Ponuda sledećeg kursa unutar naloga pretvara jednu generaciju u dve. To je rast bez ijednog dinara u oglase.",
      },
    ],
  },
  proof: [edukaProof, tozaAiProof],
  faq: [
    {
      q: "Zar to ne rešava neka gotova platforma za kurseve?",
      a: "Rešava, ako vam odgovara njen model naplate i način rada. Svoje se isplati kad plaćate procenat od svake uplate, kad hoćete prijavu na svom sajtu i pod svojim brendom, ili kad vam treba nešto specifično: grupe po nivoima, rate, potvrde sa brojem časova.",
    },
    {
      q: "Držimo obuke i uživo i online. Da li sistem pravi razliku?",
      a: "Pravi. Termin uživo ima salu i kapacitet, online ima link i snimak. Isti kurs može da ima obe varijante sa različitom cenom, a prisustvo se vodi za obe.",
    },
    {
      q: "Da li možemo da prodajemo i snimke ranijih kurseva?",
      a: "Može, kao zaseban proizvod sa svojim pristupom i rokom. To je najlakši dodatni prihod u ovom poslu jer je materijal već napravljen.",
    },
    {
      q: "Kako se rešava plaćanje na rate?",
      a: "Rate se definišu po kursu, sa datumima dospeća. Sistem prati šta je stiglo i podseća pre roka. Naplata može da ide karticom, uplatnicom ili fakturom, zavisno od toga ko plaća.",
    },
    {
      q: "Firme nam šalju zaposlene na obuku i traže fakturu.",
      a: "Onda je kupac firma, a polaznici su njeni ljudi. Sistem vodi i jedno i drugo: faktura ide firmi kroz sistem e-faktura, a potvrde idu na ime svakog polaznika.",
    },
    {
      q: "Koliko traje izrada?",
      a: "Prva faza je prijava sa naplatom i spisak polaznika, jer to odmah zaustavlja gubitke. Materijali, prisustvo i potvrde idu kao sledeća faza sa svojim obimom i rokom.",
    },
  ],
  inquiryService: "interne-poslovne-aplikacije",
  related: [
    { href: "/edukacija", label: "Naša edukacija za AI video" },
    { href: "/interni-softver-umesto-excel-tabela", label: "Interni softver umesto Excel tabela" },
    { href: "/our-projects/toza-ai-platforma-za-ai-video-studio", label: "Studija slučaja: Toza AI" },
    { href: "/softver-za-kreativni-studio-i-agenciju", label: "Softver za kreativni studio i agenciju" },
  ],
};
