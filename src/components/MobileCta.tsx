import { site } from "@/config/site";

/** Прилипающая нижняя панель действий для мобильных. */
export function MobileCta() {
  return (
    <div className="mobile-cta md:hidden">
      <a className="btn btn-primary btn-md flex-1 !h-[3.25rem] !text-base" href={site.phoneHref}>
        Позвонить
      </a>
      <a className="btn btn-secondary btn-md flex-1 !h-[3.25rem] !text-base" href={site.telegramHref} target="_blank" rel="noreferrer">
        Telegram
      </a>
    </div>
  );
}
