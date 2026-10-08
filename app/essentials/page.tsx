import type { Metadata } from "next";
import { GuideView } from "@/components/guide-view";
import data from "@/content/essentials.json";
import type { GuideContent } from "@/content/types";

export const metadata: Metadata = { title: "Essentials" };

export default function EssentialsPage() {
  return <GuideView content={data as GuideContent} />;
}
