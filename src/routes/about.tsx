import { createFileRoute } from "@tanstack/react-router";

import AboutPage from "@/pages/AboutPage";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    seoHead(
      "About Santosh Kumar Verma — Developer, Editor & Creator",
      "Who is Santosh Kumar Verma? Full-stack developer, video editor and content creator from India, studying BS Data Science at IIT Madras.",
      "/about",
    ),
  component: AboutPage,
});
