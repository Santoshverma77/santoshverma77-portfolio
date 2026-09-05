import { useState } from "react";
import { ArrowUpRight, Mail, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { sendContactEmail } from "@/lib/contact.functions";
import { SOCIALS } from "@/lib/links";
import { useReveal, revealStyle } from "@/hooks/useReveal";
import SectionHeader from "@/components/SectionHeader";
import PageTransition from "@/components/PageTransition";

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
  const { ref, visible } = useReveal<HTMLDivElement>(0.05);
  const [focus, setFocus] = useState<string | null>(null);
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
      <label className="block text-[10px] tracking-[0.3em] uppercase text-white/40 mb-2.5">
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
              className={`px-3.5 py-1.5 rounded-full text-xs border transition-all ${
                active
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-white/15 text-white/60 hover:text-white hover:border-white/40"
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
      <div ref={ref} className="pt-24 md:pt-28 pb-24 min-h-screen bg-[#0a0a0a] text-white">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-12">
          <SectionHeader
            eyebrow="Hire Me"
            title="Let's work"
            italic="together"
            visible={visible}
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
            {/* Left — pitch */}
            <div className="md:col-span-5 space-y-6" style={revealStyle(visible, 0, 80)}>
              <p
                className="text-2xl md:text-3xl font-light leading-snug text-white/90"
                style={{ fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}
              >
                Tell me about your project.{" "}
                <span className="italic text-white/60">I'll handle the rest.</span>
              </p>
              <p className="text-white/55 leading-relaxed text-[15px]">
                Fill in the quick brief and I'll reply with availability, approach and a quote —
                usually within 24 hours. Video editing, reels, websites, content: if it ships,
                I can build it.
              </p>
              <ul className="space-y-2.5 text-sm text-white/65">
                {[
                  "Fast turnaround — reels in days, sites in weeks",
                  "One point of contact, start to finish",
                  "Clear pricing before any work begins",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="pt-4 space-y-1">
                <div className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-2">
                  Prefer direct?
                </div>
                <a
                  href={`mailto:${SOCIALS.email}?subject=Project%20Inquiry`}
                  className="group flex items-center gap-3 py-2.5 text-white/80 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-white/50 group-hover:text-primary transition-colors" />
                  <span className="text-sm">{SOCIALS.email}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-primary transition-all" />
                </a>
                <a
                  href={`tel:${SOCIALS.phone}`}
                  className="group flex items-center gap-3 py-2.5 text-white/80 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-white/50 group-hover:text-primary transition-colors" />
                  <span className="text-sm">{SOCIALS.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Right — brief form */}
            <form
              onSubmit={handleSubmit}
              className="md:col-span-7 space-y-7 p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02]"
              style={revealStyle(visible, 1, 80)}
            >
              {[
                { key: "name" as const, label: "Your name", type: "text", placeholder: "Full name" },
                { key: "email" as const, label: "Your email", type: "email", placeholder: "you@example.com" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-[10px] tracking-[0.3em] uppercase text-white/40 mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    value={form[field.key]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    onFocus={() => setFocus(field.key)}
                    onBlur={() => setFocus(null)}
                    placeholder={field.placeholder}
                    disabled={submitting}
                    className={`w-full bg-transparent border-b py-2.5 text-white placeholder-white/25 outline-hidden transition-colors ${
                      focus === field.key ? "border-primary" : "border-white/15 hover:border-white/30"
                    }`}
                  />
                </div>
              ))}

              <ChipGroup label="What do you need?" field="type" options={PROJECT_TYPES} />
              <ChipGroup label="Budget (optional)" field="budget" options={BUDGETS} />
              <ChipGroup label="Timeline (optional)" field="timeline" options={TIMELINES} />

              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-white/40 mb-2">
                  Project details
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={() => setFocus("message")}
                  onBlur={() => setFocus(null)}
                  placeholder="What are we making? Links, references, goals — anything helps."
                  disabled={submitting}
                  className={`w-full bg-transparent border-b py-2.5 text-white placeholder-white/25 outline-hidden resize-none transition-colors ${
                    focus === "message" ? "border-primary" : "border-white/15 hover:border-white/30"
                  }`}
                />
              </div>

              <div className="pt-1 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-white/40">No obligation — I'll reply with a quote.</p>
                <button
                  type="submit"
                  disabled={submitting}
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.55)] disabled:opacity-60 transition-all"
                >
                  {submitting ? "Sending…" : (
                    <>
                      Send brief
                      <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default HirePage;
