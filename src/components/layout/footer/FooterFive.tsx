import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "public/images/logo.png";
import gsap from "gsap";
import chroma from "chroma-js";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const FooterFive = () => {
  const currentYear = new Date().getFullYear();

  const animatedTextRef = useRef<any>(null);
  const [animatedTextContent, setAnimatedTextContent] = useState("");

  useEffect(() => {
    const animatedChars = document.querySelectorAll(".animated-char");

    if (animatedChars.length > 0) {
      const folksBD = gsap.timeline({
        repeat: -1,
        delay: 0.5,
        scrollTrigger: {
          trigger: ".animated-text",
          start: "bottom 100%-=50px",
        },
      });

      const folksGradient = chroma.scale(["#ff7425", "#ffffff"]);

      animatedChars.forEach((charElement, index) => {
        const delay = index * 0.04;

        folksBD.to(
          charElement,
          {
            duration: 0.5,
            scaleY: 0.6,
            ease: "power3.out",
            transformOrigin: "center bottom",
          },
          delay
        );

        folksBD.to(
          charElement,
          {
            yPercent: -20,
            ease: "elastic",
            duration: 0.8,
          },
          delay + 0.5
        );

        folksBD.to(
          charElement,
          {
            scaleY: 1,
            ease: "elastic.out(2.5, 0.2)",
            duration: 1.5,
          },
          delay + 0.5
        );

        folksBD.to(
          charElement,
          {
            color: () => {
              return folksGradient(index / animatedChars.length).hex();
            },
            ease: "power2.out",
            duration: 0.3,
          },
          delay + 0.5
        );

        folksBD.to(
          charElement,
          {
            yPercent: 0,
            ease: "back",
            duration: 0.8,
          },
          delay + 0.7
        );

        folksBD.to(
          charElement,
          {
            color: "#ffffff",
            duration: 1.4,
          },
          delay + 0.9
        );
      });
    }
  }, [animatedTextContent]);

  useEffect(() => {
    const animatedText = animatedTextRef.current;
    const textContent = animatedTextRef.current?.textContent;
    if (textContent) {
      setAnimatedTextContent(textContent);
      animatedText.innerHTML = "";
    }
  }, []);

 return (
  <footer className="footer-two footer-cmn section pb-0">
    <div className="container">
      <div className="row gaper">
        <div className="col-12 col-lg-5 col-xl-4">
          <div className="footer-two__left">
            <div className="logo">
              <Link href="/">
                <Image src={logo} priority alt="Adspire logo" />
              </Link>
            </div>
            <div className="paragraph">
              <p>
                Adspire je digitalna agencija koja pomaže brendovima da uspešno
                nastupe online kroz izradu sajtova, aplikacija i digitalni marketing.
              </p>
            </div>
            <div className="section__content-cta">
              <h2>
                <Link
                  href="mailto:djordje@adspire.rs"
                  className="folks-text animated-text"
                  ref={animatedTextRef}
                >
                  djordje@adspire.rs
                  {animatedTextContent.split("").map((char, index) => (
                    <span
                      aria-hidden="true"
                      className="animated-char"
                      key={index}
                    >
                      {char}
                    </span>
                  ))}
                </Link>
              </h2>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-7 col-xl-7 offset-xl-1 col-xxl-5 offset-xxl-3">
          <div className="footer-two__right">
            <div className="social justify-content-start justify-content-lg-start">
              <Link href="https://www.instagram.com/adspire.rs" target="_blank">
                <i className="fa-brands fa-instagram"></i>
                <span>Instagram</span>
              </Link>
            </div>

            <div className="footer__single-meta section__content-cta">
              <Link
                href="https://www.google.com/maps?q=Dimitrija+Leka+66,+Niš"
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
          </div>
        </div>
      </div>
    </div>

    <div className="footer__copyright">
      <div className="container">
        <div className="row align-items-center gaper">
          <div className="col-12 col-xl-6">
            <div className="footer__copyright-text text-center text-xl-start">
              <p>
                &copy; <span id="copyYear">{new Date().getFullYear()}</span>{" "}
                Adspire. Sva prava zadržana.
              </p>
            </div>
          </div>
          <div className="col-12 col-xl-6">
            <ul className="justify-content-center justify-content-xl-end">
              <li>
                <Link href="/">Početna</Link>
              </li>
              <li>
                <Link href="/about-us">O nama</Link>
              </li>
              <li>
                <Link href="/our-services">Usluge</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/contact-us">Kontakt</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

};

export default FooterFive;
