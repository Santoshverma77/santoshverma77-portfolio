import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getProfileTool from "./tools/get-profile";
import getResumeTool from "./tools/get-resume";
import listProjectsTool from "./tools/list-projects";
import searchPortfolioTool from "./tools/search-portfolio";

// Issuer must be the direct Supabase host, built from the build-time project ref.
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "personal-portfolio",
  title: "Personal Portfolio",
  version: "0.1.0",
  instructions:
    "Tools for Santosh Kumar Verma's portfolio. Use `get_profile` for a summary, education and awards; `get_resume` for the full-stack or video-editing resume track; `list_projects` for work samples per track; `search_portfolio` for free-text questions about skills, tools and projects. Use these to generate tailored answers (pitches, cover letters, project insights) grounded in this content.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [getProfileTool, getResumeTool, listProjectsTool, searchPortfolioTool],
});
