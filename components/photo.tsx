import Image from "next/image";
import { imageById } from "@/lib/content";
import { T } from "@/components/text";

export function Photo({
  id,
  priority = false,
  sizes = "(max-width: 480px) 100vw, 480px",
}: {
  id: string;
  priority?: boolean;
  sizes?: string;
}) {
  const image = imageById(id);
  const alt = `${image.alt.en} ${image.alt.vi}`;
  return (
    <figure className="m-0">
      <Image
        src={image.src}
        alt={alt}
        width={image.width}
        height={image.height}
        priority={priority}
        sizes={sizes}
        className="h-auto w-full"
      />
      <figcaption className="flex flex-col gap-0.5 px-3 py-2 font-mono text-[13px] leading-snug text-muted">
        <T text={image.alt} />
        <span>
          {image.credit} · {image.license}
        </span>
      </figcaption>
    </figure>
  );
}
