import type { ServiceDetailTranslation } from "./serviceDetail.i18n";

/**
 * German copy for /de/our-services/<slug>.
 *
 * Keys are the Serbian slugs, which stay the live URLs in every language.
 * Prices are intentionally left out — see the note in serviceDetail.i18n.ts.
 */
export const serviceDetailDe: Record<string, ServiceDetailTranslation> = {
  "web-prezentacije": {
    h1: "Websites und Unternehmensauftritte",
    intro:
      "Schnelle, handgeschriebene Websites, die ein Besucher in Sekunden versteht und die Suchmaschinen ohne Hilfe lesen können.",
    overview:
      "Wir bauen moderne Web-Auftritte aus Niš, Serbien: Unternehmenswebsites, Landingpages, Blogs, Headless CMS, PWA und Core Web Vitals. White-Label oder direkt mit dem Kunden — ein Team von der Strategie bis in die Produktion.",
    tags: ["Website-Erstellung", "Next.js", "Technisches SEO", "CMS", "PWA", "Core Web Vitals"],
    bestFor: [
      "Unternehmen, deren Website zu wenige relevante Anfragen bringt.",
      "Firmen, die eine schnelle Website, ein CMS und eine klare SEO-Struktur brauchen.",
      "Teams, die einen Partner für Strategie, Design, Entwicklung und Messung wollen.",
    ],
    deliverables: [
      "Eine Seitenstruktur entlang der Kaufabsicht und der Leistungen, die Sie tatsächlich verkaufen.",
      "Eine Mobile-First-Website in Next.js, technisches SEO, Schema und angebundene Analytics.",
      "Ein Kontaktweg, der die Quelle jeder Anfrage erfasst — bereit für Ads-Optimierung.",
    ],
    proofResults: {
      "Prevoz Kop": "Eine SEO-Website, verbunden mit dem Vertriebs- und Betriebssystem dahinter.",
    },
    faq: [
      {
        q: "Was kostet eine Website?",
        a: "Das hängt vom Umfang ab — Seitenanzahl, Integrationen und ob die Texte von Ihnen oder von uns kommen. Wir kalkulieren nach einem kurzen Gespräch, sobald der Umfang klar ist, und der Preis gilt für diesen Umfang.",
      },
      {
        q: "Wie lange dauert eine Website?",
        a: "Ein typisches Projekt läuft 3–6 Wochen vom Kick-off bis zum Launch, je nach Seitenzahl und Integrationen.",
      },
      {
        q: "Lässt sich die Website ohne Entwickler pflegen?",
        a: "Ja — jede Website kommt mit einem CMS, in dem Sie Texte, Bilder und Beiträge selbst ändern.",
      },
      {
        q: "Ist die Website für Mobilgeräte optimiert?",
        a: "Jede Website, die wir bauen, ist Mobile-First und besteht die Google Core Web Vitals ohne Kompromisse.",
      },
      {
        q: "Ist SEO in der Erstellung enthalten?",
        a: "Grundlegendes On-Page-SEO ist immer dabei — Meta-Tags, strukturierte Daten und eine Sitemap.",
      },
    ],
  },

  "e-commerce-web-shop": {
    h1: "E-Commerce- und Webshop-Entwicklung",
    intro:
      "Individuelle und Headless-Shops, in denen Zahlungen, Lager, Abos und CRM in einem System liegen statt in vieren.",
    overview:
      "Wir konzipieren und entwickeln individuelle und Headless-Shops: Zahlungen, Lager, Abos, Loyalty, CRM und KI-Empfehlungen. Adspire verbindet Backend, Administration und einen Storefront, der verkauft.",
    tags: ["Webshop", "Headless Commerce", "Zahlungen", "Lager", "Abos", "CRM"],
    bestFor: [
      "Marken, die einen eigenen Vertriebskanal und Kontrolle über das Kauferlebnis wollen.",
      "Shops, bei denen eine Standardplattform Katalog, Checkout oder Betrieb einschränkt.",
      "Teams, die Verkauf, Lager, Bestellungen und Verwaltung miteinander verbinden müssen.",
    ],
    deliverables: [
      "Katalog, Warenkorb, Checkout und Administration entlang Ihres realen Verkaufswegs.",
      "Integrationen für Zahlung, Versand, Lager und CRM je nach Projektbedarf.",
      "Funnel-Messung und eine technische SEO-Basis für Kategorien und Produkte.",
    ],
    proofResults: {
      "Santos Santorini": "Ein Webshop und eine Admin-Plattform für Verkauf, Lager und Bestellungen.",
    },
    faq: [
      {
        q: "Was kostet ein Webshop?",
        a: "Das hängt von Katalog, Integrationen und davon ab, ob Sie Abos oder Loyalty brauchen. Wir kalkulieren nach einem kurzen Gespräch — ein MVP-Shop und ein vollständiges Commerce-System sind sehr verschiedene Projekte.",
      },
      {
        q: "Welche Zahlungsanbieter unterstützen Sie?",
        a: "Wir integrieren Stripe, PayPal, Monri und lokale Anbieter — passend zum Markt, in dem Sie verkaufen.",
      },
      {
        q: "Kann der Shop das Lager verwalten?",
        a: "Ja — wir bauen ein Lagermodul, das sich mit dem Admin-Panel und optional mit einem externen ERP synchronisiert.",
      },
      {
        q: "Wie lange dauert ein Webshop?",
        a: "Ein MVP-Shop ist in 4–8 Wochen fertig; ein vollständiges System mit CRM und Automatisierung braucht 10–16 Wochen.",
      },
      {
        q: "Können Sie ein Abo-Modell umsetzen?",
        a: "Ja — Abonnements und wiederkehrende Abrechnung sind Standard, inklusive Testphasen und flexibler Tarife.",
      },
    ],
  },

  "mobilne-aplikacije": {
    h1: "Mobile- und PWA-Entwicklung",
    intro:
      "PWA, wenn es schnell gehen muss; nativ, wenn die Hardware des Telefons zählt. Wir klären das, bevor Sie zahlen.",
    overview:
      "PWAs für den schnellen Start ohne App-Store-Reibung und native Apps (Flutter / React Native) mit Zahlungen, Push und GPS. Adspire deckt den ganzen Lebenszyklus vom Design bis zur Produktion ab.",
    tags: ["PWA", "Flutter", "React Native", "iOS", "Android", "Push-Benachrichtigungen"],
    bestFor: [
      "Unternehmen, die mobilen Zugriff auf Buchungen, Verkauf oder interne Arbeit brauchen.",
      "Teams, die ein Produkt als PWA prüfen wollen, bevor sie zwei native Apps bezahlen.",
      "Produkte, bei denen Push, Kamera, Standort oder Offline-Nutzung wirklich zählen.",
    ],
    deliverables: [
      "Die Entscheidung PWA oder nativ, hergeleitet aus Funktionen, Budget und Vertriebsplan.",
      "UX für kleine Bildschirme, API-Integration und sichere Nutzerverwaltung.",
      "Gerätetests, Produktivfreigabe und ein Wartungsplan für die App.",
    ],
    faq: [
      {
        q: "Was kostet eine mobile App?",
        a: "Eine PWA und ein nativer Build für iOS und Android liegen weit auseinander. Wir kalkulieren, sobald klar ist, was Ihre Funktionsliste tatsächlich verlangt.",
      },
      {
        q: "Was ist der Unterschied zwischen PWA und nativer App?",
        a: "Eine PWA läuft im Browser und braucht keine Store-Installation — schneller startklar. Nativ geht tiefer in die Hardware des Telefons.",
      },
      {
        q: "Muss die App in den App Store und zu Google Play?",
        a: "Bei einer PWA nicht. Bei nativen Apps übernehmen wir den gesamten Einreichungsprozess in beiden Stores für Sie.",
      },
      {
        q: "Wie lange dauert eine mobile App?",
        a: "Eine PWA ist in 3–5 Wochen fertig; ein natives Projekt braucht 8–14 Wochen je nach Funktionsumfang.",
      },
      {
        q: "Funktioniert die App ohne Internet?",
        a: "PWAs und native Apps können Kernfunktionen offline ausführen — über Caching und eine lokale Datenbank.",
      },
    ],
  },

  "cms-sistemi": {
    h1: "Individuelle CMS-Systeme und Admin-Panels",
    intro:
      "Ein Redaktionssystem entlang Ihres Prozesses, nicht entlang eines Plugin-Marktplatzes.",
    overview:
      "Wir bauen ein CMS, das zum Prozess des Kunden passt: rollenbasierter Zugriff, Blog, Medien, SEO-Felder und Dashboards, die Sinn ergeben. Adspire drängt kein generisches Panel auf, wo es nicht passt.",
    tags: ["Individuelles CMS", "Headless CMS", "Admin-Panel", "Rollen", "Inhaltsmodell", "API"],
    bestFor: [
      "Teams, denen ein generisches CMS das Veröffentlichen erschwert oder zu viele Add-ons abverlangt.",
      "Unternehmen mit Rollen, Freigabeprozessen und speziellen SEO-Feldern.",
      "Plattformen, die denselben Inhalt auf Website, App oder mehreren Kanälen brauchen.",
    ],
    deliverables: [
      "Ein Inhaltsmodell und ein Redaktionsablauf für die Menschen, die damit arbeiten werden.",
      "Rollen, Medien, Versionen, SEO-Felder und eine Vorschau vor der Veröffentlichung.",
      "Eine dokumentierte API und eine Administration ohne Füllfunktionen und Plugin-Abhängigkeiten.",
    ],
    faq: [
      {
        q: "Warum ein individuelles CMS statt WordPress?",
        a: "WordPress passt für Blogs. Unternehmen mit einem eigenen Prozess bekommen ein CMS, das genau diesem Ablauf folgt — ohne einen Stapel Plugins, der alles zusammenhält.",
      },
      {
        q: "Wer kann das Admin-Panel nutzen?",
        a: "Wir bauen rollenbasierten Zugriff — Administrator, Redakteur und Betrachter bekommen jeweils das, was ihre Verantwortung verlangt.",
      },
      {
        q: "Kann das CMS mehrere Sprachen verwalten?",
        a: "Ja, Mehrsprachigkeit ist Standard — Inhalte werden je Sprache über dieselbe Oberfläche gepflegt.",
      },
      {
        q: "Wie lange dauert ein individuelles CMS?",
        a: "Ein Basis-CMS mit Blog und Medien ist in 4–6 Wochen fertig; Systeme mit Freigabe-Workflows brauchen 8–12 Wochen.",
      },
      {
        q: "Lässt sich das CMS in eine bestehende Website integrieren?",
        a: "Ja — der Headless-Ansatz bedeutet, dass das CMS Inhalte über eine API liefert, die sich an Ihr bestehendes Frontend anschließt.",
      },
    ],
  },

  "interne-poslovne-aplikacije": {
    h1: "Unternehmenssoftware und interne Anwendungen",
    intro:
      "Was heute per Tabelle, Nachricht und Telefon läuft, in einem System, das es sich für Sie merkt.",
    overview:
      "Internes CRM, Kalender, Aufgabenverwaltung, Erfassung, Rechnungsstellung und Integrationen mit den APIs, die Sie schon betreiben. Adspire verbindet Teams und nimmt Handarbeit heraus.",
    tags: ["Individuelles CRM", "Interne Tools", "Dashboards", "Rechnungen", "Automatisierung", "API-Integration"],
    bestFor: [
      "Unternehmen, die dieselben Daten über Excel, Nachrichten und mehrere Tools abtippen.",
      "Teams, bei denen ein generisches CRM oder ERP dem echten Prozess nicht folgt.",
      "Inhaber ohne einen einzigen Blick auf Verkauf, Aufgaben, Termine und Betrieb.",
    ],
    deliverables: [
      "Eine Prozesslandkarte und ein priorisiertes MVP, das zuerst den teuersten Engpass löst.",
      "Rollen, Änderungshistorie, Dashboards und Integrationen mit Ihren bestehenden Quellen.",
      "Eine modulare Basis, die sich erweitern lässt, ohne das ganze System zu ersetzen.",
    ],
    proofResults: {
      "Prevoz Kop": "Vertrieb und Betrieb in einem einzigen System zusammengeführt.",
      TeachFromHome: "Messbares Onboarding und Kandidatenbearbeitung in einer Anwendung.",
      "Dr Igić": "Termine, Kunden und Klinikverwaltung in einer Webanwendung.",
    },
    faq: [
      {
        q: "Warum ein eigenes CRM bauen statt eines kaufen?",
        a: "Standardlösungen bringen Funktionen mit, die Sie nie nutzen werden. Ein individuelles CRM folgt genau Ihrem Vertriebsprozess, ohne etwas im Weg.",
      },
      {
        q: "Lässt sich eine interne Anwendung mit Excel oder Google Sheets verbinden?",
        a: "Ja — Import und Export sind dabei, und wir können direkt aus Google Sheets lesen, wenn das heute Ihr Arbeitsweg ist.",
      },
      {
        q: "Unterstützt die Anwendung mehrere Nutzer gleichzeitig?",
        a: "Jede interne Anwendung wird mehrbenutzerfähig gebaut, mit rollenbasiertem Zugriff und Änderungshistorie.",
      },
      {
        q: "Was kostet eine interne Unternehmensanwendung?",
        a: "Ein Erfassungs- oder Aufgabentool und ein CRM mit Rechnungsstellung und API-Integrationen sind verschiedene Projekte. Wir klären den Umfang und kalkulieren dann.",
      },
      {
        q: "Was passiert, wenn später neue Funktionen nötig sind?",
        a: "Jedes System ist modular — neue Module kommen dazu, ohne die bestehende Architektur zu brechen, unter einem vereinbarten SLA für Änderungen.",
      },
    ],
  },

  "ai-integracije-automatizacija": {
    h1: "KI-Chatbots und Geschäftsautomatisierung",
    intro:
      "KI, angeschlossen an die Systeme, die Sie bereits betreiben — gemessen an gesparten Stunden und bearbeiteten Anfragen, nicht daran, wie beeindruckend die Demo war.",
    overview:
      "KI in Vertrieb, Support, Content und SEO; Lead-Scoring, Voice-Agenten und n8n-Workflows. Adspire verbindet die Modelle mit Ihrem CRM und Ihren Websites — ohne Demo-Effekt.",
    tags: ["KI-Chatbot", "n8n", "LLM-Integration", "Lead-Scoring", "Voice-Agenten", "Workflow-Automatisierung"],
    bestFor: [
      "Teams, die täglich dieselben Antworten, Eingaben und Prüfungen wiederholen.",
      "Unternehmen, die KI mit bestehender Website, CRM oder Wissensbasis verbinden wollen.",
      "Prozesse, deren Ergebnis sich in Zeit, bearbeiteter Menge oder vermiedenen Fehlern messen lässt.",
    ],
    deliverables: [
      "Eine Prozessanalyse und eine ehrliche Prüfung, wo KI wirklich messbaren Wert bringt.",
      "Workflows, Integrationen, Eskalationsregeln und Kontrolle über den Datenzugriff.",
      "Testszenarien, Monitoring und Dokumentation für den Betrieb nach dem Go-live.",
    ],
    faq: [
      {
        q: "Was kann ein KI-Chatbot für mein Unternehmen tun?",
        a: "Er übernimmt die erste Support-Linie — beantwortet häufige Fragen, qualifiziert Leads und bucht Termine rund um die Uhr, ohne Personal zu binden.",
      },
      {
        q: "Was kostet KI-Automatisierung?",
        a: "Ein Starter-Set aus n8n-Workflows und einem Chatbot ist ein anderes Projekt als Voice-Agenten am CRM. Wir klären zuerst den Prozess und kalkulieren dann.",
      },
      {
        q: "Kann KI Inhalte für meine Website schreiben?",
        a: "Ja — wir binden KI in Ihren Content-Ablauf ein, vom Entwurf über die SEO-Arbeit bis zur Veröffentlichung über Ihr CMS.",
      },
      {
        q: "Mit welchen CRM-Systemen lässt sich KI verbinden?",
        a: "HubSpot, Notion, Airtable und individuelle CRMs über deren APIs — die Abläufe laufen ohne manuelle Eingabe.",
      },
      {
        q: "Brauchen KI-Lösungen laufende Wartung?",
        a: "Modelle und Prompts werden nachjustiert, wenn sich das Geschäft ändert. Ein monatliches Monitoring-Paket hält den Betrieb stabil.",
      },
    ],
  },

  "ai-preporuka": {
    h1: "KI-SEO und Sichtbarkeit in KI-Empfehlungen",
    intro:
      "Seiten, Belege und strukturierte Daten so vorbereiten, dass ein Assistent einen belastbaren Grund hat, Sie zu nennen.",
    overview:
      "KI-Empfehlungsfähigkeit ist für Unternehmen, die die klarere Wahl sein wollen, wenn jemand einen Assistenten fragt — welche Tischlerei Einbauküchen baut, welcher Salon online buchbar ist, welche Klinik eine Behandlung anbietet, welche Agentur eine Webanwendung bauen kann. Wir bringen öffentliche Seiten, FAQ, strukturierte Daten, Belege, lokale Signale und ein KI-lesbares Profil in Ordnung, damit KI-Systeme verlässlicheren Kontext haben.",
    tags: ["KI-SEO", "Generative Engine Optimization", "Entity-Schema", "FAQ", "Lokale Signale", "llms.txt"],
    bestFor: [
      "Unternehmen, die Google und KI-Systeme nicht klar mit Leistung und Ort verbinden.",
      "Firmen mit echten Ergebnissen, aber ohne öffentliche Seiten, die diese Belege erklären.",
      "Lokale Dienstleistungen, die Kunden zunehmend über eine Frage statt über eine Suche finden.",
    ],
    deliverables: [
      "Eine Karte der Fragen, Leistungen, Orte und öffentlichen Belege, für die Sie relevant sein können.",
      "Leistungsseiten, FAQ, Entity-Schema, lokale Signale und ein faktisches KI-Profil.",
      "Messung von KI-Referral-Besuchen und Anfragen — ohne Versprechen einer bestimmten Empfehlung oder Position.",
    ],
    faq: [
      {
        q: "Können Sie garantieren, dass KI mein Unternehmen empfiehlt?",
        a: "Nein. Eine bestimmte KI-Antwort kann niemand seriös garantieren. Was wir tun können: Daten, Seiten, Belege und Struktur so ordnen, dass ein Assistent einen klareren Grund hat, Sie bei einer relevanten Frage zu berücksichtigen.",
      },
      {
        q: "Was gehört zu dieser Arbeit?",
        a: "Zuerst definieren wir, für welche Fragen Sie eine Empfehlung sein sollen. Dann arbeiten wir an den Leistungsseiten, den Fragen und Antworten, den Belegen, lokalen Signalen, strukturierten Daten, dem KI-Profil und der Messung von Besuchen aus KI und Suche.",
      },
      {
        q: "Wie sähe das für eine Klinik oder einen Salon aus?",
        a: "Für einen Salon oder eine Klinik würden wir Behandlungen, Termine, Ergebnisse, Ort, Erfahrung und die konkreten Gründe für eine Empfehlung aufbereiten. Für eine Tischlerei: Einbauküchen, Schränke, Ort, Materialien, ausgeführte Arbeiten und häufige Fragen.",
      },
      {
        q: "Für welche Unternehmen lohnt sich das?",
        a: "Für die, nach denen Menschen mit einer Frage suchen: welchen Salon buchen, welche Klinik macht eine Behandlung, wer baut Webshops, wer baut Buchungssysteme, welche Agentur kann eine Anwendung entwickeln.",
      },
      {
        q: "Wie wird das Ergebnis gemessen?",
        a: "Indexierte Seiten, Referral-Besuche aus KI und Suche, Anfragen aus neuen Landingpages, Positionen für frageförmige Suchanfragen und die Konversionsqualität. Der Fokus liegt auf Anfragen, nicht auf Impressionen.",
      },
    ],
  },

  "business-intelligence-analitika": {
    h1: "BI-Dashboards und Geschäftsanalytik",
    intro:
      "Ein Ort, der zeigt, wo verdient wird und wo Geld versickert — statt fünf Tabs und einer Tabelle.",
    overview:
      "Dashboards für Inhaber, KPI-Verfolgung, Vertriebs- und CRM-Analytik sowie monatliche Berichte. Adspire baut Ansichten, die an echten Datenquellen hängen, nicht an einem manuellen Export.",
    tags: ["Business Intelligence", "KPI-Dashboard", "Vertriebsanalytik", "Reporting", "Datenmodell"],
    bestFor: [
      "Inhaber, die Vertriebs-, Marketing- und Betriebsdaten in mehreren Systemen lesen.",
      "Teams, die Berichte täglich oder monatlich von Hand in Tabellen zusammenbauen.",
      "Unternehmen, die klar definierte KPIs und Verantwortung für das Ergebnis brauchen.",
    ],
    deliverables: [
      "KPI-Definitionen und ein einheitliches Datenmodell — vereinbart, bevor ein Dashboard entworfen wird.",
      "Anbindung von CRM, Analytics, Datenbanken, Tabellen und weiteren verfügbaren Quellen.",
      "Dashboards je Rolle, automatische Berichte und Prüfungen der Datenqualität.",
    ],
    faq: [
      {
        q: "Was lässt sich über ein BI-Dashboard verfolgen?",
        a: "Vertriebskennzahlen, Web-Traffic, Konversionen, CRM-Aktivitäten und finanzielle KPIs — aus einer Oberfläche.",
      },
      {
        q: "Arbeitet das Dashboard in Echtzeit?",
        a: "Die Daten aktualisieren sich in dem Intervall, das Sie festlegen — von wenigen Minuten bis einmal täglich, je nach Quelle.",
      },
      {
        q: "Mit welchen Datenquellen lässt es sich verbinden?",
        a: "Google Analytics, Meta Ads, CRMs, SQL-Datenbanken, Google Sheets und individuelle APIs, konsolidiert in einer Ansicht.",
      },
      {
        q: "Was kostet ein BI-Dashboard?",
        a: "Ein Starter-Dashboard mit einigen KPI-Widgets und ein vollständiges Analysesystem mit mehreren Quellen sind verschiedene Projekte. Wir kalkulieren, sobald Quellen und KPIs feststehen.",
      },
      {
        q: "Lassen sich monatliche Berichte automatisch erzeugen?",
        a: "Ja — das System kann PDF-Berichte zu einem festen Termin an Ihr Team oder Ihre Gesellschafter mailen.",
      },
    ],
  },

  "seo-digitalni-marketing": {
    h1: "SEO und digitales Marketing",
    intro:
      "Technisches SEO, bezahlte Suche und CRO als ein Plan — gemessen an Anfragen, nicht an Klicks.",
    overview:
      "Technisches und On-Page-SEO, KI-Unterstützung für Inhalte, Google- und Meta-Kampagnen, CRO und A/B-Tests. Adspire bringt Website, Analytics und Anzeigen in einen Plan.",
    tags: ["Technisches SEO", "On-Page-SEO", "Google Ads", "Meta Ads", "CRO", "A/B-Tests"],
    bestFor: [
      "Unternehmen mit einer Website, die Kunden für die relevanten Leistungen nicht finden.",
      "Firmen, die Suchkampagnen an Anfragen und Umsatz messen wollen, nicht an Klicks.",
      "Teams, die einen gemeinsamen Plan für technisches SEO, Inhalte und Landingpages brauchen.",
    ],
    deliverables: [
      "Ein technisches Audit, eine Karte der zentralen Suchabsichten und Prioritäten nach Geschäftswert.",
      "On-Page-Änderungen, interne Verlinkung, Schema, lokale Signale und ein Inhaltsplan.",
      "Ads-fähige Konversionen, Kampagnen je Leistung, Negativ-Keywords und Iteration an echten Leads.",
    ],
    faq: [
      {
        q: "Wie lange dauert es, bis SEO wirkt?",
        a: "Erste Positionsveränderungen zeigen sich meist in 2–3 Monaten; stabiles organisches Wachstum baut sich über 6–12 Monate auf.",
      },
      {
        q: "Was ist der Unterschied zwischen technischem und On-Page-SEO?",
        a: "Technisches SEO betrifft Geschwindigkeit, Struktur und Indexierung. On-Page-SEO betrifft Inhalte, Überschriften und interne Links für die Zielanfragen.",
      },
      {
        q: "Betreuen Sie Google-Ads-Kampagnen?",
        a: "Ja — wir richten Google Search- und Display-Kampagnen ein, optimieren sie und berichten monatlich über Ausgaben und Konversionen.",
      },
      {
        q: "Was kostet SEO?",
        a: "Ein einmaliges technisches Audit mit Umsetzung ist etwas anderes als ein monatliches Retainer-Modell. Wir kalkulieren, nachdem wir Website und Markt gesehen haben.",
      },
      {
        q: "Machen Sie A/B-Tests auf Landingpages?",
        a: "Ja — CRO und A/B-Tests gehören zum erweiterten Paket. Wir testen Überschriften, CTAs und Layout bis zu einem statistisch signifikanten Gewinner.",
      },
    ],
  },

  "cyber-security-gdpr": {
    h1: "Security-Audit und DSGVO-Vorbereitung",
    intro:
      "Ein schriftliches Bild davon, wo eine Website oder Anwendung angreifbar ist — und die Arbeit, das zu schließen.",
    overview:
      "Security-Audits, DSGVO und Cookie-Consent, Backups, Monitoring und Verschlüsselung, wo sie ihren Platz verdient. Adspire hilft, Website und Formulare in Einklang mit der Praxis zu bringen.",
    tags: ["Security-Audit", "DSGVO", "Cookie-Consent", "Backups", "Monitoring", "Datenschutz"],
    bestFor: [
      "Websites und Anwendungen, die Kontakt-, Nutzer- oder Geschäftsdaten verarbeiten.",
      "Teams ohne klaren Überblick über Zugriffe, Backups und Systemabhängigkeiten.",
      "Unternehmen, die Analytics oder Werbung einführen und Datenschutz und Nutzerwahl regeln müssen.",
    ],
    deliverables: [
      "Eine technische Prüfung der Anwendung, ihrer Abhängigkeiten, Authentifizierung und Infrastrukturkonfiguration.",
      "Ein priorisierter Bericht mit Belegen, Risiko und konkreten Schritten zur Behebung.",
      "Technische Umsetzung von Datenschutz, Consent, Backups und Monitoring im vereinbarten Umfang.",
    ],
    faq: [
      {
        q: "Muss meine Website DSGVO-konform sein?",
        a: "Wenn Sie personenbezogene Daten von Besuchern erheben — E-Mail, Name, Cookies — ist Konformität für alle, die EU-Nutzer bedienen, nicht optional.",
      },
      {
        q: "Was umfasst ein Security-Audit?",
        a: "Wir prüfen Schwachstellen in Code, Abhängigkeiten, SSL-Konfiguration, Authentifizierung und Servereinstellungen und liefern einen schriftlichen Bericht mit Empfehlungen.",
      },
      {
        q: "Was kostet die DSGVO-Umsetzung?",
        a: "Grundlegende Consent- und Richtlinienarbeit auf einer bestehenden Website ist ein klar umrissener Auftrag; die vollständige Prüfung einer Anwendung nicht. Wir kalkulieren, nachdem wir die Website gesehen haben.",
      },
      {
        q: "Wie funktioniert das Backup-System?",
        a: "Automatische tägliche Backups mit Off-Site-Kopie — nach einem Vorfall ist die Website binnen einer Stunde wiederhergestellt.",
      },
      {
        q: "Bieten Sie Monitoring rund um die Uhr?",
        a: "Ja, Uptime- und Security-Monitoring gibt es als monatliche Leistung, mit Benachrichtigung per E-Mail oder SMS beim ersten Anzeichen.",
      },
    ],
  },

  "hosting-infrastruktura": {
    h1: "Cloud-Hosting und Produktionsinfrastruktur",
    intro:
      "Deployment, Domains, Mail und Backups so aufgesetzt, dass die Übergabe kein Anruf bei uns ist.",
    overview:
      "Cloud- und Server-Deployment, Mailserver, Domain, SSL, Backups und Object Storage. Adspire hält die Dokumentation sauber und die Übergabe vollständig.",
    tags: ["Cloud-Hosting", "Deployment", "SSL", "DNS", "Backups", "Monitoring"],
    bestFor: [
      "Projekte, die verlässliches Deployment, SSL, eine Domain und kontrollierten Zugriff brauchen.",
      "Teams, die ein bestehendes System ohne Dokumentation und mit unklarer Eigentümerschaft übernehmen.",
      "Anwendungen, die Backups, Monitoring und einen Wiederherstellungsplan brauchen.",
    ],
    deliverables: [
      "Produktions- und Testumgebung, sichere Verwaltung von Secrets und automatisiertes Deployment.",
      "DNS, SSL, Backups, Monitoring und Alarme, abgestimmt auf die Kritikalität des Systems.",
      "Dokumentation von Infrastruktur, Zugängen und dem Verfahren für Wiederherstellung oder Übergabe.",
    ],
    faq: [
      {
        q: "Wo hosten Sie die Websites, die Sie bauen?",
        a: "Vercel für Next.js-Projekte, AWS oder DigitalOcean für eigene Server und Hetzner für Kunden, die EU-Datenhaltung brauchen.",
      },
      {
        q: "Kümmern Sie sich um das SSL-Zertifikat?",
        a: "Ja, SSL ist immer enthalten und erneuert sich automatisch — die Website wird nie ohne HTTPS ausgeliefert.",
      },
      {
        q: "Was gehört zur Einrichtung des Mailservers?",
        a: "Geschäftliche E-Mail auf Ihrer Domain, die DNS-Einträge (SPF, DKIM, DMARC) und die Anti-Spam-Konfiguration.",
      },
      {
        q: "Können wir bestehendes Hosting zu Ihnen migrieren?",
        a: "Ja — Website, Mailkonten und Datenbank werden ohne Ausfallzeit migriert, mit vollständiger Übergabedokumentation.",
      },
      {
        q: "Was kostet Hosting im Monat?",
        a: "Das hängt vom Anbieter und der geforderten Verfügbarkeit ab. Eine kleine Website und ein hochverfügbarer Produktionsserver liegen weit auseinander; wir empfehlen ein Setup, sobald die Last bekannt ist.",
      },
    ],
  },

  "saas-razvoj": {
    h1: "SaaS-Plattformen und MVP-Entwicklung",
    intro:
      "Der kürzeste ehrliche Weg von einer Idee zu einem Produkt, für das jemand ein Abo bezahlt.",
    overview:
      "Buchungs-, CRM- und Abo-SaaS, White-Label- und Branchenprodukte. Adspire baut Authentifizierung, Abrechnung und die Admin-Ebene als ein Stück.",
    tags: ["SaaS", "MVP", "Multi-Tenant", "Billing", "White-Label", "Abonnements"],
    bestFor: [
      "Gründer, die ein B2B-Produkt über ein fokussiertes MVP prüfen wollen.",
      "Unternehmen, die eine bestehende Leistung in eine Abo-Plattform überführen.",
      "Produkte, die mandantenfähige Konten, Abrechnung und White-Label-Optionen brauchen.",
    ],
    deliverables: [
      "Validierung des Umfangs, der Nutzerrollen und des kürzesten Wegs zur ersten echten Nutzung.",
      "Authentifizierung, Organisationen, Abrechnung, Administration und grundlegende Produktanalytik.",
      "Eine Architektur, bereit für Iteration, Monitoring und den sicheren Betrieb mehrerer Kunden.",
    ],
    faq: [
      {
        q: "Was ist SaaS und brauche ich das?",
        a: "SaaS heißt, Ihre Kunden erreichen Ihre Software im Browser gegen ein Abo — das Modell für skalierbaren Umsatz ohne Vertriebslogistik.",
      },
      {
        q: "Was kostet ein SaaS-MVP?",
        a: "Ein minimales Produkt mit Authentifizierung und Abrechnung und eine vollständige B2B-Plattform liegen weit auseinander. Wir klären das erste Release und kalkulieren es dann.",
      },
      {
        q: "Unterstützen Sie White-Label-SaaS?",
        a: "Ja — wir bauen mandantenfähige Architektur, in der jeder Kunde eigenes Branding, eine eigene Domain und eine konfigurierte Umgebung bekommt.",
      },
      {
        q: "Wie wird die Abrechnung gelöst?",
        a: "Stripe Billing für Abo-Tarife, Testphasen sowie monatliche und jährliche Zyklen — automatisiert, ohne manuelle Rechnungsstellung.",
      },
      {
        q: "Wie lange dauert eine SaaS-Plattform?",
        a: "Ein MVP startet in 8–12 Wochen; ein vollständiges Produkt mit Administration, Analytik und API braucht 20–30 Wochen je nach Umfang.",
      },
    ],
  },

  "industrijska-resenja": {
    h1: "Branchenspezifische Software",
    intro:
      "Software, zugeschnitten auf den echten Ablauf einer Branche — statt eines generischen Werkzeugs mit angeschraubten Umwegen.",
    overview:
      "Spezialisierte Lösungen für Kliniken, Fitnessstudios, Restaurants, Bau, Fertigung, Kanzleien und Immobilien — Terminbuchung, Kataloge und Betrieb in einem System.",
    tags: ["Branchensoftware", "Kliniken", "Fitnessstudios", "Restaurants", "Bau", "Immobilien"],
    bestFor: [
      "Kliniken, Salons, Bau- und Dienstleistungsunternehmen mit einem eigenen Ablauf.",
      "Organisationen, in denen universelle Software Umwege und Doppeleingaben erzeugt.",
      "Teams, die den Prozess standardisieren wollen, bevor weitere Standorte dazukommen.",
    ],
    deliverables: [
      "Ein Prozess-Workshop und ein Datenmodell auf Basis der echten Rollen und Geschäftsregeln.",
      "Ein fokussiertes Betriebssystem für Termine, Erfassung, Verkauf oder Berichte.",
      "Mobiler Zugriff, Rollen, Integrationen und kontrollierte Erweiterung Modul für Modul.",
    ],
    proofResults: {
      "Dr Igić": "Eine Webanwendung entlang des tatsächlichen Ablaufs einer ästhetischen Klinik.",
      "Prevoz Kop": "Der Vertriebs- und Betriebsprozess eines Transportunternehmens, digitalisiert.",
    },
    faq: [
      {
        q: "Bauen Sie Terminsoftware für Kliniken?",
        a: "Ja — ein Buchungssystem für Klinik oder Praxis umfasst Online-Buchung, SMS-Erinnerungen und eine Planansicht je Arzt.",
      },
      {
        q: "Kann ein Restaurant eine digitale Karte und ein Bestellsystem bekommen?",
        a: "Wir bauen QR-Code-Karten, Tischbestellung und die Anbindung an den Küchendrucker.",
      },
      {
        q: "Was bekommt ein Bauunternehmen?",
        a: "Erfassung von Arbeitern, Material und Projektphasen, mit mobilem Zugriff von der Baustelle und automatischen Berichten für die Leitung.",
      },
      {
        q: "Bauen Sie auch für Fitnessstudios?",
        a: "Ja — Mitgliedschaften, Buchung von Gruppenkursen, Anwesenheitserfassung und automatische Verlängerungshinweise.",
      },
      {
        q: "Was kostet Branchensoftware?",
        a: "Das hängt von Branche und Funktionsumfang ab. Eine Starter-Lösung und ein vollständiges Branchensystem sind verschiedene Projekte; wir kalkulieren nach einem Prozessgespräch.",
      },
    ],
  },

  "interaktivne-web-tehnologije": {
    h1: "3D-Web-Auftritte und virtuelle Showrooms",
    intro:
      "Interaktion mit einer Verkaufsaufgabe — ein Produkt, das aus jedem Winkel verstanden wird, bevor das erste Gespräch stattfindet.",
    overview:
      "3D-Web-Auftritte, virtuelle Showrooms, 360°-Ansichten und aufwendige Animationen, die auf dem Telefon schnell bleiben. Adspire verbindet WebGL und Three.js mit UX, die trotzdem konvertiert.",
    tags: ["WebGL", "Three.js", "3D-Web", "Virtueller Showroom", "360°-Produkt", "Motion"],
    bestFor: [
      "Produkte, die ein Käufer aus mehreren Winkeln verstehen muss, bevor er kauft.",
      "Marken, bei denen eine Standardgalerie Raum, Material oder Konfiguration nicht zeigt.",
      "Kampagnen, in denen die Interaktion ein klares Verkaufsziel hat und keine Dekoration ist.",
    ],
    deliverables: [
      "Ein Interaktionsplan und ein Fallback-Erlebnis für schwächere Geräte.",
      "Optimierte 3D-Modelle, eine WebGL-Umsetzung und die Anbindung an Inhalte oder Produkte.",
      "Ein Performance-Budget, Mobiltests und Messung der Interaktionen, die zur Anfrage führen.",
    ],
    faq: [
      {
        q: "Was ist ein 3D-Web-Auftritt und was bringt er?",
        a: "Er zeigt Ihr Produkt oder Ihren Raum interaktiv im Browser — ohne App, ohne Plugins, direkt auf der Website.",
      },
      {
        q: "Funktioniert 3D auf dem Telefon?",
        a: "Ja — jede Szene, die wir bauen, ist für Mobilgeräte optimiert und hält 60 fps auf einem modernen Telefon.",
      },
      {
        q: "Was ist ein virtueller Showroom?",
        a: "Ein Online-Raum, in dem Kunden Produkte in 3D erkunden — passend für Möbel, Fahrzeuge und Architektur.",
      },
      {
        q: "Was kostet ein 3D-Web-Auftritt?",
        a: "Eine einzelne interaktive Szene und ein virtueller Showroom mit mehreren Räumen sind sehr verschiedene Projekte. Wir kalkulieren, sobald Modelle und Umfang feststehen.",
      },
      {
        q: "Bremst 3D die Website aus?",
        a: "Nicht bei sauberer Umsetzung — Lazy Loading und optimierte Modelle halten die Core Web Vitals grün.",
      },
    ],
  },

  "sistemi-za-zakazivanje": {
    h1: "Systeme für die Online-Terminbuchung",
    intro:
      "Termine weg vom Telefon und in einen Kalender, der sich selbst füllt — mit Erinnerungen, die Nichterscheinen senken.",
    overview:
      "Online-Terminbuchung rund um die Uhr für Kliniken, Zahnarztpraxen, Salons, Friseure und Werkstätten: ein öffentlicher Buchungsweg für Kunden, ein Kalender je Mitarbeiter oder Arzt, Erinnerungen per SMS, Viber oder E-Mail, Kundenakten und Behandlungshistorie. In der Produktion bewährt bei Dr Igić (ästhetische Klinik) und Doctor Barber (Buchung rund um die Uhr) — eine bestehende Basis bedeutet rund zwei Wochen bis zum Einsatz, keine Entwicklung von null.",
    tags: [
      "Terminbuchung",
      "Online-Terminvergabe",
      "Klinik-Buchungssoftware",
      "Salon-Buchungs-App",
      "Erinnerungen",
      "Mitarbeiterkalender",
    ],
    bestFor: [
      "Kliniken, Salons, Praxen und Werkstätten, die Termine per Telefon oder im Heft führen.",
      "Teams, die Zeit an verpasste Anrufe, Doppelbuchungen und manuelle Erinnerungen verlieren.",
      "Unternehmen, die Buchung entlang ihrer Leistungen, Mitarbeiter und Standorte brauchen.",
    ],
    deliverables: [
      "Ein öffentlicher Buchungsweg, der auf dem Telefon funktioniert, ohne Registrierung zu erzwingen.",
      "Mitarbeiterkalender, Öffnungszeiten, Leistungen, Mitarbeiter und Verfügbarkeitsregeln.",
      "Bestätigungen, Erinnerungen, Stornierungen und Terminauswertung im vereinbarten Umfang.",
    ],
    proofResults: {
      "Doctor Barber": "Online-Termine und ein Mitarbeiterkalender statt Absprache per Hand.",
      "Dr Igić": "Buchung und Kundenverwaltung für eine ästhetische Klinik.",
    },
    faq: [
      {
        q: "Für wen ist ein Buchungssystem gedacht?",
        a: "Für alle, die nach Terminen arbeiten: Kliniken und Praxen, Zahnärzte, Physiotherapeuten, Friseur- und Kosmetiksalons, Barbiere, Tattoo-Studios, Fitnessstudios und Trainer, Werkstätten, Anwälte und Berater.",
      },
      {
        q: "Was kostet ein Buchungssystem?",
        a: "Wir starten von einer Basis, die bereits produktiv läuft — ein Standardsystem ist damit deutlich günstiger als ein Aufbau von null. Individuelle Arbeit mit Behandlungsakten und Zahlungen kostet mehr. Die Zahl bekommen Sie nach einem kurzen Gespräch.",
      },
      {
        q: "Wie lange dauert die Einführung?",
        a: "Rund zwei Wochen für ein Standardsystem — die Basis läuft bereits bei unseren Kunden (Dr Igić, Doctor Barber) und wird an Ihre Leistungen, Zeiten und Marke angepasst.",
      },
      {
        q: "Verschickt das System Erinnerungen an Kunden?",
        a: "Ja — automatisch per SMS, Viber oder E-Mail vor dem Termin. Das halbiert das Nichterscheinen typischerweise.",
      },
      {
        q: "Können Kunden außerhalb der Öffnungszeiten buchen?",
        a: "Ja, genau darum geht es — die Buchung läuft rund um die Uhr über die Website oder ein Instagram-Profil, und morgens steht ein voller Kalender statt verpasster Anrufe.",
      },
      {
        q: "Können mehrere Mitarbeiter dasselbe System nutzen?",
        a: "Ja — jeder Mitarbeiter oder Arzt hat einen eigenen Kalender und Plan, während der Inhaber die ganze Schicht, die Auslastung und die Berichte an einem Ort sieht.",
      },
    ],
  },
};
