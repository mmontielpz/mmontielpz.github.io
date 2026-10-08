# Website V2 foundation

This directory contains the isolated Next.js 16 / TypeScript App Router shell for Website V2. It exports static HTML and assets. The repository root and its existing GitHub Pages workflow continue to build and deploy Hugo.

Use Node.js 24.16.0 and npm 11.13.0. From `v2/`:

```sh
npm ci
npm run typecheck
npm run lint
npm run build
npm test -- tests/foundation.spec.ts
```

For local development, run `npm run dev`. For a static preview, serve `out/` with a local static server. The export contains `/`, `/work/`, `/research/`, `/writing/`, `/about/`, and `/contact/` as navigable foundation routes. Research case studies, educational labs, and other feature content belong to separate reviewed changes.

The export uses root-relative routes for the existing GitHub Pages user site. A project-site subpath would need a separate `basePath` and asset review. `public/.nojekyll` preserves the `_next/` asset directory if static output is eventually hosted by GitHub Pages.

This branch does not change `.github/workflows/deploy.yml` or GitHub Pages settings. Replacing Hugo requires a separate owner-approved release gate and a tested rollback to the preserved Hugo source and workflow.
