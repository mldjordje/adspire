import type { LocaleCode } from "@/lib/site-config";

export const HOTEL_SLUG = "hotelski-rezervacioni-sistem";
export const HOTEL_PATH = `/${HOTEL_SLUG}`;

export type HotelCopy = {
  nav: string; title: string; description: string; headline: [string, string, string];
  intro: string; cta: string; explore: string; demo: string; home: string;
  chapters: [string, string, string];
  storyTitle: string; storyIntro: string;
  steps: { title: string; text: string }[];
  ui: { website: string; room: string; dates: string; book: string; confirmed: string; guest: string; calendar: string; rooms: string; direct: string; roles: [string, string, string]; roleText: [string, string, string]; available: string; occupied: string; ready: string; arrival: string };
  operationsTitle: string; operationsIntro: string;
  phasesTitle: string; phasesIntro: string; phases: { title: string; text: string; items: string[] }[];
  /**
   * What the money actually buys. Buyers kept asking it out loud after reading
   * the phases, and the page answered it nowhere: the two costs a direct
   * system removes are reception hours and portal commission.
   */
  valueTitle: string; valueIntro: string; valueItems: { title: string; text: string }[]; valueNote: string;
  visibilityTitle: string; visibilityText: string; visibilityItems: string[];
  ownershipTitle: string; ownershipText: string;
  faqTitle: string; faq: { q: string; a: string }[];
  inquiryTitle: string; inquiryText: string; terms: string;
  related: string; relatedLabels: [string, string, string];
};

