import type { Guide } from "./guides";

/**
 * German GEO guides for DACH market & adspireagency.de.
 * Formatted with formal "Sie" register for business owners and decision makers.
 */

export const webShopNotSellingGuideDe: Guide = {
  path: "/de/warum-onlineshop-nicht-verkauft",
  eyebrow: "E-Commerce Conversion",
  title: "Warum verkauft mein Onlineshop nicht? — 5 Gründe für Warenkorbabbrüche",
  metaDescription:
    "Warum Besucher im Onlineshop abbrechen: versteckte Versandkosten, Registrierungszwang, langsame Mobilseiten und fehlendes Vertrauen. So steigern Sie Ihre Conversion Rate.",
  h1: "Warum verkauft mein Onlineshop nicht?",
  lead:
    "Wenn ein Onlineshop Besucher hat, aber keine Bestellungen generiert, liegt die Ursache zu 90 % an vier Reibungspunkten: unerwartete Versandkosten erst im letzten Schritt, Zwang zum Kundenkonto, Ladezeiten auf dem Smartphone über 2,5 Sekunden oder mangelnde Vertrauenssignale. Werden diese Hürden beseitigt, sinkt die Abbruchquote erfahrungsgemäß um 20 bis 35 %, ohne das Werbebudget zu erhöhen.",
  keywords: [
    "warum verkauft mein onlineshop nicht",
    "warenkorbabbruch verhindern",
    "onlineshop conversion rate erhoehen",
    "checkout optimierung",
    "kaufabbrueche reduzieren",
    "e-commerce umsatz steigern",
  ],
  background: "aurora",
  updated: "2026-09-27",
  sections: [
    {
      heading: "1. Versteckte Versandkosten erst im letzten Schritt",
      body: [
        "Die meisten Käufer brechen den Kauf nicht wegen des Artikelpreises ab, sondern wegen böser Überraschungen beim Bezahlen. Wenn Versandkosten oder Lieferzeiten erst ganz am Ende des Checkouts sichtbar werden, empfindet der Kunde das als Täuschung und wechselt zur Konkurrenz.",
      ],
      bullets: [
        "Geben Sie Lieferfristen und Versandkosten transparent direkt auf der Produktdetailseite an.",
        "Führen Sie eine klare Schwelle für versandkostenfreie Lieferung ein (z. B. 'Kostenloser Versand ab 50 €') — das steigert sofort den durchschnittlichen Warenkorbwert.",
        "Nennen Sie die Versanddienstleister (DHL, DPD, GLS) bereits vor dem Warenkorb mit Logos.",
      ],
    },
    {
      heading: "2. Zwang zur Registrierung statt unkomplizierter Gastbestellung",
      body: [
        "Die Pflicht, vor dem Kauf ein Passwort festzulegen, E-Mails zu bestätigen und ein Benutzerkonto anzulegen, ist die größte Conversion-Bremse auf Smartphones. Der Kunde will ein Produkt kaufen, kein neues Konto verwalten.",
      ],
      bullets: [
        "Bieten Sie standardmäßig eine 'Gastbestellung' ohne Passwort an, bei der nur Name, Lieferadresse und E-Mail abgefragt werden.",
        "Geben Sie dem Käufer nach der Bestellung die Option, das Konto mit einem einzigen Klick zu aktivieren.",
        "Reduzieren Sie die Formularfelder auf das absolute gesetzliche Minimum für den Versand.",
      ],
    },
    {
      heading: "3. Ladezeiten und mobile Benutzerfreundlichkeit",
      body: [
        "Über 70 % aller Online-Einkäufe im DACH-Raum starten auf dem Smartphone. Lädt die Produktseite oder der Warenkorb länger als 2,5 Sekunden, verlässt ein Drittel der Besucher den Shop noch vor dem ersten Klick.",
      ],
      bullets: [
        "Alle Produktbilder müssen im modernen WebP- oder AVIF-Format hochgradig komprimiert sein.",
        "Entfernen Sie überflüssige Tracker, Drittanbieter-Skripte und schwere Popups, die den mobilen Browser blockieren.",
        "Buttons wie 'In den Warenkorb' und 'Jetzt kaufen' müssen groß und ergonomisch für den Daumen platziert sein.",
      ],
    },
    {
      heading: "4. Fehlende Vertrauenssignale und Rechtskonformität",
      body: [
        "Gerade im deutschsprachigen Raum prüfen Käufer die Seriosität eines Anbieters genau: Gibt es ein vollständiges Impressum? Wie läuft der Rückversand? Gibt es echte Bewertungen?",
      ],
      bullets: [
        "Vollständiges, leicht auffindbares Impressum, DSGVO-konforme Datenschutzerklärung und Widerrufsbelehrung.",
        "Echte, verifizierte Kundenbewertungen (z. B. Google, Trustpilot, Trusted Shops) direkt im Checkout sichtbar machen.",
        "Klare und verständliche Rückgabebedingungen mit Angabe, wer die Rücksendekosten trägt.",
      ],
    },
    {
      heading: "Checkliste zur sofortigen Shop-Überprüfung",
      bullets: [
        "Kann ein Neukunde den Bestellvorgang in unter 60 Sekunden abschließen?",
        "Wurde der gesamte Checkout-Prozess auf einem gängigen iPhone und Android-Gerät getestet?",
        "Werden die gängigen Zahlungsarten (PayPal, Kreditkarte, Klarna, Apple Pay) im ersten Schritt angezeigt?",
        "Haben Sie eine automatisierte E-Mail-Erinnerung für abgebrochene Warenkörbe eingerichtet?",
      ],
    },
  ],
  proofHeading: "Optimierte E-Commerce-Systeme in der Praxis",
  proof: [
    {
      label: "Projektbeispiele: Schnelle Webanwendungen & Shops",
      href: "/de/our-projects",
      note: "Maßgeschneiderte Webshops auf Next.js-Basis mit Ladezeiten unter 1 Sekunde und hoher Conversion Rate.",
    },
  ],
  faqHeading: "Häufige Fragen zu Verkäufen im Onlineshop",
  faq: [
    {
      q: "Wie hoch ist die normale Warenkorb-Abbruchquote im E-Commerce?",
      a: "Die durchschnittliche Abbruchquote liegt branchenübergreifend bei etwa 68 % bis 75 %. Bei Shops mit Registrierungszwang oder unklaren Versandkosten steigt dieser Wert häufig auf über 85 %. Durch gezielte Optimierung lässt sich die Quote oft auf unter 55 % senken.",
    },
    {
      q: "Lohnt sich die Einführung von Express-Zahlungsarten wie PayPal oder Apple Pay?",
      a: "Unbedingt. Express-Checkout-Optionen überspringen das manuelle Ausfüllen von Adressfeldern, da die Daten direkt aus dem Zahlungskonto übernommen werden. Das verkürzt den Bestellprozess auf dem Smartphone auf wenige Sekunden und steigert die Conversion spürbar.",
    },
    {
      q: "Was unterscheidet Standard-Shopify von einem individuellen Next.js-Shop?",
      a: "Shopify ermöglicht einen schnellen Einstieg, wird jedoch durch viele installierte Apps oft träge und verursacht monatlich hohe Zusatzkosten und Transaktionsgebühren. Ein moderner Next.js-Shop bietet maximale Ladegeschwindigkeit, volle Designfreiheit und Unabhängigkeit von Plattformgebühren.",
    },
    {
      q: "Wie funktioniert die DSGVO-konforme Rückgewinnung von Warenkorbabbrechern?",
      a: "Wenn ein angemeldeter Kunde oder ein Nutzer mit Einwilligung den Checkout abbricht, kann nach 1 bis 2 Stunden eine automatische Erinnerungs-E-Mail versendet werden. Dies holt erfahrungsgemäß 10 bis 18 % der potenziellen Käufer zurück.",
    },
  ],
  cta: { label: "Kostenlose Shop-Analyse anfordern", href: "/de/contact-us" },
  secondaryCta: { label: "Unsere Leistungen: Webentwicklung", href: "/de/our-services" },
  related: ["/de/our-services", "/de/our-projects"],
};

