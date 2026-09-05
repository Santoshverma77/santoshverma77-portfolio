import { createFileRoute } from "@tanstack/react-router";

import HirePage from "@/pages/HirePage";
import { seoHead } from "@/lib/seo";

const TITLE = "Hire a Video Editor & Web Developer — Santosh Kumar Verma";
const DESCRIPTION =
  "Hire a video editor for Instagram reels, promo videos and brand content, plus full-stack website development. Send a short brief and get a quote within 24 hours.";

export const Route = createFileRoute("/hire")({
  head: () => {
    const base = seoHead(TITLE, DESCRIPTION, "/hire");
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Santosh Kumar Verma — Video Editing & Web Development",
            url: "https://santoshverma.online/hire",
            email: "santoshskv2005@gmail.com",
            telephone: "+91 73196 62244",
            areaServed: "Worldwide",
            description: DESCRIPTION,
            makesOffer: [
              "Instagram reel editing",
              "Promo and brand video editing",
              "Cinematic video editing",
              "Full-stack website development",
            ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
          }),
        },
      ],
    };
  },
  component: HirePage,
});
