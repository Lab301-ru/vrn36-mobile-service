import { supabase } from "@/lib/supabase";

export type Post = {
  id: string;
  slug: string;
  title: string;
  description: string;
  body: string;
  category: string;
  coverUrl: string | null;
  readingMinutes: number;
  published: boolean;
  createdAt: string;
};

export type PostInput = {
  id?: string;
  slug: string;
  title: string;
  description: string;
  body: string;
  category: string;
  coverUrl: string | null;
  readingMinutes: number;
  published: boolean;
};

type Row = {
  id: string;
  slug: string;
  title: string;
  description: string;
  body: string;
  category: string;
  cover_url: string | null;
  reading_minutes: number;
  published: boolean;
  created_at: string;
};

function toPost(r: Row): Post {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    description: r.description,
    body: r.body,
    category: r.category,
    coverUrl: r.cover_url,
    readingMinutes: r.reading_minutes,
    published: r.published,
    createdAt: r.created_at,
  };
}

const COLUMNS = "id, slug, title, description, body, category, cover_url, reading_minutes, published, created_at";

/** Опубликованные посты для публичной части (свежие сверху). */
export async function fetchPublishedPosts(): Promise<Post[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("posts")
    .select(COLUMNS)
    .eq("published", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as Row[]).map(toPost);
}

/** Один опубликованный пост по slug. */
export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("posts")
    .select(COLUMNS)
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) throw error;
  return data ? toPost(data as Row) : null;
}

/** Все посты (для админки, требует авторизации). */
export async function fetchAllPosts(): Promise<Post[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("posts")
    .select(COLUMNS)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as Row[]).map(toPost);
}

export async function savePost(input: PostInput): Promise<void> {
  if (!supabase) throw new Error("Supabase не сконфигурирован");
  const row = {
    slug: input.slug,
    title: input.title,
    description: input.description,
    body: input.body,
    category: input.category,
    cover_url: input.coverUrl,
    reading_minutes: input.readingMinutes,
    published: input.published,
  };
  const { error } = input.id
    ? await supabase.from("posts").update(row).eq("id", input.id)
    : await supabase.from("posts").insert(row);
  if (error) throw error;
}

export async function deletePost(id: string): Promise<void> {
  if (!supabase) throw new Error("Supabase не сконфигурирован");
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw error;
}

/** Конвертирует изображение в WebP на клиенте (ресайз до maxW). */
async function toWebp(file: File, maxW = 1600, quality = 0.82): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxW / bitmap.width);
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas недоступен");
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();
  return await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Не удалось конвертировать в WebP"))), "image/webp", quality),
  );
}

/** Загружает обложку (с авто-конвертацией в WebP) и возвращает публичный URL. */
export async function uploadCover(file: File): Promise<string> {
  if (!supabase) throw new Error("Supabase не сконфигурирован");
  const webp = await toWebp(file);
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.webp`;
  const { error } = await supabase.storage.from("blog-covers").upload(path, webp, {
    contentType: "image/webp",
    cacheControl: "31536000",
  });
  if (error) throw error;
  return supabase.storage.from("blog-covers").getPublicUrl(path).data.publicUrl;
}

const dateFormatter = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" });
export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

/** Транслитерация заголовка в slug. */
export function slugify(title: string): string {
  const map: Record<string, string> = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z", и: "i", й: "y",
    к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f",
    х: "h", ц: "c", ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
  };
  return title
    .toLowerCase()
    .split("")
    .map((ch) => map[ch] ?? ch)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export type Block = { type: "p" | "h2"; text: string } | { type: "list"; items: string[] };

/** Парсер тела (markdown-lite): "## " — заголовок, "- " — пункт списка, пустая строка — абзац. */
export function parseBody(body: string): Block[] {
  const blocks: Block[] = [];
  let list: string[] = [];
  const flushList = () => {
    if (list.length) {
      blocks.push({ type: "list", items: list });
      list = [];
    }
  };
  for (const raw of body.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) {
      flushList();
      continue;
    }
    if (line.startsWith("## ")) {
      flushList();
      blocks.push({ type: "h2", text: line.slice(3).trim() });
    } else if (line.startsWith("- ")) {
      list.push(line.slice(2).trim());
    } else {
      flushList();
      blocks.push({ type: "p", text: line });
    }
  }
  flushList();
  return blocks;
}
