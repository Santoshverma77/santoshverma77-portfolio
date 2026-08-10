import { useEffect, useState, useSyncExternalStore } from "react";

const KEY = "portfolio:motion-3d";
const GRAIN_KEY = "portfolio:3d-grain";
const ABERRATION_KEY = "portfolio:3d-aberration";

/** Rendering quality is locked to high. */
export type Quality3D = "high";

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
  /** 0 – 100 film grain intensity */
  grain: number;
  /** 0 – 100 chromatic aberration intensity */
  aberration: number;
};

const readNumber = (key: string, fallback: number) => {
  if (typeof window === "undefined") return fallback;
  const stored = localStorage.getItem(key);
  if (stored === null) return fallback;
  const raw = Number(stored);
  return Number.isFinite(raw) && raw >= 0 && raw <= 100 ? raw : fallback;
};

const initial = (): State => {
  if (typeof window === "undefined")
    return { enabled: true, grain: 35, aberration: 30 };
  const stored = localStorage.getItem(KEY);
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  return {
    enabled:
      stored === "off"
        ? false
        : stored === "on"
        ? true
        : !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
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
    /** Rendering is always high quality. */
    quality: "high" as Quality3D,
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
