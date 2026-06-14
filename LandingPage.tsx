import { useMemo, useState } from "react";

const phone = "+7 (473) 260-36-36";
const phoneHref = "tel:+74732603636";

const services = [
  { title: "Смартфоны", copy: "Дисплеи, батареи, разъемы, камеры, восстановление после влаги.", meta: "от 30 минут" },
  { title: "Ноутбуки", copy: "Диагностика плат, чистка, замена матриц, клавиатур и накопителей.", meta: "точная смета" },
  { title: "Планшеты", copy: "Стекла, аккумуляторы, корпусные элементы и программные сбои.", meta: "с гарантией" },
  { title: "Компьютеры", copy: "Сборка, апгрейд, ремонт питания, охлаждения и нестабильной работы.", meta: "на дому" },
  { title: "Бытовая электроника", copy: "Телевизоры, приставки, мелкая техника и умные устройства.", meta: "по заявке" },
];

const reasons = [
  "Опытный инженер, который сам отвечает за результат",
  "Быстрая диагностика без навязывания лишних работ",
  "Гарантия на выполненный ремонт и установленные детали",
  "Выезд по Воронежу для техники, которую неудобно везти",
  "Прозрачная цена до начала ремонта",
];

const process = ["Заявка", "Диагностика", "Согласование", "Ремонт", "Выдача"];

const repairs = [
  { device: "iPhone 13 Pro", work: "Замена дисплейного модуля", before: "сколы и зеленая полоса", after: "True Tone, Face ID, герметизация" },
  { device: "MacBook Air M1", work: "Чистка после жидкости", before: "не включался", after: "запуск, тест питания, профилактика" },
  { device: "Samsung Tab S8", work: "Восстановление разъема USB-C", before: "зарядка под углом", after: "стабильное питание 25W" },
];

const reviews = [
  { name: "Анна", text: "Понравилось, что сначала объяснили причину поломки и цену. Телефон забрала в тот же день.", rating: "5.0" },
  { name: "Илья", text: "Ноутбук сильно грелся и выключался. После чистки и замены термопасты работает тихо.", rating: "5.0" },
  { name: "Марина", text: "Мастер приехал домой, проверил телевизор и честно сказал, что ремонт выгоден. Спасибо за подход.", rating: "4.9" },
];

const faqs = [
  {
    q: "Сколько стоит диагностика?",
    a: "Предварительная консультация бесплатная. Стоимость аппаратной диагностики зависит от устройства и заранее согласуется.",
  },
  {
    q: "Можно ли вызвать мастера домой?",
    a: "Да, выезд доступен по Воронежу для компьютеров, ноутбуков, телевизоров и другой техники, которую сложно привезти.",
  },
  {
    q: "Вы даете гарантию?",
    a: "Да, гарантия зависит от типа ремонта и комплектующих. Ее условия фиксируются при выдаче устройства.",
  },
  {
    q: "Можно ли срочно заменить экран или батарею?",
    a: "Для популярных моделей это часто можно сделать в день обращения, если деталь есть в наличии.",
  },
];

const devicePrices: Record<string, number> = {
  Смартфон: 2500,
  Ноутбук: 4200,
  Планшет: 3300,
  "ПК": 3000,
  "Бытовая техника": 3600,
};

const repairMultipliers: Record<string, number> = {
  "Экран": 1.6,
  "Питание": 1.2,
  "Чистка": 0.75,
  "После влаги": 1.45,
};

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-400/8 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-sky-200">
      <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.9)]" />
      {children}
    </div>
  );
}

function DeviceStack() {
  return (
    <div className="hero-device-stage" aria-hidden="true">
      <div className="device-glow" />
      <div className="device-card device-card-phone">
        <div className="device-screen">
          <span className="device-pill" />
          <div className="device-grid" />
          <div className="scan-line" />
        </div>
      </div>
      <div className="device-card device-card-laptop">
        <div className="laptop-top">
          <div className="laptop-chart" />
        </div>
        <div className="laptop-base" />
      </div>
      <div className="device-chip">
        <span>36</span>
      </div>
    </div>
  );
}

function RepairVisual({ index }: { index: number }) {
  return (
    <div className="repair-visual">
      <div className={`repair-panel repair-before repair-tone-${index}`}>
        <span>до</span>
        <i />
      </div>
      <div className={`repair-panel repair-after repair-tone-${index}`}>
        <span>после</span>
        <i />
      </div>
    </div>
  );
}

