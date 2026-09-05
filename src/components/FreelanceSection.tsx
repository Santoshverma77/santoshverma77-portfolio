import { useState } from "react";
import { ArrowUpRight, Instagram, Play } from "lucide-react";
import { Link } from "@/lib/router-compat";
import { useReveal, revealStyle } from "@/hooks/useReveal";
import { SOCIALS } from "@/lib/links";
import TiltCard from "./TiltCard";
import ReelThumb from "./ReelThumb";
import ReelModal from "./ReelModal";

type Work = {
  title: string;
  category: string;
  handle: string;
  stat: string;
  description: string;
  tools: string[];
  link: string;
  reelUrl?: string;
};

// Real portfolio reels — stat chips describe the actual format/technique, not vanity metrics
const works: Work[] = [
  {
    title: "Cinematic Travel Reel",
    category: "Short-form & Motion",
    handle: "@_insta.fx_",
    stat: "4K · Color Graded",
    description:
      "Color-graded travel cinematography with rhythm-matched cuts and motion graphics for an immersive narrative.",
    tools: ["Premiere Pro", "After Effects", "Lightroom"],
    link: "https://www.instagram.com/reel/DSBgbC2k66I/",
    reelUrl: "https://www.instagram.com/reel/DSBgbC2k66I/",
  },
  {
    title: "Travel Vlog Series",
    category: "Storytelling",
    handle: "@santoshverma_77",
    stat: "B-roll · Ambient Sound",
    description: "Story-driven cuts with B-roll, ambient sound design and tasteful overlays.",
    tools: ["Premiere Pro", "DaVinci"],
    link: "https://www.instagram.com/reel/DZ_4y2CzfLa/",
    reelUrl: "https://www.instagram.com/reel/DZ_4y2CzfLa/",
  },
  {
    title: "Promotional Brand Reel",
    category: "Hook → CTA",
    handle: "@_insta.fx_",
    stat: "9:16 Vertical",
    description: "Short-form vertical edit built for hook → product → CTA conversion.",
    tools: ["Premiere Pro", "Canva"],
    link: "https://www.instagram.com/reel/DRG6u9lE9Hq/",
    reelUrl: "https://www.instagram.com/reel/DRG6u9lE9Hq/",
  },
  {
    title: "Portrait & Lifestyle",
    category: "Photography",
    handle: "@santoshverma_77",
    stat: "Natural Light",
    description: "Editorial portraits, natural light, warm cinematic color treatment.",
    tools: ["Lightroom", "Photoshop"],
    link: "https://www.instagram.com/p/DZUZeGvE_QT/",
    reelUrl: "https://www.instagram.com/p/DZUZeGvE_QT/",
  },
];

const LIME = "#c8f135";

const FreelanceSection = () => {
  const { ref, visible } = useReveal<HTMLElement>(0.1);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <section
      id="freelance"
      ref={ref}
      className="relative bg-black text-white py-24 md:py-32 overflow-hidden border-t border-white/5"
    >
      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-12">
        {/* Eyebrow pill */}
        <div style={revealStyle(visible, 0)}>
          <span
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[10px] tracking-[0.35em] uppercase"
            style={{ borderColor: `${LIME}55`, color: LIME, background: `${LIME}14` }}
          >
            <Play className="w-3 h-3 fill-current" />
            Video Production & Motion
          </span>
        </div>

        {/* Heading + description row */}
        <div className="mt-8 grid md:grid-cols-2 gap-8 items-start">
          <h2
            className="font-sans font-extrabold leading-[1.02] tracking-tight text-[38px] sm:text-[48px] md:text-[56px]"
            style={revealStyle(visible, 1)}
          >
            Stop the scroll.
            <br />
            <span className="text-white/45">Edit to hold attention.</span>
          </h2>
          <p
            className="text-white/50 text-sm leading-relaxed md:pt-3 max-w-md md:justify-self-end"
            style={revealStyle(visible, 2)}
          >
            From viral short-form reels and travel stories to high-conversion brand edits, I craft
            videos that grip audiences from frame one.
          </p>
        </div>

        {/* Compact cards */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {works.map((w, i) => (
            <TiltCard
              key={w.title}
              as="button"
              onClick={() => setOpenIndex(i)}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              max={6}
              className="group relative block w-full text-left overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] hover:border-white/25 transition-colors"
              style={revealStyle(visible, i + 3, 50)}
            >
              {/* Card header */}
              <div className="flex items-center justify-between gap-2 px-3.5 pt-3.5 pb-3 border-b border-white/5">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: LIME, boxShadow: `0 0 8px ${LIME}` }}
                  />
                  <span className="text-[9px] tracking-[0.18em] uppercase text-white/60 truncate">
                    {w.category}
                  </span>
                </div>
                <span
                  className="text-[9px] tracking-wide rounded-full border px-2 py-0.5 shrink-0"
                  style={{ borderColor: `${LIME}44`, color: LIME }}
                >
                  {w.handle}
                </span>
              </div>

              {/* Preview */}
              <div className="relative m-3 mb-0 overflow-hidden rounded-xl border border-white/10">
                <ReelThumb
                  reelUrl={w.reelUrl}
                  category={w.category}
                  index={i}
                  playing={hoverIndex === i}
                  className="aspect-[3/4]"
                />
                {/* Playing pill */}
                <div className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-black/70 backdrop-blur px-2 py-0.5 text-[9px] text-white/80 border border-white/10">
                  <span
                    className="w-1 h-1 rounded-full animate-pulse"
                    style={{ background: LIME }}
                  />
                  {hoverIndex === i ? "Playing" : "Preview"}
                </div>
                {/* Stat chip */}
                <div
                  className="absolute top-2 right-2 rounded-full px-2 py-0.5 text-[9px] font-semibold text-black"
                  style={{ background: LIME }}
                >
                  {w.stat}
                </div>
              </div>

              {/* Card footer */}
              <div className="flex items-center justify-between gap-2 px-3.5 py-3">
                <h3 className="text-[13px] font-semibold tracking-tight text-white leading-tight line-clamp-2">
                  {w.title}
                </h3>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Social CTAs */}
        <div
          className="mt-10 flex flex-wrap items-center gap-3"
          style={revealStyle(visible, works.length + 3, 80)}
        >
          <Link
            to="/hire"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold border transition-all hover:scale-[1.03]"
            style={{ borderColor: LIME, color: LIME, background: `${LIME}0f` }}
          >
            Hire me for a project
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
          <a
            href={SOCIALS.instagramCreative}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-black transition-transform hover:scale-[1.03]"
            style={{ background: LIME }}
          >
            <Instagram className="w-4 h-4" />
            @_insta.fx_
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <a
            href={SOCIALS.instagramPersonal}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-xs text-white/80 hover:text-white hover:border-white/50 transition-all"
          >
            <Instagram className="w-4 h-4" />
            @santoshverma_77
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Modal */}
      {openIndex !== null && (
        <ReelModal
          open={openIndex !== null}
          onClose={() => setOpenIndex(null)}
          reelUrl={works[openIndex].reelUrl}
          externalUrl={works[openIndex].link}
          title={works[openIndex].title}
          category={works[openIndex].category}
          description={works[openIndex].description}
          tools={works[openIndex].tools}
        />
      )}
    </section>
  );
};

export default FreelanceSection;
