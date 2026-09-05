/// <reference types="vite/client" />
import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import Layout from "@/components/Layout";
import PageTransitionLoader from "@/components/PageTransitionLoader";
import { SoundProvider } from "@/contexts/SoundContext";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { reportLovableError } from "@/lib/lovable-error-reporting";
import { renderErrorPage } from "@/lib/error-page";
import appCss from "@/styles.css?url";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { title: "Santosh Kumar Verma | Full-Stack Developer & Video Editor" },
      {
        name: "description",
        content:
          "Explore Santosh Kumar Verma's portfolio featuring full-stack development, video editing, content creation, AI, social media, and creative technology projects.",
      },
      { name: "author", content: "Santosh Kumar Verma" },
      {
        name: "keywords",
        content:
          "Santosh Kumar Verma, full-stack developer, video editor, content creator, social media manager, MERN stack, React developer, AI, data science, IIT Madras, GDG Ranchi, portfolio",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "theme-color", content: "#0a0a0a" },
      {
        name: "google-site-verification",
        content: "P7-kyeLML4yq-B082PhgJNdSESRxB_vkpNCwO2IF-uo",
      },
      { property: "og:site_name", content: "Santosh Kumar Verma" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content:
          "Santosh Kumar Verma — Full-Stack Developer, Video Editor, Content Creator",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@santoshverma_77" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Bebas+Neue&family=Chakra+Petch:wght@400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Santosh Kumar Verma",
          jobTitle: "Full-Stack Developer & Video Editor",
          url: "https://santoshverma.online/",
          alumniOf: "Indian Institute of Technology, Madras",
          sameAs: [
            "https://github.com/Santoshverma77",
            "https://www.linkedin.com/in/santoshverma77/",
            "https://www.instagram.com/santoshverma_77/",
          ],
        }),
      },
    ],
  }),
  errorComponent: ({ error }) => {
    reportLovableError(error);
    return (
      <RootDocument>
        <div dangerouslySetInnerHTML={{ __html: renderErrorPage() }} />
      </RootDocument>
    );
  },
  component: RootComponent,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function AnimatedOutlet() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayPath, setDisplayPath] = useState(pathname);

  useEffect(() => {
    if (pathname !== displayPath) setIsTransitioning(true);
  }, [pathname, displayPath]);

  const handleTransitionComplete = () => {
    setIsTransitioning(false);
    setDisplayPath(pathname);
  };

  return (
    <>
      <PageTransitionLoader
        isLoading={isTransitioning}
        onComplete={handleTransitionComplete}
      />
      <AnimatePresence mode="wait">
        <Outlet key={pathname} />
      </AnimatePresence>
    </>
  );
}

function RootComponent() {
  return (
    <RootDocument>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <SoundProvider>
          <Layout>
            <AnimatedOutlet />
          </Layout>
        </SoundProvider>
      </TooltipProvider>
    </RootDocument>
  );
}
