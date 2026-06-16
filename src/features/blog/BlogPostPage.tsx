import { Link, Navigate, useParams } from "react-router-dom";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { site } from "@/config/site";
import { formatDate, getPost, type PostBlock } from "./posts";

function Block({ block }: { block: PostBlock }) {
  if (block.type === "h2") {
    return <h2 className="mt-10 text-2xl font-semibold text-white">{block.text}</h2>;
  }
  if (block.type === "list") {
    return (
      <ul className="mt-4 space-y-2">
        {block.items.map((item) => (
          <li key={item} className="flex gap-3 text-slate-300">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
            <span className="leading-7">{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  return <p className="mt-4 leading-8 text-slate-300">{block.text}</p>;
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;

  useDocumentMeta({
    title: post ? `${post.title} — Блог VRN-36` : "Статья не найдена — Блог VRN-36",
    description: post?.description,
    path: post ? `/blog/${post.slug}` : "/blog",
  });

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    inLanguage: "ru-RU",
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-32 sm:px-6 lg:px-8 lg:pb-32 lg:pt-36">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />

      <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)]">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M19 12H5M11 18l-6-6 6-6" />
        </svg>
        Все статьи
      </Link>

      <header className="mt-6">
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="tag">{post.category}</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>· {post.readingMinutes} мин чтения</span>
        </div>
        <h1 className="heading mt-5 text-balance text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-300">{post.description}</p>
      </header>

      <div className="mt-8 border-t border-white/8 pt-2">
        {post.body.map((block, index) => (
          <Block key={index} block={block} />
        ))}
      </div>

      <div className="mt-12 panel p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-white">Нужна помощь с устройством?</h2>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Бесплатная консультация и честная диагностика. Опишите проблему — подскажем, что делать.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <a className="btn btn-primary btn-md" href={site.phoneHref}>
            Позвонить · {site.phone}
          </a>
          <a className="btn btn-secondary btn-md" href={site.telegramHref} target="_blank" rel="noreferrer">
            Написать в Telegram
          </a>
        </div>
      </div>
    </article>
  );
}
