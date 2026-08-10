import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { PROJECTS, type Track } from "../content";

export default defineTool({
  name: "list_projects",
  title: "List projects",
  description:
    "List Santosh's portfolio projects with descriptions, tech/tools and links. Filter by track: 'fullstack' for engineering work, 'video' for video editing & creative work.",
  inputSchema: {
    track: z
      .enum(["fullstack", "video", "all"])
      .default("all")
      .describe("Which work track to list. Defaults to all."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ track }) => {
    const selected =
      !track || track === "all" ? PROJECTS : PROJECTS.filter((p) => p.track === (track as Track));
    const text = selected
      .map(
        (p) =>
          `• ${p.title} [${p.track}] — ${p.description}\n  Tools: ${p.tech.join(", ")}\n  Link: ${p.link}`
      )
      .join("\n");
    return {
      content: [{ type: "text", text: text || "No projects found for that track." }],
      structuredContent: { projects: selected },
    };
  },
});
