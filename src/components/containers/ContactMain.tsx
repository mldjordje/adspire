import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import phone from "public/images/phone.png";
import mail from "public/images/mail.png";
import location from "public/images/location.png";
import time from "public/images/time.png";

const ContactMain = () => {
  const { t } = useTranslation("common");

  return (
    <section id="contact" className="section contact-m fade-wrapper">
      <div className="container">
        <div className="row gaper">
          <div className="col-12 col-sm-6 col-xl-3">
            <div className="contact-m__single topy-tilt fade-top">
              <div className="thumb">
                <Image src={phone} alt="Phone" />
              </div>
              <div className="content">
                <h4>{t("contact.phone")}</h4>
                <p>
                  <Link href="tel:0601491491">060 1491491</Link>
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-xl-3">
            <div className="contact-m__single topy-tilt fade-top">
              <div className="thumb">
                <Image src={mail} alt="Email" />
              </div>
              <div className="content">
                <h4>{t("contact.email")}</h4>
                <p>
                  <Link href="mailto:djordje@adspire.rs">
                    djordje@adspire.rs
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-xl-3">
            <div className="contact-m__single topy-tilt fade-top">
              <div className="thumb">
                <Image src={location} alt="Location" />
              </div>
              <div className="content">
                <h4>{t("contact.address")}</h4>
                <p>
                  <Link
                    href="https://www.google.com/maps?q=Dimitrija+Leka+66"
                    target="_blank"
                  >
                    Dimitrija Leka 66, Niš
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-xl-3">
            <div className="contact-m__single topy-tilt fade-top">
              <div className="thumb">
                <Image src={time} alt="Radno vreme" />
              </div>
              <div className="content">
                <h4>{t("contact.workingHours")}</h4>
                <p>{t("contact.alwaysAvailable")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="map-wrapper">
              <div className="row gaper">
                <div className="col-12 col-lg-6">
                  <div className="contact__map fade-top">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2903.243191296985!2d21.8642094!3d43.309168299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4755b90004b7831f%3A0xec658c0eee81ee51!2sAdspire!5e0!3m2!1sen!2srs!4v1748610328618!5m2!1sen!2srs"
                      width="100%"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Adspire map"
                    ></iframe>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="contact-main__form fade-top">
                    <h3>{t("contact.sendMessage")}</h3>
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();

                        const form = e.currentTarget;
                        const formData = new FormData(form);

                        const res = await fetch("/api/contact", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            name: formData.get("contact-name"),
                            email: formData.get("contact-email"),
                            subject: formData.get("subject"),
                            message: formData.get("contact-message"),
                          }),
                        });

                        const result = await res.json();
                        alert(result.message);
                        form.reset();
                      }}
                      className="section__content-cta"
                    >
                      <div className="group-wrapper">
                        <div className="group-input">
                          <input
                            type="text"
                            name="contact-name"
                            placeholder={t("contact.name") as string}
                            required
                          />
                        </div>
                        <div className="group-input">
                          <input
                            type="email"
                            name="contact-email"
                            placeholder={t("contact.email") as string}
                            required
                          />
                        </div>
                      </div>
                      <div className="group-input drt">
                        <select name="subject" className="subject" required>
                          <option value="">
                            {t("contact.subjectOptions.placeholder") as string}
                          </option>
                          <option value="project">
                            {t("contact.subjectOptions.project") as string}
                          </option>
                          <option value="service">
                            {t("contact.subjectOptions.service") as string}
                          </option>
                          <option value="budget">
                            {t("contact.subjectOptions.budget") as string}
                          </option>
                          <option value="support">
                            {t("contact.subjectOptions.support") as string}
                          </option>
                        </select>
                      </div>
                      <div className="group-input">
                        <textarea
                          name="contact-message"
                          placeholder={t("contact.message") as string}
                          required
                        ></textarea>
                      </div>
                      <div className="form-cta justify-content-start">
                        <button type="submit" className="btn btn--primary">
                          {t("contact.submit")}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMain;
