# Ciao Vietnam — Handover

**As of 9 October 2026 (after visuals Round 5).** Written by Claude Chat acting as Main and Chief Engineer at the Project Owner's request (author = reviewer; the Project Owner approves and merges, noted as an override under governance §2). Evidence labels follow `AGENTS.md` §8. Update this file at the end of every phase.

## 1. Where things stand

| Item | State |
|---|---|
| Repository | https://github.com/haibt163/ciao-vietnam (public) |
| `main` | Phases 0–2B merged: Home, 8 regions, Plan, Eat, Essentials, Outdoors, History, credits, search, English/Vietnamese. Last merge seen: PR #11 (editorial and image audit). |
| This round | Branch `visuals-round-5`: every card now shows a photo, an original illustration or an icon tile; image-first region tiles; page banners; phrasebook tiles. Awaiting the Owner's review and merge. |
| Deployment | Vercel builds from GitHub. Not visible to the Chief Engineer: UNVERIFIED. |
| Lane history | Grok (sandbox) Phases 0–2A; ChatGPT Phase 2B and fixes; Claude Chat review and Round 5. |
| Guidebooks | Not in the repository and never to be committed (`.gitignore` blocks `*.pdf`, `*.epub`). Reference only. |

## 2. Product summary

Mobile-first Vietnam travel guide, "Lonely Planet 2.0 × Claude Code": image-first, keyword copy, English/Vietnamese, parallax and tap sound, no database or login, Next.js on Vercel. Stack and rules: `AGENTS.project.md`. Roles and review: `docs/ENGINEERING_GOVERNANCE.md`. Visual system: `docs/illustrations.md`.

## 3. Verified in Round 5 (review sandbox)

- `npm run typecheck`, `npx eslint .` clean; `next build` compiled and generated all pages. The sandbox cannot reach Google Fonts, so `app/layout.tsx` was stubbed locally for the build and restored before packaging: UNVERIFIED that the real font build passes here, but the file is byte-identical to `main`.
- Rendered in headless Chromium 153 at 390 px, DPR 2, with no page errors and no broken images: Home, Regions, Hanoi (English and Vietnamese), Mekong Delta, North Vietnam, Eat, Essentials (light and dark), Outdoors, History, Plan. Not rendered: the other regions (same template), Lighthouse (not run).
- Card visuals: 186 cards audited; 120 that lacked a good photo now have an illustration, food flat-lay or icon tile; no "photo needed" labels remain; 20 weak or unused photos removed (40 files).

## 4. Outstanding

1. **Real photographs** for the strongest places (priority order): Da Lat hero (Xuan Huong Lake is the weakest hero), Cu Chi, War Remnants Museum, Reunification Palace, Notre-Dame, Chau Doc, Angkor Thom gate, Danang, Cat Tien, Bun bo Hue, Hill markets, the Outdoors cards. The review sandbox could not reach Pexels, Unsplash or Wikimedia. Rules: `AGENTS.project.md` §8. To swap, set `image` on the card.
2. Vietnamese copy needs a native read (`docs/vi-review.md`); "Duyên hải Nam Trung Bộ" for Southeast Coast is UNVERIFIED. The footer notice in Vietnamese mode says so.
3. Phase 3 polish not started or not verified: extra sounds beyond the tap sound, Lighthouse on the live site, real-device checks, SEO/meta and social images.
4. Small content oddities: the Phu Quoc card kicker reads "Island. Still this chapter."; several regions have a thin Eat/Stay/Getting-there list.
5. `scripts/images.mjs` and `app/globals.css` exceed the 300-line target.

## 5. Phases

Phase 0 done. Phase 1 done. Phase 2A done. Phase 2B done (content merged). Visuals Round 5 awaiting merge. Phase 3 (polish, performance, SEO, final QA) not started.

## 6. Known environment limits

- Builds fetch Google Fonts; a sandbox without that access cannot run `next build` unchanged.
- The review sandbox has no access to photo sites, so photographs must be added by an engineer or the Owner with network access. It does have a headless Chromium (from the `@sparticuz/chromium` npm package) for screenshots.

## 7. How to resume

Read `AGENTS.md` → `AGENTS.project.md` → `docs/ENGINEERING_GOVERNANCE.md` → this file → `docs/illustrations.md`, `docs/photo-selection.md`, `docs/sources.md` → the relevant code. Verify important claims independently. State your capabilities first.
