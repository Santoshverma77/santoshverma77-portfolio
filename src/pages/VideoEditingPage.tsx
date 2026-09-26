import { useState } from "react";
import { Check, Send } from "lucide-react";
import { toast } from "sonner";
import { sendContactEmail } from "@/lib/contact.functions";
import { Reveal, PageHeader } from "@/components/site/Reveal";
import PageTransition from "@/components/PageTransition";
import { VIDEO_PACKAGES, VIDEO_ADDONS } from "@/content/site";

const input =
  "w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all focus:border-mint-deep focus:ring-2 focus:ring-mint-deep/20";

const VideoEditingPage = () => {
  const [pkg, setPkg] = useState(VIDEO_PACKAGES[1].name);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", date: "", message: "" });

  const book = (name: string) => {
    setPkg(name);
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return toast.error("Please fill in name, email and details");
    setSending(true);
    try {
      await sendContactEmail({
        data: {
          name: form.name,
          email: form.email,
          subject: `Video editing booking — ${pkg}`,
          message: [`Package: ${pkg}`, form.date ? `Needed by: ${form.date}` : null, "", form.message].filter((l) => l !== null).join("\n"),
        },
      });
      toast.success("Booking request sent — I'll confirm within 24 hours.");
      setForm({ name: "", email: "", date: "", message: "" });
    } catch {
      toast.error("Failed to send. Please try again or email me directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <PageTransition>
      <PageHeader eyebrow="Services" title="Video editing services" intro="Reels, promos and cinematic edits — clear packages, fast turnaround." />

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {VIDEO_PACKAGES.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <div className={`flex h-full flex-col rounded-[2rem] border border-border p-7 shadow-soft ${p.featured ? "bg-ink text-background" : "bg-card"}`}>
                <p className="font-mono-ui text-[10px] uppercase tracking-[0.3em] opacity-70">{p.tag}</p>
                <h2 className="font-display mt-2 text-2xl font-bold">{p.name}</h2>
                <p className="font-display mt-4 text-4xl font-bold">{p.price}</p>
                <p className="mt-1 text-xs opacity-70">{p.unit}</p>
                <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-mint-deep" />{f}</li>
                  ))}
                </ul>
                <button onClick={() => book(p.name)} className={`mt-7 rounded-full px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 ${p.featured ? "bg-mint text-foreground" : "bg-ink text-background"}`}>
                  Book {p.name}
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 rounded-3xl border border-border bg-peach/60 p-6">
          <p className="font-mono-ui mb-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Add-ons</p>
          <div className="flex flex-wrap gap-2">
            {VIDEO_ADDONS.map((a) => (
              <span key={a} className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium">{a}</span>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="book" className="mx-auto max-w-3xl scroll-mt-28 px-5 pb-24 sm:px-8">
        <Reveal>
          <form onSubmit={submit} className="space-y-6 rounded-[2rem] border border-border bg-card p-6 shadow-soft md:p-8">
            <h2 className="font-display text-2xl font-bold">Book your edit</h2>
            <div className="flex flex-wrap gap-2">
              {VIDEO_PACKAGES.map((p) => (
                <button key={p.name} type="button" onClick={() => setPkg(p.name)} className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${pkg === p.name ? "border-ink bg-ink text-background" : "border-border bg-card text-muted-foreground hover:bg-mint"}`}>
                  {p.name}
                </button>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input className={input} placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} disabled={sending} />
              <input className={input} type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} disabled={sending} />
            </div>
            <input className={input} type="date" aria-label="Needed by" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} disabled={sending} />
            <textarea className={`${input} resize-none`} rows={4} placeholder="Footage length, style references, where it will be posted…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} disabled={sending} />
            <button type="submit" disabled={sending} className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-background shadow-soft transition-all hover:-translate-y-0.5 disabled:opacity-60">
              {sending ? "Sending…" : <>Send booking <Send className="h-4 w-4" /></>}
            </button>
          </form>
        </Reveal>
      </section>
    </PageTransition>
  );
};

export default VideoEditingPage;
