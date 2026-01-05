import { useEffect, useRef, useState } from "react";
import { Instagram, Twitter, MapPin, GraduationCap, Trophy, Award } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

const education = [
  {
    institution: "Indian Institute of Technology, Madras",
    degree: "Bachelor of Science - BS, Data Science & AI",
    period: "Aug 2025",
    skills: ["Data Science", "Computational Thinking"],
    current: true,
  },
  {
    institution: "S.M. Arya Public School",
    degree: "CLASS 12th, Mathematics and Computer Science",
    period: "May 2021 - Jun 2023",
    activities: ["Cricket", "Chess", "Atal Tinkering Lab Project"],
  },
  {
    institution: "Saraswati Shishu Vidya Mandir, Giridih, Jharkhand",
    degree: "Class 8-10",
    period: "Mar 2018 - Mar 2021",
    grade: "A",
  },
];

const awards = [
  {
    title: "Logistic Legend Award – DevFest Ranchi 2025",
    issuer: "Google Developer Groups (GDG) Ranchi",
    date: "Oct 2025",
    description: "Awarded for exceptional contribution to event logistics and operations at DevFest Ranchi 2025.",
    icon: "🏆",
  },
  {
    title: "Winner – HACKED 3.0 Hackathon (1st Prize)",
    issuer: "BML Munjal University (BMU)",
    date: "Mar 2025",
    description: "Secured 1st Prize at HACKED 3.0, a 36-hour national-level hackathon. Won ₹25,000 competing against 60+ teams.",
    icon: "🥇",
  },
  {
    title: "Second Prize – State-Level Gyan Vigyan Mela",
    issuer: "Vidya Vikas Samiti, Jharkhand",
    date: "Oct 2018",
    description: "Secured Second Prize at the State-Level Science Exhibition representing Saraswati Shishu Vidya Mandir.",
    icon: "🥈",
  },
];

