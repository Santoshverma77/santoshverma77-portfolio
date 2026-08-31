import { createFileRoute } from "@tanstack/react-router";

import ResumePage from "@/pages/ResumePage";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/resume")({
  head: () =>
    seoHead(
      "Resume — Santosh Kumar Verma | Download PDF",
      "Download Santosh Kumar Verma's resumes: Full-Stack Developer and Video Editing tracks, with skills, projects and experience.",
      "/resume",
    ),
  component: ResumePage,
});
