import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPublishedPosts, formatDate, type Post } from "./api";

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {dir === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
    </svg>
  );
}

export function BlogCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPublishedPosts()
      .then(setPosts)
      .catch(() => setPosts([]));
  }, []);

  if (posts.length === 0) return null;

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 16 : track.clientWidth * 0.8;
    track.scrollBy({ left: amount * dir, behavior: "smooth" });
  };

  return (
    <section id="news" className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="eyebrow mb-5">Новости и советы</div>
          <h2 className="heading max-w-3xl text-balance text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            Полезные материалы о ремонте техники.
          </h2>
        </div>
        <div className="flex items-center gap-3">
          {posts.length > 1 && (
            <div className="hidden gap-2 sm:flex">
              <button type="button" className="carousel-nav" aria-label="Назад" onClick={() => scrollByCard(-1)}>
                <Arrow dir="left" />
              </button>
              <button type="button" className="carousel-nav" aria-label="Вперёд" onClick={() => scrollByCard(1)}>
                <Arrow dir="right" />
              </button>
            </div>
          )}
          <Link className="btn btn-secondary btn-md w-fit" to="/blog">
            Все статьи
          </Link>
        </div>
      </div>

      <div ref={trackRef} className="carousel-track reveal mt-12">
        {posts.map((post) => (
          <article key={post.id} data-card className="carousel-card card card-interactive flex flex-col overflow-hidden p-0">
            {post.coverUrl && (
              <Link to={`/blog/${post.slug}`} className="block">
                <img src={post.coverUrl} alt="" loading="lazy" className="h-44 w-full object-cover" />
              </Link>
            )}
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="tag">{post.category}</span>
                <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">
                <Link to={`/blog/${post.slug}`} className="transition hover:text-[var(--accent)]">
                  {post.title}
                </Link>
              </h3>
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
    </section>
  );
}
