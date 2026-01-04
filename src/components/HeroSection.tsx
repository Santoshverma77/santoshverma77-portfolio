import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

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
      {/* Dark atmospheric background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(200_30%_5%)] to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_hsl(0_0%_0%/0.8)_100%)]" />
      </div>

      {/* Upside Down particle overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-muted-foreground rounded-full animate-snow-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Neon glow effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[200px] animate-flicker-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/15 rounded-full blur-[150px] animate-float-delayed" />
      </div>

      {/* Stranger Things style title glow */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] z-0">
        <div className="w-[800px] h-[800px] border border-primary/30 rounded-full animate-spin-slow" />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div
          className={`text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Retro subtitle */}
          <p className="font-retro text-2xl md:text-3xl text-primary/80 mb-4 tracking-[0.5em] animate-flicker-slow">
            WELCOME TO THE
          </p>

          {/* Main Title - Stranger Things style */}
          <h1 className="font-stranger text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] mb-4 leading-none">
            <span className="text-gradient-neon drop-shadow-2xl block animate-flicker-slow vhs-effect">SANTOSH</span>
            <span className="text-gradient-synth block mt-2 animate-flicker-slow">KUMAR VERMA</span>
          </h1>

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-4 my-8">
            <div className="w-20 md:w-32 h-0.5 bg-gradient-to-r from-transparent to-primary animate-flicker" />
            <div className="w-3 h-3 rotate-45 bg-primary animate-pulse glow-neon" />
            <div className="w-20 md:w-32 h-0.5 bg-gradient-to-l from-transparent to-primary animate-flicker" />
          </div>

          {/* Subtitle badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <span className="px-5 py-2 bg-primary/20 border border-primary/40 rounded-sm text-primary font-retro text-lg md:text-xl backdrop-blur-sm glow-neon">
              🎓 BS Data Science @ IIT Madras
            </span>
            <span className="px-5 py-2 bg-secondary/20 border border-secondary/40 rounded-sm text-secondary font-retro text-lg md:text-xl backdrop-blur-sm">
              💻 Full-Stack Developer
            </span>
          </div>

          {/* Description */}
          <p className="font-retro text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Tech Community Builder · Photography & Videography · Java · DSA · MERN
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="default"
              size="lg"
              asChild
              className="group bg-primary hover:bg-primary/80 glow-neon font-retro text-lg"
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
              className="border-primary/50 text-primary hover:bg-primary/10 font-retro text-lg"
            >
              <a href="#contact">Contact</a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-secondary/50 text-secondary hover:bg-secondary/10 font-retro text-lg"
            >
              <a href="https://www.linkedin.com/in/santoshverma77" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-accent/50 text-accent hover:bg-accent/10 font-retro text-lg"
            >
              <a href="https://drive.google.com/file/d/1zpv8uhFt0Bu4uwMS-JYuJAgqwWXsc8ub/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                <Download className="w-4 h-4 mr-2" />
                Resume
              </a>
            </Button>
          </div>

          {/* Quote */}
          <div className="mt-16 text-muted-foreground/60 italic font-retro text-lg">
            <p>"Friends don't lie."</p>
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
