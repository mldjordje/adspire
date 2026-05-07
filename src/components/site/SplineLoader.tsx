"use client";

import Script from "next/script";

/**
 * Client-only component that loads the Spline viewer web component and
 * runs lazy-load, watermark-removal, and mobile interact-button logic.
 *
 * Kept separate so AzurioCompositeHomePage can remain a Server Component —
 * Next.js will SSR the full HTML immediately; these scripts hydrate on top.
 */
export function SplineLoader() {
  return (
    <>
      {/* ── Spline viewer web component ──────────────────────────────────── */}
      <Script
        src="https://unpkg.com/@splinetool/viewer@1.12.92/build/spline-viewer.js"
        type="module"
        strategy="afterInteractive"
      />

      {/* ── Lazy-load + watermark + mobile interact button ───────────────── */}
      <Script id="spline-init" strategy="afterInteractive">{`
        (function () {
          var isMobile = window.matchMedia('(hover: none)').matches;

          // ── 1. Watermark removal ──────────────────────────────────────────
          function hideWatermark() {
            document.querySelectorAll('spline-viewer').forEach(function (v) {
              var sr = v.shadowRoot;
              if (!sr || sr.querySelector('#ads-hl')) return;
              var s = document.createElement('style');
              s.id = 'ads-hl';
              s.textContent = '#logo,a[href*="spline.design"]{display:none!important}';
              sr.prepend(s);
            });
          }

          // ── 2. Lazy loading ───────────────────────────────────────────────
          // First viewer (robot hero) loads immediately; rest load on scroll.
          function setupLazyLoad() {
            var viewers = Array.from(document.querySelectorAll('spline-viewer'));
            viewers.forEach(function (v, i) {
              var url = v.getAttribute('url');
              if (!url) return;
              if (i === 0) return;
              v.dataset.lazyUrl = url;
              v.removeAttribute('url');
            });

            if (!('IntersectionObserver' in window)) {
              document.querySelectorAll('spline-viewer[data-lazy-url]').forEach(function (v) {
                v.setAttribute('url', v.dataset.lazyUrl);
              });
              return;
            }

            var io = new IntersectionObserver(function (entries) {
              entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var v = entry.target;
                if (v.dataset.lazyUrl) {
                  v.setAttribute('url', v.dataset.lazyUrl);
                  delete v.dataset.lazyUrl;
                }
                io.unobserve(v);
              });
            }, { rootMargin: '300px' });

            document.querySelectorAll('spline-viewer[data-lazy-url]').forEach(function (v) {
              io.observe(v);
            });
          }

          // ── 3. Mobile "hold to rotate" button ────────────────────────────
          // Adds a pill button to each hero spline background. While the user
          // holds the button, pointer-events are enabled on the scene so they
          // can rotate/drag it. Releasing restores scroll-safe pointer-events.
          function setupInteractButtons() {
            if (!isMobile) return;

            var heroSelectors = [
              '.mxd-hero-01__spline-bg',
              '.mxd-hero-09__spline-bg',
              '.mxd-hero-05__spline-bg',
            ];

            var iconSvg =
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
              '<path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>' +
              '<path d="M3.6 9h16.8M3.6 15h16.8"/>' +
              '<path d="M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9z"/>' +
              '</svg>';

            heroSelectors.forEach(function (sel) {
              var bg = document.querySelector(sel);
              if (!bg) return;

              // Find the interactive element (spline-viewer or iframe)
              var scene = bg.querySelector('spline-viewer') || bg.querySelector('iframe');
              if (!scene) return;

              var btn = document.createElement('button');
              btn.className = 'spline-interact-btn';
              btn.setAttribute('aria-label', 'Drži za rotaciju');
              btn.innerHTML = iconSvg + '<span>Drži za rotaciju</span>';

              function enable(e) {
                e.preventDefault();
                scene.style.pointerEvents = 'auto';
                scene.style.touchAction = 'none';
                btn.classList.add('is-active');
              }

              function disable() {
                scene.style.pointerEvents = 'none';
                scene.style.touchAction = 'auto';
                btn.classList.remove('is-active');
              }

              btn.addEventListener('touchstart', enable, { passive: false });
              btn.addEventListener('touchend',   disable);
              btn.addEventListener('touchcancel', disable);

              // Insert button inside the parent section so it sits on top
              var section = bg.closest('.mxd-hero-01, .mxd-hero-09, .mxd-hero-05') || bg.parentElement;
              if (section) {
                section.style.position = 'relative';
                section.appendChild(btn);
              }
            });
          }

          setupLazyLoad();
          // Delay button setup so dangerouslySetInnerHTML DOM is fully painted
          setTimeout(setupInteractButtons, 300);
          [0, 500, 1500, 3000, 6000].forEach(function (d) { setTimeout(hideWatermark, d); });
        })();
      `}</Script>
    </>
  );
}
