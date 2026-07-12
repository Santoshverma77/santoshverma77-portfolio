import { ArrowUpRight, Instagram, Play, Sparkles, Camera, Film, Video } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useReveal, revealStyle } from "@/hooks/useReveal";
import { SOCIALS } from "@/lib/links";
import TiltCard from "./TiltCard";

type Work = {
  title: string;
  category: string;
  description: string;
  tools: string[];
  link: string;
  accent: string;
  icon: typeof Play;
  featured?: boolean;
};

const works: Work[] = [
  {
    title: "Cinematic Travel Reel",
    category: "Cinematic Reel",
    description:
      "Color-graded travel cinematography with rhythm-matched cuts and motion graphics for an immersive narrative.",
    tools: ["Premiere Pro", "After Effects", "Lightroom"],
    link: SOCIALS.instagramCreative,
    accent: "from-blue-500/40 via-indigo-500/25 to-cyan-400/30",
    icon: Film,
    featured: true,
  },
  {
    title: "Event Coverage — College Fest",
    category: "Event Coverage",
    description: "Multi-cam highlights, on-stage moments, same-day social rollout edits.",
    tools: ["Premiere Pro", "CapCut"],
    link: SOCIALS.instagramCreative,
    accent: "from-sky-500/30 via-blue-500/25 to-indigo-500/30",
    icon: Video,
  },
  {
    title: "Portrait & Lifestyle Photography",
    category: "Photography",
    description: "Editorial portraits, natural light, warm cinematic color treatment.",
    tools: ["Lightroom", "Photoshop"],
    link: SOCIALS.instagramPersonal,
    accent: "from-slate-400/25 via-blue-300/20 to-indigo-400/25",
    icon: Camera,
  },
  {
    title: "Promotional Brand Reel",
    category: "Promotional",
    description: "Short-form vertical edit built for hook → product → CTA conversion.",
    tools: ["Premiere Pro", "Canva"],
    link: SOCIALS.instagramCreative,
    accent: "from-indigo-500/35 via-blue-500/25 to-sky-400/30",
    icon: Sparkles,
  },
  {
    title: "Travel Vlog Series",
    category: "Travel",
    description: "Story-driven cuts with B-roll, ambient sound design and tasteful overlays.",
    tools: ["Premiere Pro", "DaVinci"],
    link: SOCIALS.instagramPersonal,
    accent: "from-cyan-500/30 via-blue-500/25 to-indigo-500/30",
    icon: Film,
  },
  {
    title: "Social Media Content Pack",
    category: "Social Reels",
    description: "Recurring reel pack — trend-aware edits, transitions and motion typography.",
    tools: ["CapCut", "Premiere Pro"],
    link: SOCIALS.instagramCreative,
    accent: "from-blue-600/35 via-indigo-500/25 to-sky-500/30",
    icon: Video,
  },
];

const CardVisual = ({ work, index, large }: { work: Work; index: number; large?: boolean }) => {
  const Icon = work.icon;
  return (
    <div
      className={`relative ${large ? "aspect-[16/10]" : "aspect-[4/5]"} bg-gradient-to-br ${work.accent} overflow-hidden`}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.18),_transparent_60%)]" />
      <div className="absolute inset-0 bg-[#0a0a0a]/40 group-hover:bg-[#0a0a0a]/15 transition-colors duration-500" />

      {/* Category tag */}
      <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-white/85 backdrop-blur-sm bg-white/5 border border-white/10 rounded-full px-3 py-1">
        <Icon className="w-3 h-3" />
        {work.category}
      </div>

      {/* Number */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ transform: "translateZ(30px)" }}
      >
        <span
          className={`italic text-white/90 font-light ${large ? "text-8xl md:text-9xl" : "text-6xl md:text-7xl"}`}
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          0{index + 1}
        </span>
      </div>

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-[0_0_40px_hsl(var(--primary)/0.6)] group-hover:scale-110 transition-transform">
          <Play className="w-6 h-6 text-primary-foreground fill-primary-foreground ml-1" />
        </div>
      </div>

      {/* IG icon */}
      <div className="absolute bottom-4 right-4 opacity-70 group-hover:opacity-100 transition-opacity">
        <Instagram className="w-5 h-5 text-white" />
      </div>

      {/* Bottom scanline */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </div>
  );
};

const FreelanceSection = () => {
  const { ref, visible } = useReveal<HTMLElement>(0.1);
  const featured = works[0];
  const rest = works.slice(1);

  return (
    <section
      id="freelance"
      ref={ref}
      className="relative bg-[#0a0a0a] text-white py-24 md:py-32 overflow-hidden border-t border-white/5"
    >
      {/* Blue glow accents */}
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
          className="max-w-2xl text-white/60 text-base md:text-lg leading-relaxed mb-14"
          style={{ ...revealStyle(visible, 0, 60), fontFamily: "'Cormorant Garamond', serif" }}
        >
          <span className="italic">Video editor, content creator, photographer & videographer.</span>{" "}
          Selected work from my creative practice — cinematic reels, travel stories, event coverage
          and brand content.
        </p>

        {/* Featured */}
        <TiltCard
          as="a"
          href={featured.link}
          target="_blank"
          rel="noopener noreferrer external"
          referrerPolicy="no-referrer"
          max={6}
          className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] hover:border-primary/40 transition-colors mb-8"
          style={revealStyle(visible, 1, 80)}
        >
          <div className="grid md:grid-cols-5">
            <div className="md:col-span-3">
              <CardVisual work={featured} index={0} large />
            </div>
            <div className="md:col-span-2 p-6 md:p-8 flex flex-col justify-between bg-gradient-to-br from-white/[0.03] to-transparent">
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-primary/80 mb-3">
                  ★ Featured Work
                </div>
                <h3
                  className="text-3xl md:text-4xl font-light text-white mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  <span className="italic">{featured.title}</span>
                </h3>
                <p className="text-sm md:text-base text-white/60 leading-relaxed">
                  {featured.description}
                </p>
              </div>
              <div>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {featured.tools.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] tracking-wider uppercase text-white/60 border border-white/15 rounded-full px-2.5 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-6 inline-flex items-center gap-1.5 text-sm text-primary group-hover:gap-3 transition-all">
                  Watch on Instagram
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </TiltCard>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((w, i) => (
            <TiltCard
              key={w.title}
              as="a"
              href={w.link}
              target="_blank"
              rel="noopener noreferrer external"
              referrerPolicy="no-referrer"
              max={10}
              className="group relative block overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] hover:border-primary/40 transition-colors"
              style={revealStyle(visible, i + 2, 70)}
            >
              <CardVisual work={w} index={i + 1} />
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
                <div className="mt-4 flex items-center gap-1 text-xs text-white/60 group-hover:text-primary transition-colors">
                  View on Instagram
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        <div
          className="mt-12 flex flex-wrap items-center gap-3"
          style={revealStyle(visible, works.length + 2, 80)}
        >
          <a
            href={SOCIALS.instagramCreative}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground text-sm shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.55)] transition-all"
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
