import { useEffect, useRef, useState } from "react";

const skills = [
  { name: "Java", level: 90, category: "language" },
  { name: "JavaScript", level: 85, category: "language" },
  { name: "Python", level: 80, category: "language" },
  { name: "React", level: 85, category: "frontend" },
  { name: "Node.js", level: 80, category: "backend" },
  { name: "Spring Boot", level: 75, category: "backend" },
  { name: "MongoDB", level: 75, category: "database" },
  { name: "MySQL", level: 80, category: "database" },
  { name: "Git", level: 85, category: "tools" },
  { name: "REST APIs", level: 85, category: "backend" },
  { name: "DSA", level: 80, category: "core" },
  { name: "HTML/CSS", level: 90, category: "frontend" },
];

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-[600px] bg-gradient-to-l from-secondary/10 to-transparent blur-3xl" />

      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div
          className={`flex items-center gap-4 mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="w-16 h-1 bg-gradient-fire" />
          <h2 className="font-naruto text-5xl md:text-6xl text-gradient-fire">
            SKILLS & JUTSU
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className={`card-scroll rounded-xl p-6 transition-all duration-700 hover:scale-105 hover:glow-fire ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-foreground">{skill.name}</span>
                <span className="text-primary font-naruto text-lg">{skill.level}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-fire rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: isVisible ? `${skill.level}%` : "0%",
                    transitionDelay: `${index * 100 + 300}ms`,
                  }}
                />
              </div>
              <div className="mt-2 text-xs text-muted-foreground capitalize">
                {skill.category}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Text */}
        <div
          className={`mt-12 text-center transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-muted-foreground">
            Also experienced with: <span className="text-primary">Express.js</span>, <span className="text-secondary">DevOps Basics</span>, <span className="text-accent">SQL</span>, and more...
          </p>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
