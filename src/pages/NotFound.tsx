import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";

export default function NotFound() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <section className="relative flex min-h-[90svh] items-center justify-center overflow-hidden px-5 pt-24">
      <div className="bg-aurora pointer-events-none absolute inset-0" />
      <div className="relative text-center">
        <div className="font-display flex items-center justify-center text-[28vw] font-bold leading-none sm:text-[14rem]">
          <motion.span initial={{ y: -200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", damping: 9 }}>4</motion.span>
          <motion.span
            className="mx-2 inline-grid h-[0.8em] w-[0.8em] place-items-center rounded-full bg-mint"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          >
            <span className="h-[0.18em] w-[0.18em] -translate-y-[0.22em] rounded-full bg-ink" />
          </motion.span>
          <motion.span initial={{ y: -200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", damping: 9, delay: 0.15 }}>4</motion.span>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">Lost in orbit.</h1>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            <code className="font-mono-ui rounded bg-muted px-1.5 py-0.5 text-sm">{pathname}</code> drifted off the map. Let's get you back.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" className="rounded-full bg-ink px-6 py-3.5 font-semibold text-background">Back home</Link>
            <Link to="/projects" className="rounded-full border border-border bg-card px-6 py-3.5 font-semibold hover:bg-mint">See my work</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
