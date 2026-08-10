/**
 * Centralized, structured knowledge source for "Santosh AI" (the portfolio assistant).
 * Keep this file as the single place to update facts about Santosh.
 * NOTE: this file is mirrored to `supabase/functions/portfolio-agent/profile.ts`
 * (edge functions cannot import from `src/`). Update both when editing.
 */

export const IDENTITY = {
  assistantName: "Santosh AI",
  assistantRole: "Portfolio Assistant",
  greeting:
    "Hi! 👋 I'm Santosh's AI Portfolio Assistant. Ask me anything about his skills, projects, experience, services, or how to work with him.",
  status: "Ask me anything about Santosh",
};

export const PROFILE = {
  name: "Santosh Kumar Verma",
  location: "India",
  education: "BS in Data Science at IIT Madras",
  headline:
    "Full-Stack Developer · Video Editor · Content Creator · AI & Data Science",
  summary:
    "Santosh Kumar Verma is a BS in Data Science student at IIT Madras and a creative technologist working across video editing, content creation, social media, full-stack development and AI. He also contributes to the tech community through GDG Ranchi.",
};

export const AREAS = [
  "Video Editing",
  "Content Creation",
  "Social Media Management",
  "Full-Stack Web Development",
  "AI / Data Science",
  "Photography",
  "Videography",
];

export const VIDEO_EDITING = {
  tools: [
    "Adobe Premiere Pro",
    "CapCut",
    "Canva",
    "Adobe Photoshop",
    "AI-assisted creative workflows",
  ],
  capabilities: [
    "Instagram Reels",
    "YouTube Shorts",
    "Short-form videos",
    "Long-form videos",
    "Talking-head videos",
    "Promotional videos",
    "Event videos",
    "Social media content",
    "Storytelling",
    "Engagement-focused editing",
    "Captions",
    "Text animation",
    "B-roll",
    "Transitions",
    "Sound design",
    "Color correction",
    "Visual storytelling",
  ],
};

export const SOCIAL_MEDIA = [
  "Social media content creation",
  "Content planning",
  "Reels",
  "Shorts",
  "Social media trends",
  "Audience engagement",
  "Organic content",
  "Brand content",
];

export const WEB_DEVELOPMENT = [
  "Full-Stack Development",
  "MERN Stack",
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "Responsive web development",
  "API integration",
];

export const AI_DATA = [
  "Artificial Intelligence",
  "Data Science",
  "Python",
  "Machine Learning",
  "AI-assisted workflows",
  "AI tools",
];

export const COMMUNITY = {
  role: "Core Team Member at GDG Ranchi",
  involvement: [
    "Technology community involvement",
    "Event management",
    "Event content",
    "Photography",
    "Videography",
    "Community engagement",
  ],
};

export const CONTACT = {
  portfolio: "https://santoshverma77.vercel.app/",
  instagram: "https://www.instagram.com/santoshverma_77/",
  github: "https://github.com/Santoshverma77",
  linkedin: "https://www.linkedin.com/in/santoshverma77/",
};

export const SUGGESTED_QUESTIONS = [
  "Who is Santosh?",
  "Show me his skills",
  "What services does he offer?",
  "Tell me about his projects",
  "How can I hire him?",
];
