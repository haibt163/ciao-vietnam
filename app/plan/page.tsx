import type { Metadata } from "next";
import { GuideView } from "@/components/guide-view";
import data from "@/content/plan.json";
import type { GuideContent } from "@/content/types";

export const metadata: Metadata = { title: "Plan" };

export default function PlanPage() {
  return <GuideView content={data as GuideContent} />;
}
