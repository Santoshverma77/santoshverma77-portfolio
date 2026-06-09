import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "COOKIE",
    emoji: "🍪",
    description: "A creative web project showcasing innovative design patterns and interactive cookie-themed UI elements.",
    link: "https://github.com/Santoshverma77/COOKIE",
    demo: "https://santoshverma77.github.io/COOKIE",
    color: "from-amber-500 to-orange-600",
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "E-Com Website",
    emoji: "🛒",
    description: "Full-featured e-commerce platform with modern UI/UX, product catalog, cart functionality, and responsive design.",
    link: "https://github.com/Santoshverma77/e-com-website",
    demo: "https://santoshverma77.github.io/e-com-website",
    color: "from-blue-500 to-cyan-500",
    tech: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "Expense Management System",
    emoji: "💼",
    description: "Track and manage expenses with intuitive dashboard, charts, and detailed financial analytics.",
    link: "https://github.com/Santoshverma77/expense-management-system-main",
    demo: "https://santoshverma77.github.io/expense-management-system-main",
    color: "from-green-500 to-emerald-500",
    tech: ["JavaScript", "Chart.js", "LocalStorage"],
  },
  {
    title: "Quizller Project",
    emoji: "❓",
    description: "Interactive quiz application with multiple categories, scoring system, and timed challenges.",
    link: "https://github.com/Santoshverma77/Quizller-project",
    demo: "https://santoshverma77.github.io/Quizller-project",
    color: "from-purple-500 to-pink-500",
    tech: ["React", "TypeScript", "Tailwind"],
  },
  {
    title: "Phishing Detection Extension",
    emoji: "🛡️",
    description: "Browser extension for detecting phishing websites using ML algorithms and URL analysis.",
    link: "https://github.com/Santoshverma77/phishing-detection-extension",
    demo: null,
    color: "from-red-500 to-rose-500",
    tech: ["JavaScript", "ML", "Chrome API"],
  },
  {
    title: "Tic Tac Toe Game",
    emoji: "❌",
    description: "Classic game with modern implementation, AI opponent, and beautiful animations.",
    link: "https://github.com/Santoshverma77/tic_tac_toe_game",
    demo: "https://santoshverma77.github.io/tic_tac_toe_game",
    color: "from-indigo-500 to-violet-500",
    tech: ["HTML", "CSS", "JavaScript"],
  },
];

const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="card-scroll rounded-2xl overflow-hidden h-full hover:scale-105 transition-transform duration-300">
                {/* Project Preview/Screenshot Area */}
                <div className={`relative h-40 bg-gradient-to-br ${project.color} flex items-center justify-center overflow-hidden`}>
                  <span className="text-7xl transform group-hover:scale-125 transition-transform duration-500">
                    {project.emoji}
                  </span>
                  
                  {/* Animated overlay on hover */}
                  <div className={`absolute inset-0 bg-background/90 flex items-center justify-center gap-3 transition-opacity duration-300 ${
                    hoveredIndex === index ? "opacity-100" : "opacity-0"
                  }`}>
                    <Button 
                      size="sm" 
                      className="bg-primary hover:bg-primary/80"
                      asChild
                    >
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        Code
                      </a>
                    </Button>
                    {project.demo && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        asChild
                      >
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="font-naruto text-2xl text-foreground mb-3 group-hover:text-gradient-fire transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

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
