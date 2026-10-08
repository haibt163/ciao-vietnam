import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const originalsFlag = process.argv.indexOf("--originals");
const originalsFromFlag = originalsFlag >= 0 ? process.argv[originalsFlag + 1] : undefined;

if (originalsFlag >= 0 && !originalsFromFlag) {
  console.error("Usage: node scripts/images.mjs --originals <folder>");
  process.exit(1);
}

const originals = path.resolve(
  originalsFromFlag || process.env.CIAO_PHOTO_ORIGINALS || path.join(root, "owner-photos"),
);
const pub = path.join(root, "public", "images");
const imageFile = path.join(root, "content", "images.json");
const manifestFile = path.join(originals, "manifest.json");

if (!fs.existsSync(originals)) {
  console.log("Originals are not in this folder. public/images is already prepared. Nothing to do.");
  process.exit(0);
}

fs.mkdirSync(pub, { recursive: true });

const previous = JSON.parse(fs.readFileSync(imageFile, "utf8"));
const manifest = fs.existsSync(manifestFile) ? JSON.parse(fs.readFileSync(manifestFile, "utf8")).manifest : [];
const byId = new Map(manifest.map((item) => [item.id, item]));

const HERO_WIDTHS = [640, 960, 1280];
const CARD_WIDTHS = [640, 960];
const HERO_QUALITY = 78;
const CARD_QUALITY = 78;
const CARD_QUALITY_FLOOR = 75;
const PORTRAIT_MIN = 960;
const LANDSCAPE_MIN = 900;

const OVERRIDE = {
  halong: {
    credit: "Alex Vo",
    license: "Pexels License",
    licenseUrl: "https://www.pexels.com/license/",
    source: "https://www.pexels.com/photo/scenic-boat-ride-in-halong-bay-vietnam-36762641/",
  },
  "halong-air": {
    credit: "Karolina",
    license: "Pexels License",
    licenseUrl: "https://www.pexels.com/license/",
    source: "https://www.pexels.com/photo/stunning-aerial-view-of-ha-long-bay-islands-in-vietnam-30738862/",
  },
  sapa: {
    credit: "sephylmism",
    license: "Pexels License",
    licenseUrl: "https://www.pexels.com/license/",
    source: "https://www.pexels.com/photo/scenic-view-of-sapa-rice-terraces-in-vietnam-34782073/",
  },
  ninhbinh: {
    credit: "Jakub Hałun",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    source:
      "https://commons.wikimedia.org/wiki/File:Trang_An_Landscape_Complex,_Ninh_Binh_Province,_Vietnam,_20240202_1447_5310.jpg",
  },
};

const CROP_FOCUS = {
  halong: "50% 58%",
  "hoan-kiem": "32% 50%",
  hoian: "40% 46%",
  muine: "50% 62%",
  xuanhuong: "28% 50%",
  bentre: "40% 42%",
  bayon: "58% 55%",
  "saigon-post": "50% 40%",
};

