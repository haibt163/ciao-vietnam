import Link from "next/link";
import type { Card, LangText } from "@/content/types";
import { T } from "@/components/text";
import { Photo } from "@/components/photo";
import { ArtFigure, IconTile, iconName } from "@/components/visual";
import { ui } from "@/lib/content";

export function Chips({ items }: { items: LangText[] }) {
  return (
    <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
      {items.map((item) => (
        <li key={item.en} className="chip">
          <T text={item} chip />
        </li>
      ))}
    </ul>
  );
}

export function InfoCard({ card }: { card: Card }) {
  const icon = iconName(card);
  const visual = card.image ? (
    <Photo id={card.image} cover />
  ) : card.art && !icon && card.art !== "phrase" ? (
    <ArtFigure id={card.art} />
  ) : null;
  return (
    <article id={card.id} className="card">
      {visual}
      <details>
        <summary className="tap">
          {icon ? (
            <IconTile name={icon} seed={card.id} />
          ) : (
            <span className="font-mono text-sm text-clay" aria-hidden>
              {">"}
            </span>
          )}
          <span className="grid">
            {card.kicker ? (
              <span className="font-mono text-[13px] font-normal text-muted">
                <T text={card.kicker} />
              </span>
            ) : null}
            <T text={card.title} />
          </span>
        </summary>
        <div className="grid gap-3 px-3.5 pb-4">
          <p className="m-0">
            <T text={card.summary} />
          </p>
          <dl className="m-0 grid gap-2">
            {card.facts.map((fact) => (
              <div key={fact.label.en}>
                <dt className="font-mono text-[13px] text-muted">
                  <T text={fact.label} />
                </dt>
                <dd className="m-0">
                  <T text={fact.value} />
                </dd>
              </div>
            ))}
          </dl>
          {card.links && card.links.length > 0 ? (
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              {card.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="chip tap inline-flex min-h-11 items-center no-underline">
                    <T text={link.label} />
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </details>
    </article>
  );
}

export function Section({
  kicker,
  intro,
  children,
}: {
  kicker: LangText;
  intro?: LangText;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-3">
      <h2 className="m-0 font-mono text-[13px] tracking-wide text-muted uppercase">
        <T text={kicker} />
      </h2>
      {intro ? (
        <p className="m-0">
          <T text={intro} />
        </p>
      ) : null}
      {children}
    </section>
  );
}

export function SoonBlock({
  title,
  note,
  chips,
}: {
  title: LangText;
  note?: LangText;
  chips?: LangText[];
}) {
  return (
    <div className="grid gap-4 py-6">
      <p className="prompt m-0 text-muted">
        {">"} <T text={ui.comingSoon} />
        <span className="cursor" aria-hidden>
          {" "}
        </span>
      </p>
      <h1 className="m-0 font-display text-4xl leading-tight">
        <T text={title} />
      </h1>
      <p className="m-0 text-muted">
        <T text={note ?? ui.soonNote} />
      </p>
      {chips && chips.length > 0 ? <Chips items={chips} /> : null}
    </div>
  );
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="tap inline-flex min-h-11 items-center text-clay-fill underline decoration-clay/50 underline-offset-4">
      {children}
    </Link>
  );
}
