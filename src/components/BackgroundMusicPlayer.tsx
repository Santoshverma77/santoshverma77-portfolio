import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Pause, Play, SkipForward, Volume2 } from "lucide-react";
import { useSounds } from "@/contexts/SoundContext";

// Naruto-style ambient music using Web Audio API synthesis
const useAmbientMusic = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{
    masterGain: GainNode | null;
    oscillators: OscillatorNode[];
    gains: GainNode[];
  }>({ masterGain: null, oscillators: [], gains: [] });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const animationFrameRef = useRef<number | null>(null);

  const tracks = [
    { name: "Konoha Sunset", mood: "peaceful" },
    { name: "Training Grounds", mood: "motivational" },
    { name: "Hidden Leaf Village", mood: "mysterious" },
  ];

  const stopMusic = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    nodesRef.current.oscillators.forEach(osc => {
      try { osc.stop(); } catch {}
    });
    nodesRef.current.oscillators = [];
    nodesRef.current.gains = [];
    setIsPlaying(false);
  }, []);

  const playMusic = useCallback((trackIndex: number) => {
    stopMusic();

    if (!audioContextRef.current || audioContextRef.current.state === "closed") {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const ctx = audioContextRef.current;
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.15, ctx.currentTime);
    masterGain.connect(ctx.destination);
    nodesRef.current.masterGain = masterGain;

    const mood = tracks[trackIndex].mood;
    const oscillators: OscillatorNode[] = [];
    const gains: GainNode[] = [];

    // Different chord progressions based on mood
    const progressions: Record<string, number[][]> = {
      peaceful: [
        [261.63, 329.63, 392], // C major
        [293.66, 369.99, 440], // D major
        [246.94, 311.13, 369.99], // B minor
        [220, 277.18, 329.63], // A minor
      ],
      motivational: [
        [329.63, 415.3, 493.88], // E major
        [349.23, 440, 523.25], // F major
        [392, 493.88, 587.33], // G major
        [329.63, 415.3, 493.88], // E major
      ],
      mysterious: [
        [220, 261.63, 329.63], // A minor
        [196, 246.94, 293.66], // G minor
        [174.61, 220, 261.63], // F minor
        [164.81, 207.65, 246.94], // E minor
      ],
    };

    const chords = progressions[mood] || progressions.peaceful;
    let chordIndex = 0;
    let noteTime = ctx.currentTime;

    const createChord = (frequencies: number[], startTime: number) => {
      frequencies.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        osc.type = i === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, startTime);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1000, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.08 / (i + 1), startTime + 0.5);
        gain.gain.linearRampToValueAtTime(0.04 / (i + 1), startTime + 3.5);
        gain.gain.linearRampToValueAtTime(0, startTime + 4);

        osc.start(startTime);
        osc.stop(startTime + 4.5);

        oscillators.push(osc);
        gains.push(gain);
      });
    };

    // Create initial chords
    for (let i = 0; i < 8; i++) {
      createChord(chords[i % chords.length], noteTime);
      noteTime += 4;
    }

    nodesRef.current.oscillators = oscillators;
    nodesRef.current.gains = gains;

    // Schedule more chords as music plays
    const scheduleMore = () => {
      if (!isPlaying) return;
      const currentTime = ctx.currentTime;
      
      while (noteTime < currentTime + 16) {
        createChord(chords[chordIndex % chords.length], noteTime);
        chordIndex++;
        noteTime += 4;
      }

      animationFrameRef.current = requestAnimationFrame(scheduleMore);
    };

    setIsPlaying(true);
    setCurrentTrack(trackIndex);
    animationFrameRef.current = requestAnimationFrame(scheduleMore);
  }, [stopMusic, tracks]);

  const nextTrack = useCallback(() => {
    const next = (currentTrack + 1) % tracks.length;
    if (isPlaying) {
      playMusic(next);
    } else {
      setCurrentTrack(next);
    }
  }, [currentTrack, isPlaying, playMusic, tracks.length]);

  const setVolume = useCallback((volume: number) => {
    if (nodesRef.current.masterGain) {
      nodesRef.current.masterGain.gain.setValueAtTime(volume * 0.15, audioContextRef.current?.currentTime || 0);
    }
  }, []);

  useEffect(() => {
    return () => {
      stopMusic();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [stopMusic]);

  return {
    isPlaying,
    currentTrack,
    tracks,
    playMusic,
    stopMusic,
    nextTrack,
    setVolume,
  };
};

const BackgroundMusicPlayer = () => {
  const { isPlaying, currentTrack, tracks, playMusic, stopMusic, nextTrack, setVolume } = useAmbientMusic();
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const { playClick } = useSounds();

  const handlePlayPause = () => {
    playClick();
    if (isPlaying) {
      stopMusic();
    } else {
      playMusic(currentTrack);
    }
  };

  const handleNextTrack = () => {
    playClick();
    nextTrack();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolumeState(newVolume);
    setVolume(newVolume);
  };

  return (
    <motion.div
      className="fixed bottom-40 right-6 z-50"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute bottom-14 right-0 w-64 p-4 rounded-xl bg-background/90 backdrop-blur-sm border border-primary/30 shadow-lg"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {tracks[currentTrack].name}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  onClick={handlePlayPause}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-primary/20 hover:bg-primary/30 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 text-primary" />
                  ) : (
                    <Play className="w-4 h-4 text-primary" />
                  )}
                </motion.button>

                <motion.button
                  onClick={handleNextTrack}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-primary/20 hover:bg-primary/30 transition-colors"
                >
                  <SkipForward className="w-4 h-4 text-primary" />
                </motion.button>

                <div className="flex-1 flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-muted-foreground" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="flex-1 h-1 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full"
                  />
                </div>
              </div>

              {/* Visualizer */}
              {isPlaying && (
                <div className="flex items-end justify-center gap-1 h-8">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 bg-gradient-to-t from-primary to-naruto-orange rounded-full"
                      animate={{
                        height: [8, 20 + Math.random() * 12, 8],
                      }}
                      transition={{
                        duration: 0.5 + Math.random() * 0.3,
                        repeat: Infinity,
                        delay: i * 0.05,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => {
          playClick();
          setIsExpanded(!isExpanded);
        }}
        className={`p-3 rounded-full bg-background/80 backdrop-blur-sm border shadow-lg transition-all duration-300 ${
          isPlaying 
            ? "border-primary shadow-primary/30" 
            : "border-primary/30 hover:shadow-primary/20"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Background Music"
      >
        <Music className={`w-5 h-5 ${isPlaying ? "text-primary" : "text-muted-foreground"}`} />
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>
    </motion.div>
  );
};

export default BackgroundMusicPlayer;