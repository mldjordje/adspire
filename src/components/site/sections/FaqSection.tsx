"use client";

import { useState } from "react";
import type { FaqItem } from "@/content/site/types";
import type { LocaleCode } from "@/lib/site-config";

type FaqSectionProps = {
  locale: LocaleCode;
  title: string;
  subtitle: string;
  items: FaqItem[];
};

export function FaqSection({ locale, title, subtitle, items }: FaqSectionProps) {
  const [open, setOpen] = useState(0);

  return (
    <section className="mxd-section">
      <div className="mxd-section-head">
        <p className="mxd-kicker">{locale === "en" ? "FAQ" : "Pitanja"}</p>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className="mxd-faq-list">
        {items.map((item, index) => (
          <article key={item.q} className={`mxd-faq-item ${open === index ? "is-open" : ""}`}>
            <button type="button" onClick={() => setOpen((prev) => (prev === index ? -1 : index))}>
              {item.q}
            </button>
            <div>
              <p>{item.a}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
