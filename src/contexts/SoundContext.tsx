import { createContext, useContext, ReactNode, useState, useCallback, useRef } from "react";

interface SoundContextType {
  playClick: () => void;
  playHover: () => void;
  playSynth: () => void;
  playNavigate: () => void;
  playFlicker: () => void;
  playPortal: () => void;
  playStatic: () => void;
  playDemogorgon: () => void;
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

  // 80s synth click sound
  const playClick = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(880, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.08);
      
      gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.08);
    } catch (e) {
      // Silently fail
    }
  }, [enabled, getAudioContext]);

  // Retro hover sound
  const playHover = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(400, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.04);
      
      gainNode.gain.setValueAtTime(0.02, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.04);
    } catch (e) {
      // Silently fail
    }
  }, [enabled, getAudioContext]);

  // Synth arpeggio sound
  const playSynth = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      const notes = [130.81, 164.81, 196.00, 261.63, 329.63, 392.00];
      
      notes.forEach((freq, i) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.type = "sawtooth";
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(2000, ctx.currentTime + i * 0.1);
        filter.Q.setValueAtTime(5, ctx.currentTime);
        
        oscillator.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);
        
        gainNode.gain.setValueAtTime(0, ctx.currentTime + i * 0.1);
        gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + i * 0.1 + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.15);
        
        oscillator.start(ctx.currentTime + i * 0.1);
        oscillator.stop(ctx.currentTime + i * 0.1 + 0.15);
      });
    } catch (e) {
      // Silently fail
    }
  }, [enabled, getAudioContext]);

  // Navigation synth swoosh
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
      
      oscillator.type = "sawtooth";
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1000, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + 0.1);
      filter.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.2);
      
      oscillator.frequency.setValueAtTime(150, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.15);
      
      gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.2);
    } catch (e) {
      // Silently fail
    }
  }, [enabled, getAudioContext]);

  // Flickering lights electrical sound
  const playFlicker = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      
      for (let i = 0; i < 5; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = "square";
        const startTime = ctx.currentTime + Math.random() * 0.3;
        
        osc.frequency.setValueAtTime(60 + Math.random() * 20, startTime);
        
        gain.gain.setValueAtTime(0.02, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.05);
        
        osc.start(startTime);
        osc.stop(startTime + 0.05);
      }
    } catch (e) {
      // Silently fail
    }
  }, [enabled, getAudioContext]);

  // Upside Down portal sound
  const playPortal = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      
      // Deep rumbling bass
      const bass = ctx.createOscillator();
      const bassGain = ctx.createGain();
      
      bass.connect(bassGain);
      bassGain.connect(ctx.destination);
      
      bass.type = "sine";
      bass.frequency.setValueAtTime(40, ctx.currentTime);
      bass.frequency.exponentialRampToValueAtTime(20, ctx.currentTime + 0.8);
      
      bassGain.gain.setValueAtTime(0.1, ctx.currentTime);
      bassGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
      
      bass.start(ctx.currentTime);
      bass.stop(ctx.currentTime + 0.8);
      
      // Eerie harmonics
      for (let i = 0; i < 4; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = "triangle";
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(200 + i * 150, ctx.currentTime);
        
        osc.frequency.setValueAtTime(80 + i * 40, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40 + i * 20, ctx.currentTime + 0.6);
        
        gain.gain.setValueAtTime(0.03, ctx.currentTime + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
        
        osc.start(ctx.currentTime + i * 0.1);
        osc.stop(ctx.currentTime + 0.6);
      }
    } catch (e) {
      // Silently fail
    }
  }, [enabled, getAudioContext]);

  // TV static noise
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
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      noise.buffer = buffer;
      noise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(3000, ctx.currentTime);
      
      gainNode.gain.setValueAtTime(0.03, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      
      noise.start(ctx.currentTime);
      noise.stop(ctx.currentTime + 0.2);
    } catch (e) {
      // Silently fail
    }
  }, [enabled, getAudioContext]);

  // Demogorgon growl
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
      growlFilter.type = "lowpass";
      growlFilter.frequency.setValueAtTime(200, ctx.currentTime);
      
      growl.frequency.setValueAtTime(50, ctx.currentTime);
      growl.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.5);
      
      growlGain.gain.setValueAtTime(0.08, ctx.currentTime);
      growlGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      
      growl.start(ctx.currentTime);
      growl.stop(ctx.currentTime + 0.5);
      
      // Screechy overtones
      const screech = ctx.createOscillator();
      const screechGain = ctx.createGain();
      
      screech.connect(screechGain);
      screechGain.connect(ctx.destination);
      
      screech.type = "square";
      screech.frequency.setValueAtTime(800, ctx.currentTime + 0.1);
      screech.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.4);
      
      screechGain.gain.setValueAtTime(0.02, ctx.currentTime + 0.1);
      screechGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      
      screech.start(ctx.currentTime + 0.1);
      screech.stop(ctx.currentTime + 0.4);
    } catch (e) {
      // Silently fail
    }
  }, [enabled, getAudioContext]);

  return (
    <SoundContext.Provider value={{ 
      playClick, 
      playHover, 
      playSynth, 
      playNavigate, 
      playFlicker,
      playPortal,
      playStatic,
      playDemogorgon,
      enabled, 
      setEnabled 
    }}>
      {children}
    </SoundContext.Provider>
  );
};
