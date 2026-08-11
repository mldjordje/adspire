import type { AiIndexCopy, AiPage } from "@/content/site/aiPages";

/**
 * English AI industry pages.
 *
 * Same slugs and same structure as the Serbian set — only the strings differ,
 * so a reader switching language lands on the matching page instead of the
 * index. Written, not translated: the Serbian copy speaks to an owner who
 * answers their own phone, and that voice does not survive a literal pass.
 *
 * The claim limit carries over: no percentages, no multipliers, no saved
 * hours, because no client has published one yet.
 */

const HOW_TO_NAME = "How AI gets introduced into a company";

const salonsClinics: AiPage = {
  slug: "saloni-i-klinike",
  industry: "Salons and clinics",
  eyebrow: "AI by industry",
  title: "AI for salons and clinics — booking, reminders, replies",
  metaDescription:
    "What AI actually does for hair salons, aesthetic and dental clinics: booking without phone calls, reminders that cut no-shows, answers to routine questions after hours.",
  h1: "AI for salons and clinics",
  lead:
    "A salon does not have a marketing problem. It has a phone problem. It rings while you are working, messages arrive at 11pm, and one no-show kills a whole slot. Those are jobs software takes over completely.",
  answer:
    "In a salon or clinic, AI pays off in three places: it takes bookings through your site and messaging apps without a single phone call, it sends the reminder before the appointment and asks for confirmation, and it answers routine questions about prices, duration and preparation when nobody is watching the phone. All three run on your calendar and your price list rather than on generic replies — so a slot it confirms genuinely exists, and an answer it gives is yours.",
  keywords: [
    "AI for salons",
    "AI for clinics",
    "automated appointment booking",
    "salon chatbot",
    "appointment reminder software",
    "AI receptionist",
  ],
  serviceName: "AI and automation for salons and clinics",
  tasks: [
    {
      name: "Booking without a phone call",
      problem: "A client calls mid-treatment. You do not pick up, they book with whoever does.",
      solution:
        "Booking from your site and from Instagram or WhatsApp, on the real calendar — clients only see slots genuinely free for that service and that staff member.",
      delivery: "Booking page, admin calendar and duration rules per service.",
    },
    {
      name: "Reminders and confirmations",
      problem: "A no-show with no warning. The slot is empty and there is a waiting list.",
      solution:
        "Automatic message 24h and 2h before, with a button to confirm or cancel. A cancelled slot goes straight to the next person waiting.",
      delivery: "Message templates, send schedule and a waiting list in the admin.",
    },
    {
      name: "Answers after hours",
      problem:
        "The same questions every day: how long does it take, what does it cost, is it safe after colouring, anything free on Saturday.",
      solution:
        "An assistant trained on your price list and your aftercare instructions replies immediately, and forwards anything it does not know instead of inventing it.",
      delivery: "Chat on the site and in messages, with a question base you edit yourself.",
    },
    {
      name: "Client record",
      problem:
        "What was done last time, which colour, which needle, what they are allergic to — in a notebook or in your head.",
      solution:
        "Treatment history attached to the client, with before and after photos and a note that surfaces the moment the appointment opens.",
      delivery: "Client records with history, notes and search.",
    },
    {
      name: "Bringing a client back on time",
      problem: "Someone who came every six weeks simply stops, and nobody notices.",
      solution:
        "The system tracks each client's rhythm and flags anyone running late — one message, not a campaign.",
      delivery: "A win-back list with suggested slots.",
    },
    {
      name: "Content for social",
      problem: "A post has to go out, and after ten hours on your feet nobody writes captions.",
      solution:
        "From a treatment photo you get a caption, hashtags and a suggested posting time — you only approve.",
      delivery: "Caption tool tuned to your tone and your services.",
    },
  ],
  sections: [
    {
      heading: "Where AI does not help a salon",
      body: [
        "This is what people expect, so it is worth saying up front. AI does not bring you new clients on its own — referrals, location, social and price do that. AI keeps the ones you already have and gives back the hours you currently lose to the phone.",
      ],
      bullets: [
        "It does not replace a receptionist in a salon with heavy walk-in traffic.",
        "It does not judge whether a treatment is medically appropriate — that stays with you.",
        "It does not fix prices that are wrong or a schedule that does not work.",
      ],
    },
    {
      heading: "What to do first",
      body: [
        "Introduce everything at once and none of it sticks. The order that works: booking, then reminders, then answers. Booking gives you the calendar, the calendar makes reminders possible, and only once there is data is there any point training an assistant.",
      ],
    },
  ],
  howTo: {
    name: HOW_TO_NAME,
    steps: [
      {
        name: "One hour of conversation",
        text: "We walk through one of your working days and pull out what repeats. No charge, no obligation.",
      },
      {
        name: "One job, not all of them",
        text: "We pick the single most repetitive task — for a salon that is almost always booking.",
      },
      {
        name: "Two to four weeks to launch",
        text: "It goes live on your calendar and your prices, with your existing site or a new one.",
      },
      {
        name: "Two weeks running in parallel",
        text: "The old way stays until the new one demonstrably catches every case, cancellations and reschedules included.",
      },
      {
        name: "The next job",
        text: "Only once the first runs by itself does the second go in. Reminders, then answers, then records.",
      },
    ],
  },
  proofHeading: "Systems of this kind already running",
  proof: [
    {
      label: "Doctor Barber",
      href: "/our-projects/doctor-barber-online-booking-sistem",
      note: "Online booking with an admin panel, rescheduling and reminders.",
    },
    {
      label: "Dr Igić",
      href: "/our-projects/dr-igic-web-aplikacija-za-estetske-klinike",
      note: "Web application for aesthetic clinics — booking and patient records.",
    },
  ],
  faq: [
    {
      q: "Do clients have to install an app?",
      a: "No. Booking runs in the browser, from a link on your site, an Instagram bio or a message. Nothing gets installed.",
    },
    {
      q: "What if a client still wants to call?",
      a: "The phone stays. The point is not to abolish calls but to move most bookings off them, so the people who do call get real attention.",
    },
    {
      q: "Do reminders go by SMS or through messaging apps?",
      a: "It depends on where your clients are. Email and WhatsApp or Viber are cheapest, SMS is the most reliable for older clients. The mix is chosen on cost per message.",
    },
    {
      q: "How is patient data stored?",
      a: "Data stays in your database, with per-account access and a record of who looked at what. For a clinic that is not an option but a condition — processing health data requires a legal basis and restricted access.",
    },
    {
      q: "What if it does not suit me after a month?",
      a: "The code and the data are yours from handover. There is no lock-in to a platform you cannot leave with your own client base.",
    },
  ],
  relatedServices: [
    { label: "Booking systems", href: "/our-services/sistemi-za-zakazivanje" },
    { label: "AI integration and automation", href: "/our-services/ai-integracije-automatizacija" },
  ],
};

