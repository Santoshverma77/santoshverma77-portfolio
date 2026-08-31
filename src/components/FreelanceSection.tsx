import { useState } from "react";
import { ArrowUpRight, Instagram, Play } from "lucide-react";
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

// TIP: paste your reel URLs like "https://www.instagram.com/reel/XXXXXXXXXXX/"
const works: Work[] = [
  {
    title: "Cinematic Travel Reel",
    category: "Short-form & Motion Hooks",
    handle: "@_insta.fx_",
    stat: "Color Grade · Rhythmic Cuts",
    description:
      "Color-graded travel cinematography with rhythm-matched cuts and motion graphics for an immersive narrative.",
    tools: ["Premiere Pro", "After Effects", "Lightroom"],
    link: "https://www.instagram.com/reel/DSBgbC2k66I/",
    reelUrl: "https://www.instagram.com/reel/DSBgbC2k66I/",
  },
  {
    title: "Storytelling & Documentary",
    category: "Travel Vlog Series",
    handle: "@santoshverma_77",
    stat: "B-roll · Sound Design",
    description: "Story-driven cuts with B-roll, ambient sound design and tasteful overlays.",
    tools: ["Premiere Pro", "DaVinci"],
    link: "https://www.instagram.com/reel/DZ_4y2CzfLa/",
    reelUrl: "https://www.instagram.com/reel/DZ_4y2CzfLa/",
  },
  {
    title: "Promotional Brand Reel",
    category: "Hook → Product → CTA",
    handle: "@_insta.fx_",
    stat: "Conversion First",
    description: "Short-form vertical edit built for hook → product → CTA conversion.",
    tools: ["Premiere Pro", "Canva"],
    link: "https://www.instagram.com/reel/DRG6u9lE9Hq/",
    reelUrl: "https://www.instagram.com/reel/DRG6u9lE9Hq/",
  },
  {
    title: "Portrait & Lifestyle",
    category: "Photography",
    handle: "@santoshverma_77",
    stat: "Natural Light · Warm Grade",
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
            className="font-sans font-extrabold leading-[1.02] tracking-tight text-[42px] sm:text-[56px] md:text-[64px]"
            style={revealStyle(visible, 1)}
          >
            Stop the scroll.
            <br />
            <span className="text-white/45">Edit to hold attention.</span>
          </h2>
          <p
            className="text-white/50 text-sm md:text-[15px] leading-relaxed md:pt-4 max-w-md md:justify-self-end"
            style={revealStyle(visible, 2)}
          >
            From viral short-form reels and travel stories to high-conversion brand edits, I craft
            videos that grip audiences from frame one.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {works.map((w, i) => (
            <TiltCard
              key={w.title}
              as="button"
              onClick={() => setOpenIndex(i)}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              max={5}
              className="group relative block w-full text-left overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d0d] hover:border-white/25 transition-colors"
              style={revealStyle(visible, i + 3, 60)}
            >
              {/* Card header */}
              <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: LIME, boxShadow: `0 0 10px ${LIME}` }}
                  />
                  <span className="text-[10px] tracking-[0.25em] uppercase text-white/60">
                    {w.category}
                  </span>
                </div>
                <span
                  className="text-[10px] tracking-wider rounded-full border px-2.5 py-1"
                  style={{ borderColor: `${LIME}44`, color: LIME }}
                >
                  {w.handle}
                </span>
              </div>

              {/* Preview */}
              <div className="relative m-4 mb-0 overflow-hidden rounded-2xl border border-white/10">
                <ReelThumb
                  reelUrl={w.reelUrl}
                  category={w.category}
                  index={i}
                  playing={hoverIndex === i}
                  className="aspect-[4/5] md:aspect-[4/4.4]"
                />
                {/* Playing pill */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur px-3 py-1 text-[10px] text-white/80 border border-white/10">
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: LIME }}
                  />
                  {hoverIndex === i ? "Playing" : "Preview"}
                </div>
                {/* Stat chip */}
                <div
                  className="absolute top-3 right-3 rounded-full px-3 py-1 text-[10px] font-medium text-black"
                  style={{ background: LIME }}
                >
                  {w.stat}
                </div>
              </div>

              {/* Card footer */}
              <div className="flex items-center justify-between px-5 py-4">
                <h3 className="text-base md:text-lg font-semibold tracking-tight text-white">
                  {w.title}
                </h3>
                <span className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-white/40 group-hover:text-white transition-colors">
                  Open
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Social CTAs */}
        <div
          className="mt-12 flex flex-wrap items-center gap-3"
          style={revealStyle(visible, works.length + 3, 80)}
        >
          <a
            href={SOCIALS.instagramCreative}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold text-black transition-transform hover:scale-[1.03]"
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
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-xs md:text-sm text-white/80 hover:text-white hover:border-white/50 transition-all"
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
