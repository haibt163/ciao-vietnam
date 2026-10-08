import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const contentDir = path.join(root, "content");
const imageFile = path.join(contentDir, "images.json");
const publicDir = path.join(root, "public", "images");

function jsonFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return jsonFiles(full);
    return entry.isFile() && entry.name.endsWith(".json") ? [full] : [];
  });
}

const images = JSON.parse(fs.readFileSync(imageFile, "utf8"));
const manifestFile = path.join(contentDir, "revamp-photo-manifest.json");
const refs = new Map();

function walk(value, source) {
  if (Array.isArray(value)) {
    value.forEach((item) => walk(item, source));
    return;
  }
  if (!value || typeof value !== "object") return;

  for (const [key, child] of Object.entries(value)) {
    if (key === "image" && typeof child === "string") {
      const locations = refs.get(child) ?? [];
      locations.push(source);
      refs.set(child, locations);
      continue;
    }
    walk(child, source);
  }
}

for (const file of jsonFiles(contentDir)) {
  if (file === imageFile || file === manifestFile) continue;
  const relative = path.relative(root, file).replaceAll(path.sep, "/");
  walk(JSON.parse(fs.readFileSync(file, "utf8")), relative);
}

const missingRegistry = [...refs.keys()].filter((id) => !images[id]);
const missingFiles = new Set();

for (const id of refs.keys()) {
  if (!images[id]) continue;
  for (const width of [640, 960]) {
    if (!fs.existsSync(path.join(publicDir, `${id}-${width}.webp`))) {
      missingFiles.add(`${id}-${width}.webp`);
    }
  }
}

for (const [id, asset] of Object.entries(images)) {
  if (typeof asset?.src !== "string" || typeof asset?.srcSet !== "string") {
    missingFiles.add(`${id}: invalid registry paths`);
    continue;
  }
  for (const width of [640, 960]) {
    if (!fs.existsSync(path.join(publicDir, `${id}-${width}.webp`))) {
      missingFiles.add(`${id}-${width}.webp`);
    }
  }
}

if (missingRegistry.length || missingFiles.size) {
  if (missingRegistry.length) {
    console.error(`Missing image registry entries (${missingRegistry.length}):`);
    for (const id of missingRegistry) {
      console.error(`  ${id} ← ${refs.get(id).join(", ")}`);
    }
  }
  if (missingFiles.size) {
    console.error(`Missing image files / registry paths (${missingFiles.size}):`);
    for (const item of missingFiles) console.error(`  ${item}`);
  }
  process.exit(1);
}

console.log(`Image integrity OK: ${refs.size} referenced IDs; ${Object.keys(images).length} registry entries; 640/960 assets present.`);
