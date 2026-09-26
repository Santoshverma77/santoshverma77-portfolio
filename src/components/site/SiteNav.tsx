import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { MORE_LINKS, NAV, PERSON } from "@/content/site";

export default function SiteNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
        <nav
          aria-label="Main"
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-500 sm:px-4 ${
            scrolled ? "border-border bg-background/75 shadow-soft backdrop-blur-xl" : "border-transparent"
          }`}
        >
          <Link to="/" className="font-display flex items-center gap-2 text-lg font-bold" aria-label="Home">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-sm text-background">SV</span>
            <span className="hidden sm:inline">{PERSON.firstName}.</span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => {
              const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
              return (
                <li key={n.to} className="relative">
                  <Link to={n.to} className="relative z-10 block rounded-full px-4 py-2 text-sm font-medium">
                    {n.label}
                  </Link>
                  {active && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-mint" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Link to="/hire" className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:scale-[1.04]">
              Hire me
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/95 px-6 pt-28 backdrop-blur-xl lg:hidden"
            initial={{ clipPath: "circle(0% at 95% 4%)" }}
            animate={{ clipPath: "circle(150% at 95% 4%)" }}
            exit={{ clipPath: "circle(0% at 95% 4%)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="space-y-2">
              {[...NAV, { to: "/hire", label: "Hire me" }].map((n, i) => (
                <motion.li key={n.to} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}>
                  <Link to={n.to} className="font-display block text-4xl font-bold">
                    {n.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-2">
              {MORE_LINKS.map((m) => (
                <Link key={m.to} to={m.to} className="rounded-full border border-border px-4 py-2 text-sm">
                  {m.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
