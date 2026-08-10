import { useEffect, useState, useSyncExternalStore } from "react";

const KEY = "portfolio:motion-3d";
const QUALITY_KEY = "portfolio:3d-quality";
const GRAIN_KEY = "portfolio:3d-grain";
const ABERRATION_KEY = "portfolio:3d-aberration";

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

/* ── Shared store so every consumer (hero emblem + control panel) stays in sync ── */

type State = {
  enabled: boolean;
  quality: Quality3D;
  /** 0 – 100 film grain intensity */
  grain: number;
  /** 0 – 100 chromatic aberration intensity */
  aberration: number;
};

const readNumber = (key: string, fallback: number) => {
  if (typeof window === "undefined") return fallback;
  const raw = Number(localStorage.getItem(key));
  return Number.isFinite(raw) && raw >= 0 && raw <= 100 ? raw : fallback;
};

const initial = (): State => {
  if (typeof window === "undefined")
    return { enabled: true, quality: "high", grain: 35, aberration: 30 };
  const stored = localStorage.getItem(KEY);
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const storedQuality = localStorage.getItem(QUALITY_KEY) as Quality3D | null;
  return {
    enabled:
      stored === "off"
        ? false
        : stored === "on"
        ? true
        : !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    quality:
      storedQuality && QUALITIES.includes(storedQuality)
        ? storedQuality
        : coarse
        ? "medium"
        : "high",
    grain: readNumber(GRAIN_KEY, coarse ? 20 : 35),
    aberration: readNumber(ABERRATION_KEY, coarse ? 18 : 30),
  };
};

let state: State = initial();
const listeners = new Set<() => void>();

const setState = (patch: Partial<State>) => {
  state = { ...state, ...patch };
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY, state.enabled ? "on" : "off");
    localStorage.setItem(QUALITY_KEY, state.quality);
    localStorage.setItem(GRAIN_KEY, String(state.grain));
    localStorage.setItem(ABERRATION_KEY, String(state.aberration));
  }
  listeners.forEach((l) => l());
};

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

const getSnapshot = () => state;

export const useMotion3D = () => {
  const prefersReduced = usePrefersReducedMotion();
  const snap = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const clamp = (v: number) => Math.max(0, Math.min(100, Math.round(v)));

  return {
    enabled: snap.enabled,
    toggle: () => setState({ enabled: !state.enabled }),
    quality: snap.quality,
    setQuality: (q: Quality3D) => setState({ quality: q }),
    cycleQuality: () =>
      setState({ quality: QUALITIES[(QUALITIES.indexOf(state.quality) + 1) % QUALITIES.length] }),
    grain: snap.grain,
    setGrain: (v: number) => setState({ grain: clamp(v) }),
    aberration: snap.aberration,
    setAberration: (v: number) => setState({ aberration: clamp(v) }),
    resetEffects: () => setState({ grain: 35, aberration: 30 }),
    prefersReduced,
    /** true when motion should be paused/simplified */
    reducedMotion: prefersReduced || !snap.enabled,
  };
};
