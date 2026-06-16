/**
 * Единый источник правды по бренду и контактам.
 * Используется в навигации, футере, мобильной CTA и SEO-разметке.
 */
export const site = {
  name: "VRN-36 Mobile Service",
  url: "https://vrn36mobileservice.ru",
  phone: "+7 980 545 62 45",
  phoneHref: "tel:+79805456245",
  telegramHref: "https://t.me/VRN_FEDOR_MIKEEV",
  whatsappHref: "https://wa.me/79805456245",
  vkHref: "https://vk.com/profremteh_vrn",
} as const;

/**
 * Навигация шапки. Якоря лендинга записаны абсолютно (`/#id`),
 * чтобы ссылки работали и со страниц блога, а не только с главной.
 */
export const navLinks = [
  { to: "/#services", label: "Услуги" },
  { to: "/#process", label: "Процесс" },
  { to: "/#works", label: "Работы" },
  { to: "/blog", label: "Блог" },
  { to: "/#contacts", label: "Контакты" },
] as const;
