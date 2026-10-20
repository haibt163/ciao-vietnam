// Writes public/art/<id>.svg from the scene and food definitions.
// Run: node scripts/build-art.mjs   (add --png to also write previews to /tmp/art-preview for review)
import { mkdirSync, writeFileSync } from "node:fs";
import { scenes } from "./art/scenes.mjs";

let all = { ...scenes };
try {
  const { foods } = await import("./art/food.mjs");
  all = { ...all, ...foods };
} catch {
  /* food.mjs not present yet */
}
try {
  const { more } = await import("./art/scenes2.mjs");
  all = { ...all, ...more };
} catch {
  /* scenes2.mjs not present yet */
}

mkdirSync("public/art", { recursive: true });
for (const [id, make] of Object.entries(all)) writeFileSync(`public/art/${id}.svg`, make());
console.log(`wrote ${Object.keys(all).length} files to public/art`);

if (process.argv.includes("--png")) {
  const { default: sharp } = await import("sharp");
  mkdirSync("/tmp/art-preview", { recursive: true });
  for (const [id, make] of Object.entries(all)) await sharp(Buffer.from(make()), { density: 72 }).resize(640, 480).png().toFile(`/tmp/art-preview/${id}.png`);
  console.log("previews in /tmp/art-preview");
}
