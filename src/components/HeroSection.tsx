import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Download } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";
import { usePrefersReducedMotion } from "@/hooks/useReveal";
import { RESUME_URL } from "@/lib/links";

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Smooth, rAF-throttled parallax. Disabled when prefers-reduced-motion.
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

  // Parallax helpers (no-op when reduced motion)
  const px = (mult: number) => (reducedMotion ? 0 : scrollY * mult);
  const fadeOut = reducedMotion ? 1 : Math.max(0, 1 - scrollY / 600);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a] text-white"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.05),_transparent_60%)]" />

      {/* Shimmer sweep — slow, GPU-only transform. Hidden when reduced motion. */}
      {!reducedMotion && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="hero-shimmer absolute -inset-y-10 -left-1/3 w-1/3 rotate-[20deg] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent blur-2xl" />
        </div>
      )}

      {/* Top-left label */}
      <div
        className={`absolute top-24 left-6 md:left-12 text-[10px] md:text-xs tracking-[0.4em] text-white/60 uppercase transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}
        style={{ transform: `translateY(${px(-0.05)}px)`, opacity: fadeOut }}
      >
        Portfolio
      </div>

      {/* Top-right Say hi */}
      <Link
        to="/contact"
        className={`absolute top-24 right-6 md:right-12 group flex items-center gap-1 text-xs md:text-sm tracking-wide text-white/80 hover:text-white transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}
        style={{ transform: `translateY(${px(-0.05)}px)`, opacity: fadeOut }}
      >
        <span className="italic" style={{ fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}>
          Say hi
        </span>
        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </Link>

      {/* Giant "100" — slower parallax (deeper) */}
      <div
        className={`absolute bottom-6 right-4 md:bottom-10 md:right-12 leading-none select-none transition-all duration-1000 delay-300 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{
          fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
          transform: `translate3d(0, ${px(-0.15)}px, 0)`,
          willChange: "transform",
        }}
      >
        <span className="italic text-white/90 text-[96px] sm:text-[140px] md:text-[200px] lg:text-[260px] font-light">
          100
        </span>
      </div>

      {/* Scroll indicator (fades out on scroll) */}
      <div
        className="absolute bottom-10 left-6 md:left-12 flex flex-col items-start gap-3 transition-opacity duration-500"
        style={{ opacity: mounted ? fadeOut : 0 }}
      >
        <span className="text-[10px] tracking-[0.4em] uppercase text-white/50">Scroll</span>
        <div className="relative w-px h-12 bg-white/10 overflow-hidden">
          {!reducedMotion && (
            <div className="hero-scroll-line absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/80 to-transparent" />
          )}
          {reducedMotion && <div className="w-full h-full bg-white/40" />}
        </div>
      </div>

      {/* Center content (slight parallax up) */}
      <div
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-24"
        style={{ transform: `translate3d(0, ${px(0.12)}px, 0)`, willChange: "transform" }}
      >
        <div
          className={`text-center mb-6 transition-all duration-700 delay-100 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}
        >
          <p className="italic text-2xl md:text-3xl text-white/70">
            Hey, <span className="text-white/90">there</span>
          </p>
        </div>

        <div
          className={`relative mb-8 transition-all duration-1000 delay-200 ${
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden ring-1 ring-white/20">
            <img
              src={profilePhoto}
              alt="Santosh Kumar Verma"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] uppercase text-white/50 whitespace-nowrap">
            tap here
          </span>
        </div>

        <div
          className={`text-center mt-8 transition-all duration-1000 delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p
            className="italic text-lg md:text-xl text-white/60 mb-2"
            style={{ fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}
          >
            I am
          </p>
          <h1
            className="font-light leading-[0.95] tracking-tight text-white text-[44px] sm:text-[68px] md:text-[92px] lg:text-[120px]"
            style={{ fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}
          >
            Santosh <span className="italic text-white/90">Kumar Verma</span>
          </h1>
        </div>

        <div
          className={`flex items-center gap-3 mt-10 transition-all duration-700 delay-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <a
            href="#projects"
            className="group px-6 py-3 rounded-full bg-white text-black text-sm tracking-wide hover:bg-white/90 transition-all flex items-center gap-2"
          >
            See Works
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <Link
            to="/contact"
            className="group px-6 py-3 rounded-full border border-white/20 text-white text-sm tracking-wide hover:bg-white/5 hover:border-white/40 transition-all flex items-center gap-2"
          >
            Reach out
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group px-6 py-3 rounded-full border border-white/20 text-white text-sm tracking-wide hover:bg-white/5 hover:border-white/40 transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Resume
          </a>
        </div>

        <div
          className={`mt-12 text-center transition-all duration-700 delay-700 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}
          >
            <span className="text-white/90">Data Science</span>
            <span className="italic text-white/60"> & AI </span>
            <span className="text-white/90">Engineer</span>
          </h2>
          <p className="mt-3 text-xs md:text-sm tracking-[0.35em] uppercase text-white/40">
            INTJ — The Architect
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
};

export default HeroSection;
