import { Instagram, Twitter, MapPin, Github } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";
import SectionHeader from "./SectionHeader";
import { useReveal, revealStyle } from "@/hooks/useReveal";

const whatIDo = [
  "Full-Stack Development (MERN)",
  "Data Science & AI",
  "Java, DSA & Systems",
  "Photography & Videography",
  "Tech Community Building",
];

const AboutSection = () => {
  const { ref, visible } = useReveal<HTMLElement>(0.12);

  return (
    <section
      id="about"
      ref={ref}
      className="relative bg-[#0a0a0a] text-white py-24 md:py-32 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-6xl px-6 md:px-12">
        <SectionHeader eyebrow="About" title="A short" italic="introduction" visible={visible} />

        <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-start">
          {/* Portrait */}
          <div
            className="md:col-span-4 flex flex-col items-start gap-6"
            style={revealStyle(visible, 0)}
          >
            <div className="relative w-56 h-56 md:w-64 md:h-64 overflow-hidden rounded-sm ring-1 ring-white/10">
              <img
                src={profilePhoto}
                alt="Santosh Kumar Verma"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-white/70">
                <MapPin className="w-3.5 h-3.5" />
                <span className="tracking-wide">New Delhi, Delhi</span>
              </div>
              <div className="flex items-center gap-2 text-white/40">
                <MapPin className="w-3.5 h-3.5" />
                <span className="tracking-wide">Giridih, Jharkhand</span>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="md:col-span-8 space-y-6">
            <p
              className="text-2xl md:text-3xl font-light leading-snug text-white/90"
              style={{
                fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
                ...revealStyle(visible, 1),
              }}
            >
              I'm <span className="italic">Santosh Kumar Verma</span>, a BS in Data Science
              student at IIT Madras exploring AI, full-stack engineering, and visual storytelling.
            </p>

            <p
              className="text-white/60 leading-relaxed text-[15px]"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", ...revealStyle(visible, 2) }}
            >
              Currently enrolled in Apna College's Sigma 7.0 and Harkirat Singh's Cohort 1.0,
              sharpening Java, DSA and the MERN stack to ship optimized, scalable products.
              As a core team member at GDG Ranchi, I thrive on community, collaboration, and
              empowering fellow developers.
            </p>

            <div style={revealStyle(visible, 3)}>
              <div className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-4">
                What I do
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6">
                {whatIDo.map((skill, i) => (
                  <li
                    key={skill}
                    className="flex items-baseline gap-3 text-white/70 text-[15px]"
                    style={revealStyle(visible, 4 + i)}
                  >
                    <span className="text-white/30 text-xs">0{i + 1}</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10" style={revealStyle(visible, 9)}>
              {[
                { n: "10+", l: "Projects" },
                { n: "25+", l: "Certifications" },
                { n: "5+", l: "Communities" },
              ].map((s) => (
                <div key={s.l}>
                  <div
                    className="text-4xl md:text-5xl font-light italic text-white"
                    style={{ fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}
                  >
                    {s.n}
                  </div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-white/40 mt-1">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex items-center gap-3 pt-6" style={revealStyle(visible, 10)}>
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 mr-2">
                Connect
              </span>
              {[
                { href: "https://www.instagram.com/santoshverma_77/", icon: Instagram },
                { href: "https://twitter.com/santoshverma_77", icon: Twitter },
                { href: "https://github.com/Santoshverma77", icon: Github },
              ].map(({ href, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
