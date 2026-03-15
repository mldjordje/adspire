export default function NotFound() {
  return (
    <main className="mxd-site-shell" style={{ paddingTop: 120, paddingBottom: 80 }}>
      <section className="mxd-section">
        <div className="mxd-cta-card">
          <p className="mxd-kicker">404</p>
          <h1>Stranica nije pronadjena</h1>
          <p>Link vise ne postoji ili je prebacen na novu, kanonsku stranicu sajta.</p>
          <div className="mxd-btn-row">
            <a href="/" className="mxd-pill-btn">Nazad na pocetnu</a>
            <a href="/our-services" className="mxd-ghost-btn">Pogledaj usluge</a>
          </div>
        </div>
      </section>
    </main>
  );
}
