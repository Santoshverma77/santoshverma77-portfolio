import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import FreelanceSection from "@/components/FreelanceSection";
import ServicesSection from "@/components/ServicesSection";
import ResumeSection from "@/components/ResumeSection";
import ContactSection from "@/components/ContactSection";
import PageTransition from "@/components/PageTransition";

const HomePage = () => {
  return (
    <PageTransition>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <FreelanceSection />
      <ServicesSection />
      <ResumeSection />
      <ContactSection />
    </PageTransition>
  );
};

export default HomePage;

