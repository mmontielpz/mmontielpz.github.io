# AICA005 Learning Portal V2 handoff

## Purpose and value

The portal prepares software engineers for a hands-on coding-agent experiment. It teaches how to manage context, tool use, and verification while working on a real issue. A visitor can understand the task, choose an instructional policy, and take a reproducible prompt into a future lab without an account or model call on this site.

## Architecture and provenance

- Static Next.js export in `v2/`; route: `/writing/ai-coding-agents-token-optimization/`.
- The page explains the task and workflow. `AgentResourceLab.tsx` owns the three policy controls, generated prompt, browser storage, copy, and text export. No backend, database, or agent runtime is present.
- Authentic workload: SWE-bench Lite `django__django-11019`, Django base `93e892bb645b16ebaf287beb5fe7f3ffe8d10408`; [issue #30179](https://code.djangoproject.com/ticket/30179) and [reference PR #11019](https://github.com/django/django/pull/11019). The task concerns widget Media dependency ordering. The browser does not execute Django or reproduce benchmark results.
- `TASK.md`, `AGENT.md`, `VERIFY.md`, and `REPORT.md` are **planned** runtime contracts, not files supplied by the portal.

## Learning journey and behavior

The page moves from the dependency-ordering challenge through the agent system model, Discover → Plan → Execute → Verify → Report, practical do/avoid guidance, experiment configuration, and a pending Codespaces handoff. Context (Targeted/Broad), exploration (Bounded/Open), and verification (Focused + regression/Focused only) each change the policy summary, trade-offs, and exact prompt text. Choices persist in localStorage after hydration; Reset restores defaults. The prompt is selectable, copies through the secure Clipboard API when permitted, and downloads as UTF-8 text. Copy failure selects the text and explains manual copy.

## Qualification evidence

Fresh local run on 2026-10-08 from `v2/`:

| Check | Result |
| --- | --- |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm run build` | PASS; static route exported |
| `npm test -- tests/aica005.spec.ts` | 24 passed across desktop, laptop, tablet, and mobile against static output |

Playwright covers every policy, exact prompt changes, reload/reset, secure clipboard contents, blocked clipboard and download fallback, same-site links, keyboard operation, no-JavaScript content, console errors, and overflow. A browser walkthrough also checked localhost, loopback, and LAN HTTP in development and static previews at desktop and mobile sizes. Screenshots are local, ignored artifacts in `v2/test-results/` and `/tmp/aica005-qualification-*.png`; they are not committed.

## Limits and Codespaces dependency

The Codespaces laboratory is **Pending setup**. A runtime repository, pinned checkout, four contracts, verification commands, participant Copilot access, and a validated launch destination must be qualified before adding a link. The portal makes no claim about agent outcomes, token telemetry, cost, or Copilot availability. LAN HTTP is an insecure browser origin, so automatic clipboard access may be unavailable; manual selection and text download remain available. Browser storage may be disabled; in that case policy changes last for the page session only.

The portal Draft PR targets `release/v2`, which contains the independently qualified V2 foundation from Draft PR #7. The feature branch merges that foundation without rewriting history and builds from a clean checkout. Neither Draft PR has been merged into `main`, which remains the Hugo production source.

## Owner review and next mission

From `v2/`, run `npm ci` if needed, then `npm run dev -- --hostname 0.0.0.0`. Open `http://localhost:3000/writing/ai-coding-agents-token-optimization/`. Inspect the diagrams at desktop and mobile widths, change all three policies, inspect the prompt, copy or download it, reload, reset, and follow the internal links to the pending handoff. For production output, run `npm run build` and preview `out/` with a local static server.

Next mission: implement and qualify the separate Codespaces execution repository and its four contracts, then validate the launch destination and real verification evidence before enabling the handoff link. Do not infer a PASS from this educational portal.
