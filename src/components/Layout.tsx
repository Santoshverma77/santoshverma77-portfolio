import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import LeafParticles from "@/components/LeafParticles";
import NarutoEffects from "@/components/NarutoEffects";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-naruto-darker pointer-events-none" />
      
      {/* Animated particles */}
      <LeafParticles />
      
      {/* Naruto themed effects */}
      <NarutoEffects />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>
    </main>
  );
};

export default Layout;
