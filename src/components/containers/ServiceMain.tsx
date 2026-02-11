import React from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";

type ServiceItem = {
  title: string;
  summary: string;
  bullets: string[];
  cta?: string;
  href?: string;
};

const ServiceMain = () => {
  const { t } = useTranslation("common");
  const items = t("services.items", { returnObjects: true }) as ServiceItem[];

  return (
    <section className="section service-t fade-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section__header text-center">
              <p className="sub-title">{t("services.pageNav")}</p>
              <h3 className="title">{t("services.pageTitle")}</h3>
              <p className="primary-text">{t("services.intro")}</p>
            </div>
          </div>
        </div>
        <div className="row gaper">
          {items.map((service, idx) => (
            <div className="col-12 col-md-6 col-xl-3" key={service.title}>
              <div className="service-card topy-tilt fade-top">
                <div className="service-card__head d-flex align-items-center justify-content-between">
                  <span className="sub-title">0{idx + 1}</span>
                  <i className="icon-arrow-top-right"></i>
                </div>
                <h4 className="mt-2">{service.title}</h4>
                <p className="mt-2">{service.summary}</p>
                <ul className="mt-3">
                  {service.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                {service.cta && service.href ? (
                  <div className="mt-4">
                    <Link href={service.href} className="btn btn--secondary">
                      {service.cta}
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceMain;
