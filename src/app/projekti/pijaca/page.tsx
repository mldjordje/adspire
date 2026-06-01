import type { Metadata } from "next";
import Link from "next/link";
import { AzurioChrome } from "@/components/site/AzurioChrome";

export const metadata: Metadata = {
  title: { absolute: "Pijaca — mobilna aplikacija za lokalne proizvođače | Adspire Digital" },
  description:
    "Pijaca je mobilna platforma koja spaja lokalne farmere i gazdinstva sa kupcima koji žele sveže, domaće namirnice. React Native, Expo, Supabase.",
  alternates: { canonical: "https://adspire.rs/projekti/pijaca" },
  openGraph: {
    type: "article",
    locale: "sr_RS",
    url: "https://adspire.rs/projekti/pijaca",
    siteName: "Adspire Digital",
    title: "Pijaca — mobilna aplikacija za lokalne proizvođače",
    description:
      "Lokalna kupovina direktno od proizvođača — bez posrednika. React Native + Expo + Supabase.",
  },
  robots: { index: true, follow: true },
};

const FEATURES = [
  { icon: "🛒", title: "Kupovina s farmi", desc: "Pregledaj i naruči proizvode direktno od lokalnih farmera i gazdinstva." },
  { icon: "📦", title: "Praćenje narudžbine", desc: "Realno vreme: pending → confirmed → preparing → out for delivery → delivered." },
  { icon: "💬", title: "Chat kupac–prodavac", desc: "Direktna komunikacija po svakoj narudžbini, bez trećih strana." },
  { icon: "🔔", title: "Push notifikacije", desc: "Obaveštenje za svaki status narudžbine — nikad ne propusti isporuku." },
  { icon: "⭐", title: "Recenzije i ocene", desc: "Sistem ocenjivanja prodavaca gradi poverenje i kvalitet platforme." },
  { icon: "📍", title: "Pretraga po lokaciji", desc: "Pronadi farme i proizvode u svojoj okolini po kategoriji." },
  { icon: "❤️", title: "Lista omiljenih", desc: "Sacuvaj omiljene proizvode i farme za brzu ponovnu kupovinu." },
  { icon: "🧾", title: "Istorija narudžbina", desc: "Kompletan pregled svih prošlih narudžbina na jednom mestu." },
  { icon: "📊", title: "Dashboard za prodavce", desc: "Analitike, prihodi, pregled narudžbina i statistike prodaje." },
  { icon: "💰", title: "Finansijski pregled", desc: "Transparentno: bruto prihod, provizija platforme (10%), neto zarada." },
];

const STACK = [
  { name: "React Native", sub: "Mobilna app" },
  { name: "Expo", sub: "Build + Dev" },
  { name: "TypeScript", sub: "Jezik" },
  { name: "Supabase", sub: "DB + Auth + Storage" },
  { name: "Expo Router", sub: "Navigacija" },
  { name: "TanStack Query", sub: "State mgmt" },
  { name: "Zustand", sub: "Global store" },
  { name: "Sentry", sub: "Crash reporting" },
  { name: "EAS Build", sub: "CI/CD" },
  { name: "Play Store", sub: "Distribucija" },
];

const ROLES = [
  {
    emoji: "🧑‍🛒",
    name: "Kupac",
    color: "#E8F5E9",
    border: "#4CAF50",
    actions: [
      "Pregledanje i pretraga proizvoda",
      "Naručivanje od lokalnih farmera",
      "Pracenje statusa narudžbine",
      "Chat sa prodavcem",
      "Ocenjivanje i recenzije",
      "Lista omiljenih farmi i proizvoda",
    ],
  },
  {
    emoji: "🌾",
    name: "Prodavac",
    color: "#FFF8E1",
    border: "#FF9800",
    actions: [
      "Objavljivanje i upravljanje proizvodima",
      "Prihvatanje i obrada narudžbina",
      "Komunikacija s kupcima",
      "Pracenje prihoda i analitika",
      "Finansijski izveštaji (bruto/neto)",
      "Dashboard sa svim narudžbinama",
    ],
  },
  {
    emoji: "🔧",
    name: "Admin",
    color: "#EDE7F6",
    border: "#673AB7",
    actions: [
      "Upravljanje platformom",
      "Pregled svih prodavaca",
      "Pregled svih narudžbina",
      "Moderacija sadržaja",
      "Provizije i finansije platforme",
      "Podrška korisnicima",
    ],
  },
];

