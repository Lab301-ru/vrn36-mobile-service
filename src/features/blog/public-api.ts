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

const dateFormatter = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" });
export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
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
