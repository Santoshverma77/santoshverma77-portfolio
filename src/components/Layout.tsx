import { ReactNode, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeafParticles from "@/components/LeafParticles";
import NarutoEffects from "@/components/NarutoEffects";
import LoadingScreen from "@/components/LoadingScreen";
import ThemeToggle from "@/components/ThemeToggle";
import ScrollToTop from "@/components/ScrollToTop";
import SoundToggle from "@/components/SoundToggle";
import BackgroundMusicPlayer from "@/components/BackgroundMusicPlayer";
interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Hide loader after animation completes
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showLoader && <LoadingScreen />}
      <main className="relative min-h-screen bg-background text-foreground overflow-hidden flex flex-col">
        {/* Subtle dark background */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.06),_transparent_60%)] pointer-events-none" />

        {/* Floating controls */}
        <ThemeToggle />
        <SoundToggle />
        <BackgroundMusicPlayer />
        <ScrollToTop />

        {/* Navigation */}
        <Navbar />

        {/* Main content with room for left rail on desktop */}
        <div className="relative z-10 flex-1 md:pl-24">
          {children}
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
};

export default Layout;
