import { Link } from "react-router-dom";
import { BrandLockup } from "@/features/landing/BrandLogo";
import { site } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-14 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <Link to="/" aria-label={site.name}>
            <BrandLockup />
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
            Ремонт телефонов, ноутбуков, планшетов, компьютеров, телевизоров и бытовой электроники в
            Воронеже и пригороде. Диагностика, срочный ремонт, выезд мастера и гарантия на выполненные
            работы. Старший инженер — Михеев Фёдор Евгеньевич.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm text-slate-400 md:items-end">
          <a className="font-semibold text-white transition hover:text-[var(--accent)]" href={site.phoneHref}>
            {site.phone}
          </a>
          <div className="flex gap-5">
            <a className="transition hover:text-white" href={site.telegramHref} target="_blank" rel="noreferrer">Telegram</a>
            <a className="transition hover:text-white" href={site.whatsappHref} target="_blank" rel="noreferrer">WhatsApp</a>
            <a className="transition hover:text-white" href={site.vkHref} target="_blank" rel="noreferrer">VK</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 pb-24 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 md:pb-5 lg:px-8">
          <span>© {new Date().getFullYear()} {site.name}. Все права защищены.</span>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
            <span>
              Сайт создан в{" "}
              <a
                href="https://lab301.ru"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-slate-400 transition hover:text-[var(--accent)]"
              >
                lab301 digital studio
              </a>
            </span>
            <Link className="transition hover:text-slate-300" to="/privacy">Политика конфиденциальности</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
