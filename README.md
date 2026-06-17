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

## Деплой на GitHub Pages

Сайт собирается и публикуется напрямую из GitHub Actions
([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) — без внешних
платформ. Это основной способ деплоя (Vercel часто недоступен у российских
провайдеров).

Workflow на каждый push в `main`:

1. ставит зависимости через `pnpm install --frozen-lockfile`;
2. собирает прод-сборку `pnpm build` (prebuild генерирует `sitemap.xml`);
3. копирует `index.html` → `404.html` — SPA-fallback, чтобы прямые переходы
   на `/blog/*` отдавали приложение (у GitHub Pages нет rewrite, как в Vercel);
4. публикует `dist/` на GitHub Pages.

### Первичная настройка (один раз)

1. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. **Settings → Secrets and variables → Actions** — добавить секреты сборки:
   - `VITE_SUPABASE_URL` = `https://ucsiomzdbyjddqslhibi.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = anon-ключ проекта Supabase.

   Без секретов сборка не падает: блог и sitemap соберутся без статей.
3. **Кастомный домен `vrn36mobileservice.ru`**: файл [`public/CNAME`](public/CNAME)
   уже задаёт домен. В DNS-регистраторе перенаправить записи с Vercel на GitHub Pages:
   - `A`-записи apex-домена на `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`;
   - `CNAME` для `www` → `<username>.github.io`.

   После проверки домена включить **Enforce HTTPS** в Settings → Pages.

При смене домена обновить `url` в [`src/config/site.ts`](src/config/site.ts)
(используется в canonical, sitemap и JSON-LD) и содержимое `public/CNAME`.
