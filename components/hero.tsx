"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { imageById } from "@/lib/content";
import { useLang } from "@/lib/use-lang";

export function ParallaxHero({
  image,
  children,
}: {
  image: string;
  children: React.ReactNode;
}) {
  const photo = imageById(image);
  const lang = useLang();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 420], [0, 64]);

  return (
    <section className="relative -mx-4 mb-6 h-[70vh] min-h-[420px] overflow-hidden">
      <motion.div className="absolute -inset-y-10 inset-x-0" style={reduce ? undefined : { y }}>
        {/* Plain img: files are already 480/800/1200 WebP. next/image would hit the optimizer this app turns off. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src}
          srcSet={photo.srcSet}
          sizes="(max-width: 480px) 100vw, 480px"
          alt={lang === "vi" ? photo.alt.vi : photo.alt.en}
          width={photo.width}
          height={photo.height}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/25" />
      <div className="absolute inset-x-0 bottom-0 grid gap-2 p-4 text-[#fffbf6]">
        {children}
        <p className="m-0 font-mono text-[12px] text-white/80">
          {photo.credit} · {photo.license}
        </p>
      </div>
    </section>
  );
}