const transportLogistics: AiPage = {
  slug: "transport-i-logistika",
  industry: "Transport and logistics",
  eyebrow: "AI by industry",
  title: "AI for transport and logistics — quotes, dispatch, paperwork",
  metaDescription:
    "What AI does for transport companies: a route quote in seconds, driver jobs without phone calls, delivery notes and invoices read from a photo, cost tracked per vehicle.",
  h1: "AI for transport and logistics",
  lead:
    "In transport the money leaks between the phone call and the job sheet. The quote is worked out from memory, the job is dictated over the phone, and the delivery note gets retyped in the evening. All three of those can run themselves.",
  answer:
    "In a haulage company AI pays off first on two things: pricing a route and processing paperwork. A quote comes out of your rate table, distance and load type in seconds instead of waiting for whoever knows the tariff, and delivery notes, consignment notes and supplier invoices are read from a photo and written into your records, so nothing gets retyped at night. The third is dispatch — instead of a call, the driver gets the job on their phone and returns a signature and a photo from the site.",
  keywords: [
    "AI for transport",
    "haulage software",
    "automated freight quote",
    "driver job app",
    "delivery note OCR",
    "logistics automation",
  ],
  serviceName: "AI and automation for transport and logistics",
  tasks: [
    {
      name: "A route quote in seconds",
      problem: "An enquiry comes in and the price waits until someone who knows the distance and the tariff is free.",
      solution:
        "From the route, the load type and your tariff the price comes out immediately, with the margin you set. Anything unusual goes to you for approval instead of being guessed.",
      delivery: "Quote calculator on your rate card, plus a PDF quote by email.",
    },
    {
      name: "Dispatch without phone calls",
      problem: "The dispatcher calls the driver, the driver writes on paper, the paper gets lost or misread.",
      solution:
        "The driver gets the job on their phone with address, contact and load, and returns confirmation, a signature and a photo from the spot.",
      delivery: "Driver view in the browser, no install, works offline.",
    },
    {
      name: "Paperwork from a photo",
      problem: "Delivery notes, consignment notes and supplier invoices get retyped by hand, in the evening, with errors.",
      solution:
        "A photo of the document is read and fills the fields — number, date, amount, customer. You only confirm what the system flags as uncertain.",
      delivery: "Document inbox with a review step before anything is posted.",
    },
    {
      name: "Cost per vehicle and per trip",
      problem: "You know the monthly turnover. You do not know which vehicle and which route are carrying the loss.",
      solution:
        "Fuel, tolls, servicing and driver hours attach to a specific trip, so margin shows per route rather than only per month.",
      delivery: "Reports per vehicle, driver and route, with spreadsheet export.",
    },
    {
      name: "Deadlines that cost money",
      problem: "Registration, tachograph, ADR, medicals, service intervals — a missed date is a fine or a standstill.",
      solution: "Every deadline in one place, with advance warning and a named owner.",
      delivery: "Deadline register with email reminders.",
    },
    {
      name: "Answering a web enquiry",
      problem: "An enquiry lands at night, the reply goes out in the morning, the job goes to whoever answered first.",
      solution:
        "The enquiry is qualified immediately — route, load, deadline, contact — and gets either an indicative answer or a request for the missing detail.",
      delivery: "Enquiry form with an automatic reply and a record created.",
    },
  ],
  sections: [
    {
      heading: "Why paperwork comes first",
      body: [
        "For a haulier the largest invisible cost is an hour and a half a day spent retyping. That is not work that needs judgement, it is work that needs accuracy — and at 9pm a machine is more accurate than a person. That is why in transport you almost always start with documents, not with a chatbot.",
      ],
    },
    {
      heading: "What stays with a person",
      bullets: [
        "Negotiating price with a regular customer — that sells the relationship, not the tariff.",
        "Deciding what to run when two jobs collide.",
        "Confirming every document the system flags as uncertain.",
        "Anything with legal consequences — CMR, claims, damage.",
      ],
    },
  ],
  howTo: {
    name: HOW_TO_NAME,
    steps: [
      {
        name: "One hour of conversation",
        text: "We follow one job from enquiry to payment and find where it stalls.",
      },
      {
        name: "One job, not all of them",
        text: "In transport that is usually quoting or document handling — whatever happens every day.",
      },
      {
        name: "Two to four weeks to launch",
        text: "Built on your tariffs and your document formats, not on a generic template.",
      },
      {
        name: "Two weeks running in parallel",
        text: "The system and the old way run side by side until accuracy is compared on real documents.",
      },
      {
        name: "The next job",
        text: "Once paperwork runs itself, driver dispatch and per-vehicle reporting follow.",
      },
    ],
  },
  proofHeading: "Systems of this kind already running",
  proof: [
    {
      label: "Prevoz Kop",
      href: "/our-projects/prevozkop-digitalni-prodajni-operativni-sistem",
      note: "Sales and operations system for a haulage company — enquiries, quotes and records in one place.",
    },
  ],
  faq: [
    {
      q: "Does this replace our accounting software?",
      a: "No. Accounting stays where it is — this feeds it clean, already-read data instead of a pile of paper at month end.",
    },
    {
      q: "How accurate is reading delivery notes?",
      a: "It depends on photo quality and how consistent the forms are. That is why anything below the confidence threshold goes to a person — the system does not post what it is unsure about.",
    },
    {
      q: "Our drivers are not technical. Will they use this?",
      a: "The driver view is one screen with three buttons and opens from a link, with no account and no install. If it demands more than that, it is badly built.",
    },
    {
      q: "We already have GPS tracking. Can it connect?",
      a: "Yes, if your provider gives access to the data. Distance and time are then pulled in rather than entered.",
    },
  ],
  relatedServices: [
    { label: "Internal business applications", href: "/our-services/interne-poslovne-aplikacije" },
    { label: "AI integration and automation", href: "/our-services/ai-integracije-automatizacija" },
  ],
};

