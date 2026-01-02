import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{ duration: 0.3, type: "spring" }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-4 z-50 w-12 h-12 rounded-full bg-gradient-fire flex items-center justify-center shadow-lg hover:shadow-naruto-orange/50 transition-all duration-300 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          {/* Kunai Arrow pointing up */}
          <svg
            viewBox="0 0 24 32"
            className="w-5 h-6 transition-transform duration-300 group-hover:-translate-y-1"
            fill="none"
          >
            {/* Kunai blade */}
            <path
              d="M12 2L6 14H10V22H14V14H18L12 2Z"
              className="fill-white"
            />
            {/* Handle wrap */}
            <rect x="10" y="22" width="4" height="6" className="fill-muted-foreground" />
            {/* Ring at bottom */}
            <circle cx="12" cy="30" r="2" className="stroke-white" strokeWidth="1.5" fill="none" />
          </svg>
          
          {/* Chakra glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-naruto-orange/30"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
