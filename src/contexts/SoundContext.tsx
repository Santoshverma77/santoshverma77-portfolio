import { createContext, useContext, ReactNode, useState, useCallback, useRef, useEffect } from "react";

interface SoundContextType {
  playClick: () => void;
  playHover: () => void;
  playJutsu: () => void;
  playNavigate: () => void;
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
}

const SoundContext = createContext<SoundContextType | null>(null);

export const useSounds = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSounds must be used within SoundProvider");
  }
  return context;
};

interface SoundProviderProps {
  children: ReactNode;
}

export const SoundProvider = ({ children }: SoundProviderProps) => {
  const [enabled, setEnabled] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current || audioContextRef.current.state === "closed") {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, []);

  const playClick = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.1);
    } catch (e) {
      // Silently fail if audio unavailable
    }
  }, [enabled, getAudioContext]);

  const playHover = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(600, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.05);
      
      gainNode.gain.setValueAtTime(0.03, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.05);
    } catch (e) {
      // Silently fail
    }
  }, [enabled, getAudioContext]);

  const playJutsu = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      
      // Create chakra charging sound
      const frequencies = [200, 300, 400, 500, 600, 800];
      
      frequencies.forEach((freq, i) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.type = i % 2 === 0 ? "sine" : "triangle";
        oscillator.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
        oscillator.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + i * 0.08 + 0.1);
        
        gainNode.gain.setValueAtTime(0.06, ctx.currentTime + i * 0.08);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.08 + 0.1);
        
        oscillator.start(ctx.currentTime + i * 0.08);
        oscillator.stop(ctx.currentTime + i * 0.08 + 0.1);
      });
    } catch (e) {
      // Silently fail
    }
  }, [enabled, getAudioContext]);

  const playNavigate = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(300, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
      oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.06, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.2);
    } catch (e) {
      // Silently fail
    }
  }, [enabled, getAudioContext]);

  return (
    <SoundContext.Provider value={{ playClick, playHover, playJutsu, playNavigate, enabled, setEnabled }}>
      {children}
    </SoundContext.Provider>
  );
};