const hospitality: AiPage = {
  slug: "ugostiteljstvo-i-catering",
  industry: "Restaurants and catering",
  eyebrow: "AI by industry",
  title: "AI for restaurants and catering — bookings, quotes, menus",
  metaDescription:
    "What AI does for restaurants and caterers: table bookings without phone calls, an event quote built from the enquiry, multilingual menus, instant answers on allergens and dates.",
  h1: "AI for restaurants and catering",
  lead:
    "A restaurant loses bookings that never get written down. A caterer loses events because the quote takes three days. Both are the same pattern: the enquiry arrives and the answer is late.",
  answer:
    "In hospitality AI mostly changes how fast you reply. Table bookings come in through the site and messaging apps against the real floor plan, and for catering an enquiry — headcount, date, event type, menu — turns into a quote with a per-head price in minutes instead of days. On top of that sit the questions that repeat endlessly: allergens, what is in a dish, parking, how long a date is held.",
  keywords: [
    "AI for restaurants",
    "online table booking",
    "automated catering quote",
    "multilingual digital menu",
    "restaurant chatbot",
    "catering software",
  ],
  serviceName: "AI and automation for restaurants and catering",
  tasks: [
    {
      name: "A table booked without a call",
      problem: "A guest calls during service, nobody picks up, the booking goes two doors down.",
      solution: "Bookings from your site, your Google profile and messages, against the real floor plan and sitting times.",
      delivery: "Booking page, floor view and confirmation to the guest.",
    },
    {
      name: "An event quote from the enquiry",
      problem: "A wedding or company dinner enquiry takes an hour to price, so it gets answered tomorrow.",
      solution:
        "From headcount, date and chosen menu a quote comes out with a per-head price and itemised lines, ready for your edit before it goes.",
      delivery: "Event form and a PDF quote generator.",
    },
    {
      name: "Allergens and ingredients",
      problem: "Questions about gluten, nuts or vegan options arrive daily and need an exact answer.",
      solution:
        "The assistant answers strictly from your dish declarations — what is not recorded it does not invent, it passes to the kitchen.",
      delivery: "Dish database with ingredients and allergens, shared by site and chat.",
    },
    {
      name: "Menus in several languages",
      problem: "A visitor gets a menu they cannot read, or a translation that is funny for the wrong reason.",
      solution:
        "One menu source publishes in Serbian, English and German, with dish descriptions a human checks once and then trusts.",
      delivery: "Digital menu with a QR code and prices edited in one place.",
    },
    {
      name: "Ordering against actual usage",
      problem: "You order too much and throw it away, or run out on a Friday night.",
      solution: "From sales by day and season comes a suggested order the head chef approves or changes.",
      delivery: "Consumption report and a purchase suggestion per supplier.",
    },
    {
      name: "Reviews and replies",
      problem: "A Google review sits unanswered for weeks, and every future guest sees that.",
      solution:
        "A draft reply is prepared in your tone and waits for one click — a negative review always goes to you, never out automatically.",
      delivery: "Review inbox with suggested replies.",
    },
  ],
  sections: [
    {
      heading: "A restaurant and a caterer are not the same business",
      body: [
        "They look alike and they are not. A restaurant lives on repetition and on speed during service — the win is in the booking and in answering within a minute. A caterer lives on a handful of large jobs a year, where one lost quote is worth a month of restaurant turnover. So restaurants start with bookings and caterers start with quotes.",
      ],
    },
    {
      heading: "What does not get automated",
      bullets: [
        "Confirming a large event — that is always a conversation, never a form.",
        "Replying to a serious complaint.",
        "Changing the menu or prices without a human check.",
        "Anything touching allergens that is not in the declaration.",
      ],
    },
  ],
  howTo: {
    name: HOW_TO_NAME,
    steps: [
      {
        name: "One hour of conversation",
        text: "We look at how many enquiries a day arrive and through which channel — phone, Instagram, Google, the site.",
      },
      {
        name: "One job, not all of them",
        text: "A restaurant starts with bookings, a caterer with the event quote.",
      },
      {
        name: "Two to four weeks to launch",
        text: "Built on your floor plan and your menu with real prices.",
      },
      {
        name: "Two weeks running in parallel",
        text: "Phone bookings stay until online demonstrably handles both the rush and cancellations.",
      },
      {
        name: "The next job",
        text: "Then menus, allergens and reviews — in whichever order annoys you most.",
      },
    ],
  },
  proofHeading: "Systems of this kind already running",
  proof: [
    {
      label: "Santos & Santorini",
      href: "/our-projects/santos-santorini-web-shop-admin-platforma",
      note: "Web shop and admin platform — orders and catalogue in one place.",
    },
  ],
  faq: [
    {
      q: "We have a Google profile. Do we need a site as well?",
      a: "A Google profile is enough for people to find you, not to choose you. The menu, prices, the room and event terms are what a guest checks before booking, and those do not fit on a profile.",
    },
    {
      q: "Can bookings come in through Instagram too?",
      a: "Yes. The link points at the same calendar, so Instagram and site bookings appear in one place and cannot double up.",
    },
    {
      q: "Who enters the menu and prices?",
      a: "You do, through the admin. That is deliberate — menus change more often than anyone wants to wait on an agency.",
    },
    {
      q: "What if a guest asks something the assistant does not know?",
      a: "It hands over. An assistant that invents what is in a dish is more dangerous than one that stays quiet, so the boundary is set strictly.",
    },
  ],
  relatedServices: [
    { label: "Booking systems", href: "/our-services/sistemi-za-zakazivanje" },
    { label: "Websites", href: "/our-services/web-prezentacije" },
  ],
};

