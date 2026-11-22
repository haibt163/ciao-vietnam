# Ciao Vietnam — Handover

**As of 22 November 2026.** Current status summary; historical reports remain
unchanged. Evidence labels follow `docs/ENGINEERING_GOVERNANCE.md` §6.

## 1. Current state

| Item | State |
|---|---|
| Repository | https://github.com/haibt163/ciao-vietnam (public), default branch `main` |
| Canonical `main` | **VERIFIED:** `10a852a` — merge of PR #18, "Media: upgrade landmark and signature dish photographs", 14 November 2026. Every `main` commit in `git log --first-parent` is a pull-request merge. |
| PR #18 | **VERIFIED:** merged 14 November 2026 14:56 UTC; head `media/instagram-worthy-picks`, base `main`; no GitHub reviews recorded (`reviews: []`). An Owner approval outside GitHub is **UNVERIFIED**. |
| Open pull requests | **VERIFIED:** none (`gh pr list --state open` returned `[]`, 22 November 2026). |
| Remote branches | **VERIFIED:** 17 merged branches remain. Three are not merged into `main`: `chore/nextjs-security-upgrade` (one commit ahead: Next.js 16.4.6 plus a HANDOVER edit; no PR), `media/food-art-to-photo` (two commits ahead; tree differs from `main`; superseded by PR #17 is likely but **UNVERIFIED**), and `media/instagram-worthy-picks` (tree identical to `main`; safe to delete). |
| Product | **VERIFIED from repository files:** Home, eight region pages, Plan, Eat, Essentials, Outdoors, History, search and credits, in English and Vietnamese. |
| Governance | **Owner decision (22 November 2026):** new harness-neutral standard in `docs/ENGINEERING_GOVERNANCE.md`. Any harness may be Main Engineer and may merge only after the Owner's approval on record; changes reach `main` by pull request from a sub-branch; Chief Engineer review is advisory; the Owner chooses two-lane or three-lane mode per task. |
| Media registry | **VERIFIED (22 November 2026):** `npm run validate:images` reports 125 referenced IDs, 130 registry entries and 640/960 assets present. `npm run validate:content` reports 186 guide cards, 124 image-bearing cards, 0 duplicate title groups, 0 duplicate summary groups and 0 reused image IDs. |
| GitHub branch protection | **VERIFIED:** none. `GET /repos/haibt163/ciao-vietnam/branches/main/protection` returns 404 "Branch not protected"; `GET /rulesets` returns `[]`. Direct pushes are technically possible; the pull-request rule is governance, not enforced by GitHub settings. |
| Deployment | **VERIFIED:** production at https://ciaovietnam.vercel.app returns HTTP 200 from Vercel (`X-Vercel-Cache: HIT`, cache age about 7.7 days at check, 22 November 2026). The deployed commit and whether the PR #18 preview was visually inspected are **UNVERIFIED**. |

## 2. Governance revision — 22 November 2026

- `docs/ENGINEERING_GOVERNANCE.md` is now the single source of truth: roles,
  two-lane/three-lane modes, the pull-request flow and the Owner approval gate.
  It contains no project-specific content.
- `docs/AI_ENGINEERING_WORKFLOW.md` was reduced to session flow and handoff
  formats; it points to the governance file instead of restating roles.
- `AGENTS.md`, `AGENTS.project.md`, `.omp/AGENTS.md` and `.omp/RULES.md` now use
  the same model. OMP is a Main Engineer harness and may merge only after the
  Owner's approval on record.
- The earlier statement that Codex Cloud was not an approved lane and the Grok
  sandbox-lane procedure were removed because the new standard assigns any
  harness the Main Engineer role. The Owner may restore a restriction explicitly.
- This revision is on branch `docs/governance-standard-2026-11` and is not merged.

## 3. Completed media passes

- **27 October 2026.** Both licensed guidebooks were read locally. 84 Lonely
  Planet photographs and 4 DK page crops replaced the scene artwork and five
  illustrated banners. 20 prior assets and 19 dish illustrations were retained
  where the books had no usable frame. Provenance and the owner-licensed label are
  recorded in `scripts/guidebook-media.json` and `content/images.json`.
- **14 November 2026, food pass.** All 19 dish SVGs and the 22 cards using them
  became photographs: 12 Wikimedia Commons and 10 Pexels. No book dish photo met
  the 2,400 px minimum, so none was upscaled. The SVG generator and `public/art/`
  were removed. `scripts/guidebook-media.mjs` supports `--food-only` and
  `--food-images`.
- **14 November 2026, second pass.** 15 image IDs across 15 cards and the Eat
  banner were replaced: 12 Pexels, 2 Wikimedia Commons and one owner-licensed
  Lonely Planet cao lau frame (1,068×712, final 960×640 without upscaling). The
  cao lau resolution exception and the supporting Mi Quang change are recorded in
  `docs/photo-selection.md`.
- Detail and per-asset credit remain in `docs/photo-selection.md`,
  `docs/sources.md` and `docs/illustrations.md`.

## 4. Verification

**Last product verification (14 November 2026, PR #18, recorded then; not rerun
for this docs branch):** `validate:images`, `validate:content`, `typecheck`,
`lint`, `build` (20/20 static pages) and a local browser pass at 390 px and
1280 px in English and Vietnamese. The build printed a Next.js security-upgrade
advisory and passed on retry.

**This docs-only branch (22 November 2026):**

| Check | Result |
|---|---|
| `npm run validate:images` | **VERIFIED:** `Image integrity OK: 125 referenced IDs; 130 registry entries; 640/960 assets present.` |
| `npm run validate:content` | **VERIFIED:** `Content audit: 186 guide cards, 124 image-bearing cards, 0 duplicate title groups, 0 duplicate summary groups, 0 reused image IDs.` |
| Markdown or link checker | **None configured.** `package.json` and `.github/workflows/` contain no Markdown lint or link check; ESLint does not cover `.md`. |
| `typecheck`, `lint`, `build`, browser pass | Not run: no application code, content JSON or assets changed. |

## 5. Risks and next steps

- **Next.js security advisory.** `main` pins Next.js 16.4.0. Branch
  `chore/nextjs-security-upgrade` upgrades to 16.4.6 but has no PR and also edits
  `docs/HANDOVER.md`; expect a conflict with this branch. Owner decision needed.
- **Branch protection is absent.** The governance rule that every change uses a
  pull request is not enforced by GitHub. Adding a ruleset is an Owner decision;
  no GitHub setting was changed here.
- **PR #18 approval record.** GitHub shows no review on PR #18. If the Owner
  approval exists only outside GitHub, that is acceptable under the new standard;
  record it on future pull requests.
- **Cao Lau book exception.** The Central cao lau card uses a 1,068×712 book
  frame, below the 2,400 px external-original bar. The 960×640 final is not
  upscaled; do not enlarge it.
- **DK source limit.** DK page rasters are 1,383×2,400; only four page-width
  subjects met the 960 px bar. Smaller DK photos were rejected, not upscaled.
- **Attribution and licence detail.** Some Pexels credits use published usernames.
  Owner-held book licences have no public URL; the credits UI shows text only. Do
  not invent a licence URL.
- **Native Vietnamese review** of revised strings remains **UNVERIFIED**.
- **Live checks.** Production responds, but real-device rendering, font loading
  and the deployed commit are **UNVERIFIED**.

## 6. Resume sequence

Read `docs/ENGINEERING_GOVERNANCE.md` → `AGENTS.md` → `AGENTS.project.md` → this
file → `docs/illustrations.md`, `docs/photo-selection.md`, `docs/sources.md` →
inspect live Git state and the relevant code. State actual GitHub, shell and
filesystem capabilities first. Work on a sub-branch, open a pull request, and
merge only after the Owner's approval is on record.
