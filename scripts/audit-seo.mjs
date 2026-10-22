// SEO smoke test. Run against `npm run start` (default) or a deployed site:
//   SITE_URL=https://www.fasfaslabs.com npm run audit:seo
// Checks every sitemap URL for status, title, description, canonical, one h1,
// Open Graph tags and valid JSON-LD, and flags duplicate titles or descriptions.

const base = process.env.SITE_URL || "http://localhost:3000";
let failed = false;
const fail = (msg) => {
  console.error(`FAIL ${msg}`);
  failed = true;
};

const get = async (path) => {
  const res = await fetch(new URL(path, base), { redirect: "manual" });
  return { status: res.status, body: await res.text() };
};

const meta = (html, attr, name) =>
  html.match(new RegExp(`<meta[^>]*${attr}="${name}"[^>]*content="([^"]*)"`, "i"))?.[1] ??
  html.match(new RegExp(`<meta[^>]*content="([^"]*)"[^>]*${attr}="${name}"`, "i"))?.[1];

for (const path of ["/robots.txt", "/sitemap.xml", "/llms.txt", "/opengraph-image"]) {
  const { status } = await get(path);
  if (status === 200) console.log(`PASS ${path}`);
  else fail(`${path}: HTTP ${status}`);
}

const sitemap = (await get("/sitemap.xml")).body;
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const seen = { title: new Map(), description: new Map() };

for (const path of paths) {
  const { status, body } = await get(path);
  if (status !== 200) {
    fail(`${path}: HTTP ${status}`);
    continue;
  }
  const errors = [];
  const title = body.match(/<title>([^<]*)<\/title>/i)?.[1];
  const description = meta(body, "name", "description");
  const canonical = body.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i)?.[1];
  const h1s = (body.match(/<h1[\s>]/gi) || []).length;

  if (!title) errors.push("missing title");
  if (!description) errors.push("missing meta description");
  else if (description.length > 170) errors.push(`description is ${description.length} chars`);
  if (!canonical) errors.push("missing canonical");
  else if (new URL(canonical).pathname.replace(/\/$/, "") !== path.replace(/\/$/, "")) errors.push(`canonical points to ${canonical}`);
  if (h1s !== 1) errors.push(`${h1s} h1 tags`);
  if (meta(body, "property", "og:title") !== title) errors.push("og:title differs from title");
  if (!meta(body, "property", "og:image")) errors.push("missing og:image");
  if (body.includes('content="noindex')) errors.push("noindex");

  for (const [, json] of body.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(json);
    } catch {
      errors.push("invalid JSON-LD");
    }
  }

  for (const [key, value] of [["title", title], ["description", description]]) {
    if (!value) continue;
    if (seen[key].has(value)) errors.push(`duplicate ${key} with ${seen[key].get(value)}`);
    seen[key].set(value, path);
  }

  if (errors.length) fail(`${path}: ${errors.join("; ")}`);
  else console.log(`PASS ${path}`);
}

if (failed) process.exitCode = 1;
