import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const imagesPath = path.join(root, "content", "images.json");

const sources = [
  { id:"catba", url:"https://www.pexels.com/photo/small-sandy-beach-with-people-in-narrow-rocky-tree-bay-in-cat-ba-in-vietnam-24701013/", kind:"pexels" },
  { id:"maichau", url:"https://www.pexels.com/fr-fr/photo/broderie-traditionnelle-hmong-a-mai-chau-vietnam-39998012/", kind:"pexels" },
  { id:"hue", url:"https://www.pexels.com/photo/majestic-hue-imperial-city-architecture-in-vietnam-33551604/", kind:"pexels" },
  { id:"quynhon", url:"https://www.pexels.com/photo/serene-beach-view-at-quy-nhon-vietnam-37920556/", kind:"pexels" },
  { id:"bmt-coffee", url:"https://www.pexels.com/photo/l-h-i-ca-phe-buon-ma-thu-t-2023-27777798/", kind:"pexels" },
  { id:"saigon-cathedral", url:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Saigon_Notre-Dame_Cathedral.jpg", kind:"commons" },
  { id:"palace", url:"https://www.pexels.com/photo/reunification-palace-in-ho-chi-minh-city-vietnam-37336177/", kind:"pexels" },
  { id:"cholon", url:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Cholon%2C_Ho_Chi_Minh_City_%2849057490021%29.png", kind:"commons" },
  { id:"cantho", url:"https://www.pexels.com/photo/c-i-r-ng-floating-market-aerial-view-in-c-n-th-32607908/", kind:"pexels" },
  { id:"hatien", url:"https://www.pexels.com/pt-br/foto/vista-panoramica-de-um-barco-de-pesca-no-oceano-com-uma-encosta-ao-fundo-38960936/", kind:"pexels" },
  { id:"condao", url:"https://www.pexels.com/photo/man-with-a-motorcycle-and-a-herd-of-cattle-on-a-seashore-road-con-dao-island-vietnam-17581863/", kind:"pexels" },
  { id:"angkorwat", url:"https://www.pexels.com/photo/angkor-wat-temple-complex-in-cambodia-37251675/", kind:"pexels" },
  { id:"pho-bowl", url:"https://www.pexels.com/photo/cooked-food-in-the-bowl-6646022/", kind:"pexels" },
  { id:"vietnam-coffee", url:"https://www.pexels.com/photo/vietnamese-coffee-with-condensed-milk-16496241/", kind:"pexels" },
  { id:"banhmi", url:"https://www.pexels.com/photo/vietnamese-banh-mi-sandwich-on-newspaper-32961649/", kind:"pexels" },
  { id:"hoian-food", url:"https://www.pexels.com/photo/street-food-vendor-in-h-i-an-vietnam-29374692/", kind:"pexels" },
  { id:"bun-bo", url:"https://www.pexels.com/photo/top-view-photo-of-ramen-soup-2591594/", kind:"pexels" },
  { id:"seafood-nhatrang", url:"https://www.pexels.com/photo/delicious-vietnamese-seafood-dish-on-ice-31302693/", kind:"pexels" }
];

const headers = { "user-agent":"ciao-vietnam-photo-prep/1.0" };

async function fetchBuffer(url) {
  const res = await fetch(url, { headers, redirect:"follow" });
  if (!res.ok) throw new Error("HTTP " + res.status + " for " + url);
  return Buffer.from(await res.arrayBuffer());
}

function ogImage(html) {
  const patterns = [
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i
  ];
  for (const re of patterns) {
    const match = html.match(re);
    if (match && match[1]) return match[1].replaceAll("&amp;", "&");
  }
  throw new Error("Pexels page did not expose an og:image URL");
}

const images = JSON.parse(await fs.readFile(imagesPath, "utf8"));
const generated = [];

for (const source of sources) {
  let original;
  if (source.kind === "pexels") {
    const pageRes = await fetch(source.url, { headers, redirect:"follow" });
    if (!pageRes.ok) throw new Error("Pexels page HTTP " + pageRes.status + ": " + source.url);
    original = await fetchBuffer(ogImage(await pageRes.text()));
  } else {
    original = await fetchBuffer(source.url);
  }

  const meta = await sharp(original).metadata();
  const width = meta.width || 0;
  const height = meta.height || 0;
  const longEdge = Math.max(width, height);
  if (longEdge < 3000) {
    throw new Error(source.id + ": source is only " + width + "x" + height + "; minimum 3000 px long edge");
  }

  const out640 = path.join(root, "public", "images", source.id + "-640.webp");
  const out960 = path.join(root, "public", "images", source.id + "-960.webp");
  await sharp(original).resize({ width:640, withoutEnlargement:true }).webp({ quality:82 }).toFile(out640);
  await sharp(original).resize({ width:960, withoutEnlargement:true }).webp({ quality:82 }).toFile(out960);

  const finalMeta = await sharp(out960).metadata();
  images[source.id].width = finalMeta.width;
  images[source.id].height = finalMeta.height;
  images[source.id].src = "/images/" + source.id + "-960.webp";
  images[source.id].srcSet = "/images/" + source.id + "-640.webp 640w, /images/" + source.id + "-960.webp 960w";
  generated.push({ id:source.id, width, height, longEdge });
}

await fs.writeFile(imagesPath, JSON.stringify(images, null, 2) + "\n");

const imageDir = path.join(root, "public", "images");
const all = await fs.readdir(imageDir);
let total = 0;
for (const name of all.filter(function (n) { return n.endsWith(".webp"); })) {
  total += (await fs.stat(path.join(imageDir, name))).size;
}
if (total >= 40 * 1024 * 1024) {
  throw new Error("image budget exceeded: " + (total / 1024 / 1024).toFixed(1) + " MB");
}

console.log(JSON.stringify({
  generated,
  webpBudgetMB:Number((total / 1024 / 1024).toFixed(1))
}, null, 2));
