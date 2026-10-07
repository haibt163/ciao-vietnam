import imagesJson from "@/content/images.json";
import uiJson from "@/content/ui.json";
import homeJson from "@/content/home.json";
import hanoiJson from "@/content/hanoi.json";
import regionsJson from "@/content/regions.json";
import searchJson from "@/content/search.json";
import type { HomeContent, HanoiContent, ImageAsset, LangText, RegionStub, SearchEntry } from "@/content/types";

export const images = imagesJson as Record<string, ImageAsset>;
export const ui = uiJson as Record<string, LangText>;
export const home = homeJson as HomeContent;
export const hanoi = hanoiJson as HanoiContent;
export const regions = regionsJson as RegionStub[];
export const searchIndex = searchJson as SearchEntry[];

export function imageById(id: string) {
  const image = images[id];
  if (!image) throw new Error(`Missing image ${id}`);
  return image;
}
