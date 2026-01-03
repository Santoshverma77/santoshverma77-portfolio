import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Flickering Christmas Lights like Joyce's wall
const FlickeringLights = () => {
  const colors = [
    "hsl(0, 85%, 50%)",    // Red
    "hsl(45, 100%, 60%)",  // Yellow
    "hsl(120, 70%, 45%)",  // Green
    "hsl(200, 70%, 50%)",  // Blue
    "hsl(280, 60%, 50%)",  // Purple
    "hsl(30, 100%, 50%)",  // Orange
  ];

  const [lights, setLights] = useState<{ id: number; x: number; color: string; delay: number; flickering: boolean }[]>([]);

  useEffect(() => {
    const newLights = [];
    for (let i = 0; i < 26; i++) {
      newLights.push({
        id: i,
        x: 3 + (i * 3.5),
        color: colors[i % colors.length],
        delay: Math.random() * 2,
        flickering: Math.random() > 0.7,
      });
    }
    setLights(newLights);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-20 pointer-events-none z-20 overflow-hidden opacity-60">
      {/* Wire */}
      <svg className="absolute top-8 left-0 right-0 w-full h-8" preserveAspectRatio="none">
        <path
          d="M0,15 Q25,5 50,15 T100,15 T150,15 T200,15"
          stroke="hsl(var(--muted-foreground))"
          strokeWidth="1"
          fill="none"
          className="w-full"
          style={{ transform: "scaleX(10)" }}
        />
      </svg>
      
      {lights.map((light) => (
        <motion.div
          key={light.id}
          className="absolute top-6"
          style={{ left: `${light.x}%` }}
          animate={light.flickering ? {
            opacity: [1, 0.3, 1, 0.5, 1, 0.8, 1],
          } : { opacity: 1 }}
          transition={{
            duration: 0.5 + Math.random() * 0.5,
            repeat: Infinity,
            delay: light.delay,
          }}
        >
          {/* Bulb */}
          <div
            className="w-3 h-4 rounded-b-full"
            style={{
              backgroundColor: light.color,
              boxShadow: `0 0 10px ${light.color}, 0 0 20px ${light.color}`,
            }}
          />
          {/* Socket */}
          <div className="w-2 h-1 bg-muted-foreground mx-auto -mt-0.5" />
        </motion.div>
      ))}
    </div>
  );
};

// Upside Down Portal Effect
const UpsideDownPortal = () => {
  return (
    <div className="fixed bottom-10 left-10 w-32 h-32 pointer-events-none z-10 hidden lg:block">
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-portal opacity-30 blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute inset-4 rounded-full border-2 border-primary/50"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-8 rounded-full border border-st-purple/50"
        animate={{ rotate: -360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      {/* Tentacle-like vines */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 bg-gradient-to-t from-primary/50 to-transparent"
          style={{
            left: `${50 + Math.sin(i * 72 * Math.PI / 180) * 40}%`,
            bottom: "50%",
            height: "60px",
            transformOrigin: "bottom",
          }}
          animate={{
            scaleY: [0, 1, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
};

// Demogorgon Particles (spore-like floating particles)
const DemogorgonParticles = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([]);

  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
        duration: 15 + Math.random() * 20,
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/20"
          style={{
            left: `${particle.x}%`,
            width: particle.size,
            height: particle.size,
          }}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{
            y: "-100vh",
            opacity: [0, 0.5, 0.3, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// TV Static Effect (subtle)
const TVStatic = () => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-30 opacity-[0.02] mix-blend-overlay animate-static"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  );
};

// Mind Flayer Shadow (occasional ominous shadow)
const MindFlayerShadow = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setVisible(true);
        setTimeout(() => setVisible(false), 2000);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed top-0 right-0 w-96 h-96 pointer-events-none z-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 0.1 : 0 }}
      transition={{ duration: 1 }}
    >
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <path
          d="M100 20 L120 60 L160 40 L140 80 L180 100 L140 120 L160 160 L120 140 L100 180 L80 140 L40 160 L60 120 L20 100 L60 80 L40 40 L80 60 Z"
          fill="currentColor"
          className="text-primary/30"
        />
      </svg>
    </motion.div>
  );
};

const StrangerThingsEffects = () => {
  return (
    <>
      <FlickeringLights />
      <UpsideDownPortal />
      <DemogorgonParticles />
      <TVStatic />
      <MindFlayerShadow />
    </>
  );
};

export default StrangerThingsEffects;
