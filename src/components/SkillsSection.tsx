import { useEffect, useRef, useState } from "react";

const skills = [
  { name: "Java", level: 90, category: "Language" },
  { name: "JavaScript", level: 85, category: "Language" },
  { name: "Python", level: 80, category: "Language" },
  { name: "React", level: 85, category: "Frontend" },
  { name: "Node.js", level: 80, category: "Backend" },
  { name: "Spring Boot", level: 75, category: "Backend" },
  { name: "MongoDB", level: 75, category: "Database" },
  { name: "MySQL", level: 80, category: "Database" },
  { name: "Git", level: 85, category: "Tools" },
  { name: "REST APIs", level: 85, category: "Backend" },
  { name: "DSA", level: 80, category: "Core" },
  { name: "HTML / CSS", level: 90, category: "Frontend" },
];

const SERIF = "'Cormorant Garamond', 'Times New Roman', serif";

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
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
            Know
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
          My <span className="italic text-foreground/70">skillset</span>
        </h2>

        {/* Editorial list */}
        <ul className="divide-y divide-foreground/10 border-y border-foreground/10">
          {skills.map((skill, index) => (
            <li
              key={skill.name}
              className={`group grid grid-cols-12 items-center gap-4 py-5 md:py-6 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
              style={{ transitionDelay: `${150 + index * 60}ms` }}
            >
              <span className="col-span-1 text-[11px] tracking-[0.3em] text-foreground/35 tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span
                className="col-span-5 md:col-span-4 text-xl md:text-2xl font-light tracking-tight"
                style={{ fontFamily: SERIF }}
              >
                {skill.name}
              </span>

              <span className="col-span-3 md:col-span-2 text-[10px] tracking-[0.3em] uppercase text-foreground/45">
                {skill.category}
              </span>

              <div className="col-span-2 md:col-span-4 h-px bg-foreground/10 relative overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-foreground/70 transition-all duration-[1200ms] ease-out"
                  style={{
                    width: isVisible ? `${skill.level}%` : "0%",
                    transitionDelay: `${400 + index * 60}ms`,
                  }}
                />
              </div>

              <span
                className="col-span-1 text-right text-sm tabular-nums text-foreground/60"
                style={{ fontFamily: SERIF }}
              >
                {skill.level}
              </span>
            </li>
          ))}
        </ul>

        {/* Footer note */}
        <p
          className={`mt-10 text-sm text-foreground/50 transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Also fluent with{" "}
          <span className="italic text-foreground/80" style={{ fontFamily: SERIF }}>
            Express · DevOps · SQL · TypeScript
          </span>
          .
        </p>
      </div>
    </section>
  );
};

export default SkillsSection;
