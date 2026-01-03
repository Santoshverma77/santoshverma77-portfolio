import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSounds } from "@/contexts/SoundContext";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);
  const { playFlicker } = useSounds();

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, [isDark]);

  const handleToggle = () => {
    playFlicker();
    setIsDark(!isDark);
  };

  return (
    <motion.button
      onClick={handleToggle}
      className="fixed top-24 right-4 z-50 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm border border-primary/30 flex items-center justify-center shadow-lg hover:shadow-primary/30 transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        {isDark ? (
          // Flickering light bulb for dark mode
          <motion.svg
            viewBox="0 0 24 24"
            className="w-6 h-6"
            fill="none"
            animate={{
              opacity: [1, 0.5, 1, 0.8, 1],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          >
            {/* Bulb */}
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z"
              className="fill-st-yellow"
            />
            {/* Base */}
            <rect x="9" y="18" width="6" height="2" rx="0.5" className="fill-muted-foreground" />
            <rect x="10" y="20" width="4" height="2" rx="0.5" className="fill-muted-foreground" />
            {/* Light glow */}
            <circle
              cx="12"
              cy="8"
              r="10"
              className="fill-st-yellow/20"
            />
          </motion.svg>
        ) : (
          // Sun for light mode
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <circle cx="12" cy="12" r="5" className="fill-st-yellow" />
            {[...Array(8)].map((_, i) => (
              <motion.line
                key={i}
                x1="12"
                y1="2"
                x2="12"
                y2="5"
                className="stroke-st-yellow"
                strokeWidth="2"
                strokeLinecap="round"
                transform={`rotate(${i * 45} 12 12)`}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </svg>
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