export default function PijacaProjectPage() {
  return (
    <AzurioChrome>
      <main style={{ background: "#FAF6F1", minHeight: "100vh" }}>

        {/* ─── HERO ─── */}
        <section
          style={{
            background: "linear-gradient(135deg, #5C4A1E 0%, #3a2d10 100%)",
            padding: "0",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Dekorativni krug */}
          <div
            style={{
              position: "absolute",
              top: "-120px",
              right: "-120px",
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.03)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-80px",
              left: "-80px",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: "rgba(255,165,0,0.06)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "32px 24px 64px",
            }}
          >
            {/* Breadcrumb */}
            <nav
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
                marginBottom: "48px",
                fontSize: "13px",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>
                Pocetna
              </Link>
              <span>›</span>
              <Link href="/our-projects" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>
                Projekti
              </Link>
              <span>›</span>
              <span style={{ color: "#F5A623" }}>Pijaca</span>
            </nav>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "48px",
                alignItems: "center",
              }}
            >
              {/* Leva strana */}
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    gap: "8px",
                    marginBottom: "24px",
                    flexWrap: "wrap",
                  }}
                >
                  {["Mobile App", "React Native", "Expo"].map((tag) => (
                    <span
                      key={tag}
                      style={{
                        background: "rgba(245,166,35,0.15)",
                        color: "#F5A623",
                        border: "1px solid rgba(245,166,35,0.3)",
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                  <span
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      color: "rgba(255,255,255,0.5)",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                    }}
                  >
                    2026
                  </span>
                </div>

                <h1
                  style={{
                    fontSize: "clamp(52px, 8vw, 96px)",
                    fontWeight: 800,
                    color: "#FAF6F1",
                    margin: "0 0 16px",
                    lineHeight: 1,
                    letterSpacing: "-2px",
                  }}
                >
                  Pijaca
                </h1>

                <p
                  style={{
                    fontSize: "clamp(16px, 2vw, 22px)",
                    color: "rgba(250,246,241,0.7)",
                    margin: "0 0 40px",
                    lineHeight: 1.5,
                    maxWidth: "480px",
                  }}
                >
                  Lokalna kupovina direktno od proizvođača — bez posrednika.
                </p>

                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  <a
                    href="#o-projektu"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "#F5A623",
                      color: "#3a2d10",
                      padding: "14px 28px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      fontWeight: 700,
                      fontSize: "15px",
                    }}
                  >
                    Istraži projekat
                  </a>
                  <Link
                    href="/contact-us"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "transparent",
                      color: "#FAF6F1",
                      padding: "14px 28px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      fontWeight: 600,
                      fontSize: "15px",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    Kontaktiraj nas
                  </Link>
                </div>
              </div>

              {/* Desna strana — telefon mockup */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <PhoneMockup />
              </div>
            </div>
          </div>
        </section>

        {/* ─── O PROJEKTU ─── */}
        <section id="o-projektu" style={{ padding: "80px 24px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "64px",
                alignItems: "start",
              }}
            >
              <div>
                <span
                  style={{
                    color: "#F5A623",
                    fontWeight: 700,
                    fontSize: "12px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "16px",
                  }}
                >
                  O projektu
                </span>
                <h2
                  style={{
                    fontSize: "clamp(28px, 4vw, 42px)",
                    fontWeight: 800,
                    color: "#2C1A00",
                    margin: "0 0 24px",
                    lineHeight: 1.2,
                    letterSpacing: "-1px",
                  }}
                >
                  Svezi proizvodi, direktno od farme do stola
                </h2>
                <p style={{ color: "#5C4A1E", lineHeight: 1.7, fontSize: "16px", margin: "0 0 16px" }}>
                  Pijaca je mobilna platforma koja spaja lokalne poljoprivredne proizvođače
                  (farmere, gazdinstva) sa kupcima koji žele sveže, domaće namirnice.
                  Kupci naručuju direktno od prodavaca, bez trgovačkih lanaca.
                </p>
                <p style={{ color: "#5C4A1E", lineHeight: 1.7, fontSize: "16px", margin: "0" }}>
                  Platforma naplaćuje malu proviziju od <strong>10%</strong> po uspešno isporučenoj narudžbini,
                  dok prodavci transparentno vide svoju zaradu.
                </p>
              </div>

              <div>
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid #E8DDD0",
                    borderRadius: "16px",
                    padding: "32px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#2C1A00",
                      margin: "0 0 20px",
                    }}
                  >
                    Problem koji rešavamo
                  </h3>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                    {[
                      "Lokalni proizvođači nemaju digitalni kanal prodaje",
                      "Kupci ne znaju odakle dolazi hrana i ne mogu naći lokalne proizvođače u okolini",
                      "Trenutna rešenja (pijace, Facebook grupe) su neorganizovana i nepouzdana",
                    ].map((item, i) => (
                      <li
                        key={i}
                        style={{
                          display: "flex",
                          gap: "12px",
                          padding: "12px 0",
                          borderBottom: i < 2 ? "1px solid #F0EAE0" : "none",
                          color: "#5C4A1E",
                          fontSize: "15px",
                          lineHeight: 1.5,
                        }}
                      >
                        <span
                          style={{
                            width: "24px",
                            height: "24px",
                            minWidth: "24px",
                            borderRadius: "50%",
                            background: "#FEF3E2",
                            color: "#F5A623",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "12px",
                            fontWeight: 700,
                            marginTop: "2px",
                          }}
                        >
                          {i + 1}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── POSLOVNI MODEL ─── */}
        <section style={{ background: "#5C4A1E", padding: "64px 24px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
            <span
              style={{
                color: "rgba(245,166,35,0.8)",
                fontWeight: 700,
                fontSize: "12px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "12px",
              }}
            >
              Poslovni model
            </span>
            <h2
              style={{
                fontSize: "clamp(24px, 4vw, 36px)",
                fontWeight: 800,
                color: "#FAF6F1",
                margin: "0 0 16px",
              }}
            >
              Transparentna provizija od 10%
            </h2>
            <p
              style={{
                color: "rgba(250,246,241,0.7)",
                maxWidth: "560px",
                margin: "0 auto 48px",
                lineHeight: 1.6,
                fontSize: "16px",
              }}
            >
              Platforma uzima 10% provizije na svaku uspešno isporučenu narudžbinu.
              Prodavci uvek vide transparentno: bruto prihod − provizija = neto zarada.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "0",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              {[
                { label: "Bruto", value: "100%", sub: "Ukupna vrednost narudžbine", highlight: false },
                { label: "Provizija", value: "10%", sub: "Prihod platforme Pijaca", highlight: true },
                { label: "Neto", value: "90%", sub: "Zarada prodavca", highlight: false },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    background: item.highlight ? "#F5A623" : "rgba(255,255,255,0.08)",
                    color: item.highlight ? "#3a2d10" : "#FAF6F1",
                    padding: "28px 20px",
                    borderRadius: i === 0 ? "12px 0 0 12px" : i === 2 ? "0 12px 12px 0" : "0",
                    borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.1)" : "none",
                  }}
                >
                  <div style={{ fontSize: "32px", fontWeight: 800, lineHeight: 1 }}>{item.value}</div>
                  <div style={{ fontWeight: 700, fontSize: "14px", margin: "8px 0 4px" }}>{item.label}</div>
                  <div style={{ fontSize: "12px", opacity: 0.7 }}>{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FUNKCIONALNOSTI ─── */}
        <section style={{ padding: "80px 24px", background: "#FAF6F1" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <span
                style={{
                  color: "#F5A623",
                  fontWeight: 700,
                  fontSize: "12px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "12px",
                }}
              >
                Funkcionalnosti
              </span>
              <h2
                style={{
                  fontSize: "clamp(28px, 4vw, 40px)",
                  fontWeight: 800,
                  color: "#2C1A00",
                  margin: "0",
                  letterSpacing: "-1px",
                }}
              >
                Sve što ti treba na jednom mestu
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "20px",
              }}
            >
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  style={{
                    background: "#fff",
                    border: "1px solid #E8DDD0",
                    borderRadius: "16px",
                    padding: "28px",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                >
                  <div
                    style={{
                      fontSize: "32px",
                      marginBottom: "16px",
                      width: "56px",
                      height: "56px",
                      background: "#FEF3E2",
                      borderRadius: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {f.icon}
                  </div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#2C1A00", margin: "0 0 8px" }}>
                    {f.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: "#7A6040", lineHeight: 1.6, margin: 0 }}>
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── KORISNIČKE ULOGE ─── */}
        <section style={{ padding: "80px 24px", background: "#F5EFE6" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <span
                style={{
                  color: "#F5A623",
                  fontWeight: 700,
                  fontSize: "12px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "12px",
                }}
              >
                Korisničke uloge
              </span>
              <h2
                style={{
                  fontSize: "clamp(28px, 4vw, 40px)",
                  fontWeight: 800,
                  color: "#2C1A00",
                  margin: "0",
                  letterSpacing: "-1px",
                }}
              >
                Tri tipa korisnika, jedan ekosistem
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "24px",
              }}
            >
              {ROLES.map((role) => (
                <div
                  key={role.name}
                  style={{
                    background: "#fff",
                    border: `2px solid ${role.border}`,
                    borderRadius: "20px",
                    padding: "32px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                    <div
                      style={{
                        width: "52px",
                        height: "52px",
                        background: role.color,
                        borderRadius: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "26px",
                      }}
                    >
                      {role.emoji}
                    </div>
                    <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#2C1A00", margin: 0 }}>
                      {role.name}
                    </h3>
                  </div>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                    {role.actions.map((action, i) => (
                      <li
                        key={i}
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "flex-start",
                          padding: "8px 0",
                          borderBottom: i < role.actions.length - 1 ? "1px solid #F0EAE0" : "none",
                          fontSize: "14px",
                          color: "#5C4A1E",
                          lineHeight: 1.4,
                        }}
                      >
                        <span style={{ color: role.border, fontWeight: 700, flexShrink: 0 }}>✓</span>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TECH STACK ─── */}
        <section style={{ padding: "80px 24px", background: "#2C1A00" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <span
                style={{
                  color: "rgba(245,166,35,0.8)",
                  fontWeight: 700,
                  fontSize: "12px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "12px",
                }}
              >
                Tehnologije
              </span>
              <h2
                style={{
                  fontSize: "clamp(28px, 4vw, 40px)",
                  fontWeight: 800,
                  color: "#FAF6F1",
                  margin: "0",
                  letterSpacing: "-1px",
                }}
              >
                Tech stack
              </h2>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                justifyContent: "center",
              }}
            >
              {STACK.map((tech) => (
                <div
                  key={tech.name}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    padding: "16px 24px",
                    textAlign: "center",
                    minWidth: "120px",
                  }}
                >
                  <div style={{ color: "#FAF6F1", fontWeight: 700, fontSize: "15px" }}>{tech.name}</div>
                  <div style={{ color: "rgba(250,246,241,0.45)", fontSize: "12px", marginTop: "4px" }}>
                    {tech.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── STATUS ─── */}
        <section style={{ padding: "80px 24px", background: "#FAF6F1" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <span
                style={{
                  color: "#F5A623",
                  fontWeight: 700,
                  fontSize: "12px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "12px",
                }}
              >
                Trenutni status
              </span>
              <h2
                style={{
                  fontSize: "clamp(28px, 4vw, 40px)",
                  fontWeight: 800,
                  color: "#2C1A00",
                  margin: "0",
                  letterSpacing: "-1px",
                }}
              >
                Rezultati i napredak
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
              }}
            >
              {[
                { icon: "📱", title: "Beta testiranje", desc: "Aplikacija je u beta fazi na Android platformi sa stvarnim korisnicima.", badge: "U toku", badgeColor: "#F5A623" },
                { icon: "🚀", title: "Play Store spreman", desc: "Sve tehničke i pravne pripreme završene za objavu na Google Play Store.", badge: "Spreman", badgeColor: "#4CAF50" },
                { icon: "🏗️", title: "Skalabilna arhitektura", desc: "Infrastruktura projektovana za više tržišta i veći broj korisnika.", badge: "Implementirano", badgeColor: "#2196F3" },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{
                    background: "#fff",
                    border: "1px solid #E8DDD0",
                    borderRadius: "16px",
                    padding: "28px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "36px", marginBottom: "12px" }}>{item.icon}</div>
                  <span
                    style={{
                      background: item.badgeColor + "20",
                      color: item.badgeColor,
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "4px 10px",
                      borderRadius: "20px",
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.badge}
                  </span>
                  <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#2C1A00", margin: "12px 0 8px" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: "#7A6040", lineHeight: 1.6, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section
          style={{
            background: "linear-gradient(135deg, #F5A623 0%, #E8941A 100%)",
            padding: "80px 24px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 800,
                color: "#2C1A00",
                margin: "0 0 16px",
                letterSpacing: "-1px",
              }}
            >
              Zainteresovan za Pijaca?
            </h2>
            <p style={{ color: "rgba(44,26,0,0.75)", fontSize: "18px", lineHeight: 1.6, margin: "0 0 40px" }}>
              Kontaktiraj nas za više informacija o projektu ili pogledaj Privacy Policy aplikacije.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/projekti/pijaca/privacy-policy"
                style={{
                  background: "#2C1A00",
                  color: "#FAF6F1",
                  padding: "14px 28px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: "15px",
                }}
              >
                Pogledaj Privacy Policy
              </Link>
              <Link
                href="/contact-us"
                style={{
                  background: "transparent",
                  color: "#2C1A00",
                  padding: "14px 28px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: "15px",
                  border: "2px solid #2C1A00",
                }}
              >
                Kontaktiraj nas
              </Link>
            </div>
          </div>
        </section>

      </main>
    </AzurioChrome>
  );
}

function PhoneMockup() {
  return (
    <svg
      width="220"
      height="420"
      viewBox="0 0 220 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 32px 64px rgba(0,0,0,0.4))" }}
    >
      {/* Phone frame */}
      <rect x="4" y="4" width="212" height="412" rx="36" fill="#1a1208" />
      <rect x="8" y="8" width="204" height="404" rx="33" fill="#0d0a04" stroke="#3a2d10" strokeWidth="1" />
      {/* Screen */}
      <rect x="12" y="12" width="196" height="396" rx="30" fill="#FAF6F1" />
      {/* Notch */}
      <rect x="72" y="16" width="76" height="22" rx="11" fill="#0d0a04" />

      {/* App content */}
      {/* Top bar green */}
      <rect x="12" y="12" width="196" height="64" rx="30" fill="#5C4A1E" />
      <rect x="12" y="42" width="196" height="34" fill="#5C4A1E" />

      {/* App title */}
      <text x="110" y="72" textAnchor="middle" fill="#FAF6F1" fontSize="16" fontWeight="bold" fontFamily="system-ui">🌾 Pijaca</text>

      {/* Search bar */}
      <rect x="24" y="88" width="172" height="30" rx="15" fill="#F0EAE0" />
      <text x="44" y="108" fill="#9C8870" fontSize="11" fontFamily="system-ui">Pretraži proizvode…</text>
      <text x="178" y="108" fill="#9C8870" fontSize="13" fontFamily="system-ui">🔍</text>

      {/* Category chips */}
      {[
        { x: 24, label: "🥕 Povrće" },
        { x: 96, label: "🍎 Voće" },
        { x: 156, label: "🥚 Jaja" },
      ].map((chip) => (
        <g key={chip.label}>
          <rect x={chip.x} y="128" width={chip.label.length * 7 + 8} height="22" rx="11" fill={chip.x === 24 ? "#5C4A1E" : "#F0EAE0"} />
          <text x={chip.x + (chip.label.length * 7 + 8) / 2} y="143" textAnchor="middle" fill={chip.x === 24 ? "#FAF6F1" : "#5C4A1E"} fontSize="10" fontFamily="system-ui">{chip.label}</text>
        </g>
      ))}

      {/* Product cards */}
      {[
        { y: 164, name: "Domaći paradajz", farm: "Farma Petrović", price: "180 din/kg", emoji: "🍅" },
        { y: 248, name: "Svež med", farm: "Pčelarstvo Jović", price: "850 din/kg", emoji: "🍯" },
        { y: 332, name: "Organska jaja", farm: "Farma Nikolić", price: "20 din/kom", emoji: "🥚" },
      ].map((card) => (
        <g key={card.name}>
          <rect x="24" y={card.y} width="172" height="74" rx="12" fill="#fff" />
          <rect x="24" y={card.y} width="172" height="74" rx="12" stroke="#E8DDD0" strokeWidth="1" />
          {/* Emoji thumb */}
          <rect x="32" y={card.y + 10} width="50" height="54" rx="8" fill="#FEF3E2" />
          <text x="57" y={card.y + 44} textAnchor="middle" fontSize="22" fontFamily="system-ui">{card.emoji}</text>
          {/* Text */}
          <text x="92" y={card.y + 26} fill="#2C1A00" fontSize="11" fontWeight="600" fontFamily="system-ui">{card.name}</text>
          <text x="92" y={card.y + 40} fill="#9C8870" fontSize="9" fontFamily="system-ui">{card.farm}</text>
          <text x="92" y={card.y + 56} fill="#F5A623" fontSize="11" fontWeight="700" fontFamily="system-ui">{card.price}</text>
          {/* Add button */}
          <circle cx="176" cy={card.y + 37} r="13" fill="#5C4A1E" />
          <text x="176" y={card.y + 42} textAnchor="middle" fill="#FAF6F1" fontSize="16" fontFamily="system-ui">+</text>
        </g>
      ))}

      {/* Bottom nav */}
      <rect x="12" y="368" width="196" height="40" rx="0" fill="#fff" />
      <rect x="12" y="368" width="196" height="40" rx="0" stroke="#F0EAE0" strokeWidth="0.5" />
      <rect x="12" y="396" width="196" height="12" rx="30" fill="#fff" />
      {["🏠", "🔍", "🛒", "👤"].map((icon, i) => (
        <text key={icon} x={34 + i * 48} y={392} textAnchor="middle" fontSize="16" fontFamily="system-ui" fill={i === 0 ? "#5C4A1E" : "#C0A882"}>{icon}</text>
      ))}

      {/* Side buttons */}
      <rect x="0" y="120" width="4" height="40" rx="2" fill="#3a2d10" />
      <rect x="0" y="170" width="4" height="40" rx="2" fill="#3a2d10" />
      <rect x="216" y="140" width="4" height="60" rx="2" fill="#3a2d10" />
    </svg>
  );
}
