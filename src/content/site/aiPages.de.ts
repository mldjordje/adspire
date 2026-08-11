import type { AiIndexCopy, AiPage } from "@/content/site/aiPages";

/**
 * German AI industry pages.
 *
 * Same slugs and same structure as the Serbian set. Two deliberate departures
 * from the original voice:
 *
 * - "Sie" throughout. The Serbian copy is on first-name terms with an owner who
 *   answers their own phone; German B2B is not, and the informal register reads
 *   as amateurish to exactly the buyer this market is for.
 * - Serbian references (Niš, local platforms) are dropped where they carry no
 *   meaning for a DACH reader.
 *
 * The claim limit carries over: no percentages, no multipliers, no saved hours.
 */

const HOW_TO_NAME = "So wird KI im Unternehmen eingeführt";

const salonsClinics: AiPage = {
  slug: "saloni-i-klinike",
  industry: "Salons und Praxen",
  eyebrow: "KI nach Branche",
  title: "KI für Salons und Praxen — Termine, Erinnerungen, Antworten",
  metaDescription:
    "Was KI in Friseursalons, ästhetischen und zahnmedizinischen Praxen konkret leistet: Terminbuchung ohne Telefon, Erinnerungen gegen Terminausfälle, Antworten außerhalb der Öffnungszeiten.",
  h1: "KI für Salons und Praxen",
  lead:
    "Ein Salon hat kein Marketingproblem, sondern ein Telefonproblem. Es klingelt während der Behandlung, Nachrichten kommen um 23 Uhr, und ein Terminausfall kostet einen ganzen Slot. Das sind Aufgaben, die Software vollständig übernimmt.",
  answer:
    "In einem Salon oder einer Praxis lohnt sich KI an drei Stellen: Sie nimmt Termine über Website und Messenger entgegen, ohne dass ein Anruf nötig ist, verschickt selbstständig die Erinnerung vor dem Termin und bittet um Bestätigung, und beantwortet Standardfragen zu Preisen, Dauer und Vorbereitung, wenn niemand aufs Telefon schaut. Alle drei arbeiten auf Ihrem Kalender und Ihrer Preisliste statt auf allgemeinen Textbausteinen — ein bestätigter Termin existiert also wirklich, und eine gegebene Antwort ist Ihre.",
  keywords: [
    "KI für Salons",
    "KI für Praxen",
    "Online-Terminbuchung Friseur",
    "Chatbot für Salon",
    "Terminerinnerung Software",
    "KI Rezeption",
  ],
  serviceName: "KI und Automatisierung für Salons und Praxen",
  tasks: [
    {
      name: "Termine ohne Anruf",
      problem: "Ein Kunde ruft mitten in der Behandlung an. Sie gehen nicht ran, er bucht bei dem, der rangeht.",
      solution:
        "Buchung über Website, Instagram und WhatsApp auf dem echten Kalender — sichtbar sind nur Slots, die für diese Leistung und diese Mitarbeiterin tatsächlich frei sind.",
      delivery: "Buchungsseite, Admin-Kalender und Dauerregeln je Leistung.",
    },
    {
      name: "Erinnerung und Bestätigung",
      problem: "Ein Terminausfall ohne Absage. Der Slot bleibt leer, obwohl es eine Warteliste gibt.",
      solution:
        "Automatische Nachricht 24 und 2 Stunden vorher, mit Schaltfläche zum Bestätigen oder Absagen. Ein abgesagter Termin geht sofort an den Nächsten auf der Liste.",
      delivery: "Nachrichtenvorlagen, Versandplan und Warteliste im Admin.",
    },
    {
      name: "Antworten außerhalb der Öffnungszeiten",
      problem:
        "Jeden Tag dieselben Fragen: wie lange dauert das, was kostet es, ist das nach dem Färben unbedenklich, ist Samstag noch etwas frei.",
      solution:
        "Ein Assistent, trainiert auf Ihrer Preisliste und Ihren Pflegehinweisen, antwortet sofort und leitet weiter, was er nicht weiß, statt es zu erfinden.",
      delivery: "Chat auf der Website und im Messenger, mit Fragenkatalog, den Sie selbst pflegen.",
    },
    {
      name: "Kundenakte",
      problem:
        "Was wurde letztes Mal gemacht, welche Farbe, welche Nadel, welche Allergie — im Heft oder im Kopf.",
      solution:
        "Behandlungshistorie am Kunden, mit Vorher-Nachher-Fotos und einer Notiz, die beim Öffnen des Termins erscheint.",
      delivery: "Kundenverwaltung mit Historie, Notizen und Suche.",
    },
    {
      name: "Rückkehr zum richtigen Zeitpunkt",
      problem: "Ein Kunde, der alle sechs Wochen kam, bleibt einfach weg, und niemand merkt es.",
      solution:
        "Das System verfolgt den Rhythmus jedes Kunden und meldet, wer überfällig ist — eine Nachricht, keine Kampagne.",
      delivery: "Rückgewinnungsliste mit Terminvorschlag.",
    },
    {
      name: "Inhalte für Social Media",
      problem: "Der Beitrag muss raus, und nach zehn Stunden Arbeit schreibt niemand mehr Texte.",
      solution:
        "Aus einem Behandlungsfoto entstehen Text, Hashtags und ein Vorschlag für den Zeitpunkt — Sie geben nur frei.",
      delivery: "Textwerkzeug in Ihrem Tonfall und für Ihre Leistungen.",
    },
  ],
  sections: [
    {
      heading: "Wo KI im Salon nicht hilft",
      body: [
        "Das wird am häufigsten erwartet, deshalb gleich vorweg. KI bringt von sich aus keine neuen Kunden — das leisten Empfehlung, Lage, Social Media und Preis. KI hält die Kunden, die Sie bereits haben, und gibt Ihnen die Stunden zurück, die heute am Telefon verloren gehen.",
      ],
      bullets: [
        "Sie ersetzt keinen Empfang in einem Salon mit viel Laufkundschaft.",
        "Sie beurteilt nicht, ob eine Behandlung medizinisch angezeigt ist — das bleibt bei Ihnen.",
        "Sie repariert keine falsch kalkulierten Preise und keinen Terminplan, der nicht aufgeht.",
      ],
    },
    {
      heading: "Was zuerst kommt",
      body: [
        "Wird alles auf einmal eingeführt, setzt sich nichts durch. Die Reihenfolge, die funktioniert: erst Buchung, dann Erinnerungen, dann Antworten. Die Buchung liefert den Kalender, der Kalender ermöglicht Erinnerungen, und erst wenn Daten vorliegen, lohnt es sich, einen Assistenten zu trainieren.",
      ],
    },
  ],
  howTo: {
    name: HOW_TO_NAME,
    steps: [
      {
        name: "Eine Stunde Gespräch",
        text: "Wir gehen einen Ihrer Arbeitstage durch und filtern heraus, was sich wiederholt. Kostenlos und unverbindlich.",
      },
      {
        name: "Eine Aufgabe, nicht alle",
        text: "Wir wählen die Aufgabe mit den meisten Wiederholungen — im Salon ist das fast immer die Terminbuchung.",
      },
      {
        name: "Einführung in zwei bis vier Wochen",
        text: "Der Start erfolgt auf Ihrem Kalender und Ihren Preisen, mit bestehender oder neuer Website.",
      },
      {
        name: "Zwei Wochen Parallelbetrieb",
        text: "Der alte Weg bleibt, bis nachweislich jeder Fall abgedeckt ist, Absagen und Verschiebungen eingeschlossen.",
      },
      {
        name: "Die nächste Aufgabe",
        text: "Erst wenn die erste selbstständig läuft, kommt die zweite dazu. Erinnerungen, dann Antworten, dann Akte.",
      },
    ],
  },
  proofHeading: "Systeme dieser Art, die bereits laufen",
  proof: [
    {
      label: "Doctor Barber",
      href: "/our-projects/doctor-barber-online-booking-sistem",
      note: "Online-Buchung mit Admin-Panel, Terminverschiebung und Erinnerungen.",
    },
    {
      label: "Dr Igić",
      href: "/our-projects/dr-igic-web-aplikacija-za-estetske-klinike",
      note: "Webanwendung für ästhetische Praxen — Terminbuchung und Patientenakte.",
    },
  ],
  faq: [
    {
      q: "Müssen Kunden eine App installieren?",
      a: "Nein. Die Buchung läuft im Browser, über einen Link auf der Website, aus der Instagram-Bio oder aus einer Nachricht. Es wird nichts installiert.",
    },
    {
      q: "Was, wenn ein Kunde trotzdem anrufen will?",
      a: "Das Telefon bleibt. Es geht nicht darum, Anrufe abzuschaffen, sondern darum, den Großteil der Buchungen davon wegzubekommen — damit wer anruft, echte Aufmerksamkeit bekommt.",
    },
    {
      q: "Kommen Erinnerungen per SMS oder per Messenger?",
      a: "Das hängt davon ab, wo Ihre Kunden sind. E-Mail und WhatsApp sind am günstigsten, SMS ist bei älteren Kunden am zuverlässigsten. Die Kombination wird nach Kosten je Nachricht gewählt.",
    },
    {
      q: "Wie werden Patientendaten gespeichert?",
      a: "Die Daten bleiben in Ihrer Datenbank, mit Zugriff je Konto und Protokoll darüber, wer was eingesehen hat. Für eine Praxis ist das keine Option, sondern Voraussetzung — die Verarbeitung von Gesundheitsdaten verlangt eine Rechtsgrundlage und beschränkten Zugriff.",
    },
    {
      q: "Was, wenn es mir nach einem Monat nicht passt?",
      a: "Code und Daten gehören ab Übergabe Ihnen. Es gibt keine Bindung an eine Plattform, die Sie nicht mit Ihrem eigenen Kundenstamm verlassen können.",
    },
  ],
  relatedServices: [
    { label: "Buchungssysteme", href: "/our-services/sistemi-za-zakazivanje" },
    { label: "KI-Integration und Automatisierung", href: "/our-services/ai-integracije-automatizacija" },
  ],
};

