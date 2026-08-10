import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Download } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";
import { usePrefersReducedMotion } from "@/hooks/useReveal";
import { useMotion3D } from "@/hooks/useMotion3D";
import { RESUME_URL } from "@/lib/links";
import Hero3DEmblem from "@/components/Hero3DEmblem";

const SERIF = "'Cormorant Garamond', 'Times New Roman', serif";

const menu = [
  { label: "START",   target: "about",    kind: "scroll" as const },
  { label: "OPTIONS", target: "projects", kind: "scroll" as const },
  { label: "EXIT",    target: "/contact", kind: "route"  as const },
];

const tabs = [
  { label: "profile", target: "about"    },
  { label: "project", target: "projects" },
  { label: "contact", target: "contact"  },
];

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const { quality, enabled: motion3D, grain, aberration } = useMotion3D();

  // Measure the portrait so the emblem always scales/orbits around the face
  const portraitRef = useRef<HTMLDivElement>(null);
  const [portraitSize, setPortraitSize] = useState(300);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const el = portraitRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      if (w) setPortraitSize(w);
    });
    ro.observe(el);
    setPortraitSize(el.getBoundingClientRect().width || 300);
    return () => ro.disconnect();
  }, [mounted]);


  useEffect(() => {
    if (reducedMotion) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  const fadeOut = reducedMotion ? 1 : Math.max(0, 1 - scrollY / 700);
  const py = (m: number) => (reducedMotion ? 0 : scrollY * m);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(ellipse at 20% 50%, rgba(120,20,30,0.22), transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(30,58,138,0.18), transparent 60%), #050507",
      }}
    >
      {/* Film grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />

      {/* Top bar */}
      <div className="absolute top-6 md:top-8 left-6 md:left-24 right-6 md:right-12 flex items-start justify-between z-20"
           style={{ opacity: fadeOut }}>
        <div
          className={`text-[11px] tracking-[0.5em] uppercase text-white/70 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
          style={{ fontFamily: SERIF }}
        >
          <span className="italic">S</span>·<span className="italic">V</span>
        </div>
        <div
          className={`text-[10px] tracking-[0.4em] uppercase text-white/40 transition-all duration-700 delay-100 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        >
          2025 — PRESS START
        </div>
      </div>

      {/* Main cinematic frame */}
      <div className="relative z-10 min-h-screen flex items-center pt-24 md:pt-0">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">

          {/* Portrait — red vignette circle */}
          <div
            className={`md:col-span-4 flex justify-center md:justify-start transition-all duration-1000 delay-200 ${
              mounted ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-6"
            }`}
            style={{ transform: `translate3d(0, ${py(0.08)}px, 0)` }}
          >
            <div className="relative flex items-center justify-center">
              {/* 3D emblem — square, sized from the measured portrait */}
              {motion3D && (
                <div
                  aria-hidden
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
                  style={{ width: portraitSize * 2.06, height: portraitSize * 2.06 }}
                >
                  <Hero3DEmblem
                    className="absolute inset-0"
                    portraitSize={portraitSize}
                    quality={quality}
                    reducedMotion={reducedMotion}
                  />
                </div>
              )}
              {/* Red glow disc */}
              <div
                className="absolute inset-0 rounded-full blur-2xl z-0"
                style={{
                  background:
                    "radial-gradient(circle, rgba(220,38,38,0.55), rgba(120,20,30,0.35) 55%, transparent 75%)",
                  transform: "scale(1.15)",
                }}
              />
              {/* Circle frame */}
              <div ref={portraitRef} className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 md:w-[300px] md:h-[300px] rounded-full overflow-hidden">


                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, rgba(239,68,68,0.55), rgba(80,10,15,0.9) 70%, #1a0508 100%)",
                  }}
                />
                <img
                  src={profilePhoto}
                  alt="Santosh Kumar Verma"
                  className="relative w-full h-full object-cover mix-blend-luminosity opacity-95"
                />
                {/* Vignette edge */}
                <div className="absolute inset-0 rounded-full ring-1 ring-white/10" />
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    boxShadow: "inset 0 0 80px rgba(0,0,0,0.65)",
                  }}
                />
              </div>
              {/* Caption chip */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/70 border border-white/15 backdrop-blur">
                <span className="text-[9px] tracking-[0.4em] uppercase text-white/70">
                  Content · Creator
                </span>
              </div>
            </div>
          </div>

          {/* Right — giant title + menu */}
          <div className="md:col-span-8">
            {/* Giant PORTFOLIO with year */}
            <div
              className={`relative transition-all duration-1000 delay-300 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transform: `translate3d(0, ${py(-0.05)}px, 0)` }}
            >
              <h1
                className="relative leading-[0.85] tracking-tight font-light text-white text-[64px] sm:text-[96px] md:text-[140px] lg:text-[176px]"
                style={{ fontFamily: SERIF }}
              >
                PORTFOLIO
                <span className="absolute -top-2 md:-top-4 right-0 md:right-2 text-[14px] md:text-[20px] tracking-[0.3em] text-white/40 font-sans not-italic">
                  2025
                </span>
              </h1>
              {/* subline name */}
              <p
                className="mt-2 md:mt-1 text-white/80 text-lg md:text-2xl italic"
                style={{ fontFamily: SERIF }}
              >
                Santosh Kumar Verma —{" "}
                <span className="not-italic text-white/50 tracking-[0.25em] text-xs md:text-sm uppercase">
                  Data Science · AI · Creator
                </span>
              </p>
            </div>

            {/* Tabs row */}
            <div
              className={`mt-8 flex items-center gap-2 md:gap-3 transition-all duration-700 delay-500 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              {tabs.map((t, i) => (
                <button
                  key={t.label}
                  onClick={() => scrollTo(t.target)}
                  className={`px-3 py-1 rounded-full text-[10px] tracking-[0.3em] uppercase transition-all ${
                    i === 0
                      ? "bg-white text-black"
                      : "border border-white/15 text-white/60 hover:text-white hover:border-white/40"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Game menu */}
            <ul
              className={`mt-10 space-y-3 transition-all duration-700 delay-700 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {menu.map((m, i) => (
                <li key={m.label}>
                  {m.kind === "scroll" ? (
                    <button
                      onClick={() => scrollTo(m.target)}
                      className="group flex items-center gap-4 text-white/60 hover:text-white transition-colors"
                    >
                      <span className="w-4 h-px bg-white/30 group-hover:w-10 group-hover:bg-white transition-all duration-300" />
                      <span
                        className="text-lg md:text-xl tracking-[0.35em]"
                        style={{ fontFamily: SERIF }}
                      >
                        {m.label}
                      </span>
                      <span className="text-white/0 group-hover:text-white/70 transition-colors text-xs">
                        ▸ 0{i + 1}
                      </span>
                    </button>
                  ) : (
                    <Link
                      to={m.target}
                      className="group flex items-center gap-4 text-white/60 hover:text-white transition-colors"
                    >
                      <span className="w-4 h-px bg-white/30 group-hover:w-10 group-hover:bg-white transition-all duration-300" />
                      <span
                        className="text-lg md:text-xl tracking-[0.35em]"
                        style={{ fontFamily: SERIF }}
                      >
                        {m.label}
                      </span>
                      <span className="text-white/0 group-hover:text-white/70 transition-colors text-xs">
                        ▸ 0{i + 1}
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Small CTA row */}
            <div
              className={`mt-10 flex flex-wrap items-center gap-3 transition-all duration-700 delay-[900ms] ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <button
                onClick={() => scrollTo("projects")}
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-xs tracking-[0.2em] uppercase shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.55)] transition-all"
              >
                See Works
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-white/80 text-xs tracking-[0.2em] uppercase hover:text-white hover:border-white/40 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                Resume
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom press-start line */}
      <div
        className="absolute bottom-6 md:bottom-8 left-6 md:left-24 right-6 md:right-12 flex items-center justify-between text-[10px] tracking-[0.4em] uppercase text-white/35"
        style={{ opacity: fadeOut }}
      >
        <span>Scroll to enter</span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          REC · LIVE
        </span>
      </div>

      {/* Bottom hairline */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </section>
  );
};

export default HeroSection;
