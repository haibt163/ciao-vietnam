import type { Metadata } from "next";
import { SoonBlock, TextLink } from "@/components/cards";
import { T } from "@/components/text";
import { ui } from "@/lib/content";

export const metadata: Metadata = { title: "Essentials" };

export default function EssentialsPage() {
  return (
    <div className="grid gap-2">
      <SoonBlock title={ui.essentials} />
      <TextLink href="/credits">
        <T text={ui.essentialsLink} />
      </TextLink>
    </div>
  );
}
