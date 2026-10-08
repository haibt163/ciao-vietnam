# Ciao Vietnam — Phase 1 report

Date: 2026-10-07. Status: OWNER REVIEW GATE. Waiting.
Deployment: NOT DEPLOYED BY ENGINEER. No git commit. No git push.

Zip: `/workspace/artifacts/ciao-vietnam.zip` (project files only; no `node_modules`, no `.next`, no books).

## Checks that had to happen before the app (result)

1. Security: the installed Next 16.4.0 file `node_modules/next/dist/server/image-optimizer.js` contains the DNS-pin (`lookupAsSocketWould`, `pinnedLookup`, hostname mismatch error). That is the September 2026 image SSRF fix, present in this exact build. This app sets no `images.remotePatterns`, and `images.unoptimized` is true, so the optimizer is not used. Pin remains `next@16.4.0` exactly.
2. Node: Vercel docs (updated 2026-02-27) list 24.x (default), 22.x, and 20.x. `>=20.0.0` deploys as 24.x. This app sets `engines.node` to `22.x` (overrides the dashboard) and `.nvmrc` to `22`. Owner must still read the Vercel build log.
3. Images: Hobby docs (2026-08-11 / plan page 2026-09-14) include 5,000 image transformations, 300,000 cache reads, and 100,000 cache writes per month. Over the limit, new optimized images return HTTP 402 and show alt text. Risky for ~150 photos. Decision used: one pre-built WebP per photo, `images.unoptimized: true`. No AVIF. Heroes: Ha Long 39 KB, Hoan Kiem 179 KB (both under 200 KB).
4. Lighthouse 13.5.0 did run against the local production server and the sandbox headless Chrome, mobile throttling. Home: Performance 79, Accessibility 100, Best practices 100, SEO 100. LCP 5.4 s, CLS 0, TBT 100 ms. This is not a measurement on a real phone or on Vercel.

## What Phase 1 contains

- Phone shell, paper/charcoal themes, EN | VI without a flash of the other language, tap sound with mute remembered, search.
- Home (parallax hero, picks, reasons, when-to-go, region tiles) and a full Hanoi page.
- Other regions and Plan / Eat / Essentials / Outdoors / History: coming soon. Essentials links to photo credits. Credits page lists all 11 photos.
- Region name Southeast Coast, with the South Central Vietnam alias in search. Phu Quoc and Con Dao are on the Mekong page and searchable. Siem Reap is labelled Cambodia.

## Sandbox-confirmed

- `npm run typecheck`, `npm run lint`, and `npm run build` passed in `/workspace/ciao-vietnam`. Next.js 16.4.0. 20 static routes, including all 8 region slugs. No Cache Components.
- Playwright 24 screenshots: Home and Hanoi at 360, 390, and 430 px, light and dark, EN and VI. No horizontal overflow. No tap target under 44 px on buttons, tabs, or icon controls. No page errors in those runs.
- Vietnamese phone test (locale `vi-VN`, empty storage): `data-lang=vi` before hydration content is read, English hero string absent from visible text, Vietnamese hero present.
- Saved English wins over a Vietnamese browser language.
- Mute: click sets `data-sound=off` and `localStorage ciao-sound=off`, reload keeps it, further taps do not start audio. Unmute then tap starts one AudioContext.
- Reduced motion: the blinking cursor animation is `none`.
- Search: "phu quoc" → Mekong Delta; "south central" → Southeast Coast; "cambodia" → Siem Reap; "cà phê" → Hanoi, Central Highlands, Eat.

## Git-confirmed

None. The engineer did not commit or push.

## Conversation-confirmed

Owner / Chief Engineer approved Phase 1 on 2026-10-07: Next on Vercel, pages built at build time, no HTML-only export, no Cache Components, Southeast Coast name, Mekong islands, Angkor as Cambodia, browser language switch, no flash.

## Needs verification

- Vietnamese copy needs a native reader. The Vietnamese screen says so.
- How the site feels on a real phone after Vercel deploy (this sandbox is not that phone).
- Vercel build log actually printing Node 22.x.
- Lighthouse on the public URL. The 79 is only the sandbox run above.

## Deployment status

NOT DEPLOYED BY ENGINEER.

## Known issues

- Seven regions and four tabs are placeholders on purpose.
- 11 photos, not 15. All local WebP. Licenses are CC0 or CC BY only. Credits are on the photo and on `/credits`.
- St Joseph's Cathedral photo is cropped to the towers. A church banner remains on the building. The street and a license plate were cropped out.
- Opera House and French Quarter photos include ordinary street traffic. People are not the subject.
- No `/en` or `/vi` addresses yet. Content is `{en, vi}` so those addresses can be added later without rewriting the words.

## Next actions

Owner unzips, pushes to GitHub, imports on Vercel, and reports the preview link. Engineer stops at this gate.

## Confidence

- Build / lint / typecheck: high (commands exited 0 this session).
- Language flash, mute, search aliases, tap size, no sideways scroll: high (Playwright output saved in `phase1-qa.json`).
- Security pin inside Next 16.4.0: high for the DNS-pin code being present; the app also does not use remote image optimization.
- Lighthouse 79: high that the tool printed 79; low as a prediction of the public site.
- Native-quality Vietnamese: low. Marked for review.
