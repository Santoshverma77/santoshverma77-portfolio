import { createFileRoute } from "@tanstack/react-router";

import AwardsPage from "@/pages/AwardsPage";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/awards")({
  head: () =>
    seoHead(
      "Awards & Achievements — Santosh Kumar Verma",
      "Awards won by Santosh Kumar Verma: HACKED 3.0 Hackathon winner, Logistic Legend Award at DevFest Ranchi 2025 and more.",
      "/awards",
    ),
  component: AwardsPage,
});
