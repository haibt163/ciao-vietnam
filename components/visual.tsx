import {
  Accessibility,
  Anchor,
  Baby,
  Banknote,
  BedDouble,
  Bike,
  Bus,
  Car,
  Castle,
  Coffee,
  Compass,
  Droplets,
  HeartPulse,
  Hotel,
  House,
  IdCard,
  Landmark,
  Leaf,
  Mountain,
  PlaneLanding,
  Rainbow,
  Route,
  Sailboat,
  Ship,
  Smartphone,
  Store,
  Tent,
  TrainFront,
  TreePalm,
  Waves,
  type LucideIcon,
} from "lucide-react";
import type { Card } from "@/content/types";

const ICONS: Record<string, LucideIcon> = {
  Accessibility,
  Anchor,
  Baby,
  Banknote,
  BedDouble,
  Bike,
  Bus,
  Car,
  Castle,
  Coffee,
  Compass,
  Droplets,
  HeartPulse,
  Hotel,
  House,
  IdCard,
  Landmark,
  Leaf,
  Mountain,
  PlaneLanding,
  Rainbow,
  Route,
  Sailboat,
  Ship,
  Smartphone,
  Store,
  Tent,
  TrainFront,
  TreePalm,
  Waves,
};

function hash(text: string) {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0;
  return h;
}

/** Original illustration from public/art (scenes and food flat-lays). */
export function ArtImg({
  id,
  className = "h-full w-full object-cover",
}: {
  id: string;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/art/${id}.svg`}
      alt=""
      width={800}
      height={600}
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
}

export function ArtFigure({ id }: { id: string }) {
  return (
    <figure className="visual m-0">
      <ArtImg id={id} />
    </figure>
  );
}

/** Rounded icon tile for practical cards (stay, getting there, essentials). */
export function IconTile({ name, seed }: { name: string; seed: string }) {
  const Icon = ICONS[name] ?? Compass;
  return (
    <span className={`tile tile-${hash(seed) % 5}`} aria-hidden>
      <Icon size={30} strokeWidth={1.6} />
    </span>
  );
}

export function iconName(card: Card): string | null {
  return card.art?.startsWith("icon:") ? card.art.slice(5) : null;
}

/** Typographic phrasebook tile. */
export function PhraseCard({ card }: { card: Card }) {
  const vi =
    card.facts.find((fact) => fact.label.en === "Vietnamese")?.value.en ??
    card.title.vi;
  return (
    <article id={card.id} className={`phrase tile-${hash(card.id) % 5}`}>
      <span className="font-display text-[23px] leading-tight">{vi}</span>
      <span className="font-mono text-[12px] opacity-80">{card.title.en}</span>
    </article>
  );
}
