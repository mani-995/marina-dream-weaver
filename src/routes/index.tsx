import { createFileRoute } from "@tanstack/react-router";
import App from "@/App";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday, Dipuuui — A Story in Seven Chapters" },
      { name: "description", content: "An interactive birthday story made for Dipuuui, filled with blooms, wishes, a letter, and one special gift." },
      { property: "og:title", content: "Happy Birthday, Dipuuui" },
      { property: "og:description", content: "A personal birthday story in seven interactive chapters." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: App,
});