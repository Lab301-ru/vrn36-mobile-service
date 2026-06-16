import { site } from "@/config/site";

/** Прилипающая нижняя панель действий для мобильных. */
export function MobileCta() {
  return (
    <div className="mobile-cta md:hidden">
      <a className="btn btn-primary btn-md flex-1" href={site.phoneHref}>
        Позвонить
      </a>
      <a className="btn btn-secondary btn-md flex-1" href={site.telegramHref} target="_blank" rel="noreferrer">
        Telegram
      </a>
    </div>
  );
}
