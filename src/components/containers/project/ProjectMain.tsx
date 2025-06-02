import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import hrone from "public/images/projects/hr-one.png";
import hrtwo from "public/images/projects/hr-two.png";
import hrthree from "public/images/projects/hr-three.png";
import hrfour from "public/images/projects/hr-four.png";
import hrfive from "public/images/projects/hr-five.png";
import hrsix from "public/images/projects/hr-six.png";

gsap.registerPlugin(ScrollTrigger);
const ProjectMain = () => {
  const slider = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ele = slider.current;

    if (window.innerWidth >= 992 && ele) {
      gsap.registerPlugin(ScrollTrigger);

      const rightSections = gsap.utils.toArray(".project-sl__single");

      const pin = gsap.to(rightSections, {
        xPercent: -100 * (rightSections.length - 3),
        ease: "none",
        scrollTrigger: {
          trigger: ele,
          pin: true,
          invalidateOnRefresh: true,
          start: "center center-=20",
          scrub: 1,
          end: () => "+=" + (slider.current?.offsetWidth || 0),
          markers: false,
        },
      });

      return () => {
        pin.kill();
      };
    }
  }, []);

  return (
    <section className="section project-sl" ref={slider}>
      <div className="project-sl__single">
  <div className="thumb">
    <Link href="https://prevozkop.rs" target="_blank">
      <Image src={hrone} alt="Image" />
    </Link>
  </div>
  <div className="content">
    <h2>
      <Link href="https://prevozkop.rs" target="_blank">
        Prevoz Kop<br />Betonska baza
      </Link>
    </h2>
  </div>
</div>

<div className="project-sl__single">
  <div className="thumb">
    <Link href="https://aircoolplus.rs" target="_blank">
      <Image src={hrtwo} alt="Image" />
    </Link>
  </div>
  <div className="content">
    <h2>
      <Link href="https://aircoolplus.rs" target="_blank">
        Air Cool Plus<br />Najam mašina
      </Link>
    </h2>
  </div>
</div>

<div className="project-sl__single">
  <div className="thumb">
    <Link href="https://autodelic.com" target="_blank">
      <Image src={hrthree} alt="Image" />
    </Link>
  </div>
  <div className="content">
    <h2>
      <Link href="https://autodelic.com" target="_blank">
        Auto Delić<br />Tehnički pregled
      </Link>
    </h2>
  </div>
</div>

<div className="project-sl__single">
  <div className="thumb">
    <Link href="https://mojsajt4.com" target="_blank">
      <Image src={hrfour} alt="Image" />
    </Link>
  </div>
  <div className="content">
    <h2>
      <Link href="https://mojsajt4.com" target="_blank">
        Pro Truck<br />Asfaltiranje
      </Link>
    </h2>
  </div>
</div>

<div className="project-sl__single">
  <div className="thumb">
    <Link href="https://mojsajt5.com" target="_blank">
      <Image src={hrfive} alt="Image" />
    </Link>
  </div>
  <div className="content">
    <h2>
      <Link href="https://mojsajt5.com" target="_blank">
        Ml Group<br />Tehnički pregled
      </Link>
    </h2>
  </div>
</div>

<div className="project-sl__single">
  <div className="thumb">
    <Link href="https://mojsajt6.com" target="_blank">
      <Image src={hrsix} alt="Image" />
    </Link>
  </div>
  <div className="content">
    <h2>
      <Link href="https://mojsajt6.com" target="_blank">
        HidroMont<br />Jovančić
      </Link>
    </h2>
  </div>
</div>

    </section>
  );
};

export default ProjectMain;