const ALT = {
  catba: ["Limestone and water around Cat Ba.", "Đá vôi và nước quanh Cát Bà."],
  ninhbinh: ["Boats among the karst at Ninh Binh.", "Thuyền giữa núi đá ở Ninh Bình."],
  maichau: ["Rice valley at Mai Chau.", "Thung lúa ở Mai Châu."],
  hue: ["A gate of the imperial city in Hue.", "Một cổng của kinh thành Huế."],
  phongnha: ["Boats outside the mouth of Phong Nha cave.", "Thuyền trước cửa hang Phong Nha."],
  hoian: ["The river through Hoi An old town.", "Sông chảy qua phố cổ Hội An."],
  "japan-bridge": ["The Japanese Covered Bridge in Hoi An.", "Chùa Cầu ở Hội An."],
  "khai-dinh": ["Mandarin statues at Khai Dinh's tomb.", "Tượng quan ở lăng Khải Định."],
  thienmu: ["Thien Mu Pagoda above the river in Hue.", "Chùa Thiên Mụ trên sông ở Huế."],
  danang: ["Marble Mountains near Danang.", "Ngũ Hành Sơn gần Đà Nẵng."],
  haivan: ["The coast seen from Hai Van pass.", "Bờ biển nhìn từ đèo Hải Vân."],
  "hon-chong": ["Rocks at Hon Chong, Nha Trang.", "Đá Hòn Chồng, Nha Trang."],
  nhatrang: ["The beach at Nha Trang.", "Bãi biển Nha Trang."],
  ponagar: ["The north tower at Po Nagar, Nha Trang.", "Tháp bắc ở Po Nagar, Nha Trang."],
  muine: ["A sand dune at Mui Ne.", "Đồi cát ở Mũi Né."],
  quynhon: ["The coast at Quy Nhon.", "Bờ biển Quy Nhơn."],
  sonmy: ["The memorial at Son My.", "Đài tưởng niệm Sơn Mỹ."],
  vungtau: ["The beach at Vung Tau.", "Bãi biển Vũng Tàu."],
  xuanhuong: ["Xuan Huong Lake in Dalat.", "Hồ Xuân Hương ở Đà Lạt."],
  "dalat-falls": ["Pongour Falls, near Dalat.", "Thác Pongour, gần Đà Lạt."],
  dalat: ["Hills around Dalat.", "Đồi quanh Đà Lạt."],
  buonmathuot: ["Coffee country around Buon Ma Thuot.", "Vùng cà phê quanh Buôn Ma Thuột."],
  kontum: ["The wooden church in Kon Tum.", "Nhà thờ gỗ ở Kon Tum."],
  cattien: ["Forest in Cat Tien National Park.", "Rừng ở Vườn quốc gia Cát Tiên."],
  "saigon-cathedral": ["Notre-Dame Cathedral in Ho Chi Minh City.", "Nhà thờ Đức Bà ở Thành phố Hồ Chí Minh."],
  "saigon-post": ["The Central Post Office in Ho Chi Minh City.", "Bưu điện Thành phố ở Thành phố Hồ Chí Minh."],
  palace: ["Reunification Palace in Ho Chi Minh City.", "Dinh Độc Lập ở Thành phố Hồ Chí Minh."],
  "ben-thanh": ["Ben Thanh Market in Ho Chi Minh City.", "Chợ Bến Thành ở Thành phố Hồ Chí Minh."],
  jade: ["The gate of the Jade Emperor Pagoda.", "Cổng chùa Ngọc Hoàng."],
  cuchi: ["A display at the Cu Chi tunnels.", "Một hiện vật ở địa đạo Củ Chi."],
  "cuchi-entry": ["The Cu Chi tunnel site.", "Khu địa đạo Củ Chi."],
  bentre: ["A barge on the river at Ben Tre.", "Ghe trên sông ở Bến Tre."],
  cairang: ["Boats at the floating market near Can Tho.", "Ghe ở chợ nổi gần Cần Thơ."],
  chaudoc: ["The delta seen from Sam Mountain, Chau Doc.", "Đồng bằng nhìn từ núi Sam, Châu Đốc."],
  hatien: ["Ha Tien, near the Cambodian edge of the delta.", "Hà Tiên, gần rìa Campuchia của đồng bằng."],
  phuquoc: ["A beach on Phu Quoc.", "Một bãi biển ở Phú Quốc."],
  "phuquoc-beach": ["Palm and sand on Phu Quoc.", "Dừa và cát ở Phú Quốc."],
  condao: ["The old prison wall on Con Dao.", "Tường nhà tù cũ ở Côn Đảo."],
  "angkor-gate": ["Faces on the south gate of Angkor Thom.", "Mặt đá ở cổng nam Angkor Thom."],
  bayon: ["Stone faces at Bayon.", "Mặt đá ở Bayon."],
  taprohm: ["Tree roots over the stone at Ta Prohm.", "Rễ cây trên đá ở Ta Prohm."],
  banteay: ["Carved stone at Banteay Srei.", "Đá chạm ở Banteay Srei."],
  angkorwat: ["The towers of Angkor Wat.", "Tháp Angkor Wat."],
  sapa: ["Rice terraces and houses near Sapa.", "Ruộng bậc thang và nhà gần Sa Pa."],
  hagiang: ["The road over Ma Pi Leng pass, Ha Giang.", "Đường qua đèo Mã Pí Lèng, Hà Giang."],
  halong: ["A boat under limestone towers in Ha Long Bay.", "Thuyền dưới tháp đá vôi ở vịnh Hạ Long."],
  "halong-air": ["Ha Long Bay from above.", "Vịnh Hạ Long nhìn từ trên cao."],
  "hoan-kiem": ["A shaded path beside Hoan Kiem Lake.", "Lối cây bên Hồ Hoàn Kiếm."],
  temple: ["The gate of the Temple of Literature.", "Cổng Văn Miếu."],
  "one-pillar": ["One Pillar Pagoda in Hanoi.", "Chùa Một Cột ở Hà Nội."],
  opera: ["The Opera House in Hanoi.", "Nhà hát Lớn ở Hà Nội."],
  cathedral: ["St Joseph's Cathedral in Hanoi.", "Nhà thờ Lớn ở Hà Nội."],
  "flag-tower": ["The flag tower in Hanoi.", "Cột cờ ở Hà Nội."],
  "long-bien": ["Long Bien Bridge in Hanoi.", "Cầu Long Biên ở Hà Nội."],
  french: ["A street in Hanoi's French Quarter.", "Một phố ở khu phố Pháp, Hà Nội."],
  "egg-coffee": ["A glass of egg coffee.", "Một ly cà phê trứng."],
  "tran-quoc": ["Tran Quoc Pagoda on West Lake.", "Chùa Trấn Quốc bên Hồ Tây."],
  "war-remnants": ["A building at the War Remnants Museum.", "Một ngôi nhà ở Bảo tàng Chứng tích Chiến tranh."],
};

