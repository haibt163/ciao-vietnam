# Illustrations and visuals

Every card shows a photo, illustration, icon tile or phrase tile. Photographs come
from `content/images.json` and are credited on `/credits`; they are either licensed
guidebook images (27 October 2026 media pass) or retained prior-licensed photos.

| Visual | Where it comes from | Card field |
|---|---|---|
| Photo | `content/images.json`, files in `public/images` (credited on `/credits`) | `image: "<id>"` |
| Dish illustration | original generated SVG in `public/art/` | `art: "food-…"` |
| Icon tile | Lucide icon on a tinted tile (practical cards: stay, getting there, essentials) | `art: "icon:<LucideName>"` |
| Phrase tile | Vietnamese phrase in large type (phrasebook) | `art: "phrase"` |

Priority when a card has several: `image`, then `art`.

Page banners (Plan, Eat, Essentials, Outdoors, History) now use photo ids:
`banner: "<image id>"` at the top of the page JSON. Region heroes use photos
(`hero`) with a 4:5 or 4:3 crop. `components/guide-view.tsx` renders the banner with
the shared `Photo` component.

## Current art set

The 27 October 2026 pass replaced all scene illustrations and illustrated banners
with licensed guidebook photographs. What remains is 19 overhead dish flat-lays in
`public/art/`, used by 22 cards where the books do not provide a photo of the named
dish at the site's 960 px no-upscaling bar. The scene sources (`scenes.mjs`,
`scenes2.mjs`) were deleted.

## Adding or changing an illustration

- Sources live in `scripts/art/`: `lib.mjs` (shared shapes) and `food.mjs` (dish
  flat-lays).
- Run `node scripts/build-art.mjs` to rewrite `public/art/*.svg`. Add `--png` to
  also write previews to `/tmp/art-preview`. The script removes SVGs that are no
  longer exported, so keep every file it writes in use.
- A food function returns a complete 800x600 SVG string. Add it to the exported
  `foods` object, run the script, then point a card at its id.
- Keep the style: layered shapes, warm linen palette, no text, no logos, no real
  brands, no identifiable people.
- To use a photo instead of art on a card, set `image` and remove `art`.

## Credits

Dish illustrations in `public/art/` are original artwork made for Ciao Vietnam.
Do not label an image as original artwork if it is reproduced from a guidebook.
Guidebook photographs record book, edition, page/figure, image identifier, printed
credit and licence label in `content/images.json` and
`scripts/guidebook-media.json`. The credits page shows those fields; it renders a
link only when a real public licence or source URL exists.

Icons are from Lucide (ISC license).
