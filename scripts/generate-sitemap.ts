/**
 * Генерация public/sitemap.xml. Статические маршруты + посты блога из Supabase.
 * Запускается вручную (`npm run sitemap`) и автоматически перед сборкой (prebuild).
 * Если Supabase недоступен — карта строится без отдельных статей (сборка не падает).
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { site } from "../src/config/site";

type Entry = { path: string; lastmod: string; changefreq: string; priority: string };

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const today = new Date().toISOString().slice(0, 10);

/** Берём env из процесса или из .env.local (для локального запуска). */
function readEnv(name: string): string | undefined {
  if (process.env[name]) return process.env[name];
  const envPath = resolve(root, ".env.local");
  if (!existsSync(envPath)) return undefined;
  const line = readFileSync(envPath, "utf-8")
    .split(/\r?\n/)
    .find((l) => l.startsWith(`${name}=`));
  return line?.slice(name.length + 1).trim();
}

async function fetchPostEntries(): Promise<Entry[]> {
  const url = readEnv("VITE_SUPABASE_URL");
  const key = readEnv("VITE_SUPABASE_ANON_KEY");
  if (!url || !key) return [];
  try {
    const supabase = createClient(url, key);
    const { data, error } = await supabase
      .from("posts")
      .select("slug, created_at")
      .eq("published", true);
    if (error || !data) return [];
    return data.map((p) => ({
      path: `/blog/${p.slug}`,
      lastmod: String(p.created_at).slice(0, 10),
      changefreq: "monthly",
      priority: "0.6",
    }));
  } catch {
    return [];
  }
}

const staticEntries: Entry[] = [
  { path: "/", lastmod: today, changefreq: "weekly", priority: "1.0" },
  { path: "/blog", lastmod: today, changefreq: "weekly", priority: "0.8" },
  { path: "/privacy", lastmod: today, changefreq: "yearly", priority: "0.2" },
];

const entries = [...staticEntries, ...(await fetchPostEntries())];

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

writeFileSync(resolve(root, "public/sitemap.xml"), xml);
console.log(`sitemap.xml: ${entries.length} URL`);
