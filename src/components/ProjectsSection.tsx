import { useState } from "react";
import { ArrowUpRight, Github, Instagram } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useReveal, revealStyle } from "@/hooks/useReveal";
import { SOCIALS } from "@/lib/links";

type Project = {
  title: string;
  description: string;
  link: string;
  tech: string[];
};

type Track = {
  id: "fullstack" | "video";
  label: string;
  blurb: string;
  ctaLabel: string;
  ctaHref: string;
  projects: Project[];
};

const TRACKS: Track[] = [
  {
    id: "fullstack",
    label: "Full-Stack Development",
    blurb:
      "Engineering work — web apps, tooling and experiments built with React, Node and modern JavaScript.",
    ctaLabel: "More on GitHub",
    ctaHref: SOCIALS.github,
    projects: [
      {
        title: "COOKIE",
        description:
          "Creative web project with innovative design patterns and interactive cookie-themed UI.",
        link: "https://github.com/Santoshverma77/COOKIE",
        tech: ["HTML", "CSS", "JavaScript"],
      },
      {
        title: "E-Com Website",
        description: "Full-featured e-commerce platform with product catalog, cart, and responsive UI.",
        link: "https://github.com/Santoshverma77/e-com-website",
        tech: ["React", "Node.js", "MongoDB"],
      },
      {
        title: "Expense Management",
        description: "Track and manage expenses with an intuitive dashboard, charts, and analytics.",
        link: "https://github.com/Santoshverma77/expense-management-system-main",
        tech: ["JavaScript", "Chart.js", "LocalStorage"],
      },
      {
        title: "Quizller",
        description: "Interactive quiz application with multiple categories, scoring, and timed challenges.",
        link: "https://github.com/Santoshverma77/Quizller-project",
        tech: ["React", "TypeScript", "Tailwind"],
      },
      {
        title: "Phishing Detection",
        description: "Browser extension that detects phishing sites with ML and URL analysis.",
        link: "https://github.com/Santoshverma77/phishing-detection-extension",
        tech: ["JavaScript", "ML", "Chrome API"],
      },
      {
        title: "Tic Tac Toe",
        description: "Classic game with a modern implementation, AI opponent, and clean animations.",
        link: "https://github.com/Santoshverma77/tic_tac_toe_game",
        tech: ["HTML", "CSS", "JavaScript"],
      },
    ],
  },
  {
    id: "video",
    label: "Video Editing & Creative",
    blurb:
      "Creative work — cinematic reels, travel stories, brand promos and photography, edited end to end.",
    ctaLabel: "More on Instagram",
    ctaHref: SOCIALS.instagramCreative,
    projects: [
      {
        title: "Cinematic Travel Reel",
        description:
          "Story-driven travel edit with beat-matched cuts, speed ramps and cinematic colour grading.",
        link: "https://www.instagram.com/reel/DSBgbC2k66I/",
        tech: ["Premiere Pro", "Colour Grading", "Sound Design"],
      },
      {
        title: "Portrait & Lifestyle Photography",
        description:
          "Portrait and lifestyle sets shot and retouched with a warm, filmic look for social delivery.",
        link: "https://www.instagram.com/p/DZUZeGvE_QT/",
        tech: ["Lightroom", "Photoshop", "Retouching"],
      },
      {
        title: "Promotional Brand Reel",
        description:
          "Short-form promo cut for brand launch — motion titles, product beats and punchy pacing.",
        link: "https://www.instagram.com/reel/DRG6u9lE9Hq/",
        tech: ["After Effects", "Motion Graphics", "Premiere Pro"],
      },
      {
        title: "Travel Vlog Series",
        description:
          "Episodic vlog series with location B-roll, voiceover mixing and consistent series grading.",
        link: "https://www.instagram.com/reel/DZ_4y2CzfLa/",
        tech: ["Premiere Pro", "DaVinci Resolve", "Editing"],
      },
    ],
  },
];

const ProjectsSection = () => {
  const { ref, visible } = useReveal<HTMLElement>(0.1);
  const [hovered, setHovered] = useState<string | null>(null);
  const [trackId, setTrackId] = useState<Track["id"]>("fullstack");
  const track = TRACKS.find((t) => t.id === trackId) ?? TRACKS[0];

  return (
    <section
      id="projects"
      ref={ref}
      className="relative bg-[#0a0a0a] text-white py-24 md:py-32 overflow-hidden border-t border-white/5"
    >
      <div className="mx-auto w-full max-w-6xl px-6 md:px-12">
        <SectionHeader eyebrow="Projects" title="Selected" italic="works" visible={visible} />

        {/* Track switcher — matches the two resume tracks */}
        <div
          className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
          style={revealStyle(visible, 0, 80)}
        >
          <div
            role="tablist"
            aria-label="Project track"
            className="inline-flex flex-wrap gap-1 p-1 rounded-full border border-white/15 bg-white/[0.03]"
          >
            {TRACKS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={t.id === trackId}
                onClick={() => setTrackId(t.id)}
                className={`px-4 py-2 rounded-full text-xs md:text-sm transition-all ${
                  t.id === trackId
                    ? "bg-white text-black"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <p className="max-w-md text-sm text-white/45 leading-relaxed">{track.blurb}</p>
        </div>

        <ul key={track.id} className="divide-y divide-white/10 border-y border-white/10">
          {track.projects.map((p, i) => {
            const key = `${track.id}-${p.title}`;
            return (
              <li key={key} onMouseEnter={() => setHovered(key)} onMouseLeave={() => setHovered(null)}>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="group grid grid-cols-12 items-baseline gap-4 py-6 md:py-8 transition-colors"
                >
                  <span
                    className="col-span-1 text-white/30 text-sm tabular-nums"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    0{i + 1}
                  </span>

                  <div className="col-span-11 md:col-span-5">
                    <h3
                      className="text-2xl md:text-3xl font-light text-white transition-colors group-hover:italic"
                      style={{ fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}
                    >
                      {p.title}
                    </h3>
                  </div>

                  <p className="hidden md:block col-span-4 text-sm text-white/50 leading-relaxed">
                    {p.description}
                  </p>

                  <div className="hidden md:flex col-span-2 justify-end items-center gap-3 text-white/40 text-xs">
                    <span className="opacity-60">{p.tech[0]}</span>
                    <ArrowUpRight
                      className={`w-4 h-4 transition-all duration-300 ${
                        hovered === key ? "text-white translate-x-0.5 -translate-y-0.5" : ""
                      }`}
                    />
                  </div>

                  <div className="col-span-12 md:hidden flex items-center gap-3 text-xs text-white/40 mt-2">
                    <span>{p.tech.join(" · ")}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-auto" />
                  </div>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 flex items-center gap-3">
          <a
            href={track.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="no-referrer"
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 text-sm text-white/80 hover:text-white hover:border-white/50 transition-all"
          >
            {track.id === "fullstack" ? (
              <Github className="w-4 h-4" />
            ) : (
              <Instagram className="w-4 h-4" />
            )}
            {track.ctaLabel}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
