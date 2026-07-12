import { useEffect, useState } from "react";

const KEY = "portfolio:motion-3d";

export const useMotion3D = () => {
  const prefersReduced = typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  const [enabled, setEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    const stored = localStorage.getItem(KEY);
    if (stored === "off") return false;
    if (stored === "on") return true;
    return !prefersReduced;
  });

  useEffect(() => {
    localStorage.setItem(KEY, enabled ? "on" : "off");
  }, [enabled]);

  return { enabled, toggle: () => setEnabled((v) => !v) };
};
