import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const flickerSequence = ["💡", "📺", "🔦", "⚡", "📻", "🎸", "🔴", "📞", "🎬", "🌌"];
const phrases = ["Entering the Upside Down", "Tuning Frequencies", "Decoding Signals", "Opening Gate", "Mind Connection"];

interface PageTransitionLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
}

const PageTransitionLoader = ({ isLoading, onComplete }: PageTransitionLoaderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phrase, setPhrase] = useState("");

  useEffect(() => {
    if (!isLoading) {
      setCurrentIndex(0);
      return;
    }

    // Pick random phrase
    setPhrase(phrases[Math.floor(Math.random() * phrases.length)]);

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= flickerSequence.length - 1) {
          clearInterval(interval);
          setTimeout(() => onComplete?.(), 200);
          return prev;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isLoading, onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md scanlines"
        >
          <div className="flex flex-col items-center gap-6">
            {/* Neon ring effect */}
            <div className="relative">
              <motion.div
                className="absolute -inset-16 rounded-full border-4 border-primary/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -inset-12 rounded-full border-2 border-secondary/40"
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -inset-8 rounded-full bg-primary/10 blur-xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
              
              {/* Current icon */}
              <motion.span
                key={currentIndex}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="text-8xl block relative z-10"
              >
                {flickerSequence[currentIndex]}
              </motion.span>
            </div>

            {/* Sequence indicator */}
            <div className="flex gap-2">
              {flickerSequence.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-150 ${
                    index <= currentIndex 
                      ? "bg-primary glow-neon" 
                      : "bg-muted-foreground/30"
                  }`}
                  animate={index === currentIndex ? { scale: [1, 1.5, 1] } : {}}
                  transition={{ duration: 0.15 }}
                />
              ))}
            </div>

            {/* Phrase */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-stranger text-2xl text-gradient-neon animate-flicker-slow"
            >
              {phrase}...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransitionLoader;
