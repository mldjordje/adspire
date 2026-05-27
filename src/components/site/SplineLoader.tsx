"use client";

import Script from "next/script";

export function SplineLoader() {
  return (
    <>
      <Script
        src="https://unpkg.com/@splinetool/viewer@1.12.92/build/spline-viewer.js"
        type="module"
        strategy="afterInteractive"
      />

      <Script id="spline-init" strategy="afterInteractive">{`
        (function () {
          var isMobile = window.matchMedia('(hover: none), (max-width: 767px)').matches;

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

          function setupInteractButtons() {
            if (!isMobile) return;

            var heroSelectors = [
              '.mxd-hero-01__spline-bg',
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
              if (!bg || bg.dataset.interactReady === 'true') return;

              var scene = bg.querySelector('spline-viewer') || bg.querySelector('iframe');
              if (!scene) return;
              bg.dataset.interactReady = 'true';

              var section = bg.closest('.mxd-hero-01, .mxd-hero-09, .mxd-hero-05') || bg.parentElement;
              var btn = document.createElement('button');
              var label = document.createElement('span');
              var activeTimer = null;

              btn.className = 'spline-interact-btn';
              btn.setAttribute('aria-label', 'Rotiraj scenu');
              btn.innerHTML = iconSvg;
              label.textContent = 'Rotiraj scenu';
              btn.appendChild(label);

              function disable() {
                scene.style.pointerEvents = 'none';
                scene.style.touchAction = 'auto';
                btn.classList.remove('is-active');
                if (section) section.classList.remove('is-spline-interacting');
                label.textContent = 'Rotiraj scenu';
                if (activeTimer) {
                  window.clearTimeout(activeTimer);
                  activeTimer = null;
                }
              }

              function enable(e) {
                e.preventDefault();
                scene.style.pointerEvents = 'auto';
                scene.style.touchAction = 'none';
                btn.classList.add('is-active');
                if (section) section.classList.add('is-spline-interacting');
                label.textContent = 'Prevuci scenu';
                if (activeTimer) window.clearTimeout(activeTimer);
                activeTimer = window.setTimeout(disable, 8000);
              }

              btn.addEventListener('pointerdown', enable, { passive: false });
              btn.addEventListener('click', enable, { passive: false });
              window.addEventListener('scroll', disable, { passive: true });

              if (section) {
                section.style.position = 'relative';
                section.appendChild(btn);
              }
            });
          }

          setupLazyLoad();
          setTimeout(setupInteractButtons, 300);
          [0, 500, 1500, 3000, 6000].forEach(function (d) {
            setTimeout(function () {
              hideWatermark();
              setupInteractButtons();
            }, d);
          });
        })();
      `}</Script>
    </>
  );
}
