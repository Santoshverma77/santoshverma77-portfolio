import { motion } from "framer-motion";
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
      {enabled ? (
        <Volume2 className="w-5 h-5 text-primary" />
      ) : (
        <VolumeX className="w-5 h-5 text-muted-foreground" />
      )}
    </motion.button>
  );
};

export default SoundToggle;
