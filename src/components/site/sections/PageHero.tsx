type PageHeroProps = {
  kicker: string;
  title: string;
  subtitle: string;
};

export function PageHero({ kicker, title, subtitle }: PageHeroProps) {
  return (
    <section className="mxd-section mxd-page-hero">
      <p className="mxd-kicker">{kicker}</p>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </section>
  );
}
