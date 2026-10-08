# Website V2 release integration handoff

## Branch architecture

- `main` remains the Hugo production source. Its existing Pages workflow is unchanged.
- `feat/website-v2-foundation` / [Draft PR #7](https://github.com/mmontielpz/mmontielpz.github.io/pull/7) contains the independently buildable Next.js shell, six route shells, tooling, and foundation tests. It excludes AICA005 and the unreviewed research case studies.
- `release/v2` is the non-production integration base at the qualified foundation commit, plus this handoff.
- `feat/aica005-learning-portal-v2` / [Draft PR #6](https://github.com/mmontielpz/mmontielpz.github.io/pull/6) merges the foundation without rewriting history and targets `release/v2`. Its comparison should contain only the AICA005 portal, Writing entry, related asset/configuration, tests, and handoff. The PR stays Draft.

## Qualification

On 2026-10-08, a clean worktree of the integrated AICA005/foundation code revision `733cd3ce58fdcedbb5585749dab4e9004ecf08fc` completed:

| Gate | Result |
| --- | --- |
| `npm ci` | PASS |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm run build` | PASS; static export of seven content routes plus 404 |
| `npm test -- tests/foundation.spec.ts tests/aica005.spec.ts` | 32 PASS across desktop, laptop, tablet, and mobile |

The tests cover route navigation, responsive overflow, browser errors, no-JavaScript reading, AICA005 policy changes and reload/reset, clipboard success/failure, download fallback, and Codespaces pending state. The isolated foundation commit also passed the same install/typecheck/lint/build gates and its eight Playwright smoke cases. `npm audit --omit=dev --audit-level=high` found zero production dependency vulnerabilities; npm reported five high findings in development dependencies during install.

## Deployment and preview

`.github/workflows/deploy.yml` currently triggers on `main` pushes or manual dispatch, builds Hugo Extended 0.147.6 with the PaperMod submodule, and deploys `public/` to the existing GitHub Pages environment. Neither V2 branch changes that workflow or Pages settings. A merge to `main` would still trigger a Hugo rebuild, not a V2 deployment; no merge is authorized in this slice.

For owner preview, run `npm ci`, `npm run build`, then serve `v2/out/` locally with a static file server. A remote staging preview would require a separate isolated host or artifact workflow; the current production Pages site must not be used as a V2 preview target. No staging service was configured here.

## Rollback and approval gates

Current production needs no rollback because Hugo remains deployed. For a later cutover, preserve the Hugo source, theme pin, and current workflow. Reversing that separately approved cutover should restore the Hugo workflow and rebuild with its pinned Hugo version, then verify Home, About, Writing, published article URLs, assets, and feeds before closing the incident.

Owner approval is required before either Draft PR is merged or V2 replaces Hugo. Review the foundation diff, the ten-file AICA005 comparison, desktop/mobile screenshots and content, and a separately qualified deployment/rollback plan. Published Hugo writing, contact paths, SEO/feeds, and research case studies have not been migrated into this release branch. Work/About/Contact and Research remain basic route shells. This integration candidate is ready for technical review, not production cutover.
