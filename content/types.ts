export type LangText = { en: string; vi: string };

export type ImageAsset = {
  id: string;
  src: string;
  srcSet?: string;
  width: number;
  height: number;
  alt: LangText;
  credit: string;
  license: string;
  licenseUrl: string;
  source: string;
  /** object-position on the cropped file, e.g. "50% 42%". */
  focus?: string;
  /** Heroes only. Landscape is a 4:3 box when a 4:5 crop would be too small. */
  heroLayout?: "portrait" | "landscape";
  /** True when the file was cropped, not only resized. */
  cropped?: boolean;
};

export type Fact = { label: LangText; value: LangText };

export type Card = {
  id: string;
  title: LangText;
  summary: LangText;
  image?: string;
  /** Show the "photograph still needed" block when there is no file yet. */
  gap?: boolean;
  kicker?: LangText;
  facts: Fact[];
};

export type RegionContent = {
  order: number;
  slug: string;
  name: LangText;
  blurb: LangText;
  keywords: string;
  note?: LangText;
  lede: LangText;
  hero: string;
  chips: LangText[];
  dontMiss: string[];
  sightsIntro: LangText;
  sights: Card[];
  eatIntro: LangText;
  eat: Card[];
  stayIntro: LangText;
  stay: Card[];
  gettingThere: Card[];
};

export type RegionStub = {
  slug: string;
  name: LangText;
  blurb: LangText;
  chips: LangText[];
  keywords: string;
  note?: LangText;
};

export type SearchEntry = {
  href: string;
  title: LangText;
  hint: LangText;
  keywords: string;
};

export type HomeContent = {
  heroTitle: LangText;
  heroLede: LangText;
  picks: { href: string; title: LangText; text: LangText; image: string }[];
  reasons: { icon: "lotus" | "hat" | "bike" | "lantern"; title: LangText; text: LangText }[];
  seasons: { label: LangText; text: LangText }[];
  tool: { lines: { key: LangText; value: LangText }[] };
};
