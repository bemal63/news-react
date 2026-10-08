# News web-app

React news feed using the public Hacker News search API powered by Algolia.

## Local development

```sh
npm ci
cp .env.example .env
npm run dev
```

`VITE_NEWS_BASE_API_URL=https://hn.algolia.com/api/v1/` configures the API. No API key, backend, database, or LLM is required.

Latest stories, keyword search, and the first 10 pages are supported. Topic buttons search keywords; they are not publisher-assigned categories. Stories are predominantly English and focus on technology, science, and business. The API does not supply article photos, so cards use a local placeholder. Headlines open the original article or its Hacker News discussion.

API documentation: https://hn.algolia.com/api

Validation: `npm run build`.

## Article reader

Headlines and thumbnails open `/news/:id`. The local Vite middleware at `/api/articles/:id` resolves the Hacker News story, fetches its original page, and extracts text with Mozilla Readability. It returns plain text blocks, author metadata, publication time, and `og:image` / `twitter:image` when available. Missing images and image loading failures use the local placeholder.

The source author is distinct from the Hacker News submitter. When no publication date is found, the date is explicitly shown as the time the story was shared on Hacker News. Sources that block extraction, require JavaScript/subscriptions, or contain unsupported media show a link to the original instead. No scripts or remote HTML are rendered in the reader.

The same extraction code serves local Vite middleware and the Vercel Function in `api/articles/[id].ts`. Vercel uses Node.js 24, a 30-second function limit, and a rewrite for `/news/:id`. The public API URL is configured through `vercel.json` build environment; local development uses `.env`. No database or LLM is used.

Server type check: `npx tsc -p tsconfig.node.json --noEmit`.

Feed cards progressively load source previews as they approach the viewport, with at most three requests in parallel and deduplication across repeated stories. The local article handler keeps up to 40 extracted articles for five minutes in memory, so opening a previewed story reuses its result. Missing or broken images retain the placeholder.
