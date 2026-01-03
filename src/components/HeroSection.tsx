import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { motion } from "framer-motion";
import strangerHeroBg from "@/assets/stranger-things-hero-bg.png";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [glitchText, setGlitchText] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Occasional glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setGlitchText(true);
        setTimeout(() => setGlitchText(false), 150);
      }
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={strangerHeroBg}
          alt="Dark forest background"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      </div>

      {/* Animated Portal Glow Effects */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-st-purple/20 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Upside Down Tentacle/Vine Effect */}
      <div className="absolute inset-0 flex items-end justify-center opacity-[0.03] z-0">
        <svg
          className="w-full h-[60%]"
          viewBox="0 0 100 60"
          fill="none"
          preserveAspectRatio="none"
        >
          {[...Array(10)].map((_, i) => (
            <motion.path
              key={i}
              d={`M${10 + i * 9} 60 Q${15 + i * 9} ${30 + Math.random() * 20} ${10 + i * 9} 0`}
              stroke="currentColor"
              strokeWidth="0.3"
              className="text-primary"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 8 + i, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8 }}
        >
          {/* Tagline */}
          <motion.p 
            className="font-stranger text-xl md:text-2xl text-primary/80 mb-4 tracking-[0.3em]"
            animate={glitchText ? { x: [-2, 2, -2, 0] } : {}}
          >
            THE UPSIDE DOWN
          </motion.p>

          {/* Title - Stranger Things Style */}
          <motion.h1 
            className={`font-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl mb-4 leading-none ${glitchText ? 'animate-glitch' : ''}`}
          >
            <span className="text-gradient-portal drop-shadow-2xl block">SANTOSH</span>
            <span className="text-gradient-upside block mt-2">KUMAR VERMA</span>
          </motion.h1>

          {/* Decorative Line - Light bulb style */}
          <div className="flex items-center justify-center gap-4 my-8">
            <div className="w-20 md:w-32 h-0.5 bg-gradient-to-r from-transparent to-primary" />
            <motion.div 
              className="w-4 h-4 rounded-full bg-st-yellow"
              animate={{
                boxShadow: [
                  "0 0 10px hsl(45, 100%, 60%)",
                  "0 0 20px hsl(45, 100%, 60%)",
                  "0 0 10px hsl(45, 100%, 60%)",
                ],
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <div className="w-20 md:w-32 h-0.5 bg-gradient-to-l from-transparent to-primary" />
          </div>

          {/* Subtitle Tags */}
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
              size="lg"
              asChild
              className="group bg-primary hover:bg-primary/90 text-primary-foreground glow-red"
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
              className="border-primary/50 hover:bg-primary/10"
            >
              <a href="#contact">Contact</a>
            </Button>
            <Button
              size="lg"
              asChild
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
              <a href="https://www.linkedin.com/in/santoshverma77" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            >
              <a href="https://drive.google.com/file/d/1zpv8uhFt0Bu4uwMS-JYuJAgqwWXsc8ub/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                <Download className="w-4 h-4 mr-2" />
                Resume
              </a>
            </Button>
          </div>

          {/* Quote */}
          <motion.div 
            className="mt-16 text-muted-foreground/60 italic font-stranger"
            animate={glitchText ? { opacity: [1, 0.3, 1] } : {}}
          >
            <p className="text-sm md:text-base">"Friends don't lie."</p>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2">
            <motion.div 
              className="w-1 h-3 bg-primary rounded-full"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
