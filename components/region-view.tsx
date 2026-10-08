import { Chips, InfoCard, Section } from "@/components/cards";
import { ParallaxHero } from "@/components/hero";
import { T } from "@/components/text";
import type { Card, RegionContent } from "@/content/types";
import { ui } from "@/lib/content";

export function RegionView({ region }: { region: RegionContent }) {
  const allCards: Card[] = [...region.sights, ...region.eat, ...region.stay, ...region.gettingThere];
  const missed = region.dontMiss
    .map((id) => allCards.find((card) => card.id === id))
    .filter((card): card is Card => Boolean(card));

  return (
    <div className="grid gap-8">
      <ParallaxHero image={region.hero}>
        <p className="prompt m-0">{">"} {region.slug}</p>
        <h1 className="m-0 font-display text-5xl leading-none">
          <T text={region.name} />
        </h1>
        <p className="m-0 max-w-[28ch]">
          <T text={region.lede} />
        </p>
      </ParallaxHero>
      <Chips items={region.chips} />
      {region.note ? (
        <p className="m-0 font-mono text-sm text-clay">
          <T text={region.note} />
        </p>
      ) : null}
      <Section kicker={ui.dontMiss}>
        <ul className="m-0 grid list-none gap-2 p-0">
          {missed.map((card) => (
            <li key={card.id}>
              <a href={`#${card.id}`} className="tap flex min-h-11 items-center rounded-xl border border-line bg-card px-3 no-underline">
                <T text={card.title} />
              </a>
            </li>
          ))}
        </ul>
      </Section>
      <Section kicker={ui.sights} intro={region.sightsIntro}>
        <div className="grid gap-3">
          {region.sights.map((card) => (
            <InfoCard key={card.id} card={card} />
          ))}
        </div>
      </Section>
      <Section kicker={ui.eat} intro={region.eatIntro}>
        <div className="grid gap-3">
          {region.eat.map((card) => (
            <InfoCard key={card.id} card={card} />
          ))}
        </div>
      </Section>
      <Section kicker={ui.stay} intro={region.stayIntro}>
        <div className="grid gap-3">
          {region.stay.map((card) => (
            <InfoCard key={card.id} card={card} />
          ))}
        </div>
      </Section>
      <Section kicker={ui.gettingThere}>
        <div className="grid gap-3">
          {region.gettingThere.map((card) => (
            <InfoCard key={card.id} card={card} />
          ))}
        </div>
        <p className="m-0 font-mono text-[13px] text-muted">
          <T text={ui.verify} />
        </p>
      </Section>
    </div>
  );
}
