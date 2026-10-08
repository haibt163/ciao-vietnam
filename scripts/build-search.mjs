import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const dir = path.join(root, "content", "regions");
const regions = fs
  .readdirSync(dir)
  .filter((name) => name.endsWith(".json"))
  .map((name) => JSON.parse(fs.readFileSync(path.join(dir, name), "utf8")))
  .sort((a, b) => a.order - b.order);

const entries = [];
for (const region of regions) {
  entries.push({
    href: `/regions/${region.slug}`,
    title: region.name,
    hint: region.blurb,
    keywords: [region.keywords, region.note?.en, region.note?.vi].filter(Boolean).join(" "),
  });
  const cards = [...region.sights, ...region.eat, ...region.stay, ...region.gettingThere];
  for (const card of cards) {
    entries.push({
      href: `/regions/${region.slug}#${card.id}`,
      title: card.title,
      hint: region.name,
      keywords: [card.title.en, card.title.vi, card.summary.en, card.summary.vi, card.kicker?.en, card.kicker?.vi]
        .filter(Boolean)
        .join(" "),
    });
  }
}

for (const name of ["plan", "eat", "essentials", "outdoors", "history"]) {
  const data = JSON.parse(fs.readFileSync(path.join(root, "content", `${name}.json`), "utf8"));
  if (!["plan", "eat", "essentials"].includes(name)) {
    entries.push({
      href: `/${name}`,
      title: data.title,
      hint: data.lede,
      keywords: data.sections.map((section) => `${section.title.en} ${section.title.vi}`).join(" "),
    });
  }
  for (const section of data.sections) {
    for (const card of section.cards || []) {
      entries.push({
        href: `/${name}#${card.id}`,
        title: card.title,
        hint: data.title,
        keywords: [card.title.en, card.title.vi, card.summary.en, card.summary.vi].join(" "),
      });
    }
  }
}

entries.push(
  {
    href: "/plan",
    title: { en: "Plan", vi: "Lịch trình" },
    hint: { en: "Itineraries and when to go", vi: "Lịch trình và mùa đi" },
    keywords: "plan itinerary when to go tet",
  },
  {
    href: "/eat",
    title: { en: "Eat", vi: "Ăn uống" },
    hint: { en: "Food scene and coffee", vi: "Đồ ăn và cà phê" },
    keywords: "eat food coffee pho bun cha bia hoi",
  },
  {
    href: "/essentials",
    title: { en: "Essentials", vi: "Cần biết" },
    hint: { en: "Money, health, getting around", vi: "Tiền, sức khoẻ, đi lại" },
    keywords: "essentials money visa health phrasebook",
  },
  {
    href: "/credits",
    title: { en: "Photo credits", vi: "Nguồn ảnh" },
    hint: { en: "Who took the pictures", vi: "Ai chụp ảnh" },
    keywords: "photo credits license wikimedia",
  },
);

fs.writeFileSync(path.join(root, "content", "search.json"), `${JSON.stringify(entries, null, 2)}\n`);
console.log(`search entries ${entries.length}`);
