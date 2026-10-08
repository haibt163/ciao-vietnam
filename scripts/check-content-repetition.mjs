import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const contentRoot = path.join(root, "content");
const files = [
  "plan.json",
  "eat.json",
  "essentials.json",
  "outdoors.json",
  "history.json",
  ...fs.readdirSync(path.join(contentRoot, "regions"))
    .filter((name) => name.endsWith(".json"))
    .map((name) => path.join("regions", name)),
];

const cards = [];
function walk(value, file) {
  if (!value || typeof value !== "object") return;
  if (Array.isArray(value)) {
    value.forEach((item) => walk(item, file));
    return;
  }

  if (
    typeof value.id === "string" &&
    value.title &&
    typeof value.title.en === "string" &&
    value.summary &&
    typeof value.summary.en === "string" &&
    Array.isArray(value.facts)
  ) {
    cards.push({
      file,
      id: value.id,
      title: value.title.en.trim(),
      summary: value.summary.en.trim(),
      image: typeof value.image === "string" ? value.image : null,
    });
  }

  Object.values(value).forEach((item) => walk(item, file));
}

for (const file of files) {
  const fullPath = path.join(contentRoot, file);
  walk(JSON.parse(fs.readFileSync(fullPath, "utf8")), file);
}

const normalize = (text) =>
  text
    .toLowerCase()
    .replace(/[“”"'’]/g, "")
    .replace(/\s+/g, " ")
    .trim();

function duplicatesBy(key) {
  const groups = new Map();
  for (const card of cards) {
    const value = key(card);
    if (!value) continue;
    const list = groups.get(value) ?? [];
    list.push(card);
    groups.set(value, list);
  }
  return [...groups.entries()].filter(([, list]) => list.length > 1);
}

const duplicateTitles = duplicatesBy((card) => normalize(card.title));
const duplicateSummaries = duplicatesBy((card) => normalize(card.summary));
const duplicateImages = duplicatesBy((card) => card.image);

let failed = false;

const report = (label, groups, formatter) => {
  if (!groups.length) return;
  failed = true;
  console.error(`\n${label} (${groups.length}):`);
  for (const [, list] of groups) {
    console.error("  " + list.map(formatter).join(" | "));
  }
};

report(
  "Duplicate card titles",
  duplicateTitles,
  (card) => `${card.file}#${card.id} “${card.title}”`,
);

report(
  "Duplicate card summaries",
  duplicateSummaries,
  (card) => `${card.file}#${card.id}`,
);

report(
  "Reused card images",
  duplicateImages,
  (card) => `${card.file}#${card.id} → ${card.image}`,
);

console.log(
  `Content audit: ${cards.length} guide cards, ${cards.filter((card) => card.image).length} image-bearing cards, ${duplicateTitles.length} duplicate title groups, ${duplicateSummaries.length} duplicate summary groups, ${duplicateImages.length} reused image IDs.`,
);

if (failed) {
  process.exitCode = 1;
}
