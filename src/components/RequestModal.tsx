import { useEffect, useState } from "react";
import { site } from "@/config/site";

export type RequestMode = "call" | "consult";

type Props = {
  open: boolean;
  mode: RequestMode;
  service: string | null;
  onClose: () => void;
};

export function RequestModal({ open, mode, service, onClose }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const title = mode === "call" ? "Вызвать мастера" : "Получить консультацию";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lead = mode === "call" ? "Хочу вызвать мастера" : "Нужна консультация";
    const text =
      `Здравствуйте! ${lead}` +
      (service ? ` по направлению «${service}»` : "") +
      `.\nИмя: ${name || "—"}\nТелефон: ${phone || "—"}`;
    window.open(`${site.whatsappHref}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div 
      className={`modal-overlay-css ${open ? "is-open" : ""}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div 
        className="modal-panel-css panel p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal-close absolute right-4 top-4 text-slate-400 hover:text-white transition-colors" aria-label="Закрыть" onClick={onClose}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="eyebrow mb-4">{service ?? "Заявка"}</div>
        <h3 className="text-2xl font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Оставьте контакты — мастер свяжется, уточнит детали и назовёт точную стоимость.
        </p>

        <form className="mt-6 grid gap-3" onSubmit={handleSubmit}>
          <label className="block">
            <span className="field-label">Имя</span>
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Как к вам обращаться"
              autoFocus
            />
          </label>
          <label className="block">
            <span className="field-label">Телефон</span>
            <input
              className="input"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 ___ ___ __ __"
              required
            />
          </label>
          <button type="submit" className="btn btn-primary btn-lg mt-1 w-full">
            Отправить заявку
          </button>
        </form>

        <div className="mt-5 border-t border-white/8 pt-5">
          <p className="text-xs text-slate-500">Или свяжитесь напрямую:</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <a className="btn btn-secondary btn-sm px-1" href={site.phoneHref}>Позвонить</a>
            <a className="btn btn-secondary btn-sm px-1" href={site.telegramHref} target="_blank" rel="noreferrer">Telegram</a>
            <a className="btn btn-secondary btn-sm px-1" href={site.whatsappHref} target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  );
}
