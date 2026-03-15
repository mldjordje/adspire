import { TestimonialsSlider } from "@/components/site/TestimonialsSlider";
import type { TestimonialItem } from "@/content/site/types";
import type { LocaleCode } from "@/lib/site-config";

type TestimonialsSectionProps = {
  locale: LocaleCode;
  title: string;
  subtitle: string;
  items: TestimonialItem[];
};

export function TestimonialsSection({
  locale,
  title,
  subtitle,
  items,
}: TestimonialsSectionProps) {
  return (
    <section className="mxd-section">
      <div className="mxd-section-head">
        <p className="mxd-kicker">{locale === "en" ? "Testimonials" : "Utisci"}</p>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <TestimonialsSlider items={items} />
    </section>
  );
}
