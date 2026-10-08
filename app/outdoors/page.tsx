import type { Metadata } from "next";
import { GuideView } from "@/components/guide-view";
import data from "@/content/outdoors.json";
import type { GuideContent } from "@/content/types";

export const metadata: Metadata = { title: "The Outdoors" };

export default function OutdoorsPage() {
  return <GuideView content={data as GuideContent} />;
}
