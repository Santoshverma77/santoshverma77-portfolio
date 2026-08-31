import { createFileRoute } from "@tanstack/react-router";

import ExperiencePage from "@/pages/ExperiencePage";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/experience")({
  head: () =>
    seoHead(
      "Experience — Santosh Kumar Verma | Developer & Editor",
      "Work experience and community roles of Santosh Kumar Verma, including GDG Ranchi core team, freelance video editing and web development.",
      "/experience",
    ),
  component: ExperiencePage,
});