const AboutSection = () => {
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
      id="about"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div
          className={`flex items-center gap-4 mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="w-16 h-1 bg-gradient-fire" />
          <h2 className="font-naruto text-5xl md:text-6xl text-gradient-fire">
            ABOUT ME
          </h2>
        </div>

        {/* Content */}
        <div
          className={`grid md:grid-cols-12 gap-12 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Profile Picture with Anime Frame */}
          <div className="md:col-span-4 flex flex-col items-center gap-6">
            <div className="relative group">
              {/* Outer rotating ring */}
              <div className="absolute -inset-4 rounded-full border-2 border-dashed border-primary/30 animate-spin" 
                   style={{ animationDuration: "20s" }} />
              
              {/* Chakra glow effect */}
              <div className="absolute -inset-2 rounded-full bg-gradient-fire opacity-50 blur-xl animate-pulse" />
              
              {/* Anime-style frame */}
              <div className="relative w-64 h-64 md:w-72 md:h-72">
                {/* Corner accents */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg" />
                <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg" />
                <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg" />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg" />
                
                {/* Main image container */}
                <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-primary/50 bg-gradient-to-br from-primary/20 to-secondary/20">
                  <img 
                    src={profilePhoto} 
                    alt="Santosh Kumar Verma" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Floating particles */}
                <div className="absolute top-0 left-0 w-2 h-2 bg-primary rounded-full animate-float opacity-70" />
                <div className="absolute bottom-4 right-0 w-1.5 h-1.5 bg-secondary rounded-full animate-float opacity-60" 
                     style={{ animationDelay: "0.5s" }} />
                <div className="absolute top-1/2 -right-4 w-2 h-2 bg-accent rounded-full animate-float opacity-50" 
                     style={{ animationDelay: "1s" }} />
              </div>
            </div>

            {/* Location Info */}
            <div className="text-center space-y-2 mt-4">
              <div className="flex items-center justify-center gap-2 text-primary">
                <MapPin className="w-4 h-4" />
                <span className="font-semibold">Current Location</span>
              </div>
              <p className="text-muted-foreground">New Delhi, Delhi</p>
              <div className="flex items-center justify-center gap-2 text-secondary mt-2">
                <MapPin className="w-4 h-4" />
                <span className="font-semibold">Hometown</span>
              </div>
              <p className="text-muted-foreground">Giridih, Jharkhand</p>
            </div>
          </div>

          {/* About Text */}
          <div className="md:col-span-8 space-y-6">
            <h3 className="font-naruto text-3xl text-foreground">
              Hello! I'm <span className="text-gradient-fire">Santosh Kumar Verma</span> 👋
            </h3>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a <span className="text-primary font-semibold">BS in Data Science student at IIT Madras</span>, 
              deeply passionate about Artificial Intelligence, Full-Stack Development, and Visual Storytelling 
              through Photography & Videography.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Currently enrolled in <span className="text-secondary">Apna College's Sigma 7.0</span> and{" "}
              <span className="text-secondary">Harkirat Singh's Cohort 4.0</span>, I'm honing my skills 
              in Java, Data Structures & Algorithms (DSA), and MERN Stack Development to build optimized and scalable solutions.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              As a <span className="text-primary">Core Team Member at GDG Ranchi</span> and an active contributor 
              to various tech communities, I thrive on collaboration, knowledge sharing, and empowering fellow developers.
            </p>

            {/* Education Section */}
            <div className="pt-6">
              <h4 className="font-naruto text-xl text-primary mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Education
              </h4>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div 
                    key={index}
                    className="card-scroll rounded-xl p-4 border border-primary/20 hover:border-primary/40 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h5 className="font-semibold text-foreground flex items-center gap-2">
                          {edu.institution}
                          {edu.current && (
                            <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                              Current
                            </span>
                          )}
                        </h5>
                        <p className="text-muted-foreground text-sm">{edu.degree}</p>
                        <p className="text-xs text-muted-foreground/70 mt-1">{edu.period}</p>
                        {edu.skills && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {edu.skills.map((skill) => (
                              <span key={skill} className="text-xs bg-secondary/20 text-secondary px-2 py-0.5 rounded-full">
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                        {edu.activities && (
                          <p className="text-xs text-muted-foreground mt-2">
                            <span className="text-secondary">Activities:</span> {edu.activities.join(", ")}
                          </p>
                        )}
                        {edu.grade && (
                          <p className="text-xs text-muted-foreground mt-2">
                            <span className="text-primary">Grade:</span> {edu.grade}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Honors & Awards Section */}
            <div className="pt-6">
              <h4 className="font-naruto text-xl text-secondary mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Honors & Awards
              </h4>
              <div className="space-y-4">
                {awards.map((award, index) => (
                  <div 
                    key={index}
                    className="card-scroll rounded-xl p-4 border border-secondary/20 hover:border-secondary/40 transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl group-hover:scale-110 transition-transform">
                        {award.icon}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-foreground">{award.title}</h5>
                        <p className="text-sm text-primary">{award.issuer} · {award.date}</p>
                        <p className="text-sm text-muted-foreground mt-2">{award.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What I Do */}
            <div className="pt-4">
              <h4 className="font-naruto text-xl text-primary mb-4">🎯 What I Do:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Full-Stack Development (MERN Stack)",
                  "Data Science & Artificial Intelligence",
                  "Java & Data Structures & Algorithms",
                  "Photography & Videography",
                  "Tech Community Building",
                ].map((skill) => (
                  <div 
                    key={skill}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <span className="text-primary">▸</span>
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center">
                <div className="font-naruto text-4xl text-gradient-fire">10+</div>
                <div className="text-muted-foreground text-sm">Projects</div>
              </div>
              <div className="text-center">
                <div className="font-naruto text-4xl text-gradient-fire">25+</div>
                <div className="text-muted-foreground text-sm">Certifications</div>
              </div>
              <div className="text-center">
                <div className="font-naruto text-4xl text-gradient-fire">5+</div>
                <div className="text-muted-foreground text-sm">Communities</div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-6">
              <span className="text-muted-foreground text-sm">🤝 Let's Connect:</span>
              <a 
                href="https://www.instagram.com/santoshverma_77/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a 
                href="https://twitter.com/santoshverma_77" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Twitter className="w-5 h-5 text-background" />
              </a>
              <a 
                href="https://snapchat.com/add/santoshverma_77" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center hover:scale-110 transition-transform"
              >
                <span className="text-xl">👻</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
