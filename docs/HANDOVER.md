# Ciao Vietnam — Handover

**As of 8 October 2026.** Written by Claude Chat (Chief Engineer) from the public
repository, the Project Owner's reports, and Grok's reports. Evidence labels
follow `AGENTS.md` §8. Update this file at the end of every phase.

## 1. Where things stand

| Item | State |
|---|---|
| Repository | https://github.com/haibt163/ciao-vietnam (public) |
| `main` | Phase 1: Home and a full Hanoi page, plus docs housekeeping (commit `78018bf`) |
| PR #1 | Open (as last seen). Opened from branch `phase-2`; a duplicate of PR #2. Close it. |
| PR #2 | Open, from branch `phase-2`: Grok's Phase 2A (`c86bda3`) plus Round 3 (`a3d3ee0`). **REQUEST CORRECTION outstanding** (see §4). |
| Deployment | Vercel previews per branch. Chief Engineer has NOT seen a Vercel build result or the live site: UNVERIFIED. Owner reports the mobile preview works. |
| Lane history | Grok (sandbox, no Git) authored Phases 0–2A. Owner committed. Claude Chat reviewed. Next author: ChatGPT. |

## 2. Product summary

Mobile-first Vietnam travel guide, "Lonely Planet 2.0 × Claude Code": image-first,
keyword copy, English/Vietnamese, parallax and tap sound, no database or login,
Next.js on Vercel. Source guidebooks (Lonely Planet Vietnam 16th ed., DK Eyewitness
Vietnam) are reference only: no copied text, no extracted images.

Stack and rules: see `AGENTS.project.md`. Roles and review: see
`docs/ENGINEERING_GOVERNANCE.md`.

## 3. Done

VERIFIED by the Chief Engineer in a review sandbox on PR #2 (fonts stubbed locally
because that sandbox cannot reach Google Fonts; no browser, so nothing was
rendered):

- `next build` compiled and generated 20 static pages; `tsc --noEmit` printed no errors.
- 8 region pages built from data files through one shared `RegionView`.
- 44 photos exist in responsive sizes; no missing files; every license is on the
  allowed list with a license URL (CC0, public domain, CC BY 2.0/3.0/4.0, Pexels License).
- CSS-only page entrance (no `opacity:0` in server HTML), `app/error.tsx` and
  `app/global-error.tsx`, per-photo `focus` and `heroLayout`.
- `docs/sources.md` now records that LP files Ninh Binh in Central Vietnam, Vung Tau
  in Southeast Coast and Cat Tien in Central Highlands, and lists UNVERIFIED lines.

Reported by Grok, not independently verified: 24 screenshots at 360/390/430 px
(Phase 1), no language flash, mute persistence, Lighthouse 79/100/100/100 on Phase 1
in a sandbox (not a live or real-phone result).

Decisions already made:

- Region names: Hanoi, North Vietnam, Central Vietnam, **Southeast Coast** (search
  alias "South Central"), Central Highlands, Ho Chi Minh City, Mekong Delta
  (Phu Quoc and Con Dao are sections of that page), Siem Reap & Angkor (labelled
  Cambodia).
- Language: browser-based EN | VI switch, no `/en` `/vi` URLs now. Mandarin later.
- Next.js pinned at 16.4.0; Node 22.x for Vercel. Static build, Vercel does not
  resize images (`unoptimized`); photos are pre-sized WebP.
- Images: not from the guidebooks. CC BY-SA excluded for now (CC's FAQ is not clear
  that a crop is not an adaptation; see `docs/photo-selection.md`). NC/ND excluded.
- Review flow: feature branch → pull request → Claude Chat or ChatGPT verdict →
  Owner merges. Grok and chat lanes never run Git.

## 4. Outstanding on PR #2 (REQUEST CORRECTION)

1. **Historical reports deleted.** PR #2 removes `docs/PHASE-0-REPORT.md` and
   `docs/PHASE-1-REPORT.md` (they exist on `main`). Restore them unchanged.
2. **Stale text.** The "App" section at the end of `docs/photo-selection.md` still
   says images were not recropped and compression was not changed. It contradicts
   the Round 3 section above it and the code. Correct it, keeping the log history.
3. **Weak photos** (Chief Engineer's visual opinion from contact sheets of the files
   in the PR; the second set of card photos was not viewed):
   - Heroes: strong — Ha Long, Bayon, Saigon Central Post Office, Hoi An. Weak —
     **Hoan Kiem** (a shaded path in a landscape box, no iconic subject),
     **Ben Tre** (brown river, tugboat), **Mui Ne** (over-saturated, washed sky).
     Xuan Huong is acceptable at best.
   - Cards: many are grey, hazy or snapshot quality, for example Cat Tien, Chau Doc,
     Cu Chi, French Quarter, Ha Giang, Hai Van, Khai Dinh, Japanese bridge. Good: egg
     coffee, Ben Thanh, Banteay Srei, cathedral.
   - Grok could not search Unsplash (401) or Pexels (403) and kept most Commons
     files. Only four new photos were added in Round 3.
4. **Empty PR descriptions** on #1 and #2.
5. **Duplicate pull requests.** #1 and #2 both come from branch `phase-2`. Close #1; review #2.
6. **`scripts/images.mjs`** is 377 lines and hard-codes a Grok sandbox path for the
   originals; the originals are not in the repo. Make the path configurable
   (argument or environment variable) and say so in `docs/photo-selection.md`.
7. Minor: `app/globals.css` is 325 lines (target under 300).

## 5. Not started

- **Plan**: Itineraries, Vietnam Your Way, When to Go / A Year in Vietnam.
- **Eat**: The Food Scene, Food/Drink & Nightlife, coffee culture.
- **Essentials**: Arriving, Getting Around, Money, Accommodation, Family Travel,
  Health & Safe Travel, Responsible Travel, LGBTIQ+, Accessible Travel,
  Language/Phrasebook. Credits page already exists.
- **Outdoors** and **A Brief History** (short visual timeline).
- Sound beyond one tap sound; final accessibility and performance pass; real-device
  checks; native review of Vietnamese (`docs/vi-review.md`); thin regions (several
  have one Eat/Stay/Getting-there card); the UNVERIFIED lines in `docs/sources.md`.

These tabs currently show "Coming soon".

## 6. Phases

- Phase 0 — done (setup, checks, plan).
- Phase 1 — done and on `main`.
- Phase 2A — regions + pipeline: PR #2, corrections outstanding.
- Phase 2B — Plan, Eat, Essentials, Outdoors, History (not started).
- Phase 3 — polish: sounds, accessibility, performance, SEO/meta, final QA.

## 7. Known environment limits

- Builds fetch Google Fonts; a sandbox without that access cannot run `next build`.
- Grok's sandbox cannot reach Unsplash search or Pexels pages; Pexels image files
  download by known photo id.
- Grok did not find the guidebooks on disk even though they appear in its file
  panel. Chief Engineer verified place names against both books separately.
- Chief Engineer's sandbox has no browser; renders must be judged by the Owner or
  by an engineer with a headless browser.

## 8. How to resume

Read `AGENTS.md` → `AGENTS.project.md` → `docs/ENGINEERING_GOVERNANCE.md` → this
file → `docs/sources.md` and `docs/photo-selection.md` → the relevant code. Verify
important claims independently. State your capabilities first.
