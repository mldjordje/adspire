import { getSiteContent } from "@/content/site";
import type { MetricItem, ProjectItem, ServiceItem } from "@/content/site/types";
import { findServiceCatalogEntry } from "@/data/serviceCatalog";
import { defaultLocale } from "@/lib/site-config";

const content = getSiteContent(defaultLocale);

const SERVICE_IMAGE_MAP: Record<string, string> = {
  "web-dizajn-i-razvoj": "/images/portfolio/one.png",
  "e-commerce": "/images/portfolio/five.png",
  "booking-sistemi": "/images/booking/booking-form.png",
  "booking-za-salone-bez-sistema": "/images/booking/booking-admin-calendar.png",
  "web-pozivnice-za-veselja": "/images/projects/d-one.png",
  "seo-i-sadrzaj": "/images/portfolio/three.png",
  "performance-marketing": "/images/portfolio/six.png",
  "brending-i-identitet": "/images/portfolio/four.png",
  "drustvene-mreze-i-sadrzaj": "/images/blog/five.png",
  "odrzavanje-i-podrska": "/images/portfolio/nine.png",
  "analitika-i-cro": "/images/projects/one.png",
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function serviceHref(service: ServiceItem) {
  return `/our-services/${service.slug}`;
}

function splitTags(values: string[]) {
  const midpoint = Math.ceil(values.length / 2);
  return [values.slice(0, midpoint), values.slice(midpoint)];
}

function buildSectionPattern(sectionName: string) {
  const escaped = sectionName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(
    `<!--\\s*${escaped}\\s*Start\\s*-->[\\s\\S]*?<!--\\s*${escaped}\\s*End\\s*-->`,
    "i",
  );
}

function replaceSection(mainInner: string, sectionName: string, replacement: string) {
  return mainInner.replace(buildSectionPattern(sectionName), replacement);
}

function replaceSectionOccurrence(
  mainInner: string,
  sectionName: string,
  replacement: string,
  targetIndex: number,
) {
  const escaped = sectionName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `<!--\\s*${escaped}\\s*Start\\s*-->[\\s\\S]*?<!--\\s*${escaped}\\s*End\\s*-->`,
    "gi",
  );
  let index = -1;

  return mainInner.replace(pattern, (match) => {
    index += 1;
    return index === targetIndex ? replacement : match;
  });
}

function replaceFirst(mainInner: string, pattern: RegExp, replacement: string) {
  return mainInner.replace(pattern, replacement);
}

function renderProjectGallery(images: string[]) {
  const [first, second, third] = images;
  return `<!-- Section - Images Grid Simple Start -->
      <div class="mxd-section blur-section">
        <div class="mxd-container grid-l-container">
          <div class="mxd-block">
            <div class="mxd-images-grid">
              <div class="container-fluid p-0">
                <div class="row g-0 mxd-images-grid__gallery">
                  <div class="col-12 mxd-grid-item mxd-images-grid__item wide">
                    <div class="mxd-images-grid__inner">
                      <img class="parallax-img-small" src="${first}" alt="Project preview">
                    </div>
                  </div>
                </div>
                <div class="row g-0 mxd-images-grid__gallery">
                  <div class="col-12 col-xl-6 mxd-grid-item mxd-images-grid__item">
                    <div class="mxd-images-grid__inner">
                      <img class="transparent" src="${second ?? first}" alt="Project preview">
                    </div>
                  </div>
                  <div class="col-12 col-xl-6 mxd-grid-item mxd-images-grid__item">
                    <div class="mxd-images-grid__inner">
                      <img class="parallax-img-small" src="${third ?? first}" alt="Project preview">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Section - Images Grid Simple End -->`;
}

function renderProjectSplit(
  leftLabel: string,
  leftBody: string,
  rightLabel: string,
  rightItems: Array<{ title: string; description: string }>,
) {
  return `<!-- Section - Split List v02 Start -->
      <div class="mxd-section blur-section padding-top-subtitle padding-bottom-default">
        <div class="mxd-container grid-l-container">
          <div class="mxd-block">
            <div class="mxd-block-split">
              <div class="container-fluid p-0">
                <div class="row g-0">
                  <div class="col-12 col-xl-6 mxd-grid-item mxd-block-split__item manifest-item">
                    <div class="mxd-block-split__inner">
                      <div class="mxd-block-split__subtitle pre-manifest">
                        <p class="anim-uni-in-up"><span>/ ${escapeHtml(leftLabel)}</span></p>
                      </div>
                      <div class="mxd-block-split__manifest">
                        <p class="manifest manifest-s mxd-split-lines">${escapeHtml(leftBody)}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-xl-6 mxd-grid-item mxd-block-split__item manifest-item">
                    <div class="mxd-block-split__inner">
                      <div class="mxd-block-split__subtitle pre-grid">
                        <p class="anim-uni-in-up"><span>/ ${escapeHtml(rightLabel)}</span></p>
                      </div>
                      <div class="mxd-block-split__data">
                        ${rightItems
                          .map(
                            (item) => `<!-- split data item -->
                        <div class="split-data__item">
                          <div class="split-data__divider divider-top"></div>
                          <div class="split-data__name"><p class="anim-uni-in-up">${escapeHtml(item.title)}</p></div>
                          <div class="split-data__descr"><p class="t-medium anim-uni-in-up">${escapeHtml(item.description)}</p></div>
                          <div class="split-data__divider divider-bottom"></div>
                        </div>`,
                          )
                          .join("")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Section - Split List v02 End -->`;
}

function renderMetricsItems(items: MetricItem[]) {
  return items.map((metric) => ({
    title: metric.value,
    description: metric.label,
  }));
}

