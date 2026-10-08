import type { Metadata } from "next";
import { GuideView } from "@/components/guide-view";
import data from "@/content/eat.json";
import type { GuideContent } from "@/content/types";

export const metadata: Metadata = { title: "Eat" };

export default function EatPage() {
  return <GuideView content={data as GuideContent} />;
}
