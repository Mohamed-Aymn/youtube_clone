# YouTube Clone (Browse MVP)

Next.js App Router demo of a YouTube-like browse experience, structured with Clean Architecture and powered by **local mock data** (no YouTube API key).

## Features

- Home feed (popular mock videos)
- Watch page with local mock player and related videos
- Search across mock titles/descriptions/channels
- Channel pages
- YouTube-like header and sidebar shell

## Architecture

```
src/domain            entities + repository ports
src/application       use cases
src/infrastructure    mock repositories + DI container
components/           UI
app/                  routes
public/thumbnails     local poster images
public/avatars        local channel avatars
public/banners        local channel banners
```

Pages call `getContainer()` and invoke use cases. Domain code has no Next.js or data-source imports. Swap `createMock*Repository` in the DI container for a real adapter later if needed.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Mock catalog lives in [`src/infrastructure/mock/data.ts`](src/infrastructure/mock/data.ts).

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — ESLint
