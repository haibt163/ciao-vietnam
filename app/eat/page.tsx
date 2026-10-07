import type { Metadata } from "next";
import { SoonBlock } from "@/components/cards";
import { ui } from "@/lib/content";

export const metadata: Metadata = { title: "Eat" };

export default function EatPage() {
  return <SoonBlock title={ui.eat} />;
}