function renderServicesHero() {
  const hero = content.servicesPage.hero;

  return `<!-- Section - Inner Headline v03 Start -->
      <div class="mxd-section blur-section pinned-section">
        <div class="pinned-section__inner">
          <div class="mxd-container fullwidth-container">
            <div class="mxd-block">
              <div class="inner-headline inner-headline-bottom">
                <div class="inner-headline__media">
                  <img src="/azurio/img/inner/1400x900_services.webp" alt="${escapeHtml(hero.title)}">
                  <div class="inner-headline__cover"></div>
                </div>
                <div class="mxd-container grid-l-container">
                  <div class="container-fluid p-0">
                    <div class="row g-0">
                      <div class="col-12 mxd-grid-item">
                        <div class="inner-headline__breadcrumbs loading-fade">
                          <div class="breadcrumbs__nav permanent">
                            <span><a href="/"><span class="mxd-scramble">Pocetna</span></a></span>
                            <span class="current-item">Usluge</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="inner-headline__bottom">
                  <div class="mxd-container grid-l-container">
                    <div class="container-fluid p-0">
                      <div class="row g-0">
                        <div class="col-12">
                          <div class="inner-headline__content has-medium-title">
                            <div class="container-fluid p-0">
                              <div class="row g-0">
                                <div class="col-12 col-xl-9 mxd-grid-item">
                                  <div class="inner-headline__link loading-fade">
                                    <a class="btn btn-line btn-line-permanent" href="#services">
                                      <span class="btn-caption mxd-scramble">${escapeHtml(hero.eyebrow)}</span>
                                    </a>
                                  </div>
                                  <div class="inner-headline__title">
                                    <h1 class="medium permanent loading-split">${escapeHtml(hero.title)}</h1>
                                  </div>
                                </div>
                                <div class="col-12 col-xl-3 mxd-grid-item">
                                  <div class="inner-headline__btngroup align-end-desktop tags-medium-title loading-fade">
                                    <a class="btn btn-line-icon btn-line-icon-small btn-line-permanent slide-down" href="#services">
                                      <span class="btn-caption mxd-scramble">Pogledaj usluge</span>
                                      <i>
                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 18 18">
                                          <path d="M18,10.8h-3.6v-3.6h3.6v3.6ZM7.2,14.4v3.6h3.6v-3.6h3.6v-3.6h-3.6V0h-3.6v10.8h-3.6v3.6s3.6,0,3.6,0ZM3.6,10.8v-3.6H0v3.6h3.6Z"/>
                                        </svg>
                                      </i>
                                    </a>
                                  </div>
                                </div>
                                <div class="col-12 col-xl-8 mxd-grid-item">
                                  <div class="inner-headline__caption split-caption pre-grid">
                                    <p class="t-bold t-large loading-split">${escapeHtml(hero.description)}</p>
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
          <div class="pinned-section__trigger"></div>
        </div>
      </div>
      <!-- Section - Inner Headline v03 End -->`;
}

function renderServiceCards() {
  const cards = content.servicesPage.items
    .map((service, index) => {
      const [leftTags, rightTags] = splitTags(service.bullets);
      const image = SERVICE_IMAGE_MAP[service.slug] ?? "/images/portfolio/one.png";

      return `<!-- single card -->
              <div class="mxd-stack-services__card">
                <div class="services-card__wrapper">
                  <div class="services-card__content">
                    <div class="services-card__info">
                      <div class="services-card__subtitle">
                        <span class="tag tag-s-mobile mxd-scramble">${String(index + 1).padStart(2, "0")} / Usluge</span>
                      </div>
                      <div class="services-card__title">
                        <p><a href="${serviceHref(service)}">${escapeHtml(service.title)}</a></p>
                      </div>
                      <div class="services-card__tags">
                        <div class="tags-column">
                          ${leftTags
                            .map((tag) => `<span class="tag tag-s-mobile mxd-scramble">${escapeHtml(tag)}</span>`)
                            .join("")}
                        </div>
                        <div class="tags-column">
                          ${rightTags
                            .map((tag) => `<span class="tag tag-s-mobile mxd-scramble">${escapeHtml(tag)}</span>`)
                            .join("")}
                        </div>
                      </div>
                    </div>
                    <p class="t-large t-bold services-card__descr">${escapeHtml(service.summary)}
                      <span><a href="${serviceHref(service)}">${escapeHtml(service.cta)}</a></span>
                    </p>
                  </div>
                  <div class="services-card__image">
                    <img src="${image}" alt="${escapeHtml(service.title)}">
                    <div class="services-card__cover"></div>
                  </div>
                </div>
              </div>`;
    })
    .join("");

  return `<!-- Section - Services Description Stack Start -->
      <div id="services" class="mxd-section">
        <div class="mxd-container fullwidth-container">
          <div class="mxd-block">
            <div class="mxd-stack-services">
              ${cards}
            </div>
          </div>
        </div>
      </div>
      <!-- Section - Services Description Stack End -->`;
}