const transportLogistics: AiPage = {
  slug: "transport-i-logistika",
  industry: "Transport und Logistik",
  eyebrow: "KI nach Branche",
  title: "KI für Transport und Logistik — Angebote, Aufträge, Belege",
  metaDescription:
    "Was KI in Speditionen leistet: Streckenangebot in Sekunden, Fahreraufträge ohne Telefon, Lieferscheine und Rechnungen aus dem Foto, Kosten je Fahrzeug.",
  h1: "KI für Transport und Logistik",
  lead:
    "Im Transport geht das Geld zwischen Anruf und Auftrag verloren. Der Preis wird im Kopf gerechnet, der Auftrag am Telefon diktiert, der Lieferschein abends abgetippt. Alle drei Schritte können sich selbst erledigen.",
  answer:
    "In einer Spedition lohnt sich KI zuerst an zwei Stellen: bei der Preisbildung für eine Strecke und bei der Belegverarbeitung. Das Angebot entsteht in Sekunden aus Ihrer Tarifliste, der Entfernung und der Ladungsart, statt auf den Disponenten zu warten, und Lieferscheine, Frachtbriefe und Eingangsrechnungen werden aus dem Foto gelesen und selbst erfasst — abends wird nichts mehr abgetippt. Die dritte Stelle ist der Fahrerauftrag: statt eines Anrufs bekommt der Fahrer die Aufgabe aufs Handy und liefert Unterschrift und Foto von der Stelle zurück.",
  keywords: [
    "KI für Spedition",
    "Software für Transportunternehmen",
    "automatisches Frachtangebot",
    "Fahrerauftrag App",
    "Lieferschein Texterkennung",
    "Digitalisierung Logistik",
  ],
  serviceName: "KI und Automatisierung für Transport und Logistik",
  tasks: [
    {
      name: "Streckenangebot in Sekunden",
      problem: "Eine Anfrage kommt herein, und der Preis wartet, bis jemand frei ist, der Entfernung und Tarif kennt.",
      solution:
        "Aus Strecke, Ladungsart und Ihrem Tarif ergibt sich der Preis sofort, mit der Marge, die Sie gesetzt haben. Ungewöhnliche Fälle gehen zur Freigabe an Sie, statt geschätzt zu werden.",
      delivery: "Angebotsrechner auf Ihrer Preisliste und PDF-Angebot per E-Mail.",
    },
    {
      name: "Fahrerauftrag ohne Telefon",
      problem: "Der Disponent ruft an, der Fahrer notiert auf Papier, das Papier geht verloren oder wird falsch gelesen.",
      solution:
        "Der Fahrer bekommt den Auftrag aufs Handy, mit Adresse, Kontakt und Ladung, und liefert Bestätigung, Unterschrift und Foto zurück.",
      delivery: "Fahreransicht im Browser, ohne Installation, auch offline nutzbar.",
    },
    {
      name: "Belege aus dem Foto",
      problem: "Lieferscheine, Frachtbriefe und Eingangsrechnungen werden abends von Hand abgetippt, mit Fehlern.",
      solution:
        "Das Foto des Belegs wird gelesen und füllt die Felder — Nummer, Datum, Betrag, Kunde. Sie bestätigen nur, was das System als unsicher markiert.",
      delivery: "Belegeingang mit Prüfschritt vor der Verbuchung.",
    },
    {
      name: "Kosten je Fahrzeug und je Fahrt",
      problem: "Der Monatsumsatz ist bekannt. Welches Fahrzeug und welche Strecke den Verlust tragen, nicht.",
      solution:
        "Kraftstoff, Maut, Wartung und Fahrerstunden hängen an einer konkreten Fahrt, sodass die Marge je Strecke sichtbar wird, nicht nur je Monat.",
      delivery: "Auswertung je Fahrzeug, Fahrer und Strecke, mit Tabellenexport.",
    },
    {
      name: "Fristen, die Geld kosten",
      problem: "Zulassung, Tachograf, ADR, Untersuchungen, Wartungsintervalle — eine versäumte Frist bedeutet Bußgeld oder Stillstand.",
      solution: "Alle Fristen an einer Stelle, mit Vorwarnung und benannter Zuständigkeit.",
      delivery: "Fristenverwaltung mit E-Mail-Erinnerungen.",
    },
    {
      name: "Antwort auf Website-Anfragen",
      problem: "Die Anfrage kommt nachts, die Antwort geht morgens raus, der Auftrag geht an den, der zuerst geantwortet hat.",
      solution:
        "Die Anfrage wird sofort qualifiziert — Strecke, Ladung, Termin, Kontakt — und erhält eine Richtantwort oder eine gezielte Rückfrage.",
      delivery: "Anfrageformular mit automatischer Antwort und Erfassung.",
    },
  ],
  sections: [
    {
      heading: "Warum zuerst die Belege",
      body: [
        "Beim Transportunternehmen ist der größte unsichtbare Kostenblock anderthalb Stunden Abtippen pro Tag. Das ist keine Arbeit, die Urteilsvermögen verlangt, sondern Genauigkeit — und um 21 Uhr irrt eine Maschine seltener als ein Mensch. Deshalb beginnt man im Transport fast immer bei den Belegen und nicht beim Chatbot.",
      ],
    },
    {
      heading: "Was beim Menschen bleibt",
      bullets: [
        "Preisverhandlung mit Stammkunden — dort verkauft die Beziehung, nicht der Tarif.",
        "Die Entscheidung, was gefahren wird, wenn sich zwei Aufträge überschneiden.",
        "Die Bestätigung jedes Belegs, den das System als unsicher markiert.",
        "Alles mit rechtlicher Folge — CMR, Reklamation, Schaden.",
      ],
    },
  ],
  howTo: {
    name: HOW_TO_NAME,
    steps: [
      {
        name: "Eine Stunde Gespräch",
        text: "Wir verfolgen einen Auftrag von der Anfrage bis zur Zahlung und sehen, wo er hängen bleibt.",
      },
      {
        name: "Eine Aufgabe, nicht alle",
        text: "Im Transport ist das meist das Angebot oder die Belegverarbeitung — das, was täglich anfällt.",
      },
      {
        name: "Einführung in zwei bis vier Wochen",
        text: "Umgesetzt auf Ihren Tarifen und Ihren Belegformaten, nicht auf einer Standardvorlage.",
      },
      {
        name: "Zwei Wochen Parallelbetrieb",
        text: "System und alter Weg laufen nebeneinander, bis die Genauigkeit an echten Belegen verglichen ist.",
      },
      {
        name: "Die nächste Aufgabe",
        text: "Wenn die Belege selbst laufen, folgen Fahreraufträge und Auswertung je Fahrzeug.",
      },
    ],
  },
  proofHeading: "Systeme dieser Art, die bereits laufen",
  proof: [
    {
      label: "Prevoz Kop",
      href: "/our-projects/prevozkop-digitalni-prodajni-operativni-sistem",
      note: "Vertriebs- und Betriebssystem für eine Spedition — Anfragen, Angebote und Erfassung an einer Stelle.",
    },
  ],
  faq: [
    {
      q: "Ersetzt das unsere Buchhaltungssoftware?",
      a: "Nein. Die Buchhaltung bleibt, wo sie ist — sie bekommt saubere, bereits gelesene Daten statt eines Papierstapels zum Monatsende.",
    },
    {
      q: "Wie genau ist das Lesen von Lieferscheinen?",
      a: "Das hängt von der Bildqualität und davon ab, wie einheitlich die Formulare sind. Deshalb geht jeder Beleg unterhalb der Sicherheitsschwelle an einen Menschen — das System verbucht nicht, worüber es unsicher ist.",
    },
    {
      q: "Unsere Fahrer sind nicht technikaffin. Wird das genutzt?",
      a: "Die Fahreransicht ist ein Bildschirm mit drei Schaltflächen und öffnet sich aus einem Link, ohne Konto und ohne Installation. Verlangt sie mehr, ist sie schlecht gebaut.",
    },
    {
      q: "Wir haben bereits GPS-Ortung. Lässt sich das verbinden?",
      a: "Ja, wenn Ihr Anbieter Zugriff auf die Daten gewährt. Kilometer und Zeiten werden dann übernommen statt erfasst.",
    },
  ],
  relatedServices: [
    { label: "Interne Geschäftsanwendungen", href: "/our-services/interne-poslovne-aplikacije" },
    { label: "KI-Integration und Automatisierung", href: "/our-services/ai-integracije-automatizacija" },
  ],
};

