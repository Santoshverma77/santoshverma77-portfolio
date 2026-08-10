import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { AWARDS, EDUCATION, PROFILE, PROJECTS, RESUMES } from "../content";

type Hit = { kind: string; title: string; detail: string; link?: string };

export default defineTool({
  name: "search_portfolio",
  title: "Search portfolio",
  description:
    "Free-text search across Santosh's projects, skills, education and awards. Use this to answer tailored questions like 'what React work has he done?' or 'what editing tools does he use?'.",
  inputSchema: {
    query: z.string().trim().min(1).describe("Keywords to search for."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query }) => {
    const q = query.toLowerCase();
    const match = (s: string) => s.toLowerCase().includes(q);

    const hits: Hit[] = [];

    for (const p of PROJECTS) {
      if (match(p.title) || match(p.description) || p.tech.some(match)) {
        hits.push({
          kind: `project:${p.track}`,
          title: p.title,
          detail: `${p.description} (Tools: ${p.tech.join(", ")})`,
          link: p.link,
        });
      }
    }

    for (const [track, r] of Object.entries(RESUMES)) {
      const skills = r.skills.filter(match);
      if (skills.length || match(r.label) || match(r.focus)) {
        hits.push({
          kind: `resume:${track}`,
          title: r.label,
          detail: skills.length ? `Matching skills: ${skills.join(", ")}` : r.focus,
          link: r.url,
        });
      }
    }

    for (const e of EDUCATION) {
      if (match(e.institution) || match(e.credential)) {
        hits.push({ kind: "education", title: e.institution, detail: `${e.credential} (${e.period})` });
      }
    }

    for (const a of AWARDS) {
      if (match(a.title) || match(a.issuer)) {
        hits.push({ kind: "award", title: a.title, detail: `${a.issuer} (${a.year})` });
      }
    }

    if (hits.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `No matches for "${query}". Try get_profile or list_projects for the full picture. Contact: ${PROFILE.email}`,
          },
        ],
        structuredContent: { query, hits: [] },
      };
    }

    const text = hits
      .map((h) => `• [${h.kind}] ${h.title} — ${h.detail}${h.link ? `\n  Link: ${h.link}` : ""}`)
      .join("\n");

    return {
      content: [{ type: "text", text }],
      structuredContent: { query, hits },
    };
  },
});
