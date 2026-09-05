import { createFileRoute } from "@tanstack/react-router";

import HirePage from "@/pages/HirePage";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/hire")({
  head: () =>
    seoHead(
      "Hire Santosh Kumar Verma — Video Editor & Full-Stack Developer",
      "Start a project with Santosh Kumar Verma: video editing, reels, brand content and full-stack websites. Send a brief and get a quote within 24 hours.",
      "/hire",
    ),
  component: HirePage,
});
