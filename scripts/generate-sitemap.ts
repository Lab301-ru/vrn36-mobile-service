/**
 * Генерация public/sitemap.xml из единого источника правды.
 * Запускается вручную (`npm run sitemap`) и автоматически перед сборкой (prebuild).
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { site } from "../src/config/site";
import { posts } from "../src/features/blog/posts";

type Entry = { path: string; lastmod: string; changefreq: string; priority: string };

const today = new Date().toISOString().slice(0, 10);

const entries: Entry[] = [
  { path: "/", lastmod: today, changefreq: "weekly", priority: "1.0" },
  { path: "/blog", lastmod: today, changefreq: "weekly", priority: "0.8" },
  ...posts.map((post) => ({
    path: `/blog/${post.slug}`,
    lastmod: post.date,
    changefreq: "monthly",
    priority: "0.6",
  })),
];

const body = entries
  .map(
    (e) =>
      `  <url>\n` +
      `    <loc>${site.url}${e.path}</loc>\n` +
      `    <lastmod>${e.lastmod}</lastmod>\n` +
      `    <changefreq>${e.changefreq}</changefreq>\n` +
      `    <priority>${e.priority}</priority>\n` +
      `  </url>`,
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

const out = resolve(dirname(fileURLToPath(import.meta.url)), "../public/sitemap.xml");
writeFileSync(out, xml);
console.log(`sitemap.xml: ${entries.length} URL → ${out}`);
