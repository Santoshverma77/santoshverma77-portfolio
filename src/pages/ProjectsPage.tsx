import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { PageHeader, Reveal } from "@/components/site/Reveal";
import { PROJECTS, TONE_BG } from "@/content/site";
import { Link } from "@tanstack/react-router";

export default function ProjectsPage() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <>
      <PageHeader eyebrow="Work · 2024—2026" title="Things I've shipped" intro="Live products, open-source tools and experiments. For edits and reels, see the video work page." />
      <section className="mx-auto max-w-6xl px-5 sm:px-8">
        <ul className="border-t border-border">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.04}>
              <li onMouseEnter={() => setActive(p.title)} onMouseLeave={() => setActive(null)} className="border-b border-border">
                <a href={p.url} target="_blank" rel="noreferrer" className="group grid items-center gap-4 py-7 sm:grid-cols-[3rem_1fr_auto]">
                  <span className="font-mono-ui text-sm text-muted-foreground">0{i + 1}</span>
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-8">
                    <h2 className={`font-display text-3xl font-bold transition-all duration-500 sm:text-5xl ${active && active !== p.title ? "opacity-30" : ""} group-hover:translate-x-3`}>{p.title}</h2>
                    <p className="max-w-md text-sm text-muted-foreground">{p.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="hidden flex-wrap gap-1.5 lg:flex">
                      {p.tech.map((t) => <span key={t} className={`rounded-full ${TONE_BG[p.tone]} px-3 py-1 text-xs`}>{t}</span>)}
                    </div>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border transition-all group-hover:rotate-45 group-hover:bg-ink group-hover:text-background"><ArrowUpRight size={18} /></span>
                  </div>
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-12 flex flex-wrap gap-3">
          <Link to="/freelance" className="rounded-full bg-ink px-6 py-3.5 font-semibold text-background">Video work</Link>
          <a href="https://github.com/Santoshverma77" target="_blank" rel="noreferrer" className="rounded-full border border-border bg-card px-6 py-3.5 font-semibold hover:bg-mint">More on GitHub</a>
        </Reveal>
      </section>
    </>
  );
}
