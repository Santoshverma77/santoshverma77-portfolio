import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useSounds } from "@/contexts/SoundContext";

const SoundToggle = () => {
  const { enabled, setEnabled, playClick } = useSounds();

  const handleToggle = () => {
    if (enabled) {
      playClick();
    }
    setEnabled(!enabled);
  };

  return (
    <motion.button
      onClick={handleToggle}
      className="fixed bottom-24 right-6 z-50 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-primary/30 shadow-lg hover:shadow-primary/20 transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      title={enabled ? "Mute sounds" : "Enable sounds"}
    >
      <AnimatePresence mode="wait">
        {enabled ? (
          <motion.div
            key="enabled"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ duration: 0.2 }}
          >
            <Volume2 className="w-5 h-5 text-primary" />
          </motion.div>
        ) : (
          <motion.div
            key="disabled"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ duration: 0.2 }}
          >
            <VolumeX className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Glow effect when enabled */}
      {enabled && (
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
};

export default SoundToggle;
