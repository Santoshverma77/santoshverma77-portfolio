import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Pause, Play, SkipForward, Volume2 } from "lucide-react";
import { useSounds } from "@/contexts/SoundContext";

// Stranger Things style synth music using Web Audio API
const useSynthMusic = () => {
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
    { name: "Hawkins Lab", mood: "dark" },
    { name: "The Upside Down", mood: "eerie" },
    { name: "Eleven's Theme", mood: "emotional" },
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
    masterGain.gain.setValueAtTime(0.12, ctx.currentTime);
    masterGain.connect(ctx.destination);
    nodesRef.current.masterGain = masterGain;

    const mood = tracks[trackIndex].mood;
    const oscillators: OscillatorNode[] = [];
    const gains: GainNode[] = [];

    // 80s synth chord progressions
    const progressions: Record<string, number[][]> = {
      dark: [
        [130.81, 164.81, 196], // C minor
        [123.47, 155.56, 185], // B minor
        [116.54, 146.83, 174.61], // Bb minor
        [110, 138.59, 164.81], // A minor
      ],
      eerie: [
        [98, 123.47, 146.83], // G minor
        [92.5, 116.54, 138.59], // F# minor
        [87.31, 110, 130.81], // F minor
        [82.41, 103.83, 123.47], // E minor
      ],
      emotional: [
        [146.83, 185, 220], // D minor
        [164.81, 207.65, 246.94], // E minor
        [174.61, 220, 261.63], // F major
        [196, 246.94, 293.66], // G major
      ],
    };

    const chords = progressions[mood] || progressions.dark;
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

        // 80s synth sound
        osc.type = i === 0 ? "sawtooth" : "square";
        osc.frequency.setValueAtTime(freq, startTime);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(400, startTime);
        filter.frequency.exponentialRampToValueAtTime(800, startTime + 1);
        filter.frequency.exponentialRampToValueAtTime(300, startTime + 4);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.06 / (i + 1), startTime + 0.3);
        gain.gain.linearRampToValueAtTime(0.03 / (i + 1), startTime + 3.5);
        gain.gain.linearRampToValueAtTime(0, startTime + 4);

        osc.start(startTime);
        osc.stop(startTime + 4.5);

        oscillators.push(osc);
        gains.push(gain);
      });

      // Add bass drone
      const bass = ctx.createOscillator();
      const bassGain = ctx.createGain();
      const bassFilter = ctx.createBiquadFilter();

      bass.connect(bassFilter);
      bassFilter.connect(bassGain);
      bassGain.connect(masterGain);

      bass.type = "sine";
      bass.frequency.setValueAtTime(frequencies[0] / 2, startTime);

      bassFilter.type = "lowpass";
      bassFilter.frequency.setValueAtTime(200, startTime);

      bassGain.gain.setValueAtTime(0, startTime);
      bassGain.gain.linearRampToValueAtTime(0.08, startTime + 0.5);
      bassGain.gain.linearRampToValueAtTime(0.04, startTime + 3.5);
      bassGain.gain.linearRampToValueAtTime(0, startTime + 4);

      bass.start(startTime);
      bass.stop(startTime + 4.5);

      oscillators.push(bass);
    };

    // Create initial chords
    for (let i = 0; i < 8; i++) {
      createChord(chords[i % chords.length], noteTime);
      noteTime += 4;
    }

    nodesRef.current.oscillators = oscillators;
    nodesRef.current.gains = gains;

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
      nodesRef.current.masterGain.gain.setValueAtTime(volume * 0.12, audioContextRef.current?.currentTime || 0);
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
  const { isPlaying, currentTrack, tracks, playMusic, stopMusic, nextTrack, setVolume } = useSynthMusic();
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
                <span className="text-sm font-stranger text-foreground">
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
                      className="w-1.5 rounded-full"
                      style={{
                        background: `linear-gradient(to top, hsl(0, 85%, 50%), hsl(280, 60%, 45%))`,
                      }}
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
        title="80s Synth Music"
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
