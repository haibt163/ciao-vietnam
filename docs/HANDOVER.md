# Ciao Vietnam — Handover

**As of 27 October 2026.** This is the current status summary; historical phase reports remain unchanged. Evidence labels follow `AGENTS.md` §8.

## 1. Where things stand

| Item | State |
|---|---|
| Repository | https://github.com/haibt163/ciao-vietnam (public) |
| Canonical `main` | **VERIFIED** at commit `52dcc740e238dc0eed98354016fb294c615f1981`; PR #14 merged on 20 October 2026. |
| Current product | **VERIFIED from repository files:** Home, eight region pages, Plan, Eat, Essentials, Outdoors, History, credits/search and English/Vietnamese. Round 5 put a photo, illustration or icon tile on every card, added image-first region tiles, banners and phrase tiles. |
| Local working copy | **Owner-reported:** `C:\Projects\ciao-vietnam` is in sync with the repository. This session did not inspect the Windows filesystem. |
| Guidebooks and license | **Owner decision (27 October 2026):** Lonely Planet Vietnam (16th ed.) and DK Eyewitness Vietnam ebooks are stored locally under `C:\Projects\Ebooks`, and the Owner confirms full licenses to use their images/artwork on the website. The source ebooks and private license records must remain outside Git. |
| Deployment | **UNVERIFIED** in this handover; no live-site check was performed for this documentation change. |
| Next phase | Guidebook-based media and description refresh. Not yet implemented by this handover. |

## 2. Project summary and boundaries

Mobile-first Vietnam travel guide, English/Vietnamese, static Next.js site deployed from GitHub to Vercel. No database, login, accounts or backend. Canonical stack and scripts are in `AGENTS.project.md`; merge authority is in `docs/ENGINEERING_GOVERNANCE.md`; workflow/report formats are in `docs/AI_ENGINEERING_WORKFLOW.md`.

For OMP, read `.omp/RULES.md` and `.omp/AGENTS.md` in addition to `AGENTS.md` and `AGENTS.project.md`.

## 3. Next phase — guidebook media and description refresh

The Project Owner has authorized a complete pass over the current visual assets and related descriptions, using the two locally licensed guidebooks as the reference source:

- Inventory and replace all current photo assets and current hand-drawn artwork/illustrations with suitable licensed guidebook imagery or artwork-based replacements, covering all current references rather than only heroes.
- Revise relevant English and Vietnamese descriptive copy and image alt text from the guidebook information. Write original wording; do not copy guidebook sentences.
- Record source book, edition, page/figure, creator/credit where known, license terms, and any required attribution for each used media asset. Update `docs/sources.md` and `docs/photo-selection.md` with new provenance and decisions.
- Preserve the current application structure, image IDs and references where practical. Inspect the existing scripts before using them; the current photo pipelines are designed around Pexels and other existing sources and may need careful adaptation.
- Keep `C:\Projects\Ebooks` outside the repository. Commit only the individual media assets selected for site use and the required resized/cropped WebP derivatives, not the ebook files, page facsimiles, or book-text extracts.
- Maintain the integrity checker, required image sizes, responsive `srcSet`, no-upscaling rule, bilingual alt text, and credits. Inspect affected pages at mobile and desktop sizes and run the checks in `package.json`.
- If an image cannot meet the current quality/readability bar, or an offline license cannot be represented truthfully in the credits schema, document the affected items and report the minimal proposed adjustment instead of inventing provenance or silently leaving them unchanged.

## 4. Existing verified history

The Round 5 review record in the earlier handover reported successful typecheck/lint and a build with a local Google Fonts limitation; it also reported selected pages rendered at 390 px with no page errors or broken images. Those are **historical Round 5 results**, not new checks run for this handover update.

For the Round 5 history, media decisions and Vietnamese review backlog, retain the original evidence in:
- `docs/PHASE-0-REPORT.md`
- `docs/PHASE-1-REPORT.md`
- `docs/editorial-image-audit-20261008.md`
- `docs/photo-selection.md`
- `docs/vi-review.md`

Do not rewrite those historical reports to imply that this next phase has started or that the live deployment has been checked.

## 5. Verification still needed

- Full inventory of `content/images.json`, `public/images/`, `public/art/` and all image/art references in content.
- Media and bilingual copy replacement from the two local ebooks.
- Source/license/credit metadata for every new asset.
- `npm run validate:images`, `npm run validate:content`, `npm run typecheck`, `npm run lint` and `npm run build`, plus mobile/desktop rendering checks.
- Native Vietnamese copy review.
- Live Vercel behavior and real-device checks remain **UNVERIFIED** unless explicitly tested.

## 6. Resume sequence

Read `AGENTS.md` → `AGENTS.project.md` → `docs/HANDOVER.md` → `docs/illustrations.md`, `docs/photo-selection.md`, and `docs/sources.md` → inspect current Git state and the relevant code. State actual GitHub/shell/filesystem capabilities before acting. Keep the change on a feature branch and open a PR for review; do not merge it.
