import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fades + lifts children into view once when they scroll into the viewport. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const wordParent: Variants = { show: { transition: { staggerChildren: 0.06 } } };
const wordChild: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: EASE } },
};

/** Splits a headline into words that slide up from a mask. */
export function SplitHeading({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={wordParent}
      aria-label={text}
    >
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden>
          <motion.span className="inline-block" variants={wordChild}>
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <header className="relative mx-auto max-w-6xl px-5 pb-12 pt-32 sm:px-8 md:pt-40">
      <Reveal>
        <p className="font-mono-ui text-xs uppercase tracking-[0.25em] text-muted-foreground">{eyebrow}</p>
      </Reveal>
      <h1 className="font-display mt-4 text-5xl font-bold leading-[0.95] sm:text-7xl md:text-8xl">
        <SplitHeading text={title} />
      </h1>
      {intro && (
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{intro}</p>
        </Reveal>
      )}
    </header>
  );
}
