import { useEffect, useRef, useState } from "react";

const experiences = [
  {
    title: "Google Student Ambassador",
    company: "Google",
    duration: "Aug 2025 - Present",
    description: "Selected through a competitive national process to represent Google's AI and Gemini initiatives on campus. Planned and hosted AI-focused workshops, hands-on demos, and innovation discussions. Partnered with college fests, tech clubs, and student communities to drive awareness and adoption of AI tools.",
    icon: "🔍",
    color: "from-primary to-accent",
  },
  {
    title: "Volunteer & Head of Partnerships",
    company: "Google Developer Group Ranchi",
    duration: "Jul 2025 - Present",
    description: "Leading sponsorship research, strategy, and partner relations for GDG Ranchi. Previously served as Sponsorship Coordinator, building strong relationships with sponsors and partners for community events.",
    icon: "🌟",
    color: "from-primary to-accent",
  },
  {
    title: "Head of Sponsorship",
    company: "DevSphereIndia",
    duration: "Sep 2025 - Present",
    description: "Managing sponsorship research, strategy, and executive sponsorship relations. Building partnerships and securing funding for developer community initiatives across India.",
    icon: "💼",
    color: "from-primary to-accent",
  },
  {
    title: "Event & Sponsorship Coordinator",
    company: "Codllers",
    duration: "Nov 2025 - Present",
    description: "Coordinating events and managing sponsorships. Handling event planning, sales, and communication with stakeholders for successful event execution.",
    icon: "🎯",
    color: "from-primary to-accent",
  },
  {
    title: "Event & Sponsorship Coordinator",
    company: "Genesis",
    duration: "Nov 2025 - Present",
    description: "Leading event coordination and sponsorship efforts. Managing end-to-end event planning and building sponsor relationships for tech events.",
    icon: "⚡",
    color: "from-primary to-accent",
  },
  {
    title: "Tech Contributor",
    company: "Open Source Connect",
    duration: "Jul 2025 - Present",
    description: "Contributing to open source projects and collaborating with the developer community to build impactful solutions.",
    icon: "💻",
    color: "from-primary to-accent",
  },
  {
    title: "Team Contributor",
    company: "GirlScript Summer of Code",
    duration: "Jul 2025 - Present",
    description: "Contributing to open source projects as part of GirlScript Summer of Code, collaborating with developers worldwide on impactful projects.",
    icon: "👩‍💻",
    color: "from-primary to-accent",
  },
  {
    title: "Member",
    company: "Web3JH",
    duration: "Jul 2025 - Present",
    description: "Active member of Web3JH community, exploring blockchain technologies and decentralized applications.",
    icon: "🔗",
    color: "from-primary to-accent",
  },
  {
    title: "SIGMA 7.0 Batch Student",
    company: "Apna College",
    duration: "Mar 2025 - Present",
    description: "Learning DSA using Java and full stack web development. On the journey to becoming a skilled software developer with expertise in Java, JavaScript, and modern frameworks.",
    icon: "📚",
    color: "from-primary to-accent",
  },
  {
    title: "Marketing Manager",
    company: "YRI",
    duration: "Sep 2025 - Nov 2025",
    description: "Managed strategic marketing, operations, sales, and retail marketing initiatives. Led marketing campaigns and coordinated with teams for business growth.",
    icon: "📈",
    color: "from-primary to-accent",
  },
  {
    title: "Java Full Stack Developer Intern",
    company: "Zidio Development",
    duration: "Mar 2025 - Apr 2025",
    description: "Completed intensive Java Full Stack training covering Core Java, React/Angular, Spring Boot, SQL/MySQL, RESTful APIs, Git, and DevOps practices.",
    icon: "☕",
    color: "from-primary to-accent",
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
                  <p className="text-secondary text-sm mt-0.5">{exp.duration}</p>
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
