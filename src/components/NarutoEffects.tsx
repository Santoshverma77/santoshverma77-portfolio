import { useEffect, useState } from "react";

// Chakra orb floating effect
const ChakraOrbs = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute w-32 h-32 rounded-full opacity-20 animate-float"
          style={{
            background: `radial-gradient(circle, ${i % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--secondary))'} 0%, transparent 70%)`,
            left: `${15 + i * 20}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${6 + i}s`,
          }}
        />
      ))}
    </div>
  );
};

// Kunai throwing animation
const FlyingKunai = () => {
  const [kunais, setKunais] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      setKunais((prev) => [...prev, { id, x: Math.random() * 100, y: Math.random() * 100 }]);
      
      setTimeout(() => {
        setKunais((prev) => prev.filter((k) => k.id !== id));
      }, 2000);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {kunais.map((kunai) => (
        <div
          key={kunai.id}
          className="absolute text-2xl animate-kunai-throw"
          style={{ left: `${kunai.x}%`, top: `${kunai.y}%` }}
        >
          🗡️
        </div>
      ))}
    </div>
  );
};

// Sharingan eye animation
const SharinganEye = () => {
  return (
    <div className="fixed bottom-10 right-10 pointer-events-none z-0 opacity-10">
      <div className="w-40 h-40 rounded-full border-4 border-red-600 animate-spin-slow relative">
        <div className="absolute inset-4 rounded-full border-2 border-red-500 animate-spin-reverse">
          <div className="absolute inset-2 rounded-full bg-red-900/50 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-black" />
          </div>
          {[0, 120, 240].map((deg) => (
            <div
              key={deg}
              className="absolute w-3 h-3 bg-red-600 rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-20px)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Seal/Jutsu symbols floating
const JutsuSeals = () => {
  const symbols = ['忍', '火', '風', '雷', '土', '水', '木'];
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {symbols.map((symbol, i) => (
        <div
          key={i}
          className="absolute font-naruto text-4xl text-primary/10 animate-seal-float"
          style={{
            left: `${10 + i * 12}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${8 + i * 2}s`,
          }}
        >
          {symbol}
        </div>
      ))}
    </div>
  );
};

// Fire sparks effect
const FireSparks = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-primary rounded-full animate-spark"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: '0',
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

const NarutoEffects = () => {
  return (
    <>
      <ChakraOrbs />
      <FlyingKunai />
      <SharinganEye />
      <JutsuSeals />
      <FireSparks />
    </>
  );
};

export default NarutoEffects;
