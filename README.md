# Матёша

Уютное **mobile-first** веб-приложение-приключение по математике для перехода из 5 в 6 класс: дроби, проценты, сравнение дробей, уравнения и геометрия. Без бэкенда, без API — прогресс хранится в **localStorage**.

## Запуск

```bash
npm install
npm run dev
```

Сборка статики:

```bash
npm run build
```

Просмотр собранного сайта локально:

```bash
npm run preview
```

## Картинка котозайца

Главный персонаж лежит в репозитории как **`src/assets/matesha.png`** и подключается через Vite (попадает в сборку в `dist/assets/`). Чтобы заменить картинку, обновите этот файл и пересоберите проект.

## GitHub Pages

1. В `vite.config.js` задайте `base` как **`/имя-репозитория/`** (со слэшами по краям), если сайт открывается по адресу вида `https://<user>.github.io/<repo>/`.

   Пример для репозитория `matesha-app`:

   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/matesha-app/',
   })
   ```

   Либо одной командой при сборке (в PowerShell):

   ```powershell
   $env:BASE='/matesha-app/'; npm run build
   ```

   (В `vite.config.js` уже читается `process.env.BASE`, по умолчанию `./`.)

2. Включите **GitHub Pages** из ветки `main` / `gh-pages`, папка **`dist`**.

3. Финальная команда публикации (после настройки `base` под ваш репозиторий):

   ```bash
   npm run build
   ```

   Затем загрузите содержимое папки **`dist`** в ветку/папку, которую обслуживает Pages (часто через Actions `peaceiris/actions-gh-pages` или вручную).

**Маршрутизация:** приложение использует `HashRouter` (`#/home`, `#/map`), поэтому не нужен файл `404.html` для SPA на GitHub Pages.

## Стек

- React 18 + Vite 5
- React Router 6

## Лицензия

Проект создан как демонстрационный учебный материал.
