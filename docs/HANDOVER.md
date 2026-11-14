# Ciao Vietnam — Handover

**As of 14 November 2026.** This is the current status summary; historical phase
reports remain unchanged. Evidence labels follow `AGENTS.md` §8.

## 1. Where things stand

| Item | State |
|---|---|
| Repository | https://github.com/haibt163/ciao-vietnam (public) |
| Canonical `main` | **VERIFIED** at `679063a` (merge of PR #16, 27 October 2026). |
| Current product | **VERIFIED from repository files:** Home, eight region pages, Plan, Eat, Essentials, Outdoors, History, credits/search and English/Vietnamese. |
| Active work | **VERIFIED this session:** branch `media/food-art-to-photo`, based on `origin/main` at `679063a`, pushed and opened as PR #17. It replaces the 19 remaining food SVGs with 22 licensed photographs; it is not merged. |
| Guidebooks and license | **Owner decision (27 October 2026):** Lonely Planet Vietnam (16th ed.) and DK Eyewitness Vietnam are stored under `C:\Projects\Ebooks`; the Owner confirms full licenses to use their images/artwork on the website. The ebooks and private license records remain outside Git. |
| Media registry | **VERIFIED:** `content/images.json` has 130 entries — 108 from the 27 October pass plus 22 new food photographs. 124 cards use photos; no card uses a food SVG; no card-image id is reused. |
| Deployment | **VERIFIED (check):** Vercel preview deployment for PR #17 completed successfully. **UNVERIFIED:** the preview URL is behind Vercel SSO, so the live page was not visually inspected; no real-device check. |

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

## 4. Food photograph pass — 14 November 2026

- All 19 food flat-lay SVGs and the 22 cards that used them were replaced by
  photographs. `public/art/`, `scripts/build-art.mjs`, `scripts/art/food.mjs` and
  `scripts/art/lib.mjs` were removed; `components/visual.tsx` no longer renders SVG
  artwork. Icon and phrase tiles remain.
- Both books were re-checked before sourcing. Their dish photographs are about
  1,000–2,000 px on the long edge, below the 2,400 px minimum, so no book image was
  upscaled or substituted. All 22 replacements are externally licensed: 12
  Wikimedia Commons (CC0, public domain, CC BY 2.0/4.0) and 10 Pexels (Pexels
  License).
- 22 distinct ids; the three illustrations that had served two cards each were split
  into `food-bun-bo-hue`, `food-com-tam-saigon` and `food-night-snacks-siem-reap`.
  `scripts/food-media.json` records each source file, creator, licence, licence URL
  and page. `docs/photo-selection.md` holds the selection table.
- `scripts/guidebook-media.mjs` now accepts `--food-images` and `--food-only`; it
  builds the 640/960 WebPs from sources outside the repository and preserves the
  existing book entries.
- EN/VI alt text and credits were written for each photo. Two Pexels credits use the
  published username because no display name was shown. The artichoke-tea photo
  contains readable product packaging; it is the only verified photo of the actual
  tea under an allowed licence.

## 5. Existing verified history

Retain the original evidence in:

- `docs/PHASE-0-REPORT.md`
- `docs/PHASE-1-REPORT.md`
- `docs/editorial-image-audit-20261008.md`
- `docs/photo-selection.md` (Round 2–5 sections)
- `docs/vi-review.md`

Do not rewrite those historical reports to imply that later passes happened earlier.

## 6. Verification for this branch

Run from `C:\Projects\ciao-vietnam`:

| Check | Result |
|---|---|
| `npm run validate:images` | **VERIFIED:** `Image integrity OK: 125 referenced IDs; 130 registry entries; 640/960 assets present.` |
| `npm run validate:content` | **VERIFIED:** 186 cards, 124 image-bearing cards, 0 duplicate titles, 0 duplicate summaries, 0 reused image IDs. |
| `npm run typecheck` | **VERIFIED:** no errors. |
| `npm run lint` | **VERIFIED:** no warnings or errors. |
| `npm run build` | **VERIFIED:** compiled, TypeScript passed, 20/20 static pages generated. The installed Next.js prints a security-upgrade advisory; the first attempt exits with `SecurityFatalError` and the same command passes on retry. See §7. |
| Browser pass | **VERIFIED locally:** Eat, Central Highlands, Central Vietnam, Ho Chi Minh City, Mekong Delta, North Vietnam, Siem Reap & Angkor and Southeast Coast checked at 390 px and 1280 px in EN and VI; `/credits` checked too. Zero broken images (`naturalWidth === 0`), no horizontal scroll, language attribute switched correctly. Screenshots were inspected but are not committed. The Vercel preview URL redirects to Vercel SSO, so the deployed page was not visually checked. |
| Google Fonts | Build succeeded in this environment; deployment remains **UNVERIFIED**. |
| Native Vietnamese review | **UNVERIFIED:** the new/revised VI strings have not been checked by a native reader. |

## 7. Remaining risks and next steps

- **Next.js security advisory.** The installed Next.js version is flagged by the
  build-time advisory. An upgrade is recommended as a separate, scoped change.
- **DK source limit.** DK photos baked into page rasters below page width were
  rejected; only four DK assets met the 960 px bar. Do not upscale the rest.
- **No food illustrations remain.** Every card now uses a photo, icon tile or phrase
  tile. The 22 food photos are listed in `docs/photo-selection.md`; replace a photo
  only if a licensed source meets the same subject and quality bar.
- **Commons renditions.** Derivatives for the 12 Commons photos were built from
  1,920 px Wikimedia renditions; the originals are larger (documented in
  `docs/photo-selection.md`). The final assets are 960 px without upscaling.
- **Attribution detail.** Two Pexels credits use the published username
  (`nguyendesigner`, `peterpham`). The artichoke-tea photo shows the product
  packaging. Neither introduces a price, hours or health claim.
- **Licence terms.** The Owner-confirmed book terms are not in the repository. The
  credits UI states the label and source but has no public licence URL; do not
  invent one.
- **Live checks.** The Vercel preview deployment check passed, but the preview URL
  is behind Vercel SSO; real-device rendering and font loading remain
  **UNVERIFIED**.
- Open the PR against `main`, request review, and do not merge from this lane.

## 8. Resume sequence

Read `AGENTS.md` → `AGENTS.project.md` → `docs/HANDOVER.md` →
`docs/illustrations.md`, `docs/photo-selection.md`, `docs/sources.md` → inspect Git
state and the relevant code. State actual GitHub/shell/filesystem capabilities
before acting. Keep changes on a feature branch and open a PR for review; do not
merge.
