import Link from "next/link";
import { InfoCard, Section } from "@/components/cards";
import { T } from "@/components/text";
import { ArtImg, PhraseCard } from "@/components/visual";
import type { GuideContent, GuideLink } from "@/content/types";

function LinkChips({ items }: { items: GuideLink[] }) {
  return (
    <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className="chip tap inline-flex min-h-11 items-center no-underline">
            <T text={item.label} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function GuideView({ content }: { content: GuideContent }) {
  return (
    <div className="grid gap-8 pb-6">
      {content.banner ? (
        <section className="banner relative -mx-4 overflow-hidden">
          <ArtImg id={content.banner} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/20" />
          <div className="absolute inset-x-0 bottom-0 grid gap-2 p-4 text-[#fffbf6]">
            <p className="prompt m-0">{">"} guide</p>
            <h1 className="m-0 font-display text-5xl leading-none"><T text={content.title} /></h1>
            <p className="m-0 max-w-[30ch]"><T text={content.lede} /></p>
          </div>
        </section>
      ) : (
        <div className="grid gap-3 pt-6">
          <p className="prompt m-0 text-muted">{">"} guide</p>
          <h1 className="m-0 font-display text-5xl leading-none"><T text={content.title} /></h1>
          <p className="m-0 max-w-[30ch]"><T text={content.lede} /></p>
        </div>
      )}
      {content.sections.map((section) => (
        <Section key={section.id} kicker={section.title} intro={section.intro}>
          {section.links?.length ? <LinkChips items={section.links} /> : null}
          {section.months?.length ? (
            <div className="grid gap-2">
              {section.months.map((month) => (
                <div key={month.label.en} className="card grid gap-2 p-3">
                  <span className="font-mono text-sm text-clay"><T text={month.label} /></span>
                  <LinkChips items={month.links} />
                </div>
              ))}
            </div>
          ) : null}
          {section.cards?.length ? (
            section.cards.every((card) => card.art === "phrase") ? (
              <div className="grid grid-cols-2 gap-3">{section.cards.map((card) => <PhraseCard key={card.id} card={card} />)}</div>
            ) : (
              <div className="grid gap-3">{section.cards.map((card) => <InfoCard key={card.id} card={card} />)}</div>
            )
          ) : null}
        </Section>
      ))}
    </div>
  );
}
