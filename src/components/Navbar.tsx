import { useEffect, useState, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, User, Briefcase, Code2, FolderKanban, Mail, FileText, Sparkles } from "lucide-react";
import { useSounds } from "@/contexts/SoundContext";

type NavItem = {
  href: string;      // route path
  section: string;   // section id on home page (empty if route-only)
  label: string;
  icon: typeof Home;
};

const navLinks: NavItem[] = [
  { href: "/",           section: "home",      label: "Home",       icon: Home },
  { href: "/about",      section: "about",     label: "About",      icon: User },
  { href: "/skills",     section: "skills",    label: "Skills",     icon: Code2 },
  { href: "/projects",   section: "projects",  label: "Projects",   icon: FolderKanban },
  { href: "/freelance",  section: "freelance", label: "Freelance",  icon: Sparkles },
  { href: "/experience", section: "",          label: "Experience", icon: Briefcase },
  { href: "/resume",     section: "resume",    label: "Resume",     icon: FileText },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { playHover, playNavigate } = useSounds();
  const [activeSection, setActiveSection] = useState<string>("home");

  const onHome = location.pathname === "/";

  // Scrollspy — only on home
  useEffect(() => {
    if (!onHome) return;
    const ids = navLinks.map((l) => l.section).filter(Boolean);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [onHome, location.pathname]);

  const isActive = (item: NavItem) => {
    if (onHome) {
      if (item.href === "/" && activeSection === "home") return true;
      return !!item.section && item.section === activeSection;
    }
    if (item.href === "/") return false;
    return location.pathname.startsWith(item.href);
  };

  const handleClick = useCallback(
    (e: React.MouseEvent, item: NavItem) => {
      playNavigate();
      if (onHome && item.section) {
        e.preventDefault();
        const el = document.getElementById(item.section);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          setActiveSection(item.section);
        }
      } else if (!onHome && item.section && item.href === "/") {
        e.preventDefault();
        navigate("/");
        requestAnimationFrame(() => {
          document.getElementById(item.section)?.scrollIntoView({ behavior: "smooth" });
        });
      }
    },
    [onHome, navigate, playNavigate]
  );

  return (
    <>
      {/* Desktop: floating left vertical rail */}
      <nav
        className="hidden md:flex fixed left-5 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-2 p-2.5 rounded-full bg-black/70 backdrop-blur-xl border border-white/10 shadow-2xl"
        aria-label="Primary"
      >
        {navLinks.map((link) => {
          const Icon = link.icon;
          const active = isActive(link);
          return (
            <Link
              key={link.href}
              to={link.href}
              onClick={(e) => handleClick(e, link)}
              onMouseEnter={() => playHover()}
              aria-label={link.label}
              aria-current={active ? "page" : undefined}
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
              <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-black/90 border border-white/10 text-[11px] tracking-wide text-white/90 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity">
                {link.label}
              </span>
            </Link>
          );
        })}

        <div className="w-6 h-px bg-white/10 my-1" />

        <Link
          to="/contact"
          onClick={() => playNavigate()}
          onMouseEnter={() => playHover()}
          aria-label="Contact"
          className="group relative"
        >
          <div className={`flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 ${
            location.pathname.startsWith("/contact")
              ? "bg-primary text-primary-foreground shadow-[0_0_24px_hsl(var(--primary)/0.6)]"
              : "bg-primary/90 text-primary-foreground hover:bg-primary hover:scale-105"
          }`}>
            <Mail className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </div>
          <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-black/90 border border-white/10 text-[11px] tracking-wide text-white/90 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity">
            Contact
          </span>
        </Link>
      </nav>

      {/* Mobile: bottom horizontal pill */}
      <nav
        className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 p-1.5 rounded-full bg-black/85 backdrop-blur-xl border border-white/10 shadow-2xl max-w-[calc(100vw-1.5rem)]"
        style={{ paddingBottom: "max(0.375rem, env(safe-area-inset-bottom))" }}
        aria-label="Primary mobile"
      >
        {navLinks.slice(0, 5).map((link) => {
          const Icon = link.icon;
          const active = isActive(link);
          return (
            <Link
              key={link.href}
              to={link.href}
              onClick={(e) => handleClick(e, link)}
              aria-label={link.label}
              aria-current={active ? "page" : undefined}
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
          onClick={() => playNavigate()}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
            location.pathname.startsWith("/contact")
              ? "bg-primary text-primary-foreground"
              : "bg-primary/90 text-primary-foreground"
          }`}
        >
          <Mail className="w-[17px] h-[17px]" strokeWidth={1.75} />
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
