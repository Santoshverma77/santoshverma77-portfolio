import { ArrowUpRight, Instagram } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useReveal, revealStyle } from "@/hooks/useReveal";
import { SOCIALS } from "@/lib/links";

type Work = {
  title: string;
  category: string;
  description: string;
  tools: string[];
  link: string;
  accent: string; // tailwind gradient classes
};

const works: Work[] = [
  {
    title: "Cinematic Travel Reel",
    category: "Cinematic Reel",
    description:
      "Color-graded travel cinematography with rhythm-matched cuts and motion graphics for an immersive narrative.",
    tools: ["Premiere Pro", "After Effects", "Lightroom"],
    link: SOCIALS.instagramCreative,
    accent: "from-amber-500/30 via-rose-500/20 to-fuchsia-500/30",
  },
  {
    title: "Event Coverage — College Fest",
    category: "Event Coverage",
    description:
      "Multi-cam highlights, on-stage moments, crowd energy edits delivered same-day for social rollout.",
    tools: ["Premiere Pro", "CapCut", "Photoshop"],
    link: SOCIALS.instagramCreative,
    accent: "from-sky-500/25 via-indigo-500/20 to-emerald-500/25",
  },
  {
    title: "Portrait & Lifestyle Photography",
    category: "Photography",
    description:
      "Editorial-style portraits with natural light, considered framing, and warm cinematic color treatment.",
    tools: ["Lightroom", "Photoshop"],
    link: SOCIALS.instagramPersonal,
    accent: "from-stone-300/20 via-amber-200/15 to-rose-300/20",
  },
  {
    title: "Promotional Brand Reel",
    category: "Promotional Content",
    description:
      "Short-form vertical edit built for hook → product → CTA conversion across Instagram and YouTube Shorts.",
    tools: ["Premiere Pro", "Canva", "CapCut"],
    link: SOCIALS.instagramCreative,
    accent: "from-fuchsia-500/30 via-violet-500/25 to-cyan-500/25",
  },
  {
    title: "Travel Vlog Series",
    category: "Travel Content",
    description:
      "Story-driven travel cuts with location B-roll, ambient sound design and tasteful text overlays.",
    tools: ["Premiere Pro", "DaVinci Resolve"],
    link: SOCIALS.instagramPersonal,
    accent: "from-emerald-500/25 via-teal-500/20 to-sky-500/25",
  },
  {
    title: "Social Media Content Pack",
    category: "Social Reels",
    description:
      "Recurring reel pack for creators — trend-aware edits, captions, transitions and motion typography.",
    tools: ["CapCut", "Canva", "Premiere Pro"],
    link: SOCIALS.instagramCreative,
    accent: "from-orange-500/30 via-pink-500/20 to-purple-500/25",
  },
];

const FreelanceSection = () => {
  const { ref, visible } = useReveal<HTMLElement>(0.1);

  return (
    <section
      id="freelance"
      ref={ref}
      className="relative bg-[#0a0a0a] text-white py-24 md:py-32 overflow-hidden border-t border-white/5"
    >
      <div className="mx-auto w-full max-w-6xl px-6 md:px-12">
        <SectionHeader
          eyebrow="Freelance · Creative"
          title="Beyond the"
          italic="code"
          visible={visible}
        />

        <p
          className="max-w-2xl text-white/60 text-base md:text-lg leading-relaxed mb-14"
          style={{ ...revealStyle(visible, 0, 60), fontFamily: "'Cormorant Garamond', serif" }}
        >
          <span className="italic">Video editor, content creator, photographer & videographer.</span>{" "}
          Selected work from my creative practice — cinematic reels, travel stories, event coverage
          and brand content.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((w, i) => (
            <a
              key={w.title}
              href={w.link}
              target="_blank"
              rel="noopener noreferrer external"
              referrerPolicy="no-referrer"
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/30 transition-all"
              style={revealStyle(visible, i + 1, 80)}
            >
              {/* Visual */}
              <div
                className={`relative aspect-[4/5] bg-gradient-to-br ${w.accent} overflow-hidden`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.15),_transparent_60%)]" />
                <div className="absolute inset-0 bg-[#0a0a0a]/30 group-hover:bg-[#0a0a0a]/10 transition-colors duration-500" />
                <div className="absolute top-4 left-4 text-[10px] tracking-[0.3em] uppercase text-white/80">
                  {w.category}
                </div>
                <div className="absolute bottom-4 right-4 opacity-70 group-hover:opacity-100 transition-opacity">
                  <Instagram className="w-5 h-5 text-white" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="italic text-white/90 text-5xl md:text-6xl font-light"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    0{i + 1}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <h3
                  className="text-xl md:text-2xl font-light text-white group-hover:italic transition-all"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {w.title}
                </h3>
                <p className="mt-2 text-sm text-white/55 leading-relaxed">{w.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {w.tools.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] tracking-wider uppercase text-white/50 border border-white/10 rounded-full px-2 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs text-white/60 group-hover:text-white transition-colors">
                  View on Instagram
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>

        <div
          className="mt-12 flex flex-wrap items-center gap-3"
          style={revealStyle(visible, works.length + 1, 80)}
        >
          <a
            href={SOCIALS.instagramCreative}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-black text-sm hover:bg-white/90 transition-all"
          >
            <Instagram className="w-4 h-4" />
            @_insta.fx_
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <a
            href={SOCIALS.instagramPersonal}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 text-sm text-white/80 hover:text-white hover:border-white/50 transition-all"
          >
            <Instagram className="w-4 h-4" />
            @santoshverma_77
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FreelanceSection;
