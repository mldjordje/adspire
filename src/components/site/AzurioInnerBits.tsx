import type { BlogPost, FaqItem } from "@/content/site/types";

type InnerHeadlineProps = {
  current: string;
  title: string;
  subtitle?: string;
  caption: string;
  anchorLabel?: string;
  anchorHref?: string;
  coverImage?: string;
  coverVideo?: string;
};

export function AzurioInnerHeadline({
  current,
  title,
  subtitle,
  caption,
  anchorLabel,
  anchorHref = "#content",
  coverImage = "/images/banner/video-bg.png",
  coverVideo,
}: InnerHeadlineProps) {
  return (
    <div className="mxd-section blur-section pinned-section">
      <div className="pinned-section__inner">
        <div className="mxd-container fullwidth-container">
          <div className="mxd-block">
            <div className="inner-headline inner-headline-bottom">
              <div className="inner-headline__media">
                {coverVideo ? (
                  <video autoPlay muted loop playsInline preload="auto" poster={coverImage}>
                    <source type="video/mp4" src={coverVideo} />
                  </video>
                ) : (
                  <img src={coverImage} alt={title} />
                )}
                <div className="inner-headline__cover" />
              </div>
              <div className="mxd-container grid-l-container">
                <div className="container-fluid p-0">
                  <div className="row g-0">
                    <div className="col-12 mxd-grid-item">
                      <div className="inner-headline__breadcrumbs loading-fade">
                        <div className="breadcrumbs__nav permanent">
                          <span>
                            <a href="/">
                              <span className="mxd-scramble">Home</span>
                            </a>
                          </span>
                          <span className="current-item">{current}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="inner-headline__bottom">
                <div className="mxd-container grid-l-container">
                  <div className="container-fluid p-0">
                    <div className="row g-0">
                      <div className="col-12">
                        <div className="inner-headline__content has-medium-title">
                          <div className="container-fluid p-0">
                            <div className="row g-0">
                              <div className="col-12 col-xl-7 mxd-grid-item">
                                {anchorLabel ? (
                                  <div className="inner-headline__link loading-fade">
                                    <a className="btn btn-line btn-line-permanent" href={anchorHref}>
                                      <span className="btn-caption mxd-scramble">{anchorLabel}</span>
                                    </a>
                                  </div>
                                ) : null}
                                <div className="inner-headline__title">
                                  <h1 className="medium permanent loading-split">{title}</h1>
                                </div>
                                {subtitle ? (
                                  <div className="inner-headline__subtitle">
                                    <p className="loading-split">{subtitle}</p>
                                  </div>
                                ) : null}
                              </div>
                              <div className="col-12 col-xl-5 mxd-grid-item">
                                <div className="inner-headline__caption split-caption pre-grid">
                                  <p className="t-bold t-large loading-split">{caption}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pinned-section__trigger" />
      </div>
    </div>
  );
}

type PromoCtaProps = {
  href: string;
  buttonLabel: string;
  title: string;
};

