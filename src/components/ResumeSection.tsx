import { ArrowUpRight, Download, FileText } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useReveal, revealStyle } from "@/hooks/useReveal";
import { RESUME_URL, RESUME_PREVIEW_URL } from "@/lib/links";

const ResumeSection = () => {
  const { ref, visible } = useReveal<HTMLElement>(0.1);

  return (
    <section
      id="resume"
      ref={ref}
      className="relative bg-[#0a0a0a] text-white py-24 md:py-32 overflow-hidden border-t border-white/5"
    >
      <div className="mx-auto w-full max-w-6xl px-6 md:px-12">
        <SectionHeader eyebrow="Resume" title="The" italic="full story" visible={visible} />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center">
          {/* Preview card */}
          <div
            className="md:col-span-3 relative group rounded-xl overflow-hidden border border-white/10 bg-white/[0.02] aspect-[4/5] md:aspect-[16/11]"
            style={revealStyle(visible, 0, 80)}
          >
            <iframe
              src={RESUME_PREVIEW_URL}
              title="Santosh Kumar Verma — Resume preview"
              className="w-full h-full bg-white"
              loading="lazy"
            />
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex items-end justify-end p-4 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-black/40 to-transparent transition-opacity"
              aria-label="Open resume in new tab"
            >
              <span className="inline-flex items-center gap-1 text-xs text-white bg-black/60 backdrop-blur px-3 py-1.5 rounded-full">
                Open <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </a>
          </div>

          {/* Copy + CTAs */}
          <div className="md:col-span-2 space-y-6" style={revealStyle(visible, 1, 80)}>
            <div className="flex items-center gap-3 text-white/50">
              <FileText className="w-4 h-4" />
              <span className="text-[10px] tracking-[0.3em] uppercase">PDF · Updated 2025</span>
            </div>
            <h3
              className="text-3xl md:text-4xl font-light leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Santosh Kumar Verma —{" "}
              <span className="italic text-white/60">Developer, AI & Creator</span>
            </h3>
            <p className="text-white/55 leading-relaxed">
              A concise look at my experience, projects, certifications and the creative work I do
              outside of code.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground text-sm shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.55)] transition-all"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 text-sm text-white/80 hover:text-white hover:border-white/50 transition-all"
              >
                View Online
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
