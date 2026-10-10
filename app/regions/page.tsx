import type { Metadata } from "next";
import { RegionTile } from "@/components/region-tile";
import { T } from "@/components/text";
import { regionStubs } from "@/lib/regions";
import { ui } from "@/lib/content";

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
        {regionStubs().map((region) => (
          <li key={region.slug}>
            <RegionTile region={region} />
          </li>
        ))}
      </ul>
    </div>
  );
}
