import { Link } from "react-router-dom";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { site } from "@/config/site";

/** Страница 404: показывается на любом несуществующем маршруте. */
export function NotFoundPage() {
  useDocumentMeta({
    title: "Страница не найдена — VRN-36 Mobile Service",
    description:
      "К сожалению, такой страницы не существует. Вернитесь на главную или свяжитесь с сервисным центром VRN-36 Mobile Service.",
    // Служебную страницу не индексируем.
    robots: "noindex, follow",
  });

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-5 pb-24 pt-32 text-center sm:px-6 lg:pb-32 lg:pt-36">
      <div className="eyebrow mb-5">Ошибка 404</div>
      <p className="heading text-7xl font-semibold text-white sm:text-8xl">404</p>
      <h1 className="heading mt-6 text-balance text-2xl font-semibold text-white sm:text-3xl">
        Такой страницы нет
      </h1>
      <p className="mt-4 max-w-md text-balance leading-8 text-slate-300">
        Возможно, ссылка устарела или была введена с ошибкой. Вернитесь на главную или загляните в блог —
        там много полезного о ремонте техники.
      </p>

      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[#0b0c0e] transition-opacity hover:opacity-90"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5M11 18l-6-6 6-6" />
          </svg>
          На главную
        </Link>
        <Link
          to="/blog"
          className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
        >
          В блог
        </Link>
      </div>

      <p className="mt-8 text-sm text-slate-500">
        Нужна помощь с техникой?{" "}
        <a href={site.phoneHref} className="font-semibold text-[var(--accent)]">
          {site.phone}
        </a>
      </p>
    </section>
  );
}