const hospitality: AiPage = {
  slug: "ugostiteljstvo-i-catering",
  industry: "Gastronomie und Catering",
  eyebrow: "KI nach Branche",
  title: "KI für Restaurants und Catering — Reservierungen, Angebote, Karte",
  metaDescription:
    "Was KI in Restaurants und Catering-Betrieben leistet: Tischreservierung ohne Telefon, Veranstaltungsangebot aus der Anfrage, mehrsprachige Karte, Antworten zu Allergenen.",
  h1: "KI für Gastronomie und Catering",
  lead:
    "Ein Restaurant verliert Reservierungen, die niemand notiert. Ein Caterer verliert Veranstaltungen, weil das Angebot drei Tage braucht. Beides ist dasselbe Muster: die Anfrage kommt, die Antwort kommt zu spät.",
  answer:
    "In der Gastronomie verändert KI vor allem die Antwortgeschwindigkeit. Reservierungen kommen über Website und Messenger auf dem echten Tischplan herein, und im Catering entsteht aus der Anfrage — Personenzahl, Datum, Anlass, Menü — in Minuten statt Tagen ein Angebot mit Preis pro Person. Dazu kommt die Beantwortung der Fragen, die sich ständig wiederholen: Allergene, Zusammensetzung der Gerichte, Parken, wie lange ein Termin gehalten wird.",
  keywords: [
    "KI für Restaurant",
    "Online-Tischreservierung",
    "Catering Angebot automatisch",
    "mehrsprachige digitale Speisekarte",
    "Chatbot Restaurant",
    "Catering Software",
  ],
  serviceName: "KI und Automatisierung für Gastronomie und Catering",
  tasks: [
    {
      name: "Tisch ohne Anruf reserviert",
      problem: "Ein Gast ruft im Service an, niemand geht ran, die Reservierung geht zwei Häuser weiter.",
      solution: "Reservierung über Website, Google-Profil und Messenger, auf dem echten Tischplan und mit realen Verweildauern.",
      delivery: "Reservierungsseite, Saalansicht und Bestätigung an den Gast.",
    },
    {
      name: "Veranstaltungsangebot aus der Anfrage",
      problem: "Eine Anfrage für Hochzeit oder Firmenessen braucht eine Stunde Kalkulation und wird deshalb morgen beantwortet.",
      solution:
        "Aus Personenzahl, Datum und gewähltem Menü entsteht ein Angebot mit Preis pro Person und Einzelpositionen, bereit für Ihre Korrektur vor dem Versand.",
      delivery: "Veranstaltungsformular und PDF-Angebotsgenerator.",
    },
    {
      name: "Allergene und Zusammensetzung",
      problem: "Fragen zu Gluten, Nüssen oder veganen Gerichten kommen täglich und verlangen eine exakte Antwort.",
      solution:
        "Der Assistent antwortet ausschließlich aus Ihrer Deklaration — was nicht erfasst ist, erfindet er nicht, sondern leitet es an die Küche weiter.",
      delivery: "Gerichtedatenbank mit Zutaten und Allergenen, gemeinsam für Website und Chat.",
    },
    {
      name: "Karte in mehreren Sprachen",
      problem: "Ein Gast bekommt eine Karte, die er nicht versteht, oder eine unfreiwillig komische Übersetzung.",
      solution:
        "Eine Quelle veröffentlicht die Karte auf Deutsch, Englisch und Serbisch, mit Beschreibungen, die einmal geprüft werden und dann gelten.",
      delivery: "Digitale Karte mit QR-Code und Preispflege an einer Stelle.",
    },
    {
      name: "Einkauf nach tatsächlichem Verbrauch",
      problem: "Es wird zu viel bestellt und weggeworfen — oder es fehlt am Freitagabend.",
      solution: "Aus Verkäufen nach Wochentag und Saison entsteht ein Bestellvorschlag, den der Küchenchef freigibt oder ändert.",
      delivery: "Verbrauchsauswertung und Bestellvorschlag je Lieferant.",
    },
    {
      name: "Bewertungen und Antworten",
      problem: "Eine Google-Bewertung bleibt wochenlang unbeantwortet, und jeder künftige Gast sieht das.",
      solution:
        "Ein Antwortentwurf wird in Ihrem Tonfall vorbereitet und wartet auf einen Klick — eine negative Bewertung geht immer an Sie, nie automatisch raus.",
      delivery: "Bewertungsübersicht mit Antwortvorschlägen.",
    },
  ],
  sections: [
    {
      heading: "Restaurant und Caterer sind nicht dasselbe Geschäft",
      body: [
        "Es sieht ähnlich aus und ist es nicht. Ein Restaurant lebt von Wiederholung und Tempo im Service — gewonnen wird bei der Reservierung und bei der Antwort binnen einer Minute. Ein Caterer lebt von wenigen großen Aufträgen im Jahr, bei denen ein verlorenes Angebot so viel wiegt wie ein Monat Restaurantumsatz. Deshalb beginnt das Restaurant bei der Reservierung und der Caterer beim Angebot.",
      ],
    },
    {
      heading: "Was nicht automatisiert wird",
      bullets: [
        "Die Zusage für eine große Veranstaltung — das ist immer ein Gespräch, nie ein Formular.",
        "Die Antwort auf eine ernsthafte Beschwerde.",
        "Änderungen an Karte und Preisen ohne menschliche Prüfung.",
        "Alles zu Allergenen, was nicht in der Deklaration steht.",
      ],
    },
  ],
  howTo: {
    name: HOW_TO_NAME,
    steps: [
      {
        name: "Eine Stunde Gespräch",
        text: "Wir sehen, wie viele Anfragen täglich eingehen und über welchen Kanal — Telefon, Instagram, Google, Website.",
      },
      {
        name: "Eine Aufgabe, nicht alle",
        text: "Das Restaurant beginnt bei der Reservierung, der Caterer beim Veranstaltungsangebot.",
      },
      {
        name: "Einführung in zwei bis vier Wochen",
        text: "Umgesetzt auf Ihrem Tischplan und Ihrer Karte mit echten Preisen.",
      },
      {
        name: "Zwei Wochen Parallelbetrieb",
        text: "Telefonreservierungen bleiben, bis online nachweislich Stoßzeiten und Absagen abdeckt.",
      },
      {
        name: "Die nächste Aufgabe",
        text: "Dann Karte, Allergene und Bewertungen — in der Reihenfolge, die Sie am meisten stört.",
      },
    ],
  },
  proofHeading: "Systeme dieser Art, die bereits laufen",
  proof: [
    {
      label: "Santos & Santorini",
      href: "/our-projects/santos-santorini-web-shop-admin-platforma",
      note: "Webshop und Admin-Plattform — Bestellungen und Katalog an einer Stelle.",
    },
  ],
  faq: [
    {
      q: "Wir haben ein Google-Profil. Brauchen wir zusätzlich eine Website?",
      a: "Für das Gefundenwerden reicht das Google-Profil, für die Entscheidung nicht. Karte, Preise, Räumlichkeit und Veranstaltungsbedingungen prüft ein Gast vor der Reservierung, und das passt nicht auf ein Profil.",
    },
    {
      q: "Können Reservierungen auch über Instagram kommen?",
      a: "Ja. Der Link führt auf denselben Kalender, sodass Reservierungen aus Instagram und von der Website an einer Stelle sichtbar sind und sich nicht überschneiden können.",
    },
    {
      q: "Wer pflegt Karte und Preise?",
      a: "Sie, über den Admin. Das ist Absicht — eine Karte ändert sich häufiger, als irgendjemand auf eine Agentur warten möchte.",
    },
    {
      q: "Was, wenn ein Gast etwas fragt, das der Assistent nicht weiß?",
      a: "Er gibt weiter. Ein Assistent, der die Zusammensetzung eines Gerichts erfindet, ist gefährlicher als einer, der schweigt — die Grenze ist deshalb streng gesetzt.",
    },
  ],
  relatedServices: [
    { label: "Buchungssysteme", href: "/our-services/sistemi-za-zakazivanje" },
    { label: "Webauftritte", href: "/our-services/web-prezentacije" },
  ],
};

