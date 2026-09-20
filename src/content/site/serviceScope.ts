/**
 * Two blocks per service that the rest of the page cannot carry: where the
 * service is the wrong tool, and what we ask before quoting.
 *
 * They exist for two reasons. A buyer decides faster when a page is willing to
 * send them away, and an answer engine can only quote a limit if the limit is
 * written down — "when NOT to use X" is a question people ask out loud and
 * almost no vendor page answers. Every line has to be specific to its service;
 * sixteen pages repeating the same sentence would be duplicate text, which is
 * the opposite of the point. `serviceScope.test.ts` enforces that.
 *
 * Serbian only. The prefixed subtrees carry translated copy from
 * serviceDetail.i18n; until these blocks are translated there, they render on
 * the Serbian page alone rather than as Serbian text under lang="en".
 */

export type ServiceScope = {
  /** Cases where buying this is a mistake. Written as plain statements. */
  notFor: string[];
  /** What has to be answered before a price means anything. */
  beforeQuote: string[];
};

export const SERVICE_SCOPE: Record<string, ServiceScope> = {
  "hotelski-rezervacioni-sistem": {
    notFor: [
      "Imate jedan apartman i nekoliko rezervacija mesečno — telefon i Booking su vam jeftiniji od sopstvenog sistema.",
      "Želite lepši sajt, a rezervacije i dalje puštate isključivo preko OTA kanala.",
      "Nema ko da održava cene i kalendar; sistem bez toga stoji prazan i gost vidi netačnu ponudu.",
    ],
    beforeQuote: [
      "Koliko jedinica izdajete i koliko se taj broj menja kroz sezonu.",
      "Koliki procenat rezervacija danas dolazi preko provizije i koliko vas ta provizija košta godišnje.",
      "Da li se plaća unapred, kaparom ili na recepciji.",
      "Ko zatvara termine kad ste puni i koliko brzo to uradi.",
    ],
  },
  "web-prezentacije": {
    notFor: [
      "Sajt vam treba za kampanju koja traje dve nedelje — tu je gotov alat jeftiniji i brži.",
      "Nemate nijednu fotografiju ni tekst o firmi, a ne želite da ih iko pravi umesto vas.",
      "Cilj je da sajt postoji zato što ga konkurencija ima, a ne da donese upit.",
    ],
    beforeQuote: [
      "Ko treba da vas nađe i šta tačno da uradi kad stigne na sajt.",
      "Ko piše tekstove i ko ih odobrava — to je korak koji najčešće zaustavi projekat.",
      "Da li postoji stari sajt i koje njegove adrese moraju da prežive selidbu.",
      "Koliko strana zaista treba, a ne koliko ih je bilo na starom sajtu.",
    ],
  },
  "e-commerce-web-shop": {
    notFor: [
      "Prodajete dvadesetak artikala bez varijanti — gotova platforma će vas manje koštati i prve godine i pete.",
      "Pakovanje i isporuka još nisu rešeni; web shop ne popravlja logistiku, samo je ubrza do pucanja.",
      "Treba vam katalog bez plaćanja i bez lagera — to je prezentacija, ne shop.",
    ],
    beforeQuote: [
      "Koliko artikala i koliko varijanti po artiklu (veličina, boja, pakovanje).",
      "Odakle dolazi stanje lagera — ručno, iz knjigovodstva ili iz postojećeg sistema.",
      "Pouzeće, kartice ili oboje, i ko potpisuje ugovor sa bankom.",
      "Ko pakuje porudžbine i kako danas sazna da je nova stigla.",
    ],
  },
  "mobilne-aplikacije": {
    notFor: [
      "Ono što vam treba radi u pregledaču na telefonu — aplikacija je tada samo dodatni trošak na dve prodavnice.",
      "Očekujete da aplikacija sama dovede korisnike; instalacija je mnogo veća prepreka od posete sajtu.",
      "Nema budžeta za održavanje posle lansiranja, a iOS i Android traže izmene svake godine.",
    ],
    beforeQuote: [
      "Ko će je instalirati i koji je razlog da je otvori drugi put.",
      "Da li mora native ili je dovoljan PWA koji se dodaje na početni ekran.",
      "Šta aplikacija radi kada nema interneta.",
      "Ko drži Apple i Google developer naloge i ko plaća njihove godišnje članarine.",
    ],
  },
  "cms-sistemi": {
    notFor: [
      "Sadržaj menjate dva puta godišnje — CMS je tada sloj koji niko ne otvori.",
      "Želite da svako može da menja sve, uključujući raspored i dizajn; to se završi tako što sajt posle tri meseca ne liči na sebe.",
    ],
    beforeQuote: [
      "Ko menja sadržaj i koliko često.",
      "Šta sme da se menja, a šta mora da ostane zaključano.",
      "Da li isti sadržaj ide na više jezika i ko prevodi.",
    ],
  },
  "interne-poslovne-aplikacije": {
    notFor: [
      "Excel radi posao i niko se ne žali — zamena tada ne vraća uloženo.",
      "Tim ne želi da promeni način rada; aplikacija koju niko ne otvara je najskuplja stavka u firmi.",
      "Tražite gotov ERP sa svim modulima — ovo je alat za jedan vaš proces, ne kutija sa svime.",
    ],
    beforeQuote: [
      "Koji jedan proces danas najviše boli i ko ga radi.",
      "Koliko ljudi ulazi u sistem i ko šta sme da vidi.",
      "Šta mora da se prenese iz postojećih tabela i u kakvom je stanju.",
      "Da li je neko već pokušao ovo i zašto nije zaživelo.",
    ],
  },
  "ai-integracije-automatizacija": {
    notFor: [
      "Proces koji hoćete da automatizujete nigde nije zapisan osim u nečijoj glavi — prvo se zapisuje, pa automatizuje.",
      "Očekujete da AI odlučuje umesto vas tamo gde greška košta; u tim koracima radi samo predlog koji čovek potvrđuje.",
      "Korak se ponavlja nekoliko puta mesečno — ručno je i dalje jeftinije od održavanja automatizacije.",
    ],
    beforeQuote: [
      "Koji se korak ponavlja i koliko puta nedeljno.",
      "Gde žive podaci koje bi automatizacija čitala i ko im daje pristup.",
      "Šta se dešava kada automatizacija pogreši i ko to prvi vidi.",
      "Koliko sati nedeljno taj korak danas oduzima i kome.",
    ],
  },
  "ai-preporuka": {
    notFor: [
      "Sajt još nije ni na Google-u — prvo ide osnovno indeksiranje, pa onda ovo.",
      "Nemate stranu koja odgovara na kupčevo pitanje, samo opšti opis firme; nema šta da se citira.",
      "Tražite garanciju da će vas AI pominjati — to ne može da obeća niko, ni mi.",
    ],
    beforeQuote: [
      "Koje pitanje kupac postavi pre nego što uopšte sazna da postojite.",
      "Koje tri firme se danas pominju umesto vas.",
      "Koje podatke o sebi smemo javno da navedemo i ko ih potvrđuje.",
    ],
  },
  "business-intelligence-analitika": {
    notFor: [
      "Tri sistema se ne slažu oko istog broja — dok se izvor ne sredi, izveštaj samo lepše prikazuje neslaganje.",
      "Izveštaj treba jednom, za jednu prezentaciju; to je posao za tabelu, ne za sistem.",
    ],
    beforeQuote: [
      "Koju odluku donosite na osnovu tog broja i koliko često.",
      "Ko izveštaj gleda i šta uradi kada vidi da je loš.",
      "Gde podaci danas stvarno žive, uključujući i ono što stoji u nečijem mejlu.",
    ],
  },
  "seo-digitalni-marketing": {
    notFor: [
      "Očekujete prvu poziciju za mesec dana; za konkurentne pojmove to ne postoji bez plaćenih oglasa.",
      "Sajt je spor i prazan, a taj deo ne sme da se dira — tada SEO nema na čemu da radi.",
      "Nema ko da odgovori na upit koji stigne; dovesti posetioca je lakši deo.",
    ],
    beforeQuote: [
      "Šta kupac zaista ukuca kada traži ono što prodajete, njegovim rečima.",
      "Koliko upita danas stigne i odakle, po nedelji.",
      "Ko u firmi može da potvrdi činjenice koje ćemo napisati na sajtu.",
    ],
  },
  "cyber-security-gdpr": {
    notFor: [
      "Tražite papir koji stoji u fascikli, a ne promenu načina rada — papir vas neće odbraniti.",
      "Ne zna se gde su podaci ni ko im pristupa, a nema koga da se pita.",
    ],
    beforeQuote: [
      "Koje lične podatke skupljate i gde oni završe posle prve nedelje.",
      "Ko ima pristup produkciji i šta se dešava kada ta osoba ode iz firme.",
      "Šta radite ako sutra ujutru nema baze.",
    ],
  },
  "hosting-infrastruktura": {
    notFor: [
      "Sajt radi, račun je pet evra mesečno i niko se ne žali.",
      "Očekujete da jači server reši sporost koja dolazi iz koda; ne reši, samo poskupi.",
    ],
    beforeQuote: [
      "Koliko poseta imate i kako izgleda najveći skok u toku godine.",
      "Ko danas drži domen i DNS, i da li mu se javljate na vreme.",
      "Koliko minuta nedostupnosti vas zaista košta.",
    ],
  },
  "saas-razvoj": {
    notFor: [
      "Nijedan korisnik još nije rekao da bi ovo platio; prva verzija se pravi za nekoga ko čeka, ne za tržište uopšte.",
      "Ideja traži tim od deset ljudi da bi uopšte krenula — to nije prvi korak nego treći.",
    ],
    beforeQuote: [
      "Ko je prvi korisnik koji plaća i za šta tačno plaća.",
      "Šta je najmanja verzija koju bi taj neko već koristio.",
      "Ko preuzima proizvod posle lansiranja i sa kojim znanjem.",
    ],
  },
  "industrijska-resenja": {
    notFor: [
      "Mašine i vage nemaju nikakav izlaz podataka i ne smeju da se diraju — ostaje samo ručni unos.",
      "Traži se zamena celog postojećeg sistema u pogonu; to je projekat druge veličine.",
    ],
    beforeQuote: [
      "Šta se danas upisuje rukom, na koji papir i ko ga posle prepisuje.",
      "Koji uređaji postoje i da li išta od njih šalje podatak.",
      "Ko radi u smeni, na čemu i koliko ima vremena da nešto unese.",
    ],
  },
  "interaktivne-web-tehnologije": {
    notFor: [
      "Cilj je da sajt izgleda skupo, a nema se šta pokazati; animacija ne popunjava prazan sadržaj.",
      "Većina vaše publike je na starijim telefonima i slabom internetu — tu 3D odbija, ne privlači.",
    ],
    beforeQuote: [
      "Šta tačno treba da se vidi i zašto to fotografija ne može da pokaže.",
      "Da li 3D modeli postoje ili se prave od nule.",
      "Sa kojih uređaja vam dolazi većina poseta danas.",
    ],
  },
  "sistemi-za-zakazivanje": {
    notFor: [
      "Imate dva termina dnevno i telefon to rešava bez greške.",
      "Ne želite da menjate način na koji danas vodite kalendar; sistem tada radi paralelno sa sveskom i oba su netačna.",
      "Treba vam samo dugme koje pošalje mejl — to je forma, ne sistem zakazivanja.",
    ],
    beforeQuote: [
      "Koliko ljudi prima termine i da li svako radi iste usluge.",
      "Šta se danas dešava kada neko ne dođe.",
      "Da li se plaća unapred, kaparom ili na licu mesta.",
      "Kako izgleda dan kada se neko otkaže sat pre termina.",
    ],
  },
  "staticni-sajtovi": {
    notFor: [
      "Sadržaj se menja svakog dana, a niko u firmi neće da otvara kod.",
      "Potreban je nalog, korpa ili bilo šta iza prijave korisnika.",
    ],
    beforeQuote: [
      "Koliko strana ima i koliko često se menjaju.",
      "Ko objavljuje izmene i sa kojim alatom radi.",
      "Da li postoji forma i gde prijave treba da stignu.",
    ],
  },
};

export function getServiceScope(slug: string): ServiceScope | undefined {
  return SERVICE_SCOPE[slug];
}
