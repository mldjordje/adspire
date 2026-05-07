"use client";

import Script from "next/script";

/**
 * Client-only component that loads the Spline viewer web component and
 * runs the lazy-load + watermark-removal logic.
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

      {/* ── Lazy-load Spline scenes + hide watermark ─────────────────────── */}
      <Script id="spline-init" strategy="afterInteractive">{`
        (function () {
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
          // Move url → data-lazy-url on all viewers except the first one
          // (first hero is immediately visible, load it right away).
          function setupLazyLoad() {
            var viewers = Array.from(document.querySelectorAll('spline-viewer'));
            viewers.forEach(function (v, i) {
              var url = v.getAttribute('url');
              if (!url) return;
              if (i === 0) return; // first viewer loads immediately
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

          setupLazyLoad();
          [0, 500, 1500, 3000, 6000].forEach(function (d) { setTimeout(hideWatermark, d); });
        })();
      `}</Script>
    </>
  );
}
