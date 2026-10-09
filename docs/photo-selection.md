# Photo selection

## Round 4 — autonomous photo replacement

Owner-approved autonomous selection by ChatGPT (Main Engineer). All selected photos below use the Pexels License, which is on the project's allowed list. Final originals are fetched by GitHub Actions so their actual dimensions can be checked before wiring; any source failing the 3000 px long-edge minimum is rejected rather than upscaled.

| id | photographer | source | reason |
|---|---|---|---|
| hoan-kiem | Hồng Quang Official | https://www.pexels.com/photo/turtle-tower-in-hoan-kiem-lake-hanoi-vietnam-33740950/ | Strong landmark hero; clear Turtle Tower; 6240×4160 reported by Pexels. |
| bentre | Yang Thanh | https://www.pexels.com/photo/view-of-people-getting-into-a-rowboat-for-a-mekong-delta-boat-ride-in-vietnam-18903675/ | Lush Ben Tre canal scene with boats and people; travel-oriented. |
| muine | Quang Nguyen Vinh | https://www.pexels.com/photo/palm-trees-and-stacked-boats-8259999/ | Sunny, sharp coastal scene; 6000×4000 reported by Pexels; avoids the current washed/saturated dune frame. |
| cattien | Thien Nhan | https://www.pexels.com/photo/exploring-roots-in-nam-cat-tien-forest-37006081/ | Direct Nam Cat Tien forest subject; natural outdoor texture. |
| chaudoc | HONG SON | https://www.pexels.com/photo/ancient-city-gate-surrounded-by-lush-trees-39944748/ | Exact Chau Doc location; 6144×8192 reported by Pexels; bright, clean architecture. |
| cuchi | manvinder social | https://www.pexels.com/photo/cu-chi-tunnels-entrance-in-ho-chi-minh-city-31832778/ | Exact Cu Chi subject; 5003×3335 reported by Pexels. |
| french | Q. Hưng Phạm | https://www.pexels.com/photo/colonial-architecture-in-hanoi-vietnam-28998626/ | Hanoi colonial architecture; 4096×4067 reported by Pexels. |
| hagiang | TUAN PHAN | https://www.pexels.com/photo/scenic-landscape-of-ha-giang-mountains-vietnam-34574527/ | Winding-road mountain scene; 4256×2832 reported by Pexels. |
| haivan | Nhà văn | https://www.pexels.com/photo/scenic-view-of-hai-van-pass-35211010/ | Morning mountain/ocean view; selected to replace the flatter existing pass image. |
| khai-dinh | Dương Nhân | https://www.pexels.com/photo/entrance-of-khai-dinh-tomb-18509403/ | Strong architectural entrance detail; cleaner than the current statue snapshot. |
| japan-bridge | Fernando B M | https://www.pexels.com/photo/japanese-covered-bridge-in-hoi-an-vietnam-29781428/ | Bright, clear Japanese Covered Bridge frame; good card composition. |

Rejections remain recorded in Round 3 and are not rewritten. No CC BY-SA, NC or ND source is introduced.

## Round 3

The four keepers are wired. CC BY-SA stays excluded.

ShareAlike was checked before any SA file was considered:

- FAQ, when a use is an adaptation: https://creativecommons.org/faq/#when-is-my-use-considered-an-adaptation
- FAQ, how to attribute, including a cropped photo: https://creativecommons.org/faq/#how-do-i-properly-attribute-material-offered-under-a-creative-commons-license
- CC BY-SA 4.0 deed: https://creativecommons.org/licenses/by-sa/4.0/deed.en

The FAQ says an adaptation is a modification with enough new creativity to be copyrightable (a translation, a screenplay), and that this depends on local law. It says you must say when you cropped a photo. It does not say a crop, a resize, or a format change is itself an adaptation. The deed says ShareAlike applies if you remix, transform, or build upon the material, and it does not mention cropping. That is not clear enough. No CC BY-SA photo is in the app. NC and ND stay out. No `shareAlike` flag was added.