function renderContactHero() {
  const hero = content.contactPage.hero;
  const form = content.contactPage.form;

  return `<!-- Section - Inner Headline v05 Start -->
      <div class="mxd-section blur-section padding-top-title">
        <div class="mxd-container grid-l-container">
          <div class="mxd-block loading-wrap">
            <div class="inner-headline margin-bottom-details">
              <div class="container-fluid p-0">
                <div class="row g-0">
                  <div class="col-12 mxd-grid-item">
                    <div class="inner-headline__breadcrumbs loading-fade">
                      <div class="breadcrumbs__nav">
                        <span><a href="/"><span class="mxd-scramble">Pocetna</span></a></span>
                        <span class="current-item">Kontakt</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="inner-headline__content has-medium-title">
                      <div class="container-fluid p-0">
                        <div class="row g-0">
                          <div class="col-12 col-xl-6 mxd-grid-item">
                            <div class="inner-headline__title">
                              <h1 class="medium loading-split">${escapeHtml(hero.title)}</h1>
                            </div>
                          </div>
                          <div class="col-12 col-xl-6">
                            <div class="inner-headline__caption split-caption-title pre-form">
                              <div class="mxd-grid-item">
                                <p class="t-bold t-large loading-split">${escapeHtml(hero.description)}</p>
                              </div>
                            </div>
                            <div class="mxd-block contact">
                              <div class="mxd-form-container">
                                <div class="form__reply centered text-center">
                                  <i class="ph-fill ph-smiley-wink reply__icon"></i>
                                  <p class="reply__title">Uspesno poslato</p>
                                  <span class="reply__text">${escapeHtml(form.success)}</span>
                                </div>
                                <form class="form contact-form" id="contact-form">
                                  <input type="hidden" name="project_name" value="Adspire">
                                  <input type="hidden" name="admin_email" value="${escapeHtml(content.contactPage.email)}">
                                  <input type="hidden" name="form_subject" value="Kontakt forma">
                                  <div class="container-fluid p-0">
                                    <div class="row gx-0">
                                      <div class="col-12 col-md-6 mxd-grid-item loading-item">
                                        <input type="text" name="Name" placeholder="${escapeHtml(form.name)}*" required>
                                      </div>
                                      <div class="col-12 col-md-6 mxd-grid-item loading-item">
                                        <input type="text" name="Company" placeholder="Firma">
                                      </div>
                                      <div class="col-12 col-md-6 mxd-grid-item loading-item">
                                        <input type="email" name="E-mail" placeholder="${escapeHtml(form.email)}*" required>
                                      </div>
                                      <div class="col-12 col-md-6 mxd-grid-item loading-item">
                                        <input type="tel" name="Phone" placeholder="Telefon">
                                      </div>
                                      <div class="col-12 mxd-grid-item loading-item">
                                        <textarea name="Message" placeholder="${escapeHtml(form.message)}*" required></textarea>
                                      </div>
                                      <div class="col-12 mxd-grid-item loading-item">
                                        <button class="btn btn-default-icon btn-default-accent slide-right" type="submit">
                                          <span class="btn-caption mxd-scramble">${escapeHtml(form.submit)}</span>
                                          <i class="btn-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 18 18">
                                              <path d="M10.8,0v3.6h-3.6V0h3.6ZM14.4,10.8h3.6v-3.6h-3.6v-3.6h-3.6v3.6H0v3.6h10.8v3.6h3.6v-3.6ZM10.8,14.4h-3.6v3.6h3.6v-3.6Z"/>
                                            </svg>
                                          </i>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </form>
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
      <!-- Section - Inner Headline v05 End -->`;
}

function renderContactInfoSection() {
  const contact = content.contactPage;

  return `<!-- Section - Section Title & Text Block Start -->
      <div class="mxd-section blur-section">
        <div class="mxd-container grid-l-container">
          <div class="mxd-block">
            <div class="mxd-section-title mxd-section-title-spaced">
              <div class="container-fluid p-0">
                <div class="row g-0">
                  <div class="col-12 col-xl-6 mxd-grid-item">
                    <div class="mxd-section-title">
                      <div class="mxd-section-title__title pre-caption">
                        <h2 class="mxd-split-lines">${escapeHtml(contact.introTitle)}</h2>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-xl-6 mxd-grid-item">
                    <div class="mxd-section-title__paragraph">
                      <p class="t-bold t-large mxd-split-lines">${escapeHtml(contact.introBody)}</p>
                    </div>
                    <div class="mxd-section-title__datalist">
                      <div class="container-fluid p-0">
                        <div class="row g-0">
                          <div class="col-12 col-md-6 col-xl-5 datalist__item">
                            <div class="datalist__title">
                              <p class="t-bold t-large anim-uni-in-up">Nis</p>
                            </div>
                            <ul>
                              <li class="anim-uni-in-up">
                                <a class="tag tag-s-mobile" href="https://maps.google.com/?q=Dimitrija+Leka+66+Nis" target="_blank">${escapeHtml(contact.address)}</a>
                              </li>
                            </ul>
                            <ul>
                              <li class="anim-uni-in-up">
                                <a class="tag tag-s-mobile mxd-scramble" href="tel:+381601491491">${escapeHtml(contact.phone)}</a>
                              </li>
                              <li class="anim-uni-in-up">
                                <a class="tag tag-s-mobile mxd-scramble" href="mailto:${escapeHtml(contact.email)}">${escapeHtml(contact.email)}</a>
                              </li>
                            </ul>
                          </div>
                          <div class="col-12 col-md-6 col-xl-5 datalist__item">
                            <div class="datalist__title">
                              <p class="t-bold t-large t-caption anim-uni-in-up">Radno vreme</p>
                            </div>
                            <ul>
                              ${contact.officeHours
                                .map((item) => `<li class="anim-uni-in-up"><span class="tag tag-s-mobile">${escapeHtml(item)}</span></li>`)
                                .join("")}
                            </ul>
                            <ul>
                              <li class="anim-uni-in-up"><a class="tag tag-s-mobile" href="/our-services">Usluge</a></li>
                              <li class="anim-uni-in-up"><a class="tag tag-s-mobile" href="/our-projects">Projekti</a></li>
                            </ul>
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
      <!-- Section - Section Title & Text Block End -->`;
}