const ecommerce: AiPage = {
  slug: "web-shop-i-trgovina",
  industry: "E-commerce and retail",
  eyebrow: "AI by industry",
  title: "AI for e-commerce — descriptions, search, support, returns",
  metaDescription:
    "What AI does for online shops: product descriptions from specifications, search that understands the question, instant order-status answers and structured returns handling.",
  h1: "AI for e-commerce and retail",
  lead:
    "A shop with a thousand SKUs has two problems that hiring does not solve: descriptions nobody has time to write, and customer questions that repeat a thousand times.",
  answer:
    "In an online shop AI gives most on the catalogue and on support. Descriptions, titles and meta text are produced from product specifications in batches instead of one by one, so an item that sat there with no text becomes findable. On the other side, most customer messages are three questions — where is my parcel, do you have it in a 42, how do I return this — and those are answered by an assistant wired to real stock and real shipment status rather than to generic text.",
  keywords: [
    "AI for e-commerce",
    "automated product descriptions",
    "AI product search",
    "online shop chatbot",
    "automated order status",
    "e-commerce automation",
  ],
  serviceName: "AI and automation for e-commerce",
  tasks: [
    {
      name: "Product descriptions in batches",
      problem: "Eight hundred items with no description. Google does not surface them, customers do not understand them.",
      solution:
        "From the specification, category and name come the description, title and meta description, in your voice and with your category wording. You approve in batches, not one at a time.",
      delivery: "Generation and review tool with import and export.",
    },
    {
      name: "Search that understands the question",
      problem: "Someone types \"something for a six month old\" and gets nothing, because no product name says that.",
      solution: "Search by meaning rather than by string match, with filters suggested from the query itself.",
      delivery: "Search over your catalogue, plus a report of what people look for and you do not stock.",
    },
    {
      name: "Where is my parcel",
      problem: "Half of support messages are one question, and the answer is a copy-paste from the courier system.",
      solution: "The customer enters an order number or email and gets the real courier status immediately, without waiting on you.",
      delivery: "Shipment tracking on the site and in the automatic reply.",
    },
    {
      name: "Returns without a thread",
      problem: "A return runs through ten emails while the statutory clock is already ticking.",
      solution:
        "A guided form collects everything at once — receipt, photo, reason — and opens a case with a deadline and a status the customer follows themselves.",
      delivery: "Returns register with deadlines and history.",
    },
    {
      name: "Recommendations that make sense",
      problem: "\"Similar products\" shows the same item in another colour.",
      solution: "Recommendations based on what is genuinely bought together and what fits a specific model, not on category.",
      delivery: "Recommendation block on the product page and in the basket.",
    },
    {
      name: "Prices and competitors",
      problem: "You do not know you are expensive until sales drop.",
      solution: "Public price tracking for the items you choose, with an alert when someone undercuts you.",
      delivery: "Price report per item and per competitor.",
    },
  ],
  sections: [
    {
      heading: "Why the catalogue comes first",
      body: [
        "A shop without descriptions is a shop without price tags. Search engines cannot rank it, and now assistants cannot recommend it either — both of them read text. A product with no description is invisible in both worlds, however good the price is.",
      ],
    },
    {
      heading: "Where to be careful",
      bullets: [
        "A description that invents a technical spec is grounds for a return — which is why it comes only from the specification.",
        "An assistant must never approve a refund on its own.",
        "Prices and promotions do not change automatically.",
        "Generated text goes through review before publishing, at least in batches.",
      ],
    },
  ],
  howTo: {
    name: HOW_TO_NAME,
    steps: [
      {
        name: "One hour of conversation",
        text: "We look at the catalogue, the volume of support messages and where people abandon the basket.",
      },
      {
        name: "One job, not all of them",
        text: "For a shop that is almost always the catalogue — descriptions and search before anything else.",
      },
      {
        name: "Two to four weeks to launch",
        text: "Built on your platform, whether that is WooCommerce, Shopify or your own.",
      },
      {
        name: "Two weeks running in parallel",
        text: "One category first, so you can see how it reads and how it behaves in search.",
      },
      {
        name: "The next job",
        text: "Then support and returns, once the catalogue holds.",
      },
    ],
  },
  proofHeading: "Systems of this kind already running",
  proof: [
    {
      label: "Santos & Santorini",
      href: "/our-projects/santos-santorini-web-shop-admin-platforma",
      note: "Web shop with an admin platform — catalogue, orders and content.",
    },
  ],
  faq: [
    {
      q: "Does Google penalise AI-written descriptions?",
      a: "Google penalises useless content, whoever wrote it. A description built from a real specification, with accurate data and a review before publishing, is not that. Mass-generated text with no check at all is.",
    },
    {
      q: "Does this work on WooCommerce?",
      a: "Yes, as it does on Shopify and on a custom shop. The catalogue is read and written back through your existing system, with no migration.",
    },
    {
      q: "How many products can be processed at once?",
      a: "The practical limit is not the product count but review capacity. That is why it runs by category — process one, review it, move on.",
    },
    {
      q: "Can the assistant place an order for a customer?",
      a: "It can guide them to the basket and fill it, but confirming the order stays with the customer. Anything else is a legal problem, not a technical one.",
    },
  ],
  relatedServices: [
    { label: "E-commerce and web shop", href: "/our-services/e-commerce-web-shop" },
    { label: "SEO and digital marketing", href: "/our-services/seo-digitalni-marketing" },
  ],
};

const realEstate: AiPage = {
  slug: "nekretnine-i-izdavanje",
  industry: "Real estate and rentals",
  eyebrow: "AI by industry",
  title: "AI for real estate and rentals — enquiries, listings, bookings",
  metaDescription:
    "What AI does for estate agents and short-let hosts: enquiry qualification, listing descriptions, multilingual guest replies, one calendar with no double bookings.",
  h1: "AI for real estate and rentals",
  lead:
    "An agent loses a day on enquiries that go nowhere. A host loses a booking because they did not reply within the hour. Both jobs are a race on response time.",
  answer:
    "In property and rentals AI does two jobs: it separates a serious enquiry from a curious one, and it replies immediately at any hour. An enquiry is qualified through a few questions — budget, timing, financing, area — so the agent only calls people worth calling. For short lets, guest questions about arrival, parking and house rules are answered in the language they were asked in, against a calendar that is genuinely free, so there are no double bookings and no lost nights.",
  keywords: [
    "AI for real estate",
    "rental management software",
    "lead qualification real estate",
    "automated listing description",
    "chatbot for holiday rentals",
    "booking calendar sync",
  ],
  serviceName: "AI and automation for real estate and rentals",
  tasks: [
    {
      name: "Enquiry qualification",
      problem: "Ten calls a day, two of them serious, and you find out which in the fifteenth minute.",
      solution:
        "A short set of questions before the call — budget, cash or mortgage, moving date, area — and the enquiry arrives tagged with how ready it is.",
      delivery: "Enquiry form with scoring and a record created.",
    },
    {
      name: "Listing text from the data",
      problem: "Thirty listings waiting for copy, so they all sound the same because they get copied.",
      solution:
        "From floor area, floor level, aspect and photos comes a description that leads with what is genuinely different about that property.",
      delivery: "Description generator from listing data, with your review.",
    },
    {
      name: "Guest replies in their language",
      problem: "A guest from Germany asks at 11pm how to get into the building and where to park.",
      solution:
        "The assistant answers in Serbian, English and German from your house rules and arrival instructions, with a photo of the entrance and the code when it is due.",
      delivery: "Chat plus staged messages across the stay.",
    },
    {
      name: "One calendar, no clashes",
      problem: "A booking from a platform and a direct booking land on the same date.",
      solution: "One calendar merges every channel, so a taken date closes everywhere at the same moment.",
      delivery: "Unified calendar with direct bookings from your own site.",
    },
    {
      name: "Direct bookings instead of commission",
      problem: "Platforms take a percentage of every night, including from guests who return.",
      solution: "Your own booking page with the same experience, and a message to returning guests to book direct.",
      delivery: "Property page with payment or confirmation and no commission.",
    },
    {
      name: "Contracts and handover",
      problem: "A tenancy contract gets retyped for every tenant, and the condition report goes missing.",
      solution:
        "The contract fills itself from property and tenant data, and the condition report with photos stays attached to the file.",
      delivery: "Contract templates and a photo condition report in the records.",
    },
  ],
  sections: [
    {
      heading: "Two different businesses under one name",
      body: [
        "Selling property and short-letting look related and do not share a pain point. In sales you lose time on the wrong people, so qualification comes first. In letting you lose to slow replies and to platform commission, so replies and direct booking come first.",
      ],
    },
    {
      heading: "The line that is not crossed",
      bullets: [
        "The assistant gives no legal advice on a sale or on tax.",
        "It does not confirm mortgage terms — that is a bank, not a listing.",
        "It does not promise a viewing slot without an agent on the other side.",
        "It does not send a contract without human review.",
      ],
    },
  ],
  howTo: {
    name: HOW_TO_NAME,
    steps: [
      {
        name: "One hour of conversation",
        text: "We count enquiries and see how many are lost to a slow reply.",
      },
      {
        name: "One job, not all of them",
        text: "An agency starts with qualification, a host with replies and the calendar.",
      },
      {
        name: "Two to four weeks to launch",
        text: "Built on your property list and your house rules.",
      },
      {
        name: "Two weeks running in parallel",
        text: "Manual replies stay until the assistant is shown not to get prices or dates wrong.",
      },
      {
        name: "The next job",
        text: "Then listing copy and contracts, once the first part holds.",
      },
    ],
  },
  faq: [
    {
      q: "Does this replace Booking and Airbnb?",
      a: "Not immediately and not entirely. The aim is that returning guests and guests who find you through Google book direct, while the platforms stay a channel for new ones.",
    },
    {
      q: "Who is liable if the assistant quotes the wrong price?",
      a: "Which is why the price does not come from prose but from a calendar with per-date rates. What is not in the calendar the assistant does not say.",
    },
    {
      q: "Does this work for a single property or do I need ten?",
      a: "It works for one, but it pays back faster with several, or when enquiries run into the dozens a week.",
    },
    {
      q: "How does it connect to our existing calendar?",
      a: "Through iCal exchange with the platforms or directly through their access, depending on what each platform offers.",
    },
  ],
  relatedServices: [
    { label: "Booking systems", href: "/our-services/sistemi-za-zakazivanje" },
    { label: "Websites", href: "/our-services/web-prezentacije" },
  ],
};

