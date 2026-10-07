import type { Metadata } from "next";
import { SoonBlock } from "@/components/cards";
import { ui } from "@/lib/content";

export const metadata: Metadata = { title: "Plan" };

export default function PlanPage() {
  return <SoonBlock title={ui.plan} />;
}