Wired now: Pexels 36762641 (Ha Long hero, Alex Vo), Pexels 30738862 (Ha Long aerial card, Karolina), Pexels 34782073 (Sapa card, sephylmism, film edge cropped off), Trang An Commons Quality (Ninh Binh card, Jakub Hałun, CC BY 4.0). Hoi An night and the Temple of Literature hold were not used. There is no owner-photos folder.

Dropped: the Notre-Dame file with the Easter banner, and the Con Dao strip (too short to crop sharply). The Hoan Kiem file in the app is the shaded path, not the bank-sign frame. That bank-sign photo was not added.

## Round 2 log

The two guidebooks were not in this sandbox when this log was written, so the shot briefs below are mine. They are not copied from a page. Round 3 superseded the "not wired" line: the four keepers are in the app. The rest of this log is unchanged.

## Image preparation usage

scripts/images.mjs looks for the original photo folder in this order:

1. --originals <folder> command-line argument.
2. CIAO_PHOTO_ORIGINALS environment variable.
3. owner-photos at the repository root.

Example in PowerShell:

node scripts/images.mjs --originals "D:\ciao-vietnam\owner-photos"

The folder may contain the original JPGs and an optional manifest.json. If the resolved folder does not exist, the script exits cleanly without changing public/images.

## What was reachable


Unsplash search and download pages returned HTTP 401 (a bot wall). A known `images.unsplash.com` file URL did download, but photo ids could not be looked up.

Pexels HTML pages returned HTTP 403. `images.pexels.com` did download when a photo id was already known. License for those files is the Pexels License: https://www.pexels.com/license/

These Commons categories exist (checked 8 Oct 2026):

- https://commons.wikimedia.org/wiki/Category:Featured_pictures_of_Vietnam (15 files)
- https://commons.wikimedia.org/wiki/Category:Quality_images_of_Vietnam (70 files)
- https://commons.wikimedia.org/wiki/Category:Featured_pictures_of_Ho_Chi_Minh_City (3 files)
- https://commons.wikimedia.org/wiki/Category:Quality_images_of_architecture_in_Vietnam (26 files)

Most of the landmark files in those categories are CC BY-SA. This guide does not use SA, NC, or ND. They were not shortlisted.

## Shot briefs

- Ha Long: limestone towers out of emerald water, from the boat or from above, hard clear light, no cruise-ship names, no grey haze.
- Sapa: rice steps in a valley, green or gold, blue sky or clean light, houses small.
- Ninh Binh: a small boat among green karst, daylight, water in front.
- Hoi An: the river and the old yellow houses. Lantern light is allowed if the file is sharp.
- Temple of Literature: the stone gate, head on, trees, daylight, people small.
- Hoan Kiem: Turtle Tower or the red bridge, morning, no bank logos.

## Looked at

