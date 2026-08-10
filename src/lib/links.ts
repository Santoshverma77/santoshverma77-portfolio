// Centralized external links
const FULLSTACK_RESUME = "/resume-fullstack.pdf";
const VIDEO_RESUME = "/resume-video-editing.pdf";

export type ResumeVariant = {
  id: "fullstack" | "video";
  label: string;
  eyebrow: string;
  title: string;
  italic: string;
  description: string;
  url: string;
  previewUrl: string;
  fileName: string;
};

export const RESUMES: ResumeVariant[] = [
  {
    id: "fullstack",
    label: "Full-Stack Development",
    eyebrow: "PDF · Engineering",
    title: "Santosh Kumar Verma —",
    italic: "Full-Stack Developer",
    description:
      "Engineering resume: full-stack projects, languages, frameworks, open-source contributions, certifications and community leadership.",
    url: FULLSTACK_RESUME,
    previewUrl: `${FULLSTACK_RESUME}#view=FitH`,
    fileName: "Santosh-Verma-FullStack-Resume.pdf",
  },
  {
    id: "video",
    label: "Video Editing & Creative",
    eyebrow: "PDF · Creative",
    title: "Santosh Kumar Verma —",
    italic: "Video Editor & Creator",
    description:
      "Creative resume: video editing, cinematography, motion graphics, content creation and the tools I work with day to day.",
    url: VIDEO_RESUME,
    previewUrl: `${VIDEO_RESUME}#view=FitH`,
    fileName: "Santosh-Verma-Video-Editing-Resume.pdf",
  },
];

// Default (engineering) resume — kept for existing CTAs
export const RESUME_URL = RESUMES[0].url;
export const RESUME_PREVIEW_URL = RESUMES[0].previewUrl;


export const SOCIALS = {
  instagramCreative: "https://www.instagram.com/_insta.fx_/",
  instagramPersonal: "https://www.instagram.com/santoshverma_77/",
  github: "https://github.com/Santoshverma77",
  linkedin: "https://www.linkedin.com/in/santoshverma77/",
  email: "santoshskv2005@gmail.com",
  phone: "+917319662244",
  phoneDisplay: "+91 73196 62244",
};
