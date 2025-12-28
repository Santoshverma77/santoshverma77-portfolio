import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-[80px] animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      {/* Konoha Symbol Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <svg
          className="w-[800px] h-[800px] animate-spin-slow"
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
          <path
            d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z"
            fill="currentColor"
            className="text-primary"
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div
          className={`text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Title */}
          <h1 className="font-naruto text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-6 leading-none">
            <span className="text-gradient-fire drop-shadow-2xl">SANTOSH</span>
            <br />
            <span className="text-gradient-sunset">KUMAR VERMA</span>
          </h1>

          {/* Subtitle */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <span className="px-4 py-1 bg-primary/20 border border-primary/40 rounded-full text-primary font-medium">
              BS Data Science @ IIT Madras
            </span>
            <span className="text-muted-foreground">|</span>
            <span className="px-4 py-1 bg-secondary/20 border border-secondary/40 rounded-full text-secondary font-medium">
              Full-Stack Developer
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
              variant="ghost"
              size="lg"
              asChild
              className="text-secondary hover:text-secondary hover:bg-secondary/10"
            >
              <a href="https://www.linkedin.com/in/santoshverma77" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </Button>
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