function renderProjectsHero() {
  const hero = content.projectsPage.hero;
  const tags = ["Web sistemi", "Booking", "Lead generation", "Brand sajt", "SEO", "Growth"];

  return `<!-- Section - Inner Headline v01 Start -->
      <div class="mxd-section blur-section">
        <div class="mxd-container grid-l-container">
          <div class="mxd-block loading-wrap">
            <div class="inner-headline margin-bottom-grid">
              <div class="container-fluid p-0">
                <div class="row g-0">
                  <div class="col-12 mxd-grid-item">
                    <div class="inner-headline__breadcrumbs loading-fade">
                      <div class="breadcrumbs__nav">
                        <span><a href="/"><span class="mxd-scramble">Pocetna</span></a></span>
                        <span class="current-item">Projekti</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="inner-headline__content has-medium-title">
                      <div class="container-fluid p-0">
                        <div class="row g-0">
                          <div class="col-12 col-xl-8 mxd-grid-item">
                            <div class="inner-headline__title">
                              <h1 class="medium loading-split">${escapeHtml(hero.title)}</h1>
                            </div>
                            <div class="inner-headline__caption split-caption-title pre-grid">
                              <div class="mxd-grid-item">
                                <p class="t-bold t-large loading-split">${escapeHtml(hero.description)}</p>
                              </div>
                            </div>
                          </div>
                          <div class="col-12 col-xl-4 mxd-grid-item">
                            <div class="inner-headline__tags align-end-desktop tags-medium-title">
                              ${tags
                                .map((tag) => `<span class="tag tag-m meta-tag mxd-scramble loading-item">${escapeHtml(tag)}</span>`)
                                .join("")}
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
      <!-- Section - Inner Headline v01 End -->`;
}

function renderProjectCard(project: ProjectItem, wide = false) {
  const tags = [project.category, "Next.js", "Rezultat"];
  return `<div class="col-12 col-md-6 ${wide ? "col-xl-7" : "col-xl-5"} mxd-project-item animate-card-2">
      <a class="mxd-project-item__media active-cursor-permanent" data-cursor-text="View Work" href="/project-single">
        <img src="${project.image}" alt="${escapeHtml(project.name)}">
        <div class="mxd-cover ${wide ? "mxd-cover-06" : "mxd-cover-03"}"></div>
      </a>
      <div class="mxd-project-item__caption">
        <div class="mxd-project-item__name">
          <a class="project-name-s" href="/project-single">${escapeHtml(project.name)}</a>
        </div>
        <div class="mxd-project-item__tags">
          ${tags.map((tag) => `<span class="tag tag-s tag-medium mxd-scramble">${escapeHtml(tag)}</span>`).join("")}
        </div>
      </div>
    </div>`;
}

function renderProjectsShowcase() {
  const items = content.projectsPage.items;
  const rows: string[] = [];

  for (let index = 0; index < items.length; index += 2) {
    const first = items[index];
    const second = items[index + 1];
    rows.push(`<div class="row g-0 mxd-projects-grid__gallery">
        ${renderProjectCard(first, index % 4 !== 0)}
        <div class="col-12 col-xl-1 mxd-project-divider"></div>
        ${second ? renderProjectCard(second, index % 4 === 0) : ""}
      </div>`);
  }

  return `<!-- Section - Projects Grid Sticky Showcase Start -->
      <div class="mxd-section blur-section padding-bottom-projects">
        <div class="mxd-container grid-l-container">
          <div class="mxd-block">
            <div class="mxd-projects-grid loading-fade">
              <div class="container-fluid p-0">
                ${rows.join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Section - Projects Grid Sticky Showcase End -->`;
}

function renderProjectHero() {
  const page = content.projectPage;
  const tags = page.services.slice(0, 6);

  return `<!-- Section - Inner Headline v07 Start -->
      <div class="mxd-section blur-section padding-top-title">
        <div class="mxd-container grid-l-container">
          <div class="mxd-block loading-wrap">
            <div class="inner-headline margin-bottom-details">
              <div class="container-fluid p-0">
                <div class="row g-0">
                  <div class="col-12 mxd-grid-item">
                    <div class="inner-headline__breadcrumbs loading-fade">
                      <div class="breadcrumbs__nav">
                        <span><a href="/our-projects"><span class="mxd-scramble">Projekti</span></a></span>
                        <span class="current-item">${escapeHtml(page.client)}</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="inner-headline__content has-large-title">
                      <div class="container-fluid p-0">
                        <div class="row g-0">
                          <div class="col-12 col-xl-9 mxd-grid-item">
                            <div class="inner-headline__title no-sup pre-subtitle-large">
                              <h1 class="large loading-split">${escapeHtml(page.client)}</h1>
                            </div>
                            <div class="inner-headline__subtitle">
                              <p class="loading-split">${escapeHtml(page.hero.description)}</p>
                            </div>
                            <div class="inner-headline__columns">
                              <div class="tags-column">
                                ${tags
                                  .slice(0, Math.ceil(tags.length / 2))
                                  .map((tag) => `<span class="tag tag-m mxd-scramble loading-item">${escapeHtml(tag)}</span>`)
                                  .join("")}
                              </div>
                              <div class="tags-column">
                                ${tags
                                  .slice(Math.ceil(tags.length / 2))
                                  .map((tag) => `<span class="tag tag-m mxd-scramble loading-item">${escapeHtml(tag)}</span>`)
                                  .join("")}
                              </div>
                            </div>
                          </div>
                          <div class="col-12 col-xl-3 mxd-grid-item">
                            <div class="inner-headline__tags align-end-desktop tags-large-subtitle loading-fade">
                              <a class="btn btn-line-icon btn-line-icon-small btn-line-default slide-down" href="#overview">
                                <span class="btn-caption mxd-scramble">Scroll to explore</span>
                                <i>
                                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 18 18">
                                    <path d="M18,10.8h-3.6v-3.6h3.6v3.6ZM7.2,14.4v3.6h3.6v-3.6h3.6v-3.6h-3.6V0h-3.6v10.8h-3.6v3.6s3.6,0,3.6,0ZM3.6,10.8v-3.6H0v3.6h3.6Z"/>
                                  </svg>
                                </i>
                              </a>
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
      <!-- Section - Inner Headline v07 End -->`;
}

