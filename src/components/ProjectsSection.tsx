import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "COOKIE",
    emoji: "🍪",
    description: "A creative web project showcasing innovative design patterns.",
    link: "https://github.com/Santoshverma77/COOKIE",
    color: "from-amber-500 to-orange-600",
  },
  {
    title: "E-Com Website",
    emoji: "🛒",
    description: "Full-featured e-commerce platform with modern UI/UX.",
    link: "https://github.com/Santoshverma77/e-com-website",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Expense Management System",
    emoji: "💼",
    description: "Track and manage expenses with intuitive dashboard.",
    link: "https://github.com/Santoshverma77/expense-management-system-main",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Quizller Project",
    emoji: "❓",
    description: "Interactive quiz application with scoring system.",
    link: "https://github.com/Santoshverma77/Quizller-project",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Phishing Detection Extension",
    emoji: "🛡️",
    description: "Browser extension for detecting phishing websites.",
    link: "https://github.com/Santoshverma77/phishing-detection-extension",
    color: "from-red-500 to-rose-500",
  },
  {
    title: "Tic Tac Toe Game",
    emoji: "❌",
    description: "Classic game with modern implementation.",
    link: "https://github.com/Santoshverma77/tic_tac_toe_game",
    color: "from-indigo-500 to-violet-500",
  },
];

const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div
          className={`flex items-center gap-4 mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="w-16 h-1 bg-gradient-fire" />
          <h2 className="font-naruto text-5xl md:text-6xl text-gradient-fire">
            PROJECTS
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group relative transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="card-scroll rounded-2xl p-6 h-full hover:scale-105 transition-transform duration-300">
                {/* Emoji Header */}
                <div className="text-5xl mb-4">{project.emoji}</div>

                {/* Title */}
                <h3 className="font-naruto text-2xl text-foreground mb-3 group-hover:text-gradient-fire transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground mb-6 line-clamp-2">
                  {project.description}
                </p>

                {/* Link Button */}
                <Button variant="outline" size="sm" asChild className="group/btn">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Repo
                    <svg
                      className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </Button>

                {/* Gradient Border on Hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-fire opacity-0 group-hover:opacity-100 -z-10 blur-xl transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
