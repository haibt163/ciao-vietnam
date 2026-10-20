"use client";

import { imageById } from "@/lib/content";
import { useLang } from "@/lib/use-lang";
import { T } from "@/components/text";

export function Photo({
  id,
  priority = false,
  sizes = "(max-width: 480px) 100vw, 480px",
  caption = true,
  cover = false,
  fill = false,
}: {
  id: string;
  priority?: boolean;
  sizes?: string;
  caption?: boolean;
  /** Fill a fixed 4:3 frame (cards) and show the credit as a small pill. */
  cover?: boolean;
  /** Absolutely fill the parent (tiles); no figure, no caption. */
  fill?: boolean;
}) {
  const image = imageById(id);
  const lang = useLang();
  if (fill) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes={sizes}
        alt={lang === "vi" ? image.alt.vi : image.alt.en}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: image.focus || "50% 40%" }}
      />
    );
  }
  if (cover) {
    return (
      <figure className="visual m-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes={sizes}
          alt={lang === "vi" ? image.alt.vi : image.alt.en}
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          style={{ objectPosition: image.focus || "50% 40%" }}
        />
        <figcaption className="credit-pill">
          {image.credit} · {image.license}
        </figcaption>
      </figure>
    );
  }
  return (
    <figure className="m-0">
      {/* Plain img: WebP files are already sized. next/image would hit the optimizer this app turns off. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes={sizes}
        alt={lang === "vi" ? image.alt.vi : image.alt.en}
        width={image.width}
        height={image.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className="h-auto w-full"
      />
      {caption ? (
        <figcaption className="flex flex-col gap-0.5 px-3 py-2 font-mono text-[13px] leading-snug text-muted">
          <T text={image.alt} />
          <span>
            {image.credit} · {image.license}
          </span>
        </figcaption>
      ) : null}
    </figure>
  );
}