function renderProjectOverview() {
  const page = content.projectPage;

  return `<!-- Section - Split List v01 Start -->
      <div id="overview" class="mxd-section blur-section padding-top-subtitle padding-bottom-default">
        <div class="mxd-container grid-l-container">
          <div class="mxd-block">
            <div class="mxd-block-split">
              <div class="container-fluid p-0">
                <div class="row g-0">
                  <div class="col-12 col-xl-6 mxd-grid-item mxd-block-split__item">
                    <div class="mxd-block-split__inner">
                      <div class="mxd-block-split__subtitle pre-manifest">
                        <p class="anim-uni-in-up"><span>/ Overview</span></p>
                      </div>
                      <div class="mxd-block-split__manifest">
                        <p class="manifest manifest-s mxd-split-lines">${escapeHtml(page.overview)}</p>
                        <a class="btn btn-default-icon btn-default-accent slide-right anim-uni-in-up" href="${escapeHtml(page.website)}" target="_blank" rel="noreferrer">
                          <span class="btn-caption mxd-scramble">${escapeHtml(page.liveLabel)}</span>
                          <i class="btn-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 18 18">
                              <path d="M10.8,0v3.6h-3.6V0h3.6ZM14.4,10.8h3.6v-3.6h-3.6v-3.6h-3.6v3.6H0v3.6h10.8v3.6h3.6v-3.6ZM10.8,14.4h-3.6v3.6h3.6v-3.6Z"/>
                            </svg>
                          </i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-xl-6 mxd-grid-item mxd-block-split__item">
                    <div class="mxd-block-split__inner">
                      <div class="mxd-block-split__subtitle pre-grid">
                        <p class="anim-uni-in-up"><span>/ Project Details</span></p>
                      </div>
                      <div class="mxd-block-split__info">
                        <div class="split-info__item"><div class="split-info__divider divider-top"></div><div class="split-info__details"><p class="anim-uni-in-up">Naziv: <span>${escapeHtml(page.client)}</span></p></div><div class="split-info__divider divider-bottom"></div></div>
                        <div class="split-info__item"><div class="split-info__divider divider-top"></div><div class="split-info__details"><p class="anim-uni-in-up">Tip: <span>Booking + servisni sajt</span></p></div><div class="split-info__divider divider-bottom"></div></div>
                        <div class="split-info__item"><div class="split-info__divider divider-top"></div><div class="split-info__details"><p class="anim-uni-in-up">Fokus: <span>Upiti, rezervacije i operativa</span></p></div><div class="split-info__divider divider-bottom"></div></div>
                        <div class="split-info__item"><div class="split-info__divider divider-top"></div><div class="split-info__details"><p class="anim-uni-in-up">Stack: <span>Next.js, UX, SEO, Analitika</span></p></div><div class="split-info__divider divider-bottom"></div></div>
                        <div class="split-info__item"><div class="split-info__divider divider-top"></div><div class="split-info__details"><p class="anim-uni-in-up">Live: <span><a href="${escapeHtml(page.website)}" target="_blank" rel="noreferrer">${escapeHtml(page.website.replace(/^https?:\/\//, ""))}</a></span></p></div><div class="split-info__divider divider-bottom"></div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Section - Split List v01 End -->`;
}

function renderProjectFeedback() {
  const testimonial = content.projectPage.testimonial;

  return `<!-- Section - Client Feedback Start -->
      <div class="mxd-section blur-section padding-top-subtitle">
        <div class="mxd-container grid-l-container">
          <div class="mxd-block">
            <div class="mxd-testimonials-project">
              <div class="container-fluid p-0">
                <div class="row g-0">
                  <div class="col-12 col-xl-11 mxd-grid-item mxd-testimonials-project__item">
                    <div class="mxd-testimonials-project__inner">
                      <div class="mxd-testimonials-project__subtitle pre-manifest">
                        <p class="anim-uni-in-up"><span>/ Klijentov utisak</span></p>
                      </div>
                      <div class="mxd-testimonials-project__manifest fullwidth">
                        <p class="manifest manifest-s mxd-split-lines">${escapeHtml(testimonial.quote)}</p>
                        <div class="mxd-testimonials-project__author anim-uni-in-up">
                          <div class="mxd-testimonials-project__photo round">
                            <img src="/azurio/img/avatars/300x300_ava-01.webp" alt="${escapeHtml(testimonial.name)}">
                          </div>
                          <div class="mxd-testimonials-project__data">
                            <p class="mxd-testimonials-project__name">${escapeHtml(testimonial.name)}</p>
                            <p class="mxd-testimonials-project__position">${escapeHtml(testimonial.role)} u <a class="mxd-scramble" href="/project-single">${escapeHtml(testimonial.company ?? content.projectPage.client)}</a></p>
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
      <!-- Section - Client Feedback End -->`;
}

