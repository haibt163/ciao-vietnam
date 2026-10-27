// Rebuilds derived WebP files and the image registry from licensed guidebook sources.
//
// The ebook files and their extracted images stay outside the repository. Point this
// script at local folders extracted from the two licensed books:
//
//   node scripts/guidebook-media.mjs \
//     --lp-images "C:\path\to\lp\EPUB\images" \
//     --dk-pages  "C:\path\to\dk-pages"
//
// With no sources present it exits without changing public/images or content/images.json.
// See scripts/guidebook-media.json for the per-asset book, edition, page and credit.
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
const manifestFile = path.join(import.meta.dirname, "guidebook-media.json");
const imageFile = path.join(root, "content", "images.json");
const publicDir = path.join(root, "public", "images");

const manifest = JSON.parse(fs.readFileSync(manifestFile, "utf8")).assets;
const allAssets = Object.values(manifest);
const assets = allAssets.filter((asset) => !asset.retain);
const retained = allAssets.filter((asset) => asset.retain);
const missingSources = assets.filter((asset) => {
  if (asset.lpFile) return !lpDir || !fs.existsSync(path.join(lpDir, asset.lpFile));
  if (asset.dkFile) return !dkDir || !fs.existsSync(path.join(dkDir, asset.dkFile));
  return true;
});

if (missingSources.length) {
  console.log("Guidebook sources are not available in the given folders. Nothing to do.");
  console.log(`  ${missingSources.length} assets need --lp-images / --dk-pages (first: ${missingSources[0]?.id})`);
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
      : path.join(dkDir, asset.dkFile);
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
      source: asset.source,
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
