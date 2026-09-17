import { HOTEL_PATH, HOTEL_SLUG } from "@/content/site/hotel";
import { getSiteUrl } from "@/lib/seo/site";

/**
 * Every JSON-LD node on the site is addressed from here.
 *
 * Before this file each builder wrote its own `${base}/#organization` string,
 * and two of them wrote the same id onto different types with different names —
 * a crawler merging by @id then saw one business claiming four identities,
 * which is the opposite of what the markup is for. One id per entity, spelled
 * in one place, is what lets an answer engine resolve "Adspire does X".
 */

export const orgId = () => `${getSiteUrl()}/#organization`;
export const websiteId = () => `${getSiteUrl()}/#website`;
export const founderId = () => `${getSiteUrl()}/#founder`;

/** A reference to a node defined elsewhere in the graph. */
export const ref = (id: string) => ({ "@id": id });

export const orgRef = () => ref(orgId());
export const websiteRef = () => ref(websiteId());
export const founderRef = () => ref(founderId());

/**
 * The one URL a service is described at. The hotel system lives on its own
 * landing page rather than under /our-services, and that exception was copied
 * into three files by hand.
 */
export function servicePath(slug: string): string {
  return slug === HOTEL_SLUG ? HOTEL_PATH : `/our-services/${slug}`;
}

export function serviceUrl(slug: string): string {
  return `${getSiteUrl()}${servicePath(slug)}`;
}

/** Canonical id of a service node, regardless of which page references it. */
export function serviceId(slug: string): string {
  return `${serviceUrl(slug)}#service`;
}

export const serviceRef = (slug: string) => ref(serviceId(slug));

/** Per-page node ids. `url` is absolute and without a fragment. */
export const webPageId = (url: string) => `${url}#webpage`;
export const breadcrumbId = (url: string) => `${url}#breadcrumb`;
export const faqId = (url: string) => `${url}#faq`;
export const itemListId = (url: string) => `${url}#itemlist`;
export const productId = (url: string) => `${url}#product`;
export const localBusinessId = (url: string) => `${url}#localbusiness`;
