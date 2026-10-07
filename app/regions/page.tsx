import type { Metadata } from "next";
import Link from "next/link";
import { Chips } from "@/components/cards";
import { T } from "@/components/text";
import { regions, ui } from "@/lib/content";

export const metadata: Metadata = { title: "Regions" };

export default function RegionsPage() {
  return (
    <div className="grid gap-4 py-6">
      <p className="prompt m-0 text-muted">{">"} regions</p>
      <h1 className="m-0 font-display text-4xl leading-tight">
        <T text={ui.regions} />
      </h1>
      <p className="m-0 text-muted">
        <T text={ui.regionsIntro} />
      </p>
      <ul className="m-0 grid list-none gap-3 p-0">
        {regions.map((region) => (
          <li key={region.slug}>
            <Link href={`/regions/${region.slug}`} className="card tap grid gap-2 p-3 no-underline">
              <span className="font-display text-2xl leading-tight">
                <T text={region.name} />
              </span>
              <span className="text-muted">
                <T text={region.blurb} />
              </span>
              {region.note ? (
                <span className="font-mono text-[13px] text-clay">
                  <T text={region.note} />
                </span>
              ) : null}
              <Chips items={region.chips} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