const ecommerce: AiPage = {
  slug: "web-shop-i-trgovina",
  industry: "Onlinehandel",
  eyebrow: "KI nach Branche",
  title: "KI für den Onlineshop — Texte, Suche, Support, Retouren",
  metaDescription:
    "Was KI im Onlineshop leistet: Produkttexte aus der Spezifikation, Suche, die die Frage versteht, sofortige Auskunft zum Bestellstatus und strukturierte Retouren.",
  h1: "KI für Onlineshop und Handel",
  lead:
    "Ein Shop mit tausend Artikeln hat zwei Probleme, die sich nicht durch Einstellen lösen lassen: Beschreibungen, für die niemand Zeit hat, und Kundenfragen, die sich tausendfach wiederholen.",
  answer:
    "Im Onlineshop bringt KI am meisten im Katalog und im Support. Beschreibungen, Titel und Meta-Angaben entstehen aus der Produktspezifikation in Serien statt einzeln, sodass ein Artikel ohne Text überhaupt auffindbar wird. Auf der anderen Seite sind die meisten Kundennachrichten drei Fragen — wo ist mein Paket, haben Sie das in 42, wie schicke ich zurück — und die beantwortet ein Assistent, der mit echtem Lagerbestand und echtem Sendungsstatus verbunden ist, nicht mit Textbausteinen.",
  keywords: [
    "KI für Onlineshop",
    "automatische Produktbeschreibungen",
    "KI Produktsuche",
    "Chatbot Onlineshop",
    "Bestellstatus automatisch",
    "E-Commerce Automatisierung",
  ],
  serviceName: "KI und Automatisierung für den Onlinehandel",
  tasks: [
    {
      name: "Produkttexte in Serien",
      problem: "Achthundert Artikel ohne Beschreibung. Google zeigt sie nicht, Kunden verstehen sie nicht.",
      solution:
        "Aus Spezifikation, Kategorie und Bezeichnung entstehen Beschreibung, Titel und Meta-Text, in Ihrem Tonfall und mit Ihren Kategoriebegriffen. Freigabe erfolgt im Paket, nicht einzeln.",
      delivery: "Werkzeug zur Erzeugung und Prüfung, mit Import und Export.",
    },
    {
      name: "Suche, die die Frage versteht",
      problem: "Jemand tippt „etwas für ein Baby mit sechs Monaten\" und bekommt nichts, weil kein Artikelname das so nennt.",
      solution: "Suche nach Bedeutung statt nach Zeichenfolge, mit Filtern, die sich aus der Anfrage selbst vorschlagen.",
      delivery: "Suche über Ihren Katalog, plus Auswertung, wonach gesucht wird und was fehlt.",
    },
    {
      name: "Wo ist mein Paket",
      problem: "Die Hälfte der Supportnachrichten ist eine Frage, und die Antwort ist ein Kopieren aus dem Versandsystem.",
      solution: "Der Kunde gibt Bestellnummer oder E-Mail ein und erhält sofort den echten Status vom Versanddienstleister.",
      delivery: "Sendungsverfolgung auf der Website und in der automatischen Antwort.",
    },
    {
      name: "Retoure ohne E-Mail-Kette",
      problem: "Eine Retoure läuft über zehn E-Mails, während die gesetzliche Frist bereits läuft.",
      solution:
        "Ein geführtes Formular erfasst alles auf einmal — Beleg, Foto, Grund — und eröffnet einen Vorgang mit Frist und Status, den der Kunde selbst verfolgt.",
      delivery: "Retourenverwaltung mit Fristen und Historie.",
    },
    {
      name: "Empfehlungen, die Sinn ergeben",
      problem: "„Ähnliche Produkte\" zeigt denselben Artikel in einer anderen Farbe.",
      solution: "Empfehlungen danach, was tatsächlich zusammen gekauft wird und was zu einem konkreten Modell passt, nicht nach Kategorie.",
      delivery: "Empfehlungsblock auf Produktseite und im Warenkorb.",
    },
    {
      name: "Preise und Wettbewerb",
      problem: "Dass Sie zu teuer sind, merken Sie erst, wenn der Absatz einbricht.",
      solution: "Beobachtung öffentlicher Preise für die Artikel, die Sie festlegen, mit Warnung, wenn jemand unterbietet.",
      delivery: "Preisauswertung je Artikel und je Wettbewerber.",
    },
  ],
  sections: [
    {
      heading: "Warum der Katalog zuerst kommt",
      body: [
        "Ein Shop ohne Beschreibungen ist ein Laden ohne Preisschilder. Suchmaschinen können ihn nicht bewerten, und inzwischen können Assistenten ihn auch nicht empfehlen — beide lesen Text. Ein Artikel ohne Beschreibung ist in beiden Welten unsichtbar, so gut der Preis auch sein mag.",
      ],
    },
    {
      heading: "Wo Vorsicht geboten ist",
      bullets: [
        "Eine Beschreibung, die eine technische Eigenschaft erfindet, ist ein Reklamationsgrund — deshalb entsteht sie nur aus der Spezifikation.",
        "Ein Assistent darf keine Rückerstattung selbst freigeben.",
        "Preise und Aktionen ändern sich nicht automatisch.",
        "Erzeugter Text geht vor Veröffentlichung durch eine Prüfung, mindestens paketweise.",
      ],
    },
  ],
  howTo: {
    name: HOW_TO_NAME,
    steps: [
      {
        name: "Eine Stunde Gespräch",
        text: "Wir sehen uns Katalog, Menge der Supportnachrichten und die Abbruchstellen im Warenkorb an.",
      },
      {
        name: "Eine Aufgabe, nicht alle",
        text: "Im Shop ist das fast immer der Katalog — Beschreibungen und Suche vor allem anderen.",
      },
      {
        name: "Einführung in zwei bis vier Wochen",
        text: "Umgesetzt auf Ihrer Plattform, ob WooCommerce, Shopify oder Eigenentwicklung.",
      },
      {
        name: "Zwei Wochen Parallelbetrieb",
        text: "Zuerst eine Kategorie, damit sichtbar wird, wie es liest und wie es sich in der Suche verhält.",
      },
      {
        name: "Die nächste Aufgabe",
        text: "Dann Support und Retouren, sobald der Katalog steht.",
      },
    ],
  },
  proofHeading: "Systeme dieser Art, die bereits laufen",
  proof: [
    {
      label: "Santos & Santorini",
      href: "/our-projects/santos-santorini-web-shop-admin-platforma",
      note: "Webshop mit Admin-Plattform — Katalog, Bestellungen und Inhalte.",
    },
  ],
  faq: [
    {
      q: "Bestraft Google KI-Texte?",
      a: "Google bestraft nutzlose Inhalte, unabhängig davon, wer sie geschrieben hat. Eine Beschreibung aus einer echten Spezifikation, mit korrekten Daten und einer Prüfung vor der Veröffentlichung, ist das nicht. Massenhaft erzeugter Text ohne jede Kontrolle schon.",
    },
    {
      q: "Funktioniert das mit WooCommerce?",
      a: "Ja, ebenso mit Shopify und mit einem eigenen Shop. Der Katalog wird über das bestehende System gelesen und zurückgeschrieben, ohne Migration.",
    },
    {
      q: "Wie viele Artikel lassen sich auf einmal verarbeiten?",
      a: "Die praktische Grenze ist nicht die Artikelzahl, sondern die Prüfkapazität. Deshalb läuft es je Kategorie — eine verarbeiten, prüfen, weitergehen.",
    },
    {
      q: "Kann der Assistent für den Kunden bestellen?",
      a: "Er kann zum Warenkorb führen und ihn füllen, die Bestätigung der Bestellung bleibt beim Kunden. Alles andere ist ein rechtliches, kein technisches Problem.",
    },
  ],
  relatedServices: [
    { label: "E-Commerce und Webshop", href: "/our-services/e-commerce-web-shop" },
    { label: "SEO und digitales Marketing", href: "/our-services/seo-digitalni-marketing" },
  ],
};

const realEstate: AiPage = {
  slug: "nekretnine-i-izdavanje",
  industry: "Immobilien und Vermietung",
  eyebrow: "KI nach Branche",
  title: "KI für Immobilien und Vermietung — Anfragen, Exposés, Buchungen",
  metaDescription:
    "Was KI in Maklerbüros und bei Vermietern leistet: Qualifizierung von Anfragen, Exposétexte, mehrsprachige Gästeantworten, ein Kalender ohne Doppelbuchungen.",
  h1: "KI für Immobilien und Vermietung",
  lead:
    "Ein Makler verliert einen Tag an Anfragen, die zu nichts führen. Ein Vermieter verliert eine Buchung, weil er nicht binnen einer Stunde geantwortet hat. Beides ist ein Wettlauf um die Antwortzeit.",
  answer:
    "Bei Immobilien und Vermietung leistet KI zwei Dinge: Sie trennt die ernsthafte Anfrage von der neugierigen und antwortet sofort, zu jeder Uhrzeit. Die Anfrage wird über wenige Fragen qualifiziert — Budget, Zeitpunkt, Finanzierung, Lage — sodass der Makler nur die Kontakte anruft, bei denen es sich lohnt. Bei der Kurzzeitvermietung werden Gastfragen zu Anreise, Parken und Hausordnung in der Sprache beantwortet, in der sie gestellt wurden, auf einem Kalender, der wirklich frei ist — keine Doppelbuchungen, keine verlorenen Nächte.",
  keywords: [
    "KI für Immobilien",
    "Software für Vermietung",
    "Anfragen qualifizieren Immobilien",
    "Exposétext automatisch",
    "Chatbot Ferienwohnung",
    "Buchungskalender synchronisieren",
  ],
  serviceName: "KI und Automatisierung für Immobilien und Vermietung",
  tasks: [
    {
      name: "Anfragen qualifizieren",
      problem: "Zehn Anrufe am Tag, zwei davon ernsthaft, und das zeigt sich in der fünfzehnten Gesprächsminute.",
      solution:
        "Wenige Fragen vor dem Anruf — Budget, Finanzierung, Bezugstermin, Lage — und die Anfrage kommt mit einer Einstufung an, wie weit sie ist.",
      delivery: "Anfrageformular mit Bewertung und automatischer Erfassung.",
    },
    {
      name: "Exposétext aus den Daten",
      problem: "Dreißig Objekte warten auf Text, und alle klingen gleich, weil abgeschrieben wird.",
      solution:
        "Aus Fläche, Geschoss, Ausrichtung und Fotos entsteht ein Text, der herausstellt, was an diesem Objekt tatsächlich anders ist.",
      delivery: "Textgenerator aus Objektdaten, mit Ihrer Prüfung.",
    },
    {
      name: "Gastantwort in seiner Sprache",
      problem: "Ein Gast fragt um 23 Uhr, wie er ins Haus kommt und wo er parkt.",
      solution:
        "Der Assistent antwortet auf Deutsch, Englisch und Serbisch aus Ihrer Hausordnung und Anreisebeschreibung, mit Foto des Eingangs und Code zum passenden Zeitpunkt.",
      delivery: "Chat und gestaffelte Nachrichten über den Aufenthalt hinweg.",
    },
    {
      name: "Ein Kalender ohne Überschneidungen",
      problem: "Eine Plattformbuchung und eine Direktbuchung treffen auf dasselbe Datum.",
      solution: "Ein Kalender führt alle Kanäle zusammen, sodass ein belegtes Datum überall im selben Moment schließt.",
      delivery: "Zusammengeführter Kalender mit Direktbuchungen über Ihre Seite.",
    },
    {
      name: "Direktbuchung statt Provision",
      problem: "Plattformen nehmen einen Anteil an jeder Nacht, auch bei wiederkehrenden Gästen.",
      solution: "Eine eigene Buchungsseite mit gleichem Ablauf und eine Nachricht an wiederkehrende Gäste, direkt zu buchen.",
      delivery: "Objektseite mit Zahlung oder Bestätigung, ohne Provision.",
    },
    {
      name: "Verträge und Übergabe",
      problem: "Der Mietvertrag wird für jeden Mieter neu abgetippt, das Übergabeprotokoll geht verloren.",
      solution:
        "Der Vertrag füllt sich aus Objekt- und Mieterdaten, und das Protokoll mit Zustandsfotos bleibt am Vorgang.",
      delivery: "Vertragsvorlagen und Übergabeprotokoll mit Fotos in der Akte.",
    },
  ],
  sections: [
    {
      heading: "Zwei verschiedene Geschäfte unter einem Namen",
      body: [
        "Immobilienverkauf und Kurzzeitvermietung wirken verwandt und teilen keinen Schmerzpunkt. Im Verkauf verlieren Sie Zeit an die falschen Leute, deshalb kommt die Qualifizierung zuerst. In der Vermietung verlieren Sie an langsame Antworten und an Plattformprovision, deshalb kommen Antworten und Direktbuchung zuerst.",
      ],
    },
    {
      heading: "Die Grenze, die nicht überschritten wird",
      bullets: [
        "Der Assistent erteilt keine Rechtsauskunft zu Kauf oder Steuern.",
        "Er bestätigt keine Finanzierungskonditionen — das ist die Bank, nicht das Exposé.",
        "Er sagt keinen Besichtigungstermin ohne Makler auf der anderen Seite zu.",
        "Er versendet keinen Vertrag ohne menschliche Prüfung.",
      ],
    },
  ],
  howTo: {
    name: HOW_TO_NAME,
    steps: [
      {
        name: "Eine Stunde Gespräch",
        text: "Wir zählen die Anfragen und sehen, wie viele an einer langsamen Antwort verloren gehen.",
      },
      {
        name: "Eine Aufgabe, nicht alle",
        text: "Ein Maklerbüro beginnt bei der Qualifizierung, ein Vermieter bei Antworten und Kalender.",
      },
      {
        name: "Einführung in zwei bis vier Wochen",
        text: "Umgesetzt auf Ihrem Objektbestand und Ihrer Hausordnung.",
      },
      {
        name: "Zwei Wochen Parallelbetrieb",
        text: "Manuelle Antworten bleiben, bis feststeht, dass der Assistent bei Preisen und Daten nicht irrt.",
      },
      {
        name: "Die nächste Aufgabe",
        text: "Dann Exposétexte und Verträge, wenn der erste Teil steht.",
      },
    ],
  },
  faq: [
    {
      q: "Ersetzt das Booking und Airbnb?",
      a: "Nicht sofort und nicht vollständig. Ziel ist, dass wiederkehrende Gäste und Gäste, die Sie über Google finden, direkt buchen, während die Plattformen Kanal für Neukunden bleiben.",
    },
    {
      q: "Wer haftet, wenn der Assistent einen falschen Preis nennt?",
      a: "Genau deshalb kommt der Preis nicht aus Fließtext, sondern aus einem Kalender mit Tagespreisen. Was nicht im Kalender steht, sagt der Assistent nicht.",
    },
    {
      q: "Lohnt sich das für ein einzelnes Objekt?",
      a: "Es funktioniert ab einem Objekt, rechnet sich aber schneller bei mehreren oder wenn die Anfragen wöchentlich zweistellig sind.",
    },
    {
      q: "Wie wird der bestehende Kalender angebunden?",
      a: "Über iCal-Austausch mit den Plattformen oder direkt über deren Zugang, je nachdem, was die Plattform anbietet.",
    },
  ],
  relatedServices: [
    { label: "Buchungssysteme", href: "/our-services/sistemi-za-zakazivanje" },
    { label: "Webauftritte", href: "/our-services/web-prezentacije" },
  ],
};