export function AzurioPromoCta({ href, buttonLabel, title }: PromoCtaProps) {
  const tags = ["Web systems", "Booking flows", "SEO", "Growth ops", "Next.js", "Automation"];

  return (
    <div className="mxd-section blur-section bg-color-opposite">
      <div className="mxd-container fullwidth-container">
        <div className="mxd-block">
          <div className="mxd-promo transparent">
            <div className="mxd-promo__wrap auto-height">
              <div className="mxd-promo__content">
                <div className="mxd-promo__btngroup anim-uni-in-up">
                  <a className="btn btn-line btn-line-opposite" href={href}>
                    <span className="btn-caption mxd-scramble">{buttonLabel}</span>
                  </a>
                </div>
                <div className="mxd-promo__caption">
                  <a className="active-cursor-accent" data-cursor-text="Contact Us" href={href}>
                    <h2 className="opposite mxd-split-lines">{title}</h2>
                  </a>
                </div>
              </div>
              <div className="mxd-promo__marquee">
                <div className="marquee marquee-left--gsap">
                  <div className="marquee__toleft marquee__images">
                    {tags.map((tag, index) => (
                      <div key={`${tag}-${index}`} className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <span className="tag tag-s tag-medium-opposite mxd-scramble">{tag}</span>
                        </div>
                        <div className="marquee__image">
                          <img src={`/images/portfolio/${["one","two","three","four","five","six"][index % 6]}.png`} alt={tag} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type BlogPreviewGridProps = {
  title: string;
  posts: BlogPost[];
};

export function AzurioBlogPreviewGrid({ title, posts }: BlogPreviewGridProps) {
  return (
    <div className="mxd-section blur-section padding-top-title padding-bottom-preview">
      <div className="mxd-container grid-l-container">
        <div className="mxd-block">
          <div className="mxd-section-title pre-subtitle-s">
            <div className="container-fluid p-0">
              <div className="row g-0">
                <div className="col-12 col-xl-8 mxd-grid-item">
                  <div className="mxd-section-title__title pre-caption">
                    <h2 className="reveal-type">{title}</h2>
                  </div>
                </div>
                <div className="col-12 col-xl-4 mxd-grid-item">
                  <div className="mxd-section-title__controls justify-end anim-uni-slide-up">
                    <a className="btn btn-line btn-line-default" href="/blog">
                      <span className="btn-caption mxd-scramble">News Overview</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mxd-block">
          <div className="mxd-blog-grid">
            <div className="row g-0 mxd-blog-grid__gallery">
              {posts.slice(0, 3).map((post) => (
                <div key={post.slug} className="col-12 col-lg-4 mxd-blog-item animate-card-3">
                  <div className="mxd-blog-item__date">
                    <span className="meta-date">{post.date}</span>
                  </div>
                  <a className="mxd-blog-item__media active-cursor-permanent" data-cursor-text="Read Post" href={post.href}>
                    <img src={post.image} alt={post.title} />
                  </a>
                  <div className="mxd-blog-item__caption">
                    <div className="mxd-blog-item__title">
                      <a className="blog-name-m" href={post.href}>{post.title}</a>
                    </div>
                    <div className="mxd-blog-item__tags">
                      <span className="meta-tag comma-tag">{post.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type FaqAccordionProps = {
  items: FaqItem[];
};

export function AzurioFaqAccordion({ items }: FaqAccordionProps) {
  return (
    <div className="mxd-accordion loading-fade">
      {items.map((item) => (
        <div key={item.q} className="mxd-accordion__item">
          <div className="mxd-accordion__divider anim-uni-in-up" />
          <div className="mxd-accordion__title anim-uni-in-up">
            <p>{item.q}</p>
            <div className="mxd-accordion__arrow">
              <i className="mxd-accordion__close">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" version="1.1" viewBox="0 0 18 18">
                  <path d="M3.6,0v3.6H0V0h3.6ZM18,18v-3.6h-3.6v3.6h3.6ZM14.4,7.2v-3.6h-3.6v3.6h-3.6v-3.6h-3.6v3.6h3.6v3.6h3.6v3.6h3.6v-3.6h-3.6v-3.6h3.6ZM18,0h-3.6v3.6h3.6V0ZM0,18h3.6v-3.6H0v3.6ZM3.6,14.4h3.6v-3.6h-3.6v3.6Z" />
                </svg>
              </i>
              <i className="mxd-accordion__plus">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" version="1.1" viewBox="0 0 18 18">
                  <path d="M18,7.2v3.6h-7.2v7.2h-3.6v-7.2H0v-3.6h7.2V0h3.6v7.2h7.2Z" />
                </svg>
              </i>
            </div>
          </div>
          <div className="mxd-accordion__content">
            <p className="t-medium mxd-accordion__text">{item.a}</p>
          </div>
          <div className="mxd-accordion__divider anim-uni-in-up" />
        </div>
      ))}
    </div>
  );
}
