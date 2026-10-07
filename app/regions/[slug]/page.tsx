import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SoonBlock } from "@/components/cards";
import { HanoiView } from "@/components/hanoi-view";
import { regions } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return regions.map((region) => ({ slug: region.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const region = regions.find((item) => item.slug === slug);
  return { title: region?.name.en ?? "Region" };
}

export default async function RegionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const region = regions.find((item) => item.slug === slug);
  if (!region) notFound();
  if (slug === "hanoi") return <HanoiView />;
  return <SoonBlock title={region.name} note={region.note} chips={region.chips} />;
}
