import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

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

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          {/* Rasengan Animation */}
          <div className="relative w-40 h-40 mb-8">
            {/* Outer glow rings */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle, hsl(200 80% 60% / 0.3) 0%, transparent 70%)",
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Second ring */}
            <motion.div
              className="absolute inset-4 rounded-full border-2 border-secondary/50"
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
              }}
            />

            {/* Third ring */}
            <motion.div
              className="absolute inset-8 rounded-full border-2 border-secondary/70"
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Core Rasengan */}
            <motion.div
              className="absolute inset-12 rounded-full"
              style={{
                background: "radial-gradient(circle, hsl(200 90% 70%) 0%, hsl(200 80% 50%) 50%, hsl(200 70% 40%) 100%)",
                boxShadow: "0 0 40px hsl(200 80% 60%), 0 0 80px hsl(200 80% 60% / 0.5), inset 0 0 20px hsl(200 90% 80%)",
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.15, 1],
              }}
              transition={{
                rotate: { duration: 0.5, repeat: Infinity, ease: "linear" },
                scale: { duration: 0.8, repeat: Infinity, ease: "easeInOut" },
              }}
            />

            {/* Inner spiral lines */}
            <motion.div
              className="absolute inset-14 rounded-full overflow-hidden"
              animate={{ rotate: -360 }}
              transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
            >
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full h-0.5 bg-white/60"
                  style={{
                    top: "50%",
                    transform: `rotate(${i * 30}deg)`,
                    transformOrigin: "center",
                  }}
                />
              ))}
            </motion.div>

            {/* Chakra particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-secondary"
                style={{
                  top: "50%",
                  left: "50%",
                }}
                animate={{
                  x: [0, Math.cos((i * 45 * Math.PI) / 180) * 60],
                  y: [0, Math.sin((i * 45 * Math.PI) / 180) * 60],
                  opacity: [1, 0],
                  scale: [1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          {/* Loading text */}
          <motion.div
            className="font-naruto text-3xl text-gradient-chakra mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            螺旋丸
          </motion.div>
          
          <div className="text-muted-foreground mb-4">Gathering Chakra...</div>

          {/* Progress bar */}
          <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, hsl(200 80% 50%), hsl(200 90% 70%))",
                boxShadow: "0 0 10px hsl(200 80% 60%)",
              }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          
          <div className="mt-2 text-sm text-muted-foreground">{progress}%</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
