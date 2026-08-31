import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Palette = "cinematic" | "classic";
const STORAGE_KEY = "sv-palette";

/** Simple palette switch: blue cinematic (default) vs neutral monochrome. */
const ThemeToggle = () => {
  const [palette, setPalette] = useState<Palette>(() => {
    if (typeof window === "undefined") return "cinematic";
    return (localStorage.getItem(STORAGE_KEY) as Palette) || "cinematic";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("dark");
    root.classList.remove("light");
    root.classList.toggle("theme-classic", palette === "classic");
    localStorage.setItem(STORAGE_KEY, palette);
  }, [palette]);

  const next = palette === "cinematic" ? "classic" : "cinematic";

  return (
    <motion.button
      onClick={() => setPalette(next)}
      className="fixed top-6 right-4 z-50 h-11 pl-2 pr-3 gap-2 rounded-full bg-background/70 backdrop-blur-xl border border-border hover:border-primary/50 hover:shadow-[0_0_24px_hsl(var(--primary)/0.3)] flex items-center transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      <span className="relative flex items-center justify-center w-7 h-7 rounded-full border border-border overflow-hidden">
        <motion.span
          key={palette}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="absolute inset-0.5 rounded-full"
          style={{
            background:
              palette === "cinematic"
                ? "radial-gradient(circle at 30% 30%, hsl(var(--primary)), hsl(var(--primary) / 0.25))"
                : "radial-gradient(circle at 30% 30%, hsl(0 0% 95%), hsl(0 0% 35%))",
          }}
        />
      </span>
      <span className="text-[9px] tracking-[0.25em] uppercase text-muted-foreground">
        {palette === "cinematic" ? "Blue" : "Mono"}
      </span>
    </motion.button>
  );
};

export default ThemeToggle;
