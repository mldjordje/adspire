import React, { useState } from "react";

const UxProcessTwo = () => {
  const [imgTab, setImgTab] = useState(0);

  return (
    <section className="section ux-process fade-wrapper">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-12 col-lg-8">
        <div className="section__header text-center">
          <span className="sub-title">
            Proces Saradnje
            <i className="fa-solid fa-arrow-right"></i>
          </span>
          <h2 className="title title-anim">Kako radimo sa klijentima</h2>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-12">
        <div className="service-f-wrapper">
          {[
            {
              title: "Upoznavanje i analiza",
              text: "Započinjemo sa detaljnim upoznavanjem vaših potreba i ciljeva. Analiziramo tržište, konkurenciju i definišemo osnovne smernice."
            },
            {
              title: "Kreiranje strategije",
              text: "Na osnovu prikupljenih informacija razvijamo strategiju razvoja sajta, aplikacije ili marketinške kampanje."
            },
            {
              title: "Dizajn i UX",
              text: "Pravimo dizajn koji ne samo da izgleda sjajno, već i nudi optimalno korisničko iskustvo."
            },
            {
              title: "Razvoj i testiranje",
              text: "Naš razvojni tim pretvara dizajn u funkcionalan proizvod, uz testiranje u svakoj fazi."
            },
            {
              title: "Lansiranje",
              text: "Pokrećemo gotov proizvod, vršimo finalna testiranja i osiguravamo da sve funkcioniše besprekorno."
            },
            {
              title: "Podrška i rast",
              text: "Nakon lansiranja, nudimo podršku, održavanje i opcije za unapređenje u skladu sa vašim rastom."
            }
          ].map((step, index) => (
            <div className={"service-f-single fade-top " + (imgTab === index ? " service-f-single-active" : "")} key={index}>
              <div className="single-item">
                <div className="intro-btn">
                  <h4>{step.title}</h4>
                </div>
              </div>
              <div className="single-item p-single p-sm body-cn">
                <p>{step.text}</p>
              </div>
              <button
                className="toggle-service-f"
                onClick={() => setImgTab(imgTab === index ? -1 : index)}
              ></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

  );
};

export default UxProcessTwo;
