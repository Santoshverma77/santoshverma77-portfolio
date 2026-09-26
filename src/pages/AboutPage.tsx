import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PageHeader, Reveal } from "@/components/site/Reveal";
import { EDUCATION, PERSON, SERVICES, TONE_BG } from "@/content/site";

const STORY =
  "I sit between two worlds. By day I study data science at IIT Madras and build web products with React and Node. By night I edit reels and cinematic stories. That mix is my edge — I design with an editor's sense of rhythm and edit with an engineer's precision.";

export default function AboutPage() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = STORY.split(" ");

  return (
    <>
      <PageHeader eyebrow="About" title="Hi, I'm Santosh." />
      <section className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 md:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <div className="sticky top-28 overflow-hidden rounded-[2rem] border-8 border-card shadow-soft">
            <img src={PERSON.portrait} alt={PERSON.name} className="aspect-[4/5] w-full object-cover" loading="lazy" />
          </div>
        </Reveal>
        <div>
          <p ref={ref} className="font-display text-3xl font-bold leading-snug sm:text-4xl">
            {words.map((w, i) => (
              <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>
            ))}
          </p>
          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08} className={`rounded-3xl ${TONE_BG[s.tone]} p-6`}>
                <h3 className="font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm opacity-75">{s.body}</p>
              </Reveal>
            ))}
          </div>
          <h2 className="font-display mt-16 text-3xl font-bold">Education</h2>
          <ul className="mt-6 space-y-3">
            {EDUCATION.map((e) => (
              <Reveal key={e.school}>
                <li className="rounded-3xl border border-border bg-card p-6">
                  <p className="font-mono-ui text-xs text-muted-foreground">{e.period}</p>
                  <p className="font-display mt-1 text-xl font-bold">{e.school}</p>
                  <p className="text-sm text-muted-foreground">{e.degree}</p>
                </li>
              </Reveal>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/resume" className="rounded-full bg-ink px-6 py-3.5 font-semibold text-background">View resume</Link>
            <Link to="/experience" className="rounded-full border border-border bg-card px-6 py-3.5 font-semibold hover:bg-mint">My journey</Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Word({ children, progress, range }: { children: string; progress: ReturnType<typeof useScroll>["scrollYProgress"]; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return <motion.span style={{ opacity }} className="inline-block">{children}&nbsp;</motion.span>;
}
