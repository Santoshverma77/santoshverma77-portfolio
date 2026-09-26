import { Link } from "@tanstack/react-router";
import { Check, Copy, Loader2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { PageHeader, Reveal } from "@/components/site/Reveal";
import { CONTACT } from "@/content/site";
import { sendContactEmail } from "@/lib/contact.functions";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [copied, setCopied] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await sendContactEmail({ data: form });
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      toast.success("Message sent — I'll reply within 24 hours.");
    } catch {
      setStatus("idle");
      toast.error("Couldn't send right now. Please email me directly.");
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(CONTACT.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const input = "w-full rounded-2xl border border-border bg-card px-5 py-4 outline-none transition focus:border-mint-deep focus:ring-4 focus:ring-mint";

  return (
    <>
      <PageHeader eyebrow="Contact" title="Say hello." intro="Questions, collaborations or just a good idea — my inbox is open." />
      <section className="mx-auto grid max-w-6xl gap-8 px-5 sm:px-8 md:grid-cols-[1fr_1.2fr]">
        <Reveal className="space-y-4">
          <div className="rounded-3xl bg-mint p-6">
            <p className="font-mono-ui text-xs uppercase tracking-widest opacity-60">Email</p>
            <div className="mt-2 flex items-center justify-between gap-3">
              <a href={`mailto:${CONTACT.email}`} className="font-display break-all text-xl font-bold">{CONTACT.email}</a>
              <button onClick={copy} aria-label="Copy email" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-card">{copied ? <Check size={16} /> : <Copy size={16} />}</button>
            </div>
          </div>
          <a href={`tel:${CONTACT.phone}`} className="block rounded-3xl bg-sky p-6">
            <p className="font-mono-ui text-xs uppercase tracking-widest opacity-60">Phone / WhatsApp</p>
            <p className="font-display mt-2 text-xl font-bold">{CONTACT.phoneDisplay}</p>
          </a>
          <div className="rounded-3xl bg-peach p-6">
            <p className="font-mono-ui text-xs uppercase tracking-widest opacity-60">Elsewhere</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {CONTACT.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="rounded-full bg-card px-4 py-2 text-sm hover:bg-ink hover:text-background">{s.label}</a>
              ))}
            </div>
          </div>
          <Link to="/hire" className="block rounded-3xl bg-ink p-6 text-background">
            <p className="font-display text-xl font-bold">Have a project brief? →</p>
            <p className="text-sm opacity-70">Use the hire form for budgets and timelines.</p>
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={submit} className="space-y-4 rounded-[2rem] border border-border bg-card/60 p-6 sm:p-8">
            <input required maxLength={100} placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={input} aria-label="Your name" />
            <input required type="email" maxLength={255} placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={input} aria-label="Email address" />
            <textarea required maxLength={4000} rows={6} placeholder="Tell me what's on your mind…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={input} aria-label="Message" />
            <button disabled={status === "sending"} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 font-semibold text-background transition hover:scale-[1.01] disabled:opacity-60">
              {status === "sending" ? <Loader2 className="animate-spin" size={18} /> : status === "sent" ? <Check size={18} /> : <Send size={18} />}
              {status === "sending" ? "Sending…" : status === "sent" ? "Sent!" : "Send message"}
            </button>
          </form>
        </Reveal>
      </section>
    </>
  );
}
