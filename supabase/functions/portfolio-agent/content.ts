/** Static, public portfolio content served over MCP. No env reads, no I/O. */

export type Track = "fullstack" | "video";

export const PROFILE = {
  name: "Santosh Kumar Verma",
  headline: "Full-Stack Developer · Video Editor & Content Creator",
  location: "India",
  email: "santoshskv2005@gmail.com",
  phone: "+91 73196 62244",
  github: "https://github.com/Santoshverma77",
  instagramCreative: "https://www.instagram.com/_insta.fx_/",
  instagramPersonal: "https://www.instagram.com/santoshverma_77/",
  summary:
    "Full-stack developer and video editor. BS in Data Science & AI at IIT Madras, building web apps with React/Node and producing cinematic reels, travel films and brand promos.",
};

export const EDUCATION = [
  {
    institution: "Indian Institute of Technology, Madras",
    credential: "BS, Data Science & Artificial Intelligence",
    period: "Aug 2025 – Present",
  },
  {
    institution: "S.M. Arya Public School",
    credential: "Class 12th",
    period: "May 2021 – Jun 2023",
  },
  {
    institution: "Saraswati Shishu Vidya Mandir",
    credential: "Class 8th – 10th",
    period: "Mar 2018 – Mar 2021",
  },
];

export const AWARDS = [
  {
    title: "Logistic Legend Award — DevFest Ranchi 2025",
    issuer: "Google Developer Group",
    year: "2025",
  },
  {
    title: "Winner — HACKED 3.0 Hackathon (1st Prize, ₹25,000)",
    issuer: "BML Munjal University",
    year: "Mar 2025",
  },
  {
    title: "Second Prize — State-Level Gyan Vigyan Mela",
    issuer: "Vidya Vikas Samiti",
    year: "Oct 2018",
  },
];

export const RESUMES: Record<
  Track,
  { label: string; url: string; focus: string; skills: string[] }
> = {
  fullstack: {
    label: "Full-Stack Development",
    url: "/resume-fullstack.pdf",
    focus:
      "Engineering resume: full-stack projects, languages, frameworks, open-source contributions, certifications and community leadership.",
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "MongoDB",
      "Tailwind CSS",
      "Python",
      "Git & GitHub",
    ],
  },
  video: {
    label: "Video Editing & Creative",
    url: "/resume-video-editing.pdf",
    focus:
      "Creative resume: video editing, cinematography, motion graphics, content creation and the tools used day to day.",
    skills: [
      "Adobe Premiere Pro",
      "After Effects",
      "DaVinci Resolve",
      "Lightroom",
      "Photoshop",
      "Colour Grading",
      "Sound Design",
      "Cinematography",
    ],
  },
};

export type PortfolioProject = {
  title: string;
  description: string;
  link: string;
  tech: string[];
  track: Track;
};

export const PROJECTS: PortfolioProject[] = [
  {
    title: "Pandit Studio",
    description:
      "Live client website — online pandit booking platform with service catalogue, booking flow and verified profiles.",
    link: "https://panditstudio.in",
    tech: ["React", "TypeScript", "Tailwind"],
    track: "fullstack",
  },
  {
    title: "0xStudio",
    description:
      "Live client website — design + engineering studio site with editorial typography, case-study grid and motion-first UI.",
    link: "https://0xstudio.in",
    tech: ["React", "TypeScript", "Motion"],
    track: "fullstack",
  },
  {
    title: "COOKIE",
    description:
      "Creative web project with innovative design patterns and interactive cookie-themed UI.",
    link: "https://github.com/Santoshverma77/COOKIE",
    tech: ["HTML", "CSS", "JavaScript"],
    track: "fullstack",
  },
  {
    title: "E-Com Website",
    description: "Full-featured e-commerce platform with product catalog, cart, and responsive UI.",
    link: "https://github.com/Santoshverma77/e-com-website",
    tech: ["React", "Node.js", "MongoDB"],
    track: "fullstack",
  },
  {
    title: "Expense Management",
    description: "Track and manage expenses with an intuitive dashboard, charts, and analytics.",
    link: "https://github.com/Santoshverma77/expense-management-system-main",
    tech: ["JavaScript", "Chart.js", "LocalStorage"],
    track: "fullstack",
  },
  {
    title: "Quizller",
    description: "Interactive quiz application with categories, scoring, and timed challenges.",
    link: "https://github.com/Santoshverma77/Quizller-project",
    tech: ["React", "TypeScript", "Tailwind"],
    track: "fullstack",
  },
  {
    title: "Phishing Detection",
    description: "Browser extension that detects phishing sites with ML and URL analysis.",
    link: "https://github.com/Santoshverma77/phishing-detection-extension",
    tech: ["JavaScript", "ML", "Chrome API"],
    track: "fullstack",
  },
  {
    title: "Tic Tac Toe",
    description: "Classic game with a modern implementation, AI opponent, and clean animations.",
    link: "https://github.com/Santoshverma77/tic_tac_toe_game",
    tech: ["HTML", "CSS", "JavaScript"],
    track: "fullstack",
  },
  {
    title: "Cinematic Travel Reel",
    description:
      "Story-driven travel edit with beat-matched cuts, speed ramps and cinematic colour grading.",
    link: "https://www.instagram.com/reel/DSBgbC2k66I/",
    tech: ["Premiere Pro", "Colour Grading", "Sound Design"],
    track: "video",
  },
  {
    title: "Portrait & Lifestyle Photography",
    description:
      "Portrait and lifestyle sets shot and retouched with a warm, filmic look for social delivery.",
    link: "https://www.instagram.com/p/DZUZeGvE_QT/",
    tech: ["Lightroom", "Photoshop", "Retouching"],
    track: "video",
  },
  {
    title: "Promotional Brand Reel",
    description: "Short-form promo cut for a brand launch — motion titles, product beats, punchy pacing.",
    link: "https://www.instagram.com/reel/DRG6u9lE9Hq/",
    tech: ["After Effects", "Motion Graphics", "Premiere Pro"],
    track: "video",
  },
  {
    title: "Travel Vlog Series",
    description:
      "Episodic vlog series with location B-roll, voiceover mixing and consistent series grading.",
    link: "https://www.instagram.com/reel/DZ_4y2CzfLa/",
    tech: ["Premiere Pro", "DaVinci Resolve", "Editing"],
    track: "video",
  },
];
