"use client";

import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { TestimonialItem } from "@/content/site/types";

type TestimonialsSliderProps = {
  items: TestimonialItem[];
};

export function TestimonialsSlider({ items }: TestimonialsSliderProps) {
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={16}
      slidesPerView={1.05}
      autoplay={{ delay: 3800, disableOnInteraction: false }}
      breakpoints={{
        768: { slidesPerView: 2.2 },
        1200: { slidesPerView: 3 },
      }}
      className="mxd-testimonials-swiper"
    >
      {items.map((item) => (
        <SwiperSlide key={item.name}>
          <article className="mxd-card mxd-testimonial-card">
            <p>{item.quote}</p>
            <h3>{item.name}</h3>
            <span>{item.role}</span>
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
