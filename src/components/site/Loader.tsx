import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/** First-visit intro: counter 0→100, then the curtain lifts. Shown once per session. */
export default function Loader() {
  const [show, setShow] = useState(false);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("sv-intro")) return;
    setShow(true);
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1400);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => { setShow(false); sessionStorage.setItem("sv-intro", "1"); }, 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-mint p-6 sm:p-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          <p className="font-mono-ui text-xs uppercase tracking-[0.3em]">Santosh Kumar Verma — Portfolio</p>
          <div className="flex items-end justify-between">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display max-w-sm text-2xl font-bold sm:text-4xl">
              Code · Cinema · Curiosity
            </motion.p>
            <p className="font-display text-7xl font-bold tabular-nums sm:text-[10rem] leading-none">{n}</p>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-ink origin-left" style={{ transform: `scaleX(${n / 100})` }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
