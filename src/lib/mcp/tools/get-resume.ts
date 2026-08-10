import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { RESUMES, PROFILE, type Track } from "../content";

export default defineTool({
  name: "get_resume",
  title: "Get resume",
  description:
    "Get Santosh's resume details for a track — 'fullstack' (engineering) or 'video' (video editing & creative) — including focus, key skills and the downloadable PDF path.",
  inputSchema: {
    track: z
      .enum(["fullstack", "video"])
      .describe("Which resume track to fetch: fullstack or video."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ track }) => {
    const resume = RESUMES[track as Track];
    const text = [
      `${PROFILE.name} — ${resume.label}`,
      resume.focus,
      `Key skills: ${resume.skills.join(", ")}`,
      `Resume PDF: ${resume.url}`,
      `Contact: ${PROFILE.email} · ${PROFILE.phone}`,
    ].join("\n");
    return {
      content: [{ type: "text", text }],
      structuredContent: { track, ...resume },
    };
  },
});
