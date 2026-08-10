import { useState } from "react";
import { ArrowUpRight, Download, FileText } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useReveal, revealStyle } from "@/hooks/useReveal";
import { RESUMES } from "@/lib/links";

const ResumeSection = () => {
  const { ref, visible } = useReveal<HTMLElement>(0.1);
  const [active, setActive] = useState(0);
  const resume = RESUMES[active];

  return (
    <section
      id="resume"
      ref={ref}
      className="relative bg-[#0a0a0a] text-white py-24 md:py-32 overflow-hidden border-t border-white/5"
    >
      <div className="mx-auto w-full max-w-6xl px-6 md:px-12">
        <SectionHeader eyebrow="Resume" title="Two tracks," italic="one story" visible={visible} />

        {/* Track switcher */}
        <div
          className="flex flex-wrap gap-2 mb-10"
          style={revealStyle(visible, 0, 80)}
          role="tablist"
          aria-label="Resume type"
        >
          {RESUMES.map((r, i) => (
            <button
              key={r.id}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`px-5 py-2.5 rounded-full text-xs tracking-[0.15em] uppercase transition-all border ${
                i === active
                  ? "bg-primary text-primary-foreground border-transparent shadow-[0_0_28px_hsl(var(--primary)/0.4)]"
                  : "border-white/15 text-white/55 hover:text-white hover:border-white/40"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center">
          {/* Preview card */}
          <div
            className="md:col-span-3 relative group rounded-xl overflow-hidden border border-white/10 bg-white/[0.02] aspect-[4/5] md:aspect-[16/11]"
            style={revealStyle(visible, 1, 80)}
          >
            <iframe
              key={resume.id}
              src={resume.previewUrl}
              title={`${resume.label} resume preview`}
              className="w-full h-full bg-white"
              loading="lazy"
            />
            <a
              href={resume.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex items-end justify-end p-4 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-black/40 to-transparent transition-opacity"
              aria-label={`Open ${resume.label} resume in new tab`}
            >
              <span className="inline-flex items-center gap-1 text-xs text-white bg-black/60 backdrop-blur px-3 py-1.5 rounded-full">
                Open <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </a>
          </div>

          {/* Copy + CTAs */}
          <div className="md:col-span-2 space-y-6" style={revealStyle(visible, 2, 80)}>
            <div className="flex items-center gap-3 text-white/50">
              <FileText className="w-4 h-4" />
              <span className="text-[10px] tracking-[0.3em] uppercase">{resume.eyebrow}</span>
            </div>
            <h3
              className="text-3xl md:text-4xl font-light leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {resume.title}{" "}
              <span className="italic text-white/60">{resume.italic}</span>
            </h3>
            <p className="text-white/55 leading-relaxed">{resume.description}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={resume.url}
                download={resume.fileName}
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground text-sm shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.55)] transition-all"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
              <a
                href={resume.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 text-sm text-white/80 hover:text-white hover:border-white/50 transition-all"
              >
                View Online
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
            <p className="text-white/35 text-xs">
              Looking for the other one? Switch tracks above — both resumes are always up to date.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