export const appointmentNoShowGuideDe: Guide = {
  path: "/de/terminausfaelle-no-shows-verhindern",
  eyebrow: "Termin-Optimierung",
  title: "Terminausfälle (No-Shows) verhindern — Automatisierung für Praxen & Salons",
  metaDescription:
    "Wie Praxen, Kanzleien und Salons Terminausfälle um bis zu 70 % reduzieren: automatisierte SMS- und WhatsApp-Erinnerungen, digitale Wartelisten und klare Stornoregeln.",
  h1: "Terminausfälle (No-Shows) wirksam verhindern",
  lead:
    "Terminausfälle in Praxen, Salons und Kanzleien lassen sich durch ein automatisiertes Drei-Punkte-System um 50 bis 70 % senken: Eine automatisierte SMS- oder WhatsApp-Erinnerung 24 Stunden und 2 Stunden vor dem Termin mit 1-Klick-Bestätigung, eine digitale Warteliste für freigewordene Slots sowie verbindliche Stornoregelungen bei längeren Behandlungen.",
  keywords: [
    "terminausfaelle verhindern",
    "no show quote senken",
    "automatisierte terminerinnerung sms",
    "whatsapp terminerinnerung praxis",
    "online terminbuchung salon",
    "ausfallhonorar terminabsage",
  ],
  background: "silk",
  updated: "2026-09-27",
  sections: [
    {
      heading: "1. Zwei-Wege-Erinnerung per WhatsApp oder SMS mit 1-Klick-Bestätigung",
      body: [
        "In über 80 % der Fälle verpassen Kunden ihren Termin nicht aus böser Absicht, sondern schlicht aus Vergesslichkeit oder unvorhergesehenen Alltagskonflikten. Klassische E-Mails werden oft zu spät gelesen — Messenger-Nachrichten erreichen Öffnungsraten von über 95 % innerhalb von Minuten.",
      ],
      bullets: [
        "Versenden Sie 24 Stunden vorher eine Nachricht mit zwei Schaltflächen: 'Termin bestätigen' und 'Termin verschieben'.",
        "Senden Sie 2 Stunden vorher eine kurze Erinnerung mit genauer Adresse, Parkhinweisen und Anfahrtsskizze.",
        "Klickt der Kunde auf 'Bestätigen', wird der Termin im internen Praxiskalender sofort grün markiert.",
      ],
    },
    {
      heading: "2. Digitale Warteliste für spontan freigewordene Slots",
      body: [
        "Selbst wenn ein Kunde rechtzeitig absagt, fehlt im laufenden Geschäftsbetrieb oft die Zeit, Karteikarten oder Telefonlisten durchzutelefonieren. Die Folge ist ein ungenutzter Zeitslot und verlorener Umsatz.",
      ],
      bullets: [
        "Ermöglichen Sie Kunden, sich online für Wunschtage oder Therapeuten auf eine Warteliste einzutragen.",
        "Wird ein Termin storniert, benachrichtigt das System automatisch die ersten Personen auf der Warteliste per SMS/WhatsApp.",
        "Der freie Slot wird erfahrungsgemäß innerhalb von 15 Minuten ohne menschliches Eingreifen neu belegt.",
      ],
    },
    {
      heading: "3. Transparente Stornoregeln und Anzahlungen bei langen Terminen",
      body: [
        "Bei 20-minütigen Routinebehandlungen reicht eine freundliche Erinnerung. Bei Behandlungen von über einer Stunde (z. B. Zahnersatz, kosmetische Eingriffe, aufwendige Farbtechniken) verursacht ein Ausfall jedoch empfindliche Leerlaufkosten.",
      ],
      bullets: [
        "Klären Sie Patienten und Kunden bei der Buchung transparent über die 24-Stunden-Absagefrist auf.",
        "Nutzen Sie bei kostenintensiven Behandlungen eine Anzahlung (20–30 %) über sichere Online-Zahlungsarten.",
        "Hat der Kunde bereits einen Betrag hinterlegt, sinkt die No-Show-Rate messbar auf nahezu null.",
      ],
    },
    {
      heading: "4. Zentraler digitaler Kalender statt Zettelwirtschaft",
      body: [
        "Werden Termine parallel am Empfang, per WhatsApp, telefonisch und über Portale gepflegt, sind Doppelbuchungen und Missverständnisse vorprogrammiert. Notwendig ist eine einzige verlässliche Datenquelle.",
      ],
      bullets: [
        "Echtzeit-Synchronisation mit Mitarbeiter-Dienstplänen, Pausen und Raumkapazitäten.",
        "Kunden sehen auf der Website nur tatsächlich verfügbare Termine ohne manuelle Rücksprache.",
        "Automatische Historie: Sie erkennen sofort Stammkunden sowie Personen mit wiederholten kurzfristigen Absagen.",
      ],
    },
  ],
  proofHeading: "Terminsysteme in der Praxis",
  proof: [
    {
      label: "Softwarelösungen: Automatisierte Online-Buchung",
      href: "/de/our-services",
      note: "Maßgeschneiderte Kalenderlösungen mit automatischer SMS/WhatsApp-Synchronisation.",
    },
  ],
  faqHeading: "Häufige Fragen zur Vermeidung von No-Shows",
  faq: [
    {
      q: "Ist der Versand von Terminerinnerungen per WhatsApp DSGVO-konform?",
      a: "Ja, sofern die WhatsApp Business API über zertifizierte europäische Schnittstellen genutzt wird und der Kunde bei der Terminvergabe seine ausdrückliche Einwilligung zum Erhalt von Erinnerungen erteilt hat.",
    },
    {
      q: "Werden Neukunden durch eine Anzahlungspflicht abgeschreckt?",
      a: "Nein, solange die Regelung fair kommuniziert wird (Anzahlung wird vollständig mit der Leistung verrechnet und bei rechtzeitiger Absage erstattet). Es filtert primär unzuverlässige Buchungen heraus und schützt Ihren Umsatz.",
    },
    {
      q: "Welcher Vorlauf ist für die Terminerinnerung ideal?",
      a: "Der bewährte Standard ist eine Vorankündigung mit Bestätigungslink 24 bis 48 Stunden vor dem Termin, gefolgt von einer rein informativen Erinnerung 2 Stunden vorher.",
    },
    {
      q: "Lässt sich das System an bestehende Praxissoftware anbinden?",
      a: "Ja, moderne Buchungssysteme können über Webhooks und APIs an bestehende Kalender (Google Workspace, Microsoft Outlook) oder Praxisverwaltungssysteme angebunden werden.",
    },
  ],
  cta: { label: "Beratungsgespräch anfragen", href: "/de/contact-us" },
  secondaryCta: { label: "Unsere Referenzen ansehen", href: "/de/our-projects" },
  related: ["/de/our-services", "/de/our-projects"],
};

