import type { BlogPost } from "./blogPosts";

/**
 * Second batch of posts, kept separate so blogPosts.ts stays readable.
 *
 * All three target a sentence a business owner actually types — why the site
 * is invisible, how to be found locally, what automation is worth paying for —
 * rather than a topic an agency finds interesting about itself. No performance
 * numbers are claimed here: nothing on this site should assert a client result
 * that cannot be shown.
 */
export const EXTRA_BLOG_POSTS: BlogPost[] = [
  {
    slug: "zasto-sajt-ne-izlazi-na-google",
    title: "Zašto sajt ne izlazi na Google — devet stvarnih razloga",
    excerpt:
      "Nije uvek do SEO agencije. Devet razloga zbog kojih sajt ne izlazi u pretrazi, poređanih od najčešćeg, i kako da svaki proverite sami za dvadeset minuta.",
    category: "SEO",
    date: "12.08.2026",
    readTime: "8 min",
    image: "/images/blog/three.png",
    relatedSlugs: ["seo-i-performanse-u-prvom-sprintu", "web-sistemi-spremni-za-rast"],
    body: [
      { type: "p", text: "Sajt postoji, izgleda dobro, a kada ukucate ono što radite — nema ga. Pre nego što platite bilo kome za SEO, ovih devet stvari se proverava besplatno i objašnjava veliku većinu slučajeva. Poređane su od najčešćeg ka ređem." },
      { type: "h2", text: "1. Sajt nije ni indeksiran" },
      { type: "p", text: "Ukucajte u Google `site:vasdomen.rs`. Ako se ne pojavi nijedna strana, sajt uopšte nije u indeksu i nikakav tekst neće pomoći dok se to ne reši. Najčešći uzrok je `noindex` oznaka koja je ostala sa test verzije ili blokada u robots.txt fajlu." },
      { type: "h2", text: "2. Sajt nije prijavljen u Search Console" },
      { type: "p", text: "Google Search Console je besplatan i jedini pokazuje šta Google zaista vidi: koje strane su indeksirane, koje su odbijene i sa kojim greškama. Bez njega se pogađa. Prijava traje deset minuta, verifikacija preko DNS zapisa ili fajla na sajtu." },
      { type: "h2", text: "3. Strana ne odgovara na pitanje koje ljudi kucaju" },
      { type: "p", text: "Najčešća greška u tekstu nije gramatika nego perspektiva. Strana piše „Vrhunska rešenja za vaš biznis\", a čovek u pretragu kuca „koliko košta sajt za firmu\" ili „ko pravi sajtove u Nišu\". To su različiti jezici. Strana koja doslovno odgovara na pitanje ima ogromnu prednost nad stranom koja se hvali." },
      { type: "h2", text: "4. Jedna strana pokušava da pokrije deset tema" },
      { type: "p", text: "Početna koja nabraja svih deset usluga neće rangirati ni za jednu. Svaka usluga zaslužuje svoju stranu sa svojim naslovom, tekstom i primerima. To je razlog zbog kog sajtovi sa dvadeset strana redovno pobeđuju sajtove sa pet." },
      { type: "h2", text: "5. Ista tema na više strana" },
      { type: "p", text: "Suprotan problem: tri strane pišu o istoj stvari drugim rečima. One se međusobno takmiče, a Google bira jednu — često ne onu koju biste vi izabrali. Rešenje je spajanje u jednu jaču stranu i preusmerenje ostalih." },
      { type: "h2", text: "6. Naslovi u kodu su prazni ili isti na svakoj strani" },
      { type: "ul", items: [
        "Title oznaka koja na svakoj strani glasi isto ili sadrži samo ime firme.",
        "Nedostaje H1 naslov, ili ih ima pet na istoj strani.",
        "Meta opis prepisan sa druge strane, pa u rezultatima pretrage sve izgleda isto.",
        "Slike bez alt teksta — cela grana pretrage po slikama otpada.",
      ]},
      { type: "h2", text: "7. Sajt je spor na telefonu" },
      { type: "p", text: "Google meri stvarno iskustvo posetilaca sa telefona. Slike od dva megabajta, tri fonta i pet skripti za praćenje su najčešći krivci. Provera je besplatna kroz PageSpeed Insights, a najveći dobitak obično donese samo pretvaranje slika u moderan format." },
      { type: "h2", text: "8. Nema nijednog spoljnog linka ka sajtu" },
      { type: "p", text: "Sajt na koji niko ne upućuje deluje kao sajt koji nikoga ne zanima. Ne treba kupovati linkove: Google poslovni profil, lokalni imenici, dobavljači, komora, sponzorstva i partneri su prirodni izvori koje većina firmi ima a ne koristi." },
      { type: "h2", text: "9. Prosto je prerano" },
      { type: "p", text: "Nova strana ne rangira za nedelju dana. Za rečenice sa jasnom namerom prvi rezultati se vide za mesec do tri, za opšte pojmove i duže. Sajt star tri nedelje nije problem — problem je sajt star tri godine koji nema nijednu stranu koja odgovara na konkretno pitanje." },
      { type: "callout", text: "Ako od devet tačaka prve četiri pokazuju problem, ne treba vam SEO kampanja nego ispravka. To je posao od nekoliko dana, ne mesečna pretplata." },
      { type: "h2", text: "Šta uraditi danas" },
      { type: "ul", items: [
        "Proverite `site:vasdomen.rs` u Google pretrazi.",
        "Prijavite sajt u Search Console i pogledajte izveštaj o indeksiranju.",
        "Napišite spisak od deset rečenica koje bi vaš kupac zaista ukucao.",
        "Za svaku od tih rečenica proverite da li na sajtu postoji strana koja na nju odgovara. Verovatno ne postoji — i tu je posao.",
      ]},
    ],
  },
  {
    slug: "google-poslovni-profil-za-lokalnu-firmu",
    title: "Google poslovni profil: najjeftiniji kanal koji većina firmi zapusti",
    excerpt:
      "Za lokalni posao profil u mapama često donosi više poziva nego sam sajt. Šta popuniti, šta objavljivati i kako tražiti recenzije a da ne bude neprijatno.",
    category: "Lokalni marketing",
    date: "15.08.2026",
    readTime: "7 min",
    image: "/images/blog/five.png",
    relatedSlugs: ["zasto-sajt-ne-izlazi-na-google", "booking-sistemi-bez-haosa"],
    body: [
      { type: "p", text: "Za frizerski salon, servis, ordinaciju ili prevoznika, prvi kontakt sa kupcem sve češće nije sajt nego mapa. Čovek ukuca uslugu i grad, dobije tri firme u okviru mape i pozove jednu od njih. Profil je besplatan, a ipak je kod većine firmi popunjen do pola i onda zaboravljen." },
      { type: "h2", text: "Šta se popunjava, a skoro niko ne popuni" },
      { type: "ul", items: [
        "Tačna kategorija posla — jedna glavna, plus dodatne. Pogrešna kategorija znači da vas pretraga za vašu uslugu preskoči.",
        "Radno vreme, uključujući praznike. Netačno radno vreme je najbrži način da dobijete lošu recenziju za nešto što niste ni uradili.",
        "Usluge sa opisima. To je mesto gde smete da pišete svojim rečima šta radite.",
        "Fotografije prostora, ekipe i radova — ne stok slike. Profil sa realnim fotografijama dobija osetno više klikova od profila sa jednom slikom logotipa.",
        "Link ka konkretnoj strani sajta, ne uvek ka početnoj. Ako profil govori o zakazivanju, link vodi na stranu za zakazivanje.",
        "Dugme za poruku i za poziv, ako stvarno odgovarate na njih.",
      ]},
      { type: "h2", text: "Recenzije: kako tražiti bez neprijatnosti" },
      { type: "p", text: "Recenzije su najveći pojedinačni faktor za rangiranje u lokalnoj pretrazi, i najveći razlog zbog kog neko izabere vas umesto konkurenta na istoj ulici. Ipak, retko ko ih traži, jer deluje neprijatno." },
      { type: "p", text: "Rešenje je da se ne traži usmeno na kraju posla, nego porukom sat vremena kasnije, sa direktnim linkom za pisanje recenzije. Kratko, bez pritiska, bez nagrade — nagrađena recenzija je prekršaj pravila i može da vas košta profila." },
      { type: "p", text: "Na loše recenzije se odgovara kratko, javno i bez rasprave. Odgovor ne pišete piscu recenzije nego sledećem čoveku koji je čita." },
      { type: "h2", text: "Objave koje imaju smisla" },
      { type: "p", text: "Profil ima objave koje traju nedelju dana. Nema svrhe objavljivati citate i praznične čestitke. Ima svrhe objaviti konkretnu stvar: nova usluga, promena radnog vremena, sezonska ponuda, gotov posao sa fotografijom." },
      { type: "callout", text: "Profil koji se dopunjuje jednom mesečno već je ispred većine lokalne konkurencije, jer većina ga ne dira godinama." },
      { type: "h2", text: "Kako se to povezuje sa sajtom" },
      { type: "ul", items: [
        "Ime, adresa i telefon moraju biti identični na profilu i na sajtu, do zareza. Različit zapis adrese Google čita kao dve različite firme.",
        "Na sajtu treba da postoji strana za grad i uslugu na koju profil upućuje.",
        "Mapa i podaci o firmi u podnožju sajta zatvaraju krug.",
        "Ako imate više lokacija, svaka dobija svoj profil i svoju stranu na sajtu.",
      ]},
      { type: "h2", text: "Šta se dobija" },
      { type: "p", text: "Ne obećavamo brojke — one zavise od delatnosti i konkurencije u gradu. Ono što se sigurno dobija je merljivost: profil pokazuje koliko je ljudi tražilo pravac, koliko je pozvalo i po kojoj pretrazi vas je našlo. Za većinu lokalnih firmi to su prvi realni podaci o tome kako ih kupci uopšte traže." },
    ],
  },
  {
    slug: "automatizacija-koja-se-isplati-maloj-firmi",
    title: "Automatizacija koja se isplati maloj firmi — i ona koja ne",
    excerpt:
      "Kako izračunati da li se automatizacija isplati pre nego što je platite, koji poslovi su prvi na redu i zašto se najveći deo koristi dobija od tri jednostavne stvari.",
    category: "Automatizacija",
    date: "18.08.2026",
    readTime: "7 min",
    image: "/images/blog/nine.png",
    relatedSlugs: ["ai-automatizacija-za-mala-preduzeca", "booking-sistemi-bez-haosa"],
    body: [
      { type: "p", text: "Automatizacija se prodaje kao ideja, a kupuje kao trošak. Razlika između to dvoje je jedan račun koji se može uraditi na papiru pre nego što se bilo šta plati." },
      { type: "h2", text: "Račun koji odlučuje" },
      { type: "p", text: "Uzmite jedan posao koji se ponavlja. Izmerite koliko minuta stvarno traje i koliko puta mesečno se radi. Pomnožite to sa cenom sata osobe koja ga radi. Dobili ste mesečnu cenu tog posla." },
      { type: "p", text: "Ako automatizacija košta manje od šest do dvanaest mesečnih cena tog posla, isplati se skoro uvek. Ako košta više od dvadeset, obično ne — osim ako greška u tom poslu ne košta mnogo više od vremena, što je čest slučaj kod naplate i zakazivanja." },
      { type: "callout", text: "Vreme nije jedina ušteda. Posao koji se radi ručno se povremeno ne uradi, i to obično košta više od svih sati zajedno." },
      { type: "h2", text: "Šta se prvo isplati" },
      { type: "ul", items: [
        "Prepisivanje podataka sa jednog mesta na drugo — iz mejla u tabelu, iz tabele u račun. Uvek prvi kandidat.",
        "Podsetnici klijentima pred termin ili pred istek roka.",
        "Automatsko izdavanje predračuna i fakture iz porudžbine.",
        "Prijem upita u jedan spisak umesto u tri inboxa i dve društvene mreže.",
        "Mesečni izveštaj koji se sada pravi ručno svakog prvog u mesecu.",
      ]},
      { type: "h2", text: "Šta se retko isplati" },
      { type: "ul", items: [
        "Automatizacija posla koji se radi dvaput mesečno i traje pet minuta.",
        "Sistem koji zahteva da neko svakodnevno unosi podatke samo da bi sistem radio.",
        "Chatbot na sajtu na koji stiže tri pitanja nedeljno — na njih se odgovori brže lično.",
        "Zamena procesa koji niko nije prvo pojednostavio. Automatizovan haos je i dalje haos, samo brži.",
      ]},
      { type: "h2", text: "Gde AI zaista pomaže, a gde smeta" },
      { type: "p", text: "AI je koristan tamo gde je posao razumevanje teksta: sažimanje upita, izvlačenje podataka iz poruke, predlog odgovora, opis proizvoda iz fotografije. Nije koristan kao zamena za pravilo koje je moguće precizno napisati — za to je običan kod jeftiniji, brži i pouzdaniji." },
      { type: "p", text: "Praktično pravilo: AI predlaže, čovek potvrđuje, kod izvršava. Sve što se objavljuje ili šalje klijentu bez ljudske potvrde pre ili kasnije napravi štetu koja pojede uštedu." },
      { type: "h2", text: "Kako početi bez rizika" },
      { type: "ul", items: [
        "Izaberite jedan posao, ne pet. Onaj koji je najviše puta pomenut kao naporan.",
        "Merite ga dve nedelje pre bilo kakve izmene, da posle postoji sa čim da se uporedi.",
        "Prvu verziju pustite paralelno sa starim načinom rada, dok se ne pokaže da radi.",
        "Ostavite izlaz — ručni režim mora da radi i posle automatizacije.",
      ]},
      { type: "p", text: "Automatizacija koja se isplati skoro nikad nije spektakularna. To je obično jedna tiha veza između dva sistema koja je nekome vratila dva sata nedeljno i uklonila grešku koja se dešavala jednom mesečno." },
    ],
  },
];
