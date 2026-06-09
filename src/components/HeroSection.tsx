import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a] text-white"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.04),_transparent_60%)]" />

      {/* Top-left label */}
      <div
        className={`absolute top-24 left-8 md:left-12 text-[10px] md:text-xs tracking-[0.4em] text-white/60 uppercase transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}
      >
        Portfolio
      </div>

      {/* Top-right "Say hi" */}
      <Link
        to="/contact"
        className={`absolute top-24 right-8 md:right-12 group flex items-center gap-1 text-xs md:text-sm tracking-wide text-white/80 hover:text-white transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}
      >
        <span className="italic" style={{ fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}>
          Say hi
        </span>
        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </Link>

      {/* Bottom-right giant "100" serif italic */}
      <div
        className={`absolute bottom-6 right-6 md:bottom-10 md:right-12 leading-none select-none transition-all duration-1000 delay-300 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{ fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}
      >
        <span className="italic text-white/90 text-[120px] md:text-[200px] lg:text-[260px] font-light">
          100
        </span>
      </div>

      {/* Bottom-left scroll indicator */}
      <div
        className={`absolute bottom-10 left-8 md:left-12 flex flex-col items-start gap-3 transition-all duration-1000 delay-500 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-[10px] tracking-[0.4em] uppercase text-white/50">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
      </div>

      {/* Center content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-24">
        {/* Hey there */}
        <div
          className={`text-center mb-6 transition-all duration-700 delay-100 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}
        >
          <p className="italic text-2xl md:text-3xl text-white/70">
            Hey,{" "}
            <span className="text-white/90">there</span>
          </p>
        </div>

        {/* Profile image with frame */}
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
          <span
            className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] uppercase text-white/50 whitespace-nowrap"
          >
            tap here
          </span>
        </div>

        {/* "I am" + Name */}
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
            Santosh{" "}
            <span className="italic text-white/90">Kumar Verma</span>
          </h1>
        </div>

        {/* CTAs */}
        <div
          className={`flex items-center gap-3 mt-10 transition-all duration-700 delay-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Link
            to="/projects"
            className="group px-6 py-3 rounded-full bg-white text-black text-sm tracking-wide hover:bg-white/90 transition-all flex items-center gap-2"
          >
            See Works
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
          <Link
            to="/contact"
            className="group px-6 py-3 rounded-full border border-white/20 text-white text-sm tracking-wide hover:bg-white/5 hover:border-white/40 transition-all flex items-center gap-2"
          >
            Reach out
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Role tag */}
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
          <p
            className="mt-3 text-xs md:text-sm tracking-[0.35em] uppercase text-white/40"
          >
            INTJ — The Architect
          </p>
        </div>
      </div>

      {/* Bottom thin line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
};

export default HeroSection;
