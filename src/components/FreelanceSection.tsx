import { useState } from "react";
import { ArrowUpRight, Instagram } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useReveal, revealStyle } from "@/hooks/useReveal";
import { SOCIALS } from "@/lib/links";
import TiltCard from "./TiltCard";
import ReelThumb from "./ReelThumb";
import ReelModal from "./ReelModal";

type Work = {
  title: string;
  category: string;
  description: string;
  tools: string[];
  link: string;
  /** Full https://www.instagram.com/reel/XXXX/ URL — leave empty for a placeholder */
  reelUrl?: string;
};

// TIP: paste your reel URLs like "https://www.instagram.com/reel/XXXXXXXXXXX/"
const works: Work[] = [
  {
    title: "Cinematic Travel Reel",
    category: "Cinematic Reel",
    description:
      "Color-graded travel cinematography with rhythm-matched cuts and motion graphics for an immersive narrative.",
    tools: ["Premiere Pro", "After Effects", "Lightroom"],
    link: "https://www.instagram.com/reel/DSBgbC2k66I/",
    reelUrl: "https://www.instagram.com/reel/DSBgbC2k66I/",
  },
  {
    title: "Portrait & Lifestyle Photography",
    category: "Photography",
    description: "Editorial portraits, natural light, warm cinematic color treatment.",
    tools: ["Lightroom", "Photoshop"],
    link: "https://www.instagram.com/p/DZUZeGvE_QT/",
    reelUrl: "https://www.instagram.com/p/DZUZeGvE_QT/",
  },
  {
    title: "Promotional Brand Reel",
    category: "Promotional",
    description: "Short-form vertical edit built for hook → product → CTA conversion.",
    tools: ["Premiere Pro", "Canva"],
    link: "https://www.instagram.com/reel/DRG6u9lE9Hq/",
    reelUrl: "https://www.instagram.com/reel/DRG6u9lE9Hq/",
  },
  {
    title: "Travel Vlog Series",
    category: "Travel",
    description: "Story-driven cuts with B-roll, ambient sound design and tasteful overlays.",
    tools: ["Premiere Pro", "DaVinci"],
    link: "https://www.instagram.com/reel/DZ_4y2CzfLa/",
    reelUrl: "https://www.instagram.com/reel/DZ_4y2CzfLa/",
  },
];

const FreelanceSection = () => {
  const { ref, visible } = useReveal<HTMLElement>(0.1);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [featuredPlaying, setFeaturedPlaying] = useState(false);

  const featured = works[0];
  const rest = works.slice(1);

  return (
    <section
      id="freelance"
      ref={ref}
      className="relative bg-[#0a0a0a] text-white py-24 md:py-32 overflow-hidden border-t border-white/5"
    >
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-12">
        <SectionHeader
          eyebrow="Freelance · Creative"
          title="Beyond the"
          italic="code"
          visible={visible}
        />

        <p
          className="max-w-2xl text-white/60 text-sm md:text-base leading-relaxed mb-12"
          style={{ ...revealStyle(visible, 0, 60), fontFamily: "'Cormorant Garamond', serif" }}
        >
          <span className="italic">Video editor, content creator, photographer & videographer.</span>{" "}
          Selected work from my creative practice — cinematic reels, travel stories, event coverage
          and brand content.
        </p>

        {/* Featured */}
        <TiltCard
          as="button"
          onClick={() => setOpenIndex(0)}
          max={5}
          className="group relative block w-full text-left overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] hover:border-primary/40 transition-colors mb-6"
          style={revealStyle(visible, 1, 80)}
        >
          <div
            className="grid md:grid-cols-5"
            onMouseEnter={() => setFeaturedPlaying(true)}
            onMouseLeave={() => setFeaturedPlaying(false)}
          >
            <div className="md:col-span-3">
              <ReelThumb
                reelUrl={featured.reelUrl}
                category={featured.category}
                index={0}
                playing={featuredPlaying}
                className="aspect-[16/10]"
              />
            </div>
            <div className="md:col-span-2 p-5 md:p-6 flex flex-col justify-between bg-gradient-to-br from-white/[0.03] to-transparent">
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-primary/80 mb-2">
                  ★ Featured Work
                </div>
                <h3
                  className="text-2xl md:text-3xl font-light text-white mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  <span className="italic">{featured.title}</span>
                </h3>
                <p className="text-xs md:text-sm text-white/60 leading-relaxed">
                  {featured.description}
                </p>
              </div>
              <div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {featured.tools.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] tracking-wider uppercase text-white/60 border border-white/15 rounded-full px-2 py-0.5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-primary group-hover:gap-2.5 transition-all">
                  Preview reel
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        </TiltCard>

        {/* Compact grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {rest.map((w, i) => {
            const idx = i + 1;
            return (
              <TiltCard
                key={w.title}
                as="button"
                onClick={() => setOpenIndex(idx)}
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(null)}
                max={8}
                className="group relative block w-full text-left overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] hover:border-primary/40 transition-colors"
                style={revealStyle(visible, i + 2, 60)}
              >
                <ReelThumb
                  reelUrl={w.reelUrl}
                  category={w.category}
                  index={idx}
                  playing={hoverIndex === idx}
                  className="aspect-[3/4]"
                />
                <div className="p-3">
                  <h3
                    className="text-sm md:text-base font-light text-white leading-tight line-clamp-2 group-hover:italic transition-all"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {w.title}
                  </h3>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[9px] tracking-wider uppercase text-white/40">
                      {w.tools.slice(0, 2).join(" · ")}
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-white/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>

        <div
          className="mt-10 flex flex-wrap items-center gap-3"
          style={revealStyle(visible, works.length + 2, 80)}
        >
          <a
            href={SOCIALS.instagramCreative}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary text-primary-foreground text-xs md:text-sm shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.55)] transition-all"
          >
            <Instagram className="w-4 h-4" />
            @_insta.fx_
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <a
            href={SOCIALS.instagramPersonal}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/20 text-xs md:text-sm text-white/80 hover:text-white hover:border-white/50 transition-all"
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