const education: AiPage = {
  slug: "obrazovanje-i-kursevi",
  industry: "Bildung und Kurse",
  eyebrow: "KI nach Branche",
  title: "KI für Schulen und Kursanbieter — Anmeldung, Material, Prüfung",
  metaDescription:
    "Was KI für Schulen, Kursanbieter und Lehrkräfte leistet: papierlose Anmeldung, Material und Tests aus dem Lehrstoff, Elternanfragen, Fortschrittsverfolgung.",
  h1: "KI für Bildung und Kurse",
  lead:
    "Eine Lehrkraft ist ausgebildet, um zu unterrichten, und verbringt die Abende damit, Tests zu bauen und dieselben Elternfragen zu beantworten. Das ist Arbeit, die vom Tisch kommt.",
  answer:
    "In der Bildung gibt KI die meiste Zeit bei Vorbereitung und Verwaltung zurück, nicht im Unterricht. Aus einem Lehrstoff entstehen Übungen, Tests in mehreren Schwierigkeitsstufen und Lösungen, und aus einer Anmeldung ergeben sich Gruppenzuordnung, Stundenplan, Vertrag und Rechnung ohne Abtippen. Der dritte Teil ist das Antworten: Fragen zu Terminen, Preis, versäumten Stunden und Bedingungen wiederholen sich so oft, dass es sich lohnt, sie ein System aus Ihren Regeln beantworten zu lassen.",
  keywords: [
    "KI für Schulen",
    "KI für Kursanbieter",
    "Software Sprachschule",
    "Testerstellung automatisch",
    "Online-Anmeldung Kursteilnehmer",
    "Lernfortschritt verfolgen",
  ],
  serviceName: "KI und Automatisierung für Bildung",
  tasks: [
    {
      name: "Anmeldung ohne Papier",
      problem: "Anmeldung, Vertrag, Rechnung und Stundenplan — alles wird abgetippt, für jeden Teilnehmer erneut.",
      solution: "Eine Anmeldung füllt alles Weitere: Gruppe, Vertrag, Rechnung und Zugang zum Material.",
      delivery: "Anmeldeformular, Teilnehmerverwaltung und automatischer Vertrag.",
    },
    {
      name: "Material und Übungen aus dem Lehrstoff",
      problem: "Jede Stufe und jede Gruppe braucht andere Übungen, und der Tag hat 24 Stunden.",
      solution: "Aus Ihrem Lehrstoff entstehen Übungen in mehreren Stufen, mit Lösungen, in Ihrem Format und Ihrer Begrifflichkeit.",
      delivery: "Vorbereitungswerkzeug mit nach Stufen sortierter Bibliothek.",
    },
    {
      name: "Test und Korrektur",
      problem: "Vierzig Arbeiten zu korrigieren dauert länger als die Stunde, in der sie geschrieben wurden.",
      solution:
        "Der Test läuft online, geschlossene Fragen korrigieren sich selbst, offene erhalten einen Bewertungsvorschlag, den die Lehrkraft bestätigt oder ändert.",
      delivery: "Tests mit automatischer Korrektur und Auswertung je Teilnehmer.",
    },
    {
      name: "Antworten an Eltern und Teilnehmer",
      problem: "Wann startet die Gruppe, was bei versäumter Stunde, was kostet es, sind noch Plätze frei — jeden Tag.",
      solution:
        "Der Assistent antwortet aus Ihrem Stundenplan und Ihren Regeln und erfasst das Interesse als Kontakt, statt es zu verlieren.",
      delivery: "Chat auf der Website, verbunden mit Gruppenplan und Preisliste.",
    },
    {
      name: "Wer fällt zurück, wer bricht ab",
      problem: "Ein Teilnehmer kommt nicht mehr, und es fällt erst auf, wenn er sich nicht erneut anmeldet.",
      solution: "Anwesenheit und Ergebnisse werden verfolgt, mit Warnung, wenn jemand abrutscht — solange sich noch reagieren lässt.",
      delivery: "Fortschrittsübersicht je Gruppe und je Teilnehmer.",
    },
    {
      name: "Zertifikate und Nachweise",
      problem: "Bescheinigungen entstehen von Hand in Word und werden ein Jahr später wieder angefragt.",
      solution: "Das Zertifikat wird aus der Verwaltung ausgestellt, mit Nummer und prüfbarem Link.",
      delivery: "Zertifikatsgenerator mit Archiv und Prüfung.",
    },
  ],
  sections: [
    {
      heading: "Was KI im Unterricht nicht tun sollte",
      body: [
        "In der Bildung ist eine Grenze schnell überschritten. Eine Note, die in die Akte geht, muss von der Lehrkraft kommen. Arbeiten von Lernenden dürfen nicht in Systeme, die damit trainieren. Und die Erklärung des Stoffs anstelle der Lehrkraft ist ein Tausch, den man später bezahlt — wenn sich zeigt, dass niemand etwas gelernt hat.",
      ],
      bullets: [
        "Die abschließende Note — immer ein Mensch.",
        "Arbeiten Minderjähriger — nie in ein externes System ohne Einwilligung der Eltern.",
        "Die Entscheidung über den Aufstieg in eine höhere Stufe.",
        "Das Gespräch mit Eltern über die Schwierigkeiten eines Kindes.",
      ],
    },
    {
      heading: "Wo der schnellste Nutzen liegt",
      body: [
        "Bei der Vorbereitung. Das ist der einzige Teil der Arbeit, den eine Lehrkraft allein und außerhalb der Arbeitszeit erledigt und für den sie nicht gesondert bezahlt wird. Alles andere kann warten.",
      ],
    },
  ],
  howTo: {
    name: HOW_TO_NAME,
    steps: [
      {
        name: "Eine Stunde Gespräch",
        text: "Wir sehen, wie viel Zeit in die Vorbereitung geht und wie viel in die Anmeldeverwaltung.",
      },
      {
        name: "Eine Aufgabe, nicht alle",
        text: "Eine Lehrkraft beginnt beim Material, eine Schule bei der Anmeldung.",
      },
      {
        name: "Einführung in zwei bis vier Wochen",
        text: "Umgesetzt auf Ihrem Lehrstoff und Ihrem Gruppenplan.",
      },
      {
        name: "Zwei Wochen Parallelbetrieb",
        text: "Zuerst eine Gruppe, um zu prüfen, ob das Material zur Stufe passt.",
      },
      {
        name: "Die nächste Aufgabe",
        text: "Dann Tests und Fortschrittsverfolgung.",
      },
    ],
  },
  proofHeading: "Systeme dieser Art, die bereits laufen",
  proof: [
    {
      label: "TeachFromHome",
      href: "/our-projects/teachfromhome-onboarding-sistem-za-remote-nastavnike",
      note: "Onboarding-System für Remote-Lehrkräfte — Bewerbung, Prüfung und Verfolgung.",
    },
  ],
  faq: [
    {
      q: "Kann bei einem Online-Test abgeschrieben werden?",
      a: "Ein Online-Test verlässt sich nicht auf Ehrlichkeit — Fragen werden gemischt, die Zeit begrenzt, Varianten je Teilnehmer erzeugt. Für eine ernsthafte Leistungsprüfung gilt weiterhin, dass sie im Raum geschrieben wird.",
    },
    {
      q: "Wie steht es um den Datenschutz bei Minderjährigen?",
      a: "Die Daten bleiben in Ihrer Datenbank, der Zugriff erfolgt nach Rolle, und die Einwilligung der Eltern ist Teil der Anmeldung. Arbeiten gehen ohne ausdrückliche Einwilligung nicht in externe Systeme.",
    },
    {
      q: "Ersetzt das das amtliche Klassenbuch?",
      a: "Nein. Das gesetzlich vorgeschriebene Register bleibt verpflichtend. Das hier deckt ab, was es nicht leistet — Vorbereitung, Material und Kommunikation mit Teilnehmern.",
    },
    {
      q: "Funktioniert das für eine einzelne Lehrkraft?",
      a: "Ja, und dort ist es am schnellsten spürbar, weil eine Person Vorbereitung, Verwaltung und Abrechnung zugleich macht.",
    },
  ],
  relatedServices: [
    { label: "Interne Geschäftsanwendungen", href: "/our-services/interne-poslovne-aplikacije" },
    { label: "SaaS-Entwicklung", href: "/our-services/saas-razvoj" },
  ],
};

