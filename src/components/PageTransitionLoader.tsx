import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const messages = ["LOADING", "WAIT", "OPENING GATE", "RUN"];

interface PageTransitionLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
}

const PageTransitionLoader = ({ isLoading, onComplete }: PageTransitionLoaderProps) => {
  const [currentLetter, setCurrentLetter] = useState(0);
  const [message, setMessage] = useState("");
  const [activeLights, setActiveLights] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isLoading) {
      setCurrentLetter(0);
      setActiveLights(new Set());
      return;
    }

    // Pick random message
    const selectedMessage = messages[Math.floor(Math.random() * messages.length)];
    setMessage(selectedMessage);

    let letterIndex = 0;
    const interval = setInterval(() => {
      if (letterIndex >= selectedMessage.length) {
        clearInterval(interval);
        setTimeout(() => onComplete?.(), 300);
        return;
      }

      const letter = selectedMessage[letterIndex];
      if (letter !== " ") {
        setActiveLights(new Set([letter]));
      }
      letterIndex++;
      setCurrentLetter(letterIndex);
    }, 200);

    return () => clearInterval(interval);
  }, [isLoading, onComplete]);

  const lightColors: { [key: string]: string } = {};
  const colors = ["hsl(0, 85%, 50%)", "hsl(45, 100%, 60%)", "hsl(120, 70%, 45%)", "hsl(200, 70%, 50%)", "hsl(280, 60%, 50%)", "hsl(30, 100%, 50%)"];
  alphabet.split("").forEach((letter, i) => {
    lightColors[letter] = colors[i % colors.length];
  });

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
          <div className="flex flex-col items-center gap-8 max-w-3xl mx-auto px-4">
            {/* Alphabet Wall */}
            <div className="relative w-full p-6 bg-card/30 rounded-lg border border-primary/20">
              {/* Wire decoration */}
              <div className="absolute top-4 left-4 right-4 h-0.5 bg-muted-foreground/30" />
              
              {/* Rows of letters */}
              <div className="space-y-4 pt-4">
                {/* Row 1: A-I */}
                <div className="flex justify-between">
                  {alphabet.slice(0, 9).split("").map((letter) => (
                    <motion.div
                      key={letter}
                      className="flex flex-col items-center gap-1"
                      animate={activeLights.has(letter) ? { scale: [1, 1.2, 1] } : {}}
                    >
                      <div
                        className="w-3 h-4 rounded-b-full transition-all duration-200"
                        style={{
                          backgroundColor: activeLights.has(letter) ? lightColors[letter] : "hsl(var(--muted))",
                          boxShadow: activeLights.has(letter) ? `0 0 15px ${lightColors[letter]}, 0 0 30px ${lightColors[letter]}` : "none",
                        }}
                      />
                      <span
                        className="font-stranger text-sm"
                        style={{
                          color: activeLights.has(letter) ? lightColors[letter] : "hsl(var(--muted-foreground))",
                          textShadow: activeLights.has(letter) ? `0 0 10px ${lightColors[letter]}` : "none",
                        }}
                      >
                        {letter}
                      </span>
                    </motion.div>
                  ))}
                </div>
                
                {/* Row 2: J-R */}
                <div className="flex justify-between">
                  {alphabet.slice(9, 18).split("").map((letter) => (
                    <motion.div
                      key={letter}
                      className="flex flex-col items-center gap-1"
                      animate={activeLights.has(letter) ? { scale: [1, 1.2, 1] } : {}}
                    >
                      <div
                        className="w-3 h-4 rounded-b-full transition-all duration-200"
                        style={{
                          backgroundColor: activeLights.has(letter) ? lightColors[letter] : "hsl(var(--muted))",
                          boxShadow: activeLights.has(letter) ? `0 0 15px ${lightColors[letter]}, 0 0 30px ${lightColors[letter]}` : "none",
                        }}
                      />
                      <span
                        className="font-stranger text-sm"
                        style={{
                          color: activeLights.has(letter) ? lightColors[letter] : "hsl(var(--muted-foreground))",
                          textShadow: activeLights.has(letter) ? `0 0 10px ${lightColors[letter]}` : "none",
                        }}
                      >
                        {letter}
                      </span>
                    </motion.div>
                  ))}
                </div>
                
                {/* Row 3: S-Z */}
                <div className="flex justify-between px-8">
                  {alphabet.slice(18).split("").map((letter) => (
                    <motion.div
                      key={letter}
                      className="flex flex-col items-center gap-1"
                      animate={activeLights.has(letter) ? { scale: [1, 1.2, 1] } : {}}
                    >
                      <div
                        className="w-3 h-4 rounded-b-full transition-all duration-200"
                        style={{
                          backgroundColor: activeLights.has(letter) ? lightColors[letter] : "hsl(var(--muted))",
                          boxShadow: activeLights.has(letter) ? `0 0 15px ${lightColors[letter]}, 0 0 30px ${lightColors[letter]}` : "none",
                        }}
                      />
                      <span
                        className="font-stranger text-sm"
                        style={{
                          color: activeLights.has(letter) ? lightColors[letter] : "hsl(var(--muted-foreground))",
                          textShadow: activeLights.has(letter) ? `0 0 10px ${lightColors[letter]}` : "none",
                        }}
                      >
                        {letter}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="flex gap-2">
              {message.replace(/ /g, "").split("").map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-150 ${
                    index < currentLetter 
                      ? "bg-primary" 
                      : "bg-muted-foreground/30"
                  }`}
                  animate={index === currentLetter - 1 ? { scale: [1, 1.5, 1] } : {}}
                />
              ))}
            </div>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-stranger text-2xl text-gradient-portal"
            >
              {message.slice(0, currentLetter)}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                _
              </motion.span>
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransitionLoader;