function cleanCredit(value) {
  return String(value || "Wikimedia Commons")
    .replace(/<[^>]+>/g, " ")
    .replace(/\(\s*talk\s*\)/gi, " ")
    .replace(/\s+talk\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 140);
}

function sourceFor(id) {
  const jpg = path.join(originals, `${id}.jpg`);
  if (fs.existsSync(jpg)) return jpg;
  const files = fs
    .readdirSync(pub)
    .filter((name) => name.startsWith(`${id}-`) && name.endsWith(".webp"))
    .sort((a, b) => {
      const wa = Number((a.match(/-(\d+)\.webp$/) || [])[1] || 0);
      const wb = Number((b.match(/-(\d+)\.webp$/) || [])[1] || 0);
      return wb - wa;
    });
  if (files.length) return path.join(pub, files[0]);
  return null;
}

function collect() {
  const used = new Set();
  const heroes = new Set();
  const regionDir = path.join(root, "content", "regions");
  for (const name of fs.readdirSync(regionDir)) {
    const region = JSON.parse(fs.readFileSync(path.join(regionDir, name), "utf8"));
    if (region.hero) {
      heroes.add(region.hero);
      used.add(region.hero);
    }
    for (const card of [...region.sights, ...region.eat, ...region.stay, ...region.gettingThere]) {
      if (card.image) used.add(card.image);
    }
  }
  const home = JSON.parse(fs.readFileSync(path.join(root, "content", "home.json"), "utf8"));
  for (const pick of home.picks || []) {
    if (pick.image) used.add(pick.image);
  }
  return { used, heroes };
}

function parseFocus(focus) {
  const parts = String(focus || "50% 45%").trim().split(/\s+/);
  const num = (value, fallback) => {
    if (!value) return fallback;
    return value.endsWith("%") ? Number.parseFloat(value) / 100 : Number.parseFloat(value);
  };
  return [num(parts[0], 0.5), num(parts[1], 0.45)];
}