const manufacturing: AiPage = {
  slug: "proizvodnja-i-gradjevina",
  industry: "Produktion und Bau",
  eyebrow: "KI nach Branche",
  title: "KI für Produktion und Bau — Aufmaß, Angebot, Arbeitsaufträge",
  metaDescription:
    "Was KI in Produktions- und Baubetrieben leistet: Aufmaß und Angebot aus der Leistungsbeschreibung, Arbeitsaufträge aufs Handy, Baustellenberichte, Material- und Fristenverfolgung.",
  h1: "KI für Produktion und Bau",
  lead:
    "Das Angebot braucht drei Tage und bekommt der, der zuerst geschickt hat. Aufträge gehen per Telefon raus, der Baustellenbericht landet in einer Gruppe und verschwindet. Das ist Arbeit, die zurück ins System gehört.",
  answer:
    "In Produktion und Bau ist KI am wertvollsten, bevor der Auftrag beginnt — beim Aufmaß und beim Angebot. Aus einer Leistungsbeschreibung, einer Zeichnung oder einem Positionsverzeichnis entsteht eine Kalkulation mit Ihren Aufwandswerten und Ihren Preisen in Stunden statt Tagen, sodass Sie noch antworten können, solange der Auftrag offen ist. Der zweite Teil ist die Baustelle: Arbeitsauftrag aufs Handy, Bericht mit Foto und verbrauchtem Material, und eine Erfassung, die Soll und Ist zeigt, solange sich noch eingreifen lässt.",
  keywords: [
    "KI für Produktion",
    "KI für Bauunternehmen",
    "Aufmaß und Kalkulation Software",
    "Arbeitsauftrag App",
    "Baustellenbericht Software",
    "Materialverfolgung",
  ],
  serviceName: "KI und Automatisierung für Produktion und Bau",
  tasks: [
    {
      name: "Aufmaß und Angebot",
      problem: "Die Leistungsbeschreibung kommt als PDF oder auf Papier, und die Kalkulation wird drei Tage in Excel getippt.",
      solution:
        "Positionen werden aus dem Dokument gelesen, mit Ihren Aufwandswerten und Preisen verknüpft und ergeben eine Kalkulation mit Marge, die Sie prüfen.",
      delivery: "Kalkulation als Tabelle und PDF-Angebot mit Ihrem Briefkopf.",
    },
    {
      name: "Arbeitsauftrag aufs Handy",
      problem: "Der Auftrag wird telefonisch durchgegeben, danach weiß niemand, wer was gemacht hat und wie lange es dauerte.",
      solution: "Die Kolonne bekommt den Auftrag mit Positionen und Material und schließt ihn mit Stunden und Foto ab.",
      delivery: "Baustellenansicht im Browser, ohne Installation.",
    },
    {
      name: "Baustellenbericht",
      problem: "Fotos und Notizen landen in einer Gruppe, und einen Monat später findet sie niemand mehr.",
      solution: "Der Tagesbericht wird vom Handy ausgefüllt, mit Fotos und Zeitstempel, und ordnet sich selbst dem Vorgang zu.",
      delivery: "Bautagebuch mit Archiv je Objekt.",
    },
    {
      name: "Material und Verschnitt",
      problem: "Bestellt wurde das eine, verbraucht das andere, und die Differenz zeigt sich erst am Ende.",
      solution: "Der Verbrauch wird am Auftrag erfasst, sodass die Abweichung vom Aufwandswert während des Auftrags sichtbar wird, nicht danach.",
      delivery: "Materialerfassung je Objekt mit Soll-Ist-Vergleich.",
    },
    {
      name: "Nachweise und Fristen",
      problem: "Prüfzeugnisse, Gewährleistung, Geräteprüfung, Höhenarbeitsschulung — ein Versäumnis bedeutet Stillstand oder Bußgeld.",
      solution: "Alle Fristen an einer Stelle, mit Warnung und benannter Zuständigkeit.",
      delivery: "Dokumentenverwaltung mit Erinnerungen.",
    },
    {
      name: "Katalog und technische Unterlagen",
      problem: "Ein Kunde fragt nach einem Datenblatt, und es existiert in drei Fassungen auf drei Rechnern.",
      solution: "Eine Quelle für Unterlagen, mit Suche nach Bedeutung — Sie stellen eine Frage und erhalten Dokument und Seite.",
      delivery: "Durchsuchbare Dokumentenbasis mit Versionskontrolle.",
    },
  ],
  sections: [
    {
      heading: "Warum das Angebot und nicht die Fertigung",
      body: [
        "Von KI in der Produktion werden Roboter und Ausfallvorhersage erwartet. Für einen Betrieb mit zwanzig Beschäftigten ist das nicht der erste Schritt, sondern der fünfte. Der erste ist das Angebot — denn dort geht Arbeit verloren, die bereits auf dem Tisch lag, ganz ohne Investition in Anlagen.",
      ],
    },
    {
      heading: "Was beim Ingenieur bleibt",
      bullets: [
        "Die Prüfung jeder Kalkulation vor dem Versand — die Maschine liest das Dokument, sie trägt nicht die Haftung.",
        "Die technische Lösung und jede Abweichung von der Planung.",
        "Risiko- und Arbeitssicherheitsbeurteilung.",
        "Die Beziehung zum Auftraggeber und die Terminverhandlung.",
      ],
    },
  ],
  howTo: {
    name: HOW_TO_NAME,
    steps: [
      {
        name: "Eine Stunde Gespräch",
        text: "Wir messen, wie lange der Weg von der Anfrage zum versendeten Angebot tatsächlich dauert.",
      },
      {
        name: "Eine Aufgabe, nicht alle",
        text: "Fast immer Aufmaß und Angebot — dort liegt der Verlust.",
      },
      {
        name: "Einführung in zwei bis vier Wochen",
        text: "Umgesetzt auf Ihren Aufwandswerten und Ihren Lieferantenpreisen.",
      },
      {
        name: "Zwei Wochen Parallelbetrieb",
        text: "Kalkulationen entstehen auf beiden Wegen, bis sie bei echten Aufträgen übereinstimmen.",
      },
      {
        name: "Die nächste Aufgabe",
        text: "Dann Arbeitsaufträge und Baustellenberichte.",
      },
    ],
  },
  faq: [
    {
      q: "Liest das Zeichnungen?",
      a: "Leistungsbeschreibungen, Positionsverzeichnisse und Texte liest es zuverlässig. Zeichnungen teilweise und immer mit Prüfung — auf einer Zeichnung verzeiht ein Fehler nichts, deshalb verlässt sich dort nichts auf Automatik.",
    },
    {
      q: "Unsere Aufwandswerte stehen im Kopf, nicht in einer Tabelle.",
      a: "Dann ist der erste Schritt, sie aufzuschreiben. Das sind einige Tage Arbeit und lohnt sich auch ganz ohne Software — ein Betrieb, dessen Kennwerte in einem Kopf liegen, kann nicht wachsen.",
    },
    {
      q: "Unsere Leute auf der Baustelle haben keine guten Handys.",
      a: "Die Baustellenansicht läuft auf älteren Geräten und bei schwachem Netz, mit Zwischenspeicherung bei Abbruch. Verlangt sie neuere Geräte, ist sie falsch gebaut.",
    },
    {
      q: "Wir haben ein ERP. Läuft das darüber?",
      a: "Es läuft daneben. Das ERP bleibt die Wahrheit für Bestand und Finanzen, und diese Schicht löst, was ERP-Systeme traditionell schlecht können — schnelles Angebot und Erfassung von der Baustelle.",
    },
  ],
  relatedServices: [
    { label: "Branchenlösungen", href: "/our-services/industrijska-resenja" },
    { label: "Interne Geschäftsanwendungen", href: "/our-services/interne-poslovne-aplikacije" },
  ],
};

