import { Link, useLocation } from "react-router-dom";
import { Home, User, Briefcase, Code2, FolderKanban, Mail, FileText, Sparkles } from "lucide-react";
import { useSounds } from "@/contexts/SoundContext";
import { RESUME_URL } from "@/lib/links";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/skills", label: "Skills", icon: Code2 },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/freelance", label: "Freelance", icon: Sparkles },
  { href: "/experience", label: "Experience", icon: Briefcase },
  { href: "/resume", label: "Resume", icon: FileText },
];

const Navbar = () => {
  const location = useLocation();
  const { playHover, playNavigate } = useSounds();

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <>
      {/* Desktop: floating left vertical rail */}
      <nav
        className="hidden md:flex fixed left-5 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-2 p-2.5 rounded-full bg-black/70 backdrop-blur-xl border border-white/10 shadow-2xl"
        aria-label="Primary"
      >
        {navLinks.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => playNavigate()}
              onMouseEnter={() => playHover()}
              aria-label={link.label}
              className="group relative"
            >
              <div
                className={`relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 ${
                  active
                    ? "bg-primary text-primary-foreground shadow-[0_0_24px_hsl(var(--primary)/0.6)]"
                    : "text-white/55 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
              </div>
              {/* Tooltip */}
              <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-black/90 border border-white/10 text-[11px] tracking-wide text-white/90 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity">
                {link.label}
              </span>
            </Link>
          );
        })}

        <div className="w-6 h-px bg-white/10 my-1" />

        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact"
          onMouseEnter={() => playHover()}
          className="group relative"
        >
          <div className="flex items-center justify-center w-11 h-11 rounded-full bg-primary text-primary-foreground shadow-[0_0_24px_hsl(var(--primary)/0.6)] hover:scale-105 transition-transform">
            <Mail className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </div>
        </a>
      </nav>

      {/* Mobile: bottom horizontal pill */}
      <nav
        className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 p-2 rounded-full bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl"
        aria-label="Primary mobile"
      >
        {navLinks.slice(0, 5).map((link) => {
          const Icon = link.icon;
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => playNavigate()}
              aria-label={link.label}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-[17px] h-[17px]" strokeWidth={1.75} />
            </Link>
          );
        })}
        <Link
          to="/contact"
          aria-label="Contact"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground"
        >
          <Mail className="w-[17px] h-[17px]" strokeWidth={1.75} />
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
