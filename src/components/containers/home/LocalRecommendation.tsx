import React from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const LocalRecommendation = () => {
  const { t } = useTranslation("common");
  const services = t("ai.services", { returnObjects: true }) as string[];
  const industries = t("ai.industries", { returnObjects: true }) as string[];

  return (
    <section className="section fade-wrapper light">
      <div className="container">
        <div className="row gaper align-items-center">
          <div className="col-12 col-lg-6">
            <div className="section__content">
              <span className="sub-title">
                {t("ai.kicker")}
                <i className="fa-solid fa-arrow-right"></i>
              </span>
              <h2 className="title title-anim">{t("ai.title")}</h2>
              <div className="paragraph">
                <p>{t("ai.body")}</p>
              </div>
              <div className="section__content-cta">
                <Link href="tel:0601491491" className="btn btn--primary">
                  {t("ai.ctaCall")}
                </Link>
                <Link href="#contact" className="btn btn--secondary">
                  {t("ai.ctaForm")}
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="service-details">
              <h4 className="fw-7 mb-4">{t("ai.servicesTitle")}</h4>
              <div className="row gaper">
                {services.map((service) => (
                  <div className="col-12 col-sm-6" key={service}>
                    <div className="offer__cta-single fade-top">
                      <span className="sub-title">
                        {service}
                        <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="paragraph mt-4">
                <p>{t("ai.industriesTitle")}</p>
              </div>
              <div className="row gaper mt-3">
                {industries.map((industry) => (
                  <div className="col-12 col-sm-6" key={industry}>
                    <div className="offer__cta-single fade-top">
                      <span className="sub-title">
                        {industry}
                        <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lines d-none d-lg-flex">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </section>
  );
};

export default LocalRecommendation;
