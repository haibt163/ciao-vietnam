# Illustrations and visuals

Every card shows one of three visuals. Photos are used where a good licensed photo exists; everything else uses original artwork made for this project.

| Visual | Where it comes from | Card field |
|---|---|---|
| Photo | `content/images.json`, files in `public/images` (licensed, credited on `/credits`) | `image: "<id>"` |
| Illustration (scene or food flat-lay) | generated SVG in `public/art/<id>.svg` | `art: "<id>"` |
| Icon tile | Lucide icon on a tinted tile (practical cards: stay, getting there, essentials) | `art: "icon:<LucideName>"` |
| Phrase tile | Vietnamese phrase in large type (phrasebook) | `art: "phrase"` |

Priority when a card has several: `image`, then `art`.

Page banners (Plan, Eat, Essentials, Outdoors, History) use `banner: "<scene id>"` at the top of the page JSON. Region heroes still use photos (`hero`).

## Adding or changing an illustration

- Sources live in `scripts/art/`: `lib.mjs` (shared shapes), `scenes.mjs` and `scenes2.mjs` (places), `food.mjs` (overhead food flat-lays).
- Run `node scripts/build-art.mjs` to rewrite `public/art/*.svg`. Add `--png` to also write previews to `/tmp/art-preview` for review.
- A scene function returns a complete 800x600 SVG string. Add it to the exported object, run the script, then point a card at its id.
- Keep the style: layered shapes, warm dusk palettes, subtle grain, no text, no logos, no real brands, no identifiable people.
- To use a photo instead of art on a card, set `image` on that card (and optionally remove `art`).

## Credits and licensed guidebook artwork

The generated SVGs currently in `public/art/` are original artwork made for Ciao
Vietnam. The Project Owner has since confirmed (27 October 2026) that licensed
photographs and illustrations from Lonely Planet Vietnam (16th ed.) and DK
Eyewitness Vietnam may also be used on the website within the license terms. The
next media pass may replace or redraw existing visuals using those references.

Do not label an image as original Ciao Vietnam artwork if it is reproduced from a
guidebook. Record the source book, edition, page/figure or image identifier, credit
and license information in the relevant asset metadata and documentation. Any
redrawn/adapted artwork must stay within the license's permitted uses. Keep the
source ebooks and private license records outside the repository.

Icons are from Lucide (ISC license). Photo and licensed-guidebook artwork credits
should be surfaced through the site's existing credits mechanism with accurate
license labels and links where a real URL exists.
