import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RegionView } from "@/components/region-view";
import { loadRegion, loadRegions } from "@/lib/regions";

export const dynamicParams = false;

export function generateStaticParams() {
  return loadRegions().map((region) => ({ slug: region.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const region = loadRegion(slug);
  return { title: region?.name.en ?? "Region" };
}

export default async function RegionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const region = loadRegion(slug);
  if (!region) notFound();
  return <RegionView region={region} />;
}
