# Sources

No sentences are copied from the guidebooks. Prices, opening hours, and distances are left out on purpose. Where a practical detail can change, the page says to verify it locally.

## Licensed guidebook imagery — Owner decision, 27 October 2026

The Project Owner confirms that full licenses have been obtained for use of
photographs and illustrations contained in Lonely Planet Vietnam (16th ed.) and
DK Eyewitness Vietnam on the public website. The source ebooks and private license
records remain outside the repository. For each asset actually used, record the
book, edition, printed/PDF page or figure where available, creator/credit, license
label, and any required attribution. This confirms permission to use covered
images/artwork; it does not permit copying guidebook prose. New descriptions are
to be original wording informed by the books.

This entry records the Owner's instruction. Any specific limitation stated in the
actual license still governs how an image is reproduced, cropped, adapted or
attributed. Historical content mappings below are not part of the media-pass
evidence.

### Media pass record — 27 October 2026

Both ebooks were read locally from `C:\Projects\Ebooks` as reference and image
sources. The ebooks and all page extracts remain outside Git.

- **Lonely Planet Vietnam, 16th edition (EPUB).** 84 site images come from the
  book's embedded photographs, pages 4–406. The site records the printed page,
  the book's own credit line (for example `trong nguyen/Shutterstock`) and the
  EPUB image identifier (`shutterstock_*.jpg` or a book-specific filename) in
  `scripts/guidebook-media.json`. Selected sources are at least 960 px wide so
  the 640/960 WebP set needs no upscaling.
- **DK Eyewitness Vietnam (PDF edition, 2021).** 4 images come from single-photo
  crops of page rasters: the Central Post Office hall (p. 68), the south gate of
  Angkor Thom (p. 224), the Bayon (p. 228) and boats on the Perfume River at Hue
  (p. 153). The PDF renders each page as a 1383×2400 flattened canvas, so a
  subject photo is only usable when it spans the page width. Smaller DK photos
  were rejected rather than upscaled. No full page, page furniture, caption or
  surrounding text is published; each crop excludes margins and design elements
  and is recorded with its page number.
- **Registry.** `content/images.json` has 108 entries: 102 are used by cards, plus
  region heroes and page banners. The manifest is
  `scripts/guidebook-media.json`; the rebuild command is documented in
  `docs/photo-selection.md`.
- **Attribution label.** The credits page shows the printed photographer/agency
  credit, the label `Owner-licensed guidebook image`, and a text-only source line
  (book, edition, page, image identifier). No public licence URL is invented for
  the owner-held licences, so the credits UI omits the link for these entries.
- **Retained prior assets (20).** These subjects had no guidebook image that met
  the 960 px no-upscaling bar: `banteay`, `banh-can-food`, `banh-mi-food`,
  `coconut-market`, `egg-coffee`, `flag-tower`, `french`, `haivan`, `hon-chong`,
  `jade`, `long-bien`, `long-bien-sunset`, `nha-trang-beach`, `opera`,
  `phin-coffee`, `pho-bowl`, `pho-hanoi`, `seafood-nhatrang`, `tran-quoc`,
  `hoi-an-food-stall`. Their existing Pexels/CC credits and files are unchanged
  and remain visible on `/credits`.
- **Retained dish illustrations (19).** Where the guidebooks offer no photograph
  of the named dish at the required width (for example bun bo, com tam, fish amok,
  hu tieu, sticky rice), the accurate original SVG flat-lay is kept instead of
  substituting a photo of a different dish.

### Food photograph pass — 14 November 2026

The 19 original dish illustrations and the 22 cards that used them were re-checked
against both books. The Lonely Planet EPUB dish photographs top out around
1,000–2,000 px on the long edge; the DK pages are 1,383×2,400 flattened rasters.
Neither source supplied the named dish at the 2,400 px minimum, so no guidebook
image was upscaled or substituted. Every replacement is an externally licensed
photograph: Wikimedia Commons (CC0, public domain, CC BY 2.0/4.0) or Pexels
(Pexels License). `scripts/food-media.json` records the local source filename,
creator, licence, licence URL and original page; `docs/photo-selection.md` lists
all 22 rows and the selection reasons.

- 22 cards now use 22 distinct photo ids. The three illustrations that had served
  two cards each were split into distinct ids: `food-bun-bo-hue`,
  `food-com-tam-saigon` and `food-night-snacks-siem-reap`.
- `content/images.json` now has 130 entries; 124 guide cards carry a photo.
- `public/art/` and the food illustration generator (`scripts/build-art.mjs`,
  `scripts/art/`) were removed. No page uses a scene or dish SVG.
- No guidebook text, page facsimile or caption is published. Alt text and card copy
  remain original wording.
- The Pexels and Commons pages were checked for the actual subject before selection.
  Two Pexels credits use the published username because no display name was shown.

### Instagram-worthy replacements — 14 November 2026 (second pass)

The Owner asked for stronger card photographs for the Ho Chi Minh Mausoleum, Long
Lien Bridge, pho, bun bo Hue, cao lau, com tam, banh mi and hu tieu. Fifteen image
ids changed across 15 cards (14 requested placements plus the supporting Mi Quang
card) and the Eat banner.

- **Pexels (12):** mausoleum, both Long Bien frames, three pho frames, both com tam
  plates, both banh mi frames, hu tieu and the supporting mi quang photo. All use the
  Pexels License with creator and page in `content/images.json`.
- **Wikimedia Commons (2):** the bun bo Hue bowl (Vinnie Cartabiano, CC BY 2.0) and
  the Eat cao lau bowl (Chainwit., CC BY 4.0).
