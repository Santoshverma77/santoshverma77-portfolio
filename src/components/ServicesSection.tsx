import { Link } from "@/lib/router-compat";
import { ArrowUpRight, Video, Camera, Film, Sparkles, Megaphone, Palette } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useReveal, revealStyle } from "@/hooks/useReveal";

const services = [
  {
    icon: Video,
    title: "Video Editing",
    desc: "Long-form, podcasts, vlogs — color, sound and pacing tuned for retention.",
  },
  {
    icon: Film,
    title: "Reels & Shorts",
    desc: "Hook-first vertical edits built for Instagram, YouTube Shorts and TikTok.",
  },
  {
    icon: Sparkles,
    title: "Social Media Content",
    desc: "Content packs, weekly reels, captions and motion graphics for creators & brands.",
  },
  {
    icon: Camera,
    title: "Photography",
    desc: "Portraits, lifestyle and product photography with cinematic color treatment.",
  },
  {
    icon: Camera,
    title: "Videography & Events",
    desc: "On-location shooting and full event coverage with multi-cam delivery.",
  },
  {
    icon: Megaphone,
    title: "Promotional Videos",
    desc: "Brand and product story edits engineered for conversion and reach.",
  },
  {
    icon: Palette,
    title: "Content Strategy",
    desc: "Hook frameworks, content calendars and platform-fit creative direction.",
  },
  {
    icon: Sparkles,
    title: "Brand Content",
    desc: "End-to-end creative for brands — concept, shoot, edit and delivery.",
  },
];

const ServicesSection = () => {
  const { ref, visible } = useReveal<HTMLElement>(0.1);

  return (
    <section
      id="services"
      ref={ref}
      className="relative bg-[#0a0a0a] text-white py-24 md:py-32 overflow-hidden border-t border-white/5"
    >
      <div className="mx-auto w-full max-w-6xl px-6 md:px-12">
        <SectionHeader
          eyebrow="Services"
          title="Work with"
          italic="me"
          visible={visible}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-xl overflow-hidden">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="group relative bg-[#0a0a0a] p-6 md:p-8 hover:bg-white/[0.03] transition-colors"
                style={revealStyle(visible, i, 50)}
              >
                <Icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                <h3
                  className="mt-4 text-xl font-light text-white"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-white/50 leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>

        <div
          className="mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 md:p-8 border border-white/10 rounded-xl bg-white/[0.02]"
          style={revealStyle(visible, services.length, 50)}
        >
          <div>
            <p
              className="text-2xl md:text-3xl font-light text-white"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Have a project in mind?{" "}
              <span className="italic text-white/60">Let's create something.</span>
            </p>
            <p className="mt-2 text-sm text-white/50">
              Available for freelance video, photography and brand content collaborations.
            </p>
          </div>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm whitespace-nowrap shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.55)] transition-all"
          >
            Hire me
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
