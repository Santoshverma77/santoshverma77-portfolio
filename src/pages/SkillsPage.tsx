import { PageHeader, Reveal } from "@/components/site/Reveal";
import RocketStack from "@/components/site/RocketStack";
import { STACK } from "@/content/site";

const GROUPS = ["Build", "Data & AI", "Create"] as const;

export default function SkillsPage() {
  return (
    <>
      <PageHeader eyebrow="Tech stack" title="Tools I launch with" intro="Hover a star to see its name. From React and Node to Premiere and Resolve — engineering and editing live in the same toolbox." />
      <section className="mx-auto max-w-6xl px-5 sm:px-8">
        <RocketStack />
      </section>
      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-20 sm:px-8 md:grid-cols-3">
        {GROUPS.map((g, i) => (
          <Reveal key={g} delay={i * 0.1} className="rounded-3xl border border-border bg-card p-6">
            <h2 className="font-display text-2xl font-bold">{g}</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {STACK.filter((t) => t.group === g).map((t) => (
                <li key={t.name} className="rounded-full bg-muted px-3 py-1.5 text-sm">{t.name}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </section>
    </>
  );
}