const education: AiPage = {
  slug: "obrazovanje-i-kursevi",
  industry: "Education and training",
  eyebrow: "AI by industry",
  title: "AI for schools and course providers — enrolment, materials, assessment",
  metaDescription:
    "What AI does for schools, course providers and tutors: paperless enrolment, materials and tests prepared from your syllabus, parent replies, progress tracking.",
  h1: "AI for education and training",
  lead:
    "A teacher trained to teach and spends their evenings building tests and answering the same parent questions. That is work that comes off the desk.",
  answer:
    "In education AI returns most time on preparation and admin, not on teaching. From one body of material you get exercises, tests at several difficulty levels and answer keys, and from one enrolment form come the group placement, the schedule, the contract and the invoice without retyping. The third part is answering: questions about start dates, price, a missed lesson and terms repeat often enough that it pays for a system to answer them from your own rules.",
  keywords: [
    "AI for schools",
    "AI for course providers",
    "language school software",
    "automated test generation",
    "online student enrolment",
    "student progress tracking",
  ],
  serviceName: "AI and automation for education",
  tasks: [
    {
      name: "Paperless enrolment",
      problem: "Application, contract, invoice and timetable — all retyped, for every student again.",
      solution: "One application fills everything downstream: group, contract, invoice and access to materials.",
      delivery: "Enrolment form, student records and automatic contracts.",
    },
    {
      name: "Materials and exercises from your syllabus",
      problem: "Every level and every group needs a different exercise set, and a day has 24 hours.",
      solution: "From your material come exercises at several levels, with answer keys, in your format and your terminology.",
      delivery: "Preparation tool with a library organised by level.",
    },
    {
      name: "Tests and marking",
      problem: "Marking forty papers takes longer than the lesson they were written in.",
      solution:
        "Tests are taken online, closed questions mark themselves, and open ones get a suggested grade the teacher confirms or changes.",
      delivery: "Tests with automatic marking and a report per student.",
    },
    {
      name: "Answering parents and students",
      problem: "When does the group start, what if a lesson is missed, what does it cost, are there places — every day.",
      solution:
        "The assistant answers from your timetable and your rules, and records the interest as a lead instead of losing it.",
      delivery: "Site chat wired to group schedules and the price list.",
    },
    {
      name: "Who is falling behind, who is dropping out",
      problem: "A student stops coming and it registers only when they fail to re-enrol.",
      solution: "Attendance and results tracked with an alert when someone starts slipping — while you can still act.",
      delivery: "Progress view by group and by student.",
    },
    {
      name: "Certificates and records",
      problem: "Certificates get made by hand in Word and requested again a year later.",
      solution: "Certificates are issued from the records, with a number and a verifiable link.",
      delivery: "Certificate generator with an archive and verification.",
    },
  ],
  sections: [
    {
      heading: "What AI should not do in teaching",
      body: [
        "There is a line that gets crossed quickly in education. A grade that goes on a record has to be the teacher's. Student work must not go into systems that train on it. And explaining the material instead of the teacher is a substitution you pay for later, when it turns out nobody learned anything.",
      ],
      bullets: [
        "Final grades — always a person.",
        "Work by minors — never into an external system without parental consent.",
        "The decision to move someone up a level.",
        "A conversation with a parent about a child's difficulty.",
      ],
    },
    {
      heading: "Where the fastest gain is",
      body: [
        "Preparing materials. It is the only part of the job a teacher does alone, outside working hours, and is not separately paid for. Everything else can wait.",
      ],
    },
  ],
  howTo: {
    name: HOW_TO_NAME,
    steps: [
      {
        name: "One hour of conversation",
        text: "We look at how much time goes on preparation and how much on enrolment admin.",
      },
      {
        name: "One job, not all of them",
        text: "A tutor starts with materials, a school with enrolment.",
      },
      {
        name: "Two to four weeks to launch",
        text: "Built on your syllabus and your group timetable.",
      },
      {
        name: "Two weeks running in parallel",
        text: "One group first, to check whether the materials sit at the right level.",
      },
      {
        name: "The next job",
        text: "Then tests and progress tracking.",
      },
    ],
  },
  proofHeading: "Systems of this kind already running",
  proof: [
    {
      label: "TeachFromHome",
      href: "/our-projects/teachfromhome-onboarding-sistem-za-remote-nastavnike",
      note: "Onboarding system for remote teachers — application, vetting and tracking.",
    },
  ],
  faq: [
    {
      q: "Can students cheat on an online test?",
      a: "An online test does not rely on honesty — questions shuffle, time is capped, and variants are generated per student. For serious assessment it still holds that you write it in the room.",
    },
    {
      q: "What about data protection for minors?",
      a: "Data stays in your database, access is by role, and parental consent is part of the application. Work is not sent to external systems without explicit consent.",
    },
    {
      q: "Does this replace the official school register?",
      a: "No. The statutory register stays mandatory. This covers what it does not do — preparation, materials and communication with students.",
    },
    {
      q: "Does it work for a single tutor?",
      a: "Yes, and that is where it is felt fastest, because one person does the preparation, the admin and the invoicing.",
    },
  ],
  relatedServices: [
    { label: "Internal business applications", href: "/our-services/interne-poslovne-aplikacije" },
    { label: "SaaS development", href: "/our-services/saas-razvoj" },
  ],
};

