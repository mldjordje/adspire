import type { ServiceScope } from "./serviceScope";

/**
 * English scope blocks for /en/our-services/<slug>.
 *
 * Keys are the Serbian slugs, which stay the live URLs in every language.
 * Same rule as the Serbian source: every line specific to its own service,
 * because sixteen pages repeating a sentence is duplicate text.
 */
export const serviceScopeEn: Record<string, ServiceScope> = {
  "hotelski-rezervacioni-sistem": {
    notFor: [
      "You rent one apartment and take a handful of bookings a month. The phone and Booking.com cost you less than a system of your own.",
      "You want a better-looking site while reservations keep running entirely through OTA channels.",
      "Nobody will keep rates and the calendar current; without that the system sits empty and guests are shown the wrong offer.",
    ],
    beforeQuote: [
      "How many units you rent out and how much that number moves across the season.",
      "What share of bookings arrives through commission today, and what that commission costs you per year.",
      "Whether guests pay up front, by deposit, or at the desk.",
      "Who closes dates when you are full, and how quickly they get to it.",
    ],
  },
  "web-prezentacije": {
    notFor: [
      "You need a site for a campaign that runs two weeks. An off-the-shelf builder is cheaper and faster for that.",
      "You have no photographs and no text about the company, and you do not want anyone producing them for you.",
      "The goal is for the site to exist because competitors have one, not for it to bring in an enquiry.",
    ],
    beforeQuote: [
      "Who has to find you, and what exactly they should do once they land.",
      "Who writes the copy and who approves it. That is the step that stalls most projects.",
      "Whether an old site exists and which of its addresses have to survive the move.",
      "How many pages you actually need, rather than how many the old site had.",
    ],
  },
  "e-commerce-web-shop": {
    notFor: [
      "You sell twenty-odd items with no variants. A hosted platform will cost you less in year one and in year five.",
      "Packing and delivery are not sorted yet; a shop does not fix logistics, it only speeds it up until it breaks.",
      "You want a catalogue with no payment and no stock. That is a marketing site, not a shop.",
    ],
    beforeQuote: [
      "How many items, and how many variants per item (size, colour, pack).",
      "Where stock levels come from: by hand, from accounting, or from an existing system.",
      "Cash on delivery, cards, or both, and who signs the agreement with the bank.",
      "Who packs the orders, and how they find out today that a new one arrived.",
    ],
  },
  "mobilne-aplikacije": {
    notFor: [
      "What you need already works in a phone browser. An app is then an extra cost across two stores.",
      "You expect the app to bring in users by itself; installing is a far bigger hurdle than visiting a site.",
      "There is no budget for maintenance after launch, and iOS and Android force changes every year.",
    ],
    beforeQuote: [
      "Who installs it, and what makes them open it a second time.",
      "Whether it has to be native, or a PWA added to the home screen will do.",
      "What the app does when there is no connection.",
      "Who holds the Apple and Google developer accounts, and who pays their yearly fees.",
    ],
  },
  "cms-sistemi": {
    notFor: [
      "You change content twice a year. A CMS is then a layer nobody opens.",
      "You want everyone to be able to change everything, layout and design included; that ends with a site that stops looking like itself within three months.",
    ],
    beforeQuote: [
      "Who edits the content and how often.",
      "What may be changed and what has to stay locked.",
      "Whether the same content goes out in several languages, and who translates it.",
    ],
  },
  "interne-poslovne-aplikacije": {
    notFor: [
      "Excel does the job and nobody complains. Replacing it will not earn back what it costs.",
      "The team does not want to change how it works; an application nobody opens is the most expensive line in the company.",
      "You are after a full ERP with every module. This is a tool for one process of yours, not a box with everything in it.",
    ],
    beforeQuote: [
      "Which single process hurts most today, and who performs it.",
      "How many people log in, and who is allowed to see what.",
      "What has to come over from the existing spreadsheets, and what state it is in.",
      "Whether someone has tried this before and why it did not stick.",
    ],
  },
  "ai-integracije-automatizacija": {
    notFor: [
      "The process you want automated is written down nowhere except in somebody's head. It gets written down first and automated second.",
      "You expect AI to decide for you where a mistake costs money; in those steps it only proposes and a person confirms.",
      "The step repeats a few times a month. Doing it by hand is still cheaper than maintaining an automation.",
    ],
    beforeQuote: [
      "Which step repeats, and how many times a week.",
      "Where the data an automation would read actually lives, and who grants access to it.",
      "What happens when the automation gets it wrong, and who sees that first.",
      "How many hours a week that step takes today, and from whom.",
    ],
  },
  "ai-preporuka": {
    notFor: [
      "Your site is not even on Google yet. Basic indexing comes first and this comes after.",
      "You have no page that answers a buyer's question, only a general description of the company; there is nothing to cite.",
      "You want a guarantee that AI will mention you. Nobody can promise that, ourselves included.",
    ],
    beforeQuote: [
      "Which question a buyer asks before they even learn that you exist.",
      "Which three companies get mentioned instead of you today.",
      "Which facts about you we are allowed to state publicly, and who stands behind them.",
    ],
  },
  "business-intelligence-analitika": {
    notFor: [
      "Three systems disagree about the same number. Until the source is fixed, a report only presents the disagreement more attractively.",
      "The report is needed once, for one presentation; that is a job for a spreadsheet, not for a system.",
    ],
    beforeQuote: [
      "Which decision you make on that number, and how often.",
      "Who looks at the report, and what they do when it reads badly.",
      "Where the data really lives, including whatever sits in somebody's mailbox.",
    ],
  },
  "seo-digitalni-marketing": {
    notFor: [
      "You expect first position within a month; for competitive terms that does not exist without paid ads.",
      "The site is slow and empty and that part must not be touched. SEO then has nothing to work with.",
      "There is nobody to answer an enquiry when it arrives; bringing the visitor in is the easier half.",
    ],
    beforeQuote: [
      "What a buyer actually types when looking for what you sell, in their own words.",
      "How many enquiries arrive today and from where, per week.",
      "Who in the company can confirm the facts we are going to publish.",
    ],
  },
  "cyber-security-gdpr": {
    notFor: [
      "You want a document for the folder rather than a change in how you work. The document will not defend you.",
      "Nobody knows where the data is or who can reach it, and there is nobody to ask.",
    ],
    beforeQuote: [
      "Which personal data you collect, and where it ends up after the first week.",
      "Who has production access, and what happens when that person leaves.",
      "What you do if the database is gone tomorrow morning.",
    ],
  },
  "hosting-infrastruktura": {
    notFor: [
      "The site works, the bill is five euros a month, and nobody is complaining.",
      "You expect a bigger server to fix slowness that comes from the code; it will not, it will only cost more.",
    ],
    beforeQuote: [
      "How much traffic you get, and what the biggest spike of the year looks like.",
      "Who holds the domain and DNS today, and whether they answer in time.",
      "How many minutes of downtime actually cost you something.",
    ],
  },
  "saas-razvoj": {
    notFor: [
      "No user has said yet that they would pay for this; a first version is built for someone who is waiting, not for a market in general.",
      "The idea needs a team of ten before it can start at all. That is not the first step, it is the third.",
    ],
    beforeQuote: [
      "Who the first paying user is, and what exactly they are paying for.",
      "What the smallest version is that this person would already use.",
      "Who takes the product over after launch, and with what knowledge.",
    ],
  },
  "industrijska-resenja": {
    notFor: [
      "Machines and scales have no data output at all and must not be touched. Manual entry is then the only option left.",
      "You want the whole existing plant system replaced; that is a project of a different size.",
    ],
    beforeQuote: [
      "What gets written by hand today, on which sheet, and who retypes it afterwards.",
      "Which devices exist, and whether any of them send a signal anywhere.",
      "Who works the shift, on what, and how much time they have to enter anything.",
    ],
  },
  "interaktivne-web-tehnologije": {
    notFor: [
      "The goal is for the site to look expensive while there is nothing to show; motion does not fill empty content.",
      "Most of your audience is on older phones and weak connections. 3D repels them there rather than drawing them in.",
    ],
    beforeQuote: [
      "What exactly has to be seen, and why a photograph cannot show it.",
      "Whether 3D models already exist or have to be built from scratch.",
      "Which devices most of your visits come from today.",
    ],
  },
  "sistemi-za-zakazivanje": {
    notFor: [
      "You take two appointments a day and the phone handles that without error.",
      "You do not want to change how the calendar is kept today; the system then runs in parallel with the notebook and both are wrong.",
      "All you need is a button that sends an email. That is a form, not a booking system.",
    ],
    beforeQuote: [
      "How many people take appointments, and whether they all perform the same services.",
      "What happens today when somebody does not show up.",
      "Whether payment is up front, by deposit, or on the spot.",
      "What the day looks like when somebody cancels an hour before their slot.",
    ],
  },
  "staticni-sajtovi": {
    notFor: [
      "Content changes every day and nobody in the company is willing to open code.",
      "An account, a cart, or anything behind a login is required.",
    ],
    beforeQuote: [
      "How many pages there are and how often they change.",
      "Who publishes the changes, and which tool they work in.",
      "Whether a form exists, and where its submissions have to land.",
    ],
  },
};
