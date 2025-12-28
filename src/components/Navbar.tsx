import { useState, useEffect } from "react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#certifications", label: "Certificates" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-primary/20 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-fire flex items-center justify-center animate-pulse-glow">
                <span className="font-naruto text-xl text-primary-foreground">S</span>
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-fire blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
            </div>
            <span className="font-naruto text-2xl tracking-wider text-gradient-fire hidden sm:block">
              SANTOSH VERMA
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-muted-foreground hover:text-primary transition-colors duration-300 group font-medium"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-fire transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-primary transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-primary transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-primary transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            mobileOpen ? "max-h-96 mt-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-4 py-4 border-t border-primary/20">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium pl-2 border-l-2 border-transparent hover:border-primary"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
