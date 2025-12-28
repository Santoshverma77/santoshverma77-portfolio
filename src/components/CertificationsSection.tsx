import { useEffect, useRef, useState } from "react";

const certifications = [
  {
    name: "AWS Certifications",
    issuer: "Amazon Web Services",
    date: "Mar 2025",
    skills: ["Generative AI"],
    icon: "☁️",
  },
  {
    name: "Fundamental AI Concepts",
    issuer: "Microsoft Learning",
    date: "Mar 2025",
    skills: ["AI Concepts"],
    icon: "🧠",
  },
  {
    name: "Big Bull: Stock Trading Challenge",
    issuer: "Unstop",
    date: "Feb 2025",
    skills: ["Stock Trading"],
    icon: "📈",
  },
  {
    name: "HACK KRMU 4.0",
    issuer: "K.R. Mangalam University",
    date: "Feb 2025",
    skills: ["AI", "API"],
    icon: "🏆",
  },
  {
    name: "Tata Crucible Campus Quiz - Prelims",
    issuer: "Tata Group",
    date: "Feb 2025",
    skills: ["Analytical Thinking", "Problem Solving"],
    icon: "🎯",
  },
  {
    name: "CodeWizard'25 Participation",
    issuer: "Unstop",
    date: "Jan 2025",
    skills: ["Competitive Programming"],
    icon: "💻",
  },
  {
    name: "Hackdata '25 Participation",
    issuer: "Unstop",
    date: "Jan 2025",
    skills: ["Hackathon"],
    icon: "🚀",
  },
  {
    name: "DSA with Java Bootcamp",
    issuer: "LetsUpgrade",
    date: "Jan 2025",
    skills: ["DSA", "Core Java"],
    icon: "☕",
  },
  {
    name: "Generative Artificial Intelligence",
    issuer: "TRYST, IIT Delhi",
    date: "Jan 2025",
    skills: ["AI", "Generative AI"],
    icon: "🤖",
  },
  {
    name: "HTML & CSS Bootcamp",
    issuer: "LetsUpgrade",
    date: "Jan 2025",
    skills: ["HTML", "CSS"],
    icon: "🎨",
  },
  {
    name: "IOT Certification",
    issuer: "Sushant University",
    date: "Jan 2025",
    skills: ["Internet of Things"],
    icon: "📡",
  },
  {
    name: "Introduction To Image Generation",
    issuer: "Google",
    date: "Dec 2024",
    skills: ["Image Generation"],
    icon: "🖼️",
  },
  {
    name: "Apple Intelligence: First Look",
    issuer: "LinkedIn",
    date: "Nov 2024",
    skills: ["Generative AI", "AI Productivity"],
    icon: "🍎",
  },
  {
    name: "Build Your Own GPTs",
    issuer: "LinkedIn",
    date: "Nov 2024",
    skills: ["Chatbot Development"],
    icon: "💬",
  },
  {
    name: "Career Planning & Interview Prep",
    issuer: "Infosys Springboard",
    date: "Nov 2024",
    skills: ["Interview Preparation"],
    icon: "📋",
  },
  {
    name: "Java Programming Internship",
    issuer: "Intern Certify",
    date: "Nov 2024",
    skills: ["Java"],
    icon: "☕",
  },
  {
    name: "Deep Dive into AI & ML",
    issuer: "Scaler School of Technology",
    date: "Nov 2024",
    skills: ["AI", "Machine Learning"],
    icon: "🔬",
  },
  {
    name: "Introduction to AI",
    issuer: "Great Learning",
    date: "Nov 2024",
    skills: ["Artificial Intelligence"],
    icon: "🎓",
  },
  {
    name: "Introduction To Generative AI",
    issuer: "Google",
    date: "Oct 2024",
    skills: ["Generative AI"],
    icon: "✨",
  },
  {
    name: "MANN ki BAAT",
    issuer: "MyGov India",
    date: "Oct 2024",
    skills: ["Civic Engagement"],
    icon: "🇮🇳",
  },
  {
    name: "Cyber Hygiene - Password Security & MFA",
    issuer: "ISEA Stay Safe Online",
    date: "Sep 2024",
    skills: ["Cybersecurity"],
    icon: "🔐",
  },
  {
    name: "Cyber Hygiene - Phishing & Vishing",
    issuer: "ISEA Stay Safe Online",
    date: "Sep 2024",
    skills: ["Cybersecurity"],
    icon: "🛡️",
  },
  {
    name: "HTML AND CSS Module",
    issuer: "Newton School",
    date: "Sep 2024",
    skills: ["HTML", "CSS"],
    icon: "🌐",
  },
  {
    name: "Secure Social Media Practices",
    issuer: "ISEA Stay Safe Online",
    date: "Sep 2024",
    skills: ["Social Media Security"],
    icon: "📱",
  },
  {
    name: "Cyber Safe Challenge",
    issuer: "ISEA Stay Safe Online",
    date: "Sep 2023",
    skills: ["Quad Cyber Challenge"],
    icon: "🏅",
  },
  {
    name: "Vidya Vikas Samiti Jharkhand",
    issuer: "Vidya Bharati",
    date: "Oct 2018",
    skills: ["Academic Excellence"],
    icon: "📚",
  },
];

const CertificationsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);
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

  const displayedCerts = showAll ? certifications : certifications.slice(0, 8);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute right-0 bottom-0 w-1/2 h-[600px] bg-gradient-to-tl from-accent/10 to-transparent blur-3xl" />
      <div className="absolute left-0 top-1/4 w-1/3 h-[400px] bg-gradient-to-r from-primary/10 to-transparent blur-3xl" />

      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div
          className={`flex items-center justify-between mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-1 bg-gradient-fire" />
            <h2 className="font-naruto text-5xl md:text-6xl text-gradient-fire">
              CERTIFICATIONS
            </h2>
          </div>
          <div className="hidden md:block">
            <span className="text-4xl font-naruto text-gradient-sunset">{certifications.length}+</span>
            <span className="text-muted-foreground ml-2">Achievements</span>
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayedCerts.map((cert, index) => (
            <div
              key={cert.name + index}
              className={`group card-scroll rounded-xl p-5 transition-all duration-500 hover:scale-[1.03] hover:glow-fire cursor-default ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${(index % 8) * 50}ms` }}
            >
              {/* Icon & Date Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="text-3xl group-hover:scale-125 transition-transform duration-300">
                  {cert.icon}
                </div>
                <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                  {cert.date}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2 min-h-[48px]">
                {cert.name}
              </h3>

              {/* Issuer */}
              <p className="text-sm text-muted-foreground mb-3">
                {cert.issuer}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5">
                {cert.skills.slice(0, 2).map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full border border-primary/20"
                  >
                    {skill}
                  </span>
                ))}
                {cert.skills.length > 2 && (
                  <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-full">
                    +{cert.skills.length - 2}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {certifications.length > 8 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group flex items-center gap-2 px-8 py-3 border-2 border-primary/50 rounded-full text-foreground hover:bg-primary/10 hover:border-primary transition-all duration-300"
            >
              <span className="font-medium">
                {showAll ? "Show Less" : `Show All ${certifications.length} Certifications`}
              </span>
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CertificationsSection;
