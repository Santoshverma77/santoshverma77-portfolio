import { createFileRoute } from "@tanstack/react-router";
import VideoEditingPage from "@/pages/VideoEditingPage";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/video-editing")({
  head: () =>
    seoHead(
      "Video Editing Services & Rates — Santosh Kumar Verma",
      "Reel, promo and cinematic video editing packages with clear rates. Pick a package and book your edit with Santosh Kumar Verma.",
      "/video-editing",
    ),
  component: VideoEditingPage,
});
