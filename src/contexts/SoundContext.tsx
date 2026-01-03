import { createContext, useContext, ReactNode, useState, useCallback, useRef } from "react";

interface SoundContextType {
  playClick: () => void;
  playHover: () => void;
  playPortal: () => void;
  playNavigate: () => void;
  playFlicker: () => void;
  playDemogorgon: () => void;
  playSynth: () => void;
  playStatic: () => void;
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

  // 80s Synth Click Sound
  const playClick = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(200, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.1);
    } catch (e) {
      // Silently fail if audio unavailable
    }
  }, [enabled, getAudioContext]);

  // Subtle hover blip
  const playHover = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.05);
      
      gainNode.gain.setValueAtTime(0.02, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.05);
    } catch (e) {
      // Silently fail
    }
  }, [enabled, getAudioContext]);

  // Portal opening sound - deep, ominous
  const playPortal = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      
      // Deep bass rumble
      for (let i = 0; i < 6; i++) {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(200, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.8);
        
        oscillator.type = i % 2 === 0 ? "sine" : "sawtooth";
        const baseFreq = 40 + i * 20;
        oscillator.frequency.setValueAtTime(baseFreq, ctx.currentTime + i * 0.1);
        oscillator.frequency.exponentialRampToValueAtTime(baseFreq * 0.5, ctx.currentTime + i * 0.1 + 0.8);
        
        gainNode.gain.setValueAtTime(0, ctx.currentTime + i * 0.1);
        gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + i * 0.1 + 0.2);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.8);
        
        oscillator.start(ctx.currentTime + i * 0.1);
        oscillator.stop(ctx.currentTime + i * 0.1 + 0.8);
      }
    } catch (e) {
      // Silently fail
    }
  }, [enabled, getAudioContext]);

  // Navigation whoosh
  const playNavigate = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      filter.type = "highpass";
      filter.frequency.setValueAtTime(200, ctx.currentTime);
      
      oscillator.type = "sawtooth";
      oscillator.frequency.setValueAtTime(150, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.04, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.2);
    } catch (e) {
      // Silently fail
    }
  }, [enabled, getAudioContext]);

  // Light flickering sound
  const playFlicker = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      
      for (let i = 0; i < 4; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(2000 + Math.random() * 1000, ctx.currentTime + i * 0.05);
        
        gain.gain.setValueAtTime(0.02, ctx.currentTime + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.05 + 0.03);
        
        osc.start(ctx.currentTime + i * 0.05);
        osc.stop(ctx.currentTime + i * 0.05 + 0.03);
      }
    } catch (e) {
      // Silently fail
    }
  }, [enabled, getAudioContext]);

  // Demogorgon growl - low, menacing
  const playDemogorgon = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      
      // Low growl
      const growl = ctx.createOscillator();
      const growlGain = ctx.createGain();
      const growlFilter = ctx.createBiquadFilter();
      
      growl.connect(growlFilter);
      growlFilter.connect(growlGain);
      growlGain.connect(ctx.destination);
      
      growl.type = "sawtooth";
      growl.frequency.setValueAtTime(50, ctx.currentTime);
      growl.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.5);
      
      growlFilter.type = "lowpass";
      growlFilter.frequency.setValueAtTime(150, ctx.currentTime);
      
      growlGain.gain.setValueAtTime(0.08, ctx.currentTime);
      growlGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      
      growl.start(ctx.currentTime);
      growl.stop(ctx.currentTime + 0.5);
      
      // Distorted overlay
      for (let i = 0; i < 3; i++) {
        const noise = ctx.createOscillator();
        const noiseGain = ctx.createGain();
        
        noise.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        
        noise.type = "square";
        noise.frequency.setValueAtTime(60 + Math.random() * 40, ctx.currentTime + i * 0.1);
        
        noiseGain.gain.setValueAtTime(0.02, ctx.currentTime + i * 0.1);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.2);
        
        noise.start(ctx.currentTime + i * 0.1);
        noise.stop(ctx.currentTime + i * 0.1 + 0.2);
      }
    } catch (e) {
      // Silently fail
    }
  }, [enabled, getAudioContext]);

  // 80s Synth pad sound
  const playSynth = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      
      const notes = [261.63, 329.63, 392.00]; // C4, E4, G4
      
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(800, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.5);
        
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        
        osc.start(ctx.currentTime + i * 0.05);
        osc.stop(ctx.currentTime + 0.5);
      });
    } catch (e) {
      // Silently fail
    }
  }, [enabled, getAudioContext]);

  // TV Static sound
  const playStatic = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      const bufferSize = ctx.sampleRate * 0.2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = ctx.createBufferSource();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      noise.buffer = buffer;
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(3000, ctx.currentTime);
      filter.Q.setValueAtTime(1, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      
      noise.start(ctx.currentTime);
    } catch (e) {
      // Silently fail
    }
  }, [enabled, getAudioContext]);

  return (
    <SoundContext.Provider value={{ 
      playClick, 
      playHover, 
      playPortal, 
      playNavigate, 
      playFlicker,
      playDemogorgon,
      playSynth,
      playStatic,
      enabled, 
      setEnabled 
    }}>
      {children}
    </SoundContext.Provider>
  );
};