const manufacturing: AiPage = {
  slug: "proizvodnja-i-gradjevina",
  industry: "Manufacturing and construction",
  eyebrow: "AI by industry",
  title: "AI for manufacturing and construction — take-offs, quotes, work orders",
  metaDescription:
    "What AI does for manufacturers and contractors: take-offs and quotes from a specification, work orders on a phone, site reports, material and deadline tracking.",
  h1: "AI for manufacturing and construction",
  lead:
    "The quote takes three days and goes to whoever sent theirs first. Work orders go out by phone, the site report lands in a group chat and disappears. That is work that belongs back in a system.",
  answer:
    "In manufacturing and construction AI is worth most before the job starts — on the take-off and the quote. From a specification, a drawing or a list of items comes a costing with your norms and your prices in hours instead of days, so you can still answer while the job is open. The second part is the site: a work order on a phone, a report with a photo and materials used, and records that show planned against actual while you can still do something about it.",
  keywords: [
    "AI for manufacturing",
    "AI for construction",
    "take-off and estimating software",
    "work order app",
    "site report software",
    "material tracking",
  ],
  serviceName: "AI and automation for manufacturing and construction",
  tasks: [
    {
      name: "Take-off and quote",
      problem: "The specification arrives as a PDF or on paper, and the costing gets typed into Excel over three days.",
      solution:
        "Items are read out of the document, matched to your norms and prices, and produce a costing with margin that you check.",
      delivery: "Costing in a spreadsheet and a PDF quote on your letterhead.",
    },
    {
      name: "Work orders on a phone",
      problem: "The order goes out by phone, so nobody knows who did what or how long it took.",
      solution: "The crew gets the order with items and materials, and closes it with hours used and a photo.",
      delivery: "Field view in the browser, no install.",
    },
    {
      name: "Site reports",
      problem: "Photos and notes end up in a group chat and nobody can find them a month later.",
      solution: "The daily report is filled in from a phone, with photos and timestamps, and files itself against the job.",
      delivery: "Site diary with an archive per project.",
    },
    {
      name: "Materials and waste",
      problem: "One thing was ordered, another used, and the difference shows only at the end of the job.",
      solution: "Usage is recorded against the work order, so variance from the norm shows during the job, not after it.",
      delivery: "Material records per project with planned against actual.",
    },
    {
      name: "Certificates and deadlines",
      problem: "Test certificates, warranties, equipment inspections, working-at-height training — a miss means a stoppage or a fine.",
      solution: "Every deadline in one place with a warning and a named owner.",
      delivery: "Document register with reminders.",
    },
    {
      name: "Catalogue and technical documentation",
      problem: "A customer asks for a datasheet, and it exists in three versions on three computers.",
      solution: "One documentation source with search by meaning — you ask a question and get the right document and page.",
      delivery: "Searchable document base with version control.",
    },
  ],
  sections: [
    {
      heading: "Why the quote, and not the production line",
      body: [
        "People expect AI in manufacturing to mean robots and failure prediction. For a company of twenty that is not the first step, it is the fifth. The first is the quote — because that is where you lose work that was already on the table, with no investment in equipment.",
      ],
    },
    {
      heading: "What stays with the engineer",
      bullets: [
        "Checking every costing before it goes out — the machine reads the document, it does not carry the liability.",
        "The technical solution and any departure from the design.",
        "Risk and site safety assessment.",
        "The relationship with the client and negotiating deadlines.",
      ],
    },
  ],
  howTo: {
    name: HOW_TO_NAME,
    steps: [
      {
        name: "One hour of conversation",
        text: "We measure how long the path from enquiry to a sent quote actually takes.",
      },
      {
        name: "One job, not all of them",
        text: "Almost always the take-off and the quote — that is where the loss is.",
      },
      {
        name: "Two to four weeks to launch",
        text: "Built on your norms and your supplier prices.",
      },
      {
        name: "Two weeks running in parallel",
        text: "Costings are produced both ways until they agree on real jobs.",
      },
      {
        name: "The next job",
        text: "Then work orders and site reporting.",
      },
    ],
  },
  faq: [
    {
      q: "Does it read drawings?",
      a: "It reads specifications, item schedules and written descriptions reliably. Drawings partially, and always with a check — on a drawing an error is not forgiven, so nothing relies on automation there.",
    },
    {
      q: "Our norms are in someone's head, not in a table.",
      a: "Then the first step is writing them down. That is a few days of work and it is worth doing with no software at all — a company whose norms live in one head cannot grow.",
    },
    {
      q: "Our site crews do not have good phones.",
      a: "The field view runs on older handsets and over a weak signal, buffering when the connection drops. If it demands newer devices, it is built wrong.",
    },
    {
      q: "We have an ERP. Does this go through it?",
      a: "It goes alongside it. The ERP stays the source of truth for stock and finance, and this layer solves what ERPs traditionally do badly — fast quoting and capture from the field.",
    },
  ],
  relatedServices: [
    { label: "Industry solutions", href: "/our-services/industrijska-resenja" },
    { label: "Internal business applications", href: "/our-services/interne-poslovne-aplikacije" },
  ],
};

