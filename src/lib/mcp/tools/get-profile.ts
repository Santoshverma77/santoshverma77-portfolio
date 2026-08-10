import { defineTool } from "@lovable.dev/mcp-js";
import { AWARDS, EDUCATION, PROFILE, RESUMES } from "../content";

export default defineTool({
  name: "get_profile",
  title: "Get profile",
  description:
    "Get Santosh's profile summary: headline, contact links, education timeline, honors & awards, and the two available resume tracks.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const text = [
      `${PROFILE.name} — ${PROFILE.headline}`,
      PROFILE.summary,
      "",
      "Education:",
      ...EDUCATION.map((e) => `• ${e.institution} — ${e.credential} (${e.period})`),
      "",
      "Honors & Awards:",
      ...AWARDS.map((a) => `• ${a.title} — ${a.issuer} (${a.year})`),
      "",
      `Resume tracks: ${Object.values(RESUMES).map((r) => r.label).join(" | ")}`,
      `Links: ${PROFILE.github} · ${PROFILE.instagramCreative}`,
      `Contact: ${PROFILE.email} · ${PROFILE.phone}`,
    ].join("\n");
    return {
      content: [{ type: "text", text }],
      structuredContent: { profile: PROFILE, education: EDUCATION, awards: AWARDS },
    };
  },
});
