/**
 * SITE CONTENT — the single file to edit your portfolio text.
 * Every page reads from here. See README.md → "Editing content".
 */
import portrait from "@/assets/images/profile/img-profile-portrait.jpg";
import panditStudio from "@/assets/images/projects/img-project-panditstudio.jpg";
import zeroXStudio from "@/assets/images/projects/img-project-0xstudio.jpg";
import { SOCIALS, RESUMES } from "@/lib/links";

export const PERSON = {
  name: "Santosh Kumar Verma",
  firstName: "Santosh",
  role: "Full-Stack Developer & Video Editor",
  location: "Ranchi, India",
  tagline: "I build products that work and cut stories that move.",
  intro:
    "BS Data Science student at IIT Madras, creative technologist and Google Student Ambassador — shipping web products, AI experiments and scroll-stopping video edits.",
  portrait,
  available: true,
};

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Work" },
  { to: "/skills", label: "Stack" },
  { to: "/experience", label: "Journey" },
  { to: "/contact", label: "Contact" },
] as const;

export const MORE_LINKS = [
  { to: "/freelance", label: "Video work" },
  { to: "/education", label: "Education" },
  { to: "/certifications", label: "Certifications" },
  { to: "/awards", label: "Awards" },
  { to: "/resume", label: "Resume" },
] as const;

export const STATS = [
  { value: "8+", label: "Live & open-source projects" },
  { value: "11+", label: "Community & leadership roles" },
  { value: "27+", label: "Certifications" },
  { value: "2", label: "Crafts — code & cinema" },
];

export const SERVICES = [
  { title: "Web Development", body: "Fast, responsive React / Node products from idea to launch.", tone: "mint" },
  { title: "Video Editing", body: "Reels, promos and long-form edits with rhythm, captions and grade.", tone: "sky" },
  { title: "AI Workflows", body: "Practical AI features and automations built into real products.", tone: "peach" },
  { title: "Content & Social", body: "Planning, shooting and editing content that grows audiences.", tone: "lilac" },
] as const;

export type Project = {
  title: string;
  category: string;
  year: string;
  description: string;
  url: string;
  tech: string[];
  image?: string;
  tone: "mint" | "sky" | "peach" | "lilac";
};

export const PROJECTS: Project[] = [
  { title: "Pandit Studio", category: "Booking platform", year: "2026", description: "Online pandit booking — service catalogue, date/time booking flow and verified profiles.", url: "https://panditstudio.in", tech: ["React", "Tailwind", "Cloud"], image: panditStudio, tone: "peach" },
  { title: "0xStudio", category: "Studio website", year: "2026", description: "Design + code agency site with editorial type, case-study grid and motion-first UI.", url: "https://0xstudio.in", tech: ["React", "Motion", "Vite"], image: zeroXStudio, tone: "sky" },
  { title: "Phishing Detection", category: "Browser extension", year: "2025", description: "Detects phishing sites with ML and URL analysis, right inside the browser.", url: "https://github.com/Santoshverma77/phishing-detection-extension", tech: ["JavaScript", "ML", "Chrome API"], tone: "mint" },
  { title: "E-Com Website", category: "Full-stack app", year: "2025", description: "E-commerce platform with product catalogue, cart and responsive UI.", url: "https://github.com/Santoshverma77/e-com-website", tech: ["React", "Node.js", "MongoDB"], tone: "lilac" },
  { title: "Expense Management", category: "Dashboard", year: "2025", description: "Track expenses with an intuitive dashboard, charts and analytics.", url: "https://github.com/Santoshverma77/expense-management-system-main", tech: ["JavaScript", "Chart.js"], tone: "peach" },
  { title: "Quizller", category: "Web app", year: "2025", description: "Quiz app with categories, scoring and timed challenges.", url: "https://github.com/Santoshverma77/Quizller-project", tech: ["React", "TypeScript", "Tailwind"], tone: "sky" },
  { title: "COOKIE", category: "Creative web", year: "2024", description: "Playful cookie-themed interactive UI experiment.", url: "https://github.com/Santoshverma77/COOKIE", tech: ["HTML", "CSS", "JavaScript"], tone: "mint" },
  { title: "Tic Tac Toe", category: "Game", year: "2024", description: "Classic game with an AI opponent and clean animations.", url: "https://github.com/Santoshverma77/tic_tac_toe_game", tech: ["HTML", "CSS", "JavaScript"], tone: "lilac" },
];

