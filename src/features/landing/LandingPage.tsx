import { useEffect, useMemo, useState } from "react";
import { site } from "@/config/site";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { ServiceCard } from "./ServiceCard";
import { RequestModal, type RequestMode } from "@/components/RequestModal";
import { BlogCarousel } from "@/features/blog/BlogCarousel";

const { phone, phoneHref, telegramHref, whatsappHref, vkHref } = site;

export type Service = {
  title: string;
  copy: string;
  meta: string;
  prices: { label: string; price: string }[];
};

const services: Service[] = [
  {
    title: "Смартфоны",
    copy: "Замена экранов и стекол, аккумуляторов, разъемов зарядки, камер и динамиков. Ремонт iPhone, Samsung, Xiaomi, Honor, Huawei и других смартфонов.",
    meta: "от 30 минут",
    prices: [
      { label: "Замена дисплея", price: "от 2 500 ₽" },
      { label: "Замена батареи", price: "от 1 500 ₽" },
      { label: "После влаги", price: "от 1 800 ₽" },
    ],
  },
  {
    title: "Ноутбуки",
    copy: "Чистка системы охлаждения, замена термопасты, ремонт матриц, клавиатур, SSD и разъемов питания. Восстановление после перегрева и попадания жидкости.",
    meta: "точная смета",
    prices: [
      { label: "Чистка + термопаста", price: "от 1 800 ₽" },
      { label: "Замена матрицы", price: "от 4 000 ₽" },
      { label: "Замена клавиатуры", price: "от 2 500 ₽" },
    ],
  },
  {
    title: "Планшеты",
    copy: "Замена стекол и дисплеев, аккумуляторов, кнопок и разъемов. Устранение программных ошибок и восстановление после механических повреждений.",
    meta: "с гарантией",
    prices: [
      { label: "Замена стекла", price: "от 2 800 ₽" },
      { label: "Замена аккумулятора", price: "от 2 200 ₽" },
      { label: "Ремонт разъёма", price: "от 1 900 ₽" },
    ],
  },
  {
    title: "Компьютеры",
    copy: "Диагностика и ремонт ПК, модернизация комплектующих, настройка Windows, устранение перегрева, неисправностей питания и нестабильной работы системы.",
    meta: "на дому",
    prices: [
      { label: "Чистка + охлаждение", price: "от 1 500 ₽" },
      { label: "Ремонт питания", price: "от 2 000 ₽" },
      { label: "Апгрейд / сборка", price: "от 1 500 ₽" },
    ],
  },
  {
    title: "Бытовая электроника",
    copy: "Ремонт телевизоров, ТВ-приставок, игровых консолей, сетевого оборудования и другой бытовой электроники по заявке.",
    meta: "по заявке",
    prices: [
      { label: "Диагностика", price: "бесплатно" },
      { label: "Ремонт ТВ / приставок", price: "от 2 000 ₽" },
      { label: "Выезд по городу", price: "от 500 ₽" },
    ],
  },
];

const reasons = [
  "Более 12 лет опыта ремонта смартфонов, ноутбуков и электроники",
  "Диагностика с объяснением причины неисправности и вариантов ремонта",
  "Гарантия на выполненные работы и установленные комплектующие",
  "Выезд мастера по Воронежу и ближайшим районам",
  "Фиксация стоимости до начала ремонта без скрытых доплат",
];

const process = ["Заявка", "Диагностика", "Согласование", "Ремонт", "Выдача"];

type Repair = {
  device: string;
  work: string;
  before: string;
  after: string;
  images?: { before: string; after: string; aspect: string };
};

const repairs: Repair[] = [
  {
    device: "iPhone 13 Pro",
    work: "Замена дисплейного модуля",
    before: "сколы и зеленая полоса",
    after: "True Tone, Face ID, герметизация",
    images: { before: "/repair-iphone13-before.avif", after: "/repair-iphone13-after.avif", aspect: "941 / 1672" },
  },
  {
    device: "MacBook Air M1",
    work: "Чистка после жидкости",
    before: "не включался",
    after: "запуск, тест питания, профилактика",
    images: { before: "/repair-macbook-before.avif", after: "/repair-macbook-after.avif", aspect: "941 / 1672" },
  },
  {
    device: "Samsung Tab S8",
    work: "Восстановление разъема USB-C",
    before: "зарядка под углом",
    after: "стабильное питание 25W",
    images: { before: "/repair-samsung-before.avif", after: "/repair-samsung-after.avif", aspect: "941 / 1672" },
  },
];

