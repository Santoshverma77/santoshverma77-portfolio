import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref + visibility flag for intersection-based reveals.
 * Respects prefers-reduced-motion (instantly visible, no transform delay).
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  threshold = 0.15
) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export const REVEAL_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/** Inline style helper for a staggered child reveal. */
export function revealStyle(visible: boolean, index = 0, stepMs = 90) {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 700ms ${REVEAL_EASE} ${index * stepMs}ms, transform 700ms ${REVEAL_EASE} ${index * stepMs}ms`,
  } as const;
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}
