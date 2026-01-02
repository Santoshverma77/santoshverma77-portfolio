import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

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

  return (
    <motion.button
      onClick={() => setIsDark(!isDark)}
      className="fixed top-24 right-4 z-50 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm border border-naruto-orange/30 flex items-center justify-center shadow-lg hover:shadow-naruto-orange/30 transition-all duration-300"
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
          // Moon/Sharingan for dark mode
          <svg
            viewBox="0 0 100 100"
            className="w-7 h-7"
            fill="none"
          >
            <circle cx="50" cy="50" r="40" className="fill-naruto-red" />
            <circle cx="50" cy="50" r="12" className="fill-background" />
            <g className="fill-background">
              <ellipse cx="50" cy="20" rx="6" ry="10" />
              <ellipse cx="76" cy="65" rx="6" ry="10" transform="rotate(120 76 65)" />
              <ellipse cx="24" cy="65" rx="6" ry="10" transform="rotate(-120 24 65)" />
            </g>
            <circle cx="50" cy="50" r="40" className="stroke-naruto-red" strokeWidth="3" fill="none" />
          </svg>
        ) : (
          // Sun/Kyuubi chakra for light mode
          <svg
            viewBox="0 0 100 100"
            className="w-7 h-7"
          >
            <defs>
              <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" className="stop-color-[hsl(var(--naruto-gold))]" style={{ stopColor: "hsl(45 100% 55%)" }} />
                <stop offset="100%" className="stop-color-[hsl(var(--naruto-orange))]" style={{ stopColor: "hsl(25 100% 55%)" }} />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="25" fill="url(#sunGradient)" />
            {[...Array(8)].map((_, i) => (
              <motion.line
                key={i}
                x1="50"
                y1="15"
                x2="50"
                y2="5"
                stroke="hsl(25 100% 55%)"
                strokeWidth="4"
                strokeLinecap="round"
                transform={`rotate(${i * 45} 50 50)`}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
            <circle cx="50" cy="50" r="8" fill="hsl(25 100% 45%)" />
          </svg>
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
