import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const originals = "/workspace/artifacts/photo-originals";
const pub = path.join(root, "public", "images");
const imageFile = path.join(root, "content", "images.json");
const manifestFile = path.join(originals, "manifest.json");
if (!fs.existsSync(originals)) {
  console.log("Originals are not in this folder. public/images is already prepared. Nothing to do.");
  process.exit(0);
}
fs.mkdirSync(pub, { recursive: true });

const images = JSON.parse(fs.readFileSync(imageFile, "utf8"));
const manifest = fs.existsSync(manifestFile) ? JSON.parse(fs.readFileSync(manifestFile, "utf8")).manifest : [];
const byId = new Map(manifest.map((item) => [item.id, item]));

const heroes = new Set(["halong", "hoan-kiem"]);
for (const name of fs.readdirSync(path.join(root, "content", "regions"))) {
  const region = JSON.parse(fs.readFileSync(path.join(root, "content", "regions", name), "utf8"));
  heroes.add(region.hero);
}

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
  const webp = path.join(pub, `${id}.webp`);
  if (fs.existsSync(webp)) return webp;
  const sized = fs
    .readdirSync(pub)
    .filter((name) => name.startsWith(`${id}-`) && name.endsWith(".webp"))
    .sort();
  if (sized.length) return path.join(pub, sized[sized.length - 1]);
  return null;
}

const used = new Set(Object.keys(images));
for (const name of fs.readdirSync(path.join(root, "content", "regions"))) {
  const region = JSON.parse(fs.readFileSync(path.join(root, "content", "regions", name), "utf8"));
  if (region.hero) used.add(region.hero);
  for (const card of [...region.sights, ...region.eat, ...region.stay, ...region.gettingThere]) {
    if (card.image) used.add(card.image);
  }
}

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
  "saigon-post": ["Inside the Central Post Office, Ho Chi Minh City.", "Bên trong Bưu điện Thành phố."],
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
};

function altFor(id) {
  if (images[id]?.alt?.en && images[id]?.alt?.vi && !ALT[id]) return images[id].alt;
  if (ALT[id]) return { en: ALT[id][0], vi: ALT[id][1] };
  if (images[id]?.alt) return images[id].alt;
  for (const name of fs.readdirSync(path.join(root, "content", "regions"))) {
    const region = JSON.parse(fs.readFileSync(path.join(root, "content", "regions", name), "utf8"));
    const cards = [...region.sights, ...region.eat, ...region.stay, ...region.gettingThere];
    const card = cards.find((item) => item.image === id);
    if (card) {
      return {
        en: card.title.en,
        vi: card.title.vi,
      };
    }
  }
  return { en: id, vi: id };
}

async function encodeWidth(input, width, maxBytes) {
  const meta = await sharp(input).metadata();
  const target = Math.min(width, meta.width || width);
  let quality = maxBytes ? 68 : 72;
  let buffer = await sharp(input)
    .rotate()
    .resize({ width: target, withoutEnlargement: true })
    .webp({ quality })
    .toBuffer();
  while (maxBytes && buffer.length > maxBytes && quality > 42) {
    quality -= 6;
    buffer = await sharp(input)
      .rotate()
      .resize({ width: target, withoutEnlargement: true })
      .webp({ quality })
      .toBuffer();
  }
  const info = await sharp(buffer).metadata();
  return { buffer, width: info.width, height: info.height, bytes: buffer.length, quality };
}

const ids = [...used];
const report = [];

for (const id of ids) {
  const input = sourceFor(id);
  if (!input) {
    report.push({ id, missing: true });
    continue;
  }
  const made = [];
  for (const width of [480, 800, 1200]) {
    const maxBytes = width === 480 && heroes.has(id) ? 80 * 1024 : undefined;
    const encoded = await encodeWidth(input, width, maxBytes);
    if (made.some((item) => item.width === encoded.width)) continue;
    const filename = `${id}-${encoded.width}.webp`;
    fs.writeFileSync(path.join(pub, filename), encoded.buffer);
    made.push({ ...encoded, filename });
  }
  const largest = made[made.length - 1];
  const mid = made[Math.min(1, made.length - 1)];
  const meta = byId.get(id);
  const previous = images[id] || {};
  images[id] = {
    id,
    src: `/images/${mid.filename}`,
    srcSet: made.map((item) => `/images/${item.filename} ${item.width}w`).join(", "),
    width: largest.width,
    height: largest.height,
    alt: altFor(id),
    credit: cleanCredit(meta?.credit || previous.credit),
    license: meta?.license || previous.license,
    licenseUrl: meta?.licenseUrl || previous.licenseUrl,
    source: meta?.source || previous.source,
  };
  const hero480 = made.find((item) => item.width <= 480) || made[0];
  report.push({
    id,
    hero: heroes.has(id),
    w480: hero480.bytes,
    files: made.map((item) => `${item.width}:${item.bytes}`).join(" "),
  });
  const legacy = path.join(pub, `${id}.webp`);
  if (fs.existsSync(legacy)) fs.unlinkSync(legacy);
}

fs.writeFileSync(imageFile, `${JSON.stringify(images, null, 2)}\n`);
console.log(report.map((item) => `${item.missing ? "MISSING" : "OK"} ${item.id} ${item.files || ""} ${item.hero ? "hero480=" + item.w480 : ""}`).join("\n"));
