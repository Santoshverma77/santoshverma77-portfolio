import { createFileRoute } from "@tanstack/react-router";

import EducationPage from "@/pages/EducationPage";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/education")({
  head: () =>
    seoHead(
      "Education — Santosh Kumar Verma | IIT Madras",
      "Academic timeline of Santosh Kumar Verma: BS in Data Science & AI at IIT Madras, plus schooling and academic achievements.",
      "/education",
    ),
  component: EducationPage,
});
