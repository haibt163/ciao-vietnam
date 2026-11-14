// Rebuilds derived WebP files and the image registry from licensed book and web sources.
//
// The source files stay outside the repository. Point this script at local folders:
//
//   node scripts/guidebook-media.mjs \
//     --lp-images   "C:\path\to\lp\EPUB\images" \
//     --dk-pages    "C:\path\to\dk-pages" \
//     --food-images "C:\path\to\licensed-food-photos"
//
// Add --food-only to rebuild just the external food photographs without the book sources.
// Add --asset <id[,id]> to rebuild only named assets and leave every other registry entry alone.
//
// With no sources present it exits without changing public/images or content/images.json.
// See scripts/guidebook-media.json for book, edition, page and credit, and
// scripts/food-media.json for the external food photographs and their licences.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const args = process.argv.slice(2);
const arg = (name) => {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
};

const lpDir = arg("--lp-images") || process.env.CIAO_LP_IMAGES;
const dkDir = arg("--dk-pages") || process.env.CIAO_DK_PAGES;
const foodDir = arg("--food-images") || process.env.CIAO_FOOD_IMAGES;
const manifestFile = path.join(import.meta.dirname, "guidebook-media.json");
const foodManifestFile = path.join(import.meta.dirname, "food-media.json");
const imageFile = path.join(root, "content", "images.json");
const publicDir = path.join(root, "public", "images");

const manifest = JSON.parse(fs.readFileSync(manifestFile, "utf8")).assets;
const foodManifest = JSON.parse(fs.readFileSync(foodManifestFile, "utf8")).assets;
const allAssets = [...Object.values(manifest), ...Object.values(foodManifest)];
const foodOnly = args.includes("--food-only");
const assetFilter = arg("--asset")?.split(",").map((id) => id.trim()).filter(Boolean);
let assets = foodOnly
  ? Object.values(foodManifest)
  : allAssets.filter((asset) => !asset.retain);
let retained = foodOnly ? [] : allAssets.filter((asset) => asset.retain);
if (assetFilter) {
  assets = assets.filter((asset) => assetFilter.includes(asset.id));
  retained = retained.filter((asset) => assetFilter.includes(asset.id));
}
const missingSources = assets.filter((asset) => {
  if (asset.lpFile) return !lpDir || !fs.existsSync(path.join(lpDir, asset.lpFile));
  if (asset.dkFile) return !dkDir || !fs.existsSync(path.join(dkDir, asset.dkFile));
  if (asset.webFile) return !foodDir || !fs.existsSync(path.join(foodDir, asset.webFile));
  return true;
});

if (missingSources.length) {
  console.log("Media sources are not available in the given folders. Nothing to do.");
  console.log(`  ${missingSources.length} assets need --lp-images / --dk-pages / --food-images (first: ${missingSources[0]?.id})`);
  process.exit(0);
}

fs.mkdirSync(publicDir, { recursive: true });
const registry = JSON.parse(fs.readFileSync(imageFile, "utf8"));
const failures = [];

const CARD_WIDTHS = [640, 960];
const HERO_EXTRA = 1280;
const CARD_QUALITY = 80;
const HERO_QUALITY = 82;

function positionedCrop(width, height, ratio, focus = "50% 50%") {
  const [fx, fy] = focus.split(" ").map((value) => Number.parseFloat(value) / 100);
  const cropHeight = Math.min(height, Math.round(width / ratio));
  const cropWidth = Math.min(width, Math.round(cropHeight * ratio));
  const left = Math.max(0, Math.round((width - cropWidth) * fx));
  const top = Math.max(0, Math.round((height - cropHeight) * fy));
  return { left, top, width: cropWidth, height: cropHeight };
}

for (const asset of assets) {
  try {
    const sourcePath = asset.lpFile
      ? path.join(lpDir, asset.lpFile)
      : asset.dkFile
        ? path.join(dkDir, asset.dkFile)
        : path.join(foodDir, asset.webFile);
    let pipeline = sharp(sourcePath).rotate();
    const meta = await pipeline.metadata();
    let width = meta.width ?? 0;
    let height = meta.height ?? 0;
    let cropped = false;

    if (asset.crop) {
      const [left, top, cropWidth, cropHeight] = asset.crop;
      if (left + cropWidth > width || top + cropHeight > height) {
        throw new Error(`crop ${asset.crop.join(",")} exceeds ${width}x${height}`);
      }
      pipeline = pipeline.extract({ left, top, width: cropWidth, height: cropHeight });
      width = cropWidth;
      height = cropHeight;
      cropped = true;
    }

    if (asset.hero) {
      const ratio = asset.layout === "landscape" ? 4 / 3 : 4 / 5;
      const crop = positionedCrop(width, height, ratio, asset.focus);
      pipeline = pipeline.extract(crop);
      width = crop.width;
      height = crop.height;
      cropped = true;
    }

    if (width < 960) throw new Error(`source is only ${width}px wide; 960px needs no upscaling`);

    const widths = asset.hero && width >= HERO_EXTRA ? [...CARD_WIDTHS, HERO_EXTRA] : CARD_WIDTHS;
    for (const stale of fs.readdirSync(publicDir)) {
      if (new RegExp(`^${asset.id}-(640|960|1280)\\.webp$`).test(stale)) {
        fs.unlinkSync(path.join(publicDir, stale));
      }
    }

    const sizes = [];
    for (const target of widths) {
      const quality = asset.hero ? HERO_QUALITY : CARD_QUALITY;
      const buffer = await pipeline
        .clone()
        .resize({ width: target, withoutEnlargement: true })
        .webp({ quality, effort: 5 })
        .toBuffer();
      const out = await sharp(buffer).metadata();
      fs.writeFileSync(path.join(publicDir, `${asset.id}-${target}.webp`), buffer);
      sizes.push({ width: out.width, height: out.height });
    }

    const largest = sizes.at(-1);
    registry[asset.id] = {
      id: asset.id,
      src: `/images/${asset.id}-${largest.width}.webp`,
      srcSet: sizes.map((size) => `/images/${asset.id}-${size.width}.webp ${size.width}w`).join(", "),
      width: largest.width,
      height: largest.height,
      alt: asset.alt,
      credit: asset.credit,
      license: asset.license,
      ...(asset.licenseUrl ? { licenseUrl: asset.licenseUrl } : {}),
      source: asset.source,
      ...(asset.sourceUrl ? { sourceUrl: asset.sourceUrl } : {}),
      ...(asset.focus ? { focus: asset.focus } : {}),
      ...(asset.hero ? { heroLayout: asset.layout ?? "portrait" } : {}),
      ...(cropped ? { cropped: true } : {}),
    };
    console.log(`ok ${asset.id}: ${sizes.map((size) => size.width).join("/")}`);
  } catch (error) {
    failures.push(`${asset.id}: ${error.message}`);
  }
}

for (const asset of retained) {
  const entry = { ...asset };
  delete entry.retain;
  delete entry.book;
  delete entry.edition;
  delete entry.page;
  if (/^https?:\/\//.test(entry.source) && !entry.sourceUrl) entry.sourceUrl = entry.source;
  registry[asset.id] = entry;
}

if (failures.length) {
  console.error("Some assets failed:");
  for (const failure of failures) console.error(`  ${failure}`);
  process.exit(1);
}

fs.writeFileSync(imageFile, `${JSON.stringify(registry, null, 2)}\n`);
console.log(`Updated ${assets.length} assets in content/images.json.`);
