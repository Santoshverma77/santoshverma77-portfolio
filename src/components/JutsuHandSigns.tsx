import { useEffect, useState } from "react";

const handSigns = ["🤞", "🤟", "🤘", "✌️", "🤙", "👆", "🖖", "✋", "👊", "🙏"];

interface JutsuHandSignsProps {
  isActive?: boolean;
  onComplete?: () => void;
  speed?: number;
}

const JutsuHandSigns = ({ isActive = false, onComplete, speed = 150 }: JutsuHandSignsProps) => {
  const [currentSign, setCurrentSign] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setCurrentSign(0);
      setIsAnimating(false);
      return;
    }

    setIsAnimating(true);
    const interval = setInterval(() => {
      setCurrentSign((prev) => {
        if (prev >= handSigns.length - 1) {
          clearInterval(interval);
          setIsAnimating(false);
          onComplete?.();
          return 0;
        }
        return prev + 1;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [isActive, onComplete, speed]);

  if (!isActive && !isAnimating) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6">
        {/* Current hand sign */}
        <div className="relative">
          <span 
            className="text-8xl animate-bounce block"
            style={{ animationDuration: "0.2s" }}
          >
            {handSigns[currentSign]}
          </span>
          {/* Chakra effect */}
          <div className="absolute -inset-8 rounded-full bg-primary/20 blur-xl animate-pulse" />
        </div>

        {/* Sign sequence indicator */}
        <div className="flex gap-2">
          {handSigns.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index <= currentSign 
                  ? "bg-primary scale-125" 
                  : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        {/* Text */}
        <p className="font-naruto text-2xl text-gradient-fire animate-pulse">
          Weaving Signs...
        </p>
      </div>
    </div>
  );
};

export default JutsuHandSigns;