export const hotelCopy: Record<LocaleCode, HotelCopy> = {
  sr: {
    nav: "Za hotele", title: "Hotelski rezervacioni sistem i sajt po meri",
    description: "Izrada sajta za hotel i hotelskog rezervacionog sistema po meri. Direktne rezervacije bez Adspire provizije, upravljanje sobama i gostima. Zatražite ponudu.",
    headline: ["Vaš hotel.", "Vaš sajt.", "Vaše rezervacije."],
    intro: "Izrađujemo hotelski sajt i sistem za rezervacije i upravljanje po meri. Vaš prodajni kanal, vaši podaci. Bez Adspire provizije.",
    cta: "Zatražite ponudu", explore: "Istražite sistem", demo: "Ilustracija sistema po meri · demonstracioni podaci", home: "Početna",
    chapters: ["Sajt i rezervacije", "Operativa hotela", "Kanali prodaje"],
    storyTitle: "Od prvog klika.\nDo dobrodošlice.",
    storyIntro: "Gost vidi slobodnu sobu. Recepcija vidi novu rezervaciju. Vi vidite šta se dešava — u jednom povezanom sistemu.",
    steps: [
      { title: "Sajt koji predstavlja vaš hotel.", text: "Sobe, fotografije, sadržaji i lokacija, na jezicima vaših gostiju. Brz sajt sa jasnim putem do rezervacije, na telefonu i računaru." },
      { title: "Direktna rezervacija, u nekoliko koraka.", text: "Gost bira termin i sobu, ostavlja podatke i dobija potvrdu. Pravila dostupnosti, otkazivanja i način plaćanja definišemo prema vašem poslovanju." },
      { title: "Rezervacija stiže na recepciju.", text: "Kalendar, status sobe i podaci o boravku na jednom mestu. Dostupnost u sopstvenom sistemu ažurira se iz istih podataka." },
    ],
    ui: { website: "Hotelski sajt", room: "Deluxe soba", dates: "12–15. oktobar · 2 gosta", book: "Rezervišite boravak", confirmed: "Rezervacija potvrđena", guest: "Gost · demonstracija", calendar: "Kalendar rezervacija", rooms: "Sobe", direct: "Direktna rezervacija", roles: ["Vlasnik", "Recepcija", "Osoblje"], roleText: ["Pregled rezervacija, popunjenosti i izveštaja. Sezonske cene i pravila prodaje pod vašom kontrolom.", "Dolasci, odlasci i evidencija gostiju. Manje prepisivanja, preglednija smena.", "Raspored čišćenja i statusi soba na telefonu. Pristup samo podacima potrebnim za posao."], available: "Slobodno", occupied: "Zauzeto", ready: "Spremna", arrival: "Dolazak" },
    operationsTitle: "Jedan hotel.\nUsklađen tim.", operationsIntro: "Softver za upravljanje hotelom prilagođavamo vašem načinu rada. Isprobajte prikaze različitih uloga.",
    phasesTitle: "Plaćate sistem\nkoji vama treba.", phasesIntro: "Razvoj po meri, u dogovorenim fazama. Počinjemo od onoga što rešava vaš najveći problem. Svaka faza ima svoj obim, cenu i rok.",
    phases: [
      { title: "Sajt i rezervacije", text: "Vaš direktni prodajni kanal.", items: ["Hotelski sajt i stranice soba", "Dostupnost, rezervacija i email potvrde", "Admin panel, tehnički SEO i AI čitljiv sadržaj"] },
      { title: "Operativa hotela", text: "Alati za ljude koji vode hotel.", items: ["Gosti, sezonske cene i izveštaji", "Mobilni pristup i zadaci osoblja", "Planirana eTurista integracija nakon tehničke provere"] },
      { title: "Kanali i rast", text: "Povezivanje sa vašim kanalima prodaje.", items: ["Planirano povezivanje sa Booking.com, Airbnb i Google Hotels", "Sinhronizacija preko odobrenih integracija / channel managera", "Automatski emailovi, vaučeri i program lojalnosti po dogovoru"] },
    ],
    valueTitle: "Šta tačno plaćate.", valueIntro: "Ne plaćate softver zato što je lep. Plaćate da recepcija prestane da prepisuje, i da svaka direktna rezervacija ostane cela kod vas.",
    valueItems: [
      { title: "Sate na recepciji", text: "Upit na mejlu, poziv, provera u tabeli, potvrda, pa ponovo upis u drugi program. Kada gost rezerviše sam, a rezervacija ulazi direktno u kalendar, ti koraci nestaju — najviše u sezoni, kada su ljudi najskuplji." },
      { title: "Proviziju portalima", text: "Booking.com, Expedia i slični portali naplaćuju proviziju po rezervaciji, obično dvocifren procenat prema ugovoru koji imate sa njima. Direktna rezervacija sa vašeg sajta tu proviziju ne plaća. Portali ostaju kao kanal vidljivosti — sistem je tu da smanji udeo rezervacija koje idu preko njih." },
      { title: "Dvostruke rezervacije i greške", text: "Kada dostupnost stoji na dva mesta, pre ili kasnije se razilazi — i to se rešava pozivom gostu koji nikome nije prijatan. Jedan izvor dostupnosti uklanja razlog za tu vrstu greške." },
      { title: "Gosta koji ostaje vaš", text: "Preko portala gost je gost portala: njegov mejl, njegova pravila, njegov ponovni dolazak. Direktna rezervacija ostavlja podatke o gostu kod vas, pa ponovni dolazak, vaučer ili popust idu direktno, bez posrednika." },
    ],
    valueNote: "Adspire ne naplaćuje proviziju na rezervacije. Plaćate izradu po ponudi; hosting, domen, održavanje i naknade platnog procesora navode se zasebno.",
    visibilityTitle: "Spreman za pretragu.\nJasan i AI sistemima.", visibilityText: "Uz izradu hotelskog sajta postavljamo SEO osnovu: razumljiv sadržaj, tehnički ispravne stranice i precizne podatke o hotelu. Cilj je da gosti lakše pronađu i razumeju vašu ponudu.",
    visibilityItems: ["Posebne stranice soba, lokacija i stvarna pitanja gostiju", "Strukturirani podaci i usklađeno ime, adresa i kontakt", "Praćenje indeksiranja, poseta i upita — bez obećanja pozicija ili AI preporuka"],
    ownershipTitle: "Bez Adspire provizije.\nSa jasnim dogovorom.", ownershipText: "Izradu plaćate prema ponudi. Adspire ne naplaćuje procenat rezervacije. Hosting, domen, održavanje i troškove spoljnih servisa definišemo posebno. Predviđamo obuku osoblja, rezervne kopije i izvoz vaših podataka; uslove i učestalost potvrđujemo ugovorom.",
    faqTitle: "Pre nego što razgovaramo.",
    faq: [
      { q: "Da li je ovo gotov hotelski softver?", a: "Ovo je usluga razvoja hotelskog sajta i sistema po meri. Prikazi na stranici su ilustracije, a konkretne funkcije, faze i rokove dogovaramo za vaš hotel." },
      { q: "Koliko košta izrada i koliko traje?", a: "Cena i rok zavise od broja funkcija, jezika, postojećih podataka i integracija. Posle razgovora dobijate ponudu sa obimom i cenom svake faze, kao i posebno navedenim tekućim troškovima." },
      { q: "Da li uzimate proviziju na rezervacije?", a: "Ne. Adspire ne uzima proviziju na rezervacije. Naknade procesora plaćanja, portala, channel managera ili drugih spoljnih servisa mogu postojati i navode se zasebno." },
      { q: "Može li sistem da se poveže sa eTuristom?", a: "Za hotele u Srbiji planiramo integraciju nakon pribavljanja važeće specifikacije, provere pristupa i testiranja. Dok te uslove ne proverimo, integracija nema potvrđen obim ili fiksni rok." },
      { q: "Da li povezujete Booking.com, Airbnb i Google Hotels?", a: "Povezivanje planiramo preko dostupnih, odobrenih integracija ili channel managera. Mogućnosti, troškove i pravila sinhronizacije proveravamo pre nego što ih uključimo u ugovor." },
      { q: "Možemo li da zadržimo postojeći sajt ili podatke?", a: "Najpre proveravamo postojeći sajt i mogućnost izvoza podataka. Na osnovu toga predlažemo integraciju ili migraciju i testiramo podatke pre prelaska." },
      { q: "Radite li sa hotelima van Srbije?", a: "Da. Adspire Digital iz Niša radi sa hotelima u Srbiji i inostranstvu. Jezike, valute, integracije i lokalne zahteve definišemo za tržište konkretnog hotela." },
    ],
    inquiryTitle: "Hajde da upoznamo\nvaš hotel.", inquiryText: "Napišite gde se hotel nalazi, koliko ima soba i kako danas primate rezervacije. Predložićemo prvi korak i obim za ponudu.", terms: "Razvoj po meri · Cena i rok po ponudi · Bez Adspire provizije", related: "Povezane usluge", relatedLabels: ["Izrada web sajtova", "Rezervacioni sistemi", "SEO i digitalni marketing"],
  },
  en: {
    nav: "For hotels", title: "Custom hotel websites and booking systems",
    description: "Custom hotel website and booking system development. Direct reservations with no Adspire commission, room and guest management. Request a tailored proposal.",
    headline: ["Your hotel.", "Your website.", "Your bookings."], intro: "We build custom hotel websites, booking systems and management tools. Your sales channel. Your data. No Adspire booking commission.",
    cta: "Request a proposal", explore: "Explore the system", demo: "Custom system illustration · demo data", home: "Home", chapters: ["Website & bookings", "Hotel operations", "Sales channels"],
    storyTitle: "From first click.\nTo a warm welcome.", storyIntro: "Your guest finds a room. Reception sees a new booking. You see the bigger picture — in one connected system.",
    steps: [
      { title: "A website that feels like your hotel.", text: "Rooms, photography, amenities and location, in your guests’ languages. A fast website with a clear booking journey on every screen." },
      { title: "A direct booking in a few steps.", text: "Guests choose dates and a room, leave their details and receive confirmation. Availability, cancellation rules and payment methods follow your business needs." },
      { title: "The booking arrives at reception.", text: "Your calendar, room status and stay details in one place. Availability in your own system updates from the same source." },
    ],
    ui: { website: "Hotel website", room: "Deluxe room", dates: "12–15 October · 2 guests", book: "Book your stay", confirmed: "Booking confirmed", guest: "Guest · demo", calendar: "Booking calendar", rooms: "Rooms", direct: "Direct booking", roles: ["Owner", "Reception", "Staff"], roleText: ["Bookings, occupancy and reports in view. Seasonal prices and sales rules under your control.", "Arrivals, departures and guest records. Less copying and a clearer handover.", "Cleaning schedules and room status on a phone. Access only to the information each role needs."], available: "Available", occupied: "Occupied", ready: "Ready", arrival: "Arrival" },
    operationsTitle: "One hotel.\nA connected team.", operationsIntro: "Hotel management software shaped around your operation. Explore the different team views.",
    phasesTitle: "Pay for the system\nyour hotel needs.", phasesIntro: "Custom development in agreed stages. We start with your biggest operational need. Each stage has its own scope, price and timeline.",
    phases: [
      { title: "Website & bookings", text: "Your direct sales channel.", items: ["Hotel website and room pages", "Availability, reservations and email confirmations", "Admin tools, technical SEO and AI-readable content"] },
      { title: "Hotel operations", text: "Tools for the people running your hotel.", items: ["Guests, seasonal rates and reports", "Mobile access and staff tasks", "Planned eTurista integration for Serbia, subject to technical verification"] },
      { title: "Channels & growth", text: "Connect your sales channels.", items: ["Planned Booking.com, Airbnb and Google Hotels connections", "Sync through approved integrations or a channel manager", "Automated emails, vouchers and loyalty features by agreement"] },
    ],
    valueTitle: "What you actually pay for.", valueIntro: "You are not paying for software because it looks good. You are paying so reception stops retyping, and so every direct booking stays whole.",
    valueItems: [
      { title: "Hours at reception", text: "An email inquiry, a phone call, a check in a spreadsheet, a confirmation, then the same data typed into another program. When a guest books directly and the booking lands in your calendar, those steps disappear — most of all in season, when staff hours cost the most." },
      { title: "Portal commission", text: "Booking.com, Expedia and similar portals charge a commission per reservation, usually a double-digit percentage under the contract you signed with them. A direct booking from your own website pays none of it. Portals stay as a visibility channel — the system exists to lower the share of bookings that go through them." },
      { title: "Double bookings and mistakes", text: "When availability lives in two places it eventually drifts apart, and the fix is a phone call nobody enjoys making. One source of availability removes the reason for that class of mistake." },
      { title: "A guest who stays yours", text: "Through a portal the guest is the portal's guest: their email, their rules, their repeat booking. A direct reservation leaves the guest data with you, so a return stay, a voucher or a discount goes out directly." },
    ],
    valueNote: "Adspire charges no booking commission. You pay for development per proposal; hosting, domain, maintenance and payment-processor fees are listed separately.",
    visibilityTitle: "Built for search.\nClear to AI systems.", visibilityText: "Your hotel website starts with a sound SEO foundation: useful content, technically accessible pages and accurate hotel information. The goal is to help guests find and understand your offer.", visibilityItems: ["Individual room pages, location details and real guest questions", "Structured data and consistent business name, address and contact", "Indexing, traffic and inquiry measurement — without ranking or AI recommendation guarantees"],
    ownershipTitle: "No Adspire commission.\nClear commercial terms.", ownershipText: "Development is priced in your proposal. Adspire takes no percentage of bookings. Hosting, domain, maintenance and third-party fees are specified separately. Staff training, backups and data export are scoped in the agreement, including frequency and terms.",
    faqTitle: "Before we talk.", faq: [
      { q: "Is this an off-the-shelf hotel product?", a: "This is a custom hotel website and software development service. The interfaces shown are illustrations. Features, stages and delivery dates are agreed for your property." },
      { q: "How much does it cost and how long does it take?", a: "Pricing and timing depend on features, languages, existing data and integrations. After a conversation, you receive a proposal with a scope, cost and timeline for each stage, plus ongoing costs." },
      { q: "Do you charge booking commission?", a: "No. Adspire takes no booking commission. Payment providers, travel platforms, channel managers and other third-party services may charge their own fees, listed separately." },
      { q: "Can you integrate eTurista?", a: "For hotels in Serbia, we plan integration after obtaining the current specification, checking access and testing. Scope and a fixed delivery date can only be confirmed after those checks." },
      { q: "Can you connect Booking.com, Airbnb and Google Hotels?", a: "We plan connections through available approved integrations or a channel manager. Capabilities, fees and sync rules are verified before inclusion in the agreement." },
      { q: "Can we keep our existing website or data?", a: "We assess your website and data export options first, then propose integration or migration and validate the data before switching." },
      { q: "Do you work internationally?", a: "Yes. Adspire Digital is based in Niš, Serbia and works with hotels in Serbia and abroad. Languages, currencies, integrations and local requirements are scoped for each property." },
    ], inquiryTitle: "Let’s get to know\nyour hotel.", inquiryText: "Tell us your location, room count and how you currently take bookings. We’ll suggest a starting point and a scope for your proposal.", terms: "Custom development · Price and timeline by proposal · No Adspire commission", related: "Related services", relatedLabels: ["Website development", "Booking systems", "SEO & digital marketing"],
  },
  de: {
    nav: "Für Hotels", title: "Hotelwebsite und Buchungssystem nach Maß",
    description: "Individuelle Hotelwebsites und Buchungssysteme: Direktbuchungen ohne Adspire-Provision, Zimmer- und Gästeverwaltung. Jetzt ein Angebot anfordern.",
    headline: ["Ihr Hotel.", "Ihre Website.", "Ihre Buchungen."], intro: "Wir entwickeln Hotelwebsites, Buchungssysteme und Verwaltungssoftware nach Maß. Ihr Vertriebskanal. Ihre Daten. Ohne Adspire-Buchungsprovision.", cta: "Angebot anfordern", explore: "System entdecken", demo: "Illustration einer individuellen Lösung · Demodaten", home: "Startseite", chapters: ["Website & Buchungen", "Hotelbetrieb", "Vertriebskanäle"],
    storyTitle: "Vom ersten Klick.\nZum Willkommen.", storyIntro: "Der Gast findet ein Zimmer. Die Rezeption sieht eine neue Buchung. Sie behalten den Überblick — in einem verbundenen System.",
    steps: [
      { title: "Eine Website mit dem Charakter Ihres Hotels.", text: "Zimmer, Bilder, Ausstattung und Lage in den Sprachen Ihrer Gäste. Eine schnelle Website mit einem klaren Buchungsweg auf jedem Bildschirm." },
      { title: "In wenigen Schritten direkt buchen.", text: "Gäste wählen Zeitraum und Zimmer, hinterlassen ihre Daten und erhalten eine Bestätigung. Verfügbarkeit, Stornoregeln und Zahlungsarten passen wir Ihrem Betrieb an." },
      { title: "Die Buchung erreicht die Rezeption.", text: "Kalender, Zimmerstatus und Aufenthaltsdaten an einem Ort. Die Verfügbarkeit im eigenen System wird aus derselben Datenbasis aktualisiert." },
    ],
    ui: { website: "Hotelwebsite", room: "Deluxe-Zimmer", dates: "12.–15. Oktober · 2 Gäste", book: "Aufenthalt buchen", confirmed: "Buchung bestätigt", guest: "Gast · Demo", calendar: "Buchungskalender", rooms: "Zimmer", direct: "Direktbuchung", roles: ["Inhaber", "Rezeption", "Personal"], roleText: ["Buchungen, Auslastung und Berichte im Blick. Saisonpreise und Verkaufsregeln unter Ihrer Kontrolle.", "Anreisen, Abreisen und Gästedaten. Weniger Übertragen von Daten und eine klare Schichtübergabe.", "Reinigungspläne und Zimmerstatus auf dem Smartphone. Jede Rolle sieht nur die benötigten Informationen."], available: "Verfügbar", occupied: "Belegt", ready: "Bereit", arrival: "Anreise" },
    operationsTitle: "Ein Hotel.\nEin verbundenes Team.", operationsIntro: "Hotelsoftware, die zu Ihren Abläufen passt. Entdecken Sie die Ansichten für verschiedene Rollen.",
    phasesTitle: "Sie bezahlen,\nwas Ihr Hotel braucht.", phasesIntro: "Individuelle Entwicklung in vereinbarten Phasen. Wir beginnen mit Ihrem wichtigsten Bedarf. Jede Phase hat einen eigenen Umfang, Preis und Zeitplan.", phases: [
      { title: "Website & Buchungen", text: "Ihr direkter Vertriebskanal.", items: ["Hotelwebsite und Zimmerseiten", "Verfügbarkeit, Buchungen und E-Mail-Bestätigungen", "Adminbereich, technisches SEO und KI-lesbare Inhalte"] },
      { title: "Hotelbetrieb", text: "Werkzeuge für Ihr Team.", items: ["Gäste, Saisonpreise und Berichte", "Mobiler Zugang und Aufgaben für das Personal", "Geplante eTurista-Anbindung für Serbien nach technischer Prüfung"] },
      { title: "Kanäle & Wachstum", text: "Ihre Vertriebskanäle verbinden.", items: ["Geplante Anbindung an Booking.com, Airbnb und Google Hotels", "Synchronisierung über zugelassene Integrationen oder Channel Manager", "Automatische E-Mails, Gutscheine und Treuefunktionen nach Vereinbarung"] },
    ],
    valueTitle: "Wofür Sie wirklich zahlen.", valueIntro: "Sie zahlen nicht für schöne Software. Sie zahlen dafür, dass die Rezeption nichts mehr abtippt und jede Direktbuchung vollständig bei Ihnen bleibt.",
    valueItems: [
      { title: "Stunden an der Rezeption", text: "Anfrage per E-Mail, Anruf, Blick in die Tabelle, Bestätigung, dann dieselben Daten noch einmal in ein anderes Programm. Bucht der Gast selbst und landet die Buchung direkt im Kalender, entfallen diese Schritte — vor allem in der Saison, wenn Personalstunden am teuersten sind." },
      { title: "Portalprovision", text: "Booking.com, Expedia und ähnliche Portale berechnen eine Provision pro Buchung, meist ein zweistelliger Prozentsatz gemäß Ihrem Vertrag. Eine Direktbuchung über Ihre eigene Website zahlt diese Provision nicht. Die Portale bleiben als Sichtbarkeitskanal — das System senkt den Anteil der Buchungen, die darüber laufen." },
      { title: "Doppelbuchungen und Fehler", text: "Liegt die Verfügbarkeit an zwei Stellen, laufen sie irgendwann auseinander — und die Korrektur ist ein unangenehmer Anruf. Eine einzige Datenquelle nimmt dieser Fehlerart die Grundlage." },
      { title: "Ein Gast, der Ihnen gehört", text: "Über ein Portal ist der Gast der Gast des Portals: dessen E-Mail, dessen Regeln, dessen Folgebuchung. Eine Direktbuchung hinterlässt die Gästedaten bei Ihnen — Folgeaufenthalt, Gutschein oder Rabatt gehen direkt raus." },
    ],
    valueNote: "Adspire erhebt keine Buchungsprovision. Sie zahlen die Entwicklung laut Angebot; Hosting, Domain, Wartung und Gebühren des Zahlungsanbieters werden separat ausgewiesen.",
    visibilityTitle: "Für die Suche gebaut.\nFür KI verständlich.", visibilityText: "Ihre Hotelwebsite erhält eine solide SEO-Grundlage: hilfreiche Inhalte, technisch zugängliche Seiten und korrekte Hotelinformationen. So können Gäste Ihr Angebot leichter finden und verstehen.", visibilityItems: ["Eigene Zimmerseiten, Standortinformationen und echte Gästefragen", "Strukturierte Daten und einheitliche Namen, Adressen und Kontaktdaten", "Messung von Indexierung, Besuchen und Anfragen — ohne Garantie für Rankings oder KI-Empfehlungen"],
    ownershipTitle: "Ohne Adspire-Provision.\nMit klaren Konditionen.", ownershipText: "Die Entwicklung wird im Angebot kalkuliert. Adspire erhält keinen Anteil an Buchungen. Hosting, Domain, Wartung und Gebühren externer Dienste werden separat festgelegt. Schulung, Backups und Datenexport werden einschließlich Bedingungen und Häufigkeit vertraglich vereinbart.",
    faqTitle: "Vor unserem Gespräch.", faq: [
      { q: "Ist dies ein fertiges Hotelprodukt?", a: "Dies ist eine Dienstleistung für individuelle Hotelwebsites und Software. Die gezeigten Oberflächen sind Illustrationen. Funktionen, Phasen und Termine vereinbaren wir für Ihr Hotel." },
      { q: "Was kostet die Entwicklung und wie lange dauert sie?", a: "Kosten und Dauer hängen von Funktionen, Sprachen, vorhandenen Daten und Integrationen ab. Nach einem Gespräch erhalten Sie ein Angebot mit Umfang, Preis und Zeitplan je Phase sowie laufenden Kosten." },
      { q: "Berechnen Sie eine Buchungsprovision?", a: "Nein. Adspire erhebt keine Buchungsprovision. Zahlungsanbieter, Buchungsportale, Channel Manager oder andere Dienste können eigene Gebühren berechnen. Diese werden separat aufgeführt." },
      { q: "Können Sie eTurista integrieren?", a: "Für Hotels in Serbien planen wir die Integration nach Beschaffung der aktuellen Spezifikation, Zugangsprüfung und Tests. Erst danach lassen sich Umfang und verbindlicher Termin bestätigen." },
      { q: "Sind Booking.com, Airbnb und Google Hotels anschließbar?", a: "Wir planen Anbindungen über verfügbare zugelassene Integrationen oder einen Channel Manager. Möglichkeiten, Gebühren und Synchronisierungsregeln prüfen wir vor der vertraglichen Zusage." },
      { q: "Können wir unsere Website oder Daten behalten?", a: "Wir prüfen zuerst Ihre Website und die Möglichkeiten zum Datenexport. Danach schlagen wir eine Integration oder Migration vor und validieren die Daten vor der Umstellung." },
      { q: "Arbeiten Sie auch international?", a: "Ja. Adspire Digital sitzt in Niš, Serbien und arbeitet mit Hotels im In- und Ausland. Sprachen, Währungen, Integrationen und lokale Anforderungen werden je Hotel vereinbart." },
    ], inquiryTitle: "Lernen wir\nIhr Hotel kennen.", inquiryText: "Nennen Sie uns Standort, Zimmeranzahl und Ihren aktuellen Buchungsablauf. Wir schlagen den ersten Schritt und einen Angebotsumfang vor.", terms: "Individuelle Entwicklung · Preis und Termin nach Angebot · Ohne Adspire-Provision", related: "Weitere Leistungen", relatedLabels: ["Website-Entwicklung", "Buchungssysteme", "SEO & digitales Marketing"],
  },
};

export function hotelService(locale: LocaleCode) {
  const t = hotelCopy[locale];
  return { slug: HOTEL_SLUG, href: HOTEL_PATH, title: t.title, summary: t.intro, bullets: [...t.chapters], cta: t.explore };
}

export function hotelDetail(locale: LocaleCode) {
  const t = hotelCopy[locale];
  return { h1: t.title, intro: t.intro, overview: t.ownershipText, tags: [...t.chapters], bestFor: t.steps.map(s => s.title), deliverables: t.phases.map(p => p.title), faq: t.faq };
}
