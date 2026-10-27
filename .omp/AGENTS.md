# OMP Agent Instructions — Ciao Vietnam

OMP is an implementation and investigation lane for this repository. These
instructions specialize the universal contract in `AGENTS.md`; project facts
are in `AGENTS.project.md`; short tripwires are in `.omp/RULES.md`.

## Operating boundary

- OMP may inspect, implement, test, commit to a feature branch, push and open a
  pull request when the current environment permits. OMP does not merge to
  `main`. A review and an approval are still required.
- Begin by stating actual GitHub, Git, shell, network and local-filesystem access.
  Do not claim the local Windows files were inspected unless a command actually
  inspected them.
- Read `AGENTS.md`, `AGENTS.project.md`, `docs/HANDOVER.md`, and current Git
  state before substantive work. Then read the relevant code/docs. Do not dump
  or re-read unrelated folders.
- Use a short plan with a check for each major step. Keep the diff scoped and
  report `VERIFIED`, `FAILED`, `UNVERIFIED` and `Owner decision` clearly.
- OMP skills are user-level/global; do not add skill directories to this repo.

## Technology and project facts

- Static, mobile-first Next.js App Router app; Node.js 22.x is pinned in
  `package.json` and `.nvmrc`.
- Typed content lives in `content/*.json` and `content/regions/*.json`.
  Image metadata is `content/images.json`; visual assets are in
  `public/images/` and `public/art/`.
- Existing visuals: cards use `image`, `art`, or icon/phrase tiles. Page banners
  and region heroes are mapped by the content JSON. Preserve those relationships.
- Canonical checks are defined in `package.json`: `npm run validate:images`,
  `npm run validate:content`, `npm run typecheck`, `npm run lint`, and
  `npm run build`. Use the exact scripts present in the checked-out branch.
- For Next.js code changes, read the matching guidance in
  `node_modules/next/dist/docs/` before editing; this installed version has
  breaking changes, as noted by the generated Next.js section in root
  `AGENTS.md`.

## Authorized upcoming task: guidebook-based media and descriptions

The Project Owner has directed a full pass replacing the current photographs and
existing drawn artwork using the two locally licensed guidebooks as the primary
reference. The Owner confirms full licenses for use of the books' images/artwork
on the website. The local files are reported at `C:\Projects\Ebooks`; inspect
that exact directory before assuming file names or formats, and report plainly
if it is not accessible in the current shell.

1. Inventory every current source photo, generated WebP derivative, SVG artwork,
   and content reference. Identify every card, hero, banner and other use; do not
   stop after replacing the most visible photos.
2. Read both ebooks as local reference material. Use their photos/illustrations
   where covered by the Owner-confirmed licenses, and use them to inform fresh
   descriptions. Do not copy guidebook sentences or publish full-page facsimiles.
3. Prefer extracting the individual embedded image at its native quality instead
   of screenshotting an entire book page. Record book title, edition, page/figure
   or image identifier, creator/credit where given, and license/attribution
   requirements for each asset used.
4. Replace the existing photo set and hand-drawn art set comprehensively. Preserve
   visual IDs and content links when practical, so unrelated route/component
   changes are avoided. Update `content/images.json`, `public/images/`,
   `public/art/`, associated `content/**/*.json`, and source/selection docs only
   as required by the actual findings.
5. Revise relevant EN/VI card descriptions, image alt text and other descriptive
   copy from book facts. Keep text original, brief and keyword-led. Do not
   introduce unverified practical prices, opening hours, distances, entry rules
   or other time-sensitive claims.
6. Follow the source license for any use, crop, resize, adaptation, attribution or
   redistribution. Do not invent credits, license names or URLs. If the current
   `licenseUrl` field/credits UI cannot truthfully represent an owner-held
   license without a public URL, make only the smallest accurate metadata/UI
   adjustment. Keep private agreements and the ebooks outside Git.
7. Preserve existing responsive sizes, no-upscaling, file-size, bilingual alt,
   and image-integrity requirements unless the source constraints make a specific
   exception unavoidable. If a source cannot meet the quality bar, record it and
   the impact rather than silently leaving the current asset or upscaling it.
8. Inspect existing scripts before using them. The image scripts and workflow may
   assume Pexels-based metadata; do not blindly run them on guidebook assets or
   allow a generator to delete the replacement assets. Adapt the simplest existing
   pipeline that safely supports the new sources.
9. Verify all asset references and metadata; run the image/content validators,
   typecheck, lint and build. Inspect affected pages at desktop and phone widths
   in EN and VI; report actual screenshots/output and any network/font limitation.
10. Update `docs/HANDOVER.md`, `docs/sources.md`, `docs/photo-selection.md`
    and `docs/illustrations.md` where new evidence warrants it. Preserve prior
    audit/phase reports as historical evidence.
11. Commit to a named feature branch and open a PR for Chief Engineer/Owner
    review. State author lane, reviewer lane, verification evidence, changed files,
    remaining risks and UNVERIFIED items. Never merge.

If the local books or a required license detail cannot be accessed, proceed with
the parts that are verifiable and report the precise blocker. Do not fabricate
book content or license metadata.
