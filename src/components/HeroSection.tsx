import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

const SERIF = "'Cormorant Garamond', 'Times New Roman', serif";
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setTilt({ x, y }));
    };
    const onLeave = () => setTilt({ x: 0, y: 0 });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  // shared reveal helper
  const reveal = (delay = 0) => ({
    transition: `opacity 900ms ${EASE} ${delay}ms, transform 900ms ${EASE} ${delay}ms, filter 900ms ${EASE} ${delay}ms`,
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(14px)",
    filter: mounted ? "blur(0)" : "blur(6px)",
  });

  const parallax = (strength = 1) => ({
    transform: `translate3d(${tilt.x * strength}px, ${tilt.y * strength}px, 0)`,
    transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
  });

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a] text-white"
      style={{ fontFamily: "'Inter', system-ui, sans-serif", perspective: "1200px" }}
    >
      {/* Grain + vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.05),_transparent_60%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Top-left label */}
      <div
        className="absolute top-24 left-8 md:left-12 text-[10px] md:text-xs tracking-[0.45em] text-white/55 uppercase"
        style={reveal(50)}
      >
        Portfolio
      </div>

      {/* Top-right "Say hi" */}
      <Link
        to="/contact"
        className="absolute top-24 right-8 md:right-12 group flex items-center gap-1.5 text-xs md:text-sm tracking-wide text-white/75 hover:text-white"
        style={reveal(100)}
      >
        <span className="italic text-base md:text-lg" style={{ fontFamily: SERIF }}>
          Say hi
        </span>
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>

      {/* Bottom-right giant "100" with shimmer */}
      <div
        className="absolute bottom-2 right-4 md:bottom-6 md:right-10 leading-none select-none"
        style={{ ...reveal(400), fontFamily: SERIF, ...parallax(-12) }}
      >
        <span
          className="italic font-light text-[140px] md:text-[220px] lg:text-[280px] bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(110deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.55) 40%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.55) 60%, rgba(255,255,255,0.95) 100%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 6s linear infinite",
          }}
        >
          100
        </span>
      </div>

      {/* Bottom-left scroll indicator */}
      <div
        className="absolute bottom-10 left-8 md:left-12 flex flex-col items-start gap-3"
        style={reveal(600)}
      >
        <span className="text-[10px] tracking-[0.45em] uppercase text-white/45">Scroll</span>
        <div className="relative w-px h-14 overflow-hidden bg-white/10">
          <div
            className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/90 to-transparent"
            style={{ animation: "scrollLine 2.2s ease-in-out infinite" }}
          />
        </div>
      </div>

      {/* Center content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-24">
        {/* Hey there */}
        <div className="text-center mb-6" style={{ ...reveal(150), fontFamily: SERIF }}>
          <p className="italic text-2xl md:text-3xl text-white/70" style={parallax(6)}>
            Hey, <span className="text-white/95">there</span>
          </p>
        </div>

        {/* Profile image */}
        <div className="relative mb-10" style={reveal(250)}>
          <div
            className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden ring-1 ring-white/20 shadow-[0_30px_80px_-20px_rgba(255,255,255,0.15)]"
            style={{
              ...parallax(10),
              transform: `${parallax(10).transform} rotateX(${tilt.y * -6}deg) rotateY(${tilt.x * 6}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            <img
              src={profilePhoto}
              alt="Santosh Kumar Verma"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10 pointer-events-none" />
          </div>
          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.35em] uppercase text-white/45 whitespace-nowrap">
            tap here
          </span>
        </div>

        {/* "I am" + Name */}
        <div className="text-center mt-6" style={reveal(350)}>
          <p
            className="italic text-lg md:text-xl text-white/55 mb-3"
            style={{ fontFamily: SERIF }}
          >
            I am
          </p>
          <h1
            className="font-light leading-[0.92] tracking-[-0.02em] text-white text-[44px] sm:text-[68px] md:text-[96px] lg:text-[128px]"
            style={{ fontFamily: SERIF, ...parallax(-8) }}
          >
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 100%)",
              }}
            >
              Santosh
            </span>{" "}
            <span
              className="italic bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.55) 100%)",
              }}
            >
              Kumar Verma
            </span>
          </h1>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3 mt-10" style={reveal(550)}>
          <Link
            to="/projects"
            className="group px-6 py-3 rounded-full bg-white text-black text-sm tracking-wide transition-all duration-500 hover:bg-white/90 hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.5)] flex items-center gap-2"
          >
            See Works
            <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            to="/contact"
            className="group px-6 py-3 rounded-full border border-white/20 text-white text-sm tracking-wide transition-all duration-500 hover:bg-white/5 hover:border-white/40 flex items-center gap-2"
          >
            Reach out
            <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Role tag */}
        <div className="mt-14 text-center" style={reveal(700)}>
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight"
            style={{ fontFamily: SERIF }}
          >
            <span className="text-white/90">Data Science</span>
            <span className="italic text-white/55"> & AI </span>
            <span className="text-white/90">Engineer</span>
          </h2>
          <p className="mt-3 text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/40">
            INTJ — The Architect
          </p>
        </div>
      </div>

      {/* Bottom hairline */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          60% { transform: translateY(300%); }
          100% { transform: translateY(300%); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
