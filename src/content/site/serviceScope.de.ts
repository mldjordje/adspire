import type { ServiceScope } from "./serviceScope";

/**
 * German scope blocks for /de/our-services/<slug>.
 *
 * Keys are the Serbian slugs, which stay the live URLs in every language.
 * Same rule as the Serbian source: every line specific to its own service,
 * because sixteen pages repeating a sentence is duplicate text.
 */
export const serviceScopeDe: Record<string, ServiceScope> = {
  "hotelski-rezervacioni-sistem": {
    notFor: [
      "Sie vermieten eine Wohnung und haben eine Handvoll Buchungen im Monat. Telefon und Booking.com kosten Sie weniger als ein eigenes System.",
      "Sie wollen eine schönere Website, während die Reservierungen weiterhin ausschließlich über OTA-Kanäle laufen.",
      "Niemand pflegt Preise und Kalender; ohne das steht das System leer und der Gast sieht ein falsches Angebot.",
    ],
    beforeQuote: [
      "Wie viele Einheiten Sie vermieten und wie stark sich diese Zahl über die Saison ändert.",
      "Welcher Anteil der Buchungen heute über Provision kommt und was diese Provision Sie im Jahr kostet.",
      "Ob im Voraus, per Anzahlung oder an der Rezeption gezahlt wird.",
      "Wer Termine schließt, wenn Sie ausgebucht sind, und wie schnell das passiert.",
    ],
  },
  "web-prezentacije": {
    notFor: [
      "Sie brauchen eine Seite für eine Kampagne über zwei Wochen. Dafür ist ein fertiger Baukasten günstiger und schneller.",
      "Sie haben weder Fotos noch Texte über die Firma und wollen nicht, dass jemand sie für Sie erstellt.",
      "Die Seite soll existieren, weil die Konkurrenz eine hat, nicht weil sie Anfragen bringen soll.",
    ],
    beforeQuote: [
      "Wer Sie finden soll und was diese Person nach der Landung genau tun soll.",
      "Wer die Texte schreibt und wer sie freigibt. An diesem Schritt bleiben die meisten Projekte hängen.",
      "Ob es eine alte Seite gibt und welche ihrer Adressen den Umzug überleben müssen.",
      "Wie viele Seiten Sie wirklich brauchen, nicht wie viele die alte Seite hatte.",
    ],
  },
  "e-commerce-web-shop": {
    notFor: [
      "Sie verkaufen gut zwanzig Artikel ohne Varianten. Eine fertige Plattform kostet Sie im ersten wie im fünften Jahr weniger.",
      "Verpackung und Versand sind noch nicht geklärt; ein Shop repariert keine Logistik, er beschleunigt sie nur bis zum Bruch.",
      "Sie wollen einen Katalog ohne Zahlung und ohne Lager. Das ist eine Website, kein Shop.",
    ],
    beforeQuote: [
      "Wie viele Artikel und wie viele Varianten pro Artikel (Größe, Farbe, Gebinde).",
      "Woher der Lagerbestand kommt: von Hand, aus der Buchhaltung oder aus einem bestehenden System.",
      "Nachnahme, Karte oder beides, und wer den Vertrag mit der Bank unterschreibt.",
      "Wer die Bestellungen packt und wie diese Person heute erfährt, dass eine neue da ist.",
    ],
  },
  "mobilne-aplikacije": {
    notFor: [
      "Was Sie brauchen, funktioniert bereits im Browser am Telefon. Eine App ist dann nur zusätzlicher Aufwand in zwei Stores.",
      "Sie erwarten, dass die App selbst Nutzer bringt; die Installation ist eine weit größere Hürde als ein Seitenbesuch.",
      "Für die Pflege nach dem Launch gibt es kein Budget, und iOS und Android erzwingen jedes Jahr Änderungen.",
    ],
    beforeQuote: [
      "Wer sie installiert und was diese Person dazu bringt, sie ein zweites Mal zu öffnen.",
      "Ob es nativ sein muss oder eine PWA auf dem Startbildschirm reicht.",
      "Was die App ohne Internetverbindung tut.",
      "Wer die Apple- und Google-Entwicklerkonten hält und wer deren Jahresgebühren zahlt.",
    ],
  },
  "cms-sistemi": {
    notFor: [
      "Sie ändern Inhalte zweimal im Jahr. Ein CMS ist dann eine Schicht, die niemand öffnet.",
      "Jeder soll alles ändern können, Layout und Design eingeschlossen; das endet mit einer Seite, die sich nach drei Monaten nicht mehr ähnelt.",
    ],
    beforeQuote: [
      "Wer Inhalte pflegt und wie oft.",
      "Was geändert werden darf und was gesperrt bleiben muss.",
      "Ob derselbe Inhalt in mehreren Sprachen erscheint und wer übersetzt.",
    ],
  },
  "interne-poslovne-aplikacije": {
    notFor: [
      "Excel erledigt die Arbeit und niemand beschwert sich. Ein Ersatz holt seine Kosten dann nicht herein.",
      "Das Team will seine Arbeitsweise nicht ändern; eine Anwendung, die niemand öffnet, ist der teuerste Posten der Firma.",
      "Sie suchen ein vollständiges ERP mit allen Modulen. Das hier ist ein Werkzeug für einen Ihrer Prozesse, keine Kiste mit allem darin.",
    ],
    beforeQuote: [
      "Welcher eine Prozess heute am meisten weh tut und wer ihn ausführt.",
      "Wie viele Personen sich anmelden und wer was sehen darf.",
      "Was aus den bestehenden Tabellen übernommen werden muss und in welchem Zustand es ist.",
      "Ob das schon einmal jemand versucht hat und warum es nicht geblieben ist.",
    ],
  },
  "ai-integracije-automatizacija": {
    notFor: [
      "Der Prozess, den Sie automatisieren wollen, steht nirgends außer in jemandes Kopf. Erst wird er aufgeschrieben, dann automatisiert.",
      "Sie erwarten, dass KI dort für Sie entscheidet, wo ein Fehler Geld kostet; in solchen Schritten schlägt sie nur vor und ein Mensch bestätigt.",
      "Der Schritt wiederholt sich einige Male im Monat. Von Hand ist immer noch günstiger als eine Automatisierung zu pflegen.",
    ],
    beforeQuote: [
      "Welcher Schritt sich wiederholt und wie oft pro Woche.",
      "Wo die Daten wirklich liegen, die eine Automatisierung lesen würde, und wer den Zugang freigibt.",
      "Was passiert, wenn die Automatisierung falsch liegt, und wer das zuerst sieht.",
      "Wie viele Stunden pro Woche dieser Schritt heute kostet und wem.",
    ],
  },
  "ai-preporuka": {
    notFor: [
      "Ihre Seite steht noch nicht einmal bei Google. Zuerst kommt die grundlegende Indexierung, danach das hier.",
      "Sie haben keine Seite, die eine Kundenfrage beantwortet, nur eine allgemeine Firmenbeschreibung; es gibt nichts zu zitieren.",
      "Sie wollen eine Garantie, dass KI Sie nennt. Das kann niemand versprechen, wir auch nicht.",
    ],
    beforeQuote: [
      "Welche Frage ein Kunde stellt, bevor er überhaupt erfährt, dass es Sie gibt.",
      "Welche drei Firmen heute anstelle von Ihnen genannt werden.",
      "Welche Angaben über Sie wir öffentlich nennen dürfen und wer dafür geradesteht.",
    ],
  },
  "business-intelligence-analitika": {
    notFor: [
      "Drei Systeme sind sich über dieselbe Zahl nicht einig. Solange die Quelle nicht stimmt, zeigt ein Bericht die Uneinigkeit nur hübscher.",
      "Der Bericht wird einmal gebraucht, für eine Präsentation; das ist Arbeit für eine Tabelle, nicht für ein System.",
    ],
    beforeQuote: [
      "Welche Entscheidung Sie anhand dieser Zahl treffen und wie oft.",
      "Wer den Bericht ansieht und was diese Person tut, wenn er schlecht ausfällt.",
      "Wo die Daten tatsächlich liegen, auch das, was in jemandes Postfach steht.",
    ],
  },
  "seo-digitalni-marketing": {
    notFor: [
      "Sie erwarten Platz eins in einem Monat; bei umkämpften Begriffen gibt es das ohne bezahlte Anzeigen nicht.",
      "Die Seite ist langsam und leer, und genau das darf nicht angefasst werden. Dann hat SEO nichts, woran es arbeiten kann.",
      "Es gibt niemanden, der auf eine eingehende Anfrage antwortet; den Besucher zu bringen ist die leichtere Hälfte.",
    ],
    beforeQuote: [
      "Was ein Kunde wirklich eintippt, wenn er sucht, was Sie verkaufen, in seinen eigenen Worten.",
      "Wie viele Anfragen heute pro Woche eingehen und woher.",
      "Wer in der Firma die Angaben bestätigen kann, die wir veröffentlichen werden.",
    ],
  },
  "cyber-security-gdpr": {
    notFor: [
      "Sie wollen ein Papier für den Ordner statt einer Änderung der Arbeitsweise. Das Papier wird Sie nicht verteidigen.",
      "Niemand weiß, wo die Daten liegen oder wer an sie herankommt, und es gibt niemanden zu fragen.",
    ],
    beforeQuote: [
      "Welche personenbezogenen Daten Sie erheben und wo sie nach der ersten Woche landen.",
      "Wer Zugriff auf die Produktion hat und was passiert, wenn diese Person die Firma verlässt.",
      "Was Sie tun, wenn die Datenbank morgen früh weg ist.",
    ],
  },
  "hosting-infrastruktura": {
    notFor: [
      "Die Seite läuft, die Rechnung liegt bei fünf Euro im Monat und niemand beschwert sich.",
      "Sie erwarten, dass ein größerer Server eine Langsamkeit behebt, die aus dem Code kommt; das tut er nicht, er kostet nur mehr.",
    ],
    beforeQuote: [
      "Wie viele Besuche Sie haben und wie die größte Spitze des Jahres aussieht.",
      "Wer heute Domain und DNS hält und ob diese Stelle rechtzeitig antwortet.",
      "Wie viele Minuten Ausfall Sie tatsächlich etwas kosten.",
    ],
  },
  "saas-razvoj": {
    notFor: [
      "Noch kein Nutzer hat gesagt, dass er dafür zahlen würde; eine erste Version baut man für jemanden, der wartet, nicht für einen Markt im Allgemeinen.",
      "Die Idee braucht ein Team von zehn Personen, um überhaupt zu starten. Das ist nicht der erste Schritt, sondern der dritte.",
    ],
    beforeQuote: [
      "Wer der erste zahlende Nutzer ist und wofür genau er zahlt.",
      "Was die kleinste Version ist, die diese Person schon verwenden würde.",
      "Wer das Produkt nach dem Launch übernimmt und mit welchem Wissen.",
    ],
  },
  "industrijska-resenja": {
    notFor: [
      "Maschinen und Waagen haben überhaupt keine Datenausgabe und dürfen nicht angefasst werden. Dann bleibt nur die Eingabe von Hand.",
      "Das gesamte bestehende System im Betrieb soll ersetzt werden; das ist ein Projekt anderer Größe.",
    ],
    beforeQuote: [
      "Was heute von Hand aufgeschrieben wird, auf welchem Blatt, und wer es danach abtippt.",
      "Welche Geräte es gibt und ob eines davon überhaupt ein Signal sendet.",
      "Wer in der Schicht arbeitet, woran, und wie viel Zeit diese Person für eine Eingabe hat.",
    ],
  },
  "interaktivne-web-tehnologije": {
    notFor: [
      "Die Seite soll teuer aussehen, obwohl es nichts zu zeigen gibt; Bewegung füllt keinen leeren Inhalt.",
      "Der Großteil Ihres Publikums nutzt ältere Telefone und schwaches Internet. Dort stößt 3D ab, statt anzuziehen.",
    ],
    beforeQuote: [
      "Was genau zu sehen sein muss und warum ein Foto das nicht zeigen kann.",
      "Ob 3D-Modelle bereits vorhanden sind oder von Grund auf entstehen.",
      "Von welchen Geräten die meisten Ihrer Besuche heute kommen.",
    ],
  },
  "sistemi-za-zakazivanje": {
    notFor: [
      "Sie haben zwei Termine am Tag und das Telefon erledigt das fehlerfrei.",
      "Sie wollen nicht ändern, wie der Kalender heute geführt wird; das System läuft dann parallel zum Heft und beide stimmen nicht.",
      "Sie brauchen nur eine Schaltfläche, die eine E-Mail schickt. Das ist ein Formular, kein Terminsystem.",
    ],
    beforeQuote: [
      "Wie viele Personen Termine annehmen und ob alle dieselben Leistungen anbieten.",
      "Was heute passiert, wenn jemand nicht erscheint.",
      "Ob im Voraus, per Anzahlung oder vor Ort gezahlt wird.",
      "Wie der Tag aussieht, wenn jemand eine Stunde vor dem Termin absagt.",
    ],
  },
  "staticni-sajtovi": {
    notFor: [
      "Der Inhalt ändert sich täglich und niemand in der Firma will Code öffnen.",
      "Ein Konto, ein Warenkorb oder irgendetwas hinter einer Anmeldung wird gebraucht.",
    ],
    beforeQuote: [
      "Wie viele Seiten es gibt und wie oft sie sich ändern.",
      "Wer die Änderungen veröffentlicht und mit welchem Werkzeug.",
      "Ob es ein Formular gibt und wo dessen Einsendungen ankommen sollen.",
    ],
  },
};
