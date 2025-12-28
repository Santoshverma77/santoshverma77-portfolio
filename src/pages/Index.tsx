import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificationsSection from "@/components/CertificationsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import LeafParticles from "@/components/LeafParticles";

const Index = () => {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-naruto-darker pointer-events-none" />
      
      {/* Animated particles */}
      <LeafParticles />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main content */}
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificationsSection />
        <ExperienceSection />
        <ContactSection />
      </div>
    </main>
  );
};

export default Index;
