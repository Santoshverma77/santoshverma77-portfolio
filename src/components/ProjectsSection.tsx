import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const SERIF = "'Cormorant Garamond', 'Times New Roman', serif";

const projects = [
  {
    title: "COOKIE",
    description:
      "A creative web project showcasing innovative design patterns and interactive cookie-themed UI elements.",
    link: "https://github.com/Santoshverma77/COOKIE",
    demo: "https://santoshverma77.github.io/COOKIE",
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "E-Com Website",
    description:
      "Full-featured e-commerce platform with modern UI/UX, product catalog, cart, and responsive design.",
    link: "https://github.com/Santoshverma77/e-com-website",
    demo: "https://santoshverma77.github.io/e-com-website",
    tech: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "Expense Management",
    description:
      "Track and manage expenses with intuitive dashboard, charts, and detailed financial analytics.",
    link: "https://github.com/Santoshverma77/expense-management-system-main",
    demo: "https://santoshverma77.github.io/expense-management-system-main",
    tech: ["JavaScript", "Chart.js", "LocalStorage"],
  },
  {
    title: "Quizller",
    description:
      "Interactive quiz application with multiple categories, scoring system, and timed challenges.",
    link: "https://github.com/Santoshverma77/Quizller-project",
    demo: "https://santoshverma77.github.io/Quizller-project",
    tech: ["React", "TypeScript", "Tailwind"],
  },
  {
    title: "Phishing Detection",
    description:
      "Browser extension for detecting phishing websites using ML algorithms and URL analysis.",
    link: "https://github.com/Santoshverma77/phishing-detection-extension",
    demo: null,
    tech: ["JavaScript", "ML", "Chrome API"],
  },
  {
    title: "Tic Tac Toe",
    description:
      "Classic game with modern implementation, AI opponent, and refined micro-animations.",
    link: "https://github.com/Santoshverma77/tic_tac_toe_game",
    demo: "https://santoshverma77.github.io/tic_tac_toe_game",
    tech: ["HTML", "CSS", "JavaScript"],
  },
];

const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Eyebrow */}
        <div
          className={`flex items-center gap-4 mb-3 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <span className="text-[10px] tracking-[0.45em] uppercase text-foreground/45">
            Selected
          </span>
          <div className="h-px w-12 bg-foreground/20" />
        </div>

        {/* Title */}
        <h2
          className={`text-[44px] md:text-6xl lg:text-7xl font-light tracking-tight leading-[1] mb-16 md:mb-20 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ fontFamily: SERIF }}
        >
          Recent <span className="italic text-foreground/70">works</span>
        </h2>

        {/* Editorial list of projects */}
        <ul className="divide-y divide-foreground/10 border-y border-foreground/10">
          {projects.map((p, index) => (
            <li
              key={p.title}
              className={`group transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${150 + index * 80}ms` }}
            >
              <a
                href={p.demo || p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="grid grid-cols-12 items-center gap-4 py-6 md:py-8 relative"
              >
                {/* Hover sweep */}
                <span className="pointer-events-none absolute inset-x-0 inset-y-0 bg-foreground/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <span className="col-span-1 text-[11px] tracking-[0.3em] text-foreground/35 tabular-nums relative">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3
                  className="col-span-6 md:col-span-4 text-2xl md:text-3xl font-light tracking-tight relative transition-transform duration-500 group-hover:-translate-y-0.5"
                  style={{ fontFamily: SERIF }}
                >
                  {p.title}
                </h3>

                <p className="hidden md:block col-span-4 text-sm text-foreground/55 leading-relaxed relative pr-4">
                  {p.description}
                </p>

                <div className="hidden md:flex col-span-2 flex-wrap gap-1.5 justify-end relative">
                  {p.tech.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] tracking-[0.15em] uppercase px-2 py-1 border border-foreground/15 text-foreground/55 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <span className="col-span-5 md:col-span-1 flex justify-end relative">
                  <ArrowUpRight className="w-5 h-5 text-foreground/40 transition-all duration-500 group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div
          className={`mt-12 flex items-center justify-between transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <p className="text-sm text-foreground/50">
            More on{" "}
            <a
              href="https://github.com/Santoshverma77"
              target="_blank"
              rel="noopener noreferrer"
              className="italic text-foreground/80 hover:text-foreground underline-offset-4 hover:underline"
              style={{ fontFamily: SERIF }}
            >
              GitHub
            </a>
            .
          </p>
          <span
            className="italic text-foreground/30 text-2xl md:text-3xl"
            style={{ fontFamily: SERIF }}
          >
            ({projects.length})
          </span>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