function cropBox(meta, ratio, focus) {
  const srcW = meta.width;
  const srcH = meta.height;
  let cropW;
  let cropH;
  if (srcW / srcH > ratio) {
    cropH = srcH;
    cropW = Math.round(srcH * ratio);
  } else {
    cropW = srcW;
    cropH = Math.round(srcW / ratio);
  }
  cropW = Math.max(1, Math.min(cropW, srcW));
  cropH = Math.max(1, Math.min(cropH, srcH));
  const [fx, fy] = parseFocus(focus);
  let left = Math.round(fx * srcW - cropW / 2);
  let top = Math.round(fy * srcH - cropH / 2);
  left = Math.max(0, Math.min(left, srcW - cropW));
  top = Math.max(0, Math.min(top, srcH - cropH));
  const objectX = Math.min(1, Math.max(0, (fx * srcW - left) / cropW));
  const objectY = Math.min(1, Math.max(0, (fy * srcH - top) / cropH));
  return {
    srcW,
    srcH,
    left,
    top,
    cropW,
    cropH,
    focus: `${Math.round(objectX * 100)}% ${Math.round(objectY * 100)}%`,
  };
}

async function trimPaperEdge(buffer) {
  const meta = await sharp(buffer).metadata();
  const left = Math.round(meta.width * 0.02);
  const top = Math.round(meta.height * 0.02);
  const width = meta.width - left - Math.round(meta.width * 0.028);
  const height = meta.height - top - Math.round(meta.height * 0.018);
  if (width < meta.width * 0.8 || height < meta.height * 0.8) return { buffer, trimmed: false };
  const next = await sharp(buffer).extract({ left, top, width, height }).toBuffer();
  return { buffer: next, trimmed: true };
}

function altFor(id) {
  const fresh = id === "halong" || id === "halong-air" || id === "sapa" || id === "ninhbinh" || id === "saigon-post";
  if (fresh && ALT[id]) return { en: ALT[id][0], vi: ALT[id][1] };
  if (previous[id]?.alt?.en) return previous[id].alt;
  if (ALT[id]) return { en: ALT[id][0], vi: ALT[id][1] };
  return { en: id, vi: id };
}

async function encodeWidth(buffer, width, quality, floor) {
  let q = quality;
  let out = await sharp(buffer).resize({ width, withoutEnlargement: true }).webp({ quality: q, effort: 4 }).toBuffer();
  if (floor && out.length > 280 * 1024 && q > floor) {
    q = floor;
    out = await sharp(buffer).resize({ width, withoutEnlargement: true }).webp({ quality: q, effort: 4 }).toBuffer();
  }
  const info = await sharp(out).metadata();
  return { buffer: out, width: info.width, height: info.height, bytes: out.length, quality: q };
}

const { used, heroes } = collect();
const images = {};
const report = [];
const failures = [];
const written = new Set();

