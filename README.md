# VK Movie Test

SPA-приложение на React + TypeScript для просмотра фильмов через ПоискКино API.

## Стек

- React
- TypeScript
- Vite
- React Router
- Axios

## Архитектура

Проект построен по FSD-структуре:

- `app`
- `pages`
- `widgets`
- `features`
- `entities`
- `shared`

## Реализовано

- Список фильмов
  - infinite scroll
  - подгрузка по 50
  - карточки с постером, названием, годом и рейтингом
- Фильтры
  - жанры (multi-select)
  - рейтинг (диапазон)
  - год (от 1990)
  - синхронизация с URL search params
- Детальная страница фильма
  - постер, название, описание, рейтинг, дата выхода, жанры
- Избранное
  - добавление через модальное подтверждение
  - отдельная страница
  - сохранение в `localStorage`
- Сравнение
  - максимум 2 фильма
  - при добавлении 3-го вытесняется первый
  - таблица сравнения: название, год, рейтинг, жанры, длительность

## Быстрый старт

```bash
npm install
cp .env.default .env
npm run dev
```

## Скрипты

- `npm run dev` — запуск dev-сервера
- `npm run build` — production-сборка
- `npm run preview` — предпросмотр production-сборки
- `npm run lint` — проверка eslint

## Переменные окружения

`.env.default`:

```env
VITE_KINOPOISK_API_URL=https://api.poiskkino.dev
VITE_KINOPOISK_API_KEY=YOUR_API_KEY
```

## Известные ограничения API

- На стороне API бывают ограничения по rate-limit.
- В некоторых сценариях API может возвращать пустой результат для узких фильтров.

## Репозиторий

- GitHub: <https://github.com/VVMinin/vk-movie-test>

## Live demo

- Пока не развернуто.