export function LandingPage() {
  const [device, setDevice] = useState("Смартфон");
  const [repair, setRepair] = useState("Экран");
  const [openFaq, setOpenFaq] = useState(0);

  const estimate = useMemo(() => {
    const value = devicePrices[device] * repairMultipliers[repair];
    return Math.round(value / 100) * 100;
  }, [device, repair]);

  return (
    <main className="min-h-dvh overflow-hidden bg-[#02050a] text-white">
      <div className="landing-ambient" />
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-black/45 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="VRN-36 Mobile Service">
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-cyan-300/25 bg-cyan-300/10 text-sm font-black text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.24)]">
              36
            </span>
            <span className="text-sm font-semibold tracking-tight text-white sm:text-base">VRN-36 Mobile Service</span>
          </a>
          <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a className="transition hover:text-white" href="#services">Услуги</a>
            <a className="transition hover:text-white" href="#process">Процесс</a>
            <a className="transition hover:text-white" href="#works">Работы</a>
            <a className="transition hover:text-white" href="#contacts">Контакты</a>
          </div>
          <a className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-cyan-100" href={phoneHref}>
            Позвонить
          </a>
        </div>
      </nav>

      <section id="top" className="relative mx-auto grid min-h-[100svh] max-w-7xl items-center gap-12 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
        <div className="relative z-10">
          <SectionLabel>Ремонт техники в Воронеже</SectionLabel>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.96] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Премиальный сервис для устройств, которым вы доверяете каждый день.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            Смартфоны, ноутбуки, планшеты, компьютеры и домашняя электроника. Честная диагностика,
            аккуратный ремонт и спокойная гарантия без ощущения обычной мастерской.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a className="inline-flex h-12 items-center justify-center rounded-lg bg-cyan-300 px-6 text-sm font-bold text-slate-950 shadow-[0_0_44px_rgba(34,211,238,0.35)] transition hover:bg-cyan-200" href={phoneHref}>
              Позвонить сейчас
            </a>
            <a className="inline-flex h-12 items-center justify-center rounded-lg border border-white/12 bg-white/7 px-6 text-sm font-semibold text-white backdrop-blur transition hover:border-cyan-200/40 hover:bg-white/10" href="#contacts">
              Получить консультацию
            </a>
          </div>
          <div className="mt-8 grid gap-3 text-sm text-slate-400 sm:grid-cols-3">
            <div className="rounded-lg border border-white/8 bg-white/[0.035] p-4 backdrop-blur">
              <strong className="block text-xl text-white">12+ лет</strong>
              инженерного опыта
            </div>
            <div className="rounded-lg border border-white/8 bg-white/[0.035] p-4 backdrop-blur">
              <strong className="block text-xl text-white">24 ч</strong>
              для частых ремонтов
            </div>
            <div className="rounded-lg border border-white/8 bg-white/[0.035] p-4 backdrop-blur">
              <strong className="block text-xl text-white">{phone}</strong>
              прямая связь с мастером
            </div>
          </div>
        </div>
        <DeviceStack />
      </section>

      <section id="services" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionLabel>Сервисная матрица</SectionLabel>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">Техника получает инженерный подход, а не случайный ремонт.</h2>
          <a className="inline-flex h-11 w-fit items-center justify-center rounded-lg border border-cyan-200/25 px-5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/10" href="#calculator">
            Заказать ремонт
          </a>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {services.map((service) => (
            <article key={service.title} className="group rounded-lg border border-white/9 bg-[linear-gradient(180deg,rgba(255,255,255,0.075),rgba(255,255,255,0.025))] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-200/30 hover:bg-white/[0.08]">
              <div className="mb-8 h-10 w-10 rounded-lg border border-cyan-300/20 bg-cyan-300/10 shadow-[0_0_30px_rgba(34,211,238,0.12)]" />
              <h3 className="text-xl font-semibold text-white">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{service.copy}</p>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">{service.meta}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative border-y border-white/8 bg-white/[0.025]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <SectionLabel>Почему выбирают нас</SectionLabel>
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Тихая уверенность вместо громких обещаний.</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
              Клиент видит состояние техники, варианты ремонта, стоимость и сроки до начала работ.
            </p>
          </div>
          <div className="grid gap-3">
            {reasons.map((reason, index) => (
              <div key={reason} className="flex items-start gap-4 rounded-lg border border-white/9 bg-black/30 p-4 backdrop-blur">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-cyan-300/10 text-sm font-bold text-cyan-200">{index + 1}</span>
                <p className="text-base leading-7 text-slate-200">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionLabel>Процесс</SectionLabel>
        <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">Пять шагов, которые держат ремонт под контролем.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-5">
          {process.map((step, index) => (
            <div key={step} className="relative rounded-lg border border-white/9 bg-white/[0.035] p-5">
              <span className="text-sm text-cyan-200">0{index + 1}</span>
              <h3 className="mt-8 text-xl font-semibold text-white">{step}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {index === 0 && "Оставляете заявку или звоните напрямую."}
                {index === 1 && "Проверяем устройство и находим причину."}
                {index === 2 && "Фиксируем стоимость, сроки и варианты."}
                {index === 3 && "Выполняем ремонт и контрольные тесты."}
                {index === 4 && "Возвращаем технику с гарантией."}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="calculator" className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div>
          <SectionLabel>Калькулятор</SectionLabel>
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Предварительная оценка без звонка.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Выберите устройство и тип ремонта. Итоговая цена уточняется после диагностики, но порядок бюджета понятен заранее.
          </p>
        </div>
        <div className="rounded-lg border border-cyan-200/15 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_34%),rgba(255,255,255,0.045)] p-5 backdrop-blur-2xl sm:p-7">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">Устройство</span>
              <select value={device} onChange={(event) => setDevice(event.target.value)} className="h-12 w-full rounded-lg border border-white/10 bg-black/40 px-4 text-white outline-none transition focus:border-cyan-200/60">
                {Object.keys(devicePrices).map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">Неисправность</span>
              <select value={repair} onChange={(event) => setRepair(event.target.value)} className="h-12 w-full rounded-lg border border-white/10 bg-black/40 px-4 text-white outline-none transition focus:border-cyan-200/60">
                {Object.keys(repairMultipliers).map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
          </div>
          <div className="mt-6 rounded-lg border border-white/8 bg-black/35 p-5">
            <p className="text-sm text-slate-400">Ориентир стоимости</p>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-white">от {estimate.toLocaleString("ru-RU")} ₽</p>
            <p className="mt-3 text-sm leading-6 text-slate-400">Точная смета после диагностики и проверки наличия комплектующих.</p>
          </div>
          <a className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-lg bg-cyan-300 px-6 text-sm font-bold text-slate-950 transition hover:bg-cyan-200" href={phoneHref}>
            Заказать ремонт
          </a>
        </div>
      </section>

      <section id="works" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionLabel>Недавние ремонты</SectionLabel>
        <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">Карточки работ в стиле технологичного портфолио.</h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {repairs.map((item, index) => (
            <article key={item.device} className="rounded-lg border border-white/9 bg-white/[0.04] p-4 backdrop-blur">
              <RepairVisual index={index} />
              <div className="pt-5">
                <p className="text-sm font-semibold text-cyan-200">{item.device}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{item.work}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-400">До: {item.before}</p>
                <p className="text-sm leading-6 text-slate-300">После: {item.after}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/8 bg-white/[0.025]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <SectionLabel>Отзывы</SectionLabel>
              <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Сервис, который ощущается спокойно.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {reviews.map((review) => (
                <figure key={review.name} className="rounded-lg border border-white/9 bg-black/30 p-5">
                  <figcaption className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-white">{review.name}</span>
                    <span className="text-cyan-200">{review.rating}</span>
                  </figcaption>
                  <blockquote className="mt-5 text-sm leading-6 text-slate-300">“{review.text}”</blockquote>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div className="engineer-portrait" aria-label="Профессиональный портрет инженера">
          <div className="portrait-core">
            <span />
          </div>
        </div>
        <div className="self-center">
          <SectionLabel>О мастере</SectionLabel>
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Персональная ответственность вместо конвейера.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            VRN-36 Mobile Service строится вокруг личной экспертизы инженера: диагностика, согласование,
            ремонт и финальное тестирование проходят через одного ответственного специалиста.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {["BGA и пайка", "Диагностика плат", "Аккуратная сборка"].map((skill) => (
              <div key={skill} className="rounded-lg border border-white/9 bg-white/[0.035] p-4 text-sm font-semibold text-slate-200">{skill}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionLabel>FAQ</SectionLabel>
        <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Частые вопросы до обращения.</h2>
        <div className="mt-8 divide-y divide-white/8 rounded-lg border border-white/9 bg-white/[0.035]">
          {faqs.map((item, index) => (
            <button key={item.q} onClick={() => setOpenFaq(openFaq === index ? -1 : index)} className="block w-full p-5 text-left">
              <span className="flex items-center justify-between gap-4 text-base font-semibold text-white">
                {item.q}
                <span className="text-cyan-200">{openFaq === index ? "−" : "+"}</span>
              </span>
              {openFaq === index && <span className="mt-3 block text-sm leading-6 text-slate-400">{item.a}</span>}
            </button>
          ))}
        </div>
      </section>

      <section id="contacts" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-cyan-200/15 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.22),transparent_36%),rgba(255,255,255,0.045)] p-6 backdrop-blur-2xl sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <SectionLabel>Контакты</SectionLabel>
              <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">Готовы вернуть технику в строй?</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                Позвоните сейчас или напишите в удобный канал. Быстро подскажем, что проверить и как лучше привезти устройство.
              </p>
            </div>
            <div className="grid gap-3">
              <a className="rounded-lg bg-cyan-300 px-5 py-4 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-200" href={phoneHref}>Позвонить сейчас · {phone}</a>
              <div className="grid gap-3 sm:grid-cols-3">
                <a className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-200/40" href="https://t.me/" target="_blank" rel="noreferrer">Telegram</a>
                <a className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-200/40" href="https://wa.me/74732603636" target="_blank" rel="noreferrer">WhatsApp</a>
                <a className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-200/40" href="https://vk.com/" target="_blank" rel="noreferrer">VK</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
