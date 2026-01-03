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
          className="fixed bottom-6 right-4 z-50 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg hover:shadow-primary/50 transition-all duration-300 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          {/* Flashlight Icon */}
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1"
            fill="none"
          >
            {/* Light beam */}
            <path
              d="M12 2 L8 10 L16 10 Z"
              className="fill-st-yellow"
            />
            {/* Flashlight body */}
            <rect x="9" y="10" width="6" height="8" rx="1" className="fill-primary-foreground" />
            {/* Handle */}
            <rect x="10" y="18" width="4" height="4" rx="0.5" className="fill-muted-foreground" />
          </svg>
          
          {/* Portal glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/30"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