| id | source | license | size | decision |
|---|---|---|---|---|
| halong-emerald | Pexels 36762641, Alex Vo | Pexels License | 3024×4032 | CHOSEN for the north hero. Clear blue, emerald water, portrait, sharp enough. |
| halong-b | Pexels 30738862, Karolina | Pexels License | 4500×3000 | KEEP as a wide alternate. Aerial, sharp. Far islands are slightly cool. |
| halong-a | Pexels 36164068, Yagyaansh Khaneja | Pexels License | 4608×2450 | REJECT. Grey haze. This is the look Owner called horrible. |
| halong-c | Pexels 34635615, Ama Journey | Pexels License | 3602×2421 | REJECT. Washed sky and a white film rebate. Floating houses are clutter. |
| halong-titov | Commons, Titov Island view | CC BY 4.0 | 5616×3749 | REJECT. Grey sky. Readable “Ambassador Cruise” on the ship. |
| halong-baichay | Commons, Bai Chay beach | CC BY 4.0 | 5683×3794 | REJECT. Flat grey overcast. The bay is a faint line. |
| halong sunset | Pexels 35758326 | Pexels License | 2113×2814 | REJECT. Under 2400 px. |
| catba-island | Commons QI, Cat Ba | CC BY 4.0 | 4655×3107 | REJECT. Clutter, laundry, a readable brand panel. |
| sapa-a | Pexels 34782073 | Pexels License | 3602×2421 | CHOSEN if the white film edge is cropped off. Blue sky, green steps. |
| sapa-cc | Commons QI, Sa Pa road | CC BY 4.0 | 5539×3697 | REJECT. Rain, grey, rubbish on the verge. |
| trangan | Commons QI, Trang An 20240202 1447 | CC BY 4.0 | 4554×3040 | CHOSEN for Ninh Binh. Daylight, green karst, boats small. |
| hoankiem-a | Pexels 29933769, Toàn Văn | Pexels License | 6240×4160 | REJECT. Hazy, and a readable BIDV sign on the tower. |
| temple-a | Pexels 11495796 | Pexels License | 4928×3264 | HOLD. It is the right gate and it is sharp, but the sky is flat and people stand in the court. |
| temple-b | Pexels 29862154 | Pexels License | 5239×3493 | REJECT. Wrong place. The sign reads Đền thờ Tổ nghề, not Văn Miếu. |
| temple Bien Hoa | Pexels 18248511 | Pexels License | 5521×3681 | REJECT. That gate is in Biên Hòa, not Hanoi. |
| hoian-a | Pexels 33501215, Vietnam Hidden Light | Pexels License | 6048×8064 | CHOSEN for Hoi An, with a flag: it is night, not daylight. Sharp, rich, the river and the old roofs. |
| angkor-a | Pexels 11844578, Alan Wang | Pexels License | 4500×3000 | REJECT. Soft, vignetted, algae in the pool. Right subject, not sharp enough. |
| Hue citadel, Thien Mu, Minh Mang, Phong Nha FP, Hai Van QI, Independence Palace QI, Ha Long Ti Top QI, Da Nang river FP | Commons Featured or Quality | CC BY-SA | large | NOT USED. Round 3 kept ShareAlike out because the crop rule is not clear. |

## Not chosen yet

No frame on this list is good enough for Hoan Kiem, the Opera House, One Pillar, the cathedral, the French Quarter, egg coffee, Long Bien, Ha Giang, Mai Chau, Cat Ba, Hue, the tombs, the Japanese bridge, Phong Nha, Danang, the Hai Van pass, Nha Trang, Po Nagar, Mui Ne, Quy Nhon, Son My, Vung Tau, Dalat, Kon Tum, Cat Tien, Buon Ma Thuot, the Saigon cathedral, the post office, Ben Thanh, the palace, Jade Emperor Pagoda, Cholon, Cu Chi, the Mekong, Phu Quoc, Con Dao, Bayon, Ta Prohm, or Angkor Wat.

Owner photos of those places would be welcome. I will not fill the gaps with grey snapshots.

## App

Round 2 state: `public/images` was not replaced, heroes were not recropped and compression settings were not changed. Round 3 changed this: heroes are now portrait-cropped from the originals with a focal point, and the WebP quality floors were raised (see `scripts/images.mjs`).


## Round 5 — autonomous Part B coverage

Owner approved autonomous photo selection for Part B on 8 October 2026. The goal is to eliminate the remaining region-card photo gaps while keeping the public image budget controlled. New sources are Pexels unless marked CC BY 2.0 from Wikimedia Commons.

