# Ciao Vietnam — Editorial & Image Audit (2026-10-08)

## Scope

This audit covers the five global guide files and all eight regional guide files under `content/`.

The review was done against the merged `main` state after PR #10.

## Findings

The content problem was broader than missing image registry entries.

### Copy repetition

The pre-audit content had 15 exact duplicate English card-title groups, including:
- Bun cha
- Banh mi
- Bun bo Hue
- Bia hoi
- Iced coffee
- Egg coffee
- repeated destination names in the Stay sections

There was also an exact duplicate English summary in the Essentials phrasebook.

The global pages were functioning too much like abbreviated copies of the regional pages.

### Image repetition

Many card images were reused for multiple purposes. Examples included:
- `hanoi-old-quarter` reused for generic city transport, Hanoi accommodation, and a North Vietnam transport card.
- `hanoi-train` reused for general inter-region travel, Hanoi trains, the Sapa rail connection, and the Central Vietnam coastal train.
- `night-market-vietnam` used on Cambodian food and nightlife cards.
- `coffee-setup-hanoi` used for Dalat artichoke tea.
- `quynhon-beach` used to illustrate fresh fruit and iced drinks.
- `saigon-post` used for Tan Son Nhat airport.
- `one-pillar` used for the Ho Chi Minh Mausoleum.
- `hoan-kiem` used for the Hanoi Old Quarter.

Two registry entries were also duplicate source aliases: `banhmi` / `banh-mi-food`, and `quynhon` / `quynhon-beach`. The unused aliases were removed.

## Editorial changes

### Global pages

The global Eat page is now a food-culture guide rather than a second list of regional dishes.

The global Outdoors page is now about activity/trip shapes rather than repeating destination cards.

The global History page is deliberately text-led. Broad historical themes should not borrow a specific monument photo simply because it is available.

Essentials remains practical and image-light.

### Regional pages

Regional cards retain the stronger place-specific photography.

Stay cards were rewritten so they answer a lodging decision rather than repeating the sight/destination name and description.

Images were removed where the available asset was misleading. No unrelated photo was substituted merely to fill the slot.

Examples corrected:
- Hanoi Old Quarter now uses an actual Old Quarter street image.
- Tan Son Nhat now uses the Tan Son Nhat image.
- Hanoi West Lake, Ho Chi Minh Mausoleum, generic transport, Cambodian food, and several mismatched regional cards no longer display unrelated photos.
- Generic stay/transport cards are mostly text-led instead of forcing destination photos into them.

## Guardrails added

`scripts/check-content-repetition.mjs` now fails the build when guide cards contain:
- an exact duplicate English title;
- an exact duplicate English summary; or
- a reused image ID.

`package.json` runs this check before every build, alongside the existing image-integrity validator.

The intended editorial rule is:

> One card, one purpose, one appropriate image.

A missing photo is preferable to a misleading photo.

## Current target state

The editorial audit on the repair branch reaches:
- 0 duplicate card-title groups
- 0 duplicate card-summary groups
- 0 reused image IDs across guide cards
- no known purpose/image mismatch from the pre-audit defect list

Home-page picks are intentionally excluded from the repetition guard because those are curated entry points that link directly into the corresponding regional cards.

## Review boundary

This PR does not merge itself. Owner review is required before merging.
