import { createFileRoute } from "@tanstack/react-router";

import SkillsPage from "@/pages/SkillsPage";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/skills")({
  head: () =>
    seoHead(
      "Skills — Santosh Kumar Verma | Full-Stack & Creative",
      "Technical and creative skills of Santosh Kumar Verma: React, Node.js, Java, Python, Premiere Pro, motion graphics and more.",
      "/skills",
    ),
  component: SkillsPage,
});