export const modernWebsiteMustHavesGuideDe: Guide = {
  path: "/de/was-gehoert-auf-eine-moderne-unternehmenswebsite",
  eyebrow: "Website-Architektur",
  title: "Was gehört auf eine moderne Unternehmenswebsite? — Checkliste 2026",
  metaDescription:
    "Was eine Firmenwebsite 2026 enthalten muss, um qualifizierte Kundenanfragen zu generieren: klares Nutzenversprechen in 3 Sekunden, Social Proof, DSGVO & Ladezeiten.",
  h1: "Was gehört auf eine moderne Unternehmenswebsite?",
  lead:
    "Eine moderne Unternehmenswebsite im Jahr 2026 ist keine digitale Broschüre, sondern ein Verkaufskanal, der in den ersten 3 Sekunden drei Fragen beantwortet: Was genau bieten Sie an, für wen und was ist der nächste Schritt? Ohne dominanten mobilen Call-to-Action, transparente Prozessschritte und glaubwürdige Belege verlässt der Besucher die Seite ohne Anfrage.",
  keywords: [
    "was gehoert auf eine unternehmenswebsite",
    "moderne firmenwebsite aufbau",
    "b2b website struktur checkliste",
    "kundenanfragen ueber website generieren",
    "webdesign trends kmu 2026",
    "website conversion optimieren",
  ],
  background: "aurora",
  updated: "2026-09-27",
  sections: [
    {
      heading: "1. Die Hero-Sektion: Konkreter Nutzen statt leerer Phrasen",
      body: [
        "Viele Unternehmensseiten begrüßen Besucher mit Floskeln wie 'Herzlich willkommen' oder 'Ihr Partner für innovative Lösungen'. Der Interessent benötigt jedoch innerhalb von drei Sekunden die Gewissheit, dass er hier sein spezifisches Problem lösen kann.",
      ],
      bullets: [
        "Klares Werteversprechen (Value Proposition): z. B. 'Individuelle Hallenbauten schlüsselfertig in 90 Tagen für den Mittelstand'.",
        "Prägnanter Untertitel, der Zielgruppe und Vorgehensweise ohne Fachchinesisch umreißt.",
        "Ein primärer, unübersehbarer Handlungsaufruf (CTA), der auch auf dem Smartphone sofort im sichtbaren Bereich liegt.",
      ],
    },
    {
      heading: "2. Belastbarer Social Proof und messbare Ergebnisse",
      body: [
        "Interessenten glauben keinen unbelegten Werbeversprechen mehr. Echte Fotos, nachvollziehbare Zahlen und authentische Kundenstimmen sind der entscheidende Hebel für Vertrauen.",
      ],
      bullets: [
        "Echte Aufnahmen von Projekten, Werkstätten und Mitarbeitern statt austauschbarer Stockfotos.",
        "Kundenstimmen mit vollem Namen, Foto und Unternehmensbezeichnung des Ansprechpartners.",
        "Konkrete Kennzahlen: realisierte Kundenprojekte, durchschnittliche Umsetzungsdauer oder erreichte Kundeneinsparungen.",
      ],
    },
    {
      heading: "3. Transparenter Ablauf in 3 bis 4 Schritten",
      body: [
        "Die größte Hürde vor dem Absenden einer Anfrage ist Ungewissheit: Was passiert danach? Werde ich mit Telefonaten bedrängt? Wann erhalte ich ein Angebot? Transparenz baut diese Hemmschwelle ab.",
      ],
      bullets: [
        "Schritt 1 — Erstkontakt: Sie senden uns Ihre Anforderungen oder rufen kurz an.",
        "Schritt 2 — Analyse & Festpreisangebot: Binnen 24–48 Stunden erhalten Sie ein detailliertes Angebot mit Zeitplan.",
        "Schritt 3 — Umsetzung & Übergabe: Zuverlässige Umsetzung nach Meilensteinen bis zur schlüsselfertigen Abnahme.",
      ],
    },
    {
      heading: "4. Reibungsfreie Kontaktwege auf dem Smartphone",
      body: [
        "Überlange Kontaktformulare mit 8 oder mehr Pflichtfeldern senken die Abschlussquote drastisch. Mobile Nutzer wollen schnell und unkompliziert Kontakt aufnehmen.",
      ],
      bullets: [
        "Feste Schaltflächen für direkten Telefonanruf und WhatsApp-Chat am unteren Bildschirmrand auf Mobilgeräten.",
        "Einfache Formulare mit maximal 2 bis 3 Feldern (Name, Telefon/E-Mail, kurzes Anliegen).",
        "Angabe der durchschnittlichen Reaktionszeit (z. B. 'Antwort garantiert innerhalb von 24 Stunden').",
      ],
    },
    {
      heading: "5. Technische Exzellenz: Geschwindigkeit, DSGVO und KI-Sichtbarkeit",
      body: [
        "Ein ansprechendes Design nützt wenig, wenn die Seite langsam lädt oder von KI-Suchsystemen wie ChatGPT Search, Perplexity und Google AI Overviews nicht verstanden wird.",
      ],
      bullets: [
        "Ladezeit unter 1,5 Sekunden auf mobilen Endgeräten (Core Web Vitals im grünen Bereich).",
        "Schema.org strukturierte Daten (Organization, Service, FAQPage) für optimale Erfassung durch KI-Modelle.",
        "Rechtssicherheit nach DSGVO: sauberes Cookie-Consent, EU-Hosting und SSL-Verschlüsselung.",
      ],
    },
  ],
  proofHeading: "Erfolgreiche Webprojekte in der Übersicht",
  proof: [
    {
      label: "Entdecken Sie unsere realisierten Projekte",
      href: "/de/our-projects",
      note: "Moderne Unternehmenswebsites und Webanwendungen auf modernstem Technologiestack.",
    },
  ],
  faqHeading: "Häufige Fragen zur Unternehmenswebsite",
  faq: [
    {
      q: "Wie viele Unterseiten sollte eine mittelständische Website umfassen?",
      a: "Für die meisten Dienstleister und KMU ist eine Struktur aus 5 bis 8 durchdachten Seiten ideal: Startseite mit starkem Nutzenversprechen, Einzelseiten für Kernleistungen, Über uns / Team, Referenzen und Kontakt. Fünf exzellente Seiten konvertieren besser als zwanzig dünne Textseiten.",
    },
    {
      q: "Warum ist die Optimierung für KI-Suchmaschinen (GEO / AEO) heute unerlässlich?",
      a: "Immer mehr Entscheidungsträger nutzen KI-Assistenten wie ChatGPT oder Google AI Overviews, um Anbieter zu vergleichen. Wer strukturierte, präzise Antworten auf Kundenfragen liefert, wird von der KI als Referenz genannt und empfohlen.",
    },
    {
      q: "Sollten Preise auf der Website veröffentlicht werden?",
      a: "Die Angabe von realistischen Richtwerten ('Projekte ab 2.500 €' oder 'Typische Spanne: 3.000–6.000 €') ist äußerst wirksam. Sie filtert unpassende Anfragen vorab und signalisiert qualifizierten Kunden Fairness und Verlässlichkeit.",
    },
    {
      q: "Wie lange dauert die professionelle Erstellung einer Firmenwebsite?",
      a: "Die fundierte Konzeption, Gestaltung und technische Programmierung einer maßgeschneiderten Website beansprucht in der Regel 3 bis 6 Wochen. Schnellere Angebote greifen meist auf unzureichende Standard-Templates zurück.",
    },
  ],
  cta: { label: "Kostenlose Website-Analyse vereinbaren", href: "/de/contact-us" },
  secondaryCta: { label: "Unser Leistungsspektrum", href: "/de/our-services" },
  related: ["/de/our-services", "/de/our-projects"],
};
