import React from "react";
import Image from "next/image";
import bookingForm from "public/images/booking/booking-form.png";
import bookingCalendar from "public/images/booking/booking-admin-calendar.png";
import bookingClient from "public/images/booking/booking-my-appointments.png";

const ServiceDetailsMain = () => {
  return (
    <section className="section service-details fade-wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">
            <div className="service-details__slider">
              <div className="service-details__slider-single">
                <div className="poster fade-top">
                  <Image
                    src={bookingForm}
                    alt="Booking forma za zakazivanje termina"
                  />
                </div>
                <div className="details-group section__cta text-start">
                  <h3 className="title-anim">
                    Booking sistemi za sve vrste biznisa
                  </h3>
                  <p>
                    Razvijamo booking sisteme koji automatizuju zakazivanje,
                    smanjuju pozive i povecavaju popunjenost termina. Resenje
                    prilagodjavamo delatnosti, bilo da ste salon, klinika,
                    servis, edukativni centar ili rental biznis.
                  </p>
                  <p>
                    Klijenti samostalno biraju uslugu, termin i osobu, dobijaju
                    potvrde i podsetnike, dok vi iz CMS panela upravljate
                    kalendarom, uslugama, cenama i dostupnoscu.
                  </p>
                </div>
                <div className="section__content-cta">
                  <div className="row gaper">
                    <div className="col-12 col-lg-7">
                      <div className="details-group">
                        <h3 className="title-anim">Ključne funkcije</h3>
                        <ul>
                          <li>Online zakazivanje 24/7 sa potvrdom termina.</li>
                          <li>Upravljanje uslugama, cenama i trajanjem.</li>
                          <li>Klijentski nalozi i istorija termina.</li>
                          <li>Admin kalendar sa statusima i napomenama.</li>
                          <li>Notifikacije, podsetnici i no-show kontrola.</li>
                          <li>Izvoz termina u kalendar i PWA aplikacija.</li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-12 col-lg-5">
                      <div className="poster-small">
                        <Image
                          src={bookingCalendar}
                          alt="Admin kalendar termina"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="section__content-cta">
                  <div className="row gaper">
                    <div className="col-12 col-lg-5">
                      <div className="poster-small">
                        <Image
                          src={bookingClient}
                          alt="Moji termini i klijentski portal"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-7">
                      <div className="details-group">
                        <h3 className="title-anim">Klijentski portal</h3>
                        <p>
                          Vasi klijenti imaju pristup svojim terminima,
                          otkazivanjima i istoriji poseta, dok vi dobijate jasnu
                          sliku zauzeca i uvida u potraznju.
                        </p>
                        <p>
                          Sistem je fleksibilan za vise lokacija, timova i
                          usluga, uz jasne statuse termina i izvestaje o
                          performansama.
                        </p>
                      </div>
                    </div>
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

export default ServiceDetailsMain;
