import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Play, Instagram } from "lucide-react";

interface Props {
  reelUrl?: string;
  category: string;
  index: number;
  playing: boolean;
  className?: string;
}

const toEmbed = (url?: string) => {
  if (!url) return "";
  const clean = url.split("?")[0].replace(/\/$/, "");
  return `${clean}/embed`;
};

/** Instagram reel thumbnail — loads the embed lazily when in viewport,
 *  shows skeleton until ready. `playing` gates whether the iframe mounts
 *  (used for hover play/pause on desktop). */
const ReelThumb = ({ reelUrl, category, index, playing, className = "" }: Props) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const embed = toEmbed(reelUrl);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: "150px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const shouldMount = embed && inView && playing;

  return (
    <div ref={wrapRef} className={`relative overflow-hidden bg-[#0a0a0a] ${className}`}>
      {/* Fallback gradient + number */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-blue-500/15 to-transparent" />
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Skeleton while loading */}
      {shouldMount && !loaded && (
        <Skeleton className="absolute inset-0 bg-white/[0.05] rounded-none" />
      )}

      {/* Number watermark (behind iframe) */}
      {!shouldMount && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span
            className="italic text-white/85 font-light text-6xl md:text-7xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            0{index + 1}
          </span>
        </div>
      )}

      {/* Instagram embed — scaled to cover the card */}
      {shouldMount && (
        <iframe
          key={embed}
          src={embed}
          title={category}
          className="absolute left-1/2 top-1/2 border-0"
          style={{
            width: 420,
            height: 620,
            transform: "translate(-50%, -50%) scale(0.7)",
            transformOrigin: "center",
            pointerEvents: "none",
          }}
          scrolling="no"
          allow="autoplay; encrypted-media"
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      )}

      {/* Overlays */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
      <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[9px] tracking-[0.3em] uppercase text-white/90 backdrop-blur-sm bg-black/40 border border-white/10 rounded-full px-2.5 py-1">
        <Instagram className="w-3 h-3" />
        {category}
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="w-12 h-12 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-[0_0_30px_hsl(var(--primary)/0.6)]">
          <Play className="w-4 h-4 text-primary-foreground fill-primary-foreground ml-0.5" />
        </div>
      </div>
    </div>
  );
};

export default ReelThumb;
