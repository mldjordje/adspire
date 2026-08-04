"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureFirstTouch } from "@/lib/crm/clientAttribution";

/**
 * Records the session's first touch on every page, not just the contact page —
 * a visitor who lands on a campaign URL and converts three pages later must
 * still be attributed to that campaign.
 *
 * Reads the query string from `window.location` rather than `useSearchParams`
 * so the root layout does not need a Suspense boundary or lose static
 * rendering.
 */
export function AttributionCapture() {
  const pathname = usePathname();

  useEffect(() => {
    captureFirstTouch();
  }, [pathname]);

  return null;
}
