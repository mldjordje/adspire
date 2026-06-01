import type { Metadata } from "next";
import Link from "next/link";
import { AzurioChrome } from "@/components/site/AzurioChrome";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy — Pijaca aplikacija | Adspire Digital" },
  description:
    "Politika privatnosti za Pijaca mobilnu aplikaciju. Informacije o prikupljanju, korišćenju i zaštiti podataka korisnika.",
  alternates: { canonical: "https://adspire.rs/projekti/pijaca/privacy-policy" },
  robots: { index: true, follow: true },
};

export default function PijacaPrivacyPolicyPage() {
  return (
    <AzurioChrome>
      <main style={{ background: "#FAFAFA", minHeight: "100vh" }}>

        {/* Header */}
        <div
          style={{
            background: "#fff",
            borderBottom: "1px solid #E8DDD0",
            padding: "100px 24px 40px",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            {/* Breadcrumb */}
            <nav
              style={{
                display: "flex",
                gap: "6px",
                alignItems: "center",
                marginBottom: "24px",
                fontSize: "13px",
                color: "#9C8870",
                flexWrap: "wrap",
              }}
            >
              <Link href="/" style={{ color: "#9C8870", textDecoration: "none" }}>Pocetna</Link>
              <span>›</span>
              <Link href="/our-projects" style={{ color: "#9C8870", textDecoration: "none" }}>Projekti</Link>
              <span>›</span>
              <Link href="/projekti/pijaca" style={{ color: "#9C8870", textDecoration: "none" }}>Pijaca</Link>
              <span>›</span>
              <span style={{ color: "#5C4A1E", fontWeight: 600 }}>Privacy Policy</span>
            </nav>

            {/* App badge */}
            <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "16px" }}>
              <span style={{ fontSize: "28px" }}>🌾</span>
              <span
                style={{
                  background: "#FEF3E2",
                  color: "#5C4A1E",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  border: "1px solid #E8DDD0",
                }}
              >
                Pijaca App
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(26px, 4vw, 38px)",
                fontWeight: 800,
                color: "#2C1A00",
                margin: "0 0 10px",
                lineHeight: 1.15,
              }}
            >
              Politika privatnosti
            </h1>
            <p style={{ color: "#9C8870", fontSize: "14px", margin: 0 }}>
              Na snazi od:{" "}
              <strong style={{ color: "#5C4A1E" }}>1. juna 2026.</strong>
              {" · "}
              Poslednja izmena:{" "}
              <strong style={{ color: "#5C4A1E" }}>jun 2026.</strong>
            </p>
          </div>
        </div>

        {/* Sadržaj */}
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "48px 24px 80px" }}>

          <Intro />

          <Section number="1" title="Koje podatke prikupljamo">
            <SubSection title="Podaci koje korisnik unosi">
              <ul>
                <li><strong>Email adresa</strong> — obavezna za registraciju i prijavu u aplikaciju.</li>
                <li><strong>Ime i prezime</strong> — prikazno ime na profilu korisnika.</li>
                <li><strong>Broj telefona</strong> — opciono; koristi se za koordinaciju dostave.</li>
                <li><strong>Profilna fotografija</strong> — opciono; korisnik bira da li će je dodati.</li>
                <li><strong>Adrese dostave</strong> — adrese koje korisnik unese za isporuku narudžbina.</li>
              </ul>
            </SubSection>
            <SubSection title="Podaci specifični za prodavce">
              <ul>
                <li>Naziv farme ili gazdinstva, opis i adresa.</li>
                <li>Fotografije proizvoda koje prodavac objavi.</li>
                <li>Podaci o cenama i dostupnosti proizvoda.</li>
              </ul>
            </SubSection>
            <SubSection title="Podaci o korišćenju">
              <ul>
                <li><strong>Narudžbine i istorija kupovine</strong> — detalji svih narudžbina.</li>
                <li><strong>Chat poruke</strong> — komunikacija između kupca i prodavca u okviru narudžbine.</li>
                <li><strong>Recenzije i ocene</strong> — komentari i ocene prodavaca.</li>
                <li><strong>Push notification token</strong> — za slanje obaveštenja o statusu narudžbine.</li>
              </ul>
            </SubSection>
            <SubSection title="Tehnički podaci (automatski)">
              <ul>
                <li>IP adresa i tip uređaja.</li>
                <li>Verzija operativnog sistema i aplikacije.</li>
                <li>Crash logovi i izveštaji o greškama (putem Sentry servisa).</li>
              </ul>
            </SubSection>
          </Section>

          <Section number="2" title="Kako koristimo podatke">
            <ul>
              <li><strong>Pružanje usluge</strong> — kreiranje naloga, obrada narudžbina, organizacija dostave.</li>
              <li><strong>Komunikacija između korisnika</strong> — omogućavanje chata između kupca i prodavca u okviru narudžbine.</li>
              <li><strong>Notifikacije</strong> — slanje push obaveštenja o promenama statusa narudžbine.</li>
              <li><strong>Poboljšanje aplikacije</strong> — analiza crash logova radi otklanjanja grešaka i poboljšanja performansi.</li>
              <li><strong>Pravna obaveza</strong> — čuvanje poslovnih evidencija u skladu s važećim propisima.</li>
              <li><strong>Bezbednost platforme</strong> — zaštita od prevare i zloupotebe.</li>
            </ul>
            <InfoBox color="#E8F5E9" border="#4CAF50">
              Ne koristimo podatke za ciljano oglašavanje niti ih prodajemo trećim stranama.
            </InfoBox>
          </Section>

          <Section number="3" title="Deljenje podataka s trećim stranama">
            <p>
              Pijaca deli podatke samo u sledećim slučajevima:
            </p>
            <ul>
              <li>
                <strong>Prodavac prima broj telefona kupca</strong> isključivo nakon potvrde narudžbine
                i isključivo u svrhu koordinacije dostave.
              </li>
              <li>
                <strong>Supabase</strong> — pružalac infrastrukture (hosting, baza podataka, autentifikacija,
                skladište fajlova). Podaci se čuvaju na serverima u EU (Frankfurt, Nemačka).
              </li>
              <li>
                <strong>Sentry</strong> — servis za praćenje grešaka i crash reportovanje.
                Pristup ima samo tehnički tim Adspire.
              </li>
              <li>
                <strong>Google</strong> — ako korisnik odabere Google Sign-In za autentifikaciju.
              </li>
              <li>
                <strong>Apple</strong> — ako korisnik odabere Apple Sign-In (samo iOS verzija).
              </li>
            </ul>
            <InfoBox color="#FFF3E0" border="#FF9800">
              Nikad ne prodajemo, iznajmljujemo niti razmenjujemo lične podatke korisnika s trećim
              stranama u komercijalne svrhe. Podatke ne koristimo za oglašavanje.
            </InfoBox>
          </Section>

          <Section number="4" title="Pohrana i bezbednost podataka">
            <ul>
              <li>
                <strong>Lokacija servera:</strong> svi podaci se čuvaju na Supabase serverima
                u EU (Frankfurt, Nemačka), u skladu s GDPR propisima.
              </li>
              <li>
                <strong>Lozinke:</strong> nikad se ne čuvaju u čitljivom obliku. Koristi se
                bcrypt hešovanje s odgovarajućim brojem iteracija.
              </li>
              <li>
                <strong>Row Level Security (RLS):</strong> baza podataka je zaštićena RLS politikama
                koje garantuju da korisnik može pristupiti samo sopstvenim podacima.
              </li>
              <li>
                <strong>Enkriptovane sesije:</strong> sesijski tokeni se čuvaju na uređaju putem
                Secure Storage (Expo SecureStore), nikad u neenkriptovanom lokalnom skladištu.
              </li>
              <li>
                <strong>HTTPS/TLS:</strong> sva komunikacija između aplikacije i servera je
                enkriptovana putem TLS protokola.
              </li>
            </ul>
            <p>
              Uprkos primeni tehničkih mera zaštite, nijedan sistem nije apsolutno siguran.
              U slučaju bezbednosnog incidenta koji utiče na vaše podatke, bićete obavešteni
              u skladu s važećim propisima.
            </p>
          </Section>

          <Section number="5" title="Vaša prava (GDPR)">
            <p>
              Ako se nalazite u Evropskom ekonomskom prostoru ili Srbiji, imate sledeća prava:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px", margin: "20px 0" }}>
              {[
                { icon: "👁️", title: "Pravo na pristup", desc: "Možete zatražiti kopiju svih podataka koje čuvamo o vama." },
                { icon: "✏️", title: "Pravo na ispravku", desc: "Možete zatražiti ispravku netačnih ili nepotpunih podataka." },
                { icon: "🗑️", title: "Pravo na brisanje", desc: "Možete zatražiti brisanje vašeg naloga i svih povezanih podataka." },
                { icon: "🚫", title: "Pravo na prigovor", desc: "Možete podneti prigovor na određene načine obrade podataka." },
                { icon: "📦", title: "Prenosivost podataka", desc: "Možete zatražiti podatke u mašinski čitljivom formatu." },
                { icon: "⏸️", title: "Ograničenje obrade", desc: "Možete zatražiti privremeno ograničenje obrade vaših podataka." },
              ].map((right) => (
                <div
                  key={right.title}
                  style={{
                    background: "#fff",
                    border: "1px solid #E8DDD0",
                    borderRadius: "12px",
                    padding: "20px",
                  }}
                >
                  <div style={{ fontSize: "24px", marginBottom: "8px" }}>{right.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: "14px", color: "#2C1A00", marginBottom: "6px" }}>{right.title}</div>
                  <div style={{ fontSize: "13px", color: "#7A6040", lineHeight: 1.5 }}>{right.desc}</div>
                </div>
              ))}
            </div>
            <p>
              Za ostvarivanje bilo kog od navedenih prava, pošaljite zahtev na:{" "}
              <a href="mailto:office@adspire.rs" style={{ color: "#5C4A1E", fontWeight: 600 }}>
                office@adspire.rs
              </a>
            </p>
          </Section>

          <Section number="6" title="Brisanje naloga">
            <p>
              Korisnik može u svakom trenutku zatražiti brisanje svog naloga i svih
              povezanih podataka. Postoje dva načina:
            </p>
            <ul>
              <li>
                <strong>Iz aplikacije:</strong> Profil → Podešavanja → Obriši nalog
                (funkcionalnost dostupna u aplikaciji).
              </li>
              <li>
                <strong>Emailom:</strong> Pošaljite zahtev na{" "}
                <a href="mailto:office@adspire.rs" style={{ color: "#5C4A1E" }}>office@adspire.rs</a>{" "}
                sa naznakom "Brisanje naloga — Pijaca" i email adresom naloga koji želite obrisati.
              </li>
            </ul>
            <InfoBox color="#FFF3E0" border="#FF9800">
              Svi lični podaci biće trajno obrisani u roku od <strong>30 dana</strong> od prijema
              zahteva. Napominjemo da podaci o završenim transakcijama mogu biti zadržani duže
              radi ispunjavanja zakonskih obaveza.
            </InfoBox>
          </Section>

          <Section number="7" title="Zaštita dece">
            <p>
              Pijaca aplikacija <strong>nije namenjena osobama mlađim od 13 godina</strong>.
              Ne prikupljamo namerno lične podatke dece mlađe od 13 godina.
            </p>
            <p>
              Ako ste roditelj ili staratelj i smatrate da je vaše dete dostavilo lične podatke
              putem naše aplikacije, molimo kontaktirajte nas na{" "}
              <a href="mailto:office@adspire.rs" style={{ color: "#5C4A1E" }}>office@adspire.rs</a>{" "}
              kako bismo preduzeli odgovarajuće mere.
            </p>
          </Section>

          <Section number="8" title="Kolačići i lokalno skladište">
            <p>
              Pijaca aplikacija <strong>ne koristi kolačiće</strong> (cookies), pošto je mobilna
              aplikacija, a ne web stranica.
            </p>
            <p>
              Aplikacija koristi:
            </p>
            <ul>
              <li>
                <strong>Expo SecureStore</strong> — za bezbedno čuvanje sesijskog tokena
                na uređaju (enkriptovano).
              </li>
              <li>
                <strong>AsyncStorage</strong> — za čuvanje nekritičnih korisničkih podešavanja
                (npr. tema aplikacije).
              </li>
            </ul>
            <p>
              Ovi podaci ostaju isključivo na vašem uređaju i ne šalju se trećim stranama.
            </p>
          </Section>

          <Section number="9" title="Izmene ove politike privatnosti">
            <p>
              Zadržavamo pravo izmene ove politike privatnosti u cilju prilagođavanja
              promenama u aplikaciji ili važećim propisima.
            </p>
            <p>
              O svim značajnim izmenama bićete obavešteni:
            </p>
            <ul>
              <li>Putem email obaveštenja na adresu registrovanu u aplikaciji.</li>
              <li>Putem obaveštenja unutar same aplikacije pri sledećem otvaranju.</li>
            </ul>
            <p>
              Preporučujemo da povremeno proverite ovu stranicu. Nastavak korišćenja
              aplikacije nakon obaveštenja o izmenama smatra se prihvatanjem novih uslova.
            </p>
          </Section>

          <Section number="10" title="Kontakt">
            <p>
              Za sva pitanja u vezi s privatnošću, zahtevima za brisanje podataka
              ili pritužbama, možete nas kontaktirati:
            </p>
            <div
              style={{
                background: "#fff",
                border: "1px solid #E8DDD0",
                borderRadius: "16px",
                padding: "28px",
                margin: "20px 0",
              }}
            >
              <div style={{ fontWeight: 700, fontSize: "18px", color: "#2C1A00", marginBottom: "16px" }}>
                🌾 Adspire
              </div>
              <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <tbody>
                  {[
                    { label: "Kompanija", value: "Adspire" },
                    { label: "Web", value: <a href="https://adspire.rs" style={{ color: "#5C4A1E" }}>adspire.rs</a> },
                    { label: "Email", value: <a href="mailto:office@adspire.rs" style={{ color: "#5C4A1E" }}>office@adspire.rs</a> },
                    { label: "Aplikacija", value: "Pijaca (Android — Google Play Store)" },
                  ].map((row) => (
                    <tr key={row.label}>
                      <td style={{ padding: "8px 16px 8px 0", color: "#9C8870", fontSize: "14px", fontWeight: 600, width: "120px", verticalAlign: "top" }}>
                        {row.label}
                      </td>
                      <td style={{ padding: "8px 0", color: "#2C1A00", fontSize: "14px" }}>
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ color: "#7A6040", fontSize: "14px" }}>
              Odgovorićemo na vaš zahtev u roku od 72 sata. Za zahteve za brisanje
              podataka, rok je 30 dana.
            </p>
          </Section>

          {/* Footer navigacija */}
          <div
            style={{
              borderTop: "1px solid #E8DDD0",
              paddingTop: "32px",
              marginTop: "48px",
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/projekti/pijaca"
              style={{
                background: "#5C4A1E",
                color: "#FAF6F1",
                padding: "12px 24px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "14px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              ← Nazad na Pijaca
            </Link>
            <Link
              href="/our-projects"
              style={{
                background: "transparent",
                color: "#5C4A1E",
                padding: "12px 24px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "14px",
                border: "1px solid #C8B89A",
              }}
            >
              Svi projekti
            </Link>
          </div>

        </div>
      </main>
    </AzurioChrome>
  );
}

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: "48px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "20px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            minWidth: "36px",
            background: "#5C4A1E",
            color: "#FAF6F1",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: "14px",
            marginTop: "2px",
          }}
        >
          {number}
        </div>
        <h2
          style={{
            fontSize: "clamp(18px, 3vw, 24px)",
            fontWeight: 800,
            color: "#2C1A00",
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {title}
        </h2>
      </div>
      <div
        style={{
          paddingLeft: "52px",
          color: "#4A3828",
          fontSize: "15px",
          lineHeight: 1.8,
        }}
      >
        {children}
      </div>
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h3
        style={{
          fontSize: "15px",
          fontWeight: 700,
          color: "#5C4A1E",
          margin: "0 0 8px",
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function InfoBox({
  children,
  color,
  border,
}: {
  children: React.ReactNode;
  color: string;
  border: string;
}) {
  return (
    <div
      style={{
        background: color,
        borderLeft: `4px solid ${border}`,
        borderRadius: "0 8px 8px 0",
        padding: "16px 20px",
        margin: "20px 0",
        fontSize: "14px",
        color: "#2C1A00",
        lineHeight: 1.6,
      }}
    >
      {children}
    </div>
  );
}

function Intro() {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #E8DDD0",
        borderRadius: "16px",
        padding: "28px",
        marginBottom: "48px",
        fontSize: "15px",
        color: "#4A3828",
        lineHeight: 1.7,
      }}
    >
      <p style={{ margin: "0 0 12px" }}>
        <strong>Pijaca</strong> je mobilna aplikacija koju razvija i održava{" "}
        <strong>Adspire</strong> (<a href="https://adspire.rs" style={{ color: "#5C4A1E" }}>adspire.rs</a>).
        Aplikacija omogućava lokalnim farmama i gazdinstvima da prodaju sveže, domaće
        namirnice direktno kupcima.
      </p>
      <p style={{ margin: 0 }}>
        Ova politika privatnosti objašnjava koje podatke prikupljamo, kako ih koristimo,
        s kim ih delimo i koja su vaša prava. Korišćenjem aplikacije Pijaca prihvatate
        prakse opisane u ovom dokumentu.
      </p>
    </div>
  );
}
