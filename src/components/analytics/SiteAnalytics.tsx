"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics/track";
import { LEAD_SUBMITTED_EVENT, type LeadSubmittedDetail } from "@/lib/analytics/events";

/**
 * One listener for the whole funnel.
 *
 * WHY DELEGATED AND NOT PER-COMPONENT. Instrumenting each button means every
 * new section on the site silently ships untracked. A document-level listener
 * covers what already exists and whatever gets added later: any element marked
 * `data-cta="<name>"` reports itself, every outbound link reports its host, and
 * the first keystroke in any form counts as a started form.
 *
 * `form_started` is what makes the numbers actionable — a page with many
 * started and few submitted forms is a broken form, while a page with views and
 * no starts is a copy problem. Those are two different fixes.
 */
export function SiteAnalytics() {
  const pathname = usePathname();
  // Scroll depth is per page, not per session: reset when the route changes.
  const depthFired = useRef<Set<string>>(new Set());
  const formStarted = useRef<Set<string>>(new Set());

  useEffect(() => {
    depthFired.current = new Set();
    formStarted.current = new Set();
    track("page_view");
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const ratio = window.scrollY / scrollable;
      if (ratio >= 0.5 && !depthFired.current.has("50")) {
        depthFired.current.add("50");
        track("scroll_50");
      }
      if (ratio >= 0.9 && !depthFired.current.has("90")) {
        depthFired.current.add("90");
        track("scroll_90");
      }
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target || typeof target.closest !== "function") return;

      const cta = target.closest<HTMLElement>("[data-cta]");
      if (cta) track("cta_click", { label: cta.dataset.cta ?? null });

      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";

      // A phone tap or a mail click is a conversion the lead form never sees.
      if (href.startsWith("mailto:")) return track("contact_intent", { label: "email" });
      if (href.startsWith("tel:")) return track("contact_intent", { label: "telefon" });
      if (href.startsWith("https://wa.me") || href.includes("api.whatsapp.com")) {
        return track("contact_intent", { label: "whatsapp" });
      }

      try {
        const url = new URL(href, window.location.href);
        if (url.host && url.host !== window.location.host) {
          track("outbound_click", { label: url.host });
        }
      } catch {
        // Relative or malformed href — nothing outbound about it.
      }
    };

    // `focusin` bubbles where `focus` does not, so one listener covers every
    // field on the page including ones mounted later.
    const onFocusIn = (event: FocusEvent) => {
      const field = event.target as HTMLElement | null;
      if (!field || !field.closest) return;
      if (!field.matches("input, textarea, select")) return;
      const form = field.closest("form");
      if (!form) return;
      const name = form.getAttribute("data-form") ?? form.getAttribute("name") ?? "forma";
      if (formStarted.current.has(name)) return;
      formStarted.current.add(name);
      track("form_started", { label: name });
    };

    const onLeadSubmitted = (event: Event) => {
      const detail = (event as CustomEvent<LeadSubmittedDetail>).detail;
      track("form_submitted", {
        label: detail?.source ? `${detail.source}${detail.service ? `:${detail.service}` : ""}` : null,
        requestId: detail?.requestId ?? null,
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick, true);
    document.addEventListener("focusin", onFocusIn, true);
    window.addEventListener(LEAD_SUBMITTED_EVENT, onLeadSubmitted);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("focusin", onFocusIn, true);
      window.removeEventListener(LEAD_SUBMITTED_EVENT, onLeadSubmitted);
    };
  }, []);

  return null;
}