/** Tech logos come from cdn.simpleicons.org/<slug>. Items without a slug render as monogram stars. */
export type Tech = { name: string; slug?: string; mono?: string; group: "Build" | "Data & AI" | "Create" };
export const STACK: Tech[] = [
  { name: "React", slug: "react", group: "Build" },
  { name: "TypeScript", slug: "typescript", group: "Build" },
  { name: "JavaScript", slug: "javascript", group: "Build" },
  { name: "Node.js", slug: "nodedotjs", group: "Build" },
  { name: "Express", slug: "express", group: "Build" },
  { name: "MongoDB", slug: "mongodb", group: "Build" },
  { name: "Tailwind", slug: "tailwindcss", group: "Build" },
  { name: "HTML5", slug: "html5", group: "Build" },
  { name: "Vite", slug: "vite", group: "Build" },
  { name: "Git", slug: "git", group: "Build" },
  { name: "GitHub", slug: "github", group: "Build" },
  { name: "Java", slug: "openjdk", group: "Build" },
  { name: "Python", slug: "python", group: "Data & AI" },
  { name: "Gemini", slug: "googlegemini", group: "Data & AI" },
  { name: "Jupyter", slug: "jupyter", group: "Data & AI" },
  { name: "Premiere Pro", mono: "Pr", group: "Create" },
  { name: "After Effects", mono: "Ae", group: "Create" },
  { name: "Photoshop", mono: "Ps", group: "Create" },
  { name: "DaVinci Resolve", slug: "davinciresolve", group: "Create" },
  { name: "Canva", mono: "Cv", group: "Create" },
  { name: "Figma", slug: "figma", group: "Create" },
  { name: "CapCut", mono: "Cc", group: "Create" },
];

export const EXPERIENCE = [
  { role: "Google Student Ambassador", org: "Google", period: "Aug 2025 — Now", body: "Represent Google's AI & Gemini initiatives on campus through workshops, demos and student partnerships." },
  { role: "Head of Partnerships", org: "GDG Ranchi", period: "Jul 2025 — Now", body: "Lead sponsorship strategy and partner relations for community events." },
  { role: "Head of Sponsorship", org: "DevSphereIndia", period: "Sep 2025 — Now", body: "Secure funding and partnerships for developer initiatives across India." },
  { role: "Event & Sponsorship Coordinator", org: "Codllers · Genesis", period: "Nov 2025 — Now", body: "End-to-end event planning, sales and stakeholder communication." },
  { role: "Open-Source Contributor", org: "GSSoC · Open Source Connect", period: "Jul 2025 — Now", body: "Contributing to open-source projects with developers worldwide." },
  { role: "Marketing Manager", org: "YRI", period: "Sep — Nov 2025", body: "Ran marketing campaigns, retail marketing and sales operations." },
  { role: "SIGMA 7.0 Student", org: "Apna College", period: "Mar 2025 — Now", body: "DSA in Java and full-stack web development." },
];

export const EDUCATION = [
  { school: "Indian Institute of Technology, Madras", degree: "BS — Data Science & AI", period: "2024 — Now" },
  { school: "S.M. Arya Public School", degree: "Class XII — Mathematics & Computer Science", period: "2022 — 2024" },
];

export const CONTACT = {
  email: SOCIALS.email,
  phone: SOCIALS.phone,
  phoneDisplay: SOCIALS.phoneDisplay,
  socials: [
    { label: "GitHub", href: SOCIALS.github },
    { label: "LinkedIn", href: SOCIALS.linkedin },
    { label: "Instagram", href: SOCIALS.instagramPersonal },
    { label: "Creative IG", href: SOCIALS.instagramCreative },
  ],
  resumes: RESUMES,
};

export const TONE_BG: Record<Project["tone"], string> = {
  mint: "bg-mint",
  sky: "bg-sky",
  peach: "bg-peach",
  lilac: "bg-lilac",
};