const automotive: AiPage = {
  slug: "auto-servisi-i-prodaja",
  industry: "Garages and vehicle sales",
  eyebrow: "AI by industry",
  title: "AI for garages and vehicle sales — bookings, parts, listings",
  metaDescription:
    "What AI does for garages and car dealers: service booking, finding the right part from a VIN, listing descriptions, reminders for registration and servicing.",
  h1: "AI for garages and vehicle sales",
  lead:
    "A garage fields parts questions from under a bonnet, a dealer writes the same listing for the twentieth car. Both jobs suffer because nobody gets to the phone.",
  answer:
    "In a garage AI first solves two things: booking a slot without a phone call, and finding the right part from a VIN or a description of the fault, out of the catalogue you already use. In vehicle sales the value is in automatic listing copy from the specification and the photos, and in answering questions about mileage, service history and part exchange — because a buyer asks at 10pm and picks whoever answers first. The third layer, the one that holds revenue, is reminders for registration and scheduled servicing.",
  keywords: [
    "AI for garages",
    "online service booking",
    "parts lookup by VIN",
    "car listing description",
    "MOT reminder software",
    "garage management software",
  ],
  serviceName: "AI and automation for garages and vehicle sales",
  tasks: [
    {
      name: "Service booking",
      problem: "The phone rings while you are under a car. You do not answer, the customer goes elsewhere.",
      solution:
        "Slots are booked from the site, with the fault description and the model, against real ramp and technician availability.",
      delivery: "Booking with a calendar per bay and per job type.",
    },
    {
      name: "Which part fits",
      problem: "Half an hour goes on hunting the catalogue for a specific engine and year.",
      solution: "From the VIN or a description the part is suggested from your catalogue, with alternatives and stock levels.",
      delivery: "Parts lookup by VIN and by description, over your catalogue.",
    },
    {
      name: "An estimate before the work",
      problem: "The customer asks what it will cost, and the answer depends on what turns up once it is stripped.",
      solution:
        "From a typical job list and part prices comes a range with a clear split between what is certain and what depends on the findings.",
      delivery: "Itemised estimate with customer approval before work starts.",
    },
    {
      name: "Vehicle listing copy",
      problem: "Twenty cars waiting for text, so all of them get the same three lines.",
      solution:
        "From the specification, the options and the photos comes copy that leads with the real differences and carries every detail a buyer looks for.",
      delivery: "Listing description generator, with your review before publishing.",
    },
    {
      name: "Registration and service reminders",
      problem: "A customer remembers the registration the day before it expires and goes to whoever is free.",
      solution: "A message a month ahead with a slot offered — for both registration and mileage-based servicing.",
      delivery: "Vehicle records with deadlines and automatic messages.",
    },
    {
      name: "Vehicle history",
      problem: "What was done last time, which oil, which part — in a notebook or in a mechanic's head.",
      solution: "Service history per vehicle, available the moment a plate is typed in.",
      delivery: "Vehicle record with jobs, parts and photos.",
    },
  ],
  sections: [
    {
      heading: "Where the real money is",
      body: [
        "A garage usually thinks it needs more new customers. Almost always it needs the old ones back. A vehicle that has been in once has a known mileage, a known interval and a known registration date — that is three reasons to send a message a year, without a penny on advertising.",
      ],
    },
    {
      heading: "What AI does not do here",
      bullets: [
        "It does not diagnose instead of the mechanic.",
        "It does not confirm that an aftermarket part fits — that is the garage's liability.",
        "It does not price a repair before anyone has looked at it.",
        "It does not vouch for history it did not record itself.",
      ],
    },
  ],
  howTo: {
    name: HOW_TO_NAME,
    steps: [
      {
        name: "One hour of conversation",
        text: "We count missed calls and see how many customers never come back.",
      },
      {
        name: "One job, not all of them",
        text: "A garage starts with booking, a dealer with listing copy.",
      },
      {
        name: "Two to four weeks to launch",
        text: "Built on your parts catalogue and your bay schedule.",
      },
      {
        name: "Two weeks running in parallel",
        text: "The phone stays, but we measure how many slots arrive online.",
      },
      {
        name: "The next job",
        text: "Then vehicle records and reminders — that is where returning customers live.",
      },
    ],
  },
  proofHeading: "Systems of this kind already running",
  proof: [
    {
      label: "Prevoz Kop",
      href: "/our-projects/prevozkop-digitalni-prodajni-operativni-sistem",
      note: "Vehicles, work orders and costs in one system.",
    },
  ],
  faq: [
    {
      q: "We have a supplier parts catalogue. Is that the one used?",
      a: "Yes, if the supplier provides access or an export. The aim is not a new catalogue but faster search over the one you already pay for.",
    },
    {
      q: "Do reminders annoy customers?",
      a: "A message once every few months, with a concrete reason and a slot offered, rarely annoys. A weekly newsletter always does.",
    },
    {
      q: "We sell used cars too. Does one system cover both?",
      a: "They share the vehicle records, but they are two different flows — servicing runs on slots, sales on listings and enquiries. You build whichever currently costs you more.",
    },
    {
      q: "What if we do not have a website?",
      a: "Booking can run off a single page and a Google profile. A full site is the next step, not a prerequisite.",
    },
  ],
  relatedServices: [
    { label: "Booking systems", href: "/our-services/sistemi-za-zakazivanje" },
    { label: "Internal business applications", href: "/our-services/interne-poslovne-aplikacije" },
  ],
};

