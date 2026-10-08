import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const lines = [];
lines.push("# Vietnamese review");
lines.push("");
lines.push("Every Vietnamese string in the guide, one line each. Needs a native reader.");
lines.push("The name \"Duyên hải Nam Trung Bộ\" is UNVERIFIED.");
lines.push("");

function walk(value, key, bucket) {
  if (value && typeof value === "object" && typeof value.en === "string" && typeof value.vi === "string") {
    bucket.push(`- \`${key}\` — ${value.vi}`);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, `${key}[${index}]`, bucket));
    return;
  }
  if (value && typeof value === "object") {
    for (const [childKey, child] of Object.entries(value)) {
      walk(child, key ? `${key}.${childKey}` : childKey, bucket);
    }
  }
}

function addFile(label, file) {
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  const bucket = [];
  walk(data, "", bucket);
  lines.push(`## ${label}`);
  lines.push("");
  lines.push(...bucket);
  lines.push("");
}

addFile("Shared interface", path.join(root, "content", "ui.json"));
addFile("Home", path.join(root, "content", "home.json"));
for (const name of fs.readdirSync(path.join(root, "content", "regions")).filter((item) => item.endsWith(".json")).sort()) {
  addFile(name.replace(".json", ""), path.join(root, "content", "regions", name));
}
const images = JSON.parse(fs.readFileSync(path.join(root, "content", "images.json"), "utf8"));
const imageLines = [];
for (const image of Object.values(images)) {
  if (image.alt?.vi) imageLines.push(`- \`${image.id}\` — ${image.alt.vi}`);
}
lines.push("## Photo alt text");
lines.push("");
lines.push(...imageLines);
lines.push("");

const out = path.join(root, "docs", "vi-review.md");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, lines.join("\n"));
console.log(`vi strings written ${out}`);
