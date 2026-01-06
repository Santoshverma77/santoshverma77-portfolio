import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const handSigns = ["🤞", "🤟", "🤘", "✌️", "🤙", "👆", "🖖", "✋", "👊", "🙏"];
const jutsuNames = ["Shadow Clone", "Rasengan", "Chidori", "Fireball", "Summoning"];

interface PageTransitionLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
}

const PageTransitionLoader = ({ isLoading, onComplete }: PageTransitionLoaderProps) => {
  const [currentSign, setCurrentSign] = useState(0);
  const [jutsuName, setJutsuName] = useState("");

  useEffect(() => {
    if (!isLoading) {
      setCurrentSign(0);
      return;
    }

    // Pick random jutsu name
    setJutsuName(jutsuNames[Math.floor(Math.random() * jutsuNames.length)]);

    const interval = setInterval(() => {
      setCurrentSign((prev) => {
        if (prev >= handSigns.length - 1) {
          clearInterval(interval);
          setTimeout(() => onComplete?.(), 200);
          return prev;
        }
        return prev + 1;
      });
    }, 80);

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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md"
        >
          <div className="flex flex-col items-center gap-6">
            {/* Chakra ring effect */}
            <div className="relative">
              <motion.div
                className="absolute -inset-16 rounded-full border-4 border-primary/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -inset-12 rounded-full border-2 border-accent/40"
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -inset-8 rounded-full bg-primary/10 blur-xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
              
              {/* Current hand sign */}
              <motion.span
                key={currentSign}
                initial={{ scale: 0.5, opacity: 0, rotateY: -90 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 0.5, opacity: 0, rotateY: 90 }}
                transition={{ duration: 0.1 }}
                className="text-8xl block relative z-10"
              >
                {handSigns[currentSign]}
              </motion.span>
            </div>

            {/* Sign sequence indicator */}
            <div className="flex gap-2">
              {handSigns.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-150 ${
                    index <= currentSign 
                      ? "bg-primary" 
                      : "bg-muted-foreground/30"
                  }`}
                  animate={index === currentSign ? { scale: [1, 1.5, 1] } : {}}
                  transition={{ duration: 0.15 }}
                />
              ))}
            </div>

            {/* Jutsu name */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-naruto text-2xl text-gradient-fire"
            >
              {jutsuName} no Jutsu!
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransitionLoader;
