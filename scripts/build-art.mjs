// Writes public/art/<id>.svg for the dish illustrations that remain in use.
// Run: node scripts/build-art.mjs   (add --png to also write previews to /tmp/art-preview for review)
import { mkdirSync, readdirSync, unlinkSync, writeFileSync } from "node:fs";
import { foods } from "./art/food.mjs";

mkdirSync("public/art", { recursive: true });
for (const [id, make] of Object.entries(foods)) writeFileSync(`public/art/${id}.svg`, make());

for (const file of readdirSync("public/art")) {
  if (!file.endsWith(".svg")) continue;
  if (foods[file.replace(/\.svg$/, "")]) continue;
  unlinkSync(`public/art/${file}`);
}

console.log(`wrote ${Object.keys(foods).length} files to public/art`);

if (process.argv.includes("--png")) {
  const { default: sharp } = await import("sharp");
  mkdirSync("/tmp/art-preview", { recursive: true });
  for (const [id, make] of Object.entries(foods)) await sharp(Buffer.from(make()), { density: 72 }).resize(640, 480).png().toFile(`/tmp/art-preview/${id}.png`);
  console.log("previews in /tmp/art-preview");
}