- **Owner-licensed guidebook image (1):** the Lonely Planet p.12 cao lau bowl
  (balatran/Shutterstock) on the Central Vietnam cao lau card. The EPUB frame is
  1,068×712; the final 960×640 asset is not upscaled. Because that is below the
  2,400 px external-original bar, the exception and the separate Eat cao lau photo
  are recorded in `docs/photo-selection.md`.
- The previous `mausoleum-square` image was the Martyr's Monument, not the
  mausoleum. It is replaced. The previous `mi-quang` image was the book cao lau bowl;
  the Mi Quang card now uses a Pexels mi quang photo so the book bowl can serve the
  cao lau card without duplication.
- No CC BY-SA, NC or ND image is used. No guidebook text or page facsimile is
  published.
- `content/images.json` still has 130 entries; 124 cards carry a photo.

No guidebook sentences were copied. Card summaries and alt text are original
wording; the factual revisions are limited to stable geography, architecture and
food descriptions visible in or confirmed by the books. Practical details such as
prices, hours and distances are still omitted.

Historical note (earlier round; superseded by the media pass record above): Chapter placements below are the ones checked against Lonely Planet Vietnam (16th edition) and DK Eyewitness Vietnam. That round did not re-read the books. The sandbox file search found the DK PDF only (`/workspace/attachments/DK Eyewitness Vietnam (Travel Guide) (DK Eyewitness) (Z-Library).pdf`). DK's contents used here: Ho Chi Minh City, Mekong Delta and Southern Vietnam, South Central Vietnam, Central Vietnam, Hanoi, Northern Vietnam, excursion to Angkor. Lonely Planet chapters: Hanoi, Northern Vietnam, Central Vietnam, Southeast Coast, Central Highlands, Ho Chi Minh City, Mekong Delta, plus Siem Reap and Angkor.

## Hanoi

Lonely Planet Hanoi chapter. DK Hanoi chapter. Lakes, Old Quarter, Temple of Literature, One Pillar, mausoleum, French quarter, West Lake, street food.

## North Vietnam

Lonely Planet Northern Vietnam. DK Northern Vietnam. Ha Long, Cat Ba, Sapa, Ha Giang, Mai Chau, Ba Be.

Ninh Binh (Tam Coc / Trang An) stays on this page so a reader coming from Hanoi can still find it. That is a reader choice. Lonely Planet files Ninh Binh in Central Vietnam, not in Northern Vietnam. Do not read this page as a claim that both books put it in the north.

## Central Vietnam

Lonely Planet Central Vietnam. DK Central Vietnam. Hue citadel and tombs, Thien Mu, Hoi An, the Japanese bridge, Phong Nha, Danang, the Hai Van pass. Lonely Planet also files Ninh Binh in this chapter; the app still shows that card on the North page.

## Southeast Coast

Lonely Planet Southeast Coast. DK calls the same coast South Central Vietnam. Nha Trang, Po Nagar, Mui Ne, Quy Nhon. Son My is the memorial near Quang Ngai in that coastal chapter.

Vung Tau is in Lonely Planet's Southeast Coast chapter. Search still opens this page.

## Central Highlands

Lonely Planet Central Highlands: Dalat, Buon Ma Thuot, Kon Tum. The DK contents page used here does not show a separate highlands chapter.

Cat Tien is in Lonely Planet's Central Highlands chapter. It stays on this page.

## Ho Chi Minh City

Lonely Planet Ho Chi Minh City. DK Ho Chi Minh City. Cathedral and post office, Reunification Palace, Ben Thanh, Jade Emperor Pagoda, Cholon, War Remnants Museum, Cu Chi as a day trip.

## Mekong Delta

Lonely Planet Mekong Delta. DK Mekong Delta and Southern Vietnam. Can Tho, Cai Rang, Ben Tre, Chau Doc, Ha Tien. Phu Quoc and Con Dao stay in this chapter, as decided in Phase 1.

## Siem Reap and Angkor

DK excursion to Angkor. Lonely Planet includes Siem Reap and the temples of Angkor as the add-on outside Vietnam. The page says it is a separate country and to check entry rules. It does not state visa types or fees.

## Vietnamese place name

"Duyên hải Nam Trung Bộ" for Southeast Coast is UNVERIFIED and needs a native reader. See docs/vi-review.md.

## UNVERIFIED lines

These card titles are on the pages, but they were not found as guidebook text. The pages were not rewritten this round. Treat the practical claim in each one as UNVERIFIED:

- Noi Bai airport
- Tan Son Nhat airport
- Danang airport, and the line that the Cam Ranh airport is not in Nha Trang town
- The coastal train
- Highland coffee
- Beach seafood
- River fruit
- Northern pho
- Hill markets
- A Khmer meal
- Crossing into Cambodia
- Toward Sapa
- Reaching Dalat
- Sapa town or a village
- Mui Ne strip


## Part B content mapping

The Part B pages use original keyword-style writing. Regional themes are mapped to the same Lonely Planet (16th edition) and DK chapter placements already recorded above; no guidebook sentences are copied. Practical items that can change are intentionally generic and say to verify locally or before travel.

- Plan: routes are assembled from the existing regional chapters; they are original sequencing choices, not copied itineraries.
- Eat: food themes follow the existing Hanoi, Northern Vietnam, Central Vietnam, Southeast Coast, Central Highlands, Ho Chi Minh City and Mekong Delta chapter map.
- Essentials: general travel habits only. Entry, currency, health and other changing rules are not stated as fixed facts.
- Outdoors: karst, mountains, caves, coast, highlands, delta and islands use the same regional chapter map.
- History: broad keyword timeline only; place links point to existing region pages. No precise dates are introduced in this round.
- Angkor is retained as the separate Cambodia add-on described above.
