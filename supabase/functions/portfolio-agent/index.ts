import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { streamText } from "npm:ai";
import { createOpenAICompatible } from "npm:@ai-sdk/openai-compatible";
import { PROFILE, EDUCATION, AWARDS, RESUMES, PROJECTS } from "./content.ts";
import {
  AI_DATA,
  AREAS,
  COMMUNITY,
  CONTACT,
  PROFILE as CORE,
  SOCIAL_MEDIA,
  VIDEO_EDITING,
  WEB_DEVELOPMENT,
} from "./profile.ts";

type ChatMessage = { role: "user" | "assistant"; content: string };

const MAX_MESSAGES = 20;
const MAX_CHARS = 2000;

const knowledge = () =>
  [
    `CORE: ${JSON.stringify(CORE)}`,
    `PROFESSIONAL AREAS: ${JSON.stringify(AREAS)}`,
    `VIDEO EDITING: ${JSON.stringify(VIDEO_EDITING)}`,
    `SOCIAL MEDIA: ${JSON.stringify(SOCIAL_MEDIA)}`,
    `WEB DEVELOPMENT: ${JSON.stringify(WEB_DEVELOPMENT)}`,
    `AI & DATA: ${JSON.stringify(AI_DATA)}`,
    `COMMUNITY: ${JSON.stringify(COMMUNITY)}`,
    `CONTACT & LINKS: ${JSON.stringify(CONTACT)}`,
    `PROFILE (site): ${JSON.stringify(PROFILE)}`,
    `EDUCATION: ${JSON.stringify(EDUCATION)}`,
    `AWARDS: ${JSON.stringify(AWARDS)}`,
    `RESUMES: ${JSON.stringify(RESUMES)}`,
    `PROJECTS: ${JSON.stringify(PROJECTS)}`,
  ].join("\n\n");

const SYSTEM = `You are "Santosh AI", the personal Portfolio Assistant for ${CORE.name}.
You speak to visitors of his portfolio website and answer their questions about him: who he is, his skills, experience, projects, education, services, achievements, community work and how to contact or hire him.

Identity & tone:
- You are a professional personal assistant for Santosh — not a generic chatbot. Never mention being an AI language model, and never discuss topics unrelated to Santosh or his work.
- Refer to him as "Santosh" in third person.
- Concise, natural, professional. 2–5 sentences or a short bullet list. Plain text, no markdown tables and no bold markers.

Strict source-of-truth rules:
- Use ONLY the data below. NEVER invent companies, clients, job titles, years of experience, projects, certifications, salaries, revenue, achievements, technologies, testimonials or statistics.
- If the information is not in the data, reply exactly: "I don't have that information available right now. You can contact Santosh directly for more details."
- Do not guess or extrapolate.
- When useful, include the raw links from CONTACT & LINKS (portfolio, LinkedIn, Instagram, GitHub) or a project/resume link from the data.
- Answer in the user's language (English or Hindi/Hinglish).

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
      headers: {
        "Lovable-API-Key": apiKey,
        "X-Lovable-AIG-SDK": "vercel-ai-sdk",
      },
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
