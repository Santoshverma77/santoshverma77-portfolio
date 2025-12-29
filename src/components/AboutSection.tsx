import { useEffect, useRef, useState } from "react";

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
          <div className="md:col-span-4 flex justify-center">
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
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-naruto-dark to-background">
                    {/* Placeholder with Konoha symbol */}
                    <div className="text-center">
                      <div className="text-8xl mb-2">🍃</div>
                      <span className="font-naruto text-primary text-sm">SANTOSH</span>
                    </div>
                  </div>
                </div>
                
                {/* Floating particles */}
                <div className="absolute top-0 left-0 w-2 h-2 bg-primary rounded-full animate-float opacity-70" />
                <div className="absolute bottom-4 right-0 w-1.5 h-1.5 bg-secondary rounded-full animate-float opacity-60" 
                     style={{ animationDelay: "0.5s" }} />
                <div className="absolute top-1/2 -right-4 w-2 h-2 bg-accent rounded-full animate-float opacity-50" 
                     style={{ animationDelay: "1s" }} />
              </div>
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
              Currently enrolled in <span className="text-secondary">Apna College's Sigma 7.0</span>, I'm honing my skills 
              in Java, Data Structures & Algorithms (DSA), and MERN Stack Development to build optimized and scalable solutions.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              As a <span className="text-primary">Core Team Member at GDG Ranchi</span> and an active contributor 
              to various tech communities, I thrive on collaboration, knowledge sharing, and empowering fellow developers.
            </p>

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

            {/* Creative Side */}
            <div className="pt-4 card-scroll rounded-xl p-6">
              <h4 className="font-naruto text-xl text-secondary mb-3">📸 Creative Side:</h4>
              <p className="text-muted-foreground">
                Beyond coding, I'm passionate about capturing moments and telling stories through my lens. 
                I combine my technical skills with creative vision to document tech events, create educational content, 
                and bring ideas to life visually.
              </p>
            </div>

            {/* What Drives Me */}
            <div className="pt-2">
              <h4 className="font-naruto text-xl text-accent mb-3">💡 What Drives Me:</h4>
              <p className="text-muted-foreground">
                I'm passionate about solving real-world problems through technology and creating meaningful visual content. 
                My goal is to continuously upskill in both technical and creative domains to make a lasting impact.
              </p>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
