import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ciao Vietnam",
    short_name: "Ciao",
    description: "A pocket guide to Vietnam.",
    start_url: "/",
    display: "standalone",
    background_color: "#F6F1E7",
    theme_color: "#9C4320",
    lang: "en",
  };
}
