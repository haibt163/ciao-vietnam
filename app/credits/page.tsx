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
          <li key={image.id} className="card pb-3">
            <Photo id={image.id} caption={false} />
            <div className="grid gap-1 px-3 pt-2 font-mono text-sm">
              <p className="m-0">
                <T text={image.alt} />
              </p>
              <p className="m-0">{image.credit}</p>
              <a
                href={image.licenseUrl}
                className="tap inline-flex min-h-11 items-center text-clay-fill"
                target="_blank"
                rel="noreferrer"
              >
                {image.license}
              </a>
              <a
                href={image.source}
                className="tap inline-flex min-h-11 items-center text-clay-fill"
                target="_blank"
                rel="noreferrer"
              >
                <T text={ui.sourceLink} />
              </a>
              <p className="m-0 text-muted">
                <T text={image.cropped ? ui.croppedNote : ui.resized} />
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