| ID | Source / credit | Use |
|---|---|---|
| catba | Đạt Nguyễn · Pexels | Cat Ba |
| maichau | TUAN PHAN · Pexels | Mai Chau |
| hue | Lộc Nguyễn · Pexels | Hue |
| quynhon | Flint Huynh · Pexels | Quy Nhon |
| bmt-coffee | Nay Sa Muel · Pexels | Buon Ma Thuot / coffee |
| saigon-cathedral | Allan Henderson · CC BY 2.0 | Notre-Dame Cathedral |
| palace | Phát Trương · Pexels | Reunification Palace |
| cholon | Nick · CC BY 2.0 | Cholon |
| cantho | Duy Nguyen · Pexels | Can Tho |
| hatien | lhthoai · Pexels | Ha Tien |
| condao | Thắng-Nhật Trần · Pexels | Con Dao |
| angkorwat | gang liang · Pexels | Angkor Wat |
| pho-bowl | RDNE Stock project · Pexels | Pho |
| vietnam-coffee | Nguyen Huy · Pexels | Coffee |
| banhmi | Hậu Mai · Pexels | Banh mi |
| hoian-food | Võ Văn Tiến · Pexels | Hoi An food |
| bun-bo | JANG 'S 🍂 · Pexels | Central noodle dish |
| seafood-nhatrang | DUONG QUÁCH · Pexels | Coastal seafood |

All Pexels sources use the Pexels License. CC BY sources retain attribution and source URLs in `content/images.json`. Final dimensions and generated WebP sizes are checked by the Part B preparation workflow; no source is upscaled.

### Round 5 disposition

The Bun Bo candidate was rejected after the automated source-quality check measured only 2397 px on its long edge. It was not upscaled; the existing qualified `pho-bowl` image is reused for that card.

The original Wikimedia Commons Saigon Cathedral and Cholon candidates were replaced for this round because GitHub Actions was rate-limited by Wikimedia during automated download. The replacements are Pexels assets; the Cholon card uses a contextual Ho Chi Minh City street photograph and is labelled accordingly in `content/images.json`.

## Round 5 — photo refresh candidates (9 October 2026)

Prepared on `photo-refresh-20261009`; nothing is merged to `main`.
The branch workflow generates four labelled review sheets in `docs/photo-review/`
(`priority-1.jpg` through `priority-4.jpg`) and records downloaded source
dimensions in `docs/photo-review/source-dimensions.json`. New sources are
rejected if the original long edge is below 3000 px; no source is upscaled.
All new photos use the allowed Pexels License.

