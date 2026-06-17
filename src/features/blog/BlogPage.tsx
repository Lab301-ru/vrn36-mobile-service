import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { fetchPublishedPosts, formatDate, type Post } from "./api";

export function BlogPage() {
  useDocumentMeta({
    title: "Блог VRN-36 — советы по ремонту и обслуживанию техники",
    description:
      "Полезные статьи о ремонте смартфонов, ноутбуков и электроники: уход за батареей, перегрев, защита от влаги и другие советы инженера из Воронежа.",
    path: "/blog",
  });

  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    fetchPublishedPosts()
      .then(setPosts)
      .catch(() => setPosts([]));
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 pt-32 sm:px-6 lg:px-8 lg:pb-32 lg:pt-36">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] mb-8">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M19 12H5M11 18l-6-6 6-6" />
        </svg>
        На главную
      </Link>
      <header className="max-w-3xl">
        <div className="eyebrow mb-5">Блог</div>
        <h1 className="heading text-balance text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
          Советы инженера по ремонту и уходу за техникой.
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">
          Разбираем частые поломки, профилактику и решения, которые продлевают жизнь устройств — без лишнего
          маркетинга, только практика мастерской VRN-36.
        </p>
      </header>

      {posts === null ? (
        <p className="mt-12 text-slate-400">Загрузка…</p>
      ) : posts.length === 0 ? (
        <p className="mt-12 text-slate-400">Статьи скоро появятся.</p>
      ) : (
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="card card-interactive flex flex-col overflow-hidden p-0">
              {post.coverUrl && (
                <Link to={`/blog/${post.slug}`} className="block">
                  <img src={post.coverUrl} alt="" loading="lazy" className="h-44 w-full object-cover" />
                </Link>
              )}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="tag">{post.category}</span>
                  <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
                  <span>· {post.readingMinutes} мин</span>
                </div>
                <h2 className="mt-5 text-xl font-semibold text-white">
                  <Link to={`/blog/${post.slug}`} className="transition hover:text-[var(--accent)]">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">{post.description}</p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)]"
                >
                  Читать статью
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
