import { useEffect, useRef, useState } from "react";

const experiences = [
  {
    title: "Google Student Ambassador",
    company: "Google",
    description: "Representing Google technologies and building student communities.",
    icon: "🌟",
    color: "from-blue-500 to-green-500",
  },
  {
    title: "Head of Partnerships",
    company: "GDG Ranchi",
    description: "Leading partnership initiatives and community engagement.",
    icon: "🤝",
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Java Full Stack Intern",
    company: "Zidio Development",
    description: "Developing full-stack applications using Java and modern frameworks.",
    icon: "💻",
    color: "from-purple-500 to-pink-500",
  },
];

const ExperienceSection = () => {
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
      id="experience"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-[500px] bg-gradient-to-r from-secondary/10 to-transparent blur-3xl" />

      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div
          className={`flex items-center gap-4 mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="w-16 h-1 bg-gradient-fire" />
          <h2 className="font-naruto text-5xl md:text-6xl text-gradient-fire">
            EXPERIENCE
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent hidden md:block" />

          {/* Experience Cards */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={exp.title}
                className={`relative flex items-start gap-6 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Timeline Dot */}
                <div className="relative z-10 hidden md:flex">
                  <div className="w-16 h-16 rounded-full bg-gradient-fire flex items-center justify-center text-2xl animate-pulse-glow">
                    {exp.icon}
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1 card-scroll rounded-2xl p-6 md:p-8 hover:scale-[1.02] transition-transform duration-300 group">
                  <div className="flex items-start gap-4 md:hidden mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-fire flex items-center justify-center text-xl">
                      {exp.icon}
                    </div>
                  </div>
                  
                  <h3 className="font-naruto text-2xl md:text-3xl text-foreground group-hover:text-gradient-fire transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-primary font-bold mt-1">{exp.company}</p>
                  <p className="text-muted-foreground mt-3">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
