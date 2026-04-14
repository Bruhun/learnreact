# Project Guidelines

## Code Style
- Use TypeScript for all app and API code under `src/`.
- Follow existing style in the touched file instead of reformatting unrelated code.
- Prefer explicit typing for API payloads and response objects in server code.
- Keep client components minimal: only add `"use client"` when hooks or browser APIs are required.

## Architecture
- Framework: Next.js App Router (`src/app`).
- Route handlers live in `src/app/api/**/route.ts`.
- External service integration lives in `src/lib/` (for example `src/lib/twitter.ts`).
- Image assets are served from `public/images` and `public/images/twitter`.
- `src/app/utils/getImages.ts` reads local image files from disk and returns URL paths for UI rendering.

## Build And Test
- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build production bundle: `npm run build`
- Run production server: `npm run start`
- Run lint checks: `npm run lint`
- There is currently no automated test command configured in `package.json`.

## Conventions
- Dynamic external fetches may use `unstable_noStore()` when data must not be statically cached (see `src/lib/twitter.ts`).
- API routes should validate required query params and return typed JSON errors with proper HTTP status codes.
- For file-backed image galleries, prefer extending `src/app/utils/getImages.ts` rather than duplicating file-system traversal logic.
- Keep route-level UI logic in `src/app/**/page.tsx`; move reusable non-UI logic into `src/lib/` or `src/app/utils/`.

## Environment And Pitfalls
- `TWITTER_BEARER_TOKEN` is required for Twitter photo fetching.
- `TMDB_API_KEY` is required for the movie recommendation API route.
- Twitter images are cache-backed in `public/images/twitter`; refresh them by running `src/app/scripts/update-twitter-cache.ts`.
- A weekly GitHub workflow (`.github/workflows/update-twitter-cache.yml`) runs the cache updater via the local composite action in `action.yml`.

## References
- Project bootstrap and generic Next.js usage: `README.md`
- Twitter cache automation: `.github/workflows/update-twitter-cache.yml`
- Composite action implementation: `action.yml`