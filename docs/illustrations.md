# Illustrations and visuals

Every card shows a photograph, an icon tile or a phrase tile. Photographs come from
`content/images.json` and are credited on `/credits`. They are licensed guidebook
images (27 October 2026 media pass) or licensed external photographs (food pass,
November 2026).

| Visual | Where it comes from | Card field |
|---|---|---|
| Photo | `content/images.json`, files in `public/images` (credited on `/credits`) | `image: "<id>"` |
| Icon tile | Lucide icon on a tinted tile (practical cards: stay, getting there, essentials) | `art: "icon:<LucideName>"` |
| Phrase tile | Vietnamese phrase in large type (phrasebook) | `art: "phrase"` |

Priority when a card has several: `image`, then `art`.

Page banners (Plan, Eat, Essentials, Outdoors, History) use photo ids:
`banner: "<image id>"` at the top of the page JSON. Region heroes use photos
(`hero`) with a 4:5 or 4:3 crop. `components/guide-view.tsx` renders the banner with
the shared `Photo` component.

## Food illustrations retired — November 2026

The 27 October 2026 pass left 19 overhead dish flat-lays in `public/art/`, used by
22 cards. The November 2026 pass replaced every one with a licensed photograph.
The 19 SVGs, `scripts/build-art.mjs`, `scripts/art/food.mjs` and `scripts/art/lib.mjs`
were deleted, `public/art/` was removed, and `components/visual.tsx` no longer renders
SVG artwork. `docs/photo-selection.md` records each replacement source and licence.

Two cards now use a different visual id from the original illustration because the
same illustration had served two placements: `food-bun-bo` became `food-bun-bo-hue`
on Central Vietnam, `food-com-tam` became `food-com-tam-saigon` on Ho Chi Minh City,
and `food-night-snacks` became `food-night-snacks-siem-reap` on Siem Reap & Angkor.

No script recreates the retired food SVGs. The only image generator is
`scripts/guidebook-media.mjs`, fed by `scripts/guidebook-media.json` (books) and
`scripts/food-media.json` (external food photographs). Sources stay outside Git.

## Remaining visual tiles

- Icon tiles use Lucide icons (ISC licence) from `components/visual.tsx`.
- Phrase tiles render the Vietnamese phrase from the card facts.
- There are no scene or food illustrations left.

## Credits

External photographs record creator, licence, licence URL where one exists, and the
original page in `content/images.json`. Guidebook photographs record book, edition,
page/figure, image identifier, printed credit and licence label. The credits page
shows those fields; it renders a link only when a real public licence or source URL
exists.
