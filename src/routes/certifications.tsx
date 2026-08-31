import { createFileRoute } from "@tanstack/react-router";

import CertificationsPage from "@/pages/CertificationsPage";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/certifications")({
  head: () =>
    seoHead(
      "Certifications — Santosh Kumar Verma",
      "27+ certifications earned by Santosh Kumar Verma across full-stack development, data science, AI and creative tools.",
      "/certifications",
    ),
  component: CertificationsPage,
});