function renderNextProject() {
  const nextProject =
    content.projectsPage.items.find((item) => item.name !== content.projectPage.client) ??
    content.projectsPage.items[0];

  return `<!-- Section - Next Project Link Start -->
      <div class="mxd-section blur-section padding-top-title">
        <div class="mxd-container fullwidth-container">
          <div class="mxd-block">
            <div class="mxd-next-prj">
              <a class="mxd-next-prj__data active-cursor-accent" data-cursor-text="${escapeHtml(nextProject.name)}" href="/our-projects">
                <div class="mxd-next-prj__info">
                  <div class="mxd-next-prj__caption"><p class="mxd-split-lines">Sledeci projekat</p></div>
                  <div class="mxd-next-prj__name"><p class="mxd-split-lines">${escapeHtml(nextProject.name)} <span>${escapeHtml(nextProject.category)}</span></p></div>
                </div>
                <div class="mxd-next-prj__arrow mxd-flip-arrow">
                  <div class="arrow-container-1">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 259 260">
                      <path d="M143.9,0v28.8h-28.8V0H143.9z M143.9,28.8v28.8h28.8V28.8H143.9z M172.7,57.6v28.8h28.8V57.6H172.7z M230.2,115.2V86.4 h-28.8v28.8H0V144h201.4v28.8h28.8V144H259v-28.8H230.2z M172.7,201.6h28.8v-28.8h-28.8V201.6z M143.9,230.4h28.8v-28.8h-28.8V230.4 z M114.3,260h28.8v-28.8h-28.8V260z"/>
                    </svg>
                  </div>
                  <div class="arrow-container-2"></div>
                </div>
              </a>
              <a class="mxd-next-prj__media active-cursor-permanent" data-cursor-text="${escapeHtml(nextProject.name)}" href="/our-projects">
                <div class="mxd-next-prj__image">
                  <img class="parallax-img-small" src="${nextProject.image}" alt="${escapeHtml(nextProject.name)}">
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- Section - Next Project Link End -->`;
}

function renderServiceDetailHero(service: ServiceItem) {
  const entry = findServiceCatalogEntry(service.slug);
  const tags = [...service.bullets.slice(0, 4), ...(entry?.searchPhrasesSr.slice(0, 3) ?? [])].slice(0, 7);

  return `<!-- Section - Inner Headline v07 Start -->
      <div class="mxd-section blur-section padding-top-title">
        <div class="mxd-container grid-l-container">
          <div class="mxd-block loading-wrap">
            <div class="inner-headline margin-bottom-details">
              <div class="container-fluid p-0">
                <div class="row g-0">
                  <div class="col-12 mxd-grid-item">
                    <div class="inner-headline__breadcrumbs loading-fade">
                      <div class="breadcrumbs__nav">
                        <span><a href="/our-services"><span class="mxd-scramble">Usluge</span></a></span>
                        <span class="current-item">${escapeHtml(service.title)}</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="inner-headline__content has-large-title">
                      <div class="container-fluid p-0">
                        <div class="row g-0">
                          <div class="col-12 col-xl-9 mxd-grid-item">
                            <div class="inner-headline__title no-sup pre-subtitle-large">
                              <h1 class="large loading-split">${escapeHtml(service.title)}</h1>
                            </div>
                            <div class="inner-headline__subtitle">
                              <p class="loading-split">${escapeHtml(service.summary)}</p>
                            </div>
                            <div class="inner-headline__columns">
                              <div class="tags-column">
                                ${tags
                                  .slice(0, Math.ceil(tags.length / 2))
                                  .map((tag) => `<span class="tag tag-m mxd-scramble loading-item">${escapeHtml(tag)}</span>`)
                                  .join("")}
                              </div>
                              <div class="tags-column">
                                ${tags
                                  .slice(Math.ceil(tags.length / 2))
                                  .map((tag) => `<span class="tag tag-m mxd-scramble loading-item">${escapeHtml(tag)}</span>`)
                                  .join("")}
                              </div>
                            </div>
                          </div>
                          <div class="col-12 col-xl-3 mxd-grid-item">
                            <div class="inner-headline__tags align-end-desktop tags-large-subtitle loading-fade">
                              <a class="btn btn-line-icon btn-line-icon-small btn-line-default slide-down" href="#overview">
                                <span class="btn-caption mxd-scramble">Scroll to explore</span>
                                <i>
                                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 18 18">
                                    <path d="M18,10.8h-3.6v-3.6h3.6v3.6ZM7.2,14.4v3.6h3.6v-3.6h3.6v-3.6h-3.6V0h-3.6v10.8h-3.6v3.6s3.6,0,3.6,0ZM3.6,10.8v-3.6H0v3.6h3.6Z"/>
                                  </svg>
                                </i>
                              </a>
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
      <!-- Section - Inner Headline v07 End -->`;
}

function renderServiceDetailOverview(service: ServiceItem) {
  const entry = findServiceCatalogEntry(service.slug);

  return `<!-- Section - Split List v01 Start -->
      <div id="overview" class="mxd-section blur-section padding-top-subtitle padding-bottom-default">
        <div class="mxd-container grid-l-container">
          <div class="mxd-block">
            <div class="mxd-block-split">
              <div class="container-fluid p-0">
                <div class="row g-0">
                  <div class="col-12 col-xl-6 mxd-grid-item mxd-block-split__item">
                    <div class="mxd-block-split__inner">
                      <div class="mxd-block-split__subtitle pre-manifest">
                        <p class="anim-uni-in-up"><span>/ Overview</span></p>
                      </div>
                      <div class="mxd-block-split__manifest">
                        <p class="manifest manifest-s mxd-split-lines">${escapeHtml(entry?.aiSummarySr ?? service.summary)}</p>
                        <a class="btn btn-default-icon btn-default-accent slide-right anim-uni-in-up" href="/contact-us">
                          <span class="btn-caption mxd-scramble">Pokreni razgovor</span>
                          <i class="btn-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 18 18">
                              <path d="M10.8,0v3.6h-3.6V0h3.6ZM14.4,10.8h3.6v-3.6h-3.6v-3.6h-3.6v3.6H0v3.6h10.8v3.6h3.6v-3.6ZM10.8,14.4h-3.6v3.6h3.6v-3.6Z"/>
                            </svg>
                          </i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-xl-6 mxd-grid-item mxd-block-split__item">
                    <div class="mxd-block-split__inner">
                      <div class="mxd-block-split__subtitle pre-grid">
                        <p class="anim-uni-in-up"><span>/ Service Details</span></p>
                      </div>
                      <div class="mxd-block-split__info">
                        <div class="split-info__item"><div class="split-info__divider divider-top"></div><div class="split-info__details"><p class="anim-uni-in-up">Usluga: <span>${escapeHtml(service.title)}</span></p></div><div class="split-info__divider divider-bottom"></div></div>
                        <div class="split-info__item"><div class="split-info__divider divider-top"></div><div class="split-info__details"><p class="anim-uni-in-up">Fokus: <span>${escapeHtml(entry?.keywordSr ?? service.title)}</span></p></div><div class="split-info__divider divider-bottom"></div></div>
                        <div class="split-info__item"><div class="split-info__divider divider-top"></div><div class="split-info__details"><p class="anim-uni-in-up">Pristup: <span>Discovery, build i growth iteracije</span></p></div><div class="split-info__divider divider-bottom"></div></div>
                        <div class="split-info__item"><div class="split-info__divider divider-top"></div><div class="split-info__details"><p class="anim-uni-in-up">Tip isporuke: <span>Strategija + produkcija + podrska</span></p></div><div class="split-info__divider divider-bottom"></div></div>
                        <div class="split-info__item"><div class="split-info__divider divider-top"></div><div class="split-info__details"><p class="anim-uni-in-up">Sledeci korak: <span><a href="/contact-us">Kratak discovery poziv</a></span></p></div><div class="split-info__divider divider-bottom"></div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Section - Split List v01 End -->`;
}

