import { ReactNode, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StrangerEffects from "@/components/StrangerEffects";
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
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showLoader && <LoadingScreen />}
      <main className="relative min-h-screen bg-background overflow-hidden flex flex-col">
        {/* Dark atmospheric gradient */}
        <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-[hsl(200_30%_5%)] pointer-events-none" />
        
        {/* Stranger Things themed effects */}
        <StrangerEffects />
        
        {/* Theme Toggle */}
        <ThemeToggle />
        
        {/* Sound Toggle */}
        <SoundToggle />
        
        {/* Background Music Player */}
        <BackgroundMusicPlayer />
        
        {/* Scroll to Top */}
        <ScrollToTop />
        
        {/* Navigation */}
        <Navbar />
        
        {/* Main content */}
        <div className="relative z-10 flex-1">
          {children}
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
};

export default Layout;
