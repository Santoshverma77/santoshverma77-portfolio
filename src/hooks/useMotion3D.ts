import { useEffect, useState } from "react";

const KEY = "portfolio:motion-3d";
const QUALITY_KEY = "portfolio:3d-quality";

export type Quality3D = "low" | "medium" | "high";
const QUALITIES: Quality3D[] = ["low", "medium", "high"];

export const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
};

export const useMotion3D = () => {
  const prefersReduced = usePrefersReducedMotion();

  const [enabled, setEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    const stored = localStorage.getItem(KEY);
    if (stored === "off") return false;
    if (stored === "on") return true;
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  const [quality, setQuality] = useState<Quality3D>(() => {
    if (typeof window === "undefined") return "high";
    const stored = localStorage.getItem(QUALITY_KEY) as Quality3D | null;
    if (stored && QUALITIES.includes(stored)) return stored;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    return coarse ? "medium" : "high";
  });

  useEffect(() => {
    localStorage.setItem(KEY, enabled ? "on" : "off");
  }, [enabled]);

  useEffect(() => {
    localStorage.setItem(QUALITY_KEY, quality);
  }, [quality]);

  const cycleQuality = () =>
    setQuality((q) => QUALITIES[(QUALITIES.indexOf(q) + 1) % QUALITIES.length]);

  return {
    enabled,
    toggle: () => setEnabled((v) => !v),
    quality,
    setQuality,
    cycleQuality,
    prefersReduced,
    /** true when motion should be paused/simplified */
    reducedMotion: prefersReduced || !enabled,
  };
};