for (const id of [...used].sort()) {
  const input = sourceFor(id);
  if (!input) {
    failures.push(`${id}: no source file`);
    continue;
  }
  let buffer = await sharp(input).rotate().toBuffer();
  let trimmed = false;
  if (id === "sapa") {
    const edge = await trimPaperEdge(buffer);
    buffer = edge.buffer;
    trimmed = edge.trimmed;
  }
  const meta = await sharp(buffer).metadata();
  const focus = CROP_FOCUS[id] || "50% 45%";
  let frame = { left: 0, top: 0, cropW: meta.width, cropH: meta.height, focus: "50% 50%" };
  let heroLayout;
  let widths = CARD_WIDTHS;
  let quality = CARD_QUALITY;
  let floor = CARD_QUALITY_FLOOR;
  let cropped = trimmed;

  if (heroes.has(id)) {
    const portrait = cropBox(meta, 4 / 5, focus);
    const landscape = cropBox(meta, 4 / 3, focus);
    if (portrait.cropW >= PORTRAIT_MIN) {
      frame = portrait;
      heroLayout = "portrait";
    } else if (landscape.cropW >= LANDSCAPE_MIN) {
      frame = landscape;
      heroLayout = "landscape";
    } else {
      failures.push(
        `${id}: too small for a sharp hero (${meta.width}x${meta.height}, 4:5 crop ${portrait.cropW}px, 4:3 crop ${landscape.cropW}px)`,
      );
      continue;
    }
    widths = HERO_WIDTHS;
    quality = HERO_QUALITY;
    floor = null;
    cropped = true;
  } else {
    const tall = meta.width >= meta.height ? meta.height : meta.width;
    const previewH = Math.round((meta.height / meta.width) * Math.min(640, meta.width));
    if (tall < 480 || previewH < 200) {
      failures.push(`${id}: card source too thin (${meta.width}x${meta.height})`);
      continue;
    }
  }

  if (frame.cropW !== meta.width || frame.cropH !== meta.height) {
    buffer = await sharp(buffer)
      .extract({ left: frame.left, top: frame.top, width: frame.cropW, height: frame.cropH })
      .toBuffer();
    cropped = true;
  }

  const made = [];
  for (const width of widths) {
    if (width > frame.cropW) continue;
    const encoded = await encodeWidth(buffer, width, quality, floor);
    if (encoded.width < width - 1) continue;
    if (made.some((item) => item.width === encoded.width)) continue;
    made.push(encoded);
  }
  if (!made.length) {
    failures.push(`${id}: no size could be written without upscaling`);
    continue;
  }

  for (const item of made) {
    const filename = `${id}-${item.width}.webp`;
    item.filename = filename;
    fs.writeFileSync(path.join(pub, filename), item.buffer);
    written.add(filename);
  }

  const largest = made[made.length - 1];
  const fallback = made.find((item) => item.width === 960) || largest;
  const metaCredit = byId.get(id);
  const prior = previous[id] || {};
  const fixed = OVERRIDE[id] || {};
  images[id] = {
    id,
    src: `/images/${fallback.filename}`,
    srcSet: made.map((item) => `/images/${item.filename} ${item.width}w`).join(", "),
    width: largest.width,
    height: largest.height,
    alt: altFor(id),
    credit: cleanCredit(fixed.credit || metaCredit?.credit || prior.credit),
    license: fixed.license || metaCredit?.license || prior.license,
    licenseUrl: fixed.licenseUrl || metaCredit?.licenseUrl || prior.licenseUrl,
    source: fixed.source || metaCredit?.source || prior.source,
    cropped,
  };
  if (heroes.has(id)) {
    images[id].focus = frame.focus;
    images[id].heroLayout = heroLayout;
  }
  const phone = made.find((item) => item.width === 960) || made[0];
  report.push(
    `${id} ${heroes.has(id) ? heroLayout : "card"} ${made.map((item) => `${item.width}:${item.bytes}q${item.quality}`).join(" ")} src=${meta.width}x${meta.height}`,
  );
  if (heroes.has(id) && phone.bytes > 220 * 1024) {
    report.push(`  note ${id} phone file ${phone.bytes} bytes (over 220 KB at quality ${phone.quality}; not crushed)`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

for (const name of fs.readdirSync(pub)) {
  if (name.endsWith(".webp") && !written.has(name)) fs.unlinkSync(path.join(pub, name));
}

fs.writeFileSync(imageFile, `${JSON.stringify(images, null, 2)}\n`);
const bytes = fs.readdirSync(pub).reduce((sum, name) => sum + fs.statSync(path.join(pub, name)).size, 0);
console.log(report.join("\n"));
console.log(`public/images ${(bytes / 1024 / 1024).toFixed(1)} MB, ${Object.keys(images).length} photos`);
if (bytes > 40 * 1024 * 1024) {
  console.error("public/images is over 40 MB");
  process.exit(1);
}
