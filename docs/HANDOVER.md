# Ciao Vietnam — Handover

**As of 27 October 2026.** This is the current status summary; historical phase
reports remain unchanged. Evidence labels follow `AGENTS.md` §8.

## 1. Where things stand

| Item | State |
|---|---|
| Repository | https://github.com/haibt163/ciao-vietnam (public) |
| Canonical `main` | **VERIFIED** at `7a9da23` (merge of PR #15). The media pass is on `chore/guidebook-media-refresh` and is not merged. |
| Current product | **VERIFIED from repository files:** Home, eight region pages, Plan, Eat, Essentials, Outdoors, History, credits/search and English/Vietnamese. The 27 October media pass replaced the photo set and scene artwork with licensed guidebook imagery and revised relevant EN/VI copy. |
| Local working copy | **VERIFIED this session:** `C:\Projects\ciao-vietnam`, branch `chore/guidebook-media-refresh`, built and previewed locally. |
| Guidebooks and license | **Owner decision (27 October 2026):** Lonely Planet Vietnam (16th ed.) and DK Eyewitness Vietnam are stored under `C:\Projects\Ebooks`; the Owner confirms full licenses to use their images/artwork on the website. The ebooks and private license records remain outside Git. |
| Media registry | **VERIFIED:** `content/images.json` has 108 entries — 84 Lonely Planet photographs, 4 DK Eyewitness page crops, 20 retained prior-licensed photos. 102 cards use photos; 22 cards use 19 original dish illustrations; no card-image id is reused. |
| Deployment | **UNVERIFIED:** no live Vercel or real-device check was performed for this branch. |
| Next phase | Chief Engineer/Owner review of the media PR, then a native Vietnamese copy review and a live deployment check. |

## 2. Project summary and boundaries

Mobile-first Vietnam travel guide, English/Vietnamese, static Next.js site deployed
from GitHub to Vercel. No database, login, accounts or backend. Canonical stack and
scripts are in `AGENTS.project.md`; merge authority is in
`docs/ENGINEERING_GOVERNANCE.md`; workflow/report formats are in
`docs/AI_ENGINEERING_WORKFLOW.md`.

For OMP, read `.omp/RULES.md` and `.omp/AGENTS.md` in addition to `AGENTS.md` and
`AGENTS.project.md`.

## 3. Completed media pass — 27 October 2026

- Both ebooks were read locally. Individual Lonely Planet images were extracted
  from the EPUB; DK photos were cropped from page-width photo areas of the flattened
  PDF pages. No full page, caption or book text is published.
- 29 scene SVGs and 5 illustrated banners were replaced by photographs. The five
  page banners now use photo ids and `components/guide-view.tsx` renders them with
  `Photo`.
- 20 prior assets and 19 dish illustrations were retained where the books do not
  provide that exact subject at the 960 px no-upscaling bar. The lists and reasons
  are in `docs/photo-selection.md` and `docs/sources.md`.
- Provenance is per asset in `scripts/guidebook-media.json` and
  `content/images.json`: book, edition, page, printed credit, an
  `Owner-licensed guidebook image` label and a text source line. The credits page
  now renders text instead of a link when no public licence/source URL exists.
- Legacy Pexels pipelines and candidate manifests were removed;
  `scripts/guidebook-media.mjs` is the only image generator. It needs extracted
  source folders outside the repository and exits cleanly without them.
- Relevant EN/VI summaries and all new alt text were written from book facts in
  original wording. Prices, hours, distances and entry rules remain omitted.

## 4. Existing verified history

Retain the original evidence in:

- `docs/PHASE-0-REPORT.md`
- `docs/PHASE-1-REPORT.md`
- `docs/editorial-image-audit-20261008.md`
- `docs/photo-selection.md` (Round 2–5 sections)
- `docs/vi-review.md`

Do not rewrite those historical reports to imply that later passes happened earlier.

## 5. Verification for this branch

Run from `C:\Projects\ciao-vietnam`:

| Check | Result |
|---|---|
| `npm run validate:images` | **VERIFIED:** `Image integrity OK: 103 referenced IDs; 108 registry entries; 640/960 assets present.` |
| `npm run validate:content` | **VERIFIED:** 186 cards, 102 image-bearing cards, 0 duplicate titles, 0 duplicate summaries, 0 reused image IDs. |
| `npm run typecheck` | **VERIFIED:** no errors. |
| `npm run lint` | **VERIFIED:** no warnings or errors. |
| `npm run build` | **VERIFIED:** compiled, TypeScript passed, 20/20 static pages generated. The installed Next.js prints a security-upgrade advisory; see §6. |
| Browser pass | **VERIFIED locally:** 16 routes returned no broken images (`naturalWidth === 0`); EN and VI checked at 390 px and desktop width; credits render guidebook text without fake links. Screenshots were inspected but are not committed. |
| Google Fonts | Build succeeded in this environment; deployment remains **UNVERIFIED**. |
| Native Vietnamese review | **UNVERIFIED:** new/revised VI strings have not been checked by a native reader. |

## 6. Remaining risks and next steps

- **Next.js security advisory.** The installed Next.js version is flagged by the
  build-time advisory. An upgrade is recommended as a separate, scoped change.
- **DK source limit.** DK photos baked into page rasters below page width were
  rejected; only four DK assets met the 960 px bar. Do not upscale the rest.
- **Retained assets.** Twenty prior photos and nineteen dish illustrations remain.
  They are listed with reasons; replace only if a licensed source meets the same
  quality and subject bar.
- **Licence terms.** The Owner-confirmed terms are not in the repository. The
  credits UI states the label and source but has no public licence URL; do not
  invent one.
- **Live checks.** Vercel preview, real-device rendering and font loading remain
  **UNVERIFIED**.
- Open the PR against `main`, request review, and do not merge from this lane.

## 7. Resume sequence

Read `AGENTS.md` → `AGENTS.project.md` → `docs/HANDOVER.md` →
`docs/illustrations.md`, `docs/photo-selection.md`, `docs/sources.md` → inspect Git
state and the relevant code. State actual GitHub/shell/filesystem capabilities
before acting. Keep changes on a feature branch and open a PR for review; do not
merge.
