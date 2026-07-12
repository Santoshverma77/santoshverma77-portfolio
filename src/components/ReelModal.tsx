import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpRight, Instagram } from "lucide-react";

interface ReelModalProps {
  open: boolean;
  onClose: () => void;
  reelUrl?: string;
  externalUrl: string;
  title: string;
  category: string;
  description: string;
  tools: string[];
}

/** Convert a full instagram reel URL to its /embed variant */
const toEmbed = (url?: string) => {
  if (!url) return "";
  const clean = url.split("?")[0].replace(/\/$/, "");
  return `${clean}/embed`;
};

const ReelModal = ({
  open,
  onClose,
  reelUrl,
  externalUrl,
  title,
  category,
  description,
  tools,
}: ReelModalProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!open) setLoaded(false);
  }, [open]);

  const embed = toEmbed(reelUrl);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-4xl bg-[#0a0a0a] border-white/10 text-white p-0 overflow-hidden">
        <div className="grid md:grid-cols-5">
          {/* Media */}
          <div className="md:col-span-3 relative bg-black min-h-[420px] md:min-h-[560px]">
            {embed ? (
              <>
                {!loaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
                    <Skeleton className="w-full h-full absolute inset-0 bg-white/[0.04]" />
                    <div className="relative flex items-center gap-2 text-xs tracking-widest uppercase text-white/50">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      Loading reel…
                    </div>
                  </div>
                )}
                <iframe
                  key={embed}
                  src={embed}
                  className="w-full h-full absolute inset-0"
                  style={{ minHeight: 560, border: 0 }}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  onLoad={() => setLoaded(true)}
                />
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center bg-gradient-to-br from-primary/20 via-blue-500/10 to-transparent">
                <Instagram className="w-10 h-10 text-primary" />
                <div className="text-sm text-white/70 max-w-xs">
                  Preview coming soon. Tap below to watch this reel on Instagram.
                </div>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="md:col-span-2 p-6 md:p-8 flex flex-col gap-5">
            <div className="text-[10px] tracking-[0.3em] uppercase text-primary/80">{category}</div>
            <h3
              className="text-3xl md:text-4xl font-light leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              <span className="italic">{title}</span>
            </h3>
            <p className="text-sm text-white/60 leading-relaxed">{description}</p>

            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-2">Tech Stack</div>
              <div className="flex flex-wrap gap-1.5">
                {tools.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] tracking-wider uppercase text-white/70 border border-white/15 rounded-full px-2.5 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer external"
              referrerPolicy="no-referrer"
              className="mt-auto group inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-primary text-primary-foreground text-sm shadow-[0_0_25px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.55)] transition-all"
            >
              <Instagram className="w-4 h-4" />
              Open on Instagram
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReelModal;