const automotive: AiPage = {
  slug: "auto-servisi-i-prodaja",
  industry: "Kfz-Werkstatt und Fahrzeughandel",
  eyebrow: "KI nach Branche",
  title: "KI für Werkstatt und Fahrzeughandel — Termine, Teile, Inserate",
  metaDescription:
    "Was KI in Kfz-Werkstätten und im Fahrzeughandel leistet: Terminbuchung, Teilesuche über die Fahrgestellnummer, Inseratstexte, Erinnerungen an HU und Wartung.",
  h1: "KI für Werkstatt und Fahrzeughandel",
  lead:
    "Die Werkstatt beantwortet Teilefragen unter der Motorhaube, der Händler schreibt denselben Text für das zwanzigste Fahrzeug. Beides leidet daran, dass niemand ans Telefon kommt.",
  answer:
    "In der Werkstatt löst KI zuerst zwei Dinge: Terminbuchung ohne Anruf und das Finden des richtigen Teils aus Fahrgestellnummer oder Fehlerbeschreibung, aus dem Katalog, den Sie ohnehin nutzen. Im Fahrzeughandel liegt der Wert im automatischen Inseratstext aus Ausstattung und Fotos und im Beantworten von Fragen zu Laufleistung, Scheckheft und Inzahlungnahme — denn der Käufer fragt um 22 Uhr und wählt den, der zuerst antwortet. Die dritte Ebene, die den Umsatz hält, sind Erinnerungen an Hauptuntersuchung und Wartung.",
  keywords: [
    "KI für Kfz-Werkstatt",
    "Online-Terminbuchung Werkstatt",
    "Teilesuche Fahrgestellnummer",
    "Fahrzeuginserat Text",
    "HU-Erinnerung Software",
    "Werkstattsoftware",
  ],
  serviceName: "KI und Automatisierung für Werkstatt und Fahrzeughandel",
  tasks: [
    {
      name: "Werkstatttermin",
      problem: "Das Telefon klingelt, während Sie unter dem Fahrzeug liegen. Sie gehen nicht ran, der Kunde fährt woanders hin.",
      solution:
        "Termine werden über die Website gebucht, mit Fehlerbeschreibung und Modell, auf der echten Auslastung von Hebebühne und Monteur.",
      delivery: "Buchung mit Kalender je Arbeitsplatz und Auftragsart.",
    },
    {
      name: "Welches Teil passt",
      problem: "Eine halbe Stunde geht dafür drauf, im Katalog das Teil für Motor und Baujahr zu finden.",
      solution: "Aus Fahrgestellnummer oder Beschreibung wird das Teil aus Ihrem Katalog vorgeschlagen, mit Alternativen und Bestand.",
      delivery: "Teilesuche über Fahrgestellnummer und Beschreibung, auf Ihrem Katalog.",
    },
    {
      name: "Kostenvoranschlag vor der Reparatur",
      problem: "Der Kunde fragt, was es kostet, und die Antwort hängt davon ab, was sich beim Zerlegen zeigt.",
      solution:
        "Aus typischer Arbeitsliste und Teilepreisen entsteht ein Rahmen, in dem klar getrennt ist, was sicher ist und was vom Befund abhängt.",
      delivery: "Kostenvoranschlag mit Positionen und Kundenfreigabe vor Arbeitsbeginn.",
    },
    {
      name: "Inseratstext für ein Fahrzeug",
      problem: "Zwanzig Fahrzeuge warten auf Text, also bekommen alle dieselben drei Zeilen.",
      solution:
        "Aus Ausstattung, Daten und Fotos entsteht ein Text, der die tatsächlichen Unterschiede herausstellt und alle Angaben enthält, nach denen Käufer suchen.",
      delivery: "Textgenerator für Inserate, mit Ihrer Prüfung vor der Veröffentlichung.",
    },
    {
      name: "Erinnerung an HU und Wartung",
      problem: "Der Kunde denkt einen Tag vor Ablauf an die Hauptuntersuchung und fährt zum Erstbesten.",
      solution: "Eine Nachricht einen Monat vorher mit angebotenem Termin — für Untersuchung wie für laufleistungsabhängige Wartung.",
      delivery: "Fahrzeugverwaltung mit Fristen und automatischen Nachrichten.",
    },
    {
      name: "Fahrzeughistorie",
      problem: "Was zuletzt gemacht wurde, welches Öl, welches Teil — im Heft oder im Kopf des Monteurs.",
      solution: "Servicehistorie je Fahrzeug, verfügbar, sobald das Kennzeichen eingegeben wird.",
      delivery: "Fahrzeugakte mit Arbeiten, Teilen und Fotos.",
    },
  ],
  sections: [
    {
      heading: "Wo das eigentliche Geld liegt",
      body: [
        "Eine Werkstatt glaubt meist, sie brauche mehr Neukunden. Fast immer braucht sie die alten zurück. Ein Fahrzeug, das einmal da war, hat bekannte Laufleistung, bekanntes Intervall und bekannten Ablauftermin — das sind drei Anlässe für eine Nachricht im Jahr, ohne einen Cent für Werbung.",
      ],
    },
    {
      heading: "Was KI hier nicht tut",
      bullets: [
        "Sie stellt keine Diagnose anstelle des Monteurs.",
        "Sie bestätigt nicht, dass ein Nachbauteil passt — das ist die Verantwortung der Werkstatt.",
        "Sie nennt keinen Reparaturpreis, bevor jemand hingesehen hat.",
        "Sie steht nicht für eine Historie ein, die sie nicht selbst erfasst hat.",
      ],
    },
  ],
  howTo: {
    name: HOW_TO_NAME,
    steps: [
      {
        name: "Eine Stunde Gespräch",
        text: "Wir zählen verpasste Anrufe und sehen, wie viele Kunden nicht wiederkommen.",
      },
      {
        name: "Eine Aufgabe, nicht alle",
        text: "Die Werkstatt beginnt bei der Terminbuchung, der Händler beim Inseratstext.",
      },
      {
        name: "Einführung in zwei bis vier Wochen",
        text: "Umgesetzt auf Ihrem Teilekatalog und Ihrer Arbeitsplatzbelegung.",
      },
      {
        name: "Zwei Wochen Parallelbetrieb",
        text: "Das Telefon bleibt, aber es wird gemessen, wie viele Termine online eingehen.",
      },
      {
        name: "Die nächste Aufgabe",
        text: "Dann Fahrzeugakte und Erinnerungen — dort liegen die wiederkehrenden Kunden.",
      },
    ],
  },
  proofHeading: "Systeme dieser Art, die bereits laufen",
  proof: [
    {
      label: "Prevoz Kop",
      href: "/our-projects/prevozkop-digitalni-prodajni-operativni-sistem",
      note: "Fahrzeuge, Aufträge und Kosten in einem System.",
    },
  ],
  faq: [
    {
      q: "Wir haben einen Teilekatalog vom Lieferanten. Wird der genutzt?",
      a: "Ja, sofern der Lieferant Zugang oder einen Export bereitstellt. Ziel ist kein neuer Katalog, sondern schnellere Suche in dem, den Sie bereits bezahlen.",
    },
    {
      q: "Stören Erinnerungen die Kunden?",
      a: "Eine Nachricht alle paar Monate, mit konkretem Anlass und angebotenem Termin, stört selten. Ein wöchentlicher Newsletter stört immer.",
    },
    {
      q: "Wir verkaufen auch Gebrauchtwagen. Deckt ein System beides ab?",
      a: "Die Fahrzeugverwaltung ist gemeinsam, aber es sind zwei Abläufe — Werkstatt läuft über Termine, Handel über Inserate und Anfragen. Umgesetzt wird der, der Sie aktuell mehr kostet.",
    },
    {
      q: "Was, wenn wir keine Website haben?",
      a: "Die Terminbuchung kann von einer einzelnen Seite und einem Google-Profil aus laufen. Eine vollständige Website ist der nächste Schritt, keine Voraussetzung.",
    },
  ],
  relatedServices: [
    { label: "Buchungssysteme", href: "/our-services/sistemi-za-zakazivanje" },
    { label: "Interne Geschäftsanwendungen", href: "/our-services/interne-poslovne-aplikacije" },
  ],
};

