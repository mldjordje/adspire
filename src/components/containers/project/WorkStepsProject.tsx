import React, { useState, useEffect } from "react";
import Image from "next/image";
import YoutubeEmbed from "@/components/youtube/YoutubeEmbed";
import videoframe from "public/images/video-frame.png";

const WorkStepsProject = () => {
  const [hover, setHover] = useState(1);
  const [videoActive, setVideoActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (typeof window !== "undefined") {
        const deviceWidth = window.innerWidth;

        if (deviceWidth > 576) {
          const workImgItems = document.querySelectorAll<HTMLElement>(
            ".work-steps__single"
          );

          workImgItems.forEach((item) => {
            const contentBox = item.getBoundingClientRect();
            const dx = event.clientX - contentBox.x;
            if (item.children[2] instanceof HTMLElement) {
              item.children[2].style.transform = `translateX(${dx}px)`;
            }
          });
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
     <section className="section work-steps work-alt fade-wrapper">
  <div className="container">
    <div className="row">
      <div className="col-12">
        <div className="section__header--secondary">
          <div className="row gaper align-items-center">
            <div className="col-12 col-lg-5 col-xxl-5">
              <div className="section__header text-center text-lg-start mb-0">
                <span className="sub-title">
                  Proces saradnje
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
                <h2 className="title title-anim">Kako radimo sa klijentima</h2>
              </div>
            </div>
            <div className="col-12 col-lg-7 col-xxl-5 offset-xxl-2">
              <div className="text-center text-lg-start">
                <p>
                  Naš proces je jednostavan i transparentan – vodi vas od prve
                  ideje do gotovog digitalnog rešenja kroz jasno definisane korake.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-12 col-sm-6 col-xl-3">
        <div
          className={
            "work-steps__single fade-top" +
            (hover === 0 ? " work-steps__single-active" : " ")
          }
          onMouseEnter={() => setHover(0)}
        >
          <span>01</span>
          <h5>Upoznavanje i analiza</h5>
          <div
            className="work-thumb-hover d-none d-md-block"
            style={{
              backgroundImage: "url('/images/work/thumb-one.png')",
            }}
          ></div>
        </div>
      </div>
      <div className="col-12 col-sm-6 col-xl-3">
        <div
          className={
            "work-steps__single fade-top work-two" +
            (hover === 1 ? " work-steps__single-active" : " ")
          }
          onMouseEnter={() => setHover(1)}
        >
          <span>02</span>
          <h5>Planiranje i strategija</h5>
          <div
            className="work-thumb-hover d-none d-md-block"
            style={{
              backgroundImage: "url('/images/work/thumb-one.png')",
            }}
          ></div>
        </div>
      </div>
      <div className="col-12 col-sm-6 col-xl-3">
        <div
          className={
            "work-steps__single fade-top work-three" +
            (hover === 2 ? " work-steps__single-active" : " ")
          }
          onMouseEnter={() => setHover(2)}
        >
          <span>03</span>
          <h5>Dizajn i prototip</h5>
          <div
            className="work-thumb-hover d-none d-md-block"
            style={{
              backgroundImage: "url('/images/work/thumb-one.png')",
            }}
          ></div>
        </div>
      </div>
      <div className="col-12 col-sm-6 col-xl-3">
        <div
          className={
            "work-steps__single fade-top work-four" +
            (hover === 3 ? " work-steps__single-active" : " ")
          }
          onMouseEnter={() => setHover(3)}
        >
          <span>04</span>
          <h5>Razvoj i lansiranje</h5>
          <div
            className="work-thumb-hover d-none d-md-block"
            style={{
              backgroundImage: "url('/images/work/thumb-one.png')",
            }}
          ></div>
        </div>
      </div>
    </div>
  </div>
  
</section>

     
    </>
  );
};

export default WorkStepsProject;
