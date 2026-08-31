const SITE_URL = "https://santoshverma.online";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

/**
 * Per-route head metadata for TanStack Start. Rendered server-side, so
 * social-preview crawlers (which don't execute JS) see the right tags.
 */
export function seoHead(title: string, description: string, path: string) {
  const url = `${SITE_URL}${path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
