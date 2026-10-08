import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const imagesPath = path.join(root, "content", "images.json");

const sources = [
  { id:"catba", url:"https://images.pexels.com/photos/24701013/pexels-photo-24701013.jpeg", kind:"pexels" },
  { id:"maichau", url:"https://images.pexels.com/photos/39998012/pexels-photo-39998012.jpeg", kind:"pexels" },
  { id:"hue", url:"https://images.pexels.com/photos/33551604/pexels-photo-33551604.jpeg", kind:"pexels" },
  { id:"quynhon", url:"https://images.pexels.com/photos/37920556/pexels-photo-37920556.jpeg", kind:"pexels" },
  { id:"bmt-coffee", url:"https://images.pexels.com/photos/27777798/pexels-photo-27777798.jpeg", kind:"pexels" },
  { id:"saigon-cathedral", url:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Saigon_Notre-Dame_Cathedral.jpg", kind:"commons" },
  { id:"palace", url:"https://images.pexels.com/photos/37336177/pexels-photo-37336177.png", kind:"pexels" },
  { id:"cholon", url:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Cholon%2C_Ho_Chi_Minh_City_%2849057490021%29.png", kind:"commons" },
  { id:"cantho", url:"https://images.pexels.com/photos/32607908/pexels-photo-32607908.jpeg", kind:"pexels" },
  { id:"hatien", url:"https://images.pexels.com/photos/38960936/pexels-photo-38960936.jpeg", kind:"pexels" },
  { id:"condao", url:"https://images.pexels.com/photos/17581863/pexels-photo-17581863.jpeg", kind:"pexels" },
  { id:"angkorwat", url:"https://images.pexels.com/photos/37251675/pexels-photo-37251675.jpeg", kind:"pexels" },
  { id:"pho-bowl", url:"https://images.pexels.com/photos/6646022/pexels-photo-6646022.jpeg", kind:"pexels" },
  { id:"vietnam-coffee", url:"https://images.pexels.com/photos/16496241/pexels-photo-16496241.jpeg", kind:"pexels" },
  { id:"banhmi", url:"https://images.pexels.com/photos/32961649/pexels-photo-32961649.jpeg", kind:"pexels" },
  { id:"hoian-food", url:"https://images.pexels.com/photos/29374692/pexels-photo-29374692.jpeg", kind:"pexels" },
  { id:"seafood-nhatrang", url:"https://images.pexels.com/photos/31302693/pexels-photo-31302693.jpeg", kind:"pexels" }
];

const headers = { "user-agent":"ciao-vietnam-photo-prep/1.0" };

async function fetchBuffer(url) {
  const res = await fetch(url, { headers, redirect:"follow" });
  if (!res.ok) throw new Error("HTTP " + res.status + " for " + url);
  return Buffer.from(await res.arrayBuffer());
}

const images = JSON.parse(await fs.readFile(imagesPath, "utf8"));
const generated = [];

for (const source of sources) {
  let original;
  if (source.kind === "pexels") {
    original = await fetchBuffer(source.url);
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
