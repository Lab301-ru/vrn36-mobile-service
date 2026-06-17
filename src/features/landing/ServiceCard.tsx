import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Service } from "./LandingPage";

type Props = {
  service: Service;
  index: number;
  onCall: (service: string) => void;
  onConsult: (service: string) => void;
  onCalc: () => void;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function ServiceCard({ service, index, onCall, onConsult, onCalc }: Props) {
  const [on, setOn] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // Reveal управляется React-состоянием (не глобальным classList-обсервером),
  // иначе ре-рендер по клику тоггла стирает класс is-visible и карточка исчезает.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} service-card card flex flex-col p-6 ${on ? "is-active" : ""}`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      {/* Компактная часть фиксированной высоты — бейджи выравниваются по нижней линии */}
      <div className="service-compact flex flex-1 flex-col">
        <button
          type="button"
          role="switch"
          aria-checked={on}
          aria-label={`Показать цены и действия — ${service.title}`}
          onClick={() => setOn((v) => !v)}
          className={`ios-toggle mb-9 ${on ? "is-on" : ""}`}
        >
          <span className="ios-toggle-knob" />
        </button>

        <h3 className="text-lg font-semibold text-white">{service.title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-400">{service.copy}</p>
        <div className="mt-auto pt-6">
          <span className="tag">{service.meta}</span>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {on && (
          <motion.div
            key="expand"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            style={{ overflow: "hidden" }}
          >
            <div className="mt-6 border-t border-white/8 pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Ориентировочные цены
              </p>
              <ul className="mt-4 space-y-2.5">
                {service.prices.map((p) => (
                  <li key={p.label} className="flex items-baseline justify-between gap-2 text-[13px]">
                    <span className="min-w-0 text-slate-300">{p.label}</span>
                    <span className="shrink-0 whitespace-nowrap font-semibold text-white">{p.price}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 grid gap-2">
                <button type="button" className="btn btn-primary svc-action" onClick={() => onCall(service.title)}>
                  Вызвать мастера
                </button>
                <button type="button" className="btn btn-secondary svc-action" onClick={() => onConsult(service.title)}>
                  Получить консультацию
                </button>
                <button type="button" className="btn btn-secondary svc-action" onClick={onCalc}>
                  Рассчитать стоимость
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
