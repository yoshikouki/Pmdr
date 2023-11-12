import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pmdr",
    short_name: "Pmdr",
    description: "Fantastic Pomodoro Timer",
    icons: [
      {
        src: "/icons/dark.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
    theme_color: "#000000",
    background_color: "#000000",
    start_url: "/",
    display: "standalone",
  };
}
