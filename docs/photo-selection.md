# Photo selection

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
