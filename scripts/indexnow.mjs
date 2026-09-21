/**
 * Tells IndexNow (Bing, Yandex, Seznam, Naver) about every URL in the live
 * sitemap, or only the URLs passed as arguments.
 *
 * Why: ChatGPT search and Copilot answer from Bing's index, and Bing re-crawls
 * a small site on its own schedule — weeks for a new page. An IndexNow ping
 * gets it fetched within a day or two. Google ignores IndexNow; use Search
 * Console for Google.
 *
 * The key is public by design: the protocol proves ownership by serving it at
 * https://adspire.rs/<key>.txt, so it lives in public/ and here.
 *
 *   npm run indexnow                       # whole sitemap
 *   npm run indexnow -- /nis /recnik       # just these paths
 */

const HOST = "adspire.rs";
const KEY = "b288b8c2587868bcf6ee7283f5edc346";
const ORIGIN = `https://${HOST}`;

async function sitemapUrls() {
  const index = await fetch(`${ORIGIN}/sitemap.xml`).then((r) => r.text());
  const children = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const urls = [];
  for (const child of children) {
    const xml = await fetch(child).then((r) => r.text());
    urls.push(...[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  }
  return urls;
}

const args = process.argv.slice(2);
const urlList = args.length
  ? args.map((p) => (p.startsWith("http") ? p : `${ORIGIN}${p.startsWith("/") ? p : `/${p}`}`))
  : await sitemapUrls();

// Refuse to ping before the key file is live — IndexNow answers 403 and the
// submission is thrown away.
const keyCheck = await fetch(`${ORIGIN}/${KEY}.txt`);
if (!keyCheck.ok || (await keyCheck.text()).trim() !== KEY) {
  console.error(`Key file ${ORIGIN}/${KEY}.txt is not live yet. Deploy first.`);
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList }),
});

console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URL(s)`);
if (!res.ok && res.status !== 202) process.exit(1);