const professionalServices: AiPage = {
  slug: "knjigovodstvo-i-usluzne-firme",
  industry: "Accounting and professional services",
  eyebrow: "AI by industry",
  title: "AI for accountants and professional firms — documents, clients, deadlines",
  metaDescription:
    "What AI does for accounting practices, law firms and consultants: reading incoming documents, answering recurring client questions, deadline tracking and collections.",
  h1: "AI for accounting and professional services",
  lead:
    "An accountant, a lawyer and a consultant all sell hours. Every hour spent retyping, hunting for a document or answering the same question again is an hour that does not get billed.",
  answer:
    "For professional firms AI pays back fastest on incoming documents and on recurring client questions. Invoices, statements and contracts are read from a photo or PDF and fill the fields themselves, with mandatory confirmation for anything uncertain. In parallel, the questions a client asks every month — what do you need from me, when is the deadline, where is my document — get an answer immediately from your own documentation, so the phone rings for things that need your judgement.",
  keywords: [
    "AI for accountants",
    "automated invoice capture",
    "AI for law firms",
    "document processing automation",
    "client portal accounting",
    "deadline tracking software",
  ],
  serviceName: "AI and automation for accounting and professional services",
  tasks: [
    {
      name: "Incoming documents from a photo",
      problem: "A client sends photos of invoices in a chat app, and somebody retypes them all day.",
      solution:
        "The document is read, fields are filled, and anything uncertain is set aside for review. Through a portal the client sends directly, no chat app involved.",
      delivery: "Document inbox with review and export into your software.",
    },
    {
      name: "A client portal",
      problem: "The same client asks every month where their report is and how much they owe.",
      solution: "The client sees their own documents, obligations and deadlines, with access by account.",
      delivery: "Client portal with documents, statuses and messages.",
    },
    {
      name: "Deadlines that carry penalties",
      problem: "VAT, tax, filings, extensions — a missed deadline is paid for, and often out of your pocket.",
      solution: "An obligations calendar per client, with a named owner and advance warning.",
      delivery: "Deadline view per client with reminders.",
    },
    {
      name: "Searching your own files",
      problem: "The answer exists in a contract or an opinion from two years ago, and it cannot be found.",
      solution:
        "Search by meaning across your contracts, opinions and correspondence — you ask a question and get the document and the paragraph.",
      delivery: "Internal search over your archive, with nothing leaving the firm.",
    },
    {
      name: "Collections that slip",
      problem: "The invoice went out, 45 days have passed, and the reminder gets written by hand when somebody remembers.",
      solution:
        "The system tracks due dates and sends reminders on your schedule — first gentle, second firmer, third with your signature.",
      delivery: "Receivables register with automatic reminders.",
    },
    {
      name: "Drafting replies",
      problem: "The same type of email gets written again, and worded differently every time.",
      solution: "A draft from your own earlier replies and your tone, which you refine instead of starting from a blank page.",
      delivery: "Templates and drafts inside your mailbox.",
    },
  ],
  sections: [
    {
      heading: "Why this is less risky than it sounds",
      body: [
        "In accounting and law the first reaction is that a machine must not decide. Correct — and it does not. What runs here is transcription and retrieval, two jobs where a person makes more mistakes the longer the day gets. Anything below the confidence threshold goes for confirmation, and the opinion and the signature stay yours in every case.",
      ],
    },
    {
      heading: "Where the data lives",
      body: [
        "For a firm handling other people's finances and other people's cases, where data travels is not a technical detail but a condition of doing business. So for sensitive parts we use processing that never leaves your infrastructure, and for the rest we define exactly what is sent and what is retained. That is agreed before anything is set up.",
      ],
    },
  ],
  howTo: {
    name: HOW_TO_NAME,
    steps: [
      {
        name: "One hour of conversation",
        text: "We count how many hours a month go on data entry and on answering clients.",
      },
      {
        name: "One job, not all of them",
        text: "Almost always incoming documents — that is where the repetition is.",
      },
      {
        name: "Two to four weeks to launch",
        text: "Built on your document types and your software.",
      },
      {
        name: "Two weeks running in parallel",
        text: "Manual entry stays until accuracy is measured on one client's real documents.",
      },
      {
        name: "The next job",
        text: "Then the client portal and deadlines.",
      },
    ],
  },
  faq: [
    {
      q: "Does our clients' data go to OpenAI or a similar service?",
      a: "That depends on what is agreed, and it is defined before anything is set up. For sensitive parts there is processing that stays on your infrastructure. If an external service is used, exactly which data is sent, how long it is retained and whether it is used for training are all specified.",
    },
    {
      q: "How reliable is invoice reading?",
      a: "On clean printed documents, very. On a photo of a crumpled receipt, less so. That is why the confidence threshold is adjustable and everything below it goes to a person.",
    },
    {
      q: "Does this replace our accounting software?",
      a: "No. It sits in front of it and feeds it clean data. The software stays where it is.",
    },
    {
      q: "Our clients send documents through a chat app and that will not change.",
      a: "It does not have to. Messages with documents can be received and processed automatically, leaving the portal as an option for those who want order.",
    },
  ],
  relatedServices: [
    { label: "Internal business applications", href: "/our-services/interne-poslovne-aplikacije" },
    { label: "Cyber security and GDPR", href: "/our-services/cyber-security-gdpr" },
  ],
};

export const aiPagesEn: AiPage[] = [
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

export const aiIndexEn: AiIndexCopy = {
  path: "/ai",
  eyebrow: "AI by industry",
  title: "AI for small business — what it actually does, by industry",
  metaDescription:
    "What artificial intelligence really does inside small and mid-sized companies, broken down by industry: salons, transport, hospitality, e-commerce, property, education, manufacturing, garages, accounting.",
  h1: "AI for business, by industry",
  lead:
    "Nobody buys \"AI\". People buy fewer phone calls, a faster quote and less retyping. These pages set out which job that is in your industry — and which one pays back first.",
  answer:
    "For a small or mid-sized company AI is usable today in four places: it takes and qualifies enquiries when nobody is watching the phone, it builds a quote from your price list in minutes, it reads documents from a photo instead of having them retyped, and it answers the questions that repeat every day. Which of those comes first is not a technology question but an industry one — for a salon it is booking, for a haulier quoting and paperwork, for a shop the catalogue, for an accounting practice incoming documents.",
  keywords: [
    "AI for business",
    "AI for small business",
    "business automation",
    "how AI helps small companies",
    "AI by industry",
  ],
  sections: [
    {
      heading: "Four jobs that repeat in every industry",
      bullets: [
        "Taking and qualifying enquiries — so the answer does not wait for morning.",
        "Quotes and estimates from your own prices — so the job does not go to someone faster.",
        "Reading documents — so nothing gets retyped at night.",
        "Answering the questions that repeat — so the phone rings only when it should.",
      ],
      body: [
        "Everything else is a variation on those four. The difference between industries is not what is possible but which of the four currently costs you most.",
      ],
    },
    {
      heading: "How to tell whether it is worth it",
      body: [
        "One test, no calculator needed: if somebody in the company does the same task for more than an hour a day, and that task needs accuracy rather than judgement, it is worth it. If it needs judgement, estimation or a relationship with a person, it is not, and it is not worth attempting.",
      ],
    },
  ],
  faq: [
    {
      q: "What does introducing AI into a small company cost?",
      a: "It depends on how many jobs get automated and whether there is a system to hang them on. One complete job — booking, say, or document processing — is a smaller project than building a website. The exact figure goes into a quote after a conversation, because a flat number always misses here.",
    },
    {
      q: "Do we need a website first?",
      a: "Not necessarily. Booking, document processing and internal tools work without one. A site is needed when AI has to take enquiries from strangers.",
    },
    {
      q: "Does AI replace employees?",
      a: "In a company of five to thirty people, almost never. It replaces the part of the job nobody wants and that gets done after hours. Companies that size rarely have surplus people — they have a shortage of time.",
    },
    {
      q: "What if my industry is not listed?",
      a: "The pattern is the same — the four jobs above exist everywhere. Tell us what repeats daily in your company and you will get an answer on whether it is worth it, including the answer that it is not.",
    },
    {
      q: "Do you work outside Serbia?",
      a: "Yes. Clients are in Serbia, the wider region and the DACH market. Work is remote, with in-person meetings in Niš where it helps.",
    },
  ],
};
