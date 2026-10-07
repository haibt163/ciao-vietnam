import type { Metadata } from "next";
import { SoonBlock } from "@/components/cards";
import { ui } from "@/lib/content";

export const metadata: Metadata = { title: "A brief history" };

export default function HistoryPage() {
  return <SoonBlock title={ui.history} />;
}
