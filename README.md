# VRN-36 Mobile Service

Лендинг сервисного центра по ремонту техники в Воронеже: смартфоны, ноутбуки, планшеты, компьютеры, телевизоры и бытовая электроника.

## Стек

- **Vite 6** + **React 19** + **TypeScript**
- **Tailwind CSS 4** (`@tailwindcss/vite`)
- **React Router 7** — маршруты `/`, `/blog`, `/blog/:slug`
- **Framer Motion** — анимации карточек услуг и модального окна заявки
- SEO: per-page `<title>/description/canonical/OG`, JSON-LD, `robots.txt`, авто-генерация `sitemap.xml`

## Команды

```bash
npm install        # установка зависимостей
npm run dev        # дев-сервер (http://localhost:5173)
npm run build      # прод-сборка в dist/ (prebuild генерирует sitemap.xml)
npm run preview    # локальный предпросмотр прод-сборки
npm run typecheck  # проверка типов
npm run sitemap    # ручная генерация public/sitemap.xml из данных блога
```

## Структура

```
src/
  config/site.ts          # единый источник контактов и навигации
  components/              # общий layout (header, footer, modal, scroll)
  features/landing/        # главная страница и её блоки
  features/blog/           # блог: список, статья, данные постов
  hooks/useDocumentMeta.ts # SEO-мета на каждую страницу
scripts/generate-sitemap.ts # генерация sitemap из posts.ts + site.ts
public/                    # статика: иконки, og-image, robots.txt, sitemap.xml, фото
```

## Деплой на Vercel

1. Запушить репозиторий на GitHub.
2. В Vercel «Import Project» — фреймворк определится как **Vite** автоматически.
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. `vercel.json` уже содержит SPA-rewrite на `index.html` — прямые переходы и обновление страниц `/blog/*` работают без 404.

При смене домена обновить `url` в [`src/config/site.ts`](src/config/site.ts) (используется в canonical, sitemap и JSON-LD).
