import { createFileRoute } from "@tanstack/react-router";

import FreelancePage from "@/pages/FreelancePage";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/freelance")({
  head: () =>
    seoHead(
      "Freelance Video & Creative Work — Santosh Kumar Verma",
      "Hire Santosh Kumar Verma for video editing, reels, photography, brand content and social media creative work.",
      "/freelance",
    ),
  component: FreelancePage,
});
