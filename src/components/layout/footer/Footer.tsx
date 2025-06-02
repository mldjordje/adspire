import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "public/images/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
 return (
  <footer
    className="footer section pb-0"
    style={{ backgroundImage: "url('/images/footer/footer-bg.png')" }}
  >
    <div className="container">
      <div className="row gaper">
        <div className="col-12 col-lg-5 col-xl-6">
          <div className="footer__single">
            <Link href="/" className="logo">
              <Image src={logo} alt="Adspire logo" />
            </Link>
            <div className="footer__single-meta">
              <Link
                href="https://www.google.com/maps?q=Dimitrija+Leka+66"
                target="_blank"
              >
                <i className="fa-sharp fa-solid fa-location-dot"></i>
                Dimitrija Leka 66, Niš
              </Link>
              <Link href="tel:0601491491">
                <i className="fa-sharp fa-solid fa-phone-volume"></i>
                060 1491491
              </Link>
              <Link href="mailto:djordje@adspire.rs">
                <i className="fa-sharp fa-solid fa-envelope"></i>
                djordje@adspire.rs
              </Link>
            </div>
            <div className="footer__cta text-start">
              <Link href="/contact-us" className="btn btn--secondary">
                Kontaktiraj nas
              </Link>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-2 col-xl-2">
          <div className="footer__single">
            <div className="footer__single-intro">
              <h5>Stranice</h5>
            </div>
            <div className="footer__single-content">
              <ul>
                <li>
                  <Link href="/about-us">O nama</Link>
                </li>
                <li>
                  <Link href="/our-services">Usluge</Link>
                </li>
                <li>
                  <Link href="/our-projects">Projekti</Link>
                </li>
                <li>
                  <Link href="/contact-us">Kontakt</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        
      </div>

      <div className="row">
        <div className="col-12">
          <div className="footer__copyright">
            <div className="row align-items-center gaper">
              <div className="col-12 col-lg-8">
                <div className="footer__copyright-text text-center text-lg-start">
                  <p>
                    &copy; <span id="copyYear">{new Date().getFullYear()}</span> Adspire. Sva prava zadržana.
                  </p>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <div className="social justify-content-center justify-content-lg-end">
                  <Link href="https://www.instagram.com/adspire.rs" target="_blank">
                    <i className="fa-brands fa-instagram"></i>
                  </Link>
                  {/* Dodaj još mreža ako koristiš */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

};

export default Footer;
