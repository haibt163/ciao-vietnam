import type { Metadata } from "next";
import { SoonBlock } from "@/components/cards";
import { ui } from "@/lib/content";

export const metadata: Metadata = { title: "The Outdoors" };

export default function OutdoorsPage() {
  return <SoonBlock title={ui.outdoors} />;
}
