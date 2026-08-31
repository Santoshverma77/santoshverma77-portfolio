import { useRef, useState } from "react";
import { ArrowUpRight, Github, Instagram, Linkedin, Mail, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import SectionHeader from "./SectionHeader";
import { useReveal, revealStyle } from "@/hooks/useReveal";

const socials = [
  { name: "Email",     href: "mailto:santoshskv2005@gmail.com",             icon: Mail,      handle: "santoshskv2005@gmail.com" },
  { name: "Phone",     href: "tel:+917319662244",                           icon: Phone,     handle: "+91 73196 62244" },
  { name: "GitHub",    href: "https://github.com/Santoshverma77",           icon: Github,    handle: "@Santoshverma77" },
  { name: "LinkedIn",  href: "https://linkedin.com/in/santoshverma77",      icon: Linkedin,  handle: "@santoshverma77" },
  { name: "Instagram", href: "https://www.instagram.com/santoshverma_77/",  icon: Instagram, handle: "@santoshverma_77" },
];

const ContactSection = () => {
  const { ref, visible } = useReveal<HTMLElement>(0.1);
  const [focus, setFocus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields");
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", { body: form });
      if (error) throw error;
      toast.success("Message sent — I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to send. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative bg-[#0a0a0a] text-white py-24 md:py-32 overflow-hidden border-t border-white/5"
    >
      <div className="mx-auto w-full max-w-6xl px-6 md:px-12">
        <SectionHeader eyebrow="Contact" title="Let's build" italic="something" visible={visible} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
          {/* Left column — intro & socials */}
          <div className="md:col-span-5 space-y-8" style={revealStyle(visible, 0, 80)}>
            <p
              className="text-2xl md:text-3xl font-light leading-snug text-white/90"
              style={{ fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}
            >
              Have a project, a role, or just a good idea?{" "}
              <span className="italic text-white/60">I'd love to hear it.</span>
            </p>
            <p className="text-white/55 leading-relaxed text-[15px]">
              Open to freelance video &amp; content work, full-stack collaborations, and full-time
              opportunities in AI / product engineering.
            </p>

            <div className="pt-4 space-y-3">
              <div className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-3">Elsewhere</div>
              {socials.map((s, i) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-3 border-b border-white/10 hover:border-primary/40 transition-colors"
                    style={revealStyle(visible, i + 1, 60)}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-white/50 group-hover:text-primary transition-colors" strokeWidth={1.75} />
                      <span className="text-white/80 group-hover:text-white text-[15px] transition-colors">
                        {s.name}
                      </span>
                      <span className="text-white/40 text-xs hidden sm:inline">{s.handle}</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right column — form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="md:col-span-7 space-y-6 p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02]"
            style={revealStyle(visible, 1, 80)}
          >
            {[
              { key: "name" as const,  label: "Your name",  type: "text",  placeholder: "Full name" },
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

            <div>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-white/40 mb-2">
                Message
              </label>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                onFocus={() => setFocus("message")}
                onBlur={() => setFocus(null)}
                placeholder="Tell me about your project, timeline, and what success looks like."
                disabled={submitting}
                className={`w-full bg-transparent border-b py-2.5 text-white placeholder-white/25 outline-hidden resize-none transition-colors ${
                  focus === "message" ? "border-primary" : "border-white/15 hover:border-white/30"
                }`}
              />
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-white/40">
                Usually replies within 24 hours.
              </p>
              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.55)] disabled:opacity-60 transition-all"
              >
                {submitting ? "Sending…" : (
                  <>
                    Send message
                    <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