function renderServiceGallery(service: ServiceItem) {
  const heroImage = SERVICE_IMAGE_MAP[service.slug] ?? "/images/portfolio/one.png";
  const related = service.slug.includes("booking")
    ? [
        "/images/booking/booking-form.png",
        "/images/booking/booking-admin-calendar.png",
        "/images/booking/booking-my-appointments.png",
      ]
    : [heroImage, "/images/portfolio/two.png", "/images/portfolio/three.png"];

  return renderProjectGallery(related);
}

function renderServiceDetailSplit(service: ServiceItem, title: string, body: string, rightLabel: string) {
  const entry = findServiceCatalogEntry(service.slug);
  const items =
    rightLabel === "Sta isporucujemo"
      ? service.bullets.map((bullet) => ({
          title: bullet,
          description: `${service.title} kroz konkretan iskorak koji pomera prodaju, upite ili operativu.`,
        }))
      : (entry?.searchPhrasesSr ?? service.bullets).slice(0, 3).map((phrase) => ({
          title: phrase,
          description: "Tema i fokus koji koristimo za strukturu stranice, poruku i merljiv growth sloj.",
        }));

  return renderProjectSplit(title, body, rightLabel, items);
}

function renderServiceFeedback(service: ServiceItem) {
  return `<!-- Section - Client Feedback Start -->
      <div class="mxd-section blur-section padding-top-subtitle">
        <div class="mxd-container grid-l-container">
          <div class="mxd-block">
            <div class="mxd-testimonials-project">
              <div class="container-fluid p-0">
                <div class="row g-0">
                  <div class="col-12 col-xl-11 mxd-grid-item mxd-testimonials-project__item">
                    <div class="mxd-testimonials-project__inner">
                      <div class="mxd-testimonials-project__subtitle pre-manifest">
                        <p class="anim-uni-in-up"><span>/ Kako izgleda saradnja</span></p>
                      </div>
                      <div class="mxd-testimonials-project__manifest fullwidth">
                        <p class="manifest manifest-s mxd-split-lines">Kada radimo ${escapeHtml(service.title.toLowerCase())}, ulazimo od cilja i ogranicenja, pa tek onda u ekran, funnel i implementaciju. <span>Poenta nije samo lep izlaz, vec sistem koji je odrziv, merljiv i spreman za sledecu fazu rasta.</span></p>
                        <div class="mxd-testimonials-project__author anim-uni-in-up">
                          <div class="mxd-testimonials-project__photo round">
                            <img src="/azurio/img/avatars/300x300_ava-01.webp" alt="Djordje">
                          </div>
                          <div class="mxd-testimonials-project__data">
                            <p class="mxd-testimonials-project__name">Djordje</p>
                            <p class="mxd-testimonials-project__position">Strategija, prodaja i rast u <a class="mxd-scramble" href="/about-us">Adspire</a></p>
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
      <!-- Section - Client Feedback End -->`;
}

function renderServiceNext(service: ServiceItem) {
  const nextService =
    content.servicesPage.items.find((item) => item.slug !== service.slug) ?? content.servicesPage.items[0];

  return `<!-- Section - Next Project Link Start -->
      <div class="mxd-section blur-section padding-top-title">
        <div class="mxd-container fullwidth-container">
          <div class="mxd-block">
            <div class="mxd-next-prj">
              <a class="mxd-next-prj__data active-cursor-accent" data-cursor-text="${escapeHtml(nextService.title)}" href="${serviceHref(nextService)}">
                <div class="mxd-next-prj__info">
                  <div class="mxd-next-prj__caption"><p class="mxd-split-lines">Sledeca usluga</p></div>
                  <div class="mxd-next-prj__name"><p class="mxd-split-lines">${escapeHtml(nextService.title)} <span>${escapeHtml(nextService.summary)}</span></p></div>
                </div>
                <div class="mxd-next-prj__arrow mxd-flip-arrow">
                  <div class="arrow-container-1">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 259 260">
                      <path d="M143.9,0v28.8h-28.8V0H143.9z M143.9,28.8v28.8h28.8V28.8H143.9z M172.7,57.6v28.8h28.8V57.6H172.7z M230.2,115.2V86.4 h-28.8v28.8H0V144h201.4v28.8h28.8V144H259v-28.8H230.2z M172.7,201.6h28.8v-28.8h-28.8V201.6z M143.9,230.4h28.8v-28.8h-28.8V230.4 z M114.3,260h28.8v-28.8h-28.8V260z"/>
                    </svg>
                  </div>
                  <div class="arrow-container-2"></div>
                </div>
              </a>
              <a class="mxd-next-prj__media active-cursor-permanent" data-cursor-text="${escapeHtml(nextService.title)}" href="${serviceHref(nextService)}">
                <div class="mxd-next-prj__image">
                  <img class="parallax-img-small" src="${SERVICE_IMAGE_MAP[nextService.slug] ?? "/images/portfolio/two.png"}" alt="${escapeHtml(nextService.title)}">
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- Section - Next Project Link End -->`;
}

