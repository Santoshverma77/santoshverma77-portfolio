import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Reveal, SplitHeading } from "@/components/site/Reveal";
import RocketStack from "@/components/site/RocketStack";
import { PERSON, PROJECTS, SERVICES, STATS, STACK, TONE_BG } from "@/content/site";

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[100svh] overflow-hidden px-5 pt-28 sm:px-8">
        <div className="bg-aurora pointer-events-none absolute inset-0" />
        <div className="grid-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 pb-16 md:grid-cols-[1.3fr_1fr] md:pt-10">
          <motion.div style={{ y: textY }}>
            <Reveal>
              <p className="font-mono-ui inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs font-medium backdrop-blur">
                <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint-deep opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-mint-deep" /></span>
                {PERSON.name} · {PERSON.role} · {PERSON.location}
              </motion.p>
            </Reveal>
            <h1 className="font-display mt-6 text-[13vw] font-bold leading-[0.9] sm:text-7xl lg:text-[6.5rem]">
              <SplitHeading text="Developer." />
              <br />
              <span className="text-mint-deep"><SplitHeading text="Video editor." /></span>
              <br />
              <SplitHeading text="Storyteller." />
            </h1>
            <Reveal delay={0.3}>
              <p className="font-display mt-5 max-w-xl text-xl font-semibold sm:text-2xl">{PERSON.tagline}</p>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="mt-4 max-w-lg text-lg text-muted-foreground">{PERSON.intro}</p>
            </Reveal>
            <Reveal delay={0.55} className="mt-8 flex flex-wrap gap-3">
              <Link to="/projects" className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-semibold text-background">
                See my work <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" />
              </Link>
              <Link to="/hire" className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-card px-6 py-3.5 font-semibold hover:bg-mint">
                Start a project
              </Link>
            </Reveal>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.92, rotate: -3 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }} className="relative mx-auto w-full max-w-sm">
            <div className="animate-blob absolute -inset-6 -z-10 rounded-[3rem] bg-mint blur-2xl" />
            <div className="overflow-hidden rounded-[2.5rem] border-8 border-card shadow-soft">
              <motion.img style={{ y: imgY }} src={PERSON.portrait} alt={PERSON.name} className="aspect-[4/5] w-full scale-110 object-cover" width={480} height={600} />
            </div>
            <div className="absolute -bottom-5 -left-5 rounded-2xl bg-peach px-4 py-3 shadow-soft">
              <p className="font-mono-ui text-[10px] uppercase tracking-widest opacity-60">Studying</p>
              <p className="font-display font-bold">IIT Madras</p>
            </div>
            <div className="absolute -right-4 top-8 rounded-2xl bg-sky px-4 py-3 shadow-soft">
              <p className="font-mono-ui text-[10px] uppercase tracking-widest opacity-60">Google</p>
              <p className="font-display font-bold">Student Ambassador</p>
            </div>
          </motion.div>
        </div>
        <a href="#marquee" aria-label="Scroll down" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block">
          <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} className="grid h-12 w-12 place-items-center rounded-full border border-border bg-card">
            <ArrowDown size={18} />
          </motion.span>
        </a>
      </section>

      {/* MARQUEE */}
      <section id="marquee" className="overflow-hidden border-y border-border bg-card py-5">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
          {[...STACK, ...STACK].map((t, i) => (
            <span key={i} className="font-display flex items-center gap-10 text-2xl font-bold sm:text-3xl">
              {t.name}<span className="h-2 w-2 rounded-full bg-mint-deep" />
            </span>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 py-20 sm:px-8 md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="rounded-3xl border border-border bg-card p-6">
            <p className="font-display text-5xl font-bold">{s.value}</p>
            <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
          </Reveal>
        ))}
      </section>

      {/* SELECTED WORK */}
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2 className="font-display text-4xl font-bold sm:text-6xl"><SplitHeading text="Selected work" /></h2>
          <Link to="/projects" className="hidden rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-mint sm:inline-flex">All projects</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.slice(0, 4).map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.1}>
              <a href={p.url} target="_blank" rel="noreferrer" className={`group block overflow-hidden rounded-[2rem] ${TONE_BG[p.tone]} p-3`}>
                <div className="aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-card">
                  {p.image ? (
                    <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="font-display grid h-full place-items-center p-6 text-center text-4xl font-bold opacity-80 transition-transform duration-700 group-hover:scale-105">{p.title}</div>
                  )}
                </div>
                <div className="flex items-center justify-between px-3 pb-2 pt-4">
                  <div>
                    <h3 className="font-display text-2xl font-bold">{p.title}</h3>
                    <p className="text-sm opacity-70">{p.category} · {p.year}</p>
                  </div>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-background transition-transform group-hover:rotate-45"><ArrowUpRight size={18} /></span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <h2 className="font-display text-4xl font-bold sm:text-6xl"><SplitHeading text="What I do" /></h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className={`h-full rounded-3xl ${TONE_BG[s.tone]} p-6 transition-transform duration-500 hover:-translate-y-2`}>
                <p className="font-mono-ui text-xs opacity-60">0{i + 1}</p>
                <h3 className="font-display mt-10 text-2xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm opacity-75">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STACK LAUNCH */}
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-display text-4xl font-bold sm:text-6xl"><SplitHeading text="Stack, launched" /></h2>
          <Link to="/skills" className="hidden rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-mint sm:inline-flex">Full stack</Link>
        </div>
        <RocketStack />
      </section>
    </>
  );
}