| slot | candidate | photographer | source | decision / reason |
|---:|---|---|---|---|
| 1 | Xuan Huong Lake | Markus Winkler | https://www.pexels.com/photo/landscape-photography-of-xuan-huong-lake-in-vietnam-5156620/ | Exact lake; inspect contrast in sheet. |
| 3 | War Remnants Museum helicopter | XT7 Core | https://www.pexels.com/photo/us-army-helicopter-in-war-remnants-museum-in-ho-chi-minh-city-vietnam-19927497/ | Outdoor aircraft instead of blank wall. |
| 4 | Notre-Dame Cathedral facade | Hom Nay Chup Gi | https://www.pexels.com/photo/nha-th-d-c-ba-sai-gon-sai-gon-vi-t-nam-2015-notre-dame-cathedral-of-saigon-saigon-vietnam-2015-28178556/ | Clear facade candidate. |
| 6 | Ho Chi Minh City metro train | Theodore Nguyen | https://www.pexels.com/photo/modern-metro-train-in-ho-chi-minh-city-station-30653681/ | **Owner check required:** metro, not Saigon railway station. |
| 12 | Angkor Thom South Gate | Julia Volk | https://www.pexels.com/photo/south-gate-of-angkor-thom-5769456/ | Gate/causeway; cyclist at a distance. |
| 13 | Dragon Bridge, Da Nang | Nimit N | https://www.pexels.com/photo/dragon-bridge-over-han-river-in-da-nang-32015496/ | Clear landmark replacement. |
| 14 | Cat Tien forest trees | Quang Nguyen Vinh | https://www.pexels.com/photo/tall-trees-with-big-roots-in-forest-5118547/ | No identifiable person; not a trail/wetland scene, inspect carefully. |
| 15 | Da Lat green hills | Tường Chopper | https://www.pexels.com/vi-vn/anh/phong-c-nh-xuan-h-ng-phong-c-nh-nong-thon-da-l-t-39974123/ | Landscape replacing off-subject portrait. |
| 20 | Tam Coc boat and karst | Yan Ho | https://www.pexels.com/photo/view-of-tam-coc-ninh-binh-vietnam-19757775/ | Pexels reports 4992×3328. |
| 21 | Sa Pa terraces | Duong Nguyen | https://www.pexels.com/photo/aerial-view-of-rice-terraces-in-sa-pa-vietnam-37724187/ | Workflow verifies original size. |
| 22 | Paradise Cave interior | Kishan Rahul Jose | https://www.pexels.com/photo/stairs-in-paradise-cave-in-vietnam-20748541/ | Workflow verifies original size. |
| 24 | Da Lat pine trail | Pew Nguyen | https://www.pexels.com/photo/serene-woodland-pathway-through-pine-forest-37253115/ | Direct trail subject. |
| 27 | Winding mountain road | chiến bá | https://www.pexels.com/photo/a-winding-road-in-the-mountains-with-a-car-driving-down-it-28315416/ | Plan banner. |
| 28 | Vietnamese food spread | Thanh Long Bùi | https://www.pexels.com/photo/vietnamese-traditional-food-spread-on-outdoor-table-30018451/ | Eat banner; Pexels reports 3120×2082. |
| 29 | Quiet lantern street | Markus Winkler | https://www.pexels.com/photo/empty-street-5167751/ | Essentials banner; no close-up faces. |
| 30 | Mountain terraces | Đạt Nguyễn | https://www.pexels.com/photo/scenic-terraced-rice-fields-in-lush-vietnamese-landscape-36240106/ | Outdoors banner, distinct from Ha Long hero. |
| 31 | Hue Imperial City gate | Cuong Nguyen Manh | https://www.pexels.com/photo/imperial-city-gate-at-hue-vietnam-under-clear-sky-34571815/ | History banner; Pexels reports 5184×3456. |

### Held / rejected

- **Slots 2, 5, 9, 10 and 11:** no better distinct, license-compatible source was verified. Current images remain; the Ha Tien alternative found was a dusk silhouette and failed the clear-light brief.
- **Slots 7 and 8:** removed the off-subject/low-quality airport photos. A suitable terminal/departures scene was not verified.
- **Slots 16–19:** placeholders remain. A Bac Ha result was rejected as a close portrait; generic stall imagery was not proof of bún bò Huế or xôi; no suitable Siem Reap old-town scene was verified.
- **Slot 23:** reuses the credited Hai Van Pass photo for the same subject. Slot 25 uses a previously unplaced Mekong-waterway photo, separate from the floating-market photo. Slot 26 uses the previously unplaced Cat Ba cove photo.
- Low-priority Po Nagar, Son My and the Hoi An hero were not changed.

These are review candidates, not a claim of final visual approval. Inspect the sheets and local mobile rendering before approving merge.

### Runtime source corrections — 9 October 2026

The first GitHub Actions preparation attempt rejected the initially listed Notre-Dame candidate because its downloaded original was 2923×1949, below the 3000 px minimum. It also returned HTTP 404 for the first Da Lat landscape source. Neither failed source was published to the registry or wired as a generated asset.

- **Slot 4 replacement candidate:** Theodore Nguyen, [Notre-Dame Cathedral Basilica of Saigon](https://www.pexels.com/photo/a-church-with-a-large-window-and-a-clock-27246475/). Pexels reports 4000×6000. The next runner pass independently checks the downloaded file's actual dimensions.
- **Slot 15 replacement candidate:** HONG SON, [Vietnam rice-field landscape](https://www.pexels.com/photo/scenic-landscape-of-rice-fields-in-vietnam-40061420/). This source is used as a broad highland route image; it is not described as Da Lat specifically.

The original Round 5 candidate table is retained as the pre-build selection record; these runtime corrections supersede those two choices for the active manifest.
