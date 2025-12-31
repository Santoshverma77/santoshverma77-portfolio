import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import narutoHeroBg from "@/assets/naruto-hero-bg.png";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={narutoHeroBg}
          alt="Naruto themed background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      </div>

      {/* Animated Glow Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] animate-float-delayed" />
      </div>

      {/* Konoha Symbol */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] z-0">
        <svg
          className="w-[1000px] h-[1000px] animate-spin-slow"
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.3" className="text-primary" />
          <path
            d="M50 10 L55 35 L80 25 L65 45 L90 50 L65 55 L80 75 L55 65 L50 90 L45 65 L20 75 L35 55 L10 50 L35 45 L20 25 L45 35 Z"
            fill="currentColor"
            className="text-primary"
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div
          className={`text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Japanese Text */}
          <p className="font-naruto text-xl md:text-2xl text-primary/80 mb-4 tracking-[0.3em]">
            忍者の道
          </p>

          {/* Title */}
          <h1 className="font-naruto text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl mb-4 leading-none">
            <span className="text-gradient-fire drop-shadow-2xl block">SANTOSH</span>
            <span className="text-gradient-sunset block mt-2">KUMAR VERMA</span>
          </h1>

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-4 my-8">
            <div className="w-20 md:w-32 h-0.5 bg-gradient-to-r from-transparent to-primary" />
            <div className="w-3 h-3 rotate-45 bg-primary animate-pulse" />
            <div className="w-20 md:w-32 h-0.5 bg-gradient-to-l from-transparent to-primary" />
          </div>

          {/* Subtitle */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <span className="px-5 py-2 bg-primary/20 border border-primary/40 rounded-full text-primary font-bold text-sm md:text-base backdrop-blur-sm">
              🎓 BS Data Science @ IIT Madras
            </span>
            <span className="px-5 py-2 bg-secondary/20 border border-secondary/40 rounded-full text-secondary font-bold text-sm md:text-base backdrop-blur-sm">
              💻 Full-Stack Developer
            </span>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Tech Community Builder · Photography & Videography · Java · DSA · MERN
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="fire"
              size="lg"
              asChild
              className="group"
            >
              <a href="#projects">
                <span>View Work</span>
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
            >
              <a href="#contact">Contact</a>
            </Button>
            <Button
              variant="chakra"
              size="lg"
              asChild
            >
              <a href="https://www.linkedin.com/in/santoshverma77" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-accent text-accent hover:bg-accent hover:text-background"
            >
              <a href="/resume.pdf" download="Santosh_Kumar_Verma_Resume.pdf">
                <Download className="w-4 h-4 mr-2" />
                Resume
              </a>
            </Button>
          </div>

          {/* Quote */}
          <div className="mt-16 text-muted-foreground/60 italic">
            <p className="text-sm md:text-base">"I never go back on my word. That is my ninja way!"</p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
