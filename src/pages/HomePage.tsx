import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import FreelanceSection from "@/components/FreelanceSection";
import ServicesSection from "@/components/ServicesSection";
import ResumeSection from "@/components/ResumeSection";
import ContactSection from "@/components/ContactSection";
import PageTransition from "@/components/PageTransition";
import PageSEO from "@/components/PageSEO";

const HomePage = () => {
  return (
    <PageTransition>
      <PageSEO
        title="Santosh Kumar Verma | Full-Stack Developer & Video Editor"
        description="Portfolio of Santosh Kumar Verma — Full-Stack Developer, Video Editor, Content Creator and BS Data Science student at IIT Madras."
        path="/"
      />
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

