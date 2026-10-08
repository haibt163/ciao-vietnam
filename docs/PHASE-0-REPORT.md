# Ciao Vietnam — Phase 0 report

Date: 2026-10-07. Status: waiting for Owner approval before any app code.
Deployment: NOT DEPLOYED BY ENGINEER. No git commit. No zip yet.

This file is a tracking note for later sessions. The source books stay in `/workspace/artifacts` and must never be copied into the app zip or the GitHub repo.

## Sandbox-confirmed facts

- Internet works: npm registry, GitHub API, Unsplash, Pexels, Wikimedia Commons API.
- Node v22.23.3, npm 10.9.9. Disk about 46 GB free. Memory about 3.6 GB available. Node heap limit about 2 GB.
- Can install npm packages and small Python packages. Can build a `.zip` with Python (`zip` program itself is not installed; not needed).
- Headless browser: Playwright 1.63 opened the bundled Chromium headless shell and read a test page. Result: `PLAYWRIGHT_OK`.
- Lighthouse is not installed. Not run. Performance scores are UNVERIFIED.
- Can download licensed photos. Proven: one Wikimedia thumbnail (Hoan Kiem Lake, CC BY 4.0, 146 KB saved). Unsplash and Pexels both returned HTTP 200 for a tiny test image.
- This chat's built-in preview is a different app shell (Vite / TanStack), not Next.js. Ciao Vietnam will not appear in that preview. The real preview is Vercel after the Owner pushes.

## Next.js check

- Latest stable on npm: **16.4.0** (GitHub release published 2026-10-07, not a pre-release).
- `create-next-app@16.4.0 --help` was run. Node requirement for Next is `>=20.9.0`. This sandbox passes.
- Official static-export guide (docs marked 16.4.0): `output: 'export'` cannot use the default `next/image` optimizer, cookies, redirects, or server actions. Cache Components docs say static export does **not** support `use cache`.
- Official image docs: `images.unoptimized: true` is a real config key (since Next 12.3.0). The `Image` component also has an `unoptimized` prop.
- September 2026 Next.js security fixes shipped in **16.3.8**. 16.4.0 is a later release on the same major line. The 16.4 notes do not contain a line that says "includes those advisories". Inclusion is inferred from version order. Label: UNVERIFIED as an explicit statement. Pin `next@16.4.0` anyway. Do not configure `images.remotePatterns` (the image SSRF issue needs an allow-listed remote host; we will use local files only).
- GitHub issue #97464 (static-generation memory leak on huge sites) is **closed**. Our site is about 14 pages, not thousands. Not a blocker.
- No blocker found that stops a small static App Router site on Vercel.

## Books (structure only, no copied prose)

- Lonely Planet file metadata: title "Lonely Planet Vietnam", ISBN 9781837582174. The filename says 16th edition; the ISBN field itself does not say "16th".

## Remainder of this note

The rest of the original Phase 0 file was accidentally overwritten on 2026-10-07 while adding a pointer to Phase 1. The lines above are the original opening, copied back from the session read. The bullets below are reconstructed from that same session, not a byte-for-byte recovery.

- DK Eyewitness Vietnam PDF, 264 pages, was read for the outline only. Region list used for the guide: Hanoi, North Vietnam, Central Vietnam, Southeast Coast (DK also says South Central), Central Highlands, Ho Chi Minh City, Mekong Delta, plus The Outdoors and A Brief History. Siem Reap & Angkor Wat stays as an extra stop.
- Content shape decided: short `{en, vi}` strings, keyword copy, no pasted guidebook paragraphs. Prices and hours must say to verify locally.
- Image rules at the end of Phase 0: no photos from the books. Allowed later tightened by the Owner to CC0, public domain, CC BY, Unsplash, and Pexels. Not allowed: CC BY-SA, NC, ND.
- Phase 0 stopped for Owner approval. It did not build the app, did not commit, and did not deploy.

## Later note (Phase 1, same day)

Phase 1 was built after approval. See PHASE-1-REPORT.md. The in-chat preview now shows the built guide so it can be tried before Vercel. Deployment is still NOT DEPLOYED BY ENGINEER. No commit and no push. Lighthouse was still unverified at the end of Phase 0; Phase 1 ran it and recorded real numbers there.
