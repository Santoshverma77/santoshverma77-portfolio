import { useEffect, useState } from "react";

// Flickering Christmas lights effect (like the alphabet wall)
const ChristmasLights = () => {
  const [lights, setLights] = useState<{ id: number; x: number; color: string; delay: number }[]>([]);

  useEffect(() => {
    const colors = ['light-red', 'light-blue', 'light-green', 'light-yellow', 'light-purple'];
    const newLights = [];
    for (let i = 0; i < 26; i++) {
      newLights.push({
        id: i,
        x: 5 + (i * 3.5),
        color: colors[i % colors.length],
        delay: Math.random() * 2,
      });
    }
    setLights(newLights);
  }, []);

  return (
    <div className="fixed top-20 left-0 right-0 pointer-events-none z-0 opacity-40">
      <div className="flex justify-center gap-2 px-4">
        {lights.map((light) => (
          <div
            key={light.id}
            className={`text-2xl ${light.color}`}
            style={{ animationDelay: `${light.delay}s` }}
          >
            💡
          </div>
        ))}
      </div>
    </div>
  );
};

// Upside Down portal effect
const UpsideDownPortal = () => {
  return (
    <div className="fixed bottom-0 right-0 pointer-events-none z-0 opacity-20">
      <div className="relative w-80 h-80">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-primary/50 animate-portal-pulse" />
        
        {/* Inner organic shape */}
        <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary/20 via-secondary/20 to-transparent blur-xl animate-spin-slow" />
        
        {/* Tendrils */}
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <div
            key={deg}
            className="absolute top-1/2 left-1/2 w-2 h-32 bg-gradient-to-b from-primary/40 to-transparent blur-sm"
            style={{
              transformOrigin: 'top center',
              transform: `translate(-50%, 0) rotate(${deg}deg)`,
            }}
          />
        ))}
        
        {/* Center glow */}
        <div className="absolute inset-16 rounded-full bg-primary/30 blur-2xl animate-pulse" />
      </div>
    </div>
  );
};

// Floating particles (ash/snow from Upside Down)
const UpsideDownParticles = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; delay: number; size: number; opacity: number }[]>([]);

  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 40; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 20,
        size: 2 + Math.random() * 4,
        opacity: 0.3 + Math.random() * 0.4,
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-muted-foreground"
          style={{
            left: `${particle.x}%`,
            top: '-20px',
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animation: `snow-fall 20s linear infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

// VHS static effect overlay
const StaticOverlay = () => {
  const [showStatic, setShowStatic] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setShowStatic(true);
        setTimeout(() => setShowStatic(false), 100 + Math.random() * 200);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!showStatic) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 opacity-10 bg-noise animate-static" />
  );
};

// Flickering ambient glow
const AmbientGlow = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[200px] animate-flicker-slow" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[150px] animate-float-delayed" />
    </div>
  );
};

// Demogorgon eyes effect (subtle)
const DemogorgonEyes = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.9) {
        setVisible(true);
        setTimeout(() => setVisible(false), 2000);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-1/3 left-10 pointer-events-none z-0 opacity-30 animate-fade-in-up">
      <div className="flex gap-8">
        <div className="w-4 h-4 rounded-full bg-primary blur-sm animate-pulse" />
        <div className="w-4 h-4 rounded-full bg-primary blur-sm animate-pulse" />
      </div>
    </div>
  );
};

const StrangerEffects = () => {
  return (
    <>
      <AmbientGlow />
      <UpsideDownParticles />
      <ChristmasLights />
      <UpsideDownPortal />
      <StaticOverlay />
      <DemogorgonEyes />
    </>
  );
};

export default StrangerEffects;
