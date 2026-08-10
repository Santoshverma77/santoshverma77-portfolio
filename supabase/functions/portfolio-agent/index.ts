import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { streamText } from "npm:ai";
import { createOpenAICompatible } from "npm:@ai-sdk/openai-compatible";
import { PROFILE, EDUCATION, AWARDS, RESUMES, PROJECTS } from "./content.ts";

type ChatMessage = { role: "user" | "assistant"; content: string };

const MAX_MESSAGES = 20;
const MAX_CHARS = 2000;

const knowledge = () =>
  [
    `PROFILE: ${JSON.stringify(PROFILE)}`,
    `EDUCATION: ${JSON.stringify(EDUCATION)}`,
    `AWARDS: ${JSON.stringify(AWARDS)}`,
    `RESUMES: ${JSON.stringify(RESUMES)}`,
    `PROJECTS: ${JSON.stringify(PROJECTS)}`,
  ].join("\n\n");

const SYSTEM = `You are the portfolio agent for ${PROFILE.name}.
You answer questions about his resume, skills, education, awards and projects, and you help draft tailored content (cover letters, project pitches, bios, interview answers, client proposals) using ONLY the portfolio data below.

Rules:
- Never invent employers, dates, metrics or projects that are not in the data. If something is missing, say so plainly and suggest what he could add.
- Two tracks exist: "fullstack" (engineering) and "video" (video editing & creative). Match the track the user asks about; if they don't say, ask or cover both briefly.
- Answer in the user's language (English or Hindi/Hinglish).
- Be concise and concrete. Use short paragraphs or bullet lists. Plain text, no markdown tables.
- When a link is genuinely useful (a project or resume), include the raw URL.

PORTFOLIO DATA
${knowledge()}`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "AI is not configured." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => null);
    const raw = Array.isArray(body?.messages) ? body.messages : null;
    if (!raw || raw.length === 0) {
      return new Response(JSON.stringify({ error: "messages must be a non-empty array" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const messages: ChatMessage[] = [];
    for (const m of raw.slice(-MAX_MESSAGES)) {
      const role = m?.role === "assistant" ? "assistant" : "user";
      const content = typeof m?.content === "string" ? m.content.trim().slice(0, MAX_CHARS) : "";
      if (content) messages.push({ role, content });
    }
    if (messages.length === 0) {
      return new Response(JSON.stringify({ error: "No valid message content" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const gateway = createOpenAICompatible({
      name: "lovable",
      baseURL: "https://ai.gateway.lovable.dev/v1",
      headers: { "Lovable-API-Key": apiKey },
    });

    const result = streamText({
      model: gateway("google/gemini-3.6-flash"),
      system: SYSTEM,
      messages,
    });

    return result.toTextStreamResponse({
      headers: { ...corsHeaders, "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    const status = /rate limit|429/i.test(message) ? 429 : /402|credit/i.test(message) ? 402 : 500;
    return new Response(JSON.stringify({ error: message }), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
