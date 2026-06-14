# VRN-36 Mobile Service Landing Handoff

## Контекст

В проекте `Crm` создана премиальная dark-tech homepage для ремонтного сервиса
`VRN-36 Mobile Service` в Воронеже.

Визуальное направление:

- premium dark theme
- deep black background
- cyber neon blue accents
- glassmorphism
- Apple Support / Linear / Vercel / modern SaaS feel
- без дешевой ремонтной стилистики, без желтого/красного, без stock photos

## Что уже сделано

Главная страница теперь доступна на:

```text
/
```

CRM dashboard перенесен на:

```text
/dashboard
```

Локальный preview:

```text
http://127.0.0.1:5173/
```

## Основные файлы

```text
src/features/landing/LandingPage.tsx
src/index.css
src/app/router.tsx
src/app/Layout.tsx
src/main.tsx
src/features/auth/LoginPage.tsx
src/shared/api/supabase.ts
```

## Реализованные секции

1. Hero section
   - крупный headline
   - trust statement
   - CTA `Позвонить сейчас`
   - телефон
   - floating 3D-like device elements
   - futuristic blue glow

2. Services
   - смартфоны
   - ноутбуки
   - планшеты
   - ПК
   - бытовая электроника

3. Why choose us
   - опытный инженер
   - быстрая диагностика
   - гарантия
   - выезд
   - прозрачная цена

4. Repair process
   - заявка
   - диагностика
   - согласование
   - ремонт
   - выдача

5. Price calculator preview
   - интерактивные select controls
   - расчет ориентировочной цены

6. Portfolio / Recent repairs
   - modern cards
   - stylized before/after panels без stock photos

7. Customer reviews

8. About engineer
   - personal brand block
   - stylized professional portrait block

9. FAQ
   - интерактивное раскрытие вопросов

10. Contact section
   - phone
   - Telegram
   - WhatsApp
   - VK

## Проверки

Команда:

```bash
npm run build
```

прошла успешно.

Проверено в in-app browser:

- desktop: все 10 секций рендерятся
- mobile 390px: все 10 секций рендерятся
- horizontal overflow: нет
- calculator: работает
- FAQ: работает

Есть предупреждение Vite о размере чанков, оно связано с существующими CRM-зависимостями вроде `xlsx`, не с landing page.

## Важные детали реализации

- Страница `/` публичная и не требует Supabase env.
- `AuthProvider` теперь scoped только на auth/CRM routes.
- `LoginPage` после входа ведет на `/dashboard`.
- Для локального preview без `.env` добавлен безопасный fallback в `src/shared/api/supabase.ts`, чтобы публичная homepage не падала до mount React.

## Что можно попросить Claude Code сделать дальше

Можно передать такой запрос:

```text
Продолжи работу над homepage VRN-36 Mobile Service.
Сохрани премиальный dark-tech стиль Apple/Linear/Vercel.
Улучши визуальную полировку, responsive spacing, CTA hierarchy и микроанимации.
Не используй stock photos, дешевые repair-shop цвета, желтый/красный.
Проверь desktop и mobile, чтобы не было horizontal overflow.
Главная страница: src/features/landing/LandingPage.tsx
Визуальный слой: src/index.css
```

## Потенциальные улучшения

- Подставить реальные ссылки Telegram/VK вместо placeholder URLs.
- Уточнить настоящий номер телефона, если `+7 (473) 260-36-36` временный.
- Добавить реальные фотографии мастера или устройства, если появятся брендовые материалы.
- Разнести landing CSS в отдельный файл, если проект будет расти.
- Добавить lazy loading/code splitting для CRM routes, чтобы убрать Vite chunk-size warning.


Act as a Senior Staff Full Stack Engineer and Lead Product Designer.

Build a production-ready website for VRN-36 Mobile Service.

Stack:

* Next.js 15 App Router
* TypeScript
* Tailwind CSS
* Shadcn UI
* Framer Motion
* Supabase
* SEO optimized

Goal:
Generate leads and phone calls for a repair service company.

Design language:
Apple + Linear + Vercel.

Theme:
Dark premium cyber-tech.

Colors:

* Background #050505
* Surface #0B0B0B
* Accent #2563EB
* Neon blue glow
* White typography

Pages:

/ (Home)
/services
/prices
/portfolio
/reviews
/blog
/about
/contact
/privacy-policy

Features:

1. Homepage

* Hero section
* Service categories
* Trust indicators
* Repair process
* Testimonials
* CTA blocks

2. Services page

* SEO structure
* Separate service cards
* Device categories

3. Prices page

* Editable pricing table

4. Portfolio page

* Repair gallery
* Before/after layout

5. Reviews page
6. Blog

* Dynamic articles
* SEO friendly

7. Contact page

* Contact form
* Telegram
* WhatsApp
* VK
* Phone

Admin panel:

* Manage services
* Manage prices
* Manage portfolio
* Manage blog posts
* Manage contacts

SEO:

* Dynamic metadata
* OpenGraph
* Schema.org
* Sitemap
* robots.txt

Performance:

* Lighthouse 95+
* Fully responsive
* Lazy loading
* Optimized images

Animations:

* Smooth Framer Motion
* Premium SaaS transitions
* Subtle hover effects
* Neon glow interactions

Architecture:
Create complete folder structure, database schema, components architecture, page architecture and implementation plan before coding.

Generate project as production-grade software, not a template.
