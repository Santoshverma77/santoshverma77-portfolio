import { motion, useInView, useReducedMotion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { STACK, type Tech } from "@/content/site";

/**
 * Tech-stack "launch": when the panel scrolls into view a rocket lifts off,
 * and each tech logo ignites as a star in the sky it leaves behind.
 * Pure CSS/SVG + Framer Motion — no WebGL, so it stays smooth on phones.
 */

// Deterministic pseudo-random star positions (same on server and client).
function seeded(i: number) {
  const x = Math.sin(i * 999.13) * 10000;
  return x - Math.floor(x);
}

function StarLogo({ t }: { t: Tech }) {
  const [broken, setBroken] = useState(false);
  if (t.slug && !broken) {
    return (
      <img
        src={`https://cdn.simpleicons.org/${t.slug}`}
        alt=""
        loading="lazy"
        width={24}
        height={24}
        className="h-5 w-5 sm:h-6 sm:w-6"
        onError={() => setBroken(true)}
      />
    );
  }
  return <span className="font-mono-ui text-xs font-bold">{t.mono ?? t.name.slice(0, 2)}</span>;
}

export default function RocketStack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<string | null>(null);

  const stars = useMemo(
    () =>
      STACK.map((t, i) => {
        // Spread in a loose band above the launch pad.
        const cols = 6;
        const col = i % cols;
        const row = Math.floor(i / cols);
        return {
          t,
          left: 6 + col * (88 / (cols - 1)) + (seeded(i) - 0.5) * 8,
          top: 8 + row * 17 + (seeded(i + 40) - 0.5) * 8,
          delay: 1.1 + seeded(i + 7) * 1.4,
        };
      }),
    [],
  );

  const tiny = useMemo(() => Array.from({ length: 40 }, (_, i) => ({ l: seeded(i + 100) * 100, t: seeded(i + 200) * 100, d: seeded(i + 300) * 3 })), []);

  return (
    <div ref={ref} className="relative h-[620px] overflow-hidden rounded-[2rem] bg-ink sm:h-[680px]">
      {/* faint background stars */}
      {tiny.map((s, i) => (
        <span key={i} className="animate-twinkle absolute h-0.5 w-0.5 rounded-full bg-background" style={{ left: `${s.l}%`, top: `${s.t}%`, animationDelay: `${s.d}s` }} />
      ))}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-mint/25 to-transparent" />

      {/* tech stars */}
      {stars.map(({ t, left, top, delay }) => (
        <motion.button
          key={t.name}
          type="button"
          onMouseEnter={() => setHover(t.name)}
          onMouseLeave={() => setHover(null)}
          onFocus={() => setHover(t.name)}
          onBlur={() => setHover(null)}
          aria-label={t.name}
          className="group absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${left}%`, top: `${top}%` }}
          initial={reduce ? false : { opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: reduce ? 0 : delay, type: "spring", stiffness: 260, damping: 14 }}
        >
          <span className="absolute inset-0 -z-10 rounded-full bg-mint/40 blur-xl transition-opacity group-hover:opacity-100 opacity-60" />
          <span className="grid h-11 w-11 place-items-center rounded-full bg-background shadow-soft transition-transform duration-300 group-hover:scale-125 sm:h-14 sm:w-14">
            <StarLogo t={t} />
          </span>
          <span className={`font-mono-ui pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-background px-2 py-0.5 text-[10px] text-ink transition-opacity ${hover === t.name ? "opacity-100" : "opacity-0"}`}>
            {t.name}
          </span>
        </motion.button>
      ))}

      {/* rocket */}
      <motion.div
        className="absolute bottom-16 left-1/2 -ml-8"
        initial={{ y: 0 }}
        animate={inView && !reduce ? { y: [0, 6, -4, -900] } : {}}
        transition={{ duration: 2.6, times: [0, 0.15, 0.3, 1], ease: [0.5, 0, 0.75, 0] }}
      >
        <svg width="64" height="120" viewBox="0 0 64 120" aria-hidden>
          <path d="M32 2 C48 18 52 44 50 78 L14 78 C12 44 16 18 32 2Z" fill="hsl(var(--background))" />
          <circle cx="32" cy="42" r="9" fill="hsl(var(--sky))" stroke="hsl(var(--ink))" strokeWidth="3" />
          <path d="M14 60 L2 86 L16 80Z M50 60 L62 86 L48 80Z" fill="hsl(var(--peach))" />
          <rect x="22" y="78" width="20" height="8" rx="2" fill="hsl(var(--mint))" />
        </svg>
        <motion.div
          className="mx-auto h-16 w-6 origin-top rounded-b-full bg-gradient-to-b from-peach via-mint to-transparent blur-[2px]"
          animate={inView ? { scaleY: [0.4, 1.3, 0.9, 1.4], opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.25, repeat: Infinity, repeatType: "mirror" }}
        />
      </motion.div>

      {/* launch pad + smoke */}
      <div className="absolute inset-x-0 bottom-0 h-16 border-t border-background/10 bg-ink" />
      {[...Array(6)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute bottom-10 left-1/2 h-16 w-16 rounded-full bg-background/20 blur-md"
          initial={{ opacity: 0, x: "-50%", scale: 0.4 }}
          animate={inView && !reduce ? { opacity: [0, 0.7, 0], x: `${-50 + (i - 2.5) * 70}%`, scale: [0.4, 2.2] } : {}}
          transition={{ duration: 2, delay: 0.2 + i * 0.05 }}
        />
      ))}
      <p className="font-mono-ui absolute bottom-5 left-6 text-[10px] uppercase tracking-[0.3em] text-background/50">
        {inView ? "Liftoff · stack deployed" : "T-minus 3…2…1"}
      </p>
    </div>
  );
}
