/**
 * Element-level scroll reveals for every v4 page.
 *
 * Pages used to mark whole sections with `data-reveal`, so a long section
 * faded in once as a slab and everything below its first screen was already
 * "revealed" by the time it scrolled into view — the visitor saw static text.
 * This walks the content and animates the smallest meaningful blocks
 * (headings, paragraphs, list items, cards, media, buttons) as each one enters
 * the viewport, with a different motion per kind so a page doesn't read as one
 * repeated fade.
 *
 * Plain DOM + GSAP, no React: callers pass the gsap instances they already
 * loaded, and call the returned cleanup from their effect.
 */

type Gsap = typeof import("gsap").default;
type ST = typeof import("gsap/ScrollTrigger").ScrollTrigger;
type SplitTypeCtor = typeof import("split-type").default;

type Kind = "title" | "subtitle" | "text" | "item" | "card" | "media" | "action" | "quote" | "label" | "block";

/** Class-name fragments CSS modules keep in the generated name. */
const CARDISH = [
  "card", "Card", "tile", "Tile", "step", "Step", "item", "Item", "panel", "Panel",
  "row", "Row", "cell", "Cell", "box", "Box", "feature", "Feature", "proof", "Proof",
];
const LABELISH = ["eyebrow", "Eyebrow", "kicker", "Kicker", "label", "Label", "tag", "Tag", "badge", "Badge"];
const ACTIONISH = ["btn", "Btn", "button", "Button", "cta", "Cta"];

const cardSel = CARDISH.map((c) => `[class*="${c}"]`).join(",");
const labelSel = LABELISH.map((c) => `span[class*="${c}"]`).join(",");
const actionSel = ACTIONISH.map((c) => `a[class*="${c}"]`).join(",");

const ATOM = [
  "h1", "h2", "h3", "h4", "h5", "p", "li", "dt", "dd", "blockquote", "figure", "img", "picture", "video",
  "table", "details", "form", "pre", "hr", "[data-reveal-item]", cardSel, labelSel, actionSel, "button",
].join(",");

/** Never animated: decorative, fixed chrome, or a subtree with motion of its own. */
const SKIP = [
  "[data-reveal-skip]", "[aria-hidden='true']", "canvas", "svg *", "[data-horizon-wordmark]",
  "[role='dialog']", "script", "style",
  // the hotel page runs its own timeline on these
  "[data-hotel-reveal]", "[data-hotel-hero]", "[data-story-screen]",
].join(",");

function hasClassPart(el: Element, parts: string[]) {
  const cls = typeof el.className === "string" ? el.className : "";
  return parts.some((p) => cls.includes(p));
}

function kindOf(el: HTMLElement): Kind {
  const tag = el.tagName;
  if (tag === "H1" || tag === "H2") return "title";
  if (tag === "H3" || tag === "H4" || tag === "H5" || tag === "DT") return "subtitle";
  if (tag === "P" || tag === "DD" || tag === "PRE") return "text";
  if (tag === "LI" || tag === "DETAILS") return "item";
  if (tag === "BLOCKQUOTE") return "quote";
  if (tag === "IMG" || tag === "PICTURE" || tag === "VIDEO" || tag === "FIGURE") return "media";
  if (tag === "BUTTON" || (tag === "A" && hasClassPart(el, ACTIONISH))) return "action";
  if (tag === "SPAN" && hasClassPart(el, LABELISH)) return "label";
  if (hasClassPart(el, CARDISH)) return "card";
  return "block";
}

/**
 * A card-ish class on a wrapper of several cards ("cards", "rowList") names a
 * grid, not an item — animating it would move the whole grid as one slab.
 */
function isContainer(el: HTMLElement) {
  if (!hasClassPart(el, CARDISH)) return false;
  return el.querySelectorAll(`${cardSel},li`).length >= 2 && el.children.length >= 2;
}

const INLINE = new Set(["SPAN", "A", "STRONG", "EM", "B", "I", "BR", "SMALL", "TIME", "ABBR", "CODE", "MARK"]);

/**
 * A div that only holds inline runs ("Pozovite: tel · WhatsApp") is a line of
 * text without a <p> — it would otherwise be the one thing on screen that
 * never moves.
 */
function isInlineRun(el: HTMLElement) {
  if (el.tagName !== "DIV" || !el.children.length) return false;
  if (!el.textContent?.trim()) return false;
  return Array.from(el.children).every((c) => INLINE.has(c.tagName));
}

function textOnly(el: HTMLElement) {
  return Array.from(el.childNodes).every((n) => n.nodeType === Node.TEXT_NODE || (n as HTMLElement).tagName === "BR");
}

export type RevealOptions = {
  /** Extra selectors this caller animates itself. */
  skip?: string;
  /** ScrollTrigger start for everything. */
  start?: string;
};

