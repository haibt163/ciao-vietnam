import type { Metadata } from "next";
import { GuideView } from "@/components/guide-view";
import data from "@/content/history.json";
import type { GuideContent } from "@/content/types";

export const metadata: Metadata = { title: "A brief history" };

export default function HistoryPage() {
  return <GuideView content={data as GuideContent} />;
}
