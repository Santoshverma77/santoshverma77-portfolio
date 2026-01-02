import { useCallback, useRef } from "react";

// Sound effect URLs (using free sound effects)
const SOUNDS = {
  click: "data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA==",
  hover: "data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA==",
  jutsu: "data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA==",
  navigate: "data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA==",
};

// Create audio context for sound synthesis
const createAudioContext = () => {
  return new (window.AudioContext || (window as any).webkitAudioContext)();
};

export const useSoundEffects = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const enabledRef = useRef(true);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = createAudioContext();
    }
    return audioContextRef.current;
  }, []);

  const playClick = useCallback(() => {
    if (!enabledRef.current) return;
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
      console.log("Sound effect unavailable");
    }
  }, [getAudioContext]);

  const playHover = useCallback(() => {
    if (!enabledRef.current) return;
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(600, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.05);
      
      gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.05);
    } catch (e) {
      console.log("Sound effect unavailable");
    }
  }, [getAudioContext]);

  const playJutsu = useCallback(() => {
    if (!enabledRef.current) return;
    try {
      const ctx = getAudioContext();
      
      // Create multiple oscillators for a richer sound
      const frequencies = [200, 300, 400, 500, 600];
      
      frequencies.forEach((freq, i) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.type = i % 2 === 0 ? "sine" : "triangle";
        oscillator.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.05);
        oscillator.frequency.exponentialRampToValueAtTime(freq * 2, ctx.currentTime + i * 0.05 + 0.15);
        
        gainNode.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.05 + 0.15);
        
        oscillator.start(ctx.currentTime + i * 0.05);
        oscillator.stop(ctx.currentTime + i * 0.05 + 0.15);
      });
    } catch (e) {
      console.log("Sound effect unavailable");
    }
  }, [getAudioContext]);

  const playNavigate = useCallback(() => {
    if (!enabledRef.current) return;
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(300, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.15);
      oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.3);
      
      gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.3);
    } catch (e) {
      console.log("Sound effect unavailable");
    }
  }, [getAudioContext]);

  const setEnabled = useCallback((enabled: boolean) => {
    enabledRef.current = enabled;
  }, []);

  return {
    playClick,
    playHover,
    playJutsu,
    playNavigate,
    setEnabled,
  };
};

// Create a singleton instance for global use
let globalSoundEffects: ReturnType<typeof useSoundEffects> | null = null;

export const getSoundEffects = () => {
  if (!globalSoundEffects) {
    const audioContext = createAudioContext();
    let enabled = true;

    const playClick = () => {
      if (!enabled) return;
      try {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      } catch (e) {
        console.log("Sound effect unavailable");
      }
    };

    const playHover = () => {
      if (!enabled) return;
      try {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.05);
        
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.05);
      } catch (e) {
        console.log("Sound effect unavailable");
      }
    };

    const playJutsu = () => {
      if (!enabled) return;
      try {
        const frequencies = [200, 300, 400, 500, 600];
        
        frequencies.forEach((freq, i) => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.type = i % 2 === 0 ? "sine" : "triangle";
          oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.05);
          oscillator.frequency.exponentialRampToValueAtTime(freq * 2, audioContext.currentTime + i * 0.05 + 0.15);
          
          gainNode.gain.setValueAtTime(0.08, audioContext.currentTime + i * 0.05);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.05 + 0.15);
          
          oscillator.start(audioContext.currentTime + i * 0.05);
          oscillator.stop(audioContext.currentTime + i * 0.05 + 0.15);
        });
      } catch (e) {
        console.log("Sound effect unavailable");
      }
    };

    const playNavigate = () => {
      if (!enabled) return;
      try {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = "triangle";
        oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.15);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.3);
        
        gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
      } catch (e) {
        console.log("Sound effect unavailable");
      }
    };

    globalSoundEffects = {
      playClick,
      playHover,
      playJutsu,
      playNavigate,
      setEnabled: (value: boolean) => { enabled = value; },
    };
  }
  return globalSoundEffects;
};
