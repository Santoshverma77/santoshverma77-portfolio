import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [flickering, setFlickering] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Random flickering
    const flickerInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setFlickering(true);
        setTimeout(() => setFlickering(false), 150);
      }
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(flickerInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background ${flickering ? 'opacity-80' : ''}`}
        >
          {/* Portal Animation */}
          <div className="relative w-48 h-48 mb-8">
            {/* Outer glow */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle, hsl(0 85% 50% / 0.4) 0%, transparent 70%)",
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Portal rings */}
            <motion.div
              className="absolute inset-4 rounded-full border-4 border-primary/60"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-8 rounded-full border-2 border-st-purple/60"
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-12 rounded-full border-2 border-primary/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />

            {/* Portal center */}
            <motion.div
              className="absolute inset-16 rounded-full"
              style={{
                background: "radial-gradient(circle, hsl(0 0% 0%) 0%, hsl(280 60% 20%) 50%, hsl(0 85% 30%) 100%)",
                boxShadow: "0 0 40px hsl(0 85% 50%), inset 0 0 20px hsl(280 60% 30%)",
              }}
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Vine tentacles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 bg-gradient-to-t from-primary/50 to-transparent"
                style={{
                  left: `${50 + Math.sin(i * 60 * Math.PI / 180) * 35}%`,
                  top: "50%",
                  height: "40px",
                  transformOrigin: "bottom",
                }}
                animate={{
                  scaleY: [0, 1, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          {/* Loading text */}
          <motion.div
            className="font-title text-4xl text-gradient-portal mb-4 tracking-[0.2em]"
            animate={{ 
              opacity: flickering ? [1, 0.3, 1] : [0.7, 1, 0.7],
            }}
            transition={{ duration: flickering ? 0.15 : 1.5, repeat: Infinity }}
          >
            STRANGER THINGS
          </motion.div>
          
          <div className="text-muted-foreground mb-4 font-stranger">Opening the gate...</div>

          {/* Progress bar */}
          <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, hsl(0 85% 50%), hsl(280 60% 45%))",
                boxShadow: "0 0 10px hsl(0 85% 50%)",
              }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          
          <div className="mt-2 text-sm text-muted-foreground">{progress}%</div>

          {/* Christmas lights decoration */}
          <div className="absolute top-0 left-0 right-0 flex justify-center gap-8 pt-8">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-4 rounded-b-full"
                style={{
                  backgroundColor: ["hsl(0, 85%, 50%)", "hsl(45, 100%, 60%)", "hsl(120, 70%, 45%)", "hsl(200, 70%, 50%)"][i % 4],
                }}
                animate={{
                  opacity: flickering ? [1, 0.2, 1] : [0.8, 1, 0.8],
                  boxShadow: [
                    `0 0 10px ${["hsl(0, 85%, 50%)", "hsl(45, 100%, 60%)", "hsl(120, 70%, 45%)", "hsl(200, 70%, 50%)"][i % 4]}`,
                    `0 0 20px ${["hsl(0, 85%, 50%)", "hsl(45, 100%, 60%)", "hsl(120, 70%, 45%)", "hsl(200, 70%, 50%)"][i % 4]}`,
                    `0 0 10px ${["hsl(0, 85%, 50%)", "hsl(45, 100%, 60%)", "hsl(120, 70%, 45%)", "hsl(200, 70%, 50%)"][i % 4]}`,
                  ],
                }}
                transition={{
                  duration: 0.5 + Math.random() * 0.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
