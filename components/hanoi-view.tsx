import { Chips, InfoCard, Section } from "@/components/cards";
import { ParallaxHero } from "@/components/hero";
import { T } from "@/components/text";
import { hanoi, ui } from "@/lib/content";
import type { Card } from "@/content/types";

const allCards: Card[] = [...hanoi.sights, ...hanoi.eat, ...hanoi.stay, ...hanoi.gettingThere];

export function HanoiView() {
  const missed = hanoi.dontMiss
    .map((id) => allCards.find((card) => card.id === id))
    .filter((card): card is Card => Boolean(card));

  return (
    <div className="grid gap-8">
      <ParallaxHero image={hanoi.hero}>
        <p className="prompt m-0">{">"} hanoi</p>
        <h1 className="m-0 font-display text-5xl leading-none">
          <T text={hanoi.name} />
        </h1>
        <p className="m-0 max-w-[28ch]">
          <T text={hanoi.lede} />
        </p>
      </ParallaxHero>
      <Chips items={hanoi.chips} />
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
      <Section kicker={ui.sights} intro={hanoi.sightsIntro}>
        <div className="grid gap-3">
          {hanoi.sights.map((card) => (
            <InfoCard key={card.id} card={card} />
          ))}
        </div>
      </Section>
      <Section kicker={ui.eat} intro={hanoi.eatIntro}>
        <div className="grid gap-3">
          {hanoi.eat.map((card) => (
            <InfoCard key={card.id} card={card} />
          ))}
        </div>
      </Section>
      <Section kicker={ui.stay} intro={hanoi.stayIntro}>
        <div className="grid gap-3">
          {hanoi.stay.map((card) => (
            <InfoCard key={card.id} card={card} />
          ))}
        </div>
      </Section>
      <Section kicker={ui.gettingThere}>
        <div className="grid gap-3">
          {hanoi.gettingThere.map((card) => (
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
