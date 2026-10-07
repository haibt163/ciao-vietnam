import type { Metadata } from "next";
import { Photo } from "@/components/photo";
import { T } from "@/components/text";
import { images, ui } from "@/lib/content";

export const metadata: Metadata = { title: "Photo credits" };

export default function CreditsPage() {
  return (
    <div className="grid gap-4 py-6">
      <p className="prompt m-0 text-muted">{">"} credits</p>
      <h1 className="m-0 font-display text-4xl leading-tight">
        <T text={ui.credits} />
      </h1>
      <p className="m-0 text-muted">
        <T text={ui.creditsIntro} />
      </p>
      <ul className="m-0 grid list-none gap-4 p-0">
        {Object.values(images).map((image) => (
          <li key={image.id} className="card">
            <Photo id={image.id} />
            <p className="m-0 px-3 pb-3">
              <a
                href={image.source}
                className="tap inline-flex min-h-11 items-center font-mono text-sm text-clay-fill"
                target="_blank"
                rel="noreferrer"
              >
                <T text={ui.sourceLink} />
              </a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
