import { createFileRoute } from "@tanstack/react-router";

import HomePage from "@/pages/HomePage";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seoHead(
      "Santosh Kumar Verma | Full-Stack Developer & Video Editor",
      "Portfolio of Santosh Kumar Verma — Full-Stack Developer, Video Editor, Content Creator and BS Data Science student at IIT Madras.",
      "/",
    ),
  component: HomePage,
});
