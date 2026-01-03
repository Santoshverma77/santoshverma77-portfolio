import { createContext, useContext, ReactNode, useState, useCallback, useRef } from "react";

interface SoundContextType {
  playClick: () => void;
  playHover: () => void;
  playJutsu: () => void;
  playNavigate: () => void;
  playRasengan: () => void;
  playKunai: () => void;
  playChakra: () => void;
  playChidori: () => void;
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

  // Rasengan charging sound - spiraling energy buildup
  const playRasengan = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      
      // Create multiple layers for the spiraling energy effect
      for (let i = 0; i < 8; i++) {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(800 + i * 200, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(2000 + i * 300, ctx.currentTime + 0.8);
        
        oscillator.type = i % 2 === 0 ? "sine" : "sawtooth";
        const baseFreq = 150 + i * 50;
        oscillator.frequency.setValueAtTime(baseFreq, ctx.currentTime + i * 0.1);
        oscillator.frequency.exponentialRampToValueAtTime(baseFreq * 3, ctx.currentTime + i * 0.1 + 0.6);
        
        gainNode.gain.setValueAtTime(0, ctx.currentTime + i * 0.1);
        gainNode.gain.linearRampToValueAtTime(0.04, ctx.currentTime + i * 0.1 + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.6);
        
        oscillator.start(ctx.currentTime + i * 0.1);
        oscillator.stop(ctx.currentTime + i * 0.1 + 0.6);
      }
      
      // Add whooshing wind effect
      const noise = ctx.createOscillator();
      const noiseGain = ctx.createGain();
      const noiseFilter = ctx.createBiquadFilter();
      
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      
      noise.type = "triangle";
      noise.frequency.setValueAtTime(100, ctx.currentTime);
      noise.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.8);
      
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.setValueAtTime(500, ctx.currentTime);
      noiseFilter.Q.setValueAtTime(1, ctx.currentTime);
      
      noiseGain.gain.setValueAtTime(0.02, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.5);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
      
      noise.start(ctx.currentTime);
      noise.stop(ctx.currentTime + 0.8);
    } catch (e) {
      // Silently fail
    }
  }, [enabled, getAudioContext]);

  // Kunai throwing sound - sharp metallic whoosh
  const playKunai = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      
      // Metal ring sound
      const ring = ctx.createOscillator();
      const ringGain = ctx.createGain();
      
      ring.connect(ringGain);
      ringGain.connect(ctx.destination);
      
      ring.type = "sine";
      ring.frequency.setValueAtTime(2500, ctx.currentTime);
      ring.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + 0.15);
      
      ringGain.gain.setValueAtTime(0.08, ctx.currentTime);
      ringGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      
      ring.start(ctx.currentTime);
      ring.stop(ctx.currentTime + 0.15);
      
      // Whoosh effect
      const whoosh = ctx.createOscillator();
      const whooshGain = ctx.createGain();
      const whooshFilter = ctx.createBiquadFilter();
      
      whoosh.connect(whooshFilter);
      whooshFilter.connect(whooshGain);
      whooshGain.connect(ctx.destination);
      
      whoosh.type = "sawtooth";
      whoosh.frequency.setValueAtTime(800, ctx.currentTime);
      whoosh.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.2);
      
      whooshFilter.type = "highpass";
      whooshFilter.frequency.setValueAtTime(400, ctx.currentTime);
      
      whooshGain.gain.setValueAtTime(0.03, ctx.currentTime);
      whooshGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      
      whoosh.start(ctx.currentTime);
      whoosh.stop(ctx.currentTime + 0.2);
    } catch (e) {
      // Silently fail
    }
  }, [enabled, getAudioContext]);

  // Chakra release sound - energy burst
  const playChakra = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      
      // Low rumble base
      const bass = ctx.createOscillator();
      const bassGain = ctx.createGain();
      
      bass.connect(bassGain);
      bassGain.connect(ctx.destination);
      
      bass.type = "sine";
      bass.frequency.setValueAtTime(80, ctx.currentTime);
      bass.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.4);
      
      bassGain.gain.setValueAtTime(0.1, ctx.currentTime);
      bassGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      
      bass.start(ctx.currentTime);
      bass.stop(ctx.currentTime + 0.4);
      
      // Energy burst layers
      for (let i = 0; i < 5; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = "triangle";
        const freq = 200 + i * 150;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.5, ctx.currentTime + 0.3);
        
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        
        osc.start(ctx.currentTime + i * 0.02);
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch (e) {
      // Silently fail
    }
  }, [enabled, getAudioContext]);

  // Chidori sound - electric crackling
  const playChidori = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      
      // Create electric crackling effect
      for (let i = 0; i < 12; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = "square";
        const startTime = ctx.currentTime + Math.random() * 0.5;
        const freq = 1000 + Math.random() * 3000;
        
        osc.frequency.setValueAtTime(freq, startTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.3, startTime + 0.05);
        
        gain.gain.setValueAtTime(0.02 + Math.random() * 0.02, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.05);
        
        osc.start(startTime);
        osc.stop(startTime + 0.05);
      }
      
      // Base electrical hum
      const hum = ctx.createOscillator();
      const humGain = ctx.createGain();
      const humFilter = ctx.createBiquadFilter();
      
      hum.connect(humFilter);
      humFilter.connect(humGain);
      humGain.connect(ctx.destination);
      
      hum.type = "sawtooth";
      hum.frequency.setValueAtTime(120, ctx.currentTime);
      
      humFilter.type = "lowpass";
      humFilter.frequency.setValueAtTime(300, ctx.currentTime);
      
      humGain.gain.setValueAtTime(0.04, ctx.currentTime);
      humGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
      
      hum.start(ctx.currentTime);
      hum.stop(ctx.currentTime + 0.6);
    } catch (e) {
      // Silently fail
    }
  }, [enabled, getAudioContext]);

  return (
    <SoundContext.Provider value={{ 
      playClick, 
      playHover, 
      playJutsu, 
      playNavigate, 
      playRasengan,
      playKunai,
      playChakra,
      playChidori,
      enabled, 
      setEnabled 
    }}>
      {children}
    </SoundContext.Provider>
  );
};
