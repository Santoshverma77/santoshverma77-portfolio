import { useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useReveal, revealStyle } from "@/hooks/useReveal";

const projects = [
  {
    title: "COOKIE",
    description: "Creative web project with innovative design patterns and interactive cookie-themed UI.",
    link: "https://github.com/Santoshverma77/COOKIE",
    demo: "https://santoshverma77.github.io/COOKIE",
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "E-Com Website",
    description: "Full-featured e-commerce platform with product catalog, cart, and responsive UI.",
    link: "https://github.com/Santoshverma77/e-com-website",
    demo: "https://santoshverma77.github.io/e-com-website",
    tech: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "Expense Management",
    description: "Track and manage expenses with an intuitive dashboard, charts, and analytics.",
    link: "https://github.com/Santoshverma77/expense-management-system-main",
    demo: "https://santoshverma77.github.io/expense-management-system-main",
    tech: ["JavaScript", "Chart.js", "LocalStorage"],
  },
  {
    title: "Quizller",
    description: "Interactive quiz application with multiple categories, scoring, and timed challenges.",
    link: "https://github.com/Santoshverma77/Quizller-project",
    demo: "https://santoshverma77.github.io/Quizller-project",
    tech: ["React", "TypeScript", "Tailwind"],
  },
  {
    title: "Phishing Detection",
    description: "Browser extension that detects phishing sites with ML and URL analysis.",
    link: "https://github.com/Santoshverma77/phishing-detection-extension",
    demo: null,
    tech: ["JavaScript", "ML", "Chrome API"],
  },
  {
    title: "Tic Tac Toe",
    description: "Classic game with a modern implementation, AI opponent, and clean animations.",
    link: "https://github.com/Santoshverma77/tic_tac_toe_game",
    demo: "https://santoshverma77.github.io/tic_tac_toe_game",
    tech: ["HTML", "CSS", "JavaScript"],
  },
];

const ProjectsSection = () => {
  const { ref, visible } = useReveal<HTMLElement>(0.1);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative bg-[#0a0a0a] text-white py-24 md:py-32 overflow-hidden border-t border-white/5"
    >
      <div className="mx-auto w-full max-w-6xl px-6 md:px-12">
        <SectionHeader eyebrow="Projects" title="Selected" italic="works" visible={visible} />

        <ul className="divide-y divide-white/10 border-y border-white/10">
          {projects.map((p, i) => (
            <li
              key={p.title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={revealStyle(visible, i, 80)}
            >
              <a
                href={p.demo ?? p.link}
                target="_blank"
                rel="noopener noreferrer"
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
                      hovered === i ? "text-white translate-x-0.5 -translate-y-0.5" : ""
                    }`}
                  />
                </div>

                <div className="col-span-12 md:hidden flex items-center gap-3 text-xs text-white/40 mt-2">
                  <span>{p.tech.join(" · ")}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-auto" />
                </div>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex items-center gap-3" style={revealStyle(visible, projects.length, 80)}>
          <a
            href="https://github.com/Santoshverma77"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 text-sm text-white/80 hover:text-white hover:border-white/50 transition-all"
          >
            <Github className="w-4 h-4" />
            More on GitHub
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
