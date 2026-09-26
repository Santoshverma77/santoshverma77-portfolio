import { useState } from "react";
import { ArrowUpRight, Mail, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { sendContactEmail } from "@/lib/contact.functions";
import { SOCIALS } from "@/lib/links";
import { Reveal, PageHeader } from "@/components/site/Reveal";
import PageTransition from "@/components/PageTransition";
import { PERSON } from "@/content/site";

const PROJECT_TYPES = [
  "Video Editing / Reels",
  "Brand / Promo Video",
  "Full-Stack Website",
  "Social Media Content",
  "Photography / Videography",
  "Something else",
];

const BUDGETS = ["Under ₹5k", "₹5k – ₹15k", "₹15k – ₹50k", "₹50k+", "Let's discuss"];
const TIMELINES = ["ASAP", "1–2 weeks", "This month", "Flexible"];

const HirePage = () => {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    type: PROJECT_TYPES[0],
    budget: "",
    timeline: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email and project details");
      return;
    }
    setSubmitting(true);
    try {
      const message = [
        `Project type: ${form.type}`,
        form.budget ? `Budget: ${form.budget}` : null,
        form.timeline ? `Timeline: ${form.timeline}` : null,
        "",
        form.message,
      ]
        .filter((l) => l !== null)
        .join("\n");
      await sendContactEmail({
        data: {
          name: form.name,
          email: form.email,
          message,
          subject: `New project brief from ${form.name}`,
        },
      });
      toast.success("Brief sent — I'll get back to you within 24 hours.");
      setForm({ name: "", email: "", type: PROJECT_TYPES[0], budget: "", timeline: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to send. Please try again or email me directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const ChipGroup = ({
    label,
    field,
    options,
  }: {
    label: string;
    field: "type" | "budget" | "timeline";
    options: string[];
  }) => (
    <div>
      <label className="font-mono-ui block text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-2.5">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = form[field] === opt;
          return (
            <button
              key={opt}
              type="button"
              disabled={submitting}
              onClick={() => setForm({ ...form, [field]: opt })}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium border transition-all ${
                active
                  ? "bg-ink text-background border-ink"
                  : "border-border bg-card text-muted-foreground hover:bg-mint hover:text-foreground"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <PageTransition>
      <div className="bg-aurora pointer-events-none fixed inset-0 opacity-70" />
      <PageHeader
        eyebrow="Hire me"
        title="Let's work together"
        intro={PERSON.tagline}
      />

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-16">
          {/* Left — pitch */}
          <Reveal className="space-y-6 md:col-span-5">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Fill in the quick brief and I'll reply with availability, approach and a quote —
              usually within 24 hours. Video editing, reels, websites, content: if it ships,
              I can build it.
            </p>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {[
                "Fast turnaround — reels in days, sites in weeks",
                "One point of contact, start to finish",
                "Clear pricing before any work begins",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mint-deep" />
                  {point}
                </li>
              ))}
            </ul>

            <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
              <p className="font-mono-ui mb-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Prefer direct?
              </p>
              <a
                href={`mailto:${SOCIALS.email}?subject=Project%20Inquiry`}
                className="group flex items-center gap-3 py-2 text-foreground transition-colors hover:text-mint-deep"
              >
                <Mail className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-mint-deep" />
                <span className="text-sm font-medium">{SOCIALS.email}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-all group-hover:text-mint-deep" />
              </a>
              <a
                href={`tel:${SOCIALS.phone}`}
                className="group flex items-center gap-3 py-2 text-foreground transition-colors hover:text-mint-deep"
              >
                <Phone className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-mint-deep" />
                <span className="text-sm font-medium">{SOCIALS.phoneDisplay}</span>
              </a>
            </div>
          </Reveal>

          {/* Right — brief form */}
          <Reveal delay={0.15} className="md:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="space-y-7 rounded-[2rem] border border-border bg-card p-6 shadow-soft md:p-8"
            >
              {[
                { key: "name" as const, label: "Your name", type: "text", placeholder: "Full name" },
                { key: "email" as const, label: "Your email", type: "email", placeholder: "you@example.com" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="font-mono-ui mb-2 block text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    value={form[field.key]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    disabled={submitting}
                    className="w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all focus:border-mint-deep focus:ring-2 focus:ring-mint-deep/20"
                  />
                </div>
              ))}

              <ChipGroup label="What do you need?" field="type" options={PROJECT_TYPES} />
              <ChipGroup label="Budget (optional)" field="budget" options={BUDGETS} />
              <ChipGroup label="Timeline (optional)" field="timeline" options={TIMELINES} />

              <div>
                <label className="font-mono-ui mb-2 block text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Project details
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="What are we making? Links, references, goals — anything helps."
                  disabled={submitting}
                  className="w-full resize-none rounded-xl border border-input bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all focus:border-mint-deep focus:ring-2 focus:ring-mint-deep/20"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <p className="text-xs text-muted-foreground">No obligation — I'll reply with a quote.</p>
                <button
                  type="submit"
                  disabled={submitting}
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-background shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow disabled:opacity-60"
                >
                  {submitting ? "Sending…" : (
                    <>
                      Send brief
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
};

export default HirePage;