export function revealContent(
  scopes: (HTMLElement | null | undefined)[],
  gsap: Gsap,
  ScrollTrigger: ST,
  SplitType?: SplitTypeCtor,
  options: RevealOptions = {},
): () => void {
  const skip = options.skip ? `${SKIP},${options.skip}` : SKIP;
  // clamp(): the last lines of a page can never scroll up to 88%, and would stay hidden
  const start = options.start ?? "clamp(top 88%)";
  const chosen = new Set<HTMLElement>();
  const fixedCache = new Map<Element, boolean>();
  const isFixed = (el: Element) => {
    let v = fixedCache.get(el);
    if (v === undefined) {
      v = getComputedStyle(el).position === "fixed";
      fixedCache.set(el, v);
    }
    return v;
  };
  const atoms: HTMLElement[] = [];

  for (const scope of scopes) {
    if (!scope) continue;
    // document order: an ancestor is always decided before its descendants
    scope.querySelectorAll<HTMLElement>("*").forEach((el) => {
      if (!el.matches(ATOM) && !isInlineRun(el)) return;
      if (el.closest(skip)) return;
      if (el.offsetParent === null) return; // not rendered (closed panel) or fixed
      if (isContainer(el)) return;
      for (let p = el.parentElement; p && p !== scope; p = p.parentElement) {
        if (chosen.has(p)) return;
        // fixed chrome (sticky CTA bar) has no scroll position to trigger on
        if (isFixed(p)) return;
      }
      chosen.add(el);
      atoms.push(el);
    });
  }
  if (!atoms.length) return () => {};

  const splits: { revert: () => void }[] = [];
  const triggers: ReturnType<ST["create"]>[] = [];

  // Section index flips direction, so neighbouring sections don't move alike.
  const sectionIndex = new Map<Element, number>();
  const sideOf = (el: HTMLElement) => {
    const section = el.closest("section") ?? el.parentElement ?? el;
    if (!sectionIndex.has(section)) sectionIndex.set(section, sectionIndex.size);
    return (sectionIndex.get(section) ?? 0) % 2 === 0 ? 1 : -1;
  };

  const done = (el: HTMLElement) => {
    gsap.set(el, { clearProps: "transform,opacity,visibility,filter,clipPath,transition,letterSpacing,transformOrigin" });
  };

  const byKind = new Map<Kind, HTMLElement[]>();
  atoms.forEach((el) => {
    const kind = kindOf(el);
    const list = byKind.get(kind) ?? [];
    list.push(el);
    byKind.set(kind, list);
  });

  // Hidden up front, so nothing flashes in its final place before its trigger.
  const hide = (els: HTMLElement[]) => gsap.set(els, { autoAlpha: 0, transition: "none" });

  // Whatever has not fired yet, keyed to how to play it. Layout that shrinks
  // after measuring can leave a start past the page's end, so reaching the
  // bottom plays everything still waiting.
  const pending = new Map<HTMLElement, () => void>();
  const once = (el: HTMLElement, play: () => void) => {
    pending.set(el, () => {
      pending.delete(el);
      play();
    });
  };
  const fire = (el: HTMLElement) => pending.get(el)?.();

  const batch = (els: HTMLElement[], animate: (batch: HTMLElement[]) => void, interval = 0.12) => {
    if (!els.length) return;
    hide(els);
    els.forEach((el) => once(el, () => animate([el])));
    triggers.push(
      ...ScrollTrigger.batch(els, {
        start,
        once: true,
        interval,
        onEnter: (b) => {
          const fresh = (b as HTMLElement[]).filter((el) => pending.has(el));
          fresh.forEach((el) => pending.delete(el));
          if (fresh.length) animate(fresh);
        },
      }),
    );
  };

  // ── Titles: words rise out of their own masks, alternating tilt ──
  const titles = byKind.get("title") ?? [];
  titles.forEach((el) => {
    const side = sideOf(el);
    if (SplitType && textOnly(el)) {
      const split = new SplitType(el, { types: "words" });
      const words = (split.words ?? []) as HTMLElement[];
      if (words.length) {
        splits.push(split);
        const masks = words.map((word) => {
          const mask = document.createElement("span");
          mask.style.display = "inline-block";
          mask.style.overflow = "hidden";
          mask.style.verticalAlign = "bottom";
          word.parentNode?.insertBefore(mask, word);
          mask.appendChild(word);
          return mask;
        });
        gsap.set(words, { y: "1.1em", rotate: 4 * side });
        once(el, () =>
          gsap.to(words, {
            y: 0,
            rotate: 0,
            duration: 1,
            stagger: 0.06,
            ease: "expo.out",
            onComplete: () => {
              masks.forEach((m) => (m.style.overflow = "visible"));
            },
          }),
        );
        triggers.push(ScrollTrigger.create({ trigger: el, start, once: true, onEnter: () => fire(el) }));
        return;
      }
    }
    gsap.set(el, { autoAlpha: 0, y: 36, filter: "blur(10px)", transition: "none" });
    once(el, () =>
      gsap.to(el, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "expo.out", onComplete: () => done(el) }),
    );
    triggers.push(ScrollTrigger.create({ trigger: el, start, once: true, onEnter: () => fire(el) }));
  });

  // ── Subtitles: wipe in from the reading edge ──
  batch(byKind.get("subtitle") ?? [], (b) => {
    gsap.fromTo(
      b,
      { autoAlpha: 1, clipPath: "inset(0 100% 0 0)", x: -14 },
      { clipPath: "inset(0 0% 0 0)", x: 0, duration: 0.9, stagger: 0.08, ease: "power4.out", onComplete() { b.forEach(done); } },
    );
  });

  // ── Body text: rises while the blur burns off ──
  batch(byKind.get("text") ?? [], (b) => {
    gsap.fromTo(
      b,
      { y: 22, filter: "blur(6px)" },
      { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.85, stagger: 0.09, ease: "power3.out", onComplete() { b.forEach(done); } },
    );
  });

  // ── List items / accordions: slide from the side of their section ──
  batch(
    byKind.get("item") ?? [],
    (b) => {
      gsap.fromTo(
        b,
        { x: (_i: number, el: HTMLElement) => -24 * sideOf(el) },
        { autoAlpha: 1, x: 0, duration: 0.7, stagger: 0.06, ease: "power3.out", onComplete() { b.forEach(done); } },
      );
    },
    0.08,
  );

  // ── Cards: lift out of depth, tilted back ──
  batch(byKind.get("card") ?? [], (b) => {
    gsap.fromTo(
      b,
      { y: 56, scale: 0.94, rotateX: 10, transformOrigin: "50% 100%", transformPerspective: 900 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 1,
        stagger: 0.1,
        ease: "expo.out",
        onComplete() { b.forEach(done); },
      },
    );
  });

  // ── Media: frame opens from the middle while the image settles ──
  batch(byKind.get("media") ?? [], (b) => {
    gsap.fromTo(
      b,
      { autoAlpha: 1, clipPath: "inset(14% 10% 14% 10% round 18px)", scale: 1.06 },
      { clipPath: "inset(0% 0% 0% 0% round 0px)", scale: 1, duration: 1.2, stagger: 0.12, ease: "expo.out", onComplete() { b.forEach(done); } },
    );
  });

  // ── Buttons: pop with a little overshoot ──
  batch(byKind.get("action") ?? [], (b) => {
    gsap.fromTo(
      b,
      { scale: 0.86, y: 12 },
      { autoAlpha: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "back.out(1.8)", onComplete() { b.forEach(done); } },
    );
  });

  // ── Quotes: drift in from the far side ──
  batch(byKind.get("quote") ?? [], (b) => {
    gsap.fromTo(
      b,
      { x: (_i: number, el: HTMLElement) => 40 * sideOf(el), skewX: -4 },
      { autoAlpha: 1, x: 0, skewX: 0, duration: 1, stagger: 0.1, ease: "power4.out", onComplete() { b.forEach(done); } },
    );
  });

  // ── Eyebrows and tags: tracking closes in ──
  // read before hide() touches them, or the target is the start value
  const tracking = new Map<HTMLElement, string>();
  (byKind.get("label") ?? []).forEach((el) => tracking.set(el, getComputedStyle(el).letterSpacing));
  batch(byKind.get("label") ?? [], (b) => {
    gsap.fromTo(
      b,
      { letterSpacing: "0.5em" },
      { autoAlpha: 1, letterSpacing: (_i: number, el: HTMLElement) => tracking.get(el) ?? "normal", duration: 0.9, stagger: 0.05, ease: "power3.out", onComplete() { b.forEach(done); } },
    );
  });

  // ── Anything else (forms, tables, rules): plain rise ──
  batch(byKind.get("block") ?? [], (b) => {
    gsap.fromTo(
      b,
      { y: 30, scale: 0.985 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.08, ease: "power3.out", onComplete() { b.forEach(done); } },
    );
  });

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (window.scrollY < max - 4 || !pending.size) return;
    Array.from(pending.values()).forEach((play) => play());
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  // Starts are measured once. An accordion that closes after hydration, a
  // late font or image moves everything below it, and the stale starts then
  // sit hundreds of pixels past their elements — text in view that never
  // appears. Remeasure whenever the content changes height.
  let lastHeight = 0;
  let refreshTimer = 0;
  const ro = new ResizeObserver(() => {
    const height = document.documentElement.scrollHeight;
    if (Math.abs(height - lastHeight) < 2) return;
    lastHeight = height;
    window.clearTimeout(refreshTimer);
    refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
  });
  scopes.forEach((scope) => scope && ro.observe(scope));

  return () => {
    ro.disconnect();
    window.clearTimeout(refreshTimer);
    window.removeEventListener("scroll", onScroll);
    triggers.forEach((t) => t.kill());
    splits.forEach((s) => s.revert());
    atoms.forEach(done);
  };
}
