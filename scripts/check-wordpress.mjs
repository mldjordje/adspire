/**
 * Provera da li sajt verovatno koristi WordPress.
 *
 * Upotreba:
 *   node scripts/check-wordpress.mjs putanja/do/domena.txt
 *   node scripts/check-wordpress.mjs putanja/do/domena.txt --json
 *
 * Ulaz: jedan domen po liniji (npr. example.rs, bez https://).
 * Izlaz: CSV na stdout (domen,wordpress,confidence,napomena)
 *
 * Poštujte robots.txt i uslove korišćenja ciljanih sajtova; dodajte pauzu
 * između zahteva da ne opteretite tuđe servere.
 */

import { createReadStream } from "node:fs";
import { readFile } from "node:fs/promises";
import { createInterface } from "node:readline";

const DELAY_MS = 1200;
const TIMEOUT_MS = 15000;

const UA =
  "Mozilla/5.0 (compatible; AdspireLeadCheck/1.0; +https://adspire.rs)";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function normalizeDomain(line) {
  const s = line.trim();
  if (!s || s.startsWith("#")) return null;
  return s.replace(/^https?:\/\//i, "").replace(/\/.*$/, "").toLowerCase();
}

function analyzeHtml(html, finalUrl) {
  const lower = html.slice(0, 500_000).toLowerCase();
  const signals = [];

  if (lower.includes('name="generator"') && lower.includes("wordpress")) {
    signals.push("meta_generator");
  }
  if (lower.includes("/wp-content/") || lower.includes("wp-content/themes")) {
    signals.push("wp_content");
  }
  if (lower.includes("/wp-includes/")) {
    signals.push("wp_includes");
  }
  if (lower.includes("/wp-json/")) {
    signals.push("wp_json_link");
  }

  let confidence = "no";
  if (signals.length >= 2) confidence = "high";
  else if (signals.length === 1) confidence = signals[0] === "meta_generator" ? "high" : "medium";

  return { signals, confidence, finalUrl };
}

async function fetchHomepage(domain) {
  const urls = [`https://${domain}/`, `http://${domain}/`];
  let lastErr = null;

  for (const url of urls) {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(url, {
        redirect: "follow",
        signal: controller.signal,
        headers: { "User-Agent": UA, Accept: "text/html,application/xhtml+xml" },
      });
      clearTimeout(t);
      const ct = res.headers.get("content-type") || "";
      if (!ct.includes("text/html") && !ct.includes("application/xhtml")) {
        lastErr = `non-html: ${ct}`;
        continue;
      }
      const html = await res.text();
      return { ok: true, html, finalUrl: res.url };
    } catch (e) {
      clearTimeout(t);
      lastErr = e?.name === "AbortError" ? "timeout" : String(e?.message || e);
    }
  }

  return { ok: false, error: lastErr };
}

async function tryRestApi(domain) {
  const url = `https://${domain}/wp-json/`;
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: { "User-Agent": UA, Accept: "application/json" },
    });
    clearTimeout(t);
    if (!res.ok) return false;
    const j = await res.json();
    return typeof j?.name === "string" && (j.description !== undefined || j.namespaces);
  } catch {
    clearTimeout(t);
    return false;
  }
}

async function processDomain(domain) {
  const home = await fetchHomepage(domain);
  if (!home.ok) {
    return {
      domain,
      wordpress: false,
      confidence: "error",
      note: home.error || "fetch_failed",
    };
  }

  const { signals, confidence } = analyzeHtml(home.html, home.finalUrl);
  let wp = signals.length > 0;
  let conf = confidence;
  let note = signals.join("+") || "none";

  if (!wp) {
    const rest = await tryRestApi(domain);
    if (rest) {
      wp = true;
      conf = conf === "no" ? "medium" : conf;
      note = note === "none" ? "rest_api" : `${note}+rest_api`;
    }
  }

  return { domain, wordpress: wp, confidence: conf, note };
}

async function readDomainsFromFile(filePath) {
  const raw = await readFile(filePath, "utf8");
  return raw
    .split(/\r?\n/)
    .map(normalizeDomain)
    .filter(Boolean);
}

async function main() {
  const args = process.argv.slice(2).filter((a) => a !== "--json");
  const jsonOut = process.argv.includes("--json");

  if (args.length < 1) {
    console.error(
      "Upotreba: node scripts/check-wordpress.mjs <fajl_sa_domenima.txt> [--json]"
    );
    process.exit(1);
  }

  const filePath = args[0];
  let domains = [];

  try {
    domains = await readDomainsFromFile(filePath);
  } catch {
    console.error("Ne mogu da pročitam fajl:", filePath);
    process.exit(1);
  }

  if (domains.length === 0) {
    console.error("Nema domena u fajlu.");
    process.exit(1);
  }

  const results = [];
  for (let i = 0; i < domains.length; i++) {
    const d = domains[i];
    const r = await processDomain(d);
    results.push(r);
    if (!jsonOut) {
      console.log(
        [r.domain, r.wordpress ? "yes" : "no", r.confidence, `"${r.note}"`].join(
          ","
        )
      );
    }
    if (i < domains.length - 1) await sleep(DELAY_MS);
  }

  if (jsonOut) {
    console.log(JSON.stringify(results, null, 2));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
