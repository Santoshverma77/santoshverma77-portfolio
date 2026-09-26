import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { PageHeader, Reveal } from "@/components/site/Reveal";
import { EXPERIENCE } from "@/content/site";

export default function ExperiencePage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <>
      <PageHeader eyebrow="Journey" title="Roles & communities" intro="Leadership, community and open-source roles that shaped how I build and collaborate." />
      <section ref={ref} className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <div className="absolute bottom-0 left-[1.6rem] top-0 w-px bg-border sm:left-[2.1rem]" />
        <motion.div style={{ scaleY }} className="absolute bottom-0 left-[1.6rem] top-0 w-px origin-top bg-mint-deep sm:left-[2.1rem]" />
        <ol className="space-y-6">
          {EXPERIENCE.map((e, i) => (
            <Reveal key={e.role + e.org} delay={0.05}>
              <li className="relative pl-12">
                <span className="absolute left-0 top-7 h-3 w-3 -translate-x-[-0.3rem] rounded-full border-2 border-background bg-mint-deep ring-4 ring-mint" />
                <div className="rounded-3xl border border-border bg-card p-6 transition-shadow hover:shadow-soft">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="font-display text-2xl font-bold">{e.role}</h2>
                    <span className="font-mono-ui text-xs text-muted-foreground">{e.period}</span>
                  </div>
                  <p className={`mt-1 inline-block rounded-full px-3 py-0.5 text-sm ${["bg-mint", "bg-sky", "bg-peach", "bg-lilac"][i % 4]}`}>{e.org}</p>
                  <p className="mt-3 text-muted-foreground">{e.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>
    </>
  );
}
