import fs from "node:fs";
import path from "node:path";
import type { RegionContent, RegionStub } from "@/content/types";

const dir = path.join(process.cwd(), "content", "regions");

function readAll(): RegionContent[] {
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".json"))
    .map((name) => JSON.parse(fs.readFileSync(path.join(dir, name), "utf8")) as RegionContent)
    .sort((a, b) => a.order - b.order);
}

export function loadRegions() {
  return readAll();
}

export function loadRegion(slug: string) {
  return readAll().find((region) => region.slug === slug) ?? null;
}

export function regionStubs(): RegionStub[] {
  return readAll().map((region) => ({
    slug: region.slug,
    hero: region.hero,
    name: region.name,
    blurb: region.blurb,
    chips: region.chips.slice(0, 3),
    keywords: region.keywords,
    note: region.note,
  }));
}
