# Ciao Vietnam — Handover

**As of 8 October 2026 (after Phase 2A merged).** Written by Claude Chat (Chief
Engineer) from the public repository and the Project Owner's reports. Evidence
labels follow `AGENTS.md` §8. Update this file at the end of every phase.

## 1. Where things stand

| Item | State |
|---|---|
| Repository | https://github.com/haibt163/ciao-vietnam (public) |
| `main` | Phase 2A merged (Grok's work, PR #1/#2) plus masterfiles (PR #3), commit `eaf7b86` when this was written |
| Open branches | none needed; `phase-2` and `docs-masterfiles` are merged and can be deleted |
| Deployment | Vercel builds from GitHub. Chief Engineer has NOT seen a Vercel build result or the live site: UNVERIFIED. Owner reported the mobile preview works. |
| Lane history | Grok (sandbox, no Git) authored Phases 0–2A. Owner committed. Claude Chat reviewed and approved. Next author lane: ChatGPT. |
| Guidebooks | Lonely Planet Vietnam 16th ed. and DK Eyewitness Vietnam are NOT in the repository and must never be committed (`.gitignore` blocks `*.pdf` and `*.epub`). The Owner uploads them directly into an engineer's chat or sandbox. |

## 2. Product summary

Mobile-first Vietnam travel guide, "Lonely Planet 2.0 × Claude Code": image-first,
keyword copy, English/Vietnamese, parallax and tap sound, no database or login,
Next.js on Vercel. The guidebooks are reference only: no copied text, no extracted
images.

Stack and rules: `AGENTS.project.md`. Roles and review: `docs/ENGINEERING_GOVERNANCE.md`.

## 3. Done

VERIFIED by the Chief Engineer in a review sandbox (fonts stubbed because that
sandbox cannot reach Google Fonts; no browser, nothing rendered): `next build`
compiled and generated 20 static pages; `tsc --noEmit` printed no errors; 8 region
pages built from data files through one shared `RegionView`; 44 photos exist in
responsive sizes with no missing files; every license is on the allowed list with a
license URL; CSS-only page entrance; `app/error.tsx` and `app/global-error.tsx`;
historical `docs/PHASE-*` reports restored and byte-identical to the originals.

Reported by Grok, not independently verified: Phase 1 screenshots at 360/390/430 px,
no language flash, mute persistence, Phase 1 Lighthouse 79/100/100/100 (sandbox).

Decisions already made:

- Regions: Hanoi, North Vietnam, Central Vietnam, **Southeast Coast** (search alias
  "South Central"), Central Highlands, Ho Chi Minh City, Mekong Delta (Phu Quoc and
  Con Dao are sections of that page), Siem Reap & Angkor (labelled Cambodia).
- Language: browser-based EN | VI switch, no `/en` `/vi` URLs now; Mandarin later.
- Next.js 16.4.0 pinned, Node 22.x; static build; photos pre-sized WebP (Vercel does
  not resize).
- Images: not from the guidebooks; CC BY-SA, NC, ND excluded (see
  `docs/photo-selection.md`).
- Review flow: feature branch → pull request → Claude Chat or ChatGPT verdict →
  Owner merges. Sandbox and chat lanes never run Git; they deliver overlay ZIPs.

## 4. Outstanding (next work, in order)

1. **Weak photos** (Chief Engineer's visual opinion from contact sheets; the second
   set of card photos was not viewed):
   - Heroes — strong: Ha Long, Bayon, Saigon Central Post Office, Hoi An. Weak:
     **Hoan Kiem** (shaded path, no landmark, landscape box), **Ben Tre** (brown
     river, tugboat), **Mui Ne** (over-saturated, washed sky). Xuan Huong is
     acceptable at best.
   - Cards: many are grey, hazy or snapshot quality, for example Cat Tien, Chau Doc,
     Cu Chi, French Quarter, Ha Giang, Hai Van, Khai Dinh, Japanese bridge. Good:
     egg coffee, Ben Thanh, Banteay Srei, cathedral.
   - Grok could not search Unsplash (401) or Pexels (403) and kept most Commons
     files. Only four new photos were added in Round 3.
2. **`scripts/images.mjs`** (377 lines) hard-codes Grok's sandbox path for the
   originals, which are not in the repo. Make the path an argument or environment
   variable; keep the clean exit when originals are absent; document it.
3. `app/globals.css` is 325 lines (target under 300). Minor.
4. Native review of Vietnamese (`docs/vi-review.md`); "Duyên hải Nam Trung Bộ" for
   Southeast Coast is UNVERIFIED.
5. Thin regions (several have one Eat/Stay/Getting-there card) and the UNVERIFIED
   lines in `docs/sources.md`.

## 5. Not started

- **Plan**: Itineraries, Vietnam Your Way, When to Go / A Year in Vietnam.
- **Eat**: The Food Scene, Food/Drink & Nightlife, coffee culture.
- **Essentials**: Arriving, Getting Around, Money, Accommodation, Family Travel,
  Health & Safe Travel, Responsible Travel, LGBTIQ+, Accessible Travel,
  Language/Phrasebook. (The credits page already exists.)
- **Outdoors** and **A Brief History** (short visual timeline).
- Sound beyond one tap sound; final accessibility/performance pass; real-device
  checks. These tabs currently show "Coming soon".

## 6. Phases

- Phase 0 — done. Phase 1 — done. Phase 2A (regions, pipeline) — merged.
- Phase 2A follow-up — **A1 complete on branch `phase-2-photos`**: photo originals path is configurable and documented.
- Phase 2A follow-up — **A2 in progress**: Main Engineer (ChatGPT) now owns public-web photo selection. No replacement photo has been wired yet because the current sandbox cannot download binary originals.
- Phase 2B — Plan, Eat, Essentials, Outdoors, History (not started).
- Phase 3 — polish: sounds, accessibility, performance, SEO/meta, final QA.

## 7. Current follow-up evidence

- Git-confirmed on `phase-2-photos`: `scripts/images.mjs` accepts `--originals <folder>`, then `CIAO_PHOTO_ORIGINALS`, then repository-root `owner-photos`.
- Git-confirmed: `docs/photo-selection.md` documents the lookup order and PowerShell usage.
- Git-confirmed: selected originals were fetched on a GitHub Actions runner and 11 source files passed the 3000 px long-edge rule; generated image output was 12.0 MB.
- Git-confirmed: the same runner passed `npm run typecheck`, `npm run lint`, and `npm run build` (20 static pages generated).
- Git-confirmed: generated photo commit is `78382e443c6ec343bbe652e35def096a1bc14082`; the temporary preparation workflow removed itself after generation.
- Needs verification: live rendered appearance and 390 px light/dark EN/VI screenshots.

## 7. Photo follow-up — autonomous selection

- Owner decision: on 8 October 2026, the Project Owner authorized the Main Engineer (ChatGPT) to select and wire replacement photos autonomously from public web sources.
- Round 4 target set: Hoan Kiem, Ben Tre and Mui Ne heroes; Cat Tien, Chau Doc, Cu Chi, French Quarter, Ha Giang, Hai Van, Khai Dinh and Japanese Covered Bridge cards.
- Selection rule remains the project license and quality bar in AGENTS.project.md: Pexels License only here, original long edge at least 3000 px, sharp/clear, no watermarks or readable branding, no upscaling.
- Because this sandbox cannot download binary originals, a short-lived GitHub Actions runner will fetch and prepare the selected public originals on the feature branch.

## 7. Known environment limits

- Builds fetch Google Fonts; a sandbox without that access cannot run `next build`.
- Grok's sandbox could not reach Unsplash search or Pexels pages; Pexels image files
  download by known photo id.
- Grok did not find the guidebooks on disk even though they appeared in its file
  panel. The Chief Engineer verified place names against both books separately.
- Chief Engineer's sandbox has no browser; renders must be judged by the Owner or by
  an engineer with a headless browser.

## 8. How to resume

Read `AGENTS.md` → `AGENTS.project.md` → `docs/ENGINEERING_GOVERNANCE.md` → this
file → `docs/sources.md` and `docs/photo-selection.md` → the relevant code. Verify
important claims independently. State your capabilities first.


## Part B — regional coverage and core guide pages

Owner authorized autonomous continuation through end of Part B on 8 October 2026. Feature branch: `part-b-content-photos`.

Implementation target:
- every existing regional card receives an image reference;
- explicit `gap` photo placeholders are removed for the named locations;
- sparse Eat / Stay / Getting There sections gain additional original keyword-style cards;
- Plan, Eat, Essentials, Outdoors and History are data-driven from `content/*.json` using shared rendering;
- search and Vietnamese-review generation include the new guide content;
- no new dependencies or backend/auth/data layer.

Guidebook provenance remains the existing chapter map in `docs/sources.md`. Guidebook text is not copied. Volatile practical details stay generic and are marked for verification.

### Verification for this Part B branch

GitHub Actions will verify original-image dimensions, generated image budget, typecheck, lint, production build and basic server-rendered HTML checks before the branch is raised for owner review. Browser screenshots at 390 px in EN/VI and light/dark remain a separate visual check.

## Part B — regional coverage and core guide pages

Owner authorized autonomous continuation through end of Part B on 8 October 2026. Feature branch: `part-b-content-photos`.

### Implemented
- All 120 existing regional cards across 8 region pages now have a valid image reference; no regional `gap` placeholders remain.
- Regional Eat / Stay / Getting There sections were expanded where sparse, using short original bilingual cards.
- Plan, Eat, Essentials, Outdoors and History are data-driven through a shared guide renderer and `content/*.json`.
- Plan includes 4 original route shapes, Vietnam Your Way interest links, and a month-by-region compass.
- Eat includes Food Scene, Food/Drink & Nightlife, and Coffee culture.
- Essentials includes Arriving, Getting Around, Money, Accommodation, Family Travel, Health & Safe Travel, Responsible Travel, LGBTIQ+, Accessible Travel, and a 20-item phrasebook with simple pronunciation plus native-review flag.
- Search generation and Vietnamese review generation include the new guide content.
- No new package dependency or backend/auth layer was added.

### Verified Part B gate
GitHub Actions run 27 completed successfully:
- 17 new public photo sources generated as 34 responsive WebP assets.
- Every new source passed the 3000 px long-edge minimum.
- Combined WebP image set reported 15.0 MB, below the 40 MB budget.
- Regional photo coverage check passed for all 120 cards.
- Vietnamese review document regenerated.
- `npm run typecheck` passed.
- `npm run lint` passed.
- `npm run build` passed; Next generated all 20 static pages, including Plan, Eat and Essentials.
- Production server smoke test returned HTTP 200 for Plan, Eat, Essentials and Hanoi region.

### Review limits
- 390 px EN/VI light/dark browser screenshots are UNVERIFIED in this lane because a headless browser is not available.
- Live deployment status is UNVERIFIED here.
- The two HCMC replacement photos use Pexels; the Cholon image is explicitly marked as a contextual HCMC street image rather than a landmark-specific Cholon photograph.
- The guide copy is original keyword-style writing and follows the existing guidebook chapter map in `docs/sources.md`; no guidebook sentences were copied.
