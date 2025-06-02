import React from "react";
import Link from "next/link";

const CtaTwo = () => {
  return (
   <section className="cta-two section">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-12 col-xxl-11">
        <div
          className="cta-two-wrapper bg-img"
          style={{ backgroundImage: "url('/images/cta-two-bg.png')" }}
        >
          <div className="row gaper align-items-center">
            <div className="col-12 col-lg-8">
              <div className="cta-two__content">
                <span>Imate ideju?</span>
                <h2 className="title-anim">Spremni smo za saradnju</h2>
                <h5>
                  <Link href="tel:+381601491491">
                    Pozovite nas: +381 60 149 149 1
                  </Link>
                </h5>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="text-start text-lg-end">
                <Link href="/contact-us" className="btn btn--tertiary">
                  započnite projekat
                  <i className="fa-sharp fa-solid fa-arrow-up-right"></i>
                </Link>
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

export default CtaTwo;