export function findServiceBySlug(slug: string) {
  return content.servicesPage.items.find((item) => item.slug === slug) ?? null;
}

export function transformTemplateMain(fileName: string, mainInner: string) {
  switch (fileName) {
    case "services.html": {
      let next = replaceSection(mainInner, "Section - Inner Headline v03", renderServicesHero());
      next = replaceSection(next, "Section - Services Description Stack", renderServiceCards());
      next = replaceFirst(
        next,
        /<h2 class="reveal-type">[\s\S]*?<\/h2>/i,
        `<h2 class="reveal-type">${escapeHtml(content.servicesPage.introTitle)}</h2>`,
      );
      next = replaceFirst(
        next,
        /<p class="t-bold t-large mxd-split-lines">[\s\S]*?<\/p>/i,
        `<p class="t-bold t-large mxd-split-lines">${escapeHtml(content.servicesPage.introBody)}</p>`,
      );
      return next;
    }
    case "contact.html": {
      let next = replaceSection(mainInner, "Section - Inner Headline v05", renderContactHero());
      next = replaceSection(next, "Section - Section Title & Text Block", renderContactInfoSection());
      return next;
    }
    case "works-grid-sticky.html": {
      let next = replaceSection(mainInner, "Section - Inner Headline v01", renderProjectsHero());
      next = replaceSection(next, "Section - Projects Grid Sticky Showcase", renderProjectsShowcase());
      return next;
    }
    case "project-details.html": {
      let next = replaceSection(mainInner, "Section - Inner Headline v07", renderProjectHero());
      next = replaceSection(next, "Section - Split List v01", renderProjectOverview());
      next = replaceSectionOccurrence(next, "Section - Images Grid Simple", renderProjectGallery(content.projectPage.gallery), 0);
      next = replaceSectionOccurrence(
        next,
        "Section - Split List v02",
        renderProjectSplit(
          "Challenge",
          content.projectPage.challenge,
          "Provided Services",
          content.projectPage.services.map((item) => ({
            title: item,
            description:
              "Faza isporuke koja je bila potrebna da se funnel, UX i tehnicka osnova povezu u jednu stabilnu celinu.",
          })),
        ),
        0,
      );
      next = replaceSectionOccurrence(
        next,
        "Section - Images Grid Simple",
        renderProjectGallery([...content.projectPage.gallery].reverse()),
        1,
      );
      next = replaceSectionOccurrence(
        next,
        "Section - Split List v02",
        renderProjectSplit(
          "Solution",
          content.projectPage.solution,
          "Metrics",
          renderMetricsItems(content.projectPage.metrics),
        ),
        1,
      );
      next = next.replace(
        /<!-- Section - Client[\s\S]*?Feedback Start -->[\s\S]*?<!-- Section - Client[\s\S]*?Feedback End -->/i,
        renderProjectFeedback(),
      );
      next = replaceSection(next, "Section - Next Project Link", renderNextProject());
      return next;
    }
    default:
      return mainInner;
  }
}

export function buildServiceDetailMainHtml(slug: string) {
  const service = findServiceBySlug(slug);

  if (!service) {
    return null;
  }

  const template = `<!-- Section - Inner Headline v07 Start --><!-- Section - Inner Headline v07 End -->
      <!-- Section - Split List v01 Start --><!-- Section - Split List v01 End -->
      <!-- Section - Images Grid Simple Start --><!-- Section - Images Grid Simple End -->
      <!-- Section - Split List v02 Start --><!-- Section - Split List v02 End -->
      <!-- Section - Images Grid Simple Start --><!-- Section - Images Grid Simple End -->
      <!-- Section - Split List v02 Start --><!-- Section - Split List v02 End -->
      <!-- Section - Client Feedback Start --><!-- Section - Client Feedback End -->
      <!-- Section - Next Project Link Start --><!-- Section - Next Project Link End -->`;

  let next = replaceSection(template, "Section - Inner Headline v07", renderServiceDetailHero(service));
  next = replaceSection(next, "Section - Split List v01", renderServiceDetailOverview(service));
  next = replaceSectionOccurrence(next, "Section - Images Grid Simple", renderServiceGallery(service), 0);
  next = replaceSectionOccurrence(
    next,
    "Section - Split List v02",
    renderServiceDetailSplit(
      service,
      "Izazov",
      `Najcesci problem kod usluge "${service.title}" je sto biznisu treba rezultat bez improvizacije, a postojeci digitalni sloj obicno nema jasan funnel, prioritet ili metriku uspeha.`,
      "Sta isporucujemo",
    ),
    0,
  );
  next = replaceSectionOccurrence(next, "Section - Images Grid Simple", renderServiceGallery(service), 1);
  next = replaceSectionOccurrence(
    next,
    "Section - Split List v02",
    renderServiceDetailSplit(
      service,
      "Pristup",
      `Ulazimo od cilja, konteksta i obima, pa tek onda gradimo strukturu, dizajn i implementaciju. Na taj nacin ${service.title.toLowerCase()} nije izolovan task nego deo sireg sistema rasta.`,
      "Search i content fokus",
    ),
    1,
  );
  next = replaceSection(next, "Section - Client Feedback", renderServiceFeedback(service));
  next = replaceSection(next, "Section - Next Project Link", renderServiceNext(service));
  return next;
}
