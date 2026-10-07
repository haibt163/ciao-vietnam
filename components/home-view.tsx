import Link from "next/link";
import { BikeIcon, HatIcon, LanternIcon, LotusIcon } from "@/components/icons";
import { ParallaxHero } from "@/components/hero";
import { Photo } from "@/components/photo";
import { T } from "@/components/text";
import { home, regions, ui } from "@/lib/content";

const icons = {
  lotus: LotusIcon,
  hat: HatIcon,
  bike: BikeIcon,
  lantern: LanternIcon,
};

export function HomeView() {
  return (
    <div className="grid gap-8">
      <ParallaxHero image="halong">
        <p className="prompt m-0">
          {">"} ciao vietnam
          <span className="cursor" aria-hidden>
            {" "}
          </span>
        </p>
        <h1 className="m-0 max-w-[16ch] font-display text-[2.4rem] leading-[1.05]">
          <T text={home.heroTitle} />
        </h1>
        <p className="m-0 text-white/85">
          <T text={home.heroLede} />
        </p>
      </ParallaxHero>

      <section className="grid gap-3">
        <h2 className="m-0 font-mono text-[13px] tracking-wide text-muted uppercase">
          <T text={ui.ourPicks} />
        </h2>
        <div className="grid gap-3">
          {home.picks.map((pick) => (
            <Link key={pick.href} href={pick.href} className="card tap no-underline">
              <Photo id={pick.image} />
              <div className="grid gap-1 px-3 py-3">
                <h3 className="m-0 font-display text-2xl">
                  <T text={pick.title} />
                </h3>
                <p className="m-0 text-muted">
                  <T text={pick.text} />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-3">
        <h2 className="m-0 font-mono text-[13px] tracking-wide text-muted uppercase">
          <T text={ui.reasons} />
        </h2>
        <ul className="m-0 grid list-none grid-cols-2 gap-2 p-0">
          {home.reasons.map((reason) => {
            const Icon = icons[reason.icon];
            return (
              <li key={reason.title.en} className="grid gap-2 rounded-2xl border border-line bg-card p-3">
                <span className="text-clay">
                  <Icon />
                </span>
                <h3 className="m-0 font-display text-xl leading-tight">
                  <T text={reason.title} />
                </h3>
                <p className="m-0 text-sm text-muted">
                  <T text={reason.text} />
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="card p-3">
        <p className="prompt m-0 text-sm text-muted">{">"} trip</p>
        <ul className="m-0 mt-2 grid list-none gap-1 p-0 font-mono text-sm">
          {home.tool.lines.map((line) => (
            <li key={line.key.en}>
              <span className="text-muted">
                <T text={line.key} />
              </span>
              {" · "}
              <T text={line.value} />
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-3">
        <h2 className="m-0 font-mono text-[13px] tracking-wide text-muted uppercase">
          <T text={ui.regions} />
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {regions.map((region) => (
            <Link
              key={region.slug}
              href={`/regions/${region.slug}`}
              className="tap grid min-h-24 justify-between rounded-2xl border border-line bg-paper-2 p-3 no-underline"
            >
              <span className="font-display text-xl leading-tight">
                <T text={region.name} />
              </span>
              <span className="text-sm text-muted">
                <T text={region.blurb} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-3">
        <h2 className="m-0 font-mono text-[13px] tracking-wide text-muted uppercase">
          <T text={ui.when} />
        </h2>
        <ul className="m-0 grid list-none gap-2 p-0">
          {home.seasons.map((season) => (
            <li key={season.label.en} className="grid grid-cols-[7.5rem_1fr] items-center gap-2">
              <span className="chip justify-center">
                <T text={season.label} />
              </span>
              <span>
                <T text={season.text} />
              </span>
            </li>
          ))}
        </ul>
        <p className="m-0 font-mono text-[13px] text-muted">
          <T text={ui.verify} />
        </p>
      </section>

      <div className="flex gap-4">
        <Link href="/outdoors" className="tap inline-flex min-h-11 items-center font-mono text-sm">
          <T text={ui.outdoors} />
        </Link>
        <Link href="/history" className="tap inline-flex min-h-11 items-center font-mono text-sm">
          <T text={ui.history} />
        </Link>
      </div>
    </div>
  );
}
