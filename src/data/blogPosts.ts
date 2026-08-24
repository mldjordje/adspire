import { EXTRA_BLOG_POSTS } from "./blogPostsExtra";

export type BlogSection =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; text: string }
  | { type: "divider" };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  body: BlogSection[];
  relatedSlugs?: string[];
};

const CORE_BLOG_POSTS: BlogPost[] = [
  {
    slug: "web-sistemi-spremni-za-rast",
    title: "Kako gradimo web sisteme koji podnose kampanje i skaliranje",
    excerpt:
      "Next.js, TypeScript i jasna arhitektura od prvog dana — zašto dobar sistem znači da ne prepisuješ kod kada klijent naraste.",
    category: "Web razvoj",
    date: "03.04.2026",
    readTime: "6 min",
    image: "/images/blog/one.png",
    relatedSlugs: ["seo-i-performanse-u-prvom-sprintu", "ecommerce-koji-prodaje"],
    body: [
      { type: "p", text: "Svaki projekat koji počinjemo počinje istim pitanjem: kako će ovaj sistem izgledati za godinu dana kada klijent pokrene kampanju, napravi promociju ili doda novu uslugu? Odgovor na to pitanje određuje arhitekturalne odluke od prvog dana — i to je razlika između sajta koji podnosi rast i onog koji se sruši pod pritiskom." },
      { type: "h2", text: "Zašto arhitektura dolazi pre dizajna" },
      { type: "p", text: "Većina agencija počinje od Figma fajla. Mi počinjemo od strukture podataka, ruta i granica odgovornosti između klijentskog i serverskog koda. Kad znamo kako podaci teku kroz sistem, dizajn prirodno slijedi tu logiku — i implementacija ne iznenađuje nikoga." },
      { type: "p", text: "Next.js App Router nam daje mogućnost da precizno odredimo šta se renderuje na serveru, šta na klijentu i šta se keš-ira na CDN-u. To nije tehnički detalj — to direktno utiče na LCP, TTFB i troškove infrastrukture kada saobraćaj poraste." },
      { type: "h2", text: "Tri nivoa skalabilnosti" },
      { type: "h3", text: "1. Skalabilnost sadržaja" },
      { type: "p", text: "CMS integracija mora biti planirana od starta. Nije važno da li je to Sanity, Contentful ili custom admin panel — bitno je da dodavanje novog sadržaja, kategorije ili stranice ne zahtijeva deploy. Previše sajtova koje vidimo blokira klijente na developer-dependenciju za svaku izmenu teksta." },
      { type: "h3", text: "2. Skalabilnost saobraćaja" },
      { type: "p", text: "Statičke stranice sa ISR (Incremental Static Regeneration) mogu da serviraju milione posjetilaca sa minimalnom infrastrukturom. Dinamičke rute sa server komponentama se skaliraju horizontalno. Kada klijent pokrene Google Ads kampanju i saobraćaj poraste 10x u jednom danu, sistem mora da to podnese bez intervencije." },
      { type: "h3", text: "3. Skalabilnost koda" },
      { type: "p", text: "TypeScript nije opcija — to je osnova. Bez tipova, svaki novi developer koji uđe u projekat gubi dan razumijevanja strukture. Sa tipovima, onboarding je pitanje sati, a refaktoring je siguran jer kompajler hvata greške pre deploya." },
      { type: "callout", text: "Dobar web sistem nije onaj koji izgleda dobro danas — to je onaj koji je lak za mijenjanje za 18 meseci." },
      { type: "h2", text: "Konkretno: šta radimo drugačije" },
      { type: "ul", items: [
        "Feature-based struktura foldera umesto layer-based (components, hooks, utils po featuri, ne globalno)",
        "Environment variables audit pre svakog deploya — nikad ne guramo tajne u git",
        "Lighthouse CI u GitHub Actions — PR ne može da bude mergovan ispod 95 na svim metrikama",
        "Error boundaries per sekcija — greška u jednoj komponenti ne ruši cijelu stranicu",
        "Preview deployovi za svaki PR — klijent može da vidi izmjenu bez znanja o git-u",
      ]},
      { type: "h2", text: "Zaključak" },
      { type: "p", text: "Arhitektura je investicija koja se vraća svaki put kada dodaš feature bez straha. Nije glamurozna, nije vidljiva korisniku, ali je razlika između projekta koji raste i projekta koji se prepravlja od nule svakih godinu-dvije. Mi biramo tu investiciju od prvog dana." },
    ],
  },

  {
    slug: "booking-sistemi-bez-haosa",
    title: "Booking sistemi koji zamenjuju pozive, poruke i Excel tabele",
    excerpt:
      "Centralni kalendar, online termini i admin panel koji radi 24/7 — šta uslužni biznis dobija kada administracija prestane da bude ručni posao.",
    category: "Booking sistemi",
    date: "28.03.2026",
    readTime: "5 min",
    image: "/images/blog/two.png",
    relatedSlugs: ["web-sistemi-spremni-za-rast", "ai-automatizacija-za-mala-preduzeca"],
    body: [
      { type: "p", text: "Recept za haos u uslužnom biznisu je jednostavan: uzmi kalendar u glavi, dodaj Viber grupe sa klijentima, Excel tabelu za praćenje termina, i telefonske pozive za svaki problem. Rezultat je vlasnik koji provodi 2-3 sata dnevno na administraciji umesto na svom poslu." },
      { type: "h2", text: "Šta booking sistem zapravo rešava" },
      { type: "p", text: "Online booking nije samo forma na sajtu. Pravi sistem ima četiri sloja koji rade zajedno:" },
      { type: "ul", items: [
        "Javni interfejs — klijent bira uslugu, datum i termin bez poziva",
        "Automatske potvrde — email i SMS potvrda odmah, podsjetnik dan prije",
        "Admin panel — pregled svih termina, blokiranje slobodnih dana, upravljanje osobljem",
        "Analytics — koji termini su najpopularniji, koliko je no-show-a, koliki je prihod po periodu",
      ]},
      { type: "h2", text: "Case study: Doctor Barber" },
      { type: "p", text: "Barber studio Doctor Barber je imao klasičan problem: termini se dogovaraju na Instagram DM-ovima, vlasnik vodi bilježnicu, a vikendi su haos. Izgradili smo sistem koji uključuje online booking s realnim slobodnim terminima, klijentski nalog za istoriju posjeta i admin kalendar koji osoblje koristi na tabletu u studiju." },
      { type: "p", text: "Rezultat: termini se više ne dogovaraju na Instagram DM-ovima, bilježnica je otpala, a podsjetnik dan prije odlazi sam — bez ičije intervencije." },
      { type: "h2", text: "Case study: Dr Igić Clinic" },
      { type: "p", text: "Estetska klinika ima složenije potrebe — različite doktore, različite procedure sa različitim trajanjem, Beauty Pass sistem lojalnosti i potrebu za anamnezom prije tretmana. Sistem koji smo izgradili obrađuje sve to u jednom toku: klijent zakazuje, prima potvrdu, popunjava digitalni upitnik, a doktor vidi sve podatke u admin panelu." },
      { type: "callout", text: "Najdraži feedback koji smo dobili: 'Više ne razmišljam o terminima. Sistem to radi umesto mene.'" },
      { type: "h2", text: "Šta booking sistem nije" },
      { type: "p", text: "Booking plugin za WordPress koji koštaš 29$ mesečno. Ti sistemi rade za frizerske salone sa 3 usluge. Čim imaš složenije pravilo — termin traje 90 minuta ali se naplaćuje kao dva, različita dostupnost za seniore i juniore, grupni termini — standardni plugin pada." },
      { type: "p", text: "Custom sistem je investicija, ali je jedina opcija koja raste sa biznisom. I jedina koja ti daje podatke koji su tvoji, ne u tuđoj cloud bazi." },
      { type: "h2", text: "Kada ima smisla graditi custom" },
      { type: "ul", items: [
        "Imaš više od jedne vrste usluge ili jednog izvršioca",
        "Trebaš integraciju sa tvojim računovodstvom, CRM-om ili sistemom lojalnosti",
        "Klijenti imaju naloge i vide istoriju",
        "Trebaš analytics koji idu dalje od 'koliko je termina danas'",
      ]},
    ],
  },

  {
    slug: "seo-i-performanse-u-prvom-sprintu",
    title: "SEO i performanse ne idu na kraj projekta — ni kod nas",
    excerpt:
      "LCP ispod 1.2s, strukturirani podaci i Core Web Vitals 100 nisu bonus — grade se u prvi sprint jer je tada najjeftinije.",
    category: "SEO & performanse",
    date: "21.03.2026",
    readTime: "7 min",
    image: "/images/blog/three.png",
    relatedSlugs: ["web-sistemi-spremni-za-rast", "ecommerce-koji-prodaje"],
    body: [
      { type: "p", text: "Čuli smo ovu rečenicu previše puta: 'SEO ćemo raditi posle lansiranja.' Razumijemo logiku — projekat mora da se završi, rokovi pritišću, a SEO izgleda kao nešto što može da se doda kasnije. Problem je što nije." },
      { type: "h2", text: "Zašto je SEO najjeftiniji u prvom sprintu" },
      { type: "p", text: "Svaka odluka u arhitekturi utiče na SEO: struktura URL-ova, kako se renderuju podaci, da li stranice imaju statički HTML ili se generišu na klijentu, kako su slike optimizovane. Promijeniti te odluke posle lansiranja znači refaktoring koji košta višestruko više od ispravnog rada od starta." },
      { type: "p", text: "Konkretno: ako si izgradio SPA (Single Page Application) i Google ne može da indeksira sadržaj jer se renderuje na klijentu, nemiraš u alt-u da dodaš meta tag. Moraš da mijenjaš arhitekturu renderovanja." },
      { type: "h2", text: "Core Web Vitals: šta stvarno utiče" },
      { type: "h3", text: "LCP (Largest Contentful Paint) — cilj: ispod 1.2s" },
      { type: "ul", items: [
        "Hero slika mora biti preloaded (<link rel='preload'>) i servirana u WebP",
        "Nema layout shifta iznad folda — dimenzije slike definisane statički",
        "Font preload za primarne fontove koji se koriste above the fold",
        "Server response time ispod 200ms — Edge runtime ili dobro keširani statički fajlovi",
      ]},
      { type: "h3", text: "CLS (Cumulative Layout Shift) — cilj: 0" },
      { type: "ul", items: [
        "Svaka slika ima width i height atribute ili aspect-ratio u CSS-u",
        "Web fontovi nemaju FOUT (Flash of Unstyled Text) — font-display: optional ili swap sa rezervom",
        "Dinamički učitan sadržaj (ads, embeds) ima rezervisani prostor u DOM-u",
      ]},
      { type: "h3", text: "INP (Interaction to Next Paint) — cilj: ispod 200ms" },
      { type: "p", text: "Heavy JavaScript koji blokira main thread. Event handleri koji rade previše posla. Provjeri sa Chrome DevTools Performance tab na mobilnom CPU throttlingu (4x slowdown)." },
      { type: "callout", text: "Lighthouse 100 na desktopу je minimum. Pravi test je Lighthouse na mobilnom sa spором mrežom." },
      { type: "h2", text: "Strukturirani podaci: šta Google zapravo čita" },
      { type: "p", text: "Schema.org markup nije magija koja gura na prvu poziciju, ali je signal koji Google koristi za rich snippets — zvijezdice, FAQ accordion, breadcrumbs u rezultatima. Za agenciju: Organization, WebSite, Service, LocalBusiness. Za e-commerce: Product, Review, BreadcrumbList." },
      { type: "p", text: "Svaki naš projekat dobija minimalno Organization i WebSite schema od prvog dana. E-commerce projekti dobijaju potpunu Product schema, uključujući availability, price i review aggregate." },
      { type: "h2", text: "Next.js specifičnosti koje volimo" },
      { type: "ul", items: [
        "generateMetadata() API — dinamički meta tagovi bez client-side biblioteka",
        "next/image — automatski WebP, lazy loading, blur placeholder, srcset",
        "App Router sa statičkim generisanjem — svaka stranica je pre-rendered HTML koji Google može odmah da indeksira",
        "Sitemap.xml generisan automatski iz ruta — nikad zastario",
      ]},
    ],
  },

  {
    slug: "threejs-webgl-u-produkciji",
    title: "Three.js i WebGL u produkciji — šta agencije ne govore klijentima",
    excerpt:
      "3D animacije na sajtovima su impresivne, ali bundle size, FPS na mobilnom i fallback za starije browsere su gde projekti padaju.",
    category: "Frontend & 3D",
    date: "10.03.2026",
    readTime: "8 min",
    image: "/images/blog/four.png",
    relatedSlugs: ["web-sistemi-spremni-za-rast", "seo-i-performanse-u-prvom-sprintu"],
    body: [
      { type: "p", text: "Svaka agencija koja se bavi premium web dizajnom danas ima Three.js u portfoliju. Sferе koje se rotiraju, particleovi koji prate kursor, 3D scene koje reaguju na skrol — sve to izgleda sjajno u demo videu. Malo ko govori šta se dešava na Samsung Galaxy A32 klijentovog korisnika." },
      { type: "h2", text: "Problemi koje niko ne najavljuje" },
      { type: "h3", text: "Bundle size" },
      { type: "p", text: "Three.js cijela biblioteka je ~600KB minified. Sa geometrijama, shader materijalima i post-processing efektima, lako dođeš do 1-1.5MB JavaScript-a samo za 3D scenu. Na sporoj mobilnoj mreži to je 3-5 sekundi do interaktivnosti. Za korisnika koji je kliknuo na Google oglas i čeka — to su tri sekunde koje završavaju na Back dugmetu." },
      { type: "h3", text: "GPU performanse na mobilnom" },
      { type: "p", text: "Desktop GPU može renderovati kompleksnu scenu na 60 FPS bez problema. Mali mobilni GPU — posebno mid-range Android telefoni koji su ogromna većina srpskog tržišta — može pasti na 15-20 FPS ili se grejati i throttlovati do usporavanja." },
      { type: "h3", text: "WebGL dostupnost" },
      { type: "p", text: "WebGL 2.0 ne podržavaju svi browseri na svim uređajima. Stari iOS Safari, corporate browseri, Chromebooks sa integrated GPU — sve to može da prikaže blank screen gdje treba da bude tvoja 3D scena." },
      { type: "callout", text: "Pravilo koje koristimo: 3D scena mora biti vizuelni bonus, ne sadržaj koji nosi informaciju. Sajt mora raditi savršeno i bez nje." },
      { type: "h2", text: "Kako to radimo mi" },
      { type: "h3", text: "1. Dinamički import sa Suspense" },
      { type: "p", text: "Three.js se nikad ne učitava u prvom bundle-u. Koristimo dynamic import koji pokreće učitavanje tek kada korisnik dođe blizu elementa (IntersectionObserver sa 300px margin). Korisnici koji nikad ne skroluju do 3D sekcije nikad ne preuzimaju tu biblioteku." },
      { type: "h3", text: "2. Mobile detekcija i graceful degradation" },
      { type: "p", text: "Na mobilnim uređajima, pixel ratio se ograničava na 1 (umesto 2x ili 3x na retina ekranima), broj particleova se prepolovljuje, shadow mapping se gasi, i kompleksne geometrije se zamjenjuju nižim polygon brojem. Animacija je ista, GPU teret je 70% manji." },
      { type: "h3", text: "3. Shader umesto 3D geometrije kada je moguće" },
      { type: "p", text: "GLSL shader koji renderuje efekt na punoj 2D ravni je dramatično jeftiniji od 3D mesh-a sa istim vizuelnim efektom. Naše pozadine za service kartice su shaderi — izgledaju kompleksno, troše malo." },
      { type: "h3", text: "4. IntersectionObserver za pause/resume" },
      { type: "p", text: "Svaka Three.js scena kod nas ima IntersectionObserver koji pauzira requestAnimationFrame kad scena nije vidljiva. Ako korisnik skroluje dalje, GPU se oslobađa. To nije optimizacija — to je osnovna kultura." },
      { type: "h2", text: "Kada 3D ima smisla" },
      { type: "ul", items: [
        "Hero sekcija gdje korisnik provodi više od 3 sekunde",
        "Interaktivni konfigurator proizvoda (3D preview koji korisnik kontroliše)",
        "Data vizualizacija koja je korisniku lakše razumljiva u 3D",
        "Brending moment koji agencija može da dozvoli kao inicijalni loader",
      ]},
      { type: "h2", text: "Kada 3D nije rešenje" },
      { type: "ul", items: [
        "Stranice usluga gdje korisnik treba tekst i CTA, ne spektakl",
        "E-commerce listing stranice sa stotine produkata",
        "Blog i content stranice",
        "Bilo šta gdje Core Web Vitals score pada zbog 3D bundle-a",
      ]},
    ],
  },

  {
    slug: "ai-automatizacija-za-mala-preduzeca",
    title: "AI automatizacija nije samo za korporacije — konkretni primeri",
    excerpt:
      "n8n workflow, LLM agenti i integracije koje smanjuju ručni rad u prodaji, podršci i operativi — bez enterprise budžeta.",
    category: "AI & automatizacija",
    date: "01.03.2026",
    readTime: "6 min",
    image: "/images/blog/one.png",
    relatedSlugs: ["booking-sistemi-bez-haosa", "web-sistemi-spremni-za-rast"],
    body: [
      { type: "p", text: "Kad kažeš 'AI automatizacija' većina vlasnika malih biznisa zamišlja milionske investicije u podatkovne naučnike i serverske farme. Realnost je drugačija: n8n workflow koji čita email, klasifikuje upit i kreira kartu u CRM-u košta par sati programiranja i 0€ licenci." },
      { type: "h2", text: "Tri oblasti gdje AI odmah donosi vrednost" },
      { type: "h3", text: "1. Predobrada upita" },
      { type: "p", text: "Svaki dan stiže isti tip emailova: zahtev za cenu, zahtev za termin, pitanje o dostupnosti. LLM agent može da čita inbox, klasifikuje tip upita, izvuče relevantne podatke (ime, kontakt, o čemu se radi) i kreira strukturisani zadatak za tvoj tim — ili direktno odgovori na standardne upite." },
      { type: "p", text: "Rezultat: tvoj tim ne čita 40 emailova da bi shvatio koji su urgentni. Sistem to radi za njih." },
      { type: "h3", text: "2. Praćenje i nurturing leadova" },
      { type: "p", text: "Lead koji nije kupio odmah nije izgubljen lead. n8n workflow može pratiti kada je lead poslednji put kontaktiran, koliko dana je prošlo, i automatski poslati follow-up email u pravom trenutku sa personalizovanim sadržajem. Bez ručnog podsjećanja, bez zaboravljanja." },
      { type: "h3", text: "3. Generisanje sadržaja i izveštaja" },
      { type: "p", text: "Nedeljni izveštaj o upitima, reservacijama, prihodima — umjesto da ga pišeš ručno, workflow skuplja podatke iz tvog sistema, šalje ih LLM-u sa strukturom izveštaja, i ti dobijaš gotov dokument u inbox u ponedeljak ujutru." },
      { type: "callout", text: "AI automatizacija je najjeftinija kada zamjenjuje ponavljajuće, predvidive zadatke — ne kreativne odluke." },
      { type: "h2", text: "n8n vs Zapier vs custom kod" },
      { type: "p", text: "Zapier je odličan za jednostavne integracije bez programiranja. n8n je Zapier koji možeš hostovati sam, koštaš 0€ za neograničene workflow-ove, i može da pokretuje kompleksne logike sa petljama, uslovima i API pozivima. Za biznise koji ozbiljno razmišljaju o automatizaciji, n8n je jedini logičan izbor." },
      { type: "p", text: "Custom kod dolazi kada trebaš integracije sa legacy sistemima, specifičnu biznis logiku ili performanse koje n8n ne može da pruži. Za većinu tipičnih automatizacija, n8n je dovoljan." },
      { type: "h2", text: "Kako početi" },
      { type: "ul", items: [
        "Identifikuj tri zadatka koja tvoj tim radi svaki dan na isti način",
        "Od ta tri, izaberi onaj koji troši najviše vremena i ima najmanji varijabilitet",
        "Automatizuj samo taj jedan — dobij signal da li automatizacija radi",
        "Tek tada širi na ostale procese",
      ]},
      { type: "p", text: "Greška koju vidimo: pokušaj da se automatizuje sve odjednom. Rezultat je kompleksni sistem koji niko ne razumije i koji pada čim se nešto promijeni u biznisu." },
    ],
  },

  {
    slug: "ecommerce-koji-prodaje",
    title: "E-commerce koji zaista prodaje — razlika između sistema i kataloške stranice",
    excerpt:
      "Checkout tok, upsell mehanizmi, lager integracije i analytics — šta razdvaja web shop koji konvertuje od onog koji ne.",
    category: "E-commerce",
    date: "18.02.2026",
    readTime: "7 min",
    image: "/images/blog/two.png",
    relatedSlugs: ["web-sistemi-spremni-za-rast", "seo-i-performanse-u-prvom-sprintu"],
    body: [
      { type: "p", text: "Katalog sa lijepim slikama i dugmetom 'Dodaj u korpu' nije e-commerce. To je katalog sa dugmetom. E-commerce koji prodaje je sistem koji razumije zašto korisnici napuštaju checkout, šta ih tjera da se vrate, i kako maksimizirati prosječnu vrijednost narudžbine." },
      { type: "h2", text: "Gdje prosječni web shop gubi novac" },
      { type: "h3", text: "Checkout s previše koraka" },
      { type: "p", text: "Svaki dodatni korak u checkout toku je nova prilika da korisnik odustane. Guest checkout mora biti podrazumijevano — ne primoravaj korisnika da pravi nalog da bi platio. Nalog mogu napraviti posle, kada su već kupili i imaju razlog da se vrate." },
      { type: "h3", text: "Nema transparentnosti troškova" },
      { type: "p", text: "Poštarina koja se pojavi tek na kraju checkout-a je jedan od glavnih razloga za napuštanje korpe. Prikaži ukupnu cijenu sa dostavom što prije — idealno na product stranici ili u korpi, ne tek na payment koraku." },
      { type: "h3", text: "Mobilni checkout je broken" },
      { type: "p", text: "Većina saobraćaja dolazi sa mobilnih uređaja, a mobilni checkout je po pravilu slabija karika od desktop verzije. Razlog: forme sa sitnim fieldovima, dugmad koja su premala za prst, Apple/Google Pay nisu integrisani. Fix: native browser autofill, large touch targets, i payment sheet integracija." },
      { type: "callout", text: "Single-page checkout sa Apple Pay integracijom skraćuje mobilni tok na jedan ekran — manje polja, manje kucanja, manje razloga da se odustane." },
      { type: "h2", text: "Lager: najčešće ignorisani deo sistema" },
      { type: "p", text: "Prodati proizvod koji nemaš na lageru je skuplje nego ne prodati ga uopšte. Vraćanje novca, komunikacija sa klijentom, reputacija — sve to košta. Pravi lager sistem u realnom vremenu nije luksuz, to je osnova." },
      { type: "p", text: "Za Santos & Santorini, sagradili smo lager sistem koji prati svaki SKU u realnom vremenu, automatski skriva out-of-stock proizvode, i šalje notifikaciju administratoru kad zaliha padne ispod praga." },
      { type: "h2", text: "Analytics koji su zapravo korisni" },
      { type: "ul", items: [
        "Funnel vizualizacija: od dolaska do kupovine — gdje tačno korisnici odlaze",
        "Cart abandonment rate i razlog (exit survey na abandonment)",
        "Revenue po izvoru saobraćaja — koji kanal zapravo donosi profit, ne samo posjete",
        "AOV (Average Order Value) trend — da li upsell strategija radi",
        "Return rate — koji proizvodi se vraćaju i zašto",
      ]},
      { type: "h2", text: "Šta ne radimo" },
      { type: "p", text: "Ne gradimo e-commerce na WooCommerce ili Shopify kada klijent ima specifične potrebe koje platforma ne može da ispuni. Platforma je uvijek kompromis između fleksibilnosti i brzine razvoja. Kada klijent naraste van kompromisa, custom sistem je jedina opcija koja ne koštaš više na mesečnom nivou od izgradnje vlastite platforme." },
    ],
  },
];

/** Newest first: the index reads top-down and the newest work should lead it. */
export const BLOG_POSTS: BlogPost[] = [...EXTRA_BLOG_POSTS, ...CORE_BLOG_POSTS];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(post: BlogPost): BlogPost[] {
  if (!post.relatedSlugs) return [];
  return post.relatedSlugs
    .map((s) => BLOG_POSTS.find((p) => p.slug === s))
    .filter(Boolean) as BlogPost[];
}
