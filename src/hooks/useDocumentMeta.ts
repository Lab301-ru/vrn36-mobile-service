import { useEffect } from "react";
import { site } from "@/config/site";

type DocumentMeta = {
  title: string;
  description?: string;
  /** Путь без домена, например "/blog". По умолчанию текущий путь. */
  path?: string;
  /** Значение meta robots. По умолчанию "index, follow" (как в index.html). */
  robots?: string;
};

function upsertMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Обновляет title, description, canonical и OG-теги для конкретной страницы.
 * Нужно для SPA: без этого все маршруты делят мета-теги из index.html.
 */
export function useDocumentMeta({ title, description, path, robots }: DocumentMeta) {
  useEffect(() => {
    document.title = title;
    const canonicalPath = path ?? window.location.pathname;
    const canonicalUrl = `${site.url}${canonicalPath}`;

    // Каждая страница задаёт robots явно: служебные (404) — noindex,
    // остальные возвращают значение по умолчанию при переходе с них.
    upsertMeta('meta[name="robots"]', "name", "robots", robots ?? "index, follow");

    if (description) {
      upsertMeta('meta[name="description"]', "name", "description", description);
      upsertMeta('meta[property="og:description"]', "property", "og:description", description);
      upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    }
    upsertMeta('meta[property="og:title"]', "property", "og:title", title);
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    upsertMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    upsertCanonical(canonicalUrl);
  }, [title, description, path]);
}
