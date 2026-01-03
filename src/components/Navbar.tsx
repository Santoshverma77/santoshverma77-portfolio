import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSounds } from "@/contexts/SoundContext";
import { motion } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/certifications", label: "Certificates" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { playClick, playHover, playNavigate } = useSounds();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => {
    playNavigate();
  };

  const handleHover = () => {
    playHover();
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-primary/20 shadow-lg"
          : "bg-transparent"
      }`}
      style={{ marginTop: scrolled ? "0" : "2.5rem" }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group"
            onClick={handleNavClick}
            onMouseEnter={handleHover}
          >
            <div className="relative">
              <motion.div 
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center"
                animate={{
                  boxShadow: [
                    "0 0 10px hsl(0, 85%, 50%)",
                    "0 0 20px hsl(0, 85%, 50%)",
                    "0 0 10px hsl(0, 85%, 50%)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="font-title text-xl text-primary-foreground">S</span>
              </motion.div>
            </div>
            <span className="font-title text-2xl tracking-wider text-gradient-portal hidden sm:block">
              SANTOSH VERMA
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={handleNavClick}
                onMouseEnter={handleHover}
                className={`relative text-muted-foreground hover:text-primary transition-colors duration-300 group font-medium ${
                  location.pathname === link.href ? "text-primary" : ""
                }`}
              >
                {link.label}
                <span 
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-portal transition-all duration-300 ${
                    location.pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`} 
                />
              </Link>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => {
              setMobileOpen(!mobileOpen);
              playClick();
            }}
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
              <Link
                key={link.href}
                to={link.href}
                onClick={() => {
                  setMobileOpen(false);
                  handleNavClick();
                }}
                onMouseEnter={handleHover}
                className={`text-muted-foreground hover:text-primary transition-colors duration-300 font-medium pl-2 border-l-2 hover:border-primary ${
                  location.pathname === link.href ? "text-primary border-primary" : "border-transparent"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
