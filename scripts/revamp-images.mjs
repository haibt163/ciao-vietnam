import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "content", "revamp-photo-manifest.json"), "utf8"));
const imageFile = path.join(root, "content", "images.json");
const pub = path.join(root, "public", "images");
fs.mkdirSync(pub, { recursive: true });

const existing = JSON.parse(fs.readFileSync(imageFile, "utf8"));
const failures = [];
const written = new Set();
const generated = {};

async function fetchBuffer(url) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "ciao-vietnam-photo-builder/1.0" },
        redirect: "follow",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const type = res.headers.get("content-type") || "";
      if (!type.startsWith("image/")) throw new Error(`not an image: ${type}`);
      return Buffer.from(await res.arrayBuffer());
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
    }
  }
  throw lastError;
}

async function makeSize(buffer, width) {
  return sharp(buffer)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toBuffer();
}

for (const [id, item] of Object.entries(manifest)) {
  if (!item || typeof item !== "object" || !Number.isInteger(item.photoId)) continue;
  try {
    const buffer = await fetchBuffer(item.url ?? `https://images.pexels.com/photos/${item.photoId}/pexels-photo-${item.photoId}.jpeg`);
    const meta = await sharp(buffer).metadata();
    const longEdge = Math.max(meta.width || 0, meta.height || 0);
    if (longEdge < 2400) throw new Error(`source too small: ${meta.width}x${meta.height}`);
    const sizes = [];
    for (const width of [640, 960]) {
      if ((meta.width || 0) < width) continue;
      const out = await makeSize(buffer, width);
      const filename = `${id}-${width}.webp`;
      fs.writeFileSync(path.join(pub, filename), out);
      written.add(filename);
      const outMeta = await sharp(out).metadata();
      sizes.push({ width: outMeta.width, height: outMeta.height });
    }
    if (sizes.length < 2) throw new Error("could not make both card widths without upscaling");
    generated[id] = {
      id,
      src: `/images/${id}-960.webp`,
      srcSet: `/images/${id}-640.webp 640w, /images/${id}-960.webp 960w`,
      width: sizes.at(-1).width,
      height: sizes.at(-1).height,
      alt: item.alt,
      credit: item.credit,
      license: "Pexels License",
      licenseUrl: "https://www.pexels.com/license/",
      source: item.source,
      cropped: false
    };
    console.log(`${id}: ${meta.width}x${meta.height} -> 640/960`);
  } catch (error) {
    failures.push(`${id}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

fs.writeFileSync(imageFile, `${JSON.stringify({ ...existing, ...generated }, null, 2)}\n`);
const bytes = Object.keys(generated).flatMap((id) => [`${id}-640.webp`, `${id}-960.webp`]).reduce((sum, name) => sum + fs.statSync(path.join(pub, name)).size, 0);
console.log(`Generated ${Object.keys(generated).length} photos; new bytes ${(bytes / 1024 / 1024).toFixed(1)} MB`);
