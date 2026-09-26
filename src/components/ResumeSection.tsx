import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Download, FileText } from "lucide-react";
import { RESUMES } from "@/lib/links";
import { Reveal, PageHeader } from "@/components/site/Reveal";

const TONES = ["bg-mint", "bg-sky", "bg-peach"];

const ResumeSection = () => {
  const [active, setActive] = useState(0);
  const resume = RESUMES[active];

  return (
    <>
      <PageHeader
        eyebrow="Resume"
        title="Two tracks, one story"
        intro="Full-stack developer and video editor — pick the resume that fits your project."
      />
      <section id="resume" className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <Reveal>
          <div role="tablist" aria-label="Resume type" className="mb-10 inline-flex flex-wrap gap-1 rounded-full border border-border bg-card p-1 shadow-soft">
            {RESUMES.map((r, i) => (
              <button
                key={r.id}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`relative rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] transition-colors ${
                  i === active ? "text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {i === active && (
                  <motion.span layoutId="resume-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                <span className="relative">{r.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={resume.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 items-center gap-8 md:grid-cols-5 md:gap-12"
          >
            <div className={`group relative overflow-hidden rounded-[2rem] border border-border ${TONES[active % 3]} p-3 shadow-soft md:col-span-3`}>
              <div className="aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-card md:aspect-[16/11]">
                <iframe src={resume.previewUrl} title={`${resume.label} resume preview`} className="h-full w-full" loading="lazy" />
              </div>
              <a
                href={resume.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${resume.label} resume in new tab`}
                className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-background shadow-soft transition-transform hover:-translate-y-0.5"
              >
                Open <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="space-y-6 md:col-span-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span className="font-mono-ui text-[10px] uppercase tracking-[0.3em]">{resume.eyebrow}</span>
              </div>
              <h2 className="font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
                {resume.title} <span className="text-mint-deep">{resume.italic}</span>
              </h2>
              <p className="leading-relaxed text-muted-foreground">{resume.description}</p>
              <div className="flex flex-wrap gap-3 pt-1">
                <a href={resume.url} download={resume.fileName} className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-background shadow-soft transition-all hover:-translate-y-0.5">
                  <Download className="h-4 w-4" /> Download resume
                </a>
                <a href={resume.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-mint">
                  View online <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
              <p className="text-xs text-muted-foreground">Switch tracks above — both resumes are kept up to date.</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
    </>
  );
};

export default ResumeSection;
