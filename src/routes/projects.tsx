import { createFileRoute } from "@tanstack/react-router";

import ProjectsPage from "@/pages/ProjectsPage";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/projects")({
  head: () =>
    seoHead(
      "Projects by Santosh Kumar Verma — Web & Video Work",
      "Web development and video editing projects by Santosh Kumar Verma, including live client sites like panditstudio.in and 0xstudio.in.",
      "/projects",
    ),
  component: ProjectsPage,
});