const reviews = [
  { name: "Анна", text: "Понравилось, что сначала объяснили причину поломки и цену. Телефон забрала в тот же день.", rating: "5.0" },
  { name: "Илья", text: "Ноутбук сильно грелся и выключался. После чистки и замены термопасты работает тихо.", rating: "5.0" },
  { name: "Марина", text: "Мастер приехал домой, проверил телевизор и честно сказал, что ремонт выгоден. Спасибо за подход.", rating: "5.0" },
];

const faqs = [
  {
    q: "Сколько стоит диагностика?",
    a: "Стоимость диагностики зависит от типа устройства и характера неисправности. Перед началом работ мастер согласует условия и расскажет о возможных вариантах ремонта.",
  },
  {
    q: "Можно ли вызвать мастера домой?",
    a: "Да. Для крупной техники, телевизоров, компьютеров и случаев, когда устройство неудобно доставлять самостоятельно, возможен выезд мастера по Воронежу и пригородам.",
  },
  {
    q: "Вы даете гарантию?",
    a: "Да. На выполненные работы и установленные комплектующие предоставляется гарантия. Срок зависит от типа ремонта и используемых деталей.",
  },
  {
    q: "Можно ли срочно заменить экран или батарею?",
    a: "Многие популярные ремонты смартфонов выполняются в день обращения при наличии необходимых комплектующих.",
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
  return <div className="eyebrow mb-5">{children}</div>;
}

function DeviceStack() {
  return (
    <div className="hero-device-stage" aria-hidden="true">
      <div className="device-glow" />
      <div className="device-card device-card-phone">
        <div className="device-screen">
          <img className="device-screen-img" src="/hero-repair.avif" alt="" loading="lazy" />
          <span className="device-pill" />
        </div>
      </div>
      <div className="device-card device-card-laptop">
        <div className="laptop-top">
          <img className="laptop-screen-img" src="/hero-laptop.avif" alt="" loading="lazy" />
        </div>
        <div className="laptop-base" />
      </div>
      <div className="device-chip">
        <div className="chip-stars">
          {[0, 1, 2, 3, 4].map((i) => (
            <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z" />
            </svg>
          ))}
        </div>
        <span className="chip-rating">5.0</span>
      </div>
    </div>
  );
}

function RepairVisual({ index, images }: { index: number; images?: Repair["images"] }) {
  if (images) {
    return (
      <div className="repair-visual repair-visual--photo">
        <div className="repair-panel repair-panel--photo" style={{ aspectRatio: images.aspect }}>
          <span>до</span>
          <img className="repair-photo" src={images.before} alt="" loading="lazy" />
        </div>
        <div className="repair-panel repair-panel--photo" style={{ aspectRatio: images.aspect }}>
          <span>после</span>
          <img className="repair-photo" src={images.after} alt="" loading="lazy" />
        </div>
      </div>
    );
  }
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

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`faq-chevron ${open ? "open" : ""} shrink-0 text-[var(--accent)]`}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function LandingPage() {
  useDocumentMeta({
    title: "VRN-36 Mobile Service — премиальный ремонт техники в Воронеже",
    description:
      "Ремонт смартфонов, ноутбуков, планшетов, ПК и бытовой электроники в Воронеже. Честная диагностика, аккуратный ремонт, гарантия и выезд мастера.",
    path: "/",
  });

  const [device, setDevice] = useState("Смартфон");
  const [repair, setRepair] = useState("Экран");
  const [openFaq, setOpenFaq] = useState(0);
  const [modal, setModal] = useState<{ open: boolean; mode: RequestMode; service: string | null }>({
    open: false,
    mode: "call",
    service: null,
  });

  const openCall = (service: string) => setModal({ open: true, mode: "call", service });
  const openConsult = (service: string) => setModal({ open: true, mode: "consult", service });
  const closeModal = () => setModal((m) => ({ ...m, open: false }));
  const scrollToCalc = () => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });

  const estimate = useMemo(() => {
    const value = devicePrices[device] * repairMultipliers[repair];
    return Math.round(value / 100) * 100;
  }, [device, repair]);

  // Reveal-on-scroll: лёгкий IntersectionObserver, без библиотек
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <section
        id="top"
        className="relative mx-auto grid min-h-[100svh] max-w-7xl items-center gap-12 px-5 pb-20 pt-32 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:pb-28"
      >
        <div className="relative z-10">
          <div className="reveal">
            <SectionLabel>Сервисный центр в Воронеже</SectionLabel>
          </div>
          <h1 className="reveal display max-w-4xl text-balance text-[2.7rem] font-semibold text-white sm:text-6xl lg:text-[4.5rem]" style={{ transitionDelay: "60ms" }}>
            Ремонт телефонов, ноутбуков и электроники в Воронеже
          </h1>
          <p className="reveal mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl" style={{ transitionDelay: "120ms" }}>
            Сервисный ремонт смартфонов, ноутбуков, планшетов, компьютеров, телевизоров и бытовой техники.
            Выполняем диагностику, замену экранов и аккумуляторов, ремонт после влаги и восстановление
            сложных неисправностей. Согласовываем стоимость до начала работ, предоставляем гарантию и
            работаем по всему Воронежу.
          </p>
          <div className="reveal mt-9 flex flex-col gap-3 sm:flex-row" style={{ transitionDelay: "180ms" }}>
            <a className="btn btn-primary btn-lg" href={phoneHref}>
              Позвонить сейчас
            </a>
            <a className="btn btn-secondary btn-lg" href="#contacts">
              Получить консультацию
            </a>
          </div>
          <div className="reveal mt-10 grid gap-3 text-sm text-slate-400 sm:grid-cols-3" style={{ transitionDelay: "240ms" }}>
            <div className="card p-4">
              <strong className="block text-xl font-semibold text-white">12+ лет</strong>
              инженерного опыта
            </div>
            <div className="card p-4">
              <strong className="block text-xl font-semibold text-white">Выезд</strong>
              по всему Воронежу
            </div>
            <div className="card p-4">
              <strong className="block whitespace-nowrap text-base font-semibold tracking-tight text-white">{phone}</strong>
              прямая связь с мастером
            </div>
          </div>
        </div>
        <DeviceStack />
      </section>

      <section id="services" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel>Сервисная матрица</SectionLabel>
            <h2 className="heading max-w-3xl text-balance text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
              Каждое устройство проходит диагностику и ремонт по понятному алгоритму. От замены экрана смартфона до восстановления ноутбука после залития — решение подбирается под неисправность, а не по шаблону.
            </h2>
          </div>
          <a className="btn btn-secondary btn-md w-fit" href="#calculator">
            Заказать ремонт
          </a>
        </div>
        <div className="mt-12 grid items-start gap-4 md:grid-cols-2 lg:grid-cols-5">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              onCall={openCall}
              onConsult={openConsult}
              onCalc={scrollToCalc}
            />
          ))}
        </div>
      </section>

      <section className="relative border-y border-white/8 bg-white/[0.015]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-32">
          <div className="reveal">
            <SectionLabel>Почему выбирают нас</SectionLabel>
            <h2 className="heading text-balance text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
              Понятные условия, профессиональная диагностика и ответственность за результат.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Клиент видит состояние техники, варианты ремонта, стоимость и сроки до начала работ.
            </p>
          </div>
          <div className="grid gap-3">
            {reasons.map((reason, index) => (
              <div
                key={reason}
                className="reveal card flex items-start gap-4 p-5"
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <span className="check-badge" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <p className="text-base leading-7 text-slate-200">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="reveal">
          <SectionLabel>Процесс</SectionLabel>
          <h2 className="heading max-w-3xl text-balance text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            Прозрачный процесс ремонта от обращения до выдачи устройства.
          </h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-5">
          {process.map((step, index) => (
            <div
              key={step}
              className="reveal card card-interactive p-6"
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <span className="font-mono text-sm text-[var(--accent)]">0{index + 1}</span>
              <h3 className="mt-9 text-lg font-semibold text-white">{step}</h3>
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

      <section id="calculator" className="mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:py-32">
        <div className="reveal self-center">
          <SectionLabel>Калькулятор</SectionLabel>
          <h2 className="heading text-balance text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            Узнайте ориентировочную стоимость ремонта смартфона, ноутбука, планшета или компьютера до обращения в сервис.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Выберите устройство и тип ремонта. Итоговая цена уточняется после диагностики, но порядок бюджета понятен заранее.
          </p>
        </div>
        <div className="reveal panel p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="field-label">Устройство</span>
              <select className="select" value={device} onChange={(event) => setDevice(event.target.value)}>
                {Object.keys(devicePrices).map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="field-label">Неисправность</span>
              <select className="select" value={repair} onChange={(event) => setRepair(event.target.value)}>
                {Object.keys(repairMultipliers).map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-6 rounded-2xl border border-white/8 bg-black/30 p-6">
            <p className="text-sm text-slate-400">Ориентир стоимости</p>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-white">от {estimate.toLocaleString("ru-RU")} ₽</p>
            <p className="mt-3 text-sm leading-6 text-slate-400">Точная смета после диагностики и проверки наличия комплектующих.</p>
          </div>
          <a className="btn btn-primary btn-lg mt-5 w-full" href={phoneHref}>
            Заказать ремонт
          </a>
        </div>
      </section>

      <section id="works" className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="reveal">
          <SectionLabel>Недавние ремонты</SectionLabel>
          <h2 className="heading max-w-3xl text-balance text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            Примеры выполненных ремонтов смартфонов, ноутбуков и планшетов с описанием неисправностей и результата.
          </h2>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {repairs.map((item, index) => (
            <article
              key={item.device}
              className="reveal card card-interactive p-5"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <RepairVisual index={index} images={item.images} />
              <div className="pt-5">
                <p className="text-sm font-semibold text-[var(--accent)]">{item.device}</p>
                <h3 className="mt-2 text-lg font-semibold text-white">{item.work}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-400">До: {item.before}</p>
                <p className="text-sm leading-6 text-slate-300">После: {item.after}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <BlogCarousel />

      <section className="border-y border-white/8 bg-white/[0.015]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="reveal">
              <SectionLabel>Отзывы</SectionLabel>
              <h2 className="heading text-balance text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
                Сервис, который ощущается спокойно.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {reviews.map((review, index) => (
                <figure
                  key={review.name}
                  className="reveal card p-6"
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <figcaption className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-white">{review.name}</span>
                    <span className="tag">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z" />
                      </svg>
                      {review.rating}
                    </span>
                  </figcaption>
                  <blockquote className="mt-5 text-sm leading-6 text-slate-300">“{review.text}”</blockquote>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:py-32">
        <div className="engineer-portrait reveal">
          <img
            className="engineer-portrait-img"
            src="/master-portrait.avif"
            alt="Михеев Фёдор Евгеньевич — старший инженер VRN-36 Mobile Service"
            loading="lazy"
          />
        </div>
        <div className="reveal self-center" style={{ transitionDelay: "80ms" }}>
          <SectionLabel>О мастере</SectionLabel>
          <h2 className="heading text-balance text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            Один инженер отвечает за диагностику, согласование, ремонт и итоговое тестирование устройства.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            VRN-36 Mobile Service специализируется на ремонте телефонов, ноутбуков, планшетов и
            компьютерной техники в Воронеже. Каждый заказ проходит диагностику, согласование стоимости и
            проверку после ремонта. Такой подход позволяет сохранять качество работ и контролировать
            результат на каждом этапе.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {["BGA и пайка", "Диагностика плат", "Аккуратная сборка"].map((skill) => (
              <div key={skill} className="card p-4 text-sm font-semibold text-slate-200">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="reveal">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="heading text-balance text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            Частые вопросы до обращения.
          </h2>
        </div>
        <div className="reveal mt-10 divide-y divide-white/8 overflow-hidden rounded-xl border border-[var(--hairline)] bg-[var(--surface)]">
          {faqs.map((item, index) => {
            const open = openFaq === index;
            return (
              <div key={item.q} className="faq-item">
                <button
                  type="button"
                  onClick={() => setOpenFaq(open ? -1 : index)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left text-base font-semibold text-white"
                >
                  {item.q}
                  <Chevron open={open} />
                </button>
                <div className={`faq-panel ${open ? "open" : ""}`}>
                  <div>
                    <p className="px-6 pb-6 text-sm leading-6 text-slate-400">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="contacts" className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="reveal panel p-7 sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <SectionLabel>Контакты</SectionLabel>
              <h2 className="heading text-balance text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
                Нужен ремонт телефона, ноутбука или другой техники в Воронеже?
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Свяжитесь с мастером по телефону, в Telegram или WhatsApp. Опишите неисправность, и мы подскажем возможную причину поломки, ориентировочную стоимость ремонта и удобный способ передачи устройства.
              </p>
            </div>
            <div className="grid gap-3">
              <a className="btn btn-primary btn-lg w-full" href={phoneHref}>
                Позвонить сейчас · {phone}
              </a>
              <div className="grid gap-3 sm:grid-cols-3">
                <a className="btn btn-secondary btn-md" href={telegramHref} target="_blank" rel="noreferrer">
                  Telegram
                </a>
                <a className="btn btn-secondary btn-md" href={whatsappHref} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
                <a className="btn btn-secondary btn-md" href={vkHref} target="_blank" rel="noreferrer">
                  VK
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RequestModal open={modal.open} mode={modal.mode} service={modal.service} onClose={closeModal} />
    </>
  );
}
