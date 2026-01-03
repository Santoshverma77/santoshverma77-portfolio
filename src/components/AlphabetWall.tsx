import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AlphabetWallProps {
  message?: string;
  autoPlay?: boolean;
}

const AlphabetWall = ({ message = "WELCOME", autoPlay = true }: AlphabetWallProps) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [activeLetters, setActiveLetters] = useState<Set<string>>(new Set());
  const [messageIndex, setMessageIndex] = useState(0);

  const lightColors: { [key: string]: string } = {
    A: "hsl(0, 85%, 50%)",     // Red
    B: "hsl(45, 100%, 60%)",   // Yellow
    C: "hsl(200, 70%, 50%)",   // Blue
    D: "hsl(120, 70%, 45%)",   // Green
    E: "hsl(280, 60%, 50%)",   // Purple
    F: "hsl(30, 100%, 50%)",   // Orange
    G: "hsl(0, 85%, 50%)",
    H: "hsl(45, 100%, 60%)",
    I: "hsl(200, 70%, 50%)",
    J: "hsl(120, 70%, 45%)",
    K: "hsl(280, 60%, 50%)",
    L: "hsl(30, 100%, 50%)",
    M: "hsl(0, 85%, 50%)",
    N: "hsl(45, 100%, 60%)",
    O: "hsl(200, 70%, 50%)",
    P: "hsl(120, 70%, 45%)",
    Q: "hsl(280, 60%, 50%)",
    R: "hsl(30, 100%, 50%)",
    S: "hsl(0, 85%, 50%)",
    T: "hsl(45, 100%, 60%)",
    U: "hsl(200, 70%, 50%)",
    V: "hsl(120, 70%, 45%)",
    W: "hsl(280, 60%, 50%)",
    X: "hsl(30, 100%, 50%)",
    Y: "hsl(0, 85%, 50%)",
    Z: "hsl(45, 100%, 60%)",
  };

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      const currentLetter = message[messageIndex];
      if (currentLetter && currentLetter !== " ") {
        setActiveLetters(new Set([currentLetter.toUpperCase()]));
      } else {
        setActiveLetters(new Set());
      }
      
      setMessageIndex((prev) => (prev + 1) % (message.length + 3)); // +3 for pause
    }, 800);

    return () => clearInterval(interval);
  }, [message, messageIndex, autoPlay]);

  return (
    <div className="relative w-full max-w-4xl mx-auto p-8 bg-card/30 backdrop-blur-sm rounded-lg border border-primary/20">
      {/* Wall texture background */}
      <div 
        className="absolute inset-0 opacity-20 rounded-lg"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23999' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Wire string */}
      <div className="absolute top-4 left-8 right-8 h-0.5 bg-muted-foreground/30" />
      
      {/* Alphabet rows */}
      <div className="relative space-y-6 pt-4">
        {/* Row 1: A-I */}
        <div className="flex justify-between px-4">
          {alphabet.slice(0, 9).split("").map((letter, i) => (
            <LetterLight
              key={letter}
              letter={letter}
              color={lightColors[letter]}
              isActive={activeLetters.has(letter)}
              delay={i * 0.1}
            />
          ))}
        </div>
        
        {/* Wire */}
        <div className="absolute top-16 left-8 right-8 h-0.5 bg-muted-foreground/30" />
        
        {/* Row 2: J-R */}
        <div className="flex justify-between px-4 pt-4">
          {alphabet.slice(9, 18).split("").map((letter, i) => (
            <LetterLight
              key={letter}
              letter={letter}
              color={lightColors[letter]}
              isActive={activeLetters.has(letter)}
              delay={i * 0.1}
            />
          ))}
        </div>
        
        {/* Wire */}
        <div className="absolute top-36 left-8 right-8 h-0.5 bg-muted-foreground/30" />
        
        {/* Row 3: S-Z */}
        <div className="flex justify-between px-4 pt-4">
          {alphabet.slice(18).split("").map((letter, i) => (
            <LetterLight
              key={letter}
              letter={letter}
              color={lightColors[letter]}
              isActive={activeLetters.has(letter)}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface LetterLightProps {
  letter: string;
  color: string;
  isActive: boolean;
  delay: number;
}

const LetterLight = ({ letter, color, isActive, delay }: LetterLightProps) => {
  return (
    <div className="flex flex-col items-center gap-1">
      {/* Light bulb */}
      <motion.div
        className="w-4 h-5 rounded-b-full transition-all duration-200"
        style={{
          backgroundColor: isActive ? color : "hsl(var(--muted))",
          boxShadow: isActive ? `0 0 15px ${color}, 0 0 30px ${color}` : "none",
        }}
        animate={isActive ? {
          scale: [1, 1.2, 1],
        } : {}}
        transition={{ duration: 0.3 }}
      />
      
      {/* Letter */}
      <motion.span
        className="font-stranger text-lg"
        style={{
          color: isActive ? color : "hsl(var(--muted-foreground))",
          textShadow: isActive ? `0 0 10px ${color}` : "none",
        }}
        animate={isActive ? {
          scale: [1, 1.1, 1],
        } : {}}
        transition={{ duration: 0.3 }}
      >
        {letter}
      </motion.span>
    </div>
  );
};

export default AlphabetWall;
