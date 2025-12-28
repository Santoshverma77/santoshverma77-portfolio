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
      { threshold: 0.2 }
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
      {/* Background Accent */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-[500px] bg-gradient-to-r from-primary/10 to-transparent blur-3xl" />

      <div className="container mx-auto px-6">
        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          {/* Section Title */}
          <div className="flex items-center gap-4 mb-12">
            <div className="w-16 h-1 bg-gradient-fire" />
            <h2 className="font-naruto text-5xl md:text-6xl text-gradient-fire">
              ABOUT ME
            </h2>
          </div>

          {/* Content Card */}
          <div className="card-scroll rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Avatar/Symbol */}
              <div className="relative flex-shrink-0">
                <div className="w-40 h-40 rounded-full bg-gradient-fire p-1 animate-pulse-glow">
                  <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                    <span className="font-naruto text-6xl text-gradient-fire">忍</span>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-secondary rounded-full flex items-center justify-center border-4 border-card">
                  <svg className="w-6 h-6 text-secondary-foreground" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" />
                  </svg>
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-1 text-center md:text-left">
                <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-6">
                  Hello! I'm <span className="text-primary font-bold">Santosh Kumar Verma</span> — a BS in Data Science student at <span className="text-secondary font-bold">IIT Madras</span>, passionate about building intelligent & dynamic web applications and immersive UI experiences.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Like a true ninja of code, I believe in continuous learning and mastering new techniques. My journey combines the precision of data science with the creativity of full-stack development.
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 mt-8 justify-center md:justify-start">
                  <div className="text-center">
                    <div className="font-naruto text-4xl text-gradient-fire">6+</div>
                    <div className="text-muted-foreground text-sm">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="font-naruto text-4xl text-gradient-chakra">10+</div>
                    <div className="text-muted-foreground text-sm">Certifications</div>
                  </div>
                  <div className="text-center">
                    <div className="font-naruto text-4xl text-gradient-sunset">3+</div>
                    <div className="text-muted-foreground text-sm">Experiences</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