const professionalServices: AiPage = {
  slug: "knjigovodstvo-i-usluzne-firme",
  industry: "Steuerberatung und Dienstleister",
  eyebrow: "KI nach Branche",
  title: "KI für Kanzleien und Dienstleister — Belege, Mandanten, Fristen",
  metaDescription:
    "Was KI in Steuerkanzleien, Anwaltskanzleien und Beratungen leistet: Lesen eingehender Belege, Beantwortung wiederkehrender Mandantenfragen, Fristen und Forderungsverfolgung.",
  h1: "KI für Steuerberatung und Dienstleister",
  lead:
    "Steuerberater, Anwalt und Berater verkaufen Stunden. Jede Stunde für Abtippen, Dokumentensuche oder dieselbe Antwort noch einmal ist eine Stunde, die nicht abgerechnet wird.",
  answer:
    "Bei Dienstleistern rechnet sich KI am schnellsten bei eingehenden Belegen und bei wiederkehrenden Mandantenfragen. Rechnungen, Auszüge und Verträge werden aus Foto oder PDF gelesen und füllen die Felder selbst, mit verpflichtender Bestätigung für alles Unsichere. Parallel bekommen die Fragen, die ein Mandant jeden Monat stellt — was brauchen Sie von mir, bis wann läuft die Frist, wo ist mein Dokument — sofort eine Antwort aus Ihren eigenen Unterlagen, sodass das Telefon für das klingelt, was Ihr Urteil verlangt.",
  keywords: [
    "KI für Steuerberatung",
    "automatische Belegerfassung",
    "KI für Kanzleien",
    "Dokumentenverarbeitung Automatisierung",
    "Mandantenportal",
    "Fristenverwaltung Software",
  ],
  serviceName: "KI und Automatisierung für Kanzleien und Dienstleister",
  tasks: [
    {
      name: "Eingangsbelege aus dem Foto",
      problem: "Ein Mandant schickt Fotos von Rechnungen per Messenger, und jemand tippt sie den ganzen Tag ab.",
      solution:
        "Der Beleg wird gelesen, Felder werden gefüllt, Unsicheres zur Prüfung ausgesondert. Über ein Portal reicht der Mandant direkt ein, ohne Messenger.",
      delivery: "Belegeingang mit Prüfung und Export in Ihre Software.",
    },
    {
      name: "Mandantenportal",
      problem: "Derselbe Mandant fragt jeden Monat, wo die Auswertung bleibt und wie viel zu zahlen ist.",
      solution: "Der Mandant sieht seine Dokumente, Verpflichtungen und Fristen selbst, mit Zugang je Konto.",
      delivery: "Mandantenportal mit Dokumenten, Status und Nachrichten.",
    },
    {
      name: "Fristen, die Geld kosten",
      problem: "Umsatzsteuer, Steuern, Meldungen, Verlängerungen — eine versäumte Frist wird bezahlt, oft aus Ihrer Tasche.",
      solution: "Ein Fristenkalender je Mandant, mit benannter Zuständigkeit und Vorwarnung.",
      delivery: "Fristenübersicht je Mandant mit Erinnerungen.",
    },
    {
      name: "Suche in den eigenen Unterlagen",
      problem: "Die Antwort steht in einem Vertrag oder Gutachten von vor zwei Jahren und ist nicht auffindbar.",
      solution:
        "Suche nach Bedeutung über Ihre Verträge, Gutachten und Korrespondenz — Sie stellen eine Frage und erhalten Dokument und Absatz.",
      delivery: "Interne Suche über Ihr Archiv, ohne dass etwas die Kanzlei verlässt.",
    },
    {
      name: "Forderungen, die liegen bleiben",
      problem: "Die Rechnung ist raus, 45 Tage sind vergangen, die Mahnung wird von Hand geschrieben, wenn jemand daran denkt.",
      solution:
        "Das System verfolgt die Fälligkeit und mahnt nach Ihrem Plan — erst freundlich, dann bestimmter, dann mit Ihrer Unterschrift.",
      delivery: "Forderungsverwaltung mit automatischen Mahnungen.",
    },
    {
      name: "Antwortentwürfe",
      problem: "Dieselbe Art von E-Mail wird immer wieder geschrieben und jedes Mal anders formuliert.",
      solution: "Ein Entwurf aus Ihren früheren Antworten und Ihrem Tonfall, den Sie überarbeiten, statt bei Null zu beginnen.",
      delivery: "Vorlagen und Entwürfe in Ihrem Postfach.",
    },
  ],
  sections: [
    {
      heading: "Warum das weniger riskant ist, als es klingt",
      body: [
        "In Steuerberatung und Recht ist die erste Reaktion, dass eine Maschine nicht entscheiden darf. Richtig — und sie entscheidet auch nicht. Hier laufen Übertragung und Suche, zwei Aufgaben, bei denen ein Mensch umso mehr Fehler macht, je länger der Tag wird. Alles unterhalb der Sicherheitsschwelle geht zur Bestätigung, und Beurteilung und Unterschrift bleiben in jedem Fall bei Ihnen.",
      ],
    },
    {
      heading: "Wo die Daten liegen",
      body: [
        "Für eine Kanzlei, die mit fremden Finanzen und fremden Verfahren arbeitet, ist die Frage, wohin Daten wandern, keine technische Kleinigkeit, sondern Geschäftsvoraussetzung. Für sensible Teile wird deshalb Verarbeitung eingesetzt, die Ihre Infrastruktur nicht verlässt, und für den Rest wird genau festgelegt, was übermittelt und was gespeichert wird. Das wird vereinbart, bevor irgendetwas eingerichtet wird.",
      ],
    },
  ],
  howTo: {
    name: HOW_TO_NAME,
    steps: [
      {
        name: "Eine Stunde Gespräch",
        text: "Wir zählen, wie viele Stunden im Monat auf Erfassung und auf Mandantenantworten entfallen.",
      },
      {
        name: "Eine Aufgabe, nicht alle",
        text: "Fast immer die Eingangsbelege — dort liegt die meiste Wiederholung.",
      },
      {
        name: "Einführung in zwei bis vier Wochen",
        text: "Umgesetzt auf Ihren Belegarten und Ihrer Software.",
      },
      {
        name: "Zwei Wochen Parallelbetrieb",
        text: "Die manuelle Erfassung bleibt, bis die Genauigkeit an echten Belegen eines Mandanten gemessen ist.",
      },
      {
        name: "Die nächste Aufgabe",
        text: "Dann Mandantenportal und Fristen.",
      },
    ],
  },
  faq: [
    {
      q: "Gehen die Daten unserer Mandanten an OpenAI oder einen ähnlichen Dienst?",
      a: "Das hängt von der Vereinbarung ab und wird vor der Einrichtung festgelegt. Für sensible Teile gibt es Verarbeitung, die auf Ihrer Infrastruktur bleibt. Wird ein externer Dienst genutzt, ist genau bestimmt, welche Daten übermittelt werden, wie lange sie gespeichert bleiben und ob sie zum Training verwendet werden.",
    },
    {
      q: "Wie zuverlässig ist das Lesen von Rechnungen?",
      a: "Bei sauberen, gedruckten Belegen sehr zuverlässig. Beim Foto eines zerknitterten Kassenbons weniger. Deshalb ist die Sicherheitsschwelle einstellbar, und alles darunter geht an einen Menschen.",
    },
    {
      q: "Ersetzt das unsere Buchhaltungssoftware?",
      a: "Nein. Es steht davor und füllt sie mit sauberen Daten. Die Software bleibt, wo sie ist.",
    },
    {
      q: "Unsere Mandanten schicken Belege per Messenger, und das ändert sich nicht.",
      a: "Das muss es auch nicht. Nachrichten mit Belegen lassen sich automatisch entgegennehmen und verarbeiten, sodass das Portal eine Option für die bleibt, die Ordnung wollen.",
    },
  ],
  relatedServices: [
    { label: "Interne Geschäftsanwendungen", href: "/our-services/interne-poslovne-aplikacije" },
    { label: "IT-Sicherheit und DSGVO", href: "/our-services/cyber-security-gdpr" },
  ],
};

export const aiPagesDe: AiPage[] = [
  salonsClinics,
  transportLogistics,
  hospitality,
  ecommerce,
  realEstate,
  education,
  manufacturing,
  automotive,
  professionalServices,
];

export const aiIndexDe: AiIndexCopy = {
  path: "/ai",
  eyebrow: "KI nach Branche",
  title: "KI für Unternehmen — was sie konkret leistet, nach Branche",
  metaDescription:
    "Was künstliche Intelligenz in kleinen und mittleren Unternehmen wirklich leistet, aufgeschlüsselt nach Branchen: Salons, Transport, Gastronomie, Onlinehandel, Immobilien, Bildung, Produktion, Werkstätten, Kanzleien.",
  h1: "KI für Unternehmen, nach Branche",
  lead:
    "Niemand kauft „KI\". Gekauft werden weniger Telefonate, ein schnelleres Angebot und weniger Abtippen. Diese Seiten zeigen, welche Aufgabe das in Ihrer Branche genau ist — und welche sich zuerst rechnet.",
  answer:
    "Für ein kleines oder mittleres Unternehmen ist KI heute an vier Stellen brauchbar: Sie nimmt Anfragen entgegen und qualifiziert sie, wenn niemand aufs Telefon schaut, erstellt aus Ihrer Preisliste in Minuten ein Angebot, liest Belege aus dem Foto, statt sie abtippen zu lassen, und beantwortet die Fragen, die sich täglich wiederholen. Was davon zuerst ansteht, ist keine Technikfrage, sondern eine Branchenfrage — im Salon die Terminbuchung, in der Spedition Angebot und Belege, im Onlineshop der Katalog, in der Kanzlei die Eingangsbelege.",
  keywords: [
    "KI für Unternehmen",
    "künstliche Intelligenz Mittelstand",
    "Automatisierung KMU",
    "wie hilft KI kleinen Unternehmen",
    "KI nach Branche",
  ],
  sections: [
    {
      heading: "Vier Aufgaben, die es in jeder Branche gibt",
      bullets: [
        "Anfragen entgegennehmen und qualifizieren — damit die Antwort nicht bis morgen wartet.",
        "Angebot und Kalkulation aus Ihren Preisen — damit der Auftrag nicht an den Schnelleren geht.",
        "Belege lesen — damit abends nichts abgetippt wird.",
        "Wiederkehrende Fragen beantworten — damit das Telefon nur klingelt, wenn es soll.",
      ],
      body: [
        "Alles andere ist eine Abwandlung dieser vier. Der Unterschied zwischen Branchen liegt nicht darin, was möglich ist, sondern darin, welche der vier Sie derzeit am meisten kostet.",
      ],
    },
    {
      heading: "Woran Sie erkennen, ob es sich lohnt",
      body: [
        "Ein Maßstab, ohne Taschenrechner: Wenn jemand im Unternehmen dieselbe Aufgabe länger als eine Stunde am Tag erledigt und diese Aufgabe Genauigkeit statt Urteilsvermögen verlangt — dann lohnt es sich. Verlangt sie Urteil, Einschätzung oder die Beziehung zu einem Menschen, lohnt es sich nicht und sollte gar nicht erst versucht werden.",
      ],
    },
  ],
  faq: [
    {
      q: "Was kostet die Einführung von KI in einem kleinen Unternehmen?",
      a: "Das hängt davon ab, wie viele Aufgaben automatisiert werden und ob es ein System gibt, an das sich das anschließen lässt. Eine abgeschlossene Aufgabe — etwa Terminbuchung oder Belegverarbeitung — ist ein kleineres Projekt als eine Website. Die genaue Zahl steht nach dem Gespräch im Angebot, denn eine Pauschalsumme trifft hier immer daneben.",
    },
    {
      q: "Brauchen wir zuerst eine Website und dann KI?",
      a: "Nicht zwingend. Terminbuchung, Belegverarbeitung und interne Werkzeuge funktionieren auch ohne. Eine Website wird gebraucht, wenn KI Anfragen von Fremden entgegennehmen soll.",
    },
    {
      q: "Ersetzt KI Mitarbeitende?",
      a: "In einem Unternehmen mit fünf bis dreißig Beschäftigten so gut wie nie. Sie ersetzt den Teil der Arbeit, den niemand mag und der nach Feierabend erledigt wird. Unternehmen dieser Größe haben selten zu viele Menschen, sondern zu wenig Zeit.",
    },
    {
      q: "Was, wenn meine Branche nicht aufgeführt ist?",
      a: "Das Muster bleibt gleich — die vier Aufgaben oben gibt es überall. Sagen Sie, was sich in Ihrem Unternehmen täglich wiederholt, und Sie bekommen eine Antwort darauf, ob es sich lohnt, einschließlich der Antwort, dass es sich nicht lohnt.",
    },
    {
      q: "Arbeiten Sie auch außerhalb Serbiens?",
      a: "Ja. Kunden gibt es in Serbien, in der Region und im DACH-Raum. Die Zusammenarbeit läuft remote, mit Terminen vor Ort in Niš, wo es hilft.",
    },
  ],
};
