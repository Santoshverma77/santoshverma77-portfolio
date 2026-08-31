import { createFileRoute } from "@tanstack/react-router";

import ContactPage from "@/pages/ContactPage";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    seoHead(
      "Contact Santosh Kumar Verma — Hire for Web & Video",
      "Get in touch with Santosh Kumar Verma for full-stack development, video editing and creative collaborations.",
      "/contact",
    ),
  component: ContactPage,
});
