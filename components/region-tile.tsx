import Link from "next/link";
import { Chips } from "@/components/cards";
import { Photo } from "@/components/photo";
import { T } from "@/components/text";
import type { RegionStub } from "@/content/types";

/** Image-first region link. `compact` is the 2-column Home tile; otherwise a wide card with chips. */
export function RegionTile({
  region,
  compact = false,
}: {
  region: RegionStub;
  compact?: boolean;
}) {
  const frame = compact ? "aspect-[4/5]" : "aspect-[16/10]";
  const link = (
    <Link
      href={`/regions/${region.slug}`}
      className={`tap relative block ${frame} overflow-hidden no-underline ${compact ? "rounded-2xl" : ""}`}
    >
      <Photo
        id={region.hero}
        fill
        sizes={
          compact
            ? "(max-width: 480px) 50vw, 240px"
            : "(max-width: 480px) 100vw, 480px"
        }
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/0" />
      <span className="absolute inset-x-0 bottom-0 grid gap-0.5 p-3 text-[#fffbf6]">
        <span
          className={`font-display leading-tight ${compact ? "text-xl" : "text-3xl"}`}
        >
          <T text={region.name} />
        </span>
        <span
          className={`text-white/85 ${compact ? "line-clamp-2 text-[12.5px]" : "text-sm"}`}
        >
          <T text={region.blurb} />
        </span>
        {!compact && region.note ? (
          <span className="font-mono text-[12px] text-[#ffcfae]">
            <T text={region.note} />
          </span>
        ) : null}
      </span>
    </Link>
  );
  if (compact) return link;
  return (
    <div className="card">
      {link}
      <div className="p-3">
        <Chips items={region.chips} />
      </div>
    </div>
  );
}
